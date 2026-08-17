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
  MessageSquare,
  Share2,
  FileText,
  HelpCircle
} from 'lucide-react';
import { triggerConfetti } from '../../utils/helpers';

export const SessionRoomModal = ({ isOpen, onClose, session }) => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [activeRoomTab, setActiveRoomTab] = useState('meeting'); // 'meeting' | 'notes' | 'prayer'
  const [seconds, setSeconds] = useState(0);
  const [notes, setNotes] = useState(
    '1. Reviewed Power Rule: d/dx(x^n) = n*x^(n-1)\n2. Chain Rule: d/dx(f(g(x))) = f\'(g(x)) * g\'(x)\n3. Practice Problem #4 from UPV CAS Math 17 Reviewer.'
  );

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

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!session) return null;

  const meetingLink = `https://meet.google.com/gy-${(session.subject || 'acads').toLowerCase().replace(/[^a-z0-9]/g, '-')}-live`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(meetingLink);
    showToast('📋 Google Meet link copied to clipboard!', 'success');
  };

  const handleCompleteSession = () => {
    triggerConfetti();
    showToast(`🎉 Tutorial session completed with ${session.studentName || 'student'}! Faith Honor XP awarded.`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📹 Live Peer Tutorial Room"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Header Session Card */}
        <div className={`p-4 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-indigo-50/70 border-indigo-200 text-slate-900'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ● Live In-Session
              </span>
              <span className="text-xs font-mono font-bold text-pink-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(seconds)}</span>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold font-heading">
              {session.subject}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Student: <strong>{session.studentName || 'Bea Claridad'}</strong> • Mode: <strong>{session.mode || 'In-Person / Hybrid'}</strong>
            </p>
          </div>

          <button
            onClick={handleCompleteSession}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Finish Session</span>
          </button>
        </div>

        {/* Room Tab Navigation */}
        <div className={`flex items-center p-1 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          <button
            type="button"
            onClick={() => setActiveRoomTab('meeting')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoomTab === 'meeting'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video & Location</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRoomTab('notes')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoomTab === 'notes'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Study Scratchpad</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveRoomTab('prayer')}
            className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRoomTab === 'prayer'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Session Prayer</span>
          </button>
        </div>

        {/* TAB 1: VIDEO LINK & LOCATION */}
        {activeRoomTab === 'meeting' && (
          <div className="space-y-4">
            <div className={`p-5 rounded-3xl border space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-400">
                  🌐 Online Room (Google Meet):
                </span>
                <span className="text-[11px] text-slate-400">Auto-Generated for Batchmates</span>
              </div>

              <div className={`p-3 rounded-2xl border flex items-center justify-between gap-2 ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <span className="font-mono text-xs text-indigo-400 truncate">{meetingLink}</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyLink}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                    title="Copy Link"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
                  >
                    <span>Launch Meet</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-start gap-2 pt-1">
                <HelpCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  Meeting Note: <em>"{session.meetingNote || 'CAS Gazebo or Google Meet link. Ready to solve calculus chain rule derivations together.'}"</em>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: STUDY SCRATCHPAD */}
        {activeRoomTab === 'notes' && (
          <div className="space-y-3">
            <label className={`block text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              📝 Live Study Notes & Practice Problem Scratchpad:
            </label>
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full p-4 rounded-2xl border font-mono text-xs leading-relaxed ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900'
              }`}
              placeholder="Jot down formula derivations, problem solutions, or topics to review..."
            />
            <div className="text-[11px] text-slate-400 text-right">
              Auto-saved to session review summary
            </div>
          </div>
        )}

        {/* TAB 3: OPENING & CLOSING PRAYER */}
        {activeRoomTab === 'prayer' && (
          <div className={`p-5 rounded-3xl border space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-extrabold text-sm font-heading">
                🙏 Peer Tutor Opening & Focus Prayer
              </h4>
            </div>

            <p className={`text-xs italic leading-relaxed p-4 rounded-2xl border ${
              isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-amber-50/50 border-amber-200 text-slate-700'
            }`}>
              "Lord Jesus, thank You for the opportunity to study and sharpen our minds together today. We pray for clarity, focus, and understanding for {session.studentName || 'our student'}. Grant peace over any upcoming exams, and may everything we learn honor You. In Jesus' name, Amen."
            </p>

            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>📖 Verse of encouragement:</span>
              <strong className="text-pink-500">James 1:5 — 'If any of you lacks wisdom, you should ask God.'</strong>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
