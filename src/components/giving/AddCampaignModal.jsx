import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Target, Heart, Calendar, Users, CheckCircle2, Sparkles } from 'lucide-react';

export const AddCampaignModal = ({ isOpen, onClose }) => {
  const { addCampaign, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Youth Camp');
  const [targetAmount, setTargetAmount] = useState('15000');
  const [campusId, setCampusId] = useState('all');
  const [endDate, setEndDate] = useState('November 30, 2026');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetNum = parseFloat(targetAmount);

    if (!title.trim()) {
      showToast('Please enter a campaign title.', 'error');
      return;
    }

    if (isNaN(targetNum) || targetNum <= 0) {
      showToast('Please enter a valid target goal amount.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addCampaign({
      title: title.trim(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Western Visayas Campuses',
      targetAmount: targetNum,
      raisedAmount: 0,
      donorsCount: 0,
      endDate: endDate.trim() || 'December 31, 2026',
      description: description.trim() || 'Faith seed fund to empower youth conferences, reviewer distributions, and discipleship missions.',
      image: image.trim() || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      recentDonors: []
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setImage('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🌱 Launch New Seed Fund Campaign"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-pink-950/40 border-pink-500/30 text-pink-200' : 'bg-pink-50 border-pink-200 text-pink-900'
        }`}>
          ✨ <strong>Ministry Giving & Seed Support:</strong> Create faith campaigns for regional youth camps, scholarship seed funds, peer tutoring kits, and campus mission support.
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Campaign Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. CPU & UPV Freshman Welcome Camp Seed Fund"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="Youth Camp">🏕️ Youth Camp & Retreat</option>
              <option value="Scholarship">🎓 Student Scholarship Aid</option>
              <option value="Mission Outreach">🌍 Campus Mission Outreach</option>
              <option value="Reviewer Printing">📚 Reviewer Printing Fund</option>
              <option value="Music & Worship">🎸 Worship & Sound Gear</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Target Seed Goal (₱) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">₱</span>
              <input
                type="number"
                required
                min="500"
                step="100"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-black font-heading ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Campus Target
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="all">📍 All Iloilo Campuses</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Target Deadline
            </label>
            <input
              type="text"
              placeholder="e.g. December 15, 2026"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Campaign Purpose & Impact Details
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Sponsoring 50 underprivileged students with camp fees, transportation, and Bible study manuals..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Cover Photo URL (Optional)
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full px-3.5 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          />
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:from-pink-500 hover:to-amber-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Publish Seed Fund Campaign</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
