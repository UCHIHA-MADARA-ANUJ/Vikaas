import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RadarBackground, AshokaChakra } from '@/components/Motifs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

const CAPACITY_DATA = [
  { name: 'Current (~2025)', value: 210, label: '~210 GW' },
  { name: 'Target (2030)', value: 500, label: '500 GW' }
];

const HYDROGEN_DELIVERABLES = [
  { metric: "Green Hydrogen Production", target: "≥5 MMT / year", status: "Scaling" },
  { metric: "Electrolyser Capacity", target: "60-100 GW", status: "Scaling" },
  { metric: "Dedicated RE Capacity", target: "125 GW", status: "Scaling" },
  { metric: "CO2 Averted Annually", target: "50 MMT", status: "Projected" },
];

export default function Impact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;
    
    const q = gsap.utils.selector(containerRef);
    
    gsap.fromTo(q('.header-block'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
    
    gsap.fromTo(q('.kpi-panel'),
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
      }
    );

    gsap.fromTo(q('.dashboard-panel'),
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q('.dashboard-grid')[0],
          start: "top 80%",
          once: true
        }
      }
    );
    
    q('.kpi-counter').forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      gsap.to(el, {
        innerHTML: target,
        duration: 2,
        snap: { innerHTML: 1 },
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true
        }
      });
    });

    // Table rows stagger
    q('.deliverable-row').forEach((row, i) => {
      gsap.fromTo(row,
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.4,
          delay: i * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: q('.table-container')[0],
            start: "top 80%",
            once: true
          }
        }
      );
    });

    // Progress rings
    q('.progress-ring-circle').forEach((ring) => {
      const length = (ring as unknown as SVGGeometryElement).getTotalLength();
      const progress = parseFloat(ring.getAttribute('data-progress') || '0');
      gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(ring, {
        strokeDashoffset: length - (length * progress / 100),
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: q('.rings-container')[0],
          start: "top 80%",
          once: true
        }
      });
    });

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <RadarBackground />
      
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] z-0" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-8">
        
        <div className="header-block space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/5 backdrop-blur-sm clip-edges">
            <AshokaChakra className="w-5 h-5 text-saffron" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Telemetry / Impact
            </span>
          </div>
          <h1 className="font-sans text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white">
            National <span className="text-india-green">Impact Targets</span>
          </h1>
        </div>

        {/* Big KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="kpi-panel p-6 border border-white/10 bg-black/40 backdrop-blur">
            <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Non-Fossil Tgt</div>
            <div className="font-sans font-black text-5xl text-saffron">
              <span className="kpi-counter" data-target="500">{isReduced ? '500' : '0'}</span><span className="text-2xl font-normal ml-1">GW</span>
            </div>
          </div>
          <div className="kpi-panel p-6 border border-white/10 bg-black/40 backdrop-blur">
            <div className="text-xs font-mono text-muted-foreground uppercase mb-2">Green H2 / Yr</div>
            <div className="font-sans font-black text-5xl text-white">
              <span className="kpi-counter" data-target="5">{isReduced ? '5' : '0'}</span><span className="text-2xl font-normal ml-1">MMT</span>
            </div>
          </div>
          <div className="kpi-panel p-6 border border-white/10 bg-black/40 backdrop-blur">
            <div className="text-xs font-mono text-muted-foreground uppercase mb-2">EV Opportunity</div>
            <div className="font-sans font-black text-5xl text-india-green">
              $<span className="kpi-counter" data-target="200">{isReduced ? '200' : '0'}</span><span className="text-2xl font-normal ml-1">B</span>
            </div>
          </div>
          <div className="kpi-panel p-6 border border-white/10 bg-black/40 backdrop-blur">
            <div className="text-xs font-mono text-muted-foreground uppercase mb-2">CO2 Averted / Yr</div>
            <div className="font-sans font-black text-5xl text-muted-foreground">
              <span className="kpi-counter" data-target="50">{isReduced ? '50' : '0'}</span><span className="text-2xl font-normal ml-1">MMT</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Panel */}
          <div className="dashboard-panel lg:col-span-2 tech-border bg-card/60 backdrop-blur-md p-6 lg:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                Non-Fossil Capacity (GW)
              </h2>
              <span className={`w-2 h-2 rounded-full bg-saffron ${isReduced ? '' : 'animate-pulse'}`} />
            </div>
            
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CAPACITY_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,153,51,0.08)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.5)" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.5)" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'monospace' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#030712', borderColor: 'rgba(255,255,255,0.1)', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {CAPACITY_DATA.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={index === 0 ? 'hsl(var(--muted-foreground))' : 'hsl(var(--saffron))'} 
                        style={index === 1 ? { filter: 'drop-shadow(0 0 8px rgba(255,153,51,0.5))' } : {}}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Rings Panel */}
          <div className="dashboard-panel rings-container tech-border bg-card/60 backdrop-blur-md p-6 lg:p-8 flex flex-col items-center justify-center">
            <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground mb-8 w-full border-b border-white/10 pb-4 text-center">
              Mission Vectors
            </h2>
            <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
              <AshokaChakra className="w-16 h-16 text-white/20 absolute z-0" />
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle className="progress-ring-circle" cx="50" cy="50" r="46" fill="none" stroke="#FF9933" strokeWidth="4" strokeLinecap="round" data-progress="42" />
                
                <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle className="progress-ring-circle" cx="50" cy="50" r="36" fill="none" stroke="#138808" strokeWidth="4" strokeLinecap="round" data-progress="15" />
                
                <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                <circle className="progress-ring-circle" cx="50" cy="50" r="26" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" data-progress="25" />
              </svg>
            </div>
            <div className="mt-8 flex w-full justify-between font-mono text-[10px] text-muted-foreground uppercase">
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-saffron rounded-full"/> Solar</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-india-green rounded-full"/> H2</div>
              <div className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full"/> EV</div>
            </div>
          </div>

          {/* Table Panel */}
          <div className="dashboard-panel lg:col-span-3 tech-border bg-card/60 backdrop-blur-md p-6 lg:p-8 flex flex-col table-container">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                Green Hydrogen 2030 Deliverables
              </h2>
              <span className={`w-2 h-2 rounded-full bg-india-green ${isReduced ? '' : 'animate-pulse'}`} />
            </div>
            
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left font-mono text-sm whitespace-nowrap">
                <thead>
                  <tr className="border-b border-white/20 text-muted-foreground">
                    <th className="pb-4 font-normal uppercase pl-4">Metric</th>
                    <th className="pb-4 font-normal uppercase">Target</th>
                    <th className="pb-4 font-normal uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {HYDROGEN_DELIVERABLES.map((row, i) => (
                    <tr key={i} className={`deliverable-row border-b border-white/5 hover:bg-white/10 transition-colors ${i % 2 === 0 ? 'bg-saffron/5' : 'bg-india-green/5'}`}>
                      <td className="py-4 pl-4 pr-4 text-white">{row.metric}</td>
                      <td className="py-4 pr-4 text-saffron font-bold">{row.target}</td>
                      <td className="py-4 text-india-green">[{row.status}]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
          </div>
          
        </div>

      </div>
    </main>
  );
}