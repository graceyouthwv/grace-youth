import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  CheckCircle2,
  Edit3,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const CampaignCard = ({ campaign, onDonateClick, onDonate, onEdit }) => {
  const { theme, currentUser, verifyRegistrantPayment, deleteRegistrant, showToast } = useApp();
  const isDark = theme === 'dark';
  const handleRegister = onDonateClick || onDonate;
  const isAdmin = currentUser && (currentUser.role === 'leader' || currentUser.role === 'council' || currentUser.isAdmin === true);
  const canEdit = isAdmin && !!onEdit;

  const [showRosterModal, setShowRosterModal] = useState(false);

  const eventFee = campaign.registrationFee || 250;
  const registrants = campaign.registrants || [];
  const registeredCount = campaign.registeredCount || registrants.length || 0;
  const maxCapacity = campaign.maxCapacity || 250;
  const fillPercentage = Math.min(100, Math.round((registeredCount / maxCapacity) * 100));

  return (
    <>
      <div className="genz-card overflow-hidden flex flex-col justify-between group transition-all duration-300">
        <div>
          {/* Cover Photo */}
          <div className="relative h-48 w-full overflow-hidden" data-overlay="true">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/70 backdrop-blur-md text-white border border-white/30 shadow-xs" style={{ color: '#ffffff' }}>
                {campaign.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-900/90 text-indigo-100 border border-indigo-500/40">
                {campaign.campusName}
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5">
              {isAdmin && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRosterModal(true);
                  }}
                  className="px-2.5 py-1 rounded-full text-[10px] font-black bg-indigo-600/90 hover:bg-indigo-600 backdrop-blur-md text-white border border-indigo-400/40 shadow-md cursor-pointer flex items-center gap-1 transition-all"
                  title="View Registered Students"
                >
                  <Eye className="w-3 h-3 text-white" />
                  <span>Roster ({registeredCount})</span>
                </button>
              )}

              {canEdit && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(campaign);
                  }}
                  className="px-2.5 py-1 rounded-full text-[10px] font-black bg-black/70 hover:bg-black/90 backdrop-blur-md text-amber-300 border border-amber-500/40 shadow-md cursor-pointer flex items-center gap-1 transition-all"
                  title="Edit Event & Registration Fee (Admin Only)"
                >
                  <Edit3 className="w-3 h-3 text-amber-300" />
                  <span>Edit Fee</span>
                </button>
              )}
            </div>

            <div className="absolute bottom-3 left-3 right-3 card-overlay-text">
              <div className="flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1 drop-shadow-md">
                <Calendar className="w-3.5 h-3.5" />
                <span>{campaign.date || 'Dec 18, 2026'}</span>
                <span>•</span>
                <span>{campaign.time || '4:00 PM'}</span>
              </div>
              <h3
                className="font-extrabold text-base sm:text-lg leading-tight line-clamp-2 font-heading text-white drop-shadow-lg"
                style={{ color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.9)' }}
              >
                {campaign.title}
              </h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
              {campaign.description}
            </p>

            {/* Venue & Organizer Details */}
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="truncate">{campaign.venue || 'Iloilo City Youth Pavilion & Fellowship Grounds'}</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <span>Organized by: <strong className={isDark ? 'text-slate-300' : 'text-slate-800'}>{campaign.organizer || 'Grace Youth Campus Council'}</strong></span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">All Campuses Welcome</span>
              </div>
            </div>

            {/* Registration Fee & Attendee Count (NO MONEY ACCUMULATED DISPLAYED) */}
            <div className="p-3.5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Registration Fee</span>
                  <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 font-heading">
                    ₱{eventFee.toLocaleString()}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Confirmed Attendees</span>
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{registeredCount} / {maxCapacity} Slots</span>
                  </div>
                </div>
              </div>

              {/* Attendance Capacity Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${fillPercentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                <span>Includes full dinner & materials</span>
                <span>{fillPercentage}% Reserved</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={() => handleRegister && handleRegister(campaign)}
            className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Ticket className="w-4 h-4 text-white" />
            <span>Register for Event (₱{eventFee})</span>
          </button>
        </div>
      </div>

      {/* ADMIN ATTENDEE ROSTER MODAL */}
      <Modal
        isOpen={showRosterModal}
        onClose={() => setShowRosterModal(false)}
        title={`👥 Registered Attendees: ${campaign.title}`}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30">
            <div>
              <span className="font-extrabold text-sm text-indigo-950 dark:text-white block">
                {registeredCount} Registered Students
              </span>
              <span className="text-[11px] text-slate-500">
                Capacity: {maxCapacity} slots • Fixed Fee: ₱{eventFee}
              </span>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-indigo-600 text-white">
              Admin Verified Roster
            </span>
          </div>

          {registrants.length > 0 ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto space-y-2 pr-1">
              {registrants.map((reg) => (
                <div key={reg.id} className="pt-2.5 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <strong className={`font-extrabold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{reg.name}</strong>
                      <span className={`px-2 py-0.2 rounded-full text-[9px] font-black uppercase ${
                        reg.status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                      }`}>
                        {reg.status}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {reg.campus} • {reg.yearProgram}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-2">
                      <span>📞 {reg.phone}</span>
                      <span>•</span>
                      <span>Payment: <strong>{reg.paymentMethod}</strong> (Ref: {reg.referenceNumber})</span>
                      {reg.dietaryOrNotes && reg.dietaryOrNotes !== 'None' && (
                        <>
                          <span>•</span>
                          <span className="text-amber-500">Note: {reg.dietaryOrNotes}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                    {reg.status !== 'Confirmed' && (
                      <button
                        onClick={() => verifyRegistrantPayment(campaign.id, reg.id)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] cursor-pointer"
                      >
                        Verify Payment
                      </button>
                    )}
                    <button
                      onClick={() => deleteRegistrant(campaign.id, reg.id)}
                      className="px-2 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 text-[10px] font-bold cursor-pointer"
                      title="Remove Registrant"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              No students registered yet for this event.
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setShowRosterModal(false)}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:text-white cursor-pointer"
            >
              Close Roster
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};
