import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CV from './components/CV';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Mascot from './components/Mascot';
import FocusAreas from './components/FocusAreas';
import SettingsPanel from './components/SettingsPanel';
import DonateSection from './components/DonateSection';
import MagicCursor from './components/MagicCursor';
import TechStack from './components/TechStack';
import FpsCounter from './components/FpsCounter';
import { PLAYLIST } from './constants';

function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  
  // Lazy initialization for theme
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  // Sync theme with DOM and LocalStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleTrackChange = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    if (!isMusicPlaying) setIsMusicPlaying(true);
  }, [isMusicPlaying]);

  const handleTogglePlay = useCallback(() => {
    setIsMusicPlaying(prev => !prev);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50 transition-colors duration-300 selection:bg-brand-500 selection:text-white">
      
      {/* Magic Cursor Feature */}
      <MagicCursor />

      <Header 
        onOpenCV={() => setIsCVOpen(true)}
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      <SettingsPanel 
        theme={theme} 
        toggleTheme={toggleTheme} 
        currentTrackIndex={currentTrackIndex}
        onTrackSelect={handleTrackChange}
        isPlaying={isMusicPlaying}
        onTogglePlay={handleTogglePlay}
      />

      <main>
        <Hero onOpenCV={() => setIsCVOpen(true)} />
        
        {/* Tech Stack Marquee */}
        <TechStack />

        <div id="about"></div>
        <FocusAreas />

        <Skills />
        <Projects />
        
        <CV isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        
        <DonateSection />
        
        <Contact />
      </main>

      <Footer />

      {/* Utilities */}
      <Mascot isMusicPlaying={isMusicPlaying} />
      <FpsCounter />
      <BackToTop />
    </div>
  );
}

export default App;