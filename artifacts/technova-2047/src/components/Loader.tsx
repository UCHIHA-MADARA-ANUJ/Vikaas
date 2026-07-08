import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function CinematicLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader');
    if (hasSeenLoader || isReduced) {
      sessionStorage.setItem('hasSeenLoader', 'true');
      setIsComplete(true);
      return;
    }

    const q = gsap.utils.selector(containerRef);
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('hasSeenLoader', 'true');
        setIsComplete(true);
      }
    });

    // Phase 1 (0-3s)
    tl.to(q('.saffron-glow'), { opacity: 1, duration: 1, ease: 'power2.inOut' }, 0);
    tl.fromTo(q('.chakra-spoke'), 
      { strokeDashoffset: 50 },
      { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      0.5
    );

    // Phase 2 (3-8s)
    tl.fromTo(q('.telemetry-char'),
      { opacity: 0 },
      { opacity: 1, duration: 0.5, stagger: 0.05 },
      3.0
    );
    tl.fromTo(q('.boot-status'),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.5 },
      3.5
    );

    // Phase 3 (8-14s)
    tl.fromTo(q('.flag-band'),
      { x: '-100vw' },
      { x: '0vw', duration: 1.5, stagger: 0.5, ease: 'power3.inOut' },
      8.0
    );
    // Chakra spin runs OUTSIDE the master timeline so it does not make tl infinite
    gsap.to(q('.chakra-center'), { rotation: 360, duration: 4, ease: 'none', repeat: -1 });

    // Phase 4 (14-18s)
    tl.to(q('.flag-bands-container'),
      { y: '-150%', duration: 1.5, ease: 'power3.in' },
      14.0
    );
    tl.fromTo(q('.mission-title .letter'),
      { opacity: 0 },
      { opacity: 1, duration: 0.1, stagger: 0.05 },
      14.5
    );
    tl.fromTo(q('.mission-stat'),
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.3, stagger: 0.2 },
      15.0
    );

    // Phase 5 (18-20s)
    tl.to(q('.mission-online'), { opacity: 1, duration: 0.5, yoyo: true, repeat: 3 }, 18.0);
    tl.fromTo(q('.shockwave-ring'),
      { scale: 0, opacity: 1 },
      { scale: 3, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out' },
      18.5
    );
    tl.to(q('.flash-white'), { opacity: 1, duration: 0.2 }, 19.5);
    tl.to(containerRef.current, { opacity: 0, duration: 0.3 }, 19.7);

  }, { scope: containerRef, dependencies: [isReduced] });

  // Random char cycling
  useEffect(() => {
    if (isComplete) return;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const interval = setInterval(() => {
      document.querySelectorAll('.telemetry-char').forEach(el => {
        if (Math.random() > 0.5) {
          el.innerHTML = chars[Math.floor(Math.random() * chars.length)];
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isComplete]);

  if (isComplete) return null;

  const title = "MISSION BHARAT";
  const stats = [
    { text: "500 GW TARGET", color: "text-saffron" },
    { text: "NET ZERO 2070", color: "text-white" },
    { text: ">=5 MMT H2 / YEAR", color: "text-india-green" },
    { text: "$200B EV OPPORTUNITY", color: "text-saffron" }
  ];
  const statuses = [
    "[SYS] INITIATING GREEN PROTOCOL... OK",
    "[PWR] CALIBRATING RENEWABLE GRIDS... SYNCED",
    "[ENV] NET ZERO VECTOR 2070... LOCKED",
    "[NAV] MISSION BHARAT PROTOCOL... ARMED",
    "[CMD] AWAITING IGNITION SEQUENCE..."
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center overflow-hidden">
      
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="saffron-glow absolute w-64 h-64 bg-saffron rounded-full blur-[100px] opacity-0 mix-blend-screen" />
        <svg className="absolute w-48 h-48 opacity-30" viewBox="0 0 100 100">
          {Array.from({ length: 24 }).map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="50" 
              x2="50" y2="10" 
              transform={`rotate(${i * 15} 50 50)`}
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="50"
              strokeDashoffset="50"
              className="chakra-spoke text-saffron"
            />
          ))}
        </svg>
      </div>

      {Array.from({ length: 25 }).map((_, i) => (
        <span 
          key={i} 
          className="telemetry-char absolute font-mono text-xs text-india-green opacity-0 pointer-events-none"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        >
          0
        </span>
      ))}

      <div className="absolute bottom-10 left-10 font-mono text-xs text-white opacity-80 flex flex-col gap-1">
        {statuses.map((s, i) => (
          <div key={i} className="boot-status opacity-0">{s}</div>
        ))}
      </div>

      <div className="flag-bands-container absolute inset-0 flex flex-col pointer-events-none z-10">
        <div className="flag-band absolute top-0 w-full h-1/3 bg-saffron -translate-x-full" />
        <div className="flag-band absolute top-1/3 w-full h-1/3 bg-white -translate-x-full flex items-center justify-center">
          <svg className="chakra-center w-24 h-24 text-blue-900" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
             <circle cx="50" cy="50" r="48" />
             {Array.from({ length: 24 }).map((_, i) => (
               <line key={i} x1="50" y1="50" x2="50" y2="2" transform={`rotate(${i * 15} 50 50)`} />
             ))}
          </svg>
        </div>
        <div className="flag-band absolute top-2/3 w-full h-1/3 bg-india-green -translate-x-full" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <h1 className="mission-title font-sans text-5xl md:text-8xl font-black uppercase flex">
          {title.split('').map((l, i) => (
            <span key={i} className={`letter opacity-0 ${l === ' ' ? 'w-4' : ''}`}>{l}</span>
          ))}
        </h1>
        <div className="flex gap-4 mt-8 flex-wrap justify-center max-w-2xl">
          {stats.map((s, i) => (
            <div key={i} className={`mission-stat font-mono text-sm md:text-base border border-current px-3 py-1 bg-background/50 backdrop-blur opacity-0 ${s.color}`}>
              {s.text}
            </div>
          ))}
        </div>
        <div className="mission-online absolute bottom-1/4 font-mono text-xl text-saffron tracking-widest opacity-0 font-bold">
          MISSION BHARAT: ONLINE
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
        {[1, 2, 3].map(i => (
          <div key={i} className={`shockwave-ring absolute w-32 h-32 rounded-full border border-saffron opacity-0 ${i === 2 ? 'border-white' : i === 3 ? 'border-india-green' : ''}`} />
        ))}
      </div>

      <div className="flash-white absolute inset-0 bg-white opacity-0 z-50 pointer-events-none" />
    </div>
  );
}