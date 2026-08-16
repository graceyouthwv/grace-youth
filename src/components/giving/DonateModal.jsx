import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, QrCode, CreditCard, ShieldCheck, CheckCircle2, Copy, Tent } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose, campaign }) => {
  const { currentUser, donateToCampaign, showToast, theme } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash'); // 'gcash' | 'maya' | 'bdo' | 'cash'
  const [donorName, setDonorName] = useState(currentUser.name || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isDark = theme === 'dark';

  if (!campaign) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 ${label} copied to clipboard!`, 'info');
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      showToast('Please enter a valid sponsorship amount.', 'error');
      return;
    }

    donateToCampaign(campaign.id, {
      amount: finalAmount,
      name: isAnonymous ? 'Anonymous Supporter' : (donorName.trim() || 'Generous Friend'),
      message: message.trim() || 'Supporting the next generation of campus believers!',
      method: paymentMethod
    });

    setShowConfirmation(true);
  };

  const handleCloseAll = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAll}
      title={showConfirmation ? '🙌 Thank You for Your Faith Seed!' : `🏕️ Sponsor Event: ${campaign.title}`}
      maxWidth="max-w-xl"
    >
      {showConfirmation ? (
        <div className="space-y-5 text-center py-4">
          <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
              Sponsorship Seed Recorded: ₱{finalAmount.toLocaleString()}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
              Your partnership helps sponsor students for <strong>{campaign.title}</strong> and spread the Gospel across Iloilo universities!
            </p>
          </div>

          <div className="p-4 rounded-2xl border text-xs bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-left space-y-2">
            <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Transfer Channel:</span>
              <span className="uppercase font-black text-indigo-600 dark:text-indigo-400">{paymentMethod}</span>
            </div>
            <div className="text-slate-600 dark:text-slate-400">
              Please transfer <strong>₱{finalAmount.toLocaleString()}</strong> to the official ministry account below:
            </div>
            <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-black text-slate-900 dark:text-white">GCash / Maya: 0917-882-9471</div>
                <div className="text-[11px] text-slate-500">Grace Youth Ministry Council</div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy('09178829471', 'GCash Number')}
                className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
                title="Copy Number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            onClick={handleCloseAll}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg cursor-pointer"
          >
            Done & Return to Campaigns
          </button>
        </div>
      ) : (
        <form onSubmit={handleDonateSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Campaign Summary */}
          <div className="p-3.5 rounded-2xl border bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 flex items-center gap-3">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700"
            />
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">
                {campaign.category} • {campaign.campusName}
              </span>
              <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-1 font-heading">
                {campaign.title}
              </h4>
              <span className="text-[11px] text-slate-500">
                Goal: ₱{campaign.targetAmount.toLocaleString()} • Raised: ₱{campaign.raisedAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Amount Tiers */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              1. Select Sponsorship Tier
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[250, 500, 1200].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500 font-black shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs sm:text-sm font-black">₱{amt.toLocaleString()}</span>
                </button>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="number"
                placeholder="Or Enter Custom Amount (₱)..."
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              2. Transfer Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'gcash', label: 'GCash' },
                { id: 'maya', label: 'Maya' },
                { id: 'bank', label: 'Bank Transfer' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Donor Dedication & Info */}
          <div className="space-y-2.5">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Your Name / Sponsor (Optional)
              </label>
              <input
                type="text"
                disabled={isAnonymous}
                placeholder="e.g. Kuya Mark / UPV Alumnus"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                } ${isAnonymous ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded-sm text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-xs text-slate-600 dark:text-slate-400">Sponsor anonymously on the public campaign wall</span>
            </label>

            <div>
              <label className="block text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                Prayer / Words of Encouragement for the Youth (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Praying for a mighty move of God in the campus retreat!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-pink-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Tent className="w-4 h-4" />
            <span>Sponsor ₱{finalAmount ? finalAmount.toLocaleString() : '0'} for this Event</span>
          </button>
        </form>
      )}
    </Modal>
  );
};
