import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Sparkles, MapPin, Send, School, Clock } from 'lucide-react';

export const RequestLifeGroupModal = ({ isOpen, onClose }) => {
  const { currentUser, requestLifeGroup, showToast, theme } = useApp();

  const [campusId, setCampusId] = useState(currentUser.campusId || 'isufst');
  const [proposedTitle, setProposedTitle] = useState('');
  const [targetAudience, setTargetAudience] = useState('Freshmen & Dorm Mates');
  const [preferredSchedule, setPreferredSchedule] = useState('Wednesdays 5:00 PM');
  const [preferredLocation, setPreferredLocation] = useState('Campus Gazebo / Study Lounge');
  const [interestedCount, setInterestedCount] = useState('3-5 students');
  const [note, setNote] = useState('');
  const [contact, setContact] = useState(currentUser.email || '');

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proposedTitle.trim() || !contact.trim()) {
      showToast('Please provide a group title and contact info.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    requestLifeGroup({
      campusId,
      campusName: campusObj?.name || 'Iloilo Campus',
      proposedTitle: proposedTitle.trim(),
      targetAudience,
      preferredSchedule,
      preferredLocation,
      interestedCount,
      note: note.trim() || 'Excited to start a Bible study and fellowship with my classmates!',
      requestedBy: currentUser.name || 'Student Applicant',
      contact
    });

    onClose();
    setProposedTitle('');
    setNote('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🌱 Request to Open a Campus Life Group"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="p-3 rounded-2xl border text-xs bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300">
          <span className="font-bold">✨ Student Initiative:</span> Want to gather your classmates or dorm friends for weekly prayer and Bible reading? Submit a request and our <strong>Ministry Leadership & Youth Workers</strong> will equip and officially launch your campus group!
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Target Iloilo Campus *
          </label>
          <select
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
              <option key={camp.id} value={camp.id}>{camp.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Proposed Life Group Name / Focus *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ISUFST Fisheries Faith Group / UPV Freshmen Circle"
            value={proposedTitle}
            onChange={(e) => setProposedTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Target Friends / Audience
            </label>
            <input
              type="text"
              placeholder="e.g. Blockmates / Nursing 2nd Year"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Estimated Interested Students
            </label>
            <select
              value={interestedCount}
              onChange={(e) => setInterestedCount(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="2-3 students">2-3 close friends</option>
              <option value="4-6 students">4-6 students / dorm mates</option>
              <option value="7-10+ students">7-10+ classmates</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Preferred Day & Time
            </label>
            <input
              type="text"
              placeholder="e.g. Thursdays 5:00 PM"
              value={preferredSchedule}
              onChange={(e) => setPreferredSchedule(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Preferred Venue / Mode
            </label>
            <input
              type="text"
              placeholder="e.g. Campus Library / Coffee shop / Discord"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Your Contact (Mobile / Messenger) *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 0917-xxx-xxxx or FB Profile Name"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Why do you want to open this group? (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Many classmates are struggling with exam burnout and need God's encouragement..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Request to Ministry Leadership</span>
        </button>
      </form>
    </Modal>
  );
};
