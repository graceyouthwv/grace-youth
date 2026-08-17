import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone, CheckCircle2, Share, PlusSquare } from 'lucide-react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';

export const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const { isAppInstalled, setIsAppInstalled, showToast } = useApp();

  useEffect(() => {
    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Chrome / Android / Desktop)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        showToast('🚀 Installing Grace Youth App...', 'success');
        setIsAppInstalled(true);
        localStorage.setItem('gy_pwa_installed', 'true');
      }
      setDeferredPrompt(null);
    } else {
      setShowInstructions(true);
    }
  };

  // If app is already installed, completely hide
  if (isAppInstalled) {
    return null;
  }

  return (
    <>
      {/* PWA Install Instructions Modal */}
      <Modal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
        title="📲 Install Grace Youth on Your Device"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0">
              GY
            </div>
            <div>
              <h4 className="font-bold text-sm text-white">Grace Youth App</h4>
              <p className="text-xs text-slate-400">Zero download size • Instant loading • Works offline</p>
            </div>
          </div>

          {isIOS ? (
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-pink-400" />
                <span>On iPhone / iPad (Safari):</span>
              </p>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-bold flex items-center justify-center shrink-0">1</span>
                <span>Tap the <Share className="w-3.5 h-3.5 inline text-sky-400 mx-1" /> <strong>Share</strong> button at bottom of Safari.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-bold flex items-center justify-center shrink-0">2</span>
                <span>Scroll down and tap <PlusSquare className="w-3.5 h-3.5 inline text-emerald-400 mx-1" /> <strong>"Add to Home Screen"</strong>.</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-indigo-400 font-bold flex items-center justify-center shrink-0">3</span>
                <span>Tap <strong>Add</strong> in top right corner. Done! 📱</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>On Android / Chrome / Desktop:</span>
              </p>
              <p>Tap the 3 dots menu in your browser $\rightarrow$ Select <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.</p>
              <button
                onClick={handleInstallClick}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                Trigger Direct Browser Install Prompt
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
