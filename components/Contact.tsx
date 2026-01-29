import React, { useState } from 'react';
import { Send, Mail, CheckCircle, Github, Facebook, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';
import ScrollReveal from './ScrollReveal';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 animate-pulse"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Liên Hệ <span className="text-brand-500">Với Mình</span></h2>
            <p className="text-slate-600 dark:text-slate-400">Luôn sẵn sàng trao đổi về công nghệ, dự án và cơ hội hợp tác.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info Side */}
          <ScrollReveal delay={100} className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Thông tin liên lạc</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bạn có thể liên hệ trực tiếp qua email, số điện thoại hoặc nhắn tin qua các mạng xã hội. 
              Mình sẽ cố gắng phản hồi sớm nhất có thể!
            </p>

            <div className="space-y-4">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-brand-500 transition-colors group shadow-sm hover:shadow-md transform hover:-translate-y-1">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-brand-500 group-hover:bg-brand-500 group-hover:text-white transition-colors border border-slate-100 dark:border-slate-700">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-500">Email</p>
                  <p className="text-slate-900 dark:text-white font-medium">{PERSONAL_INFO.email}</p>
                </div>
              </a>
              
              <div className="flex gap-4 pt-4">
                 <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:border-brand-500 hover:bg-brand-600 transition-all hover:scale-110 shadow-sm" title="GitHub">
                    <Github size={20} />
                 </a>
                 <a href={PERSONAL_INFO.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:border-blue-600 hover:bg-blue-600 transition-all hover:scale-110 shadow-sm" title="Facebook">
                    <Facebook size={20} />
                 </a>
                 <a href={PERSONAL_INFO.zalo} target="_blank" rel="noreferrer" className="w-12 h-12 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-white hover:border-blue-400 hover:bg-blue-500 transition-all hover:scale-110 shadow-sm" title="Zalo">
                    <MessageCircle size={20} />
                 </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Side */}
          <ScrollReveal delay={200}>
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-none hover:shadow-2xl transition-shadow duration-300">
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in-up">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Đã gửi thành công!</h3>
                  <p className="text-slate-600 dark:text-slate-400">Cảm ơn bạn đã liên hệ. Mình sẽ phản hồi sớm.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Họ tên</label>
                    <input 
                      type="text" 
                      id="name"
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      placeholder="Tên của bạn"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-400 mb-2">Nội dung</label>
                    <textarea 
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                      placeholder="Lời nhắn của bạn..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-brand-500/20 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {status === 'sending' ? (
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <>
                        Gửi tin nhắn <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;