import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Target, Heart, Calendar, Users, CheckCircle2, DollarSign } from 'lucide-react';

export const EditCampaignModal = ({ isOpen, onClose, campaign }) => {
  const { updateCampaign, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [raisedAmount, setRaisedAmount] = useState('');
  const [donorsCount, setDonorsCount] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (campaign) {
      setTitle(campaign.title || '');
      setCategory(campaign.category || 'Youth Camp');
      setTargetAmount(campaign.targetAmount || 0);
      setRaisedAmount(campaign.raisedAmount || 0);
      setDonorsCount(campaign.donorsCount || 0);
      setEndDate(campaign.endDate || 'August 30, 2026');
    }
  }, [campaign]);

  if (!campaign) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetNum = parseFloat(targetAmount);
    const raisedNum = parseFloat(raisedAmount);
    const donorsNum = parseInt(donorsCount, 10);

    if (isNaN(targetNum) || targetNum <= 0) {
      showToast('Please enter a valid target goal amount.', 'error');
      return;
    }

    updateCampaign(campaign.id, {
      title: title.trim() || campaign.title,
      category,
      targetAmount: targetNum,
      raisedAmount: isNaN(raisedNum) ? 0 : raisedNum,
      donorsCount: isNaN(donorsNum) ? 0 : donorsNum,
      endDate: endDate.trim() || campaign.endDate
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✏️ Update Seed Fund: ${campaign.title}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campaign Title */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Campaign Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        {/* Amounts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Target Seed Goal (₱) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">₱</span>
              <input
                type="number"
                required
                min="100"
                step="50"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-black font-heading ${
                  isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Current Raised Amount (₱) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-400">₱</span>
              <input
                type="number"
                required
                min="0"
                step="50"
                value={raisedAmount}
                onChange={(e) => setRaisedAmount(e.target.value)}
                className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-black font-heading ${
                  isDark ? 'bg-slate-900 border-slate-700 text-emerald-400' : 'bg-white border-slate-300 text-emerald-700 shadow-xs'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Donors & Deadline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Total Donors / Sponsors
            </label>
            <input
              type="number"
              min="0"
              value={donorsCount}
              onChange={(e) => setDonorsCount(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Target Deadline Date
            </label>
            <input
              type="text"
              placeholder="e.g. October 15, 2026"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        {/* Sticky Action Footer */}
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save & Update Seed Fund</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
