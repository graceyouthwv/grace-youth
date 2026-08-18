import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GroupCard } from './GroupCard';
import { MentorshipModal } from './MentorshipModal';
import { GrowthRoadmap } from './GrowthRoadmap';
import { RequestLifeGroupModal } from './RequestLifeGroupModal';
import { CreateLifeGroupModal } from './CreateLifeGroupModal';
import {
  Users,
  UserCheck,
  Sparkles,
  Search,
  School,
  PlusCircle,
  ShieldCheck,
  Globe,
  Laptop
} from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { getTranslation } from '../../data/translations';

export const BibleStudyHub = () => {
  const {
    bibleStudies,
    selectedRegion,
    selectedCampus,
    setSelectedCampus,
    deliveryModeFilter,
    setDeliveryModeFilter,
    currentUser,
    language,
    theme
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';
  const isAdminOrWorker = currentUser.role === 'leader' || currentUser.role === 'worker';

  const currentRegionObj = getRegionById(selectedRegion);

  const filteredGroups = bibleStudies.filter((g) => {
    // 1. Modality Filter
    const isOnline = g.meetingType === 'Online' || g.isOpenNationwide;
    const isF2F = g.meetingType === 'In-Person' || g.meetingType === 'Hybrid';

    if (deliveryModeFilter === 'online' && !isOnline) return false;
    if (deliveryModeFilter === 'f2f' && !isF2F) return false;

    // 2. Region / Campus Locality Filter:
    // If Online Nationwide is true, it is accessible to all regions!
    if (deliveryModeFilter === 'online' && g.isOpenNationwide) {
      // Allow nationwide online
    } else if (selectedRegion !== 'all' && g.regionId !== selectedRegion && !g.isOpenNationwide) {
      return false;
    }

    if (selectedCampus !== 'all' && g.campusId !== selectedCampus && g.campusId !== 'all') {
      if (!g.isOpenNationwide || deliveryModeFilter === 'f2f') {
        return false;
      }
    }

    // 3. Search query filter
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.facilitator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.topicCategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.location?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Priority sorting: Rank by Place (Campus -> Region -> Online Nationwide -> Others)
  const prioritizedGroups = [...filteredGroups].sort((a, b) => {
    const aCampusMatch = (selectedCampus !== 'all' && a.campusId === selectedCampus) || (currentUser?.campusId && currentUser.campusId !== 'all' && a.campusId === currentUser.campusId);
    const bCampusMatch = (selectedCampus !== 'all' && b.campusId === selectedCampus) || (currentUser?.campusId && currentUser.campusId !== 'all' && b.campusId === currentUser.campusId);

    const aRegionMatch = selectedRegion !== 'all' && a.regionId === selectedRegion;
    const bRegionMatch = selectedRegion !== 'all' && b.regionId === selectedRegion;

    const aScore = (aCampusMatch ? 100 : 0) + (aRegionMatch ? 50 : 0) + (a.isOpenNationwide ? 25 : 0);
    const bScore = (bCampusMatch ? 100 : 0) + (bRegionMatch ? 50 : 0) + (b.isOpenNationwide ? 25 : 0);

    return bScore - aScore;
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
              ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{isHlg ? 'Tilipon sang Pagtuo & Gagmay nga Grupo' : 'Campus Discipleship & Life Groups'}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHlg ? 'Pangitaa ang imo Grupo sa Pagtuo sa Campus' : 'Find Your Faith Community'}
          </h2>
          <p className={`text-xs sm:text-sm mt-2 leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {isHlg
              ? 'Mag-intra sa semana-semana nga campus life group ukon mag-pangabay nga magbukas sang bag-o nga grupo para sa imo dorm, kurso, ukon mga klasmeyt.'
              : 'Join weekly campus and online life group circles across the Philippines. Connect with caring peers, share in heartfelt prayer, and grow deeper in Christ throughout the semester.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full md:w-auto">
          {/* 1. Request to Open a Group (Available to All Students) */}
          <button
            onClick={() => setShowRequestModal(true)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-sm hover:scale-105 transition-all cursor-pointer border ${
              isDark
                ? 'bg-slate-800 text-emerald-400 border-slate-700 hover:bg-slate-700'
                : 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isHlg ? 'Mag-pangabay sang Grupo' : 'Request to Open a Group'}</span>
          </button>

          {/* 2. Create Official Group (Visible ONLY to Admin & Youth Workers) */}
          {isAdminOrWorker && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isHlg ? 'Admin: Mag-himo sang Grupo' : 'Admin: Create Life Group'}</span>
            </button>
          )}

          {/* 3. Request 1-on-1 Mentor */}
          <button
            onClick={() => setShowMentorModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>{isHlg ? '1-on-1 nga Mentor' : '1-on-1 Mentor'}</span>
          </button>
        </div>
      </div>

      {/* Life Groups Directory */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div>
            <h3 className={`text-lg font-extrabold flex items-center gap-2 font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              <span>{selectedRegion === 'all' ? 'All Philippine Life Groups & Circles' : `${currentRegionObj.shortName} Life Groups`}</span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-black ${
                isDark ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {filteredGroups.length} {isHlg ? 'ka Aktibo' : 'Active Circles'}
              </span>
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {selectedRegion === 'all'
                ? 'Join on-campus and online weekly circles open to college students anywhere in the Philippines.'
                : `Showing local campus circles in ${currentRegionObj.name} plus nationwide online circles.`}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isHlg ? 'Pangitaa sa topiko, campus, lider...' : 'Search by topic, campus, facilitator...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Modality Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Mode:</span>
          <button
            onClick={() => setDeliveryModeFilter('all')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              deliveryModeFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDark ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            All Life Groups
          </button>
          <button
            onClick={() => setDeliveryModeFilter('online')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              deliveryModeFilter === 'online'
                ? 'bg-emerald-600 text-white shadow-xs'
                : isDark ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <Laptop className="w-3 h-3" />
            <span>💻 Online Circles (Nationwide)</span>
          </button>
          <button
            onClick={() => setDeliveryModeFilter('f2f')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
              deliveryModeFilter === 'f2f'
                ? 'bg-violet-600 text-white shadow-xs'
                : isDark ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            <School className="w-3 h-3" />
            <span>📍 On-Campus Circles</span>
          </button>
        </div>

        {/* Grid of Life Groups (Prioritized by Student's Place & Campus) */}
        {prioritizedGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prioritizedGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 rounded-3xl border border-dashed p-8 space-y-3 ${
            isDark ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
          }`}>
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <h4 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {isHlg ? 'Wala sang Life Group sa Sini nga Filter' : 'No Life Groups Found for this Filter'}
            </h4>
            <p className="text-xs max-w-md mx-auto">
              {isHlg
                ? 'Gusto mo bala magsugod sang bag-o nga grupo upod sa imo mga klasmeyt? Mag-submit sang pangabay kag buligan ka sang ministry team!'
                : 'Want to start a new campus or online small group with your classmates? Submit a request and our ministry team will help launch it!'}
            </p>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setShowRequestModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black cursor-pointer"
              >
                {isHlg ? 'Mag-pangabay sang Grupo' : 'Request to Open a Group'}
              </button>
              <button
                onClick={() => {
                  setSelectedCampus('all');
                  setDeliveryModeFilter('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                  isDark ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                {isHlg ? 'Tan-awa ang Tanan' : 'View All Philippine Groups'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Discipleship Roadmap */}
      <GrowthRoadmap />

      {/* Modals */}
      <RequestLifeGroupModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
      />

      <CreateLifeGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <MentorshipModal
        isOpen={showMentorModal}
        onClose={() => setShowMentorModal(false)}
      />
    </div>
  );
};
