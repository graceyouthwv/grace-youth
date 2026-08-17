import React, { useState } from 'react';
import { HeartHandshake, PhoneCall, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ConnectWorkerModal } from '../worker/ConnectWorkerModal';

export const CrisisBar = () => {
  const [showWorkerModal, setShowWorkerModal] = useState(false);
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <>
      <div className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between gap-4 mb-8 transition-colors ${
        isDark
          ? 'border-teal-500/20 bg-gradient-to-br from-teal-950/40 via-slate-900/90 to-[#111625] text-white'
          : 'border-teal-200 bg-teal-50 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 ${
            isDark ? 'bg-teal-500/10 border-teal-500/30 text-teal-300' : 'bg-teal-100 border-teal-300 text-teal-800'
          }`}>
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className={`font-extrabold text-sm sm:text-base ${isDark ? 'text-white' : 'text-teal-950'}`}>
              Feeling Burned Out or Overwhelmed?
            </h4>
            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-teal-900'}`}>
              Grace Youth Pastoral Care is 100% confidential and safe for all college students.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowWorkerModal(true)}
          className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Talk / Pray with a Campus Mentor</span>
        </button>
      </div>

      <ConnectWorkerModal
        isOpen={showWorkerModal}
        onClose={() => setShowWorkerModal(false)}
      />
    </>
  );
};
