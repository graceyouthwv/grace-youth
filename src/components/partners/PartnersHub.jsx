import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Play,
  Brain,
  BookOpen,
  Camera,
  GraduationCap,
  Calculator,
  LayoutDashboard,
  Zap,
  CheckCircle2,
  Image as ImageIcon,
  Video,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'dashboard' | 'ai' | 'vault' | 'camera' | 'thesis' | 'tools'

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

  const SHORT_FEATURES = [
    {
      icon: Brain,
      title: 'AI Metacognitive Copilot',
      description: 'Socratic problem solving, active recall prompts, and step-by-step concept breakdown for college subjects.',
      color: 'from-violet-600 to-indigo-600'
    },
    {
      icon: BookOpen,
      title: 'Note Vault & Audio Trans',
      description: 'Converts lecture audio into structured high-yield summaries, key equations, and Anki-compatible flashcards.',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'Thesis & Defense Studio',
      description: 'Literature review (RRL) synthesis matrix builder across Scopus/PubMed and mock panel defense simulator.',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: Calculator,
      title: 'GWA & Exam Target Planner',
      description: 'Latin Honors trajectory calculator, target finals grade planner, and daily baon budget tracker.',
      color: 'from-amber-600 to-orange-600'
    }
  ];

  const SCREENSHOT_PLACEHOLDERS = [
    {
      id: 'dashboard',
      title: 'Student Dashboard & Class Schedule',
      category: 'Home & Schedule',
      desc: 'Active class countdown, upcoming exam tasks, and GWA milestone tracker.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'ai-studio',
      title: 'AI Study Studio (Socratic Copilot)',
      category: 'Metacognitive Tutor',
      desc: 'Step-by-step problem decomposition, final answer takeaways, and exam pro-tips.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'vault',
      title: 'Lecture Note Vault & Transcriptions',
      category: 'Audio Trans & Notes',
      desc: 'Audio lecture synchronization, high-yield summary transes, and flashcards.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'camera',
      title: 'Smart Camera OCR Synthesizer',
      category: 'Blackboard OCR',
      desc: 'Converts chalkboard chalk equations into clean LaTeX study cards.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'thesis',
      title: 'Thesis & Defense Studio',
      category: 'Research & Capstone',
      desc: 'Chapter 2 RRL literature synthesis matrix and mock panel defense simulator.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200&auto=format&fit=crop&q=80'
    },
    {
      id: 'tools',
      title: 'Collegiate GWA & Exam Target Tools',
      category: 'Academic Tools',
      desc: 'Honors trajectory computation and exam score requirements.',
      imgPlaceholder: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="space-y-6 animate-tab-in pb-12">
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

      {/* 2. PRODUCT TITLE & ACTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30">
              Student App
            </span>
          </div>

          <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-300">
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

      {/* 3. VIDEO SHOWCASE PLACEHOLDER */}
      <div className={`p-4 sm:p-5 rounded-3xl border overflow-hidden relative shadow-lg ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2.5 px-1">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-slate-400">Video Showcase & Product Walkthrough</span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
            Video Showcase Placeholder
          </span>
        </div>

        {/* 16:9 Video Box Placeholder */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80"
            alt="Video Showcase Placeholder"
            className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

          <div className="relative z-10 text-center max-w-lg px-4 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600/70 backdrop-blur-md text-white text-[11px] font-bold border border-indigo-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Official Video Walkthrough</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-white font-heading">
              SmartPath College™ Product Showcase
            </h3>
            <p className="text-xs text-slate-300">
              Watch how undergraduate and graduate students use the AI Metacognitive Copilot, audio trans vault, and thesis studio.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => showToast('Video walkthrough is coming soon!', 'info')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
                <span>Watch Product Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. SHORT PRODUCT FEATURES (4 CORE PILLARS) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className={`text-base sm:text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Core Software Features
          </h3>
          <span className="text-xs text-slate-400">Undergraduate & Graduate</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SHORT_FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                  isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-9 h-9 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm font-heading">
                    {feature.title}
                  </h4>
                  <p className={`text-[11px] sm:text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {feature.description}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-800/30 dark:border-slate-800 flex items-center gap-1 text-[10px] font-bold text-indigo-500">
                  <span>Student Companion</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. APP SCREENSHOTS GALLERY PLACEHOLDERS */}
      <div className={`p-4 sm:p-6 rounded-3xl border space-y-4 shadow-lg ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/40">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-400" />
            <h3 className={`text-base sm:text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              App Screenshots Gallery
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Preview of SmartPath College™ mobile & web app screens
          </span>
        </div>

        {/* 6-Card Screenshot Grid Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SCREENSHOT_PLACEHOLDERS.map((item, idx) => (
            <div
              key={item.id}
              className={`rounded-2xl border overflow-hidden transition-all group ${
                isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              {/* Image Preview Container */}
              <div className="aspect-video relative overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={item.imgPlaceholder}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 text-indigo-300 border border-white/10 backdrop-blur-md">
                  {item.category}
                </span>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="px-3 py-1 rounded-xl bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
                    Screenshot Placeholder
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-3.5 space-y-1">
                <h4 className={`font-bold text-xs sm:text-sm line-clamp-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
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
