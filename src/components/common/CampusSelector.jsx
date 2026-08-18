import React from 'react';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { Globe, School, ChevronDown, Laptop, MapPin } from 'lucide-react';

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
      {/* Search Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
        {/* 1. Region Selector */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {isHlg ? 'Rehiyon' : 'Region'}
          </label>
          <div className="relative">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
            >
              {PH_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.shortName}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 2. Campus Dropdown */}
        <div className="relative">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            {isHlg ? 'Unibersidad / Campus' : 'Campus / University'}
          </label>
          <div className="relative">
            <select
              value={selectedCampus}
              onChange={(e) => setSelectedCampus(e.target.value)}
              className="w-full appearance-none pl-3.5 pr-8 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-hidden cursor-pointer transition-all shadow-2xs hover:border-slate-300 dark:hover:border-slate-600"
            >
              <option value="all">
                {selectedRegion === 'all'
                  ? 'All Campuses (Nationwide)'
                  : `All Campuses in ${currentRegionObj.shortName}`}
              </option>
              {availableCampuses
                .filter((c) => c.id !== 'all')
                .map((camp) => (
                  <option key={camp.id} value={camp.id}>
                    {camp.name}
                  </option>
                ))}
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* 3. Delivery Mode Toggle */}
        {showModality && (
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              {isHlg ? 'Paagi sang Pagtuon' : 'Delivery Mode'}
            </label>
            <div className="p-1 rounded-xl border flex items-center justify-between gap-1 h-[42px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-2xs">
              <button
                onClick={() => setDeliveryModeFilter('all')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'all'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>

              <button
                onClick={() => setDeliveryModeFilter('online')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'online'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Online sessions open nationwide"
              >
                Online
              </button>

              <button
                onClick={() => setDeliveryModeFilter('f2f')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                  deliveryModeFilter === 'f2f'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="In-person sessions on campus"
              >
                In-Person
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Campus Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          Popular:
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          {availableCampuses.slice(0, 8).map((c) => {
            const isSelected = selectedCampus === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCampus(c.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 shadow-2xs'
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
export default CampusSelector;
