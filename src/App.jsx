import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { TabNav } from './components/common/TabNav';
import { Toast } from './components/common/Toast';
import { InstallPWA } from './components/common/InstallPWA';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { DailyDevotional } from './components/dashboard/DailyDevotional';
import { QuickStats } from './components/dashboard/QuickStats';
import { CrisisBar } from './components/dashboard/CrisisBar';
import { TutorialHub } from './components/tutorials/TutorialHub';
import { BibleStudyHub } from './components/discipleship/BibleStudyHub';
import { PrayerWall } from './components/prayer/PrayerWall';
import { EventList } from './components/events/EventList';
import { ReviewerVault } from './components/tutorials/ReviewerVault';
import { FundraisingHub } from './components/giving/FundraisingHub';
import { StudentPortal } from './components/student/StudentPortal';
import { TutorPortal } from './components/tutor/TutorPortal';
import { YouthWorkerPortal } from './components/worker/YouthWorkerPortal';
import { AdminPortal } from './components/admin/AdminPortal';
import { Sparkles, BookOpen, School, ShieldCheck } from 'lucide-react';
import { CAMPUSES } from './data/campuses';

export const App = () => {
  const { activeTab, setActiveTab, selectedCampus, currentUser, theme } = useApp();
  const currentCampusObj = CAMPUSES.find((c) => c.id === selectedCampus);
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen flex flex-col justify-between pb-28 md:pb-12 subtle-grid selection:bg-pink-500 selection:text-white transition-colors duration-300 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full flex-1">
        {/* Selected Campus Badge Pill (on public views) */}
        {selectedCampus !== 'all' && activeTab !== 'portal' && (
          <div className={`mb-6 p-3.5 rounded-2xl flex items-center justify-between gap-3 text-xs sm:text-sm border transition-colors ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-xs'
          }`}>
            <div className="flex items-center gap-2 font-bold">
              <School className="w-4 h-4 text-pink-500 shrink-0" />
              <span>
                Filtering campus hub for: <strong className={isDark ? 'text-white' : 'text-slate-900'}>{currentCampusObj?.name}</strong>
              </span>
            </div>
            <button
              onClick={() => setActiveTab('tutorials')}
              className="text-xs font-black text-pink-500 hover:text-pink-400 shrink-0 cursor-pointer"
            >
              Explore Tutors &rarr;
            </button>
          </div>
        )}

        {/* 1. DEDICATED ROLE PORTALS */}
        {activeTab === 'portal' && (
          <div>
            {currentUser.role === 'leader' ? (
              <AdminPortal />
            ) : currentUser.role === 'worker' ? (
              <YouthWorkerPortal />
            ) : currentUser.role === 'tutor' ? (
              <TutorPortal />
            ) : (
              <StudentPortal />
            )}
          </div>
        )}

        {/* 2. ADMIN PORTAL DIRECT ROUTE */}
        {activeTab === 'admin' && <AdminPortal />}

        {/* 3. HOME PUBLIC FEED */}
        {activeTab === 'home' && (
          <div className="space-y-6">
            <HeroBanner />
            <QuickStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DailyDevotional />
              </div>
              <div>
                <CrisisBar />
              </div>
            </div>

            {/* Quick Preview of Tutorial Hub */}
            <div className={`pt-6 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`text-xl font-extrabold flex items-center gap-2 font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    <BookOpen className="w-5 h-5 text-amber-400" />
                    <span>Peer Tutors & Reviewers</span>
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Book free 1-on-1 sessions with verified upperclassmen before exam week.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('tutorials')}
                  className="text-xs font-black text-indigo-500 hover:text-indigo-400 cursor-pointer"
                >
                  View All &rarr;
                </button>
              </div>
              <TutorialHub />
            </div>
          </div>
        )}

        {/* 4. TUTORIALS TAB */}
        {activeTab === 'tutorials' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Peer Tutorials & Academic Care
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Connecting college students across Iloilo universities with free peer tutoring.
              </p>
            </div>
            <TutorialHub />
          </div>
        )}

        {/* 5. LIFE GROUPS TAB */}
        {activeTab === 'discipleship' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Campus Life Groups & Discipleship
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Grow in faith, make lasting college friendships, and find purpose in Christ.
              </p>
            </div>
            <BibleStudyHub />
          </div>
        )}

        {/* 6. FUNDRAISING & YOUTH CAMPS TAB */}
        {activeTab === 'giving' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Fundraising, Youth Camps & Fellowships
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Seed donations to sponsor students for youth camps, exam survival outreach, and campus worship nights.
              </p>
            </div>
            <FundraisingHub />
          </div>
        )}

        {/* 7. PRAYER WALL TAB */}
        {activeTab === 'prayer' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                24/7 Campus Prayer & Praise Wall
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Stand in the gap for students in ISUFST, UPV, CPU, WVSU, ISAT-U, and USA.
              </p>
            </div>
            <PrayerWall />
          </div>
        )}

        {/* 8. EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Campus Fellowship & Gatherings
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Midterm chill nights, beach prayer walks, and youth discipleship conferences.
              </p>
            </div>
            <EventList />
          </div>
        )}

        {/* 9. REVIEWERS TAB */}
        {activeTab === 'reviewers' && (
          <div className="space-y-4">
            <div className="mb-2">
              <h1 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Free Academic Reviewer Vault
              </h1>
              <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                High-yield formula cheatsheets, mock problem sets, and review outlines.
              </p>
            </div>
            <ReviewerVault />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t py-8 sm:py-12 mt-12 transition-colors ${
        isDark ? 'border-slate-800/80 bg-[#0c101d] text-slate-400 text-xs' : 'border-slate-200 bg-white text-slate-600 text-xs shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                </div>
                <span className={`font-extrabold text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  GRACE YOUTH CAMPUS MINISTRY
                </span>
              </div>
              <p className="leading-relaxed max-w-md">
                Empowering college students across Iloilo to excel in academics and thrive in faith. 100% free ministry service.
              </p>
              <div className="font-mono text-[11px] opacity-75">
                Iloilo Province & City • ISUFST • UPV • CPU • WVSU • ISAT-U • USA
              </div>
            </div>

            <div>
              <h5 className={`font-black uppercase tracking-wider mb-3 font-heading ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                Campuses Served
              </h5>
              <ul className="space-y-1 opacity-80">
                <li>• ISUFST (Barotac Nuevo & Tiwi)</li>
                <li>• UP Visayas (Miagao & Iloilo)</li>
                <li>• Central Philippine University</li>
                <li>• West Visayas State University</li>
                <li>• ISAT-U & San Agustin</li>
              </ul>
            </div>

            <div>
              <h5 className={`font-black uppercase tracking-wider mb-3 font-heading ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                Get Involved & Connect
              </h5>
              <p className="mb-2 opacity-80">
                Free Peer Tutoring • Weekly Life Groups • Annual Youth Camps • 24/7 Prayer Wall
              </p>
              <div className="font-bold text-pink-500">
                campus@graceyouth.ph
              </div>
            </div>
          </div>

          <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] ${
            isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'
          }`}>
            <div>© 2026 Grace Youth Campus Ministry. All ministry services are free.</div>
            <div>Soli Deo Gloria ✝</div>
          </div>
        </div>
      </footer>

      {/* Mobile Tab Navigation */}
      <TabNav />

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};
export default App;
