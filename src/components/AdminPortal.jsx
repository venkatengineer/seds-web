import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Lock, Unlock, Search, Download, CheckCircle2, 
  XCircle, AlertCircle, ExternalLink, FileText, Filter, 
  RefreshCw, Settings, Users, Check, ChevronRight, Eye,
  ArrowDownToLine, ShieldAlert, Award
} from 'lucide-react';
import { EVENT_CONFIG } from '../config/event';

export default function AdminPortal({ isOpen, onClose }) {
  const [adminKey, setAdminKey] = useState(() => {
    try {
      return sessionStorage.getItem('seds_admin_key') || '';
    } catch {
      return '';
    }
  });
  const [keyInput, setKeyInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Data states
  const [registrations, setRegistrations] = useState([]);
  const [stats, setStats] = useState(null);
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Filters & Tabs
  const [activeTab, setActiveTab] = useState('registrations'); // 'registrations' | 'settings'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedReg, setSelectedReg] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  // Settings editing state
  const [settingsForm, setSettingsForm] = useState({
    registration_phase_1_deadline: '',
    shortlist_capacity: 30,
    phase_2_fee_per_person: 300,
    ppt_template_url: '',
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Fetch registrations & stats with authenticated key
  const fetchData = useCallback(async (keyToUse = adminKey) => {
    if (!keyToUse) return;
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const url = new URL('/api/admin/registrations', window.location.origin);
      if (statusFilter && statusFilter !== 'ALL') {
        url.searchParams.set('status', statusFilter);
      }
      if (searchQuery.trim()) {
        url.searchParams.set('search', searchQuery.trim());
      }

      const res = await fetch(url.toString(), {
        headers: {
          'x-admin-key': keyToUse,
        },
      });

      if (res.status === 401) {
        setIsAuthenticated(false);
        setAuthError('Invalid administrator credentials.');
        sessionStorage.removeItem('seds_admin_key');
        return;
      }

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setRegistrations(data.registrations || []);
        setStats(data.stats || null);
        if (data.settings) {
          setSettings(data.settings);
          setSettingsForm({
            registration_phase_1_deadline: data.settings.registration_phase_1_deadline || '',
            shortlist_capacity: data.settings.shortlist_capacity || 30,
            phase_2_fee_per_person: data.settings.phase_2_fee_per_person || 300,
            ppt_template_url: data.settings.ppt_template_url || '',
          });
        }
        setIsAuthenticated(true);
        try {
          sessionStorage.setItem('seds_admin_key', keyToUse);
        } catch (_) {}
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
      setStatusMessage({ type: 'error', text: 'Error connecting to registration engine.' });
    } finally {
      setIsLoading(false);
    }
  }, [adminKey, statusFilter, searchQuery]);

  // Attempt auto-login if key exists in session
  useEffect(() => {
    if (isOpen && adminKey && !isAuthenticated) {
      fetchData(adminKey);
    }
  }, [isOpen, adminKey, isAuthenticated, fetchData]);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    setIsVerifying(true);
    setAuthError('');
    try {
      const res = await fetch('/api/admin/registrations?limit=1', {
        headers: {
          'x-admin-key': keyInput.trim(),
        },
      });

      if (res.ok) {
        setAdminKey(keyInput.trim());
        setIsAuthenticated(true);
        sessionStorage.setItem('seds_admin_key', keyInput.trim());
        fetchData(keyInput.trim());
      } else {
        setAuthError('Invalid administrator access key.');
      }
    } catch (err) {
      setAuthError('Connection error. Verify the API server is operational.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setAdminKey('');
    setIsAuthenticated(false);
    setKeyInput('');
    sessionStorage.removeItem('seds_admin_key');
  };

  // Update Status of a registration
  const handleUpdateStatus = async (referenceId, newStatus) => {
    setUpdatingId(referenceId);
    setStatusMessage(null);
    try {
      const res = await fetch(`/api/admin/registrations/${referenceId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatusMessage({
          type: 'success',
          text: `Team ${referenceId} status successfully transitioned to ${newStatus}.`,
        });
        // Optimistically update list
        setRegistrations((prev) =>
          prev.map((reg) => (reg.referenceId === referenceId ? { ...reg, status: newStatus } : reg))
        );
        if (selectedReg && selectedReg.referenceId === referenceId) {
          setSelectedReg((prev) => ({ ...prev, status: newStatus }));
        }
        // Refresh full stats
        fetchData();
      } else {
        throw new Error(data.error || 'Failed to update status.');
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setUpdatingId(null);
    }
  };

  // Export CSV
  const handleExportCSV = async () => {
    try {
      const res = await fetch('/api/admin/export', {
        headers: {
          'x-admin-key': adminKey,
        },
      });

      if (!res.ok) throw new Error('Export failed.');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orbital26_manifest_${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to download CSV export.' });
    }
  };

  // Save Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setStatusMessage(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': adminKey,
        },
        body: JSON.stringify(settingsForm),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(data.settings);
        setStatusMessage({ type: 'success', text: 'Mission parameters updated successfully.' });
      } else {
        throw new Error(data.error || 'Failed to update settings.');
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: err.message });
    } finally {
      setIsSavingSettings(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 backdrop-blur-2xl bg-black/90 animate-in fade-in duration-200">
      
      {/* Outer Shell */}
      <div className="relative w-full max-w-7xl max-h-[94vh] flex flex-col bg-[#05020D] border border-white/10 rounded-2xl shadow-2xl shadow-purple-950/40 overflow-hidden text-[#F7F5FF]">
        
        {/* Top Operational Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#020107]/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            <div>
              <div className="font-display text-[10px] tracking-[0.25em] uppercase text-[#8B5CF6] font-semibold">
                // SEDS REC MISSION CONTROL
              </div>
              <h2 className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-[#F7F5FF]">
                {EVENT_CONFIG.name} REGISTRATION TELEMETRY
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-display tracking-wider uppercase text-[#A6A0B8] hover:text-white border border-white/10 rounded-lg hover:border-white/20 transition-all"
              >
                <Lock size={12} />
                <span>Lock Console</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-[#A6A0B8] hover:text-white rounded-lg hover:bg-white/5 transition-all"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6] mb-6 shadow-inner">
              <Lock size={28} />
            </div>
            
            <h3 className="font-editorial text-2xl font-bold text-[#F7F5FF] mb-2">
              RESTRICTED FLIGHT DESK
            </h3>
            <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed mb-6 font-light">
              Organizer authorization required to access candidate manifests, technical evaluation rosters, and Phase 2 clearance controls.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div>
                <input
                  type="password"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder="Enter administrator passkey..."
                  autoFocus
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 focus:border-[#8B5CF6] rounded-xl text-sm font-mono text-center tracking-widest text-[#F7F5FF] placeholder:text-[#A6A0B8]/40 outline-none transition-all"
                />
              </div>

              {authError && (
                <div className="flex items-center justify-center gap-2 text-xs text-rose-400 font-mono">
                  <AlertCircle size={14} />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !keyInput.trim()}
                className="w-full py-3 bg-[#7C3AED] hover:bg-[#8B5CF6] disabled:opacity-50 text-white font-display text-xs uppercase tracking-[0.2em] font-semibold rounded-xl transition-all shadow-lg shadow-purple-900/40"
              >
                {isVerifying ? 'Verifying Telemetry Credentials...' : 'Authenticate Access'}
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* KPI Status Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-6 bg-black/30 border-b border-white/[0.06]">
              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8]">
                  TOTAL REGISTRATIONS
                </div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F5FF] mt-1">
                  {stats ? stats.totalRegistrations : '—'}
                </div>
                <div className="font-mono text-[10px] text-[#A6A0B8]/60 mt-0.5">
                  Phase 1 Database Records
                </div>
              </div>

              <div className="p-3.5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8]">
                  PHASE 1 SUBMITTED
                </div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-amber-400 mt-1">
                  {stats ? stats.phase1Submitted : '—'}
                </div>
                <div className="font-mono text-[10px] text-[#A6A0B8]/60 mt-0.5">
                  Awaiting Evaluation
                </div>
              </div>

              <div className="p-3.5 bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 rounded-xl relative overflow-hidden">
                <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#C084FC] flex items-center justify-between">
                  <span>SHORTLISTED TEAMS</span>
                  <span className="font-mono text-[10px]">
                    {stats ? stats.shortlisted : 0} / {settings?.shortlist_capacity || 30}
                  </span>
                </div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F5FF] mt-1">
                  {stats ? stats.shortlisted : '—'}
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[#8B5CF6] h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, ((stats ? stats.shortlisted : 0) / (settings?.shortlist_capacity || 30)) * 100)}%`
                    }}
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                <div className="font-display text-[10px] tracking-[0.2em] uppercase text-emerald-400">
                  PHASE 2 CONFIRMED
                </div>
                <div className="font-editorial text-2xl sm:text-3xl font-bold text-emerald-300 mt-1">
                  {stats ? stats.phase2Registered : '—'}
                </div>
                <div className="font-mono text-[10px] text-emerald-400/60 mt-0.5">
                  ₹300/person Shortlist Access
                </div>
              </div>
            </div>

            {/* Navigation Tabs & Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 px-6 py-3 border-b border-white/[0.06] bg-[#020107]/50">
              {/* Tab Switcher */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('registrations')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all ${
                    activeTab === 'registrations'
                      ? 'bg-[#7C3AED] text-white font-semibold shadow-md'
                      : 'text-[#A6A0B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Registrations Manifest ({registrations.length})
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all ${
                    activeTab === 'settings'
                      ? 'bg-[#7C3AED] text-white font-semibold shadow-md'
                      : 'text-[#A6A0B8] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Mission Parameters
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => fetchData()}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-xs font-display tracking-wider uppercase text-[#A6A0B8] hover:text-white rounded-lg border border-white/10 transition-all"
                  title="Refresh Telemetry"
                >
                  <RefreshCw size={13} className={isLoading ? 'animate-spin' : ''} />
                  <span className="hidden sm:inline">Refresh</span>
                </button>
                
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-display tracking-wider uppercase rounded-lg border border-emerald-500/30 transition-all"
                >
                  <ArrowDownToLine size={13} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {statusMessage && (
              <div className={`px-6 py-2.5 text-xs font-mono flex items-center justify-between border-b ${
                statusMessage.type === 'error'
                  ? 'bg-rose-950/40 text-rose-300 border-rose-800/40'
                  : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
              }`}>
                <span>{statusMessage.text}</span>
                <button onClick={() => setStatusMessage(null)} className="hover:text-white">
                  <X size={13} />
                </button>
              </div>
            )}

            {/* TAB 1: REGISTRATIONS MANIFEST */}
            {activeTab === 'registrations' && (
              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                
                {/* Left/Main Column: Search, Filter, and Table */}
                <div className="flex-1 flex flex-col overflow-hidden border-r border-white/[0.06]">
                  {/* Search & Filter Toolbar */}
                  <div className="p-4 border-b border-white/[0.06] bg-black/20 flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A6A0B8]" />
                      <input
                        type="text"
                        placeholder="Search by team name, reference ID, lead name, or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-[#F7F5FF] placeholder:text-[#A6A0B8]/50 focus:border-[#8B5CF6] outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs font-display uppercase tracking-wider">
                      {['ALL', 'PHASE_1_SUBMITTED', 'SHORTLISTED', 'PHASE_2_REGISTERED', 'REJECTED'].map((st) => (
                        <button
                          key={st}
                          onClick={() => setStatusFilter(st)}
                          className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap transition-all ${
                            statusFilter === st
                              ? 'bg-white/15 text-white font-semibold'
                              : 'text-[#A6A0B8] hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {st.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Registrations List */}
                  <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
                    {registrations.length === 0 ? (
                      <div className="p-12 text-center text-[#A6A0B8] font-mono text-xs">
                        {isLoading ? 'Loading candidate manifest...' : 'No registrations match the selected criteria.'}
                      </div>
                    ) : (
                      registrations.map((reg) => {
                        const isSelected = selectedReg && selectedReg.referenceId === reg.referenceId;
                        return (
                          <div
                            key={reg.id || reg.referenceId}
                            onClick={() => setSelectedReg(reg)}
                            className={`p-4 hover:bg-white/[0.02] cursor-pointer transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                              isSelected ? 'bg-purple-950/20 border-l-2 border-[#8B5CF6]' : ''
                            }`}
                          >
                            {/* Left Meta */}
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5">
                                <span className="font-mono text-xs text-[#8B5CF6] font-semibold bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/20">
                                  {reg.referenceId}
                                </span>
                                <h4 className="font-editorial text-base font-bold text-[#F7F5FF]">
                                  {reg.teamName}
                                </h4>
                                <span className="text-[10px] font-mono text-[#A6A0B8] bg-white/5 px-2 py-0.5 rounded">
                                  {reg.teamSize} Members
                                </span>
                              </div>

                              <div className="text-xs text-[#A6A0B8] flex flex-wrap items-center gap-x-4 gap-y-1 font-sans">
                                <span>Lead: <strong className="text-white font-medium">{reg.teamLead}</strong></span>
                                <span>•</span>
                                <span className="font-mono text-[11px]">{reg.teamLeadEmail}</span>
                                <span>•</span>
                                <span className="text-[#C084FC]">{reg.domain}</span>
                              </div>

                              <div className="text-xs text-[#A6A0B8]/80 italic line-clamp-1">
                                "{reg.projectTitle}"
                              </div>
                            </div>

                            {/* Right Status & Actions */}
                            <div className="flex items-center gap-3 shrink-0">
                              <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                                reg.status === 'SHORTLISTED'
                                  ? 'bg-[#8B5CF6]/20 text-[#C084FC] border-[#8B5CF6]/40'
                                  : reg.status === 'PHASE_2_REGISTERED'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                  : reg.status === 'REJECTED'
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}>
                                {reg.status.replace(/_/g, ' ')}
                              </span>

                              {/* Quick Shortlist / Action Dropdown or Buttons */}
                              {reg.status !== 'SHORTLISTED' && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateStatus(reg.referenceId, 'SHORTLISTED');
                                  }}
                                  disabled={updatingId === reg.referenceId}
                                  className="px-2.5 py-1 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/25 border border-[#8B5CF6]/40 text-[#C084FC] text-[11px] font-display uppercase tracking-wider rounded transition-all flex items-center gap-1"
                                  title="Shortlist for Phase 2"
                                >
                                  <Award size={12} />
                                  <span>Shortlist</span>
                                </button>
                              )}

                              <ChevronRight size={16} className="text-[#A6A0B8]/40" />
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Column: Detailed Inspector Drawer */}
                {selectedReg ? (
                  <div className="w-full md:w-96 lg:w-[420px] bg-[#020107] overflow-y-auto p-6 space-y-6 shrink-0 border-t md:border-t-0 md:border-l border-white/[0.08]">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 border-b border-white/[0.08] pb-4">
                      <div>
                        <div className="font-mono text-xs text-[#8B5CF6] font-semibold">
                          {selectedReg.referenceId}
                        </div>
                        <h3 className="font-editorial text-xl font-bold text-[#F7F5FF] mt-0.5">
                          {selectedReg.teamName}
                        </h3>
                        <div className="text-[11px] font-mono text-[#A6A0B8] mt-0.5">
                          Registered: {new Date(selectedReg.createdAt).toLocaleDateString()} {new Date(selectedReg.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedReg(null)}
                        className="text-[#A6A0B8] hover:text-white p-1"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Status Management Box */}
                    <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-3">
                      <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8]">
                        TELEMETRY CLEARANCE STATUS
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleUpdateStatus(selectedReg.referenceId, 'SHORTLISTED')}
                          disabled={updatingId === selectedReg.referenceId || selectedReg.status === 'SHORTLISTED'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                            selectedReg.status === 'SHORTLISTED'
                              ? 'bg-[#8B5CF6] text-white font-semibold'
                              : 'bg-[#8B5CF6]/10 text-[#C084FC] hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30'
                          }`}
                        >
                          <CheckCircle2 size={13} />
                          <span>Shortlist (~30)</span>
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(selectedReg.referenceId, 'PHASE_2_REGISTERED')}
                          disabled={updatingId === selectedReg.referenceId || selectedReg.status === 'PHASE_2_REGISTERED'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                            selectedReg.status === 'PHASE_2_REGISTERED'
                              ? 'bg-emerald-600 text-white font-semibold'
                              : 'bg-emerald-950/30 text-emerald-300 hover:bg-emerald-950/50 border border-emerald-500/30'
                          }`}
                        >
                          <Check size={13} />
                          <span>Phase 2 Confirmed</span>
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(selectedReg.referenceId, 'PHASE_1_SUBMITTED')}
                          disabled={updatingId === selectedReg.referenceId || selectedReg.status === 'PHASE_1_SUBMITTED'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all ${
                            selectedReg.status === 'PHASE_1_SUBMITTED'
                              ? 'bg-amber-600 text-white font-semibold'
                              : 'bg-white/5 text-[#A6A0B8] hover:text-white border border-white/10'
                          }`}
                        >
                          Reset Phase 1
                        </button>

                        <button
                          onClick={() => handleUpdateStatus(selectedReg.referenceId, 'REJECTED')}
                          disabled={updatingId === selectedReg.referenceId || selectedReg.status === 'REJECTED'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-display tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                            selectedReg.status === 'REJECTED'
                              ? 'bg-rose-700 text-white font-semibold'
                              : 'bg-rose-950/30 text-rose-300 hover:bg-rose-950/50 border border-rose-500/30'
                          }`}
                        >
                          <XCircle size={13} />
                          <span>Reject</span>
                        </button>
                      </div>
                    </div>

                    {/* Project Proposal */}
                    <div className="space-y-3">
                      <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8]">
                        PROJECT PROPOSAL
                      </div>
                      
                      <div className="p-4 bg-white/[0.02] border border-white/10 rounded-xl space-y-2">
                        <div className="text-xs font-mono text-[#C084FC]">
                          Domain: {selectedReg.domain}
                        </div>
                        <h4 className="font-editorial text-lg font-bold text-white">
                          {selectedReg.projectTitle}
                        </h4>
                        <p className="font-sans text-xs text-[#A6A0B8] leading-relaxed font-light">
                          {selectedReg.projectDescription}
                        </p>
                      </div>
                    </div>

                    {/* Files & Presentation Deck */}
                    <div className="space-y-2">
                      <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8]">
                        TECHNICAL PRESENTATION DECK
                      </div>

                      {selectedReg.pptFile && selectedReg.pptFile.url ? (
                        <a
                          href={selectedReg.pptFile.url}
                          download
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between p-3 bg-[#8B5CF6]/10 hover:bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded-xl text-xs font-mono text-[#F7F5FF] transition-all group"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileText size={16} className="text-[#C084FC] shrink-0" />
                            <div className="truncate">
                              <div className="font-medium truncate">{selectedReg.pptFile.originalName}</div>
                              <div className="text-[10px] text-[#A6A0B8]">
                                {((selectedReg.pptFile.size || 0) / 1024 / 1024).toFixed(2)} MB • Download .pptx
                              </div>
                            </div>
                          </div>
                          <Download size={14} className="text-[#C084FC] group-hover:translate-y-0.5 transition-transform shrink-0" />
                        </a>
                      ) : (
                        <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-xs font-mono text-[#A6A0B8]">
                          No uploaded file found.
                        </div>
                      )}

                      {selectedReg.pptTemplateLink && (
                        <a
                          href={selectedReg.pptTemplateLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-xs font-mono text-[#8B5CF6] hover:text-[#C084FC] transition-colors pt-1"
                        >
                          <ExternalLink size={12} />
                          <span className="truncate">Deck Link: {selectedReg.pptTemplateLink}</span>
                        </a>
                      )}
                    </div>

                    {/* Crew Roster (3 or 4 members) */}
                    <div className="space-y-3">
                      <div className="font-display text-[10px] tracking-[0.2em] uppercase text-[#A6A0B8] flex items-center justify-between">
                        <span>CREW ROSTER ({selectedReg.teamSize} MEMBERS)</span>
                        <span className="font-mono text-[10px] text-[#C084FC]">
                          Fee: ₹{selectedReg.teamSize * 300}
                        </span>
                      </div>

                      {/* Lead */}
                      <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-sans text-xs font-semibold text-white">
                            {selectedReg.teamLead}
                          </span>
                          <span className="text-[9px] font-mono uppercase bg-[#8B5CF6]/20 text-[#C084FC] px-1.5 py-0.5 rounded">
                            TEAM LEAD
                          </span>
                        </div>
                        <div className="font-mono text-[11px] text-[#A6A0B8]">
                          {selectedReg.teamLeadEmail} • {selectedReg.phone}
                        </div>
                        <div className="text-[11px] text-[#A6A0B8]/80 font-sans">
                          {selectedReg.department} • Year {selectedReg.year}
                        </div>
                      </div>

                      {/* Dynamic Members */}
                      {Array.isArray(selectedReg.members) && selectedReg.members.map((m, idx) => (
                        <div key={idx} className="p-3 bg-white/[0.02] border border-white/10 rounded-xl space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-sans text-xs font-semibold text-white">
                              {m.name || `Member ${idx + 1}`}
                            </span>
                            <span className="text-[9px] font-mono uppercase bg-white/10 text-[#A6A0B8] px-1.5 py-0.5 rounded">
                              MEMBER {idx + 1}
                            </span>
                          </div>
                          <div className="font-mono text-[11px] text-[#A6A0B8]">
                            {m.email}
                          </div>
                          <div className="text-[11px] text-[#A6A0B8]/80 font-sans">
                            {m.department} • Year {m.year}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                ) : (
                  <div className="hidden md:flex flex-col items-center justify-center p-12 text-[#A6A0B8] text-center w-80 lg:w-96 shrink-0 font-mono text-xs border-l border-white/[0.08]">
                    <FileText size={32} className="text-white/20 mb-3" />
                    <span>Select any registration from the manifest to inspect candidate credentials and update clearance.</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: MISSION PARAMETERS / SETTINGS */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full space-y-6">
                <div>
                  <h3 className="font-editorial text-2xl font-bold text-[#F7F5FF]">
                    MISSION PARAMETERS
                  </h3>
                  <p className="font-sans text-xs text-[#A6A0B8] mt-1">
                    Configure real-time event constraints, registration deadlines, and evaluation quotas.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="font-display text-xs tracking-wider uppercase text-[#A6A0B8]">
                      Phase 1 Deadline (ISO Timestamp)
                    </label>
                    <input
                      type="text"
                      value={settingsForm.registration_phase_1_deadline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, registration_phase_1_deadline: e.target.value })}
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-white focus:border-[#8B5CF6] outline-none"
                    />
                    <p className="text-[10px] text-[#A6A0B8]/60 font-mono">
                      Controls the astronomical launch countdown timer on the main site.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-display text-xs tracking-wider uppercase text-[#A6A0B8]">
                        Shortlist Target Capacity
                      </label>
                      <input
                        type="number"
                        value={settingsForm.shortlist_capacity}
                        onChange={(e) => setSettingsForm({ ...settingsForm, shortlist_capacity: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-white focus:border-[#8B5CF6] outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-display text-xs tracking-wider uppercase text-[#A6A0B8]">
                        Phase 2 Fee (₹ per person)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.phase_2_fee_per_person}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phase_2_fee_per_person: Number(e.target.value) })}
                        className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-white focus:border-[#8B5CF6] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-display text-xs tracking-wider uppercase text-[#A6A0B8]">
                      Standard PPT Template URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.ppt_template_url}
                      onChange={(e) => setSettingsForm({ ...settingsForm, ppt_template_url: e.target.value })}
                      className="w-full px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-white focus:border-[#8B5CF6] outline-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="px-6 py-2.5 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white font-display text-xs uppercase tracking-wider font-semibold rounded-xl transition-all shadow-lg"
                    >
                      {isSavingSettings ? 'Saving Parameters...' : 'Update Mission Parameters'}
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
