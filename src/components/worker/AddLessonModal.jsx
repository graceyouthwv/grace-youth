import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { BookOpen, UploadCloud, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export const AddLessonModal = ({ isOpen, onClose, defaultSeriesId }) => {
  const { curriculumSeries, addLessonToSeries, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [seriesId, setSeriesId] = useState(defaultSeriesId || curriculumSeries[0]?.id || 'ser-1');
  const [title, setTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [keyTakeaway, setKeyTakeaway] = useState('');
  const [questions, setQuestions] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('1.5 MB');

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb > 0 ? sizeMb : '0.8'} MB`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a lesson title.', 'error');
      return;
    }

    addLessonToSeries(seriesId, {
      title: title.trim(),
      passage: passage.trim() || 'Scripture Reference',
      keyTakeaway: keyTakeaway.trim() || 'Key discipleship principle for campus students.',
      questions: questions.trim() || '1. How does this passage apply to your college journey?',
      fileName: fileName || `${title.replace(/\s+/g, '_')}_Study_Guide.pdf`,
      fileSize
    });

    // Reset Form
    setTitle('');
    setPassage('');
    setKeyTakeaway('');
    setQuestions('');
    setFileName('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📖 Create Discipleship Lesson & Attach PDF"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Info Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs ${
          isDark ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}>
          ✨ <strong>Youth Worker Lesson Creator:</strong> Add custom discipleship lessons, upload your study PDF/slides, and make them downloadable for campus students and small group leaders.
        </div>

        {/* Series Selector */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Assign to Discipleship Series Track *
          </label>
          <select
            value={seriesId}
            onChange={(e) => setSeriesId(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          >
            {curriculumSeries.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.type || s.level})
              </option>
            ))}
          </select>
        </div>

        {/* Lesson Title & Scripture */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Lesson Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Identity in Christ Under Pressure"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Scripture Passage *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Romans 8:31-39"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        {/* Key Takeaway */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Key Spiritual Principle / Takeaway *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. God's steadfast love anchors our peace during college finals."
            value={keyTakeaway}
            onChange={(e) => setKeyTakeaway(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        {/* Discussion Questions */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Inductive Discussion Questions (Optional)
          </label>
          <textarea
            rows={2}
            placeholder="1. What stands out to you in this passage? 2. How can we pray for one another this week?"
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Upload File Zone */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Attach Study PDF / Handout / Slide Deck
          </label>
          <div className={`p-4 rounded-2xl border border-dashed text-center transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-300'
          }`}>
            <UploadCloud className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              id="lesson-file-input"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="lesson-file-input"
              className="inline-block px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              Choose PDF / Slide File
            </label>
            <div className={`text-xs mt-2 font-mono ${fileName ? 'text-emerald-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {fileName ? `${fileName} (${fileSize})` : 'No file chosen (will generate clean PDF lesson handout)'}
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Create Lesson & Attach PDF</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
