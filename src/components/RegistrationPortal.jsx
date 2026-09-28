import React, { useState, useEffect } from 'react';
import { 
  X, Check, ArrowRight, ArrowLeft, Copy, Upload, FileText, 
  AlertCircle, Download, Search, RefreshCw, ShieldCheck, Users, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SEDS_CONFIG, EVENT_CONFIG } from '../config/event';

/**
 * PRODUCTION-GRADE ORBITAL 26 REGISTRATION PORTAL
 * 
 * Architecture & Features:
 * - Phase 1: Free Initial Registration (Team, Dynamic 3-4 Members, Project, PPT upload)
 * - Multi-Step Form with smooth slide/fade transitions (400-700ms)
 * - Strict client-side validation with helpful inline error hints
 * - Preserves all entered data on submission failure
 * - Unique Reference ID generation & copy-to-clipboard
 * - Status Check & Phase 2 Shortlisted Portal (Dynamic fee: ₹300 * teamSize)
 * - Direct integration with persistent backend SQLite API (/api/registrations)
 */

const DOMAIN_OPTIONS = [
  'Propulsion & Avionics',
  'Satellite Systems & CubeSats',
  'Astrodynamics & Space Compute',
  'Space Exploration & Robotics',
  'Climate & Earth Observation',
  'Open Space Innovation',
];

const YEAR_OPTIONS = [
  '1st Year',
  '2nd Year',
  '3rd Year',
  '4th Year',
  'Postgraduate / Research',
];

export default function RegistrationPortal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'status'
  const [step, setStep] = useState(1); // 1: Team, 2: Members, 3: Project, 4: PPT, 5: Review, 6: Success
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  // Phase 1 Form State
  const [formData, setFormData] = useState({
    teamName: '',
    teamLead: '',
    teamLeadEmail: '',
    phone: '',
    year: '2nd Year',
    department: '',
    teamSize: 3, // 3 or 4
    members: [
      { name: '', email: '', year: '2nd Year', department: '' },
      { name: '', email: '', year: '2nd Year', department: '' },
    ],
    domain: DOMAIN_OPTIONS[0],
    projectTitle: '',
    projectDescription: '',
    pptTemplateLink: '',
  });

  const [pptFile, setPptFile] = useState(null);
  const [submittedReg, setSubmittedReg] = useState(null);
  const [copied, setCopied] = useState(false);

  // Status Lookup State
  const [lookupRef, setLookupRef] = useState('');
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  // Phase 2 Submission State
  const [phase2Submitting, setPhase2Submitting] = useState(false);
  const [phase2Success, setPhase2Success] = useState(false);

  // Public Settings
  const [settings, setSettings] = useState({
    minTeamSize: 3,
    maxTeamSize: 4,
    phase2FeePerPerson: 300,
    pptTemplateUrl: 'https://drive.google.com/drive/folders/orbital26-presentation-templates',
  });

  // Fetch live settings on mount
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  // Sync member array length when teamSize changes
  const handleTeamSizeChange = (newSize) => {
    const size = Number(newSize);
    const neededMembers = size - 1; // Team lead + (size - 1)
    setFormData((prev) => {
      let updatedMembers = [...prev.members];
      while (updatedMembers.length < neededMembers) {
        updatedMembers.push({ name: '', email: '', year: prev.year, department: '' });
      }
      if (updatedMembers.length > neededMembers) {
        updatedMembers = updatedMembers.slice(0, neededMembers);
      }
      return { ...prev, teamSize: size, members: updatedMembers };
    });
  };

  const handleMemberChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.members];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, members: updated };
    });
    // Clear field-specific error
    if (fieldErrors[`member_${index + 1}_${field}`]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[`member_${index + 1}_${field}`];
        return next;
      });
    }
  };

  // Step Validation Logic
  const validateStep = (currentStep) => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+0-9\s\-()]{10,18}$/;

    if (currentStep === 1) {
      if (!formData.teamName.trim() || formData.teamName.trim().length < 2) {
        errs.teamName = 'Team name must be at least 2 characters.';
      }
      if (!formData.teamLead.trim() || formData.teamLead.trim().length < 2) {
        errs.teamLead = 'Team lead name is required.';
      }
      if (!formData.teamLeadEmail.trim() || !emailRegex.test(formData.teamLeadEmail.trim())) {
        errs.teamLeadEmail = 'Please enter a valid team lead email.';
      }
      if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim())) {
        errs.phone = 'Please enter a valid 10-digit contact number.';
      }
      if (!formData.department.trim()) {
        errs.department = 'Department is required.';
      }
    }

    if (currentStep === 2) {
      const seenEmails = new Set();
      if (formData.teamLeadEmail) seenEmails.add(formData.teamLeadEmail.trim().toLowerCase());

      formData.members.forEach((m, idx) => {
        const num = idx + 1;
        if (!m.name.trim() || m.name.trim().length < 2) {
          errs[`member_${num}_name`] = `Member ${num} name is required.`;
        }
        if (!m.email.trim() || !emailRegex.test(m.email.trim())) {
          errs[`member_${num}_email`] = `Member ${num} email is invalid.`;
        } else {
          const lower = m.email.trim().toLowerCase();
          if (seenEmails.has(lower)) {
            errs[`member_${num}_email`] = `Email is already used by another team member.`;
          } else {
            seenEmails.add(lower);
          }
        }
        if (!m.department.trim()) {
          errs[`member_${num}_department`] = `Member ${num} department is required.`;
        }
      });
    }

    if (currentStep === 3) {
      if (!formData.domain.trim()) {
        errs.domain = 'Please choose a mission domain.';
      }
      if (!formData.projectTitle.trim() || formData.projectTitle.trim().length < 3) {
        errs.projectTitle = 'Project title must be at least 3 characters.';
      }
      if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 20) {
        errs.projectDescription = 'Please provide a project description (at least 20 characters).';
      }
    }

    if (currentStep === 4) {
      if (!pptFile) {
        errs.pptFile = 'Please upload your presentation file (.ppt or .pptx).';
      } else {
        const name = pptFile.name.toLowerCase();
        if (!name.endsWith('.ppt') && !name.endsWith('.pptx')) {
          errs.pptFile = 'Only .ppt or .pptx presentation files are accepted.';
        }
        if (pptFile.size > 25 * 1024 * 1024) {
          errs.pptFile = 'File size exceeds maximum allowable 25 MB.';
        }
      }
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Phase 1 Registration
  const handleSubmitPhase1 = async () => {
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4)) {
      setSubmitError('Please complete all required fields correctly before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append('teamName', formData.teamName);
      payload.append('teamLead', formData.teamLead);
      payload.append('teamLeadEmail', formData.teamLeadEmail);
      payload.append('phone', formData.phone);
      payload.append('year', formData.year);
      payload.append('department', formData.department);
      payload.append('teamSize', String(formData.teamSize));
      payload.append('members', JSON.stringify(formData.members));
      payload.append('domain', formData.domain);
      payload.append('projectTitle', formData.projectTitle);
      payload.append('projectDescription', formData.projectDescription);
      if (formData.pptTemplateLink) {
        payload.append('pptTemplateLink', formData.pptTemplateLink);
      }
      if (pptFile) {
        payload.append('pptFile', pptFile);
      }

      const response = await fetch('/api/registrations', {
        method: 'POST',
        body: payload,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        throw new Error(result.error || 'Failed to submit registration. Please verify your details.');
      }

      setSubmittedReg(result.registration);
      setStep(6); // Success view

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#8B5CF6', '#C084FC', '#6D28D9', '#F7F5FF'],
          disableForReducedMotion: true,
        });
      } catch (_) {}
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong while submitting your registration. Your entered information has been preserved. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check Status Lookup
  const handleLookupStatus = async (e) => {
    e.preventDefault();
    if (!lookupRef.trim()) return;

    setLookupLoading(true);
    setLookupError(null);
    setLookupResult(null);

    try {
      const res = await fetch(`/api/registrations/${encodeURIComponent(lookupRef.trim().toUpperCase())}/status`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Registration record not found.');
      }

      setLookupResult(data.registration);
    } catch (err) {
      setLookupError(err.message);
    } finally {
      setLookupLoading(false);
    }
  };

  // Submit Phase 2 Confirmation
  const handleSubmitPhase2 = async () => {
    if (!lookupResult) return;
    setPhase2Submitting(true);

    try {
      const res = await fetch(`/api/registrations/${encodeURIComponent(lookupResult.referenceId)}/phase-2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmedAttendance: true,
          confirmedAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to initialize Phase 2 registration.');
      }

      setPhase2Success(true);
      setLookupResult((prev) => ({
        ...prev,
        status: data.registration.status,
        phase: data.registration.phase,
      }));
    } catch (err) {
      alert(err.message);
    } finally {
      setPhase2Submitting(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-[#010106]/92 backdrop-blur-2xl animate-in fade-in duration-300 overflow-y-auto"
      onClick={onClose}
    >
      {/* Background Soft Purple Atmospheric Radiance */}
      <div 
        className="fixed w-[600px] h-[600px] rounded-full pointer-events-none -z-10 opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(76, 29, 149, 0.12) 50%, rgba(1, 1, 6, 0) 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Main Modal Shell */}
      <div 
        className="relative w-full max-w-3xl my-auto rounded-2xl border border-white/10 bg-[#04020A] p-6 sm:p-10 md:p-12 shadow-[0_0_80px_rgba(76,29,149,0.35)] transition-all duration-400 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white/30 text-[#A6A0B8] hover:text-[#F7F5FF] transition-colors focus:outline-none"
        >
          <X size={16} />
        </button>

        {/* Modal Header & Navigation Tabs */}
        <div className="border-b border-white/[0.08] pb-5 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="font-editorial text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F7F5FF]">
                {EVENT_CONFIG.name}
              </div>
              <div className="font-display text-[10px] tracking-[0.25em] text-[#8B5CF6] uppercase">
                {SEDS_CONFIG.name} // FLIGHT REGISTRATION PORTAL
              </div>
            </div>

            {/* Navigation Switcher: Register vs Status */}
            <div className="flex items-center gap-1.5 p-1 rounded-full border border-white/10 bg-[#07030F]">
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setSubmitError(null); }}
                className={`px-4 py-1.5 rounded-full font-display text-[10px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-[#8B5CF6] text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    : 'text-[#A6A0B8] hover:text-[#F7F5FF]'
                }`}
              >
                Phase 1 Registration
              </button>

              <button
                type="button"
                onClick={() => { setActiveTab('status'); setLookupError(null); }}
                className={`px-4 py-1.5 rounded-full font-display text-[10px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  activeTab === 'status'
                    ? 'bg-[#8B5CF6] text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                    : 'text-[#A6A0B8] hover:text-[#F7F5FF]'
                }`}
              >
                <Search size={12} />
                <span>Check Status</span>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: PHASE 1 MULTI-STEP REGISTRATION */}
        {/* ============================================================ */}
        {activeTab === 'register' && step <= 5 && (
          <div>
            {/* Step Progress Indicator */}
            <div className="mb-6 flex items-center justify-between text-[10px] font-display tracking-[0.2em] uppercase text-[#A6A0B8]">
              <span className="text-[#C084FC] font-semibold">
                STEP 0{step} // 05
              </span>
              <span>
                {step === 1 && 'Team Identification'}
                {step === 2 && 'Crew Members'}
                {step === 3 && 'Project Specifications'}
                {step === 4 && 'Presentation Deck'}
                {step === 5 && 'Final Verification'}
              </span>
            </div>

            {/* Error Banner */}
            {submitError && (
              <div className="mb-5 p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-red-200 text-xs font-display flex items-start gap-2.5">
                <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* STEP 1: TEAM INFORMATION */}
            {/* -------------------------------------------------------- */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in duration-400">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. REC Orbital Unit"
                      value={formData.teamName}
                      onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all ${
                        fieldErrors.teamName ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.teamName && (
                      <span className="text-[10px] text-red-400 font-display">{fieldErrors.teamName}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Team Lead Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rajesh Sharma"
                      value={formData.teamLead}
                      onChange={(e) => setFormData({ ...formData, teamLead: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all ${
                        fieldErrors.teamLead ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.teamLead && (
                      <span className="text-[10px] text-red-400 font-display">{fieldErrors.teamLead}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Team Lead Email *
                    </label>
                    <input
                      type="email"
                      placeholder="lead@university.edu.in"
                      value={formData.teamLeadEmail}
                      onChange={(e) => setFormData({ ...formData, teamLeadEmail: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all ${
                        fieldErrors.teamLeadEmail ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.teamLeadEmail && (
                      <span className="text-[10px] text-red-400 font-display">{fieldErrors.teamLeadEmail}</span>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] transition-all ${
                        fieldErrors.phone ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <span className="text-[10px] text-red-400 font-display">{fieldErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Academic Year *
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-display text-xs focus:outline-none focus:border-[#8B5CF6]"
                    >
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Department *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aerospace Engineering"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] ${
                        fieldErrors.department ? 'border-red-500/60' : 'border-white/10'
                      }`}
                    />
                    {fieldErrors.department && (
                      <span className="text-[10px] text-red-400 font-display">{fieldErrors.department}</span>
                    )}
                  </div>
                </div>

                {/* Team Size Selector (3 or 4 members) */}
                <div className="pt-2">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block mb-2">
                    Team Size (3–4 Members Total) *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => handleTeamSizeChange(3)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.teamSize === 3
                          ? 'border-[#8B5CF6] bg-[#4C1D95]/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : 'border-white/10 bg-[#07030F] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-base font-bold text-[#F7F5FF]">3 Members</span>
                        {formData.teamSize === 3 && <Check size={14} className="text-[#C084FC]" />}
                      </div>
                      <span className="font-display text-[10px] text-[#A6A0B8] block mt-0.5">
                        Team Lead + 2 Members
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTeamSizeChange(4)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.teamSize === 4
                          ? 'border-[#8B5CF6] bg-[#4C1D95]/20 shadow-[0_0_20px_rgba(139,92,246,0.3)]'
                          : 'border-white/10 bg-[#07030F] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-editorial text-base font-bold text-[#F7F5FF]">4 Members</span>
                        {formData.teamSize === 4 && <Check size={14} className="text-[#C084FC]" />}
                      </div>
                      <span className="font-display text-[10px] text-[#A6A0B8] block mt-0.5">
                        Team Lead + 3 Members
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* STEP 2: CREW MEMBERS (Dynamic based on teamSize) */}
            {/* -------------------------------------------------------- */}
            {step === 2 && (
              <div className="space-y-5 animate-in fade-in duration-400">
                {/* Team Lead Badge */}
                <div className="p-3.5 rounded-xl border border-white/10 bg-[#07030F] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                    <div>
                      <span className="font-display text-[10px] uppercase tracking-wider text-[#A6A0B8] block">
                        Team Lead (Registered in Step 1)
                      </span>
                      <span className="font-editorial text-sm font-semibold text-[#F7F5FF]">
                        {formData.teamLead || 'Lead Engineer'} • {formData.teamLeadEmail}
                      </span>
                    </div>
                  </div>
                  <span className="font-display text-[9px] uppercase tracking-widest text-[#C084FC] border border-[#8B5CF6]/30 px-2.5 py-1 rounded-full">
                    Lead
                  </span>
                </div>

                {/* Dynamic Member Inputs */}
                {formData.members.map((member, idx) => {
                  const num = idx + 1;
                  return (
                    <div 
                      key={idx} 
                      className="p-4 rounded-xl border border-white/10 bg-[#07030F] space-y-3 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                        <span className="font-display text-xs font-semibold uppercase tracking-wider text-[#C084FC]">
                          Member 0{num}
                        </span>
                        <span className="font-display text-[9px] text-[#A6A0B8] uppercase">
                          Required for Size {formData.teamSize}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-display text-[9px] tracking-wider uppercase text-[#A6A0B8]">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            placeholder={`e.g. Member ${num} Name`}
                            value={member.name}
                            onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border bg-[#04020A] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] ${
                              fieldErrors[`member_${num}_name`] ? 'border-red-500/60' : 'border-white/10'
                            }`}
                          />
                          {fieldErrors[`member_${num}_name`] && (
                            <span className="text-[9px] text-red-400 font-display block">
                              {fieldErrors[`member_${num}_name`]}
                            </span>
                          )}
                        </div>

                        <div className="space-y-1">
                          <label className="font-display text-[9px] tracking-wider uppercase text-[#A6A0B8]">
                            Email ID *
                          </label>
                          <input
                            type="email"
                            placeholder="member@university.edu.in"
                            value={member.email}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border bg-[#04020A] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] ${
                              fieldErrors[`member_${num}_email`] ? 'border-red-500/60' : 'border-white/10'
                            }`}
                          />
                          {fieldErrors[`member_${num}_email`] && (
                            <span className="text-[9px] text-red-400 font-display block">
                              {fieldErrors[`member_${num}_email`]}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="font-display text-[9px] tracking-wider uppercase text-[#A6A0B8]">
                            Academic Year *
                          </label>
                          <select
                            value={member.year}
                            onChange={(e) => handleMemberChange(idx, 'year', e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-white/10 bg-[#04020A] text-[#F7F5FF] font-display text-xs focus:outline-none focus:border-[#8B5CF6]"
                          >
                            {YEAR_OPTIONS.map((y) => (
                              <option key={y} value={y}>{y}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="font-display text-[9px] tracking-wider uppercase text-[#A6A0B8]">
                            Department *
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Computer Science & Eng"
                            value={member.department}
                            onChange={(e) => handleMemberChange(idx, 'department', e.target.value)}
                            className={`w-full px-3 py-2 rounded-lg border bg-[#04020A] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] ${
                              fieldErrors[`member_${num}_department`] ? 'border-red-500/60' : 'border-white/10'
                            }`}
                          />
                          {fieldErrors[`member_${num}_department`] && (
                            <span className="text-[9px] text-red-400 font-display block">
                              {fieldErrors[`member_${num}_department`]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* STEP 3: PROJECT INFORMATION */}
            {/* -------------------------------------------------------- */}
            {step === 3 && (
              <div className="space-y-4 animate-in fade-in duration-400">
                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    Domain / Problem Statement *
                  </label>
                  <select
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-display text-xs focus:outline-none focus:border-[#8B5CF6]"
                  >
                    {DOMAIN_OPTIONS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Autonomous Reaction Wheel ADCS Telemetry Engine"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] ${
                      fieldErrors.projectTitle ? 'border-red-500/60' : 'border-white/10'
                    }`}
                  />
                  {fieldErrors.projectTitle && (
                    <span className="text-[10px] text-red-400 font-display">{fieldErrors.projectTitle}</span>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                      Project Description & Technical Proposal *
                    </label>
                    <span className="font-display text-[9px] text-[#A6A0B8]">
                      {formData.projectDescription.length} / 2500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Summarize your engineering objective, planned architecture, mathematical or computational approach, and target flight hardware or software deliverables..."
                    value={formData.projectDescription}
                    onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border bg-[#07030F] text-[#F7F5FF] placeholder-[#A6A0B8]/40 font-display text-xs focus:outline-none focus:border-[#8B5CF6] resize-none ${
                      fieldErrors.projectDescription ? 'border-red-500/60' : 'border-white/10'
                    }`}
                  />
                  {fieldErrors.projectDescription && (
                    <span className="text-[10px] text-red-400 font-display">{fieldErrors.projectDescription}</span>
                  )}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* STEP 4: PRESENTATION DECK (PPT) */}
            {/* -------------------------------------------------------- */}
            {step === 4 && (
              <div className="space-y-5 animate-in fade-in duration-400">
                {/* PPT Template Download Card */}
                <div className="p-4 rounded-xl border border-[#8B5CF6]/30 bg-[#4C1D95]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-editorial text-sm font-bold text-[#F7F5FF] block">
                      Official ORBITAL 26 Pitch Deck Template
                    </span>
                    <span className="font-display text-xs text-[#A6A0B8] block mt-0.5">
                      Download the approved presentation format (.pptx)
                    </span>
                  </div>

                  <a
                    href={settings.pptTemplateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#8B5CF6]/50 bg-[#8B5CF6]/20 text-[#C084FC] hover:bg-[#8B5CF6]/40 hover:text-white transition-all text-xs font-display font-medium whitespace-nowrap"
                  >
                    <Download size={13} />
                    <span>Download Template</span>
                  </a>
                </div>

                {/* PPT File Drag & Drop Upload Zone */}
                <div className="space-y-2">
                  <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                    Upload Completed Presentation Deck (.ppt / .pptx) *
                  </label>

                  <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                    fieldErrors.pptFile ? 'border-red-500/60 bg-red-950/10' : pptFile ? 'border-[#8B5CF6] bg-[#4C1D95]/10' : 'border-white/15 bg-[#07030F] hover:border-white/30'
                  }`}>
                    <input
                      type="file"
                      accept=".ppt,.pptx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPptFile(e.target.files[0]);
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.pptFile;
                            return next;
                          });
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {pptFile ? (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="p-3 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C084FC]">
                          <FileText size={24} />
                        </div>
                        <span className="font-editorial text-sm font-semibold text-[#F7F5FF]">
                          {pptFile.name}
                        </span>
                        <span className="font-display text-[10px] text-[#A6A0B8]">
                          {(pptFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for submission
                        </span>
                        <span className="font-display text-[10px] text-[#8B5CF6] underline cursor-pointer">
                          Click to select different file
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="p-3 rounded-full bg-white/5 border border-white/10 text-[#A6A0B8]">
                          <Upload size={24} />
                        </div>
                        <span className="font-editorial text-sm font-medium text-[#F7F5FF]">
                          Drop presentation deck here or click to browse
                        </span>
                        <span className="font-display text-[10px] text-[#A6A0B8]">
                          Supported: .ppt, .pptx • Max 25 MB
                        </span>
                      </div>
                    )}
                  </div>

                  {fieldErrors.pptFile && (
                    <span className="text-[10px] text-red-400 font-display block">
                      {fieldErrors.pptFile}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* STEP 5: FINAL VERIFICATION REVIEW */}
            {/* -------------------------------------------------------- */}
            {step === 5 && (
              <div className="space-y-4 animate-in fade-in duration-400">
                <div className="p-3 rounded-xl border border-[#8B5CF6]/30 bg-[#4C1D95]/15 text-xs font-display text-[#C084FC]">
                  ✓ Phase 1 Application is 100% FREE. Please review your manifest before submission.
                </div>

                <div className="rounded-xl border border-white/10 bg-[#07030F] p-4 sm:p-5 space-y-3.5 text-xs font-display">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
                    <div>
                      <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">CREW NAME</span>
                      <span className="text-base font-editorial font-bold text-[#F7F5FF]">{formData.teamName}</span>
                    </div>
                    <span className="font-display text-[10px] uppercase tracking-widest text-[#C084FC] border border-[#8B5CF6]/30 px-3 py-1 rounded-full">
                      {formData.teamSize} Members
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-white/[0.08] pb-3">
                    <div>
                      <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">TEAM LEAD</span>
                      <span className="text-[#F7F5FF]">{formData.teamLead}</span>
                      <span className="text-[#A6A0B8] text-[10px] block">{formData.teamLeadEmail}</span>
                    </div>

                    <div>
                      <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">PHONE & ACADEMICS</span>
                      <span className="text-[#F7F5FF]">{formData.phone}</span>
                      <span className="text-[#A6A0B8] text-[10px] block">{formData.year} • {formData.department}</span>
                    </div>
                  </div>

                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider mb-1">ADDITIONAL CREW</span>
                    <div className="space-y-1">
                      {formData.members.map((m, idx) => (
                        <div key={idx} className="flex items-center justify-between text-[11px]">
                          <span className="text-[#F7F5FF]">0{idx + 1}. {m.name}</span>
                          <span className="text-[#A6A0B8]">{m.email} ({m.department})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">PROJECT</span>
                    <span className="font-editorial text-sm font-semibold text-[#8B5CF6] block">{formData.projectTitle}</span>
                    <span className="text-[10px] text-[#A6A0B8] block">{formData.domain}</span>
                    <p className="text-[10px] text-[#A6A0B8]/80 line-clamp-2 mt-1">{formData.projectDescription}</p>
                  </div>

                  {pptFile && (
                    <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                      <span className="text-[#A6A0B8] text-[9px] uppercase">DECK ATTACHED</span>
                      <span className="text-[#C084FC] text-[11px] font-medium">{pptFile.name} ({(pptFile.size / (1024 * 1024)).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Stepper Action Bar */}
            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-display text-[#A6A0B8] hover:text-[#F7F5FF] transition-all flex items-center gap-1.5"
                >
                  <ArrowLeft size={13} />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              {step < 5 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-7 py-2.5 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.2em] font-semibold hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all flex items-center gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitPhase1}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#4C1D95] via-[#6D28D9] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-[0.2em] font-bold hover:shadow-[0_0_30px_rgba(139,92,246,0.45)] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw size={13} className="animate-spin" />
                      <span>Transmitting Manifest...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Phase 1 Registration</span>
                      <ArrowRight size={13} />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* STEP 6: PHASE 1 SUCCESS CONFIRMATION RECEIPT */}
        {/* ============================================================ */}
        {activeTab === 'register' && step === 6 && submittedReg && (
          <div className="py-2 text-center space-y-6 animate-in zoom-in-95 duration-400">
            <div className="inline-flex p-3 rounded-full border border-[#8B5CF6]/40 bg-[#4C1D95]/20 text-[#C084FC]">
              <Check size={28} />
            </div>

            <div>
              <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#8B5CF6] font-semibold block mb-1">
                // REGISTRATION RECEIVED
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-[#F7F5FF]">
                PHASE 1 SUBMITTED.
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#A6A0B8] max-w-md mx-auto mt-2 leading-relaxed">
                Your Phase 1 application has been recorded. SEDS REC technical directors will evaluate all proposals and notify approximately 30 shortlisted teams regarding Phase 2.
              </p>
            </div>

            {/* Monumental Flight Receipt Card */}
            <div className="rounded-xl border border-white/10 bg-[#07030F] p-6 text-left space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <div>
                  <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">TEAM</span>
                  <span className="font-editorial text-lg font-bold text-[#F7F5FF]">{submittedReg.teamName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">STATUS</span>
                  <span className="font-display text-xs text-[#C084FC] font-semibold">PHASE 1 — SUBMITTED</span>
                </div>
              </div>

              <div>
                <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider mb-1">OFFICIAL REFERENCE ID</span>
                <div className="flex items-center justify-between p-3 rounded-lg border border-[#8B5CF6]/40 bg-[#4C1D95]/20 font-display text-base font-bold text-[#F7F5FF] tracking-widest">
                  <span>{submittedReg.referenceId}</span>
                  <button
                    onClick={() => handleCopy(submittedReg.referenceId)}
                    className="p-1.5 rounded hover:bg-white/10 text-[#C084FC] transition-colors"
                    title="Copy Reference ID"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <span className="text-[10px] text-[#A6A0B8] block mt-1">
                  Keep this ID secure to check shortlist status and proceed to Phase 2.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setLookupRef(submittedReg.referenceId);
                  setActiveTab('status');
                  setStep(1);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-white/10 hover:border-white/30 text-xs font-display uppercase tracking-wider text-[#A6A0B8] hover:text-white"
              >
                Track Evaluation Status
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-2.5 rounded-full bg-[#F7F5FF] text-black font-display text-xs uppercase tracking-wider font-semibold hover:bg-white"
              >
                Return to Mission
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: APPLICATION STATUS CHECK & PHASE 2 SHORTLIST FLOW */}
        {/* ============================================================ */}
        {activeTab === 'status' && (
          <div className="space-y-6 animate-in fade-in duration-400">
            {/* Search Query Form */}
            <form onSubmit={handleLookupStatus} className="space-y-3">
              <label className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] block">
                Enter Registration Reference ID (e.g. ORB26-XXXXX)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ORB26-..."
                  value={lookupRef}
                  onChange={(e) => setLookupRef(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#07030F] text-[#F7F5FF] font-display text-xs uppercase tracking-wider focus:outline-none focus:border-[#8B5CF6]"
                />
                <button
                  type="submit"
                  disabled={lookupLoading}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#4C1D95] to-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] disabled:opacity-50 flex items-center gap-1.5"
                >
                  {lookupLoading ? <RefreshCw size={13} className="animate-spin" /> : <Search size={13} />}
                  <span>Lookup</span>
                </button>
              </div>
            </form>

            {lookupError && (
              <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-red-200 text-xs font-display">
                {lookupError}
              </div>
            )}

            {/* Display Found Registration Status */}
            {lookupResult && (
              <div className="rounded-xl border border-white/10 bg-[#07030F] p-5 space-y-5 animate-in fade-in duration-300">
                {/* Header Summary */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">TEAM NAME</span>
                    <span className="font-editorial text-lg font-bold text-[#F7F5FF]">{lookupResult.teamName}</span>
                    <span className="font-display text-[10px] text-[#A6A0B8] block">Lead: {lookupResult.teamLead}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">CURRENT STATUS</span>
                    <span className={`inline-block font-display text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider border ${
                      lookupResult.status === 'SHORTLISTED'
                        ? 'border-green-500/50 bg-green-950/20 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                        : lookupResult.status === 'REJECTED'
                        ? 'border-red-500/50 bg-red-950/20 text-red-300'
                        : 'border-[#8B5CF6]/50 bg-[#4C1D95]/20 text-[#C084FC]'
                    }`}>
                      {lookupResult.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>

                {/* Status Progress Flow */}
                <div className="grid grid-cols-3 gap-2 text-center font-display text-[10px]">
                  <div className="p-2.5 rounded-lg border border-green-500/30 bg-green-950/10 text-green-300">
                    <Check size={14} className="mx-auto mb-1 text-green-400" />
                    <span>Phase 1 Submitted</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${
                    lookupResult.status === 'SHORTLISTED' || lookupResult.status.startsWith('PHASE_2')
                      ? 'border-green-500/30 bg-green-950/10 text-green-300'
                      : 'border-white/10 bg-white/5 text-[#A6A0B8]'
                  }`}>
                    {lookupResult.status === 'SHORTLISTED' || lookupResult.status.startsWith('PHASE_2') ? (
                      <Check size={14} className="mx-auto mb-1 text-green-400" />
                    ) : (
                      <Clock size={14} className="mx-auto mb-1 text-[#A6A0B8]" />
                    )}
                    <span>Shortlisting</span>
                  </div>

                  <div className={`p-2.5 rounded-lg border ${
                    lookupResult.status === 'PHASE_2_REGISTERED'
                      ? 'border-green-500/30 bg-green-950/10 text-green-300'
                      : 'border-white/10 bg-white/5 text-[#A6A0B8]'
                  }`}>
                    <ShieldCheck size={14} className="mx-auto mb-1 text-[#A6A0B8]" />
                    <span>Phase 2 Live</span>
                  </div>
                </div>

                {/* Contextual Phase 2 Workflow Card */}
                {lookupResult.status === 'PHASE_1_SUBMITTED' && (
                  <div className="p-4 rounded-xl border border-white/10 bg-[#04020A] text-xs font-display space-y-1.5">
                    <span className="text-[#C084FC] font-semibold block uppercase tracking-wider">
                      Evaluation In Progress
                    </span>
                    <p className="text-[#A6A0B8] leading-relaxed">
                      Your proposal for <span className="text-[#F7F5FF]">"{lookupResult.projectTitle}"</span> is currently being assessed by SEDS REC technical faculty. Approximately 30 shortlisted teams will unlock Phase 2.
                    </p>
                  </div>
                )}

                {lookupResult.status === 'SHORTLISTED' && (
                  <div className="p-5 rounded-xl border border-green-500/30 bg-gradient-to-br from-green-950/20 to-[#04020A] text-xs font-display space-y-4">
                    <div className="flex items-center gap-2 text-green-400 font-semibold uppercase tracking-wider">
                      <Check size={16} />
                      <span>Congratulations! Your team is shortlisted for Phase 2.</span>
                    </div>

                    <p className="text-[#A6A0B8]">
                      Your Phase 1 application has successfully passed technical review. You may now confirm Phase 2 participation.
                    </p>

                    {/* Confirmed Phase 2 Fee Calculation (Display Only) */}
                    <div className="p-4 rounded-lg border border-white/10 bg-[#07030F] flex items-center justify-between">
                      <div>
                        <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">REGISTRATION FEE</span>
                        <span className="font-editorial text-base font-bold text-[#F7F5FF]">
                          ₹{lookupResult.feePerPerson || 300} × {lookupResult.teamSize} Members
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[#A6A0B8] block text-[9px] uppercase tracking-wider">TOTAL APPLICABLE</span>
                        <span className="font-editorial text-lg font-bold text-[#C084FC]">
                          ₹{lookupResult.feeAmount}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-white/10 bg-[#07030F] text-[11px] text-[#A6A0B8] space-y-1">
                      <span className="text-[#F7F5FF] font-semibold block">Official Payment Workflow Notice</span>
                      <span>Payment instructions and gateway verification will be directly communicated to team lead ({lookupResult.teamLeadEmail}) by the SEDS REC organizing committee.</span>
                    </div>

                    {!phase2Success ? (
                      <button
                        onClick={handleSubmitPhase2}
                        disabled={phase2Submitting}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-display text-xs uppercase tracking-wider font-semibold hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all flex items-center justify-center gap-2"
                      >
                        {phase2Submitting ? <RefreshCw size={14} className="animate-spin" /> : <Check size={14} />}
                        <span>Confirm Phase 2 Participation Intent</span>
                      </button>
                    ) : (
                      <div className="p-3 rounded-lg border border-green-500/40 bg-green-950/30 text-green-300 text-center font-display text-xs">
                        ✓ Phase 2 intent recorded. Watch your email ({lookupResult.teamLeadEmail}) for official confirmation.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
