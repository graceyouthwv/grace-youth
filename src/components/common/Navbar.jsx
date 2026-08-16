import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Languages, Calendar, BookOpen, Heart, Menu, X, ShieldCheck, Database, Users, Sun, Moon, LogIn, UserPlus, LogOut, User, HeartHandshake, GraduationCap, Tent, Download, Smartphone } from 'lucide-react';
import { ProfileModal } from '../profile/ProfileModal';
import { MySessionsModal } from '../profile/MySessionsModal';
import { DbSchemaModal } from './DbSchemaModal';
import { AuthModal } from '../auth/AuthModal';
import { InstallModal } from './InstallModal';

export const Navbar = () => {
  const { language, setLanguage, currentUser, myBookings, activeTab, setActiveTab, theme, toggleTheme, logout } = useApp();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const isGuest = currentUser.role === 'guest' || !currentUser.email;
  const isLeader = currentUser.role === 'leader';
  const isWorker = currentUser.role === 'worker';
  const isTutor = currentUser.role === 'tutor';

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0c101d]/90 border-slate-800/80 text-white' : 'bg-white/90 border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo & Name */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`font-extrabold text-lg sm:text-xl tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    GRACE YOUTH
                  </span>
                  <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-violet-500/20 to-pink-500/20 text-pink-500 rounded-full border border-pink-500/30">
                    Iloilo Province & City
                  </span>
                </div>
                <p className={`text-[11px] hidden sm:block font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Peer Acads • Life Groups • Camps & Sponsorship
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className={`hidden lg:flex items-center gap-1 p-1 rounded-2xl border transition-colors ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Feed
              </button>

              {/* Dynamic Role Portal Tab */}
              {!isGuest && (
                <button
                  onClick={() => setActiveTab('portal')}
                  className={`px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'portal'
                      ? 'bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md'
                      : isWorker
                      ? 'text-emerald-400 hover:text-emerald-300 font-extrabold'
                      : isTutor
                      ? 'text-amber-400 hover:text-amber-300 font-extrabold'
                      : isLeader
                      ? 'text-rose-400 hover:text-rose-300 font-extrabold'
                      : 'text-indigo-400 hover:text-indigo-300 font-extrabold'
                  }`}
                >
                  {isLeader
                    ? '🛡️ Admin Center'
                    : isWorker
                    ? '✝️ Youth Worker Console'
                    : isTutor
                    ? '👨‍🏫 Tutor Portal'
                    : '🎓 My Student Hub'}
                </button>
              )}

              <button
                onClick={() => setActiveTab('tutorials')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tutorials'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Acads & Tutors</span>
              </button>
              <button
                onClick={() => setActiveTab('discipleship')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'discipleship'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>Life Groups</span>
              </button>
              <button
                onClick={() => setActiveTab('giving')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'giving'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-pink-500/20'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tent className="w-3.5 h-3.5 text-pink-400" />
                <span>Camps & Sponsorship</span>
              </button>
              <button
                onClick={() => setActiveTab('prayer')}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'prayer'
                    ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span>Prayers</span>
              </button>
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* 📲 TOP INSTALL APP / DOWNLOAD BUTTON */}
              <button
                onClick={() => setShowInstallModal(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-r from-violet-600/30 to-pink-500/30 border-pink-500/40 text-pink-300 hover:bg-pink-500/40'
                    : 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 shadow-xs'
                }`}
                title="Install Grace Youth App (PWA)"
              >
                <Download className="w-3.5 h-3.5 text-pink-500 animate-bounce" />
                <span className="hidden sm:inline">Install App</span>
                <span className="sm:hidden">Install</span>
              </button>

              {/* If Guest: Show Sign In & Create Account */}
              {isGuest ? (
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              ) : (
                /* If Logged In: Show Profile Button */
                <button
                  onClick={() => setShowProfileModal(true)}
                  className={`flex items-center gap-2 p-1 pl-2 pr-2.5 rounded-2xl border transition-all cursor-pointer ${
                    isDark ? 'bg-slate-900 border-slate-800 hover:border-pink-500/40' : 'bg-slate-100 border-slate-200 hover:border-indigo-400'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-xl object-cover ring-2 ring-pink-500/40"
                    />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-slate-900" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className={`text-xs font-extrabold leading-none ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {currentUser.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-pink-500 font-bold capitalize">
                      {currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role}
                    </div>
                  </div>
                </button>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                    : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200'
                }`}
                title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'hlg' : 'en')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-extrabold transition-colors cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                }`}
              >
                <Languages className="w-3.5 h-3.5 text-pink-500" />
                <span>{language === 'en' ? 'EN' : 'HLG'}</span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 pt-3 pb-5 space-y-2 shadow-2xl ${
            isDark ? 'border-slate-800 bg-[#0c101d]' : 'border-slate-200 bg-white'
          }`}>
            {/* Mobile Install App Button */}
            <button
              onClick={() => {
                setShowInstallModal(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg mb-2"
            >
              <Download className="w-4 h-4" />
              <span>📲 Install Grace Youth App on Phone</span>
            </button>

            {isGuest ? (
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
                <button
                  onClick={() => handleOpenAuth('login')}
                  className="py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('register')}
                  className="py-2.5 rounded-xl bg-indigo-600 text-white font-black text-xs"
                >
                  Create Account
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveTab('portal');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-violet-600 to-pink-500 text-white flex items-center justify-between"
              >
                <span>
                  {isLeader
                    ? '🛡️ Open Admin Center'
                    : isWorker
                    ? '✝️ Open Youth Worker Console'
                    : isTutor
                    ? '👨‍🏫 Open Tutor Portal'
                    : '🎓 Open Student Hub'}
                </span>
                <span>&rarr;</span>
              </button>
            )}

            <button
              onClick={() => {
                setActiveTab('home');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'home' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              🔥 Public Feed & Devotional
            </button>
            <button
              onClick={() => {
                setActiveTab('tutorials');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'tutorials' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              📚 Peer Tutorials & Reviewers
            </button>
            <button
              onClick={() => {
                setActiveTab('discipleship');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'discipleship' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              🌱 Life Groups & Discipleship
            </button>
            <button
              onClick={() => {
                setActiveTab('giving');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'giving' ? 'bg-pink-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              🎪 Youth Camps & Sponsorship
            </button>
            <button
              onClick={() => {
                setActiveTab('prayer');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold ${
                activeTab === 'prayer' ? 'bg-indigo-600 text-white' : isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              🙏 Prayer Wall
            </button>
          </div>
        )}
      </header>

      {/* Modals */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <MySessionsModal isOpen={showSessionsModal} onClose={() => setShowSessionsModal(false)} />
      <DbSchemaModal isOpen={showDbModal} onClose={() => setShowDbModal(false)} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
      <InstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
    </>
  );
};
