import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  Users,
  Heart,
  Sparkles,
  PlusCircle,
  ArrowRight,
  CheckCircle2,
  Trash2,
  Music,
  Coffee,
  HeartHandshake,
  Download,
  FileText,
  Share2
} from 'lucide-react';
import { DailyDevotional } from '../dashboard/DailyDevotional';
import { VolunteerModal } from '../common/VolunteerModal';
import { UploadSongModal } from './UploadSongModal';
import { ViewSongModal } from './ViewSongModal';
import { LifeGroupCircleModal } from '../discipleship/LifeGroupCircleModal';
import { SessionRoomModal } from '../tutor/SessionRoomModal';
import { UploadCloud, FileUp, Eye, MessageSquare, Video } from 'lucide-react';

export const StudentPortal = () => {
  const {
    currentUser,
    myBookings,
    myGroups,
    bibleStudies,
    prayers,
    volunteerApplications,
    cancelBooking,
    setActiveTab,
    showToast,
    theme
  } = useApp();
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showUploadSongModal, setShowUploadSongModal] = useState(false);
  const [selectedSongForView, setSelectedSongForView] = useState(null);
  const [selectedGroupForCircle, setSelectedGroupForCircle] = useState(null);
  const [selectedSessionForCall, setSelectedSessionForCall] = useState(null);
  const isDark = theme === 'dark';

  const [musicSetlist, setMusicSetlist] = useState([
    { id: 's1', song: 'Goodness of God', key: 'Key of G', tempo: '68 BPM', artist: 'Bethel Music', fileName: 'Goodness_of_God_Chords_G.pdf' },
    { id: 's2', song: 'Gratitude', key: 'Key of B', tempo: '78 BPM', artist: 'Brandon Lake', fileName: 'Gratitude_Chord_Chart_B.pdf' },
    { id: 's3', song: 'The Blessing', key: 'Key of C', tempo: '70 BPM', artist: 'Kari Jobe & Cody Carnes', fileName: 'The_Blessing_Lead_Sheet.pdf' },
    { id: 's4', song: 'King of Kings', key: 'Key of D', tempo: '68 BPM', artist: 'Hillsong Worship', fileName: 'King_of_Kings_Chart_D.pdf' }
  ]);

  const myJoinedGroups = bibleStudies.filter((g) => myGroups.includes(g.id));
  const myPrayerItems = prayers.filter((p) => p.author === currentUser.name || (!p.isAnonymous && p.author.includes(currentUser.name.split(' ')[0])));

  // Check if current user has an active volunteer record
  const myVolunteerApp = volunteerApplications?.find(
    (a) =>
      (a.email && currentUser.email && a.email.toLowerCase() === currentUser.email.toLowerCase()) ||
      (a.name && currentUser.name && a.name.toLowerCase() === currentUser.name.toLowerCase()) ||
      currentUser.isVolunteer
  );

  const isApprovedVolunteer = currentUser.isVolunteer || myVolunteerApp?.status === 'Approved';
  const isPendingVolunteer = myVolunteerApp && myVolunteerApp.status === 'Pending';

  const volunteerTrack = {
    team: myVolunteerApp?.roleTitle || '🎸 Campus Worship & Music Team',
    role: myVolunteerApp?.role || 'Acoustic Guitar & Backing Vocals',
    nextDuty: 'Thursday Campus Worship Night • 5:00 PM @ UPV Gazebo',
    status: myVolunteerApp?.status || 'Scheduled'
  };

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
        isDark
          ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-[#111625] border-indigo-500/20 text-white shadow-xl'
          : 'bg-gradient-to-r from-indigo-50 via-white to-sky-50 border-indigo-200 text-slate-900 shadow-xs'
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
              <h2 className={`text-xl sm:text-2xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Welcome, {currentUser.name.split(' ')[0]}!
              </h2>
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-500/30">
                Student Member
              </span>
            </div>
            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {currentUser.roleLabel} • {currentUser.campusName}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('tutorials')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Request a Tutor</span>
          </button>
          <button
            onClick={() => setShowVolunteerModal(true)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl font-extrabold text-xs border transition-all cursor-pointer ${
              isDark ? 'bg-slate-800 border-slate-700 text-pink-300 hover:bg-slate-700' : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Volunteer / Serve</span>
          </button>
        </div>
      </div>

      {/* Main Student Hub Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Sessions, Life Group, and Volunteer Roster */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: My Booked Peer Tutorials */}
          <div className={`p-6 rounded-3xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${
                  isDark ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    My Scheduled Peer Tutorials
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    100% Free 1-on-1 Academic Support
                  </p>
                </div>
              </div>

              <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                isDark ? 'text-indigo-400 bg-indigo-950/60 border-indigo-500/30' : 'text-indigo-700 bg-indigo-50 border-indigo-200'
              }`}>
                {myBookings.length} Active
              </span>
            </div>

            {myBookings.length > 0 ? (
              <div className="space-y-3">
                {myBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                      isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-700 bg-emerald-100 border-emerald-200'
                          }`}>
                            {bk.status}
                          </span>
                          <span className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>• Booked on {bk.bookedAt}</span>
                        </div>
                        <h4 className={`font-extrabold text-base mt-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {bk.subject}
                        </h4>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Assigned Peer Tutor: <strong>{bk.tutorName}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => cancelBooking(bk.id)}
                        className="text-slate-400 hover:text-rose-500 p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        title="Cancel Booking"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                      isDark ? 'bg-black/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                    }`}>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-pink-500" />
                        <span>Schedule: <strong>{bk.day} ({bk.time})</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-pink-500" />
                        <span>Venue / Link: <strong>{bk.mode}</strong></span>
                      </div>
                      {bk.meetingNote && (
                        <p className={`text-[11px] italic pt-1 border-t ${
                          isDark ? 'text-slate-400 border-slate-800/80' : 'text-slate-500 border-slate-200'
                        }`}>
                          Prep Note: {bk.meetingNote}
                        </p>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={() => setSelectedSessionForCall(bk)}
                          className="w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Enter Live 1-on-1 Video Study Room &rarr;</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 rounded-2xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                No active tutorial bookings right now.
                <div className="mt-2">
                  <button
                    onClick={() => setActiveTab('tutorials')}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Browse Free Tutors
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Volunteer Ministry Track (Only for Verified Volunteers) */}
          {isApprovedVolunteer ? (
            <div className={`p-6 rounded-3xl border transition-all ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-xl border ${
                    isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-600 border-pink-200'
                  }`}>
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      My Ministry Volunteer Track
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Serving God and Fellow Students across Campus
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                  isDark ? 'text-pink-400 bg-pink-950/60 border-pink-500/30' : 'text-pink-700 bg-pink-50 border-pink-200'
                }`}>
                  Active Volunteer
                </span>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50/70 border-slate-200'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-extrabold text-sm text-pink-600 dark:text-pink-400 block">
                      {volunteerTrack.team}
                    </span>
                    <div className={`text-xs font-bold mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Role: {volunteerTrack.role}
                    </div>
                  </div>

                  <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {volunteerTrack.status}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                  isDark ? 'bg-black/40 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-pink-500 shrink-0" />
                    <span>Next Roster: <strong>{volunteerTrack.nextDuty}</strong></span>
                  </div>
                </div>

                {/* Worship Setlist / Volunteer Resources */}
                <div className={`pt-3 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
                  <div className="text-[11px] font-black uppercase tracking-wider flex flex-wrap items-center justify-between gap-2">
                    <div className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      <Music className="w-3.5 h-3.5 text-pink-500" />
                      <span>Campus Setlist & PDF Chords ({musicSetlist.length}):</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowUploadSongModal(true)}
                        className={`px-2.5 py-1 rounded-lg font-bold text-[11px] border cursor-pointer flex items-center gap-1 transition-all ${
                          isDark ? 'bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border-pink-500/30' : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-pink-200'
                        }`}
                      >
                        <FileUp className="w-3 h-3" />
                        <span>+ Upload Song / PDF</span>
                      </button>

                      <button
                        onClick={() => showToast('📥 Complete worship setlist ready in app viewer!', 'success')}
                        className={`flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
                          isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        <span>Setlist Overview</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {musicSetlist.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedSongForView(item)}
                        className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-2 group transition-all cursor-pointer ${
                          isDark
                            ? 'bg-slate-900 border-slate-800 text-white hover:border-pink-500/50'
                            : 'bg-white border-slate-200 text-slate-900 shadow-xs hover:border-pink-300'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className={`font-extrabold truncate flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            <span>{item.song}</span>
                          </div>
                          <div className={`text-[11px] truncate mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                            {item.artist} • <span className="text-pink-600 dark:text-pink-400 font-bold">{item.key}</span> • {item.tempo}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSongForView(item);
                          }}
                          className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 flex items-center gap-1 font-bold text-[11px] ${
                            isDark
                              ? 'bg-pink-600/20 hover:bg-pink-600 text-pink-300 hover:text-white border-pink-500/30'
                              : 'bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white border-pink-200 shadow-xs'
                          }`}
                          title="View PDF / Chords"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : isPendingVolunteer ? (
            <div className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              isDark ? 'bg-amber-950/30 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-500">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Volunteer Application Under Review</h4>
                  <p className="text-xs opacity-80 mt-0.5">
                    Your application for <strong>{myVolunteerApp.roleTitle || 'Campus Ministry Volunteer'}</strong> is awaiting leadership approval.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Pending Approval
              </span>
            </div>
          ) : null}

          {/* Section 3: My Campus Life Group */}
          <div className={`p-6 rounded-3xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-xl border ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    My Campus Life Group
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Weekly Faith, Fellowship & Prayer
                  </p>
                </div>
              </div>

              <span className={`text-xs font-black px-2.5 py-1 rounded-xl border ${
                isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}>
                {myJoinedGroups.length} Group
              </span>
            </div>

            {myJoinedGroups.length > 0 ? (
              <div className="space-y-3">
                {myJoinedGroups.map((grp) => (
                  <div
                    key={grp.id}
                    className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                      isDark ? 'bg-slate-950/50 border-emerald-500/30' : 'bg-emerald-50/50 border-emerald-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          isDark ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30' : 'text-emerald-800 bg-emerald-100 border-emerald-200'
                        }`}>
                          {grp.topicCategory}
                        </span>
                        <h4 className={`font-extrabold text-base mt-1 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {grp.title}
                        </h4>
                        <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          Leader / Facilitator: <strong>{grp.facilitator}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedGroupForCircle(grp)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open Chat & Roster</span>
                      </button>
                    </div>

                    <div className={`p-3 rounded-xl border text-xs space-y-1 ${
                      isDark ? 'bg-black/40 border-slate-800 text-slate-300' : 'bg-white border-emerald-100 text-slate-700'
                    }`}>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{grp.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{grp.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-6 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                You haven't joined a life group yet.
                <button
                  onClick={() => setActiveTab('discipleship')}
                  className="ml-2 font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
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
          <div className={`p-5 rounded-3xl border transition-all ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h4 className={`font-extrabold text-sm font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  My Prayer Items
                </h4>
              </div>
              <button
                onClick={() => setActiveTab('discipleship')}
                className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
              >
                Life Groups &rarr;
              </button>
            </div>

            {myPrayerItems.length > 0 ? (
              <div className="space-y-2.5">
                {myPrayerItems.map((p) => (
                  <div key={p.id} className={`p-3 rounded-2xl border text-xs ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}>
                    <p className="italic line-clamp-2">"{p.content}"</p>
                    <div className={`flex items-center justify-between mt-2 pt-2 border-t text-[11px] ${
                      isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}>
                      <span className="text-rose-500 font-bold">❤️ {p.prayedCount} praying</span>
                      <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>{p.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className={`text-xs py-3 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                No active prayer requests posted yet.
              </p>
            )}
          </div>
        </div>
      </div>

      <VolunteerModal
        isOpen={showVolunteerModal}
        onClose={() => setShowVolunteerModal(false)}
      />

      <UploadSongModal
        isOpen={showUploadSongModal}
        onClose={() => setShowUploadSongModal(false)}
        onAddSong={(newSong) => setMusicSetlist((prev) => [newSong, ...prev])}
      />

      <ViewSongModal
        isOpen={!!selectedSongForView}
        onClose={() => setSelectedSongForView(null)}
        song={selectedSongForView}
        onDeleteSong={(songId) => setMusicSetlist((prev) => prev.filter((s) => s.id !== songId))}
      />

      <LifeGroupCircleModal
        isOpen={!!selectedGroupForCircle}
        onClose={() => setSelectedGroupForCircle(null)}
        group={selectedGroupForCircle}
      />

      <SessionRoomModal
        isOpen={!!selectedSessionForCall}
        onClose={() => setSelectedSessionForCall(null)}
        session={selectedSessionForCall}
      />
    </div>
  );
};
