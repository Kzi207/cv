
import React from 'react';
import { FOCUS_AREAS } from '../constants';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

const FocusAreas: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              {t('focus.title')} <span className="text-brand-500">{t('focus.titleHighlight')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm">
              {t('focus.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {FOCUS_AREAS.map((area, index) => {
            const Icon = area.icon;
            return (
              <ScrollReveal key={area.id} delay={index * 150}>
                <div className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-slate-100 dark:border-slate-700 h-full">
                  {/* Background Gradient Blob */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${area.color} opacity-10 group-hover:opacity-20 rounded-full blur-2xl transition-opacity duration-500`}></div>
                  
                  {/* Icon Box */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${area.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-brand-500 transition-colors">
                    {language === 'vi' ? area.title : (area.title_en || area.title)}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    {language === 'vi' ? area.description : (area.description_en || area.description)}
                  </p>

                  {/* Decorative line */}
                  <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${area.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;
