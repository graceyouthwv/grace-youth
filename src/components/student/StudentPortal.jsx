import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, BookOpen, Users, Heart, Sparkles, PlusCircle, ArrowRight, CheckCircle2, Trash2 } from 'lucide-react';
import { DailyDevotional } from '../dashboard/DailyDevotional';

export const StudentPortal = () => {
  const { currentUser, myBookings, myGroups, bibleStudies, prayers, cancelBooking, setActiveTab, theme } = useApp();
  const isDark = theme === 'dark';

  const myJoinedGroups = bibleStudies.filter((g) => myGroups.includes(g.id));
  const myPrayerItems = prayers.filter((p) => p.author === currentUser.name || (!p.isAnonymous && p.author.includes(currentUser.name.split(' ')[0])));

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className={`p-6 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#111625] border-indigo-500/20 text-white'
          : 'bg-gradient-to-r from-indigo-50 via-white to-sky-50 border-indigo-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/40"
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold font-heading">
                Welcome, {currentUser.name.split(' ')[0]}!
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 rounded-full border border-indigo-500/30">
                Student
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentUser.roleLabel} • {currentUser.campusName}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('tutorials')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Request a Tutor</span>
          </button>
          <button
            onClick={() => setActiveTab('prayer')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-rose-300 font-extrabold text-xs border border-slate-700 transition-all cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Post Prayer</span>
          </button>
        </div>
      </div>

      {/* Main Student Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Sessions & My Life Group */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: My Booked Peer Tutorials */}
          <div className="genz-card p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white font-heading">
                    My Scheduled Peer Tutorials
                  </h3>
                  <p className="text-xs text-slate-400">100% Free 1-on-1 Academic Support</p>
                </div>
              </div>

              <span className="text-xs font-black text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-500/30">
                {myBookings.length} Active
              </span>
            </div>

            {myBookings.length > 0 ? (
              <div className="space-y-3">
                {myBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                            {bk.status}
                          </span>
                          <span className="text-[10px] text-slate-400">• Booked on {bk.bookedAt}</span>
                        </div>
                        <h4 className="font-extrabold text-base text-white mt-1 font-heading">
                          {bk.subject}
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          Assigned Peer Tutor: <strong>{bk.tutorName}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => cancelBooking(bk.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-pink-400" />
                        <span>Schedule: <strong>{bk.day} ({bk.time})</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" />
                        <span>Venue / Link: <strong>{bk.mode}</strong></span>
                      </div>
                      {bk.meetingNote && (
                        <p className="text-[11px] text-slate-400 italic pt-1 border-t border-slate-800/80">
                          Prep Note: {bk.meetingNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-500 text-xs">
                No active tutorial bookings right now.
                <div className="mt-2">
                  <button
                    onClick={() => setActiveTab('tutorials')}
                    className="px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Browse Free Tutors
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: My Campus Life Group */}
          <div className="genz-card p-6 border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white font-heading">
                    My Campus Life Group
                  </h3>
                  <p className="text-xs text-slate-400">Weekly Faith, Fellowship & Prayer</p>
                </div>
              </div>

              <span className="text-xs font-black text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-500/30">
                {myJoinedGroups.length} Group
              </span>
            </div>

            {myJoinedGroups.length > 0 ? (
              <div className="space-y-3">
                {myJoinedGroups.map((grp) => (
                  <div
                    key={grp.id}
                    className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {grp.topicCategory}
                      </span>
                      <h4 className="font-extrabold text-base text-white mt-1 font-heading">
                        {grp.title}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Leader / Facilitator: <strong>{grp.facilitator}</strong>
                      </p>
                    </div>

                    <div className="p-3 bg-black/40 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{grp.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{grp.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-500 text-xs">
                You haven't joined a life group yet.
                <button
                  onClick={() => setActiveTab('discipleship')}
                  className="ml-2 font-bold text-emerald-400 hover:underline"
                >
                  Find one nearby &rarr;
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Devotional & Prayer Activity */}
        <div className="space-y-6">
          <DailyDevotional />

          {/* My Prayer Items */}
          <div className="genz-card p-5 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <h4 className="font-extrabold text-sm text-white font-heading">
                  My Prayer Items
                </h4>
              </div>
              <button
                onClick={() => setActiveTab('prayer')}
                className="text-xs font-bold text-rose-400 hover:underline cursor-pointer"
              >
                Wall &rarr;
              </button>
            </div>

            {myPrayerItems.length > 0 ? (
              <div className="space-y-2.5">
                {myPrayerItems.map((p) => (
                  <div key={p.id} className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs">
                    <p className="text-slate-200 italic line-clamp-2">"{p.content}"</p>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800 text-[11px]">
                      <span className="text-rose-400 font-bold">❤️ {p.prayedCount} praying</span>
                      <span className="text-slate-500">{p.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 py-3 text-center">
                No active prayer requests posted yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
