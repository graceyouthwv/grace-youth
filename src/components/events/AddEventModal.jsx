import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Calendar, Clock, MapPin, Sparkles, CheckCircle2, Gift } from 'lucide-react';

export const AddEventModal = ({ isOpen, onClose }) => {
  const { addEvent, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Campus Night');
  const [campusId, setCampusId] = useState('all');
  const [date, setDate] = useState('Friday, Aug 28, 2026');
  const [time, setTime] = useState('5:30 PM - 8:30 PM');
  const [venue, setVenue] = useState('CAS Gazebo / Student Lounge');
  const [description, setDescription] = useState('');
  const [freebiesInput, setFreebiesInput] = useState('Free Pizza & Milk Tea, Exam Reviewer Kit');
  const [image, setImage] = useState('');

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

    addEvent({
      title: title.trim(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Campuses (Western Visayas)',
      date: date.trim() || 'Upcoming Friday',
      time: time.trim() || '5:00 PM - 8:00 PM',
      venue: venue.trim() || 'University Campus Grounds',
      description: description.trim() || 'Campus fellowship, acoustic worship, free study snacks, and inspirational peer connection.',
      freebies: freebies.length ? freebies : ['Free Dinner', 'Reviewer Booklet'],
      image: image.trim() || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
      attendeesCount: 1,
      isRsvp: true
    });

    setTitle('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎉 Create Campus Fellowship & Event"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-purple-950/40 border-purple-500/30 text-purple-200' : 'bg-purple-50 border-purple-200 text-purple-900'
        }`}>
          ✨ <strong>Organize Campus Gatherings:</strong> Host welcoming nights, midterms study camps, acoustic worship sessions, and campus-wide fellowships.
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Event Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Midterm De-Stress & Acoustic Praise Night"
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
              Event Type *
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
              placeholder="e.g. Friday, Sept 4, 2026"
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
              placeholder="e.g. 5:30 PM - 8:30 PM"
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
            placeholder="e.g. UPV CAS Gazebo, Miagao / CPU Student Center"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Free Inclusions / Food / Perks (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Free Pizza & Iced Coffee, Reviewer Kit, Sticker Pack"
            value={freebiesInput}
            onChange={(e) => setFreebiesInput(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Description / Invitation Message
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Come unwind after grueling quiz weeks with praise songs, games, and fellowship with campus peers!"
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Campus Event</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
