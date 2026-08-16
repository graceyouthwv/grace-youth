import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Users, Sparkles, Plus, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const CreateLifeGroupModal = ({ isOpen, onClose }) => {
  const { createOfficialLifeGroup, showToast, currentUser, theme } = useApp();

  const [title, setTitle] = useState('');
  const [campusId, setCampusId] = useState('isufst');
  const [facilitator, setFacilitator] = useState(currentUser.name || 'Pastor Tim');
  const [schedule, setSchedule] = useState('Every Monday, 4:30 PM - 5:45 PM');
  const [location, setLocation] = useState('Campus Student Lounge / Online');
  const [topicCategory, setTopicCategory] = useState('Faith in Science & Purpose');
  const [maxCapacity, setMaxCapacity] = useState(12);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('ISUFST, Freshmen Welcome, Free Snacks');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80');

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !facilitator.trim()) {
      showToast('Please fill in the group title and facilitator name.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);

    createOfficialLifeGroup({
      title: title.trim(),
      campusId,
      campusName: campusObj?.name || 'Iloilo Campus',
      facilitator: facilitator.trim(),
      schedule,
      location,
      topicCategory,
      currentMembers: 1,
      maxCapacity: parseInt(maxCapacity, 10) || 12,
      description: description.trim() || 'A welcoming campus community meeting weekly for spiritual encouragement and authentic Christian friendship.',
      tags: tagsArray,
      image
    });

    onClose();
    setTitle('');
    setDescription('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Admin: Launch Official Campus Life Group"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className="p-3 rounded-2xl border text-xs bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-500/30 text-indigo-800 dark:text-indigo-300">
          <span className="font-bold">🛡️ Leadership Action:</span> Only Ministry Admins and Campus Missionaries can officially approve and publish Life Groups to the university directory.
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Life Group Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. ISUFST Barotac Nuevo Coastal Life Group"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Campus
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
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
              Assigned Facilitator / Leader *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Janelle Marie Tan / Pastor Tim"
              value={facilitator}
              onChange={(e) => setFacilitator(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Weekly Schedule
            </label>
            <input
              type="text"
              placeholder="e.g. Every Monday, 4:30 PM - 5:45 PM"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Meeting Venue / Online Link
            </label>
            <input
              type="text"
              placeholder="e.g. CAS Gazebo / Discord"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Topic Category
            </label>
            <input
              type="text"
              placeholder="e.g. Overcoming Stress / Identity"
              value={topicCategory}
              onChange={(e) => setTopicCategory(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Group Capacity
            </label>
            <input
              type="number"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Group Description & Welcoming Message
          </label>
          <textarea
            rows={2}
            placeholder="Tell students what to expect..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Freshmen Welcome, Coffee, Exam Prayer"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Officially Approve & Launch Life Group</span>
        </button>
      </form>
    </Modal>
  );
};
