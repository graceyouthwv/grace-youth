import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, BookOpen, Users, Heart, ShieldCheck, UserCheck, GraduationCap, Tent, Sparkles, Building2 } from 'lucide-react';
import { getTranslation } from '../../data/translations';

export const TabNav = () => {
  const { activeTab, setActiveTab, currentUser, language } = useApp();
  const isGuest = currentUser.role === 'guest' || !currentUser.email;
  const t = (key) => getTranslation(key, language);

  const tabs = [
    { id: 'home', label: t('nav_feed'), icon: Flame },
    ...(isGuest ? [] : [{
      id: 'portal',
      label: currentUser.role === 'leader' ? 'Admin' : currentUser.role === 'worker' ? 'Worker' : currentUser.role === 'tutor' ? 'Tutor' : 'Hub',
      icon: currentUser.role === 'leader' ? ShieldCheck : currentUser.role === 'worker' ? UserCheck : currentUser.role === 'tutor' ? BookOpen : GraduationCap
    }]),
    { id: 'tutorials', label: 'Acads', icon: BookOpen },
    { id: 'discipleship', label: 'Groups', icon: Users },
    { id: 'giving', label: 'Events', icon: Tent },
    { id: 'partners', label: 'Partner', icon: Sparkles },
    { id: 'prayer', label: 'Prayers', icon: Heart }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c101d]/90 backdrop-blur-xl border-t border-slate-800/90 px-2 py-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-2xl transition-all cursor-pointer ${
                isActive
                  ? 'text-white font-extrabold scale-105'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-tr from-violet-600 to-pink-500 shadow-md shadow-pink-500/20' : ''}`}>
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </div>
              <span className="text-[10px] mt-0.5 font-bold tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
