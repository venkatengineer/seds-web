import express from 'express';
import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import {
  createRegistration,
  getByReferenceId,
  getById,
  findDuplicate,
  updateRegistrationStatus,
  submitPhase2,
  getStats,
  listRegistrations,
  getSettings,
  updateSettings,
} from './db.js';
import { storage } from './storage.js';
import { validatePhase1 } from './validation.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 }, // 25 MB
});

export const apiRouter = express.Router();

const ADMIN_SECRET = process.env.ADMIN_SECRET || 'orbital26_seds_admin_2026';

function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'] || req.query.adminKey;
  if (!key || key !== ADMIN_SECRET) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator credentials.',
    });
  }
  next();
}

// ============================================================
// PUBLIC ENDPOINTS
// ============================================================

// 1. Get Live Event Stats (No mock counts!)
apiRouter.get('/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json({ success: true, stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Get Public Settings (deadlines, team sizes, fee)
apiRouter.get('/settings', (req, res) => {
  try {
    const settings = getSettings();
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Create Phase 1 Registration
apiRouter.post('/registrations', upload.single('pptFile'), async (req, res) => {
  try {
    const settings = getSettings();
    const data = { ...req.body };

    // Parse members array if stringified
    if (typeof data.members === 'string') {
      try {
        data.members = JSON.parse(data.members);
      } catch (_) {
        data.members = [];
      }
    }

    // A. Backend Validation
    const validation = validatePhase1(data, req.file, settings);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed. Please correct the highlighted errors.',
        errors: validation.errors,
      });
    }

    // B. Sensible Duplicate Detection Strategy
    const duplicate = findDuplicate(data.teamName, data.teamLeadEmail, data.phone);
    if (duplicate) {
      let duplicateField = 'team details';
      if (duplicate.team_name.toLowerCase() === data.teamName.trim().toLowerCase()) {
        duplicateField = `team name "${duplicate.team_name}"`;
      } else if (duplicate.team_lead_email.toLowerCase() === data.teamLeadEmail.trim().toLowerCase()) {
        duplicateField = `email "${duplicate.team_lead_email}"`;
      } else if (duplicate.phone === data.phone.trim()) {
        duplicateField = `phone number "${duplicate.phone}"`;
      }

      return res.status(409).json({
        success: false,
        error: `A team is already registered with this ${duplicateField}.`,
        duplicateReferenceId: duplicate.reference_id,
        isDuplicate: true,
      });
    }

    // C. Store Presentation File
    const fileResult = await storage.saveFile(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // D. Persist Registration in SQLite Database
    const regPayload = {
      ...data,
      pptFile: fileResult,
    };

    const newRegistration = createRegistration(regPayload);

    res.status(201).json({
      success: true,
      message: 'Phase 1 registration submitted successfully.',
      registration: newRegistration,
    });
  } catch (err) {
    console.error('Registration submission error:', err);
    res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your registration. Please try again.',
      details: err.message,
    });
  }
});

// 4. Check Registration Status & Safe Details by Reference ID
apiRouter.get('/registrations/:referenceId/status', (req, res) => {
  try {
    const { referenceId } = req.params;
    const reg = getByReferenceId(referenceId);
    if (!reg) {
      return res.status(404).json({
        success: false,
        error: `No registration found matching reference ID "${referenceId}". Please verify your reference code.`,
      });
    }

    const settings = getSettings();
    const feePerPerson = settings.phase2FeePerPerson || 300;
    const totalFee = reg.teamSize * feePerPerson;

    res.json({
      success: true,
      registration: {
        referenceId: reg.referenceId,
        teamName: reg.teamName,
        teamLead: reg.teamLead,
        teamLeadEmail: reg.teamLeadEmail,
        phone: reg.phone,
        year: reg.year,
        department: reg.department,
        teamSize: reg.teamSize,
        members: reg.members,
        domain: reg.domain,
        projectTitle: reg.projectTitle,
        phase: reg.phase,
        status: reg.status,
        createdAt: reg.createdAt,
        feeAmount: totalFee,
        feePerPerson,
        phase2Data: reg.phase2Data,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Submit Phase 2 Registration (Shortlisted Teams Only)
apiRouter.post('/registrations/:referenceId/phase-2', (req, res) => {
  try {
    const { referenceId } = req.params;
    const reg = getByReferenceId(referenceId);

    if (!reg) {
      return res.status(404).json({
        success: false,
        error: `No registration found matching reference ID "${referenceId}".`,
      });
    }

    // Only shortlisted teams proceed to Phase 2
    if (reg.status !== 'SHORTLISTED' && reg.status !== 'PHASE_2_PENDING') {
      return res.status(403).json({
        success: false,
        error: `Team "${reg.teamName}" is currently in status "${reg.status}". Phase 2 registration is reserved exclusively for shortlisted teams.`,
      });
    }

    const settings = getSettings();
    const feePerPerson = settings.phase2FeePerPerson || 300;
    const totalFee = reg.teamSize * feePerPerson;

    const phase2Payload = {
      ...req.body,
      confirmedTeamLead: reg.teamLead,
      confirmedTeamLeadEmail: reg.teamLeadEmail,
      confirmedTeamSize: reg.teamSize,
      calculatedFee: totalFee,
      submittedAt: new Date().toISOString(),
    };

    const updated = submitPhase2(referenceId, phase2Payload, totalFee, 'PHASE_2_PENDING');

    res.json({
      success: true,
      message: 'Phase 2 registration initialized. Payment instructions will be communicated directly.',
      registration: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ============================================================
// PROTECTED ADMINISTRATOR ENDPOINTS
// ============================================================

// 6. Admin: List all registrations with filtering & search
apiRouter.get('/admin/registrations', requireAdmin, (req, res) => {
  try {
    const { status, search, limit, offset } = req.query;
    const registrations = listRegistrations({ status, search, limit, offset });
    const stats = getStats();
    const settings = getSettings();

    res.json({
      success: true,
      registrations,
      stats,
      settings,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. Admin: Get full details of a specific registration
apiRouter.get('/admin/registrations/:id', requireAdmin, (req, res) => {
  try {
    const reg = getById(req.params.id) || getByReferenceId(req.params.id);
    if (!reg) {
      return res.status(404).json({ success: false, error: 'Registration not found.' });
    }
    res.json({ success: true, registration: reg });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 8. Admin: Update registration status (Shortlist, Reject, Move to Phase 2)
apiRouter.patch('/admin/registrations/:id/status', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const VALID_STATUSES = [
      'PHASE_1_SUBMITTED',
      'SHORTLISTED',
      'PHASE_2_PENDING',
      'PHASE_2_REGISTERED',
      'REJECTED',
    ];

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Invalid status. Allowed values: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const updated = updateRegistrationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Registration not found.' });
    }

    res.json({
      success: true,
      message: `Status updated to ${status}.`,
      registration: updated,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 9. Admin: Update event settings (shortlist capacity, deadlines, fees)
apiRouter.patch('/admin/settings', requireAdmin, (req, res) => {
  try {
    const updated = updateSettings(req.body);
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 10. Admin: Export registrations as CSV
apiRouter.get('/admin/export', requireAdmin, (req, res) => {
  try {
    const registrations = listRegistrations({ limit: 10000 });
    const headers = [
      'Reference ID',
      'Team Name',
      'Team Lead',
      'Lead Email',
      'Phone',
      'Year',
      'Department',
      'Team Size',
      'Domain',
      'Project Title',
      'Status',
      'Phase',
      'Fee Amount',
      'Created At',
      'PPT File URL',
    ];

    const escapeCsv = (str) => `"${String(str || '').replace(/"/g, '""')}"`;

    const rows = registrations.map((r) => [
      escapeCsv(r.referenceId),
      escapeCsv(r.teamName),
      escapeCsv(r.teamLead),
      escapeCsv(r.teamLeadEmail),
      escapeCsv(r.phone),
      escapeCsv(r.year),
      escapeCsv(r.department),
      r.teamSize,
      escapeCsv(r.domain),
      escapeCsv(r.projectTitle),
      escapeCsv(r.status),
      escapeCsv(r.phase),
      r.feeAmount,
      escapeCsv(r.createdAt),
      escapeCsv(r.pptFile ? r.pptFile.url : ''),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="orbital26_registrations_${new Date().toISOString().slice(0, 10)}.csv"`
    );
    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
