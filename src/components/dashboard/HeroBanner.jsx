import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users, Heart, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { CampusSelector } from '../common/CampusSelector';
import { VolunteerModal } from '../common/VolunteerModal';

export const HeroBanner = () => {
  const { setActiveTab, language, theme } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl genz-card shadow-xl p-6 sm:p-10 mb-8 genz-glow border">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 -mb-16 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          {/* Top Tag */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold shadow-xs border ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-indigo-50 border-indigo-200 text-indigo-800'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
              <span>Iloilo College Ministry Movement</span>
            </div>

            <button
              onClick={() => setShowVolunteerModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>🤝 Volunteer as Youth Worker / Tutor</span>
            </button>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight font-heading">
            Ace your{' '}
            <span className={isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-violet-400 font-black' : 'gradient-text-acads'}>
              Acads
            </span>
            . Walk in{' '}
            <span className={isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-emerald-400 font-black' : 'gradient-text-faith'}>
              Faith
            </span>
            .
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-base lg:text-lg mb-8 leading-relaxed max-w-2xl font-medium ${
            isDark ? 'text-slate-300' : 'text-slate-700 font-semibold'
          }`}>
            Free 1-on-1 peer tutorials, high-yield cheat sheets, campus life groups, and 24/7 prayer support for college students across Iloilo universities.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <button
              onClick={() => setActiveTab('tutorials')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-slate-950" />
              <span className="text-slate-950 font-black">Book Free Peer Tutorial</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>

            <button
              onClick={() => setActiveTab('discipleship')}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 hover:bg-slate-800 text-white border-slate-700' : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 shadow-xs'
              }`}
            >
              <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Join Campus Life Group</span>
            </button>

            <button
              onClick={() => setShowVolunteerModal(true)}
              className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl font-black text-xs sm:text-sm border hover:scale-105 active:scale-95 transition-all cursor-pointer ${
                isDark ? 'bg-slate-900 hover:bg-slate-800 text-pink-300 border-slate-700' : 'bg-pink-50 hover:bg-pink-100 text-pink-900 border-pink-300 shadow-xs'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-pink-600 dark:text-pink-400" />
              <span>Volunteer as Youth Worker</span>
            </button>
          </div>

          {/* Campus Filter inside Hero */}
          <div className={`pt-6 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <p className={`text-[11px] font-black uppercase tracking-widest mb-2.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Filter by Your University:
            </p>
            <div className={`p-2 rounded-2xl border ${isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <CampusSelector />
            </div>
          </div>
        </div>
      </div>

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />
    </>
  );
};
