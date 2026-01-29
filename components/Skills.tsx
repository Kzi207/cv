import React from 'react';
import { SKILLS } from '../constants';
import { Terminal, Cpu, Globe, Server, GitBranch, Code2, CheckCircle2 } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const getSkillIcon = (name: string) => {
  if (name.includes("C/C++")) return <Terminal size={24} />;
  if (name.includes("Arduino")) return <Cpu size={24} />;
  if (name.includes("HTML")) return <Globe size={24} />;
  if (name.includes("Node")) return <Server size={24} />;
  if (name.includes("Git")) return <GitBranch size={24} />;
  return <Code2 size={24} />;
};

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 bg-white dark:bg-slate-900 relative transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal variant="zoom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Kỹ Năng <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">Chuyên Môn</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base">
              Bộ công cụ và ngôn ngữ mình sử dụng để hiện thực hóa các ý tưởng.
            </p>
          </div>
        </ScrollReveal>

        {/* Modern Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto perspective-1000">
          {SKILLS.map((skill, index) => {
             return (
              <ScrollReveal key={index} delay={index * 100} variant="up">
                {/* Card with 3D Tilt Hover Effect via CSS Group */}
                <div className="group relative h-full">
                    <div className="h-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-500 ease-out transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:rotate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)] dark:group-hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.15)] overflow-hidden">
                    
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-brand-500 shadow-sm group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 z-10 border border-slate-100 dark:border-slate-700">
                            {getSkillIcon(skill.name)}
                        </div>

                        <div className="text-center z-10">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-brand-500 transition-colors">{skill.name}</h3>
                            <div className="flex items-center justify-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                <CheckCircle2 size={12} className="text-green-500" />
                                <span>Sử dụng tốt</span>
                            </div>
                        </div>
                        
                        {/* Decorative corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-brand-500/20 to-transparent rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:mr-0 group-hover:mt-0"></div>
                    </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;