
import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon, Coffee, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header: React.FC<{ onOpenCV: () => void; theme: string; toggleTheme: () => void; }> = ({ onOpenCV, theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  const NAV_ITEMS = [
    { label: t('nav.home'), href: '#home' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.skills'), href: '#skills' },
    { label: t('nav.projects'), href: '#projects' },
    { label: t('nav.cv'), href: '#cv' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault(); 
    
    if (href === '#cv') {
      onOpenCV();
    } else {
      const element = document.querySelector(href);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white group transition-colors"
        >
          <div className="bg-brand-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-brand-500/30">
             <Code2 size={24} className="text-white" />
          </div>
          <span>kzii<span className="text-brand-500">.site</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <nav className="flex items-center gap-6 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.href} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-brand-500 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-700">
             {/* Language Toggle */}
             <button
               onClick={toggleLanguage}
               className="p-1.5 rounded-lg text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-1 min-w-[32px] justify-center"
               title="Switch Language"
             >
               {language === 'vi' ? '🇻🇳' : '🇺🇸'}
             </button>

             {/* Donate Button (Desktop) */}
             <a
                href="#donate"
                onClick={(e) => handleNavClick(e, '#donate')}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
             >
                <Coffee size={14} /> 
                <span>{t('nav.donate')}</span>
             </a>

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all transform hover:scale-110"
              title={theme === 'dark' ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex items-center gap-3 md:hidden">
           <button
             onClick={toggleLanguage}
             className="p-1.5 rounded-lg text-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
           >
             {language === 'vi' ? '🇻🇳' : '🇺🇸'}
           </button>

           <a
                href="#donate"
                onClick={(e) => handleNavClick(e, '#donate')}
                className="p-2 text-pink-500 hover:text-pink-600 transition-colors"
             >
                <Coffee size={24} /> 
           </a>

          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            className="text-slate-800 dark:text-slate-300 hover:text-brand-500 dark:hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-xl transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="flex flex-col py-4">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="px-6 py-3 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
            >
              {item.label}
            </a>
          ))}
          <a 
             href="#donate"
             onClick={(e) => handleNavClick(e, '#donate')}
             className="px-6 py-3 text-pink-500 font-bold hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-colors flex items-center gap-2"
          >
             <Coffee size={18} /> {t('nav.donate')}
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
