import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Send, X, Users, Sparkles, BookOpen, Heart, ShieldCheck, Hash } from 'lucide-react';

const INITIAL_MESSAGES = {
  fellowship: [],
  acads: [],
  prayer: []
};

export const CampusChatDrawer = ({ isOpen, onClose }) => {
  const { currentUser, showToast, theme } = useApp();
  const isDark = theme === 'dark';

  const [channel, setChannel] = useState('fellowship'); // 'fellowship' | 'acads' | 'prayer'
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('gy_live_chat_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('gy_live_chat_messages', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, channel]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender: currentUser.name || 'Student Member',
      avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role: currentUser.role || 'student',
      roleLabel: currentUser.roleLabel || 'Student',
      campus: currentUser.campusName?.split(' ')[0] || 'Iloilo',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => ({
      ...prev,
      [channel]: [...(prev[channel] || []), newMessage]
    }));

    setInputText('');

    // Simulated community auto-reply after 2 seconds
    if (channel === 'acads') {
      setTimeout(() => {
        const autoReply = {
          id: `reply-${Date.now()}`,
          sender: 'Grace Youth Peer Bot',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
          role: 'tutor',
          roleLabel: 'Verified Tutor',
          campus: 'Iloilo Hub',
          text: 'Got your question! A peer tutor from your campus has been notified.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => ({
          ...prev,
          acads: [...(prev.acads || []), autoReply]
        }));
      }, 1500);
    }
  };

  const channelList = [
    { id: 'fellowship', name: 'general-campus', icon: Users, desc: 'Citywide fellowship & welcoming chat' },
    { id: 'acads', name: 'acads-q-and-a', icon: BookOpen, desc: 'Peer study help & homework questions' },
    { id: 'prayer', name: 'prayer-circle', icon: Heart, desc: 'Scripture shares & encouragement' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl border-l z-50 animate-in slide-in-from-right duration-300 ${
          isDark ? 'bg-[#0f1422] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Header */}
        <div className={`p-4 border-b flex items-center justify-between ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-500 text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`font-extrabold text-sm font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Campus Live Chat & Community
              </h3>
              <p className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live across Iloilo Campuses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Channel Selector */}
        <div className={`flex items-center gap-1 p-2 border-b overflow-x-auto scrollbar-none ${
          isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-100/60'
        }`}>
          {channelList.map((ch) => {
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                onClick={() => setChannel(ch.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  channel === ch.id
                    ? 'bg-indigo-600 text-white shadow-sm font-black'
                    : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Hash className="w-3 h-3 opacity-60" />
                <span>{ch.name}</span>
              </button>
            );
          })}
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
          {(messages[channel] || []).map((msg) => {
            const isMe = msg.sender === currentUser.name;
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${isMe ? 'flex-row-reverse' : ''}`}
              >
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-8 h-8 rounded-xl object-cover ring-1 ring-indigo-500/30 shrink-0"
                />
                <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end' : ''}`}>
                  <div className={`flex items-center gap-1.5 text-[10px] ${isMe ? 'justify-end' : ''}`}>
                    <span className={`font-bold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>{msg.sender}</span>
                    <span className="text-slate-400 font-mono">{msg.time}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl leading-relaxed text-xs shadow-xs ${
                      isMe
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-tr-none'
                        : isDark
                        ? 'bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none'
                        : 'bg-slate-100 border border-slate-200 text-slate-900 rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSendMessage} className={`p-3 border-t flex items-center gap-2 ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-slate-50'
        }`}>
          <input
            type="text"
            placeholder={`Message #${channelList.find((c) => c.id === channel)?.name}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className={`flex-1 px-3.5 py-2.5 rounded-2xl border text-xs sm:text-sm focus:outline-hidden ${
              isDark ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500'
            }`}
          />
          <button
            type="submit"
            className="p-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-all cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
