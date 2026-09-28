import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

// Ensure data directory exists
const dataDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'orbital26.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode for high concurrency & performance
try {
  db.exec('PRAGMA journal_mode = WAL;');
  db.exec('PRAGMA foreign_keys = ON;');
} catch (e) {
  console.warn('Note: PRAGMA setup warning:', e.message);
}

// 1. Initialize Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS registrations (
    id TEXT PRIMARY KEY,
    reference_id TEXT UNIQUE NOT NULL,
    team_name TEXT NOT NULL,
    team_lead TEXT NOT NULL,
    team_lead_email TEXT NOT NULL,
    phone TEXT NOT NULL,
    year TEXT NOT NULL,
    department TEXT NOT NULL,
    team_size INTEGER NOT NULL,
    members_json TEXT NOT NULL,
    domain TEXT NOT NULL,
    project_title TEXT NOT NULL,
    project_description TEXT NOT NULL,
    ppt_template_link TEXT,
    ppt_file_json TEXT,
    phase TEXT NOT NULL DEFAULT 'PHASE_1',
    status TEXT NOT NULL DEFAULT 'PHASE_1_SUBMITTED',
    phase2_data_json TEXT,
    fee_amount INTEGER DEFAULT 0,
    fee_status TEXT DEFAULT 'UNPAID',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_reg_reference ON registrations(reference_id);
  CREATE INDEX IF NOT EXISTS idx_reg_email ON registrations(team_lead_email);
  CREATE INDEX IF NOT EXISTS idx_reg_team_name ON registrations(team_name);
  CREATE INDEX IF NOT EXISTS idx_reg_status ON registrations(status);
`);

// 2. Seed Default Settings if not present
const defaultSettings = {
  minTeamSize: 3,
  maxTeamSize: 4,
  shortlistCapacity: 30,
  phase2FeePerPerson: 300,
  phase1Deadline: null,
  phase2Deadline: null,
  pptTemplateUrl: "https://drive.google.com/drive/folders/orbital26-presentation-templates",
  emailConfirmationEnabled: false,
};

const getSettingStmt = db.prepare('SELECT value FROM settings WHERE key = ?');
const setSettingStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');

for (const [key, val] of Object.entries(defaultSettings)) {
  const existing = getSettingStmt.get(key);
  if (!existing) {
    setSettingStmt.run(key, JSON.stringify(val));
  }
}

// 3. Unique Reference ID Generator
const CHARS = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
export function generateReferenceId() {
  let ref = '';
  for (let i = 0; i < 5; i++) {
    const idx = crypto.randomInt(0, CHARS.length);
    ref += CHARS[idx];
  }
  return `ORB26-${ref}`;
}

// 4. Registration Queries & Operations
const checkDuplicateStmt = db.prepare(`
  SELECT id, reference_id, team_name, team_lead_email, phone 
  FROM registrations 
  WHERE LOWER(team_name) = LOWER(?) 
     OR LOWER(team_lead_email) = LOWER(?) 
     OR phone = ?
  LIMIT 1
`);

export function findDuplicate(teamName, email, phone) {
  return checkDuplicateStmt.get(teamName.trim(), email.trim(), phone.trim());
}

const insertRegStmt = db.prepare(`
  INSERT INTO registrations (
    id, reference_id, team_name, team_lead, team_lead_email,
    phone, year, department, team_size, members_json,
    domain, project_title, project_description, ppt_template_link,
    ppt_file_json, phase, status, fee_amount, fee_status,
    created_at, updated_at
  ) VALUES (
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?, ?,
    ?, ?
  )
`);

export function createRegistration(data) {
  const id = crypto.randomUUID();
  let referenceId = generateReferenceId();

  // Ensure reference_id collision resistance
  const checkRef = db.prepare('SELECT id FROM registrations WHERE reference_id = ?');
  while (checkRef.get(referenceId)) {
    referenceId = generateReferenceId();
  }

  const now = new Date().toISOString();

  insertRegStmt.run(
    id,
    referenceId,
    data.teamName.trim(),
    data.teamLead.trim(),
    data.teamLeadEmail.trim().toLowerCase(),
    data.phone.trim(),
    data.year.trim(),
    data.department.trim(),
    Number(data.teamSize),
    JSON.stringify(data.members || []),
    data.domain.trim(),
    data.projectTitle.trim(),
    data.projectDescription.trim(),
    data.pptTemplateLink ? data.pptTemplateLink.trim() : null,
    JSON.stringify(data.pptFile || null),
    'PHASE_1',
    'PHASE_1_SUBMITTED',
    0,
    'UNPAID',
    now,
    now
  );

  return getByReferenceId(referenceId);
}

const getByRefStmt = db.prepare('SELECT * FROM registrations WHERE reference_id = ?');
const getByIdStmt = db.prepare('SELECT * FROM registrations WHERE id = ?');

export function getByReferenceId(referenceId) {
  const row = getByRefStmt.get(referenceId.trim().toUpperCase());
  if (!row) return null;
  return formatRegistration(row);
}

export function getById(id) {
  const row = getByIdStmt.get(id);
  if (!row) return null;
  return formatRegistration(row);
}

const updateStatusStmt = db.prepare(`
  UPDATE registrations 
  SET status = ?, updated_at = ? 
  WHERE id = ? OR reference_id = ?
`);

export function updateRegistrationStatus(idOrRef, status) {
  const now = new Date().toISOString();
  const trimmed = String(idOrRef).trim();
  updateStatusStmt.run(status, now, trimmed, trimmed.toUpperCase());
  return getByReferenceId(trimmed) || getById(trimmed);
}

const updatePhase2Stmt = db.prepare(`
  UPDATE registrations 
  SET phase2_data_json = ?,
      fee_amount = ?,
      phase = 'PHASE_2',
      status = ?,
      updated_at = ?
  WHERE reference_id = ?
`);

export function submitPhase2(referenceId, phase2Data, feeAmount, newStatus = 'PHASE_2_PENDING') {
  const now = new Date().toISOString();
  updatePhase2Stmt.run(
    JSON.stringify(phase2Data),
    feeAmount,
    newStatus,
    now,
    referenceId.trim().toUpperCase()
  );
  return getByReferenceId(referenceId);
}

export function getStats() {
  const totalRow = db.prepare('SELECT COUNT(*) as count FROM registrations').get();
  const phase1Row = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status = 'PHASE_1_SUBMITTED'").get();
  const shortlistedRow = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status = 'SHORTLISTED'").get();
  const phase2Row = db.prepare("SELECT COUNT(*) as count FROM registrations WHERE status IN ('PHASE_2_PENDING', 'PHASE_2_REGISTERED')").get();

  return {
    totalRegistrations: totalRow ? totalRow.count : 0,
    phase1Submitted: phase1Row ? phase1Row.count : 0,
    shortlisted: shortlistedRow ? shortlistedRow.count : 0,
    phase2Registered: phase2Row ? phase2Row.count : 0,
  };
}

export function listRegistrations({ status, search, limit = 50, offset = 0 } = {}) {
  let query = 'SELECT * FROM registrations WHERE 1=1';
  const params = [];

  if (status && status !== 'ALL') {
    query += ' AND status = ?';
    params.push(status);
  }

  if (search && search.trim()) {
    const s = `%${search.trim().toLowerCase()}%`;
    query += ` AND (
      LOWER(team_name) LIKE ? OR 
      LOWER(team_lead) LIKE ? OR 
      LOWER(team_lead_email) LIKE ? OR 
      LOWER(reference_id) LIKE ? OR 
      LOWER(domain) LIKE ?
    )`;
    params.push(s, s, s, s, s);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));

  const rows = db.prepare(query).all(...params);
  return rows.map(formatRegistration);
}

export function getSettings() {
  const rows = db.prepare('SELECT key, value FROM settings').all();
  const settings = {};
  for (const row of rows) {
    try {
      settings[row.key] = JSON.parse(row.value);
    } catch (_) {
      settings[row.key] = row.value;
    }
  }
  return settings;
}

export function updateSettings(newSettings) {
  for (const [key, val] of Object.entries(newSettings)) {
    setSettingStmt.run(key, JSON.stringify(val));
  }
  return getSettings();
}

function formatRegistration(row) {
  return {
    id: row.id,
    referenceId: row.reference_id,
    teamName: row.team_name,
    teamLead: row.team_lead,
    teamLeadEmail: row.team_lead_email,
    phone: row.phone,
    year: row.year,
    department: row.department,
    teamSize: row.team_size,
    members: JSON.parse(row.members_json || '[]'),
    domain: row.domain,
    projectTitle: row.project_title,
    projectDescription: row.project_description,
    pptTemplateLink: row.ppt_template_link,
    pptFile: JSON.parse(row.ppt_file_json || 'null'),
    phase: row.phase,
    status: row.status,
    phase2Data: JSON.parse(row.phase2_data_json || 'null'),
    feeAmount: row.fee_amount,
    feeStatus: row.fee_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
