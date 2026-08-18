import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PrayerCard } from './PrayerCard';
import { NewPrayerModal } from './NewPrayerModal';
import { Heart, PlusCircle, Search } from 'lucide-react';
import { PRAYER_CATEGORIES } from '../../data/prayers';
import { getTranslation } from '../../data/translations';

export const PrayerWall = () => {
  const { prayers, selectedCampus, language, theme } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All Requests');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const isDark = theme === 'dark';
  const isHlg = language === 'hlg' || language === 'hil';

  const filteredPrayers = prayers.filter((p) => {
    const matchesCampus = selectedCampus === 'all' || p.campusId === selectedCampus;
    const matchesCategory =
      selectedCategory === 'All Requests' ||
      (selectedCategory === 'Praise & Answered Prayers' ? p.type === 'praise' : p.category === selectedCategory);
    const matchesSearch =
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCampus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Clean, Non-Muddy Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div>
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black mb-2 border ${
            isDark
              ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
              : 'bg-rose-50 text-rose-700 border-rose-200'
          }`}>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{isHlg ? 'Pangamuyo sang mga Estudyante' : 'Student Prayer Movement'}</span>
          </div>
          <h2 className={`text-2xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHlg ? 'Wall sang Pangamuyo kag Pagdayaw' : 'Campus Prayer & Praise Wall'}
          </h2>
          <p className={`text-xs sm:text-sm mt-1 max-w-xl font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {isHlg
              ? 'Magtindog sa pagpangamuyo para sa aton mga estudyante sa ISUFST, UPV, CPU, WVSU, ISAT-U, kag USA. I-post ang imo ginabatyag ukon pasalamat.'
              : 'Stand in the gap for fellow students across ISUFST, UPV, CPU, WVSU, ISAT-U, and USA. Post your burdens or celebrate answered prayers.'}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:scale-105 transition-all shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isHlg ? 'Mag-post sang Pangamuyo / Pagdayaw' : 'Post Prayer / Praise'}</span>
        </button>
      </div>

      {/* Categories & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={isHlg ? 'Pangitaa ang mga pangamuyo...' : 'Search prayer requests & praise...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden ${
              isDark ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>

        {/* Category Pills (Flex-wrap for instant desktop clickability) */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto pb-1">
          {['All Requests', 'Praise & Answered Prayers', ...PRAYER_CATEGORIES.slice(0, 3)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-rose-600 text-white shadow-md font-black'
                  : isDark
                  ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                  : 'bg-slate-100 text-slate-700 border border-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'All Requests'
                ? (isHlg ? 'Tanan' : 'All Requests')
                : cat === 'Praise & Answered Prayers'
                ? (isHlg ? 'Pasalamat & Sabat sa Pangamuyo' : 'Praise & Answered Prayers')
                : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredPrayers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrayers.map((prayer) => (
            <PrayerCard key={prayer.id} prayer={prayer} />
          ))}
        </div>
      ) : (
        <div className={`p-12 text-center rounded-3xl border border-dashed ${
          isDark ? 'border-slate-800 bg-slate-900/30 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
        }`}>
          <Heart className="w-12 h-12 mx-auto text-slate-400 mb-3" />
          <h4 className={`font-black text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isHlg ? 'Wala sang Pangabay nga Nakita' : 'No Prayer Requests Found'}
          </h4>
          <p className="text-xs mt-1">{isHlg ? 'Ikaw ang una nga mag-post sang pangamuyo ukon pasalamat!' : 'Be the first to post a prayer request or praise report!'}</p>
        </div>
      )}

      {/* Post Modal */}
      <NewPrayerModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};
