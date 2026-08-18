import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Heart,
  Users,
  Brain,
  Send,
  ChevronRight,
  BookOpen,
  Compass,
  TrendingUp,
  Cpu,
  Target,
  FileCheck,
  Lightbulb,
  CheckCircle2,
  HelpCircle,
  Play,
  RotateCcw,
  Zap
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({
    campus: '',
    name: '',
    email: '',
    phone: '',
    role: 'College Student / Learner',
    message: ''
  });

  // Interactive Metacognitive Copilot Sandbox Demo
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [copilotThinking, setCopilotThinking] = useState(false);
  const [activeOutput, setActiveOutput] = useState(null);

  const SAMPLE_COPILOT_PROMPTS = [
    {
      label: '🔬 Organic Chem: Reaction Mechanism',
      prompt: 'Explain the SN2 mechanism and test if I really understand stereochemical inversion.',
      response: {
        step1: '🧠 Metacognitive Calibration Question:',
        question: 'Before I give the textbook answer, how would you explain why the nucleophile must attack from 180° opposite the leaving group? What happens to the three other bonds during the transition state?',
        breakdown: '• Key Concept: Backside nucleophilic attack causes a concerted Walden inversion (like an umbrella blown inside-out).\n• Common Misconception: Thinking SN2 forms a carbocation intermediate (that is SN1).\n• Retention Metric: 85% of collegiate learners confuse steric hindrance with nucleophile strength in secondary alkyl halides.',
        activeRecall: 'Quick Drill: If (R)-2-bromobutane undergoes SN2 with sodium cyanide, what is the exact stereochemistry of the product?'
      }
    },
    {
      label: '📐 Calculus: Fundamental Theorem',
      prompt: 'Help me understand why integration and differentiation are inverse processes.',
      response: {
        step1: '🧠 Metacognitive Self-Check:',
        question: 'In your own words, if differentiation computes the instantaneous rate of accumulation, what does the area accumulation function A(x) represent as x changes by a tiny dx?',
        breakdown: '• Geometric Intuition: Adding a thin sliver of area dA = f(x)dx gives dA/dx = f(x).\n• Socratic Insight: The derivative of the accumulated area is the height of the curve at that exact boundary.\n• Prerequisite Link: Requires mastery of limits as Δx → 0.',
        activeRecall: 'Active Drill: State Part 1 vs Part 2 of FTC in one sentence each to test conceptual clarity.'
      }
    },
    {
      label: '🩺 Anatomy: Cardiac Cycle & Pressures',
      prompt: 'Test my comprehension of ventricular systole and valve timings.',
      response: {
        step1: '🧠 Diagnostic Knowledge Check:',
        question: 'Why do the AV valves close BEFORE the semilunar valves open? What is this specific phase called and why is no blood ejected yet?',
        breakdown: '• Phase Name: Isovolumetric Contraction.\n• Metacognitive Tip: Always trace pressure gradients (Ventricular pressure > Atrial pressure closes AV; Ventricular pressure > Aortic pressure opens Aortic valve).\n• Clinical Relevance: Murmurs occur when valves fail to seal during these exact high-pressure moments.',
        activeRecall: 'Self-Test: During Isovolumetric Relaxation, are all 4 heart valves closed or open?'
      }
    }
  ];

  const handleRunSimulator = (idx) => {
    setActivePromptIndex(idx);
    setCopilotThinking(true);
    setActiveOutput(null);
    setTimeout(() => {
      setCopilotThinking(false);
      setActiveOutput(SAMPLE_COPILOT_PROMPTS[idx].response);
    }, 450);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.name.trim() || !demoForm.email.trim()) {
      showToast('Please provide your name and contact email.', 'error');
      return;
    }
    showToast(`✓ Inquiry received! SmartPath Technologies will reach out to you shortly.`, 'success');
    setShowDemoModal(false);
    setDemoForm({
      campus: '',
      name: '',
      email: '',
      phone: '',
      role: 'College Student / Learner',
      message: ''
    });
  };

  const COPILOT_CORE_PILLARS = [
    {
      icon: Brain,
      title: 'Metacognitive Self-Assessment & Reflection',
      tag: 'Metacognition Engine',
      description: 'Continuously guides students to self-monitor their depth of comprehension, calibrate confidence levels, and uncover hidden conceptual blindspots before exams.',
      color: 'from-violet-600 to-indigo-600'
    },
    {
      icon: Cpu,
      title: 'AI Academic Success Copilot',
      tag: 'Socratic AI Mentor',
      description: 'Delivers personalized multi-step concept decomposition, Socratic dialogue, active recall generation, and step-by-step problem-solving guidance aligned with collegiate syllabi.',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      icon: Target,
      title: 'Prerequisite & Skill Gap Mastery',
      tag: 'Diagnostic Mapping',
      description: 'Pinpoints foundational gaps in prerequisite university subjects (Engineering Math, Organic Chem, Anatomy & Physiology, Financial Accounting, Computer Science).',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: TrendingUp,
      title: 'Evidence-Based Spaced Retrieval',
      tag: 'Cognitive Optimization',
      description: 'Applies scientifically-backed retrieval practice intervals and interleaving revision drills to optimize cognitive load and cement long-term retention.',
      color: 'from-amber-600 to-orange-600'
    },
    {
      icon: Users,
      title: 'Peer Tutoring & Discipleship Study Circles',
      tag: 'Collaborative Learning',
      description: 'Seamlessly links with Grace Youth peer tutors and weekly life-group review sessions across UPV, CPU, ISUFST, WVSU, ISAT-U, and USA.',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: FileCheck,
      title: 'Mastery & Self-Efficacy Analytics',
      tag: 'Growth Tracking',
      description: 'Real-time telemetry tracking metacognitive growth, active study discipline, retention curves, and topic mastery milestones.',
      color: 'from-cyan-600 to-blue-600'
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
            Through technological innovation, Christian servant-leadership, and kingdom stewardship, SmartPath Technologies creates digital products that empower college students to excel in their academic journey while fostering Christ-centered discipleship.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-slate-950" />
              <span>Inquire about SmartPath College</span>
            </button>

            <a
              href="https://smartpath.tech"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all ${
                isDark ? 'bg-slate-900 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-800' : 'bg-white border-slate-300 text-slate-700 hover:text-slate-950 hover:bg-slate-50'
              }`}
            >
              <span>Visit SmartPath Tech</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. THE ONLY FEATURED PRODUCT: SMARTPATH COLLEGE */}
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
              <strong>SmartPath College</strong> is an intelligent metacognitive software product developed by SmartPath Technologies. It is built exclusively to help college and university students develop self-regulated learning habits, diagnose comprehension gaps, and achieve academic excellence in challenging coursework.
            </p>
          </div>

          <button
            onClick={() => setShowDemoModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all self-start sm:self-auto cursor-pointer shadow-sm shrink-0"
          >
            Inquire for Product Access →
          </button>
        </div>

        {/* 3. INTERACTIVE METACOGNITIVE SIMULATOR / LIVE PREVIEW */}
        <div className={`p-5 sm:p-7 rounded-3xl border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-wider">
                <Brain className="w-4 h-4" />
                <span>Interactive Metacognitive Experience</span>
              </div>
              <h3 className={`text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                See how SmartPath College prompts deeper metacognitive learning:
              </h3>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              Select a collegiate scenario below:
            </span>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-5">
            {SAMPLE_COPILOT_PROMPTS.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleRunSimulator(idx)}
                className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  activePromptIndex === idx
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.01]'
                    : isDark
                    ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-indigo-500/40 hover:text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                <Play className={`w-3.5 h-3.5 shrink-0 ${activePromptIndex === idx ? 'text-white fill-white' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          {/* Interactive Output Box */}
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-black/50 border-indigo-500/30 text-slate-200' : 'bg-indigo-50/60 border-indigo-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-indigo-500/20 mb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <strong className="text-indigo-600 dark:text-indigo-300 font-bold">SmartPath College Copilot Engine</strong>
              </div>
              <span className="text-[10px] text-slate-400">Mode: Metacognitive Socratic Dialogue</span>
            </div>

            {copilotThinking ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-xs text-indigo-400">
                <Brain className="w-6 h-6 animate-spin text-indigo-500" />
                <span>Calibrating metacognitive prompt...</span>
              </div>
            ) : (
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-900 dark:text-indigo-200">
                  <div className="font-black text-xs text-indigo-600 dark:text-indigo-400 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>{SAMPLE_COPILOT_PROMPTS[activePromptIndex].response.step1}</span>
                  </div>
                  <p className="font-bold leading-relaxed">
                    {SAMPLE_COPILOT_PROMPTS[activePromptIndex].response.question}
                  </p>
                </div>

                <div className="space-y-1.5 leading-relaxed text-xs">
                  <div className="font-mono text-[10px] uppercase font-bold text-slate-400">Conceptual Breakdown:</div>
                  <pre className="font-sans whitespace-pre-line text-xs text-slate-700 dark:text-slate-300">
                    {SAMPLE_COPILOT_PROMPTS[activePromptIndex].response.breakdown}
                  </pre>
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 flex items-start gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <strong>Active Recall Trigger: </strong>
                    <span>{SAMPLE_COPILOT_PROMPTS[activePromptIndex].response.activeRecall}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. COPILOT CAPABILITIES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {COPILOT_CORE_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`genz-card p-6 rounded-3xl border flex flex-col justify-between group transition-all duration-300 ${
                  isDark ? 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/50' : 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}>
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {pillar.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/20 dark:border-slate-800 flex items-center text-xs font-bold text-indigo-500 group-hover:text-indigo-400">
                  <span>Explore copilot capability</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. PARTNERSHIP VALUES & KINGDOM IMPACT */}
      <div className={`p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-rose-500 uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Kingdom Stewardship & Ministry Impact</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-heading">
            Why SmartPath Technologies Supports Grace Youth
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Empowering Student Tutors</strong>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Supporting collegiate peer tutors across STEM, Nursing, Fisheries, Agriculture, Education, and Accountancy.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Campus Discipleship Fellowship</strong>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Supporting weekly life groups, citywide youth retreats, and gospel mentorship programs.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>Western Visayas Youth Mission</strong>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Uniting university campuses from UPV and CPU to ISUFST, WVSU, ISAT-U, and USA under Christ.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="text-xs space-y-0.5">
                <strong className={isDark ? 'text-white' : 'text-slate-900'}>100% Free Ministry Policy</strong>
                <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                  Ensuring all campus discipleship care, counseling, and tutoring remains completely free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BECOME A PARTNER CTA */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
        isDark ? 'bg-gradient-to-r from-violet-950/40 via-slate-900 to-indigo-950/40 border-violet-500/30' : 'bg-indigo-50/70 border-indigo-200'
      }`}>
        <Users className="w-10 h-10 text-indigo-500 mx-auto" />
        <div className="space-y-1">
          <h3 className={`text-lg sm:text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Interested in Partnering with Grace Youth?
          </h3>
          <p className={`text-xs max-w-xl mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            We welcome Christian organizations, tech innovators, and local mission advocates to collaborate in raising the next generation of Christ-centered student leaders.
          </p>
        </div>

        <button
          onClick={() => {
            setDemoForm((prev) => ({ ...prev, role: 'Kingdom Partner / Sponsor' }));
            setShowDemoModal(true);
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          Connect with Grace Youth Leadership
        </button>
      </div>

      {/* INQUIRY MODAL */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="Inquire: SmartPath College™ / SmartPath Tech"
      >
        <form onSubmit={handleDemoSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Connect with <strong>SmartPath Technologies</strong> regarding <strong>SmartPath College™</strong> (&ldquo;An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students&rdquo;) or campus ministry partnership.
            </span>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="Full Name"
              value={demoForm.name}
              onChange={(e) => setDemoForm({ ...demoForm, name: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                University / Campus
              </label>
              <input
                type="text"
                placeholder="e.g. UPV, CPU, ISUFST, WVSU..."
                value={demoForm.campus}
                onChange={(e) => setDemoForm({ ...demoForm, campus: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Role / Track
              </label>
              <select
                value={demoForm.role}
                onChange={(e) => setDemoForm({ ...demoForm, role: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option>College Student / Learner</option>
                <option>Volunteer Peer Tutor</option>
                <option>College Faculty / Educator</option>
                <option>Kingdom Partner / Sponsor</option>
                <option>Campus Youth Worker</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="name@university.edu.ph"
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
              Message / Academic Focus Area
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your academic learning needs or partnership interest..."
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
              <span>Send Inquiries</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
