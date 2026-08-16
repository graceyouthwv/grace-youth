import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookMarked, Sparkles, Copy, Check, Heart, Flame } from 'lucide-react';

export const DailyDevotional = () => {
  const { dailyDevotionals, language, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const devotional = dailyDevotionals[0];

  const handleCopy = () => {
    const textToCopy = `"${language === 'hlg' ? devotional.verseTextHlg : devotional.verseTextEn}" — ${devotional.verseRef} (via Grace Youth Campus App)`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    showToast('📋 Scripture copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="genz-card p-6 relative overflow-hidden border border-slate-800 shadow-xl mb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-pink-400">
              Today's Word & Vibe
            </span>
            <span className="text-xs text-slate-400 ml-2 font-medium">• {devotional.theme}</span>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-xl transition-all cursor-pointer hover:border-slate-600"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span>{copied ? 'Copied' : 'Share'}</span>
        </button>
      </div>

      {/* Scripture Verse */}
      <div className="mb-5">
        <blockquote className="text-base sm:text-xl font-semibold text-slate-100 italic leading-relaxed mb-3">
          "{language === 'hlg' ? devotional.verseTextHlg : devotional.verseTextEn}"
        </blockquote>
        <div className="text-xs font-black uppercase tracking-wider text-amber-400">
          — {devotional.verseRef}
        </div>
      </div>

      {/* Reflection Box */}
      <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
        <p>{language === 'hlg' ? devotional.reflectionHlg : devotional.reflectionEn}</p>
      </div>

      {/* Heart Check for College Life */}
      <div className="flex items-start gap-2.5 text-xs font-medium text-violet-200 bg-violet-950/40 rounded-2xl p-3.5 border border-violet-800/40">
        <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-violet-300">College Heart Check: </span>
          <span>{devotional.reflectionQuestion}</span>
        </div>
      </div>
    </div>
  );
};
