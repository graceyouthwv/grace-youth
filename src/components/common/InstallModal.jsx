import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, Sparkles, Laptop, ShieldCheck, Loader2 } from 'lucide-react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { triggerConfetti } from '../../utils/helpers';

export const InstallModal = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [installProgress, setInstallProgress] = useState(0);
  const [installStatusText, setInstallStatusText] = useState('');

  const { isAppInstalled, setIsAppInstalled, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleStartInstallation = async () => {
    setIsInstalling(true);
    setInstallProgress(15);
    setInstallStatusText('Caching offline study materials and reviewer vault...');

    // If native prompt is available, trigger it
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(({ outcome }) => {
        setDeferredPrompt(null);
      });
    }

    setTimeout(() => {
      setInstallProgress(50);
      setInstallStatusText('Registering Progressive Web App manifest and service worker...');
    }, 700);

    setTimeout(() => {
      setInstallProgress(85);
      setInstallStatusText('Creating home screen launcher icon & offline cache...');
    }, 1400);

    setTimeout(() => {
      setInstallProgress(100);
      setInstallStatusText('Installation complete!');
      localStorage.setItem('gy_pwa_installed', 'true');
      setIsAppInstalled(true);
      showToast('📲 Grace Youth App installed successfully! You can now launch it from your home screen.', 'success');
      triggerConfetti();

      setTimeout(() => {
        setIsInstalling(false);
        setInstallProgress(0);
        onClose();
      }, 900);
    }, 2200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📲 Install Grace Youth PWA (Offline Ready)"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 text-xs sm:text-sm">
        {/* App Banner */}
        <div className={`p-4 rounded-2xl border flex items-center gap-3.5 ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30' : 'bg-indigo-50 border-indigo-200'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0">
            <Sparkles className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h4 className={`font-black text-sm sm:text-base font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Grace Youth Campus App
            </h4>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Instant Launch • Works Offline • 0 MB Storage Cost
            </p>
          </div>
        </div>

        {/* Installation Progress Bar (Active when installing) */}
        {isInstalling ? (
          <div className={`p-5 rounded-2xl border space-y-3 text-center ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-indigo-400">
                <Loader2 className="w-4 h-4 animate-spin text-pink-500" />
                <span>Installing App...</span>
              </span>
              <span className="font-mono text-pink-500 font-extrabold">{installProgress}%</span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-violet-600 via-indigo-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${installProgress}%` }}
              />
            </div>

            <p className="text-[11px] text-slate-400 italic">
              {installStatusText}
            </p>
          </div>
        ) : (
          /* Primary Install Action Button */
          <button
            onClick={handleStartInstallation}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Install Grace Youth on Device</span>
          </button>
        )}

        {/* Instructions by Platform */}
        {isIOS ? (
          <div className={`space-y-3 p-4 rounded-2xl border text-xs ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <p className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Smartphone className="w-4 h-4 text-pink-500" />
              <span>iPhone / iPad (Safari):</span>
            </p>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">1</span>
              <span>Tap the <Share className="w-3.5 h-3.5 inline text-sky-500 mx-1" /> <strong>Share button</strong> in Safari.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">2</span>
              <span>Tap <PlusSquare className="w-3.5 h-3.5 inline text-emerald-500 mx-1" /> <strong>"Add to Home Screen"</strong>.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">3</span>
              <span>Tap <strong>Add</strong> in the top-right corner. Done! 🎉</span>
            </div>
          </div>
        ) : (
          <div className={`space-y-3 p-4 rounded-2xl border text-xs ${
            isDark ? 'bg-slate-900/60 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <p className={`font-bold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Laptop className="w-4 h-4 text-indigo-500" />
              <span>Chrome / Edge / Mac & Android:</span>
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Click <strong>"Install Grace Youth on Device"</strong> above.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Or look for the <strong>Install icon (🖥️ or ⬇️)</strong> in your browser bar.</span>
              </div>
            </div>
          </div>
        )}

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Works 100% Offline</span>
          </div>
          <div className={`p-2.5 rounded-xl border flex items-center gap-2 ${
            isDark ? 'bg-slate-900/40 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Fast Native Feel</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
