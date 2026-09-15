import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GlobalMotionStage() {
  const reduceMotion = useReducedMotion();
  const [liteMotion, setLiteMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const update = () => setLiteMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  const staticStage = Boolean(reduceMotion) || liteMotion;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#07090F]" />
      <motion.div
        className="absolute -left-[18vw] -top-[12vh] h-[62vw] w-[62vw] min-h-[460px] min-w-[460px] rounded-full bg-[#ff3d8d]/[0.07] blur-[130px] sm:min-h-[560px] sm:min-w-[560px] sm:blur-[150px]"
        animate={staticStage ? undefined : { x: [0, 90, 25, 0], y: [0, 45, 120, 0], scale: [1, 1.08, .94, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[18vw] top-[22vh] h-[58vw] w-[58vw] min-h-[420px] min-w-[420px] rounded-full bg-[#7c3aed]/[0.07] blur-[135px] sm:min-h-[520px] sm:min-w-[520px] sm:blur-[160px]"
        animate={staticStage ? undefined : { x: [0, -80, -20, 0], y: [0, 120, 20, 0], scale: [1.04, .94, 1.08, 1.04] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-26vh] left-[28vw] hidden h-[48vw] w-[48vw] min-h-[460px] min-w-[460px] rounded-full bg-[#ff6a5f]/[0.05] blur-[150px] sm:block"
        animate={staticStage ? undefined : { x: [0, -60, 35, 0], y: [0, -100, -40, 0], scale: [.95, 1.1, 1, .95] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute inset-0 cinematic-grid opacity-[0.08]" />
      <div className="absolute inset-0 global-film-vignette" />
      <motion.div
        className="absolute -left-[20%] top-[18%] h-px w-[140%] bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
        animate={staticStage ? undefined : { y: ['0vh', '72vh', '0vh'], opacity: [.15, .5, .15] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[12%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
        animate={staticStage ? undefined : { x: [0, 22, -8, 0], opacity: [.2, .45, .2, .2] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[18%] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.035] to-transparent"
        animate={staticStage ? undefined : { x: [0, -18, 10, 0], opacity: [.15, .4, .15, .15] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
