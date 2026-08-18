import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Brain,
  BookOpen,
  Camera,
  GraduationCap,
  Calculator,
  LayoutDashboard,
  Zap,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Eye,
  Clock,
  MapPin,
  Bot
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [previewModalImg, setPreviewModalImg] = useState(null);

  const [studentForm, setStudentForm] = useState({
    studentName: '',
    email: '',
    campus: 'UP Visayas',
    program: 'BS Biology',
    studentLevel: 'Undergraduate (Bachelor Degree)',
    planType: 'Monthly Student Pass (₱149/mo)'
  });

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentForm.studentName.trim() || !studentForm.email.trim()) {
      showToast('Please provide your name and student email.', 'error');
      return;
    }
    showToast(`✓ Early Student Access registered for ${studentForm.studentName}! SmartPath Technologies will send your activation link.`, 'success');
    setShowSubscriptionModal(false);
    setStudentForm({
      studentName: '',
      email: '',
      campus: 'UP Visayas',
      program: 'BS Biology',
      studentLevel: 'Undergraduate (Bachelor Degree)',
      planType: 'Monthly Student Pass (₱149/mo)'
    });
  };

  const PRODUCT_SCREENSHOTS = [
    {
      id: 'dashboard',
      tabName: 'Dashboard & Schedule',
      icon: LayoutDashboard,
      title: 'Personalized Daily Schedule & Academic Cockpit',
      subtitle: 'Tracks active class countdowns, daily baon, cumulative GWA, and urgent assignment deadlines.',
      tag: 'Student Home',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-4 font-sans border border-slate-800 text-xs">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">TUESDAY, FEBRUARY 2026</span>
              <h3 className="text-lg font-black font-heading text-white">Good morning, Bea 👋</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono font-bold text-[11px] border border-emerald-500/30">
                1.38 GWA (Magna Cum Laude)
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-indigo-500/20 text-indigo-400 font-mono font-bold text-[11px] border border-indigo-500/30">
                ₱250 Baon
              </span>
            </div>
          </div>

          {/* Active Class Hero */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Class in Session
              </span>
              <div className="text-sm font-black text-white">BIO 120 • Genetics & Molecular Biology</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-emerald-400" /> 10:00 AM - 11:30 AM</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-emerald-400" /> CAS Room 204 • Prof. Santos</span>
              </div>
            </div>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs">
              Record Trans
            </span>
          </div>

          {/* Grid Tasks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Upcoming Exam Tasks</span>
              <div className="space-y-1 text-[11px]">
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>Organic Chem Lab Report</span>
                  <span className="text-amber-400 font-mono font-bold">Tomorrow</span>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>Integral Calculus Problem Set #4</span>
                  <span className="text-slate-400 font-mono">Friday</span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Quick Actions</span>
              <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-bold">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  📸 Smart Camera
                </div>
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  🧠 Socratic Tutor
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ai-studio',
      tabName: 'AI Study Studio',
      icon: Brain,
      title: 'Metacognitive Socratic Dialogue Studio',
      subtitle: 'Step-by-step problem solver with active recall drills, final answer takeaways, and exam pro-tips.',
      tag: 'AI Tutor Copilot',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 font-sans border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-indigo-400 font-bold">
            <span className="flex items-center gap-1.5"><Bot className="w-4 h-4" /> SmartPath Socratic Assistant</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/20 border border-indigo-500/30">PRC & Exam Aligned</span>
          </div>

          <div className="p-3 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-indigo-200">
            <strong>Student:</strong> "Explain why SN2 reactions cause stereochemical inversion with an example."
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[12px] leading-relaxed text-slate-200">
            <div className="font-bold text-indigo-400 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Metacognitive Socratic Breakdown:</span>
            </div>
            <p>
              <strong>1. Backside Attack:</strong> The nucleophile approaches the carbon center from 180° opposite the leaving group to avoid electron repulsion.
            </p>
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
              <div className="font-bold text-emerald-400 text-xs">🎯 Final Answer & Takeaway:</div>
              <div>• <strong>Walden Inversion:</strong> A chiral (R)-substrate flips into (S) configuration like an umbrella blown inside-out.</div>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-[11px]">
              ⭐ <strong>Exam Pro-Tip:</strong> Primary alkyl halides react fastest via SN2 due to low steric hindrance.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'vault',
      tabName: 'Note Vault & Trans',
      icon: BookOpen,
      title: 'Automated Lecture Transcriptions & High-Yield Vault',
      subtitle: 'Converts lecture audio into structured high-yield summaries, key equations, and Anki-ready flashcards.',
      tag: 'Lecture Trans',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 font-sans border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-300">Generated Lecture Transes & Audio Sync</span>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
              3 Decks Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-indigo-400">BIO 101 • 45 mins audio</span>
                <span className="text-[10px] text-emerald-400">18 Flashcards</span>
              </div>
              <h4 className="font-bold text-sm text-white">Mitochondrial ATP Synthesis</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                Chemiosmotic proton motive force, ATP synthase complex, and oxidative phosphorylation yields.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-indigo-400">
                <span>View Summary Trans</span>
                <span>Export Anki →</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black uppercase text-indigo-400">NURS 204 • 1h 10m audio</span>
                <span className="text-[10px] text-emerald-400">30 Flashcards</span>
              </div>
              <h4 className="font-bold text-sm text-white">Pharmacology: Antihypertensives</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                ACE Inhibitors, ARBs, Beta-blockers, mechanism of action, side effects, and nursing alerts.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-indigo-400">
                <span>View Summary Trans</span>
                <span>Export Anki →</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'camera',
      tabName: 'Smart Camera OCR',
      icon: Camera,
      title: 'Photo-to-Study Notes & LaTeX Synthesizer',
      subtitle: 'Snap blackboard math, chemical mechanisms, or textbook pages to generate clean digitized study sheets.',
      tag: 'Blackboard OCR',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 font-sans border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-300">Live OCR LaTeX Synthesis</span>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
              Chalkboard Capture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-amber-400">Raw Blackboard Snap</span>
              <div className="aspect-video rounded-lg bg-black/60 border border-slate-800 flex items-center justify-center text-center p-2 text-slate-400 font-mono text-[11px]">
                📸 [Chalkboard image: Laplace Transform & Diff Eq]
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
              <span className="text-[10px] font-black uppercase text-emerald-400">✨ Synthesized LaTeX Card</span>
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 font-mono text-[11px] text-emerald-300 space-y-1">
                <div>L&#123;e^(at)&#125; = 1 / (s - a), s &gt; a</div>
                <div>L&#123;sin(wt)&#125; = w / (s^2 + w^2)</div>
                <div className="text-[10px] font-sans text-slate-300 pt-1">
                  • 1-click exported to printable flashcards!
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'thesis',
      tabName: 'Thesis & Defense',
      icon: GraduationCap,
      title: 'Undergraduate & Graduate Thesis Defense Studio',
      subtitle: 'Literature review (RRL) matrix synthesizer across Scopus/PubMed and mock panel defense simulator.',
      tag: 'Research Studio',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 font-sans border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-300">Chapter 2: Review of Related Literature (RRL) Matrix</span>
            <span className="text-[10px] text-violet-400 font-bold bg-violet-500/10 px-2 py-0.5 rounded-md border border-violet-500/30">
              14 Papers Synthesized
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-violet-300 text-xs">Synthesis Matrix</strong>
              <p className="text-[11px] text-slate-400">Auto-correlated 14 Scopus papers comparing Bloom's vs Metacognition.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-violet-300 text-xs">APA 7th Citations</strong>
              <p className="text-[11px] text-slate-400">1-click formatted in-text citations and reference list export.</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <strong className="text-violet-300 text-xs">Mock Defense</strong>
              <p className="text-[11px] text-slate-400">Simulates panel defense questions from tough research panelists.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'calculator',
      tabName: 'GWA & Exam Target',
      icon: Calculator,
      title: 'Collegiate GWA & Exam Target Planner',
      subtitle: 'Latin Honors standing tracker, target score planner for finals, and KKB baon expense tracker.',
      tag: 'GWA Planner',
      renderUI: (
        <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-3 font-sans border border-slate-800 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-bold text-slate-300">Cumulative GWA & Latin Honors Standing</span>
            <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
              Semester 2
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-black uppercase text-slate-400">Cumulative GWA</div>
              <div className="text-xl font-black text-emerald-400 font-heading">1.38</div>
              <div className="text-[10px] text-emerald-400 font-bold">★ Magna Cum Laude Standing</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-black uppercase text-slate-400">Enrolled Units</div>
              <div className="text-xl font-black text-indigo-400 font-heading">21.0 Units</div>
              <div className="text-[10px] text-slate-400">7 Major Subjects</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[10px] font-black uppercase text-slate-400">Finals Target</div>
              <div className="text-xl font-black text-amber-400 font-heading">88%</div>
              <div className="text-[10px] text-slate-400">Needed for Flat 1.25</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentScreenshot = PRODUCT_SCREENSHOTS[activeScreenshotIdx];

  return (
    <div className="space-y-4 animate-tab-in pb-12">
      {/* 1. COMPACT MINISTRY DEDICATION BANNER */}
      <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
        isDark
          ? 'bg-indigo-950/40 border-indigo-500/30 text-white'
          : 'bg-indigo-50/80 border-indigo-200 text-indigo-950 shadow-xs'
      }`}>
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-xl bg-amber-400/20 text-amber-400 font-bold shrink-0">
            <Sparkles className="w-4 h-4" />
          </span>
          <p className="text-xs sm:text-sm italic font-medium leading-snug">
            “Our ministry partner, <strong className="text-indigo-600 dark:text-amber-300 font-black">SmartPath Technologies</strong>, is wholeheartedly committed to support the campus ministry across Western Visayas for the Glory of God.”
          </p>
        </div>

        <a
          href="https://smartpath.tech"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1.5 border transition-all ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-950'
          }`}
        >
          <span>smartpath.tech</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* 2. PRODUCT HEADER + IMMEDIATE ACTION CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30">
              Student Software App
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-300 mt-0.5">
            ✨ “An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students.”
          </p>
        </div>

        <button
          onClick={() => setShowSubscriptionModal(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
          <span>Get Student Access →</span>
        </button>
      </div>

      {/* 3. PRODUCT VIDEO SHOWCASE WALKTHROUGH */}
      <div className={`p-4 sm:p-5 rounded-3xl border overflow-hidden relative shadow-lg ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-bold text-slate-400 ml-2">🎬 SmartPath College™ • Student App Video Walkthrough</span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
            HD 1080p • 03:45
          </span>
        </div>

        {/* 16:9 Video Demo Player Box */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80"
            alt="SmartPath College Video Demo"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

          <div className="relative z-10 text-center max-w-lg px-4 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/70 backdrop-blur-md text-white text-[11px] font-bold border border-indigo-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Student Software Demo Reel</span>
            </div>

            <h3 className="text-base sm:text-xl font-black text-white font-heading">
              SmartPath College™ in Action
            </h3>
            <p className="text-xs text-slate-300">
              See how undergraduate & graduate students use the AI Metacognitive Copilot, audio trans vault, and GWA target calculator.
            </p>

            {/* Play Button */}
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                {isPlayingVideo ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Pause Demo</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
                    <span>Watch Video Demo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Player controls */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 to-transparent flex items-center justify-between text-white text-xs z-20">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="p-1 rounded bg-white/20 hover:bg-white/30 cursor-pointer"
              >
                {isPlayingVideo ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-white" />}
              </button>
              <span className="font-mono text-[10px] opacity-80">
                {isPlayingVideo ? '01:14' : '00:00'} / 03:45
              </span>
              <div className="hidden sm:block w-36 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                <div className={`h-full bg-amber-400 rounded-full ${isPlayingVideo ? 'w-1/3 animate-pulse' : 'w-0'}`} />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className="p-1 rounded bg-white/20 hover:bg-white/30 cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PRODUCT SCREENSHOTS GALLERY */}
      <div className={`p-4 sm:p-6 rounded-3xl border space-y-4 shadow-lg ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/40">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">📸 Product Screenshots</span>
            <h3 className={`text-base sm:text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™ Screen Gallery
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Click tabs to inspect each app screen:
          </span>
        </div>

        {/* Screenshot Category Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {PRODUCT_SCREENSHOTS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = idx === activeScreenshotIdx;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScreenshotIdx(idx)}
                className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 text-xs ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md'
                    : isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.tabName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Screenshot Display Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className={`text-sm font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {currentScreenshot.title}
              </h4>
              <p className="text-xs text-slate-400">
                {currentScreenshot.subtitle}
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {currentScreenshot.tag}
            </span>
          </div>

          {/* Render High-Fidelity UI Screenshot Card */}
          <div className="pt-1">
            {currentScreenshot.renderUI}
          </div>
        </div>
      </div>

      {/* INDIVIDUAL STUDENT SUBSCRIPTION MODAL */}
      <Modal
        isOpen={showSubscriptionModal}
        onClose={() => setShowSubscriptionModal(false)}
        title="Get SmartPath College™ Student Access"
      >
        <form onSubmit={handleStudentSubmit} className="space-y-3.5">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <span>
              Subscribe to <strong>SmartPath College™</strong> (The AI Metacognitive Copilot for Undergraduate & Graduate Students) with an individual student plan.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Student Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Bea Claridad"
                value={studentForm.studentName}
                onChange={(e) => setStudentForm({ ...studentForm, studentName: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Student Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="bea@upv.edu.ph"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                University / Campus
              </label>
              <input
                type="text"
                placeholder="e.g. UP Visayas, CPU, WVSU, ISUFST..."
                value={studentForm.campus}
                onChange={(e) => setStudentForm({ ...studentForm, campus: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Degree Program / Major
              </label>
              <input
                type="text"
                placeholder="e.g. BS Biology, BS Nursing, BS Civil Eng..."
                value={studentForm.program}
                onChange={(e) => setStudentForm({ ...studentForm, program: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Academic Level
              </label>
              <select
                value={studentForm.studentLevel}
                onChange={(e) => setStudentForm({ ...studentForm, studentLevel: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option>Undergraduate (1st / 2nd Year)</option>
                <option>Undergraduate (3rd / 4th Year - Graduating)</option>
                <option>Graduate (Master's - MS / MA / MBA)</option>
                <option>Postgraduate (Doctor of Medicine / Law)</option>
                <option>Doctorate (PhD Research Scholar)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Student Subscription Plan
              </label>
              <select
                value={studentForm.planType}
                onChange={(e) => setStudentForm({ ...studentForm, planType: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option>Free Student Trial (7 Days Full Access)</option>
                <option>Monthly Student Pass (₱149 / month)</option>
                <option>Semestral Scholar Pass (₱599 / semester)</option>
                <option>Annual Academic Pass (₱1,199 / year)</option>
              </select>
            </div>
          </div>

          <div className="pt-1 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowSubscriptionModal(false)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-950'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-slate-950 fill-slate-950" />
              <span>Get Student Access</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
