import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, Users, Ticket, CheckCircle2, Gift, Edit3 } from 'lucide-react';
import { generateCalendarICS } from '../../utils/helpers';
import { EditEventModal } from './EditEventModal';

export const EventCard = ({ event }) => {
  const { toggleEventRsvp, currentUser } = useApp();
  const [showEditModal, setShowEditModal] = useState(false);

  const canEditEvent = currentUser && (
    currentUser.role === 'leader' ||
    currentUser.role === 'worker' ||
    currentUser.role === 'council'
  );

  return (
    <div className="genz-card overflow-hidden flex flex-col justify-between group">
      <div>
        {/* Cover Photo */}
        <div className="relative h-48 w-full overflow-hidden" data-overlay="true">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/70 backdrop-blur-md text-white border border-white/30 shadow-xs" style={{ color: '#ffffff' }}>
              {event.campusName}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-600 text-white shadow-xs" style={{ color: '#ffffff' }}>
              {event.category}
            </span>
          </div>

          {/* Edit Event Icon: Only Admin / Youth Worker */}
          {canEditEvent && (
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-black/70 backdrop-blur-md hover:bg-white hover:text-slate-900 text-white transition-all cursor-pointer shadow-md border border-white/20"
              title="Edit / Delete Event (Admin & Youth Worker Only)"
            >
              <Edit3 className="w-3.5 h-3.5 text-white" />
            </button>
          )}

          <div className="absolute bottom-3 left-3 right-3 card-overlay-text">
            <div className="text-xs text-amber-300 font-black flex items-center gap-1 mb-1 font-heading drop-shadow-md">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.date}</span>
            </div>
            <h3
              className="font-extrabold text-lg leading-tight line-clamp-1 font-heading text-white drop-shadow-lg"
              style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
            >
              {event.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {event.description}
          </p>

          <div className="space-y-1.5 p-3 rounded-2xl border text-xs mb-4 bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 font-medium">
              <Clock className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 font-medium">
              <MapPin className="w-3.5 h-3.5 text-pink-500 dark:text-pink-400 shrink-0" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>

          {/* Free Inclusions */}
          {event.freebies && (
            <div className="mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 block mb-1.5 flex items-center gap-1">
                <Gift className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                <span>Free Inclusions:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {event.freebies.map((freebie, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 px-2.5 py-0.5 rounded-lg"
                  >
                    ✨ {freebie}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t flex items-center justify-between gap-2 bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Users className="w-4 h-4 text-violet-500 dark:text-violet-400" />
          <span>{event.attendeesCount} Going</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => generateCalendarICS(event)}
            className="p-2.5 rounded-2xl border transition-colors cursor-pointer bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            title="Export Calendar (.ics)"
          >
            <Calendar className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleEventRsvp(event.id)}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              event.isRsvp
                ? 'bg-emerald-600 text-white shadow-emerald-500/30'
                : 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-indigo-500/30 hover:scale-105'
            }`}
          >
            {event.isRsvp ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RSVP'd</span>
              </>
            ) : (
              <>
                <Ticket className="w-3.5 h-3.5" />
                <span>Free RSVP</span>
              </>
            )}
          </button>
        </div>
      </div>

      <EditEventModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        event={event}
      />
    </div>
  );
};
