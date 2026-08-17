import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { CAMPUSES, SUBJECT_CATEGORIES } from '../../data/campuses';
import { FileUp, CheckCircle2, Trash2 } from 'lucide-react';

export const EditReviewerModal = ({ isOpen, onClose, reviewer }) => {
  const { updateReviewer, deleteReviewer, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [category, setCategory] = useState('Math & Calculus');
  const [campusId, setCampusId] = useState('all');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [fileSize, setFileSize] = useState('');

  useEffect(() => {
    if (reviewer) {
      setTitle(reviewer.title || '');
      setCourse(reviewer.course || '');
      setCategory(reviewer.category || 'Math & Calculus');
      setCampusId(reviewer.campusId || 'all');
      setDescription(reviewer.description || '');
      setTagsInput(reviewer.tags?.join(', ') || '');
      setLinkUrl(reviewer.link || '');
      setFileSize(reviewer.fileSize || 'PDF Document');
    }
  }, [reviewer]);

  if (!reviewer) return null;

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

    updateReviewer(reviewer.id, {
      title: title.trim(),
      course: course.trim().toUpperCase(),
      category,
      campusId,
      campusName: campusObj?.name || 'All Campuses',
      fileSize: fileSize.trim() || reviewer.fileSize,
      description: description.trim() || reviewer.description,
      tags: tags.length ? tags : reviewer.tags,
      link: linkUrl.trim() || reviewer.link
    });

    onClose();
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to remove reviewer "${reviewer.title}"?`)) {
      deleteReviewer(reviewer.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`✏️ Edit Reviewer: ${reviewer.course}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Reviewer Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Course / Subject Code *
            </label>
            <input
              type="text"
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold uppercase ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
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
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Campus
            </label>
            <select
              value={campusId}
              onChange={(e) => setCampusId(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            >
              <option value="all">📍 All Campuses</option>
              {CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              File Format / Size
            </label>
            <input
              type="text"
              value={fileSize}
              onChange={(e) => setFileSize(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-xl border text-xs sm:text-sm ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
              }`}
            />
          </div>
        </div>

        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Description
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3 py-2 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        {/* Footer */}
        <div className={`pt-3 border-t flex items-center justify-between gap-2 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <button
            type="button"
            onClick={handleDelete}
            className="px-3 py-2.5 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20 font-bold text-xs cursor-pointer flex items-center gap-1"
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
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
