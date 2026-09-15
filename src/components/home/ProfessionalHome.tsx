import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Camera, Film, Play, Sparkles, Users, WandSparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import WebGLArtScene from '../common/WebGLArtScene';
import { DemoBadge } from '../common/ArtistExperience';

const services = [
  {
    number: '01',
    title: 'Reels & Visual Films',
    copy: 'Concept, scripting, direction, shooting and edit — shaped for vertical attention instead of generic advertising.',
    icon: Film,
    to: '/services',
  },
  {
    number: '02',
    title: 'Influencer Stories',
    copy: 'Creator-led brand moments that feel native, personal and watchable — not like a forced promotional insert.',
    icon: Users,
    to: '/influencer-marketing',
  },
  {
    number: '03',
    title: 'Social Art Direction',
    copy: 'A visual language for the whole feed: content rhythm, posts, launches, recurring formats and campaign direction.',
    icon: WandSparkles,
    to: '/social-media-management',
  },
];

const concepts = [
  {
    code: '01',
    title: 'AFTER DARK',
    subtitle: 'Fashion launch / demo concept',
    line: 'FLASH. SHADOW. SILHOUETTE.',
    palette: 'linear-gradient(155deg,#ff4f74 0%,#5d173d 42%,#09090d 100%)',
    accent: '#FF6A86',
  },
  {
    code: '02',
    title: 'FIRST BITE',
    subtitle: 'Food story / demo concept',
    line: 'HEAR IT BEFORE YOU TASTE IT.',
    palette: 'linear-gradient(155deg,#ff9a44 0%,#ff4e50 48%,#1f0d0b 100%)',
    accent: '#FFB06C',
  },
  {
    code: '03',
    title: 'TEXTURE',
    subtitle: 'Beauty film / demo concept',
    line: 'LIGHT. LIQUID. SKIN.',
    palette: 'linear-gradient(155deg,#c497ff 0%,#ff83b8 50%,#16101f 100%)',
    accent: '#D9B6FF',
  },
  {
    code: '04',
    title: 'STREET PULSE',
    subtitle: 'Retail launch / demo concept',
    line: 'THE STORE BECOMES THE SET.',
    palette: 'linear-gradient(155deg,#6d5dff 0%,#ff3d8d 48%,#0e1020 100%)',
    accent: '#A79CFF',
  },
];

function ReelPanel({
  title,
  label,
  palette,
  delay,
  className,
}: {
  title: string;
  label: string;
  palette: string;
  delay: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-[30px] border border-white/12 shadow-[0_40px_120px_rgba(0,0,0,.45)] ${className ?? ''}`}
      style={{ background: palette }}
      animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-1.5, 1.2, -1.5] }}
      transition={{ duration: 6.5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <div className="absolute inset-0 cinematic-grid opacity-[0.2]" />
      <motion.div
        className="absolute -right-12 top-16 h-40 w-40 rounded-full border border-white/20"
        animate={reduceMotion ? undefined : { rotate: [0, 30, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8 + delay, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[12%] top-[38%] h-24 w-24 rounded-3xl bg-white/12 blur-xl"
        animate={reduceMotion ? undefined : { x: [0, 18, -6, 0], y: [0, -12, 8, 0], rotate: [0, 8, -4, 0] }}
        transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1 text-[9px] font-bold tracking-[.2em] text-white/85 backdrop-blur-xl">{label}</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/15 backdrop-blur-xl"><Play size={13} fill="currentColor" /></span>
      </div>
      <div className="absolute inset-x-5 bottom-5">
        <div className="mb-3 flex gap-1">
          {[32, 60, 44, 80, 54, 68].map((height, index) => (
            <motion.span
              key={height}
              className="h-1 flex-1 rounded-full bg-white/18"
              animate={reduceMotion ? undefined : { opacity: [.25, .9, .25], scaleX: [.65, 1, .65] }}
              transition={{ duration: 1.8 + index * .12, repeat: Infinity, delay: index * .08 }}
            />
          ))}
        </div>
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold leading-[.92] sm:text-3xl">{title}</p>
      </div>
      <div className="absolute inset-0 reel-scanline" />
    </motion.div>
  );
}

function ShowreelStage() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const stageScale = useTransform(scrollYProgress, [0, .22, .78, 1], [.84, 1, 1, .9]);
  const stageRotate = useTransform(scrollYProgress, [0, .5, 1], [-3, 0, 3]);
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -90]);

  return (
    <section ref={ref} className="relative h-[210vh] border-y border-white/[0.05] bg-[#07090F]/80">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute inset-0 cinematic-grid opacity-[0.1]" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] min-h-[620px] min-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff3d8d]/[0.07] blur-[180px]"
          animate={reduceMotion ? undefined : { scale: [.9, 1.08, .9], opacity: [.45, .8, .45] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div style={reduceMotion ? undefined : { y: titleY }} className="absolute left-0 right-0 top-[9vh] z-10 px-4 text-center sm:px-6">
          <p className="text-[10px] font-bold tracking-[.3em] text-[#FF6AA7]">MOTION STUDY / ALWAYS MOVING</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[11vw] font-bold leading-[.82] tracking-[-.06em] text-white sm:text-[9vw] lg:text-[7vw]">
            A FEED SHOULD<br /><span className="gradient-text gradient-text-live">FEEL ALIVE.</span>
          </h2>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-28 h-[56vh] w-[92vw] max-w-6xl"
          style={reduceMotion ? undefined : { scale: stageScale, rotateZ: stageRotate }}
        >
          <ReelPanel title="THE HOOK" label="00:03 / OPEN STRONG" palette="linear-gradient(155deg,#ff5a5f,#ff3d8d 48%,#23122d)" delay={0} className="left-[2%] top-[10%] h-[72%] w-[29%] rotate-[-7deg]" />
          <ReelPanel title="THE FEELING" label="00:07 / HOLD ATTENTION" palette="linear-gradient(155deg,#8b5cf6,#ff3d8d 52%,#111526)" delay={.7} className="left-[35.5%] top-[2%] z-10 h-[86%] w-[29%]" />
          <ReelPanel title="THE ACTION" label="00:12 / LAND THE CTA" palette="linear-gradient(155deg,#ff8a54,#ff3d8d 46%,#17111d)" delay={1.4} className="right-[2%] top-[12%] h-[72%] w-[29%] rotate-[7deg]" />

          <motion.div
            className="absolute bottom-[3%] left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/12 bg-black/35 px-5 py-2 text-[10px] font-semibold tracking-[.18em] text-white/65 backdrop-blur-xl"
            animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            CONCEPT → DIRECTION → MOTION → MEMORY
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ConceptCard({ item, index }: { item: (typeof concepts)[number]; index: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: .8, delay: index * .06, ease: [0.22, 1, 0.36, 1] }}
      className="group grid overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16]/80 lg:grid-cols-[.95fr_1.05fr]"
    >
      <div className="relative min-h-[430px] overflow-hidden" style={{ background: item.palette }}>
        <div className="absolute inset-0 cinematic-grid opacity-[.18]" />
        <motion.div
          className="absolute -right-16 top-16 h-56 w-56 rounded-full border border-white/20"
          animate={reduceMotion ? undefined : { rotate: [0, 26, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 9 + index, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute left-[14%] top-[36%] h-36 w-36 rounded-[38px] border border-white/15 bg-white/[.08] backdrop-blur-md"
          animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [-8, 6, -8] }}
          transition={{ duration: 6.5 + index * .4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute left-6 top-6"><DemoBadge label="DEMO / SPEC CONCEPT" /></div>
        <div className="absolute inset-x-6 bottom-6">
          <p className="text-[10px] font-bold tracking-[.24em]" style={{ color: item.accent }}>MOTION BOARD / {item.code}</p>
          <p className="mt-3 max-w-[10ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[.88] sm:text-5xl">{item.line}</p>
        </div>
        <div className="absolute inset-0 reel-scanline" />
      </div>

      <div className="flex flex-col justify-between p-7 sm:p-9 lg:p-11">
        <div>
          <p className="text-[10px] font-bold tracking-[.25em] text-white/35">SELECTED DIRECTION / {item.code}</p>
          <h3 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-.035em] sm:text-5xl">{item.title}</h3>
          <p className="mt-3 text-sm text-[#A9ACB8]">{item.subtitle}</p>
          <p className="mt-8 max-w-md text-sm leading-7 text-white/55">
            A presentation concept showing how Reel2Reach can build a distinct world around one product or launch. No fake client result is claimed.
          </p>
        </div>
        <div className="mt-10 flex items-center justify-between border-t border-white/8 pt-6">
          <span className="text-xs font-semibold tracking-[.14em] text-white/55">ART DIRECTION / EDIT / SOCIAL</span>
          <ArrowUpRight className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={20} />
        </div>
      </div>
    </motion.article>
  );
}

export default function ProfessionalHome() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative pb-8">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.05]">
        <div className="absolute inset-0">
          <WebGLArtScene variant="hero" className="h-full w-full opacity-[.92]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#07090F_0%,rgba(7,9,15,.90)_32%,rgba(7,9,15,.42)_62%,rgba(7,9,15,.2)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#07090F_0%,transparent_28%,transparent_75%,rgba(7,9,15,.75)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-16 pt-32 sm:px-6 lg:items-center lg:px-8 lg:pb-10">
          <div className="relative z-10 max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-black/25 px-4 py-2 text-[10px] font-bold tracking-[.24em] text-white/70 backdrop-blur-xl">REEL2REACH / CREATIVE STUDIO</span>
              <span className="text-[10px] font-bold tracking-[.24em] text-[#FF6AA7]">YAVATMAL → EVERY FEED</span>
            </motion.div>

            <div className="space-y-0">
              {['WE MAKE BRANDS', 'HARD TO'].map((line, index) => (
                <div key={line} className="overflow-hidden pb-1">
                  <motion.h1
                    initial={{ y: '115%', rotate: 1.2 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ duration: .95, delay: .05 + index * .1, ease: [0.22, 1, 0.36, 1] }}
                    className="font-[family-name:var(--font-display)] text-[13.5vw] font-bold leading-[.84] tracking-[-.06em] text-white sm:text-7xl lg:text-[7rem] xl:text-[8.4rem]"
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
              <div className="overflow-hidden pb-2">
                <motion.h1
                  initial={{ y: '115%', filter: 'blur(12px)' }}
                  animate={{ y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: .28, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text gradient-text-live font-[family-name:var(--font-display)] text-[13.5vw] font-bold leading-[.84] tracking-[-.06em] sm:text-7xl lg:text-[7rem] xl:text-[8.4rem]"
                >
                  IGNORE.
                </motion.h1>
              </div>
            </div>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .55 }} className="mt-7 max-w-xl text-sm leading-7 text-[#C2C4CB] sm:text-base">
              Reels, creator collaborations and social campaigns with an art-directed point of view — built to feel like culture, not corporate content.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .7 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#07090F] transition hover:-translate-y-0.5">
                WATCH THE WORK <Play size={15} fill="currentColor" />
              </Link>
              <Link to="/book" className="group inline-flex items-center gap-3 rounded-full border border-white/18 bg-black/25 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/[.06]">
                START A PROJECT <ArrowRight size={16} className="transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-8 right-4 hidden w-[320px] lg:block xl:right-8">
            <motion.div
              className="rounded-[26px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl"
              animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-[9px] font-bold tracking-[.24em] text-[#FF6AA7]">LIVE 3D / CONTINUOUS MOTION</p>
              <div className="mt-4 flex h-10 items-end gap-1.5">
                {[34, 72, 52, 90, 44, 78, 58, 84].map((height, index) => (
                  <motion.span key={height + index} className="w-full rounded-full bg-white/22" animate={reduceMotion ? undefined : { height: [`${height * .28}%`, `${height}%`, `${height * .28}%`] }} transition={{ duration: 2 + index * .12, repeat: Infinity, ease: 'easeInOut' }} />
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-white/50">The visual system keeps moving. Real client footage can later replace the demo motion boards without changing the layout.</p>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.05] bg-black/20 py-3 backdrop-blur-md">
          <div className="artist-marquee flex w-max whitespace-nowrap text-[10px] font-bold tracking-[.24em] text-white/35">
            {[...Array(3)].flatMap(() => ['REELS', 'ART DIRECTION', 'INFLUENCE', 'EDIT', 'STORY', 'SOCIAL', 'MOTION']).map((word, index) => (
              <span key={`${word}-${index}`} className="mx-8">{word} <span className="ml-8 text-[#FF3D8D]/60">✦</span></span>
            ))}
          </div>
        </div>
      </section>

      <ShowreelStage />

      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[.3em] text-[#FF6AA7]">CAPABILITIES / NOT A TEMPLATE SHOP</p>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.9] tracking-[-.045em] sm:text-7xl">THREE WAYS<br />WE MOVE A<br /><span className="gradient-text gradient-text-live">BRAND.</span></h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#A9ACB8] sm:text-base">Each service starts from the same question: what should this brand feel like when somebody sees it for the first time?</p>
          </div>

          <div className="mt-14 border-t border-white/8">
            {services.map((service, index) => (
              <motion.div key={service.number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }}>
                <Link to={service.to} className="group grid gap-5 border-b border-white/8 py-8 transition hover:bg-white/[.02] sm:grid-cols-[80px_1fr_1fr_auto] sm:items-center sm:px-4 lg:py-10">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-white/[.08]">{service.number}</span>
                  <div className="flex items-center gap-4">
                    <service.icon size={20} className="text-[#FF6AA7]" />
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">{service.title}</h3>
                  </div>
                  <p className="text-sm leading-6 text-[#A9ACB8]">{service.copy}</p>
                  <ArrowUpRight size={20} className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/60 py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-[.3em] text-[#FF6AA7]">SELECTED DEMO DIRECTIONS</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.9] tracking-[-.045em] sm:text-7xl">OUR WORK,<br /><span className="gradient-text gradient-text-live">BEFORE THE SHOOT.</span></h2>
            </div>
            <div className="max-w-md rounded-2xl border border-amber-300/15 bg-amber-300/[.04] p-4 text-xs leading-6 text-amber-100/65">
              These are clearly labelled demo/spec concepts for presentation. They are not fake client campaigns or fake results.
            </div>
          </div>

          <div className="space-y-6">
            {concepts.map((item, index) => <ConceptCard key={item.title} item={item} index={index} />)}
          </div>

          <div className="mt-10 flex justify-center">
            <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.03] px-6 py-3.5 text-sm font-semibold transition hover:border-white/30 hover:bg-white/[.06]">
              EXPLORE ALL DEMO WORK <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 lg:py-44">
        <motion.div className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] min-h-[600px] min-w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/[.07] blur-[180px]" animate={reduceMotion ? undefined : { scale: [.85, 1.08, .85], rotate: [0, 18, 0] }} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <Camera size={28} className="mx-auto text-[#FF6AA7]" />
          <p className="mt-6 text-[10px] font-bold tracking-[.3em] text-white/35">THE REEL2REACH METHOD</p>
          <h2 className="mt-5 font-[family-name:var(--font-display)] text-[12vw] font-bold leading-[.78] tracking-[-.06em] sm:text-[9vw] lg:text-[7.2vw]">IDEA.<br /><span className="gradient-text gradient-text-live">FRAME.</span><br />FEELING.</h2>
          <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#A9ACB8] sm:text-base">The goal is not to add animation everywhere. The goal is to make the whole website move with the same visual rhythm — the way a good reel has one direction from first frame to last.</p>
          <Link to="/book" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#07090F] transition hover:-translate-y-1">
            BUILD SOMETHING ORIGINAL <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#07090F]/85 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-bold tracking-[.3em] text-[#FF6AA7]">DEMO CASE STUDIES</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.9] sm:text-7xl">IDEA →<br /><span className="gradient-text gradient-text-live">SYSTEM.</span></h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Fashion', 'The 7-Day Drop', 'Launch rhythm, hook language and reel sequence.'],
                ['Beauty', 'Texture Before Claims', 'Macro product story before hard-sell messaging.'],
                ['Food', 'Sound of the First Bite', 'Audio-led edits built around crave moments.'],
              ].map(([category, title, copy], index) => (
                <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-[26px] border border-white/8 bg-white/[.025] p-5">
                  <DemoBadge label="DEMO CASE STUDY" />
                  <p className="mt-6 text-[9px] font-bold tracking-[.2em] text-white/35">{category.toUpperCase()}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-xs leading-6 text-[#A9ACB8]">{copy}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <Link to="/case-studies" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">OPEN CASE STUDIES <ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 lg:py-44">
        <motion.div className="absolute -left-[10%] top-[10%] h-80 w-80 rounded-full bg-[#ff3d8d]/10 blur-[120px]" animate={reduceMotion ? undefined : { x: [0, 120, 0], y: [0, 60, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <h2 className="font-[family-name:var(--font-display)] text-5xl font-bold leading-[.86] tracking-[-.05em] sm:text-7xl lg:text-8xl">READY TO MAKE<br />SOMETHING<br /><span className="gradient-text gradient-text-live">UNMISSABLE?</span></h2>
            <div>
              <p className="text-sm leading-7 text-[#A9ACB8]">Bring the product, space or idea. We’ll build the visual world around it.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/book" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-4 text-sm font-bold shadow-[0_18px_60px_rgba(255,61,141,.2)] transition hover:-translate-y-1">BOOK A COLLAB <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
                <a href="https://instagram.com/ashwini_rathod_19" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/15 px-7 py-4 text-sm font-semibold transition hover:border-white/30 hover:bg-white/[.04]">INSTAGRAM <ArrowUpRight size={16} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
