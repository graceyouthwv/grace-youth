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
  PlusCircle,
  Eye
} from 'lucide-react';
import { EditProfileModal } from '../profile/EditProfileModal';
import { Modal } from '../common/Modal';
import { triggerConfetti } from '../../utils/helpers';
import { AddLessonModal } from './AddLessonModal';
import { EditLessonModal } from './EditLessonModal';
import { ViewLessonModal } from './ViewLessonModal';
import { AddSeriesModal } from '../admin/AddSeriesModal';
import { LifeGroupCircleModal } from '../discipleship/LifeGroupCircleModal';
import { FileUp, UploadCloud, Trash, Trash2 } from 'lucide-react';

export const YouthWorkerPortal = () => {
  const {
    currentUser,
    bibleStudies,
    pastoralRequests,
    resolvePastoralRequest,
    curriculumSeries,
    studentProgress,
    setStudentProgress,
    toggleStudentLessonCompletion,
    updateStudentProgressNote,
    addLessonToSeries,
    updateLesson,
    deleteLesson,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [activeWorkerTab, setActiveWorkerTab] = useState('tracker'); // 'tracker' | 'classes' | 'curriculum' | 'pastoral_queue' | 'care_notes'
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddLessonModal, setShowAddLessonModal] = useState(false);
  const [showAddSeriesModal, setShowAddSeriesModal] = useState(false);
  const [editingLessonData, setEditingLessonData] = useState(null); // { seriesId, lesson }
  const [viewingLessonData, setViewingLessonData] = useState(null); // { lesson, seriesTitle }
  const [editingNoteStudentId, setEditingNoteStudentId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [targetSeriesForLesson, setTargetSeriesForLesson] = useState(null);
  const [selectedClassForRoster, setSelectedClassForRoster] = useState(bibleStudies[0] || null);
  const [showCircleModalForWorker, setShowCircleModalForWorker] = useState(false);

  const [selectedSeriesId, setSelectedSeriesId] = useState(curriculumSeries[0]?.id || 'ser-1');

  // Master Class Rosters with Attendance
  const DEFAULT_CLASS_ROSTERS = {};

  const [classAttendance, setClassAttendance] = useState(DEFAULT_CLASS_ROSTERS);

  const [careNotes, setCareNotes] = useState([]);

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

  // Toggle individual lesson check-off for a student (instant and synced)
  const handleToggleLesson = (studentId, lessonId) => {
    toggleStudentLessonCompletion(studentId, lessonId);

    const student = studentProgress.find((s) => s.id === studentId);
    if (!student) return;

    const wasCompleted = student.completedLessonIds.includes(lessonId);
    if (!wasCompleted) {
      showToast(`✅ Lesson completed for ${student.studentName}!`, 'success');
      if (student.completedLessonIds.length + 1 >= (currentSeries?.lessons?.length || 4)) {
        triggerConfetti();
        showToast(`🎉 Milestone reached! ${student.studentName} finished ${currentSeries.title}!`, 'success');
      }
    } else {
      showToast(`Lesson marked pending for ${student.studentName}.`, 'info');
    }
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
    const targetClassId = classId || 'bs-1';
    setClassAttendance((prev) => {
      const roster = prev[targetClassId] || DEFAULT_CLASS_ROSTERS[targetClassId] || DEFAULT_CLASS_ROSTERS['bs-1'];
      const updated = roster.map((s) => (s.id === studentId ? { ...s, attended: !s.attended } : s));
      return { ...prev, [targetClassId]: updated };
    });
    showToast('✓ Attendance status updated!', 'success');
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
                          <button
                            type="button"
                            key={lesson.id}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleToggleLesson(student.id, lesson.id);
                            }}
                            className={`p-3 rounded-2xl border text-left cursor-pointer transition-all flex items-center justify-between gap-2.5 active:scale-[0.98] ${
                              isDone
                                ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-black shadow-xs ring-1 ring-emerald-500/30'
                                : isDark ? 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:bg-slate-800/60' : 'bg-slate-50 border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isDone ? (
                                <CheckSquare className="w-5 h-5 text-emerald-500 shrink-0" />
                              ) : (
                                <Square className="w-5 h-5 text-slate-400 shrink-0" />
                              )}
                              <div className="min-w-0">
                                <div className={`text-[10px] font-black uppercase tracking-wider ${isDone ? 'text-emerald-400' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  Lesson {lesson.number}
                                </div>
                                <div className={`text-xs font-bold leading-tight truncate ${isDone ? (isDark ? 'text-white font-extrabold' : 'text-slate-950 font-extrabold') : isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                                  {lesson.title}
                                </div>
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                              isDone
                                ? 'bg-emerald-500 text-slate-950 font-black'
                                : isDark ? 'bg-slate-900 text-slate-500' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {isDone ? 'Done' : 'Pending'}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Pastoral / Discipleship Note (Expanded & Editable) */}
                    <div className={`p-3.5 rounded-2xl border text-xs transition-all ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5 font-black text-emerald-500 text-xs">
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Youth Worker Mentorship & Pastoral Notes:</span>
                        </div>

                        {editingNoteStudentId === student.id ? (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                updateStudentProgressNote(student.id, noteText);
                                setEditingNoteStudentId(null);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[11px] shadow-xs cursor-pointer"
                            >
                              Save Note
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNoteStudentId(null)}
                              className="px-2 py-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white text-[11px] cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingNoteStudentId(student.id);
                              setNoteText(student.notes || '');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-[11px] cursor-pointer flex items-center gap-1 border border-emerald-500/30"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Notes</span>
                          </button>
                        )}
                      </div>

                      {editingNoteStudentId === student.id ? (
                        <textarea
                          rows={3}
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          className={`w-full p-2.5 rounded-xl border text-xs leading-relaxed focus:ring-2 focus:ring-emerald-500 ${
                            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                          placeholder="Type student prayer requests, breakthrough notes, schedule follow-ups..."
                        />
                      ) : (
                        <p className="italic leading-relaxed">
                          "{student.notes || 'No specific notes logged yet. Click Edit Notes to add discipleship details.'}"
                        </p>
                      )}
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

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowCircleModalForWorker(true)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Group Chat & Roster</span>
                    </button>
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-black">
                      Live Discipleship Class
                    </span>
                  </div>
                </div>

                {/* Student Attendance List */}
                <div className="mt-4 space-y-3">
                  {(() => {
                    const currentClassId = selectedClassForRoster?.id || 'bs-1';
                    const activeRoster = classAttendance[currentClassId] || DEFAULT_CLASS_ROSTERS[currentClassId] || DEFAULT_CLASS_ROSTERS['bs-1'];
                    const presentCount = activeRoster.filter((s) => s.attended).length;

                    return (
                      <>
                        <div className="text-xs font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
                          <span>Enrolled Students ({activeRoster.length}) • <strong className="text-emerald-400">{presentCount} Present</strong>:</span>
                          <span>Attendance Status</span>
                        </div>

                        {activeRoster.map((st) => (
                          <div
                            key={st.id}
                            className={`p-3 rounded-2xl border flex items-center justify-between ${
                              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border ${
                                st.attended
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                              }`}>
                                {st.name.charAt(0)}
                              </div>
                              <div>
                                <div className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{st.name}</div>
                                <div className="text-[10px] text-slate-400">{st.program}</div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={() => toggleAttendance(currentClassId, st.id)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 ${
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
                      </>
                    );
                  })()}
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
        <div className="space-y-6">
          <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}>
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-extrabold text-sm sm:text-base">Official Discipleship Series & Curriculum Blueprints</div>
                <div className="text-xs opacity-90 mt-0.5">
                  Multi-week tracks (Required Core & Optional Electives) with downloadable PDF study guides, teacher notes, and custom lesson uploads.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => {
                  setTargetSeriesForLesson(curriculumSeries[0]?.id);
                  setShowAddLessonModal(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Create Lesson & PDF</span>
              </button>

              <button
                onClick={() => setShowAddSeriesModal(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Series Track</span>
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {curriculumSeries.map((series) => (
              <div
                key={series.id}
                className={`p-5 sm:p-6 rounded-3xl border space-y-4 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        series.isOptional
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      }`}>
                        {series.isOptional ? '✨ Optional Elective Series' : '🌟 Core Required Series'}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">{series.level}</span>
                    </div>

                    <h4 className={`text-lg sm:text-xl font-extrabold mt-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {series.title}
                    </h4>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{series.subtitle || series.description}</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                    <button
                      onClick={() => {
                        setTargetSeriesForLesson(series.id);
                        setShowAddLessonModal(true);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-black text-xs border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Lesson</span>
                    </button>

                    <button
                      onClick={() => showToast(`📥 ${series.title} complete series packet downloaded!`, 'success')}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download All PDFs</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {series.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-4 rounded-2xl border flex flex-col justify-between group transition-all ${
                        isDark ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                          <span className="text-emerald-500 font-black">Lesson {lesson.number}</span>
                          <span className="text-amber-500 font-mono text-[11px] font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                            {lesson.passage}
                          </span>
                        </div>
                        <h5 className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {lesson.title}
                        </h5>
                        <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          {lesson.keyTakeaway}
                        </p>

                        {lesson.questions && (
                          <div className={`mt-2 p-2 rounded-xl text-[11px] italic border ${
                            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                          }`}>
                            <strong>Discussion:</strong> {lesson.questions}
                          </div>
                        )}
                      </div>

                      {/* File attachment & Actions */}
                      <div className={`mt-3 pt-2.5 border-t flex items-center justify-between gap-2 ${
                        isDark ? 'border-slate-800' : 'border-slate-200'
                      }`}>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span className={`text-[11px] font-mono truncate font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {lesson.fileName || `${lesson.title.replace(/\s+/g, '_')}_Guide.pdf`}
                          </span>
                          <span className="text-[10px] text-slate-500 shrink-0">({lesson.fileSize || '1.2 MB'})</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => setViewingLessonData({ lesson, seriesTitle: series.title })}
                            className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white border border-emerald-500/30 transition-all cursor-pointer flex items-center gap-1 text-[11px] font-bold"
                            title="View Lesson Guide & Scriptures"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingLessonData({ seriesId: series.id, lesson })}
                            className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-slate-950 border border-amber-500/30 transition-all cursor-pointer"
                            title="Edit Lesson & PDF File"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteLesson(series.id, lesson.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-all cursor-pointer"
                            title="Remove Lesson"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
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

      {/* Add Lesson Modal */}
      <AddLessonModal
        isOpen={showAddLessonModal}
        onClose={() => setShowAddLessonModal(false)}
        defaultSeriesId={targetSeriesForLesson}
      />

      {/* Add Discipleship Series Modal */}
      <AddSeriesModal
        isOpen={showAddSeriesModal}
        onClose={() => setShowAddSeriesModal(false)}
      />

      {/* Edit Lesson Modal */}
      <EditLessonModal
        isOpen={!!editingLessonData}
        onClose={() => setEditingLessonData(null)}
        seriesId={editingLessonData?.seriesId}
        lesson={editingLessonData?.lesson}
      />

      {/* View Lesson Modal */}
      <ViewLessonModal
        isOpen={!!viewingLessonData}
        onClose={() => setViewingLessonData(null)}
        lesson={viewingLessonData?.lesson}
        seriesTitle={viewingLessonData?.seriesTitle}
      />

      {/* Life Group Circle Modal */}
      <LifeGroupCircleModal
        isOpen={showCircleModalForWorker}
        onClose={() => setShowCircleModalForWorker(false)}
        group={selectedClassForRoster}
      />
    </div>
  );
};
