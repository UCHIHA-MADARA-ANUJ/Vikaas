import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

// A scramble text component that decodes on scroll
const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
  const el = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  
  useGSAP(() => {
    if (!el.current || isReduced) return;
    
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const originalText = text;
    
    gsap.to(el.current, {
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
        if (el.current) el.current.innerText = scrambled;
      },
      onStart: () => {
        if (el.current) el.current.style.opacity = "1";
      }
    });
    
    // Set initial opacity 0 before scroll starts
    gsap.set(el.current, { opacity: 0 });
    
  }, { scope: el, dependencies: [isReduced] });

  return <div ref={el} className={className}>{text}</div>;
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
    
  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
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
          <div className="flex gap-4">
            <div className="w-1 bg-saffron shrink-0" />
            <ScrambleText text="SUBJECT: INDIA'S TRANSITION TO A SUSTAINABLE SUPERPOWER." />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1 bg-white shrink-0" />
            <ScrambleText text="PRIMARY OBJECTIVE: ATTAIN ABSOLUTE ENERGY INDEPENDENCE BY THE YEAR 2047, MARKING 100 YEARS OF THE NATION'S SOVEREIGNTY." />
          </div>

          <div className="flex gap-4">
            <div className="w-1 bg-india-green shrink-0" />
            <ScrambleText text="FINAL DIRECTIVE: ACHIEVE NET ZERO EMISSIONS BY 2070. ELIMINATE CARBON DEPENDENCY. SCALE NON-FOSSIL INFRASTRUCTURE TO UNPRECEDENTED LEVELS." />
          </div>
          
          <div className="p-6 border border-white/10 bg-card/40 backdrop-blur-md clip-edges mt-12 relative overflow-hidden group">
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
