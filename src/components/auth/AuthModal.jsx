import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import {
  Lock,
  Mail,
  User,
  School,
  ArrowRight,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  AlertCircle,
  Sparkles,
  KeyRound,
  CheckCircle2,
  ChevronLeft
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { login, register, resetUserPassword, registeredUsers, showToast, theme } = useApp();
  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Enter email | 2: Enter new password

  // Register Form State (Student | Tutor | Youth Worker)
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' | 'tutor' | 'worker'
  const [campusId, setCampusId] = useState('upv');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('1st Year');
  const [subjects, setSubjects] = useState('');
  const [bioNote, setBioNote] = useState('');

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

  const handleVerifyForgotEmail = (e) => {
    e.preventDefault();
    const cleanEmail = forgotEmail.trim().toLowerCase();
    const user = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      showToast('No account found with this email. Please check spelling.', 'error');
      return;
    }

    setForgotStep(2);
    showToast(`Account verified for ${user.name}! Please enter your new password.`, 'success');
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotNewPassword.trim()) {
      showToast('Please enter a new password.', 'error');
      return;
    }

    if (forgotNewPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }

    if (forgotNewPassword !== forgotConfirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    const success = resetUserPassword(forgotEmail, forgotNewPassword);
    if (success) {
      login(forgotEmail, forgotNewPassword);
      onClose();
      setMode('login');
      setForgotStep(1);
      setForgotEmail('');
      setForgotNewPassword('');
      setForgotConfirmPassword('');
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
      role,
      campusId,
      campusName: campusObj?.name || 'UP Visayas',
      program,
      yearLevel,
      subjects,
      bioNote
    });

    if (success) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        mode === 'forgot'
          ? '🔑 Reset Forgotten Password'
          : mode === 'login'
          ? '🔐 Sign In to Grace Youth'
          : '✨ Create Student Account / Apply'
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Toggle Mode Tabs (Only shown when not in Forgot Password) */}
        {mode !== 'forgot' && (
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
        )}

        {/* 1. SIGN IN FORM */}
        {mode === 'login' && (
          <div className="space-y-3.5">
            {/* Quick Test Demo Account Fillers */}
            <div className={`p-3 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span>⚡ Test Accounts:</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillDemo('bea@upv.edu.ph', 'password123')}
                  className="px-1.5 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-xl text-[11px] font-bold text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span className="truncate text-[10px] mt-0.5">Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('joshua@graceyouth.ph', 'password123')}
                  className="px-1.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 rounded-xl text-[11px] font-bold text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span className="truncate text-[10px] mt-0.5">Tutor</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('worker@graceyouth.ph', 'password123')}
                  className="px-1.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-[11px] font-bold text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span className="truncate text-[10px] mt-0.5">Worker</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('graceyouth.wv@proton.me', 'graceyouth2026')}
                  className="px-1.5 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl text-[11px] font-bold text-center cursor-pointer flex flex-col items-center justify-center"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="truncate text-[10px] mt-0.5">Admin</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3">
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu.ph"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className={`block text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setMode('forgot');
                      setForgotStep(1);
                    }}
                    className="text-[11px] font-bold text-pink-500 hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. FORGOT PASSWORD SELF-SERVICE RESET */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed flex items-start gap-2.5 ${
              isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
            }`}>
              <KeyRound className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
              <div>
                <strong>Self-Service Password Recovery:</strong> Enter your registered school or staff email to reset your account password instantly.
              </div>
            </div>

            {forgotStep === 1 ? (
              <form onSubmit={handleVerifyForgotEmail} className="space-y-3">
                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Enter Registered Account Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. bea@upv.edu.ph or joshua@graceyouth.ph"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Verify Email & Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-3">
                <div className={`p-2.5 rounded-xl border text-xs font-bold ${
                  isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                }`}>
                  ✓ Email Verified: {forgotEmail}
                </div>

                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    New Password (min 6 chars)
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password..."
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter new password..."
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save New Password & Sign In</span>
                </button>
              </form>
            )}

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. REGISTRATION / APPLICATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Select Account Role:
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    role === 'student'
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-[11px] font-black">Student</span>
                  <span className="text-[9px] opacity-80 font-medium">Instant Entry</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('tutor')}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    role === 'tutor'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span className="text-[11px] font-black">Peer Tutor</span>
                  <span className="text-[9px] opacity-80 font-medium">Needs Admin</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('worker')}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                    role === 'worker'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-black'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span className="text-[11px] font-black">Youth Worker</span>
                  <span className="text-[9px] opacity-80 font-medium">Staff Review</span>
                </button>
              </div>
            </div>

            {/* Note for Students vs Staff */}
            {role === 'student' ? (
              <div className={`p-2.5 rounded-xl border text-[11px] leading-relaxed flex items-center gap-2 ${
                isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
              }`}>
                <Sparkles className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                <span><strong>Instant Student Access:</strong> Create your account to immediately book peer tutors, join Life Groups, and download reviewers. No admin approval needed.</span>
              </div>
            ) : (
              <div className={`p-3 rounded-xl border text-[11px] leading-relaxed flex items-start gap-2 ${
                role === 'tutor'
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-500/30 text-amber-950 dark:text-amber-200'
                  : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
              }`}>
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong>Admin Verification Required:</strong> {role === 'tutor' ? 'Tutor applicants are verified by leadership in the Admin Command Center before their tutor account is activated.' : 'Youth Worker accounts require leadership authorization in the Admin Portal.'}
                </div>
              </div>
            )}

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu.ph"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Iloilo Campus
                </label>
                <select
                  value={campusId}
                  onChange={(e) => setCampusId(e.target.value)}
                  className={`w-full px-2 py-2 rounded-xl border text-xs font-bold ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
                    <option key={camp.id} value={camp.id}>{camp.shortName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Degree / Major
                </label>
                <input
                  type="text"
                  placeholder="e.g. BS Mathematics, Nursing"
                  value={program}
                  onChange={(e) => setProgram(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {role === 'tutor' && (
              <div>
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Subjects You Wish to Tutor (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Math 53 Calculus 1, Chem 16, Physics 71"
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer mt-2"
            >
              {role === 'worker'
                ? 'Submit Youth Worker Application'
                : role === 'tutor'
                ? 'Submit Peer Tutor Application'
                : 'Create Student Account & Enter'}
            </button>

            <div className="text-center pt-1">
              <span className="text-slate-400 text-xs">Already have an account? </span>
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
