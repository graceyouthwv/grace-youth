import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { LogOut, User, Mail, School, ShieldCheck, BookOpen, Heart, ArrowRight, HeartHandshake, Edit3, Camera } from 'lucide-react';
import { VolunteerModal } from '../common/VolunteerModal';
import { EditProfileModal } from './EditProfileModal';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout, setActiveTab, myBookings, myGroups, prayers, theme, showToast } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const isDark = theme === 'dark';

  const handleSignOut = () => {
    logout();
    onClose();
    showToast('👋 Successfully signed out. See you next time!', 'info');
  };

  const handleOpenPortal = () => {
    setActiveTab(currentUser.role === 'leader' ? 'admin' : 'portal');
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="👤 My Profile & Account"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          {/* User Card */}
          <div className={`p-4 sm:p-5 rounded-3xl border flex items-center justify-between gap-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center gap-3.5">
              <div
                onClick={() => setShowEditProfileModal(true)}
                className="relative group cursor-pointer shrink-0"
                title="Click to Change Profile Picture"
              >
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/40 group-hover:scale-105 transition-transform"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-transform group-hover:scale-110">
                  <Camera className="w-3 h-3" />
                </div>
              </div>
              <div>
                <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentUser.name}
                </h3>
                <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  {currentUser.roleLabel || 'Student Member'}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {currentUser.email || 'Campus Member'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowEditProfileModal(true)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                isDark ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100 shadow-xs'
              }`}
              title="Edit Profile & Picture"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Profile Attributes */}
          <div className={`p-3.5 rounded-2xl border space-y-2 text-xs ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Campus:</span>
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {currentUser.campusName || 'All Iloilo'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Program / Year:</span>
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {currentUser.program || 'Student'} ({currentUser.yearLevel || 'Enrolled'})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Role:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                {currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role === 'leader' ? 'Ministry Admin' : currentUser.role === 'tutor' ? 'Peer Tutor' : 'Student Member'}
              </span>
            </div>

            {currentUser.bio && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 italic">
                "{currentUser.bio}"
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleOpenPortal}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>
                {currentUser.role === 'leader'
                  ? 'Open Admin Command Center'
                  : currentUser.role === 'worker'
                  ? 'Open Youth Worker Console'
                  : currentUser.role === 'tutor'
                  ? 'Open Tutor Control Center'
                  : 'Open My Student Hub'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowVolunteerModal(true)}
              className={`w-full py-2.5 rounded-2xl border font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-pink-300 hover:bg-slate-700'
                  : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
              }`}
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Volunteer as Youth Worker / Tutor</span>
            </button>

            {/* Always Visible Sign Out Button for PWA and Mobile */}
            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out from Account</span>
            </button>
          </div>
        </div>
      </Modal>

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
      />

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />
    </>
  );
};
