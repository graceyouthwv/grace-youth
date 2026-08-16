import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Heart, UserCheck, Sparkles, Send } from 'lucide-react';

export const MentorshipModal = ({ isOpen, onClose }) => {
  const { currentUser, showToast } = useApp();

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
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Get paired with a mature, encouraging Christian upperclassman or campus leader for weekly coffee meetups, Bible reading, prayer, and navigating college life together.
        </p>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Mentor Preference
          </label>
          <select
            value={mentorPref}
            onChange={(e) => setMentorPref(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
          >
            <option value="Same Campus / Major">Same Campus & Academic Field (e.g. Fellow Nursing/Engg)</option>
            <option value="Senior Student Leader">Senior Student Leader</option>
            <option value="Campus Missionary / Pastor">Campus Missionary / Full-time Pastor</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            What area would you like to grow in most?
          </label>
          <select
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
          >
            <option value="Basics of Faith & How to Read the Bible">Basics of Faith & How to Read the Bible</option>
            <option value="Overcoming College Stress & Anxiety">Overcoming College Stress & Anxiety</option>
            <option value="Navigating Relationships & Godly Dating">Navigating Relationships & Godly Dating</option>
            <option value="Accountability & Spiritual Discipline">Accountability & Spiritual Discipline</option>
            <option value="Discovering God's Calling & Career Purpose">Discovering God's Calling & Career Purpose</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Personal Note / Anything you'd like us to know (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. I am a freshie living in a dorm in Miagao/Jaro..."
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Best Contact (Messenger / Mobile Phone) *
          </label>
          <input
            type="text"
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="e.g. 0917-xxx-xxxx or Messenger link"
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          <span>Submit Mentorship Request</span>
        </button>
      </form>
    </Modal>
  );
};
