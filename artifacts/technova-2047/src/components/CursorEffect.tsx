import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { AshokaChakra } from '@/components/Motifs';

export function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (!isDesktop || isReduced) return;

    document.body.style.cursor = 'none';

    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.1, ease: "power3" });

    let lastTime = 0;
    let lastX = 0;
    let lastY = 0;
    let rotation = 0;
    let dotCount = 0;

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const speed = Math.sqrt(dx * dx + dy * dy) / dt;
        rotation += speed * 2;
        gsap.to(cursorRef.current, { rotation, duration: 0.1, ease: "none", transformOrigin: "center" });
      }
      lastTime = now;
      lastX = e.clientX;
      lastY = e.clientY;

      if (Math.random() > 0.5 && dotCount < 20) {
        dotCount++;
        const dot = document.createElement('div');
        const colors = ['#FF9933', '#FFFFFF', '#138808'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        dot.style.cssText = `position:fixed;top:0;left:0;width:6px;height:6px;border-radius:50%;background-color:${color};pointer-events:none;z-index:9998;transform:translate(${e.clientX}px, ${e.clientY}px);`;
        document.body.appendChild(dot);
        gsap.to(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          onComplete: () => {
            dot.remove();
            dotCount--;
          }
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-5 h-5 -ml-[10px] -mt-[10px] pointer-events-none z-[9999] hidden md:flex items-center justify-center text-saffron"
    >
      <AshokaChakra animated={false} />
    </div>
  );
}