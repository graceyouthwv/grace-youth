import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, Trash2 } from 'lucide-react';

export const EditEventModal = ({ isOpen, onClose, event }) => {
  const { updateEvent, deleteEvent, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus Night');
  const [campusId, setCampusId] = useState('all');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [description, setDescription] = useState('');
  const [freebiesInput, setFreebiesInput] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setCategory(event.category || 'Campus Night');
      setCampusId(event.campusId || 'all');
      setDate(event.date || '');
      setTime(event.time || '');
      setVenue(event.venue || '');
      setDescription(event.description || '');
      setFreebiesInput(event.freebies?.join(', ') || '');
    }
  }, [event]);

  if (!event) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an event title.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const freebies = freebiesInput
      .split(',')
      .map((f) => f.trim())
      .filter(Boolean);

    updateEvent(event.id, {
      title: title.trim(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Campuses (Western Visayas)',
      date: date.trim() || event.date,
      time: time.trim() || event.time,
      venue: venue.trim() || event.venue,
      description: description.trim() || event.description,
      freebies: freebies.length ? freebies : event.freebies
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete event "${event.title}"?`)) {
      deleteEvent(event.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✏️ Edit Event: ${event.title}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Event Title *
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
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="Campus Night">🎉 Campus Welcoming Night</option>
              <option value="Worship Night">🎸 Acoustic Worship & Prayer</option>
              <option value="De-Stress & Study">☕ Midterms Study Hangout</option>
              <option value="Youth Camp">🏕️ Annual Regional Camp</option>
              <option value="Leadership Summit">🏛️ Student Leadership Summit</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Host Campus *
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="all">📍 All Western Visayas Campuses</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Date *
            </label>
            <input
              type="text"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Time / Schedule *
            </label>
            <input
              type="text"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Venue & Meeting Spot *
          </label>
          <input
            type="text"
            required
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Free Inclusions (comma-separated)
          </label>
          <input
            type="text"
            value={freebiesInput}
            onChange={(e) => setFreebiesInput(e.target.value)}
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
