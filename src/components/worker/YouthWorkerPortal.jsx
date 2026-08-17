import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  HeartHandshake,
  Users,
  Calendar,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Plus,
  Clock,
  MapPin,
  Send,
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Coffee,
  Check,
  AlertCircle,
  Bell
} from 'lucide-react';
import { EditProfileModal } from '../profile/EditProfileModal';

export const YouthWorkerPortal = () => {
  const {
    currentUser,
    bibleStudies,
    myBookings,
    pastoralRequests,
    resolvePastoralRequest,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [activeWorkerTab, setActiveWorkerTab] = useState('pastoral_queue'); // 'pastoral_queue' | 'lifegroups' | 'care_notes'
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [careNotes, setCareNotes] = useState([
    {
      id: 'cn-1',
      studentName: 'Bea Claridad',
      campus: 'UP Visayas',
      date: 'Aug 15, 2026',
      status: 'Followed Up',
      note: 'Had post-tutorial coffee at CAS Gazebo. Shared personal testimony about finding peace during exams. Invited to Thursday Life Group.'
    },
    {
      id: 'cn-2',
      studentName: 'Kenzo Ramirez',
      campus: 'CPU Jaro',
      date: 'Aug 14, 2026',
      status: 'Pending Call',
      note: 'Requested prayer for family financial distress and midterm Calculus anxiety.'
    }
  ]);

  const [newNoteStudent, setNewNoteStudent] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Relevant pastoral requests for this worker or campus
  const myPastoralRequests = pastoralRequests.filter((r) => {
    if (!r.workerName) return true;
    return (
      r.workerName.toLowerCase().includes(currentUser.name.toLowerCase()) ||
      currentUser.name.toLowerCase().includes(r.workerName.toLowerCase()) ||
      currentUser.role === 'leader' ||
      true
    );
  });

  const pendingCount = myPastoralRequests.filter((r) => r.status === 'Pending Contact').length;

  const handleAddCareNote = (e) => {
    e.preventDefault();
    if (!newNoteStudent.trim() || !newNoteContent.trim()) return;

    const created = {
      id: `cn-${Date.now()}`,
      studentName: newNoteStudent,
      campus: currentUser.campusName,
      date: 'Today',
      status: 'Logged',
      note: newNoteContent
    };

    setCareNotes((prev) => [created, ...prev]);
    setNewNoteStudent('');
    setNewNoteContent('');
    showToast('📝 Pastoral care note logged!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Youth Worker Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#111625] border-emerald-500/30 text-white shadow-xl'
          : 'bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-emerald-500/40"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full ring-2 ring-slate-900">
              <HeartHandshake className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Youth Worker Console: {currentUser.name}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-500/30">
                Campus Missionary
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Field pastoral care, discipleship follow-ups, and student life groups for {currentUser.campusName}.
            </p>
          </div>
        </div>

        {/* Worker Quick Metrics & Edit */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Youth Worker */}
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveWorkerTab('pastoral_queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            activeWorkerTab === 'pastoral_queue'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Pastoral Calls & Inquiries ({myPastoralRequests.length})</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-black text-[10px] animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveWorkerTab('lifegroups')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeWorkerTab === 'lifegroups'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🌱 Campus Life Groups Facilitated ({bibleStudies.length})
        </button>

        <button
          onClick={() => setActiveWorkerTab('care_notes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeWorkerTab === 'care_notes'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          📝 Pastoral Care & 1-on-1 Notes ({careNotes.length})
        </button>
      </div>

      {/* Tab 1: Live Pastoral Care & Urgent Calls Queue */}
      {activeWorkerTab === 'pastoral_queue' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
            isDark ? 'bg-teal-950/40 border-teal-500/30 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
          }`}>
            <HeartHandshake className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold">Live Student Pastoral Support Queue</div>
              <div className="text-[11px] opacity-90 mt-0.5">
                Students requesting 1-on-1 coffee chats, urgent prayer calls, or confidential counseling from the home page.
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {myPastoralRequests.length > 0 ? (
              myPastoralRequests.map((req) => {
                const isPending = req.status === 'Pending Contact';
                return (
                  <div
                    key={req.id}
                    className={`p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                    }`}
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {req.studentName}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                          req.connectType === 'call'
                            ? 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/30 animate-pulse'
                            : req.connectType === 'coffee'
                            ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/30'
                            : 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 border-indigo-500/30'
                        }`}>
                          {req.connectType === 'call' ? '📞 Urgent Prayer Call' : req.connectType === 'coffee' ? '☕ 1-on-1 Coffee Chat' : '💬 Confidential Chat'}
                        </span>
                        <span className={`text-[10px] font-bold ${
                          isPending ? 'text-amber-500 font-black' : 'text-emerald-500 font-black'
                        }`}>
                          • {req.status}
                        </span>
                      </div>

                      <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Phone / Handle: <strong className="font-mono text-pink-500">{req.studentContact}</strong> • Campus: <strong>{req.campusName}</strong> • Requested: {req.createdAt}
                      </div>

                      <div className={`p-3 rounded-xl border text-xs italic ${
                        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}>
                        "{req.notes}"
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end">
                      <a
                        href={`tel:${req.studentContact.replace(/[^0-9+]/g, '')}`}
                        className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call / Message</span>
                      </a>

                      {isPending ? (
                        <button
                          onClick={() => resolvePastoralRequest(req.id)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Contacted</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`p-8 text-center rounded-3xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                No incoming pastoral care requests at the moment.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Campus Life Groups Facilitated */}
      {activeWorkerTab === 'lifegroups' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bibleStudies.map((grp) => (
              <div
                key={grp.id}
                className={`p-5 rounded-3xl border space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {grp.topicCategory}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{grp.currentMembers}/{grp.maxCapacity} Members</span>
                </div>

                <h4 className="font-extrabold text-base font-heading">
                  {grp.title}
                </h4>

                <div className={`text-xs space-y-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{grp.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{grp.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`📋 Attendance sheet and weekly study outline opened for ${grp.title}!`, 'info')}
                  className={`w-full py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  Manage Group & Attendance
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Pastoral Care Notes */}
      {activeWorkerTab === 'care_notes' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            <span className={`text-xs font-black uppercase tracking-widest block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              1-on-1 Student Care Log:
            </span>

            {careNotes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-2xl border space-y-2 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm font-heading">{note.studentName}</span>
                    <span className="text-[10px] text-slate-400">({note.campus})</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/60 px-2 py-0.5 rounded-full">
                    {note.date}
                  </span>
                </div>
                <p className={`text-xs italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>"{note.note}"</p>
              </div>
            ))}
          </div>

          {/* Add New Note Form */}
          <div className={`p-5 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <h4 className="font-black text-sm uppercase tracking-wider text-emerald-500 mb-3 font-heading">
              ➕ Log Pastoral Follow-Up
            </h4>
            <form onSubmit={handleAddCareNote} className="space-y-3">
              <div>
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenzo Ramirez"
                  value={newNoteStudent}
                  onChange={(e) => setNewNoteStudent(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Care / Discipleship Notes *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summary of conversation, prayer items, or discipleship next steps..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className={`w-full px-3 py-2 rounded-xl border text-xs resize-none ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md transition-all cursor-pointer"
              >
                Save Pastoral Care Note
              </button>
            </form>
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </div>
  );
};
