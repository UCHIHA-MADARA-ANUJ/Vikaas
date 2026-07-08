import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
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
    
    // Flight path drawing
    const path = containerRef.current?.querySelector('.flight-path') as SVGPathElement | null;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: q('.timeline-container')[0],
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      });
    }

    // Checkpoints pop
    q('.milestone-node').forEach((node, i) => {
      gsap.fromTo(node,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 70%"
          }
        }
      );
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-4xl mx-auto w-full space-y-16">
        
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

        <div className="timeline-container relative py-12">
          
          {/* Vertical line for desktop/mobile */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 overflow-hidden">
            <div className="w-full h-full bg-white/10" />
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
          </div>

          <div className="space-y-24">
            {MILESTONES.map((m, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={m.year} className={`relative flex items-center ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                  
                  {/* Node */}
                  <div className="milestone-node absolute left-8 md:left-1/2 w-6 h-6 -translate-x-1/2 rounded-full bg-background border-4 border-saffron z-10 shadow-[0_0_15px_rgba(255,153,51,0.6)]" />
                  
                  {/* Content */}
                  <div className="w-full pl-20 md:pl-0 md:w-1/2 flex">
                    <div className={`p-6 border border-white/10 bg-card/60 backdrop-blur-sm tech-border hover:bg-white/5 transition-colors w-full md:w-10/12 ${isEven ? 'md:ml-auto md:mr-12' : 'md:ml-12'}`}>
                      <div className="flex items-center gap-4 mb-2">
                        <span className={`font-mono text-3xl font-bold ${m.color}`}>{m.year}</span>
                        <span className="px-2 py-0.5 bg-white/10 font-mono text-[10px] uppercase text-muted-foreground rounded">
                          {m.status}
                        </span>
                      </div>
                      <h3 className="font-sans text-xl font-bold uppercase mb-2">{m.title}</h3>
                      <p className="font-mono text-sm text-muted-foreground">{m.desc}</p>
                    </div>
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
