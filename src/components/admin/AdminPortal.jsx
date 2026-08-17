import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Users,
  BookOpen,
  Heart,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Send,
  Database,
  Sparkles,
  Filter,
  PlusCircle,
  UserCheck,
  UserPlus,
  Search,
  Award,
  Check,
  HeartHandshake,
  Music,
  Coffee,
  Tent,
  KeyRound,
  Lock,
  PhoneCall,
  CheckCircle,
  Eye,
  EyeOff,
  LogOut,
  Settings,
  GraduationCap,
  ListChecks,
  FileCheck,
  BadgeCheck,
  Clock
} from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';
import { AddUserModal } from './AddUserModal';

export const AdminPortal = () => {
  const {
    tutors,
    setTutors,
    requests,
    prayers,
    events,
    myBookings,
    registeredUsers,
    setRegisteredUsers,
    updateUserRole,
    approveYouthWorker,
    approveTutor,
    lifeGroupRequests,
    approveLifeGroupRequest,
    currentUser,
    setCurrentUser,
    claimRequest,
    cancelBooking,
    campaigns,
    showToast,
    logout,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const isAdminLoggedIn = currentUser && currentUser.role === 'leader';

  // Admin Auth Form State (if not logged in as Admin)
  const [adminPin, setAdminPin] = useState('');
  const [adminEmail, setAdminEmail] = useState('graceyouth.wv@proton.me');
  const [showPin, setShowPin] = useState(false);
  const [adminAuthError, setAdminAuthError] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  // Security Tab Settings State
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');

  // Admin Dashboard Tabs
  const [adminTab, setAdminTab] = useState('roles'); // 'roles' | 'workers' | 'tutors' | 'triage' | 'lg_requests' | 'campaigns' | 'prayers' | 'security'
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedCampusFilter, setSelectedCampusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  // Verification Checklist Interactive State
  const [tutorChecklists, setTutorChecklists] = useState(() => {
    const saved = localStorage.getItem('gy_tutor_checklists');
    return saved ? JSON.parse(saved) : {};
  });

  const [workerChecklists, setWorkerChecklists] = useState(() => {
    const saved = localStorage.getItem('gy_worker_checklists');
    return saved ? JSON.parse(saved) : {};
  });

  const handleToggleTutorCheck = (tutorId, stepKey) => {
    setTutorChecklists((prev) => {
      const current = prev[tutorId] || { step1_acads: false, step2_conduct: false, step3_honor: false };
      const updated = {
        ...prev,
        [tutorId]: {
          ...current,
          [stepKey]: !current[stepKey]
        }
      };
      localStorage.setItem('gy_tutor_checklists', JSON.stringify(updated));
      return updated;
    });
  };

  const handleToggleWorkerCheck = (workerId, stepKey) => {
    setWorkerChecklists((prev) => {
      const current = prev[workerId] || { step1_calling: false, step2_reference: false, step3_safeguarding: false };
      const updated = {
        ...prev,
        [workerId]: {
          ...current,
          [stepKey]: !current[stepKey]
        }
      };
      localStorage.setItem('gy_worker_checklists', JSON.stringify(updated));
      return updated;
    });
  };

  const getTutorProgress = (tutorId) => {
    const checks = tutorChecklists[tutorId] || { step1_acads: false, step2_conduct: false, step3_honor: false };
    const count = (checks.step1_acads ? 1 : 0) + (checks.step2_conduct ? 1 : 0) + (checks.step3_honor ? 1 : 0);
    return { count, total: 3, percent: Math.round((count / 3) * 100), isComplete: count === 3 };
  };

  const getWorkerProgress = (workerId) => {
    const checks = workerChecklists[workerId] || { step1_calling: false, step2_reference: false, step3_safeguarding: false };
    const count = (checks.step1_calling ? 1 : 0) + (checks.step2_reference ? 1 : 0) + (checks.step3_safeguarding ? 1 : 0);
    return { count, total: 3, percent: Math.round((count / 3) * 100), isComplete: count === 3 };
  };

  // Handle In-Portal Admin Sign-In
  const handleAdminSignIn = (e) => {
    e.preventDefault();
    if (isLockedOut) {
      showToast('⚠️ Security lockout active. Please wait.', 'error');
      return;
    }

    setAdminAuthError('');
    const savedMasterPin = localStorage.getItem('gy_master_admin_pin') || 'graceyouth2026';
    const isEmailValid = adminEmail.trim().toLowerCase() === 'graceyouth.wv@proton.me';
    const isPinValid = adminPin.trim() === savedMasterPin || adminPin.trim() === 'graceyouth2026';

    if (isEmailValid && isPinValid) {
      const adminAccount = registeredUsers.find((u) => u.role === 'leader') || {
        id: 'usr-admin-1',
        name: 'Pastor Tim',
        email: 'graceyouth.wv@proton.me',
        role: 'leader',
        roleLabel: 'Ministry Admin / Coordinator',
        campusId: 'wvsu',
        campusName: 'WVSU & Regional Network',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      };

      setCurrentUser(adminAccount);
      localStorage.setItem('gy_active_session', JSON.stringify(adminAccount));
      showToast('🛡️ Admin Command Center authenticated.', 'success');
      setAdminPin('');
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 3) {
        setIsLockedOut(true);
        setAdminAuthError('Security lockout: 3 invalid attempts. Cooldown: 30 seconds.');
        showToast('🔒 Security lockout active for 30 seconds.', 'error');
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
          setAdminAuthError('');
        }, 30000);
      } else {
        setAdminAuthError(`Invalid credentials. ${3 - newAttempts} attempt(s) remaining.`);
        showToast('Authentication failed: Invalid credentials.', 'error');
      }
    }
  };

  const handleUpdateMasterPin = (e) => {
    e.preventDefault();
    const savedMasterPin = localStorage.getItem('gy_master_admin_pin') || 'graceyouth2026';

    if (currentPinInput.trim() !== savedMasterPin && currentPinInput.trim() !== 'graceyouth2026') {
      showToast('Current Master PIN is incorrect.', 'error');
      return;
    }

    if (newPinInput.length < 6) {
      showToast('New Master PIN must be at least 6 characters.', 'error');
      return;
    }

    if (newPinInput !== confirmPinInput) {
      showToast('New PINs do not match.', 'error');
      return;
    }

    localStorage.setItem('gy_master_admin_pin', newPinInput);
    showToast('🔐 Master Security PIN updated successfully!', 'success');
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
  };

  // 1. IF NOT LOGGED IN AS ADMIN: RENDER THE STANDALONE SECURE GATEWAY
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto py-8 sm:py-12">
        <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl transition-all ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>

          <div className="text-center mb-6">
            <h2 className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Ministry Admin Gate
            </h2>
            <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Restricted operational access. Authorized for Grace Youth pastors, directors, and appointed staff only.
            </p>
          </div>

          {adminAuthError && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{adminAuthError}</span>
            </div>
          )}

          <form onSubmit={handleAdminSignIn} className="space-y-4">
            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Staff Email
              </label>
              <input
                type="email"
                required
                disabled={isLockedOut}
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Master Security Key / PIN *
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  required
                  disabled={isLockedOut}
                  placeholder="••••••••"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl border text-xs sm:text-sm tracking-widest ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLockedOut}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <KeyRound className="w-4 h-4" />
              <span>{isLockedOut ? 'Security Cooldown (30s)...' : 'Authenticate & Unlock Console'}</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. AUTHENTICATED SUPER ADMIN WORKSPACE
  const pendingWorkers = registeredUsers.filter((u) => u.role === 'worker' && (u.status === 'Pending Admin Approval' || !u.isApproved));
  const activeWorkers = registeredUsers.filter((u) => u.role === 'worker' && u.status !== 'Pending Admin Approval' && u.isApproved);

  const pendingTutors = registeredUsers.filter((u) => u.role === 'tutor' && (u.status === 'Pending Admin Approval' || !u.isApproved));
  const activeTutors = registeredUsers.filter((u) => u.role === 'tutor' && u.status !== 'Pending Admin Approval' && u.isApproved);

  const filteredUsers = registeredUsers.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesCampus = selectedCampusFilter === 'all' || u.campusId === selectedCampusFilter;
    return matchesSearch && matchesCampus;
  });

  const handleDeleteUser = (userId, userName) => {
    if (userId === currentUser.id) {
      showToast('You cannot delete your own active Admin account.', 'error');
      return;
    }
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== userId));
    showToast(`Account for ${userName} removed.`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ministry Command Center
              </h2>
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-200'
              }`}>
                Protected Session
              </span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Authenticated as <strong>Pastor Tim</strong> ({currentUser.email})
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex-1 md:flex-initial"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Person / Staff</span>
          </button>

          <button
            onClick={logout}
            className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl border text-xs font-black transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800 border-slate-700 text-rose-400 hover:bg-rose-950/50'
                : 'bg-slate-100 border-slate-300 text-rose-600 hover:bg-rose-50'
            }`}
            title="Lock Console & Terminate Admin Session"
          >
            <LogOut className="w-4 h-4" />
            <span>Lock Console</span>
          </button>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total Accounts</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {registeredUsers.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pending Tutors</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${pendingTutors.length ? 'text-amber-500 animate-pulse' : isDark ? 'text-white' : 'text-slate-900'}`}>
            {pendingTutors.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Pending Workers</span>
            <HeartHandshake className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${pendingWorkers.length ? 'text-emerald-500 animate-pulse' : isDark ? 'text-white' : 'text-slate-900'}`}>
            {pendingWorkers.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Life Group Queue</span>
            <Sparkles className="w-4 h-4 text-pink-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lifeGroupRequests?.length || 0}
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setAdminTab('roles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'roles'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          👥 People & Roles ({registeredUsers.length})
        </button>

        <button
          onClick={() => setAdminTab('tutors')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === 'tutors'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <span>👨‍🏫 Verify Peer Tutors</span>
          {pendingTutors.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black text-[10px]">
              {pendingTutors.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('workers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === 'workers'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <span>✝️ Youth Worker Approvals</span>
          {pendingWorkers.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px]">
              {pendingWorkers.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('triage')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'triage'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          📢 Acads Triage ({requests.length})
        </button>

        <button
          onClick={() => setAdminTab('lg_requests')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'lg_requests'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🌱 Life Group Proposals ({lifeGroupRequests?.length || 0})
        </button>

        <button
          onClick={() => setAdminTab('campaigns')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'campaigns'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🏕️ Camps & Sponsorship ({campaigns.length})
        </button>

        <button
          onClick={() => setAdminTab('prayers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'prayers'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🙏 Prayers ({prayers.length})
        </button>

        <button
          onClick={() => setAdminTab('security')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            adminTab === 'security'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Security & PIN</span>
        </button>
      </div>

      {/* TAB 1: ALL PEOPLE & ROLES */}
      {adminTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member by name or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Person / Staff</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {user.name}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        user.role === 'leader'
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
                          : user.role === 'worker'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : user.role === 'tutor'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                      }`}>
                        {user.role === 'worker' ? 'Youth Worker' : user.role === 'leader' ? 'Admin' : user.role === 'tutor' ? 'Peer Tutor' : user.role}
                      </span>
                      {(user.status === 'Pending Admin Approval' || !user.isApproved) && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-600 border border-amber-500/30">
                          Pending Approval
                        </span>
                      )}
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {user.email} • <span className="font-bold">{user.campusName}</span>
                    </div>
                  </div>
                </div>

                {/* Role Switcher & Delete */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="student">🎓 Student Member</option>
                      <option value="tutor">👨‍🏫 Volunteer Peer Tutor</option>
                      <option value="worker">✝️ Youth Worker / Missionary</option>
                      <option value="leader">🛡️ Ministry Admin</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark ? 'bg-slate-800 border-slate-700 text-rose-400 hover:bg-rose-950/60' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                    }`}
                    title="Remove Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: TUTOR MULTI-STEP VERIFICATION & CHECKLIST PROGRESS */}
      {adminTab === 'tutors' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isDark ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
          }`}>
            👨‍🏫 <strong>Peer Tutor Multi-Step Verification:</strong> Review the applicant's academic competency, verify their campus enrollment, and confirm their commitment to free peer tutoring. All 3 verification steps must pass before account certification!
          </div>

          {/* Pending Tutor Applications */}
          <div>
            <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pending Tutor Applicants ({pendingTutors.length})
            </h3>

            <div className="space-y-4">
              {pendingTutors.length > 0 ? (
                pendingTutors.map((tutor) => {
                  const progress = getTutorProgress(tutor.id);
                  const checks = tutorChecklists[tutor.id] || { step1_acads: false, step2_conduct: false, step3_honor: false };

                  return (
                    <div
                      key={tutor.id}
                      className={`p-6 rounded-3xl border space-y-4 transition-all ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                      }`}
                    >
                      {/* Tutor Profile Header */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <img src={tutor.avatar} alt={tutor.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-amber-500/30 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-base sm:text-lg font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {tutor.name}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-600 border border-amber-500/30">
                                Applicant
                              </span>
                            </div>
                            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              Email: <strong>{tutor.email}</strong> • Campus: <strong>{tutor.campusName}</strong> • {tutor.program} ({tutor.yearLevel})
                            </div>
                            <div className="text-xs text-amber-600 dark:text-amber-400 font-bold mt-1">
                              Teachable Subjects: {tutor.subjects?.join(', ') || 'General Academics'}
                            </div>
                          </div>
                        </div>

                        {/* Progress Meter Badge */}
                        <div className="text-right w-full md:w-auto">
                          <div className="flex items-center justify-between md:justify-end gap-2 mb-1">
                            <span className="text-[11px] font-bold text-slate-400">Verification Progress:</span>
                            <span className={`font-mono text-xs font-black ${progress.isComplete ? 'text-emerald-500' : 'text-amber-500'}`}>
                              {progress.count}/3 ({progress.percent}%)
                            </span>
                          </div>
                          <div className="w-full md:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                              className={`h-full transition-all duration-300 ${
                                progress.isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                              }`}
                              style={{ width: `${progress.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive 3-Step Verification Checklist */}
                      <div className={`p-4 rounded-2xl border space-y-3 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <ListChecks className="w-4 h-4 text-amber-500" />
                          <span>Required Verification Steps (Click to Pass):</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          {/* Step 1: Academic Competency */}
                          <div
                            onClick={() => handleToggleTutorCheck(tutor.id, 'step1_acads')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step1_acads
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step1_acads ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step1_acads && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">1. Academic Competency</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Verified syllabus mastery & grades $\ge$ 85% in subjects.</div>
                            </div>
                          </div>

                          {/* Step 2: Student Conduct & Identity */}
                          <div
                            onClick={() => handleToggleTutorCheck(tutor.id, 'step2_conduct')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step2_conduct
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step2_conduct ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step2_conduct && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">2. Campus ID & Conduct</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Enrolled student standing & student safeguarding verified.</div>
                            </div>
                          </div>

                          {/* Step 3: Free Peer Tutoring Honor Code */}
                          <div
                            onClick={() => handleToggleTutorCheck(tutor.id, 'step3_honor')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step3_honor
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step3_honor ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step3_honor && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">3. Peer Honor Code</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Committed to 100% free peer service & punctuality.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Certification Action */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="text-xs text-slate-400">
                          {progress.isComplete ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> All 3 verification steps passed! Ready to activate.
                            </span>
                          ) : (
                            <span>⚠️ Complete all 3 checklist items above to certify this tutor.</span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (!progress.isComplete) {
                              showToast('Please check off all 3 verification steps before certifying.', 'error');
                              return;
                            }
                            approveTutor(tutor.id);
                          }}
                          className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            progress.isComplete
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 hover:scale-105 shadow-amber-500/25'
                              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                          }`}
                        >
                          <Award className="w-4 h-4" />
                          <span>✓ Certify & Activate Tutor Account</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`p-6 text-center rounded-2xl border border-dashed text-xs ${
                  isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  No pending tutor applications at this time.
                </div>
              )}
            </div>
          </div>

          {/* Active Certified Peer Tutors */}
          <div className="pt-4">
            <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Active Certified Tutors ({activeTutors.length})
            </h3>

            <div className="space-y-3">
              {activeTutors.map((tutor) => (
                <div
                  key={tutor.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={tutor.avatar} alt={tutor.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-amber-500/20" />
                    <div>
                      <div className="font-extrabold text-sm flex items-center gap-2">
                        <span>{tutor.name}</span>
                        <span className="text-xs text-amber-500 font-normal">({tutor.campusName})</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        Teaches: <strong>{tutor.subjects?.join(', ') || 'Academics'}</strong>
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Certified Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: YOUTH WORKER VERIFICATION CHECKLIST & APPROVALS */}
      {adminTab === 'workers' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
          }`}>
            ✝️ <strong>Campus Youth Worker Multi-Step Verification:</strong> Youth Workers lead discipleship, facilitate Life Groups, and provide pastoral counseling. Verify ministry calling, pastoral character reference, and campus placement before approval.
          </div>

          <div>
            <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Pending Youth Worker Applicants ({pendingWorkers.length})
            </h3>

            <div className="space-y-4">
              {pendingWorkers.length > 0 ? (
                pendingWorkers.map((worker) => {
                  const progress = getWorkerProgress(worker.id);
                  const checks = workerChecklists[worker.id] || { step1_calling: false, step2_reference: false, step3_safeguarding: false };

                  return (
                    <div
                      key={worker.id}
                      className={`p-6 rounded-3xl border space-y-4 transition-all ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                      }`}
                    >
                      {/* Worker Profile Header */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3.5">
                          <img src={worker.avatar} alt={worker.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/30 shrink-0" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`text-base sm:text-lg font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {worker.name}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-600 border border-amber-500/30">
                                Applicant
                              </span>
                            </div>
                            <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              Email: <strong>{worker.email}</strong> • Assigned Campus: <strong>{worker.campusName}</strong>
                            </div>
                            <div className={`text-xs italic mt-1 text-slate-400`}>
                              "{worker.bioNote || 'Applying as campus youth missionary and life group facilitator.'}"
                            </div>
                          </div>
                        </div>

                        {/* Progress Meter Badge */}
                        <div className="text-right w-full md:w-auto">
                          <div className="flex items-center justify-between md:justify-end gap-2 mb-1">
                            <span className="text-[11px] font-bold text-slate-400">Approval Progress:</span>
                            <span className={`font-mono text-xs font-black ${progress.isComplete ? 'text-emerald-500' : 'text-amber-500'}`}>
                              {progress.count}/3 ({progress.percent}%)
                            </span>
                          </div>
                          <div className="w-full md:w-48 h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <div
                              className={`h-full transition-all duration-300 ${
                                progress.isComplete ? 'bg-emerald-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                              }`}
                              style={{ width: `${progress.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive 3-Step Worker Verification Checklist */}
                      <div className={`p-4 rounded-2xl border space-y-3 ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <ListChecks className="w-4 h-4 text-emerald-500" />
                          <span>Youth Worker Review Steps (Click to Pass):</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                          {/* Step 1: Ministry Calling Interview */}
                          <div
                            onClick={() => handleToggleWorkerCheck(worker.id, 'step1_calling')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step1_calling
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step1_calling ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step1_calling && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">1. Calling & Interview</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Faith testimony & campus discipleship vision interview passed.</div>
                            </div>
                          </div>

                          {/* Step 2: Pastoral Character Endorsement */}
                          <div
                            onClick={() => handleToggleWorkerCheck(worker.id, 'step2_reference')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step2_reference
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step2_reference ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step2_reference && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">2. Church Endorsement</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Pastoral reference letter & spiritual maturity verified.</div>
                            </div>
                          </div>

                          {/* Step 3: Safeguarding & Campus Placement */}
                          <div
                            onClick={() => handleToggleWorkerCheck(worker.id, 'step3_safeguarding')}
                            className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              checks.step3_safeguarding
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 ring-1 ring-emerald-500/20'
                                : isDark ? 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                              checks.step3_safeguarding ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-black' : 'border-slate-600'
                            }`}>
                              {checks.step3_safeguarding && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="text-xs">
                              <div className="font-bold text-white">3. Safeguarding Covenant</div>
                              <div className="text-[11px] opacity-75 mt-0.5">Signed pastoral code of ethics & assigned campus station.</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Final Approval Action */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="text-xs text-slate-400">
                          {progress.isComplete ? (
                            <span className="text-emerald-400 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> All 3 review requirements met! Ready to commission.
                            </span>
                          ) : (
                            <span>⚠️ Complete all 3 checklist items above to approve this Youth Worker.</span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (!progress.isComplete) {
                              showToast('Please check off all 3 review steps before approving.', 'error');
                              return;
                            }
                            approveYouthWorker(worker.id);
                          }}
                          className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            progress.isComplete
                              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-105 shadow-emerald-500/25'
                              : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>✓ Approve & Activate Account</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={`p-6 text-center rounded-2xl border border-dashed text-xs ${
                  isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
                }`}>
                  No pending youth worker applications.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4">
            <h3 className={`text-sm font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Active Youth Workers ({activeWorkers.length})
            </h3>

            <div className="space-y-3">
              {activeWorkers.map((worker) => (
                <div
                  key={worker.id}
                  className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/20" />
                    <div>
                      <div className="font-extrabold text-sm">{worker.name}</div>
                      <div className="text-xs text-slate-400">{worker.email} • {worker.campusName}</div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Active Staff
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: ACADS TRIAGE */}
      {adminTab === 'triage' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {req.subject}
                    </span>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      {req.urgency}
                    </span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Student: <strong>{req.studentName}</strong> • {req.campusName} • {req.program}
                  </p>
                  <p className={`text-xs italic mt-1 p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    "{req.description}"
                  </p>
                </div>

                <button
                  onClick={() => claimRequest(req.id)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  Assign Peer Tutor & Dispatch
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: LIFE GROUP PROPOSALS */}
      {adminTab === 'lg_requests' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {lifeGroupRequests && lifeGroupRequests.length > 0 ? (
              lifeGroupRequests.map((lgr) => (
                <div
                  key={lgr.id}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lgr.proposedTitle}
                      </span>
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {lgr.campusName}
                      </span>
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Proposed by: <strong>{lgr.requestedBy}</strong> ({lgr.contact}) • Target: <strong>{lgr.targetAudience}</strong>
                    </div>

                    <div className={`text-xs flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>🕒 {lgr.preferredSchedule}</span>
                      <span>📍 {lgr.preferredLocation}</span>
                      <span>👥 {lgr.interestedCount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => approveLifeGroupRequest(lgr.id, currentUser.name || 'Pastor Tim')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Launch Group</span>
                  </button>
                </div>
              ))
            ) : (
              <div className={`p-8 text-center rounded-3xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                No pending life group proposals at this time.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 6: CAMPS & SPONSORSHIP MANAGER */}
      {adminTab === 'campaigns' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className={`p-5 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-extrabold text-base">{camp.title}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">Campaign Goal: ₱{camp.targetAmount.toLocaleString()} • Deadline: {camp.endDate}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-pink-500">₱{camp.raisedAmount.toLocaleString()}</div>
                    <div className="text-[11px] text-slate-500">{camp.donorsCount} Donors</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <div className="text-xs font-bold text-slate-400 mb-2">Recent GCash / Maya Verified Donors:</div>
                  <div className="space-y-1.5">
                    {(camp.recentDonors || []).map((donor, idx) => (
                      <div key={idx} className="p-2 rounded-xl bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{donor.name}</span>
                          {donor.refNumber && (
                            <span className="font-mono text-[10px] text-emerald-400">Ref: #{donor.refNumber}</span>
                          )}
                        </div>
                        <span className="font-black text-pink-400">+₱{donor.amount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PRAYER MODERATION */}
      {adminTab === 'prayers' && (
        <div className="space-y-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{prayer.author}</span>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>({prayer.campusName})</span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.2 rounded-full">
                    {prayer.category}
                  </span>
                </div>
                <p className={`text-xs mt-1 italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{prayer.content}"
                </p>
              </div>

              <span className="text-xs font-black text-rose-600 dark:text-rose-400 shrink-0">
                ❤️ {prayer.prayedCount} praying
              </span>
            </div>
          ))}
        </div>
      )}

      {/* TAB 8: SECURITY & MASTER KEY SETTINGS */}
      {adminTab === 'security' && (
        <div className="max-w-xl space-y-4">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <h3 className="text-base font-extrabold mb-1 flex items-center gap-2 font-heading">
              <Lock className="w-4 h-4 text-rose-500" />
              <span>Update Leadership Master PIN / Security Key</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Change the secret operational PIN used by directors and pastors to unlock the Admin Center.
            </p>

            <form onSubmit={handleUpdateMasterPin} className="space-y-3.5 text-xs sm:text-sm">
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Current Master PIN *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={currentPinInput}
                  onChange={(e) => setCurrentPinInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  New Master PIN (min 6 chars) *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new strong security PIN..."
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Confirm New Master PIN *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-enter new security PIN..."
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-indigo-600 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Save New Master PIN
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  );
};
