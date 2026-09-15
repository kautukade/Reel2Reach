import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import WebGLArtScene, { type WebGLSceneVariant } from './WebGLArtScene';

type Accent = 'pink' | 'purple' | 'coral';

const accentText: Record<Accent, string> = {
  pink: '#FF6AA7',
  purple: '#B48AFF',
  coral: '#FF8A78',
};

const accentScene: Record<Accent, WebGLSceneVariant> = {
  pink: 'hero',
  purple: 'portfolio',
  coral: 'services',
};

export function DemoBadge({ label = 'DEMO CONCEPT' }: { label?: string }) {
  return (
    <span className="inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 text-center text-[9px] font-semibold leading-4 tracking-[0.14em] text-amber-200/90 sm:text-[10px] sm:tracking-[0.2em]">
      <Sparkles size={11} className="shrink-0" /> {label}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  highlight,
  copy,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  highlight?: string;
  copy?: string;
  align?: 'left' | 'center';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && (
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-3 text-[9px] font-semibold leading-5 tracking-[0.2em] text-[#FF6AA7] sm:mb-4 sm:text-[11px] sm:tracking-[0.28em]">
          {eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden pb-2">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-[clamp(2rem,9vw,3rem)] font-bold leading-[0.98] tracking-[-.035em] sm:text-5xl lg:text-6xl"
        >
          {title}
          {highlight ? <><br /><span className="gradient-text gradient-text-live">{highlight}</span></> : null}
        </motion.h2>
      </div>
      {copy && (
        <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className={`mt-4 text-sm leading-6 text-[#A9ACB8] sm:mt-5 sm:text-base sm:leading-7 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
          {copy}
        </motion.p>
      )}
    </div>
  );
}

export function TiltSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -7, rotateX: 1.8, rotateY: -1.8, scale: 1.008 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className={`min-w-0 ${className}`}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1100 }}
    >
      {children}
    </motion.div>
  );
}

export function ArtHero({
  eyebrow,
  lines,
  highlight,
  description,
  chips = [],
  primary,
  secondary,
  visualLabel = 'LIVE 3D / WEBGL',
  visualTitle = 'REAL-TIME MOTION',
  visualSubtitle = 'Continuous motion, depth and light — designed as part of the art direction, not added as an effect.',
  accent = 'pink',
  sceneVariant,
}: {
  eyebrow: string;
  lines: string[];
  highlight: string;
  description: string;
  chips?: string[];
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string };
  visualLabel?: string;
  visualTitle?: string;
  visualSubtitle?: string;
  accent?: Accent;
  sceneVariant?: WebGLSceneVariant;
}) {
  const scene = sceneVariant ?? accentScene[accent];
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.05] sm:min-h-[92svh]">
      <div className="absolute inset-0">
        <WebGLArtScene variant={scene} className="h-full w-full opacity-[.72] sm:opacity-[.88]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#07090F_0%,rgba(7,9,15,.94)_30%,rgba(7,9,15,.56)_58%,rgba(7,9,15,.14)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,#07090F_0%,transparent_26%,transparent_74%,rgba(7,9,15,.72)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,9,15,.82)_0%,rgba(7,9,15,.34)_36%,rgba(7,9,15,.9)_100%)] sm:hidden" />
        <div className="absolute inset-0 cinematic-grid opacity-[.08]" />
      </div>

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 pb-20 pt-28 sm:min-h-[92svh] sm:px-6 sm:pb-16 sm:pt-32 lg:items-center lg:px-8 lg:pb-10">
        <div className="relative z-10 min-w-0 max-w-4xl">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-4 max-w-[34rem] text-[9px] font-bold leading-5 tracking-[0.2em] sm:mb-5 sm:text-[11px] sm:tracking-[0.3em]" style={{ color: accentText[accent] }}>
            {eyebrow}
          </motion.p>

          <div className="space-y-0.5">
            {lines.map((line, index) => (
              <div key={line} className="overflow-hidden pb-1">
                <motion.h1
                  initial={{ y: '115%', rotate: 1.2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.03 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family-name:var(--font-display)] text-[clamp(2.7rem,11.5vw,4.6rem)] font-bold leading-[0.88] tracking-[-0.052em] sm:text-6xl lg:text-[5.8rem] xl:text-[6.8rem]"
                >
                  {line}
                </motion.h1>
              </div>
            ))}
            <div className="overflow-hidden pb-2">
              <motion.h1
                initial={{ y: '115%', filter: 'blur(10px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.95, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text gradient-text-live font-[family-name:var(--font-display)] text-[clamp(2.7rem,11.5vw,4.6rem)] font-bold leading-[0.88] tracking-[-0.052em] sm:text-6xl lg:text-[5.8rem] xl:text-[6.8rem]"
              >
                {highlight}
              </motion.h1>
            </div>
          </div>

          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mt-5 max-w-xl text-sm leading-6 text-[#B9BBC4] sm:mt-6 sm:text-base sm:leading-7 lg:text-lg">
            {description}
          </motion.p>

          {chips.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-5 flex max-w-full flex-wrap gap-2 sm:mt-6">
              {chips.map((chip) => (
                <span key={chip} className="max-w-full rounded-full border border-white/10 bg-black/25 px-2.5 py-1.5 text-[8px] font-semibold leading-4 tracking-[0.11em] text-white/60 backdrop-blur-xl sm:px-3 sm:text-[10px] sm:tracking-[0.15em]">
                  {chip}
                </span>
              ))}
            </motion.div>
          )}

          {(primary || secondary) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 }} className="mt-7 grid w-full max-w-md grid-cols-1 gap-3 min-[430px]:flex min-[430px]:max-w-none sm:mt-8">
              {primary && (
                <Link to={primary.to} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3.5 text-center text-sm font-bold text-[#07090F] transition hover:-translate-y-0.5 min-[430px]:w-auto sm:px-6">
                  <span>{primary.label}</span><ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
              {secondary && (
                <Link to={secondary.to} className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-black/25 px-5 py-3.5 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.07] min-[430px]:w-auto sm:px-6">
                  <span>{secondary.label}</span><ArrowUpRight size={16} className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.div>
          )}
        </div>

        <motion.div
          className="pointer-events-none absolute bottom-8 right-4 hidden w-[300px] rounded-[26px] border border-white/10 bg-black/28 p-5 backdrop-blur-xl lg:block xl:right-8"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0, y: reduceMotion ? 0 : [0, -8, 0] }}
          transition={{ opacity: { duration: .6, delay: .45 }, x: { duration: .6, delay: .45 }, y: { duration: 5, repeat: Infinity, ease: 'easeInOut' } }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold tracking-[.24em] text-white/45">{visualLabel}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/12 bg-white/[.05]"><Play size={12} fill="currentColor" /></span>
          </div>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-bold">{visualTitle}</h3>
          <p className="mt-2 text-xs leading-6 text-white/50">{visualSubtitle}</p>
          <div className="mt-5 flex h-8 items-end gap-1.5">
            {[42, 75, 55, 88, 62, 78].map((height, index) => (
              <motion.span key={height} className="w-full rounded-full bg-white/18" animate={reduceMotion ? undefined : { height: [`${height * .3}%`, `${height}%`, `${height * .3}%`] }} transition={{ duration: 2 + index * .14, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.05] bg-black/20 py-2.5 backdrop-blur-md sm:py-3">
        <div className="artist-marquee flex w-max whitespace-nowrap text-[8px] font-bold tracking-[.18em] text-white/30 sm:text-[10px] sm:tracking-[.24em]">
          {[...Array(3)].flatMap(() => ['ART DIRECTION', 'REELS', 'STORY', 'MOTION', 'CREATOR', 'SOCIAL']).map((word, index) => (
            <span key={`${word}-${index}`} className="mx-4 sm:mx-8">{word}<span className="ml-4 text-[#FF3D8D]/55 sm:ml-8">✦</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CreativeStrip({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-4 sm:py-5">
      <div className="artist-marquee flex w-max whitespace-nowrap">
        {row.map((word, index) => (
          <span key={`${word}-${index}`} className="mx-4 font-[family-name:var(--font-display)] text-xs font-bold tracking-[0.14em] text-white/25 sm:mx-6 sm:text-base sm:tracking-[0.18em]">
            {word}<span className="ml-6 text-[#FF3D8D]/50 sm:ml-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
