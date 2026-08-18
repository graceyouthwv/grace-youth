import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Calendar, MapPin, Ticket, Users, CheckCircle2, Sparkles, Clock } from 'lucide-react';

export const AddCampaignModal = ({ isOpen, onClose }) => {
  const { addCampaign, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Youth Fellowship');
  const [registrationFee, setRegistrationFee] = useState('250');
  const [maxCapacity, setMaxCapacity] = useState('250');
  const [campusId, setCampusId] = useState('all');
  const [date, setDate] = useState('December 18, 2026');
  const [time, setTime] = useState('4:00 PM - 8:30 PM');
  const [venue, setVenue] = useState('Iloilo City Youth Pavilion & Fellowship Grounds');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeNum = parseFloat(registrationFee);
    const capacityNum = parseInt(maxCapacity, 10) || 200;

    if (!title.trim()) {
      showToast('Please enter an event title.', 'error');
      return;
    }

    if (isNaN(feeNum) || feeNum < 0) {
      showToast('Please enter a valid registration fee.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addCampaign({
      title: title.trim(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Iloilo Campuses',
      registrationFee: feeNum,
      maxCapacity: capacityNum,
      registeredCount: 0,
      date: date.trim() || 'December 18, 2026',
      time: time.trim() || '4:00 PM - 8:30 PM',
      venue: venue.trim() || 'Iloilo City Fellowship Grounds',
      description: description.trim() || 'Citywide campus youth gathering with dinner, acoustic worship, and discipleship breakout sessions.',
      image: image.trim() || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
      organizer: 'Grace Youth Campus Council',
      status: 'Open',
      registrants: []
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎟️ Launch New Event & Set Registration Fee"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
        }`}>
          ✨ <strong>Admin Event Registration Management:</strong> Create events (e.g. December Meet & Greet, regional youth camps) and set the exact registration fee per attendee.
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Event Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. December Citywide Meet & Greet and Youth Fellowship"
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
              <option value="Youth Fellowship">🤝 Youth Fellowship & Meet-and-Greet</option>
              <option value="Youth Camp">🏕️ Youth Camp & Retreat</option>
              <option value="Leadership Retreat">⚡ Leadership Training Lab</option>
              <option value="Worship Night">🎸 Campus Acoustic Worship Night</option>
              <option value="Mission Outreach">🌍 Campus Mission & Community Care</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Registration Fee (₱) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">₱</span>
              <input
                type="number"
                required
                min="0"
                step="50"
                value={registrationFee}
                onChange={(e) => setRegistrationFee(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-black font-heading ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Event Date *
            </label>
            <input
              type="text"
              placeholder="e.g. December 18, 2026"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Attendee Capacity (Slots)
            </label>
            <input
              type="number"
              min="10"
              value={maxCapacity}
              onChange={(e) => setMaxCapacity(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Venue / Location *
            </label>
            <input
              type="text"
              placeholder="e.g. Iloilo City Youth Pavilion"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Target Campuses
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="all">📍 All Iloilo Campuses</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Description & Highlights
          </label>
          <textarea
            rows={2}
            placeholder="Includes full dinner buffet, acoustic worship, icebreakers, and welcoming pack..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Cover Photo URL (Optional)
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4 text-white" />
            <span>Publish Event Registration (₱{registrationFee})</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
