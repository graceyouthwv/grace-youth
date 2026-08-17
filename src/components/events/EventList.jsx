import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCard } from './EventCard';
import { Sparkles, Calendar, Plus, PlusCircle } from 'lucide-react';
import { AddEventModal } from './AddEventModal';

export const EventList = () => {
  const { events, selectedCampus } = useApp();
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const filteredEvents = events.filter((ev) => {
    return selectedCampus === 'all' || ev.campusId === selectedCampus || ev.campusId === 'all';
  });

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="p-6 genz-card border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-slate-900 to-[#111625] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-xs font-black text-purple-300 mb-2 border border-purple-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Campus Fellowship & Welcoming Nights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
            Campus Ministry Gatherings & Hangouts
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            Midterm de-stress chillouts, beach prayer walks, and regional college conferences.
          </p>
        </div>

        <button
          onClick={() => setShowAddEventModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Campus Event</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <AddEventModal
        isOpen={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
      />
    </div>
  );
};
