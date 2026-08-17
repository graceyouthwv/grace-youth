import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Heart, Sparkles, QrCode, CreditCard, ShieldCheck, CheckCircle2, Copy, Tent, ArrowRight, Download, Receipt } from 'lucide-react';

export const DonateModal = ({ isOpen, onClose, campaign }) => {
  const { currentUser, donateToCampaign, showToast, theme } = useApp();
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('gcash'); // 'gcash' | 'maya' | 'bdo'
  const [donorName, setDonorName] = useState(currentUser.name || '');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [message, setMessage] = useState('');
  const [refNumber, setRefNumber] = useState('');
  const [step, setStep] = useState(1); // 1: Select Amount & Channel, 2: Scan QR & Enter Ref, 3: Success Receipt

  const isDark = theme === 'dark';

  if (!campaign) return null;

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 ${label} copied to clipboard!`, 'info');
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      showToast('Please select or enter a valid sponsorship amount.', 'error');
      return;
    }
    setStep(2);
  };

  const handleConfirmPaid = (e) => {
    e.preventDefault();
    if (!refNumber.trim()) {
      showToast('Please enter your GCash / Maya Reference Number.', 'error');
      return;
    }

    donateToCampaign(campaign.id, {
      amount: finalAmount,
      name: isAnonymous ? 'Anonymous Supporter' : (donorName.trim() || 'Generous Friend'),
      message: message.trim() || 'Supporting the next generation of campus believers!',
      method: paymentMethod,
      refNumber: refNumber.trim()
    });

    setStep(3);
  };

  const handleCloseAll = () => {
    setStep(1);
    setRefNumber('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAll}
      title={
        step === 3
          ? '🧾 Official Sponsorship Receipt'
          : step === 2
          ? '📱 Pay via GCash / Maya / Bank'
          : `🏕️ Sponsor Event: ${campaign.title}`
      }
      maxWidth="max-w-xl"
    >
      {/* STEP 3: OFFICIAL ELECTRONIC RECEIPT */}
      {step === 3 && (
        <div className="space-y-4 text-center py-2 text-xs sm:text-sm">
          <div className="w-14 h-14 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className={`text-lg sm:text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Sponsorship Received: ₱{finalAmount.toLocaleString()}
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Thank you! Your faith seed is now reflected on the live campaign.
            </p>
          </div>

          {/* Receipt Slip */}
          <div className={`p-4 rounded-2xl border text-left space-y-2 text-xs relative ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-slate-800">
              <span className="font-bold">Transaction Reference:</span>
              <span className="font-mono font-black text-indigo-600 dark:text-indigo-400">{refNumber || 'REF-99214081'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Event Sponsored:</span>
              <span className="font-bold line-clamp-1">{campaign.title}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Sponsor:</span>
              <span className="font-bold">{isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Friend')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Channel:</span>
              <span className="uppercase font-bold">{paymentMethod}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => {
                showToast('📥 Electronic receipt saved!', 'success');
                handleCloseAll();
              }}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>Done & Close</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: SCAN QR & ENTER REFERENCE NUMBER */}
      {step === 2 && (
        <form onSubmit={handleConfirmPaid} className="space-y-4 text-xs sm:text-sm">
          <div className={`p-4 rounded-2xl border text-center space-y-3 ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="inline-block p-3 bg-white rounded-2xl shadow-md border border-slate-200">
              {/* QR Code Placeholder Graphic */}
              <div className="w-40 h-40 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-white relative overflow-hidden">
                <QrCode className="w-28 h-28 text-white" />
                <span className="text-[9px] font-black tracking-widest uppercase bg-indigo-600 px-2 py-0.5 rounded-full absolute bottom-2">
                  GCash • Maya QR
                </span>
              </div>
            </div>

            <div>
              <div className="text-xs text-slate-500">Amount to Transfer:</div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 font-heading">
                ₱{finalAmount.toLocaleString()}
              </div>
            </div>

            {/* Official Account Details */}
            <div className="p-3 bg-white dark:bg-black/40 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between text-left">
              <div>
                <div className="font-black text-slate-900 dark:text-white">GCash / Maya: 0917-882-9471</div>
                <div className="text-[11px] text-slate-500">Account: Grace Youth Ministry Council</div>
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

          {/* Reference Number Input */}
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Enter GCash / Maya Reference Number *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 1002938472918 or Transaction ID"
              value={refNumber}
              onChange={(e) => setRefNumber(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
            <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Found on your GCash/Maya payment SMS or receipt screen.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
              }`}
            >
              Back
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify & Complete Sponsorship</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 1: SELECT AMOUNT & DEDICATION */}
      {step === 1 && (
        <form onSubmit={handleProceedToPayment} className="space-y-4 text-xs sm:text-sm">
          {/* Campaign Summary */}
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700"
            />
            <div className="flex-1">
              <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">
                {campaign.category} • {campaign.campusName}
              </span>
              <h4 className={`font-extrabold text-xs sm:text-sm line-clamp-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {campaign.title}
              </h4>
              <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Goal: ₱{campaign.targetAmount.toLocaleString()} • Raised: ₱{campaign.raisedAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Amount Tiers */}
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
            <label className={`block text-xs font-black uppercase tracking-wider mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              2. Choose Channel
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

          {/* Donor Dedication */}
          <div className="space-y-2.5">
            <div>
              <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sponsor anonymously on the public campaign wall</span>
            </label>

            <div>
              <label className={`block text-[11px] font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Prayer / Words of Encouragement for the Youth (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Praying for a mighty move of God in the campus fellowship!"
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
            <span>Proceed to GCash / Maya (₱{finalAmount ? finalAmount.toLocaleString() : '0'})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      )}
    </Modal>
  );
};
