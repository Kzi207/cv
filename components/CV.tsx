import React, { useEffect } from 'react';
import { Download, Mail, Phone, MapPin, Globe, X, Printer } from 'lucide-react';
import { PERSONAL_INFO, EDUCATION, SKILLS, PROJECTS } from '../constants';

interface CVProps {
  isOpen: boolean;
  onClose: () => void;
}

const CV: React.FC<CVProps> = ({ isOpen, onClose }) => {
  // Khóa cuộn trang khi mở CV
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
    window.print();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm overflow-y-auto print:bg-white print:p-0 print:overflow-visible">
      {/* Print Styles */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
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
            }
            /* Ẩn các nút khi in */
            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      {/* Close Button (Fixed) */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-slate-800 text-white p-2 rounded-full hover:bg-red-500 transition-colors shadow-lg no-print"
        title="Đóng CV"
      >
        <X size={24} />
      </button>

      <div className="min-h-screen py-10 px-4 flex flex-col items-center justify-start print:py-0 print:px-0">
        
        {/* Actions Bar */}
        <div className="w-full max-w-4xl flex justify-between items-center mb-6 text-white no-print animate-fade-in-up">
          <div>
            <h2 className="text-2xl font-bold">Hồ Sơ Điện Tử</h2>
            <p className="text-slate-400 text-sm">Xem trước bản in</p>
          </div>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg font-bold transition-colors shadow-lg shadow-brand-500/30"
          >
            <Printer size={20} /> In / Tải PDF
          </button>
        </div>

        {/* CV Layout - A4 Paper Style */}
        <div id="printable-cv" className="w-full max-w-[210mm] bg-white text-slate-800 p-8 md:p-12 rounded-xl shadow-2xl print:shadow-none print:w-full print:max-w-none print:rounded-none animate-fade-in-up">
          {/* Header CV */}
          <div className="border-b-2 border-slate-200 pb-8 mb-8 flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight">{PERSONAL_INFO.name}</h1>
              <p className="text-xl text-brand-600 font-medium mt-1">{PERSONAL_INFO.title}</p>
              <p className="text-slate-600 mt-4 max-w-lg text-sm leading-relaxed">
                {PERSONAL_INFO.about}
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
            {/* Left Column */}
            <div className="md:col-span-2 space-y-8">
              {/* Education */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">Học vấn</h3>
                <div className="space-y-4">
                  {EDUCATION.map((edu, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-slate-800">{edu.school}</h4>
                      <p className="text-brand-600 text-sm font-medium">{edu.degree}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-slate-500 text-xs italic">{edu.year}</span>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work/Projects in CV format */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">Dự án tiêu biểu</h3>
                <div className="space-y-4">
                  {PROJECTS.map((proj, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-slate-800">{proj.title}</h4>
                      </div>
                      <p className="text-slate-600 text-sm mt-1">{proj.description}</p>
                      <p className="text-xs text-slate-500 mt-1">Tech: {proj.tags.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
               {/* Objectives */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">Mục tiêu</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {PERSONAL_INFO.goals}
                </p>
              </div>

              {/* Skills List for CV */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">Kỹ năng</h3>
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

              {/* Interests/Others */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-2 mb-4">Sở thích</h3>
                <div className="flex flex-wrap gap-2">
                   {['Coding', 'Robotics', 'IoT', 'Football', 'Travel'].map((tag) => (
                     <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded border border-slate-200">{tag}</span>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-slate-500 text-sm no-print">Nhấn "In / Tải PDF" để lưu hồ sơ về máy.</p>
      </div>
    </div>
  );
};

export default CV;