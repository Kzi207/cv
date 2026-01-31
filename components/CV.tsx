
import React, { useEffect } from 'react';
import { Download, Mail, Phone, MapPin, Globe, X, Printer } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, SKILLS, PROJECTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface CVProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV: React.FC<CVProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePrint = () => {
    // Đặt tên file đẹp hơn khi lưu PDF
    const originalTitle = document.title;
    document.title = `CV_${PERSONAL_INFO.name.replace(/\s+/g, '_')}`;
    window.print();
    document.title = originalTitle;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm overflow-y-auto print:bg-white print:p-0 print:overflow-visible">
      <style>
        {`
          @media print {
            /* Reset overflow để in được nhiều trang */
            html, body {
              height: auto !important;
              overflow: visible !important;
              background: white !important;
            }

            /* Ẩn tất cả mọi thứ */
            body * {
              visibility: hidden;
            }

            /* Chỉ hiện CV */
            #printable-cv, #printable-cv * {
              visibility: visible;
            }

            #printable-cv {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              margin: 0;
              padding: 0;
              box-shadow: none;
              background: white;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors shadow-lg no-print"
        title={t('cv.close')}
      >
        <X size={24} />
      </button>

      <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-start print:py-0 print:px-0">
        
        <div className="w-full max-w-4xl flex justify-between items-center mb-6 text-white no-print animate-fade-in-up">
          <div>
            <h2 className="text-2xl font-bold">{t('cv.title')}</h2>
            <p className="text-slate-400 text-sm">{t('cv.preview')}</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-brand-500/30"
          >
            <Printer size={20} /> {t('cv.download')}
          </button>
        </div>

        <div id="printable-cv" className="w-full max-w-[210mm] bg-white text-slate-800 p-8 md:p-12 rounded-xl shadow-2xl print:shadow-none print:w-full print:max-w-none print:rounded-none animate-fade-in-up">
          <div className="border-b-2 border-slate-200 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">{PERSONAL_INFO.name}</h1>
              <p className="text-xl text-brand-600 font-medium mt-1">{language === 'vi' ? PERSONAL_INFO.title : (PERSONAL_INFO.title_en || PERSONAL_INFO.title)}</p>
              <p className="text-slate-600 mt-4 max-w-lg text-sm leading-relaxed">
                {language === 'vi' ? PERSONAL_INFO.about : (PERSONAL_INFO.about_en || PERSONAL_INFO.about)}
              </p>
            </div>
            <div className="space-y-2 text-sm text-slate-600 min-w-[200px]">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-brand-600" />
                <span>{PERSONAL_INFO.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-brand-600" />
                <span>{PERSONAL_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-600" />
                <span>{PERSONAL_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-brand-600" />
                <a href="#home" className="hover:underline">kzii.site</a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">{t('cv.education')}</h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-slate-800">{edu.school}</h4>
                      <p className="text-brand-600 text-sm font-medium">{language === 'vi' ? edu.degree : (edu.degree_en || edu.degree)}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-slate-500 text-xs italic">{edu.year}</span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{language === 'vi' ? edu.description : (edu.description_en || edu.description)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">{t('cv.projects')}</h3>
                <div className="space-y-4">
                  {PROJECTS.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800">{language === 'vi' ? proj.title : (proj.title_en || proj.title)}</h4>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{language === 'vi' ? proj.description : (proj.description_en || proj.description)}</p>
                      <p className="text-xs text-slate-500 mt-1">Tech: {proj.tags.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">{t('cv.objectives')}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {language === 'vi' ? PERSONAL_INFO.goals : (PERSONAL_INFO.goals_en || PERSONAL_INFO.goals)}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">{t('cv.skills')}</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {SKILLS.map((skill, idx) => (
                    <li key={idx} className="flex items-center justify-between">
                      <span>{skill.name}</span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full">
                        <div className="bg-slate-600 h-1.5 rounded-full" style={{width: `${skill.level}%`}}></div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">{t('cv.interests')}</h3>
                <div className="flex flex-wrap gap-2">
                   {['Coding', 'Robotics', 'IoT', 'Football', 'Travel'].map((tag) => (
                     <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{tag}</span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-slate-500 text-sm no-print">{t('cv.footerTip')}</p>
      </div>
    </div>
  );
};

export default CV;
    