import React, { useState } from 'react';
import { Modal } from './Modal';
import { Database, Zap, Key, Copy, Check, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { isSupabaseConfigured } from '../../lib/supabase';

export const DbSchemaModal = ({ isOpen, onClose }) => {
  const { showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [supabaseUrlInput, setSupabaseUrlInput] = useState(import.meta.env.VITE_SUPABASE_URL || '');
  const [savedUrl, setSavedUrl] = useState(import.meta.env.VITE_SUPABASE_URL || '');

  const sqlSchema = `-- GRACE YOUTH PRODUCTION DATABASE (SUPABASE / POSTGRESQL)

-- 1. USERS & PROFILES (Linked to Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  campus_id TEXT NOT NULL, -- 'upv', 'cpu', 'wvsu', etc.
  college_program TEXT,     -- e.g. 'BS Nursing', 'BS Applied Math'
  year_level TEXT,          -- '1st Year', '2nd Year', etc.
  role TEXT DEFAULT 'student', -- 'student', 'tutor', 'leader', 'pastor'
  bio TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PEER TUTORS & AVAILABILITY SLOTS
CREATE TABLE tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id),
  subjects TEXT[] NOT NULL, -- ['Calculus 1', 'Organic Chem']
  category TEXT NOT NULL,
  rating NUMERIC DEFAULT 5.0,
  sessions_completed INT DEFAULT 0,
  badge TEXT,
  is_verified BOOLEAN DEFAULT TRUE,
  preferred_mode TEXT DEFAULT 'Hybrid'
);

CREATE TABLE tutor_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES tutors(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  time_slot TEXT NOT NULL,
  venue_mode TEXT NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE
);

-- 3. TUTORIAL BOOKINGS & SESSIONS (Gospel-First Tracking)
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id),
  tutor_id UUID REFERENCES tutors(id),
  slot_id UUID REFERENCES tutor_slots(id),
  subject TEXT NOT NULL,
  student_note TEXT,
  contact_info TEXT NOT NULL,
  gospel_shared BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'completed', 'cancelled'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. BIBLE STUDIES & LIFE GROUPS
CREATE TABLE life_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  facilitator_id UUID REFERENCES profiles(id),
  campus_id TEXT NOT NULL,
  schedule TEXT NOT NULL,
  location TEXT NOT NULL,
  topic_category TEXT NOT NULL,
  max_capacity INT DEFAULT 12,
  image_url TEXT,
  tags TEXT[]
);

-- 5. LIVE PRAYER WALL & INTERCESSION
CREATE TABLE prayer_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES profiles(id),
  author_name TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  campus_id TEXT NOT NULL,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  prayed_count INT DEFAULT 0,
  type TEXT DEFAULT 'prayer', -- 'prayer' or 'praise'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ROW-LEVEL SECURITY (RLS) POLICIES
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON prayer_requests FOR SELECT USING (true);
CREATE POLICY "Authenticated Insert" ON prayer_requests FOR INSERT WITH CHECK (auth.uid() = author_id OR is_anonymous = true);
`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    showToast('📋 SQL Schema copied to clipboard!', 'info');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveUrl = (e) => {
    e.preventDefault();
    setSavedUrl(supabaseUrlInput);
    showToast(`🔗 Supabase Project URL set to: ${supabaseUrlInput}`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🗄️ Supabase Backend & Database Setup"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5 text-xs sm:text-sm">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Connection Status
          </button>
          <button
            onClick={() => setActiveTab('sql')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all cursor-pointer ${
              activeTab === 'sql' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            SQL Script (Copy to Supabase SQL Editor)
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Key Status */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Key className="w-4 h-4 text-emerald-400" />
                  <span>Supabase Publishable Key</span>
                </div>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Key Loaded</span>
                </span>
              </div>
              <div className="p-2.5 bg-black/60 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 truncate">
                sb_publishable_2by2MmQbr_n5VE_EpjNnPg_ZPYeG0qV
              </div>
            </div>

            {/* Supabase Project URL Input Form */}
            <form onSubmit={handleSaveUrl} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Database className="w-4 h-4 text-indigo-400" />
                  <span>Supabase Project URL</span>
                </div>
                <span className="text-[10px] font-medium text-slate-400">
                  (e.g., https://xxxx.supabase.co)
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://your-project-ref.supabase.co"
                  value={supabaseUrlInput}
                  onChange={(e) => setSupabaseUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-slate-800 text-white font-mono text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs cursor-pointer shadow-md"
                >
                  Save URL
                </button>
              </div>

              <p className="text-[11px] text-slate-400">
                You can find your Project URL in your <strong>Supabase Dashboard $\rightarrow$ Project Settings $\rightarrow$ API</strong>.
              </p>
            </form>

            <div className="p-3.5 bg-indigo-950/30 rounded-2xl border border-indigo-500/20 text-xs text-slate-300">
              ⚡ <strong>How to Initialize Database:</strong>
              <ol className="list-decimal list-inside space-y-1 mt-1 text-slate-400">
                <li>Go to tab <strong>"SQL Script"</strong> above and click <strong>Copy SQL Script</strong>.</li>
                <li>In your Supabase Dashboard, open <strong>SQL Editor</strong> and paste the script.</li>
                <li>Click <strong>Run</strong>. Tables and policies will be created automatically!</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'sql' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-400">schema.sql (PostgreSQL)</span>
              <button
                onClick={copySql}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy SQL Script'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-black/80 border border-slate-800 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-80 leading-tight">
              {sqlSchema}
            </pre>
          </div>
        )}
      </div>
    </Modal>
  );
};
