import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, KeyRound, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

export const AdminLoginModal = ({ isOpen, onClose }) => {
  const { registeredUsers, setCurrentUser, setActiveTab, showToast, theme } = useApp();
  const [adminPin, setAdminPin] = useState('');
  const [adminEmail, setAdminEmail] = useState('graceyouth.wv@proton.me');
  const [errorMsg, setErrorMsg] = useState('');
  const isDark = theme === 'dark';

  const handleAdminAuth = (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Master Admin PIN or Password verification
    if (adminPin === 'graceyouth2026' || adminPin === 'password123' || adminPin === 'admin2026') {
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
      setActiveTab('admin');
      showToast('🛡️ Admin Command Center unlocked! Welcome Pastor Tim.', 'success');
      onClose();
      setAdminPin('');
    } else {
      setErrorMsg('Invalid Admin Master PIN. Please verify your administrative credentials.');
      showToast('Authentication failed: Invalid Admin PIN.', 'error');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Dedicated Ministry Admin Gate"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleAdminAuth} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
          isDark ? 'bg-rose-950/40 border-rose-500/30 text-rose-200' : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <ShieldCheck className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-extrabold">Restricted Ministry Access</div>
            <div className="text-[11px] opacity-90 mt-0.5">
              This portal is separated from student logins. Authorized for Grace Youth campus pastors, coordinators, and directors only.
            </div>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Admin Officer Email
          </label>
          <input
            type="email"
            required
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Admin Master Key / PIN *
          </label>
          <input
            type="password"
            required
            placeholder="Enter Master Security Key or PIN..."
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm tracking-widest ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
            <span>Demo PIN: <strong className="font-mono text-indigo-500">graceyouth2026</strong></span>
            <button
              type="button"
              onClick={() => setAdminPin('graceyouth2026')}
              className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
            >
              1-Tap Fill
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <KeyRound className="w-4 h-4" />
          <span>Authorize & Enter Admin Center</span>
        </button>
      </form>
    </Modal>
  );
};
