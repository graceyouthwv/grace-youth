import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Users, BookOpen, Heart, Calendar, CheckCircle2, AlertCircle, Trash2, Send, Database, Sparkles, Filter } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';

export const AdminDashboardModal = ({ isOpen, onClose }) => {
  const {
    tutors,
    requests,
    prayers,
    events,
    myBookings,
    currentUser,
    setCurrentUser,
    claimRequest,
    cancelBooking,
    showToast
  } = useApp();

  const [adminTab, setAdminTab] = useState('triage'); // 'triage' | 'tutors' | 'gospel_sessions' | 'prayers'
  const [selectedCampusFilter, setSelectedCampusFilter] = useState('all');

  const pendingRequests = requests.filter(
    (r) => selectedCampusFilter === 'all' || r.campusId === selectedCampusFilter
  );

  const handleVerifyTutor = (tutorId) => {
    showToast(`✅ Peer Tutor credentials verified and certified for campus ministry!`, 'success');
  };

  const handleToggleGospelShared = (bookingId) => {
    showToast(`🕊️ Gospel sharing milestone logged for session! Discipleship team notified.`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Grace Youth Ministry Admin & Command Center"
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Admin Header Info */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-violet-950/60 via-slate-900 to-[#111625] border border-violet-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center font-black text-xl shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base text-white font-heading">
                  Ministry Leader Console
                </h4>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Active Admin: <strong>{currentUser.name}</strong> ({currentUser.roleLabel})
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-2">
            <div className="text-center px-3 py-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-sm font-black text-amber-400">{requests.length}</div>
              <div className="text-[10px] text-slate-500">Requests</div>
            </div>
            <div className="text-center px-3 py-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-sm font-black text-violet-400">{tutors.length}</div>
              <div className="text-[10px] text-slate-500">Tutors</div>
            </div>
            <div className="text-center px-3 py-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="text-sm font-black text-rose-400">{prayers.length}</div>
              <div className="text-[10px] text-slate-500">Prayers</div>
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setAdminTab('triage')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'triage' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            📢 Request Triage ({requests.length})
          </button>
          <button
            onClick={() => setAdminTab('gospel_sessions')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'gospel_sessions' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            ✝️ Gospel Sessions ({myBookings.length})
          </button>
          <button
            onClick={() => setAdminTab('tutors')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'tutors' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            👨‍🏫 Tutor Verification ({tutors.length})
          </button>
          <button
            onClick={() => setAdminTab('prayers')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
              adminTab === 'prayers' ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            🙏 Prayer Moderation ({prayers.length})
          </button>
        </div>

        {/* Tab 1: Request Triage & Dispatch */}
        {adminTab === 'triage' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                Incoming Student Requests across Western Visayas:
              </span>
              <select
                value={selectedCampusFilter}
                onChange={(e) => setSelectedCampusFilter(e.target.value)}
                className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              >
                {CAMPUSES.map((c) => (
                  <option key={c.id} value={c.id}>{c.shortName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-extrabold text-white">{req.subject}</span>
                      <span className="text-[10px] font-black text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.2 rounded-full">
                        {req.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Student: <strong>{req.studentName}</strong> • {req.campusName} • {req.program}
                    </p>
                    <p className="text-[11px] text-slate-500 italic mt-0.5">"{req.description}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => claimRequest(req.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-extrabold text-xs shadow-md cursor-pointer hover:scale-105"
                    >
                      Assign Tutor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Gospel-First Session Oversight */}
        {adminTab === 'gospel_sessions' && (
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              Active Tutoring Sessions & Gospel Sharing Logs:
            </span>

            {myBookings.map((bk) => (
              <div
                key={bk.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">{bk.subject}</span>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                      {bk.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Tutor: <strong>{bk.tutorName}</strong> • {bk.day} ({bk.time}) • {bk.mode}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleGospelShared(bk.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-emerald-900/50 text-emerald-300 border border-slate-700 hover:border-emerald-500/50 font-bold text-xs cursor-pointer"
                  >
                    ✓ Log Gospel Shared
                  </button>
                  <button
                    onClick={() => cancelBooking(bk.id)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-rose-400 border border-slate-700"
                    title="Cancel Session"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Tutor Verification */}
        {adminTab === 'tutors' && (
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              Registered Peer Tutors & Safeguarding Status:
            </span>

            {tutors.map((tutor) => (
              <div
                key={tutor.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img src={tutor.avatar} alt={tutor.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="text-xs font-extrabold text-white">{tutor.name}</div>
                    <div className="text-[11px] text-slate-400">{tutor.role} • {tutor.campusName}</div>
                    <div className="text-[10px] text-violet-400">{tutor.subjects.join(', ')}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleVerifyTutor(tutor.id)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 font-bold text-xs hover:bg-emerald-900 cursor-pointer"
                >
                  ✓ Verified Leader
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Prayer Moderation */}
        {adminTab === 'prayers' && (
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              Community Prayer Requests & Intercession Watch:
            </span>

            {prayers.map((prayer) => (
              <div
                key={prayer.id}
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-white">{prayer.author}</span>
                    <span className="text-[10px] text-slate-400">({prayer.campusName})</span>
                    <span className="text-[10px] text-rose-400 bg-rose-950/60 px-2 py-0.2 rounded-full">
                      {prayer.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 italic">"{prayer.content}"</p>
                </div>

                <span className="text-xs font-black text-rose-400 shrink-0">
                  ❤️ {prayer.prayedCount} praying
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};
