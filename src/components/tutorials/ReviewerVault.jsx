import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Sparkles, Search, FileUp, Plus, Edit3, Eye } from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../../data/campuses';
import { UploadReviewerModal } from './UploadReviewerModal';
import { EditReviewerModal } from './EditReviewerModal';
import { ViewReviewerModal } from './ViewReviewerModal';

export const ReviewerVault = () => {
  const { reviewers, incrementReviewerDownload, selectedRegion, selectedCampus, currentUser, theme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingReviewer, setEditingReviewer] = useState(null);
  const [selectedReviewerForView, setSelectedReviewerForView] = useState(null);
  const isDark = theme === 'dark';

  const filteredReviewers = reviewers.filter((rev) => {
    const matchesCampus = selectedCampus === 'all' || rev.campusId === selectedCampus || rev.campusId === 'all';
    const matchesCategory = selectedCategory === 'All Subjects' || rev.category === selectedCategory;
    const matchesSearch =
      rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCampus && matchesCategory && matchesSearch;
  });

  const prioritizedReviewers = [...filteredReviewers].sort((a, b) => {
    const aCampusMatch = (selectedCampus !== 'all' && a.campusId === selectedCampus) || (currentUser?.campusId && currentUser.campusId !== 'all' && a.campusId === currentUser.campusId);
    const bCampusMatch = (selectedCampus !== 'all' && b.campusId === selectedCampus) || (currentUser?.campusId && currentUser.campusId !== 'all' && b.campusId === currentUser.campusId);

    const aRegionMatch = selectedRegion !== 'all' && a.regionId === selectedRegion;
    const bRegionMatch = selectedRegion !== 'all' && b.regionId === selectedRegion;

    const aScore = (aCampusMatch ? 100 : 0) + (aRegionMatch ? 50 : 0);
    const bScore = (bCampusMatch ? 100 : 0) + (bRegionMatch ? 50 : 0);

    if (bScore !== aScore) return bScore - aScore;
    return (b.downloads || 0) - (a.downloads || 0);
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2 border ${
            isDark ? 'bg-sky-500/10 text-sky-300 border-sky-500/20' : 'bg-sky-50 text-sky-800 border-sky-200'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Open-Source Peer Academic Aid</span>
          </div>
          <h2 className={`text-xl sm:text-2xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Free Reviewer & Cheatsheet Vault
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            High-yield formula sheets, mock exam drills, and summary notes curated by student mentors across Iloilo universities.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-sky-500/20 hover:scale-105 transition-all cursor-pointer"
          >
            <FileUp className="w-4 h-4" />
            <span>Upload Reviewer</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviewers, courses, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 custom-scrollbar">
          {SUBJECT_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reviewer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {prioritizedReviewers.length > 0 ? (
          prioritizedReviewers.map((rev) => (
            <div
              key={rev.id}
              className={`p-5 sm:p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${
                isDark
                  ? 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-sky-500/10 text-sky-400 border border-sky-500/20">
                      {rev.course}
                    </span>
                    <span className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {rev.campusName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-lg ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                      {rev.fileSize}
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingReviewer(rev)}
                      className="p-1.5 rounded-lg border border-slate-700 hover:bg-white hover:text-slate-900 text-slate-400 transition-all cursor-pointer"
                      title="Edit / Delete Reviewer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className={`font-extrabold text-base mb-2 leading-snug font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {rev.title}
                </h3>

                <p className={`text-xs mb-3 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {rev.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {rev.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-lg border ${
                        isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className={`pt-3 border-t flex items-center justify-between gap-2 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                <span className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Shared by <strong className={isDark ? 'text-white' : 'text-slate-900'}>{rev.contributor}</strong>
                </span>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedReviewerForView(rev)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-950" />
                    <span className="text-slate-950 font-black">View Reviewer</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`col-span-2 p-10 text-center rounded-3xl border border-dashed text-xs ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
          }`}>
            <FileText className="w-8 h-8 text-sky-400 mx-auto mb-2 opacity-50" />
            <p className="font-bold">No reviewers uploaded yet in this category.</p>
            <p className="mt-1">Be the first to share an exam reviewer or formula cheat sheet!</p>
            <button
              onClick={() => setShowUploadModal(true)}
              className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 font-black text-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload First Reviewer</span>
            </button>
          </div>
        )}
      </div>

      <UploadReviewerModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
      />

      <EditReviewerModal
        isOpen={!!editingReviewer}
        onClose={() => setEditingReviewer(null)}
        reviewer={editingReviewer}
      />

      <ViewReviewerModal
        isOpen={!!selectedReviewerForView}
        onClose={() => setSelectedReviewerForView(null)}
        reviewer={selectedReviewerForView}
      />
    </div>
  );
};
