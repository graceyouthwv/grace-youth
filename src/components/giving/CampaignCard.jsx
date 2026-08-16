import React from 'react';
import { useApp } from '../../context/AppContext';
import { Heart, Users, Target, Calendar, ArrowRight, Sparkles } from 'lucide-react';

export const CampaignCard = ({ campaign, onDonateClick }) => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  const percentage = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));

  return (
    <div className="genz-card overflow-hidden flex flex-col justify-between group transition-all duration-300">
      <div>
        {/* Cover Photo */}
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
              {campaign.category}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-900/80 text-indigo-200 border border-indigo-500/30">
              {campaign.campusName}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-extrabold text-base sm:text-lg leading-tight line-clamp-2 font-heading text-white drop-shadow-md">
              {campaign.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {campaign.description}
          </p>

          {/* Progress Bar & Amount */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white">
                ₱{campaign.raisedAmount.toLocaleString()}{' '}
                <span className="text-[10px] font-medium text-slate-500">raised</span>
              </span>
              <span className="font-bold text-slate-500 text-[11px]">
                Goal: ₱{campaign.targetAmount.toLocaleString()}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 h-full rounded-full transition-all duration-500 shadow-xs"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 pt-0.5">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <Users className="w-3 h-3" />
                <span>{campaign.donorsCount} Faith Seeds / Donors</span>
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">{percentage}% Funded</span>
            </div>
          </div>

          {/* Recent Donor Wall / Dedication Preview */}
          {campaign.recentDonors && campaign.recentDonors.length > 0 && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block">
                Recent Seeds:
              </span>
              <div className="p-2.5 rounded-xl border bg-slate-50/70 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{campaign.recentDonors[0].name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                    +₱{campaign.recentDonors[0].amount.toLocaleString()}
                  </span>
                </div>
                {campaign.recentDonors[0].message && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 italic line-clamp-1">
                    "{campaign.recentDonors[0].message}"
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Action */}
      <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800">
        <button
          onClick={() => onDonateClick(campaign)}
          className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-rose-500 via-pink-600 to-indigo-600 hover:from-rose-400 hover:to-indigo-500 text-white shadow-lg shadow-pink-500/20 hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Seed Support for this Event</span>
        </button>
      </div>
    </div>
  );
};
