import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Calendar, Clock, MapPin, CheckCircle2, Plus, Sparkles, Heart, ShieldCheck, Copy, Check } from 'lucide-react';
import { GOSPEL_SESSION_FRAMEWORK } from '../../utils/matchingEngine';

export const TutorPortal = () => {
  const { currentUser, myBookings, tutors, showToast, theme } = useApp();
  const isDark = theme === 'dark';
  const [completedPhases, setCompletedPhases] = useState({});

  const tutorProfile = tutors.find((t) => t.name === currentUser.name) || tutors[0];

  const togglePhase = (bookingId, phaseStep) => {
    const key = `${bookingId}-${phaseStep}`;
    setCompletedPhases((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast(`Step ${phaseStep} updated for session!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Tutor Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#111625] border-amber-500/20 text-white'
          : 'bg-gradient-to-r from-amber-50 via-white to-orange-50 border-amber-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
            />
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 p-1 rounded-full ring-2 ring-slate-900">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
                Tutor Control Center: {currentUser.name}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/30">
                Verified Tutor
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.roleLabel} • {currentUser.campusName}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-2">
          <div className="text-center px-4 py-2 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="text-sm font-black text-amber-400">{tutorProfile?.sessionsGiven || 12}</div>
            <div className="text-[10px] text-slate-400">Sessions Given</div>
          </div>
          <div className="text-center px-4 py-2 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="text-sm font-black text-emerald-400">{tutorProfile?.rating || 5.0} ★</div>
            <div className="text-[10px] text-slate-400">Student Rating</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Incoming Sessions & Gospel Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="genz-card p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white font-heading">
                    Assigned Sessions to Teach
                  </h3>
                  <p className="text-xs text-slate-400">Follow the 3-Phase Gospel Framework for every student</p>
                </div>
              </div>

              <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-500/30">
                {myBookings.length} Scheduled
              </span>
            </div>

            <div className="space-y-4">
              {myBookings.map((bk) => (
                <div key={bk.id} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                        {bk.status}
                      </span>
                      <h4 className="font-extrabold text-base text-white mt-1 font-heading">
                        {bk.subject}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Schedule: <strong>{bk.day} ({bk.time})</strong> • {bk.mode}
                      </p>
                    </div>
                  </div>

                  {/* 3-Phase Gospel Checklist for Tutor */}
                  <div className="p-3.5 bg-black/40 rounded-2xl border border-slate-800 space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
                      Session Facilitation Checklist:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {GOSPEL_SESSION_FRAMEWORK.phases.map((phase) => {
                        const isDone = completedPhases[`${bk.id}-${phase.step}`];
                        return (
                          <div
                            key={phase.step}
                            onClick={() => togglePhase(bk.id, phase.step)}
                            className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center gap-2 ${
                              isDone
                                ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              isDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                            }`}>
                              {isDone ? '✓' : phase.step}
                            </div>
                            <div className="overflow-hidden">
                              <div className="text-[11px] font-extrabold truncate text-white">
                                {phase.title}
                              </div>
                              <div className="text-[9px] text-slate-400">{phase.time}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Gospel Opener Script & Teachable Subjects */}
        <div className="space-y-6">
          {/* Gospel Quick Script */}
          <div className="genz-card p-5 border border-slate-800">
            <span className="text-xs font-black uppercase tracking-widest text-pink-400 block mb-2">
              💡 2-Min Gospel Opener Script:
            </span>
            <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-900/90 p-3 rounded-2xl border border-slate-800 mb-3">
              "Before we solve problem sets, how are you feeling about exams? College can make us feel like our worth depends on our grades. But the Gospel says we are unconditionally loved and valued in Jesus. Let's pray for peace and wisdom!"
            </p>
          </div>

          {/* My Subjects */}
          <div className="genz-card p-5 border border-slate-800">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-2">
              My Teachable Subjects:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tutorProfile?.subjects?.map((sub, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-slate-300">
                  {sub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
