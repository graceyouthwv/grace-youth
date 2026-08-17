import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PlusCircle, Clock, MapPin, CheckCircle, Handshake } from 'lucide-react';
import { Modal } from '../common/Modal';
import { CAMPUSES, SUBJECT_CATEGORIES } from '../../data/campuses';

export const RequestBoard = () => {
  const { requests, addTutorialRequest, claimRequest, currentUser, selectedCampus, theme } = useApp();
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const isDark = theme === 'dark';

  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState(SUBJECT_CATEGORIES[1]);
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [description, setDescription] = useState('');
  const [preferredSchedule, setPreferredSchedule] = useState('');
  const [urgency, setUrgency] = useState('Medium');

  const filteredRequests = requests.filter((req) => {
    if (selectedCampus === 'all') return true;
    return req.campusId === selectedCampus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addTutorialRequest({
      subject,
      category,
      campusId,
      campusName: campusObj?.name || 'Western Visayas Campus',
      description,
      preferredSchedule,
      urgency
    });

    setShowNewRequestModal(false);
    setSubject('');
    setDescription('');
    setPreferredSchedule('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white shadow-xl' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div>
          <h3 className={`text-base sm:text-lg font-extrabold flex items-center gap-2 font-heading ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            <span>📢 Student Tutorial Request Board</span>
            <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
              isDark ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-amber-100 text-amber-900 border border-amber-300'
            }`}>
              {filteredRequests.length} Active
            </span>
          </h3>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Need help with a specific subject or upcoming exam? Post your request and campus leaders will match you.
          </p>
        </div>

        <button
          onClick={() => setShowNewRequestModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span className="text-slate-950 font-black">Post Subject Request</span>
        </button>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRequests.map((req) => {
          const isUrgent = req.urgency.toLowerCase().includes('high');
          const isClaimed = req.status.includes('Claimed');
          const isOwnRequest = currentUser && (
            (currentUser.name && req.author && currentUser.name.toLowerCase() === req.author.toLowerCase()) ||
            (currentUser.email && req.authorEmail && currentUser.email.toLowerCase() === req.authorEmail.toLowerCase())
          );

          return (
            <div
              key={req.id}
              className="genz-card p-5 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-300 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-full">
                    {req.category}
                  </span>
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      isUrgent
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/40 animate-pulse'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {req.urgency}
                  </span>
                </div>

                <h4 className="font-extrabold text-base text-white mb-1 leading-snug font-heading">
                  {req.subject}
                </h4>

                <div className="text-xs text-slate-400 flex items-center gap-1 mb-3 font-medium">
                  <MapPin className="w-3 h-3 text-pink-400" />
                  <span>{req.campusName} • {req.program}</span>
                </div>

                <p className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-2xl border border-slate-800 mb-3 italic leading-relaxed">
                  "{req.description}"
                </p>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-2">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span><strong>Schedule:</strong> {req.preferredSchedule}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-800 mt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  {req.createdAt}
                </span>

                {isClaimed ? (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/30">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{req.status}</span>
                  </span>
                ) : isOwnRequest ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
                    <span>👤 Posted by You</span>
                  </span>
                ) : (
                  <button
                    onClick={() => claimRequest(req.id)}
                    className="flex items-center gap-1.5 text-xs font-extrabold text-white bg-slate-800 hover:bg-indigo-600 px-3 py-1.5 rounded-xl border border-slate-700 transition-all cursor-pointer"
                  >
                    <Handshake className="w-3.5 h-3.5 text-amber-400" />
                    <span>Offer to Tutor</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* New Request Modal */}
      <Modal
        isOpen={showNewRequestModal}
        onClose={() => setShowNewRequestModal(false)}
        title="📝 Post a Subject You Need Help With"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
              Subject Name & Specific Topic *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. OrgChem Reaction Mechanisms or Calculus 2"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs bg-slate-900"
              >
                {SUBJECT_CATEGORIES.filter((c) => c !== 'All Subjects').map((cat, idx) => (
                  <option key={idx} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Your University
              </label>
              <select
                value={campusId}
                onChange={(e) => setCampusId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs bg-slate-900"
              >
                {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
                  <option key={camp.id} value={camp.id}>{camp.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
              What specific problem or exam are you preparing for?
            </label>
            <textarea
              rows={2}
              required
              placeholder="Tell tutors what you're stuck on..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Preferred Schedule
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Tuesday after 5pm, Weekends"
                value={preferredSchedule}
                onChange={(e) => setPreferredSchedule(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-400 mb-1">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-3 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs bg-slate-900"
              >
                <option value="Normal">Normal Practice / Routine Help</option>
                <option value="Medium">Medium (Exam in 1-2 weeks)</option>
                <option value="High (Exam this week!)">🚨 High (Exam in a few days!)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            Post Tutorial Request (100% Free)
          </button>
        </form>
      </Modal>
    </div>
  );
};
