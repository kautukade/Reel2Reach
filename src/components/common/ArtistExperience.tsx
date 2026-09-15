import type { MouseEvent, ReactNode } from 'react';
import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Heart, MessageCircle, Play, Share2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

type Accent = 'pink' | 'purple' | 'coral';

const accentMap: Record<Accent, { glow: string; gradient: string; text: string }> = {
  pink: { glow: 'rgba(255,61,141,0.28)', gradient: 'linear-gradient(145deg,#ff5a5f 0%,#ff3d8d 48%,#241126 100%)', text: '#FF6AA7' },
  purple: { glow: 'rgba(139,92,246,0.28)', gradient: 'linear-gradient(145deg,#8b5cf6 0%,#ff3d8d 50%,#101225 100%)', text: '#B48AFF' },
  coral: { glow: 'rgba(255,90,95,0.28)', gradient: 'linear-gradient(145deg,#ff7a59 0%,#ff5a5f 45%,#23111a 100%)', text: '#FF8A78' },
};

export function DemoBadge({ label = 'DEMO CONCEPT' }: { label?: string }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[0.2em] text-amber-200/90"><Sparkles size={11} /> {label}</span>;
}

export function SectionTitle({ eyebrow, title, highlight, copy, align = 'left' }: { eyebrow?: string; title: string; highlight?: string; copy?: string; align?: 'left' | 'center' }) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-4 text-[11px] font-semibold tracking-[0.28em] text-[#FF6AA7]">{eyebrow}</motion.p>}
      <div className="overflow-hidden pb-2">
        <motion.h2 initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }} className="font-[family-name:var(--font-display)] text-3xl font-bold leading-[0.98] sm:text-5xl lg:text-6xl">
          {title}{highlight ? <><br /><span className="gradient-text gradient-text-live">{highlight}</span></> : null}
        </motion.h2>
      </div>
      {copy && <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.12 }} className={`mt-5 text-sm leading-relaxed text-[#A9ACB8] sm:text-base ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>{copy}</motion.p>}
    </div>
  );
}

export function TiltSurface({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  return <motion.div whileHover={reduceMotion ? undefined : { y: -8, rotateX: 2.5, rotateY: -2.5, scale: 1.012 }} transition={{ type: 'spring', stiffness: 220, damping: 20 }} className={className} style={{ transformStyle: 'preserve-3d', transformPerspective: 1000 }}>{children}</motion.div>;
}

function ReelFace({ accent, label, title, subtitle }: { accent: Accent; label: string; title: string; subtitle: string }) {
  const tone = accentMap[accent];
  const reduceMotion = useReducedMotion();
  return (
    <div className="absolute inset-2 overflow-hidden rounded-[34px]" style={{ background: tone.gradient }}>
      <div className="absolute inset-0 cinematic-grid opacity-[0.22]" />
      <motion.div aria-hidden="true" className="absolute -right-14 top-16 h-48 w-48 rounded-full border border-white/20" animate={reduceMotion ? undefined : { rotate: [0, 20, 0], scale: [1, 1.08, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />
      <motion.div aria-hidden="true" className="absolute -left-16 top-[42%] h-44 w-44 rounded-full bg-white/10 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 24, 0], y: [0, -18, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute left-4 right-4 top-5 flex items-center justify-between"><span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-white/90 backdrop-blur-xl">{label}</span><div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/15 backdrop-blur-xl"><Play size={14} fill="currentColor" /></div></div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07090F]/95 via-[#07090F]/55 to-transparent p-5 pt-20"><p className="mb-2 text-[9px] font-semibold tracking-[0.24em] text-white/50">REEL2REACH / CREATIVE LAB</p><h3 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-[0.95]">{title}</h3><p className="mt-3 text-xs leading-relaxed text-white/65">{subtitle}</p><div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-white/60"><div className="flex gap-3"><Heart size={14} /><MessageCircle size={14} /><Share2 size={14} /></div><ArrowUpRight size={15} /></div></div>
    </div>
  );
}

export function ArtHero({ eyebrow, lines, highlight, description, chips = [], primary, secondary, visualLabel = 'CREATIVE DIRECTION', visualTitle = 'MAKE THEM STOP', visualSubtitle = 'A cinematic social-first visual system designed for attention.', accent = 'pink' }: {
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
}) {
  const reduceMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const smoothX = useSpring(pointerX, { stiffness: 100, damping: 18, mass: 0.7 });
  const smoothY = useSpring(pointerY, { stiffness: 100, damping: 18, mass: 0.7 });
  const rotateY = useTransform(smoothX, [0, 1], [-7, 7]);
  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const cardX = useTransform(smoothX, [0, 1], [-9, 9]);
  const cardY = useTransform(smoothY, [0, 1], [-7, 7]);
  const floatOneX = useTransform(smoothX, [0, 1], [-12, 12]);
  const floatOneY = useTransform(smoothY, [0, 1], [-8, 8]);
  const floatTwoX = useTransform(smoothX, [0, 1], [11, -11]);
  const floatTwoY = useTransform(smoothY, [0, 1], [8, -8]);
  const tone = accentMap[accent];

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  return (
    <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:min-h-[86vh] lg:pb-24">
      <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.14]" />
      <div className="pointer-events-none absolute left-[4%] top-[16%] h-72 w-72 rounded-full bg-[#FF3D8D]/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[6%] right-[8%] h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
        <div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-5 text-[11px] font-bold tracking-[0.28em]" style={{ color: tone.text }}>{eyebrow}</motion.p>
          <div className="space-y-0.5">
            {lines.map((line, index) => <div key={line} className="overflow-hidden pb-1"><motion.h1 initial={{ y: '115%', rotate: 1.4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.82, delay: 0.04 + index * 0.09, ease: [0.22, 1, 0.36, 1] }} className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{line}</motion.h1></div>)}
            <div className="overflow-hidden pb-3"><motion.h1 initial={{ y: '115%', filter: 'blur(8px)' }} animate={{ y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.9, delay: 0.23, ease: [0.22, 1, 0.36, 1] }} className="gradient-text gradient-text-live font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.9] tracking-[-0.045em] sm:text-6xl lg:text-7xl">{highlight}</motion.h1></div>
          </div>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-5 max-w-xl text-sm leading-relaxed text-[#A9ACB8] sm:text-lg">{description}</motion.p>
          {chips.length > 0 && <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} className="mt-6 flex flex-wrap gap-2">{chips.map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white/60 backdrop-blur-xl">{chip}</span>)}</motion.div>}
          {(primary || secondary) && <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-8 flex flex-wrap gap-3">{primary && <Link to={primary.to} className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(255,61,141,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_65px_rgba(255,61,141,0.28)]">{primary.label}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>}{secondary && <Link to={secondary.to} className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.035] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/30 hover:bg-white/[0.07]">{secondary.label}<ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>}</motion.div>}
        </div>

        <motion.div ref={sceneRef} onMouseMove={onMove} onMouseLeave={() => { pointerX.set(0.5); pointerY.set(0.5); }} initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto h-[520px] w-full max-w-[510px] sm:h-[610px]" style={{ perspective: 1200 }}>
          <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" style={{ background: tone.glow }} animate={reduceMotion ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.55, 0.82, 0.55] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute left-1/2 top-1/2 h-[460px] w-[230px] -translate-x-1/2 -translate-y-1/2 sm:h-[540px] sm:w-[270px]" style={reduceMotion ? undefined : { rotateX, rotateY, x: cardX, y: cardY, transformStyle: 'preserve-3d' }}>
            <motion.div className="relative h-full w-full rounded-[42px] border border-white/20 bg-[#080A10] p-1 shadow-[0_42px_120px_rgba(0,0,0,0.55)]" animate={reduceMotion ? undefined : { y: [0, -10, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="absolute left-1/2 top-2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-[#07090F]" /><ReelFace accent={accent} label={visualLabel} title={visualTitle} subtitle={visualSubtitle} /><div className="pointer-events-none absolute inset-0 rounded-[42px] ring-1 ring-inset ring-white/10" />
              <motion.div aria-hidden="true" className="pointer-events-none absolute -left-10 top-[-18%] h-28 w-[150%] rotate-12 bg-gradient-to-b from-transparent via-white/16 to-transparent blur-xl" animate={reduceMotion ? undefined : { top: ['-22%', '120%'] }} transition={{ duration: 4.8, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut' }} />
            </motion.div>
          </motion.div>
          <motion.div className="absolute left-[4%] top-[14%] w-36 rounded-2xl border border-white/12 bg-[#0B0E16]/85 p-4 shadow-2xl backdrop-blur-xl sm:w-44" style={reduceMotion ? undefined : { x: floatOneX, y: floatOneY }} animate={reduceMotion ? undefined : { rotate: [-5, -2.5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><p className="text-[9px] font-semibold tracking-[0.22em] text-[#FF6AA7]">HOOK / 00:03</p><p className="mt-2 font-[family-name:var(--font-display)] text-sm font-bold">ATTENTION FIRST.</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8"><motion.div className="h-full bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6]" animate={reduceMotion ? undefined : { width: ['22%', '86%', '44%'] }} transition={{ duration: 6, repeat: Infinity }} /></div></motion.div>
          <motion.div className="absolute bottom-[14%] right-[1%] w-40 rounded-2xl border border-white/12 bg-[#0B0E16]/85 p-4 shadow-2xl backdrop-blur-xl sm:w-48" style={reduceMotion ? undefined : { x: floatTwoX, y: floatTwoY }} animate={reduceMotion ? undefined : { rotate: [4, 1.5, 4] }} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}><p className="text-[9px] font-semibold tracking-[0.22em] text-[#B48AFF]">EDIT TIMELINE</p><div className="mt-3 flex h-12 items-end gap-1.5">{[38, 72, 52, 88, 62].map((height, index) => <motion.span key={height + index} className="w-full rounded-full bg-white/16" animate={reduceMotion ? undefined : { height: [`${height * .22}px`, `${height * .36}px`, `${height * .22}px`] }} transition={{ duration: 2.4 + index * .18, repeat: Infinity }} />)}</div></motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function CreativeStrip({ words }: { words: string[] }) {
  const row = [...words, ...words, ...words];
  return <div className="overflow-hidden border-y border-white/[0.05] bg-white/[0.015] py-5"><div className="artist-marquee flex w-max whitespace-nowrap">{row.map((word, index) => <span key={`${word}-${index}`} className="mx-6 font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.18em] text-white/25 sm:text-base">{word}<span className="ml-12 text-[#FF3D8D]/50">✦</span></span>)}</div></div>;
}
