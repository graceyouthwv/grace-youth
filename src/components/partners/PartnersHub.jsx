import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ExternalLink,
  Brain,
  Send,
  CheckCircle2,
  Cpu,
  Target,
  BookOpen,
  Camera,
  Layers,
  GraduationCap,
  Calculator,
  Compass,
  FileText,
  MessageSquare,
  Clock,
  MapPin,
  Bot,
  Lightbulb,
  Award,
  Zap,
  Building2,
  Play,
  RotateCcw
} from 'lucide-react';
import { Modal } from '../common/Modal';

export const PartnersHub = () => {
  const { theme, showToast } = useApp();
  const isDark = theme === 'dark';

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [activeAppTab, setActiveAppTab] = useState('ai-studio'); // 'ai-studio' | 'vault' | 'camera' | 'thesis' | 'dashboard'
  
  // AI Study Studio Interactive Simulation
  const [selectedPrompt, setSelectedPrompt] = useState(0);
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

      {/* 2. THE SOFTWARE PRODUCT SHOWCASE: SMARTPATH COLLEGE */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-indigo-500 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Software Product by SmartPath Technologies</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              SmartPath College™
            </h2>

            {/* Exact Required Tagline */}
            <div className="inline-block p-3 rounded-2xl bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/30 text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm font-black shadow-xs">
              ✨ &ldquo;An AI-Powered Academic Success & Metacognitive Copilot for Higher Education Students.&rdquo;
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Experience the actual <strong>SmartPath College</strong> software application below. Test the interactive AI Study Studio, lecture transcription vault, blackboard photo OCR synthesizer, and thesis research copilot.
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

        {/* 3. INTERACTIVE SOFTWARE APP EMULATOR / LIVE SHOWCASE */}
        <div className={`rounded-3xl border overflow-hidden shadow-2xl ${
          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
        }`}>
          {/* Top Browser / App Chrome Bar */}
          <div className="p-3.5 px-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <div className="hidden sm:flex items-center gap-2 ml-3 px-3 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>app.smartpath.college • Live Software Demo</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ● Live AI Engine Ready
              </span>
            </div>
          </div>

          {/* Software Screen Sub-Nav Tabs */}
          <div className="flex items-center gap-1.5 p-2 bg-slate-900/60 border-b border-slate-800 overflow-x-auto text-xs">
            <button
              onClick={() => setActiveAppTab('ai-studio')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAppTab === 'ai-studio'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Brain className="w-4 h-4" />
              <span>AI Study Studio (Copilot)</span>
            </button>

            <button
              onClick={() => setActiveAppTab('vault')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAppTab === 'vault'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Note Vault & Transcriptions</span>
            </button>

            <button
              onClick={() => setActiveAppTab('camera')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAppTab === 'camera'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Smart Camera (OCR Synthesizer)</span>
            </button>

            <button
              onClick={() => setActiveAppTab('thesis')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAppTab === 'thesis'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Thesis & Defense Studio</span>
            </button>

            <button
              onClick={() => setActiveAppTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                activeAppTab === 'dashboard'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>GWA & Student Academic Tools</span>
            </button>
          </div>

          {/* Software Screen Content Render */}
          <div className="p-4 sm:p-6 min-h-[480px]">
            {/* SCREEN 1: AI STUDY STUDIO */}
            {activeAppTab === 'ai-studio' && (
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading flex items-center gap-2">
                      <Bot className="w-5 h-5 text-indigo-400" />
                      <span>Metacognitive Socratic Dialogue Studio</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Step-by-step problem solver with active recall drills and exam pro-tips.
                    </p>
                  </div>

                  {/* Preset prompt pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                    <span className="text-[11px] font-bold text-slate-400 shrink-0">Try Scenario:</span>
                    {DEMO_PRESET_PROMPTS.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendPrompt(p.text, p.answer)}
                        className="px-2.5 py-1 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 whitespace-nowrap font-bold text-[11px] cursor-pointer"
                      >
                        {p.subject}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Feed */}
                <div className={`p-4 rounded-2xl border space-y-4 max-h-[360px] overflow-y-auto ${
                  isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed border ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white border-indigo-500 ml-auto max-w-md'
                          : isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                      }`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-indigo-500/20 text-indigo-400 font-bold text-xs font-mono">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>SmartPath College Copilot</span>
                        </div>
                      )}
                      <pre className="font-sans whitespace-pre-line text-xs sm:text-[13px]">
                        {msg.content}
                      </pre>
                    </div>
                  ))}

                  {isAiThinking && (
                    <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs flex items-center gap-2">
                      <Brain className="w-4 h-4 animate-spin text-indigo-500" />
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
                    placeholder="Ask any collegiate topic (e.g. Explain Fourier Transform intuitively, or Test me on Cell Division)..."
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    className={`flex-1 px-4 py-3 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send</span>
                  </button>
                </form>
              </div>
            )}

            {/* SCREEN 2: NOTE VAULT & TRANSCRIPTIONS */}
            {activeAppTab === 'vault' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-indigo-400" />
                      <span>Lecture Note Vault & AI Transcriptions</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Automated lecture audio processing, high-yield summary generation, and digital flashcard decks.
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    3 Live Transcriptions Saved
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-400">BIO 101 • Lecture 8</span>
                      <span className="text-[10px] text-slate-400">45 mins audio</span>
                    </div>
                    <h4 className="font-extrabold text-sm">Mitochondrial ATP Synthesis & Chemiosmosis</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-3">
                      • Proton gradient driving ATP synthase F0/F1 complex.\n• Yield: ~30-32 ATP per glucose molecule.\n• Inhibitors: Oligomycin & Cyanide.
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                      <span>✓ 18 Flashcards Generated</span>
                      <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-400">MATH 54 • Lecture 12</span>
                      <span className="text-[10px] text-slate-400">55 mins audio</span>
                    </div>
                    <h4 className="font-extrabold text-sm">Eigenvalues & Diagonalization</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-3">
                      • Characteristic equation det(A - λI) = 0.\n• Geometric vs Algebraic multiplicity.\n• Matrix powers via P D P^-1.
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                      <span>✓ 24 Flashcards Generated</span>
                      <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-indigo-400">NURS 204 • Lecture 5</span>
                      <span className="text-[10px] text-slate-400">1 hr 10 mins</span>
                    </div>
                    <h4 className="font-extrabold text-sm">Pharmacology: Antihypertensive Classes</h4>
                    <p className="text-[11px] text-slate-400 line-clamp-3">
                      • ACE Inhibitors (-pril) vs ARBs (-sartan).\n• Beta-blockers: Cardioselective vs non-selective.\n• Nursing alert: Monitor dry cough & hyperkalemia.
                    </p>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                      <span>✓ 30 Flashcards Generated</span>
                      <span className="text-indigo-400 cursor-pointer">Open Trans →</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: SMART CAMERA OCR */}
            {activeAppTab === 'camera' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading flex items-center gap-2">
                      <Camera className="w-5 h-5 text-indigo-400" />
                      <span>Smart Camera: Photo-to-Study Notes Synthesizer</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Snap a photo of messy chalkboard equations, textbook pages, or slide handouts to instantly convert them into clean LaTeX and active recall notes.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[11px] font-black uppercase text-amber-400">📸 1. Raw Blackboard Capture</div>
                    <div className="aspect-video rounded-xl bg-slate-950 border border-slate-800 overflow-hidden relative flex items-center justify-center">
                      <img
                        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&auto=format&fit=crop&q=80"
                        alt="Board notes"
                        className="w-full h-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full bg-black/80 text-white font-mono text-xs border border-white/20">
                          Differential Equations & Laplace Transform
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[11px] font-black uppercase text-emerald-400">✨ 2. AI Synthesized LaTeX & Study Card</div>
                    <div className={`p-3 rounded-xl border text-xs space-y-2 font-mono ${isDark ? 'bg-black/50 border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}>
                      <div>{`$$\\mathcal{L}\\{e^{at}\\} = \\frac{1}{s - a}, \\quad s > a$$`}</div>
                      <div>{`$$\\mathcal{L}\\{\\sin(\\omega t)\\} = \\frac{\\omega}{s^2 + \\omega^2}$$`}</div>
                      <div className="text-[11px] font-sans text-slate-300 pt-1">
                        • Transformed from handwritten chalk into clean digital study cards with 1-click export to PDF and Anki!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 4: THESIS STUDIO */}
            {activeAppTab === 'thesis' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-indigo-400" />
                      <span>Thesis & Capstone Defense Studio</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Literature review synthesis, conceptual framework builder, and mock panel defense simulator.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm">Undergraduate Research Project: "AI-Powered Formative Assessment in Higher Ed"</h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                      Chapter 2: Review of Related Literature (RRL)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <strong className="text-indigo-300">Synthesis Matrix</strong>
                      <p className="text-[11px] text-slate-400">Auto-correlated 14 Scopus-indexed papers comparing Bloom's taxonomy vs Metacognitive awareness.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <strong className="text-indigo-300">APA 7th Citations</strong>
                      <p className="text-[11px] text-slate-400">1-click formatted in-text citations and reference list export.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <strong className="text-indigo-300">Mock Panel Defense</strong>
                      <p className="text-[11px] text-slate-400">AI simulates rigorous questions from tough collegiate research panelists.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 5: GWA & STUDENT ACADEMIC TOOLS */}
            {activeAppTab === 'dashboard' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/60">
                  <div>
                    <h3 className="text-base sm:text-lg font-black font-heading flex items-center gap-2">
                      <Calculator className="w-5 h-5 text-indigo-400" />
                      <span>Academic Performance & Target GWA Calculator</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Real-time collegiate GWA computation, Latin Honors trajectory tracking, and exam score planning.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className={`p-4 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] font-black uppercase text-slate-400">Cumulative GWA</div>
                    <div className="text-2xl font-black text-emerald-400 font-heading">1.38</div>
                    <div className="text-[11px] text-emerald-500 font-bold">★ Magna Cum Laude Standing</div>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] font-black uppercase text-slate-400">Enrolled Units</div>
                    <div className="text-2xl font-black text-indigo-400 font-heading">21.0 Units</div>
                    <div className="text-[11px] text-slate-400">7 Core Major Subjects</div>
                  </div>

                  <div className={`p-4 rounded-2xl border space-y-1 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="text-[10px] font-black uppercase text-slate-400">Exam Target Score</div>
                    <div className="text-2xl font-black text-amber-400 font-heading">88%</div>
                    <div className="text-[11px] text-slate-400">Needed on Finals for Flat 1.0</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. SHORT INSTITUTIONAL PRODUCT FEATURES */}
      <div className="space-y-4 pt-2">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h3 className={`text-xl sm:text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Why Colleges & Universities Deploy SmartPath College™
          </h3>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Empowering university students with metacognitive study habits while delivering actionable telemetry to college leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                <Brain className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm font-heading">AI Metacognitive Copilot</h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                24/7 Socratic problem-solving, active recall prompts, and diagnostic gap-filling for every college student.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-bold text-indigo-400">
              <span>Higher Ed Standard</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-md">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm font-heading">Note Vault & Transcriptions</h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Converts lecture audio into structured high-yield summaries, key equations, and Anki-compatible flashcards.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-bold text-indigo-400">
              <span>Higher Ed Standard</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm font-heading">Thesis & Capstone Studio</h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Literature review synthesizer, conceptual matrix builder, and mock panel defense simulator.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-bold text-indigo-400">
              <span>Higher Ed Standard</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <div className={`p-5 rounded-3xl border flex flex-col justify-between ${
            isDark ? 'bg-slate-900/70 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xs'
          }`}>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-orange-600 text-white flex items-center justify-center shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-sm font-heading">Institutional Privacy & Security</h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Enterprise role-based access, student privacy containment, and audit-ready data policies.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-bold text-indigo-400">
              <span>Higher Ed Standard</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
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
            Contact the SmartPath Technologies enterprise education team for institutional campus subscriptions, faculty pilot programs, and custom LMS integrations.
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
              placeholder="e.g. West Visayas State University, CPU, UPV, ISUFST..."
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
              placeholder="Tell us about your campus size (e.g. 2,500 collegiate students, Engineering / Nursing / Education departments, or pilot timeline)..."
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
