import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { HeartHandshake, Sparkles, Send, Music, Users, Coffee, Tent, Heart, BookOpen, ShieldCheck } from 'lucide-react';

export const VolunteerModal = ({ isOpen, onClose }) => {
  const { currentUser, showToast, theme, addVolunteerApplication } = useApp();
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [contact, setContact] = useState('');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'isufst');
  const [roleArea, setRoleArea] = useState('life_group'); // 'life_group' | 'worship' | 'camp' | 'coffee' | 'prayer' | 'tutor'
  const [yearLevel, setYearLevel] = useState(currentUser.yearLevel || '2nd Year');
  const [availability, setAvailability] = useState('Weekdays 4:00 PM onwards & Saturdays');
  const [bioNote, setBioNote] = useState('');

  const isDark = theme === 'dark';

  const volunteerRoles = [
    { id: 'life_group', title: '🌱 Life Group Co-Facilitator', desc: 'Help facilitate Bible study circles & mentor dormers' },
    { id: 'worship', title: '🎸 Worship & Music Team', desc: 'Acoustic guitar, vocals, or sound for campus fellowships & camps' },
    { id: 'camp', title: '🏕️ Youth Camp Counselor & Logistics', desc: 'Camp retreat facilitator, games, and spiritual counseling' },
    { id: 'coffee', title: '☕ Exam Outreach & Care Team', desc: 'Serve free cold brew, snacks, and prayer cards during finals' },
    { id: 'prayer', title: '🙏 24/7 Prayer Wall Warrior', desc: 'Intercede and pray for students posting on the wall' },
    { id: 'tutor', title: '👨‍🏫 Academic Peer Tutor', desc: 'Review freshmen in Calculus, Chem, Nursing, or Engg' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please provide your name and contact email.', 'error');
      return;
    }

    const selectedRoleObj = volunteerRoles.find((r) => r.id === roleArea);
    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    addVolunteerApplication({
      name: name.trim(),
      email: email.trim(),
      contact: contact.trim(),
      campusId,
      campusName: campusObj?.name || 'Iloilo Campus',
      roleArea: selectedRoleObj?.title || 'Youth Worker Volunteer',
      yearLevel,
      availability,
      bioNote: bioNote.trim() || 'Excited to serve college students for Christ!'
    });

    onClose();
    setBioNote('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🤝 Volunteer as a Youth Worker / Ministry Servant"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}>
          <span className="font-bold">✨ Join the Movement:</span> God is doing something extraordinary across Iloilo universities! Whether you have musical gifts, a heart for freshmen mentoring, event logistics, or prayer, we'd love to equip and serve alongside you.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Hannah Grace"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="e.g. hannah@wvsu.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Your Campus *
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {CAMPUSES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Mobile / Messenger Handle
            </label>
            <input
              type="text"
              placeholder="e.g. 0917-xxx-xxxx or FB name"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Volunteer Role Selection */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Where would you like to serve? *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {volunteerRoles.map((role) => (
              <div
                key={role.id}
                onClick={() => setRoleArea(role.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                  roleArea === role.id
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                    : isDark ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className={`font-black text-xs ${roleArea === role.id ? 'text-indigo-600 dark:text-indigo-400' : isDark ? 'text-white' : 'text-slate-900'}`}>
                  {role.title}
                </div>
                <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {role.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Year Level / Status
            </label>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Senior)</option>
              <option value="Graduate / Staff">Graduate / Young Adult / Church Partner</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              General Weekly Availability
            </label>
            <input
              type="text"
              placeholder="e.g. Free Mon/Wed afternoons & Saturdays"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Brief Note / Why you want to serve (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="Share your spiritual journey or why you want to serve college students..."
            value={bioNote}
            onChange={(e) => setBioNote(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Submit Volunteer Application</span>
        </button>
      </form>
    </Modal>
  );
};
