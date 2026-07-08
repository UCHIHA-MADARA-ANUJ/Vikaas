import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function AshokaChakra({ className = "", animated = true }: { className?: string, animated?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const isReduced = useReducedMotion();
  
  useGSAP(() => {
    if (animated && !isReduced && ref.current) {
      gsap.to(ref.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }
  }, { dependencies: [animated, isReduced], scope: ref });

  return (
    <svg 
      ref={ref}
      className={`text-current ${className}`}
      viewBox="0 0 100 100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5"
    >
      <circle cx="50" cy="50" r="48" className="opacity-50" />
      <circle cx="50" cy="50" r="42" className="opacity-30" />
      <circle cx="50" cy="50" r="10" className="opacity-80" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line 
          key={i} 
          x1="50" y1="50" 
          x2="50" y2="8" 
          transform={`rotate(${i * 15} 50 50)`} 
          className="opacity-60"
        />
      ))}
    </svg>
  );
}

export function RadarBackground() {
  const lineRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  
  useGSAP(() => {
    if (lineRef.current && !isReduced) {
      gsap.to(lineRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
        transformOrigin: "bottom center"
      });
    }
  }, { scope: lineRef, dependencies: [isReduced] });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-saffron/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-india-green/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/10" />
      
      {/* Crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 -translate-x-1/2" />
      <div className="absolute left-0 right-0 top-1/2 h-px bg-white/10 -translate-y-1/2" />
      
      {/* Radar sweep line */}
      {!isReduced && (
        <div className="absolute top-0 left-1/2 w-[400px] h-[400px] -translate-x-1/2 origin-bottom">
          <div 
            ref={lineRef}
            className="w-px h-full bg-gradient-to-b from-saffron via-white to-india-green absolute bottom-0 left-1/2"
            style={{
              boxShadow: '0 0 20px 2px rgba(255,153,51,0.4)',
            }}
          />
        </div>
      )}
    </div>
  );
}
