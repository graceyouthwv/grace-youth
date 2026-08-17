import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { BookOpen, UploadCloud, CheckCircle2, FileText, Trash2 } from 'lucide-react';

export const EditLessonModal = ({ isOpen, onClose, seriesId, lesson }) => {
  const { updateLesson, deleteLesson, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [passage, setPassage] = useState('');
  const [keyTakeaway, setKeyTakeaway] = useState('');
  const [questions, setQuestions] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title || '');
      setPassage(lesson.passage || '');
      setKeyTakeaway(lesson.keyTakeaway || '');
      setQuestions(lesson.questions || '');
      setFileName(lesson.fileName || `${(lesson.title || 'Lesson').replace(/\s+/g, '_')}_Guide.pdf`);
      setFileSize(lesson.fileSize || '1.5 MB');
    }
  }, [lesson]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb > 0 ? sizeMb : '0.8'} MB`);
      showToast(`📎 Attached new file: ${file.name}`, 'info');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a lesson title.', 'error');
      return;
    }

    if (!seriesId || !lesson) return;

    updateLesson(seriesId, lesson.id, {
      title: title.trim(),
      passage: passage.trim() || 'Scripture Reference',
      keyTakeaway: keyTakeaway.trim() || 'Key discipleship principle for campus students.',
      questions: questions.trim() || '1. How does this passage apply to your college journey?',
      fileName: fileName || `${title.replace(/\s+/g, '_')}_Study_Guide.pdf`,
      fileSize: fileSize || '1.2 MB'
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove lesson "${lesson?.title}"?`)) {
      deleteLesson(seriesId, lesson.id);
      onClose();
    }
  };

  if (!lesson) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="✏️ Edit Discipleship Lesson & PDF Guide"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Info Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs ${
          isDark ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
        }`}>
          ✏️ <strong>Update Lesson & Study Files:</strong> Modify the scripture passages, discussion questions, or upload a new revised PDF teacher guide.
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
          <textarea
            rows={2}
            required
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
            Inductive Discussion Questions (Expanded)
          </label>
          <textarea
            rows={3}
            value={questions}
            onChange={(e) => setQuestions(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
        </div>

        {/* Replace Uploaded File Zone */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Attached Study PDF / Handout / Slide Deck
          </label>
          <div className={`p-4 rounded-2xl border border-dashed text-center transition-all ${
            isDark ? 'bg-slate-900/60 border-slate-700' : 'bg-slate-50 border-slate-300'
          }`}>
            <UploadCloud className="w-8 h-8 mx-auto text-amber-500 mb-2" />
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              id="edit-lesson-file-input"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="edit-lesson-file-input"
              className="inline-block px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs cursor-pointer shadow-md transition-all"
            >
              Upload / Replace PDF File
            </label>
            <div className={`text-xs mt-2 font-mono ${fileName ? 'text-emerald-500 font-bold' : isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Current File: {fileName} ({fileSize})
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={handleDelete}
            className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs cursor-pointer ${
                isDark ? 'bg-slate-800 text-slate-300 hover:text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Lesson Changes</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
