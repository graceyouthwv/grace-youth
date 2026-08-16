import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { UserPlus, ShieldCheck, Mail, Lock, User, School, BookOpen, GraduationCap } from 'lucide-react';

export const AddUserModal = ({ isOpen, onClose }) => {
  const { registeredUsers, setRegisteredUsers, showToast, theme } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('student'); // 'student' | 'tutor' | 'worker' | 'leader'
  const [campusId, setCampusId] = useState('isufst');
  const [program, setProgram] = useState('');
  const [yearLevel, setYearLevel] = useState('1st Year');
  const [bio, setBio] = useState('');

  const isDark = theme === 'dark';

  const handleAddUser = (e) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!name.trim() || !cleanEmail) {
      showToast('Please provide a full name and email.', 'error');
      return;
    }

    const existing = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      showToast('An account with this email already exists.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);

    let roleLabel = 'Student Member';
    let defaultAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80';

    if (role === 'leader') {
      roleLabel = 'Ministry Admin / Coordinator';
      defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    } else if (role === 'worker') {
      roleLabel = 'Campus Youth Worker / Missionary';
      defaultAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
    } else if (role === 'tutor') {
      roleLabel = `Volunteer Peer Tutor (${program || 'Peer Leader'})`;
      defaultAvatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80';
    } else {
      roleLabel = `Student (${program || 'College Member'})`;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      password: password || 'password123',
      role,
      roleLabel,
      campusId,
      campusName: campusObj?.name || 'Iloilo Campus',
      program: program.trim() || 'General Academics',
      yearLevel,
      avatar: defaultAvatar,
      bio: bio.trim() || (role === 'tutor' ? 'Verified volunteer peer tutor.' : role === 'worker' ? 'Campus youth missionary.' : 'Grace Youth college member.')
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    showToast(`✅ Successfully created account for ${newUser.name} (${newUser.roleLabel})!`, 'success');
    onClose();

    // Reset form
    setName('');
    setEmail('');
    setProgram('');
    setBio('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="➕ Admin: Add Person / Staff Account"
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleAddUser} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3 rounded-2xl border text-xs ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border-indigo-200 text-indigo-900'
        }`}>
          🛡️ <strong>Admin Authority:</strong> You can provision new accounts with any role (Student, Peer Tutor, Youth Worker, or Admin) without waiting for self-registration.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Christian John Solis"
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
              placeholder="e.g. cjsolis@isufst.edu.ph"
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
              Assign Role *
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="student">🎓 Student Member</option>
              <option value="tutor">👨‍🏫 Volunteer Peer Tutor</option>
              <option value="worker">✝️ Youth Worker / Missionary</option>
              <option value="leader">🛡️ Ministry Admin</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Assigned Campus *
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {CAMPUSES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              College Degree / Program
            </label>
            <input
              type="text"
              placeholder="e.g. BS Fisheries / BS Nursing"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
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
              className={`w-full px-3 py-2 rounded-xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Senior)</option>
              <option value="Staff">Ministry Staff / Alumnus</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Initial Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-rose-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Create & Add Account to System</span>
        </button>
      </form>
    </Modal>
  );
};
