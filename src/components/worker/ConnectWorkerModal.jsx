import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { getCartoonAvatar } from '../../data/avatars';
import { HeartHandshake, PhoneCall, MessageSquare, Coffee, Send, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

const YOUTH_WORKERS = [
  {
    id: 'w-1',
    name: 'Hannah Grace Dela Cruz',
    role: 'Full-time Campus Youth Missionary',
    campus: 'ISUFST (Barotac Nuevo) & UP Visayas',
    phone: '0917-882-9471',
    email: 'graceyouth.wv@proton.me',
    avatar: getCartoonAvatar('HannahGrace'),
    bio: 'Guiding college freshmen, leading life groups, and providing spiritual counsel for academic stress.'
  },
  {
    id: 'w-2',
    name: 'Pastor Tim',
    role: 'Regional Campus Coordinator & Pastoral Counselor',
    campus: 'WVSU, CPU, ISAT-U & San Agustin',
    phone: '0918-392-1144',
    email: 'graceyouth.wv@proton.me',
    avatar: getCartoonAvatar('PastorTim'),
    bio: 'Pastoral counseling, thesis burnout support, pre-marital guidance, and campus leadership.'
  }
];

export const ConnectWorkerModal = ({ isOpen, onClose }) => {
  const { currentUser, addPastoralRequest, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [selectedWorker, setSelectedWorker] = useState(YOUTH_WORKERS[0]);
  const [connectType, setConnectType] = useState('coffee'); // 'coffee' | 'chat' | 'call'
  const [studentContact, setStudentContact] = useState(currentUser.email || '');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!studentContact.trim()) {
      showToast('Please provide your phone or messenger handle.', 'error');
      return;
    }

    addPastoralRequest({
      workerId: selectedWorker.id,
      workerName: selectedWorker.name,
      studentContact: studentContact.trim(),
      connectType,
      notes: notes.trim(),
      campusName: currentUser.campusName
    });

    setIsSubmitted(true);
  };

  const handleCloseAll = () => {
    setIsSubmitted(false);
    setNotes('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAll}
      title={isSubmitted ? '🕊️ Connection Request Sent!' : '🤝 Connect with a Campus Youth Worker'}
      maxWidth="max-w-lg"
    >
      {isSubmitted ? (
        <div className="text-center py-4 space-y-4 text-xs sm:text-sm">
          <div className="w-16 h-16 rounded-3xl bg-teal-500/10 border border-teal-500/30 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className={`text-lg sm:text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              We are here for you!
            </h3>
            <p className={`text-xs mt-1 max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>{selectedWorker.name}</strong> will contact you via <strong>{studentContact}</strong> within 24 hours.
            </p>
          </div>

          <div className={`p-4 rounded-2xl border text-left space-y-2 text-xs ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Ministry Worker:</span>
              <span className="font-bold">{selectedWorker.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Support Mode:</span>
              <span className="font-bold capitalize">{connectType === 'coffee' ? '☕ 1-on-1 Coffee Chat' : connectType === 'call' ? '📞 Urgent Prayer Call' : '💬 Confidential Chat'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Emergency Hotline:</span>
              <span className="font-bold text-pink-500">{selectedWorker.phone}</span>
            </div>
          </div>

          <button
            onClick={handleCloseAll}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
            isDark ? 'bg-teal-950/40 border-teal-500/30 text-teal-200' : 'bg-teal-50 border-teal-200 text-teal-950'
          }`}>
            <span className="font-bold">✨ Safe & Confidential:</span> Feeling overwhelmed by academics, family worries, or loneliness? Our campus youth missionaries are here to listen, pray, and walk with you without judgment.
          </div>

          {/* Worker Picker */}
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Choose Campus Youth Worker:
            </label>
            <div className="space-y-2">
              {YOUTH_WORKERS.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setSelectedWorker(w)}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                    selectedWorker.id === w.id
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-950/50 ring-2 ring-teal-500/20'
                      : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-xl object-cover ring-1 ring-teal-500/30" />
                    <div>
                      <div className={`font-extrabold text-xs sm:text-sm ${selectedWorker.id === w.id ? 'text-teal-700 dark:text-teal-300' : isDark ? 'text-white' : 'text-slate-900'}`}>
                        {w.name}
                      </div>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {w.campus}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    selectedWorker.id === w.id ? 'bg-teal-600 text-white border-teal-600' : 'text-slate-500 border-slate-300'
                  }`}>
                    {selectedWorker.id === w.id ? 'Selected' : 'Select'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Support Channel */}
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              How would you like to connect?
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'coffee', label: '☕ Coffee Chat', desc: 'In-person / Cafe' },
                { id: 'chat', label: '💬 Chat / DM', desc: 'Messenger / Viber' },
                { id: 'call', label: '📞 Prayer Call', desc: 'Immediate Voice' }
              ].map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setConnectType(ch.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    connectType === ch.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md font-black'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-black">{ch.label}</div>
                  <div className="text-[10px] opacity-75">{ch.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your Phone Number / Messenger Handle *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 0917-xxx-xxxx or FB name"
              value={studentContact}
              onChange={(e) => setStudentContact(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              What's on your heart? (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Share what you are going through (exam burnout, spiritual questions, thesis stress)..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 via-indigo-600 to-violet-600 hover:from-teal-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>Send Pastoral Connect Request</span>
          </button>
        </form>
      )}
    </Modal>
  );
};
