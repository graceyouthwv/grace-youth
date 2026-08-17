import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Heart, UserCheck, Sparkles, Send, Coffee } from 'lucide-react';

export const MentorshipModal = ({ isOpen, onClose }) => {
  const { currentUser, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [mentorPref, setMentorPref] = useState('Same Campus / Major');
  const [focusArea, setFocusArea] = useState('Overcoming College Stress & Growing in Faith');
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState(currentUser.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
    showToast('✨ 1-on-1 Discipleship request submitted! Our campus coordinator will match you with a mentor within 24 hours.', 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🌱 Request a 1-on-1 Christian Student Mentor"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border leading-relaxed ${
          isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          <div className="font-bold flex items-center gap-1.5 mb-0.5">
            <Coffee className="w-4 h-4 text-emerald-500" />
            <span>Campus Mentorship & Coffee Meetups</span>
          </div>
          <p className="text-[11px] sm:text-xs opacity-90">
            Get paired with a mature, encouraging Christian upperclassman or campus leader for weekly coffee meetups, Bible reading, prayer, and navigating college life together.
          </p>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Mentor Preference
          </label>
          <select
            value={mentorPref}
            onChange={(e) => setMentorPref(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          >
            <option value="Same Campus / Major">Same Campus & Academic Field (e.g. Fellow Nursing/Engg/Math)</option>
            <option value="Senior Student Leader">Senior Student Leader</option>
            <option value="Campus Missionary / Pastor">Campus Missionary / Full-time Pastor</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            What area would you like to grow in most?
          </label>
          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          >
            <option value="Basics of Faith & How to Read the Bible">Basics of Faith & How to Read the Bible</option>
            <option value="Overcoming College Stress & Anxiety">Overcoming College Stress & Anxiety</option>
            <option value="Navigating Relationships & Godly Dating">Navigating Relationships & Godly Dating</option>
            <option value="Accountability & Spiritual Discipline">Accountability & Spiritual Discipline</option>
            <option value="Discovering God's Calling & Career Purpose">Discovering God's Calling & Career Purpose</option>
          </select>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Personal Note / Anything you'd like us to know (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. I am a freshie living in a dorm in Miagao/Jaro..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            Best Contact (Messenger / Mobile Phone) *
          </label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. 0917-xxx-xxxx or Messenger link"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Sticky Action Footer */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer transition-all ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4" />
            <span>Submit Mentorship Request</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
