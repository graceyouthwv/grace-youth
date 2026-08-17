import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { BookOpen, CheckCircle2, Sparkles, Layers } from 'lucide-react';

export const AddSeriesModal = ({ isOpen, onClose }) => {
  const { addCurriculumSeries, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [level, setLevel] = useState('Optional Elective');
  const [isOptional, setIsOptional] = useState(true);
  const [color, setColor] = useState('from-indigo-600 to-violet-600');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter a discipleship series title.', 'error');
      return;
    }

    addCurriculumSeries({
      title: title.trim(),
      subtitle: subtitle.trim() || '4-Week Campus Small Group Series',
      level: isOptional ? 'Optional Elective' : level,
      type: isOptional ? 'Optional Elective' : 'Core Required',
      isOptional,
      color,
      description: description.trim() || 'Equipping campus disciples across Iloilo universities.',
      lessons: []
    });

    // Reset Form
    setTitle('');
    setSubtitle('');
    setDescription('');
    setIsOptional(true);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🏛️ Set Discipleship Series Track for All Youth Workers"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
        {/* Info Banner */}
        <div className={`p-3.5 rounded-2xl border text-xs ${
          isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
        }`}>
          📜 <strong>Global Curriculum Governance:</strong> Define required or optional series tracks that appear across all Youth Worker discipleship trackers and student portals.
        </div>

        {/* Series Title */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Series Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Christian Apologetics on Campus"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        {/* Subtitle / Focus */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Subtitle / Focus
          </label>
          <input
            type="text"
            placeholder="e.g. 4-Week Intellectual & Biblical Worldview Series"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
            }`}
          />
        </div>

        {/* Track Type: Core Required vs Optional Elective */}
        <div className={`p-3.5 rounded-2xl border space-y-2 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
        }`}>
          <label className={`block text-xs font-black uppercase tracking-wider ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Series Requirement for All Youth Workers
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setIsOptional(false);
                setLevel('Level 1: New Believer');
              }}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                !isOptional
                  ? 'bg-emerald-600 text-white border-emerald-500 font-black shadow-md'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-bold text-xs">🌟 Core Required</div>
              <div className="text-[10px] opacity-80 mt-0.5">Mandatory milestone track for all students.</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOptional(true);
                setLevel('Optional Elective');
              }}
              className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                isOptional
                  ? 'bg-indigo-600 text-white border-indigo-500 font-black shadow-md'
                  : isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              <div className="font-bold text-xs">✨ Optional Elective</div>
              <div className="text-[10px] opacity-80 mt-0.5">Specialized elective series for youth workers to choose.</div>
            </button>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className={`block text-xs font-black uppercase tracking-wider mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            Series Overview & Discipleship Goal
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Equips students to engage difficult questions about faith, science, and morality."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full px-3.5 py-2.5 rounded-xl border text-xs ${
              isDark ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
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
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Series to All Youth Workers</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
