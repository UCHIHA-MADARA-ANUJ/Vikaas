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
    
    q('.stat-counter').forEach(el => {
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

  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <main ref={containerRef} className="relative min-h-[100dvh] pt-32 pb-24 px-6 flex flex-col overflow-hidden">
      <RadarBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-12">
        
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

        <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart Panel */}
          <div className="dashboard-panel tech-border bg-card/60 backdrop-blur-md p-6 lg:p-8 flex flex-col">
            <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
              <h2 className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                Non-Fossil Capacity (GW)
              </h2>
              <span className={`w-2 h-2 rounded-full bg-saffron ${isReduced ? '' : 'animate-pulse'}`} />
            </div>
            
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CAPACITY_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
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
                      <Cell key={`cell-${index}`} fill={index === 0 ? 'hsl(var(--muted-foreground))' : 'hsl(var(--saffron))'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Table Panel */}
          <div className="dashboard-panel tech-border bg-card/60 backdrop-blur-md p-6 lg:p-8 flex flex-col">
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
                    <th className="pb-4 font-normal uppercase">Metric</th>
                    <th className="pb-4 font-normal uppercase">Target</th>
                    <th className="pb-4 font-normal uppercase">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {HYDROGEN_DELIVERABLES.map((row, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-4 pr-4 text-white">{row.metric}</td>
                      <td className="py-4 pr-4 text-saffron font-bold">{row.target}</td>
                      <td className="py-4 text-india-green">[{row.status}]</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 flex gap-4">
              <div className="flex-1 p-4 border border-white/10 bg-black/20">
                <div className="text-xs text-muted-foreground font-mono mb-2 uppercase">EV Market Opportunity</div>
                <div className="text-3xl font-bold font-sans text-white">$<span className="stat-counter" data-target="200">{isReduced ? '200' : '0'}</span>B</div>
              </div>
              <div className="flex-1 p-4 border border-white/10 bg-black/20">
                <div className="text-xs text-muted-foreground font-mono mb-2 uppercase">WTE Capacity 2025</div>
                <div className="text-3xl font-bold font-sans text-white"><span className="stat-counter" data-target="856">{isReduced ? '856' : '0'}</span> MW</div>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </main>
  );
}
