import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export const BookingModal = ({ isOpen, onClose, tutor }) => {
  const { currentUser, bookSession, showToast, theme } = useApp();
  const isDark = theme === 'dark';

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
    if (!selectedSlot) {
      showToast('Please select an open timeslot.', 'error');
      return;
    }

    bookSession(
      tutor,
      selectedSlot,
      `Topic: ${studentNote.trim() || 'General Subject Review'}. Contact: ${studentContact.trim() || currentUser.email}`,
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
      title={`📚 Book Tutorial with ${tutor.name.split(' ')[0]}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Self-booking warning */}
        {isOwnListing && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span><strong>Your Own Listing:</strong> You cannot book yourself for a peer tutorial session.</span>
          </div>
        )}

        {/* Tutor Profile Header Card */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="relative">
            <img
              src={tutor.avatar}
              alt={tutor.name}
              className="w-13 h-13 rounded-2xl object-cover ring-2 ring-indigo-500/30 shrink-0"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-slate-900">
              <ShieldCheck className="w-3 h-3" />
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className={`font-extrabold text-sm truncate font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {tutor.name}
            </h4>
            <p className="text-xs text-slate-400 truncate">
              {tutor.role} • {tutor.campusName}
            </p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                100% Free Ministry Service
              </span>
            </div>
          </div>
        </div>

        {/* 1. Choose Subject */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            1. Select Subject to Review *
          </label>
          <select
            value={selectedSubject || tutor.subjects[0]}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white'
                : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          >
            {tutor.subjects.map((sub, idx) => (
              <option key={idx} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Choose Timeslot */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            2. Choose Open Timeslot *
          </label>
          <div className="space-y-2">
            {tutor.slots && tutor.slots.length > 0 ? (
              tutor.slots.map((slot) => {
                const isSelected = selectedSlot?.id === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? isDark
                          ? 'border-indigo-500 bg-indigo-950/60 ring-2 ring-indigo-500/40 text-white'
                          : 'border-indigo-600 bg-indigo-50/80 ring-2 ring-indigo-500/30 text-indigo-950 shadow-xs'
                        : isDark
                        ? 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${isSelected ? (isDark ? 'text-white' : 'text-indigo-950') : (isDark ? 'text-slate-200' : 'text-slate-900')}`}>
                          {slot.day} • {slot.time}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                          <span>{slot.mode}</span>
                        </div>
                      </div>
                    </div>

                    {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />}
                  </div>
                );
              })
            ) : (
              <div className="p-3 text-center text-xs text-slate-400 border border-dashed rounded-xl">
                No open slots available currently.
              </div>
            )}
          </div>
        </div>

        {/* 3. Specific Topic / Problem Set Note */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            3. Specific Topics / Problem Sets (Optional)
          </label>
          <textarea
            rows={2}
            value={studentNote}
            onChange={(e) => setStudentNote(e.target.value)}
            placeholder="e.g. Chapter 4 Integration by parts, problem set #3 from Math 17..."
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* 4. Student Contact Info */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${
            isDark ? 'text-slate-300' : 'text-slate-700'
          }`}>
            4. Your Contact Info (Messenger Name / Mobile Phone) *
          </label>
          <input
            type="text"
            required
            value={studentContact || (currentUser.email ? `${currentUser.name} (${currentUser.email})` : '')}
            onChange={(e) => setStudentContact(e.target.value)}
            placeholder="e.g. 0917-xxx-xxxx or Messenger: Bea Claridad"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
              isDark
                ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Sticky Action Footer */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer transition-all ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={!selectedSlot || isOwnListing}
            className={`flex-1 py-3 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
              selectedSlot && !isOwnListing
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-indigo-500/25 active:scale-[0.99]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isOwnListing ? 'Cannot Book Your Own Listing' : 'Confirm Free Tutorial Booking'}</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
