import React, { useState } from 'react';
import { Modal } from './Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { PH_REGIONS, getRegionById } from '../../data/regions';
import { HeartHandshake, Sparkles, Send, Music, Users, Coffee, Tent, Heart, BookOpen, ShieldCheck, Globe } from 'lucide-react';

export const VolunteerModal = ({ isOpen, onClose }) => {
  const { currentUser, selectedRegion, showToast, theme, addVolunteerApplication } = useApp();
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [contact, setContact] = useState('');
  const [regionId, setRegionId] = useState(selectedRegion !== 'all' ? selectedRegion : 'r6');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [customCampus, setCustomCampus] = useState('');
  const [roleArea, setRoleArea] = useState('life_group'); // 'life_group' | 'worship' | 'camp' | 'coffee' | 'prayer' | 'tutor'
  const [yearLevel, setYearLevel] = useState(currentUser.yearLevel || '2nd Year');
  const [availability, setAvailability] = useState('Weekdays 4:00 PM onwards & Saturdays');
  const [bioNote, setBioNote] = useState('');

  const isDark = theme === 'dark';

  const availableCampuses = CAMPUSES.filter((c) => {
    if (c.id === 'all') return false;
    return c.regionId === regionId;
  });

  const volunteerRoles = [
    { id: 'life_group', title: '🌱 Life Group Co-Facilitator', desc: 'Help facilitate Bible study circles & mentor dormers' },
    { id: 'worship', title: '🎸 Worship & Music Team', desc: 'Acoustic guitar, vocals, or sound for campus fellowships & camps' },
    { id: 'camp', title: '🏕️ Youth Camp Counselor & Logistics', desc: 'Camp retreat facilitator, games, and spiritual counseling' },
    { id: 'coffee', title: '☕ Exam Outreach & Care Team', desc: 'Serve free cold brew, snacks, and prayer cards during finals' },
    { id: 'prayer', title: '🙏 Campus Prayer Intercessor', desc: 'Intercede and pray for students posting on the wall' },
    { id: 'tutor', title: '👨‍🏫 Academic Peer Tutor', desc: 'Review freshmen in STEM, Nursing, Business, or Arts' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please provide your name and contact email.', 'error');
      return;
    }

    const selectedRoleObj = volunteerRoles.find((r) => r.id === roleArea);
    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const regionObj = getRegionById(regionId);

    const finalCampusName = campusId === '__other__' ? (customCampus.trim() || 'Other Campus') : (campusObj?.name || 'Philippine University Campus');

    addVolunteerApplication({
      name: name.trim(),
      email: email.trim(),
      contact: contact.trim(),
      regionId,
      regionName: regionObj?.name || 'All Philippines',
      campusId: campusId === '__other__' ? 'other' : campusId,
      campusName: finalCampusName,
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
          <span className="font-bold">✨ Join the Movement:</span> God is doing something extraordinary across Philippine university campuses and online! Whether you have musical gifts, a heart for freshmen mentoring, event logistics, or prayer, we'd love to equip and serve alongside you.
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
              placeholder="e.g. hannah@school.edu.ph"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Region & Campus Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Region / Place *
            </label>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                const firstCampus = CAMPUSES.find((c) => c.regionId === e.target.value && c.id !== 'all');
                if (firstCampus) setCampusId(firstCampus.id);
              }}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {PH_REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.shortName}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Campus / University *
            </label>
            <select
              value={campusId}
              onChange={(e) => { setCampusId(e.target.value); if (e.target.value !== '__other__') setCustomCampus(''); }}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {availableCampuses.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
              <option value="__other__">✏️ Other (Type my campus)</option>
            </select>
          </div>
        </div>

        {campusId === '__other__' && (
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Type Your College / University Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Adventist University of the Philippines"
              value={customCampus}
              onChange={(e) => setCustomCampus(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Year Level
            </label>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Graduate / Alumni">Graduate / Alumni</option>
            </select>
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

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Weekly Availability
          </label>
          <input
            type="text"
            placeholder="e.g. Weekday afternoons (4pm-6pm) & Saturdays"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Why would you like to join the ministry team?
          </label>
          <textarea
            rows={2}
            placeholder="Share a short note about your ministry background or heart for campus ministry..."
            value={bioNote}
            onChange={(e) => setBioNote(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="pt-2 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
              isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-950'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Submit Application</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
