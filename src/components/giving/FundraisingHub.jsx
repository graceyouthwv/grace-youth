import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampaignCard } from './CampaignCard';
import { DonateModal } from './DonateModal';
import { CreateCampaignModal } from './CreateCampaignModal';
import { Heart, PlusCircle, Sparkles, Target, Users, ShieldCheck, HelpCircle, Tent } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';
import { getTranslation } from '../../data/translations';

export const FundraisingHub = () => {
  const { campaigns, selectedCampus, setSelectedCampus, currentUser, language, theme } = useApp();
  const [selectedCategory] = useState('All');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeCampaignForDonate, setActiveCampaignForDonate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';
  const canCreate = currentUser.role === 'leader' || currentUser.role === 'worker';

  const totalRaised = campaigns.reduce((acc, c) => acc + c.raisedAmount, 0);
  const totalGoal = campaigns.reduce((acc, c) => acc + c.targetAmount, 0);
  const totalDonors = campaigns.reduce((acc, c) => acc + c.donorsCount, 0);

  const filteredCampaigns = campaigns.filter((camp) => {
    const matchesCampus = selectedCampus === 'all' || camp.campusId === selectedCampus || camp.campusId === 'all';
    const matchesCategory = activeCategoryFilter === 'All' || camp.category === activeCategoryFilter;
    return matchesCampus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Clean, Non-Muddy Header Banner */}
      <div className={`p-5 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-xl space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black border ${
              isDark
                ? 'bg-pink-950/60 text-pink-300 border-pink-500/30'
                : 'bg-pink-50 text-pink-700 border-pink-200'
            }`}>
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              <span>{isHlg ? 'Bulig sa Pagpauswag sang Ministry' : 'Kingdom Impact & Sponsorship'}</span>
            </div>

            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              100% Ministry Directed
            </span>
          </div>

          <h2 className={`text-xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHlg ? 'Suporta para sa Outreach, Camps & Tilipon sang Kabataan' : 'Fuel Campus Outreach, Camps & Youth Fellowships'}
          </h2>
          <p className={`text-xs sm:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {isHlg
              ? 'Ang tagsa ka piso naga-sponsor sa mga estudyante gikan sa ISUFST, UPV, CPU, kag WVSU para sa life-changing youth camps kag worship nights.'
              : 'Every peso directly sponsors college students from ISUFST, UPV, CPU, and WVSU for life-changing youth camps, free midterm coffee outreach, and campus worship nights.'}
          </p>
        </div>

        {canCreate && (
          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{isHlg ? 'Mag-umpisa sang Bag-ong Fundraiser' : 'Launch New Fundraiser'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Metric Counters (Clean 3-Column Grid on Mobile & Desktop) */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 shrink-0">
            <Heart className="w-4 h-4 sm:w-6 sm:h-6 fill-rose-500/30" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ₱{totalRaised.toLocaleString()}
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Naipon' : 'Total Raised'}
            </div>
          </div>
        </div>

        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 shrink-0">
            <Users className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {totalDonors}
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Sponsors' : 'Sponsors'}
            </div>
          </div>
        </div>

        <div className={`p-3 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-2 sm:p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
            <Target className="w-4 h-4 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className={`text-sm sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {campaigns.length}
            </div>
            <div className={`text-[10px] sm:text-xs font-bold leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Proyekto' : 'Active Projects'}
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Header & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 className={`text-lg font-extrabold flex items-center gap-2 font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span>{isHlg ? 'Aktibo nga mga Kampanya' : 'Active Campus Campaigns'}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                isDark ? 'bg-pink-950 text-pink-300 border border-pink-500/30' : 'bg-pink-100 text-pink-800'
              }`}>
                {filteredCampaigns.length} {isHlg ? 'ka Proyekto' : 'Projects'}
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {isHlg ? 'Pilia ang kampanya agud mag-sponsor sang estudyante ukon mag-donar.' : 'Select a campaign to sponsor students or donate supplies.'}
            </p>
          </div>

          {/* Category Tabs (Flex-wrap for instant desktop clickability) */}
          <div className="flex flex-wrap items-center gap-1.5 pb-1">
            {['All', 'Youth Camp', 'Youth Fellowship', 'Campus Outreach'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-pink-600 text-white shadow-md font-black'
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

        {/* Campus Filter Pills (Flex-wrap for instant desktop clickability) */}
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

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => (
              <CampaignCard
                key={camp.id}
                campaign={camp}
                onDonate={(c) => setActiveCampaignForDonate(c)}
              />
            ))}
          </div>
        ) : (
          <div className={`p-12 text-center rounded-3xl border border-dashed ${
            isDark ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <Tent className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <h4 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHlg ? 'Wala sang Kampanya nga Nakita' : 'No Campaigns Found'}
            </h4>
            <p className="text-xs mt-1">{isHlg ? 'Pilia ang iban nga campus filter sa ibabaw.' : 'Try selecting a different campus or category filter above.'}</p>
          </div>
        )}
      </div>

      {/* Modals */}
      <DonateModal
        isOpen={!!activeCampaignForDonate}
        onClose={() => setActiveCampaignForDonate(null)}
        campaign={activeCampaignForDonate}
      />

      <CreateCampaignModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
