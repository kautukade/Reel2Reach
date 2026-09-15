import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Layers3, Play, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, DemoBadge, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';
import { useDemoCmsRows } from '../lib/useDemoCms';

const categories = ['All', 'Fashion', 'Beauty', 'Food', 'Retail', 'Product', 'Lifestyle', 'Collaboration'];

const demoWork = [
  { title: 'MIDNIGHT DROP', category: 'Fashion', label: 'Fashion Launch Reel', hook: 'DROP AT 8. DISAPPEAR BY 9.', copy: 'A dark editorial launch concept mixing flash photography, runway cuts and countdown typography.', palette: 'linear-gradient(150deg,#ff4f74 0%,#61123f 38%,#09090d 100%)', accent: '#FF6787', rotate: -1.8 },
  { title: 'GLASS SKIN', category: 'Beauty', label: 'Beauty Product Story', hook: 'TEXTURE YOU CAN ALMOST FEEL.', copy: 'A macro-first beauty concept built around reflections, liquid light, texture and slow tactile movement.', palette: 'linear-gradient(150deg,#c99cff 0%,#ff8fbd 42%,#171120 100%)', accent: '#DDBBFF', rotate: 1.6 },
  { title: 'CRUNCH THEORY', category: 'Food', label: 'Food Reel Concept', hook: 'HEAR IT BEFORE YOU TASTE IT.', copy: 'A sound-led food film using fast macro cuts, steam, crunch moments and bold kinetic type.', palette: 'linear-gradient(150deg,#ff9a44 0%,#ff4e50 46%,#27100e 100%)', accent: '#FFB36D', rotate: -1 },
  { title: 'SHELF TO SCROLL', category: 'Retail', label: 'Retail Transformation Reel', hook: 'THE STORE BECOMES THE SET.', copy: 'A local retail concept turning aisles, mirrors, packaging and staff moments into an editorial social film.', palette: 'linear-gradient(150deg,#725cff 0%,#ff3d8d 50%,#0f1020 100%)', accent: '#9A8BFF', rotate: 2.1 },
  { title: 'ONE OBJECT / FIVE MOODS', category: 'Product', label: 'Product Film System', hook: 'SAME PRODUCT. NEW FEELING EVERY CUT.', copy: 'A modular product-film idea that changes lighting, sound and motion while keeping one hero object center stage.', palette: 'linear-gradient(150deg,#25d0ab 0%,#4f6fff 48%,#0a1220 100%)', accent: '#61E5C8', rotate: -1.5 },
  { title: '24 HOURS / 12 SECONDS', category: 'Lifestyle', label: 'Lifestyle POV Reel', hook: 'A WHOLE DAY, CUT TO THE FEELING.', copy: 'A fast POV montage built from tiny rituals, movement and natural transitions rather than staged poses.', palette: 'linear-gradient(150deg,#ffcb6b 0%,#ff6d88 46%,#24121b 100%)', accent: '#FFD383', rotate: 1.2 },
  { title: 'PASS THE PRODUCT', category: 'Collaboration', label: 'Creator Collaboration', hook: 'ONE OBJECT. MULTIPLE PERSONALITIES.', copy: 'A creator-chain concept where one product passes through different hands, styles and micro-stories.', palette: 'linear-gradient(150deg,#8b5cf6 0%,#ff3d8d 44%,#17101f 100%)', accent: '#C39BFF', rotate: -2.2 },
  { title: 'BEFORE THE DOORS OPEN', category: 'Lifestyle', label: 'Behind-the-Scenes Story', hook: 'THE BEST PART HAPPENS BEFORE CUSTOMERS ARRIVE.', copy: 'A quiet-to-chaotic BTS concept showing setup, preparation, people and the moment a space comes alive.', palette: 'linear-gradient(150deg,#3e4bff 0%,#8b5cf6 44%,#0e1020 100%)', accent: '#8FA0FF', rotate: 1.9 },
];

type DemoWork = (typeof demoWork)[number];
type PortfolioRow = {
  id: string;
  title: string;
  brand?: string;
  description?: string;
  category?: string;
  thumbnail_url?: string;
  video_url?: string;
  instagram_url?: string;
  campaign_type?: string;
  featured?: boolean;
  status?: string;
};

function DemoReel({ item, index, onOpen }: { item: DemoWork; index: number; onOpen: () => void }) {
  const reduceMotion = useReducedMotion();
  return (
    <TiltSurface className="h-full">
      <motion.button type="button" onClick={onOpen} initial={{ opacity: 0, y: 46, rotate: reduceMotion ? 0 : item.rotate * 1.5 }} animate={{ opacity: 1, y: 0, rotate: reduceMotion ? 0 : item.rotate }} transition={{ duration: .75, delay: index * .055, ease: [0.22, 1, 0.36, 1] }} className="group relative block aspect-[9/16] w-full overflow-hidden rounded-[30px] border border-white/10 text-left shadow-[0_30px_80px_rgba(0,0,0,.34)]" style={{ background: item.palette }}>
        <div className="absolute inset-0 cinematic-grid opacity-[0.22]" />
        <motion.div aria-hidden="true" className="absolute -right-14 top-12 h-44 w-44 rounded-full border border-white/20" animate={reduceMotion ? undefined : { rotate: [0, 20, 0], scale: [1, 1.08, 1] }} transition={{ duration: 7 + index * .2, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div aria-hidden="true" className="absolute -left-12 top-[38%] h-32 w-32 rounded-full bg-white/12 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 16, 0], y: [0, -10, 0] }} transition={{ duration: 5 + index * .15, repeat: Infinity, ease: 'easeInOut' }} />
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between"><DemoBadge /><div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/15 backdrop-blur-xl transition group-hover:scale-110 group-hover:bg-white/15"><Play size={16} fill="currentColor" /></div></div>
        <div className="absolute inset-x-5 top-[28%]"><p className="max-w-[13ch] font-[family-name:var(--font-display)] text-2xl font-bold leading-[.92] text-white/90 sm:text-3xl">{item.hook}</p></div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07090F]/95 via-[#07090F]/60 to-transparent p-5 pt-24">
          <p className="text-[9px] font-semibold tracking-[.22em] text-white/45">CONCEPT / {String(index + 1).padStart(2, '0')}</p><h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{item.title}</h3><p className="mt-1 text-xs text-white/55">{item.label}</p>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-[10px] font-semibold tracking-[.16em]" style={{ color: item.accent }}>OPEN CONCEPT</span><ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div>
        </div>
        <div className="pointer-events-none absolute -inset-x-4 top-[-30%] h-20 rotate-12 bg-gradient-to-b from-transparent via-white/18 to-transparent opacity-0 blur-xl transition-all duration-700 group-hover:top-[120%] group-hover:opacity-100" />
      </motion.button>
    </TiltSurface>
  );
}

function PublishedWork({ items }: { items: PortfolioRow[] }) {
  const reduceMotion = useReducedMotion();
  const prefersReducedMotion = Boolean(reduceMotion);
  if (!items.length) return null;
  return (
    <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#080A10] py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.08]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle eyebrow="PUBLISHED FROM THE DEMO CMS" title="REAL UPLOADS." highlight="LIVE ON THE PAGE." copy="Anything published from Portfolio in the browser demo admin appears here immediately — including uploaded photos and video." />
          <span className="w-fit rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-emerald-200/80">CMS → PUBLIC SITE / LIVE</span>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <motion.article key={item.id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="group overflow-hidden rounded-[28px] border border-white/8 bg-[#0B0E16]">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#201129] via-[#111526] to-[#07090F]">
                {item.video_url ? <video src={item.video_url} poster={item.thumbnail_url || undefined} muted loop playsInline autoPlay={!prefersReducedMotion} controls={prefersReducedMotion} preload="metadata" className="h-full w-full object-cover" /> : item.thumbnail_url ? <img src={item.thumbnail_url} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" /> : <div className="absolute inset-0 cinematic-grid opacity-20" />}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090F] via-transparent to-transparent" />
                {item.featured && <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.16em] backdrop-blur-xl">Featured</span>}
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[9px] font-bold uppercase tracking-[.22em] text-[#FF7AB5]">{item.category || item.campaign_type || 'Published work'}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">{item.title}</h3>
                  {item.brand && <p className="mt-1 text-xs text-white/45">{item.brand}</p>}
                </div>
              </div>
              <div className="p-5">
                {item.description && <p className="text-sm leading-6 text-[#A9ACB8]">{item.description}</p>}
                {item.instagram_url && <a href={item.instagram_url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-white">VIEW SOURCE <ArrowUpRight size={14} /></a>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<DemoWork | null>(null);
  const { rows: cmsWork } = useDemoCmsRows<PortfolioRow>('portfolio_items');
  const publishedWork = cmsWork.filter((item) => item.status !== 'draft');
  const filtered = activeCategory === 'All' ? demoWork : demoWork.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!selectedItem) return;
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedItem(null);
    window.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow = ''; };
  }, [selectedItem]);

  return (
    <div className="pb-16">
      <ArtHero eyebrow="OUR WORK / CREATIVE LAB" lines={['DON’T JUST SHOW', 'THE PRODUCT. SHOW']} highlight="A POINT OF VIEW." description={publishedWork.length ? 'Published client/demo uploads from the CMS appear first, followed by clearly labelled Reel2Reach concept directions that show how different industries could look, move and feel.' : 'Until the live client portfolio is uploaded, this page intentionally showcases Reel2Reach demo directions — original concept ideas that demonstrate how different industries could look, move and feel.'} chips={publishedWork.length ? ['LIVE CMS WORK', 'DEMO CONCEPTS', '9:16 FIRST', 'ART DIRECTION'] : ['DEMO CONCEPTS', '9:16 FIRST', 'SOCIAL-NATIVE', 'ART DIRECTION']} primary={{ label: 'BUILD A REAL CAMPAIGN', to: '/book' }} secondary={{ label: 'CASE STUDY DEMOS', to: '/case-studies' }} visualLabel="CREATIVE LAB / WORK" visualTitle="MAKE THE FEED FEEL NEW" visualSubtitle="Published media can sit beside concept art without pretending demo work is a completed campaign." accent="pink" />
      <CreativeStrip words={['FASHION', 'BEAUTY', 'FOOD', 'RETAIL', 'PRODUCT', 'LIFESTYLE', 'CREATOR']} />

      <PublishedWork items={publishedWork} />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <SectionTitle eyebrow="DEMO REEL WALL" title="EIGHT IDEAS." highlight="EIGHT DIFFERENT WORLDS." copy="These are presentation concepts, not claims about completed client campaigns or results. They can later be replaced one-by-one with real portfolio uploads." />
            <div className="rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 text-xs leading-relaxed text-amber-100/65 lg:max-w-xs"><span className="font-semibold text-amber-100">Demo transparency:</span> Every card below is a creative concept for presentation purposes.</div>
          </div>
          <div className="mt-10 flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${activeCategory === category ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white shadow-[0_12px_35px_rgba(255,61,141,.18)]' : 'border border-white/10 bg-white/[0.03] text-[#A9ACB8] hover:border-white/20 hover:text-white'}`}>{category}</button>)}
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">{filtered.map((item, index) => <DemoReel key={item.title} item={item} index={index} onOpen={() => setSelectedItem(item)} />)}</div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/[0.05] bg-[#0B0E16]/85 py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.1]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="WHAT CHANGES FROM BRAND TO BRAND" title="SAME PLATFORM." highlight="DIFFERENT PERSONALITY." align="center" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {[{ n: '01', title: 'Visual Language', copy: 'Lighting, framing, movement, typography and color should belong to the brand, not a template.' }, { n: '02', title: 'Hook Language', copy: 'A fashion hook should not sound like a cafe hook. The first line changes with the audience.' }, { n: '03', title: 'Editing Rhythm', copy: 'Fast, quiet, tactile, raw, cinematic — the edit becomes part of the brand personality.' }].map((item, index) => <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="rounded-[28px] border border-white/7 bg-[#10131D] p-7"><span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white/[0.06]">{item.n}</span><h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{item.copy}</p></motion.div>)}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32"><div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8"><motion.div initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16] px-6 py-16 sm:px-12 lg:py-20"><Layers3 size={28} className="mx-auto text-[#FF6AA7]" /><h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">LIKE A DIRECTION?<br /><span className="gradient-text gradient-text-live">MAKE IT YOURS.</span></h2><p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#A9ACB8]">A demo is only the starting language. A real project would be redesigned around the client’s product, audience, personality and actual footage.</p><Link to="/book" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">Start a creative brief <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link></motion.div></div></section>

      <AnimatePresence>
        {selectedItem && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedItem(null)} className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"><motion.div role="dialog" aria-modal="true" aria-label={`${selectedItem.title} demo concept`} initial={{ opacity: 0, scale: .9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94, y: 20 }} transition={{ type: 'spring', stiffness: 180, damping: 20 }} onClick={(event) => event.stopPropagation()} className="grid w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0E16] shadow-[0_45px_140px_rgba(0,0,0,.65)] md:grid-cols-[.8fr_1.2fr]">
          <div className="relative min-h-[420px] overflow-hidden" style={{ background: selectedItem.palette }}><div className="absolute inset-0 cinematic-grid opacity-25" /><motion.div className="absolute -right-12 top-10 h-56 w-56 rounded-full border border-white/20" animate={{ rotate: [0, 24, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity }} /><div className="absolute left-6 top-6"><DemoBadge /></div><div className="absolute inset-x-7 top-[34%]"><p className="font-[family-name:var(--font-display)] text-3xl font-bold leading-[.92] sm:text-4xl">{selectedItem.hook}</p></div><div className="absolute bottom-6 left-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20"><Play size={18} fill="currentColor" /></div></div>
          <div className="relative p-7 sm:p-10"><button type="button" aria-label="Close concept" onClick={() => setSelectedItem(null)} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:bg-white/10 hover:text-white"><X size={16} /></button><p className="text-[10px] font-semibold tracking-[.24em]" style={{ color: selectedItem.accent }}>{selectedItem.category.toUpperCase()} / DEMO DIRECTION</p><h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">{selectedItem.title}</h2><p className="mt-2 text-sm text-white/45">{selectedItem.label}</p><p className="mt-7 text-sm leading-relaxed text-[#A9ACB8] sm:text-base">{selectedItem.copy}</p><div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.045] p-4 text-xs leading-relaxed text-amber-100/65">This is an original presentation demo, not a completed client campaign and not a claim of campaign performance.</div><Link to="/book" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-3 text-sm font-semibold">Create a real version <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
        </motion.div></motion.div>}
      </AnimatePresence>
    </div>
  );
}
