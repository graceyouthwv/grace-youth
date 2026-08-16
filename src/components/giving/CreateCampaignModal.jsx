import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { Plus, Sparkles, Target, Calendar } from 'lucide-react';

export const CreateCampaignModal = ({ isOpen, onClose }) => {
  const { createCampaign, showToast, theme } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Youth Camp');
  const [campusId, setCampusId] = useState('all');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('Oct 31, 2026');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=600&auto=format&fit=crop&q=80');

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !targetAmount) {
      showToast('Please provide a campaign title and target amount.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    createCampaign({
      title: title.trim(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Iloilo Campuses',
      targetAmount: parseFloat(targetAmount),
      raisedAmount: 0,
      donorsCount: 0,
      deadline,
      description: description.trim() || 'Join us in funding life-changing student events and discipleship retreats.',
      image,
      tiers: [
        { amount: 350, label: 'Student Event Sponsorship' },
        { amount: 1000, label: 'Full Camp & Materials Kit' },
        { amount: 2500, label: 'Dorm Life Group Package' }
      ],
      recentDonors: []
    });

    showToast('🎉 New Fundraising Campaign Launched Successfully!', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎪 Launch Event / Youth Camp Fundraiser"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Create a transparent, verified fundraising campaign for youth camps, exam survival outreach, or campus worship nights.
        </p>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Event / Campaign Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Grace Youth Camp 2026 Sponsorship Fund"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="Youth Camp">Youth Camp & Retreat</option>
              <option value="Youth Fellowship">Campus Youth Fellowship</option>
              <option value="Campus Outreach">Exam Survival / Outreach</option>
              <option value="Bibles & Materials">Bibles & Life Group Guides</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Target Campus
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {CAMPUSES.map((camp) => (
                <option key={camp.id} value={camp.id}>{camp.shortName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Target Goal Amount (₱) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 50000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Campaign Deadline
            </label>
            <input
              type="text"
              placeholder="e.g. Oct 31, 2026"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Campaign Purpose & Impact Story
          </label>
          <textarea
            rows={3}
            placeholder="Explain how the funds will directly bless college students and spread the Gospel..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Publish Ministry Campaign</span>
        </button>
      </form>
    </Modal>
  );
};
