import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SolarDawn = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const textElementsRef = useRef<HTMLDivElement>(null);
  const dataAccentsRef = useRef<HTMLDivElement>(null);
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensure scroll to top on mount
    window.scrollTo(0, 0);

    const tl = gsap.timeline({
      onComplete: () => setIsLoaded(true)
    });

    // Initial states
    gsap.set(heroRef.current, { opacity: 0 });
    gsap.set('.hero-text-line', { y: 60, opacity: 0, rotateX: 15, transformPerspective: 1000 });
    gsap.set('.ambient-data', { opacity: 0, x: 40, scale: 0.95 });
    gsap.set('.glow-orb', { opacity: 0, scale: 0 });
    gsap.set('.particle', { opacity: 0, y: 'random(0, 100)' });

    // 1. Loader Sequence: "Blooming" organic light
    tl.to('.loader-core', {
      scale: 1.8,
      opacity: 1,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    .to('.loader-ring', {
      scale: 2.5,
      opacity: 0.9,
      duration: 2,
      ease: 'power2.out',
      stagger: 0.25
    }, "-=1.0")
    .to('.loader-core', {
      scale: 25, // Bloom out to cover screen
      opacity: 0,
      duration: 1.8,
      ease: 'power4.inOut',
    }, "+=0.3")
    .to('.loader-ring', {
      scale: 35,
      opacity: 0,
      duration: 1.8,
      ease: 'power4.inOut',
    }, "-=1.7")
    .to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      display: 'none'
    }, "-=0.5");

    // 2. Reveal Sequence
    tl.to(heroRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out'
    }, "-=1")
    .to('.glow-orb', {
      opacity: (i) => i === 3 ? 0.3 : 0.6, // Different opacity for different orbs
      scale: 1,
      duration: 2.5,
      ease: 'power3.out',
      stagger: 0.3
    }, "-=0.5")
    .to('.hero-text-line', {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.15
    }, "-=2")
    .to('.ambient-data', {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      stagger: 0.2
    }, "-=1.2")
    .to('.particle', {
      opacity: 'random(0.3, 0.8)',
      duration: 2,
      ease: 'power1.out',
      stagger: 0.05
    }, "-=1.5");

    // 3. Continuous ambient animation (aurora / drifting light)
    const ambientTl = gsap.timeline({ repeat: -1 });
    
    ambientTl.to('.glow-orb-1', {
      y: 'random(-60, 60)',
      x: 'random(-60, 60)',
      scale: 'random(0.8, 1.2)',
      duration: 'random(6, 9)',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1
    }, 0);

    ambientTl.to('.glow-orb-2', {
      y: 'random(-50, 70)',
      x: 'random(-70, 50)',
      scale: 'random(0.9, 1.3)',
      duration: 'random(7, 10)',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1
    }, 0);
    
    ambientTl.to('.glow-orb-3', {
      y: 'random(-70, 50)',
      x: 'random(-50, 70)',
      scale: 'random(0.7, 1.1)',
      duration: 'random(5, 8)',
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 1
    }, 0);

    // Drifting particles
    gsap.utils.toArray('.particle').forEach((particle: any) => {
      gsap.to(particle, {
        y: '-=100',
        x: 'random(-50, 50)',
        rotation: 'random(-90, 90)',
        duration: 'random(10, 20)',
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize(y => parseFloat(y) % window.innerHeight)
        }
      });
    });

    // 4. Scroll-Triggered Parallax Effects
    ScrollTrigger.matchMedia({
      "(min-width: 768px)": function() {
        gsap.to('.glow-orb-1', {
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1 },
          yPercent: 30
        });
        gsap.to('.glow-orb-2', {
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 1.5 },
          yPercent: -20
        });
        gsap.to(dataAccentsRef.current, {
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.5 },
          yPercent: -15
        });
        gsap.to(textElementsRef.current, {
          scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: 0.8 },
          yPercent: -25
        });
      }
    });

    return () => {
      tl.kill();
      ambientTl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[130vh] w-full bg-[#010a05] text-teal-50 overflow-hidden font-sans selection:bg-teal-500/30 selection:text-teal-100"
    >
      {/* --- Loader Overlay --- */}
      <div 
        ref={loaderRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#010a05] pointer-events-none"
      >
        <div className="relative flex items-center justify-center w-64 h-64">
          <div className="loader-ring absolute w-16 h-16 rounded-full border border-teal-400/40 blur-[2px]" />
          <div className="loader-ring absolute w-24 h-24 rounded-full border border-green-400/30 blur-[4px]" />
          <div className="loader-ring absolute w-32 h-32 rounded-full border border-emerald-300/20 blur-[8px]" />
          <div className="loader-core absolute w-8 h-8 bg-gradient-to-tr from-teal-400 to-green-300 rounded-full blur-[10px] opacity-0" />
          <div className="loader-core absolute w-4 h-4 bg-white rounded-full blur-[3px] opacity-0" />
        </div>
      </div>

      {/* --- Hero Content --- */}
      <div ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-32 opacity-0">
        
        {/* Background Ambient Layers */}
        <div ref={backgroundRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Bioluminescent Orbs (Auroral effect) */}
          <div className="glow-orb glow-orb-1 absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] bg-teal-500/20 rounded-full blur-[100px] mix-blend-screen" />
          <div className="glow-orb glow-orb-2 absolute top-[15%] right-[-15%] w-[55vw] h-[55vw] bg-green-500/15 rounded-full blur-[120px] mix-blend-screen" />
          <div className="glow-orb glow-orb-3 absolute bottom-[-5%] left-[25%] w-[60vw] h-[40vw] bg-emerald-700/20 rounded-full blur-[110px] mix-blend-screen" />
          <div className="glow-orb absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[25vw] h-[25vw] bg-[#ffea00]/10 rounded-full blur-[90px] mix-blend-screen" />
          
          {/* Subtle grid pattern mask */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9d06_1px,transparent_1px),linear-gradient(to_bottom,#00ff9d06_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-60" />
          
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="particle absolute w-1 h-1 bg-teal-200 rounded-full blur-[1px]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
              }}
            />
          ))}
        </div>

        {/* Foreground Content */}
        <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center flex-grow">
          
          {/* Main Text */}
          <div ref={textElementsRef} className="col-span-1 lg:col-span-7 xl:col-span-8 flex flex-col justify-center h-full max-w-4xl z-20">
            
            <div className="hero-text-line inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-teal-500/20 bg-teal-950/30 backdrop-blur-md w-fit shadow-[0_0_15px_rgba(20,184,166,0.1)]">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.6)]" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-300">Projected Vision 2047</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-teal-50 to-teal-800">
              <div className="hero-text-line block pb-2">The Dawn of</div>
              <div className="hero-text-line block pb-2">Viksit Bharat.</div>
            </h1>

            <div className="hero-text-line mt-10 w-20 h-[2px] bg-gradient-to-r from-teal-400 via-green-400 to-transparent" />

            <p className="hero-text-line mt-10 text-xl md:text-3xl font-light text-teal-100/70 leading-relaxed max-w-3xl">
              Where nature and innovation converge. A nation powered by regenerative technology, luminous infrastructure, and an unbroken commitment to a living planet.
            </p>

            <div className="hero-text-line mt-16 flex flex-wrap items-center gap-6">
              <button className="group relative px-8 py-4 rounded-full bg-teal-950/40 backdrop-blur-md border border-teal-500/40 text-teal-100 font-medium tracking-wide overflow-hidden transition-all hover:bg-teal-900/60 hover:text-white hover:border-teal-300 shadow-[0_0_20px_rgba(20,184,166,0.1)] hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-teal-400/0 via-teal-400/10 to-teal-400/0 translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]" />
                Explore the Vision
              </button>
              <button className="px-8 py-4 rounded-full text-teal-400/80 font-medium tracking-wide transition-all hover:text-teal-200">
                Read the Manifesto
              </button>
            </div>
          </div>

          {/* Ambient Data Accents */}
          <div ref={dataAccentsRef} className="col-span-1 lg:col-span-5 xl:col-span-4 relative h-full flex flex-col justify-center gap-12 lg:gap-16 lg:pl-8 z-10 mt-12 lg:mt-0">
            
            <div className="ambient-data relative group">
              <div className="absolute -inset-6 bg-teal-900/0 rounded-3xl blur-2xl transition-all duration-500 group-hover:bg-teal-600/10" />
              <div className="relative border-l border-teal-500/20 pl-6">
                <div className="text-teal-400/60 text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-teal-500/50 rounded-full" />
                  Energy Grid Capacity
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-light tracking-tighter text-teal-50 drop-shadow-[0_0_15px_rgba(20,184,166,0.3)]">100</span>
                  <span className="text-teal-400/60 font-mono text-xl">%</span>
                </div>
                <div className="mt-4 h-[1px] w-full bg-teal-950/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-teal-500 to-green-400 w-full rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                </div>
                <div className="text-teal-100/50 text-sm mt-4 font-light leading-relaxed">Fully renewable, decentralized power nodes across all 28 states.</div>
              </div>
            </div>

            <div className="ambient-data relative group">
              <div className="absolute -inset-6 bg-green-900/0 rounded-3xl blur-2xl transition-all duration-500 group-hover:bg-green-600/10" />
              <div className="relative border-l border-green-500/20 pl-6">
                <div className="text-emerald-400/60 text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500/50 rounded-full" />
                  Urban Canopy Index
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-light tracking-tighter text-emerald-50 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">72.4</span>
                  <span className="text-emerald-400/60 font-mono text-xl">%</span>
                </div>
                <div className="text-emerald-100/50 text-sm mt-4 font-light leading-relaxed">Integration of bioluminescent flora in metropolitan infrastructure.</div>
              </div>
            </div>

            <div className="ambient-data relative group">
              <div className="absolute -inset-6 bg-yellow-900/0 rounded-3xl blur-2xl transition-all duration-500 group-hover:bg-yellow-600/10" />
              <div className="relative border-l border-yellow-500/20 pl-6">
                <div className="text-yellow-400/60 text-xs font-semibold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500/50 rounded-full" />
                  Carbon Drawdown
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl font-light tracking-tighter text-yellow-50 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">-4.2</span>
                  <span className="text-yellow-400/60 font-mono text-xl">GT</span>
                </div>
                <div className="text-yellow-100/50 text-sm mt-4 font-light leading-relaxed">Net-negative emissions achieved via synthetic photosynthesis arrays.</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
