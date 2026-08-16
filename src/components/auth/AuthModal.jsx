import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Lock, Mail, User, School, ArrowRight, BookOpen, GraduationCap, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register, showToast, theme } = useApp();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form State (Public registration ONLY for Student or Tutor Volunteer)
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [role, setRole] = useState('student');
  const [campusId, setCampusId] = useState('upv');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('1st Year');

  const isDark = theme === 'dark';

  const handleFillDemo = (email, password) => {
    setLoginEmail(email);
    setLoginPassword(password);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      showToast('Please enter your email and password.', 'error');
      return;
    }

    const success = login(loginEmail, loginPassword);
    if (success) {
      onClose();
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !registerEmail.trim() || !registerPassword.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    const success = await register({
      name,
      email: registerEmail,
      password: registerPassword,
      role: role === 'tutor' ? 'tutor' : 'student',
      campusId,
      campusName: campusObj?.name || 'UP Visayas',
      program,
      yearLevel
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'login' ? '🔐 Sign In to Grace Youth' : '✨ Create Student / Tutor Account'}
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Toggle Mode Tabs */}
        <div className={`flex items-center p-1 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* 1. Sign In Form */}
        {mode === 'login' ? (
          <div className="space-y-3.5">
            {/* Demo Accounts Quick Filler */}
            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>⚡ Test Accounts (1-Tap Fill & Test):</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillDemo('bea@upv.edu.ph', 'password123')}
                  className="px-2 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-[11px] font-bold text-left cursor-pointer flex items-center gap-1.5"
                >
                  <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">🎓 Student (Bea)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('joshua@graceyouth.ph', 'password123')}
                  className="px-2 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-[11px] font-bold text-left cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">👨‍🏫 Tutor (Joshua)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('worker@graceyouth.ph', 'password123')}
                  className="px-2 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-[11px] font-bold text-left cursor-pointer flex items-center gap-1.5"
                >
                  <HeartHandshake className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">✝️ Youth Worker</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('graceyouth.wv@proton.me', 'password123')}
                  className="px-2 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[11px] font-bold text-left cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">🛡️ Admin (Pastor Tim)</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu.ph"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* 2. Public Self-Registration */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
                Join As:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    role === 'student'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-5 h-5" />
                  <span className="text-xs font-black">Student Member</span>
                  <span className="text-[10px] opacity-80">Free Tutorials & Life Groups</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    role === 'tutor'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md shadow-amber-500/20'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-xs font-black">Tutor Volunteer</span>
                  <span className="text-[10px] opacity-80">Teach Peers & Share Gospel</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@school.edu.ph"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Iloilo Campus
                </label>
                <select
                  value={campusId}
                  onChange={(e) => setCampusId(e.target.value)}
                  className={`w-full px-2 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
                    <option key={camp.id} value={camp.id}>{camp.shortName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Degree / Major
                </label>
                <input
                  type="text"
                  placeholder="e.g. BS Fisheries, Nursing"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer mt-2"
            >
              Complete Registration & Open Dashboard
            </button>

            <div className="text-center pt-1">
              <span className="text-slate-400 text-xs">Already registered? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-bold text-indigo-400 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};
