import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Camera, Film, Instagram, Play, Sparkles, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import WebGLArtScene from '../common/WebGLArtScene';
import { DemoBadge } from '../common/ArtistExperience';
import { useDemoCmsRows } from '../../lib/useDemoCms';

type PortfolioRow = {
  id: string;
  title: string;
  brand?: string;
  description?: string;
  category?: string;
  thumbnail_url?: string;
  video_url?: string;
  instagram_url?: string;
  status?: string;
  featured?: boolean;
};

const services = [
  {
    n: '01',
    title: 'Reels & Visual Films',
    copy: 'Concept, scripting, shooting and editing for short-form content that feels directed — not assembled.',
    icon: Film,
    href: '/services',
  },
  {
    n: '02',
    title: 'Influencer Stories',
    copy: 'Creator-led collaborations with a clear idea, strong product moment and natural social energy.',
    icon: Users,
    href: '/influencer-marketing',
  },
  {
    n: '03',
    title: 'Social Art Direction',
    copy: 'A recognisable visual language across reels, posts, launches and recurring content systems.',
    icon: Sparkles,
    href: '/social-media-management',
  },
];

const demos = [
  {
    title: 'AFTER DARK',
    label: 'Fashion / Launch Film',
    line: 'FLASH. SHADOW. SILHOUETTE.',
    bg: 'linear-gradient(155deg,#ff4f74 0%,#651740 44%,#08080c 100%)',
  },
  {
    title: 'FIRST BITE',
    label: 'Food / Sound-led Reel',
    line: 'HEAR IT BEFORE YOU TASTE IT.',
    bg: 'linear-gradient(155deg,#ff9a44 0%,#ff4e50 48%,#1e0d0b 100%)',
  },
  {
    title: 'TEXTURE',
    label: 'Beauty / Product Story',
    line: 'LIGHT. LIQUID. SKIN.',
    bg: 'linear-gradient(155deg,#c397ff 0%,#ff83b8 49%,#15101e 100%)',
  },
  {
    title: 'STREET PULSE',
    label: 'Retail / Brand Film',
    line: 'THE STORE BECOMES THE SET.',
    bg: 'linear-gradient(155deg,#6b5cff 0%,#ff3d8d 48%,#0e1020 100%)',
  },
];

function FloatingReel() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, rotate: -7 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ delay: .35, duration: .95, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto aspect-[9/16] w-[min(72vw,320px)] overflow-hidden rounded-[34px] border border-white/15 bg-[#11131A] shadow-[0_50px_140px_rgba(0,0,0,.58)] sm:w-[320px] lg:w-[360px]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_28%,rgba(255,120,160,.5),transparent_22%),linear-gradient(155deg,#ff5a5f_0%,#ff3d8d_38%,#7c3aed_68%,#090A0F_100%)]" />
      <div className="absolute inset-0 cinematic-grid opacity-[.18]" />
      <motion.div
        aria-hidden="true"
        className="absolute -right-20 top-[18%] h-56 w-56 rounded-full border border-white/25"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute left-[10%] top-[42%] h-28 w-28 rounded-[30px] border border-white/15 bg-white/10 backdrop-blur-lg"
        animate={reduceMotion ? undefined : { y: [0, -18, 0], rotate: [-8, 7, -8] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute left-5 right-5 top-5 flex items-center justify-between">
        <span className="rounded-full border border-white/15 bg-black/15 px-3 py-1.5 text-[9px] font-bold tracking-[.2em] backdrop-blur-xl">R2R / DIRECTOR'S CUT</span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/15 backdrop-blur-xl"><Play size={14} fill="currentColor" /></span>
      </div>
      <div className="absolute inset-x-6 bottom-7">
        <p className="text-[9px] font-bold tracking-[.22em] text-white/60">00:00 → 00:12</p>
        <p className="mt-3 max-w-[8ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[.82] tracking-[-.05em]">MAKE THEM STOP.</p>
        <div className="mt-5 flex gap-1.5">
          {[72, 38, 92, 55, 80, 46].map((h, i) => (
            <motion.span key={`${h}-${i}`} className="h-1 flex-1 rounded-full bg-white/25" animate={reduceMotion ? undefined : { scaleX: [.45, 1, .45], opacity: [.35, 1, .35] }} transition={{ duration: 1.6 + i * .14, repeat: Infinity, delay: i * .08 }} />
          ))}
        </div>
      </div>
      <div className="absolute inset-0 reel-scanline" />
    </motion.div>
  );
}

function PublishedWork({ items }: { items: PortfolioRow[] }) {
  const reduceMotion = useReducedMotion();
  if (!items.length) return null;
  return (
    <section className="bg-[#07090F] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <div>
            <p className="text-[10px] font-bold tracking-[.28em] text-[#FF6AA7]">PUBLISHED WORK / LIVE CMS</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.86] tracking-[-.05em] sm:text-7xl">REAL WORK<br />GOES FIRST.</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">When portfolio media is published from the demo CMS, it appears here before the concept work — keeping the site useful now and ready for real client reels later.</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.slice(0, 3).map((item, index) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group overflow-hidden rounded-[28px] border border-white/8 bg-white/[.025]">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#11131A]">
                {item.video_url ? (
                  <video src={item.video_url} poster={item.thumbnail_url || undefined} muted loop playsInline autoPlay={!Boolean(reduceMotion)} controls={Boolean(reduceMotion)} preload="metadata" className="h-full w-full object-cover" />
                ) : item.thumbnail_url ? (
                  <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                ) : (
                  <div className="absolute inset-0 bg-[linear-gradient(155deg,#ff4d73,#76224e_45%,#0a0b10)]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                {item.featured && <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold tracking-[.18em] backdrop-blur-xl">FEATURED</span>}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[9px] font-bold tracking-[.2em] text-[#FF7AB5]">{item.category || 'PUBLISHED WORK'}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">{item.title}</h3>
                  {item.brand && <p className="mt-1 text-xs text-white/50">{item.brand}</p>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EditorialHome() {
  const reduceMotion = useReducedMotion();
  const { rows: cmsWork } = useDemoCmsRows<PortfolioRow>('portfolio_items');
  const publishedWork = cmsWork.filter((item) => item.status !== 'draft');

  return (
    <div className="relative overflow-hidden bg-[#07090F] text-white">
      <section className="relative min-h-[100svh] overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <WebGLArtScene variant="hero" className="h-full w-full opacity-[.72]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,15,.98)_0%,rgba(7,9,15,.90)_42%,rgba(7,9,15,.46)_72%,rgba(7,9,15,.16)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#07090F_0%,transparent_26%,transparent_72%,rgba(7,9,15,.82)_100%)]" />
        </div>

        <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-10 lg:pt-24">
          <div className="relative z-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/12 bg-black/20 px-4 py-2 text-[9px] font-bold tracking-[.24em] text-white/70 backdrop-blur-xl">REEL2REACH / CREATIVE STUDIO</span>
              <span className="text-[9px] font-bold tracking-[.24em] text-[#FF6AA7]">SOCIAL-FIRST / ART-DIRECTED</span>
            </motion.div>

            <div className="mt-8 space-y-0">
              {['DON’T', 'POST.'].map((line, index) => (
                <div key={line} className="overflow-hidden pb-2">
                  <motion.h1 initial={{ y: '110%', rotate: 1 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: .95, delay: .06 + index * .1, ease: [0.22, 1, 0.36, 1] }} className="font-[family-name:var(--font-display)] text-[19vw] font-bold leading-[.76] tracking-[-.07em] sm:text-[8.3rem] lg:text-[8.2rem] xl:text-[9.4rem]">{line}</motion.h1>
                </div>
              ))}
              <div className="overflow-hidden pb-3">
                <motion.h1 initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 1, delay: .26, ease: [0.22, 1, 0.36, 1] }} className="gradient-text gradient-text-live font-[family-name:var(--font-display)] text-[19vw] font-bold leading-[.76] tracking-[-.07em] sm:text-[8.3rem] lg:text-[8.2rem] xl:text-[9.4rem]">DIRECT.</motion.h1>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .58 }} className="mt-7 grid max-w-2xl gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="max-w-lg text-sm leading-7 text-white/58 sm:text-base">Reels, creator stories and social campaigns shaped like visual culture — not another templated agency feed.</p>
              <p className="text-[9px] font-bold uppercase tracking-[.22em] text-white/32 sm:text-right">Idea → Frame → Feeling<br />Feeling → Memory</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#07090F] transition hover:-translate-y-0.5">SEE THE WORK <Play size={15} fill="currentColor" /></Link>
              <Link to="/book" className="group inline-flex items-center gap-3 rounded-full border border-white/18 bg-black/20 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:border-white/35 hover:bg-white/[.06]">START A PROJECT <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
            </motion.div>
          </div>

          <div className="relative z-10 hidden items-center justify-center lg:flex">
            <FloatingReel />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/[0.06] bg-black/20 py-3 backdrop-blur-md">
          <div className="artist-marquee flex w-max whitespace-nowrap text-[10px] font-bold tracking-[.24em] text-white/35">
            {[...Array(3)].flatMap(() => ['REELS', 'ART DIRECTION', 'INFLUENCE', 'EDIT', 'STORY', 'SOCIAL', 'MOTION']).map((word, index) => <span key={`${word}-${index}`} className="mx-8">{word}<span className="ml-8 text-[#FF3D8D]/60">✦</span></span>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F2EEE7] px-4 py-24 text-[#0B0B0D] sm:px-6 lg:px-8 lg:py-36">
        <motion.div aria-hidden="true" className="absolute -right-24 top-10 h-72 w-72 rounded-full border border-black/10" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] font-bold tracking-[.28em] text-black/45">THE POINT OF VIEW</p>
              <p className="mt-5 max-w-sm text-sm leading-7 text-black/55">The website should feel like the work: bold enough to stop attention, clear enough to understand immediately, and strange enough to be remembered.</p>
            </div>
            <div>
              <motion.h2 initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-[family-name:var(--font-display)] text-[15vw] font-bold leading-[.78] tracking-[-.065em] sm:text-[7rem] lg:text-[8.7rem]">WE DON’T<br />FILL FEEDS.<br /><span className="text-[#FF3D6F]">WE BUILD<br />WORLDS.</span></motion.h2>
              <div className="mt-12 grid gap-6 border-t border-black/10 pt-7 sm:grid-cols-3">
                {['A strong hook', 'A distinct visual language', 'A reason to remember'].map((item, i) => <div key={item}><p className="text-[10px] font-bold tracking-[.2em] text-black/35">0{i + 1}</p><p className="mt-3 font-[family-name:var(--font-display)] text-xl font-bold leading-tight">{item}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0A0C12] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.28em] text-[#FF6AA7]">WHAT WE ACTUALLY DO</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.88] tracking-[-.05em] sm:text-7xl">THREE<br />CREATIVE<br />ENGINES.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-white/55 sm:text-base">Not a giant menu of agency tasks. Three focused ways to make a brand look, move and sound more intentional on social.</p>
          </div>

          <div className="mt-12 border-t border-white/8">
            {services.map((service, index) => (
              <motion.div key={service.n} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
                <Link to={service.href} className="group grid gap-5 border-b border-white/8 py-8 transition hover:bg-white/[.025] sm:grid-cols-[72px_1fr_1.15fr_auto] sm:items-center sm:px-4 lg:py-10">
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-white/[.08]">{service.n}</span>
                  <div className="flex items-center gap-4"><service.icon size={20} className="text-[#FF6AA7]" /><h3 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl">{service.title}</h3></div>
                  <p className="text-sm leading-6 text-white/48">{service.copy}</p>
                  <ArrowUpRight size={20} className="transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PublishedWork items={publishedWork} />

      <section className="relative overflow-hidden bg-[#07090F] px-4 py-24 sm:px-6 lg:px-8 lg:py-36">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[.08]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.28em] text-[#FF6AA7]">SPEC / DEMO CONCEPTS</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[.88] tracking-[-.05em] sm:text-7xl">FOUR IDEAS.<br />FOUR DIFFERENT<br /><span className="gradient-text gradient-text-live">PERSONALITIES.</span></h2></div>
            <div className="max-w-sm rounded-2xl border border-amber-300/15 bg-amber-300/[.04] p-4 text-xs leading-6 text-amber-100/65">These are clearly labelled creative presentation demos — not fake client projects or fake results.</div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {demos.map((item, index) => (
              <motion.article key={item.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group relative min-h-[440px] overflow-hidden rounded-[30px] border border-white/9" style={{ background: item.bg }}>
                <div className="absolute inset-0 cinematic-grid opacity-[.18]" />
                <motion.div aria-hidden="true" className="absolute -right-16 top-12 h-56 w-56 rounded-full border border-white/20" animate={reduceMotion ? undefined : { rotate: [0, 26, 0], scale: [1, 1.08, 1] }} transition={{ duration: 8 + index, repeat: Infinity, ease: 'easeInOut' }} />
                <div className="absolute left-5 top-5"><DemoBadge label="DEMO / SPEC CONCEPT" /></div>
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-[9px] font-bold tracking-[.2em] text-white/55">{item.label.toUpperCase()}</p>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-.04em] sm:text-5xl">{item.title}</h3>
                  <p className="mt-3 max-w-[14ch] font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white/72">{item.line}</p>
                </div>
                <div className="pointer-events-none absolute -inset-x-4 top-[-25%] h-20 rotate-12 bg-gradient-to-b from-transparent via-white/18 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:top-[120%] group-hover:opacity-100" />
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex justify-center"><Link to="/portfolio" className="group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[.03] px-6 py-3.5 text-sm font-semibold transition hover:border-white/30 hover:bg-white/[.06]">OPEN THE CREATIVE LAB <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link></div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FF3D6F] px-4 py-24 text-white sm:px-6 lg:px-8 lg:py-36">
        <motion.div aria-hidden="true" className="absolute -left-16 -top-20 h-72 w-72 rounded-full border border-white/25" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 26, repeat: Infinity, ease: 'linear' }} />
        <div className="relative mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div><p className="text-[10px] font-bold tracking-[.28em] text-white/65">THE FIRST REAL CASE STUDY STARTS HERE</p><h2 className="mt-5 font-[family-name:var(--font-display)] text-[14vw] font-bold leading-[.77] tracking-[-.07em] sm:text-[7rem] lg:text-[8.6rem]">BRING<br />THE BRAND.<br />WE’LL BUILD<br />THE WORLD.</h2></div>
            <div className="pb-2"><p className="max-w-md text-sm leading-7 text-white/78 sm:text-base">One product, one space or one weird idea is enough to start. We’ll turn it into a visual direction made for the feed.</p><div className="mt-7 flex flex-wrap gap-3"><Link to="/book" className="group inline-flex items-center gap-3 rounded-full bg-[#07090F] px-7 py-4 text-sm font-bold text-white transition hover:-translate-y-1">BOOK A COLLAB <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link><a href="https://instagram.com/ashwini_rathod_19" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/8 px-7 py-4 text-sm font-semibold backdrop-blur-xl transition hover:bg-white/14"><Instagram size={16} /> INSTAGRAM</a></div></div>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between gap-4 border-t border-white/8 bg-[#07090F] px-4 py-5 text-[9px] font-bold uppercase tracking-[.2em] text-white/28 sm:px-6 lg:px-8">
        <span className="flex items-center gap-2"><Camera size={13} /> Reel2Reach Media</span>
        <span className="hidden sm:block">Your brand, our reel, everyone will see it.</span>
        <Link to="/contact" className="inline-flex items-center gap-1.5 text-white/48 hover:text-white">CONTACT <ArrowUpRight size={12} /></Link>
      </section>
    </div>
  );
}
