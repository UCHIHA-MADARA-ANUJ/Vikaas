import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(new Date());
  const isReduced = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    if (isReduced) return;

    const q = gsap.utils.selector(containerRef);
    
    // Main hero entrance choreography
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(q('.hero-headline .char'), 
      { opacity: 0, y: 50, rotateX: -90 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.02 },
      0.2
    );

    tl.fromTo(q('.telemetry-panel'),
      { opacity: 0, scale: 0.9, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1 },
      0.6
    );

    tl.fromTo(q('.hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      1.0
    );

    // Telemetry number counters (above fold, no scroll trigger needed)
    q('.stat-number').forEach((el) => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      gsap.to(el, {
        innerHTML: target,
        duration: 2.5,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        delay: 0.8
      });
    });

    // Bar grow animation
    gsap.fromTo(q('.stat-bar'), 
      { width: 0 }, 
      { width: '42%', duration: 2, ease: "power2.out", delay: 0.8 }
    );

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-24 pb-12 flex flex-col overflow-hidden">
      <RadarBackground />
      
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges">
              <AshokaChakra className="w-5 h-5 text-saffron" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Directive: Viksit Bharat 2047
              </span>
            </div>
            
            <h1 className="hero-headline font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
              <span className="block overflow-hidden"><span className="char inline-block">G</span><span className="char inline-block">R</span><span className="char inline-block">E</span><span className="char inline-block">E</span><span className="char inline-block">N</span></span>
              <span className="block overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green pb-2">
                <span className="char inline-block">T</span><span className="char inline-block">E</span><span className="char inline-block">C</span><span className="char inline-block">H</span><span className="char inline-block">N</span><span className="char inline-block">O</span><span className="char inline-block">L</span><span className="char inline-block">O</span><span className="char inline-block">G</span><span className="char inline-block">Y</span>
              </span>
              <span className="block overflow-hidden"><span className="char inline-block">A</span><span className="char inline-block">S</span> <span className="char inline-block">O</span><span className="char inline-block">U</span><span className="char inline-block">R</span></span>
              <span className="block overflow-hidden text-muted-foreground"><span className="char inline-block">L</span><span className="char inline-block">A</span><span className="char inline-block">U</span><span className="char inline-block">N</span><span className="char inline-block">C</span><span className="char inline-block">H</span><span className="char inline-block">P</span><span className="char inline-block">A</span><span className="char inline-block">D</span></span>
            </h1>
            
            <p className="font-mono text-lg text-muted-foreground max-w-xl border-l-2 border-saffron pl-4">
              Mission Control for India's transition to a sustainable superpower. Targeting 500 GW non-fossil capacity by 2030 and absolute energy independence by 2047.
            </p>
            
            <div className="hero-cta pt-4 flex flex-wrap gap-4">
              <Link href="/vision" className="group relative inline-flex h-14 items-center justify-center bg-white text-background px-8 font-mono font-bold uppercase tracking-wider clip-edges transition-transform hover:scale-105 hover-elevate">
                <span>Initiate Sequence</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-saffron via-background to-india-green origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </Link>
              <Link href="/pillars" className="group inline-flex h-14 items-center justify-center border border-white/20 bg-transparent px-8 font-mono font-bold uppercase tracking-wider text-white clip-edges transition-colors hover:bg-white/10 hover-elevate">
                View Systems
              </Link>
            </div>
          </div>
          
          {/* Right Column: Telemetry */}
          <div className="lg:col-span-5 grid gap-4">
            
            {/* Clock Panel */}
            <div className="telemetry-panel tech-border bg-card/40 backdrop-blur-md p-6">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-2 flex justify-between items-center">
                <span>Mission Clock [IST]</span>
                <span className={`w-2 h-2 rounded-full bg-saffron ${isReduced ? '' : 'animate-pulse'}`} />
              </div>
              <div className="font-mono text-3xl font-bold tracking-widest text-white">
                {time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' })}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1">
                T-MINUS {Math.ceil((new Date('2047-08-15T00:00:00Z').getTime() - time.getTime()) / (1000 * 60 * 60 * 24)).toLocaleString('en-US')} DAYS TO 2047
              </div>
            </div>

            {/* Stat Panel 1 */}
            <div className="telemetry-panel tech-border bg-card/40 backdrop-blur-md p-6">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2">
                Non-Fossil Capacity Target [2030]
              </div>
              <div className="flex items-end gap-2">
                <span className="stat-number font-sans text-5xl font-bold text-saffron" data-target="500">{isReduced ? "500" : "0"}</span>
                <span className="font-mono text-xl text-muted-foreground pb-1">GW</span>
              </div>
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-saffron stat-bar" style={{ width: isReduced ? '42%' : '0%' }} />
              </div>
              <div className="text-[10px] font-mono text-right mt-1 text-muted-foreground">CURRENT: ~210 GW</div>
            </div>

            {/* Stat Panel 2 */}
            <div className="telemetry-panel tech-border bg-card/40 backdrop-blur-md p-6">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2">
                Green Hydrogen [2030]
              </div>
              <div className="flex items-end gap-2">
                <span className="font-sans text-5xl font-bold text-white">≥</span>
                <span className="stat-number font-sans text-5xl font-bold text-white" data-target="5">{isReduced ? "5" : "0"}</span>
                <span className="font-mono text-xl text-muted-foreground pb-1">MMT/YR</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-3 flex justify-between">
                <span>ELECTROLYSER TGT:</span>
                <span className="text-india-green">60-100 GW</span>
              </div>
            </div>

            {/* Stat Panel 3 */}
            <div className="telemetry-panel tech-border bg-card/40 backdrop-blur-md p-6 border-l-4 border-l-india-green">
              <div className="text-xs font-mono text-muted-foreground uppercase mb-2">
                Final Directive
              </div>
              <div className="font-sans text-2xl font-bold text-india-green uppercase">
                Net Zero 2070
              </div>
              <div className="font-mono text-sm text-white/70 mt-1">
                LOCKED IN
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
