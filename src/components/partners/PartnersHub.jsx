import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Heart,
  Brain,
  Send,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  TrendingUp,
  Cpu,
  Target,
  FileCheck,
  ShieldCheck,
  Building2,
  GraduationCap,
  Layers,
  BarChart3,
  BookOpen,
  Users
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [demoForm, setDemoForm] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    role: 'College Administrator / Dean',
    message: ''
  });

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.institutionName.trim() || !demoForm.email.trim()) {
      showToast('Please provide your institution name and official email.', 'error');
      return;
    }
    showToast(`✓ Subscription & demo inquiry sent for ${demoForm.institutionName}! SmartPath Tech will contact you shortly.`, 'success');
    setShowDemoModal(false);
    setDemoForm({
      institutionName: '',
      contactPerson: '',
      email: '',
      phone: '',
      role: 'College Administrator / Dean',
      message: ''
    });
  };

  const SHORT_PRODUCT_FEATURES = [
    {
      icon: Brain,
      title: 'Campus-Wide AI Metacognitive Copilot',
      description: 'Provides 24/7 Socratic mentoring, active recall practice, and self-assessment guidance personalized for every enrolled college student.',
      color: 'from-violet-600 to-indigo-600'
    },
    {
      icon: BarChart3,
      title: 'Institutional Retention & Academic Analytics',
      description: 'Executive dashboards tracking cohort learning mastery, course difficulty bottlenecks, and early-warning retention alerts for deans.',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      icon: BookOpen,
      title: 'Curriculum & Syllabi Alignment',
      description: 'Ingests university course syllabi, lecture decks, and department references to ensure all AI coaching matches exact classroom standards.',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: ShieldCheck,
      title: 'Enterprise Higher Ed Security & Privacy',
      description: 'Role-based access control, secure student data containment, and compliance-ready data policies built specifically for collegiate institutions.',
      color: 'from-amber-600 to-orange-600'
    }
  ];

  return (
    <div className="space-y-8 animate-tab-in pb-12">
      {/* 1. HERO DEDICATION & PARTNER SPOTLIGHT */}
      <div className={`p-6 sm:p-10 rounded-3xl border relative overflow-hidden transition-all shadow-xl ${
        isDark
          ? 'bg-gradient-to-br from-indigo-950/80 via-slate-900 to-[#0c101d] border-indigo-500/30 text-white'
          : 'bg-gradient-to-br from-indigo-50 via-white to-amber-50/50 border-indigo-200 text-slate-900'
      }`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>MINISTRY PARTNERSHIP SPOTLIGHT</span>
          </div>

          <div className="space-y-1">
            <div className="text-xs font-black uppercase tracking-widest text-indigo-400">
              Technology Partner: SmartPath Technologies
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading leading-tight">
              Empowering Higher Education in Academics & Faith
            </h1>
          </div>

          {/* User Required Dedication Statement */}
          <div className={`p-4 sm:p-5 rounded-2xl border ${
            isDark ? 'bg-black/40 border-indigo-500/30' : 'bg-white/80 border-indigo-200 shadow-sm'
          }`}>
            <p className="text-sm sm:text-base font-bold italic leading-relaxed text-indigo-950 dark:text-indigo-200 flex items-start gap-2.5">
              <span className="text-2xl text-amber-400 leading-none">“</span>
              <span>
                Our ministry partner, <strong className="text-indigo-600 dark:text-amber-300 font-black">SmartPath Technologies</strong>, is wholeheartedly committed to support the campus ministry across Western Visayas for the Glory of God.
              </span>
              <span className="text-2xl text-amber-400 leading-none self-end">”</span>
            </p>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Through technological innovation, Christian servant-leadership, and kingdom stewardship, SmartPath Technologies provides digital software platforms that help collegiate institutions elevate student outcomes while supporting student discipleship.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-slate-950" />
              <span>Inquire for Campus Subscription</span>
            </button>

            <a
              href="https://smartpath.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <span>Visit SmartPath Technologies</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT SHOWCASE HEADER: SMARTPATH COLLEGE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Flagship Software Product of SmartPath Technologies</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>

            {/* Exact Required Tagline */}
            <div className="inline-block p-3 rounded-2xl bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm font-black shadow-xs">
              ✨ &ldquo;An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students.&rdquo;
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>SmartPath College</strong> is a comprehensive higher education software product developed by SmartPath Technologies. Built for universities, state colleges, and higher education institutions seeking to empower their student body with an enterprise AI metacognitive learning copilot and elevate institutional retention.
            </p>
          </div>

          <button
            onClick={() => setShowDemoModal(true)}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs sm:text-sm transition-all self-start sm:self-auto cursor-pointer shadow-md hover:scale-105 active:scale-95 shrink-0 flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Subscribe for Your College →</span>
          </button>
        </div>

        {/* 3. PRODUCT VIDEO SHOWCASE */}
        <div className={`p-4 sm:p-6 rounded-3xl border overflow-hidden relative ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-lg'
        }`}>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono font-bold text-slate-400 ml-2">SmartPath College™ • Product Showcase & Institutional Walkthrough</span>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 font-bold">
              HD 1080p • 03:45
            </span>
          </div>

          {/* Video Player Display */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group shadow-2xl">
            {/* Background Graphic Mockup */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80"
              alt="SmartPath College Product Showcase"
              className="absolute inset-0 w-full h-full object-cover opacity-35 group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

            {/* Video Content Overlay */}
            <div className="relative z-10 text-center max-w-lg px-4 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-600/60 backdrop-blur-md text-white text-xs font-bold border border-indigo-400/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Enterprise Product Demonstration</span>
              </div>

              <h3 className="text-lg sm:text-2xl font-black text-white font-heading">
                SmartPath College™ in Action
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                Watch how higher education institutions deploy our AI-Powered Academic Success & Metacognitive Copilot to increase student pass rates and self-regulated mastery.
              </p>

              {/* Play Trigger */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center gap-2.5"
                >
                  {isPlayingVideo ? (
                    <>
                      <Pause className="w-4 h-4 text-slate-950 fill-slate-950" />
                      <span>Pause Demo Reel</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-slate-950 fill-slate-950" />
                      <span>Watch Product Walkthrough</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
                >
                  Schedule Live Zoom Demo
                </button>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/95 to-transparent flex items-center justify-between text-white text-xs z-20">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                >
                  {isPlayingVideo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                </button>
                <div className="font-mono text-[11px] opacity-80">
                  {isPlayingVideo ? '01:14' : '00:00'} / 03:45
                </div>
                <div className="hidden sm:block w-36 sm:w-64 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className={`h-full bg-amber-400 rounded-full ${isPlayingVideo ? 'w-1/3 animate-pulse' : 'w-0'}`} />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDemoModal(true)}
                  className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 cursor-pointer"
                  title="Fullscreen Demo"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SHORT PRODUCT FEATURES (CLEAN 4-GRID AS REQUESTED) */}
        <div className="space-y-4 pt-2">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className={`text-xl sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Why Higher Education Institutions Choose SmartPath College™
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Designed to integrate seamlessly into state universities and private higher education colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SHORT_PRODUCT_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-3xl border flex flex-col justify-between transition-all hover:scale-[1.02] ${
                    isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${feature.color} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h4 className="font-extrabold text-sm font-heading leading-snug">
                      {feature.title}
                    </h4>

                    <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      {feature.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/20 dark:border-slate-800 flex items-center gap-1 text-[11px] font-bold text-indigo-500">
                    <span>Higher Ed Standard</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. INSTITUTIONAL SUBSCRIPTION CTA BANNER */}
      <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 ${
        isDark ? 'bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/60 border-indigo-500/30' : 'bg-gradient-to-r from-indigo-50 to-amber-50/50 border-indigo-200'
      }`}>
        <Building2 className="w-12 h-12 text-indigo-500 mx-auto" />
        <div className="space-y-1.5 max-w-2xl mx-auto">
          <h3 className={`text-xl sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Ready to Deploy SmartPath College™ in Your Institution?
          </h3>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Contact the SmartPath Technologies enterprise education team for custom institutional subscriptions, multi-campus deployment, and faculty pilot programs.
          </p>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setShowDemoModal(true)}
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            <span>Request College Subscription & Demo</span>
          </button>

          <a
            href="https://smartpath.tech"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-3.5 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
              isDark ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
            }`}
          >
            <span>Visit smartpath.tech</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* INSTITUTIONAL DEMO / SUBSCRIPTION MODAL */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="Inquire for SmartPath College™ Institutional Subscription"
      >
        <form onSubmit={handleDemoSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Schedule a comprehensive product demonstration and campus subscription pricing for <strong>SmartPath College™</strong> (An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students) with the <strong>SmartPath Technologies</strong> team.
            </span>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              College / State University / Institution Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. West Visayas State University, CPU, ISUFST..."
              value={demoForm.institutionName}
              onChange={(e) => setDemoForm({ ...demoForm, institutionName: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Contact Person *
              </label>
              <input
                type="text"
                required
                placeholder="Full Name / Designation"
                value={demoForm.contactPerson}
                onChange={(e) => setDemoForm({ ...demoForm, contactPerson: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Role / Title
              </label>
              <select
                value={demoForm.role}
                onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option>College President / VP Academics</option>
                <option>College Administrator / Dean</option>
                <option>Department Chair / Faculty</option>
                <option>IT / MIS Director</option>
                <option>Campus Student Council Officer</option>
                <option>Kingdom Partner / Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Official Institutional Email *
              </label>
              <input
                type="email"
                required
                placeholder="admin@university.edu.ph"
                value={demoForm.email}
                onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Contact Number
              </label>
              <input
                type="tel"
                placeholder="0917-xxx-xxxx"
                value={demoForm.phone}
                onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Estimated Student Population / College Requirements
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your campus size (e.g. 3,000 collegiate students, Engineering & Nursing departments, or timeline for rollout)..."
              value={demoForm.message}
              onChange={(e) => setDemoForm({ ...demoForm, message: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowDemoModal(false)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-950'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
              <span>Submit Subscription Inquiry</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
