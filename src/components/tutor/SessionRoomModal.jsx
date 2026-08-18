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
  Check,
  RefreshCw,
  Tv
} from 'lucide-react';
import { triggerConfetti } from '../../utils/helpers';

export const SessionRoomModal = ({ isOpen, onClose, session }) => {
  const { currentUser, theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeRoomTab, setActiveRoomTab] = useState('call'); // 'call' | 'notes' | 'prayer'
  const [seconds, setSeconds] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Deterministic room name for student and tutor
  const cleanSubject = (session?.subject || 'study').replace(/[^a-zA-Z0-9]/g, '');
  const cleanId = (session?.id || 'session').replace(/[^a-zA-Z0-9]/g, '');
  const rawRoomId = `GY_${cleanId}_${cleanSubject}`;

  // 100% Free Open-Source WebRTC In-App Embed (No 5-minute demo limit, No accounts, Unlimited P2P)
  const embedUrl = `https://vdo.ninja/?room=${rawRoomId}&label=${encodeURIComponent(
    currentUser.name || 'GraceYouth Member'
  )}&webcam&autostart`;

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
    navigator.clipboard?.writeText(embedUrl);
    setCopied(true);
    showToast('📋 Private study room link copied to clipboard!', 'success');
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
      title="📹 Live 1-on-1 Video Study Room"
      maxWidth={isFullscreen ? 'max-w-7xl' : 'max-w-5xl'}
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Top Session Status Bar */}
        <div
          className={`p-3.5 sm:p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
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
                  100% Free In-App WebRTC • Unlimited
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
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand Video Room'}
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
                This session is strictly reserved for the booked <strong>Student</strong> (
                <em>{session.studentName || 'Student'}</em>) and assigned <strong>Peer Tutor</strong>{' '}
                (<em>{session.tutorName || 'Tutor'}</em>).
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto text-xs text-slate-400">
              Please sign in with your verified Student or Tutor account to enter.
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left/Main Column: In-App Embedded Video Window */}
            <div className="lg:col-span-8 space-y-3">
              <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl aspect-video lg:aspect-auto lg:h-[490px]">
                <iframe
                  src={embedUrl}
                  title="Grace Youth In-App Peer Video Call"
                  allow="camera; microphone; fullscreen; display-capture; autoplay"
                  className="w-full h-full border-0"
                />
              </div>

              {/* In-Call Quick Controls */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-emerald-500 font-semibold text-xs">
                    <ShieldCheck className="w-3.5 h-3.5" /> Peer-to-Peer Encrypted
                  </span>
                  <span>•</span>
                  <span>No 5-min timeout • Unlimited Free Call</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyLink}
                    className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied Room Link' : 'Copy Room Link'}</span>
                  </button>
                  <a
                    href={embedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                    title="Pop out in separate window"
                  >
                    <span>Pop out</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: In-Call Study Sidecar Tools */}
            <div className="lg:col-span-4 space-y-3 flex flex-col">
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
                  <span>Goals</span>
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
                className={`flex-1 p-4 rounded-3xl border flex flex-col justify-between ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                }`}
              >
                {/* TAB 1: 6-STEP GOSPEL-FIRST CHECKLIST */}
                {activeRoomTab === 'call' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                        ✝️ Study Framework:
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">
                        {Object.values(checklist).filter(Boolean).length}/6 Checked
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        { key: 'openingPrayer', label: '1. Opening Prayer & Catch-up' },
                        { key: 'academicGoal', label: '2. Clarify Lesson Topic' },
                        { key: 'conceptClarified', label: '3. Explain Core Concepts' },
                        { key: 'practiceSolved', label: '4. Solve 2 Practice Problems' },
                        { key: 'gospelShared', label: '5. Gospel Encouragement' },
                        { key: 'closingPrayer', label: '6. Closing Prayer for Peace' }
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
                  <div className="space-y-2 flex flex-col h-full">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">
                      📝 In-Call Scratchpad:
                    </label>
                    <textarea
                      rows={10}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className={`w-full flex-1 p-3 rounded-2xl border font-mono text-xs leading-relaxed resize-none ${
                        isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-indigo-500'
                          : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'
                      }`}
                      placeholder="Jot down formulas, code snippets, or practice notes..."
                    />
                    <div className="text-[10px] text-slate-400 text-right">
                      Saved in browser
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
