import React from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { BookOpen, FileText, CheckCircle2, Sparkles, HelpCircle } from 'lucide-react';

export const ViewLessonModal = ({ isOpen, onClose, lesson, seriesTitle }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  if (!lesson) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`📖 ${lesson.title}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Header Pill */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/70 border-emerald-200'
        }`}>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
              {seriesTitle || 'Campus Discipleship Track'}
            </span>
            <h3 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {lesson.title}
            </h3>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-black text-xs shrink-0">
            {lesson.passage}
          </div>
        </div>

        {/* Attached PDF Badge */}
        <div className={`p-3 rounded-xl border flex items-center justify-between gap-2 text-xs ${
          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <div className="flex items-center gap-2 truncate">
            <FileText className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="font-mono text-[11px] truncate">
              Attached Study Guide: <strong>{lesson.fileName || `${lesson.title.replace(/\s+/g, '_')}_Guide.pdf`}</strong>
            </span>
          </div>

          <span className="text-slate-400 font-mono text-[10px] shrink-0">
            {lesson.fileSize || '1.2 MB PDF'}
          </span>
        </div>

        {/* Key Spiritual Takeaway */}
        <div className={`p-4 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500 block">
            💡 Key Spiritual Principle:
          </span>
          <p className="text-xs sm:text-sm font-medium leading-relaxed">
            {lesson.keyTakeaway}
          </p>
        </div>

        {/* Discussion Questions */}
        {lesson.questions && (
          <div className={`p-4 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
          }`}>
            <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Inductive Small Group Questions:</span>
            </span>
            <p className="text-xs leading-relaxed whitespace-pre-line font-medium text-slate-300 dark:text-slate-300">
              {lesson.questions}
            </p>
          </div>
        )}

        {/* Action Footer */}
        <div className={`pt-3 border-t flex items-center justify-end ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </Modal>
  );
};
