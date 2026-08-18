import React from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS } from '../../data/regions';
import { MapPin, Globe, Laptop, School, Sparkles, ChevronDown } from 'lucide-react';

export const CampusSelector = ({ compact = false, showModality = true }) => {
  const {
    selectedRegion,
    setSelectedRegion,
    selectedCampus,
    setSelectedCampus,
    deliveryModeFilter,
    setDeliveryModeFilter,
    theme,
    language
  } = useApp();

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';

  // Filter campuses based on selected region
  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return true;
    if (selectedRegion === 'all') return true;
    return c.regionId === selectedRegion;
  });

  return (
    <div className={`space-y-2.5 ${compact ? 'text-xs' : ''}`}>
      {/* Top Row: Region Selector + Modality Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* 1. Region Dropdown */}
        <div className="flex items-center gap-1.5 flex-1 min-w-[220px]">
          <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400 shrink-0">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>{isHlg ? 'Rehiyon:' : 'Region:'}</span>
          </div>

          <div className="relative flex-1">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`w-full appearance-none pl-3 pr-7 py-1.5 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-600'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xs hover:border-slate-300'
              }`}
            >
              {PH_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.shortName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Modality Switcher (All / Online Nationwide / In-Person) */}
        {showModality && (
          <div className={`p-0.5 rounded-xl border flex items-center gap-0.5 shrink-0 ${
            isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setDeliveryModeFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                deliveryModeFilter === 'all'
                  ? isDark ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>All Modes</span>
            </button>

            <button
              onClick={() => setDeliveryModeFilter('online')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                deliveryModeFilter === 'online'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Filter to Online / Nationwide sessions open to all regions"
            >
              <Laptop className="w-3 h-3" />
              <span>💻 Online (Nationwide)</span>
            </button>

            <button
              onClick={() => setDeliveryModeFilter('f2f')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center gap-1 ${
                deliveryModeFilter === 'f2f'
                  ? 'bg-violet-600 text-white shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Filter to Face-to-Face Campus sessions in your selected region"
            >
              <School className="w-3 h-3" />
              <span>📍 Face-to-Face</span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Row: Campus Chips (Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 pl-1">
          <MapPin className="w-3 h-3 text-pink-400" />
          <span>Campus:</span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {availableCampuses.map((c) => {
            const isSelected = selectedCampus === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCampus(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-pink-500/25 scale-105 ring-2 ring-white/20'
                    : isDark
                    ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:text-white hover:border-slate-600'
                    : 'bg-white text-slate-700 border border-slate-200 hover:text-slate-950 hover:border-slate-300 shadow-xs'
                }`}
              >
                {c.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
