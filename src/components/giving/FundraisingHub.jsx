import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampaignCard } from './CampaignCard';
import { DonateModal } from './DonateModal';
import { CreateCampaignModal } from './CreateCampaignModal';
import { Heart, PlusCircle, Sparkles, Target, Users, ShieldCheck, HelpCircle, Tent } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';

export const FundraisingHub = () => {
  const { campaigns, selectedCampus, setSelectedCampus, currentUser, theme } = useApp();
  const [selectedCategory] = useState('All');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [activeCampaignForDonate, setActiveCampaignForDonate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDark = theme === 'dark';
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
    <div className="space-y-8">
      {/* Clean, Non-Muddy Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-xl">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2.5 border ${
            isDark
              ? 'bg-pink-950/60 text-pink-300 border-pink-500/30'
              : 'bg-pink-50 text-pink-700 border-pink-200'
          }`}>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>Kingdom Impact & Event Sponsorship</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Fuel Campus Outreach, Camps & Youth Fellowships
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Every peso directly sponsors college students from ISUFST, UPV, CPU, and WVSU for life-changing youth camps, free midterm coffee outreach, and campus worship nights.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
          {canCreate ? (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Launch New Fundraiser</span>
            </button>
          ) : (
            <div className={`p-4 rounded-2xl border text-right ${
              isDark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}>
              <div className="font-extrabold text-sm text-pink-600 dark:text-pink-400">100% Ministry Directed</div>
              <div className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Verified by Grace Youth Council
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              ₱{totalRaised.toLocaleString()}
            </div>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Total Faith Seeds Raised
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {totalDonors}
            </div>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Student & Alumni Sponsors
            </div>
          </div>
        </div>

        <div className={`p-5 rounded-2xl border flex items-center gap-4 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {campaigns.length}
            </div>
            <div className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Active Campus Projects
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
              <span>Active Campus Campaigns</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                isDark ? 'bg-pink-950 text-pink-300 border border-pink-500/30' : 'bg-pink-100 text-pink-800'
              }`}>
                {filteredCampaigns.length} Projects
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select a campaign to sponsor students or donate supplies.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Campus Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
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
              No Campaigns Found
            </h4>
            <p className="text-xs mt-1">Try selecting a different campus or category filter above.</p>
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
