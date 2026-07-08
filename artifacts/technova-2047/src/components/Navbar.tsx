import { Link, useLocation } from 'wouter';
import { AshokaChakra } from './Motifs';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const NAV_ITEMS = [
  { href: '/', label: 'Mission Control' },
  { href: '/vision', label: 'Vision 2047' },
  { href: '/pillars', label: 'Green Tech' },
  { href: '/impact', label: 'Impact Stats' },
  { href: '/roadmap', label: 'Roadmap' },
  { href: '/team', label: 'Crew' }
];

export function Navbar() {
  const [location] = useLocation();
  const isReduced = useReducedMotion();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-background/80 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <AshokaChakra className="w-8 h-8 text-saffron" />
        <div className="font-sans font-bold text-lg tracking-widest uppercase">
          Mission<span className="text-saffron">Bharat</span>
        </div>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`font-mono text-sm uppercase tracking-wider transition-colors relative group ${isActive ? 'text-saffron' : 'text-muted-foreground hover:text-white'}`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-gradient-to-r from-saffron via-white to-india-green transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </Link>
          );
        })}
      </nav>
      
      <div className="font-mono text-xs text-india-green border border-india-green/30 px-3 py-1 rounded bg-india-green/10 flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full bg-india-green ${isReduced ? '' : 'animate-pulse'}`} />
        SYS_ONLINE
      </div>
    </header>
  );
}
