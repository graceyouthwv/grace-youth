import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Sparkles, Send, CheckCircle2, MessageCircle, Heart, Calendar, LogIn, ArrowRight, UserPlus, Lock } from 'lucide-react';
import { AuthModal } from '../auth/AuthModal';

export const JoinLifeGroupModal = ({ isOpen, onClose, group }) => {
  const {
    currentUser,
    setCurrentUser,
    setRegisteredUsers,
    registeredUsers,
    joinLifeGroup,
    myGroups,
    setActiveTab,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const isGuest = currentUser.role === 'guest' || !currentUser.email;

  const [name, setName] = useState(isGuest ? '' : currentUser.name || '');
  const [contact, setContact] = useState(isGuest ? '' : currentUser.email || '');
  const [password, setPassword] = useState('');
  const [campusId, setCampusId] = useState(isGuest ? 'upv' : currentUser.campusId || 'upv');
  const [yearLevel, setYearLevel] = useState(isGuest ? '1st Year' : currentUser.yearLevel || '1st Year');
  const [prayerNote, setPrayerNote] = useState('');
  const [isJoinedSuccess, setIsJoinedSuccess] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  if (!group) return null;

  const isAlreadyJoined = myGroups.includes(group.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      showToast('Please enter your name and contact email/phone.', 'error');
      return;
    }

    // If user is guest, auto-create their student account so it persists in their Student Hub!
    if (isGuest) {
      const cleanEmail = contact.includes('@') ? contact.trim().toLowerCase() : `${name.toLowerCase().replace(/\s+/g, '')}@student.edu.ph`;
      const campusObj = CAMPUSES.find((c) => c.id === campusId);

      const existingUser = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

      let activeUser = existingUser;
      if (!activeUser) {
        activeUser = {
          id: `usr-${Date.now()}`,
          name: name.trim(),
          email: cleanEmail,
          password: password.trim() || 'student123',
          role: 'student',
          roleLabel: `Student Member (${yearLevel})`,
          campusId,
          campusName: campusObj?.name || 'Iloilo Campus',
          yearLevel,
          status: 'Active',
          isApproved: true,
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          bio: prayerNote || 'Active campus student member.'
        };

        setRegisteredUsers((prev) => [...prev, activeUser]);
      }

      setCurrentUser(activeUser);
      localStorage.setItem('gy_active_session', JSON.stringify(activeUser));
    }

    joinLifeGroup(group.id);
    setIsJoinedSuccess(true);
    showToast(`🎉 Joined ${group.title}! It is now saved in your Student Hub.`, 'success');
  };

  const handleOpenStudentHub = () => {
    setIsJoinedSuccess(false);
    onClose();
    setActiveTab('portal');
  };

  const handleClose = () => {
    setIsJoinedSuccess(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title={isJoinedSuccess || isAlreadyJoined ? '🎉 Welcome to the Life Group!' : `🌱 Join ${group.title}`}
        maxWidth="max-w-lg"
      >
        {isJoinedSuccess || isAlreadyJoined ? (
          <div className="text-center py-4 space-y-4 text-xs sm:text-sm">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className={`text-lg sm:text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                You are a member of {group.title}!
              </h3>
              <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                This group is now permanently linked to your <strong>Student Hub</strong>. Facilitator <strong>{group.facilitator}</strong> has been notified!
              </p>
            </div>

            {/* Group Schedule Details Card */}
            <div className={`p-4 rounded-2xl border text-left space-y-2 text-xs ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Meeting Schedule:</span>
                <span className="font-bold">{group.schedule}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Location / Venue:</span>
                <span className="font-bold">{group.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Campus:</span>
                <span className="font-bold">{group.campusName}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {/* Button to open Student Hub */}
              <button
                onClick={handleOpenStudentHub}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>🎓 Open My Student Hub (View Group & Tutoring)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className={`w-full py-2.5 rounded-2xl border font-bold text-xs cursor-pointer ${
                  isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            {/* Guest Sign-In Shortcut Alert */}
            {isGuest ? (
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
              }`}>
                <div>
                  <div className="font-bold flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                    <span>Already have an account?</span>
                  </div>
                  <div className="text-[11px] opacity-85 mt-0.5">
                    Sign in so this Life Group automatically syncs to your personal Hub!
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setShowAuthModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shrink-0 cursor-pointer shadow-sm"
                >
                  Sign In
                </button>
              </div>
            ) : (
              <div className={`p-3 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
              }`}>
                Joining as <strong>{currentUser.name}</strong> ({currentUser.campusName}). This group will appear in your Student Hub!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bea Claridad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Email / Contact Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. bea@upv.edu.ph or 0917-xxx"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Your University *
                </label>
                <select
                  value={campusId}
                  onChange={(e) => setCampusId(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                >
                  {CAMPUSES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Year Level
                </label>
                <select
                  value={yearLevel}
                  onChange={(e) => setYearLevel(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                >
                  <option value="1st Year">1st Year (Freshman)</option>
                  <option value="2nd Year">2nd Year (Sophomore)</option>
                  <option value="3rd Year">3rd Year (Junior)</option>
                  <option value="4th Year">4th Year (Senior)</option>
                  <option value="Staff / Alumni">Staff / Alumni</option>
                </select>
              </div>
            </div>

            {isGuest && (
              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Create a Password (to save to your Hub)
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                />
              </div>
            )}

            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Any Prayer Request / Spiritual Goal (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Seeking godly community during exams..."
                value={prayerNote}
                onChange={(e) => setPrayerNote(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
                }`}
              />
            </div>

            {/* Sticky Action Footer */}
            <div className={`pt-3 border-t flex items-center gap-2 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <button
                type="button"
                onClick={handleClose}
                className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer transition-all ${
                  isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Confirm & Join {group.title}</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};
