import React, { useState } from 'react';
import { ExternalLink, Github, Filter, Code, Cpu, Bot } from 'lucide-react';
import { PROJECTS } from '../constants';
import ScrollReveal from './ScrollReveal';

type Category = 'All' | 'Web' | 'IoT' | 'AI';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  // Logic filter dựa trên tags của dự án
  const filteredProjects = PROJECTS.filter(project => {
    if (activeCategory === 'All') return true;
    
    // Simple heuristic mapping tags to categories
    const tagsString = project.tags.join(' ').toLowerCase();
    if (activeCategory === 'Web' && (tagsString.includes('react') || tagsString.includes('web') || tagsString.includes('node'))) return true;
    if (activeCategory === 'IoT' && (tagsString.includes('arduino') || tagsString.includes('iot'))) return true;
    if (activeCategory === 'AI' && (tagsString.includes('ai') || tagsString.includes('bot'))) return true;
    
    return false;
  });

  const categories: { id: Category; label: string; icon: any }[] = [
    { id: 'All', label: 'Tất cả', icon: Filter },
    { id: 'Web', label: 'Web Apps', icon: Code },
    { id: 'IoT', label: 'IoT System', icon: Cpu },
    { id: 'AI', label: 'AI & Bot', icon: Bot },
  ];

  return (
    <section id="projects" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">Dự Án <span className="text-brand-500">Nổi Bật</span></h2>
              <p className="text-slate-600 dark:text-slate-400">Một số sản phẩm mình đã thực hiện để rèn luyện kỹ năng.</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-x-auto max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeCategory === cat.id 
                    ? 'bg-brand-500 text-white shadow-md' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <cat.icon size={14} />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ScrollReveal key={`${project.title}-${index}`} delay={index * 100}>
                <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-brand-500/10 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60 dark:opacity-80 group-hover:opacity-40 transition-opacity"></div>
                    
                    {/* Category Badge overlay */}
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/30">
                       {project.tags[0]}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-500 transition-colors">{project.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 flex-1">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tIndex) => (
                        <span key={tIndex} className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-brand-300 rounded-md border border-slate-200 dark:border-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4 mt-auto">
                      <a href={project.github} className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white rounded-lg text-sm font-medium transition-colors hover:shadow">
                        <Github size={16} /> Code
                      </a>
                      <a href={project.link} className="flex-1 flex items-center justify-center gap-2 py-2 bg-brand-600 hover:bg-brand-500 text-white rounded-lg text-sm font-medium transition-colors shadow-brand-500/20 shadow-lg hover:shadow-brand-500/40">
                        <ExternalLink size={16} /> Demo
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
             <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                <Filter size={48} className="mb-4 opacity-50" />
                <p>Chưa có dự án nào thuộc danh mục này.</p>
             </div>
          )}
        </div>
        
        <div className="mt-10 text-center">
            <a href="https://github.com/kzi207" target="_blank" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 hover:underline font-medium">
                Xem thêm các dự án khác trên GitHub <ExternalLink size={14} />
            </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;