import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Clock, MapPin, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';

export const CreateGroupModal = ({ isOpen, onClose }) => {
  const { addBibleStudy, currentUser, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [leader, setLeader] = useState(currentUser?.name || '');
  const [campusId, setCampusId] = useState(currentUser?.campusId || 'all');
  const [schedule, setSchedule] = useState('Thursdays • 5:00 PM - 6:30 PM');
  const [location, setLocation] = useState('CAS Gazebo / Student Lounge');
  const [category, setCategory] = useState('Campus Faith & Academics');
  const [maxCapacity, setMaxCapacity] = useState('12');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a group title.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addBibleStudy({
      title: title.trim(),
      leader: leader.trim() || 'Youth Worker / Small Group Leader',
      campusId,
      campusName: campusObj?.name || 'All Campuses',
      schedule: schedule.trim() || 'Weekly Schedule',
      location: location.trim() || 'Campus Meeting Spot',
      topicCategory: category,
      currentMembers: 1,
      maxCapacity: parseInt(maxCapacity, 10) || 12,
      description: description.trim() || 'Student-led discipleship community to build deep friendships and apply Biblical truth to college life.',
      tags: ['Discipleship', category.split(' ')[0], campusObj?.shortName || 'Grace Youth'],
      image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80'
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="👥 Create Campus Life Group / Bible Study"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          ✨ <strong>Discipleship Community:</strong> Launch a campus Life Group for freshmen, engineering majors, nursing cohorts, or general campus peer discipleship.
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Group Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CAS Freshmen Faith & Chill Group"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Leader / Facilitator Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kuya Daniel & Bea"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Campus Station *
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="all">📍 All Campuses</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Schedule / Time *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Thursdays • 5:00 PM - 6:30 PM"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Max Group Capacity
            </label>
            <input
              type="number"
              min="4"
              max="30"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Meeting Spot / Venue *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CAS Gazebo / Engineering Lobby / Online Zoom"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Group Description & Topic Focus
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Tackling freshman adjustments, managing stress, discovering God's grace in college, and weekly prayer support."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Create Life Group</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
