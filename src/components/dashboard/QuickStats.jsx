import React from 'react';
import { BookOpen, Users, Heart, School } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickStats = () => {
  const { tutors, bibleStudies, prayers, theme } = useApp();
  const isDark = theme === 'dark';

  const stats = [
    {
      label: 'Free Peer Tutors',
      value: `${tutors.length + 15}`,
      subtext: 'Across all subjects',
      icon: BookOpen,
      iconColor: 'text-amber-500',
      bg: isDark ? 'bg-amber-400/10 border-amber-400/20' : 'bg-amber-50 border-amber-200'
    },
    {
      label: 'Campus Life Groups',
      value: `${bibleStudies.length + 8}`,
      subtext: 'In dorms & cafes',
      icon: Users,
      iconColor: 'text-emerald-500',
      bg: isDark ? 'bg-emerald-400/10 border-emerald-400/20' : 'bg-emerald-50 border-emerald-200'
    },
    {
      label: 'Prayers Lifted Up',
      value: `${prayers.reduce((acc, p) => acc + p.prayedCount, 0) + 120}`,
      subtext: 'By campus warriors',
      icon: Heart,
      iconColor: 'text-rose-500',
      bg: isDark ? 'bg-rose-400/10 border-rose-400/20' : 'bg-rose-50 border-rose-200'
    },
    {
      label: 'Iloilo Universities',
      value: '10+',
      subtext: 'UPV, ISUFST, CPU, WVSU...',
      icon: School,
      iconColor: 'text-violet-500',
      bg: isDark ? 'bg-violet-400/10 border-violet-400/20' : 'bg-violet-50 border-violet-200'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className={`genz-card p-4 sm:p-5 flex flex-col justify-between border ${
              isDark ? 'border-slate-800' : 'border-slate-200 bg-white shadow-xs'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 rounded-2xl border ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-700 bg-emerald-50 border-emerald-300'
              }`}>
                Live
              </span>
            </div>
            <div>
              <div className={`text-2xl sm:text-3xl font-black mb-0.5 tracking-tight font-heading ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {stat.value}
              </div>
              <div className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {stat.label}
              </div>
              <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-500 font-medium'}`}>
                {stat.subtext}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
