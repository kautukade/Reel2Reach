import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.25,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] shadow-[0_0_18px_rgba(255,61,141,0.55)]"
      style={{ scaleX }}
    />
  );
}
