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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Card with smooth spring entrance */}
      <div
        className={`relative w-full ${maxWidth} rounded-3xl shadow-2xl border p-6 z-10 overflow-hidden transform animate-modal-in ${
          isDark
            ? 'bg-[#111625] text-slate-100 border-slate-800'
            : 'bg-white text-slate-900 border-slate-200'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between pb-4 border-b mb-5 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h3 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 font-heading ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            {title}
          </h3>
          <button
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer hover:rotate-90 duration-200 ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={`max-h-[78vh] overflow-y-auto pr-1 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          {children}
        </div>
      </div>
    </div>
  );
};
