import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES, SUBJECT_CATEGORIES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { Sparkles, Plus, Trash2, Globe, Laptop, School } from 'lucide-react';

export const TutorVolunteerModal = ({ isOpen, onClose }) => {
  const { addTutorListing, currentUser, selectedRegion } = useApp();

  const [subjectsInput, setSubjectsInput] = useState('');
  const [category, setCategory] = useState(SUBJECT_CATEGORIES[1]);
  const [regionId, setRegionId] = useState(selectedRegion !== 'all' ? selectedRegion : 'r6');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [bio, setBio] = useState('');
  const [preferredMode, setPreferredMode] = useState('Hybrid');
  const [isOnlineNationwide, setIsOnlineNationwide] = useState(true);

  const [slots, setSlots] = useState([
    { id: '1', day: 'Wednesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (Campus Library)' },
    { id: '2', day: 'Friday', time: '5:00 PM - 6:30 PM', mode: 'Online (Open to All Regions via Google Meet)' }
  ]);

  const addSlot = () => {
    setSlots([
      ...slots,
      { id: `${Date.now()}`, day: 'Saturday', time: '2:00 PM - 3:30 PM', mode: 'Online (Google Meet)' }
    ]);
  };

  const removeSlot = (id) => {
    if (slots.length > 1) {
      setSlots(slots.filter((s) => s.id !== id));
    }
  };

  const updateSlot = (id, field, value) => {
    setSlots(slots.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return true;
    if (regionId === 'all') return true;
    return c.regionId === regionId;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectsInput.trim()) return;

    const subjectsArray = subjectsInput.split(',').map((s) => s.trim()).filter(Boolean);
    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const regionObj = getRegionById(regionId);

    addTutorListing({
      subjects: subjectsArray,
      category,
      regionId,
      regionName: regionObj?.name || 'Region VI (Western Visayas)',
      campusId,
      campusName: campusObj?.name || 'Philippine University Campus',
      bio: bio || 'Excited to help fellow college students excel in academics and walk in faith!',
      preferredMode,
      isOnlineNationwide: preferredMode === 'Online' || preferredMode === 'Hybrid' || isOnlineNationwide,
      slots
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🌟 Volunteer as a Grace Youth Peer Tutor"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Use your academic gifts to mentor fellow students across your campus or nationwide online! Tutors receive official ministry volunteer certificates.
        </p>

        {/* Subjects Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Subjects You Can Teach / Review (comma-separated) *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Calculus 1, Differential Equations, Anatomy, Organic Chemistry"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Region & Campus Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Your Region
            </label>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                const campusInRegion = CAMPUSES.find((c) => c.regionId === e.target.value && c.id !== 'all');
                if (campusInRegion) setCampusId(campusInRegion.id);
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {PH_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.shortName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Your Campus / University
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {availableCampuses.map((camp) => (
                <option key={camp.id} value={camp.id}>{camp.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category & Modality Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Primary Academic Field
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
            >
              {SUBJECT_CATEGORIES.filter((c) => c !== 'All Subjects').map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Delivery Modality
            </label>
            <select
              value={preferredMode}
              onChange={(e) => setPreferredMode(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
            >
              <option value="Hybrid">🌐 Hybrid (Online Nationwide + In-Person)</option>
              <option value="Online">💻 Online Only (Open to All PH Regions)</option>
              <option value="In-Person">📍 In-Person Only (On-Campus)</option>
            </select>
          </div>
        </div>

        {/* Online Availability Checkbox */}
        {preferredMode !== 'In-Person' && (
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/40 flex items-center gap-2">
            <input
              type="checkbox"
              id="onlineCheck"
              checked={isOnlineNationwide}
              onChange={(e) => setIsOnlineNationwide(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
            />
            <label htmlFor="onlineCheck" className="text-xs text-indigo-950 dark:text-indigo-200 cursor-pointer font-bold">
              🇵🇭 Open to accept mentees from ANY Philippine region via Google Meet / Zoom / Discord
            </label>
          </div>
        )}

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
            Short Bio / Encouragement for Mentees
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Happy to help you master tricky concepts with patience and prayer!"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Timeslots */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Available Weekly Timeslots
            </label>
            <button
              type="button"
              onClick={addSlot}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slot</span>
            </button>
          </div>

          <div className="space-y-2">
            {slots.map((slot) => (
              <div key={slot.id} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <input
                  type="text"
                  value={slot.day}
                  onChange={(e) => updateSlot(slot.id, 'day', e.target.value)}
                  placeholder="Day (e.g. Tuesday)"
                  className="w-full sm:w-1/3 px-2 py-1 text-xs bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={slot.time}
                  onChange={(e) => updateSlot(slot.id, 'time', e.target.value)}
                  placeholder="Time (e.g. 4:00 PM - 5:30 PM)"
                  className="w-full sm:w-1/3 px-2 py-1 text-xs bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  value={slot.mode}
                  onChange={(e) => updateSlot(slot.id, 'mode', e.target.value)}
                  placeholder="Mode (e.g. Online Meet / Library)"
                  className="flex-1 px-2 py-1 text-xs bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
                />
                {slots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(slot.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 self-end sm:self-center cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          Publish Peer Tutor Profile
        </button>
      </form>
    </Modal>
  );
};
