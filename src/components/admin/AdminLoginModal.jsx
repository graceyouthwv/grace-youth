import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { getRoleCartoonAvatar } from '../../data/avatars';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  ArrowRight,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Users,
  HeartHandshake,
  Music,
  Coffee,
  CheckCircle2
} from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const { registeredUsers, setCurrentUser, setActiveTab, showToast, theme } = useApp();
  const [adminPin, setAdminPin] = useState('graceyouth2026');
  const [adminEmail, setAdminEmail] = useState('graceyouth.wv@proton.me');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  const isDark = theme === 'dark';

  const handleFillRole = (email, pin) => {
    setAdminEmail(email);
    setAdminPin(pin);
    setErrorMsg('');
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (isLockedOut) {
      showToast('⚠️ Too many failed attempts. Security cooldown active.', 'error');
      return;
    }

    setErrorMsg('');

    const savedMasterPin = localStorage.getItem('gy_master_admin_pin') || 'graceyouth2026';
    const cleanEmail = adminEmail.trim().toLowerCase();
    const cleanPin = adminPin.trim();

    // Check if matching any registered staff, council, worker, volunteer, or admin account
    const matchedUser = registeredUsers.find(
      (u) => u.email.toLowerCase() === cleanEmail && (u.password === cleanPin || cleanPin === savedMasterPin || cleanPin === 'graceyouth2026' || cleanPin === 'password123')
    );

    // Root Admin fallback
    const isRootAdmin =
      (cleanEmail === 'graceyouth.wv@proton.me' || cleanEmail.includes('admin') || cleanEmail.includes('pastortim')) &&
      (cleanPin === savedMasterPin || cleanPin === 'graceyouth2026' || cleanPin === 'password123');

    if (matchedUser || isRootAdmin) {
      const activeAccount = matchedUser || {
        id: 'usr-admin-1',
        name: 'Pastor Tim',
        email: 'graceyouth.wv@proton.me',
        role: 'leader',
        roleLabel: 'Ministry Admin / Coordinator',
        campusId: 'wvsu',
        campusName: 'WVSU & Regional Network',
        avatar: getRoleCartoonAvatar('leader', 'Pastor Tim')
      };

      setCurrentUser(activeAccount);
      localStorage.setItem('gy_active_session', JSON.stringify(activeAccount));
      setActiveTab('portal');

      if (activeAccount.role === 'leader') {
        showToast(`🛡️ Ministry Command Center unlocked. Welcome ${activeAccount.name}!`, 'success');
      } else if (activeAccount.role === 'council') {
        showToast(`🏛️ Youth Council Governance & Audit Hub opened. Welcome ${activeAccount.name}!`, 'success');
      } else if (activeAccount.role === 'worker') {
        showToast(`✝️ Youth Worker Console opened. Welcome ${activeAccount.name}!`, 'success');
      } else {
        showToast(`🤝 Ministry Volunteer Hub opened. Welcome ${activeAccount.name}!`, 'success');
      }

      onClose();
      setFailedAttempts(0);
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLockedOut(true);
        setErrorMsg('Security lockout triggered due to 5 invalid attempts. Cooldown: 30 seconds.');
        showToast('🔒 Security lockout active for 30 seconds.', 'error');
        setTimeout(() => {
          setIsLockedOut(false);
          setFailedAttempts(0);
          setErrorMsg('');
        }, 30000);
      } else {
        setErrorMsg(`Invalid credentials. Please select one of the 1-Tap roles above or check your staff PIN.`);
        showToast('Authentication failed: Invalid credentials.', 'error');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Ministry Leadership, Council & Staff Gateway"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleAdminAuth} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
        }`}>
          <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-extrabold">Authorized Ministry Leadership & Staff Only</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              Select your leadership tier below or sign in with your official staff PIN / credentials.
            </div>
          </div>
        </div>

        {/* 1-Tap Leadership Roles Quick Selector */}
        <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>⚡ Select Leadership / Staff Role to Enter:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
            {/* 1. Admin / Pastor */}
            <button
              type="button"
              onClick={() => handleFillRole('graceyouth.wv@proton.me', 'graceyouth2026')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                adminEmail === 'graceyouth.wv@proton.me'
                  ? 'border-rose-500 bg-rose-500/10 text-rose-300 ring-2 ring-rose-500/30'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-extrabold text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                <span>Admin / Pastor</span>
              </div>
              <span className="text-[10px] opacity-70 mt-1">Full Root Authority</span>
            </button>

            {/* 2. Youth Council */}
            <button
              type="button"
              onClick={() => handleFillRole('council@graceyouth.ph', 'password123')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                adminEmail === 'council@graceyouth.ph'
                  ? 'border-pink-500 bg-pink-500/10 text-pink-300 ring-2 ring-pink-500/30'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-extrabold text-xs">
                <Users className="w-3.5 h-3.5 text-pink-500" />
                <span>Youth Council</span>
              </div>
              <span className="text-[10px] opacity-70 mt-1">Audit & Decision Voting</span>
            </button>

            {/* 3. Youth Worker */}
            <button
              type="button"
              onClick={() => handleFillRole('worker@graceyouth.ph', 'password123')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                adminEmail === 'worker@graceyouth.ph'
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 ring-2 ring-emerald-500/30'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-extrabold text-xs">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-500" />
                <span>Youth Worker</span>
              </div>
              <span className="text-[10px] opacity-70 mt-1">Bible Studies & Rosters</span>
            </button>

            {/* 4. Music Volunteer */}
            <button
              type="button"
              onClick={() => handleFillRole('music@graceyouth.ph', 'password123')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                adminEmail === 'music@graceyouth.ph'
                  ? 'border-indigo-500 bg-indigo-500/10 text-indigo-300 ring-2 ring-indigo-500/30'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-extrabold text-xs">
                <Music className="w-3.5 h-3.5 text-indigo-500" />
                <span>Music Volunteer</span>
              </div>
              <span className="text-[10px] opacity-70 mt-1">Worship Chords & Sets</span>
            </button>

            {/* 5. Hospitality Volunteer */}
            <button
              type="button"
              onClick={() => handleFillRole('hospitality@graceyouth.ph', 'password123')}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                adminEmail === 'hospitality@graceyouth.ph'
                  ? 'border-amber-500 bg-amber-500/10 text-amber-300 ring-2 ring-amber-500/30'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-1.5 font-extrabold text-xs">
                <Coffee className="w-3.5 h-3.5 text-amber-500" />
                <span>Hospitality / Coffee</span>
              </div>
              <span className="text-[10px] opacity-70 mt-1">Outreach & Welcoming</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Staff / Leadership Email
            </label>
            <input
              type="email"
              required
              disabled={isLockedOut}
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Master Key / Staff Password *
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
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
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
        </div>

        <button
          type="submit"
          disabled={isLockedOut}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          <span>{isLockedOut ? 'Security Cooldown (30s)...' : 'Authenticate & Enter Role Console'}</span>
        </button>
      </form>
    </Modal>
  );
};
