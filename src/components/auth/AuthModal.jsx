import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
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
  const [forgotStep, setForgotStep] = useState(1);

  // Register Form State
  const [name, setName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [role, setRole] = useState('student'); // 'student' | 'tutor' | 'worker'
  const [regionId, setRegionId] = useState('r6');
  const [campusId, setCampusId] = useState('upv');
  const [customCampus, setCustomCampus] = useState('');
  const [preferredMode, setPreferredMode] = useState('Hybrid');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('1st Year');
  const [subjects, setSubjects] = useState('');
  const [bioNote, setBioNote] = useState('');

  const isDark = theme === 'dark';

  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return false;
    return c.regionId === regionId;
  });

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
    const regionObj = getRegionById(regionId);
    const finalCampusName =
      campusId === '__other__'
        ? customCampus.trim() || 'Other Campus'
        : campusObj?.name || 'Philippine University Campus';

    const success = await register({
      name,
      email: registerEmail,
      password: registerPassword,
      role,
      regionId,
      regionName: regionObj?.name || 'All Philippines',
      campusId: campusId === '__other__' ? 'other' : campusId,
      campusName: finalCampusName,
      preferredMode,
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
          ? '🔑 Reset Password'
          : mode === 'login'
          ? 'Welcome Back'
          : 'Create an Account'
      }
      maxWidth="max-w-md"
    >
      <div className="space-y-5 py-1">
        {/* Toggle Mode Segmented Control */}
        {mode !== 'forgot' && (
          <div
            className={`flex items-center p-1.5 rounded-2xl border ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}
          >
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : isDark
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Create Account
            </button>
          </div>
        )}

        {/* 1. SIGN IN FORM */}
        {mode === 'login' && (
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label
                  className={`block text-xs font-bold mb-1.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    placeholder="name@school.edu.ph"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500'
                        : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-600'
                    }`}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    className={`block text-xs font-bold ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotEmail(loginEmail);
                      setMode('forgot');
                      setForgotStep(1);
                    }}
                    className="text-xs font-medium text-indigo-500 hover:underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white focus:border-indigo-500'
                        : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-600'
                    }`}
                  />
                </div>
              </div>

              {/* Quick Fill Test Accounts */}
              <div className="pt-0.5">
                <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                  <span>Quick 1-Click Fill:</span>
                  <span className="text-[10px] text-slate-400 font-mono">password123</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('jassy@school.edu.ph');
                      setLoginPassword('password123');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🎓 Student
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('perry@graceyouth.ph');
                      setLoginPassword('password123');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    👨‍🏫 Peer Tutor
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('leader@graceyouth.ph');
                      setLoginPassword('password123');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    🏛️ Leader
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Subtle Leadership Gateway Footer Link */}
            <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800/80">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (window.__openAdminLoginModal) {
                    window.__openAdminLoginModal();
                  } else {
                    const adminBtn = document.querySelector('[data-action="open-admin"]');
                    if (adminBtn) adminBtn.click();
                  }
                }}
                className="text-xs text-slate-400 hover:text-indigo-400 font-medium inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Ministry Staff & Leader Login &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <div className="space-y-4">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Enter your registered email address to set a new password.
            </p>

            {forgotStep === 1 ? (
              <form onSubmit={handleVerifyForgotEmail} className="space-y-4">
                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Registered Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="name@school.edu.ph"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm ${
                        isDark
                          ? 'bg-slate-900 border-slate-800 text-white'
                          : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                <div
                  className={`p-3 rounded-xl border text-xs font-bold ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  ✓ Account Verified: {forgotEmail}
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={forgotNewPassword}
                    onChange={(e) => setForgotNewPassword(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-xs font-bold mb-1.5 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={forgotConfirmPassword}
                    onChange={(e) => setForgotConfirmPassword(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Password & Sign In</span>
                </button>
              </form>
            )}

            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs text-slate-400 hover:text-indigo-400 font-semibold inline-flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
            </div>
          </div>
        )}

        {/* 3. STREAMLINED REGISTRATION FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            {/* Clean Role Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'student'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('tutor')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'tutor'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Peer Tutor</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('worker')}
                className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  role === 'worker'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Youth Worker</span>
              </button>
            </div>

            {/* Core Fields */}
            <div>
              <label
                className={`block text-xs font-bold mb-1 ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  className={`block text-xs font-bold mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu.ph"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-xs font-bold mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Region & Campus Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  className={`block text-xs font-bold mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Region
                </label>
                <select
                  value={regionId}
                  onChange={(e) => {
                    setRegionId(e.target.value);
                    const firstCampus = CAMPUSES.find(
                      (c) => c.regionId === e.target.value && c.id !== 'all'
                    );
                    if (firstCampus) setCampusId(firstCampus.id);
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {PH_REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.shortName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-xs font-bold mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  Campus
                </label>
                <select
                  value={campusId}
                  onChange={(e) => {
                    setCampusId(e.target.value);
                    if (e.target.value !== '__other__') setCustomCampus('');
                  }}
                  className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                >
                  {availableCampuses.map((camp) => (
                    <option key={camp.id} value={camp.id}>
                      {camp.name}
                    </option>
                  ))}
                  <option value="__other__">✏️ Other Campus</option>
                </select>
              </div>
            </div>

            {campusId === '__other__' && (
              <div>
                <label
                  className={`block text-xs font-bold mb-1 ${
                    isDark ? 'text-slate-300' : 'text-slate-700'
                  }`}
                >
                  University Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adventist University of the Philippines"
                  value={customCampus}
                  onChange={(e) => setCustomCampus(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            )}

            {/* Extra fields for Tutors / Youth Workers */}
            {role === 'tutor' && (
              <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label
                    className={`block text-xs font-bold mb-1 ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}
                  >
                    Subjects you want to tutor (e.g. Calculus 1, Chem 16)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Math 53, Physics 71, Organic Chem"
                    value={subjects}
                    onChange={(e) => setSubjects(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                      isDark
                        ? 'bg-slate-900 border-slate-800 text-white'
                        : 'bg-white border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all cursor-pointer mt-3"
            >
              {role === 'worker'
                ? 'Submit Youth Worker Application'
                : role === 'tutor'
                ? 'Submit Peer Tutor Application'
                : 'Create Account & Enter'}
            </button>

            <div className="text-center pt-2">
              <span className="text-slate-500 text-xs">Already have an account? </span>
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
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
