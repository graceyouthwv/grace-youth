import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, BookOpen, ShieldCheck, Laptop, School, Sparkles, Globe } from 'lucide-react';
import { BookingModal } from './BookingModal';
import { useApp } from '../../context/AppContext';

export const TutorCard = ({ tutor }) => {
  const [showBooking, setShowBooking] = useState(false);
  const { currentUser, language, theme } = useApp();
  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';

  const isOwnListing = currentUser && (
    (currentUser.id && tutor.id && currentUser.id === tutor.id) ||
    (currentUser.name && tutor.name && currentUser.name.toLowerCase() === tutor.name.toLowerCase()) ||
    (currentUser.email && tutor.email && currentUser.email.toLowerCase() === tutor.email.toLowerCase())
  );

  const isOnline = tutor.preferredMode === 'Online' || tutor.isOnlineNationwide;
  const isHybrid = tutor.preferredMode === 'Hybrid';

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
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate max-w-[170px]">{tutor.campusName}</span>
                </div>
              </div>
            </div>

            {/* Rating Pill */}
            <div className="inline-flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 text-amber-500 dark:text-amber-300 px-2.5 py-1 rounded-xl text-xs font-black">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{tutor.rating}</span>
            </div>
          </div>

          {/* Badges & Modality Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <div className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
              isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}>
              ✨ {tutor.badge}
            </div>

            {/* Online / F2F Modality Tag */}
            {isHybrid ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                <Globe className="w-2.5 h-2.5" />
                <span>Hybrid (Online + F2F)</span>
              </span>
            ) : isOnline ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-600 dark:text-blue-300 border border-blue-500/30">
                <Laptop className="w-2.5 h-2.5" />
                <span>💻 Online (Nationwide)</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-violet-500/15 text-violet-600 dark:text-violet-300 border border-violet-500/30">
                <School className="w-2.5 h-2.5" />
                <span>📍 Face-to-Face</span>
              </span>
            )}

            {isOwnListing && (
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-500 dark:text-amber-400 border border-amber-500/30">
                👑 Your Listing
              </div>
            )}
          </div>

          {/* Bio */}
          <p className={`text-xs leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-slate-300' : 'text-slate-700 font-medium'}`}>
            "{tutor.bio}"
          </p>

          {/* Subjects Teachable Chips */}
          <div className="mb-4">
            <span className={`text-[10px] font-black uppercase tracking-widest block mb-1.5 ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              {isHlg ? 'Ginatudlo kag Ginarebyu:' : 'Reviews & Teaches:'}
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
            <span className={`block font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {isHlg ? 'Bakante:' : 'Next Slot:'}
            </span>
            <span className={`font-black ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
              {tutor.slots[0]?.day} ({tutor.slots[0]?.time?.split('-')[0]})
            </span>
          </div>

          {isOwnListing ? (
            <span className="px-3.5 py-2 rounded-xl bg-slate-800 text-amber-300 font-bold text-xs border border-amber-500/30">
              👑 Your Tutor Profile
            </span>
          ) : (
            <button
              onClick={() => setShowBooking(true)}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              {isHlg ? 'Mag-Book sang Libreng Session →' : 'Book Free Session →'}
            </button>
          )}
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
