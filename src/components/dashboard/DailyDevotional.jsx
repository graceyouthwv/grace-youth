import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookMarked, Sparkles, Copy, Check, Heart, Flame } from 'lucide-react';

export const DailyDevotional = () => {
  const { dailyDevotionals, language, showToast, theme } = useApp();
  const [copied, setCopied] = useState(false);
  const devotional = dailyDevotionals[0];
  const isDark = theme === 'dark';

  const handleCopy = () => {
    const textToCopy = `"${language === 'hlg' ? devotional.verseTextHlg : devotional.verseTextEn}" — ${devotional.verseRef} (via Grace Youth Campus App)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('📋 Scripture copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`p-6 relative overflow-hidden rounded-3xl border shadow-xl mb-8 transition-colors ${
      isDark ? 'bg-[#111625] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
    }`}>
      {/* Top Header */}
      <div className={`flex items-center justify-between gap-2 mb-4 pb-3 border-b ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl border ${
            isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-600 border-pink-200'
          }`}>
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className={`text-xs font-black uppercase tracking-widest ${
              isDark ? 'text-pink-400' : 'text-pink-600'
            }`}>
              Today's Word & Vibe
            </span>
            <span className={`text-xs ml-2 font-bold ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              • {devotional.theme}
            </span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
            isDark
              ? 'bg-slate-800/80 text-slate-300 hover:text-white border-slate-700 hover:border-slate-600'
              : 'bg-slate-50 text-slate-700 hover:text-slate-950 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Scripture Verse */}
      <div className="mb-5">
        <blockquote className={`text-base sm:text-xl font-bold italic leading-relaxed mb-3 ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          "{language === 'hlg' ? devotional.verseTextHlg : devotional.verseTextEn}"
        </blockquote>
        <div className={`text-xs font-black uppercase tracking-wider ${
          isDark ? 'text-amber-400' : 'text-amber-700'
        }`}>
          — {devotional.verseRef}
        </div>
      </div>

      {/* Reflection Box */}
      <div className={`rounded-2xl p-4 border text-xs sm:text-sm leading-relaxed mb-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-800'
      }`}>
        <p>{language === 'hlg' ? devotional.reflectionHlg : devotional.reflectionEn}</p>
      </div>

      {/* Heart Check for College Life */}
      <div className={`flex items-start gap-2.5 text-xs font-medium rounded-2xl p-3.5 border ${
        isDark
          ? 'bg-violet-950/40 border-violet-800/40 text-violet-200'
          : 'bg-violet-50 border-violet-200 text-violet-950'
      }`}>
        <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${
          isDark ? 'text-violet-400' : 'text-violet-600'
        }`} />
        <div>
          <span className={`font-extrabold ${
            isDark ? 'text-violet-300' : 'text-violet-800'
          }`}>
            College Heart Check:{' '}
          </span>
          <span>{devotional.reflectionQuestion}</span>
        </div>
      </div>
    </div>
  );
};
