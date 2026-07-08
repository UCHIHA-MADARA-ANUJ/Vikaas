import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function CinematicLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  
  useGSAP(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader) {
      setIsComplete(true);
      return;
    }

    if (isReduced) {
      sessionStorage.setItem('hasSeenLoader', 'true');
      setIsComplete(true);
      return;
    }

    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasSeenLoader', 'true');
        setIsComplete(true);
      }
    });

    // 1. T-minus countdown & status boot (Runs over 20 seconds)
    tl.to(q('.countdown-number'), {
      innerHTML: 0,
      duration: 20,
      snap: { innerHTML: 1 },
      ease: "none",
    }, 0);
    
    // Status lines slowly stagger in across the 20 second countdown
    tl.fromTo(q('.status-line'), 
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 2.1, ease: "power2.out" },
      0.5
    );

    // 2. Telemetry flicker-in (T-minus 2 seconds)
    tl.to(q('.telemetry-grid'), {
      opacity: 1,
      duration: 0.1,
      yoyo: true,
      repeat: 7,
      ease: "steps(1)"
    }, 18.0);

    // 3. Ignition Light Sweep (T-0)
    tl.to(q('.ignition-plume'), {
      scaleY: 1,
      duration: 1.5,
      ease: "power4.inOut"
    }, 20.0);

    // 4. Full screen flash & lift off
    tl.to(q('.ignition-flash'), {
      opacity: 1,
      duration: 0.3,
      ease: "power2.in"
    }, 21.0);

    tl.to(q('.loader-content'), {
      scale: 1.5,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    }, 21.1);

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    }, 21.5);

  }, { scope: containerRef, dependencies: [isReduced] });

  if (isComplete) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-0 telemetry-grid bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="loader-content relative z-10 flex flex-col items-center w-full max-w-3xl px-8">
        
        {/* Ashoka Chakra Spinup */}
        <div className="mb-8 relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
          <svg className={`w-full h-full ${isReduced ? '' : 'animate-[spin_4s_linear_infinite]'} opacity-50`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
            <circle cx="50" cy="50" r="48" />
            <circle cx="50" cy="50" r="40" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line key={i} x1="50" y1="50" x2="50" y2="10" transform={`rotate(${i * 15} 50 50)`} />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] md:text-xs text-saffron">
            SYS_RDY
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-end gap-4 font-sans text-5xl md:text-8xl font-bold tracking-tighter mb-12 text-foreground">
          <span>T-MINUS</span>
          <span className="countdown-number text-saffron w-[2ch] text-right">20</span>
        </div>

        {/* Status Lines */}
        <div className="w-full space-y-1.5 md:space-y-2 font-mono text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[SYS] Initiating Green Protocol...</span>
            <span className="text-saffron">OK</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[PWR] Calibrating Renewable Grids...</span>
            <span className="text-india-green">SYNCED</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[ENV] Baseline Emissions Captured...</span>
            <span className="text-white">VERIFIED</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[ENG] Solar Arrays Online...</span>
            <span className="text-india-green">100%</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[ENG] Wind Turbines Synced...</span>
            <span className="text-india-green">100%</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[NAV] Targeting Net Zero 2070...</span>
            <span className="text-white">LOCKED</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[SYS] Core Spin-Up...</span>
            <span className="text-saffron">NOMINAL</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[PWR] Green Hydrogen Electrolysers...</span>
            <span className="text-india-green">ARMED</span>
          </div>
          <div className="status-line flex justify-between border-b border-white/10 pb-1.5 md:pb-2">
            <span>[CMD] Mission Bharat 2047</span>
            <span className={`${isReduced ? '' : 'animate-pulse'} text-saffron`}>AWAITING IGNITION</span>
          </div>
        </div>
      </div>

      {/* Ignition Plume */}
      <div className="ignition-plume absolute bottom-0 left-0 w-full h-full origin-bottom scale-y-0 z-20 flex flex-col">
        <div className="flex-1 bg-gradient-to-t from-saffron to-transparent opacity-80 mix-blend-screen" />
        <div className="flex-1 bg-gradient-to-t from-white to-transparent opacity-80 mix-blend-screen" />
        <div className="flex-1 bg-gradient-to-t from-india-green to-transparent opacity-80 mix-blend-screen" />
      </div>

      {/* Final Flash */}
      <div className="ignition-flash absolute inset-0 bg-white opacity-0 z-30" />
      
    </div>
  );
}