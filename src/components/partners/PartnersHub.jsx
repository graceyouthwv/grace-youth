import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Building2,
  GraduationCap,
  CheckCircle2,
  ExternalLink,
  Heart,
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Brain,
  Award,
  Send,
  MessageSquare,
  ChevronRight,
  BookOpen,
  Laptop,
  Compass,
  TrendingUp,
  Cpu,
  Target,
  FileCheck
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoForm, setDemoForm] = useState({
    institutionName: '',
    contactPerson: '',
    email: '',
    phone: '',
    role: 'College Student / Peer Tutor',
    message: ''
  });

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.contactPerson.trim() || !demoForm.email.trim()) {
      showToast('Please provide your name and contact email.', 'error');
      return;
    }
    showToast(`✓ Inquiry received! SmartPath Technologies will reach out to you shortly.`, 'success');
    setShowDemoModal(false);
    setDemoForm({
      institutionName: '',
      contactPerson: '',
      email: '',
      phone: '',
      role: 'College Student / Peer Tutor',
      message: ''
    });
  };

  const COPILOT_CAPABILITIES = [
    {
      icon: Brain,
      title: 'Metacognitive Self-Assessment & Reflection',
      tag: 'Metacognition Engine',
      description: 'Prompts students to monitor their own comprehension, calibrate confidence levels, and identify hidden conceptual blindspots before exams.',
      color: 'from-violet-600 to-indigo-600'
    },
    {
      icon: Cpu,
      title: 'AI Academic Success Copilot',
      tag: 'Personalized AI Mentor',
      description: 'Intelligent multi-step concept decomposition, Socratic dialogue, active recall generation, and personalized problem-solving guidance tailored to collegiate syllabi.',
      color: 'from-indigo-600 to-blue-600'
    },
    {
      icon: Target,
      title: 'Prerequisite & Skill Gap Mastery',
      tag: 'Knowledge Mapping',
      description: 'Pinpoints foundational gaps in prerequisite collegiate subjects (Engineering Math, Organic Chem, Anatomy & Physiology, Financial Accounting, Algorithms).',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: TrendingUp,
      title: 'Evidence-Based Study & Spaced Retrieval',
      tag: 'Cognitive Optimization',
      description: 'Automates scientifically-proven retrieval intervals, interleaving revision cycles, and active recall flash-drills to prevent cognitive overload.',
      color: 'from-amber-600 to-orange-600'
    },
    {
      icon: Users,
      title: 'Campus Peer Tutoring & Discipleship Bridge',
      tag: 'Collaborative Learning',
      description: 'Integrates seamlessly with peer tutoring sessions and ministry life-group study circles across UPV, CPU, ISUFST, WVSU, ISAT-U, and USA.',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: FileCheck,
      title: 'Comprehensive Mastery Analytics',
      tag: 'Student Self-Efficacy',
      description: 'Interactive analytics tracking metacognitive growth, study discipline, retention curves, and topic mastery milestones.',
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
              Empowering Students in Academics & Faith
            </h1>
          </div>

          {/* User Specific Dedication Statement */}
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
            Through technological innovation, Christian servant-leadership, and kingdom stewardship, SmartPath Technologies provides digital platforms that empower college students to excel in their academic journey while fostering Christ-centered discipleship.
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

      {/* 2. FEATURED SOFTWARE PRODUCT: SMARTPATH COLLEGE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="max-w-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>A Software Product of SmartPath Technologies</span>
            </div>
            <h2 className={`text-xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>
            {/* Tagline requirement */}
            <div className="inline-block px-3 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs sm:text-sm font-bold">
              ✨ &ldquo;An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students.&rdquo;
            </div>
            <p className={`text-xs sm:text-sm mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              <strong>SmartPath College</strong> is an intelligent metacognitive software product developed by SmartPath Tech. Designed specifically for collegiate learners, it equips students to master complex coursework, build self-regulated study habits, and unlock high academic performance.
            </p>
          </div>

          <button
            onClick={() => setShowDemoModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all self-start sm:self-auto cursor-pointer shadow-sm shrink-0"
          >
            Inquire for Product Access →
          </button>
        </div>

        {/* Copilot Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COPILOT_CAPABILITIES.map((capability, idx) => {
            const Icon = capability.icon;
            return (
              <div
                key={idx}
                className={`genz-card p-6 rounded-3xl border flex flex-col justify-between group transition-all duration-300 ${
                  isDark ? 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/50' : 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${capability.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}>
                      {capability.tag}
                    </span>
                  </div>

                  <h3 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {capability.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {capability.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/20 dark:border-slate-800 flex items-center text-xs font-bold text-indigo-500 group-hover:text-indigo-400">
                  <span>How it aids metacognition</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. PARTNERSHIP VALUES & KINGDOM IMPACT */}
      <div className={`p-8 rounded-3xl border ${
        isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}>
        <div className="max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-black text-rose-500 uppercase tracking-wider">
            <Heart className="w-4 h-4" />
            <span>Kingdom Stewardship & Ministry Impact</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black font-heading">
            Why SmartPath Tech Backs Campus Ministry
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

      {/* 4. BECOME A PARTNER CTA */}
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

      {/* PRODUCT / PARTNER INQUIRY MODAL */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="Inquire: SmartPath College™ / SmartPath Tech"
      >
        <form onSubmit={handleDemoSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Get in touch with <strong>SmartPath Technologies</strong> regarding <strong>SmartPath College™</strong> (AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students) or ministry collaboration.
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
              value={demoForm.contactPerson}
              onChange={(e) => setDemoForm({ ...demoForm, contactPerson: e.target.value })}
              className={`w-full p-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                University / Campus / Organization
              </label>
              <input
                type="text"
                placeholder="e.g. UPV, CPU, ISUFST, WVSU..."
                value={demoForm.institutionName}
                onChange={(e) => setDemoForm({ ...demoForm, institutionName: e.target.value })}
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
                <option>Academic Administrator / Dean</option>
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
              placeholder="Tell us about your collegiate learning needs or partnership interest..."
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
