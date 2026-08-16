import React from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { MapPin, Sparkles } from 'lucide-react';

export const CampusSelector = ({ compact = false }) => {
  const { selectedCampus, setSelectedCampus } = useApp();

  return (
    <div className={`flex items-center gap-2 ${compact ? '' : 'overflow-x-auto pb-1 scrollbar-none'}`}>
      {!compact && (
        <div className="flex items-center gap-1.5 text-[11px] font-black text-slate-400 uppercase tracking-widest shrink-0 pl-1">
          <MapPin className="w-3.5 h-3.5 text-pink-400" />
          <span>Campus:</span>
        </div>
      )}

      <div className="flex items-center gap-1.5 shrink-0">
        {CAMPUSES.map((c) => {
          const isSelected = selectedCampus === c.id;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedCampus(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-lg shadow-pink-500/25 scale-105 ring-2 ring-white/20'
                  : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {c.shortName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
