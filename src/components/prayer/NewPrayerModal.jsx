import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PRAYER_CATEGORIES } from '../../data/prayers';
import { Heart, Sparkles, Lock, Globe } from 'lucide-react';

export const NewPrayerModal = ({ isOpen, onClose }) => {
  const { addPrayerRequest, currentUser } = useApp();

  const [type, setType] = useState('prayer'); // 'prayer' | 'praise'
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(PRAYER_CATEGORIES[1]);
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addPrayerRequest({
      type,
      content,
      category: type === 'praise' ? 'Praise & Answered Prayers' : category,
      campusId,
      campusName: campusObj?.name || 'Western Visayas Campus',
      isAnonymous
    });

    onClose();
    setContent('');
    setIsAnonymous(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === 'praise' ? '🙌 Share an Answered Prayer / Praise' : '🙏 Post a Prayer Request'}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Type Toggle: Prayer vs Praise */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setType('prayer')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              type === 'prayer' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            🙏 Prayer Request
          </button>
          <button
            type="button"
            onClick={() => setType('praise')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all cursor-pointer ${
              type === 'praise' ? 'bg-white text-amber-600 shadow-xs' : 'text-slate-600'
            }`}
          >
            🙌 Praise & Answered Prayer
          </button>
        </div>

        {/* Category (if prayer) */}
        {type === 'prayer' && (
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
            >
              {PRAYER_CATEGORIES.filter((c) => c !== 'All Requests' && c !== 'Praise & Answered Prayers').map(
                (cat, idx) => (
                  <option key={idx} value={cat}>
                    {cat}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        {/* University */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            Campus
          </label>
          <select
            value={campusId}
            onChange={(e) => setCampusId(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
          >
            {CAMPUSES.filter((c) => c.id !== 'all').map((camp) => (
              <option key={camp.id} value={camp.id}>
                {camp.name}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
            {type === 'praise'
              ? 'What great thing did God do in your college life / exams?'
              : 'What would you like the campus community to pray for?'} *
          </label>
          <textarea
            rows={3}
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={
              type === 'praise'
                ? 'e.g. Passed my board exam prelims! Thank you for the prayers...'
                : 'e.g. Please pray for peace of mind during our thesis defense this Friday...'
            }
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
          />
        </div>

        {/* Anonymous Option */}
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2">
            {isAnonymous ? <Lock className="w-4 h-4 text-slate-600" /> : <Globe className="w-4 h-4 text-slate-600" />}
            <div>
              <div className="text-xs font-bold text-slate-800">
                {isAnonymous ? 'Post Anonymously' : `Post as ${currentUser.name}`}
              </div>
              <div className="text-[11px] text-slate-500">
                {isAnonymous ? 'Your name will not be shown.' : 'Your name will be visible to encourage others.'}
              </div>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer ${
            type === 'praise'
              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-200'
              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
          }`}
        >
          {type === 'praise' ? 'Share Praise Report' : 'Post Prayer Request'}
        </button>
      </form>
    </Modal>
  );
};
