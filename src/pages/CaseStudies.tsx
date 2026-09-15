import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Share2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, DemoBadge, SectionTitle } from '../components/common/ArtistExperience';
import { useDemoCmsRows } from '../lib/useDemoCms';

const demoStudies = [
  {
    industry: 'FASHION / DEMO',
    title: 'THE 7-DAY DROP',
    challenge: 'Imagine a local fashion label with one week to build curiosity before a new collection lands.',
    idea: 'Turn the launch into a countdown world: silhouette teasers, close-up texture, creator styling moments and one final reveal reel.',
    deliverables: ['teaser reel', 'creator styling reel', 'launch-day reel', 'story countdown system'],
    visual: 'linear-gradient(145deg,#ff4f74 0%,#65153f 48%,#09090d 100%)',
  },
  {
    industry: 'BEAUTY / DEMO',
    title: 'TEXTURE BEFORE CLAIMS',
    challenge: 'Imagine a beauty product that needs to feel premium before the audience reads a single benefit.',
    idea: 'Lead with macro texture, reflections and slow tactile movement. Let the product’s physical feel become the visual hook before copy appears.',
    deliverables: ['macro product reel', 'voiceover cut', 'aesthetic carousel', 'BTS micro-content'],
    visual: 'linear-gradient(145deg,#cf9cff 0%,#ff83b3 48%,#14101c 100%)',
  },
  {
    industry: 'FOOD / DEMO',
    title: 'SOUND OF THE FIRST BITE',
    challenge: 'Imagine a local food brand competing in a feed full of static menu photography.',
    idea: 'Turn sound into the hook: sizzle, pour, crunch, steam and plate hits cut into a rhythmic 12-second food story.',
    deliverables: ['ASMR-style reel', 'fast-cut offer reel', 'chef/BTS story', 'product close-up set'],
    visual: 'linear-gradient(145deg,#ff9f43 0%,#ff4e50 48%,#29100d 100%)',
  },
];

type CaseRow = {
  id: string;
  brand_name: string;
  industry?: string;
  cover_image?: string;
  challenge?: string;
  approach?: string;
  content_produced?: string;
  results?: string;
  client_quote?: string;
  status?: string;
};

function splitDeliverables(value?: string) {
  if (!value) return [];
  return value.split(/\n|,|•/).map((item) => item.trim()).filter(Boolean).slice(0, 8);
}

export default function CaseStudies() {
  const reduceMotion = useReducedMotion();
  const { rows } = useDemoCmsRows<CaseRow>('case_studies', 'created_at');
  const published = rows.filter((row) => row.status !== 'draft');

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="CASE STUDIES / CREATIVE STRATEGY"
        lines={published.length ? ['REAL CASES.', 'CLEAR CREATIVE'] : ['NOT FAKE RESULTS.', 'REAL CREATIVE']}
        highlight={published.length ? 'THINKING.' : 'THINKING DEMOS.'}
        description={published.length ? 'Published case studies from the browser CMS appear first. Demo strategy files remain clearly separated below so presentation concepts are never confused with completed work.' : 'These case studies are intentionally labelled demo scenarios. They show how Reel2Reach could think through a brief — without pretending hypothetical outcomes are real client results.'}
        chips={published.length ? ['LIVE CMS CASES', 'STRATEGY', 'EXECUTION', 'TRANSPARENT RESULTS'] : ['DEMO ONLY', 'NO FAKE METRICS', 'STRATEGY', 'ART DIRECTION']}
        primary={{ label: 'CREATE A REAL CASE', to: '/book' }}
        secondary={{ label: 'VIEW OUR WORK', to: '/portfolio' }}
        visualLabel="CASE LAB / STRATEGY"
        visualTitle="CHALLENGE → IDEA → EXECUTION"
        visualSubtitle="Show the thinking, the craft and the evidence — without manufacturing a number just to make the page look impressive."
        accent="pink"
      />

      <CreativeStrip words={['CHALLENGE', 'INSIGHT', 'HOOK', 'DIRECTION', 'SHOOT', 'EDIT', 'LEARN']} />

      {published.length > 0 && (
        <section className="relative overflow-hidden border-b border-white/[0.05] bg-[#080A10] py-24 lg:py-36">
          <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.08]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionTitle eyebrow="PUBLISHED CASE FILES" title="FROM ADMIN." highlight="LIVE ON THE SITE." copy="Create or edit a case study in the browser demo CMS and the published version appears here immediately." />
              <span className="w-fit rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-4 py-2 text-[9px] font-bold uppercase tracking-[.2em] text-emerald-200/80">CMS → CASE STUDY / LIVE</span>
            </div>

            <div className="mt-14 space-y-8">
              {published.map((study, index) => {
                const deliverables = splitDeliverables(study.content_produced);
                return (
                  <motion.article key={study.id} initial={{ opacity: 0, y: 46 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-8%' }} transition={{ duration: .8, delay: index * .06 }} className="overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16]">
                    <div className="grid lg:grid-cols-[.78fr_1.22fr]">
                      <div className="relative min-h-[360px] overflow-hidden bg-gradient-to-br from-[#FF3D8D]/55 via-[#5b2c82] to-[#10131D] p-7 sm:p-9">
                        {study.cover_image ? <img src={study.cover_image} alt={study.brand_name} className="absolute inset-0 h-full w-full object-cover" /> : <div className="absolute inset-0 cinematic-grid opacity-25" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/90 via-[#07090F]/20 to-black/10" />
                        <motion.div aria-hidden="true" className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-white/20" animate={reduceMotion ? undefined : { rotate: [0, 24, 0], scale: [1, 1.08, 1] }} transition={{ duration: 8 + index, repeat: Infinity }} />
                        <div className="relative flex h-full min-h-[300px] flex-col justify-between">
                          <div><span className="rounded-full border border-emerald-300/18 bg-emerald-300/[0.08] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-emerald-100">Published Case</span></div>
                          <div><p className="text-[9px] font-semibold uppercase tracking-[.22em] text-white/55">{study.industry || 'REEL2REACH / CASE'}</p><h2 className="mt-3 max-w-[12ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[.9] sm:text-5xl">{study.brand_name}</h2><div className="mt-6 flex gap-3 text-white/55"><Heart size={15}/><MessageCircle size={15}/><Share2 size={15}/></div></div>
                        </div>
                      </div>

                      <div className="p-7 sm:p-9 lg:p-11">
                        <div className="grid gap-8 md:grid-cols-2">
                          <div><p className="text-[10px] font-semibold tracking-[.22em] text-[#FF6AA7]">THE CHALLENGE</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.challenge || 'Challenge details can be added from the admin panel.'}</p></div>
                          <div><p className="text-[10px] font-semibold tracking-[.22em] text-[#B48AFF]">THE APPROACH</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.approach || 'Creative approach details can be added from the admin panel.'}</p></div>
                        </div>
                        {deliverables.length > 0 && <div className="mt-9 border-t border-white/[0.06] pt-7"><p className="text-[10px] font-semibold tracking-[.22em] text-white/35">CONTENT PRODUCED</p><div className="mt-4 flex flex-wrap gap-2">{deliverables.map((item) => <span key={item} className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">{item}</span>)}</div></div>}
                        {study.results && <div className="mt-8 rounded-2xl border border-emerald-300/12 bg-emerald-300/[0.035] p-5"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-emerald-200/70">Recorded result / admin supplied</p><p className="mt-3 text-sm leading-relaxed text-white/70">{study.results}</p></div>}
                        {study.client_quote && <blockquote className="mt-6 border-l border-[#FF3D8D]/50 pl-5 text-sm italic leading-7 text-white/65">“{study.client_quote}”</blockquote>}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionTitle eyebrow="DEMO CASE FILES" title="THREE BRIEFS." highlight="THREE CREATIVE ANSWERS." copy="No fabricated reach, follower growth or sales numbers are shown. These examples demonstrate creative planning only." />
            <DemoBadge label="ILLUSTRATIVE / DEMO ONLY" />
          </div>
          <div className="mt-14 space-y-8">
            {demoStudies.map((study, index) => (
              <motion.article key={study.title} initial={{ opacity:0,y:50 }} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-8%'}} transition={{duration:.8,delay:index*.08}} className="overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16]">
                <div className="grid lg:grid-cols-[.72fr_1.28fr]">
                  <div className="relative min-h-[340px] overflow-hidden p-7 sm:p-9" style={{background:study.visual}}>
                    <div className="absolute inset-0 cinematic-grid opacity-25" /><motion.div aria-hidden="true" className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-white/20" animate={reduceMotion ? undefined : {rotate:[0,24,0],scale:[1,1.08,1]}} transition={{duration:8+index,repeat:Infinity}} />
                    <div className="relative"><DemoBadge label="DEMO CASE STUDY" /><p className="mt-7 text-[9px] font-semibold tracking-[.22em] text-white/55">{study.industry}</p><h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[.9] sm:text-5xl">{study.title}</h2></div>
                    <div className="absolute bottom-7 left-7 flex gap-3 text-white/55"><Heart size={15}/><MessageCircle size={15}/><Share2 size={15}/></div>
                  </div>
                  <div className="p-7 sm:p-9 lg:p-11">
                    <div className="grid gap-8 md:grid-cols-2"><div><p className="text-[10px] font-semibold tracking-[.22em] text-[#FF6AA7]">THE CHALLENGE</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.challenge}</p></div><div><p className="text-[10px] font-semibold tracking-[.22em] text-[#B48AFF]">THE CREATIVE IDEA</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.idea}</p></div></div>
                    <div className="mt-9 border-t border-white/[0.06] pt-7"><p className="text-[10px] font-semibold tracking-[.22em] text-white/35">POSSIBLE DELIVERABLES</p><div className="mt-4 flex flex-wrap gap-2">{study.deliverables.map((item)=><span key={item} className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">{item}</span>)}</div></div>
                    <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 text-xs leading-relaxed text-amber-100/60"><strong className="text-amber-100/85">Illustrative only.</strong> This scenario demonstrates creative strategy. It does not represent a completed client campaign or measured result.</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-14 text-center"><Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">TURN YOUR BRIEF INTO A REAL CASE <ArrowRight size={16}/></Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16] px-6 py-14 text-center sm:px-10 lg:py-18"><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,.13),transparent_48%)]" /><Sparkles className="relative mx-auto text-[#B48AFF]" size={24}/><h2 className="relative mt-5 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">THE BEST CASE STUDY<br/><span className="gradient-text gradient-text-live">IS THE NEXT REAL ONE.</span></h2></div>
      </section>
    </div>
  );
}
