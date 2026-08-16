import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, MapPin } from 'lucide-react';

export const PrayerCard = ({ prayer }) => {
  const { togglePrayerSupport, theme } = useApp();
  const isPraise = prayer.type === 'praise';
  const isDark = theme === 'dark';

  return (
    <div
      className={`genz-card p-5 border transition-all duration-200 flex flex-col justify-between ${
        isPraise
          ? isDark
            ? 'border-amber-500/30 bg-gradient-to-br from-amber-950/30 via-slate-900 to-[#111625]'
            : 'border-amber-200 bg-amber-50/50 shadow-xs'
          : isDark
          ? 'border-slate-800 bg-[#111625] hover:border-rose-500/40'
          : 'border-slate-200 bg-white shadow-xs hover:border-rose-300'
      }`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black border ${
                isPraise
                  ? 'bg-amber-500/10 text-amber-500 dark:text-amber-300 border-amber-500/30'
                  : prayer.isAnonymous
                  ? isDark ? 'bg-slate-800 text-slate-400 border-slate-700' : 'bg-slate-100 text-slate-600 border-slate-200'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-300 border-rose-500/30'
              }`}
            >
              {isPraise ? '🙌' : prayer.isAnonymous ? '👤' : prayer.author[0]}
            </div>

            <div>
              <div className={`text-xs font-extrabold leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {prayer.author}
              </div>
              <div className={`text-[10px] mt-1 flex items-center gap-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <MapPin className="w-2.5 h-2.5 text-pink-500" />
                <span>{prayer.campusName}</span>
                <span>• {prayer.createdAt}</span>
              </div>
            </div>
          </div>

          <span
            className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
              isPraise
                ? isDark
                  ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
                : isDark
                ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                : 'bg-rose-100 text-rose-900 border-rose-300'
            }`}
          >
            {prayer.category}
          </span>
        </div>

        {/* Content */}
        <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-200' : 'text-slate-700 font-medium'}`}>
          {prayer.content}
        </p>
      </div>

      {/* Footer */}
      <div className={`pt-3 border-t flex items-center justify-between gap-2 ${isDark ? 'border-slate-800/80' : 'border-slate-100'}`}>
        <div className={`text-[11px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {prayer.prayedCount > 0 ? (
            <span>🙏 <strong>{prayer.prayedCount}</strong> students praying</span>
          ) : (
            <span>Be the first to pray</span>
          )}
        </div>

        <button
          onClick={() => togglePrayerSupport(prayer.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
            prayer.hasPrayed
              ? 'bg-rose-600 text-white shadow-md'
              : isDark
              ? 'bg-slate-900 border border-slate-800 text-rose-400 hover:bg-slate-800'
              : 'bg-slate-100 border border-slate-200 text-rose-600 hover:bg-rose-50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${prayer.hasPrayed ? 'fill-white' : ''}`} />
          <span>{prayer.hasPrayed ? 'Prayed' : 'I Prayed'}</span>
        </button>
      </div>
    </div>
  );
};
