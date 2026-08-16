import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EventCard } from './EventCard';
import { Sparkles, Calendar } from 'lucide-react';

export const EventList = () => {
  const { events, selectedCampus } = useApp();

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
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
