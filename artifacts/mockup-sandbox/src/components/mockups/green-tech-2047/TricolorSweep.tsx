import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function TricolorSweep() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Step 1: Terminal boot
      tl.fromTo(".term-line", 
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.15, duration: 0.4, ease: "power2.out" }
      )
      .to(".term-line", {
        opacity: 0,
        x: 20,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.6,
        ease: "power2.in"
      });

      // Step 2: Tricolor sweeps
      // Saffron top third, White middle, Green bottom
      tl.to(".sweep-saffron", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.2")
        .to(".sweep-white", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.5")
        .to(".sweep-green", { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, "-=0.5");
        
      // Step 3: Chakra appears and spins
      tl.fromTo(".chakra-hud", 
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" },
        "-=0.2"
      )
      .to(".chakra-hud", {
        rotation: 180,
        duration: 1.2,
        ease: "power2.inOut"
      });

      // Step 4: Chakra explosion / Wipe to hero
      tl.to(".chakra-core", {
        scale: 300, // Massive scale to cover screen
        duration: 0.8,
        ease: "power4.in"
      }, "-=0.2")
      .to(".loader-overlay", {
        opacity: 0,
        duration: 0.4
      }, "-=0.2")
      
      // Step 5: Hero sequence
      .fromTo(".hero-header",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      )
      .fromTo(".hero-mission",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
        "-=0.4"
      )
      .fromTo(".char", 
        { y: "100%" },
        { y: "0%", stagger: 0.02, duration: 0.8, ease: "power4.out" },
        "-=0.4"
      )
      .fromTo(".hero-desc", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hud-card", 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "back.out(1.2)" },
        "-=0.4"
      );
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const titleText = "VIKSIT BHARAT 2047";
  
  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#02040A] overflow-hidden text-white font-outfit selection:bg-[#FF9933] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-space { font-family: 'Space Mono', monospace; }
      `}</style>
      
      {/* LOADER OVERLAY */}
      <div className="loader-overlay absolute inset-0 z-50 flex flex-col pointer-events-none bg-[#02040A]">
        {/* Terminal Boot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl px-8 z-10 font-space text-sm md:text-lg text-white/70">
          <div className="term-line mb-2 flex items-center gap-4 opacity-0">
            <span className="text-[#FF9933] shrink-0">sys.init()</span>
            <span className="text-white/40 truncate">Booting National Grid...</span>
          </div>
          <div className="term-line mb-2 flex items-center gap-4 opacity-0">
            <span className="text-white shrink-0">auth.verify()</span>
            <span className="text-white/40 truncate">Securing Renewables...</span>
          </div>
          <div className="term-line mb-2 flex items-center gap-4 opacity-0">
            <span className="text-[#138808] shrink-0">net.sync()</span>
            <span className="text-white/40 truncate">Calibrating Emission Targets [2047]...</span>
          </div>
          <div className="term-line flex items-center gap-4 mt-8 font-bold opacity-0">
            <span className="text-[#000080] animate-pulse shrink-0">&gt;&gt;&gt;</span>
            <span className="text-white tracking-widest uppercase">All Systems Online</span>
          </div>
        </div>

        {/* Tricolor Sweeps */}
        <div className="flex-1 w-full bg-[#FF9933] sweep-saffron scale-x-0 origin-left relative z-20" />
        <div className="flex-1 w-full bg-white sweep-white scale-x-0 origin-right relative z-20" />
        <div className="flex-1 w-full bg-[#138808] sweep-green scale-x-0 origin-left relative z-20" />

        {/* Chakra HUD Element overlay - fixed center */}
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="chakra-hud relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center opacity-0 scale-0">
             {/* The white background and blue border */}
             <div className="absolute inset-0 rounded-full border-[6px] border-[#000080] bg-white shadow-[0_0_80px_rgba(0,0,128,0.6)]" />
             
             {/* Spinning inner dashed ring */}
             <div className="absolute inset-2 border-[2px] border-dashed border-[#000080]/50 rounded-full animate-[spin_8s_linear_infinite]" />
             
             {/* Center dot */}
             <div className="absolute inset-8 border-[1px] border-[#000080]/30 rounded-full flex items-center justify-center">
               <div className="w-3 h-3 bg-[#000080] rounded-full" />
             </div>
             
             {/* 24 Spokes of Ashoka Chakra */}
             {[...Array(24)].map((_, i) => (
               <div 
                 key={i} 
                 className="absolute w-[2px] h-[45%] bg-[#000080] origin-bottom bottom-1/2 left-1/2 -translate-x-1/2"
                 style={{ transform: `translateX(-50%) rotate(${i * 15}deg)` }}
               />
             ))}

             {/* The solid center that expands */}
             <div className="chakra-core absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-[#02040A] rounded-full scale-0" />
          </div>
        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-32 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,0,128,0.15),_transparent_50%),_radial-gradient(ellipse_at_bottom_left,_rgba(19,136,8,0.1),_transparent_50%)]">
        
        {/* Background Grid / Texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <header className="hero-header absolute top-0 left-0 w-full py-8 px-6 md:px-16 lg:px-32 flex justify-between items-center border-b border-white/5 opacity-0">
          <div className="font-space font-bold tracking-widest text-sm flex items-center gap-3">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#FF9933]" />
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-[#138808]" />
            </div>
            TECHNOVA 2047
          </div>
          <div className="font-space text-xs text-white/50 hidden md:block">
            LAT: 28.6139° N | LNG: 77.2090° E
          </div>
        </header>

        <main className="max-w-7xl mt-24">
          <div className="hero-mission opacity-0 inline-flex items-center gap-3 px-4 py-2 border border-[#000080]/50 bg-[#000080]/10 rounded-full mb-8 font-space text-xs tracking-widest text-blue-200 backdrop-blur-sm">
            <span className="w-2 h-2 bg-[#FF9933] rounded-full animate-pulse" />
            MISSION: GREEN TECHNOLOGY
          </div>
          
          <h1 className="hero-title text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-black tracking-tighter leading-[0.85] mb-8 uppercase flex flex-wrap gap-x-4 md:gap-x-8">
            {titleText.split(' ').map((word, wIdx) => (
              <div key={wIdx} className="word flex overflow-hidden py-2">
                {word.split('').map((char, cIdx) => (
                  <span key={cIdx} className="char block">
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </h1>
          
          <p className="hero-desc opacity-0 text-lg md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-16">
            Powering India's ascent to a developed nation through radical sustainability. <span className="text-white font-semibold">Net Zero. Massive Renewables. Global Leadership.</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* HUD Widget 1 */}
            <div className="hud-card opacity-0 group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#FF9933] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="font-space text-xs text-[#FF9933] mb-4 tracking-wider">01 // RENEWABLE CAPACITY</div>
              <div className="text-5xl font-black font-space mb-2">500<span className="text-2xl text-white/50 ml-1">GW</span></div>
              <div className="text-sm text-white/40 font-light">Target locked for 2030 grid parity</div>
              {/* Mini chart */}
              <div className="mt-6 h-12 flex items-end gap-1">
                {[40, 55, 45, 70, 65, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-[#FF9933]/20 group-hover:bg-[#FF9933] transition-colors duration-300" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
            </div>

            {/* HUD Widget 2 */}
            <div className="hud-card opacity-0 group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="font-space text-xs text-white mb-4 tracking-wider">02 // EMISSIONS TREND</div>
              <div className="text-5xl font-black font-space mb-2">-45<span className="text-2xl text-white/50 ml-1">%</span></div>
              <div className="text-sm text-white/40 font-light">Intensity reduction from 2005 levels</div>
              {/* Mini chart */}
              <div className="mt-6 h-12 flex items-end gap-1">
                {[100, 90, 85, 75, 60, 50, 45].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/20 group-hover:bg-white transition-colors duration-300" style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }} />
                ))}
              </div>
            </div>

            {/* HUD Widget 3 */}
            <div className="hud-card opacity-0 group relative p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#138808] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              <div className="font-space text-xs text-[#138808] mb-4 tracking-wider">03 // MISSION CLOCK</div>
              <div className="text-5xl font-black font-space mb-2">2047</div>
              <div className="text-sm text-white/40 font-light">T-minus to Viksit Bharat status</div>
              <div className="mt-6 flex items-center justify-between font-space text-xs text-[#138808] border border-[#138808]/30 p-3 rounded bg-[#138808]/5">
                <span className="tracking-widest">STATUS:</span>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#138808] animate-ping" />
                  <span className="font-bold">ON TRACK</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
