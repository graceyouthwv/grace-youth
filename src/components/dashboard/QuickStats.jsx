import React from 'react';
import { BookOpen, Users, Heart, GraduationCap, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickStats = () => {
  const { tutors, bibleStudies, prayers, language, theme, setActiveTab } = useApp();
  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';

  const pillars = [
    {
      title: isHlg ? 'Peer Tutoring' : 'Peer Tutoring',
      desc: isHlg ? 'Libre nga pagtuon sa STEM, Math, Nursing & Board Prep' : '1-on-1 peer mentoring across STEM, Business, Nursing & Arts',
      stat: tutors.length > 0 ? `${tutors.length} Mentors` : '100% Free',
      icon: BookOpen,
      tab: 'tutorials',
      badge: 'Academic Support'
    },
    {
      title: isHlg ? 'Campus Life Groups' : 'Campus Life Groups',
      desc: isHlg ? 'Discipleship circles para sa pagtuon sa Bibliya' : 'Intentional discipleship circles & genuine community',
      stat: bibleStudies.length > 0 ? `${bibleStudies.length} Circles` : 'Weekly Circles',
      icon: Users,
      tab: 'discipleship',
      badge: 'Fellowship'
    },
    {
      title: isHlg ? 'Pangamuyo & Pag-atipan' : 'Prayer & Pastoral Care',
      desc: isHlg ? 'Kompidensyal nga pangamuyo kag pastoral counsel' : 'Confidential prayer wall & 24/7 pastoral counseling',
      stat: prayers.length > 0 ? `${prayers.length} Requests` : '24/7 Available',
      icon: Heart,
      tab: 'home',
      badge: 'Pastoral Care'
    },
    {
      title: isHlg ? '17 Rehiyon sa Pilipinas' : '17 Philippine Regions',
      desc: isHlg ? 'Bukas sa tanan nga kolehiyo kag unibersidad' : 'Nationwide online network & campus presence',
      stat: 'Nationwide',
      icon: GraduationCap,
      tab: 'partners',
      badge: 'Collegiate'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
      {pillars.map((pillar, idx) => {
        const Icon = pillar.icon;
        return (
          <div
            key={idx}
            onClick={() => setActiveTab(pillar.tab)}
            className="group relative p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-transform group-hover:scale-105">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {pillar.badge}
                </span>
              </div>

              <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {pillar.desc}
              </p>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>{pillar.stat}</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default QuickStats;
