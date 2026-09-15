import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, Heart, MessageCircle, Play, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const reelCards = [
  {
    label: 'HOOK',
    title: 'STOP THE SCROLL',
    copy: 'Open strong. Earn attention fast.',
    background: 'linear-gradient(155deg, #ff5a5f 0%, #ff3d8d 48%, #26122f 100%)',
    rotate: -2.4,
  },
  {
    label: 'STORY',
    title: 'MAKE IT FEEL REAL',
    copy: 'Human-first storytelling that feels native.',
    background: 'linear-gradient(155deg, #8b5cf6 0%, #ff3d8d 52%, #121426 100%)',
    rotate: 1.6,
  },
  {
    label: 'PRODUCT',
    title: 'MAKE THEM LOOK TWICE',
    copy: 'Cinematic product moments built for mobile.',
    background: 'linear-gradient(155deg, #ff7a59 0%, #ff3d8d 42%, #17111e 100%)',
    rotate: -1,
  },
  {
    label: 'COLLAB',
    title: 'PUT A FACE TO IT',
    copy: 'Influencer-led content with personality.',
    background: 'linear-gradient(155deg, #7c3aed 0%, #ec4899 48%, #0d1020 100%)',
    rotate: 2.2,
  },
  {
    label: 'GROWTH',
    title: 'TURN VIEWS INTO ACTION',
    copy: 'Creative designed around clear next steps.',
    background: 'linear-gradient(155deg, #ff3d8d 0%, #7c3aed 48%, #111827 100%)',
    rotate: -1.7,
  },
];

function ReelCard({
  label,
  title,
  copy,
  background,
  rotate,
  index,
}: (typeof reelCards)[number] & { index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 80, rotate: reduceMotion ? 0 : rotate * 1.8 }}
      whileInView={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : rotate }}
      whileHover={reduceMotion ? undefined : { y: -12, rotate: 0, scale: 1.025 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.75,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative min-w-[220px] sm:min-w-[250px] lg:min-w-[280px] aspect-[9/16] overflow-hidden rounded-[30px] border border-white/10 bg-[#10131D] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      style={{ transformOrigin: '50% 80%' }}
    >
      <div className="absolute inset-0" style={{ background }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.26),transparent_28%),linear-gradient(to_top,rgba(7,9,15,0.9),rgba(7,9,15,0.08)_55%)]" />
      <div className="absolute inset-0 opacity-40 mix-blend-overlay reel-card-grid" />

      <motion.div
        aria-hidden="true"
        className="absolute -right-12 top-14 h-40 w-40 rounded-full border border-white/20"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], rotate: [0, 14, 0] }}
        transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute -left-14 top-32 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        animate={reduceMotion ? undefined : { x: [0, 16, 0], y: [0, -10, 0] }}
        transition={{ duration: 5.5 + index * 0.4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/90 backdrop-blur-md">
          {label}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/15 backdrop-blur-md">
          <Play size={15} className="ml-0.5 text-white" fill="currentColor" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.24em] text-white/55">REEL2REACH / 0{index + 1}</p>
        <h3 className="max-w-[12ch] font-[family-name:var(--font-display)] text-2xl font-bold leading-[0.98] text-white sm:text-3xl">
          {title}
        </h3>
        <p className="mt-3 max-w-[24ch] text-xs leading-relaxed text-white/65">{copy}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 text-white/55">
            <Heart size={15} />
            <MessageCircle size={15} />
            <Share2 size={15} />
          </div>
          <motion.div
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10"
            whileHover={reduceMotion ? undefined : { rotate: 45, scale: 1.08 }}
          >
            <ArrowUpRight size={15} />
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-inset ring-white/10 transition duration-500 group-hover:ring-white/25" />
      <div className="pointer-events-none absolute -inset-x-1 top-[-35%] h-24 rotate-12 bg-gradient-to-b from-transparent via-white/20 to-transparent opacity-0 blur-xl transition duration-700 group-hover:top-[110%] group-hover:opacity-100" />
    </motion.article>
  );
}

export function ReelShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-15%']);
  const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ['20%', '52%', '78%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-y border-white/[0.04] py-24 lg:py-36">
      <motion.div
        aria-hidden="true"
        className="absolute inset-y-0 h-full w-[45vw] rounded-full bg-[#FF3D8D]/10 blur-[130px]"
        style={reduceMotion ? undefined : { left: glowX }}
      />
      <div className="absolute inset-0 cinematic-grid opacity-[0.15]" />

      <div className="relative mx-auto mb-14 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 text-xs font-semibold tracking-[0.28em] text-[#FF6AA7]"
            >
              BUILT FOR THE FEED
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.95] sm:text-6xl lg:text-7xl"
              >
                STOP SCROLLING.
                <br />
                <span className="gradient-text gradient-text-live">START WATCHING.</span>
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md text-sm leading-relaxed text-[#A9ACB8] sm:text-base"
          >
            A social-first visual system made to feel native on mobile, premium on desktop, and impossible to ignore in the first few seconds.
          </motion.p>
        </div>
      </div>

      <motion.div
        className="relative flex w-max gap-5 px-4 pb-6 sm:gap-6 sm:px-8 lg:px-[8vw]"
        style={reduceMotion ? undefined : { x }}
      >
        {reelCards.map((card, index) => (
          <ReelCard key={card.title} {...card} index={index} />
        ))}
      </motion.div>

      <div className="relative mx-auto mt-8 flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
        <Link
          to="/portfolio"
          className="group inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.07]"
        >
          Explore our work
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

export function CinematicStorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const createOpacity = useTransform(scrollYProgress, [0, 0.08, 0.26, 0.36], [0.2, 1, 1, 0.08]);
  const createY = useTransform(scrollYProgress, [0, 0.18, 0.36], [90, 0, -80]);
  const createScale = useTransform(scrollYProgress, [0, 0.2, 0.36], [0.86, 1, 1.08]);

  const influenceOpacity = useTransform(scrollYProgress, [0.28, 0.42, 0.58, 0.68], [0.08, 1, 1, 0.08]);
  const influenceX = useTransform(scrollYProgress, [0.28, 0.48, 0.68], [-120, 0, 110]);
  const influenceScale = useTransform(scrollYProgress, [0.28, 0.48, 0.68], [0.88, 1, 1.05]);

  const growOpacity = useTransform(scrollYProgress, [0.6, 0.74, 0.94, 1], [0.08, 1, 1, 0.72]);
  const growY = useTransform(scrollYProgress, [0.6, 0.8, 1], [110, 0, -18]);
  const growScale = useTransform(scrollYProgress, [0.6, 0.82, 1], [0.8, 1, 1.12]);

  return (
    <section ref={sectionRef} className="relative h-[220vh] border-y border-white/[0.04] bg-[#07090F]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute h-[48vw] w-[48vw] min-h-[420px] min-w-[420px] rounded-full bg-[#FF3D8D]/10 blur-[150px]"
          animate={reduceMotion ? undefined : { scale: [0.9, 1.08, 0.9], rotate: [0, 18, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 cinematic-grid opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(7,9,15,0.1)_45%,#07090F_82%)]" />

        <div className="relative z-10 w-full px-4 text-center sm:px-6">
          <p className="absolute left-1/2 top-[-18vh] -translate-x-1/2 text-[10px] font-semibold tracking-[0.32em] text-white/35 sm:text-xs">
            THE REEL2REACH METHOD
          </p>

          <motion.div
            style={reduceMotion ? undefined : { opacity: createOpacity, y: createY, scale: createScale }}
            className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#FF6A7B]">01 / IDEA TO FRAME</p>
            <h2 className="font-[family-name:var(--font-display)] text-[18vw] font-bold leading-[0.78] tracking-[-0.06em] text-white sm:text-[14vw] lg:text-[11vw]">
              CREATE.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
              Strong hooks, clean direction and content designed around how people actually consume social media.
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: influenceOpacity, x: influenceX, scale: influenceScale }}
            className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#C080FF]">02 / PEOPLE TO PEOPLE</p>
            <h2 className="font-[family-name:var(--font-display)] text-[15vw] font-bold leading-[0.8] tracking-[-0.06em] sm:text-[12vw] lg:text-[9vw]">
              <span className="gradient-text gradient-text-live">INFLUENCE.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
              Authentic creator-led communication that gives products a voice, a face and a reason to be remembered.
            </p>
          </motion.div>

          <motion.div
            style={reduceMotion ? undefined : { opacity: growOpacity, y: growY, scale: growScale }}
            className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2"
          >
            <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-[#FF6AA7]">03 / ATTENTION TO ACTION</p>
            <h2 className="font-[family-name:var(--font-display)] text-[20vw] font-bold leading-[0.78] tracking-[-0.06em] text-white sm:text-[16vw] lg:text-[12vw]">
              GROW.
            </h2>
            <p className="mx-auto mt-7 max-w-lg text-sm leading-relaxed text-white/55 sm:text-base">
              Content, consistency and clear calls-to-action working together to keep your brand moving forward.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-3 text-[10px] font-semibold tracking-[0.24em] text-white/30">
          <span>SCROLL</span>
          <span className="h-px w-12 bg-gradient-to-r from-white/10 to-white/45" />
        </div>
      </div>
    </section>
  );
}
