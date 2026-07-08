import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced || !barRef.current) return;
    
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });
  }, { scope: barRef, dependencies: [isReduced] });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left scale-x-0 bg-gradient-to-r from-saffron via-white to-india-green" ref={barRef} />
  );
}