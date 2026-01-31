
import React from 'react';
import { TIMELINE } from '../constants';
import { Briefcase, Code, GraduationCap, Star } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

const getIcon = (type: string) => {
  switch (type) {
    case 'school': return <GraduationCap size={18} />;
    case 'code': return <Code size={18} />;
    case 'work': return <Briefcase size={18} />;
    case 'star': return <Star size={18} />;
    default: return <Star size={18} />;
  }
};

const Timeline: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {t('timeline.title')} <span className="text-brand-500">{t('timeline.titleHighlight')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {t('timeline.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-3xl mx-auto">
          {TIMELINE.map((item, index) => (
            <ScrollReveal key={index} delay={index * 150} className="relative pl-8 md:pl-0">
              {/* Vertical Line */}
              {index !== TIMELINE.length - 1 && (
                <div className="absolute left-8 md:left-1/2 top-10 bottom-[-40px] w-0.5 bg-slate-200 dark:bg-slate-700 -translate-x-1/2 md:block hidden"></div>
              )}
               {/* Mobile Line */}
               {index !== TIMELINE.length - 1 && (
                <div className="absolute left-[11px] top-10 bottom-[-40px] w-0.5 bg-slate-200 dark:bg-slate-700 block md:hidden"></div>
              )}

              <div className={`md:flex items-center justify-between gap-8 mb-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}>
                {/* Content Box */}
                <div className="flex-1 ml-6 md:ml-0">
                  <div className={`bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow relative
                    ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}
                  `}>
                    {/* Arrow for Desktop */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-slate-800 border-t border-r border-slate-100 dark:border-slate-700 transform rotate-45
                        ${index % 2 === 0 ? '-left-1.5 border-t-0 border-r-0 border-b border-l' : '-right-1.5'}
                    `}></div>

                    <span className="inline-block px-2 py-1 rounded bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-xs font-bold mb-2">
                      {item.year}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                      {language === 'vi' ? item.title : (item.title_en || item.title)}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {language === 'vi' ? item.description : (item.description_en || item.description)}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 z-10">
                  {getIcon(item.icon || 'star')}
                </div>

                {/* Empty Space for Grid */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
