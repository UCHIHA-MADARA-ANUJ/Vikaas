import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { Sun, Wind, Droplet, Car, Zap, Recycle } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: "01",
    title: "Solar Energy",
    icon: Sun,
    stat: "500 GW Target",
    desc: "Aggressive expansion of photovoltaic grids targeting 500 GW non-fossil capacity by 2030.",
    color: "text-saffron",
    borderColor: "border-saffron/30"
  },
  {
    id: "02",
    title: "Wind Power",
    icon: Wind,
    stat: "50 GW/Year Added",
    desc: "Offshore and onshore wind farms accelerating the transition to a 100% renewable grid.",
    color: "text-white",
    borderColor: "border-white/30"
  },
  {
    id: "03",
    title: "Green Hydrogen",
    icon: Droplet,
    stat: "≥5 MMT/Yr",
    desc: "Deploying 60-100 GW electrolyser capacity to become a global hub for green hydrogen.",
    color: "text-india-green",
    borderColor: "border-india-green/30"
  },
  {
    id: "04",
    title: "EV & Mobility",
    icon: Car,
    stat: "$200B Opportunity",
    desc: "Electrification of transport networks per NITI Aayog's economic projections.",
    color: "text-saffron",
    borderColor: "border-saffron/30"
  },
  {
    id: "05",
    title: "Smart Grids",
    icon: Zap,
    stat: "100% Energy Ind.",
    desc: "Intelligent AI-driven distribution networks to manage intermittent renewable sources by 2047.",
    color: "text-white",
    borderColor: "border-white/30"
  },
  {
    id: "06",
    title: "Waste-to-Energy",
    icon: Recycle,
    stat: "~856 MW (2025)",
    desc: "Circular economy infrastructure turning municipal solid waste into reliable baseload power.",
    color: "text-india-green",
    borderColor: "border-india-green/30"
  }
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    // Header reveal
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    // Pillars stagger in
    q('.pillar-card').forEach((card, index) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 50, rotateX: 10 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
      
      // Icon assemble
      const iconLines = card.querySelectorAll('.icon-element *');
      if (iconLines.length) {
        gsap.fromTo(iconLines,
          { opacity: 0, scale: 0, transformOrigin: "center" },
          {
            opacity: 1, scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              once: true
            }
          }
        );
      }
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        <div className="header-block space-y-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges mx-auto">
            <AshokaChakra className="w-5 h-5 text-saffron" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Core Systems
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
            Green Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green">Pillars</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={pillar.id}
                className={`pillar-card group relative p-8 border ${pillar.borderColor} bg-card/40 backdrop-blur-sm tech-border hover:-translate-y-2 transition-transform duration-300`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-0 right-0 p-4 font-mono text-xs text-muted-foreground opacity-50 font-bold">
                  {pillar.id} // SYS
                </div>
                
                <div className={`icon-element w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/5 ${pillar.color}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="font-sans text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                  {pillar.title}
                </h3>
                
                <div className="font-mono text-sm text-india-green font-bold mb-4 bg-india-green/10 inline-block px-2 py-1 rounded">
                  {pillar.stat}
                </div>
                
                <p className="font-sans text-muted-foreground leading-relaxed">
                  {pillar.desc}
                </p>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}
