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
  FileText,
  TrendingUp,
  Award,
  CheckSquare,
  Square,
  Edit3,
  PlusCircle
} from 'lucide-react';
import { EditProfileModal } from '../profile/EditProfileModal';
import { Modal } from '../common/Modal';
import { triggerConfetti } from '../../utils/helpers';

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
  const [activeWorkerTab, setActiveWorkerTab] = useState('tracker'); // 'tracker' | 'classes' | 'curriculum' | 'pastoral_queue' | 'care_notes'
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [selectedClassForRoster, setSelectedClassForRoster] = useState(bibleStudies[0] || null);

  // Curriculum Series Master Data
  const [curriculumSeries, setCurriculumSeries] = useState([
    {
      id: 'ser-1',
      title: 'Foundations of Faith',
      subtitle: '4-Week Discipleship & Rootedness Track',
      level: 'Level 1: New Believer',
      color: 'from-emerald-600 to-teal-600',
      lessons: [
        { id: 'l-1', number: 1, title: 'Assurance of Salvation', passage: '1 John 5:11-13', keyTakeaway: 'Knowing you belong to Christ unconditionally.' },
        { id: 'l-2', number: 2, title: 'Daily Walk & Secret Place Prayer', passage: 'Matthew 6:6', keyTakeaway: 'Building quiet time amidst busy campus deadlines.' },
        { id: 'l-3', number: 3, title: 'Overcoming Campus Pressures', passage: '1 Corinthians 10:13', keyTakeaway: 'Victory over cheating, party culture & compromise.' },
        { id: 'l-4', number: 4, title: 'Great Commission & Campus Witness', passage: 'Matthew 28:19-20', keyTakeaway: 'Sharing Christ naturally with classmates.' }
      ]
    },
    {
      id: 'ser-2',
      title: 'Grace, Identity & Academics',
      subtitle: '4-Week College Mindset & Peace Series',
      level: 'Level 2: Grounded Student',
      color: 'from-violet-600 to-indigo-600',
      lessons: [
        { id: 'l-5', number: 1, title: 'Created for Glory, Not Just Grades', passage: 'Genesis 1:27', keyTakeaway: 'Your worth is not your GPA or ranking.' },
        { id: 'l-6', number: 2, title: 'Grace vs Academic Performance', passage: 'Ephesians 2:8-10', keyTakeaway: 'Freedom from burnout and fear of failure.' },
        { id: 'l-7', number: 3, title: 'Peace During Midterms & Finals', passage: 'Philippians 4:6-7', keyTakeaway: 'Replacing anxiety with prayer and supplication.' },
        { id: 'l-8', number: 4, title: 'Academic Diligence as Worship', passage: 'Colossians 3:23-24', keyTakeaway: 'Studying excellently as an offering to God.' }
      ]
    },
    {
      id: 'ser-3',
      title: 'Campus Leadership & Multiplication',
      subtitle: '4-Week Peer Mentor & Small Group Facilitator',
      level: 'Level 3: Campus Multiplier',
      color: 'from-amber-500 to-orange-500',
      lessons: [
        { id: 'l-9', number: 1, title: 'Heart of a Servant Leader', passage: 'Philippians 2:3-5', keyTakeaway: 'Humility and placing others ahead of oneself.' },
        { id: 'l-10', number: 2, title: 'How to Facilitate a Bible Study', passage: '2 Timothy 2:2', keyTakeaway: 'Leading engaging inductive discussions.' },
        { id: 'l-11', number: 3, title: 'Pastoral Care for Struggling Peers', passage: 'Galatians 6:2', keyTakeaway: 'Walking with batchmates in grief and mental struggle.' },
        { id: 'l-12', number: 4, title: 'Multiplying & Planting Life Groups', passage: 'Acts 2:42-47', keyTakeaway: 'Launching new circles in dorms and faculties.' }
      ]
    }
  ]);

  const [selectedSeriesId, setSelectedSeriesId] = useState('ser-1');

  // Student-by-Student Lesson Progress State
  const [studentProgress, setStudentProgress] = useState([
    {
      id: 'sp-1',
      studentName: 'Bea Claridad',
      campus: 'UP Visayas (Miagao)',
      program: 'BS Biology, 2nd Year',
      seriesId: 'ser-1',
      completedLessonIds: ['l-1', 'l-2', 'l-3'],
      notes: 'Completed Lesson 3 on overcoming campus pressures. Ready for Lesson 4 Great Commission next Tuesday!',
      lastSessionDate: 'Aug 14, 2026',
      badgeAwarded: null
    },
    {
      id: 'sp-2',
      studentName: 'Kenzo Ramirez',
      campus: 'CPU (Jaro)',
      program: 'BS Civil Engg, 3rd Year',
      seriesId: 'ser-1',
      completedLessonIds: ['l-1', 'l-2'],
      notes: 'Consistent daily quiet time. Seeking prayer regarding family financial constraints and midterm math.',
      lastSessionDate: 'Aug 12, 2026',
      badgeAwarded: null
    },
    {
      id: 'sp-3',
      studentName: 'Althea Marie',
      campus: 'WVSU (La Paz)',
      program: 'BS Nursing, 2nd Year',
      seriesId: 'ser-1',
      completedLessonIds: ['l-1'],
      notes: 'Understands assurance of salvation. Scheduled for Lesson 2 Secret Place Prayer this Thursday.',
      lastSessionDate: 'Aug 08, 2026',
      badgeAwarded: null
    },
    {
      id: 'sp-4',
      studentName: 'John Paul Villar',
      campus: 'ISUFST (Barotac Nuevo)',
      program: 'BS Fisheries, 4th Year',
      seriesId: 'ser-2',
      completedLessonIds: ['l-5', 'l-6', 'l-7', 'l-8'],
      notes: 'Completed all 4 lessons of Grace & Academic Diligence. Facilitating dorm study table!',
      lastSessionDate: 'Aug 16, 2026',
      badgeAwarded: '🎓 Level 2 Graduate'
    },
    {
      id: 'sp-5',
      studentName: 'Joshua Dizon',
      campus: 'ISAT-U (La Paz)',
      program: 'BS IT, 3rd Year',
      seriesId: 'ser-3',
      completedLessonIds: ['l-9', 'l-10'],
      notes: 'Undergoing campus multiplier training. Shadowing Kuya Daniel in Thursday evening study group.',
      lastSessionDate: 'Aug 15, 2026',
      badgeAwarded: null
    }
  ]);

  // Class Rosters with Attendance
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

  // Form state for creating custom lesson
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonPassage, setNewLessonPassage] = useState('');
  const [newLessonTakeaway, setNewLessonTakeaway] = useState('');

  const currentSeries = curriculumSeries.find((s) => s.id === selectedSeriesId) || curriculumSeries[0];

  // Filter students who are currently on the selected series
  const studentsInCurrentSeries = studentProgress.filter((sp) => sp.seriesId === selectedSeriesId);

  // Toggle individual lesson check-off for a student
  const handleToggleLesson = (studentId, lessonId) => {
    setStudentProgress((prev) =>
      prev.map((student) => {
        if (student.id === studentId) {
          const isCompleted = student.completedLessonIds.includes(lessonId);
          const updatedLessonIds = isCompleted
            ? student.completedLessonIds.filter((id) => id !== lessonId)
            : [...student.completedLessonIds, lessonId];

          const totalLessonsInSeries = currentSeries.lessons.length;
          const isNowGraduated = updatedLessonIds.length === totalLessonsInSeries;

          if (!isCompleted) {
            showToast(`✅ Lesson marked completed for ${student.studentName}!`, 'success');
            if (isNowGraduated) {
              triggerConfetti();
              showToast(`🎉 Milestone reached! ${student.studentName} completed ${currentSeries.title}!`, 'success');
            }
          }

          return {
            ...student,
            completedLessonIds: updatedLessonIds,
            lastSessionDate: 'Today',
            badgeAwarded: isNowGraduated ? `🎓 ${currentSeries.level} Graduate` : student.badgeAwarded
          };
        }
        return student;
      })
    );
  };

  // Award Certificate
  const handleAwardCertificate = (student) => {
    triggerConfetti();
    showToast(`📜 Official Discipleship Certificate awarded to ${student.studentName}!`, 'success');
  };

  // Add Custom Lesson
  const handleAddCustomLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim() || !newLessonPassage.trim()) return;

    const newLessonObj = {
      id: `custom-l-${Date.now()}`,
      number: currentSeries.lessons.length + 1,
      title: newLessonTitle.trim(),
      passage: newLessonPassage.trim(),
      keyTakeaway: newLessonTakeaway.trim() || 'Key discipleship application for campus life.'
    };

    setCurriculumSeries((prev) =>
      prev.map((s) =>
        s.id === selectedSeriesId
          ? { ...s, lessons: [...s.lessons, newLessonObj] }
          : s
      )
    );

    setShowAddLessonModal(false);
    setNewLessonTitle('');
    setNewLessonPassage('');
    setNewLessonTakeaway('');
    showToast(`✨ Lesson "${newLessonObj.title}" added to ${currentSeries.title}!`, 'success');
  };

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

  // Pastoral requests
  const myPastoralRequests = pastoralRequests || [];
  const pendingCount = myPastoralRequests.filter((r) => r.status === 'Pending Contact').length;

  return (
    <div className="space-y-6">
      {/* Youth Worker Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900 to-[#111625] border-emerald-500/30 text-white shadow-xl'
          : 'bg-white border-emerald-200 text-slate-900 shadow-xs'
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
              Tracking student discipleship progress, series completion, Bible study rosters, and pastoral care for {currentUser.campusName}.
            </p>
          </div>
        </div>

        {/* Worker Quick Actions */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowEditProfile(true)}
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs for Youth Worker (Responsive Flex-Wrap) */}
      <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl border ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setActiveWorkerTab('tracker')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'tracker'
              ? 'bg-emerald-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>📊 Student Discipleship Progress Tracker</span>
        </button>

        <button
          onClick={() => setActiveWorkerTab('classes')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'classes'
              ? 'bg-emerald-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>📖 Bible Study Rosters ({bibleStudies.length})</span>
        </button>

        <button
          onClick={() => setActiveWorkerTab('curriculum')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'curriculum'
              ? 'bg-emerald-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>📚 Curriculum Series Outlines</span>
        </button>

        <button
          onClick={() => setActiveWorkerTab('pastoral_queue')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
            activeWorkerTab === 'pastoral_queue'
              ? 'bg-emerald-600 text-white shadow-md'
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
              ? 'bg-emerald-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>📝 Mentorship Care Notes ({careNotes.length})</span>
        </button>
      </div>

      {/* ====================================================================
          TAB 1: STUDENT DISCIPLESHIP PROGRESS TRACKER (FEATURE REQUEST)
          ==================================================================== */}
      {activeWorkerTab === 'tracker' && (
        <div className="space-y-6">
          {/* Series Track Switcher Bar */}
          <div className={`p-5 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 block mb-1">
                🎯 Select Discipleship Track / Series to Track:
              </span>
              <h3 className={`text-lg font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentSeries.title}
              </h3>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {currentSeries.subtitle} • <strong>{currentSeries.lessons.length} Core Lessons</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {curriculumSeries.map((ser) => (
                <button
                  key={ser.id}
                  onClick={() => setSelectedSeriesId(ser.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedSeriesId === ser.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : isDark ? 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>{ser.level.split(':')[0]}</span>
                </button>
              ))}

              <button
                onClick={() => setShowAddLessonModal(true)}
                className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Custom Lesson</span>
              </button>
            </div>
          </div>

          {/* Series Lessons Reference Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentSeries.lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-black uppercase text-emerald-500 mb-1">
                  <span>Lesson {lesson.number}</span>
                  <span className="font-mono text-slate-400">{lesson.passage}</span>
                </div>
                <h5 className={`font-extrabold text-xs font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {lesson.title}
                </h5>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {lesson.keyTakeaway}
                </p>
              </div>
            ))}
          </div>

          {/* Student Progress List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Students on this Track ({studentsInCurrentSeries.length}):
              </span>
              <span className="text-xs text-slate-400">
                Click any lesson checkbox to update live progress
              </span>
            </div>

            {studentsInCurrentSeries.length > 0 ? (
              studentsInCurrentSeries.map((student) => {
                const totalLessons = currentSeries.lessons.length;
                const completedCount = student.completedLessonIds.filter((id) =>
                  currentSeries.lessons.some((l) => l.id === id)
                ).length;
                const percentage = Math.round((completedCount / totalLessons) * 100);
                const isComplete = completedCount === totalLessons;

                return (
                  <div
                    key={student.id}
                    className={`p-5 sm:p-6 rounded-3xl border transition-all space-y-4 ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    {/* Student Header & Overall Progress Bar */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 font-extrabold flex items-center justify-center border border-emerald-500/30 shrink-0 text-sm">
                          {student.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                              {student.studentName}
                            </h4>
                            {student.badgeAwarded && (
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30">
                                {student.badgeAwarded}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">
                            {student.program} • {student.campus} • Last active: <strong>{student.lastSessionDate}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Percentage Pill & Certificate Button */}
                      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="text-right">
                          <span className={`text-xs font-black ${isComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {completedCount}/{totalLessons} Lessons ({percentage}%)
                          </span>
                          <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full transition-all duration-500 ${
                                isComplete ? 'bg-emerald-500' : 'bg-amber-400'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>

                        {isComplete && (
                          <button
                            onClick={() => handleAwardCertificate(student)}
                            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1 shrink-0"
                          >
                            <GraduationCap className="w-4 h-4" />
                            <span>Award Certificate</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Interactive Lesson Checkboxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
                      {currentSeries.lessons.map((lesson) => {
                        const isDone = student.completedLessonIds.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => handleToggleLesson(student.id, lesson.id)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-2 ${
                              isDone
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                                : isDark ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-emerald-500 shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500 shrink-0" />
                              )}
                              <div>
                                <div className="text-[10px] font-black uppercase tracking-wider">
                                  Lesson {lesson.number}
                                </div>
                                <div className={`text-xs font-bold leading-tight ${isDone ? (isDark ? 'text-white' : 'text-slate-900') : ''}`}>
                                  {lesson.title}
                                </div>
                              </div>
                            </div>
                            <span className="text-[10px] font-bold">
                              {isDone ? 'Finished' : 'Pending'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pastoral / Discipleship Note */}
                    <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <Edit3 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong>Youth Worker Notes:</strong> <em>"{student.notes}"</em>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={`p-8 text-center rounded-3xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                No students assigned to {currentSeries.title} yet. Select another track above to view enrolled students.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 2: BIBLE STUDY CLASSES & ATTENDANCE
          ==================================================================== */}
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

      {/* ====================================================================
          TAB 3: CURRICULUM SERIES OUTLINES
          ==================================================================== */}
      {activeWorkerTab === 'curriculum' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex items-start gap-3 ${
            isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}>
            <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold">Official Discipleship Series & Curriculum Blueprints</div>
              <div className="text-[11px] opacity-90 mt-0.5">
                Multi-week tracks designed for new believers, college mindsets, and campus leadership multiplication.
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {curriculumSeries.map((series) => (
              <div
                key={series.id}
                className={`p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      {series.level}
                    </span>
                    <h4 className={`text-lg font-extrabold mt-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {series.title}
                    </h4>
                    <p className="text-xs text-slate-400">{series.subtitle}</p>
                  </div>

                  <button
                    onClick={() => showToast(`📥 ${series.title} Series PDF downloaded!`, 'success')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Track PDF</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {series.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-2xl border ${
                        isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1">
                        <span className="text-emerald-500">Lesson {lesson.number}</span>
                        <span className="text-amber-400 font-mono text-[11px]">{lesson.passage}</span>
                      </div>
                      <h5 className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lesson.title}
                      </h5>
                      <p className="text-xs text-slate-400 mt-1">
                        {lesson.keyTakeaway}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ====================================================================
          TAB 4: PASTORAL CALLS & INQUIRIES
          ==================================================================== */}
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

      {/* ====================================================================
          TAB 5: 1-ON-1 MENTORSHIP CARE NOTES
          ==================================================================== */}
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

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      {/* Add Custom Lesson Modal */}
      <Modal
        isOpen={showAddLessonModal}
        onClose={() => setShowAddLessonModal(false)}
        title={`➕ Add Custom Lesson to ${currentSeries.title}`}
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleAddCustomLesson} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Lesson Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Overcoming Academic Comparison in College"
              value={newLessonTitle}
              onChange={(e) => setNewLessonTitle(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Scripture Passage *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Galatians 1:10 & 2 Corinthians 10:12"
              value={newLessonPassage}
              onChange={(e) => setNewLessonPassage(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Key Takeaway / Discussion Focus
            </label>
            <textarea
              rows={3}
              placeholder="Main truth and discussion questions for students to apply this week..."
              value={newLessonTakeaway}
              onChange={(e) => setNewLessonTakeaway(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setShowAddLessonModal(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md transition-all cursor-pointer"
            >
              Save Custom Lesson
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
