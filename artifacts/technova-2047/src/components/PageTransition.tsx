import { useState, useRef } from 'react';
import { useLocation } from 'wouter';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (location !== displayLocation) {
      if (isReduced) {
        setDisplayLocation(location);
        return;
      }
      
      const q = gsap.utils.selector(containerRef);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          
          gsap.to(q(".wipe-band"), {
            xPercent: 100,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.in",
            onComplete: () => {
              gsap.set(q(".wipe-band"), { xPercent: -100 });
            }
          });
        }
      });
      
      tl.to(q(".wipe-band"), {
        xPercent: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
      });
    }
  }, { dependencies: [location, displayLocation, isReduced], scope: containerRef });

  return (
    <>
      {!isReduced && (
        <div 
          ref={containerRef} 
          className="fixed inset-0 z-[100] pointer-events-none flex flex-col"
        >
          <div className="wipe-band bg-saffron flex-1 -translate-x-full" style={{ transform: 'translateX(-100%)' }} />
          <div className="wipe-band bg-white flex-1 -translate-x-full" style={{ transform: 'translateX(-100%)' }} />
          <div className="wipe-band bg-india-green flex-1 -translate-x-full" style={{ transform: 'translateX(-100%)' }} />
        </div>
      )}
      <div key={displayLocation} className="w-full h-full min-h-[100dvh]">
        {children}
      </div>
    </>
  );
}
