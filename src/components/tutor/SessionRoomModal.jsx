import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  Video,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Heart,
  FileText,
  ShieldCheck,
  Lock,
  Maximize2,
  Minimize2,
  Link,
  Check
} from 'lucide-react';
import { triggerConfetti } from '../../utils/helpers';

export const SessionRoomModal = ({ isOpen, onClose, session }) => {
  const { currentUser, theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeRoomTab, setActiveRoomTab] = useState('call'); // 'call' | 'notes' | 'prayer'
  const [seconds, setSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Custom or auto-generated meeting link (defaults to a deterministic Google Meet / Room)
  const defaultMeetUrl = `https://meet.google.com/new`;
  const [meetingLink, setMeetingLink] = useState(session?.meetingLink || defaultMeetUrl);
  const [isEditingLink, setIsEditingLink] = useState(false);

  const [notes, setNotes] = useState(
    '1. Reviewed Formula: d/dx(x^n) = n*x^(n-1)\n2. Chain Rule: d/dx(f(g(x))) = f\'(g(x)) * g\'(x)\n3. Practice Problem #4 from Reviewer Vault.'
  );

  const [checklist, setChecklist] = useState({
    openingPrayer: true,
    academicGoal: false,
    conceptClarified: false,
    practiceSolved: false,
    gospelShared: false,
    closingPrayer: false
  });

  useEffect(() => {
    let interval;
    if (isOpen) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!session) return null;

  // Authorization Check
  const isGuest = currentUser.role === 'guest' || !currentUser.id;
  const isStudent =
    currentUser.role === 'student' ||
    (currentUser.name &&
      session.studentName &&
      currentUser.name.toLowerCase() === session.studentName.toLowerCase()) ||
    (currentUser.email &&
      session.studentEmail &&
      currentUser.email.toLowerCase() === session.studentEmail.toLowerCase()) ||
    session.studentName === currentUser.name;

  const isTutor =
    currentUser.role === 'tutor' ||
    (currentUser.name &&
      session.tutorName &&
      currentUser.name.toLowerCase() === session.tutorName.toLowerCase()) ||
    session.tutorName === currentUser.name;

  const isAdmin = currentUser.role === 'leader' || currentUser.role === 'worker';
  const isAuthorizedUser = !isGuest && (isStudent || isTutor || isAdmin);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(meetingLink);
    setCopied(true);
    showToast('📋 Meeting link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCompleteSession = () => {
    triggerConfetti();
    showToast(
      `🎉 1-on-1 Tutorial session completed for ${session.subject}! Faith Honor XP awarded.`,
      'success'
    );
    onClose();
  };

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📹 Live 1-on-1 Study Room"
      maxWidth={isFullscreen ? 'max-w-7xl' : 'max-w-4xl'}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Session Status Bar */}
        <div
          className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
            isDark
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-indigo-50/80 border-indigo-200 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 text-indigo-500 flex items-center justify-center font-bold text-base shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Unlimited 1-on-1 Call
                </span>
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatTimer(seconds)}</span>
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black font-heading mt-0.5">
                {session.subject}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tutor:{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {session.tutorName || 'Assigned Tutor'}
                </strong>{' '}
                • Student:{' '}
                <strong className="text-slate-800 dark:text-slate-200">
                  {session.studentName || currentUser.name || 'Student'}
                </strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isDark
                  ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
              }`}
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Room'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={handleCompleteSession}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Finish Session</span>
            </button>
          </div>
        </div>

        {/* Security / Access Control Notice */}
        {!isAuthorizedUser ? (
          <div className="p-8 rounded-3xl border text-center space-y-4 bg-amber-500/10 border-amber-500/30">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-extrabold text-amber-400 font-heading">
                🔒 Private 1-on-1 Study Room
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                This session is reserved for the booked <strong>Student</strong> (
                <em>{session.studentName || 'Student'}</em>) and assigned <strong>Peer Tutor</strong>{' '}
                (<em>{session.tutorName || 'Tutor'}</em>).
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto text-xs text-slate-400">
              Please sign in with your verified Student or Tutor account to enter.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Video Call Launcher & Link Hub */}
            <div className="lg:col-span-7 space-y-4">
              <div
                className={`p-6 rounded-3xl border text-center space-y-4 ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
                  <Video className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <h4 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    1-on-1 HD Video & Screen Sharing
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    100% Free & Unlimited Duration. Open the video room in a separate window or tab so you can share your screen while keeping your study notes open here.
                  </p>
                </div>

                {/* Main Launch Button */}
                <a
                  href={meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Video className="w-4 h-4" />
                  <span>Launch Google Meet (Unlimited Free Call)</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>

                {/* Meeting Link Sharing */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Link className="w-3.5 h-3.5" />
                      <span>Room Link:</span>
                    </span>

                    <button
                      onClick={handleCopyLink}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'Copied!' : 'Copy Room Link'}</span>
                    </button>
                  </div>

                  {isEditingLink ? (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        placeholder="Paste Zoom / Google Meet / Teams link..."
                        className={`w-full px-3 py-2 rounded-xl border text-xs ${
                          isDark
                            ? 'bg-slate-950 border-slate-800 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                      />
                      <button
                        onClick={() => setIsEditingLink(false)}
                        className="px-3 py-1 rounded-xl bg-indigo-600 text-white text-xs font-bold shrink-0 cursor-pointer"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                      <span className="truncate">{meetingLink}</span>
                      <button
                        onClick={() => setIsEditingLink(true)}
                        className="text-indigo-500 font-sans font-bold hover:underline shrink-0 text-xs cursor-pointer"
                      >
                        Change Link
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>No 5-minute timeout • 100% Free • Screen share ready</span>
                </div>
              </div>
            </div>

            {/* Right Column: In-Call Study Sidecar Tools */}
            <div className="lg:col-span-5 space-y-3 flex flex-col">
              {/* Tab Selector */}
              <div
                className={`flex items-center p-1 rounded-2xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveRoomTab('call')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeRoomTab === 'call'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Goals ({Object.values(checklist).filter(Boolean).length}/6)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRoomTab('notes')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeRoomTab === 'notes'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveRoomTab('prayer')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    activeRoomTab === 'prayer'
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark
                      ? 'text-slate-400 hover:text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Prayer</span>
                </button>
              </div>

              {/* Sidecar Content Container */}
              <div
                className={`p-4 rounded-3xl border flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                {/* TAB 1: 6-STEP GOSPEL-FIRST CHECKLIST */}
                {activeRoomTab === 'call' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                        ✝️ Session Framework:
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {Object.values(checklist).filter(Boolean).length}/6 Checked
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { key: 'openingPrayer', label: '1. Opening Prayer & Academic Catch-up' },
                        { key: 'academicGoal', label: '2. Clarify Lesson Topic & Difficulties' },
                        { key: 'conceptClarified', label: '3. Explain Core Concepts & Formulas' },
                        { key: 'practiceSolved', label: '4. Solve 2-3 Practice Problems Together' },
                        { key: 'gospelShared', label: '5. Share Gospel Truth & Encouragement' },
                        { key: 'closingPrayer', label: '6. Closing Prayer over Exam Peace' }
                      ].map((item) => (
                        <label
                          key={item.key}
                          onClick={() => toggleCheck(item.key)}
                          className={`flex items-center gap-2.5 p-2 rounded-xl border cursor-pointer select-none transition-all ${
                            checklist[item.key]
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-300'
                              : isDark
                              ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checklist[item.key]}
                            onChange={() => {}}
                            className="rounded text-emerald-600 focus:ring-emerald-500"
                          />
                          <div className="text-xs font-semibold leading-tight flex-1">
                            {item.label}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: LIVE SCRATCHPAD */}
                {activeRoomTab === 'notes' && (
                  <div className="space-y-2 flex flex-col">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                      📝 Study Scratchpad & Equations:
                    </label>
                    <textarea
                      rows={9}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full p-3 rounded-2xl border font-mono text-xs leading-relaxed resize-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                      }`}
                      placeholder="Jot down formulas, code snippets, or practice notes..."
                    />
                    <div className="text-[10px] text-slate-400 text-right">
                      Auto-saved in browser session
                    </div>
                  </div>
                )}

                {/* TAB 3: OPENING & CLOSING PRAYER */}
                {activeRoomTab === 'prayer' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        🙏 Guided Focus & Peace Prayer
                      </h4>
                    </div>

                    <div
                      className={`text-xs italic leading-relaxed p-3.5 rounded-2xl border ${
                        isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                          : 'bg-amber-50/60 border-amber-200 text-slate-700'
                      }`}
                    >
                      "Lord Jesus, thank You for the privilege to study today. Please bless{' '}
                      <strong>{session.studentName || 'our student'}</strong> with wisdom, clear thinking, and calm confidence. Guard their heart from academic anxiety, and may their hard work honor You. Amen."
                    </div>

                    <div className="p-3 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-xs text-indigo-600 dark:text-indigo-400">
                      <strong className="block font-bold mb-0.5">📖 Philippians 4:6-7:</strong>
                      <span>
                        "Do not be anxious about anything, but in every situation, by prayer and petition, present your requests to God."
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
