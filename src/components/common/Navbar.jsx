import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Languages,
  BookOpen,
  Heart,
  Menu,
  X,
  Users,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  LogOut,
  User,
  HeartHandshake,
  Download,
  MessageSquare,
  Tent,
  MoreVertical,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { ProfileModal } from '../profile/ProfileModal';
import { MySessionsModal } from '../profile/MySessionsModal';
import { DbSchemaModal } from './DbSchemaModal';
import { AuthModal } from '../auth/AuthModal';
import { InstallModal } from './InstallModal';
import { CampusChatDrawer } from './CampusChatDrawer';
import { ConnectWorkerModal } from '../worker/ConnectWorkerModal';
import { AdminLoginModal } from '../admin/AdminLoginModal';
import { getTranslation } from '../../data/translations';

export const Navbar = () => {
  const {
    language,
    setLanguage,
    currentUser,
    activeTab,
    setActiveTab,
    isAppInstalled,
    theme,
    toggleTheme,
    logout
  } = useApp();

  const isHlg = language === 'hlg' || language === 'hil';
  const t = (key) => getTranslation(key, language);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showChatDrawer, setShowChatDrawer] = useState(false);
  const [showConnectWorkerModal, setShowConnectWorkerModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Desktop Sandwich Menu Dropdown State
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isDark = theme === 'dark';
  const isGuest = currentUser.role === 'guest' || !currentUser.email;
  const isLeader = currentUser.role === 'leader';
  const isWorker = currentUser.role === 'worker';
  const isTutor = currentUser.role === 'tutor';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDesktopMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    window.__openAdminLoginModal = () => setShowAdminLoginModal(true);
    return () => {
      window.__openAdminLoginModal = null;
    };
  }, []);

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setDesktopMenuOpen(false);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark ? 'bg-[#0c101d]/90 border-slate-800/80 text-white' : 'bg-white/90 border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* 1. BRAND LOGO */}
            <div
              className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 group-hover:rotate-3 transition-all">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`font-extrabold text-base sm:text-lg tracking-tight font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    GRACE YOUTH
                  </span>
                  <span className="hidden xl:inline-block px-2 py-0.2 text-[9px] font-black uppercase tracking-wider bg-pink-500/10 text-pink-500 rounded-full border border-pink-500/20">
                    Iloilo Campuses
                  </span>
                </div>
                <p className={`text-[10px] sm:text-[11px] hidden sm:block font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Peer Acads • Life Groups • Camps
                </p>
              </div>
            </div>

            {/* 2. DESKTOP CENTER NAVIGATION (Clean 5 Core Tabs) */}
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
                    ? t('nav_adminhub')
                    : isWorker
                    ? t('nav_workerhub')
                    : isTutor
                    ? t('nav_tutorhub')
                    : t('nav_myhub')}
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
                <span>{t('nav_acads')}</span>
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
                <span>{t('nav_groups')}</span>
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
                <span>{t('nav_camps')}</span>
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
                <span>{t('nav_prayers')}</span>
              </button>
            </nav>

            {/* 3. RIGHT SIDE CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* INSTALL APP BUTTON: Only shown in web browser if NOT installed yet */}
              {!isAppInstalled && (
                <button
                  onClick={() => setShowInstallModal(true)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border hover:scale-105 active:scale-95 ${
                    isDark
                      ? 'bg-gradient-to-r from-violet-600/20 to-pink-500/20 border-pink-500/30 text-pink-300 hover:bg-pink-500/30'
                      : 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100 shadow-xs'
                  }`}
                  title="Install Grace Youth App (PWA)"
                >
                  <Download className="w-3.5 h-3.5 text-pink-500 animate-bounce" />
                  <span className="hidden sm:inline">Install App</span>
                  <span className="sm:hidden">Install</span>
                </button>
              )}

              {/* USER AUTH / PROFILE CONTROLS */}
              {isGuest ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Create Account</span>
                    <span className="sm:hidden">Sign Up</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  {/* Logged in Profile Button */}
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className={`flex items-center gap-2 p-1.5 sm:pl-2 sm:pr-3 rounded-2xl border transition-all cursor-pointer ${
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

                  {/* 1-Tap Sign Out for Mobile/Clean Header */}
                  <button
                    onClick={logout}
                    className={`lg:hidden p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      isDark ? 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-rose-950/40' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                    }`}
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* 4. DESKTOP SANDWICH / MORE MENU (Holds Secondary Actions) */}
              <div className="hidden lg:relative lg:block" ref={menuRef}>
                <button
                  onClick={() => setDesktopMenuOpen(!desktopMenuOpen)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    desktopMenuOpen
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-transparent shadow-md'
                      : isDark ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                  title="More Tools & Menu"
                >
                  <Menu className="w-4 h-4" />
                  <span>Menu</span>
                  <ChevronDown className="w-3 h-3 opacity-70" />
                </button>

                {/* Desktop Sandwich Dropdown Card */}
                {desktopMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 p-3 rounded-2xl border shadow-2xl space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                    isDark ? 'bg-slate-900/95 border-slate-800 text-white backdrop-blur-xl' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
                  }`}>
                    {/* Live Campus Chat */}
                    <button
                      onClick={() => {
                        setShowChatDrawer(true);
                        setDesktopMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-indigo-300' : 'hover:bg-slate-100 text-indigo-700'
                      }`}
                    >
                      <MessageSquare className="w-4 h-4 text-indigo-500" />
                      <span>Campus Live Chat</span>
                    </button>

                    {/* Pastoral Care */}
                    <button
                      onClick={() => {
                        setShowConnectWorkerModal(true);
                        setDesktopMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isDark ? 'hover:bg-slate-800 text-teal-300' : 'hover:bg-slate-100 text-teal-800'
                      }`}
                    >
                      <HeartHandshake className="w-4 h-4 text-teal-500" />
                      <span>Pastoral Care & Prayer Call</span>
                    </button>

                    <div className="border-t border-slate-800/60 my-1" />

                    {/* Theme Toggle */}
                    <div className="flex items-center justify-between p-2 rounded-xl text-xs">
                      <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Theme Mode:</span>
                      <button
                        onClick={toggleTheme}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                          isDark ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
                        }`}
                      >
                        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                        <span>{isDark ? 'Light' : 'Dark'}</span>
                      </button>
                    </div>

                    {/* Language Toggle */}
                    <div className="flex items-center justify-between p-2 rounded-xl text-xs">
                      <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Language:</span>
                      <button
                        onClick={() => setLanguage(language === 'en' ? 'hlg' : 'en')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer ${
                          isDark ? 'bg-slate-800 border-slate-700 text-pink-400' : 'bg-slate-100 border-slate-200 text-pink-600'
                        }`}
                      >
                        <Languages className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Hiligaynon' : 'English'}</span>
                      </button>
                    </div>

                    <div className="border-t border-slate-800/60 my-1" />

                    {/* Admin Access Gate */}
                    <button
                      onClick={() => {
                        setShowAdminLoginModal(true);
                        setDesktopMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-[11px] font-bold cursor-pointer text-slate-400 hover:text-slate-200 ${
                        isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
                        <span>Ministry Admin Gate</span>
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500">Staff</span>
                    </button>

                    {/* Sign Out (if logged in) */}
                    {!isGuest && (
                      <button
                        onClick={() => {
                          logout();
                          setDesktopMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/40 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
      <MySessionsModal isOpen={showSessionsModal} onClose={() => setShowSessionsModal(false)} />
      <DbSchemaModal isOpen={showDbModal} onClose={() => setShowDbModal(false)} />
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode={authMode} />
      <InstallModal isOpen={showInstallModal} onClose={() => setShowInstallModal(false)} />
      <CampusChatDrawer isOpen={showChatDrawer} onClose={() => setShowChatDrawer(false)} />
      <ConnectWorkerModal isOpen={showConnectWorkerModal} onClose={() => setShowConnectWorkerModal(false)} />
      <AdminLoginModal isOpen={showAdminLoginModal} onClose={() => setShowAdminLoginModal(false)} />
    </>
  );
};
