import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
  const el = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const isReduced = useReducedMotion();
  
  useGSAP(() => {
    if (!el.current || isReduced) return;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const originalText = text;
    const textNode = el.current.querySelector('.scramble-content') as HTMLElement;
    
    gsap.to(textNode, {
      scrollTrigger: {
        trigger: el.current,
        start: "top 85%",
        once: true
      },
      duration: 1.5,
      ease: "none",
      onUpdate: function() {
        const progress = this.progress();
        const revealedChars = Math.floor(progress * originalText.length);
        
        let scrambled = "";
        for (let i = 0; i < originalText.length; i++) {
          if (i < revealedChars || originalText[i] === " ") {
            scrambled += originalText[i];
          } else {
            scrambled += chars[Math.floor(Math.random() * chars.length)];
          }
        }
        if (textNode) textNode.innerText = scrambled;
      },
      onStart: () => {
        if (textNode) textNode.style.opacity = "1";
      },
      onComplete: () => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.5, delay: 3 });
        }
      }
    });
    
    gsap.set(textNode, { opacity: 0 });
    
  }, { scope: el, dependencies: [isReduced] });

  return (
    <div ref={el} className={className}>
      <span className="scramble-content">{text}</span>
      <span ref={cursorRef} className="font-mono text-saffron ml-1">█</span>
    </div>
  );
};

export default function Vision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    q('.scan-reveal').forEach((el) => {
      const overlay = el.querySelector('.scan-overlay');
      if (overlay) {
        gsap.fromTo(overlay,
          { top: '-10%' },
          {
            top: '110%',
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true
            }
          }
        );
      }
    });
    
    const dots = q('.transmission-dot');
    if (dots.length) {
      gsap.to(dots, {
        opacity: 0.2,
        stagger: {
          each: 0.2,
          yoyo: true,
          repeat: -1
        },
        duration: 0.4
      });
    }

    q('.stat-glow-box').forEach(box => {
      gsap.to(box, {
        boxShadow: '0 0 20px rgba(255, 153, 51, 0.4)',
        yoyo: true,
        repeat: -1,
        duration: 2,
        ease: 'sine.inOut'
      });
    });
    
  }, { scope: containerRef, dependencies: [isReduced] });

  const watermarkText = 'TOP SECRET // MISSION BHARAT // VIKSIT BHARAT 2047 // '.repeat(20);

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      
      {/* Classified Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.03] z-0">
        <div className="font-mono text-white -rotate-45 whitespace-nowrap text-4xl w-[200%] break-all flex flex-wrap leading-loose">
          {watermarkText}
          {watermarkText}
          {watermarkText}
        </div>
      </div>
      
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      {/* Incoming Transmission Side Strip */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-2 pointer-events-none opacity-70">
        <div className="flex flex-col gap-1 mb-2">
          <div className="transmission-dot w-1 h-1 bg-saffron rounded-full" />
          <div className="transmission-dot w-1 h-1 bg-saffron rounded-full" />
          <div className="transmission-dot w-1 h-1 bg-saffron rounded-full" />
        </div>
        <div className="writing-vertical-rl font-mono text-[10px] text-saffron tracking-[0.3em] uppercase whitespace-nowrap rotate-180">
          INCOMING TRANSMISSION ▼▼▼
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full space-y-16">
        
        <div className="header-block space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges">
            <AshokaChakra className="w-5 h-5 text-saffron" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Mission Briefing / Directive
            </span>
          </div>
          <h1 className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            Vision <span className="text-india-green">2047</span>
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-saffron via-white to-india-green" />
        </div>

        <div className="space-y-12 font-mono text-sm md:text-lg text-white/80 leading-relaxed uppercase tracking-wider">
          
          <div className="scan-reveal relative overflow-hidden flex gap-4 p-2">
            <div className="scan-overlay absolute left-0 right-0 h-1 bg-white/20 blur-[2px] z-10 top-[-10%]" />
            <div className="w-1 bg-saffron shrink-0" />
            <ScrambleText text="SUBJECT: INDIA'S TRANSITION TO A SUSTAINABLE SUPERPOWER." />
          </div>
          
          <div className="scan-reveal relative overflow-hidden flex gap-4 p-2">
            <div className="scan-overlay absolute left-0 right-0 h-1 bg-white/20 blur-[2px] z-10 top-[-10%]" />
            <div className="w-1 bg-white shrink-0" />
            <ScrambleText text="PRIMARY OBJECTIVE: ATTAIN ABSOLUTE ENERGY INDEPENDENCE BY THE YEAR 2047, MARKING 100 YEARS OF THE NATION'S SOVEREIGNTY." />
          </div>

          <div className="scan-reveal relative overflow-hidden flex gap-4 p-2">
            <div className="scan-overlay absolute left-0 right-0 h-1 bg-white/20 blur-[2px] z-10 top-[-10%]" />
            <div className="w-1 bg-india-green shrink-0" />
            <ScrambleText text="FINAL DIRECTIVE: ACHIEVE NET ZERO EMISSIONS BY 2070. ELIMINATE CARBON DEPENDENCY. SCALE NON-FOSSIL INFRASTRUCTURE TO UNPRECEDENTED LEVELS." />
          </div>
          
          <div className="stat-glow-box p-6 border-l-4 border-saffron bg-card/40 backdrop-blur-md clip-edges mt-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 space-y-4">
              <div className="text-saffron font-bold flex items-center gap-2">
                <span className={isReduced ? '' : 'animate-pulse'}>●</span> EXECUTIVE SUMMARY (NITI AAYOG SCENARIOS)
              </div>
              <p className="normal-case font-sans text-muted-foreground text-lg">
                The path to Viksit Bharat (Developed India) runs through Green Technology. 
                By aggressively scaling our renewable capacity to 500 GW by 2030, establishing dominance in Green Hydrogen production, 
                and electrifying mobility, we are not just mitigating climate impact—we are securing the economic and strategic future of a billion people. 
                This is a planetary-scale intervention.
              </p>
            </div>
          </div>
          
        </div>

      </div>
    </main>
  );
}