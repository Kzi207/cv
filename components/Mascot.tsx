import React, { useState, useEffect, useRef } from 'react';
import { Bot, Music, Send, X, MessageSquare, User, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'bot', text: "Xin chào! Mình là AI Assistant của Duy. Mình có thể giúp gì cho bạn?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
    }, 800 + Math.random() * 500); // Random delay cho tự nhiên
  };

  const processUserMessage = (text: string) => {
    // Thêm tin nhắn người dùng
    setMessages(prev => [...prev, { id: Date.now(), type: 'user', text: text }]);

    const lowerText = text.toLowerCase();

    // Logic xử lý từ khóa đơn giản
    if (lowerText.includes('liên hệ') || lowerText.includes('email') || lowerText.includes('sđt') || lowerText.includes('facebook') || lowerText.includes('gặp')) {
        addBotMessage(
            <span>
                Bạn có thể gửi email qua <a href={`mailto:${PERSONAL_INFO.email}`} className="text-brand-500 underline font-bold">{PERSONAL_INFO.email}</a> hoặc nhắn tin qua <a href={PERSONAL_INFO.facebook} target="_blank" className="text-brand-500 underline font-bold">Facebook</a> nhé!
            </span>
        );
    } 
    else if (lowerText.includes('giỏi') || lowerText.includes('kỹ năng') || lowerText.includes('skill') || lowerText.includes('công nghệ') || lowerText.includes('biết gì')) {
        addBotMessage("Duy hiện đang tập trung mạnh vào Web Development (React, Node.js) và IoT (Arduino, ESP32). Cậu ấy thích kết hợp phần cứng và phần mềm!");
    }
    else if (lowerText.includes('cv') || lowerText.includes('hồ sơ') || lowerText.includes('resume')) {
        addBotMessage("Bạn có thể xem và tải CV trực tiếp bằng cách nhấn nút 'CV Online' trên thanh menu hoặc ở đầu trang web.");
    }
    else if (lowerText.includes('chào') || lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('lô')) {
        addBotMessage("Chào bạn! Chúc bạn một ngày tốt lành. Bạn cần mình giúp gì không?");
    }
    else if (lowerText.includes('dự án') || lowerText.includes('project') || lowerText.includes('sản phẩm')) {
        addBotMessage("Duy có nhiều dự án thú vị về Web và IoT. Bạn hãy kéo xuống phần 'Dự Án' để xem chi tiết nhé!");
    }
    else if (lowerText.includes('nhạc') || lowerText.includes('music') || lowerText.includes('hát')) {
        addBotMessage("Web có tích hợp trình phát nhạc đó! Bạn nhấn vào biểu tượng cài đặt (bánh răng) ở cạnh phải để bật nhạc nha 🎧");
    }
    else if (lowerText.includes('chuyện vui') || lowerText.includes('hài') || lowerText.includes('joke')) {
         const jokes = [
             "Tại sao lập trình viên không thích thiên nhiên? Vì nó có quá nhiều bugs.",
             "Một câu SQL bước vào quán bar, đi đến hai cái bàn và hỏi: 'Tôi có thể tham gia (JOIN) không?'",
             "Hardware: Phần bạn có thể đá vào. Software: Phần bạn chỉ có thể chửi.",
             "Code chạy là được, đừng đụng vào nếu không muốn nó nổ tung 💥"
         ];
         addBotMessage(jokes[Math.floor(Math.random() * jokes.length)]);
    }
    else {
        addBotMessage("Xin lỗi, mình chưa hiểu ý bạn lắm. Bạn thử hỏi về 'Kỹ năng', 'Liên hệ' hoặc 'Dự án' xem sao?");
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
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm break-words ${
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
                 {['Liên hệ với Duy?', 'Duy giỏi gì nhất?', 'CV của Duy?', 'Kể chuyện vui đi!'].map(opt => (
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
                placeholder="Nhập tin nhắn..."
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
        {/* Tooltip if closed */}
        {!isOpen && (
             <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 whitespace-nowrap bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                 Chat với mình nhé!
                 <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-1 border-4 border-transparent border-r-white dark:border-r-slate-800"></div>
             </div>
        )}

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