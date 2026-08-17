import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Clock, MapPin, Trash2, BookOpen, Users, Video } from 'lucide-react';
import { SessionRoomModal } from '../tutor/SessionRoomModal';

export const MySessionsModal = ({ isOpen, onClose }) => {
  const { myBookings, cancelBooking, myGroups, bibleStudies } = useApp();
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
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Booked Peer Tutorials ({myBookings.length})</span>
          </h4>

          {myBookings.length > 0 ? (
            <div className="space-y-3">
              {myBookings.map((bk) => (
                <div
                  key={bk.id}
                  className="bg-slate-900/80 rounded-3xl p-4 border border-slate-800 flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {bk.status}
                      </span>
                      <h5 className="font-extrabold text-sm text-white mt-1 font-heading">
                        {bk.subject}
                      </h5>
                      <p className="text-xs text-slate-400">
                        Tutor: <strong className="text-slate-200">{bk.tutorName}</strong>
                      </p>
                    </div>

                    <button
                      onClick={() => cancelBooking(bk.id)}
                      className="text-slate-500 hover:text-rose-400 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Cancel Session"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 bg-black/40 p-3 rounded-2xl border border-slate-800/80">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-pink-400" />
                      <span>{bk.day} ({bk.time})</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      <span>{bk.mode}</span>
                    </div>
                    {bk.meetingNote && (
                      <p className="text-[11px] text-slate-400 italic mt-1">
                        Note: {bk.meetingNote}
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          setSelectedSession(bk);
                          setShowSessionRoom(true);
                        }}
                        className="w-full py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Launch Meeting Room & Scratchpad &rarr;</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 text-slate-500 text-xs">
              No active tutorial bookings yet.
            </div>
          )}
        </div>

        {/* Joined Life Groups */}
        <div>
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Active Campus Life Groups ({joinedGroupsData.length})</span>
          </h4>

          {joinedGroupsData.length > 0 ? (
            <div className="space-y-3">
              {joinedGroupsData.map((grp) => (
                <div
                  key={grp.id}
                  className="bg-emerald-950/30 rounded-3xl p-4 border border-emerald-500/30 flex items-center justify-between gap-3"
                >
                  <div>
                    <h5 className="font-extrabold text-sm text-white font-heading">{grp.title}</h5>
                    <p className="text-xs text-slate-400">
                      {grp.schedule} • {grp.location}
                    </p>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      Facilitator: {grp.facilitator}
                    </span>
                  </div>
                  <span className="text-xs font-black text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-500/40 shrink-0">
                    Active
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 text-slate-500 text-xs">
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
