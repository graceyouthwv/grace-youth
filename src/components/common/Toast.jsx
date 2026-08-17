import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toasts, theme } = useApp();
  const isDark = theme === 'dark';

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border text-xs sm:text-sm font-semibold transition-all transform animate-toast-in backdrop-blur-xl ${
              isSuccess
                ? isDark
                  ? 'bg-slate-900/95 text-white border-emerald-500/40 shadow-emerald-500/10'
                  : 'bg-white/95 text-slate-900 border-emerald-500/30 shadow-emerald-500/10'
                : isInfo
                ? isDark
                  ? 'bg-indigo-950/95 text-indigo-50 border-indigo-500/40 shadow-indigo-500/10'
                  : 'bg-white/95 text-slate-900 border-indigo-500/30 shadow-indigo-500/10'
                : isDark
                ? 'bg-rose-950/95 text-white border-rose-500/40 shadow-rose-500/10'
                : 'bg-white/95 text-slate-900 border-rose-500/30 shadow-rose-500/10'
            }`}
          >
            {isSuccess ? (
              <div className="p-1 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5 animate-check-pop">
                <Sparkles className="w-4 h-4" />
              </div>
            ) : isInfo ? (
              <div className="p-1 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0 mt-0.5 animate-check-pop">
                <Info className="w-4 h-4" />
              </div>
            ) : (
              <div className="p-1 rounded-xl bg-rose-500/20 text-rose-400 shrink-0 mt-0.5 animate-check-pop">
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
            <div className="flex-1 leading-snug">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};
