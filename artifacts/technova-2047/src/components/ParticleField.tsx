import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ParticleField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const colors = ['bg-saffron', 'bg-white', 'bg-india-green'];

  useGSAP(() => {
    if (isReduced || !containerRef.current) return;

    const particles = containerRef.current.querySelectorAll('.ambient-particle');
    particles.forEach((p) => {
      gsap.to(p, {
        x: `+=${Math.random() * 60 - 30}`,
        y: `+=${Math.random() * 60 - 30}`,
        duration: 4 + Math.random() * 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: containerRef, dependencies: [isReduced] });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={i}
          className={`ambient-particle absolute w-[3px] h-[3px] rounded-full opacity-40 ${colors[i % 3]}`}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 2 + 3}px`,
            height: `${Math.random() * 2 + 3}px`,
          }}
        />
      ))}
    </div>
  );
}