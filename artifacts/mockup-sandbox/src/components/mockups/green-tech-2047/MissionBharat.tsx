import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Activity, Clock, Cpu, ShieldCheck, Zap } from "lucide-react";

const AshokaChakra = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="50" cy="50" r="46" />
    <circle cx="50" cy="50" r="38" strokeDasharray="2 4" strokeWidth="1" opacity={0.5} />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2="50"
        y2="6"
        transform={`rotate(${i * 15} 50 50)`}
      />
    ))}
    <circle cx="50" cy="50" r="6" fill="currentColor" />
  </svg>
);

export const MissionBharat = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [timer, setTimer] = useState(10);
  const [isLaunched, setIsLaunched] = useState(false);

  // For the mission clock in the hero
  const [missionTime, setMissionTime] = useState(0);

  useEffect(() => {
    if (isLaunched) {
      const interval = setInterval(() => {
        setMissionTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isLaunched]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `T+ ${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setIsLaunched(true),
      });

      // 1. Initial setup
      gsap.set(heroRef.current, { opacity: 0, scale: 1.05, display: "none" });
      gsap.set(".plume-bar", { scaleY: 0, transformOrigin: "bottom" });

      // 2. Terminal lines typing effect (fade in stagger)
      tl.to(".terminal-line", {
        opacity: 1,
        x: 0,
        duration: 0.2,
        stagger: 0.4,
        ease: "power2.out",
      });

      // 3. Countdown animation
      const count = { val: 10 };
      tl.to(
        count,
        {
          val: 0,
          duration: 3,
          ease: "linear",
          onUpdate: () => setTimer(Math.ceil(count.val)),
        },
        "<"
      );

      // 4. Warning flash before ignition
      tl.to(
        ".countdown-text",
        {
          color: "#FF9933",
          scale: 1.1,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
        },
        "-=1"
      );

      // 5. IGNITION! Plume sweeps up
      tl.addLabel("ignition");
      tl.to(
        ".plume-bar",
        {
          scaleY: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power4.in",
        },
        "ignition"
      );

      // 6. Shake effect on container
      tl.to(
        containerRef.current,
        {
          y: () => 10 - Math.random() * 20,
          x: () => 10 - Math.random() * 20,
          duration: 0.05,
          repeat: 15,
          yoyo: true,
          ease: "none",
        },
        "ignition+=0.2"
      );

      // 7. Reset container pos
      tl.to(containerRef.current, { x: 0, y: 0, duration: 0.1 });

      // 8. Transition to hero
      tl.set(heroRef.current, { display: "flex" }, "ignition+=0.8");
      tl.to(
        loaderRef.current,
        { opacity: 0, duration: 0.5, ease: "power2.inOut" },
        "ignition+=0.8"
      );
      tl.to(
        heroRef.current,
        { opacity: 1, scale: 1, duration: 1.2, ease: "expo.out" },
        "ignition+=0.8"
      );
      tl.set(loaderRef.current, { display: "none" });

      // 9. Hero reveals
      tl.fromTo(
        ".hero-reveal",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
        "-=0.5"
      );
      tl.fromTo(
        ".hero-data-strip",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#030712] text-white overflow-hidden selection:bg-[#FF9933] selection:text-black font-sans"
    >
      {/* BACKGROUND NOISE & GRID */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] mix-blend-screen"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: "4rem 4rem",
          backgroundPosition: "center center",
        }}
      />

      {/* LOADER PHASE */}
      <div
        ref={loaderRef}
        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
      >
        <div className="w-full max-w-4xl px-8 flex flex-col justify-between h-full py-20 relative z-10">
          <div className="font-mono text-sm md:text-base tracking-widest text-[#138808]">
            <div className="terminal-line opacity-0 -translate-x-4 mb-2">
              &gt; INITIATING GREEN PROTOCOL...
            </div>
            <div className="terminal-line opacity-0 -translate-x-4 mb-2">
              &gt; CALIBRATING RENEWABLE GRIDS...
            </div>
            <div className="terminal-line opacity-0 -translate-x-4 mb-2">
              &gt; ALIGNING VIKSIT BHARAT TRAJECTORY...
            </div>
            <div className="terminal-line opacity-0 -translate-x-4 text-[#FF9933]">
              &gt; IGNITION SEQUENCE START...
            </div>
          </div>

          <div className="flex flex-col items-center justify-center flex-grow">
            <div className="text-[6rem] sm:text-[10rem] md:text-[14rem] font-bold font-mono leading-none tracking-tighter countdown-text">
              T-{timer.toString().padStart(2, "0")}
            </div>
            <div className="flex items-center gap-4 mt-8 opacity-70">
              <AshokaChakra className="w-8 h-8 animate-[spin_4s_linear_infinite]" />
              <span className="font-mono text-xl tracking-widest uppercase">
                TechNova 2047
              </span>
            </div>
          </div>
        </div>

        {/* TRICOLOUR PLUME */}
        <div className="absolute inset-0 z-0 flex">
          <div className="plume-bar w-1/3 h-full bg-[#FF9933] shadow-[0_0_50px_#FF9933]" />
          <div className="plume-bar w-1/3 h-full bg-white shadow-[0_0_50px_#FFFFFF]" />
          <div className="plume-bar w-1/3 h-full bg-[#138808] shadow-[0_0_50px_#138808]" />
        </div>
      </div>

      {/* HERO PHASE */}
      <div
        ref={heroRef}
        className="relative min-h-screen w-full flex-col justify-between z-10 px-6 py-8 md:px-12 md:py-12"
      >
        {/* BIG BACKGROUND CHAKRA */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03] pointer-events-none">
          <AshokaChakra className="w-full h-full animate-[spin_60s_linear_infinite]" />
        </div>

        {/* TOP NAV / STATUS */}
        <header className="hero-reveal flex w-full flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-2 rounded-sm border border-white/20">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold tracking-widest uppercase text-sm md:text-base">
                TechNova 2047
              </h1>
              <p className="font-mono text-xs text-white/50">
                MISSION CONTROL // NEW DELHI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-xs border border-white/10 bg-white/5 px-4 py-2 rounded-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
              <span className="text-white/70">SYSTEMS NOMINAL</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
              <span className="text-white/70">SECURE LINK</span>
            </div>
          </div>
        </header>

        {/* MAIN COPY */}
        <main className="flex-grow flex flex-col justify-center max-w-5xl mt-12 mb-24">
          <div className="hero-reveal font-mono text-[#FF9933] mb-6 flex items-center gap-4 text-sm md:text-base tracking-widest uppercase">
            <div className="h-px w-12 bg-[#FF9933]" />
            Trajectory Engaged
          </div>
          <h2 className="hero-reveal text-5xl sm:text-6xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
            The Green <br />
            <span className="relative">
              Ascent
              {/* Decorative tricolour underline */}
              <div className="absolute -bottom-4 left-0 h-2 w-full flex rounded-full overflow-hidden opacity-80">
                <div className="w-1/3 bg-[#FF9933]" />
                <div className="w-1/3 bg-white" />
                <div className="w-1/3 bg-[#138808]" />
              </div>
            </span>
          </h2>
          <p className="hero-reveal text-lg md:text-2xl text-white/60 max-w-2xl leading-relaxed mt-4">
            A nation-scale vision for sustainable independence. Aligning
            technology, ecology, and destiny to power Viksit Bharat 2047.
          </p>

          <div className="hero-reveal mt-12 flex flex-wrap gap-4">
            <button className="bg-white text-black px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
              Explore Blueprints
              <Zap className="w-4 h-4" />
            </button>
            <button className="border border-white/20 px-8 py-4 font-bold tracking-widest uppercase text-sm hover:bg-white/10 transition-colors">
              Live Telemetry
            </button>
          </div>
        </main>

        {/* BOTTOM DATA STRIP */}
        <footer className="hero-data-strip w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-px bg-white/10 border border-white/10 p-px">
          {/* Box 1 */}
          <div className="bg-[#030712] p-4 flex flex-col justify-between min-h-[100px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                Mission Clock
              </span>
              <Clock className="w-4 h-4 text-[#FF9933]" />
            </div>
            <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter text-[#FF9933]">
              {formatTime(missionTime)}
            </div>
          </div>
          
          {/* Box 2 */}
          <div className="bg-[#030712] p-4 flex flex-col justify-between min-h-[100px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                Target Capacity
              </span>
              <Activity className="w-4 h-4 text-white/50" />
            </div>
            <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter">
              500 <span className="text-sm text-white/50">GW</span>
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-[#030712] p-4 flex flex-col justify-between min-h-[100px]">
            <div className="flex justify-between items-start">
              <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                Energy Mix Target
              </span>
              <Zap className="w-4 h-4 text-white/50" />
            </div>
            <div className="font-mono text-xl md:text-2xl font-bold tracking-tighter">
              65% <span className="text-sm text-white/50">RENEWABLE</span>
            </div>
          </div>

          {/* Box 4 */}
          <div className="bg-[#030712] p-4 flex flex-col justify-between min-h-[100px] relative overflow-hidden">
            <div className="absolute inset-0 bg-[#138808]/10" />
            <div className="flex justify-between items-start relative z-10">
              <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
                Carbon Trajectory
              </span>
              <div className="w-2 h-2 rounded-full bg-[#138808] animate-pulse" />
            </div>
            <div className="font-mono text-sm md:text-base font-bold tracking-widest text-[#138808] uppercase relative z-10">
              Net Zero Protocol<br />Engaged
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
