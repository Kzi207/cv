import React, { useEffect, useState } from 'react';

const FpsCounter: React.FC = () => {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationFrameId: number;

    const loop = () => {
      const now = performance.now();
      frameCount++;

      // Cập nhật mỗi 500ms để cảm giác mượt mà hơn nhưng không quá nhanh
      if (now - lastTime >= 500) {
        const currentFps = Math.round((frameCount * 1000) / (now - lastTime));
        setFps(currentFps);
        frameCount = 0;
        lastTime = now;
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Logic màu sắc dựa trên FPS
  const getStatusColor = () => {
    if (fps >= 55) return 'text-emerald-500 shadow-emerald-500/20 border-emerald-500/20';
    if (fps >= 30) return 'text-yellow-500 shadow-yellow-500/20 border-yellow-500/20';
    return 'text-red-500 shadow-red-500/20 border-red-500/20';
  };

  return (
    // Di chuyển sang Top-Right, nằm dưới Header (top-20 ~ 80px)
    // Căn chỉnh để không che nội dung quan trọng
    <div className="fixed top-20 right-4 md:top-24 md:right-8 z-30 pointer-events-none select-none opacity-40 hover:opacity-100 transition-opacity duration-300">
      <div className={`
        flex items-center gap-2
        font-mono text-[10px] font-bold tracking-widest
        bg-white/5 dark:bg-black/40 backdrop-blur-md 
        px-3 py-1.5 rounded-full
        border
        transition-all duration-300
        ${getStatusColor()}
      `}>
        <div className={`w-1.5 h-1.5 rounded-full ${fps >= 30 ? 'bg-current animate-pulse' : 'bg-current'}`}></div>
        <span>{fps} FPS</span>
      </div>
    </div>
  );
};

export default FpsCounter;