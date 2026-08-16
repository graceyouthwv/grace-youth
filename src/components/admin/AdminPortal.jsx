import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Users, BookOpen, Heart, Calendar, CheckCircle2, AlertCircle, Trash2, Send, Database, Sparkles, Filter, PlusCircle, UserCheck, UserPlus, Search, Award, Check, HeartHandshake, Music, Coffee, Tent } from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';
import { AddUserModal } from './AddUserModal';

const INITIAL_VOLUNTEER_APPS = [
  {
    id: 'vol-1',
    name: 'Janice Nicole Palma',
    email: 'janice@isufst.edu.ph',
    contact: '0918-392-1144',
    campusId: 'isufst',
    campusName: 'ISUFST (Barotac Nuevo)',
    roleArea: '🌱 Life Group Co-Facilitator',
    yearLevel: '3rd Year',
    availability: 'Tuesday & Thursday afternoons, Saturday fellowships',
    bioNote: 'I completed our campus discipleship series and want to co-lead freshmen life groups for Fisheries students.',
    appliedAt: '2 hours ago',
    status: 'Pending Admin Review'
  },
  {
    id: 'vol-2',
    name: 'Marco Gabriel Santos',
    email: 'marco@upv.edu.ph',
    contact: '0927-449-8821',
    campusId: 'upv',
    campusName: 'UP Visayas (Miagao)',
    roleArea: '🎸 Worship & Music Team',
    yearLevel: '2nd Year',
    availability: 'Friday nights & Sunday campus service',
    bioNote: 'Acoustic guitarist and vocalist eager to lead worship at youth camps and campus welcoming jams.',
    appliedAt: '1 day ago',
    status: 'Pending Admin Review'
  }
];

export const AdminPortal = () => {
  const {
    tutors,
    setTutors,
    requests,
    prayers,
    events,
    myBookings,
    registeredUsers,
    setRegisteredUsers,
    updateUserRole,
    lifeGroupRequests,
    approveLifeGroupRequest,
    currentUser,
    claimRequest,
    cancelBooking,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const [adminTab, setAdminTab] = useState('roles'); // 'roles' | 'volunteers' | 'tutors' | 'triage' | 'lg_requests' | 'gospel_sessions' | 'prayers'
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [selectedCampusFilter, setSelectedCampusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [verifiedTutorIds, setVerifiedTutorIds] = useState(() => ['tut-1', 'tut-2', 'tut-3', 'tut-4', 'tut-5']);
  
  const [volunteerApps, setVolunteerApps] = useState(() => {
    const saved = localStorage.getItem('gy_volunteer_apps');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEER_APPS;
  });

  const filteredUsers = registeredUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) || u.email.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesCampus = selectedCampusFilter === 'all' || u.campusId === selectedCampusFilter;
    return matchesSearch && matchesCampus;
  });

  const pendingRequests = requests.filter(
    (r) => selectedCampusFilter === 'all' || r.campusId === selectedCampusFilter
  );

  const handleToggleVerifyTutor = (tutorId, tutorName) => {
    if (verifiedTutorIds.includes(tutorId)) {
      setVerifiedTutorIds((prev) => prev.filter((id) => id !== tutorId));
      showToast(`Verification revoked for ${tutorName}.`, 'info');
    } else {
      setVerifiedTutorIds((prev) => [...prev, tutorId]);
      showToast(`✅ ${tutorName} is officially verified and certified for campus tutoring!`, 'success');
    }
  };

  const handleApproveVolunteer = (app) => {
    // Promote user if registered or add to staff
    updateUserRole(app.id, 'worker');
    setVolunteerApps((prev) => prev.filter((v) => v.id !== app.id));
    showToast(`🎉 ${app.name} has been approved as an active Youth Worker / Volunteer!`, 'success');
  };

  const handleDeleteUser = (userId, userName) => {
    if (userId === currentUser.id) {
      showToast('You cannot delete your own active Admin account.', 'error');
      return;
    }
    setRegisteredUsers((prev) => prev.filter((u) => u.id !== userId));
    showToast(`Account for ${userName} removed.`, 'info');
  };

  const handleToggleGospelShared = (bookingId) => {
    showToast(`🕊️ Gospel sharing milestone logged for session! Discipleship team notified.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Admin Header Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all ${
        isDark
          ? 'bg-slate-900 border-slate-800 text-white shadow-xl'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 via-pink-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className={`text-xl sm:text-2xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Ministry Command Center
              </h2>
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full border ${
                isDark ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-rose-100 text-rose-800 border-rose-200'
              }`}>
                Super Admin
              </span>
            </div>
            <p className={`text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Manage users, approve Youth Workers, verify peer tutors, and oversee campus outreach across Iloilo.
            </p>
          </div>
        </div>

        {/* Quick Add Person Action */}
        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto">
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 hover:scale-105 transition-all cursor-pointer w-full md:w-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Person / Staff</span>
          </button>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className={`p-4 sm:p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>People & Staff</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {registeredUsers.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Volunteer Apps</span>
            <HeartHandshake className="w-4 h-4 text-pink-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {volunteerApps.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Verified Tutors</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {tutors.length}
          </div>
        </div>

        <div className={`p-4 sm:p-5 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Life Group Queue</span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {lifeGroupRequests?.length || 0}
          </div>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className={`flex items-center gap-1.5 p-1 rounded-2xl border overflow-x-auto scrollbar-none ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
      }`}>
        <button
          onClick={() => setAdminTab('roles')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'roles'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          👥 People & Roles ({registeredUsers.length})
        </button>

        <button
          onClick={() => setAdminTab('volunteers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'volunteers'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🤝 Volunteer Workers ({volunteerApps.length})
        </button>

        <button
          onClick={() => setAdminTab('tutors')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'tutors'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          👨‍🏫 Verify Peer Tutors ({tutors.length})
        </button>

        <button
          onClick={() => setAdminTab('triage')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'triage'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          📢 Acads Triage ({requests.length})
        </button>

        <button
          onClick={() => setAdminTab('lg_requests')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'lg_requests'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🌱 Life Group Proposals ({lifeGroupRequests?.length || 0})
        </button>

        <button
          onClick={() => setAdminTab('gospel_sessions')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'gospel_sessions'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          ✝️ Gospel Sessions ({myBookings.length})
        </button>

        <button
          onClick={() => setAdminTab('prayers')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'prayers'
              ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md'
              : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-700 hover:text-slate-950 font-bold'
          }`}
        >
          🙏 Prayers ({prayers.length})
        </button>
      </div>

      {/* Tab 1: People & Roles Management */}
      {adminTab === 'roles' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search member by name or email..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Person</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm sm:text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {user.name}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        user.role === 'leader'
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
                          : user.role === 'worker'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                          : user.role === 'tutor'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                          : 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
                      }`}>
                        {user.role === 'worker' ? 'Youth Worker' : user.role === 'leader' ? 'Admin' : user.role}
                      </span>
                    </div>
                    <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {user.email} • <span className="font-bold">{user.campusName}</span>
                    </div>
                  </div>
                </div>

                {/* Role Switcher & Delete */}
                <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Change Role:</span>
                    <select
                      value={user.role}
                      onChange={(e) => updateUserRole(user.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                        isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="student">🎓 Student Member</option>
                      <option value="tutor">👨‍🏫 Volunteer Peer Tutor</option>
                      <option value="worker">✝️ Youth Worker / Missionary</option>
                      <option value="leader">🛡️ Ministry Admin</option>
                    </select>
                  </div>

                  <button
                    onClick={() => handleDeleteUser(user.id, user.name)}
                    className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                      isDark ? 'bg-slate-800 border-slate-700 text-rose-400 hover:bg-rose-950/60' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                    }`}
                    title="Remove Account"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Volunteer Youth Worker Applications */}
      {adminTab === 'volunteers' && (
        <div className="space-y-4">
          <div className={`p-4 rounded-2xl border text-xs ${
            isDark ? 'bg-indigo-950/30 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
          }`}>
            🤝 <strong>Ministry Servants Queue:</strong> College students and partners applying to serve as Life Group leaders, worship team members, camp counselors, or exam care outreach workers.
          </div>

          <div className="space-y-3">
            {volunteerApps.length > 0 ? (
              volunteerApps.map((app) => (
                <div
                  key={app.id}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {app.name}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 border border-pink-200 dark:border-pink-500/30">
                        {app.roleArea}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">({app.campusName})</span>
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Email: <strong>{app.email}</strong> • Mobile/Handle: <strong>{app.contact || 'Not provided'}</strong> • Year: {app.yearLevel}
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      🕒 Availability: {app.availability}
                    </div>

                    <p className={`text-xs italic p-2.5 rounded-xl border mt-1 ${
                      isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      "{app.bioNote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleApproveVolunteer(app)}
                      className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Approve as Youth Worker</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={`p-8 text-center rounded-3xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                No pending volunteer applications at this time.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Tutor Verification */}
      {adminTab === 'tutors' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {tutors.map((tutor) => {
              const isVerified = verifiedTutorIds.includes(tutor.id);
              return (
                <div
                  key={tutor.id}
                  className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <img src={tutor.avatar} alt={tutor.name} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/20" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {tutor.name}
                        </span>
                        {isVerified ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 flex items-center gap-1">
                            <Check className="w-3 h-3" /> Verified Tutor
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300">
                            Pending Review
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {tutor.role} • <span className="font-bold">{tutor.campusName}</span>
                      </div>
                      <div className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                        Teaches: {tutor.subjects.join(', ')}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleVerifyTutor(tutor.id, tutor.name)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      isVerified
                        ? isDark
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40'
                          : 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-rose-100 hover:text-rose-900'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>{isVerified ? '✓ Certified (Click to Revoke)' : 'Approve & Certify Tutor'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Request Triage */}
      {adminTab === 'triage' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className={`text-xs font-black uppercase tracking-widest ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Active Student Requests Needing Tutor Dispatch:
            </span>
            <select
              value={selectedCampusFilter}
              onChange={(e) => setSelectedCampusFilter(e.target.value)}
              className={`px-3 py-1.5 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((req) => (
              <div
                key={req.id}
                className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {req.subject}
                    </span>
                    <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-500/30 px-2.5 py-0.5 rounded-full">
                      {req.urgency}
                    </span>
                  </div>
                  <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    Student: <strong>{req.studentName}</strong> • {req.campusName} • {req.program}
                  </p>
                  <p className={`text-xs italic mt-1 p-2.5 rounded-xl border ${
                    isDark ? 'bg-slate-950/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}>
                    "{req.description}"
                  </p>
                </div>

                <button
                  onClick={() => claimRequest(req.id)}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg hover:scale-105 transition-all shrink-0 cursor-pointer"
                >
                  Assign Peer Tutor & Dispatch
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Life Group Proposals */}
      {adminTab === 'lg_requests' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {lifeGroupRequests && lifeGroupRequests.length > 0 ? (
              lifeGroupRequests.map((lgr) => (
                <div
                  key={lgr.id}
                  className={`p-5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {lgr.proposedTitle}
                      </span>
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        {lgr.campusName}
                      </span>
                    </div>

                    <div className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                      Proposed by: <strong>{lgr.requestedBy}</strong> ({lgr.contact}) • Target: <strong>{lgr.targetAudience}</strong>
                    </div>

                    <div className={`text-xs flex items-center gap-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>🕒 {lgr.preferredSchedule}</span>
                      <span>📍 {lgr.preferredLocation}</span>
                      <span>👥 {lgr.interestedCount}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => approveLifeGroupRequest(lgr.id, currentUser.name || 'Pastor Tim')}
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg hover:scale-105 transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Launch Group</span>
                  </button>
                </div>
              ))
            ) : (
              <div className={`p-8 text-center rounded-3xl border border-dashed text-xs ${
                isDark ? 'bg-slate-900/40 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                No pending life group proposals at this time.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Gospel Sessions */}
      {adminTab === 'gospel_sessions' && (
        <div className="space-y-3">
          {myBookings.map((bk) => (
            <div
              key={bk.id}
              className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {bk.subject}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 px-2 py-0.2 rounded-full">
                    {bk.status}
                  </span>
                </div>
                <p className={`text-xs mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Assigned Tutor: <strong>{bk.tutorName}</strong> • {bk.day} ({bk.time}) • {bk.mode}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleGospelShared(bk.id)}
                  className={`px-4 py-2 rounded-xl border font-black text-xs cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  }`}
                >
                  ✓ Mark Gospel Shared
                </button>
                <button
                  onClick={() => cancelBooking(bk.id)}
                  className={`p-2 rounded-xl border cursor-pointer ${
                    isDark ? 'bg-slate-800 border-slate-700 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-600'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 7: Prayer Moderation */}
      {adminTab === 'prayers' && (
        <div className="space-y-3">
          {prayers.map((prayer) => (
            <div
              key={prayer.id}
              className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-extrabold ${isDark ? 'text-white' : 'text-slate-900'}`}>{prayer.author}</span>
                  <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>({prayer.campusName})</span>
                  <span className="text-[10px] text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950/60 px-2 py-0.2 rounded-full">
                    {prayer.category}
                  </span>
                </div>
                <p className={`text-xs mt-1 italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{prayer.content}"
                </p>
              </div>

              <span className="text-xs font-black text-rose-600 dark:text-rose-400 shrink-0">
                ❤️ {prayer.prayedCount} praying
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add User Modal */}
      <AddUserModal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
      />
    </div>
  );
};
