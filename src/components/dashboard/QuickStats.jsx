import React from 'react';
import { BookOpen, Users, Heart, GraduationCap, ArrowUpRight, Sparkles, Video, Coffee, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickStats = () => {
  const { tutors, bibleStudies, prayers, language, theme, setActiveTab } = useApp();
  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';

  const pillars = [
    {
      title: isHlg ? 'Peer Tutoring' : '1-on-1 Peer Tutoring',
      desc: isHlg ? 'Libre nga pagtuon sa STEM, Math, Nursing & Board Prep' : 'Free 1-on-1 video tutorials across STEM, Business, Nursing & Arts',
      stat: tutors.length > 0 ? `${tutors.length} Mentors Ready` : '100% Free Video',
      icon: BookOpen,
      tab: 'tutorials',
      badge: 'Academic Support',
      color: 'indigo',
      accentBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
      gradient: 'from-indigo-500/5 to-transparent'
    },
    {
      title: isHlg ? 'Campus Life Groups' : 'Campus Life Groups',
      desc: isHlg ? 'Discipleship circles para sa pagtuon sa Bibliya' : 'Intentional discipleship circles & real talk community over coffee',
      stat: bibleStudies.length > 0 ? `${bibleStudies.length} Active Circles` : 'Weekly Circles',
      icon: Users,
      tab: 'discipleship',
      badge: 'Discipleship',
      color: 'emerald',
      accentBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
      gradient: 'from-emerald-500/5 to-transparent'
    },
    {
      title: isHlg ? 'Pangamuyo & Pag-atipan' : 'Prayer & Pastoral Care',
      desc: isHlg ? 'Kompidensyal nga pangamuyo kag pastoral counsel' : 'Confidential prayer wall, 24/7 care & academic stress support',
      stat: prayers.length > 0 ? `${prayers.length} Requests Prayed` : '24/7 Confidential',
      icon: Heart,
      tab: 'home',
      badge: 'Pastoral Care',
      color: 'rose',
      accentBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
      gradient: 'from-rose-500/5 to-transparent'
    },
    {
      title: isHlg ? '17 Rehiyon sa Pilipinas' : '17 Philippine Regions',
      desc: isHlg ? 'Bukas sa tanan nga kolehiyo kag unibersidad' : 'Nationwide online network connecting state universities & colleges',
      stat: 'Nationwide Network',
      icon: GraduationCap,
      tab: 'partners',
      badge: 'Collegiate Hub',
      color: 'amber',
      accentBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
      gradient: 'from-amber-500/5 to-transparent'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {pillars.map((pillar, idx) => {
        const Icon = pillar.icon;
        return (
          <div
            key={idx}
            onClick={() => setActiveTab(pillar.tab)}
            className={`group relative p-5 sm:p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-gradient-to-b ${pillar.gradient} bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110 ${pillar.accentBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors font-heading">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">{pillar.stat}</span>
              <span className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default QuickStats;
