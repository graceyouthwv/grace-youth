import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card with strict viewport bounded max-height and internal scroll */}
      <div
        className={`relative w-full ${maxWidth} rounded-3xl shadow-2xl border p-4 sm:p-6 z-10 overflow-hidden flex flex-col max-h-[90vh] max-h-[90dvh] transition-all transform animate-modal-in ${
          isDark
            ? 'bg-[#111625] text-slate-100 border-slate-800'
            : 'bg-white text-slate-900 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Always Fixed at Top of Modal */}
        <div className={`flex items-center justify-between pb-3 border-b mb-3 shrink-0 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h3 className={`text-sm sm:text-base font-extrabold flex items-center gap-2 font-heading pr-2 truncate ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer shrink-0 hover:rotate-90 duration-200 ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body - Never pushes header off screen */}
        <div className={`overflow-y-auto overscroll-contain flex-1 min-h-0 pr-1.5 space-y-4 custom-scrollbar ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};
