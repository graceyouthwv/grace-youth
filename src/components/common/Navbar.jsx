import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
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
  ShieldCheck,
  ChevronDown,
  Database,
  Calendar
} from 'lucide-react';
import { ProfileModal } from '../profile/ProfileModal';
import { MySessionsModal } from '../profile/MySessionsModal';
import { DbSchemaModal } from './DbSchemaModal';
import { AuthModal } from '../auth/AuthModal';
import { InstallModal } from './InstallModal';
import { ConnectWorkerModal } from '../worker/ConnectWorkerModal';
import { AdminLoginModal } from '../admin/AdminLoginModal';
import { getTranslation } from '../../data/translations';

export const Navbar = () => {
  const {
    language,
    currentUser,
    activeTab,
    setActiveTab,
    isAppInstalled,
    theme,
    toggleTheme,
    logout
  } = useApp();

  const t = (key) => getTranslation(key, language);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showDbModal, setShowDbModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showConnectWorkerModal, setShowConnectWorkerModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Profile / More Dropdown State
  const [menuOpen, setMenuOpen] = useState(false);
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
        setMenuOpen(false);
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
    setMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-200 bg-white/90 dark:bg-[#0b0f19]/90 border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* 1. BRAND LOGO */}
            <div
              className="flex items-center gap-3 cursor-pointer group shrink-0"
              onClick={() => setActiveTab('home')}
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base sm:text-lg tracking-tight font-heading text-slate-900 dark:text-white">
                    GRACE YOUTH
                  </span>
                  <span className="hidden xl:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-800">
                    Collegiate
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                  Academics • Life Groups • Camps
                </p>
              </div>
            </div>

            {/* 2. DESKTOP CENTER NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border bg-slate-100/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80">
              <button
                onClick={() => setActiveTab('home')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'home'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Feed
              </button>

              {/* Dynamic Role Portal Tab */}
              {!isGuest && (
                <button
                  onClick={() => setActiveTab('portal')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'portal'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-extrabold'
                  }`}
                >
                  {isLeader
                    ? t('nav_adminhub') || 'Admin Command'
                    : isWorker
                    ? t('nav_workerhub') || 'Worker Console'
                    : isTutor
                    ? t('nav_tutorhub') || 'Tutor Portal'
                    : t('nav_myhub') || 'My Student Hub'}
                </button>
              )}

              <button
                onClick={() => setActiveTab('tutorials')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'tutorials'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t('nav_acads') || 'Peer Acads'}</span>
              </button>

              <button
                onClick={() => setActiveTab('discipleship')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'discipleship'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>{t('nav_groups') || 'Life Groups'}</span>
              </button>

              <button
                onClick={() => setActiveTab('giving')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'giving'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Tent className="w-3.5 h-3.5" />
                <span>{t('nav_camps') || 'Camps & Events'}</span>
              </button>

              <button
                onClick={() => setActiveTab('partners')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'partners'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{t('nav_partners') || 'Partners'}</span>
              </button>
            </nav>

            {/* 3. RIGHT SIDE CONTROLS */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Dark/Light Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer shadow-2xs"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Install PWA Button (if not installed) */}
              {!isAppInstalled && (
                <button
                  onClick={() => setShowInstallModal(true)}
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer shadow-2xs"
                  title="Install App (PWA)"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Install</span>
                </button>
              )}

              {/* USER AUTH / PROFILE BUTTON */}
              {isGuest ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAuth('login')}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleOpenAuth('register')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs hover:shadow-sm transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 p-1.5 pr-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer shadow-2xs"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                    />
                    <span className="text-xs font-bold text-slate-900 dark:text-white max-w-[90px] truncate hidden sm:inline-block">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* Dropdown Menu */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-2 w-56 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-xs font-semibold">
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <div className="font-bold text-slate-900 dark:text-white truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 capitalize">
                          {currentUser.role === 'worker' ? 'Youth Worker' : currentUser.role}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setShowProfileModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <User className="w-4 h-4 text-indigo-500" />
                        <span>My Profile & Picture</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowSessionsModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Calendar className="w-4 h-4 text-emerald-500" />
                        <span>My Booked Sessions</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowConnectWorkerModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Pastoral Care & Counseling</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowDbModal(true);
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <Database className="w-4 h-4 text-amber-500" />
                        <span>Supabase Database Setup</span>
                      </button>

                      <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <MySessionsModal
        isOpen={showSessionsModal}
        onClose={() => setShowSessionsModal(false)}
      />

      <DbSchemaModal
        isOpen={showDbModal}
        onClose={() => setShowDbModal(false)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />

      <InstallModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
      />

      <ConnectWorkerModal
        isOpen={showConnectWorkerModal}
        onClose={() => setShowConnectWorkerModal(false)}
      />

      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
      />
    </>
  );
};
export default Navbar;
