import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Users,
  Info,
  Send,
  Trash2,
  UserPlus,
  UserMinus,
  Crown,
  ShieldCheck,
  MapPin,
  Clock,
  Heart,
  BookOpen,
  Sparkles,
  CheckCircle2,
  PlusCircle,
  MessageCircle,
  Flame
} from 'lucide-react';
import { CAMPUSES } from '../../data/campuses';

export const LifeGroupCircleModal = ({ isOpen, onClose, group, initialTab = 'chat' }) => {
  const {
    currentUser,
    sendLifeGroupMessage,
    deleteLifeGroupMessage,
    addLifeGroupMember,
    removeLifeGroupMember,
    addLifeGroupPrayer,
    prayForLifeGroupPrayer,
    toggleLifeGroupPrayerAnswered,
    addLifeGroupPrayerEncouragement,
    deleteLifeGroupPrayer,
    theme,
    showToast
  } = useApp();

  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState(initialTab); // 'chat' | 'prayers' | 'members' | 'info'
  const [messageInput, setMessageInput] = useState('');
  const [selectedTag, setSelectedTag] = useState('Fellowship'); // 'Fellowship' | 'Prayer' | 'Announcement' | 'Scripture'

  // Prayer Form State
  const [showNewPrayerForm, setShowNewPrayerForm] = useState(false);
  const [prayerRequestText, setPrayerRequestText] = useState('');
  const [prayerCategory, setPrayerCategory] = useState('Academics & Exams');
  const [isPrayerAnonymous, setIsPrayerAnonymous] = useState(false);
  const [encouragementInput, setEncouragementInput] = useState({});

  // Add Member Form State
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberCampus, setNewMemberCampus] = useState(group?.campusName || 'UP Visayas');
  const [newMemberRole, setNewMemberRole] = useState('Student Member');
  const [newMemberYear, setNewMemberYear] = useState('1st Year');

  if (!group) return null;

  const isLeader =
    currentUser.role === 'leader' ||
    currentUser.role === 'worker' ||
    currentUser.role === 'council' ||
    (currentUser.name && group.facilitator && currentUser.name.toLowerCase() === group.facilitator.toLowerCase());

  const membersList = group.members || [
    {
      id: 'mem-default-1',
      name: group.facilitator || 'Grace Youth Leader',
      email: 'leader@graceyouth.ph',
      campus: group.campusName || 'All Campuses',
      role: 'Facilitator / Youth Worker',
      yearLevel: 'Staff',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      joinedAt: 'Jan 2026'
    }
  ];

  const chatMessages = group.chatMessages || [];
  const groupPrayers = group.groupPrayers || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    sendLifeGroupMessage(group.id, messageInput.trim(), selectedTag);
    setMessageInput('');
  };

  const handleCreatePrayer = (e) => {
    e.preventDefault();
    if (!prayerRequestText.trim()) {
      showToast('Please enter your prayer request or praise report.', 'error');
      return;
    }

    addLifeGroupPrayer(group.id, {
      request: prayerRequestText.trim(),
      category: prayerCategory,
      isAnonymous: isPrayerAnonymous
    });

    setPrayerRequestText('');
    setShowNewPrayerForm(false);
  };

  const handleAddEncouragement = (prayerId) => {
    const text = encouragementInput[prayerId];
    if (!text || !text.trim()) return;

    addLifeGroupPrayerEncouragement(group.id, prayerId, text.trim());
    setEncouragementInput({ ...encouragementInput, [prayerId]: '' });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) {
      showToast('Please enter the student’s name.', 'error');
      return;
    }

    addLifeGroupMember(group.id, {
      name: newMemberName.trim(),
      email: newMemberEmail.trim() || `${newMemberName.toLowerCase().replace(/\s+/g, '')}@student.edu.ph`,
      campus: newMemberCampus,
      role: newMemberRole,
      yearLevel: newMemberYear,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    });

    setNewMemberName('');
    setNewMemberEmail('');
    setShowAddMemberForm(false);
  };

  const handleRemoveMember = (memberId, memberName) => {
    if (confirm(`Remove ${memberName} from this Life Group roster?`)) {
      removeLifeGroupMember(group.id, memberId);
    }
  };

  const handleDeleteMessage = (messageId) => {
    if (confirm('Delete this message from the group chat?')) {
      deleteLifeGroupMessage(group.id, messageId);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`🌱 ${group.title}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-4">
        {/* Navigation Subtabs (4 Clean Tabs) */}
        <div className={`grid grid-cols-4 gap-1 p-1 rounded-2xl border ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-2 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'chat'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat ({chatMessages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`py-2 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'prayers'
                ? 'bg-rose-600 text-white shadow-md'
                : isDark ? 'text-rose-400 hover:text-white' : 'text-rose-700 hover:text-slate-900 font-bold'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-rose-400/20 text-rose-500" />
            <span>Prayers ({groupPrayers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`py-2 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'members'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Members ({membersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`py-2 rounded-xl text-[11px] sm:text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'info'
                ? isDark ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-900 shadow-xs border border-slate-200'
                : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900 font-bold'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>
        </div>

        {/* TAB 1: GROUP CHAT & FELLOWSHIP THREAD */}
        {activeTab === 'chat' && (
          <div className="space-y-4">
            <div className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${
              isDark ? 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
            }`}>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Life Group stream. Share weekly updates and encouragement.</span>
              </div>
            </div>

            {/* Chat Messages Feed */}
            <div className={`p-4 rounded-3xl border space-y-3.5 max-h-[380px] overflow-y-auto ${
              isDark ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {chatMessages.length > 0 ? (
                chatMessages.map((msg) => {
                  const isAuthor = currentUser.id === msg.senderId || (currentUser.name && currentUser.name === msg.senderName);
                  const canDelete = isAuthor || isLeader;

                  return (
                    <div
                      key={msg.id}
                      className={`p-3.5 rounded-2xl border transition-all ${
                        isAuthor
                          ? isDark ? 'bg-indigo-950/40 border-indigo-500/30' : 'bg-indigo-50/70 border-indigo-200'
                          : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <img
                            src={msg.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={msg.senderName}
                            className="w-8 h-8 rounded-xl object-cover ring-1 ring-indigo-500/30 shrink-0 mt-0.5"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-extrabold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {msg.senderName}
                              </span>
                              {msg.senderRole && (
                                <span className="px-2 py-0.2 rounded-full text-[9px] font-black bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                                  {msg.senderRole}
                                </span>
                              )}
                                {msg.tag && (
                                  <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                                    msg.tag === 'Prayer'
                                      ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                                      : msg.tag === 'Announcement'
                                      ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                                      : 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                                  }`}>
                                    #{msg.tag}
                                  </span>
                                )}
                            </div>
                            <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                              {msg.message}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] text-slate-400">
                            {msg.timestamp}
                          </span>
                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteMessage(msg.id)}
                              className="p-1 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                              title="Delete message"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-xs text-slate-400">
                  No messages yet in this Life Group circle. Be the first to say hello!
                </div>
              )}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="space-y-2">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[11px] font-bold text-slate-400 shrink-0">Tag:</span>
                {['Fellowship', 'Prayer', 'Announcement', 'Scripture'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Message ${group.title} family...`}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className={`flex-1 px-4 py-2.5 rounded-2xl border text-xs sm:text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-hidden ${
                    isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-xs'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: LIFE GROUP PRAYERS & PRAISES */}
        {activeTab === 'prayers' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-sm font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Group Prayer Requests & Praises ({groupPrayers.length})
                </h4>
                <p className="text-xs text-slate-400">
                  Shared specifically within {group.title} Life Group.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowNewPrayerForm(!showNewPrayerForm)}
                className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{showNewPrayerForm ? 'Close Form' : '+ Share Prayer Item'}</span>
              </button>
            </div>

            {/* New Prayer Form */}
            {showNewPrayerForm && (
              <form onSubmit={handleCreatePrayer} className={`p-4 rounded-3xl border space-y-3 animate-in fade-in duration-200 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/70 border-rose-200'
              }`}>
                <div className="text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500/30" />
                  <span>Share Prayer Request or Praise with {group.title}</span>
                </div>

                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="How can your Life Group family stand in prayer with you this week? (e.g. Midterm exams, family health, spiritual breakthrough, praise report)..."
                    value={prayerRequestText}
                    onChange={(e) => setPrayerRequestText(e.target.value)}
                    className={`w-full p-3 rounded-2xl border text-xs leading-relaxed ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Category</label>
                    <select
                      value={prayerCategory}
                      onChange={(e) => setPrayerCategory(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="Academics & Exams">📚 Academics & Exams</option>
                      <option value="Spiritual Growth">🌱 Spiritual Growth & Faith</option>
                      <option value="Family & Health">🏡 Family & Health</option>
                      <option value="Emotional & Peace">🕊️ Mental Peace & Strength</option>
                      <option value="Praise & Thanksgiving">✨ Praise & Thanksgiving</option>
                      <option value="Campus Mission">🌍 Campus Mission & Outreach</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 self-end pb-2">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPrayerAnonymous}
                        onChange={(e) => setIsPrayerAnonymous(e.target.checked)}
                        className="rounded text-rose-600 focus:ring-rose-500"
                      />
                      <span>Post Anonymously</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowNewPrayerForm(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 text-white" />
                    <span>Post Prayer Item</span>
                  </button>
                </div>
              </form>
            )}

            {/* Prayer Cards Stream */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {groupPrayers.length > 0 ? (
                groupPrayers.map((prayer) => {
                  const isAuthor = currentUser.name && prayer.author && currentUser.name.toLowerCase() === prayer.author.toLowerCase();
                  const canManage = isAuthor || isLeader;

                  return (
                    <div
                      key={prayer.id}
                      className={`p-4 rounded-3xl border space-y-3 transition-all ${
                        prayer.isAnswered
                          ? isDark ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-emerald-50/70 border-emerald-200'
                          : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5">
                          <img
                            src={prayer.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                            alt={prayer.author}
                            className="w-8 h-8 rounded-xl object-cover ring-1 ring-rose-500/30 shrink-0 mt-0.5"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className={`font-extrabold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>
                                {prayer.author}
                              </span>
                              {prayer.authorRole && (
                                <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                  {prayer.authorRole}
                                </span>
                              )}
                              <span className="text-[10px] text-slate-400">
                                • {prayer.createdAt}
                              </span>
                            </div>

                            <span className="inline-block mt-0.5 px-2 py-0.2 rounded-full text-[9px] font-bold bg-slate-800 text-slate-300">
                              {prayer.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {prayer.isAnswered ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                              ✨ Answered Prayer
                            </span>
                          ) : canManage ? (
                            <button
                              type="button"
                              onClick={() => toggleLifeGroupPrayerAnswered(group.id, prayer.id)}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/30 cursor-pointer"
                            >
                              Mark Answered
                            </button>
                          ) : null}

                          {canManage && (
                            <button
                              type="button"
                              onClick={() => deleteLifeGroupPrayer(group.id, prayer.id)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                              title="Delete prayer item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                        {prayer.request}
                      </p>

                      {/* Prayer Count & Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-xs">
                        <button
                          type="button"
                          onClick={() => prayForLifeGroupPrayer(group.id, prayer.id)}
                          className="px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 border border-rose-500/30 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                        >
                          <Heart className="w-3.5 h-3.5 fill-rose-500" />
                          <span>Praying ({prayer.prayedCount || 1})</span>
                        </button>

                        <span className="text-[10px] text-slate-400">
                          {prayer.encouragements?.length || 0} Encouragements
                        </span>
                      </div>

                      {/* Encouragement Comments */}
                      {prayer.encouragements && prayer.encouragements.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          {prayer.encouragements.map((enc, eIdx) => (
                            <div key={eIdx} className={`p-2 rounded-xl text-[11px] leading-relaxed ${
                              isDark ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-700'
                            }`}>
                              💬 {enc}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Quick encouragement comment input */}
                      <div className="flex items-center gap-1.5 pt-1">
                        <input
                          type="text"
                          placeholder="Leave a short Bible verse or prayer encouragement..."
                          value={encouragementInput[prayer.id] || ''}
                          onChange={(e) => setEncouragementInput({ ...encouragementInput, [prayer.id]: e.target.value })}
                          className={`flex-1 px-3 py-1.5 rounded-xl border text-[11px] ${
                            isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                          }`}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddEncouragement(prayer.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddEncouragement(prayer.id)}
                          className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-xs text-slate-400 border border-dashed rounded-3xl border-slate-800">
                  <Heart className="w-8 h-8 mx-auto text-rose-400 mb-2 opacity-60" />
                  <div>No prayer requests posted in this Life Group yet.</div>
                  <p className="text-[11px] mt-0.5">Click "+ Share Prayer Item" above to share with your group family.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: MEMBER ROSTER & MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className={`text-sm font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Active Circle Members ({membersList.length}/{group.maxCapacity})
                </h4>
                <p className="text-xs text-slate-400">
                  Students and facilitators connected to this university Life Group.
                </p>
              </div>

              {isLeader && (
                <button
                  type="button"
                  onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{showAddMemberForm ? 'Close Form' : '+ Add Member Manually'}</span>
                </button>
              )}
            </div>

            {/* Add Member Form (Accordion) */}
            {showAddMemberForm && isLeader && (
              <form onSubmit={handleAddMember} className={`p-4 rounded-3xl border space-y-3 animate-in fade-in duration-200 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
                  <UserPlus className="w-4 h-4" />
                  <span>Manually Register / Assign Student to this Life Group</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Timothy Santos"
                      value={newMemberName}
                      onChange={(e) => setNewMemberName(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Email or Contact</label>
                    <input
                      type="text"
                      placeholder="e.g. timothy@upv.edu.ph"
                      value={newMemberEmail}
                      onChange={(e) => setNewMemberEmail(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Campus</label>
                    <select
                      value={newMemberCampus}
                      onChange={(e) => setNewMemberCampus(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      {CAMPUSES.map((c) => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Role in Group</label>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="Student Member">Student Member</option>
                      <option value="Co-Facilitator">Co-Facilitator</option>
                      <option value="Prayer Lead">Prayer Lead</option>
                      <option value="Facilitator / Youth Worker">Facilitator / Youth Worker</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Year Level</label>
                    <select
                      value={newMemberYear}
                      onChange={(e) => setNewMemberYear(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl border text-xs ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="1st Year">1st Year (Freshman)</option>
                      <option value="2nd Year">2nd Year (Sophomore)</option>
                      <option value="3rd Year">3rd Year (Junior)</option>
                      <option value="4th Year">4th Year (Senior)</option>
                      <option value="Staff / Alumni">Staff / Alumni</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowAddMemberForm(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md cursor-pointer"
                  >
                    + Confirm Add Member
                  </button>
                </div>
              </form>
            )}

            {/* Member List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto">
              {membersList.map((mem) => {
                const isMemLeader = mem.role.includes('Facilitator') || mem.role.includes('Leader') || mem.role.includes('Worker');

                return (
                  <div
                    key={mem.id}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={mem.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                          alt={mem.name}
                          className="w-10 h-10 rounded-xl object-cover ring-1 ring-emerald-500/30"
                        />
                        {isMemLeader && (
                          <span className="absolute -bottom-1 -right-1 p-0.5 bg-amber-400 text-slate-950 rounded-full">
                            <Crown className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>

                      <div>
                        <div className={`font-extrabold text-xs font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {mem.name}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{mem.role}</span>
                          <span>•</span>
                          <span>{mem.yearLevel || 'Student'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {mem.campus}
                        </div>
                      </div>
                    </div>

                    {isLeader && !isMemLeader && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(mem.id, mem.name)}
                        className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/20 transition-all cursor-pointer"
                        title="Remove member from roster"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: MEETING DETAILS & DISCIPLESHIP INFO */}
        {activeTab === 'info' && (
          <div className="space-y-4 text-xs">
            <div className={`p-5 rounded-3xl border space-y-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {group.topicCategory}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-400 font-bold">{group.campusName}</span>
              </div>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {group.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-[10px] font-black uppercase text-slate-400">Weekly Schedule</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{group.schedule}</div>
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border flex items-center gap-3 ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <MapPin className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <div className="text-[10px] font-black uppercase text-slate-400">Venue / Location</div>
                    <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{group.location}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
              isDark ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200' : 'bg-emerald-50 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Facilitated by <strong>{group.facilitator}</strong>. 100% free discipleship & campus fellowship.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
