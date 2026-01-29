import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-8 transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 dark:text-slate-500 text-sm">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Designed with React & Tailwind.
        </p>
        <p className="text-slate-600 dark:text-slate-600 text-xs mt-2">
          Sinh viên Cơ điện tử - CTUT.
        </p>
      </div>
    </footer>
  );
};

export default Footer;