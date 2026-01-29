import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, LOVE_QUOTES } from '../constants';
import { ChevronRight, Clock, Headphones } from 'lucide-react';

interface WelcomeScreenProps {
  onDismiss: () => void;
  onStartMusic: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss, onStartMusic }) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [fadeQuote, setFadeQuote] = useState(true);
  const [time, setTime] = useState(new Date());

  // Clock timer
  useEffect(() => {
    // Random quote lúc đầu
    setQuoteIndex(Math.floor(Math.random() * LOVE_QUOTES.length));

    const timer = setInterval(() => {
        setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Cycle quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeQuote(false); 
      setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % LOVE_QUOTES.length);
        setFadeQuote(true); 
      }, 500); 
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleEnter = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt nếu có
    onStartMusic();
    setIsClosing(true);
    setTimeout(onDismiss, 1000); // Wait for animation
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-all duration-1000 cubic-bezier(0.77, 0, 0.175, 1) ${
        isClosing ? 'opacity-0 scale-105 filter blur-xl' : 'opacity-100 scale-100 blur-0'
      }`}
    >
      {/* Background Layer with Ken Burns Effect */}
      <div className="absolute inset-0 bg-slate-900 select-none overflow-hidden">
         <div 
           className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-ken-burns
           bg-[url('https://files.catbox.moe/4rv1dz.jpg')] 
           md:bg-[url('https://files.catbox.moe/cri6bp.jpg')]"
         ></div>
         
         {/* Noise Overlay Texture for cinematic feel */}
         <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

         {/* Dark Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 backdrop-blur-[1px]"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center justify-center text-center space-y-8">
        
        {/* Avatar Area */}
        <div className="relative group">
            {/* Pulsing Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-white/10 rounded-full animate-pulse-ring"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-white/20 rounded-full animate-pulse-ring delay-75"></div>
            
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-white/10 to-white/60 backdrop-blur-md border border-white/20 shadow-2xl">
                 <img 
                   src="https://files.catbox.moe/wun6c5.png" 
                   alt="Avatar"
                   className="w-full h-full rounded-full object-cover shadow-inner"
                 />
            </div>
            
            <div className="absolute -bottom-2 -right-2 bg-brand-500 text-white p-2 rounded-full shadow-lg border-2 border-slate-900 animate-bounce">
                <Headphones size={16} />
            </div>
        </div>

        {/* Text Info */}
        <div className="space-y-4">
             <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm text-brand-300 text-xs font-medium tracking-widest uppercase animate-fade-in-up">
                Portfolio & CV
             </div>
             
             <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-lg tracking-wide leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                {PERSONAL_INFO.name}
             </h1>
             
             <div className="h-16 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                 <p 
                   className={`text-base md:text-xl text-white/80 font-light italic max-w-xl leading-relaxed transition-all duration-700 ease-in-out ${
                     fadeQuote ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2 blur-sm'
                   }`}
                 >
                   "{LOVE_QUOTES[quoteIndex]}"
                 </p>
             </div>
        </div>

        {/* Action Button - Clear Call to Action */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button 
                onClick={handleEnter}
                className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden"
            >
                <span className="relative z-10">Khám Phá Ngay</span>
                <ChevronRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                
                {/* Button Shine Effect */}
                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 group-hover:animate-[shimmer_1s_infinite]"></div>
            </button>
            <p className="text-white/40 text-xs mt-4">Nhấn để truy cập và bật nhạc nền</p>
        </div>

      </div>

      {/* Footer Elements */}
      <div className="absolute bottom-8 w-full px-8 flex justify-between items-end text-white/60 text-xs font-mono z-10">
           <div className="flex flex-col gap-1">
               <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> System Online</span>
               <span>Ver 2.0.1</span>
           </div>

           <div className="flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
               <Clock size={14} className="text-brand-400"/>
               <span className="tracking-widest">
                 {time.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })}
               </span>
           </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;