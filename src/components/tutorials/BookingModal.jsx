import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const BookingModal = ({ isOpen, onClose, tutor }) => {
  const { currentUser, bookSession, showToast } = useApp();
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [studentNote, setStudentNote] = useState('');
  const [studentContact, setStudentContact] = useState('');

  if (!tutor) return null;

  const isOwnListing = currentUser && (
    (currentUser.id && tutor.id && currentUser.id === tutor.id) ||
    (currentUser.name && tutor.name && currentUser.name.toLowerCase() === tutor.name.toLowerCase()) ||
    (currentUser.email && tutor.email && currentUser.email.toLowerCase() === tutor.email.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isOwnListing) {
      showToast('⚠️ You cannot book yourself for peer tutoring.', 'error');
      return;
    }
    if (!selectedSlot) return;

    bookSession(
      tutor,
      selectedSlot,
      `Topic: ${studentNote || 'General Review'}. Contact: ${studentContact || currentUser.email}`,
      selectedSubject || tutor.subjects[0]
    );

    onClose();
    setSelectedSlot(null);
    setStudentNote('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`📚 Free Peer Tutorial with ${tutor.name.split(' ')[0]}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {isOwnListing && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
            👑 <strong>Your Own Listing:</strong> You cannot book yourself for a peer tutorial session.
          </div>
        )}

        {/* Tutor Header */}
        <div className="flex items-center gap-3 p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <img
            src={tutor.avatar}
            alt={tutor.name}
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30"
          />
          <div>
            <h4 className="font-extrabold text-sm text-white">{tutor.name}</h4>
            <p className="text-xs text-slate-400">{tutor.role} • {tutor.campusName}</p>
            <span className="inline-block mt-0.5 text-[10px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded-md">
              100% Free Ministry Service
            </span>
          </div>
        </div>

        {/* Choose Subject */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
            1. Select Subject to Review
          </label>
          <select
            value={selectedSubject || tutor.subjects[0]}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          >
            {tutor.subjects.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* Timeslots */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
            2. Choose Open Timeslot
          </label>
          <div className="space-y-2">
            {tutor.slots.map((slot) => {
              const isSelected = selectedSlot?.id === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/50 ring-2 ring-indigo-500/30'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {slot.day} • {slot.time}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-indigo-400" />
                        <span>{slot.mode}</span>
                      </div>
                    </div>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Problem Set Note */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
            3. Specific Topics / Problem Sets (Optional)
          </label>
          <textarea
            rows={2}
            value={studentNote}
            onChange={(e) => setStudentNote(e.target.value)}
            placeholder="e.g. Chapter 4 Integration by parts, problem set #3..."
            className="w-full px-3 py-2 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1.5">
            4. Your Contact (Messenger / Mobile Phone) *
          </label>
          <input
            type="text"
            required
            value={studentContact || currentUser.email || ''}
            onChange={(e) => setStudentContact(e.target.value)}
            placeholder="e.g. 0917-xxx-xxxx or Messenger name"
            className="w-full px-3 py-2 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
          />
        </div>

        <button
          type="submit"
          disabled={!selectedSlot || isOwnListing}
          className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg cursor-pointer ${
            selectedSlot && !isOwnListing
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-indigo-500/25 hover:scale-[1.01]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isOwnListing ? 'Cannot Book Your Own Listing' : 'Confirm Free Tutorial Booking'}
        </button>
      </form>
    </Modal>
  );
};
