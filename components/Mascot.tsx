
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Music, Send, X, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO, PROJECTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface MascotProps {
  isMusicPlaying: boolean;
}

interface Message {
  id: number;
  type: 'bot' | 'user';
  text: React.ReactNode;
}

const Mascot: React.FC<MascotProps> = ({ isMusicPlaying }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t, language } = useLanguage();

  // Reset messages when language changes
  useEffect(() => {
    setMessages([
        { id: 1, type: 'bot', text: t('mascot.greeting') }
    ]);
  }, [language, t]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const addBotMessage = (text: React.ReactNode) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text }]);
    }, 600 + Math.random() * 400); 
  };

  const processUserMessage = (text: string) => {
    // Thêm tin nhắn người dùng
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: text }]);

    const lowerText = text.toLowerCase();

    // Language specific keywords
    const isVi = language === 'vi';
    
    const contactKeywords = isVi 
        ? ['liên hệ', 'liên lạc', 'tìm', 'gặp', 'email', 'gmail', 'sđt', 'số điện thoại', 'facebook', 'fb', 'zalo', 'nhắn tin', 'gọi', 'ở đâu']
        : ['contact', 'email', 'gmail', 'phone', 'call', 'message', 'reach', 'find', 'facebook', 'zalo', 'address'];
    
    const skillKeywords = isVi
        ? ['giỏi', 'kỹ năng', 'skill', 'công nghệ', 'biết gì', 'làm được gì', 'tech', 'stack', 'ngôn ngữ']
        : ['skill', 'tech', 'stack', 'good at', 'expert', 'know', 'language'];
    
    const cvKeywords = isVi
        ? ['cv', 'hồ sơ', 'resume', 'lý lịch', 'tải', 'download']
        : ['cv', 'resume', 'download', 'pdf', 'profile'];
    
    const projectKeywords = isVi
        ? ['dự án', 'project', 'sản phẩm', 'làm được những gì', 'app', 'web', 'demo']
        : ['project', 'product', 'app', 'web', 'work', 'demo'];
    
    const funKeywords = isVi
        ? ['nhạc', 'music', 'hát', 'bài hát', 'play', 'song']
        : ['music', 'song', 'play', 'listen'];

    const helloKeywords = isVi
        ? ['chào', 'hi', 'hello', 'lô', 'hey']
        : ['hi', 'hello', 'hey', 'greeting'];

    if (contactKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(
            <span>
                {isVi ? "Để tìm hoặc liên hệ với Duy, bạn có các cách sau nè:" : "To contact Duy, you can use:"} <br/>
                📧 Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-brand-500 underline font-bold">{PERSONAL_INFO.email}</a> <br/>
                💬 {isVi ? "Nhắn tin:" : "Message:"} <a href={PERSONAL_INFO.facebook} target="_blank" className="text-brand-500 underline font-bold">Facebook</a> {isVi ? "hoặc" : "or"} <a href={PERSONAL_INFO.zalo} target="_blank" className="text-brand-500 underline font-bold">Zalo</a>.
            </span>
        );
    } 
    else if (skillKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(t('mascot.skill_reply'));
    }
    else if (cvKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(
            <span>
                {t('mascot.cv_reply')} <br/>
                👉 <button onClick={() => document.getElementById('cv-trigger')?.click()} className="text-brand-500 underline font-bold cursor-pointer">{isVi ? "Nhấn vào đây" : "Click here"}</button>
            </span>
        );
    }
    else if (helloKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(t('mascot.greeting'));
    }
    else if (projectKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(
            <div className="flex flex-col gap-2">
                <span className="font-semibold">{isVi ? "Dưới đây là một số dự án tiêu biểu:" : "Here are some featured projects:"}</span>
                <ul className="space-y-3 mt-1">
                    {PROJECTS.map((p, idx) => (
                        <li key={idx} className="bg-slate-100 dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                            <span className="font-bold block text-brand-600 dark:text-brand-400 text-xs">{isVi ? p.title : (p.title_en || p.title)}</span>
                            <span className="text-[10px] opacity-90 block leading-snug mt-1">{isVi ? p.description : (p.description_en || p.description)}</span>
                        </li>
                    ))}
                </ul>
                <span className="mt-1 text-xs italic opacity-75">{isVi ? "Bạn kéo xuống mục Dự án để xem demo nhé! 🚀" : "Scroll down to Projects section for demos! 🚀"}</span>
            </div>
        );
    }
    else if (funKeywords.some(k => lowerText.includes(k))) {
        addBotMessage(t('mascot.music_reply'));
    }
    else if (lowerText.includes('thank') || lowerText.includes('cảm ơn')) {
        addBotMessage(t('mascot.thanks_reply'));
    }
    else if (lowerText.includes('bot') || lowerText.includes('ai')) {
        addBotMessage(t('mascot.bot_reply'));
    }
    else {
        addBotMessage(t('mascot.fallback'));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    processUserMessage(inputValue);
    setInputValue('');
  };

  const handleOptionClick = (option: string) => {
    processUserMessage(option);
  };

  const quickOptions = [
      t('mascot.quick_contact'),
      t('mascot.quick_cv'),
      t('mascot.quick_skill'),
      t('mascot.quick_fun')
  ];

  return (
    <>
    <div className="fixed bottom-4 left-4 z-[90] flex items-end font-sans">
      
      {/* Chat Window */}
      <div 
        className={`absolute bottom-16 left-0 w-[300px] md:w-[350px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 origin-bottom-left flex flex-col ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: '80vh' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-500 to-blue-600 p-4 flex justify-between items-center text-white flex-shrink-0">
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-full">
                    <Bot size={20} />
                </div>
                <div>
                    <h3 className="font-bold text-sm">KZ-Bot Assistant</h3>
                    <p className="text-[10px] opacity-80 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                    </p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors"><X size={18} /></button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
            {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.type === 'bot' && (
                        <div className="w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-2 mt-1 flex-shrink-0 text-xs font-bold border border-brand-200">AI</div>
                    )}
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm break-words leading-relaxed ${
                        msg.type === 'user' 
                        ? 'bg-brand-500 text-white rounded-br-none' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
            
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700 flex gap-1 items-center">
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions (Suggestions) */}
        <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex-shrink-0 overflow-x-auto no-scrollbar">
             <div className="flex gap-2">
                 {quickOptions.map(opt => (
                     <button 
                        key={opt}
                        onClick={() => handleOptionClick(opt)}
                        className="flex-shrink-0 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-brand-50 dark:hover:bg-slate-700 text-brand-600 dark:text-brand-400 text-xs rounded-full border border-slate-200 dark:border-slate-700 transition-colors shadow-sm whitespace-nowrap"
                     >
                         {opt}
                     </button>
                 ))}
             </div>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 flex-shrink-0">
            <input 
                ref={inputRef}
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t('mascot.placeholder')}
                className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all"
            />
            <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-2 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-full transition-colors shadow-md disabled:shadow-none"
            >
                <Send size={16} className={inputValue.trim() ? "ml-0.5" : ""} />
            </button>
        </form>
      </div>

      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative cursor-pointer group transition-all duration-300 hover:scale-110 active:scale-95`}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-brand-500/30 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Main Icon container */}
        <div className={`w-14 h-14 bg-gradient-to-tr from-brand-500 to-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-brand-500/40 relative z-10 overflow-hidden ring-4 ring-white dark:ring-slate-900 transition-all ${isOpen ? 'rotate-90' : ''}`}>
           {isOpen ? <X size={24} /> : <MessageSquare size={24} className="animate-pulse" />}
        </div>

        {/* Status Badge */}
        {!isOpen && (
            <div className="absolute top-0 right-0 z-20">
            {isMusicPlaying ? (
                <div className="bg-green-500 p-1 rounded-full border-2 border-white dark:border-slate-900 animate-spin-slow">
                <Music size={10} className="text-white" />
                </div>
            ) : (
                <div className="w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
            )}
            </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Mascot;
