import { Link, useLocation } from 'wouter';
import { AshokaChakra } from './Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagnetic } from '@/hooks/use-magnetic';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { href: '/', label: 'Mission Control' },
  { href: '/vision', label: 'Vision 2047' },
  { href: '/pillars', label: 'Green Tech' },
  { href: '/impact', label: 'Impact Stats' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/team', label: 'Crew' }
];

function NavLink({ item, isActive }: { item: any, isActive: boolean }) {
  const { ref, handleMouseMove, handleMouseLeave } = useMagnetic<HTMLDivElement>();
  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative group">
      <Link 
        href={item.href}
        className={`font-mono text-sm uppercase tracking-wider transition-colors block p-2 ${isActive ? 'text-saffron' : 'text-muted-foreground hover:text-white'}`}
      >
        {item.label}
        <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-saffron via-white to-india-green transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-3 h-3 text-saffron animate-[spin_3s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="50" cy="50" r="48" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="50" y1="50" x2="50" y2="2" transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </svg>
        </div>
      </Link>
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const isReduced = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isReduced || !progressRef.current) return;
    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }, { scope: headerRef, dependencies: [isReduced] });

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <AshokaChakra className="w-8 h-8 text-saffron" />
        <div className="font-sans font-bold text-lg tracking-widest uppercase">
          Mission<span className="text-saffron">Bharat</span>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-4">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} isActive={location === item.href} />
        ))}
      </nav>
      
      <div className="font-mono text-xs text-india-green border border-india-green/30 px-3 py-1 rounded bg-india-green/10 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full bg-india-green ${isReduced ? '' : 'animate-pulse'}`} />
        SYS_ONLINE
      </div>

      <div ref={progressRef} className="absolute bottom-0 left-0 w-full h-px origin-left scale-x-0 bg-gradient-to-r from-saffron via-white to-india-green" />
    </header>
  );
}