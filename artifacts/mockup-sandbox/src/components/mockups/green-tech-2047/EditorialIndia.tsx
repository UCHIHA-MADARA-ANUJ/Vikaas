import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const EditorialIndia = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Progress bar
      tl.to(".loader-progress", { 
        width: "100%", 
        duration: 2.5, 
        ease: "power2.inOut" 
      }, 0);

      // Counter animation
      const counterObj = { val: 1947 };
      tl.to(counterObj, {
        val: 2047,
        duration: 2.5,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText = Math.floor(counterObj.val).toString();
          }
        }
      }, 0);

      // Assemble loader text
      tl.fromTo(".loader-text-line",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" },
        0.5
      );

      // Loader exit - slides up
      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 1.2,
        ease: "expo.inOut",
      }, 2.8);

      // Hero Entrance
      // Header and accents
      tl.fromTo(".hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 1, ease: "power2.out" },
        3.2
      );

      // Massive typography stagger
      tl.fromTo(".hero-word",
        { y: "120%" },
        { y: "0%", stagger: 0.1, duration: 1.2, ease: "power4.out" },
        3.0
      );

      // Data strip container clip-path
      tl.fromTo(".data-strip-container",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power4.inOut" },
        3.4
      );

      // Data strip content
      tl.fromTo(".data-content",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
        3.8
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-[100dvh] bg-[#F4F2EC] text-[#0A111C] overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'Space Mono', monospace; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Global Noise */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04
        }}
      ></div>

      {/* LOADER */}
      <div 
        ref={loaderRef} 
        className="fixed inset-0 z-50 bg-[#0A111C] text-[#F4F2EC] flex flex-col justify-between p-6 md:p-12 font-display"
      >
        <div className="flex justify-between items-start text-xs md:text-sm tracking-widest uppercase opacity-70">
          <div className="loader-text-line">TechNova 2047</div>
          <div className="loader-text-line">Initiating</div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center max-w-5xl mx-auto w-full">
          <div className="overflow-hidden w-full flex justify-center">
            <div className="text-[25vw] md:text-[18rem] font-bold leading-none tracking-tighter tabular-nums" ref={counterRef}>
              1947
            </div>
          </div>
          <div className="w-full h-[1px] bg-[#F4F2EC]/20 mt-8 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-[#EB5E28] loader-progress w-0"></div>
          </div>
          <div className="overflow-hidden mt-6 flex justify-between w-full">
            <div className="loader-text-line text-sm md:text-xl text-[#EB5E28] uppercase tracking-[0.2em] font-medium">
              Green Protocol
            </div>
            <div className="loader-text-line text-sm md:text-xl text-[#0E6E45] uppercase tracking-[0.2em] font-medium text-right">
              Viksit Bharat
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end text-xs md:text-sm tracking-widest uppercase opacity-70">
          <div className="loader-text-line">Target: Net Zero</div>
          <div className="loader-text-line">Loading Grid...</div>
        </div>
      </div>

      {/* HERO */}
      <div ref={heroRef} className="min-h-[100dvh] flex flex-col relative pt-6 md:pt-12">
        {/* Header */}
        <header className="px-6 md:px-12 flex justify-between items-center hero-fade text-xs md:text-sm font-display tracking-widest uppercase border-b border-[#0A111C]/10 pb-6 relative z-10">
          <div className="font-bold flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0E6E45] rounded-full"></div>
            TechNova 2047
          </div>
          <div className="hidden md:flex gap-12 opacity-60 font-medium">
            <span className="hover:text-[#EB5E28] transition-colors cursor-pointer">Vision Document</span>
            <span className="hover:text-[#EB5E28] transition-colors cursor-pointer">Chapter 01</span>
            <span className="hover:text-[#EB5E28] transition-colors cursor-pointer">Explore</span>
          </div>
          <div className="md:hidden font-medium opacity-60">
            Menu
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col justify-center px-6 md:px-12 mt-12 md:mt-20 mb-16 relative z-10">
          {/* Background accent elements */}
          <div className="absolute top-10 right-0 w-[50vw] h-[50vw] max-w-2xl bg-gradient-to-bl from-[#EB5E28]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none hero-fade"></div>
          <div className="absolute bottom-10 left-10 w-[40vw] h-[40vw] max-w-xl bg-gradient-to-tr from-[#0E6E45]/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none hero-fade"></div>

          <div className="max-w-7xl w-full mx-auto">
            <div className="mb-8 flex items-center gap-4 hero-fade">
              <div className="h-[2px] w-12 bg-[#EB5E28]"></div>
              <span className="text-[#EB5E28] font-mono-data text-xs md:text-sm uppercase tracking-[0.2em] font-bold">The Green Ascension</span>
            </div>

            <h1 className="text-[14vw] md:text-[9rem] lg:text-[11rem] font-bold font-display leading-[0.85] tracking-tighter uppercase mb-12">
              <div className="overflow-hidden pb-2 md:pb-6">
                <div className="hero-word translate-y-[120%] inline-block">Powering</div>
              </div>
              <div className="overflow-hidden pb-2 md:pb-6">
                <div className="hero-word translate-y-[120%] inline-block mr-4 md:mr-8">Viksit</div>
                <div className="hero-word translate-y-[120%] inline-block text-[#0E6E45]">Bharat.</div>
              </div>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mt-8 md:mt-16">
              <div className="md:col-span-5 lg:col-span-4 flex flex-col justify-end hero-fade order-2 md:order-1">
                <div className="w-16 h-16 rounded-full border border-[#0A111C]/30 flex items-center justify-center mb-6 relative overflow-hidden group cursor-pointer transition-colors hover:border-[#0A111C]">
                  <div className="absolute inset-0 bg-[#0A111C] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  <svg className="w-6 h-6 text-[#0A111C] group-hover:text-[#F4F2EC] transition-colors relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                <p className="font-mono-data text-xs tracking-widest uppercase opacity-60">Explore the Blueprint</p>
              </div>

              <div className="md:col-span-7 lg:col-span-7 lg:col-start-6 text-lg md:text-2xl lg:text-3xl leading-relaxed font-body font-light text-[#0A111C]/80 hero-fade order-1 md:order-2">
                By 2047, India will not just participate in the global green transition—it will <strong className="font-medium text-[#0A111C]">lead it</strong>. A billion aspirations powered by clean energy, resilient infrastructure, and uncompromising innovation. The blueprint for a sustainable superpower begins here.
              </div>
            </div>
          </div>
        </main>

        {/* Data Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#0A111C]/15 data-strip-container border-t border-[#0A111C]/15 relative z-10">
          {[
            { val: "500", unit: "GW", label: "Non-Fossil Capacity by 2030", color: "text-[#EB5E28]" },
            { val: "Zero", unit: "", label: "Net Emissions Target by 2070", color: "text-[#0E6E45]" },
            { val: "45", unit: "%", label: "Carbon Intensity Reduction", color: "text-[#0A111C]" },
            { val: "100", unit: "%", label: "Green Railways Electrification", color: "text-[#0A111C]" }
          ].map((stat, i) => (
            <div key={i} className="relative bg-[#F4F2EC] overflow-hidden group">
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-[#0A111C]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
              
              <div className="p-8 md:p-10 data-content opacity-0 relative z-10 h-full flex flex-col justify-between">
                <div className={`text-5xl lg:text-6xl font-bold font-mono-data tracking-tighter ${stat.color}`}>
                  {stat.val}<span className="text-2xl lg:text-3xl ml-1 font-normal opacity-80">{stat.unit}</span>
                </div>
                <div className="text-xs font-display font-semibold mt-4 md:mt-6 uppercase tracking-widest text-[#0A111C]/70 leading-relaxed max-w-[200px]">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorialIndia;
