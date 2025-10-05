'use client'

import React from 'react';

export interface SilkBackgroundProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
  className?: string;
}

const SilkBackground: React.FC<SilkBackgroundProps> = ({ 
  speed = 2, 
  scale = 1.5, 
  color = '#FFD6E8', 
  noiseIntensity = 0.5, 
  rotation = 0.2,
  className = ''
}) => {
  // Convert hex color to CSS custom property
  const cssColor = color || '#FFD6E8';
  
  return (
    <div 
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none ${className}`}
      style={{
        '--silk-color': cssColor,
        '--silk-speed': `${speed}s`,
        '--silk-scale': `${scale}`,
        '--silk-noise': `${noiseIntensity}`,
        '--silk-rotation': `${rotation}rad`
      } as React.CSSProperties & Record<string, string>}
    >
      {/* Animated silk-like background using CSS */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full animate-pulse"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, ${cssColor}40 0%, transparent 60%),
              radial-gradient(circle at 80% 20%, ${cssColor}30 0%, transparent 60%),
              radial-gradient(circle at 40% 40%, ${cssColor}20 0%, transparent 60%),
              linear-gradient(135deg, ${cssColor}10, ${cssColor}05)
            `,
            animationDuration: `${speed * 2}s`,
            transform: `rotate(${rotation}rad) scale(${scale})`
          }}
        />
      </div>
      
      {/* Flowing wave pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-[120%] h-[120%] -translate-x-[10%] -translate-y-[10%]"
          style={{
            background: `
              repeating-linear-gradient(
                45deg,
                ${cssColor}15,
                ${cssColor}15 2px,
                transparent 2px,
                transparent 20px
              ),
              repeating-linear-gradient(
                -45deg,
                ${cssColor}10,
                ${cssColor}10 1px,
                transparent 1px,
                transparent 15px
              )
            `,
            animation: `silk-flow ${speed * 3}s linear infinite`
          }}
        />
      </div>
      
      {/* Main gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-rose-50/60 to-amber-50/70" />
      
      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes silk-flow {
          0% {
            transform: translateX(-10%) translateY(-10%) rotate(0deg);
          }
          100% {
            transform: translateX(-10%) translateY(-10%) rotate(360deg);
          }
        }
        
        @keyframes silk-wave {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.05) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
};

export default SilkBackground;
