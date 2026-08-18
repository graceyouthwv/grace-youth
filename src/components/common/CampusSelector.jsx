import React from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
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

  const currentRegionObj = getRegionById(selectedRegion);

  // Filter campuses based on selected region
  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return true;
    if (selectedRegion === 'all') return true;
    return c.regionId === selectedRegion;
  });

  return (
    <div className={`space-y-3 ${compact ? 'text-xs' : ''}`}>
      {/* Top Controls Grid: Region + Campus Dropdown + Modality */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
        {/* 1. Region Selector */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span>1. {isHlg ? 'Rehiyon / Probinsya:' : 'Select Region / Place:'}</span>
          </div>
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer transition-all ${
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
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Campus Dropdown Drilldown */}
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
            <School className="w-3.5 h-3.5 text-pink-400" />
            <span>2. {isHlg ? 'Unibersidad / Campus:' : 'Narrow Down by Campus:'}</span>
          </div>
          <div className="relative">
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className={`w-full appearance-none pl-3 pr-8 py-2 rounded-xl border text-xs font-bold focus:ring-2 focus:ring-pink-500 focus:outline-hidden cursor-pointer transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-white hover:border-slate-600'
                  : 'bg-white border-slate-200 text-slate-900 shadow-xs hover:border-slate-300'
              }`}
            >
              <option value="all">
                {selectedRegion === 'all'
                  ? '📍 All Philippine Campuses (Nationwide)'
                  : `📍 All Campuses in ${currentRegionObj.shortName}`}
              </option>
              {availableCampuses
                .filter((c) => c.id !== 'all')
                .map((camp) => (
                  <option key={camp.id} value={camp.id}>
                    🎓 {camp.name}
                  </option>
                ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Delivery Modality */}
        {showModality && (
          <div className="space-y-1">
            <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>3. Delivery Mode:</span>
            </div>
            <div className={`p-0.5 rounded-xl border flex items-center justify-between gap-0.5 h-[38px] ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setDeliveryModeFilter('all')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'all'
                    ? isDark ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-900 shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setDeliveryModeFilter('online')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'online'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Online sessions open nationwide"
              >
                💻 Online
              </button>

              <button
                onClick={() => setDeliveryModeFilter('f2f')}
                className={`flex-1 py-1.5 rounded-lg text-[11px] font-black transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'f2f'
                    ? 'bg-violet-600 text-white shadow-xs'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Face-to-face sessions on campus"
              >
                📍 On-Campus
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Campus Chips (Scrollable) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
        <div className="flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest shrink-0 pl-1">
          <MapPin className="w-3 h-3 text-pink-400" />
          <span>Quick Campuses:</span>
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
