import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2025",
    title: "Baseline Assessment",
    desc: "~210 GW non-fossil capacity. WTE capacity at ~856 MW. EV market accelerating.",
    status: "CURRENT",
    color: "text-white"
  },
  {
    year: "2030",
    title: "Primary Milestones",
    desc: "500 GW non-fossil capacity. ≥5 MMT green hydrogen production. 60-100 GW electrolyser target met.",
    status: "LOCKED",
    color: "text-saffron"
  },
  {
    year: "2047",
    title: "Viksit Bharat",
    desc: "100th year of Independence. Absolute energy independence achieved.",
    status: "TARGET",
    color: "text-india-green"
  },
  {
    year: "2070",
    title: "Net Zero",
    desc: "Zero net carbon emissions. Final destination of the Mission Bharat protocol.",
    status: "DIRECTIVE",
    color: "text-white"
  }
];

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) {
      gsap.set('.flight-path', { strokeDashoffset: 0 });
      return;
    }
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    // 3D Viewport Scrub
    gsap.to('.journey-track', {
      rotateX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: '.journey-viewport',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Speed lines scrub
    gsap.to('.speed-line', {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: '.journey-viewport',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Path drawing and glow dot
    const path = containerRef.current?.querySelector('.flight-path') as SVGPathElement | null;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: '.journey-track',
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
      
      gsap.to('.path-dot', {
        top: '100%',
        ease: "none",
        scrollTrigger: {
          trigger: '.journey-track',
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
    }

    // Milestone Cards Enter/Exit
    q('.milestone-card-wrapper').forEach((card, i) => {
      // Enter
      gsap.fromTo(card,
        { opacity: 0, z: -300, scale: 0.6 },
        {
          opacity: 1, z: 0, scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top center",
            scrub: 1
          }
        }
      );
      // Exit
      gsap.to(card, {
        opacity: 0, z: 200, scale: 1.1,
        ease: "power2.in",
        scrollTrigger: {
          trigger: card,
          start: "bottom 30%",
          end: "bottom top",
          scrub: 1
        }
      });

      // Flare on entrance
      const flare = card.querySelector('.milestone-flare');
      if (flare) {
        gsap.fromTo(flare,
          { scale: 0, opacity: 0.6 },
          {
            scale: 2, opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top center",
              once: true
            }
          }
        );
      }
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 flex flex-col overflow-hidden bg-background">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full space-y-16 px-6">
        <div className="header-block space-y-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges mx-auto">
            <AshokaChakra className="w-5 h-5 text-saffron" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Flight Path
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
            Roadmap <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green">2025→2070</span>
          </h1>
        </div>
      </div>

      <div className="journey-viewport flex-1 relative w-full overflow-hidden mt-16 perspective-[1200px]" style={{ perspectiveOrigin: '50% 40%' }}>
        
        {/* Speed lines */}
        <div className="absolute inset-0 pointer-events-none z-0 flex flex-col justify-between">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="flex justify-center">
              <div 
                className="speed-line h-[1px] bg-white/10 origin-center scale-x-0" 
                style={{ width: `${80 + Math.random() * 120}px`, opacity: 0.06 }} 
              />
            </div>
          ))}
        </div>

        <div className="journey-track relative max-w-2xl mx-auto w-full pb-32" style={{ transformStyle: 'preserve-3d', transform: 'rotateX(20deg)' }}>
          
          {/* Vertical line */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-1 overflow-hidden pointer-events-none z-0">
            <div className="w-full h-full bg-white/5" />
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 4 1000">
              <path className="flight-path" d="M2,0 L2,1000" stroke="url(#flight-gradient)" strokeWidth="4" fill="none" />
              <defs>
                <linearGradient id="flight-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--saffron))" />
                  <stop offset="50%" stopColor="white" />
                  <stop offset="100%" stopColor="hsl(var(--india-green))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="path-dot absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-saffron rounded-full shadow-[0_0_10px_rgba(255,153,51,0.8)]" />
          </div>

          <div className="flex items-center gap-2 pl-24 mb-16 pt-8 font-mono text-xs text-saffron uppercase">
            <div className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
            <span>NOW — 2026</span>
            <div className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
          </div>

          <div className="space-y-48">
            {MILESTONES.map((m, i) => {
              return (
                <div key={m.year} className="milestone-card-wrapper relative flex items-center pl-24 pr-6 w-full" style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Node & Flare */}
                  <div className="absolute left-8 md:left-12 -translate-x-1/2 flex items-center justify-center">
                    <div className="milestone-node w-5 h-5 rounded-full bg-background border-4 border-saffron z-10 shadow-[0_0_15px_rgba(255,153,51,0.6)]" />
                    <div className="milestone-flare absolute w-20 h-20 rounded-full border border-saffron opacity-0 pointer-events-none" />
                  </div>
                  
                  {/* Content */}
                  <div className="milestone-card w-full p-8 border border-white/10 bg-white/5 backdrop-blur-md tech-border" style={{ transform: 'rotateY(-15deg)' }}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`font-sans text-4xl font-bold ${m.color}`}>{m.year}</span>
                      <span className="px-2 py-0.5 bg-white/10 font-mono text-xs uppercase text-muted-foreground rounded">
                        {m.status}
                      </span>
                    </div>
                    <h3 className="font-sans text-2xl font-bold uppercase mb-3">{m.title}</h3>
                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </div>
                  
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </main>
  );
}