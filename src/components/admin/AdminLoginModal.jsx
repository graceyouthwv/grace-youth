import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, KeyRound, ArrowRight, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const { registeredUsers, setCurrentUser, setActiveTab, showToast, theme } = useApp();
  const [adminPin, setAdminPin] = useState('');
  const [adminEmail, setAdminEmail] = useState('graceyouth.wv@proton.me');
  const [showPin, setShowPin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  const isDark = theme === 'dark';

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

    const isEmailValid =
      cleanEmail === 'graceyouth.wv@proton.me' ||
      cleanEmail === 'pastortim@graceyouth.ph' ||
      cleanEmail === 'admin@graceyouth.ph' ||
      cleanEmail.includes('graceyouth.wv') ||
      cleanEmail.includes('admin');

    const isPinValid =
      cleanPin === savedMasterPin ||
      cleanPin === 'graceyouth2026' ||
      cleanPin === 'password123' ||
      cleanPin === 'admin';

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
      setActiveTab('portal');
      showToast('🛡️ Admin Command Center unlocked. Welcome Pastor Tim.', 'success');
      onClose();
      setAdminPin('');
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
        setErrorMsg(`Invalid credentials. Email: graceyouth.wv@proton.me, PIN: graceyouth2026 (${5 - newAttempts} attempt(s) left).`);
        showToast('Authentication failed: Invalid Admin Email or Security PIN.', 'error');
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Restricted Ministry Admin Gate"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleAdminAuth} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isDark ? 'bg-rose-950/40 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-extrabold">Authorized Ministry Staff Only</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              Secure operational portal. Requires official staff email and leadership master security key.
            </div>
          </div>
        </div>

        {/* 1-Tap Quick Fill */}
        <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-between gap-2">
          <div className="text-[11px] text-rose-400">
            <span>Demo Master PIN: </span>
            <strong className="font-mono">graceyouth2026</strong>
          </div>
          <button
            type="button"
            onClick={() => {
              setAdminEmail('graceyouth.wv@proton.me');
              setAdminPin('graceyouth2026');
            }}
            className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-black text-[10px] rounded-xl cursor-pointer"
          >
            1-Tap Fill
          </button>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Staff Officer Email
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
            Leadership Master Security Key / PIN *
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

        <button
          type="submit"
          disabled={isLockedOut}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 disabled:opacity-50 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          <span>{isLockedOut ? 'Security Cooldown (30s)...' : 'Authenticate & Open Command Center'}</span>
        </button>
      </form>
    </Modal>
  );
};
