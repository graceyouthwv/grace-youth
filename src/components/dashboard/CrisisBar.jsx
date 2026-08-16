import React, { useState } from 'react';
import { HeartHandshake, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const CrisisBar = () => {
  const [showModal, setShowModal] = useState(false);
  const { showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const handleConnect = (type) => {
    setShowModal(false);
    showToast(`🕊️ Connected with Pastoral Care (${type}). A leader will reach out shortly!`, 'success');
  };

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
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-black text-xs shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Talk / Pray with a Campus Mentor
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="🕊️ Confidential Pastoral Support"
      >
        <div className="space-y-4 text-xs sm:text-sm">
          <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            You are never alone. Whether it's heavy thesis anxiety, homesickness, or needing someone to pray over your week, we are here to support you without judgment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => handleConnect('One-on-One Coffee Chat')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all group ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-indigo-500 text-white'
                  : 'bg-white border-slate-200 hover:border-indigo-500 text-slate-900 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 w-fit mb-2 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h5 className={`font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Confidential Chat</h5>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Meet for coffee or chat on Messenger/Zoom with a student counselor.
              </p>
            </div>

            <div
              onClick={() => handleConnect('Urgent Prayer Call')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all group ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-teal-500 text-white'
                  : 'bg-white border-slate-200 hover:border-teal-500 text-slate-900 shadow-xs'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 w-fit mb-2 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h5 className={`font-extrabold mb-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>Urgent Prayer Call</h5>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Receive an immediate phone/Viber prayer call from a campus pastor.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
