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
  Database,
  Award,
  Send,
  MessageSquare,
  ChevronRight,
  BookOpen,
  Laptop
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
    role: 'College Administrator / Dean',
    message: ''
  });

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.institutionName.trim() || !demoForm.email.trim()) {
      showToast('Please provide your institution name and contact email.', 'error');
      return;
    }
    showToast(`✓ Demo request sent for ${demoForm.institutionName}! SmartPath Technologies will contact you shortly.`, 'success');
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

  const SMARTPATH_COLLEGE_MODULES = [
    {
      icon: GraduationCap,
      title: 'Student Information System (SIS)',
      tag: 'Admissions & Records',
      description: 'Comprehensive student lifecycle management from online application and entrance evaluation to graduation clearance and alumni tracking.',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      icon: Layers,
      title: 'Automated Enrollment & Curricula',
      tag: 'Academic Automation',
      description: 'Intelligent course prerequisite checking, block and irregular sectioning, credit transfers, and instant certificate of matriculation (COM) generation.',
      color: 'from-indigo-600 to-violet-600'
    },
    {
      icon: Award,
      title: 'Faculty Grading & Deans Portal',
      tag: 'Scholastic Records',
      description: 'Secure grade encoding, automated GPA calculation, Dean’s List ranking, and 1-click CHED/PRC-compliant Official Transcript of Records (OTR).',
      color: 'from-emerald-600 to-teal-600'
    },
    {
      icon: Zap,
      title: 'Assessment, Cashiering & UniFAST',
      tag: 'Finance & Billing',
      description: 'Full CHED UniFAST Free Higher Education billing automation, customizable tuition fee templates, scholarship tagging, and multi-channel payment reconciliation.',
      color: 'from-amber-600 to-orange-600'
    },
    {
      icon: Database,
      title: 'Accreditation & Analytics Engine',
      tag: 'Institutional Intelligence',
      description: 'Executive dashboards with real-time student retention, enrollment heatmaps, demographic analytics, and audit-ready data for PACUCOA, ALCUCOA, and ISO certifications.',
      color: 'from-pink-600 to-rose-600'
    },
    {
      icon: Laptop,
      title: 'Cloud LMS & Student Mobile App',
      tag: 'Digital Learning',
      description: 'Seamlessly integrated syllabus distribution, grade inquiries, assignment submissions, digital student IDs, and campus ministry announcement feeds.',
      color: 'from-cyan-600 to-blue-600'
    }
  ];

  return (
    <div className="space-y-8 animate-tab-in pb-12">
      {/* 1. HERO DEDICATION BANNER */}
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

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-heading leading-tight">
            Empowering Higher Education & Campus Ministry
          </h1>

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
            Through technological innovation, Christian servant-leadership, and kingdom stewardship, SmartPath Technologies provides digital platforms that help academic institutions thrive while championing student discipleship.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-slate-950" />
              <span>Inquire for SmartPath College</span>
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

      {/* 2. FLAGSHIP PRODUCT SHOWCASE: SMARTPATH COLLEGE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
              <Building2 className="w-4 h-4" />
              <span>Flagship Enterprise Software</span>
            </div>
            <h2 className={`text-xl sm:text-3xl font-black font-heading mt-1 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™ Management Platform
            </h2>
            <p className={`text-xs sm:text-sm mt-1 max-w-2xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Next-generation cloud campus enterprise resource planning (ERP) built specifically for Philippine colleges, state universities, and private higher education institutions.
            </p>
          </div>

          <button
            onClick={() => setShowDemoModal(true)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            Request Institutional Demo →
          </button>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SMARTPATH_COLLEGE_MODULES.map((module, idx) => {
            const Icon = module.icon;
            return (
              <div
                key={idx}
                className={`genz-card p-6 rounded-3xl border flex flex-col justify-between group transition-all duration-300 ${
                  isDark ? 'border-slate-800 bg-slate-900/60 hover:border-indigo-500/50' : 'border-slate-200 bg-white hover:border-indigo-300 shadow-xs'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${module.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${
                      isDark ? 'bg-slate-800 border-slate-700 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                    }`}>
                      {module.tag}
                    </span>
                  </div>

                  <h3 className={`text-base font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                    {module.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    {module.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/20 dark:border-slate-800 flex items-center text-xs font-bold text-indigo-500 group-hover:text-indigo-400">
                  <span>Learn module capabilities</span>
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
                  Backing free academic peer tutoring across STEM, Nursing, and Business colleges.
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
                  Providing technology backing for life groups, youth retreats, and gospel mentorship.
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
                  Bridging campuses from UPV and CPU to ISUFST and WVSU under the banner of Christ.
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
                  Ensuring all spiritual care and tutoring remains completely free for every student.
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
            We welcome Christian organizations, alumni tech innovators, and local mission advocates to collaborate in raising the next generation of Christ-centered leaders.
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

      {/* DEMO / INQUIRY MODAL */}
      <Modal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
        title="Inquire for SmartPath College™ / Ministry Partnership"
      >
        <form onSubmit={handleDemoSubmit} className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-500/30 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
            <span>
              Connect directly with the <strong>SmartPath Technologies</strong> solutions team for institutional demo scheduling, college ERP consultations, or ministry partnership inquiries.
            </span>
          </div>

          <div className="space-y-1">
            <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Institution / Organization Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. West Visayas State University, St. Paul College..."
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
                <option>Registrar / Admissions Officer</option>
                <option>IT / MIS Director</option>
                <option>Faculty / Department Chair</option>
                <option>Kingdom Partner / Sponsor</option>
                <option>Student Leader / Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Official Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="admin@college.edu.ph"
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
              Inquiry Details / Specific Modules Needed
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your campus requirements (e.g., SIS enrollment, grading portal, UniFAST cashiering, or ministry partnership)..."
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
              <span>Submit Inquiries</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
