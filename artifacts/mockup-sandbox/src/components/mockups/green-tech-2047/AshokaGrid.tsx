import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Leaf, Zap, Globe2, Droplet, ArrowRight, Activity, Cpu } from 'lucide-react';

export const AshokaGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const chakraRef = useRef<SVGSVGElement>(null);
  const glowSaffronRef = useRef<HTMLDivElement>(null);
  const glowGreenRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLoaded(true)
      });

      // Initial state
      gsap.set('.chakra-spoke', { scaleY: 0, transformOrigin: 'center bottom' });
      gsap.set('.chakra-ring', { strokeDasharray: 600, strokeDashoffset: 600 });
      gsap.set('.chakra-center', { scale: 0, transformOrigin: 'center center' });
      gsap.set('.hero-element', { opacity: 0, y: 40 });
      gsap.set('.pillar-card', { opacity: 0, scale: 0.9, y: 30 });
      gsap.set('.bg-grid-line', { scaleX: 0, transformOrigin: 'center left' });
      gsap.set('.bg-grid-line-v', { scaleY: 0, transformOrigin: 'top center' });

      // 1. Assembly
      tl.to('.chakra-center', { scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 0.2)
        .to('.chakra-spoke', {
          scaleY: 1,
          duration: 0.8,
          stagger: 0.03,
          ease: 'power3.out'
        }, 0.4)
        .to('.chakra-ring', {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        }, 0.5);

      // 2. Spin & Lock
      tl.to(chakraRef.current, {
        rotation: 720,
        duration: 2.5,
        ease: 'expo.inOut',
        transformOrigin: 'center center'
      }, 1.2);

      // 3. Tricolour Radiance (during lock)
      tl.to(glowSaffronRef.current, { opacity: 0.6, duration: 1, ease: 'power2.out' }, 2.5)
        .to(glowGreenRef.current, { opacity: 0.6, duration: 1, ease: 'power2.out' }, 2.5)
        .to('.chakra-svg-wrapper', {
          filter: 'drop-shadow(0 0 20px rgba(0, 0, 128, 0.5))',
          duration: 0.5
        }, 2.8);

      // 4. Dissolve & Expand (Monumental scale)
      tl.to(chakraRef.current, {
        scale: 25,
        opacity: 0.08,
        duration: 2,
        ease: 'power4.inOut'
      }, 3.5)
      .to([glowSaffronRef.current, glowGreenRef.current], {
        opacity: 0.15,
        scale: 2,
        duration: 2,
        ease: 'power4.inOut'
      }, 3.5);

      // 5. Grid Assembly (spokes become grid)
      tl.to('.bg-grid-line', {
        scaleX: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut'
      }, 4.2)
      .to('.bg-grid-line-v', {
        scaleY: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power3.inOut'
      }, 4.4);

      // 6. Hero Content Reveal (Radial Stagger)
      tl.to('.hero-element', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out'
      }, 4.8)
      .to('.pillar-card', {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: {
          amount: 0.6,
          from: 'center'
        },
        ease: 'back.out(1.2)'
      }, 5.2);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[100dvh] w-full bg-[#02040A] text-white overflow-hidden font-outfit"
      style={{
        fontFamily: "'Outfit', sans-serif"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        
        .saffron-gradient {
          background: linear-gradient(135deg, rgba(255,153,51,0.2) 0%, transparent 100%);
        }
        
        .green-gradient {
          background: linear-gradient(315deg, rgba(19,136,8,0.2) 0%, transparent 100%);
        }

        .pillar-card:hover .pillar-icon-wrapper {
          transform: scale(1.1);
          background-color: rgba(255,255,255,0.1);
        }
      `}</style>

      {/* Tricolour Glows */}
      <div 
        ref={glowSaffronRef}
        className="absolute top-0 left-0 w-[150vw] h-[150vh] -translate-x-1/4 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.4)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-screen"
      />
      <div 
        ref={glowGreenRef}
        className="absolute bottom-0 right-0 w-[150vw] h-[150vh] translate-x-1/4 translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(19,136,8,0.4)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-screen"
      />

      {/* Grid Lines Overlay */}
      <div ref={gridLinesRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Horizontal Lines */}
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-white/5 bg-grid-line" />
        <div className="absolute top-[50%] left-0 w-full h-[1px] bg-white/10 bg-grid-line" />
        <div className="absolute top-[80%] left-0 w-full h-[1px] bg-white/5 bg-grid-line" />
        
        {/* Vertical Lines */}
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/5 bg-grid-line-v" />
        <div className="absolute top-0 left-[50%] w-[1px] h-full bg-white/10 bg-grid-line-v" />
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-white/5 bg-grid-line-v" />
      </div>

      {/* Chakra Kinetic Engine */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 chakra-svg-wrapper">
        <svg 
          ref={chakraRef}
          viewBox="0 0 200 200" 
          className="w-[300px] h-[300px] text-[#000080]"
          style={{ overflow: 'visible' }}
        >
          {/* Outer Rings */}
          <circle 
            cx="100" cy="100" r="90" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            vectorEffect="non-scaling-stroke"
            className="chakra-ring"
          />
          <circle 
            cx="100" cy="100" r="75" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            vectorEffect="non-scaling-stroke"
            className="chakra-ring opacity-50"
          />
          <circle 
            cx="100" cy="100" r="82" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            vectorEffect="non-scaling-stroke"
            className="chakra-ring opacity-30"
          />
          
          {/* 24 Spokes */}
          <g>
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = i * 15;
              return (
                <g key={i} transform={`rotate(${angle} 100 100)`}>
                  {/* Main Spoke Line */}
                  <line
                    x1="100" y1="100"
                    x2="100" y2="25"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    vectorEffect="non-scaling-stroke"
                    className="chakra-spoke"
                  />
                  {/* Decorative Spoke Base/Cap */}
                  <circle 
                    cx="100" cy="25" r="2" 
                    fill="currentColor"
                    className="chakra-spoke opacity-80"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path 
                    d="M 98 80 L 100 25 L 102 80 Z" 
                    fill="currentColor" 
                    className="chakra-spoke opacity-20"
                  />
                </g>
              );
            })}
          </g>
          
          {/* Center Hub */}
          <circle 
            cx="100" cy="100" r="12" 
            fill="#02040A" 
            stroke="currentColor"
            strokeWidth="4"
            vectorEffect="non-scaling-stroke"
            className="chakra-center"
          />
          <circle 
            cx="100" cy="100" r="4" 
            fill="currentColor" 
            className="chakra-center"
          />
        </svg>
      </div>

      {/* Main Hero Content */}
      <div 
        ref={heroContentRef}
        className="relative z-20 w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-12 py-24 pointer-events-none"
      >
        {/* Header Section */}
        <div className="text-center max-w-5xl mx-auto mt-[-5vh]">
          <div className="hero-element inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/5 mb-8 backdrop-blur-sm pointer-events-auto">
            <Activity className="w-4 h-4 text-[#FF9933]" />
            <span className="text-[#FF9933] text-sm font-medium tracking-widest uppercase font-space">
              Mission 2047 Initiated
            </span>
          </div>
          
          <h1 className="hero-element font-space text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-white mb-6 uppercase mix-blend-difference">
            Green Tech <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 relative inline-block">
              Viksit Bharat
              <div className="absolute -bottom-2 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-50" />
            </span>
          </h1>
          
          <p className="hero-element font-outfit text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12 mix-blend-difference">
            Architecting a sustainable superpower. Deploying next-generation ecological 
            infrastructure to power a billion dreams through clean energy, zero-emission 
            mobility, and precision agri-tech.
          </p>
          
          <button className="hero-element pointer-events-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#02040A] font-semibold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 font-space uppercase tracking-wider">
            <span className="relative z-10 flex items-center gap-2">
              Explore the Grid <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>
        </div>

        {/* Radial Pillars Grid */}
        <div className="w-full max-w-7xl mx-auto mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pointer-events-auto">
          
          {/* Pillar 1: Solar */}
          <div className="pillar-card group relative p-8 border border-white/10 bg-[#02040A]/40 backdrop-blur-md overflow-hidden hover:border-[#FF9933]/50 transition-colors duration-500">
            <div className="absolute inset-0 saffron-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="pillar-icon-wrapper w-12 h-12 rounded-full border border-[#FF9933]/30 flex items-center justify-center mb-6 transition-all duration-500">
                <Zap className="w-5 h-5 text-[#FF9933]" />
              </div>
              <h3 className="font-space text-2xl font-bold text-white mb-3">500GW+</h3>
              <p className="font-space text-[#FF9933] text-sm uppercase tracking-widest mb-4">Renewable Grid</p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-auto font-outfit">
                Massive decentralised solar & wind deployment scaling national capacity beyond fossil dependency.
              </p>
            </div>
            {/* Grid coordinate decoration */}
            <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">SEC-01 // SAFFRON</div>
          </div>

          {/* Pillar 2: Mobility */}
          <div className="pillar-card group relative p-8 border border-white/10 bg-[#02040A]/40 backdrop-blur-md overflow-hidden hover:border-white/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="pillar-icon-wrapper w-12 h-12 rounded-full border border-white/30 flex items-center justify-center mb-6 transition-all duration-500">
                <Globe2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-space text-2xl font-bold text-white mb-3">100% EV</h3>
              <p className="font-space text-white/70 text-sm uppercase tracking-widest mb-4">Sustainable Mobility</p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-auto font-outfit">
                Electrifying public and private transit networks with indigenous battery manufacturing.
              </p>
            </div>
            <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">SEC-02 // WHITE</div>
          </div>

          {/* Pillar 3: Hydrogen */}
          <div className="pillar-card group relative p-8 border border-white/10 bg-[#02040A]/40 backdrop-blur-md overflow-hidden hover:border-[#000080]/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-b from-[#000080]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="pillar-icon-wrapper w-12 h-12 rounded-full border border-[#000080]/50 flex items-center justify-center mb-6 transition-all duration-500">
                <Cpu className="w-5 h-5 text-[#000080] group-hover:text-blue-400 transition-colors" />
              </div>
              <h3 className="font-space text-2xl font-bold text-white mb-3">Green H₂</h3>
              <p className="font-space text-[#000080] group-hover:text-blue-400 transition-colors text-sm uppercase tracking-widest mb-4">Industrial Hub</p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-auto font-outfit">
                Establishing the global epicentre for green hydrogen production and heavy-industry decarbonisation.
              </p>
            </div>
            <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">SEC-03 // NAVY</div>
          </div>

          {/* Pillar 4: Agriculture */}
          <div className="pillar-card group relative p-8 border border-white/10 bg-[#02040A]/40 backdrop-blur-md overflow-hidden hover:border-[#138808]/50 transition-colors duration-500">
            <div className="absolute inset-0 green-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="pillar-icon-wrapper w-12 h-12 rounded-full border border-[#138808]/30 flex items-center justify-center mb-6 transition-all duration-500">
                <Leaf className="w-5 h-5 text-[#138808]" />
              </div>
              <h3 className="font-space text-2xl font-bold text-white mb-3">Eco-Agri</h3>
              <p className="font-space text-[#138808] text-sm uppercase tracking-widest mb-4">Precision Farming</p>
              <p className="text-zinc-400 text-sm leading-relaxed mt-auto font-outfit">
                IoT-driven water conservation and regenerative farming techniques for climate resilience.
              </p>
            </div>
            <div className="absolute top-4 right-4 text-[10px] text-zinc-600 font-mono">SEC-04 // GREEN</div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AshokaGrid;
