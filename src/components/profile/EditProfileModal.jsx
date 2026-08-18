import React, { useState, useRef } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES } from '../../data/campuses';
import { processImageUpload } from '../../utils/helpers';
import { uploadAvatarToSupabase, syncProfileToSupabase } from '../../lib/supabase';
import {
  User,
  Mail,
  School,
  BookOpen,
  Save,
  Sparkles,
  Camera,
  Upload,
  Link,
  Image as ImageIcon,
  HeartHandshake,
  GraduationCap,
  Loader2,
  Trash2
} from 'lucide-react';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
];

export const EditProfileModal = ({ isOpen, onClose }) => {
  const {
    currentUser,
    setCurrentUser,
    setRegisteredUsers,
    resetUserPassword,
    tutors,
    setTutors,
    showToast,
    theme
  } = useApp();

  const isDark = theme === 'dark';
  const fileInputRef = useRef(null);

  const isTutor = currentUser.role === 'tutor';
  const isWorker = currentUser.role === 'worker';
  const isStudent = currentUser.role === 'student' || currentUser.role === 'guest';

  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'upv');
  const [program, setProgram] = useState(currentUser.program || 'BS Biology');
  const [yearLevel, setYearLevel] = useState(currentUser.yearLevel || '2nd Year');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [avatar, setAvatar] = useState(currentUser.avatar || PRESET_AVATARS[0]);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [newPasswordInput, setNewPasswordInput] = useState('');

  // Tutor Specific Fields
  const [subjectsInput, setSubjectsInput] = useState(
    currentUser.subjects ? currentUser.subjects.join(', ') : 'Calculus 1, General Chemistry'
  );
  const [preferredMode, setPreferredMode] = useState(currentUser.preferredMode || 'Hybrid');
  const [meetingLink, setMeetingLink] = useState(
    currentUser.meetingLink || 'https://meet.google.com/gy-joshua-upv'
  );
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle local image file upload & Supabase Storage sync
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      setSelectedFile(file);
      const compressedDataUrl = await processImageUpload(file, 400, 400);
      setAvatar(compressedDataUrl);

      // Attempt immediate upload to Supabase Storage if configured
      const supabasePublicUrl = await uploadAvatarToSupabase(file, currentUser.id);
      if (supabasePublicUrl) {
        setAvatar(supabasePublicUrl);
        showToast('📸 Profile picture uploaded to Supabase Storage & preview updated!', 'success');
      } else {
        showToast('📸 Profile picture optimized & ready to save!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to process image.', 'error');
    } finally {
      setIsProcessingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) {
      showToast('Please enter an image URL.', 'error');
      return;
    }
    setAvatar(customUrlInput.trim());
    setShowUrlInput(false);
    setCustomUrlInput('');
    showToast('🔗 Image URL applied!', 'info');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Please enter your name.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const subjectsArray = subjectsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const updatedUser = {
      ...currentUser,
      name: name.trim(),
      email: email.trim(),
      campusId,
      campusName: campusObj?.name || 'Iloilo Campus',
      program: program.trim(),
      yearLevel,
      bio: bio.trim(),
      avatar,
      ...(newPasswordInput.trim() && { password: newPasswordInput.trim() }),
      ...(isTutor && { subjects: subjectsArray, preferredMode, meetingLink: meetingLink.trim() })
    };

    if (newPasswordInput.trim()) {
      resetUserPassword(currentUser.email, newPasswordInput.trim());
    }

    setCurrentUser(updatedUser);
    localStorage.setItem('gy_active_session', JSON.stringify(updatedUser));

    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updatedUser } : u))
    );

    // Sync to Supabase profiles table in background
    syncProfileToSupabase(updatedUser);

    // If Tutor, also update their live public tutor card
    if (isTutor) {
      setTutors((prev) =>
        prev.map((t) =>
          t.name === currentUser.name || t.id === currentUser.id
            ? {
                ...t,
                name: updatedUser.name,
                avatar: updatedUser.avatar,
                campusId: updatedUser.campusId,
                campusName: updatedUser.campusName,
                subjects: subjectsArray,
                preferredMode: updatedUser.preferredMode,
                meetingLink: updatedUser.meetingLink,
                bio: updatedUser.bio
              }
            : t
        )
      );
    }

    showToast('✨ Profile updated and synced successfully!', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✏️ Edit Profile (${isTutor ? 'Peer Tutor' : isWorker ? 'Youth Worker' : 'Student'})`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
        {/* Profile Picture Uploader */}
        <div className={`p-4 rounded-3xl border ${
          isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="text-xs font-black uppercase tracking-wider mb-3 flex items-center justify-between text-slate-600 dark:text-slate-400">
            <span>Profile Picture</span>
            <span className="text-[10px] text-pink-500 font-bold">Custom Upload Supported 📸</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Avatar Preview with Camera Trigger */}
            <div className="relative group shrink-0">
              <img
                src={avatar || PRESET_AVATARS[0]}
                alt="Profile Preview"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-indigo-500/30 shadow-md transition-transform group-hover:scale-105"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessingImage}
                className="absolute inset-0 bg-black/40 hover:bg-black/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
                title="Click to Upload Photo"
              >
                {isProcessingImage ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-[9px] font-bold">Upload</span>
                  </>
                )}
              </button>
            </div>

            {/* Upload Buttons & Controls */}
            <div className="flex-1 space-y-2 text-center sm:text-left w-full">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/gif"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessingImage}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5 shadow-xs"
                >
                  {isProcessingImage ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Optimizing...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo from Device</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border cursor-pointer transition-all flex items-center gap-1.5 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Link className="w-3.5 h-3.5 text-pink-500" />
                  <span>Paste URL</span>
                </button>
              </div>

              {/* Paste Image URL Input */}
              {showUrlInput && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    placeholder="https://example.com/your-photo.jpg"
                    value={customUrlInput}
                    onChange={(e) => setCustomUrlInput(e.target.value)}
                    className={`flex-1 px-3 py-1.5 rounded-xl border text-xs ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomUrl}
                    className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {/* Presets Gallery */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  Or pick a preset avatar:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 justify-center sm:justify-start">
                  {PRESET_AVATARS.map((imgUrl, i) => (
                    <img
                      key={i}
                      src={imgUrl}
                      alt={`Preset ${i + 1}`}
                      onClick={() => setAvatar(imgUrl)}
                      className={`w-8 h-8 rounded-xl object-cover cursor-pointer transition-all ${
                        avatar === imgUrl
                          ? 'ring-2 ring-indigo-500 scale-110 shadow-xs'
                          : 'opacity-60 hover:opacity-100 hover:scale-105'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Email Address
            </label>
            <input
              type="email"
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
              Your University Campus *
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
              {isWorker ? 'Ministry Role / Title' : 'Degree Program / Major'}
            </label>
            <input
              type="text"
              placeholder="e.g. BS Fisheries / Campus Missionary"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Tutor Specific Subject & Mode Configuration */}
        {isTutor && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              📚 Tutor Teaching Settings
            </span>

            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Subjects You Can Tutor (comma-separated):
              </label>
              <input
                type="text"
                placeholder="e.g. Math 53 Calculus 1, Chem 16 General Chemistry, Physics 71"
                value={subjectsInput}
                onChange={(e) => setSubjectsInput(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Preferred Tutoring Mode:
              </label>
              <select
                value={preferredMode}
                onChange={(e) => setPreferredMode(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              >
                <option value="Hybrid">Hybrid (In-Person & Online)</option>
                <option value="In-Person">In-Person Only (Campus Library / Lounge)</option>
                <option value="Online">Online Only (Google Meet / Zoom)</option>
              </select>
            </div>

            <div>
              <label className={`block text-[11px] font-bold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                🌐 Your Online Meeting Link (Google Meet / Zoom / Discord):
              </label>
              <input
                type="url"
                placeholder="https://meet.google.com/abc-defg-hij or zoom.us/j/..."
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-mono ${
                  isDark ? 'bg-slate-900 border-slate-800 text-indigo-400' : 'bg-white border-slate-200 text-indigo-600'
                }`}
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Students will use this direct link when joining your booked online peer tutoring sessions.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Year Level
            </label>
            <select
              value={yearLevel}
              onChange={(e) => setYearLevel(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <option value="1st Year">1st Year (Freshman)</option>
              <option value="2nd Year">2nd Year (Sophomore)</option>
              <option value="3rd Year">3rd Year (Junior)</option>
              <option value="4th Year">4th Year (Senior)</option>
              <option value="Staff / Alumni">Staff / Alumni / Partner</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Bio / Note
            </label>
            <input
              type="text"
              placeholder="e.g. Ready to teach and serve classmates!"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl border bg-slate-500/5 dark:bg-slate-900/50 space-y-2">
          <label className={`block text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            🔐 Change Account Password (Optional)
          </label>
          <input
            type="password"
            placeholder="Enter new password to change, or leave blank to keep current..."
            value={newPasswordInput}
            onChange={(e) => setNewPasswordInput(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className={`sticky bottom-0 pt-3 pb-1 border-t flex items-center justify-end gap-2 z-10 ${
          isDark ? 'bg-[#111625]/95 border-slate-800 backdrop-blur-md' : 'bg-white/95 border-slate-200 backdrop-blur-md'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
export default EditProfileModal;
