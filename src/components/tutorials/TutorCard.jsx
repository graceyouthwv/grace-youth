import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, BookOpen, ShieldCheck } from 'lucide-react';
import { BookingModal } from './BookingModal';
import { useApp } from '../../context/AppContext';

export const TutorCard = ({ tutor }) => {
  const [showBooking, setShowBooking] = useState(false);
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <>
      <div className={`genz-card p-5 sm:p-6 border flex flex-col justify-between overflow-hidden group transition-all ${
        isDark ? 'border-slate-800 bg-[#111625]' : 'border-slate-200 bg-white shadow-xs'
      }`}>
        <div>
          {/* Card Header & Profile */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={tutor.avatar}
                  alt={tutor.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30 group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-[#111625]" title="Verified Peer Tutor">
                  <ShieldCheck className="w-3 h-3" />
                </span>
              </div>

              <div>
                <h3 className={`font-extrabold text-base leading-snug font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {tutor.name}
                </h3>
                <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{tutor.role}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  <MapPin className="w-3 h-3" />
                  <span>{tutor.campusName}</span>
                </div>
              </div>
            </div>

            {/* Rating Pill */}
            <div className="inline-flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 text-amber-500 dark:text-amber-300 px-2.5 py-1 rounded-xl text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tutor.rating}</span>
            </div>
          </div>

          {/* Ministry Badge */}
          <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-500/10 text-violet-700 dark:text-violet-300 border border-violet-500/20 mb-3">
            ✨ {tutor.badge}
          </div>

          {/* Bio */}
          <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
            "{tutor.bio}"
          </p>

          {/* Subjects Teachable Chips */}
          <div className="mb-4">
            <span className={`text-[10px] font-black uppercase tracking-widest block mb-1.5 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              Reviews & Teaches:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                    isDark ? 'bg-slate-900 border-slate-700 text-slate-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
                  }`}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className={`pt-4 border-t flex items-center justify-between gap-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="text-[11px]">
            <span className={`block font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Next Slot:</span>
            <span className={`font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {tutor.slots[0]?.day} ({tutor.slots[0]?.time.split('-')[0]})
            </span>
          </div>

          <button
            onClick={() => setShowBooking(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Book Free Session &rarr;
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        tutor={tutor}
      />
    </>
  );
};
