import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TutorCard } from './TutorCard';
import { RequestBoard } from './RequestBoard';
import { TutorVolunteerModal } from './TutorVolunteerModal';
import { ReviewerVault } from './ReviewerVault';
import { SmartMatchHub } from '../matching/SmartMatchHub';
import { CampusSelector } from '../common/CampusSelector';
import {
  Search,
  PlusCircle,
  BookOpen,
  MessageSquarePlus,
  FileText,
  Sparkles,
  Zap,
  Globe,
  Laptop,
  School,
  Filter
} from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { getTranslation } from '../../data/translations';

export const TutorialHub = () => {
  const {
    tutors,
    registeredUsers,
    selectedRegion,
    selectedCampus,
    deliveryModeFilter,
    setDeliveryModeFilter,
    language,
    theme
  } = useApp();

  const [subTab, setSubTab] = useState('tutors'); // 'tutors' | 'matching' | 'requests' | 'reviewers'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showDetailedRegionBar, setShowDetailedRegionBar] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';
  const t = (key) => getTranslation(key, language);

  const currentRegionObj = getRegionById(selectedRegion);

  const isTutorApproved = (t) => {
    if (t.isApproved === false || t.status === 'Pending Admin Review' || t.status === 'Pending Admin Approval') {
      return false;
    }
    const userMatch = registeredUsers?.find(
      (u) =>
        (u.email && t.email && u.email.toLowerCase() === t.email.toLowerCase()) ||
        (u.name && t.name && u.name.toLowerCase() === t.name.toLowerCase()) ||
        u.id === t.id
    );
    if (userMatch && userMatch.role === 'tutor' && (!userMatch.isApproved || userMatch.status === 'Pending Admin Approval')) {
      return false;
    }
    return t.isApproved === true || t.status === 'Active';
  };

  const approvedTutors = tutors.filter(isTutorApproved);
  const approvedTutorsCount = approvedTutors.length;

  const filteredTutors = approvedTutors.filter((t) => {
    // 1. Category filter
    const matchesCategory = selectedCategory === 'All Subjects' || t.category === selectedCategory;

    // 2. Search query filter
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjects?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.campusName?.toLowerCase().includes(searchQuery.toLowerCase());

    // 3. Modality filter
    const tutorOffersOnline = t.preferredMode === 'Online' || t.preferredMode === 'Hybrid' || t.isOnlineNationwide;
    const tutorOffersF2F = t.preferredMode === 'In-Person' || t.preferredMode === 'Hybrid';

    if (deliveryModeFilter === 'online' && !tutorOffersOnline) return false;
    if (deliveryModeFilter === 'f2f' && !tutorOffersF2F) return false;

    // 4. Region & Campus locality logic:
    // If student selected Online Only, and tutor offers online nationwide, they match regardless of region!
    if (deliveryModeFilter === 'online' && t.isOnlineNationwide) {
      return matchesCategory && matchesSearch;
    }

    const matchesRegion =
      selectedRegion === 'all' ||
      t.regionId === selectedRegion ||
      (t.isOnlineNationwide && deliveryModeFilter !== 'f2f');

    const matchesCampus =
      selectedCampus === 'all' ||
      t.campusId === selectedCampus ||
      (t.isOnlineNationwide && deliveryModeFilter === 'online');

    return matchesRegion && matchesCampus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* 1. REGIONAL & MODALITY BANNER BAR */}
      <div className={`p-3.5 sm:p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-2xl bg-indigo-600 text-white font-bold shrink-0 shadow-sm">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className={`text-xs sm:text-sm font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {selectedRegion === 'all' ? 'All Philippines (Nationwide Scope)' : currentRegionObj.name}
                </h4>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {deliveryModeFilter === 'online'
                    ? '💻 Online (Nationwide)'
                    : deliveryModeFilter === 'f2f'
                    ? '📍 Face-to-Face'
                    : '🌐 All Modes'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {selectedRegion === 'all'
                  ? 'Showing peer mentors available across all 17 regions + Online Nationwide.'
                  : `Showing local mentors in ${currentRegionObj.shortName} + mentors available Online nationwide.`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDetailedRegionBar(!showDetailedRegionBar)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto ${
              showDetailedRegionBar
                ? 'bg-indigo-600 text-white border-indigo-600'
                : isDark
                ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-950'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{showDetailedRegionBar ? 'Hide Region Filter' : 'Change Region / Modality'}</span>
          </button>
        </div>

        {/* Collapsible Detailed Region & Campus Bar */}
        {showDetailedRegionBar && (
          <div className={`mt-3.5 pt-3.5 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
            <CampusSelector />
          </div>
        )}
      </div>

      {/* Clean Sub Navigation Tabs */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4 ${
        isDark ? 'border-slate-800/80' : 'border-slate-200'
      }`}>
        <div className={`flex items-center gap-1.5 p-1 rounded-2xl border w-full sm:w-auto overflow-x-auto scrollbar-none ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setSubTab('tutors')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'tutors'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-bold'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{`Tutors (${approvedTutorsCount})`}</span>
          </button>

          <button
            onClick={() => setSubTab('matching')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'matching'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-bold'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${subTab === 'matching' ? (isDark ? 'text-amber-300' : 'text-amber-500') : 'text-amber-500'}`} />
            <span>{isHlg ? 'P2P Smart Match & Maayong Balita' : 'P2P Smart Match & Gospel'}</span>
          </button>

          <button
            onClick={() => setSubTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'requests'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-bold'
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{isHlg ? 'Board sang mga Pangabay' : 'Request Matching Board'}</span>
          </button>

          <button
            onClick={() => setSubTab('reviewers')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'reviewers'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950 font-bold'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isHlg ? 'Vault sang Reviewers' : 'Reviewer Vault'}</span>
          </button>
        </div>

        {/* Volunteer Tutor CTA */}
        <button
          onClick={() => setShowVolunteerModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-slate-950" />
          <span className="text-slate-950 font-black">{isHlg ? 'Mag-Volunteer bilang Tutor' : 'Volunteer as Peer Tutor'}</span>
        </button>
      </div>

      {/* Subtab 1: Tutor Directory */}
      {subTab === 'tutors' && (
        <div className="space-y-6">
          {/* Search & Subject Category Filter */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isHlg ? "Pangitaa ang ngalan sang tutor, subject (Calculus, Chemistry, Nursing)..." : "Search tutor name, subject (e.g. Calculus, Nursing, Organic Chem)..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            {/* Category Chips (Flex-Wrap for instant desktop clickability) */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              {SUBJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white font-extrabold shadow-md ring-2 ring-indigo-500/30'
                      : isDark
                      ? 'bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:text-white font-bold'
                      : 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200 hover:text-slate-950 font-bold'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Modality Quick Tabs */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">Modality:</span>
            <button
              onClick={() => setDeliveryModeFilter('all')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                deliveryModeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : isDark ? 'bg-slate-900 text-slate-400 border border-slate-800' : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              All Modes
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
              <span>💻 Online (Open to All Regions)</span>
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
              <span>📍 In-Person (Campus Specific)</span>
            </button>
          </div>

          {/* Tutor Cards Grid */}
          {filteredTutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.map((tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 genz-card border border-dashed p-8 space-y-3 ${
              isDark ? 'border-slate-800' : 'border-slate-200 bg-white'
            }`}>
              <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
              <h4 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {isHlg ? 'Wala sang Tutor nga Nakita' : 'No Tutors Found for this Filter'}
              </h4>
              <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {isHlg
                  ? 'Testingan liwat ang mga keywords ukon mag-post sang pangabay sa aton Request Matching Board!'
                  : 'Try switching to "Online (Nationwide)" or clearing your search filter to see more peer mentors!'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Subjects');
                  setDeliveryModeFilter('all');
                }}
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-black cursor-pointer"
              >
                {isHlg ? 'I-Clear ang Filters' : 'Clear Filters'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: P2P Smart Match */}
      {subTab === 'matching' && <SmartMatchHub />}

      {/* Subtab 3: Request Board */}
      {subTab === 'requests' && <RequestBoard />}

      {/* Subtab 4: Reviewers Vault */}
      {subTab === 'reviewers' && <ReviewerVault />}

      {/* Volunteer Modal */}
      <TutorVolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />
    </div>
  );
};
