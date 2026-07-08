import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AshokaChakra } from '@/components/Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import anujPortrait from '@/assets/crew/anuj-portrait.png';
import aaravPortrait from '@/assets/crew/aarav-portrait.png';

gsap.registerPlugin(ScrollTrigger);

const CREW = [
  {
    name: "Anuj Phulera",
    role: "Team Lead, Coder & Builder",
    grade: "Grade 10, Colonels Central Academy",
    phone: "9891011165",
    email: "madara.coding.projects@gmail.com",
    image: anujPortrait,
    borderColor: "border-saffron/30"
  },
  {
    name: "Aarav Choudhary",
    role: "Innovator & Designer",
    grade: "Grade 10, Colonels Central Academy",
    phone: "9250083692",
    email: "aaravgurmeet@gmail.com",
    image: aaravPortrait,
    borderColor: "border-india-green/30"
  }
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    // Docking animation for crew cards
    gsap.fromTo(q('.crew-card'),
      { opacity: 0, x: (i) => i === 0 ? -50 : 50, rotateY: (i) => i === 0 ? -15 : 15 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q('.crew-grid')[0],
          start: "top 80%",
          once: true
        }
      }
    );

    gsap.fromTo(q('.divider-chakra'),
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1, opacity: 1, rotation: 0,
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: q('.crew-grid')[0],
          start: "top 80%",
          once: true
        }
      }
    );

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        <div className="header-block space-y-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges mx-auto">
            <AshokaChakra className="w-5 h-5 text-saffron" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Mission Crew / Team Vikaas
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
            Team <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green">Vikaas</span>
          </h1>
        </div>

        <div className="crew-grid relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Divider Chakra (Desktop) */}
          <div className="divider-chakra hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-background rounded-full items-center justify-center border border-white/10">
            <AshokaChakra className="w-10 h-10 text-white" />
          </div>

          {CREW.map((member, idx) => (
            <div 
              key={member.name}
              className={`crew-card group flex flex-col border ${member.borderColor} bg-card/60 backdrop-blur-md overflow-hidden hover:-translate-y-2 transition-transform duration-500`}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-black border-b border-white/10">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute top-4 left-4 font-mono text-[10px] text-white/50 tracking-widest">
                  CREW_{idx + 1}
                </div>
              </div>
              
              <div className="p-8 space-y-4">
                <div>
                  <h3 className="font-sans text-3xl font-bold uppercase text-white mb-1 tracking-tight">{member.name}</h3>
                  <div className="font-mono text-sm text-saffron uppercase">{member.role}</div>
                </div>
                
                <div className="space-y-1 font-mono text-xs text-muted-foreground uppercase pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <span className="text-white/40">LOC:</span>
                    <span>{member.grade}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/40">COM:</span>
                    <a href={`tel:${member.phone}`} className="hover:text-white transition-colors">{member.phone}</a>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-white/40">NET:</span>
                    <a href={`mailto:${member.email}`} className="hover:text-white transition-colors break-all">{member.email}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}

        </div>
        
        <div className="pt-12 border-t border-white/10 text-center">
          <p className="font-mono text-sm text-muted-foreground uppercase tracking-widest">
            "Engineering India's tomorrow, today."
          </p>
        </div>

      </div>
    </main>
  );
}
