import { useRef, useState, useEffect } from 'react';
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
    borderColor: "border-saffron/30",
    missionCode: "> LOAD SYS_OP: ANUJ_PHULERA\n> ASSIGNMENT: FULL-STACK DEVELOPMENT\n> STATUS: ACTIVE"
  },
  {
    name: "Aarav Choudhary",
    role: "Innovator & Designer",
    grade: "Grade 10, Colonels Central Academy",
    phone: "9250083692",
    email: "aaravgurmeet@gmail.com",
    image: aaravPortrait,
    borderColor: "border-india-green/30",
    missionCode: "> LOAD SYS_OP: AARAV_CHOUDHARY\n> ASSIGNMENT: UI/UX & INNOVATION\n> STATUS: ACTIVE"
  }
];

function TypewriterHeader() {
  const [text, setText] = useState('> load --crew manifest');
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const sequence = [
      { t: '> load --crew manifest', delay: 600 },
      { t: '> LOADING CREW DATA...', delay: 1200 },
      { t: '> DONE', delay: 1800 }
    ];

    if (phase < sequence.length) {
      const timer = setTimeout(() => {
        setText(sequence[phase].t);
        setPhase(p => p + 1);
      }, sequence[phase].delay);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [phase]);

  if (phase >= 3) return null;

  return (
    <div className="font-mono text-saffron text-sm mb-4 h-5">
      {text}
      <span className="animate-pulse ml-1">█</span>
    </div>
  );
}

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay: 2, ease: "power3.out" }
    );
    
    gsap.fromTo(q('.crew-card'),
      { opacity: 0, x: (i) => i === 0 ? -50 : 50, rotateY: (i) => i === 0 ? -15 : 15 },
      {
        opacity: 1, x: 0, rotateY: 0,
        duration: 1,
        stagger: 0.2,
        delay: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: q('.crew-grid')[0],
          start: "top 80%",
          once: true
        }
      }
    );

    gsap.fromTo(q('.divider-patch'),
      { scale: 0, opacity: 0, rotation: -180 },
      {
        scale: 1, opacity: 1, rotation: 0,
        duration: 1,
        delay: 2.5,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: q('.crew-grid')[0],
          start: "top 80%",
          once: true
        }
      }
    );

  }, { scope: containerRef, dependencies: [isReduced] });

  const handleCopy = (e: React.MouseEvent, text: string, fieldId: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />
      
      <div className="relative z-10 max-w-6xl mx-auto w-full space-y-16">
        
        <div className="text-center">
          <TypewriterHeader />
          <div className="header-block space-y-6">
            <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
              CREW <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-india-green">MANIFEST</span>
            </h1>
          </div>
        </div>

        <div className="crew-grid relative grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Mission Patch Divider */}
          <div className="divider-patch hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-28 h-28 items-center justify-center filter drop-shadow-[0_0_15px_rgba(255,153,51,0.3)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="#030712" stroke="url(#patch-grad)" strokeWidth="2" />
              <defs>
                <linearGradient id="patch-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FF9933" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#138808" />
                </linearGradient>
                <path id="arc-top" d="M 20 40 A 30 30 0 0 1 80 40" fill="none" />
                <path id="arc-bottom" d="M 80 60 A 30 30 0 0 1 20 60" fill="none" />
              </defs>
              <text fontSize="8" fill="#FF9933" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                <textPath href="#arc-top" startOffset="50%" textAnchor="middle">TEAM VIKAAS</textPath>
              </text>
              <text fontSize="6" fill="#138808" fontFamily="monospace">
                <textPath href="#arc-bottom" startOffset="50%" textAnchor="middle">COLONELS ACADEMY</textPath>
              </text>
              <circle cx="50" cy="50" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.5" />
              {Array.from({length: 12}).map((_,i) => (
                <line key={i} x1="50" y1="50" x2="50" y2="38" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.5" transform={`rotate(${i*30} 50 50)`} />
              ))}
            </svg>
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
                
                {/* Orbital Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg className="w-full h-full opacity-15" viewBox="0 0 200 200">
                    <ellipse cx="100" cy="100" rx="80" ry="40" fill="none" stroke="#FF9933" strokeWidth="1" className="origin-center animate-[spin_8s_linear_infinite]" style={{ transform: 'rotate(20deg)' }} />
                    <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="#138808" strokeWidth="1" className="origin-center animate-[spin_12s_linear_infinite_reverse]" style={{ transform: 'rotate(-20deg)' }} />
                  </svg>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                
                {/* Holographic Shimmer */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none mix-blend-overlay"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,153,51,0.4), rgba(255,255,255,0.4), rgba(19,136,8,0.4), rgba(255,153,51,0.4))',
                    backgroundSize: '400% 400%',
                    animation: 'holoShift 3s ease infinite'
                  }}
                />

                {/* Terminal Bio Overlay */}
                <div className="absolute inset-0 bg-black/80 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="font-mono text-xs text-saffron whitespace-pre-wrap leading-relaxed">
                    {member.missionCode}
                  </div>
                </div>

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
                  <div className="flex gap-2 relative">
                    <span className="text-white/40">LOC:</span>
                    <span>{member.grade}</span>
                  </div>
                  <div className="flex gap-2 relative">
                    <span className="text-white/40">COM:</span>
                    <a href={`tel:${member.phone}`} onClick={(e) => handleCopy(e, member.phone, `phone-${idx}`)} className="hover:text-white transition-colors cursor-pointer group/link relative">
                      {member.phone}
                      {copiedField === `phone-${idx}` && (
                        <span className="absolute left-full ml-2 text-saffron">COPIED ✓</span>
                      )}
                    </a>
                  </div>
                  <div className="flex gap-2 relative">
                    <span className="text-white/40">NET:</span>
                    <a href={`mailto:${member.email}`} onClick={(e) => handleCopy(e, member.email, `email-${idx}`)} className="hover:text-white transition-colors break-all cursor-pointer group/link relative">
                      {member.email}
                      {copiedField === `email-${idx}` && (
                        <span className="absolute left-full ml-2 text-saffron whitespace-nowrap">COPIED ✓</span>
                      )}
                    </a>
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