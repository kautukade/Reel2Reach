import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowRight,
  Eye,
  Heart,
  MessageCircle,
  Play,
  Share2,
  Sparkles,
} from 'lucide-react';

const reels = [
  {
    eyebrow: 'HOOK FIRST',
    title: 'STOP\nTHE SCROLL',
    caption: 'Creative content that earns the next second.',
    background: 'linear-gradient(155deg, #ff6a5f 0%, #ff3d8d 48%, #23122d 100%)',
    accent: '#FF6A7B',
  },
  {
    eyebrow: 'STORY NEXT',
    title: 'MAKE IT\nFEEL REAL',
    caption: 'Creator-led stories built for people, not ads.',
    background: 'linear-gradient(155deg, #8b5cf6 0%, #ec4899 48%, #0e1223 100%)',
    accent: '#B586FF',
  },
  {
    eyebrow: 'ACTION LAST',
    title: 'TURN VIEWS\nINTO ACTION',
    caption: 'Clear creative direction. Clear next steps.',
    background: 'linear-gradient(155deg, #ff3d8d 0%, #7c3aed 50%, #111827 100%)',
    accent: '#FF6AA7',
  },
];

const lineTransition = {
  duration: 0.9,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [activeReel, setActiveReel] = useState(0);

  const pointerX = useMotionValue(520);
  const pointerY = useMotionValue(360);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 20 });
  const rotateY = useSpring(rawRotateY, { stiffness: 150, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, 95]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${pointerX}px ${pointerY}px, rgba(255, 61, 141, 0.13), transparent 58%)`;

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveReel((current) => (current + 1) % reels.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType === 'touch') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    pointerX.set(x);
    pointerY.set(y);

    const normalizedX = (x / rect.width - 0.5) * 2;
    const normalizedY = (y / rect.height - 0.5) * 2;
    rawRotateY.set(normalizedX * 4.2);
    rawRotateX.set(normalizedY * -3.5);
  };

  const resetTilt = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.04]"
    >
      <div className="absolute inset-0 bg-[#07090F]" />
      <motion.div
        aria-hidden="true"
        className="absolute -left-[18vw] top-[5vh] h-[52vw] w-[52vw] min-h-[480px] min-w-[480px] rounded-full bg-[#FF3D8D]/10 blur-[130px]"
        animate={reduceMotion ? undefined : { x: [0, 50, 0], y: [0, 28, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -right-[15vw] bottom-[-20vh] h-[55vw] w-[55vw] min-h-[520px] min-w-[520px] rounded-full bg-[#8B5CF6]/10 blur-[150px]"
        animate={reduceMotion ? undefined : { x: [0, -45, 0], y: [0, -32, 0], scale: [1.05, 0.95, 1.05] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 cinematic-grid opacity-[0.18]" />
      <motion.div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ background: spotlight }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,15,0.12)_48%,#07090F_92%)]" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-32">
        <motion.div
          style={reduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
          className="order-2 relative z-10 lg:order-1"
        >
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
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C8CAD2]">
              Reel2Reach Media / Social-First Creative
            </span>
          </motion.div>

          <h1 className="font-[family-name:var(--font-display)] text-[12.5vw] font-bold leading-[0.89] tracking-[-0.055em] text-white sm:text-6xl lg:text-[5.7rem] xl:text-[6.7rem]">
            {['YOUR BRAND.', 'OUR REEL.'].map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.07em]">
                <motion.span
                  className="block"
                  initial={{ y: '115%', rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ ...lineTransition, delay: 0.08 + index * 0.12 }}
                >
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl"
          >
            <p className="text-base font-medium leading-relaxed text-white/78 sm:text-lg">
              Creative Reels <span className="text-[#FF6AA7]">•</span> Influencer Marketing <span className="text-[#B586FF]">•</span> Social Media Growth
            </p>
            <p className="mt-4 max-w-lg text-sm leading-7 text-[#A9ACB8] sm:text-base">
              We turn products, people and ideas into social-first content designed to stop the scroll and make your brand easier to remember.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.72 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/book"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] bg-[length:180%_180%] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_15px_45px_rgba(255,61,141,0.2)] transition-shadow duration-500 hover:shadow-[0_18px_55px_rgba(255,61,141,0.36)] sm:px-7 sm:text-base"
              >
                <span className="relative z-10">BOOK A COLLABORATION</span>
                <ArrowRight size={17} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-[120%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
              </Link>
            </motion.div>

            <motion.div whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/portfolio"
                className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:border-white/30 hover:bg-white/[0.07] sm:px-7 sm:text-base"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <Play size={12} fill="currentColor" />
                </span>
                WATCH OUR WORK
              </Link>
            </motion.div>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.92 }}
            href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%0AI%20would%20like%20to%20discuss%20social%20media%20promotion%2Fcontent%20creation%20for%20my%20business."
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#7BE59D] transition hover:text-[#A2F2BA]"
          >
            Talk on WhatsApp
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        <div className="order-1 relative z-10 flex justify-center lg:order-2 lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.86, y: 45 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <motion.div
              style={reduceMotion ? undefined : { rotateX, rotateY, y: phoneY, scale: phoneScale, transformStyle: 'preserve-3d' }}
              className="relative"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -inset-10 rounded-[4rem] bg-gradient-to-b from-[#FF3D8D]/18 via-[#8B5CF6]/9 to-transparent blur-3xl"
                animate={reduceMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.55, 0.9, 0.55] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="phone-shell relative h-[500px] w-[250px] overflow-hidden rounded-[2.8rem] border border-white/20 bg-[#0B0E16] p-[7px] shadow-[0_40px_110px_rgba(0,0,0,0.6)] sm:h-[590px] sm:w-[294px] lg:h-[620px] lg:w-[310px]">
                <div className="pointer-events-none absolute inset-x-8 top-0 z-40 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80" />
                <div className="absolute left-1/2 top-[8px] z-30 h-[22px] w-[104px] -translate-x-1/2 rounded-b-2xl bg-[#07090F] sm:w-[118px]" />

                <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] bg-[#0d1117]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeReel}
                      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 35, scale: 1.04 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -30, scale: 0.98 }}
                      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                      style={{ background: reels[activeReel].background }}
                    >
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_18%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(to_top,rgba(7,9,15,0.86),rgba(7,9,15,0.05)_60%)]" />
                      <div className="absolute inset-0 reel-card-grid opacity-35 mix-blend-overlay" />

                      <motion.div
                        aria-hidden="true"
                        className="absolute -right-12 top-20 h-48 w-48 rounded-full border border-white/20"
                        animate={reduceMotion ? undefined : { rotate: [0, 22, 0], scale: [0.9, 1.08, 0.9] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <motion.div
                        aria-hidden="true"
                        className="absolute left-8 top-[28%] h-24 w-24 rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-md"
                        animate={reduceMotion ? undefined : { rotate: [-8, 6, -8], y: [0, -12, 0] }}
                        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                      />

                      <div className="absolute left-4 right-4 top-9 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[9px] font-bold backdrop-blur-md">
                            R2
                          </div>
                          <div>
                            <p className="text-[10px] font-semibold text-white">reel2reach</p>
                            <p className="text-[8px] text-white/55">creative studio</p>
                          </div>
                        </div>
                        <div className="rounded-full border border-white/15 bg-black/15 px-2.5 py-1 text-[8px] font-semibold tracking-[0.12em] text-white/70 backdrop-blur-md">
                          FEATURED
                        </div>
                      </div>

                      <div className="absolute inset-x-5 bottom-5">
                        <p className="mb-2 text-[9px] font-semibold tracking-[0.25em]" style={{ color: reels[activeReel].accent }}>
                          {reels[activeReel].eyebrow}
                        </p>
                        <p className="whitespace-pre-line font-[family-name:var(--font-display)] text-[31px] font-bold leading-[0.9] tracking-[-0.04em] text-white sm:text-[36px]">
                          {reels[activeReel].title}
                        </p>
                        <p className="mt-3 max-w-[22ch] text-[10px] leading-relaxed text-white/65 sm:text-[11px]">
                          {reels[activeReel].caption}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-white/12 pt-3">
                          <div className="flex items-center gap-3 text-white/70">
                            <Heart size={14} />
                            <MessageCircle size={14} />
                            <Share2 size={14} />
                          </div>
                          <div className="flex items-center gap-1.5 text-[9px] font-medium text-white/60">
                            <Eye size={12} /> WATCH
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute bottom-3 right-3 z-30 flex flex-col gap-1.5">
                    {reels.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveReel(index)}
                        aria-label={`Show reel concept ${index + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-500 ${index === activeReel ? 'w-6 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <motion.div
                className="absolute -left-12 top-[20%] hidden rounded-2xl border border-white/10 bg-[#0B0E16]/75 p-3 shadow-2xl backdrop-blur-xl sm:block"
                animate={reduceMotion ? undefined : { y: [-7, 7, -7], rotate: [-2, 2, -2] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(65px)' }}
              >
                <Heart size={17} className="text-[#FF5A8E]" fill="currentColor" />
              </motion.div>

              <motion.div
                className="absolute -right-16 top-[37%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#0B0E16]/75 px-3 py-2 text-[10px] font-semibold text-white/75 shadow-2xl backdrop-blur-xl sm:flex"
                animate={reduceMotion ? undefined : { y: [8, -8, 8], x: [0, 5, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(85px)' }}
              >
                <Sparkles size={14} className="text-[#B586FF]" /> TRENDING
              </motion.div>

              <motion.div
                className="absolute -left-16 bottom-[20%] hidden items-center gap-2 rounded-full border border-white/10 bg-[#0B0E16]/75 px-3 py-2 text-[10px] font-semibold text-white/75 shadow-2xl backdrop-blur-xl sm:flex"
                animate={reduceMotion ? undefined : { y: [-5, 8, -5], x: [0, -4, 0] }}
                transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(50px)' }}
              >
                <Play size={13} className="text-[#FF6A7B]" fill="currentColor" /> SOCIAL-FIRST
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] font-semibold tracking-[0.22em] text-white/35 md:flex"
      >
        <ArrowDown size={13} className="animate-bounce" />
        SCROLL TO EXPERIENCE
      </motion.div>
    </section>
  );
}
