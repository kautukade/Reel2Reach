import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    
    if (isTouchDevice || isCoarsePointer || window.innerWidth < 1024) {
      setIsVisible(false);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const updateCursorState = () => {
      const target = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (!target) return;
      
      const isClickable = target.closest('a, button, [role="button"], input, textarea, select');
      const isMedia = target.closest('[data-cursor="media"], [data-cursor="play"]');
      
      setIsPointer(!!isClickable);
      setIsHidden(!!isMedia);
    };

    window.addEventListener('mousemove', moveCursor);
    const interval = setInterval(updateCursorState, 100);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      clearInterval(interval);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: isPointer ? 48 : 8,
            height: isPointer ? 48 : 8,
            backgroundColor: isPointer ? 'rgba(255, 61, 141, 0.1)' : '#fff',
            borderWidth: isPointer ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full border-white/30"
        />
      </motion.div>
    </>
  );
}
