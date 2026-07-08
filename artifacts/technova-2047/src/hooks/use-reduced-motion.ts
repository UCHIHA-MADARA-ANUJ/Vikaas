import { useState, useEffect } from 'react';

export function useReducedMotion() {
  // Safe check for window to support SSR if needed, though this is a client-side app
  const [matches, setMatch] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setMatch(e.matches);
    };
    // Modern syntax
    mq.addEventListener('change', handleChange);
    return () => {
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  return matches;
}
