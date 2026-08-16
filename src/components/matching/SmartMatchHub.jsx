import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matchingEngine';
import { Sparkles, Users, BookOpen, ShieldCheck, ArrowRight, Heart, CheckCircle2, UserCheck, HelpCircle } from 'lucide-react';
import { GospelGuideModal } from './GospelGuideModal';
import { MinistryDispatchModal } from './MinistryDispatchModal';
import { TutorCard } from '../tutorials/TutorCard';

export const SmartMatchHub = () => {
  const { requests, tutors, selectedCampus, currentUser } = useApp();
  const [showGospelGuide, setShowGospelGuide] = useState(false);
  const [selectedRequestForDispatch, setSelectedRequestForDispatch] = useState(null);

  const activeRequests = requests.filter((r) => {
    return selectedCampus === 'all' || r.campusId === selectedCampus;
  });

  return (
    <div className="space-y-6">
      {/* Gospel-First Guarantee Banner */}
      <div className="p-5 sm:p-6 genz-card border border-violet-500/20 bg-gradient-to-r from-violet-950/40 via-slate-900 to-[#111625] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center font-black shrink-0 shadow-md">
            ✝
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white font-heading">
                Gospel-First Session Guarantee
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded-full">
                3-Phase Format
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Every 1-on-1 session opens with a 10-minute heart check and Gospel encouragement before academic tutoring begins.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowGospelGuide(true)}
          className="px-4 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-extrabold border border-slate-700 hover:border-violet-500 transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
        >
          <BookOpen className="w-3.5 h-3.5 text-pink-400" />
          <span>View Session Blueprint</span>
        </button>
      </div>

      {/* P2P Matching Queue & Ministry Dispatch */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2 font-heading">
              <span>Peer-to-Peer Match Queue & Triage</span>
              <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-black">
                {activeRequests.length} Active
              </span>
            </h3>
            <p className="text-xs text-slate-400">
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
                className="genz-card p-5 border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                      {req.category}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-md">
                      {req.campusName}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-base text-white mb-1 font-heading">
                    {req.subject}
                  </h4>
                  <p className="text-xs text-slate-400 mb-3">
                    Requested by <strong>{req.studentName}</strong> • {req.program}
                  </p>

                  {/* Best Smart Match Pill */}
                  {bestMatch && !isClaimed && (
                    <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <img src={bestMatch.avatar} alt={bestMatch.name} className="w-6 h-6 rounded-lg object-cover" />
                        <span className="truncate">Top Match: <strong>{bestMatch.name}</strong></span>
                      </div>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                        {bestMatch.score}% Match
                      </span>
                    </div>
                  )}
                </div>

                {/* Dispatch Action */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs text-slate-500 font-medium">
                    Status: <strong className={isClaimed ? 'text-emerald-400' : 'text-amber-400'}>{req.status}</strong>
                  </span>

                  {isClaimed ? (
                    <span className="text-xs font-black text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Matched</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => setSelectedRequestForDispatch(req)}
                      className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md cursor-pointer flex items-center gap-1"
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
