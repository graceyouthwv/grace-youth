import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  QrCode,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Calendar,
  MapPin,
  Clock,
  User,
  Mail,
  Phone,
  GraduationCap,
  HeartHandshake,
  Receipt,
  Ticket,
  Download,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';

export const RegisterEventModal = ({ isOpen, onClose, campaign }) => {
  const { currentUser, registerForEvent, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [step, setStep] = useState(1); // 1: Attendee Info, 2: Payment & Verification, 3: Confirmed Ticket Pass

  // Form State
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: '',
    campus: currentUser.campusName || 'All Iloilo Campuses',
    campusId: currentUser.campusId || 'upv',
    yearProgram: '',
    invitedBy: '',
    dietaryOrNotes: 'None',
    emergencyContact: '',
    emergencyPhone: '',
    paymentMethod: 'GCash',
    referenceNumber: ''
  });

  const [generatedTicket, setGeneratedTicket] = useState(null);

  if (!campaign) return null;

  const eventFee = campaign.registrationFee || 250;

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`📋 ${label} copied to clipboard!`, 'info');
  };

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.yearProgram.trim()) {
      showToast('Please fill in all required registration fields (*)', 'error');
      return;
    }
    setStep(2);
  };

  const handleConfirmRegistration = (e) => {
    e.preventDefault();

    if (formData.paymentMethod !== 'Cash on Arrival' && !formData.referenceNumber.trim()) {
      showToast('Please enter your payment Reference Number or Transaction ID.', 'error');
      return;
    }

    const ticketId = `PASS-${Math.floor(100000 + Math.random() * 900000)}`;

    const registrantPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      campus: formData.campus,
      yearProgram: formData.yearProgram.trim(),
      invitedBy: formData.invitedBy.trim(),
      dietaryOrNotes: formData.dietaryOrNotes.trim(),
      emergencyContact: formData.emergencyContact.trim(),
      emergencyPhone: formData.emergencyPhone.trim(),
      paymentMethod: formData.paymentMethod,
      referenceNumber: formData.paymentMethod === 'Cash on Arrival' ? 'CASH-AT-DOOR' : formData.referenceNumber.trim(),
      amountPaid: eventFee
    };

    registerForEvent(campaign.id, registrantPayload);

    setGeneratedTicket({
      ticketId,
      ...registrantPayload,
      eventTitle: campaign.title,
      eventDate: campaign.date || 'December 18, 2026',
      eventVenue: campaign.venue || 'Iloilo City Fellowship Grounds',
      eventFee
    });

    setStep(3);
  };

  const handleCloseAll = () => {
    setStep(1);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAll}
      title={
        step === 3
          ? '🎟️ Official Event Registration Pass'
          : step === 2
          ? '💳 Registration Fee & Verification'
          : `📝 Event Registration: ${campaign.title}`
      }
      maxWidth="max-w-xl"
    >
      {/* STEP 3: OFFICIAL REGISTRATION PASS / TICKET */}
      {step === 3 && generatedTicket && (
        <div className="space-y-5 text-center py-2 text-xs sm:text-sm animate-modal-in">
          <div className="w-14 h-14 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              {generatedTicket.paymentMethod === 'Cash on Arrival' ? '⏳ Reserved (Pay on Arrival)' : '✓ Registration Confirmed'}
            </span>
            <h3 className={`text-lg sm:text-xl font-extrabold font-heading mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              You're Registered for the Meet & Greet!
            </h3>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your spot has been reserved. Please present this e-pass or your name at the registration desk.
            </p>
          </div>

          {/* E-Ticket Card */}
          <div className={`p-5 rounded-3xl border text-left space-y-3 relative overflow-hidden shadow-lg ${
            isDark ? 'bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border-indigo-500/30' : 'bg-gradient-to-br from-white via-indigo-50/50 to-white border-indigo-200'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-wider">Official Delegate Pass</span>
                <div className="text-sm font-extrabold font-heading line-clamp-1">{generatedTicket.eventTitle}</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 block">Pass ID</span>
                <span className="font-mono font-black text-xs text-amber-500">{generatedTicket.ticketId}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 text-[10px] block">Delegate Name</span>
                <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{generatedTicket.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">University / Campus</span>
                <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{generatedTicket.campus}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Date & Venue</span>
                <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{generatedTicket.eventDate} • {generatedTicket.eventVenue}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Registration Fee</span>
                <strong className="text-emerald-500">₱{generatedTicket.eventFee.toLocaleString()} ({generatedTicket.paymentMethod})</strong>
              </div>
            </div>

            <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Grace Youth Campus Ministry Verified</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">Ref: {generatedTicket.referenceNumber}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => {
                showToast('📥 Registration E-Pass saved to your session!', 'success');
                handleCloseAll();
              }}
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Done & Close</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: REGISTRATION FEE & PAYMENT */}
      {step === 2 && (
        <form onSubmit={handleConfirmRegistration} className="space-y-4 text-xs sm:text-sm animate-modal-in">
          {/* Summary Box */}
          <div className={`p-4 rounded-2xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-500">Event:</span>
              <span className={`font-extrabold text-xs line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>{campaign.title}</span>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="text-xs text-slate-500 block">Registration Fee:</span>
                <span className="text-[11px] text-slate-400">Includes dinner, worship materials & welcoming kit</span>
              </div>
              <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 font-heading">
                ₱{eventFee.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Payment Method Options */}
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Select Payment Option
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'GCash', label: 'GCash' },
                { id: 'Maya', label: 'Maya' },
                { id: 'Cash on Arrival', label: 'Cash on Arrival' },
                { id: 'Bank Transfer', label: 'Bank (BDO/BPI)' }
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    formData.paymentMethod === m.id
                      ? 'bg-indigo-600 text-white border-indigo-500 font-black shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* QR & Transfer Instructions (for GCash / Maya / Bank) */}
          {formData.paymentMethod !== 'Cash on Arrival' ? (
            <div className={`p-4 rounded-2xl border space-y-3 ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="p-2 bg-white rounded-2xl border border-slate-200 shadow-sm shrink-0">
                  <div className="w-28 h-28 bg-slate-950 rounded-xl flex flex-col items-center justify-center text-white relative">
                    <QrCode className="w-20 h-20 text-white" />
                    <span className="text-[8px] font-black uppercase bg-indigo-600 px-1.5 py-0.5 rounded-full absolute bottom-1">
                      {formData.paymentMethod} QR
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-left flex-1 w-full">
                  <div className="font-bold text-xs text-slate-500">Official Ministry Account:</div>
                  <div className="font-black text-sm text-slate-900 dark:text-white flex items-center justify-between">
                    <span>0917-829-4501</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('09178294501', `${formData.paymentMethod} Number`)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-bold"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-500">Account Name: <strong>Grace Youth Ministry Inc.</strong></div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded-lg border border-amber-200 dark:border-amber-500/30">
                    💡 Send exactly <strong>₱{eventFee}</strong> and enter the Reference Number below.
                  </div>
                </div>
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  {formData.paymentMethod} Reference Number / Transaction ID *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 1002938472918 or MP-2026-X"
                  value={formData.referenceNumber}
                  onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-mono ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                  }`}
                />
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 text-xs space-y-1.5 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-black">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Cash on Arrival Policy</span>
              </div>
              <p>
                Your registration spot will be reserved immediately. Please prepare exactly <strong>₱{eventFee}</strong> upon check-in at the entrance table on December 18.
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
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
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Event Registration</span>
            </button>
          </div>
        </form>
      )}

      {/* STEP 1: ATTENDEE & ACADEMIC INFORMATION */}
      {step === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-4 text-xs sm:text-sm">
          <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
            isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-12 h-12 rounded-xl object-cover ring-1 ring-slate-700"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400">
                  {campaign.category}
                </span>
                <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  ₱{eventFee} Fee
                </span>
              </div>
              <h4 className={`font-extrabold text-xs sm:text-sm line-clamp-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {campaign.title}
              </h4>
              <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                <span>📅 {campaign.date || 'Dec 18, 2026'}</span>
                <span>•</span>
                <span>📍 {campaign.venue || 'Iloilo City'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="Juan Dela Cruz"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="juan@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Mobile / Contact Number *
              </label>
              <input
                type="tel"
                required
                placeholder="0917-xxx-xxxx"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Campus / University *
              </label>
              <select
                value={formData.campus}
                onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                {CAMPUSES.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Year Level & Degree Program *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2nd Year BS Nursing / 3rd Year BSIT"
                value={formData.yearProgram}
                onChange={(e) => setFormData({ ...formData, yearProgram: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Life Group / Invited By (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Kuya Daniel / UPV Life Group"
                value={formData.invitedBy}
                onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Dietary Preferences / Special Notes
            </label>
            <input
              type="text"
              placeholder="e.g. None, No pork, Allergic to seafood, Vegetarian"
              value={formData.dietaryOrNotes}
              onChange={(e) => setFormData({ ...formData, dietaryOrNotes: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue to Payment & Review (₱{eventFee})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
};

// Also export DonateModal as alias for backward compatibility
export const DonateModal = RegisterEventModal;
