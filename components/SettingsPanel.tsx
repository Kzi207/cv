import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Settings, X, Moon, Sun, Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, BarChart2 } from 'lucide-react';
import { PLAYLIST } from '../constants';

interface SettingsPanelProps {
  theme: string;
  toggleTheme: () => void;
  currentTrackIndex: number;
  onTrackSelect: (index: number) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ 
  theme, 
  toggleTheme, 
  currentTrackIndex, 
  onTrackSelect,
  isPlaying,
  onTogglePlay
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  
  // Audio State
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  
  const currentTrack = PLAYLIST[currentTrackIndex];

  // --- OPTIMIZED AUDIO LOGIC ---
  
  // Handle Play/Pause with safety check for race conditions
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const playAudio = async () => {
      try {
        if (isPlaying) {
          await audio.play();
        } else {
          audio.pause();
        }
      } catch (error) {
        console.warn("Audio playback interrupted or failed:", error);
      }
    };

    playAudio();
  }, [isPlaying, currentTrackIndex]);

  // Handle Volume changes
  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Optimized Time Update: Only update state if progress changes significantly (>0.5%)
  // This reduces re-renders significantly compared to updating on every tick
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration || 1;
        const newProgress = (current / duration) * 100;
        
        setProgress(prev => {
            if (Math.abs(newProgress - prev) > 0.5) {
                return newProgress;
            }
            return prev;
        });
    }
  }, []);

  const handleProgressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
        const duration = audioRef.current.duration || 1;
        audioRef.current.currentTime = (val / 100) * duration;
        setProgress(val);
    }
  }, []);

  const handleNext = useCallback(() => {
    onTrackSelect((currentTrackIndex + 1) % PLAYLIST.length);
  }, [currentTrackIndex, onTrackSelect]);

  const handlePrev = useCallback(() => {
    onTrackSelect((currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  }, [currentTrackIndex, onTrackSelect]);

  const handleOpen = useCallback(() => {
      setIsOpen(true);
      setHasOpenedOnce(true);
  }, []);

  return (
    <>
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        preload="auto"
      />

      {/* Global Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[49] transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Container */}
      <div className="fixed top-1/2 right-0 z-[50] -translate-y-1/2 flex items-start pointer-events-none">
        
        {/* Toggle Button */}
        {!isOpen && (
          <div className="relative group pointer-events-auto">
             <div className={`absolute right-full top-1/2 -translate-y-1/2 mr-3 whitespace-nowrap bg-brand-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg arrow-right transition-opacity duration-300 ${hasOpenedOnce ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 animate-bounce-horizontal'}`}>
                <span className="font-bold">Cài đặt & Playlist</span>
                <div className="absolute top-1/2 right-[-4px] -translate-y-1/2 w-2 h-2 bg-brand-600 rotate-45"></div>
             </div>

            <button
              onClick={handleOpen}
              className="bg-white dark:bg-slate-800 p-3 rounded-l-xl shadow-lg border-y border-l border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-brand-500 hover:pl-4 transition-all duration-300 flex flex-col gap-1 items-center justify-center min-w-[50px]"
              title="Nhạc & Cài đặt"
            >
              <div className="relative">
                <Settings size={22} className={`transition-transform duration-700 ${isPlaying ? 'rotate-180' : ''}`} />
              </div>
            </button>
          </div>
        )}

        {/* Panel Content */}
        <div 
          className={`bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-700 shadow-2xl h-[90vh] md:h-[85vh] w-80 rounded-l-2xl transform transition-transform duration-300 ease-in-out flex flex-col pointer-events-auto ${
            isOpen ? 'translate-x-0' : 'translate-x-full fixed right-0'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-tl-2xl flex-shrink-0">
            <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
              <Settings size={18} /> Cài đặt chung
            </h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-slate-500 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
            
            {/* Theme */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Giao diện</h4>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              >
                <span className="text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2">
                  {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  {theme === 'dark' ? 'Chế độ Tối' : 'Chế độ Sáng'}
                </span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${theme === 'dark' ? 'bg-brand-500' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${theme === 'dark' ? 'left-6' : 'left-1'}`}></div>
                </div>
              </button>
            </div>

            {/* Playlist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Danh sách phát</h4>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-500">{PLAYLIST.length} bài</span>
              </div>
              
              <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar scroll-smooth">
                {PLAYLIST.map((track, index) => {
                  const isActive = currentTrackIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => onTrackSelect(index)}
                      className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-all border ${
                        isActive 
                          ? 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-500/30' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent hover:border-slate-100 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-brand-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {isActive && isPlaying ? (
                          <BarChart2 size={14} className="animate-pulse" />
                        ) : isActive ? (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-700 dark:text-slate-200'
                        }`}>
                          {track.title}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {track.artist}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Player */}
          <div className="relative z-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none"></div>

             {/* Progress Bar */}
             <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 cursor-pointer group">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:from-blue-400 group-hover:to-pink-400 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
                <input 
                  type="range" min="0" max="100" step="0.1"
                  value={progress}
                  onChange={handleProgressChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
             </div>

             <div className="flex items-center gap-4 pt-2">
                 {/* Spinning Disc */}
                 <div className={`relative w-14 h-14 flex-shrink-0 rounded-full shadow-lg border-2 border-slate-100 dark:border-slate-700 overflow-hidden ${isPlaying ? 'animate-spin-slow' : ''}`}>
                     <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                         <div className="w-full h-full opacity-50 bg-[conic-gradient(var(--tw-gradient-stops))] from-slate-800 via-slate-700 to-slate-800"></div>
                         <div className="absolute w-[90%] h-[90%] rounded-full border border-slate-600/30"></div>
                         <div className="absolute w-[70%] h-[70%] rounded-full border border-slate-600/30"></div>
                         <div className="absolute w-5 h-5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full border border-white dark:border-slate-900 shadow-inner"></div>
                     </div>
                 </div>

                 <div className="flex-1 min-w-0">
                     <h4 className="font-bold text-slate-800 dark:text-white truncate text-sm">{currentTrack.title}</h4>
                     <div className="flex items-center gap-2 mt-0.5">
                         <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[120px]">{currentTrack.artist}</p>
                         {isPlaying && (
                             <div className="flex items-end gap-[2px] h-3">
                                 <div className="w-[3px] bg-blue-500 rounded-t-sm animate-[musicBar_1s_ease-in-out_infinite]"></div>
                                 <div className="w-[3px] bg-purple-500 rounded-t-sm animate-[musicBar_1.2s_ease-in-out_infinite] delay-75"></div>
                                 <div className="w-[3px] bg-pink-500 rounded-t-sm animate-[musicBar_0.8s_ease-in-out_infinite] delay-150"></div>
                             </div>
                         )}
                     </div>
                 </div>
             </div>

             {/* Controls */}
             <div className="flex items-center justify-between mt-4">
                 <div className="flex items-center gap-2 group">
                     <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                         {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                     </button>
                     <input 
                       type="range" min="0" max="1" step="0.05"
                       value={isMuted ? 0 : volume}
                       onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                       className="w-16 h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-slate-400 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:bg-brand-500"
                     />
                 </div>

                 <div className="flex items-center gap-4">
                     <button onClick={handlePrev} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                         <SkipBack size={22} />
                     </button>
                     <button 
                       onClick={onTogglePlay} 
                       className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 transition-all active:scale-95"
                     >
                         {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
                     </button>
                     <button onClick={handleNext} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                         <SkipForward size={22} />
                     </button>
                 </div>
                 
                 <div className="w-20"></div> 
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default SettingsPanel;