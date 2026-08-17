import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { Music, UploadCloud, FileText, CheckCircle2, Sparkles } from 'lucide-react';

export const UploadSongModal = ({ isOpen, onClose, onAddSong }) => {
  const { currentUser, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [songKey, setSongKey] = useState('Key of G');
  const [tempo, setTempo] = useState('72 BPM');
  const [category, setCategory] = useState('Praise & Worship');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a song title.', 'error');
      return;
    }

    const newSong = {
      id: `song-${Date.now()}`,
      song: title.trim(),
      artist: artist.trim() || 'Worship Leader Arrangement',
      key: songKey,
      tempo: tempo.trim() || '70 BPM',
      category,
      fileName: fileName || `${title.replace(/\s+/g, '_')}_Chords.pdf`,
      uploadedBy: currentUser?.name || 'Worship Volunteer',
      uploadedAt: 'Just now',
      notes: notes.trim()
    };

    onAddSong(newSong);
    showToast(`🎸 "${title}" PDF chord sheet added to Music Team library!`, 'success');

    // Reset Form
    setTitle('');
    setArtist('');
    setNotes('');
    setFileName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🎸 Upload Worship Song & PDF Chord Sheet"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Info Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
        }`}>
          🎼 <strong>Music Team Chord Library:</strong> Upload PDF charts, lead sheets, or lyric chords to equip our campus worship team across Iloilo universities.
        </div>

        {/* Song Title & Artist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Song Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Goodness of God"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Original Artist / Band
            </label>
            <input
              type="text"
              placeholder="e.g. Bethel Music / Elevation"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        {/* Musical Key & Tempo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Arranged Key
            </label>
            <select
              value={songKey}
              onChange={(e) => setSongKey(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="Key of C">Key of C</option>
              <option value="Key of D">Key of D</option>
              <option value="Key of E">Key of E</option>
              <option value="Key of F">Key of F</option>
              <option value="Key of G">Key of G (Standard)</option>
              <option value="Key of A">Key of A</option>
              <option value="Key of B">Key of B</option>
              <option value="Key of Bb">Key of Bb</option>
              <option value="Key of Eb">Key of Eb</option>
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Tempo / Time Signature
            </label>
            <input
              type="text"
              placeholder="e.g. 72 BPM • 4/4 or 6/8"
              value={tempo}
              onChange={(e) => setTempo(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        {/* PDF File Upload Zone */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Attach PDF Chord / Lead Sheet
          </label>
          <div className={`p-4 rounded-2xl border border-dashed text-center transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-300'
          }`}>
            <UploadCloud className="w-8 h-8 mx-auto text-indigo-500 mb-2" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              id="song-pdf-input"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label
              htmlFor="song-pdf-input"
              className="inline-block px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              Choose PDF File
            </label>
            <div className={`text-xs mt-2 font-mono ${fileName ? 'text-emerald-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {fileName || 'No file selected (will generate standard PDF chord sheet)'}
            </div>
          </div>
        </div>

        {/* Arrangement Notes */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Arrangement Notes / Dynamic Flow (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Intro acoustic only, build on Chorus 2, guitar bridge solo..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Sticky Footer */}
        <div className={`pt-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-3 rounded-xl font-bold text-xs cursor-pointer ${
              isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Add Song to Music Library</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
