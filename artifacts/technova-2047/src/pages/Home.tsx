import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'wouter';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useMagnetic } from '@/hooks/use-magnetic';

gsap.registerPlugin(ScrollTrigger);

function MagneticButton({ href, className, children }: { href: string, className: string, children: React.ReactNode }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLAnchorElement>();
  return (
    <Link 
      href={href} 
      className={className}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}

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
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.to(q('.mission-control-ticker'), { opacity: 1, duration: 0.5 }, 0.2);

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

    gsap.fromTo(q('.stat-bar'), 
      { width: 0 }, 
      { width: '42%', duration: 2, ease: "power2.out", delay: 0.8 }
    );

    // Star field twinkle
    q('.star-field-dot').forEach((dot) => {
      gsap.to(dot, {
        opacity: Math.random() * 0.5 + 0.1,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    });

    // Telemetry number glitch on load
    q('.stat-number').forEach(el => {
      const originalText = el.getAttribute('data-target') || '0';
      const obj = { value: 0 };
      gsap.to(obj, {
        value: 100,
        duration: 0.5,
        onUpdate: () => {
          el.innerHTML = Math.floor(Math.random() * 999).toString();
        },
        onComplete: () => {
          // It will be picked up by the counter tween
        }
      });
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-24 pb-12 flex flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 80 }).map((_, i) => (
          <div 
            key={i} 
            className="star-field-dot absolute bg-white rounded-full opacity-0"
            style={{
              top: `${pseudoRandom(i * 10) * 100}%`,
              left: `${pseudoRandom(i * 20) * 100}%`,
              width: `${Math.floor(pseudoRandom(i * 30) * 3) + 1}px`,
              height: `${Math.floor(pseudoRandom(i * 30) * 3) + 1}px`,
            }}
          />
        ))}
      </div>
      <RadarBackground />
      
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 relative">
            
            <div className="absolute top-0 right-0 animate-[wave_3s_ease-in-out_infinite] origin-bottom-right hidden md:block">
              <svg width="60" height="40" viewBox="0 0 90 60">
                <rect width="90" height="20" fill="#FF9933" />
                <rect y="20" width="90" height="20" fill="#FFFFFF" />
                <rect y="40" width="90" height="20" fill="#138808" />
                <circle cx="45" cy="30" r="8" fill="none" stroke="#000080" strokeWidth="1" />
                {Array.from({length: 24}).map((_,i) => (
                  <line key={i} x1="45" y1="30" x2="45" y2="22" stroke="#000080" strokeWidth="0.5" transform={`rotate(${i*15} 45 30)`} />
                ))}
              </svg>
            </div>

            <div className="mission-control-ticker font-mono text-xs text-saffron/60 tracking-[0.3em] uppercase opacity-0">
              ENTERING MISSION CONTROL //
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges mt-2">
              <AshokaChakra className="w-5 h-5 text-saffron" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Directive: Viksit Bharat 2047
              </span>
            </div>
            
            <h1 className="hero-headline font-sans text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter" style={{ perspective: '1000px' }}>
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
              <MagneticButton href="/vision" className="group relative inline-flex h-14 items-center justify-center bg-white text-background px-8 font-mono font-bold uppercase tracking-wider clip-edges transition-transform hover:scale-105">
                <span>Initiate Sequence</span>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-saffron via-background to-india-green origin-left scale-x-0 transition-transform group-hover:scale-x-100" />
              </MagneticButton>
              <MagneticButton href="/pillars" className="group inline-flex h-14 items-center justify-center border border-white/20 bg-transparent px-8 font-mono font-bold uppercase tracking-wider text-white clip-edges transition-colors hover:bg-white/10">
                View Systems
              </MagneticButton>
            </div>
          </div>
          
          <div className="lg:col-span-5 grid gap-4">
            
            <div className="telemetry-panel relative tech-border bg-card/40 backdrop-blur-md p-6 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
              <div className="text-xs font-mono text-muted-foreground uppercase mb-2 flex justify-between items-center relative z-10">
                <span>Mission Clock [IST]</span>
                <span className={`w-2 h-2 rounded-full bg-saffron ${isReduced ? '' : 'animate-pulse'}`} />
              </div>
              <div className="font-mono text-3xl font-bold tracking-widest text-white relative z-10">
                {time.toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Kolkata' })}
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-1 relative z-10">
                T-MINUS {Math.ceil((new Date('2047-08-15T00:00:00Z').getTime() - time.getTime()) / (1000 * 60 * 60 * 24)).toLocaleString('en-US')} DAYS TO 2047
              </div>
            </div>

            <div className="telemetry-panel relative tech-border bg-card/40 backdrop-blur-md p-6 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
              <div className="text-xs font-mono text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2 relative z-10">
                Non-Fossil Capacity Target [2030]
              </div>
              <div className="flex items-end gap-2 relative z-10">
                <span className="stat-number font-sans text-5xl font-bold text-saffron" data-target="500">{isReduced ? "500" : "0"}</span>
                <span className="font-mono text-xl text-muted-foreground pb-1">GW</span>
              </div>
              <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden relative z-10">
                <div className="h-full bg-saffron stat-bar" style={{ width: isReduced ? '42%' : '0%' }} />
              </div>
              <div className="text-[10px] font-mono text-right mt-1 text-muted-foreground relative z-10">CURRENT: ~210 GW</div>
            </div>

            <div className="telemetry-panel relative tech-border bg-card/40 backdrop-blur-md p-6 overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
              <div className="text-xs font-mono text-muted-foreground uppercase mb-4 border-b border-white/10 pb-2 relative z-10">
                Green Hydrogen [2030]
              </div>
              <div className="flex items-end gap-2 relative z-10">
                <span className="font-sans text-5xl font-bold text-white">≥</span>
                <span className="stat-number font-sans text-5xl font-bold text-white" data-target="5">{isReduced ? "5" : "0"}</span>
                <span className="font-mono text-xl text-muted-foreground pb-1">MMT/YR</span>
              </div>
              <div className="text-xs font-mono text-muted-foreground mt-3 flex justify-between relative z-10">
                <span>ELECTROLYSER TGT:</span>
                <span className="text-india-green">60-100 GW</span>
              </div>
            </div>

            <div className="telemetry-panel relative tech-border bg-card/40 backdrop-blur-md p-6 border-l-4 border-l-india-green overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_2px,rgba(255,255,255,0.02)_4px)]" />
              <div className="text-xs font-mono text-muted-foreground uppercase mb-2 relative z-10">
                Final Directive
              </div>
              <div className="font-sans text-2xl font-bold text-india-green uppercase relative z-10">
                Net Zero 2070
              </div>
              <div className="font-mono text-sm text-white/70 mt-1 relative z-10">
                LOCKED IN
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}