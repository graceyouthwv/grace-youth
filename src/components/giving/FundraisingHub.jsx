import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampaignCard } from './CampaignCard';
import { RegisterEventModal } from './RegisterEventModal';
import { AddCampaignModal } from './AddCampaignModal';
import { EditCampaignModal } from './EditCampaignModal';
import { Ticket, PlusCircle, Sparkles, Users, Calendar, ShieldCheck, Tent, CheckCircle2 } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';
import { getTranslation } from '../../data/translations';

export const FundraisingHub = () => {
  const { campaigns, selectedCampus, setSelectedCampus, currentUser, language, theme } = useApp();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeCampaignForRegister, setActiveCampaignForRegister] = useState(null);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';
  const isAdmin = currentUser && (currentUser.role === 'leader' || currentUser.role === 'council' || currentUser.isAdmin === true);

  const totalRegistrations = campaigns.reduce((acc, c) => acc + (c.registeredCount || c.registrants?.length || 0), 0);
  const totalCapacity = campaigns.reduce((acc, c) => acc + (c.maxCapacity || 250), 0);

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCampus = selectedCampus === 'all' || camp.campusId === selectedCampus || camp.campusId === 'all';
    const matchesCategory = activeCategoryFilter === 'All' || camp.category === activeCategoryFilter;
    return matchesCampus && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-tab-in">
      {/* Header Banner */}
      <div className={`p-5 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${
              isDark
                ? 'bg-indigo-950/60 text-indigo-300 border-indigo-500/30'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}>
              <Ticket className="w-3.5 h-3.5 text-indigo-500" />
              <span>{isHlg ? 'Rehistrasyon sa mga Tilipon & Kampo' : 'Event & Camp Registrations'}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              December Meet & Greet Active (₱250)
            </span>
          </div>

          <h2 className={`text-xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHlg ? 'December Citywide Meet & Greet kag Tilipon sang Kabataan' : 'December Citywide Meet & Greet & Youth Fellowships'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {isHlg
              ? 'Mag-rehistro para sa aton palaabuton nga December fellowship kag youth retreats. Ang fixed registration fee nagalakip sang panihapon, acoustic worship, kag welcoming pack.'
              : 'Register for upcoming citywide fellowships and campus retreats. Registration fees directly cover full dinner buffet, venue, materials, and delegate welcoming kits.'}
          </p>
        </div>

        {isAdmin && (
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>+ Launch New Event Registration</span>
            </button>
          </div>
        )}
      </div>

      {/* Metric Counters (Clean 3-Column Grid Showing Attendance, Capacity & Campuses - NO ACCUMULATED MONEY) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
            <Users className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {totalRegistrations}
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Mga Rehistrado' : 'Registered Attendees'}
            </div>
          </div>
        </div>

        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 shrink-0">
            <Ticket className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {campaigns.length}
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Aktibo nga mga Event' : 'Open Gatherings'}
            </div>
          </div>
        </div>

        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 shrink-0">
            <Calendar className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Dec 18
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Meet & Greet' : 'Citywide Meet & Greet'}
            </div>
          </div>
        </div>
      </div>

      {/* Events Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className={`text-lg font-extrabold flex items-center gap-2 font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span>{isHlg ? 'Bukas nga mga Rehistrasyon' : 'Open Event Registrations'}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                isDark ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-800'
              }`}>
                {filteredCampaigns.length} {isHlg ? 'ka Event' : 'Events'}
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Pilia ang event agud mag-rehistro sang imo slot.' : 'Select an event to reserve your delegate slot and receive your official pass.'}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            {['All', 'Youth Fellowship', 'Youth Camp', 'Leadership Retreat'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-indigo-600 text-white shadow-md font-black'
                    : isDark
                    ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {cat === 'All' ? (isHlg ? 'Tanan' : 'All') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campus Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pb-1">
          {CAMPUSES.slice(0, 6).map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCampus(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCampus === c.id
                  ? 'bg-indigo-600 text-white shadow-md font-black'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                onDonate={(c) => setActiveCampaignForRegister(c)}
                onEdit={isAdmin ? (c) => setEditingCampaign(c) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className={`p-12 text-center rounded-3xl border border-dashed ${
            isDark ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <Tent className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h4 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHlg ? 'Wala sang Event nga Nakita' : 'No Events Found for this Filter'}
            </h4>
            <p className="text-xs mt-1">{isHlg ? 'Pilia ang iban nga campus filter sa ibabaw.' : 'Try selecting a different campus or category filter above.'}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <RegisterEventModal
        isOpen={!!activeCampaignForRegister}
        onClose={() => setActiveCampaignForRegister(null)}
        campaign={activeCampaignForRegister}
      />

      <EditCampaignModal
        isOpen={!!editingCampaign}
        onClose={() => setEditingCampaign(null)}
        campaign={editingCampaign}
      />

      <AddCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
