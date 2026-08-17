import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, MapPin, Clock, CheckCircle2, Edit3 } from 'lucide-react';
import { JoinLifeGroupModal } from './JoinLifeGroupModal';
import { EditGroupModal } from './EditGroupModal';

export const GroupCard = ({ group }) => {
  const { currentUser, myGroups, joinLifeGroup, theme } = useApp();
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const isJoined = myGroups.includes(group.id);
  const isFacilitator = currentUser && (
    (currentUser.name && group.facilitator && currentUser.name.toLowerCase() === group.facilitator.toLowerCase())
  );
  const isDark = theme === 'dark';

  return (
    <>
      <div className="genz-card overflow-hidden flex flex-col justify-between group transition-all duration-300">
        <div>
          {/* Cover Photo */}
          <div className="relative h-44 w-full overflow-hidden">
            <img
              src={group.image}
              alt={group.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-black bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-xs">
                {group.campusName}
              </span>
            </div>

            {/* Edit Group Trigger */}
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md hover:bg-white hover:text-slate-900 text-white transition-all cursor-pointer shadow-md"
              title="Edit / Delete Group"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>

            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5 drop-shadow-sm">
                {group.topicCategory}
              </span>
              <h3 className="font-extrabold text-base sm:text-lg leading-tight line-clamp-1 font-heading text-white drop-shadow-md">
                {group.title}
              </h3>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-5 space-y-3">
            <div className="text-xs text-slate-500 flex items-center justify-between">
              <span>Facilitator: <strong className={isDark ? 'text-slate-200' : 'text-slate-900'}>{group.facilitator} {isFacilitator && '(You)'}</strong></span>
              <span className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px]">
                <Users className="w-3 h-3" />
                <span>{group.currentMembers + (isJoined && !isFacilitator ? 1 : 0)} / {group.maxCapacity}</span>
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
              {group.description}
            </p>

            <div className="space-y-1.5 p-3 rounded-2xl border text-xs bg-slate-50 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 font-medium">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{group.schedule}</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="line-clamp-1">{group.location}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {group.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-lg border bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t bg-slate-50/50 dark:bg-slate-900/60 border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setShowJoinModal(true)}
            className={`w-full py-3 rounded-2xl font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
              isFacilitator
                ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40'
                : isJoined
                ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/20 hover:scale-[1.01]'
            }`}
          >
            {isFacilitator ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-amber-500" />
                <span>👑 You Facilitate this Group</span>
              </>
            ) : isJoined ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Joined (View Circle)</span>
              </>
            ) : (
              <>
                <Users className="w-4 h-4" />
                <span>Join This Life Group</span>
              </>
            )}
          </button>
        </div>
      </div>

      <JoinLifeGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        group={group}
      />

      <EditGroupModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        group={group}
      />
    </>
  );
};
