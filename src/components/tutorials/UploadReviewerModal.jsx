import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES, SUBJECT_CATEGORIES } from '../../data/campuses';
import { FileUp, Sparkles, BookOpen, Link, CheckCircle2 } from 'lucide-react';

export const UploadReviewerModal = ({ isOpen, onClose }) => {
  const { currentUser, setReviewers, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('Math & Calculus');
  const [campusId, setCampusId] = useState(currentUser.campusId || 'all');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fileSize, setFileSize] = useState('2.4 MB PDF');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !course.trim()) {
      showToast('Please enter a reviewer title and course code.', 'error');
      return;
    }

    const campusObj = CAMPUSES.find((c) => c.id === campusId);
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const newReviewer = {
      id: `rev-${Date.now()}`,
      title: title.trim(),
      course: course.trim().toUpperCase(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Campuses',
      downloads: 1,
      fileSize: fileSize.trim() || 'PDF Document',
      contributor: currentUser.name || 'Student Contributor',
      description: description.trim() || 'Comprehensive study outline and mock practice questions.',
      tags: tags.length ? tags : ['Notes', 'Exam Prep', 'Grace Youth'],
      link: linkUrl.trim() || '#'
    };

    setReviewers((prev) => [newReviewer, ...prev]);
    showToast('📚 Reviewer uploaded successfully! Available in the vault.', 'success');
    onClose();
    setTitle('');
    setCourse('');
    setDescription('');
    setTagsInput('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📤 Share an Academic Reviewer / Cheatsheet"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div className={`p-3.5 rounded-2xl border text-xs leading-relaxed ${
          isDark ? 'bg-sky-950/40 border-sky-500/30 text-sky-200' : 'bg-sky-50 border-sky-200 text-sky-900'
        }`}>
          <span className="font-bold">✨ Pay it Forward:</span> Upload your formulas, midterms outlines, or mock drills to help college freshmen and fellow batchmates across Western Visayas!
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Reviewer Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Math 53 Calculus 1 Comprehensive Cheat Sheet & Derivations"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Course / Subject Code *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. MATH 53, CHEM 16, NURS 101"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold uppercase ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {SUBJECT_CATEGORIES.filter((c) => c !== 'All Subjects').map((cat, i) => (
                <option key={i} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              University / Campus *
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              File Format / Size
            </label>
            <input
              type="text"
              placeholder="e.g. 2.4 MB PDF or Google Doc"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Google Drive / Cloud Download Link (Optional)
          </label>
          <input
            type="url"
            placeholder="https://drive.google.com/..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Short Description & Topics Covered
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Includes midterms review problem set with step-by-step solutions for limits and derivatives..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Keywords / Tags (comma-separated)
          </label>
          <input
            type="text"
            placeholder="e.g. Finals, Formulas, Derivations, CheatSheet"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-violet-600 hover:from-sky-400 hover:to-violet-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <FileUp className="w-4 h-4" />
          <span>Upload to Reviewer Vault</span>
        </button>
      </form>
    </Modal>
  );
};
