import React from 'react';
import { Cpu, Database, Globe, Layers, Server, Smartphone, Terminal, Wifi, Code2, Cloud, Lock, Monitor } from 'lucide-react';

const TECH_ITEMS = [
  { icon: Code2, label: "ReactJS" },
  { icon: Terminal, label: "TypeScript" },
  { icon: Globe, label: "Tailwind CSS" },
  { icon: Server, label: "Node.js" },
  { icon: Database, label: "MongoDB" },
  { icon: Cpu, label: "Arduino" },
  { icon: Wifi, label: "ESP32" },
  { icon: Smartphone, label: "Flutter" },
  { icon: Cloud, label: "Firebase" },
  { icon: Lock, label: "JWT" },
  { icon: Layers, label: "Docker" },
  { icon: Monitor, label: "Next.js" },
];

const TechStack: React.FC = () => {
  return (
    <section className="py-10 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-6">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400">Công nghệ sử dụng</p>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-20 md:w-40 h-full bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-20 md:w-40 h-full bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>

        {/* Marquee Wrapper - Doubled content for seamless loop */}
        <div className="flex animate-marquee hover:[animation-play-state:paused] whitespace-nowrap">
          {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-2 mx-6 md:mx-10 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-default">
              <item.icon size={24} className="text-brand-500" />
              <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;