import React, { useState, useEffect } from 'react';
import { ArrowDown, Github, Facebook, MessageCircle, FileText, Sparkles, User, GraduationCap, Heart, Code } from 'lucide-react';
import { PERSONAL_INFO, ABOUT_TABS } from '../constants';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onOpenCV: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenCV }) => {
  const [typedText, setTypedText] = useState('');
  const [activeTab, setActiveTab] = useState(ABOUT_TABS[0].id);
  const fullText = PERSONAL_INFO.title;
  
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let currentIndex = 0;
    
    // Typing effect logic
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 40 + Math.random() * 30); // Random delay for realism
      }
    };

    timeoutId = setTimeout(typeNextChar, 500);

    return () => clearTimeout(timeoutId);
  }, [fullText]);

  const getTabIcon = (id: string) => {
      switch(id) {
          case 'student': return <GraduationCap size={16} />;
          case 'tech': return <Code size={16} />;
          case 'hobbies': return <Heart size={16} />;
          default: return <User size={16} />;
      }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      
      {/* 1. Animated Tech Grid Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-700 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] opacity-40 animate-grid-move"></div>
        {/* Radial Gradient overlay to fade edges */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50 dark:from-slate-900 dark:via-transparent dark:to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-50 via-transparent to-slate-50 dark:from-slate-900 dark:via-transparent dark:to-slate-900"></div>
      </div>

      {/* 2. Glow Orbs */}
      <div className="absolute top-20 right-0 -z-10 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-[100px] translate-x-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px] -translate-x-1/2 animate-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content - Slide Right */}
        <div className="space-y-8">
          <ScrollReveal variant="right" immediate>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-full text-brand-600 dark:text-brand-400 text-sm font-semibold shadow-sm hover:scale-105 transition-transform cursor-default">
              <Sparkles size={14} className="text-yellow-500" /> 
              <span>Xin chào, mình là</span>
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="right" delay={100} immediate>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={200} immediate>
            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light h-8 flex items-center">
              <span className="text-brand-500 mr-2 text-2xl font-bold">{'>'}</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-purple-600 dark:from-brand-400 dark:to-purple-400 font-semibold">
                {typedText}
              </span>
              <span className="animate-pulse ml-1 w-0.5 h-6 bg-brand-500 block"></span>
            </div>
          </ScrollReveal>

          {/* Interactive About Me Tabs - Slide Up */}
          <ScrollReveal variant="up" delay={300} immediate>
            <div className="space-y-4">
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-xl inline-flex gap-1 border border-slate-200 dark:border-slate-700">
                    {ABOUT_TABS.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                activeTab === tab.id 
                                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-white shadow-md scale-105' 
                                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/30'
                            }`}
                        >
                            {getTabIcon(tab.id)}
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="min-h-[80px]">
                    {ABOUT_TABS.map((tab) => (
                        activeTab === tab.id && (
                            <p key={tab.id} className="text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed animate-blur-in text-lg">
                                {tab.content}
                            </p>
                        )
                    ))}
                </div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal variant="up" delay={400} immediate>
            <div className="flex flex-wrap gap-4 pt-2">
              <a 
                href="#contact" 
                className="relative px-8 py-3.5 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 hover:-translate-y-1 active:translate-y-0 overflow-hidden group"
              >
                <span className="relative z-10">Liên hệ ngay</span>
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </a>
              <button 
                onClick={onOpenCV}
                className="px-8 py-3.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-bold transition-all flex items-center gap-2 group shadow-sm hover:shadow-lg hover:-translate-y-1 active:translate-y-0"
              >
                <FileText size={18} className="group-hover:text-brand-500 transition-colors" /> Xem CV
              </button>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="up" delay={500} immediate>
            <div className="flex gap-6 pt-4 text-slate-400 dark:text-slate-500">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-all hover:scale-125 hover:rotate-6 duration-300" title="GitHub"><Github size={24} /></a>
              <a href={PERSONAL_INFO.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-600 dark:hover:text-blue-500 transition-all hover:scale-125 hover:-rotate-6 duration-300" title="Facebook"><Facebook size={24} /></a>
              <a href={PERSONAL_INFO.zalo} target="_blank" rel="noreferrer" className="hover:text-blue-500 dark:hover:text-blue-400 transition-all hover:scale-125 hover:rotate-6 duration-300" title="Zalo"><MessageCircle size={24} /></a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Content (Avatar) - Slide Left & Float */}
        <ScrollReveal variant="left" delay={200} immediate className="relative hidden md:block group perspective-1000">
           {/* Floating Animation Wrapper */}
           <div className="animate-float">
             <div className="relative z-10 w-80 h-80 mx-auto rounded-[2rem] overflow-hidden border-8 border-white/50 dark:border-slate-800/50 backdrop-blur-md shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform group-hover:scale-105">
               <img 
                 src="https://picsum.photos/400/400?grayscale" 
                 alt="Avatar" 
                 className="w-full h-full object-cover group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
               />
               
               {/* Overlay Gradient on Hover */}
               <div className="absolute inset-0 bg-gradient-to-t from-brand-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
             </div>
             
             {/* Decorative Background Element */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-brand-500 to-purple-600 rounded-[2rem] -rotate-6 -z-10 group-hover:rotate-0 transition-all duration-700 opacity-30 dark:opacity-50 group-hover:scale-105 blur-xl"></div>
           </div>
        </ScrollReveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-400 dark:text-slate-500 cursor-pointer hover:text-brand-500 transition-colors p-2">
        <a href="#about"><ArrowDown size={24} /></a>
      </div>
    </section>
  );
};

export default Hero;