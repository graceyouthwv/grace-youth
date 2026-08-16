import React, { useState } from 'react';
import { HeartHandshake, PhoneCall, MessageSquare, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const CrisisBar = () => {
  const [showModal, setShowModal] = useState(false);
  const { showToast } = useApp();

  const handleConnect = (type) => {
    setShowModal(false);
    showToast(`🕊️ Connected with Pastoral Care (${type}). A leader will reach out shortly!`, 'success');
  };

  return (
    <>
      <div className="genz-card p-5 sm:p-6 border border-teal-500/20 bg-gradient-to-br from-teal-950/40 via-slate-900/90 to-[#111625] flex flex-col justify-between gap-4 mb-8">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-teal-300 flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-white">
              Feeling Burned Out or Overwhelmed?
            </h4>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Grace Youth Pastoral Care is 100% confidential and safe for all college students.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
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
          <p className="text-slate-300 leading-relaxed">
            You are never alone. Whether it's heavy thesis anxiety, homesickness, or needing someone to pray over your week, we are here to support you without judgment.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              onClick={() => handleConnect('One-on-One Coffee Chat')}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500 cursor-pointer transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit mb-2 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-white mb-1">Confidential Chat</h5>
              <p className="text-xs text-slate-400">
                Meet for coffee or chat on Messenger/Zoom with a student counselor.
              </p>
            </div>

            <div
              onClick={() => handleConnect('Urgent Prayer Call')}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500 cursor-pointer transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 w-fit mb-2 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h5 className="font-extrabold text-white mb-1">Urgent Prayer Call</h5>
              <p className="text-xs text-slate-400">
                Receive an immediate phone/Viber prayer call from a campus pastor.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
