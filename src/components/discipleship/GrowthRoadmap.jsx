import React from 'react';
import { DISCIPLESHIP_STAGES } from '../../data/bibleStudies';
import { Sparkles } from 'lucide-react';

export const GrowthRoadmap = () => {
  const stages = DISCIPLESHIP_STAGES || [];

  return (
    <div className="genz-card p-6 sm:p-8 border border-slate-800">
      <div className="max-w-2xl mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-black mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Discipleship Pathway</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
          The Grace Youth Spiritual Growth Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Whether you are exploring Christianity for the first time or leading peers, here is your path.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map((st) => (
          <div
            key={st.stage}
            className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black flex items-center justify-center text-sm shadow-md">
                  {st.stage}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  {st.badge || 'Stage'}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-white mb-1 font-heading">
                {st.name || st.title || 'Milestone'}
              </h3>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {st.description}
              </p>

              {st.topics && st.topics.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                    Key Topics:
                  </span>
                  <ul className="space-y-1">
                    {st.topics.map((top, tIdx) => (
                      <li key={tIdx} className="text-xs text-slate-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{top}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 text-[11px] font-bold text-emerald-400">
              Next Step: {st.action || st.milestone || 'Connect with a leader'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
