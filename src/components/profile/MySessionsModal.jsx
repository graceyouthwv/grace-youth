import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Clock, MapPin, Trash2, BookOpen, Users, Video } from 'lucide-react';
import { SessionRoomModal } from '../tutor/SessionRoomModal';

export const MySessionsModal = ({ isOpen, onClose }) => {
  const { myBookings, cancelBooking, myGroups, bibleStudies, theme } = useApp();
  const isDark = theme === 'dark';
  const [selectedSession, setSelectedSession] = useState(null);
  const [showSessionRoom, setShowSessionRoom] = useState(false);

  const joinedGroupsData = bibleStudies.filter((g) => myGroups.includes(g.id));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📅 My Booked Sessions & Life Groups"
      maxWidth="max-w-xl"
    >
      <div className="space-y-6 text-xs sm:text-sm">
        {/* Booked Peer Tutorials */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
            <span>Booked Peer Tutorials ({myBookings.length})</span>
          </h4>

          {myBookings.length > 0 ? (
            <div className="space-y-3">
              {myBookings.map((bk) => (
                <div
                  key={bk.id}
                  className={`rounded-3xl p-4 border transition-all flex flex-col justify-between gap-3 ${
                    isDark
                      ? 'bg-slate-900 border-slate-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {bk.status}
                      </span>
                      <h5 className={`font-extrabold text-sm mt-1 font-heading ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {bk.subject}
                      </h5>
                      <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Tutor: <strong className={isDark ? 'text-slate-200' : 'text-slate-800'}>{bk.tutorName}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => cancelBooking(bk.id)}
                      className={`p-2 rounded-xl transition-colors cursor-pointer ${
                        isDark
                          ? 'text-slate-500 hover:text-rose-400 hover:bg-slate-800'
                          : 'text-slate-400 hover:text-rose-600 hover:bg-slate-200'
                      }`}
                      title="Cancel Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className={`text-xs space-y-1.5 p-3 rounded-2xl border ${
                    isDark
                      ? 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                      : 'bg-white border-slate-200 text-slate-700 shadow-xs'
                  }`}>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{bk.day} ({bk.time})</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{bk.mode}</span>
                    </div>
                    {bk.meetingNote && (
                      <p className={`text-[11px] italic mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Note: {bk.meetingNote}
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSelectedSession(bk);
                          setShowSessionRoom(true);
                        }}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Enter Live 1-on-1 Video Study Room &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-6 rounded-3xl border border-dashed text-xs ${
              isDark
                ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              No active tutorial bookings yet.
            </div>
          )}
        </div>

        {/* Joined Life Groups */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>My Active Campus Life Groups ({joinedGroupsData.length})</span>
          </h4>

          {joinedGroupsData.length > 0 ? (
            <div className="space-y-3">
              {joinedGroupsData.map((grp) => (
                <div
                  key={grp.id}
                  className={`rounded-3xl p-4 border flex items-center justify-between gap-3 ${
                    isDark
                      ? 'bg-emerald-950/30 border-emerald-500/30 text-white'
                      : 'bg-emerald-50/70 border-emerald-200 text-emerald-950 shadow-xs'
                  }`}
                >
                  <div>
                    <h5 className={`font-extrabold text-sm font-heading ${
                      isDark ? 'text-white' : 'text-slate-900'
                    }`}>
                      {grp.title}
                    </h5>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {grp.schedule} • {grp.location}
                    </p>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                      Facilitator: {grp.facilitator}
                    </span>
                  </div>
                  <span className={`text-xs font-black px-3 py-1 rounded-xl border shrink-0 ${
                    isDark
                      ? 'text-emerald-300 bg-emerald-950/80 border-emerald-500/40'
                      : 'text-emerald-700 bg-emerald-100 border-emerald-300'
                  }`}>
                    Active
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-6 rounded-3xl border border-dashed text-xs ${
              isDark
                ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              You haven't joined any campus life groups yet.
            </div>
          )}
        </div>
      </div>

      <SessionRoomModal
        isOpen={showSessionRoom}
        onClose={() => setShowSessionRoom(false)}
        session={selectedSession}
      />
    </Modal>
  );
};
export default MySessionsModal;
