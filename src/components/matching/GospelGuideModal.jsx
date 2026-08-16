import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { GOSPEL_SESSION_FRAMEWORK } from '../../utils/matchingEngine';
import { Sparkles, Heart, CheckCircle2, BookOpen, Clock, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GospelGuideModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const sampleGospelStarter = `"Hey! Before we dive into the formulas, how are you really holding up this semester? In college, there's so much pressure to prove our worth through grades and performance. But the Gospel tells us our worth is already secure in Jesus through grace, not our GPA. Can I quickly pray for your peace of mind and wisdom today before we begin?"`;

  const copyStarter = () => {
    navigator.clipboard.writeText(sampleGospelStarter);
    setCopiedPrompt(true);
    showToast('📋 Gospel Conversation Starter copied!', 'info');
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✝️ Session Blueprint: Gospel First, Acads Next"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Intro */}
        <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20">
          <p className="text-slate-300 leading-relaxed font-medium">
            At Grace Youth, tutoring is our bridge of love to reach college students. Every session follows our <strong>3-Phase Framework</strong>: we care for their soul first before diving into academics.
          </p>
        </div>

        {/* 3 Phases */}
        <div className="space-y-3">
          {GOSPEL_SESSION_FRAMEWORK.phases.map((phase) => (
            <div
              key={phase.step}
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start gap-4"
            >
              <div className="flex items-center gap-3 shrink-0">
                <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 text-white font-black flex items-center justify-center text-sm">
                  {phase.step}
                </span>
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-white">
                    {phase.title}
                  </div>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border mt-1 ${phase.color}`}>
                    {phase.time} • {phase.action}
                  </span>
                </div>
              </div>

              <ul className="flex-1 space-y-1 text-xs text-slate-300 sm:border-l sm:border-slate-800 sm:pl-4">
                {phase.points.map((pt, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Ready Gospel Starter Script */}
        <div className="p-4 rounded-2xl bg-black/60 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-400">
              💡 Sample 2-Minute Gospel Conversation Opener:
            </span>
            <button
              onClick={copyStarter}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-xs text-slate-300 italic leading-relaxed">
            {sampleGospelStarter}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all cursor-pointer"
        >
          Understood! I'll Lead with the Gospel & Love
        </button>
      </div>
    </Modal>
  );
};
