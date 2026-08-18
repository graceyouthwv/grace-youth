import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Brain,
  Send,
  BookOpen,
  Camera,
  GraduationCap,
  Calculator,
  Bot,
  Zap,
  Check
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [activeAppTab, setActiveAppTab] = useState('ai-studio'); // 'ai-studio' | 'vault' | 'camera' | 'thesis' | 'dashboard'
  
  // AI Study Studio Interactive Simulation
  const [customInput, setCustomInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content: `👋 Hello! I am your **SmartPath College Metacognitive Copilot**.\n\nI don't just give you quick homework answers—I guide you through **Socratic inquiry**, **metacognitive self-checks**, and **active recall drills** to build true mastery for your university exams. What collegiate course are we mastering today?`
    }
  ]);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const DEMO_PRESET_PROMPTS = [
    {
      subject: '🧬 Organic Chemistry',
      text: 'Explain why SN2 reactions cause stereochemical inversion with an example.',
      answer: `### 🧠 Metacognitive Step-by-Step Breakdown

1. **The Spatial Mechanism:**
   The nucleophile must attack the electrophilic carbon from **180° opposite** the leaving group (backside attack). This minimizes electron cloud repulsion with the leaving group.

2. **The Transition State:**
   During the single concerted transition state, the three remaining substituents are flattened into a planar arrangement before flipping.

🎯 **Final Answer & Core Takeaway:**
• **Walden Inversion:** A chiral $(R)$-haloalkane flips into $(S)$ stereochemistry (analogous to an umbrella flipped inside-out in strong wind).
• **Kinetics:** Rate = $k[\\text{Substrate}][\\text{Nucleophile}]$ (Second-order).

⭐ **Exam Pro-Tip:**
*State universities and PRC board exams love asking: If $(R)$-2-bromobutane reacts with $\\text{NaCN}$ in acetone, the product is strictly $(S)$-2-methylbutanenitrile via pure SN2.*

❓ **Active Recall Drill:**
*Why do tertiary alkyl halides completely fail SN2 and instead proceed via SN1? (Hint: Steric hindrance vs carbocation stability).*`
    },
    {
      subject: '📐 Integral Calculus',
      text: 'How do I evaluate the integration of x * sin(x) dx using Integration by Parts?',
      answer: `### 🧠 Metacognitive Strategy (LIATE Rule)

1. **Step 1: Choose $u$ and $dv$ using LIATE:**
   • $u = x$ (Algebraic function) $\\implies du = dx$
   • $dv = \\sin(x) dx$ (Trigonometric function) $\\implies v = -\\cos(x)$

2. **Step 2: Apply the Integration by Parts Formula:**
   $$\\int u \\, dv = u v - \\int v \\, du$$
   $$\\int x \\sin(x) \\, dx = x(-\\cos(x)) - \\int (-\\cos(x)) \\, dx$$

🎯 **Final Answer:**
$$-x \\cos(x) + \\sin(x) + C$$

⭐ **Exam Pro-Tip:**
*Never forget $+ C$. Always verify your answer by taking the derivative $\\frac{d}{dx}[-x\\cos(x) + \\sin(x)]$. By product rule: $-\\cos(x) + x\\sin(x) + \\cos(x) = x\\sin(x)$!*`
    },
    {
      subject: '🩺 Anatomy & Nursing',
      text: 'Explain the difference between Systole and Diastole and valve pressures.',
      answer: `### 🧠 Cardiovascular Hemodynamics Breakdown

1. **Ventricular Systole (Contraction & Pumping):**
   • Ventricular pressure exceeds Atrial pressure $\\implies$ **AV valves (Mitral/Tricuspid) snap closed** (produces $S_1$ heart sound "lub").
   • Pressure exceeds Aorta/Pulmonary $\\implies$ **Semilunar valves open**, ejecting blood.

2. **Ventricular Diastole (Relaxation & Filling):**
   • Ventricles relax $\\implies$ **Semilunar valves snap closed** (produces $S_2$ heart sound "dub").
   • AV valves open for passive and active ventricular filling.

🎯 **Key Clinical Takeaway:**
• Systole = Isovolumetric contraction $\\to$ Rapid ejection.
• Diastole = Isovolumetric relaxation $\\to$ Rapid filling $\\to$ Atrial kick.

⭐ **Board Exam Focus:**
*Isovolumetric phases are the brief moments when ALL 4 cardiac valves are simultaneously closed.*`
    }
  ];

  const handleSendPrompt = (promptText, answerText) => {
    const userMsg = { role: 'user', content: promptText };
    setChatMessages((prev) => [...prev, userMsg]);
    setIsAiThinking(true);

    setTimeout(() => {
      setIsAiThinking(false);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: answerText || `### 🧠 Metacognitive Analysis for "${promptText}"\n\n1. **Core Principle Breakdown:** Identifying the foundational concepts required for collegiate understanding.\n2. **Socratic Prompt:** What do you already know about this topic's prerequisites?\n\n🎯 **Final Takeaway:** Continuous active recall produces 3x better retention than passive rereading.\n\n⭐ **Pro-Tip:** Formulate 3 self-test questions from your lecture notes today.`
        }
      ]);
    }, 500);
  };

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

      {/* 2. PRODUCT HEADER + IMMEDIATE CALL TO ACTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30">
              Student App
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

      {/* 3. INTERACTIVE SOFTWARE APP EMULATOR (FRONT & CENTER) */}
      <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
        isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
      }`}>
        {/* Top Browser / App Chrome Bar */}
        <div className="p-3 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <div className="flex items-center gap-2 ml-2 px-2.5 py-0.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>app.smartpath.college • Live Interactive Software Showcase</span>
            </div>
          </div>

          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            ● Try Live App Below
          </span>
        </div>

        {/* Software Screen Sub-Nav Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-900/60 border-b border-slate-800 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveAppTab('ai-studio')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeAppTab === 'ai-studio'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>1. AI Study Copilot</span>
          </button>

          <button
            onClick={() => setActiveAppTab('vault')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeAppTab === 'vault'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>2. Note Vault & Trans</span>
          </button>

          <button
            onClick={() => setActiveAppTab('camera')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeAppTab === 'camera'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>3. Smart Camera OCR</span>
          </button>

          <button
            onClick={() => setActiveAppTab('thesis')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeAppTab === 'thesis'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>4. Thesis & Defense</span>
          </button>

          <button
            onClick={() => setActiveAppTab('dashboard')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              activeAppTab === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>5. GWA Calculator</span>
          </button>
        </div>

        {/* Software Screen Content Render */}
        <div className="p-4 sm:p-5 min-h-[440px]">
          {/* SCREEN 1: AI STUDY STUDIO */}
          {activeAppTab === 'ai-studio' && (
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-xs sm:text-sm">Metacognitive Socratic Dialogue Studio</span>
                </div>

                {/* Preset prompt pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 shrink-0">Try Demo:</span>
                  {DEMO_PRESET_PROMPTS.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendPrompt(p.text, p.answer)}
                      className="px-2 py-0.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 whitespace-nowrap font-bold text-[10px] cursor-pointer"
                    >
                      {p.subject}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Feed */}
              <div className={`p-3.5 rounded-2xl border space-y-3 max-h-[320px] overflow-y-auto ${
                isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs leading-relaxed border ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white border-indigo-500 ml-auto max-w-md'
                        : isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-indigo-500/20 text-indigo-400 font-bold text-[11px] font-mono">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>SmartPath College Copilot</span>
                      </div>
                    )}
                    <pre className="font-sans whitespace-pre-line text-xs">
                      {msg.content}
                    </pre>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs flex items-center gap-2">
                    <Brain className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                    <span>Synthesizing Socratic step-by-step reasoning...</span>
                  </div>
                )}
              </div>

              {/* Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!customInput.trim()) return;
                  handleSendPrompt(customInput.trim());
                  setCustomInput('');
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask any collegiate topic (e.g. SN2 reaction, Integral Calculus, Cell Division)..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* SCREEN 2: NOTE VAULT & TRANSCRIPTIONS */}
          {activeAppTab === 'vault' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-xs sm:text-sm">Lecture Note Vault & AI Transcriptions</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  3 Saved Trans
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className={`p-3.5 rounded-2xl border space-y-1.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-indigo-400">BIO 101 • Lecture 8</span>
                    <span className="text-[9px] text-slate-400">45 mins</span>
                  </div>
                  <h4 className="font-bold text-xs">Mitochondrial ATP Synthesis</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    • Proton gradient driving ATP synthase complex. Yield ~30-32 ATP.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-emerald-400">
                    <span>✓ 18 Flashcards</span>
                    <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-1.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-indigo-400">MATH 54 • Lecture 12</span>
                    <span className="text-[9px] text-slate-400">55 mins</span>
                  </div>
                  <h4 className="font-bold text-xs">Eigenvalues & Diagonalization</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    • Characteristic equation det(A - λI) = 0. Matrix powers via P D P^-1.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-emerald-400">
                    <span>✓ 24 Flashcards</span>
                    <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-1.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase text-indigo-400">NURS 204 • Lecture 5</span>
                    <span className="text-[9px] text-slate-400">1h 10m</span>
                  </div>
                  <h4 className="font-bold text-xs">Pharmacology: Antihypertensives</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    • ACE Inhibitors (-pril) vs ARBs (-sartan). Nursing alerts & vitals.
                  </p>
                  <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold text-emerald-400">
                    <span>✓ 30 Flashcards</span>
                    <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: SMART CAMERA OCR */}
          {activeAppTab === 'camera' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-xs sm:text-sm">Smart Camera: Photo-to-LaTeX Synthesizer</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase text-amber-400">📸 1. Raw Blackboard Photo</div>
                  <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
                      alt="Board notes"
                      className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-white font-mono text-[11px] border border-white/20">
                        Laplace Transform Lecture
                      </span>
                    </div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase text-emerald-400">✨ 2. Synthesized LaTeX Card</div>
                  <div className={`p-3 rounded-xl border text-xs space-y-2 font-mono ${isDark ? 'bg-black/50 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                    <div>{`$$\\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a}, \\quad s > a$$`}</div>
                    <div>{`$$\\mathcal{L}\\{\\sin(\\omega t)\\} = \\frac{\\omega}{s^2 + \\omega^2}$$`}</div>
                    <div className="text-[10px] font-sans text-slate-300 pt-1">
                      • Instant digital card generated with export to Anki flashcard deck.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: THESIS STUDIO */}
          {activeAppTab === 'thesis' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-xs sm:text-sm">Thesis & Defense Studio</span>
                </div>
              </div>

              <div className={`p-3.5 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs">Chapter 2: Review of Related Literature (RRL) Matrix</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    Active Synthesis
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-indigo-300 text-xs">Synthesis Matrix</strong>
                    <p className="text-[10px] text-slate-400">Correlates Scopus & PubMed papers with key thematic variables.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-indigo-300 text-xs">APA 7th Citations</strong>
                    <p className="text-[10px] text-slate-400">Auto-formatted in-text citations & bibliography.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <strong className="text-indigo-300 text-xs">Mock Defense</strong>
                    <p className="text-[10px] text-slate-400">Panel defense question generator & response coaching.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 5: GWA CALCULATOR */}
          {activeAppTab === 'dashboard' && (
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-xs sm:text-sm">Academic Performance & Target GWA Calculator</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase text-slate-400">Cumulative GWA</div>
                  <div className="text-xl font-black text-emerald-400 font-heading">1.38</div>
                  <div className="text-[10px] text-emerald-500 font-bold">★ Magna Cum Laude Trajectory</div>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase text-slate-400">Enrolled Units</div>
                  <div className="text-xl font-black text-indigo-400 font-heading">21.0 Units</div>
                  <div className="text-[10px] text-slate-400">7 Major Subjects</div>
                </div>

                <div className={`p-3.5 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="text-[10px] font-black uppercase text-slate-400">Finals Target</div>
                  <div className="text-xl font-black text-amber-400 font-heading">88%</div>
                  <div className="text-[10px] text-slate-400">To secure 1.25 semester grade</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. COMPACT 2-COLUMN LEVEL BREAKDOWN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className={`p-4 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500">
            <span>🎓</span>
            <span>Undergraduate Students (BS / BA / Pre-Med / Eng / Nursing)</span>
          </div>
          <p className="text-xs text-slate-400">
            Socratic problem-solving for STEM, automatic audio lecture transes, and Dean's list GWA target tracking.
          </p>
        </div>

        <div className={`p-4 rounded-2xl border space-y-1.5 ${
          isDark ? 'bg-slate-900/60 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
        }`}>
          <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400">
            <span>📚</span>
            <span>Graduate & Thesis Scholars (Master's / Law / MD / PhD)</span>
          </div>
          <p className="text-xs text-slate-400">
            Literature review (RRL) matrix builder across Scopus/PubMed papers, mock panel defense, and APA 7th citations.
          </p>
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
