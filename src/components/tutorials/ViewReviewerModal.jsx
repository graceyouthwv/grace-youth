import React from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { BookOpen, FileText, Sparkles, Download, ExternalLink } from 'lucide-react';

export const ViewReviewerModal = ({ isOpen, onClose, reviewer }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  if (!reviewer) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`📚 ${reviewer.course}: ${reviewer.title}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Course Header */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-sky-50/70 border-sky-200'
        }`}>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-sky-500/20 text-sky-400 border border-sky-500/30">
                {reviewer.course}
              </span>
              <span className="text-xs text-slate-400 font-bold">
                {reviewer.campusName}
              </span>
            </div>
            <h3 className={`text-base font-extrabold font-heading mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {reviewer.title}
            </h3>
          </div>

          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 shrink-0">
            {reviewer.fileSize}
          </span>
        </div>

        {/* Description & Topics Outline */}
        <div className={`p-4 rounded-2xl border space-y-2 ${
          isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
        }`}>
          <span className="text-[10px] font-black uppercase tracking-wider text-sky-400 block">
            📖 Study Outline & Formulas Covered:
          </span>
          <p className="text-xs sm:text-sm leading-relaxed font-medium">
            {reviewer.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {reviewer.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-lg border bg-slate-950/60 border-slate-800 text-sky-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contributor Note */}
        <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
          isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-600'
        }`}>
          <span>
            Shared by peer mentor: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{reviewer.contributor}</strong>
          </span>

          {reviewer.link && reviewer.link !== '#' && (
            <a
              href={reviewer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold flex items-center gap-1 text-[11px]"
            >
              <span>Cloud Drive</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-end ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </Modal>
  );
};
