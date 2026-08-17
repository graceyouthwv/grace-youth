import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { TutorCard } from './TutorCard';
import { RequestBoard } from './RequestBoard';
import { TutorVolunteerModal } from './TutorVolunteerModal';
import { ReviewerVault } from './ReviewerVault';
import { SmartMatchHub } from '../matching/SmartMatchHub';
import { Search, PlusCircle, BookOpen, MessageSquarePlus, FileText, Sparkles, Zap } from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../../data/campuses';
import { getTranslation } from '../../data/translations';

export const TutorialHub = () => {
  const { tutors, selectedCampus, language, theme } = useApp();
  const [subTab, setSubTab] = useState('tutors'); // 'tutors' | 'matching' | 'requests' | 'reviewers'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';
  const t = (key) => getTranslation(key, language);

  const filteredTutors = tutors.filter((t) => {
    const matchesCampus = selectedCampus === 'all' || t.campusId === selectedCampus;
    const matchesCategory = selectedCategory === 'All Subjects' || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subjects.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      t.bio.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCampus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
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
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isHlg ? `Tutors (${tutors.length})` : `Tutors (${tutors.length})`}</span>
          </button>

          <button
            onClick={() => setSubTab('matching')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'matching'
                ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>{isHlg ? 'P2P Smart Match & Maayong Balita' : 'P2P Smart Match & Gospel'}</span>
          </button>

          <button
            onClick={() => setSubTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'requests'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
            }`}
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>{isHlg ? 'Board sang mga Pangabay' : 'Request Matching Board'}</span>
          </button>

          <button
            onClick={() => setSubTab('reviewers')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              subTab === 'reviewers'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{isHlg ? 'Vault sang Reviewers' : 'Reviewer Vault'}</span>
          </button>
        </div>

        {/* Volunteer Tutor CTA */}
        <button
          onClick={() => setShowVolunteerModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all w-full sm:w-auto cursor-pointer"
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

            {/* Category Chips Horizontal Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {SUBJECT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-md'
                      : isDark ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
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
                  : 'Try adjusting your search keywords or university filter, or post a request on our Request Matching Board!'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Subjects');
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
