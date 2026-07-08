import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Activity,
  Zap,
  Wind,
  ShieldCheck,
  Cpu,
  Database,
  Radio,
  Globe,
  BarChart2,
  TerminalSquare,
  Crosshair,
  Satellite
} from "lucide-react";

gsap.registerPlugin(useGSAP);

const BOOT_LOGS = [
  "INITIATING TECHNOVA_2047 KERNEL v9.4.2...",
  "ESTABLISHING SECURE SATELLITE UPLINK [SOK-9]...",
  "SYNCING NATIONAL POWER GRID TELEMETRY...",
  "RENEWABLE ENERGY SENSORS: ONLINE",
  "EMISSION TRACKING MODULES: CALIBRATED",
  "AI FORECASTING ENGINE: ARMED",
  "AUTHENTICATING DIRECTIVE: VIKSIT_BHARAT_2047",
  "SYSTEM ALIGNMENT NOMINAL.",
  "ACCESS GRANTED. INITIALIZING DASHBOARD."
];

export function CommandCenter() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Setup initial states
      gsap.set(".boot-log", { opacity: 0, x: -20 });
      gsap.set(".hud-panel", { opacity: 0, scale: 0.95, y: 20 });
      gsap.set(".hud-glitch", { opacity: 0, filter: "blur(10px)" });

      // Boot sequence
      tl.to(".boot-log", {
        opacity: 1,
        x: 0,
        duration: 0.12,
        stagger: 0.12,
        ease: "power2.out",
      });

      // Cursor blink
      tl.to(".boot-cursor", {
        opacity: 0,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
      });

      // Hide boot screen with a dramatic zoom and fade
      tl.to(".boot-screen", {
        opacity: 0,
        scale: 1.05,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(".boot-screen", { display: "none" });
        },
      });

      // Reveal HUD elements
      tl.to(
        ".hud-glitch",
        { opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
        "-=0.1"
      );

      tl.to(
        ".hud-panel",
        { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" },
        "-=0.6"
      );

      // Number Tickers
      const tickers = gsap.utils.toArray<HTMLElement>(".ticker-value");
      tickers.forEach((ticker) => {
        const target = parseFloat(ticker.getAttribute("data-target") || "0");
        const isDecimal = target % 1 !== 0;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
          ease: "power3.out",
          delay: 0.5,
          onUpdate: () => {
            ticker.innerText = isDecimal
              ? obj.val.toFixed(1)
              : Math.floor(obj.val).toLocaleString();
          },
        });
      });

      // Scanline continuous animation
      gsap.fromTo(
        ".scanline",
        { top: "-10%" },
        {
          top: "110%",
          duration: 3,
          repeat: -1,
          ease: "none",
        }
      );

      // Radar continuous
      gsap.to(".radar-sweep", {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "0% 50%",
      });

      // Blinking dots
      gsap.to(".pulse-dot", {
        opacity: 0.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
      
      // Data bars simulation
      const bars = gsap.utils.toArray<HTMLElement>(".data-bar");
      bars.forEach((bar) => {
        gsap.to(bar, {
          height: () => `${Math.random() * 80 + 20}%`,
          duration: () => Math.random() * 1.5 + 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
      
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100dvh] w-full bg-[#030712] text-cyan-500 overflow-x-hidden overflow-y-auto font-mono selection:bg-cyan-900 selection:text-cyan-100 flex flex-col items-center"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 0%, rgba(22, 78, 99, 0.15) 0%, rgba(3, 7, 18, 1) 70%)"
      }}
    >
      {/* SCANLINE & GRAIN OVERLAY */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden mix-blend-overlay">
        {/* Fine grain noise */}
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
        {/* Horizontal scanlines pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30"></div>
        {/* Moving thick scanline */}
        <div className="w-full h-24 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent absolute top-0 left-0 scanline blur-sm mix-blend-screen"></div>
      </div>

      {/* BOOT SCREEN */}
      <div className="boot-screen fixed inset-0 z-40 bg-[#030712] flex flex-col justify-center items-start p-8 md:p-24 border-[1px] border-cyan-900/30">
        <div className="flex items-center gap-3 mb-12 text-cyan-600">
          <TerminalSquare className="w-8 h-8" />
          <span className="text-xl tracking-widest font-bold">SYS.TERM // COMMAND_OVERRIDE</span>
        </div>
        <div className="space-y-3 max-w-4xl">
          {BOOT_LOGS.map((log, i) => (
            <div key={i} className="boot-log flex items-start gap-4 text-xs md:text-base font-medium">
              <span className="text-cyan-800 shrink-0">[{String(i + 1).padStart(2, "0")}]</span>
              <span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">{log}</span>
            </div>
          ))}
          <div className="boot-log flex items-start gap-4 text-xs md:text-base mt-6">
            <span className="text-cyan-800 shrink-0">{">"}</span>
            <span className="boot-cursor w-2.5 h-4 md:h-5 bg-cyan-400 block shadow-[0_0_10px_rgba(34,211,238,0.8)] mt-0.5"></span>
          </div>
        </div>
      </div>

      {/* MAIN HUD CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col p-4 md:p-8 lg:p-12 max-w-[1600px] w-full pt-16 pb-20">
        
        {/* Header Panel */}
        <header className="hud-panel flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 border-b border-cyan-900/40 pb-8 relative before:absolute before:bottom-[-1px] before:left-0 before:w-48 before:h-[2px] before:bg-cyan-400 after:absolute after:bottom-[-1px] after:right-0 after:w-16 after:h-[1px] after:bg-cyan-600">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-4 text-cyan-600 text-xs md:text-sm tracking-[0.2em] uppercase font-bold">
              <ShieldCheck className="w-5 h-5 text-cyan-500" />
              <span>Priority Directive Active</span>
              <span className="px-2 py-0.5 bg-cyan-950 border border-cyan-800 text-cyan-400 rounded-sm shadow-[0_0_10px_rgba(8,145,178,0.2)]">CONFIDENTIAL</span>
            </div>
            
            <div className="hud-glitch relative">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.15)] uppercase">
                TECHNOVA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200 drop-shadow-[0_0_25px_rgba(34,211,238,0.6)]">2047</span>
              </h1>
              <div className="absolute top-0 left-full ml-4 hidden md:flex flex-col gap-1">
                 <span className="text-[10px] text-cyan-700 tracking-widest border border-cyan-900/50 px-1">v9.4.2</span>
                 <span className="text-[10px] text-cyan-700 tracking-widest border border-cyan-900/50 px-1">STABLE</span>
              </div>
            </div>

            <p className="text-lg md:text-2xl text-cyan-100/60 max-w-3xl font-light leading-relaxed border-l-2 border-cyan-800/50 pl-6">
              Green Technology Infrastructure command interface. Powering India's journey to Viksit Bharat 2047 through decentralized, renewable, and intelligent network systems.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3 text-left lg:text-right w-full lg:w-auto mt-8 lg:mt-0 bg-cyan-950/20 p-4 border border-cyan-900/30">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_rgba(239,68,68,0.9)]"></div>
              <span className="text-xs tracking-[0.3em] text-red-400 font-bold">LIVE TELEMETRY</span>
            </div>
            <div className="text-sm text-cyan-600 tracking-[0.1em] font-medium">
              SYS.UPTIME: <span className="text-cyan-400">{new Date().toISOString().split('T')[0]}</span>
            </div>
            <div className="text-sm text-cyan-600 tracking-[0.1em] font-medium">
              NETWORK: <span className="text-cyan-400">SECURE</span>
            </div>
            <div className="flex gap-1.5 mt-2 w-full lg:w-auto">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`flex-1 lg:flex-none lg:w-6 h-1.5 ${i < 5 ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" : "bg-cyan-950"}`}></div>
              ))}
            </div>
          </div>
        </header>

        {/* Telemetry Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 flex-1">
          
          {/* Panel 1: Renewable Capacity */}
          <div className="hud-panel bg-[#030a14]/60 border border-cyan-800/40 p-8 relative flex flex-col justify-between group hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all duration-500">
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/70"></div>
            
            <div className="flex items-start justify-between mb-12 relative z-10">
              <div className="flex items-center gap-3 text-cyan-400">
                <Zap className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-cyan-300">Renewable Capacity</h3>
              </div>
              <Activity className="w-5 h-5 text-cyan-700" />
            </div>

            <div className="relative z-10">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter ticker-value drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" data-target="850">0</span>
                <span className="text-2xl text-cyan-500 font-bold mb-2">GW</span>
              </div>
              
              {/* Progress bar visual */}
              <div className="mt-6 w-full h-1.5 bg-cyan-950/80 overflow-hidden relative rounded-full">
                <div className="absolute top-0 left-0 h-full bg-cyan-400 w-[85%] shadow-[0_0_12px_rgba(34,211,238,1)]"></div>
                {/* Tick marks */}
                <div className="absolute inset-0 flex justify-between px-1">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="w-[1px] h-full bg-[#030712]"></div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between mt-4 text-[10px] md:text-xs text-cyan-600 tracking-[0.1em] font-medium">
                <span>TARGET: 1000 GW (2030)</span>
                <span className="text-cyan-400 bg-cyan-950/50 px-2 py-0.5 border border-cyan-800/50">85.0% OPTIMAL</span>
              </div>
            </div>
            
            <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-[0.08] transition-opacity pointer-events-none duration-700">
              <Zap className="w-64 h-64 text-cyan-400" />
            </div>
          </div>

          {/* Panel 2: Carbon Offset Matrix */}
          <div className="hud-panel bg-[#030a14]/60 border border-amber-900/30 p-8 relative flex flex-col justify-between group hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-500">
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-500/50 group-hover:border-amber-400 transition-colors"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-500/50 group-hover:border-amber-400 transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-500/50 group-hover:border-amber-400 transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-500/50 group-hover:border-amber-400 transition-colors"></div>

            <div className="flex items-start justify-between mb-12 relative z-10">
              <div className="flex items-center gap-3 text-amber-500">
                <Wind className="w-5 h-5 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
                <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-amber-400">Emission Reduction</h3>
              </div>
              <BarChart2 className="w-5 h-5 text-amber-700/50" />
            </div>

            <div className="relative z-10">
              <div className="flex items-end gap-3 mb-2">
                <span className="text-amber-500 font-bold text-4xl mb-1">-</span>
                <span className="text-6xl md:text-7xl font-bold text-white tracking-tighter ticker-value drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" data-target="47.2">0</span>
                <span className="text-2xl text-amber-500 font-bold mb-2">%</span>
              </div>
              
              {/* Animated Chart Graphic */}
              <div className="mt-6 flex items-end gap-[2px] md:gap-1 h-14 w-full border-b border-amber-900/40 pb-1">
                {[40, 45, 35, 55, 40, 65, 50, 75, 55, 85, 70, 90, 80, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-amber-600/20 group-hover:bg-amber-500/40 transition-colors relative group/bar data-bar" style={{ height: `${h}%` }}>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-amber-950 text-amber-300 text-[10px] px-1.5 py-0.5 opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity whitespace-nowrap border border-amber-800 z-20 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      {(2034 + i)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4 text-[10px] md:text-xs text-amber-600/70 tracking-[0.1em] font-medium uppercase">
                <span>VS 2005 BASELINE</span>
                <span className="text-amber-500 animate-pulse bg-amber-950/30 px-2 py-0.5 border border-amber-900/50">TRENDING NOMINAL</span>
              </div>
            </div>
            
            <div className="absolute -bottom-12 -right-12 opacity-5 group-hover:opacity-[0.08] transition-opacity pointer-events-none duration-700">
              <Wind className="w-64 h-64 text-amber-500" />
            </div>
          </div>

          {/* Panel 3: Sensor Network Status */}
          <div className="hud-panel bg-[#030a14]/60 border border-cyan-800/40 p-8 relative flex flex-col justify-between group hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all duration-500">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-500/70"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/70"></div>

            <div className="flex items-start justify-between mb-8 relative z-10">
              <div className="flex items-center gap-3 text-cyan-400">
                <Globe className="w-5 h-5 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                <h3 className="text-xs md:text-sm tracking-[0.2em] uppercase font-bold text-cyan-300">Active Nodes</h3>
              </div>
              <Radio className="w-5 h-5 text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full">
              <div className="flex-1 w-full text-center md:text-left">
                <div className="flex items-baseline gap-2 justify-center md:justify-start">
                  <span className="text-5xl md:text-6xl font-bold text-white tracking-tighter ticker-value drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" data-target="14028">0</span>
                </div>
                <div className="mt-3 text-[10px] md:text-xs text-cyan-600 tracking-[0.1em] font-medium">
                  SMART GRID SENSORS ONLINE
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-3 text-[10px] text-cyan-600 tracking-[0.15em] uppercase w-full">
                  <div className="border border-cyan-900/40 bg-cyan-950/20 p-2 flex flex-col justify-center">
                    <span className="opacity-70 mb-1">Latency</span> 
                    <span className="text-cyan-400 font-bold">12ms</span>
                  </div>
                  <div className="border border-cyan-900/40 bg-cyan-950/20 p-2 flex flex-col justify-center">
                    <span className="opacity-70 mb-1">Uptime</span> 
                    <span className="text-cyan-400 font-bold">99.9%</span>
                  </div>
                </div>
              </div>

              {/* Radar visualization */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-full border border-cyan-800/60 bg-[#020617] flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(8,145,178,0.15)] group-hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-shadow duration-500">
                {/* Concentric circles */}
                <div className="absolute inset-2 rounded-full border border-cyan-500/20"></div>
                <div className="absolute inset-6 rounded-full border border-cyan-500/30"></div>
                <div className="absolute inset-10 rounded-full border border-cyan-500/40"></div>
                
                {/* Crosshairs */}
                <div className="w-[1px] h-full bg-cyan-500/30 absolute"></div>
                <div className="h-[1px] w-full bg-cyan-500/30 absolute"></div>
                
                {/* Radar sweep line */}
                <div className="radar-sweep absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-cyan-300 to-transparent shadow-[0_0_15px_rgba(34,211,238,1)] -translate-y-1/2 pointer-events-none"></div>
                
                {/* Blinking node dots */}
                <div className="pulse-dot absolute top-[25%] left-[30%] w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_8px_#67e8f9]"></div>
                <div className="pulse-dot absolute top-[65%] left-[55%] w-2 h-2 bg-cyan-300 rounded-full shadow-[0_0_8px_#67e8f9]"></div>
                <div className="pulse-dot absolute top-[45%] left-[75%] w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fcd34d]"></div>
                <div className="pulse-dot absolute top-[80%] left-[35%] w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]"></div>
                
                <Crosshair className="w-5 h-5 text-cyan-500/60 absolute z-10" />
              </div>
            </div>
            
          </div>

        </div>

        {/* Bottom Command Strip */}
        <div className="hud-panel border-y border-cyan-900/60 bg-cyan-950/10 backdrop-blur-md p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 mt-auto relative">
          <div className="absolute left-0 top-0 w-1 h-full bg-cyan-500"></div>
          <div className="absolute right-0 top-0 w-1 h-full bg-cyan-500/30"></div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-8 text-xs md:text-sm text-cyan-700 font-medium tracking-[0.1em]">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-600" />
              <span>AI CORE: <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">OPTIMAL</span></span>
            </div>
            <span className="hidden md:inline text-cyan-900">|</span>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-600" />
              <span>DATA STREAM: <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">ENCRYPTED</span></span>
            </div>
            <span className="hidden md:inline text-cyan-900">|</span>
            <div className="flex items-center gap-2">
              <Satellite className="w-5 h-5 text-cyan-600" />
              <span>SAT LINK: <span className="text-cyan-400 font-bold drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">LOCKED</span></span>
            </div>
          </div>

          <button className="px-8 py-3 bg-cyan-950/40 border border-cyan-500/60 text-cyan-300 tracking-[0.2em] text-xs font-bold uppercase hover:bg-cyan-400 hover:text-[#030712] transition-all duration-300 flex items-center gap-3 group relative overflow-hidden">
            <span className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity blur-md"></span>
            <Activity className="w-4 h-4 group-hover:animate-pulse" />
            <span className="relative z-10">Access Full Dashboard</span>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-500"></div>
          </button>
        </div>

      </div>

    </div>
  );
}

export default CommandCenter;
