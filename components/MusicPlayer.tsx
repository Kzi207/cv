import React, { useRef, useEffect, useState } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Minimize2, Maximize2, Disc } from 'lucide-react';
import { PLAYLIST } from '../constants';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  currentTrackIndex: number;
  onTrackChange: (index: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  isPlaying, 
  onTogglePlay,
  currentTrackIndex,
  onTrackChange
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = PLAYLIST[currentTrackIndex];

  // Handle Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Handle Play/Pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Auto-play prevented:", error);
          });
        }
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    onTrackChange(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    onTrackChange(prevIndex);
  };

  const handleEnded = () => {
    handleNext();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (newVol > 0 && isMuted) setIsMuted(false);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
      setProgress(newProgress);
    }
  };

  return (
    <>
      <audio 
        ref={audioRef} 
        src={currentTrack.url} 
        onEnded={handleEnded}
        onTimeUpdate={handleTimeUpdate}
      />

      <div className={`fixed z-[45] transition-all duration-500 ease-in-out
        ${isMinimized 
          ? 'bottom-24 right-4 translate-y-0' 
          : 'bottom-4 right-4 sm:bottom-8 sm:right-8'
        }`}
      >
        <div className={`
            relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl
            border border-slate-200 dark:border-slate-700 shadow-2xl shadow-brand-500/20
            transition-all duration-500 ease-spring
            ${isMinimized ? 'w-14 h-14 rounded-full hover:scale-110' : 'w-80 rounded-3xl p-5'}
        `}>
          
          {/* Background Gradient Mesh */}
          {!isMinimized && (
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-50%] left-[-20%] w-full h-full bg-blue-500 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-normal"></div>
                <div className="absolute bottom-[-50%] right-[-20%] w-full h-full bg-pink-500 blur-[80px] rounded-full mix-blend-multiply dark:mix-blend-normal"></div>
            </div>
          )}

          {isMinimized ? (
            // MINIMIZED STATE
            <button 
              onClick={() => setIsMinimized(false)}
              className="w-full h-full flex items-center justify-center text-brand-500 relative group"
            >
              {isPlaying ? (
                <div className="absolute inset-0 rounded-full border-2 border-brand-500 border-t-transparent animate-spin"></div>
              ) : null}
              <Disc size={24} className={`text-slate-700 dark:text-slate-200 transition-transform duration-1000 ${isPlaying ? 'animate-spin-slow' : ''}`} />
            </button>
          ) : (
            // MAXIMIZED STATE
            <div className="relative z-10 flex flex-col gap-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-2">
                    {/* Visualizer Bars */}
                    <div className="flex items-end gap-0.5 h-4">
                        {[...Array(4)].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-1 bg-brand-500 rounded-full transition-all ${isPlaying ? 'animate-music-bar' : 'h-1'}`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            ></div>
                        ))}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">Now Playing</span>
                 </div>
                 <button onClick={() => setIsMinimized(true)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                    <Minimize2 size={16} />
                 </button>
              </div>

              {/* Main Info */}
              <div className="flex items-center gap-4">
                 {/* Album Art / Vinyl */}
                 <div className="relative w-16 h-16 flex-shrink-0 group">
                    <div className={`absolute inset-0 bg-black rounded-full shadow-lg flex items-center justify-center overflow-hidden border-2 border-slate-700 ${isPlaying ? 'animate-spin-slow' : 'transition-transform duration-700'}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                       <div className="absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-900"></div>
                       {/* Vinyl Grooves */}
                       <div className="absolute w-full h-full rounded-full border border-slate-800 opacity-50 scale-90"></div>
                       <div className="absolute w-full h-full rounded-full border border-slate-800 opacity-50 scale-75"></div>
                       {/* Center Label */}
                       <div className="w-6 h-6 bg-brand-500 rounded-full border-2 border-white dark:border-slate-800 relative z-10 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                       </div>
                    </div>
                    {/* Center highlight reflection */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
                 </div>

                 <div className="overflow-hidden">
                    <h3 className="text-slate-900 dark:text-white font-bold text-sm truncate leading-tight">{currentTrack.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs truncate mt-0.5">{currentTrack.artist}</p>
                 </div>
              </div>

              {/* Progress Bar */}
              <div className="group relative w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer">
                 <div className="absolute h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
                 <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={progress} 
                    onChange={handleProgressChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                 />
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                 <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                    {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                 </button>

                 <div className="flex items-center gap-4">
                    <button onClick={handlePrev} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-90">
                       <SkipBack size={20} fill="currentColor" />
                    </button>
                    
                    <button 
                       onClick={onTogglePlay} 
                       className="w-12 h-12 flex items-center justify-center bg-gradient-to-tr from-brand-500 to-purple-600 text-white rounded-full shadow-lg shadow-brand-500/30 hover:scale-110 transition-all active:scale-95"
                    >
                       {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                    </button>

                    <button onClick={handleNext} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-transform active:scale-90">
                       <SkipForward size={20} fill="currentColor" />
                    </button>
                 </div>

                 {/* Volume Slider mini */}
                 <div className="w-16">
                    <input 
                        type="range" 
                        min="0" 
                        max="1" 
                        step="0.01" 
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-full h-1 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:bg-brand-500 [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                    />
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;