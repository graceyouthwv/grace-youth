import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Sparkles, Send, CheckCircle2, MessageCircle, Heart, Calendar } from 'lucide-react';

export const JoinLifeGroupModal = ({ isOpen, onClose, group }) => {
  const { currentUser, joinLifeGroup, myGroups, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [name, setName] = useState(currentUser.name || '');
  const [contact, setContact] = useState(currentUser.email || '');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'all');
  const [yearLevel, setYearLevel] = useState(currentUser.yearLevel || '1st Year');
  const [preferredMode, setPreferredMode] = useState('In-Person');
  const [prayerNote, setPrayerNote] = useState('');
  const [isJoinedSuccess, setIsJoinedSuccess] = useState(false);

  if (!group) return null;

  const isAlreadyJoined = myGroups.includes(group.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter your name.', 'error');
      return;
    }

    joinLifeGroup(group.id);
    setIsJoinedSuccess(true);
  };

  const handleClose = () => {
    setIsJoinedSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={isJoinedSuccess ? '🎉 Welcome to the Family!' : `🌱 Join ${group.title}`}
      maxWidth="max-w-lg"
    >
      {isJoinedSuccess || isAlreadyJoined ? (
        <div className="text-center py-4 space-y-4 text-xs sm:text-sm">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className={`text-lg sm:text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              You are now part of {group.title}!
            </h3>
            <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Facilitator <strong>{group.facilitator}</strong> has been notified and will reach out to you before this Friday's circle.
            </p>
          </div>

          {/* Group Details Card */}
          <div className={`p-4 rounded-2xl border text-left space-y-2 text-xs ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Meeting Schedule:</span>
              <span className="font-bold">{group.schedule}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Location / Lounge:</span>
              <span className="font-bold">{group.location}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Campus:</span>
              <span className="font-bold">{group.campusName}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <a
              href="mailto:graceyouth.wv@proton.me?subject=Joined Grace Youth Life Group"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Open Group Chat & Messenger Circle</span>
            </a>

            <button
              onClick={handleClose}
              className={`w-full py-2.5 rounded-2xl border font-bold text-xs cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700' : 'bg-white text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              Done & Return
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
            isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-900'
          }`}>
            <span className="font-bold">✨ Life Group Circle:</span> Experience authentic Christian brotherhood/sisterhood, study the Bible together, and support one another in your college walk!
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bea Claridad"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Email / Messenger / Contact *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0917-xxx-xxxx or FB name"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your University *
              </label>
              <select
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {CAMPUSES.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Year Level / Status
              </label>
              <select
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="1st Year">1st Year (Freshman)</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="4th Year">4th Year (Senior)</option>
                <option value="Alumni / Staff">Alumni / Ministry Partner</option>
              </select>
            </div>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Any Prayer Request / Spiritual Goal (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Want to build regular prayer habits and make godly friends in campus..."
              value={prayerNote}
              onChange={(e) => setPrayerNote(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Confirm & Join {group.title}</span>
          </button>
        </form>
      )}
    </Modal>
  );
};
