import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { calculateMatchScore } from '../../utils/matchingEngine';
import { ShieldCheck, UserCheck, Sparkles, MapPin, CheckCircle2, Clock, Send } from 'lucide-react';

export const MinistryDispatchModal = ({ isOpen, onClose, selectedRequest }) => {
  const { tutors, requests, claimRequest, showToast } = useApp();
  const [selectedTutorId, setSelectedTutorId] = useState('');
  const [assignedLeaderNote, setAssignedLeaderNote] = useState('');

  if (!selectedRequest) return null;

  // Calculate matching scores for all tutors
  const rankedTutors = tutors.map((t) => ({
    ...t,
    matchInfo: calculateMatchScore(selectedRequest, t)
  })).sort((a, b) => b.matchInfo.score - a.matchInfo.score);

  const handleManualAssign = (e) => {
    e.preventDefault();
    if (!selectedTutorId) return;

    const chosenTutor = tutors.find((t) => t.id === selectedTutorId);
    claimRequest(selectedRequest.id);

    showToast(`🎯 Ministry Dispatched: ${chosenTutor?.name} assigned to ${selectedRequest.studentName}! Gospel guide sent to tutor.`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🛡️ Ministry Match & Dispatch Console"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleManualAssign} className="space-y-5 text-xs sm:text-sm">
        {/* Request Summary */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                Student Request Needing Match
              </span>
              <h4 className="font-extrabold text-base text-white mt-1 font-heading">
                {selectedRequest.subject}
              </h4>
              <p className="text-xs text-slate-400">
                Student: <strong>{selectedRequest.studentName}</strong> • {selectedRequest.campusName}
              </p>
            </div>
            <span className="text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2.5 py-1 rounded-xl">
              {selectedRequest.urgency}
            </span>
          </div>

          <p className="text-xs text-slate-300 italic bg-black/40 p-2.5 rounded-xl border border-slate-800">
            "{selectedRequest.description}"
          </p>
        </div>

        {/* Ranked Smart Matches */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
            Available Tutors (Ranked by Smart Match Algorithm):
          </label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {rankedTutors.map((tutor) => {
              const isSelected = selectedTutorId === tutor.id;
              const isTop = tutor.matchInfo.score >= 80;

              return (
                <div
                  key={tutor.id}
                  onClick={() => setSelectedTutorId(tutor.id)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-700"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-white">{tutor.name}</span>
                        <span className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                          isTop ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {tutor.matchInfo.score}% Match
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3 h-3 text-pink-400" />
                        <span>{tutor.campusName}</span>
                        <span>• {tutor.matchInfo.reasons.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Ministry Supervision Protocol Note */}
        <div className="p-3 bg-violet-950/30 rounded-2xl border border-violet-500/20 text-xs text-violet-300 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
          <span>
            <strong>Ministry Protocol:</strong> Assigned tutor will automatically receive the <strong>3-Phase Gospel Blueprint</strong> and notification to conduct the 10-minute Gospel connection before tutoring.
          </span>
        </div>

        <button
          type="submit"
          disabled={!selectedTutorId}
          className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-lg cursor-pointer ${
            selectedTutorId
              ? 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-indigo-500/25 hover:scale-[1.01]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          Assign Tutor & Dispatch Gospel-First Session
        </button>
      </form>
    </Modal>
  );
};
