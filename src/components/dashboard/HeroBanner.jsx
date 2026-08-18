import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Users,
  HeartHandshake,
  ArrowRight,
  Sparkles,
  MapPin,
  GraduationCap,
  Video,
  Zap,
  Coffee,
  CheckCircle2,
  TrendingUp,
  MessageCircle,
  FileText
} from 'lucide-react';
import { CampusSelector } from '../common/CampusSelector';
import { VolunteerModal } from '../common/VolunteerModal';
import { getTranslation } from '../../data/translations';
import { CARTOON_PRESET_AVATARS } from '../../data/avatars';

export const HeroBanner = () => {
  const { setActiveTab, language, theme, selectedCampus, setSelectedCampus } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const isDark = theme === 'dark';

  const t = (key) => getTranslation(key, language);

  const trendingSubjects = [
    'Calculus 1 & 2',
    'Organic Chemistry',
    'Anatomy & Physio',
    'Financial Accounting',
    'Physics 71 / Statics',
    'General Chemistry'
  ];

  return (
    <>
      <section className="relative overflow-hidden rounded-[2.5rem] mb-8 transition-all duration-300 border border-indigo-100 dark:border-slate-800 bg-gradient-to-br from-white via-indigo-50/30 to-violet-50/40 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 shadow-xl shadow-indigo-500/5">
        {/* Playful Ambient Glow Blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-indigo-400/20 to-pink-400/20 dark:from-indigo-600/20 dark:to-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-gradient-to-tr from-teal-400/20 to-indigo-400/20 dark:from-emerald-600/15 dark:to-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-10 lg:p-12">
          {/* Main Grid: Left Pitch, Right Interactive Gen-Z Feature Widgets */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LEFT COLUMN: PUNCHY COPY & CTAS */}
            <div className="lg:col-span-7 space-y-6">
              {/* Gen-Z Badges Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/30 animate-pulse">
                  <Zap className="w-3 h-3" />
                  <span>100% Free For Students 🇵🇭</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>No Gatekeeping • Real Community</span>
                </span>
              </div>

              {/* Bold Headline */}
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] font-heading">
                  Ace your{' '}
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-500 dark:from-indigo-400 dark:via-violet-400 dark:to-pink-400">
                    Academics.
                  </span>
                  <br />
                  Find your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300">
                    Tribe in Christ.
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-xl pt-2">
                  Free 1-on-1 peer tutoring with video calls, intentional college Life Groups, and 24/7 pastoral care — built by and for Christian students across the Philippines.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
                <button
                  onClick={() => setActiveTab('tutorials')}
                  className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-white" />
                  <span>Find a Free Peer Tutor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('discipleship')}
                  className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white font-extrabold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Coffee className="w-4 h-4 text-emerald-500" />
                  <span>Join Campus Life Group</span>
                </button>
              </div>

              {/* Volunteer Sub-Link */}
              <div className="pt-1">
                <button
                  onClick={() => setShowVolunteerModal(true)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors cursor-pointer group"
                >
                  <span className="p-1 rounded-lg bg-pink-500/10 text-pink-500 group-hover:scale-110 transition-transform">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </span>
                  <span>Want to mentor batchmates or serve on campus? <strong className="underline underline-offset-2">Apply as Tutor / Youth Worker &rarr;</strong></span>
                </button>
              </div>

              {/* Trending Subjects Quick Pills */}
              <div className="pt-2 border-t border-indigo-100/60 dark:border-slate-800/80">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="text-[11px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Trending:
                  </span>
                  {trendingSubjects.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTab('tutorials')}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer"
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE GEN-Z CARDS / LIVE PREVIEWS */}
            <div className="lg:col-span-5 space-y-3.5">
              {/* Card 1: 1-on-1 Free Study Room Preview */}
              <div className="p-4 sm:p-5 rounded-3xl border border-indigo-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-indigo-500/5 hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>Free 1-on-1 Study Room</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      </div>
                      <div className="text-[10px] text-slate-400">Zero software install • WebRTC HD</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                    Live Video
                  </span>
                </div>

                {/* Match Mockup Bar */}
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex -space-x-2">
                      <img src={CARTOON_PRESET_AVATARS[0]} alt="Tutor" className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900" />
                      <img src={CARTOON_PRESET_AVATARS[1]} alt="Student" className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-slate-800 dark:text-slate-200">Math 17 / Org Chem Review</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">Matched in &lt;2 mins • Screen Share ON</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('tutorials')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] cursor-pointer shrink-0"
                  >
                    Join
                  </button>
                </div>
              </div>

              {/* Card 2: Campus Life Group & Coffee Community */}
              <div className="p-4 sm:p-5 rounded-3xl border border-emerald-200/60 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-lg shadow-emerald-500/5 hover:-translate-y-1 transition-transform">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <Coffee className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white">
                        Campus Life Group Circles
                      </div>
                      <div className="text-[10px] text-slate-400">Weekly meetups • Safe discussions</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    Weekly
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white">"Overcoming Academic Burnout"</span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Tuesdays @ Campus Gazebo / Online Hub</div>
                  </div>
                  <button
                    onClick={() => setActiveTab('discipleship')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] cursor-pointer shrink-0"
                  >
                    Explore
                  </button>
                </div>
              </div>

              {/* Card 3: Free Reviewers & Exam Bank */}
              <div className="p-3.5 rounded-2xl border border-violet-200/60 dark:border-slate-800 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-violet-600/15 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-slate-900 dark:text-white">Reviewer Vault & Study Sets</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Past midterms, syllabus guides, cheat sheets</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('reviewers')}
                  className="px-3 py-1 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-[11px] cursor-pointer shrink-0"
                >
                  View Vault
                </button>
              </div>
            </div>
          </div>

          {/* Integrated Campus & Region Search Filter Bar */}
          <div className="mt-8 pt-6 border-t border-indigo-100/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 dark:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>Find Peer Tutors & Life Groups by Campus:</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-3xl bg-white/90 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <CampusSelector />
            </div>
          </div>
        </div>
      </section>

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />
    </>
  );
};
export default HeroBanner;
