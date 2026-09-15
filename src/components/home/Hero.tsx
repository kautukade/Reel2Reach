import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import WebGLArtScene from '../common/WebGLArtScene';

const lineTransition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const };

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0.18]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.04] bg-[#07090F]">
      <motion.div
        aria-hidden="true"
        className="absolute -left-[16vw] top-[6vh] h-[50vw] w-[50vw] min-h-[470px] min-w-[470px] rounded-full bg-[#FF3D8D]/10 blur-[130px]"
        animate={reduceMotion ? undefined : { x: [0, 50, 0], y: [0, 28, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-[14vw] bottom-[-16vh] h-[54vw] w-[54vw] min-h-[520px] min-w-[520px] rounded-full bg-[#8B5CF6]/10 blur-[150px]"
        animate={reduceMotion ? undefined : { x: [0, -45, 0], y: [0, -30, 0], scale: [1.04, 0.95, 1.04] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 cinematic-grid opacity-[0.15]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-32">
        <motion.div style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }} className="order-2 relative z-20 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 backdrop-blur-xl"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3D8D] opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3D8D]" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8CAD2]">Reel2Reach / Creative Motion Studio</span>
          </motion.div>

          <h1 className="font-[family-name:var(--font-display)] text-[12.5vw] font-bold leading-[0.89] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.7rem] xl:text-[6.7rem]">
            {['YOUR BRAND.', 'OUR REEL.'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.07em]">
                <motion.span className="block" initial={{ y: '115%', rotate: 2 }} animate={{ y: 0, rotate: 0 }} transition={{ ...lineTransition, delay: 0.08 + index * 0.12 }}>
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="gradient-text gradient-text-live block"
                initial={{ y: '115%', opacity: 0, filter: 'blur(12px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ ...lineTransition, delay: 0.32 }}
              >
                EVERYONE WILL SEE IT.
              </motion.span>
            </span>
          </h1>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 1, 0.36, 1] }} className="mt-7 max-w-xl">
            <p className="text-base font-medium leading-relaxed text-white/78 sm:text-lg">Creative Reels <span className="text-[#FF6AA7]">•</span> Influencer Marketing <span className="text-[#B586FF]">•</span> Social Media Growth</p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#A9ACB8] sm:text-base">Now the hero is rendered as a live 3D WebGL scene — moving phone, orbit, floating creative panels and reactive camera motion — not just a static mockup.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.72 }} className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/book" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(255,61,141,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(255,61,141,0.36)] sm:px-7 sm:text-base">
              BOOK A COLLABORATION <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.07] sm:px-7 sm:text-base">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10"><Play size={12} fill="currentColor" /></span>
              WATCH OUR WORK
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={reduceMotion ? undefined : { y: sceneY, scale: sceneScale }}
          className="order-1 relative z-10 mx-auto h-[520px] w-full max-w-[590px] lg:order-2 lg:h-[650px]"
        >
          <div className="absolute inset-0 rounded-[44px] border border-white/[0.06] bg-gradient-to-b from-white/[0.02] to-transparent shadow-[0_60px_150px_rgba(0,0,0,.42)]" />
          <WebGLArtScene variant="hero" className="relative z-10 rounded-[44px]" />

          <div className="pointer-events-none absolute left-5 top-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] font-bold tracking-[0.18em] text-white/75 backdrop-blur-xl">
            <Sparkles size={11} className="text-[#FF6AA7]" /> LIVE 3D / WEBGL
          </div>
          <motion.div
            className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-[#07090F]/55 p-4 backdrop-blur-xl"
            animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[#FF6AA7]">MOVE YOUR POINTER</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold">THE CAMERA REACTS IN REAL TIME.</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-semibold tracking-[0.22em] text-white/35 md:flex">
        <ArrowDown size={13} className="animate-bounce" /> SCROLL TO EXPERIENCE
      </motion.div>
    </section>
  );
}
