import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Clock, MapPin, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';

export const EditGroupModal = ({ isOpen, onClose, group }) => {
  const { updateBibleStudy, deleteBibleStudy, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [leader, setLeader] = useState('');
  const [campusId, setCampusId] = useState('all');
  const [schedule, setSchedule] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [maxCapacity, setMaxCapacity] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (group) {
      setTitle(group.title || '');
      setLeader(group.leader || '');
      setCampusId(group.campusId || 'all');
      setSchedule(group.schedule || '');
      setLocation(group.location || '');
      setCategory(group.topicCategory || 'Campus Faith & Academics');
      setMaxCapacity(group.maxCapacity || 12);
      setDescription(group.description || '');
    }
  }, [group]);

  if (!group) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a group title.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    updateBibleStudy(group.id, {
      title: title.trim(),
      leader: leader.trim() || group.leader,
      campusId,
      campusName: campusObj?.name || group.campusName,
      schedule: schedule.trim() || group.schedule,
      location: location.trim() || group.location,
      topicCategory: category,
      maxCapacity: parseInt(maxCapacity, 10) || group.maxCapacity,
      description: description.trim() || group.description
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete group "${group.title}"?`)) {
      deleteBibleStudy(group.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✏️ Edit Life Group: ${group.title}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Group Title *
          </label>
          <input
            type="text"
            required
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
              Leader / Facilitator *
            </label>
            <input
              type="text"
              required
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Campus *
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
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Max Capacity
            </label>
            <input
              type="number"
              min="4"
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 font-bold text-xs cursor-pointer flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
