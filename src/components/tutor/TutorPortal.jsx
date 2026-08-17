import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Calendar, Clock, MapPin, CheckCircle2, Plus, Sparkles, ShieldCheck, FileText, UserCheck, Edit3 } from 'lucide-react';
import { EditProfileModal } from '../profile/EditProfileModal';
import { SessionRoomModal } from './SessionRoomModal';

export const TutorPortal = () => {
  const { currentUser, myBookings, tutors, showToast, theme } = useApp();
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionRoom, setShowSessionRoom] = useState(false);
  const isDark = theme === 'dark';

  const isApproved = currentUser.isApproved !== false && currentUser.status !== 'Pending Admin Approval';

  const tutorProfile = tutors.find((t) => t.name === currentUser.name) || {
    subjects: currentUser.subjects || ['Calculus 1', 'General Chemistry'],
    rating: 5.0,
    sessionsGiven: 0,
    preferredMode: currentUser.preferredMode || 'Hybrid'
  };

  const myAssignedBookings = myBookings.filter((bk) =>
    (bk.tutorName && currentUser.name && bk.tutorName.toLowerCase() === currentUser.name.toLowerCase()) ||
    (bk.tutorId && currentUser.id && bk.tutorId === currentUser.id)
  );

  return (
    <div className="space-y-6">
      {/* Tutor Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-amber-950/40 via-slate-900 to-[#111625] border-amber-500/20 text-white shadow-xl'
          : 'bg-gradient-to-r from-amber-50 via-white to-orange-50 border-amber-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/40"
            />
            <span className={`absolute -bottom-1 -right-1 p-1 rounded-full ring-2 ring-slate-900 ${
              isApproved ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-slate-950'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
                Peer Tutor Hub: {currentUser.name}
              </h2>
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                isApproved
                  ? 'bg-emerald-400/20 text-emerald-600 dark:text-emerald-300 border-emerald-400/30'
                  : 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border-amber-400/30'
              }`}>
                {isApproved ? '✓ Certified Tutor' : '⏳ Pending Admin Certification'}
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentUser.roleLabel} • {currentUser.campusName}
            </p>
          </div>
        </div>

        {/* Quick Actions & Stats */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          <button
            onClick={() => setShowEditProfile(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Subjects & Slots</span>
          </button>
        </div>
      </div>

      {/* Pending Approval Notice */}
      {!isApproved && (
        <div className={`p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 ${
          isDark ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <Sparkles className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-extrabold text-sm">Tutor Application Under Admin Review</div>
            <p className="leading-relaxed">
              Your Peer Tutor application is currently awaiting 3-step verification in the Admin Center. Once your academic subjects and safeguarding covenant are certified by Admin, your tutor profile will be published to the public <strong>Acads & Tutors</strong> hub so students can book sessions with you!
            </p>
          </div>
        </div>
      )}

      {/* Main Grid: Scheduled Sessions & Academic Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Scheduled Tutoring Sessions */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    Assigned Peer Tutoring Sessions
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Upcoming academic review sessions booked by students
                  </p>
                </div>
              </div>

              <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2.5 py-1 rounded-xl border border-amber-300 dark:border-amber-500/30">
                {myAssignedBookings.length} Scheduled
              </span>
            </div>

            <div className="space-y-3">
              {myAssignedBookings.length > 0 ? (
                myAssignedBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2 py-0.2 rounded-full">
                          {bk.status}
                        </span>
                        <h4 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {bk.subject}
                        </h4>
                      </div>
                      <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Student: <strong>{bk.studentName}</strong> • Schedule: <strong>{bk.day} ({bk.time})</strong> • {bk.mode}
                      </p>
                      <p className="text-xs text-slate-400 italic mt-1">
                        "{bk.meetingNote}"
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSession(bk);
                        setShowSessionRoom(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
                    >
                      <span>Start Session / Open Meeting &rarr;</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className={`p-8 text-center rounded-2xl border border-dashed text-xs ${
                  isDark ? 'bg-slate-950/40 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  {!isApproved
                    ? 'Your tutor profile is pending certification. Once approved by Admin and published to the directory, booked sessions will appear here.'
                    : 'No student tutorial sessions booked yet. Open slots are published and available in the public Tutorial Hub.'}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Col: Teachable Subjects & Guidelines */}
        <div className="space-y-6">
          {/* Teachable Subjects */}
          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                My Teaching Subjects:
              </span>
              <button
                onClick={() => setShowEditProfile(true)}
                className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
              >
                + Edit
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(currentUser.subjects || tutorProfile.subjects || ['Calculus 1', 'General Chemistry']).map((sub, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-800'
                  }`}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Academic Peer Tutoring Guidelines */}
          <div className={`p-5 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'}`}>
            <span className="text-xs font-black uppercase tracking-widest text-indigo-500 block mb-2">
              📖 Peer Tutor Best Practices:
            </span>
            <ul className={`space-y-2 text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              <li>• <strong>Review syllabus:</strong> Ask the student which specific exam topics or problem sets they struggle with.</li>
              <li>• <strong>Step-by-step solutions:</strong> Guide students to solve derivations independently rather than giving raw answers.</li>
              <li>• <strong>Cheatsheets & Vault:</strong> Encourage students to download mock drills from the Free Reviewer Vault.</li>
            </ul>
          </div>
        </div>
      </div>

      <EditProfileModal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />

      <SessionRoomModal
        isOpen={showSessionRoom}
        onClose={() => setShowSessionRoom(false)}
        session={selectedSession}
      />
    </div>
  );
};
