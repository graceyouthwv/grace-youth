import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { Users, Sparkles, Plus, MapPin, Clock, ShieldCheck, Globe, Laptop, School } from 'lucide-react';

export const CreateLifeGroupModal = ({ isOpen, onClose }) => {
  const { createOfficialLifeGroup, showToast, currentUser, selectedRegion, theme } = useApp();

  const [title, setTitle] = useState('');
  const [regionId, setRegionId] = useState(selectedRegion !== 'all' ? selectedRegion : 'r6');
  const [campusId, setCampusId] = useState('upv');
  const [meetingType, setMeetingType] = useState('Hybrid');
  const [isOpenNationwide, setIsOpenNationwide] = useState(true);
  const [facilitator, setFacilitator] = useState(currentUser.name || 'Pastor Tim');
  const [schedule, setSchedule] = useState('Every Monday, 4:30 PM - 5:45 PM');
  const [location, setLocation] = useState('Campus Student Hub & Online (Google Meet)');
  const [topicCategory, setTopicCategory] = useState('Faith, Purpose & University Life');
  const [maxCapacity, setMaxCapacity] = useState(25);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('Discipleship, Freshmen Welcome, Prayer');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&auto=format&fit=crop&q=80');

  const isDark = theme === 'dark';

  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return true;
    if (regionId === 'all') return true;
    return c.regionId === regionId;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !facilitator.trim()) {
      showToast('Please fill in the group title and facilitator name.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const regionObj = getRegionById(regionId);
    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean);

    createOfficialLifeGroup({
      title: title.trim(),
      regionId,
      regionName: regionObj?.name || 'All Philippines',
      campusId,
      campusName: campusObj?.name || 'Philippine University Campus',
      meetingType,
      isOpenNationwide: meetingType === 'Online' || meetingType === 'Hybrid' || isOpenNationwide,
      facilitator: facilitator.trim(),
      schedule,
      location,
      topicCategory,
      currentMembers: 1,
      maxCapacity: parseInt(maxCapacity, 10) || 25,
      description: description.trim() || 'A welcoming collegiate community meeting weekly for spiritual encouragement and authentic Christian friendship.',
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
          <span className="font-bold">🛡️ Leadership Action:</span> Official Life Groups can be scoped locally to a specific campus or launched as an Online Circle open to college students nationwide.
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Life Group Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Philippine Collegiate Online Circle / UPV CAS Life Group"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        {/* Region & Campus Selection */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Region
            </label>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                const firstCamp = CAMPUSES.find((c) => c.regionId === e.target.value && c.id !== 'all');
                if (firstCamp) setCampusId(firstCamp.id);
              }}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {PH_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.shortName}</option>
              ))}
            </select>
          </div>

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
              {availableCampuses.map((camp) => (
                <option key={camp.id} value={camp.id}>{camp.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Meeting Modality & Facilitator */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Meeting Modality
            </label>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="Hybrid">🌐 Hybrid (Online Nationwide + Campus)</option>
              <option value="Online">💻 Online Only (Open to All Regions)</option>
              <option value="In-Person">📍 In-Person (On-Campus Only)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Assigned Facilitator / Leader *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kuya Daniel / Ate Keziah"
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
              placeholder="e.g. Every Friday, 5:00 PM - 6:30 PM"
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
              placeholder="e.g. Discord Hub / Google Meet / CAS Lounge"
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
              placeholder="e.g. Faith & Science, Discipleship, Freshmen Life"
              value={topicCategory}
              onChange={(e) => setTopicCategory(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Target Member Capacity
            </label>
            <input
              type="number"
              min="3"
              max="100"
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
            Group Description
          </label>
          <textarea
            rows={2}
            placeholder="Describe what students will study and experience in this circle..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
              isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-950'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Launch Life Group</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
