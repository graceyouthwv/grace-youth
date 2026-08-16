import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Download, Sparkles, Search } from 'lucide-react';
import { SUBJECT_CATEGORIES } from '../../data/campuses';

export const ReviewerVault = () => {
  const { reviewers, incrementReviewerDownload, selectedCampus } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Subjects');

  const filteredReviewers = reviewers.filter((rev) => {
    const matchesCampus = selectedCampus === 'all' || rev.campusId === selectedCampus;
    const matchesCategory = selectedCategory === 'All Subjects' || rev.category === selectedCategory;
    const matchesSearch =
      rev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCampus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 genz-card border border-sky-500/20 bg-gradient-to-r from-sky-950/40 via-slate-900 to-[#111625] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-xs font-black text-sky-300 mb-2 border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Open-Source Peer Academic Aid</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
            Free Reviewer & Cheatsheet Vault
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
            High-yield formula sheets, mock exam drills, and summary notes curated by top upperclassmen across Western Visayas.
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-2xl sm:text-3xl font-black text-amber-400 font-heading">
            {reviewers.reduce((acc, r) => acc + r.downloads, 0)}
          </div>
          <div className="text-xs text-slate-400 font-medium">Total Student Downloads</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reviewers, courses, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-800 bg-slate-900 text-white text-xs sm:text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {SUBJECT_CATEGORIES.slice(0, 4).map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-500 text-slate-950 shadow-md font-black'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reviewer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReviewers.map((rev) => (
          <div
            key={rev.id}
            className="genz-card p-5 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {rev.fileSize}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1 font-medium">
                    {rev.downloads} downloads
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 block mb-1">
                {rev.course} • {rev.campusName}
              </span>

              <h3 className="font-extrabold text-base text-white mb-2 leading-snug font-heading">
                {rev.title}
              </h3>

              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                {rev.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {rev.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-bold bg-slate-900 border border-slate-800 text-slate-300 px-2 py-0.5 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Shared by <strong className="text-white">{rev.contributor}</strong>
              </span>

              <button
                onClick={() => incrementReviewerDownload(rev.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs shadow-lg shadow-sky-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
