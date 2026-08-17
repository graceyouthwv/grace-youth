import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matchingEngine';
import { Sparkles, Users, BookOpen, ShieldCheck, ArrowRight, Heart, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';
import { GospelGuideModal } from './GospelGuideModal';
import { MinistryDispatchModal } from './MinistryDispatchModal';
import { TutorCard } from '../tutorials/TutorCard';

export const SmartMatchHub = () => {
  const { requests, tutors, selectedCampus, currentUser, theme } = useApp();
  const [showGospelGuide, setShowGospelGuide] = useState(false);
  const [selectedRequestForDispatch, setSelectedRequestForDispatch] = useState(null);
  const isDark = theme === 'dark';

  const activeRequests = requests.filter((r) => {
    return selectedCampus === 'all' || r.campusId === selectedCampus;
  });

  return (
    <div className="space-y-6">
      {/* Gospel-First Guarantee Banner */}
      <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-violet-950/40 via-slate-900 to-[#111625] border-violet-500/20 text-white shadow-xl'
          : 'bg-white border-violet-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-black shrink-0 shadow-md">
            ✝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-extrabold text-sm sm:text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Gospel-First Session Guarantee
              </h3>
              <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                isDark
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/30'
                  : 'bg-violet-50 text-violet-700 border-violet-200'
              }`}>
                3-Phase Format
              </span>
            </div>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Every 1-on-1 session opens with a 10-minute heart check and Gospel encouragement before academic tutoring begins.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowGospelGuide(true)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-black border transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 hover:border-violet-500'
              : 'bg-violet-50 hover:bg-violet-100 text-violet-700 border-violet-200 hover:border-violet-300'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-violet-600 dark:text-pink-400" />
          <span>View Session Blueprint</span>
        </button>
      </div>

      {/* P2P Matching Queue & Ministry Dispatch */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-base font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>Peer-to-Peer Match Queue & Triage</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-black border ${
                isDark
                  ? 'bg-indigo-950 text-indigo-300 border-indigo-500/30'
                  : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                {activeRequests.length} Active
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Students match with available campus tutors. If unassigned, ministry leaders triage manually.
            </p>
          </div>
        </div>

        {/* Requests List with Match Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeRequests.map((req) => {
            const isClaimed = req.status.includes('Claimed');
            
            // Find top matched tutor
            const bestMatch = tutors
              .map((t) => ({ ...t, score: calculateMatchScore(req, t).score }))
              .sort((a, b) => b.score - a.score)[0];

            return (
              <div
                key={req.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between transition-all ${
                  isDark
                    ? 'border-slate-800 bg-[#111625]'
                    : 'border-slate-200 bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      isDark
                        ? 'text-indigo-300 bg-indigo-950/60 border-indigo-500/30'
                        : 'text-indigo-700 bg-indigo-50 border-indigo-200'
                    }`}>
                      {req.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                      isDark ? 'text-slate-400 bg-slate-900 border-slate-800' : 'text-slate-600 bg-slate-100 border-slate-200'
                    }`}>
                      {req.campusName}
                    </span>
                  </div>

                  <h4 className={`font-extrabold text-base mb-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {req.subject}
                  </h4>
                  <p className={`text-xs mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Requested by <strong>{req.studentName}</strong> • {req.program}
                  </p>

                  {/* Best Smart Match Pill */}
                  {bestMatch && !isClaimed && (
                    <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between mb-3 ${
                      isDark
                        ? 'bg-slate-900/90 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        <img src={bestMatch.avatar} alt={bestMatch.name} className="w-6 h-6 rounded-lg object-cover" />
                        <span className="truncate">Top Match: <strong>{bestMatch.name}</strong></span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {bestMatch.score}% Match
                      </span>
                    </div>
                  )}
                </div>

                {/* Dispatch Action */}
                <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
                  isDark ? 'border-slate-800' : 'border-slate-100'
                }`}>
                  <span className={`text-xs font-medium ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                    Status: <strong className={isClaimed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{req.status}</strong>
                  </span>

                  {isClaimed ? (
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Matched</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedRequestForDispatch(req)}
                      className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-1"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Ministry Match</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <GospelGuideModal
        isOpen={showGospelGuide}
        onClose={() => setShowGospelGuide(false)}
      />

      <MinistryDispatchModal
        isOpen={!!selectedRequestForDispatch}
        onClose={() => setSelectedRequestForDispatch(null)}
        selectedRequest={selectedRequestForDispatch}
      />
    </div>
  );
};
