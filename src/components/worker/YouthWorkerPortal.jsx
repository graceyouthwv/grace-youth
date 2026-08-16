import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HeartHandshake, Users, Calendar, MessageSquare, CheckCircle2, Sparkles, Plus, Clock, MapPin, Send, ArrowRight, ShieldCheck } from 'lucide-react';

export const YouthWorkerPortal = () => {
  const { currentUser, bibleStudies, myBookings, prayers, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [activeWorkerTab, setActiveWorkerTab] = useState('followup'); // 'followup' | 'lifegroups' | 'care_notes'
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
    showToast('📝 Pastoral care follow-up note logged!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Youth Worker Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#111625] border-emerald-500/30 text-white'
          : 'bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200 text-slate-900 shadow-sm'
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
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
                Youth Worker Console: {currentUser.name}
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Campus Missionary
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Field pastoral care, discipleship follow-ups, and student life groups for {currentUser.campusName}.
            </p>
          </div>
        </div>

        {/* Worker Quick Metrics */}
        <div className="flex items-center gap-2">
          <div className="text-center px-4 py-2 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="text-base font-black text-emerald-400">18</div>
            <div className="text-[10px] text-slate-400 font-bold">Students Mentored</div>
          </div>
          <div className="text-center px-4 py-2 bg-slate-900/90 rounded-2xl border border-slate-800">
            <div className="text-base font-black text-teal-400">4</div>
            <div className="text-[10px] text-slate-400 font-bold">Active Groups</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Youth Worker */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveWorkerTab('followup')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeWorkerTab === 'followup'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🤝 Post-Tutorial Discipleship Follow-Ups ({myBookings.length})
        </button>
        <button
          onClick={() => setActiveWorkerTab('lifegroups')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeWorkerTab === 'lifegroups'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🌱 Campus Life Groups Facilitated ({bibleStudies.length})
        </button>
        <button
          onClick={() => setActiveWorkerTab('care_notes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            activeWorkerTab === 'care_notes'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📝 Pastoral Care & 1-on-1 Notes ({careNotes.length})
        </button>
      </div>

      {/* Tab 1: Post-Tutorial Discipleship Queue */}
      {activeWorkerTab === 'followup' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                Students Who Recently Finished Academic Tutorials:
              </span>
              <span className="text-xs text-emerald-400 font-bold">Gospel Bridge Initiated</span>
            </div>

            <div className="space-y-3">
              {myBookings.map((bk) => (
                <div key={bk.id} className="genz-card p-5 border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-950/60 border border-teal-500/30 px-2.5 py-0.5 rounded-full">
                        Tutorial Completed
                      </span>
                      <h4 className="font-extrabold text-base text-white mt-1 font-heading">
                        {bk.subject}
                      </h4>
                      <p className="text-xs text-slate-300">
                        Peer Tutor: <strong>{bk.tutorName}</strong> • {bk.day} ({bk.time})
                      </p>
                    </div>

                    <button
                      onClick={() => showToast(`📱 Follow-up SMS/Messenger prompt copied for ${bk.student_name || 'Student'}!`, 'success')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm cursor-pointer"
                    >
                      Invite to Discipleship
                    </button>
                  </div>

                  <p className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                    💡 <em>Recommended Worker Action:</em> Send a 1-on-1 message checking how their exam went, offer prayer, and invite them to this week's campus life group coffee hangout.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Worker Resources */}
          <div className="space-y-4">
            <div className="genz-card p-5 border border-slate-800 space-y-3">
              <h4 className="font-black text-sm text-white font-heading uppercase tracking-wider text-emerald-400">
                📖 Discipleship 4-Week Track
              </h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <strong>Week 1:</strong> Grace vs Academic Pressure (Eph 2:8-9)
                </li>
                <li className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <strong>Week 2:</strong> Identity in Christ over GPA (1 Peter 2:9)
                </li>
                <li className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <strong>Week 3:</strong> Overcoming Stress & Fear (Phil 4:6-7)
                </li>
                <li className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <strong>Week 4:</strong> Living on Mission on Campus (Matt 28:19)
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Campus Life Groups Facilitated */}
      {activeWorkerTab === 'lifegroups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400">
              Campus Life Groups Under Your Supervision:
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bibleStudies.map((grp) => (
              <div key={grp.id} className="genz-card p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {grp.topicCategory}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">{grp.currentMembers}/{grp.maxCapacity} Members</span>
                </div>

                <h4 className="font-extrabold text-base text-white font-heading">
                  {grp.title}
                </h4>

                <div className="text-xs text-slate-300 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{grp.schedule}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{grp.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => showToast(`📋 Attendance sheet and weekly study outline opened for ${grp.title}!`, 'info')}
                  className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs"
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
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              1-on-1 Student Care Log:
            </span>

            {careNotes.map((note) => (
              <div key={note.id} className="genz-card p-4 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-white font-heading">{note.studentName}</span>
                    <span className="text-[10px] text-slate-400">({note.campus})</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded-full">
                    {note.date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed">"{note.note}"</p>
              </div>
            ))}
          </div>

          {/* Add New Note Form */}
          <div className="genz-card p-5 border border-slate-800">
            <h4 className="font-black text-sm text-white font-heading uppercase tracking-wider text-emerald-400 mb-3">
              ➕ Log Pastoral Follow-Up
            </h4>
            <form onSubmit={handleAddCareNote} className="space-y-3">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kenzo Ramirez"
                  value={newNoteStudent}
                  onChange={(e) => setNewNoteStudent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-slate-400 mb-1">
                  Care / Discipleship Notes *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Summary of conversation, prayer items, or discipleship next steps..."
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs shadow-md cursor-pointer"
              >
                Save Pastoral Care Note
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
