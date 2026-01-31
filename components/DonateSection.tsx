
import React, { useState } from 'react';
import { Copy, Check, Heart, Coffee, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../contexts/LanguageContext';

const DonateSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const BANK_INFO = {
    bankId: 'vcb',
    accountNo: '1060428533',
    accountName: 'LE KHANH DUY',
    template: 'compact2'
  };

  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-${BANK_INFO.template}.png?amount=&addInfo=Donate%20Coffee&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_INFO.accountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="donate" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300 border-t border-slate-100 dark:border-slate-900">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Heart size={12} className="fill-current" /> {t('donate.support')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              {t('donate.title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">{t('donate.titleHighlight')}</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {t('donate.desc')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row">
            
            {/* Left Side: QR Code */}
            <div className="md:w-1/2 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 relative group">
              <div className="bg-white p-3 rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
                <img 
                  src={qrUrl} 
                  alt="QR Code Donate" 
                  className="w-48 h-48 md:w-56 md:h-56 object-contain rounded-xl"
                />
              </div>
              <p className="mt-4 text-xs font-mono text-slate-400 flex items-center gap-1">
                <Sparkles size={12} /> VietQR
              </p>
            </div>

            {/* Right Side: Info */}
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center space-y-6">
              <div className="space-y-1">
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{t('donate.bank')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm border border-slate-100 p-1 flex items-center justify-center overflow-hidden">
                    <img src="https://img.vietqr.io/image/vcb-logo.png" alt="VCB" className="w-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Vietcombank</h3>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{t('donate.owner')}</p>
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-200">{BANK_INFO.accountName}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{t('donate.account')}</p>
                <div className="flex items-center gap-3">
                  <code className="text-2xl md:text-3xl font-mono font-bold text-brand-600 dark:text-brand-400 tracking-wider">
                    {BANK_INFO.accountNo}
                  </code>
                  <button 
                    onClick={handleCopy}
                    className={`p-2.5 rounded-xl transition-all duration-300 shadow-sm flex-shrink-0 ${
                        copied 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-brand-500 hover:text-white'
                    }`}
                    title={t('donate.copy')}
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </button>
                </div>
                {copied && (
                  <p className="text-sm text-green-500 font-medium animate-fade-in-up flex items-center gap-1">
                    <Check size={14} /> {t('donate.copied')}
                  </p>
                )}
              </div>

              <div className="pt-4 mt-auto">
                <a 
                  href={`https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-${BANK_INFO.template}.png?amount=&addInfo=Donate%20Coffee&accountName=${encodeURIComponent(BANK_INFO.accountName)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Coffee size={18} /> {t('donate.downloadQR')}
                </a>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DonateSection;
