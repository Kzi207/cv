
import React, { useState } from 'react';
import { Coffee, X, Copy, Check, Heart } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface DonateWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const DonateWidget: React.FC<DonateWidgetProps> = ({ isOpen, onClose, onOpen }) => {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  // QR Info
  const BANK_INFO = {
    bankId: 'vcb',
    accountNo: '1060428533',
    accountName: 'LE KHANH DUY',
    template: 'compact2'
  };
  
  // VietQR API Link
  const qrUrl = `https://img.vietqr.io/image/${BANK_INFO.bankId}-${BANK_INFO.accountNo}-${BANK_INFO.template}.png?amount=&addInfo=Donate%20Coffee&accountName=${encodeURIComponent(BANK_INFO.accountName)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(BANK_INFO.accountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Button - More Prominent */}
      <div className="fixed bottom-4 left-20 z-40 group">
        <button
          onClick={onOpen}
          className="relative p-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-full shadow-lg hover:shadow-pink-500/50 hover:scale-110 transition-all duration-300 flex items-center justify-center animate-bounce-slow"
          title={t('donateWidget.button')}
        >
          {/* Pulse Effect */}
          <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75 animate-ping"></span>
          
          <Coffee size={24} className="relative z-10 group-hover:rotate-12 transition-transform" />
          
          {/* Always visible text on Desktop, hidden on mobile */}
          <span className="hidden md:block relative z-10 ml-2 font-bold text-sm pr-1">{t('donateWidget.button')}</span>
        </button>
        
        {/* Tooltip for Mobile */}
        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity md:hidden whitespace-nowrap pointer-events-none">
          {t('donateWidget.button')}
        </div>
      </div>

      {/* DONATE POPUP MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-fade-in-up border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-6 text-white text-center relative overflow-hidden">
               {/* Decorative Circles */}
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

              <h3 className="font-bold text-xl flex items-center justify-center gap-2 relative z-10">
                <Coffee size={24} /> {t('donateWidget.title')}
              </h3>
              <p className="text-sm text-white/90 mt-2 relative z-10 flex items-center justify-center gap-1">
                 {t('donateWidget.thanks')} <Heart size={14} className="fill-current text-red-200" />
              </p>
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* QR Body */}
            <div className="p-6 flex flex-col items-center">
              <div className="bg-white p-2 rounded-xl shadow-inner border border-slate-100 mb-6 relative group">
                <img 
                  src={qrUrl} 
                  alt="QR Code Donate" 
                  className="w-56 h-56 object-contain rounded-lg"
                />
                <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow border border-white">
                   VietQR
                </div>
              </div>
              
              <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center space-y-2 border border-slate-100 dark:border-slate-700">
                 <div className="flex items-center justify-center gap-2 mb-1">
                    <img src="https://img.vietqr.io/image/vcb-logo.png" alt="VCB" className="h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} /> 
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wide">Vietcombank</p>
                 </div>
                 
                 <p className="font-bold text-lg text-slate-800 dark:text-white">{BANK_INFO.accountName}</p>
                 
                 <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 border-dashed">
                    <span className="font-mono text-xl font-bold text-brand-600 dark:text-brand-400 tracking-wider">
                      {BANK_INFO.accountNo}
                    </span>
                    <button 
                      onClick={handleCopy}
                      className={`p-2 rounded-lg transition-all duration-300 ${
                          copied 
                          ? 'bg-green-500 text-white shadow-green-500/30 shadow-lg' 
                          : 'bg-slate-200 dark:bg-slate-700 hover:bg-brand-500 hover:text-white text-slate-600 dark:text-slate-300'
                      }`}
                      title={t('donateWidget.copy')}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                 </div>
                 {copied && <p className="text-xs text-green-500 font-medium animate-fade-in-up">{t('donateWidget.copied')}</p>}
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-950 p-3 text-center border-t border-slate-100 dark:border-slate-800">
               <p className="text-[10px] text-slate-400">{t('donateWidget.footer')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DonateWidget;
