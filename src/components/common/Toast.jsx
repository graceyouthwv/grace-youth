import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useApp();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border text-sm font-medium transition-all transform animate-in slide-in-from-bottom-5 duration-300 ${
              isSuccess
                ? 'bg-slate-900 text-white border-slate-800'
                : isInfo
                ? 'bg-indigo-950 text-indigo-50 border-indigo-800'
                : 'bg-rose-900 text-white border-rose-800'
            }`}
          >
            {isSuccess ? (
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : isInfo ? (
              <Info className="w-5 h-5 text-indigo-300 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-snug">{toast.message}</div>
          </div>
        );
      })}
    </div>
  );
};
