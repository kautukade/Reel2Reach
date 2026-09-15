import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
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
    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-amber-200/90">
      <Sparkles size={11} /> {label}
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
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-[#FF6AA7]"
        >
          {eyebrow}
        </motion.p>
      )}
      <div className="overflow-hidden pb-2">
        <motion.h2
          initial={{ y: '110%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          className="font-[family-name:var(--font-display)] text-3xl font-bold leading-[0.98] sm:text-5xl lg:text-6xl"
        >
          {title}
          {highlight ? (
            <>
              <br />
              <span className="gradient-text gradient-text-live">{highlight}</span>
            </>
          ) : null}
        </motion.h2>
      </div>
      {copy && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className={`mt-5 text-sm leading-relaxed text-[#A9ACB8] sm:text-base ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}
        >
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
      whileHover={reduceMotion ? undefined : { y: -8, rotateX: 2.2, rotateY: -2.2, scale: 1.012 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      className={className}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}
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
  visualSubtitle = 'Move your pointer. The scene is rendered live in 3D — it is not a static mockup.',
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
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:min-h-[88vh] lg:pb-24">
      <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.12]" />
      <div className="pointer-events-none absolute left-[3%] top-[14%] h-80 w-80 rounded-full bg-[#FF3D8D]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[2%] right-[5%] h-96 w-96 rounded-full bg-[#8B5CF6]/10 blur-[140px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 text-[11px] font-bold tracking-[0.28em]"
            style={{ color: accentText[accent] }}
          >
            {eyebrow}
          </motion.p>

          <div className="space-y-0.5">
            {lines.map((line, index) => (
              <div key={line} className="overflow-hidden pb-1">
                <motion.h1
                  initial={{ y: '115%', rotate: 1.4 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.82, delay: 0.04 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
                >
                  {line}
                </motion.h1>
              </div>
            ))}
            <div className="overflow-hidden pb-3">
              <motion.h1
                initial={{ y: '115%', filter: 'blur(8px)' }}
                animate={{ y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text gradient-text-live font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-7xl"
              >
                {highlight}
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-[#A9ACB8] sm:text-lg"
          >
            {description}
          </motion.p>

          {chips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {chips.map((chip) => (
                <span key={chip} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/60 backdrop-blur-xl">
                  {chip}
                </span>
              ))}
            </motion.div>
          )}

          {(primary || secondary) && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8 flex flex-wrap gap-3">
              {primary && (
                <Link to={primary.to} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(255,61,141,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_65px_rgba(255,61,141,0.28)]">
                  {primary.label}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
              {secondary && (
                <Link to={secondary.to} className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.07]">
                  {secondary.label}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              )}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto h-[520px] w-full max-w-[560px] sm:h-[620px]"
        >
          <div className="absolute inset-0 rounded-[38px] border border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-transparent shadow-[0_55px_140px_rgba(0,0,0,.35)]" />
          <WebGLArtScene variant={scene} className="relative z-10 rounded-[38px]" />

          <div className="pointer-events-none absolute left-5 top-5 z-20 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[9px] font-bold tracking-[0.2em] text-white/70 backdrop-blur-xl">
            {visualLabel}
          </div>
          <motion.div
            className="pointer-events-none absolute bottom-5 left-5 right-5 z-20 rounded-2xl border border-white/10 bg-[#07090F]/55 p-4 backdrop-blur-xl"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="font-[family-name:var(--font-display)] text-lg font-bold">{visualTitle}</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-white/55">{visualSubtitle}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function CreativeStrip({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words];
  return (
    <div className="overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-5">
      <div className="artist-marquee flex w-max whitespace-nowrap">
        {row.map((word, index) => (
          <span key={`${word}-${index}`} className="mx-6 font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.18em] text-white/25 sm:text-base">
            {word}<span className="ml-12 text-[#FF3D8D]/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
