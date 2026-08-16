import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { LogOut, User, Mail, School, ShieldCheck, BookOpen, Heart, ArrowRight, HeartHandshake } from 'lucide-react';
import { VolunteerModal } from '../common/VolunteerModal';

export const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout, setActiveTab, myBookings, myGroups, prayers, theme } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const isDark = theme === 'dark';

  const handleSignOut = () => {
    logout();
    onClose();
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
        title="👤 My Account & Profile"
        maxWidth="max-w-md"
      >
        <div className="space-y-5 text-xs sm:text-sm">
          {/* User Card */}
          <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {currentUser.name}
                </h3>
              </div>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                {currentUser.roleLabel || 'Student'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {currentUser.email || 'Registered User'}
              </p>
            </div>
          </div>

          {/* Profile Attributes */}
          <div className={`p-4 rounded-2xl border space-y-2.5 ${
            isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Campus / Region:</span>
              <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                {currentUser.campusName}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Account Role:</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                {currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role === 'leader' ? 'Admin' : currentUser.role}
              </span>
            </div>

            {currentUser.bio && (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs italic">
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

            <button
              onClick={handleSignOut}
              className="w-full py-2.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </Modal>

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />
    </>
  );
};
