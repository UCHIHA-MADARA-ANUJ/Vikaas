import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AshokaChakra } from '@/components/Motifs';
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
    borderColor: "border-saffron/30",
    glowColor: "rgba(255, 153, 51, 0.5)",
    progress: 42,
    progressLabel: "42% to 2030 Tgt"
  },
  {
    id: "02",
    title: "Wind Power",
    icon: Wind,
    stat: "50 GW/Year Added",
    desc: "Offshore and onshore wind farms accelerating the transition to a 100% renewable grid.",
    color: "text-white",
    borderColor: "border-white/30",
    glowColor: "rgba(125, 211, 252, 0.5)",
    progress: 35,
    progressLabel: "35% Installed"
  },
  {
    id: "03",
    title: "Green Hydrogen",
    icon: Droplet,
    stat: "≥5 MMT/Yr",
    desc: "Deploying 60-100 GW electrolyser capacity to become a global hub for green hydrogen.",
    color: "text-india-green",
    borderColor: "border-india-green/30",
    glowColor: "rgba(52, 211, 153, 0.5)",
    progress: 15,
    progressLabel: "Scaling Phase"
  },
  {
    id: "04",
    title: "EV & Mobility",
    icon: Car,
    stat: "$200B Opportunity",
    desc: "Electrification of transport networks per NITI Aayog's economic projections.",
    color: "text-saffron",
    borderColor: "border-saffron/30",
    glowColor: "rgba(168, 85, 247, 0.5)",
    progress: 25,
    progressLabel: "25% Adoption"
  },
  {
    id: "05",
    title: "Smart Grids",
    icon: Zap,
    stat: "100% Energy Ind.",
    desc: "Intelligent AI-driven distribution networks to manage intermittent renewable sources by 2047.",
    color: "text-white",
    borderColor: "border-white/30",
    glowColor: "rgba(251, 191, 36, 0.5)",
    progress: 30,
    progressLabel: "Grid Upgrades"
  },
  {
    id: "06",
    title: "Waste-to-Energy",
    icon: Recycle,
    stat: "~856 MW (2025)",
    desc: "Circular economy infrastructure turning municipal solid waste into reliable baseload power.",
    color: "text-india-green",
    borderColor: "border-india-green/30",
    glowColor: "rgba(134, 239, 172, 0.5)",
    progress: 20,
    progressLabel: "Capacity Active"
  }
];

export default function Pillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    // Circuit connections draw
    const paths = q('.circuit-line');
    paths.forEach(path => {
      const length = (path as unknown as SVGGeometryElement).getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: '.grid-container',
          start: "top 60%"
        }
      });
    });
    
    q('.pillar-card-wrapper').forEach((cardWrapper) => {
      // Entrance
      gsap.fromTo(cardWrapper, 
        { opacity: 0, z: -100 },
        {
          opacity: 1, z: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardWrapper,
            start: "top 85%",
            once: true
          }
        }
      );
      
      // Flash SYSTEM ONLINE
      const flash = cardWrapper.querySelector('.system-flash');
      if (flash) {
        gsap.to(flash, {
          opacity: 1,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: cardWrapper,
            start: "top 85%",
            once: true
          }
        });
      }

      // Progress bar fill on back face
      const bar = cardWrapper.querySelector('.progress-fill');
      const progress = bar?.getAttribute('data-progress');
      if (bar && progress) {
        gsap.to(bar, {
          width: `${progress}%`,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cardWrapper,
            start: "top 85%",
            once: true
          }
        });
      }
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        
        <div className="header-block space-y-6 text-center relative z-20">
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

        <div className="grid-container relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-[1000px]">
          
          {/* Circuit Connections (Desktop) */}
          <div className="absolute inset-0 pointer-events-none hidden lg:block z-0">
            <svg className="w-full h-full" style={{ overflow: 'visible' }}>
              <path className="circuit-line" d="M 33% 150 L 66% 150" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <path className="circuit-line" d="M 33% 450 L 66% 450" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <path className="circuit-line" d="M 16% 250 L 16% 350" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <path className="circuit-line" d="M 50% 250 L 50% 350" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
              <path className="circuit-line" d="M 83% 250 L 83% 350" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="5,5" />
            </svg>
          </div>

          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCard === pillar.id;
            
            return (
              <div 
                key={pillar.id}
                className="pillar-card-wrapper group relative"
                style={{ transformStyle: 'preserve-3d', zIndex: 10 }}
                onMouseEnter={() => setHoveredCard(pillar.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                
                {/* System Online Flash */}
                <div className="system-flash absolute top-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white bg-white/20 px-2 py-0.5 rounded opacity-0 pointer-events-none z-50">
                  SYSTEM: ONLINE
                </div>

                <div 
                  className="pillar-card-inner relative w-full h-full transition-transform duration-700"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  
                  {/* FRONT FACE */}
                  <div 
                    className={`front-face absolute inset-0 backface-hidden p-8 border ${pillar.borderColor} bg-card/60 backdrop-blur-sm tech-border flex flex-col`}
                    style={{ 
                      boxShadow: isHovered ? `0 0 30px ${pillar.glowColor}` : 'none',
                      transition: 'box-shadow 0.3s ease'
                    }}
                  >
                    <div className="absolute top-0 right-0 p-4 font-mono text-xs text-muted-foreground opacity-50 font-bold">
                      {pillar.id} // SYS
                    </div>
                    
                    <div className={`w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 bg-white/5 ${pillar.color}`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    <h3 className="font-sans text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                      {pillar.title}
                    </h3>
                    
                    <div className="font-mono text-sm text-india-green font-bold mb-4 bg-india-green/10 inline-block px-2 py-1 rounded w-fit">
                      {pillar.stat}
                    </div>
                    
                    <p className="font-sans text-muted-foreground leading-relaxed flex-1">
                      {pillar.desc}
                    </p>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className={`back-face backface-hidden p-8 border ${pillar.borderColor} bg-card/90 backdrop-blur-md flex flex-col`}
                    style={{ 
                      transform: 'rotateY(180deg)',
                      boxShadow: isHovered ? `0 0 30px ${pillar.glowColor}` : 'none',
                      minHeight: '320px'
                    }}
                  >
                    <h4 className="font-mono text-sm uppercase text-muted-foreground border-b border-white/10 pb-2 mb-4">
                      System Details // {pillar.id}
                    </h4>
                    
                    <div className="space-y-6 flex-1">
                      <div>
                        <div className="text-xs font-mono text-white/50 mb-1">CURRENT STATUS</div>
                        <div className={`font-sans text-xl font-bold ${pillar.color}`}>{pillar.progressLabel}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-mono text-white/50 mb-1">TARGET METRIC</div>
                        <div className="font-mono text-sm text-white">{pillar.stat}</div>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
                          <span>PROGRESS TO 2047</span>
                          <span>{pillar.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
                          <div 
                            className="progress-fill h-full bg-gradient-to-r from-saffron via-white to-india-green"
                            style={{ width: '0%' }}
                            data-progress={pillar.progress}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </main>
  );
}