import React, { useState, useEffect } from 'react';
import { Download, Smartphone, Share, PlusSquare, CheckCircle2, Sparkles, Laptop, ShieldCheck } from 'lucide-react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';

export const InstallModal = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const { showToast, theme } = useApp();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      showToast('🎉 Grace Youth App successfully installed on your device!', 'success');
      onClose();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [showToast, onClose]);

  const handleTriggerNativeInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('🚀 Installing Grace Youth App...', 'success');
      }
      setDeferredPrompt(null);
      onClose();
    } else {
      showToast('📲 Follow the quick steps below for your browser/device!', 'info');
    }
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
              Instant Launch • Works Offline • 0 MB App Store Size
            </p>
          </div>
        </div>

        {/* Direct One-Click Install Button if supported */}
        {deferredPrompt && (
          <button
            onClick={handleTriggerNativeInstall}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>1-Tap Install on Device</span>
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
              <span>Tap the <Share className="w-3.5 h-3.5 inline text-sky-500 mx-1" /> <strong>Share button</strong> at the bottom of Safari.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">2</span>
              <span>Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-emerald-500 mx-1" /> <strong>"Add to Home Screen"</strong>.</span>
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
              <span>Chrome / Edge / Mac Desktop & Android:</span>
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Look for the <strong>Install App icon (🖥️ or ⬇️)</strong> inside your browser's address bar.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Click <strong>"Install"</strong> to add Grace Youth directly to your Mac Dock or Home Screen!</span>
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
