import { useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export function useMouseParallax() {
  const [isEnabled, setIsEnabled] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouchDevice || isCoarsePointer || window.innerWidth < 1024) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set((e.clientX - centerX) / centerX);
      mouseY.set((e.clientY - centerY) / centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return { x, y, isEnabled };
}
