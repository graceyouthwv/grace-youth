import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES, SUBJECT_CATEGORIES } from '../../data/campuses';
import { Sparkles, Plus, Trash2 } from 'lucide-react';

export const TutorVolunteerModal = ({ isOpen, onClose }) => {
  const { addTutorListing, currentUser } = useApp();

  const [subjectsInput, setSubjectsInput] = useState('');
  const [category, setCategory] = useState(SUBJECT_CATEGORIES[1]);
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [bio, setBio] = useState('');
  const [preferredMode, setPreferredMode] = useState('Hybrid (Online / Campus Library)');
  const [slots, setSlots] = useState([
    { id: '1', day: 'Wednesday', time: '4:00 PM - 5:30 PM', mode: 'In-Person (Campus Library)' }
  ]);

  const addSlot = () => {
    setSlots([
      ...slots,
      { id: `${Date.now()}`, day: 'Friday', time: '5:00 PM - 6:30 PM', mode: 'Online (Google Meet)' }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subjectsInput.trim()) return;

    const subjectsArray = subjectsInput.split(',').map((s) => s.trim()).filter(Boolean);
    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addTutorListing({
      subjects: subjectsArray,
      category,
      campusId,
      campusName: campusObj?.name || 'Western Visayas Campus',
      bio,
      preferredMode,
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
        <p className="text-xs sm:text-sm text-slate-600">
          Use your academic strengths to serve and encourage fellow college students! Tutors receive ministry volunteer certificates and leadership mentoring.
        </p>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Subjects You Can Teach / Review (comma-separated) *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Calculus 1, Differential Equations, Physics 71"
            value={subjectsInput}
            onChange={(e) => setSubjectsInput(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Primary Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              {SUBJECT_CATEGORIES.filter((c) => c !== 'All Subjects').map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Campus
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
                <option key={camp.id} value={camp.id}>{camp.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Short Bio / Encouragement for Mentees
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Happy to help you understand tricky formulas with patience and prayer!"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Timeslots */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Your Available Weekly Timeslots
            </label>
            <button
              type="button"
              onClick={addSlot}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Slot</span>
            </button>
          </div>

          <div className="space-y-2">
            {slots.map((slot) => (
              <div key={slot.id} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={slot.day}
                  onChange={(e) => updateSlot(slot.id, 'day', e.target.value)}
                  placeholder="Day (e.g. Tuesday)"
                  className="w-1/3 px-2 py-1 text-xs bg-white rounded-lg border border-slate-200"
                />
                <input
                  type="text"
                  value={slot.time}
                  onChange={(e) => updateSlot(slot.id, 'time', e.target.value)}
                  placeholder="Time (e.g. 4:00 PM - 5:30 PM)"
                  className="w-1/3 px-2 py-1 text-xs bg-white rounded-lg border border-slate-200"
                />
                <input
                  type="text"
                  value={slot.mode}
                  onChange={(e) => updateSlot(slot.id, 'mode', e.target.value)}
                  placeholder="Mode (Library / Meet)"
                  className="flex-1 px-2 py-1 text-xs bg-white rounded-lg border border-slate-200"
                />
                {slots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(slot.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
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
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
        >
          Publish Peer Tutor Profile
        </button>
      </form>
    </Modal>
  );
};
