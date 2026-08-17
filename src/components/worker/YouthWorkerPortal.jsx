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
  Bell,
  BookOpen,
  Download,
  GraduationCap,
  Music,
  Share2,
  FileText
} from 'lucide-react';
import { EditProfileModal } from '../profile/EditProfileModal';

export const YouthWorkerPortal = () => {
  const {
    currentUser,
    bibleStudies,
    pastoralRequests,
    resolvePastoralRequest,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [activeWorkerTab, setActiveWorkerTab] = useState('classes'); // 'classes' | 'pastoral_queue' | 'curriculum' | 'care_notes'
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedClassForRoster, setSelectedClassForRoster] = useState(bibleStudies[0] || null);

  // Mock class rosters with interactive attendance
  const [classAttendance, setClassAttendance] = useState({
    'bs-1': [
      { id: 'st-1', name: 'Bea Claridad', program: 'BS Biology', attended: true },
      { id: 'st-2', name: 'Kenzo Ramirez', program: 'BS Civil Engg', attended: true },
      { id: 'st-3', name: 'Althea Marie', program: 'BS Nursing', attended: false },
      { id: 'st-4', name: 'John Paul', program: 'BS Fisheries', attended: true }
    ],
    'bs-2': [
      { id: 'st-5', name: 'Joshua Dizon', program: 'BS Applied Math', attended: true },
      { id: 'st-6', name: 'Chloe Anne', program: 'BA Communication', attended: true },
      { id: 'st-7', name: 'Dave Gabriel', program: 'BS Chemistry', attended: false }
    ]
  });

  const [curriculumLessons] = useState([
    {
      id: 'cur-1',
      week: 'Week 1',
      title: 'Foundations of Faith: The Unshakable Kingdom',
      passage: 'Hebrews 12:28-29',
      summary: 'Establishing identity in Christ amidst academic pressures and modern college culture.',
      duration: '45 mins'
    },
    {
      id: 'cur-2',
      week: 'Week 2',
      title: 'Grace & Mental Resilience during Finals Week',
      passage: 'Philippians 4:6-7',
      summary: 'Practical biblical tools for dealing with stress, burnout, and GPA anxiety.',
      duration: '45 mins'
    },
    {
      id: 'cur-3',
      week: 'Week 3',
      title: 'Being Light & Salt in the Dorms and Classrooms',
      passage: 'Matthew 5:13-16',
      summary: 'Integrity in group projects, loving your roommate, and everyday campus evangelism.',
      duration: '50 mins'
    },
    {
      id: 'cur-4',
      week: 'Week 4',
      title: 'Spiritual Disciplines: Daily Bread & Deep Prayer',
      passage: 'Psalm 1:1-3',
      summary: 'How to maintain a thriving devotional life despite a full semester class load.',
      duration: '40 mins'
    }
  ]);

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
  const [classBroadcastMsg, setClassBroadcastMsg] = useState('');

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

  const toggleAttendance = (classId, studentId) => {
    setClassAttendance((prev) => {
      const roster = prev[classId] || [];
      const updated = roster.map((s) => (s.id === studentId ? { ...s, attended: !s.attended } : s));
      return { ...prev, [classId]: updated };
    });
    showToast('Attendance record updated!', 'success');
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!classBroadcastMsg.trim()) return;
    showToast(`📢 Announcement sent to ${selectedClassForRoster?.title || 'all students'} members!`, 'success');
    setClassBroadcastMsg('');
  };

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
              Leading campus Bible study classes, discipleship curricula, pastoral care, and student outreach for {currentUser.campusName}.
            </p>
          </div>
        </div>

        {/* Worker Quick Actions */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Youth Worker (Responsive Flex-Wrap) */}
      <div className={`flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveWorkerTab('classes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'classes'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 My Bible Study Classes & Rosters ({bibleStudies.length})</span>
        </button>

        <button
          onClick={() => setActiveWorkerTab('curriculum')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'curriculum'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>📚 Discipleship Curriculum ({curriculumLessons.length})</span>
        </button>

        <button
          onClick={() => setActiveWorkerTab('pastoral_queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'pastoral_queue'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Pastoral Calls & Inquiries</span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-black text-[10px] animate-pulse">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveWorkerTab('care_notes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'care_notes'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>📝 1-on-1 Mentorship & Care Notes ({careNotes.length})</span>
        </button>
      </div>

      {/* Tab 1: Bible Study Classes & Rosters */}
      {activeWorkerTab === 'classes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Col: Class Selection */}
            <div className="space-y-3">
              <span className={`text-xs font-black uppercase tracking-widest block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Select Bible Study Class:
              </span>
              {bibleStudies.map((grp) => (
                <div
                  key={grp.id}
                  onClick={() => setSelectedClassForRoster(grp)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedClassForRoster?.id === grp.id
                      ? 'border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500/20'
                      : isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {grp.topicCategory}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">{grp.membersCount} Enrolled</span>
                  </div>
                  <h4 className={`font-extrabold text-sm mt-1.5 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {grp.title}
                  </h4>
                  <div className={`text-[11px] mt-1 flex items-center gap-1 text-slate-400`}>
                    <Clock className="w-3 h-3" />
                    <span>{grp.schedule}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right 2 Cols: Class Roster & Interactive Attendance */}
            <div className="lg:col-span-2 space-y-4">
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h3 className={`text-lg font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {selectedClassForRoster?.title || 'Class Roster'}
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      Venue: <strong>{selectedClassForRoster?.location}</strong> • Schedule: <strong>{selectedClassForRoster?.schedule}</strong>
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-black">
                    Live Discipleship Class
                  </span>
                </div>

                {/* Student Attendance List */}
                <div className="mt-4 space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Enrolled Student Members ({classAttendance[selectedClassForRoster?.id || 'bs-1']?.length || 4}):</span>
                    <span>Attendance Status</span>
                  </div>

                  {(classAttendance[selectedClassForRoster?.id || 'bs-1'] || [
                    { id: 'st-1', name: 'Bea Claridad', program: 'BS Biology', attended: true },
                    { id: 'st-2', name: 'Kenzo Ramirez', program: 'BS Civil Engg', attended: true },
                    { id: 'st-3', name: 'Althea Marie', program: 'BS Nursing', attended: false }
                  ]).map((st) => (
                    <div
                      key={st.id}
                      className={`p-3 rounded-2xl border flex items-center justify-between ${
                        isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center border border-emerald-500/30">
                          {st.name.charAt(0)}
                        </div>
                        <div>
                          <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.name}</div>
                          <div className="text-[10px] text-slate-400">{st.program}</div>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleAttendance(selectedClassForRoster?.id || 'bs-1', st.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                          st.attended
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : isDark ? 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white' : 'bg-white text-slate-500 border border-slate-300'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{st.attended ? 'Present' : 'Absent'}</span>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Broadcast Reminder to Class */}
                <form onSubmit={handleSendBroadcast} className="mt-5 pt-4 border-t border-slate-800 space-y-2">
                  <label className={`block text-[11px] font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    📢 Send Reminder / Note to this Class:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Bring your Bibles this Thursday at CAS Gazebo! Snacks provided."
                      value={classBroadcastMsg}
                      onChange={(e) => setClassBroadcastMsg(e.target.value)}
                      className={`flex-1 px-3.5 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                      }`}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition-all cursor-pointer shrink-0"
                    >
                      Broadcast
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Discipleship Curriculum Hub */}
      {activeWorkerTab === 'curriculum' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
            isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}>
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold">Official Campus Life Group Study Outlines & Curriculum</div>
              <div className="text-[11px] opacity-90 mt-0.5">
                Standardized 4-week discussion guides prepared by Grace Youth leadership for student facilitators and youth workers.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculumLessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                      {lesson.week} • {lesson.duration}
                    </span>
                    <span className="text-xs font-bold text-amber-400">{lesson.passage}</span>
                  </div>
                  <h4 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {lesson.title}
                  </h4>
                  <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {lesson.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => showToast(`📥 ${lesson.title} outline downloaded!`, 'success')}
                    className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Discussion PDF</span>
                  </button>
                  <button
                    onClick={() => showToast(`🔗 Study outline link copied!`, 'info')}
                    className={`p-2 rounded-xl border text-xs font-bold ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                    title="Share Outline"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Pastoral Calls & Inquiries */}
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
                        <span>Contact: <strong>{req.contactInfo}</strong></span> • <span>Campus: <strong>{req.campusName}</strong></span>
                      </div>

                      {req.note && (
                        <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-xs italic text-slate-300">
                          "{req.note}"
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {isPending ? (
                        <button
                          onClick={() => resolvePastoralRequest(req.id)}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Contacted</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Resolved</span>
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center rounded-3xl border border-dashed border-slate-800 text-slate-500 text-xs">
                No active pastoral inquiries in queue.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Pastoral Care & 1-on-1 Notes */}
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
