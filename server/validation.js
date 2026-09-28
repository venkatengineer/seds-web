/**
 * STRICT BACKEND VALIDATION ENGINE
 * 
 * Never trust client-side inputs.
 * Validates formats, team member constraints, duplicates, and file security.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+0-9\s\-()]{10,18}$/;
const ALLOWED_PPT_EXTS = ['.ppt', '.pptx'];
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25 MB

export function validatePhase1(data, file, settings = { minTeamSize: 3, maxTeamSize: 4 }) {
  const errors = {};

  // 1. Team Name
  if (!data.teamName || typeof data.teamName !== 'string' || data.teamName.trim().length < 2) {
    errors.teamName = 'Team name must be at least 2 characters.';
  } else if (data.teamName.trim().length > 80) {
    errors.teamName = 'Team name must not exceed 80 characters.';
  }

  // 2. Team Lead
  if (!data.teamLead || typeof data.teamLead !== 'string' || data.teamLead.trim().length < 2) {
    errors.teamLead = 'Team lead name must be at least 2 characters.';
  } else if (data.teamLead.trim().length > 80) {
    errors.teamLead = 'Team lead name must not exceed 80 characters.';
  }

  // 3. Team Lead Email
  if (!data.teamLeadEmail || !EMAIL_REGEX.test(data.teamLeadEmail.trim())) {
    errors.teamLeadEmail = 'Please provide a valid team lead email address.';
  }

  // 4. Phone Number
  if (!data.phone || !PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please provide a valid contact phone number (10–15 digits).';
  }

  // 5. Academic Year & Department
  if (!data.year || typeof data.year !== 'string' || !data.year.trim()) {
    errors.year = 'Please select the team lead academic year.';
  }

  if (!data.department || typeof data.department !== 'string' || !data.department.trim()) {
    errors.department = 'Please enter the team lead department.';
  }

  // 6. Team Size (3 to 4)
  const teamSize = Number(data.teamSize);
  const minSize = settings.minTeamSize || 3;
  const maxSize = settings.maxTeamSize || 4;

  if (isNaN(teamSize) || teamSize < minSize || teamSize > maxSize) {
    errors.teamSize = `Team size must be between ${minSize} and ${maxSize} members.`;
  }

  // 7. Team Members
  let members = [];
  try {
    members = typeof data.members === 'string' ? JSON.parse(data.members) : data.members;
  } catch (_) {
    errors.members = 'Invalid member payload format.';
  }

  const expectedMemberCount = teamSize - 1; // Team Lead + (teamSize - 1) members = teamSize
  if (!Array.isArray(members) || members.length !== expectedMemberCount) {
    errors.members = `Team size ${teamSize} requires exactly ${expectedMemberCount} additional member details.`;
  } else {
    const seenEmails = new Set();
    if (data.teamLeadEmail) {
      seenEmails.add(data.teamLeadEmail.trim().toLowerCase());
    }

    members.forEach((m, idx) => {
      const num = idx + 1;
      if (!m.name || typeof m.name !== 'string' || m.name.trim().length < 2) {
        errors[`member_${num}_name`] = `Member ${num} name is required.`;
      }

      if (!m.email || !EMAIL_REGEX.test(m.email.trim())) {
        errors[`member_${num}_email`] = `Member ${num} has an invalid email address.`;
      } else {
        const lower = m.email.trim().toLowerCase();
        if (seenEmails.has(lower)) {
          errors[`member_${num}_email`] = `Email ${m.email} is already used by another team member or the team lead.`;
        } else {
          seenEmails.add(lower);
        }
      }

      if (!m.year || !m.year.trim()) {
        errors[`member_${num}_year`] = `Member ${num} academic year is required.`;
      }

      if (!m.department || !m.department.trim()) {
        errors[`member_${num}_department`] = `Member ${num} department is required.`;
      }
    });
  }

  // 8. Project Details
  if (!data.domain || typeof data.domain !== 'string' || !data.domain.trim()) {
    errors.domain = 'Please select a technical domain or problem statement.';
  }

  if (!data.projectTitle || typeof data.projectTitle !== 'string' || data.projectTitle.trim().length < 3) {
    errors.projectTitle = 'Project title must be at least 3 characters.';
  } else if (data.projectTitle.trim().length > 150) {
    errors.projectTitle = 'Project title must not exceed 150 characters.';
  }

  if (!data.projectDescription || typeof data.projectDescription !== 'string' || data.projectDescription.trim().length < 20) {
    errors.projectDescription = 'Project description must be at least 20 characters.';
  } else if (data.projectDescription.trim().length > 2500) {
    errors.projectDescription = 'Project description must not exceed 2500 characters.';
  }

  // 9. PPT File Validation
  if (!file) {
    errors.pptFile = 'Presentation file (.ppt or .pptx) is required.';
  } else {
    const ext = (file.originalname || '').toLowerCase().slice(((file.originalname || '').lastIndexOf('.')));
    if (!ALLOWED_PPT_EXTS.includes(ext)) {
      errors.pptFile = 'Only presentation files (.ppt or .pptx) are accepted.';
    }

    if (file.size > MAX_FILE_SIZE) {
      errors.pptFile = `File size must not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB.`;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
