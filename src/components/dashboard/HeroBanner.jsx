import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Users, HeartHandshake, ArrowRight, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { CampusSelector } from '../common/CampusSelector';
import { VolunteerModal } from '../common/VolunteerModal';
import { getTranslation } from '../../data/translations';

export const HeroBanner = () => {
  const { setActiveTab, language, theme } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const isDark = theme === 'dark';

  const t = (key) => getTranslation(key, language);

  return (
    <>
      <section className="relative overflow-hidden rounded-3xl mb-8 transition-all duration-300 border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/90 dark:to-[#0b0f19] shadow-sm">
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-0 right-1/4 -mt-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 -mb-20 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="max-w-3xl">
            {/* Top Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{t('hero_badge') || 'Philippine Collegiate Ministry & Online Network'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-5 leading-[1.12] font-heading">
              {t('hero_title_1') || 'Excel in'}{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                {t('hero_title_acads') || 'Academics.'}
              </span>{' '}
              <br className="hidden sm:inline" />
              {t('hero_title_2') || 'Thrive in'}{' '}
              <span className="text-emerald-600 dark:text-emerald-400">
                {t('hero_title_faith') || 'Faith.'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 font-normal mb-8 leading-relaxed max-w-2xl">
              {t('hero_subtitle') ||
                'Connecting college and university students across the Philippines with free peer tutoring, intentional discipleship Life Groups, and 24/7 pastoral care in Christ.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => setActiveTab('tutorials')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('hero_cta_tutor') || 'Find a Free Peer Tutor'}</span>
                <ArrowRight className="w-4 h-4 opacity-80" />
              </button>

              <button
                onClick={() => setActiveTab('discipleship')}
                className="flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 shadow-2xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('hero_cta_group') || 'Join a Campus Life Group'}</span>
              </button>

              <button
                onClick={() => setShowVolunteerModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300 transition-colors py-2 px-1 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-pink-500" />
                <span>{language === 'hlg' ? 'Gusto mag-alagad? Mag-Volunteer →' : 'Looking to serve? Volunteer as a Tutor or Youth Worker →'}</span>
              </button>
            </div>
          </div>

          {/* Integrated Campus & Region Search Filter Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800/80">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                <span>{language === 'hlg' ? 'Pilion ang imo Rehiyon & Campus' : 'Find Resources by Region & Campus'}</span>
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60">
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
