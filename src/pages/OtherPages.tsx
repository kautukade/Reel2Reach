import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, CalendarDays, Check, Eye, Heart, Megaphone, MessageCircle, Play, Send, Share2, Sparkles, Target, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, DemoBadge, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';

const influencerOfferings = [
  { icon: Users, title: 'Influencer Shoutout', desc: 'Creator-led product visibility with a native social tone.' },
  { icon: Megaphone, title: 'Brand Collaboration', desc: 'A planned brand + creator story rather than a pasted-on mention.' },
  { icon: Target, title: 'Paid Promotion', desc: 'Promotional content with a clear message and purposeful CTA.' },
  { icon: Eye, title: 'Brand Visibility', desc: 'Visual ideas designed to be noticed, understood and remembered.' },
  { icon: Share2, title: 'Sponsored Content', desc: 'Sponsored communication shaped to feel like content first.' },
  { icon: TrendingUp, title: 'Digital Promotion', desc: 'A coordinated content direction across multiple social touchpoints.' },
];

export function InfluencerMarketing() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="INFLUENCER MARKETING / HUMAN ATTENTION"
        lines={['PUT A FACE', 'TO THE']}
        highlight="BRAND STORY."
        description="Creator-led content works when the person, product and idea feel naturally connected. We shape the collaboration around the story — not just the mention."
        chips={['SHOUTOUTS', 'PRODUCT INTEGRATION', 'COLLABS', 'SPONSORED CONTENT']}
        primary={{ label: 'PLAN A COLLAB', to: '/book' }}
        secondary={{ label: 'SEE DEMO WORK', to: '/portfolio' }}
        visualLabel="CREATOR / BRAND"
        visualTitle="PERSONALITY SELLS THE MOMENT"
        visualSubtitle="A good collaboration gives the audience a reason to care before it gives them a reason to click."
        accent="purple"
      />

      <CreativeStrip words={['CREATOR', 'PRODUCT', 'HOOK', 'STORY', 'TRUST', 'SHARE', 'ACTION']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.1]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[.95fr_1.05fr] lg:items-center lg:px-8">
          <div>
            <SectionTitle eyebrow="THE CREATOR ORBIT" title="THE PRODUCT ISN’T" highlight="THE WHOLE STORY." copy="The right collaboration combines creator personality, product relevance and a visual idea that feels native to the audience." />
            <div className="mt-9 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {['RIGHT FACE', 'RIGHT FORMAT', 'RIGHT MOMENT'].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4">
                  <p className="text-[9px] font-semibold tracking-[.2em] text-white/25">0{i + 1}</p>
                  <p className="mt-2 text-xs font-bold tracking-[.12em] text-white/75">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
            <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#FF3D8D]/20" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: 'linear' }} />
            <motion.div aria-hidden="true" className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05]" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 34, repeat: Infinity, ease: 'linear' }} />
            <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#10131D] shadow-[0_0_90px_rgba(255,61,141,.18)]">
              <div className="text-center"><Users size={32} className="mx-auto text-[#FF6AA7]" /><p className="mt-3 text-[10px] font-semibold tracking-[.18em] text-white/45">CREATOR × BRAND</p></div>
            </div>
            {[
              { label: 'AUTHENTIC', x: '8%', y: '10%', rotate: -7, color: '#FF6AA7' },
              { label: 'RELEVANT', x: '64%', y: '16%', rotate: 7, color: '#B48AFF' },
              { label: 'SHAREABLE', x: '5%', y: '68%', rotate: 6, color: '#FF8A78' },
              { label: 'MEMORABLE', x: '65%', y: '70%', rotate: -6, color: '#AAB7FF' },
            ].map((card, i) => (
              <motion.div key={card.label} className="absolute w-36 rounded-2xl border border-white/10 bg-[#0B0E16]/90 p-4 shadow-2xl backdrop-blur-xl" style={{ left: card.x, top: card.y }} animate={reduceMotion ? undefined : { y: [0, i % 2 ? -10 : 10, 0], rotate: [card.rotate, card.rotate * .5, card.rotate] }} transition={{ duration: 5.5 + i * .5, repeat: Infinity, ease: 'easeInOut' }}>
                <div className="h-1.5 w-10 rounded-full" style={{ background: card.color }} /><p className="mt-4 text-[10px] font-bold tracking-[.17em] text-white/70">{card.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/80 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="WAYS TO COLLABORATE" title="MORE THAN A" highlight="SHOUTOUT" align="center" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {influencerOfferings.map((item, i) => (
              <TiltSurface key={item.title} className="h-full">
                <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="h-full rounded-[26px] border border-white/7 bg-[#10131D] p-6">
                  <item.icon size={22} className="text-[#FF6AA7]" /><p className="mt-7 text-[9px] font-semibold tracking-[.2em] text-white/22">COLLAB / 0{i + 1}</p><h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{item.desc}</p>
                </motion.div>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="COLLAB FLOW" title="BRIEF TO" highlight="PUBLISHED MOMENT" align="center" />
          <div className="mx-auto mt-14 max-w-4xl">
            {['Understand the brand and desired audience', 'Shape the creator angle and content idea', 'Script the hook, product moment and CTA', 'Shoot / create with a native social feel', 'Publish, repost and review performance'].map((step, i) => (
              <motion.div key={step} initial={{ opacity: 0, x: i % 2 ? 30 : -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="group flex gap-5 border-b border-white/[0.06] py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[10px] font-bold text-[#FF6AA7]">0{i + 1}</div><p className="pt-2 text-sm text-[#A9ACB8] transition group-hover:text-white">{step}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 text-center"><Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">BOOK INFLUENCER COLLAB <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </div>
  );
}

const socialServices = [
  { title: 'Strategy Development', desc: 'A clear direction for what the brand should say, show and repeat.' },
  { title: 'Content Planning', desc: 'Themes, formats and calendar thinking so content stops feeling random.' },
  { title: 'Content Creation', desc: 'Reels, posts, stories and visual systems built around the plan.' },
  { title: 'Posting & Scheduling', desc: 'Consistent publishing with a cleaner operational rhythm.' },
  { title: 'Brand Consistency', desc: 'A recognisable visual and verbal personality across the feed.' },
  { title: 'Audience Engagement', desc: 'Human interaction that keeps the account active beyond posting.' },
  { title: 'Performance Tracking', desc: 'Regular review of what audiences respond to and what to refine.' },
  { title: 'Organic Growth', desc: 'Sustainable creative improvement instead of guaranteed-number promises.' },
];

export function SocialMediaManagement() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="SOCIAL MEDIA MANAGEMENT / CREATIVE SYSTEM"
        lines={['YOUR FEED', 'SHOULD FEEL LIKE']}
        highlight="ONE WORLD."
        description="A strong social presence is not a pile of posts. It is a repeatable visual system — planned, produced and managed with one consistent point of view."
        chips={['STRATEGY', 'CALENDAR', 'CONTENT', 'PUBLISHING', 'REVIEW']}
        primary={{ label: 'BUILD MY SYSTEM', to: '/book' }}
        secondary={{ label: 'VIEW PACKAGES', to: '/packages' }}
        visualLabel="SOCIAL CONTROL ROOM"
        visualTitle="PLAN THE FEEL, NOT JUST THE POST"
        visualSubtitle="Consistency becomes much easier when the brand has a visual language before the calendar fills up."
        accent="coral"
      />

      <CreativeStrip words={['PLAN', 'CREATE', 'POST', 'ENGAGE', 'LEARN', 'REFINE', 'REPEAT']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-8">
          <div className="relative mx-auto h-[520px] w-full max-w-[520px]">
            <motion.div className="absolute left-[7%] top-[6%] w-[68%] overflow-hidden rounded-[28px] border border-white/10 bg-[#10131D] p-5 shadow-[0_35px_90px_rgba(0,0,0,.45)]" animate={reduceMotion ? undefined : { y: [0, -9, 0], rotate: [-3, -1, -3] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="flex items-center justify-between"><p className="text-[9px] font-semibold tracking-[.2em] text-[#FF6AA7]">CONTENT CALENDAR</p><CalendarDays size={16} className="text-white/35" /></div>
              <div className="mt-5 grid grid-cols-4 gap-2">{Array.from({ length: 16 }).map((_, i) => <motion.span key={i} className={`aspect-square rounded-lg border border-white/[0.06] ${[2,5,9,12,15].includes(i) ? 'bg-gradient-to-br from-[#FF5A5F]/45 to-[#8B5CF6]/45' : 'bg-white/[0.025]'}`} animate={reduceMotion || ![2,5,9,12,15].includes(i) ? undefined : { opacity: [.55, 1, .55] }} transition={{ duration: 2.4 + i * .08, repeat: Infinity }} />)}</div>
            </motion.div>
            <motion.div className="absolute bottom-[8%] right-[3%] w-[60%] rounded-[28px] border border-white/10 bg-[#0B0E16]/95 p-5 shadow-[0_35px_90px_rgba(0,0,0,.52)] backdrop-blur-xl" animate={reduceMotion ? undefined : { y: [0, 10, 0], rotate: [4, 2, 4] }} transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="flex items-center justify-between"><p className="text-[9px] font-semibold tracking-[.2em] text-[#B48AFF]">CONTENT PULSE</p><BarChart3 size={15} className="text-white/35" /></div>
              <div className="mt-6 flex h-24 items-end gap-2">{[42,75,58,90,66,82].map((h,i) => <motion.span key={h+i} className="w-full rounded-t-lg bg-gradient-to-t from-[#8B5CF6] to-[#FF5A5F]" animate={reduceMotion ? undefined : { height: [`${h*.55}%`, `${h}%`, `${h*.55}%`] }} transition={{ duration: 2.8 + i*.17, repeat: Infinity, ease: 'easeInOut' }} />)}</div>
            </motion.div>
            <motion.div className="absolute right-[4%] top-[13%] flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#FF3D8D]/12 text-[#FF6AA7] shadow-[0_0_45px_rgba(255,61,141,.18)]" animate={reduceMotion ? undefined : { scale: [1,1.08,1], rotate: [0,8,0] }} transition={{ duration: 4, repeat: Infinity }}><Sparkles size={20} /></motion.div>
          </div>

          <div>
            <SectionTitle eyebrow="THE SOCIAL OPERATING SYSTEM" title="CONSISTENCY WITHOUT" highlight="CREATIVE BOREDOM" copy="A calendar should create rhythm, not sameness. The goal is a recognisable brand that can still surprise people." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {['Brand voice', 'Visual direction', 'Format mix', 'Publishing rhythm'].map((item,i) => <motion.div key={item} initial={{ opacity:0,y:18 }} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}} className="rounded-2xl border border-white/8 bg-white/[0.025] p-4 text-sm text-white/65"><span className="mr-2 text-[#FF6AA7]">0{i+1}</span>{item}</motion.div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/80 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="WHAT GETS MANAGED" title="THE WHOLE" highlight="CONTENT LOOP" align="center" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {socialServices.map((item,i) => <TiltSurface key={item.title} className="h-full"><motion.div initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.045}} className="h-full rounded-[25px] border border-white/7 bg-[#10131D] p-6"><p className="text-[9px] font-bold tracking-[.2em] text-white/20">{String(i+1).padStart(2,'0')}</p><h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{item.desc}</p></motion.div></TiltSurface>)}
          </div>
          <div className="mt-12 text-center"><Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">LET’S MANAGE THE FEED <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </div>
  );
}

const caseStudies = [
  {
    industry: 'FASHION / DEMO',
    title: 'THE 7-DAY DROP',
    challenge: 'Imagine a local fashion store launching a limited collection without looking like another catalogue post.',
    idea: 'Build anticipation through seven connected reel moments: texture, silhouette, creator styling, detail, countdown, reveal and drop-day montage.',
    deliverables: ['3 hero reels', '4 story sequences', 'creator integration', 'launch-day visual system'],
    visual: 'linear-gradient(145deg,#ff4d72 0%,#6b153d 46%,#0a0a0e 100%)',
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

export function CaseStudies() {
  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="CASE STUDIES / DEMO STRATEGY LAB"
        lines={['NOT FAKE RESULTS.', 'REAL CREATIVE']}
        highlight="THINKING DEMOS."
        description="These case studies are intentionally labelled demo scenarios. They show how Reel2Reach could think through a brief — without pretending hypothetical outcomes are real client results."
        chips={['DEMO ONLY', 'NO FAKE METRICS', 'STRATEGY', 'ART DIRECTION']}
        primary={{ label: 'CREATE A REAL CASE', to: '/book' }}
        secondary={{ label: 'VIEW DEMO WORK', to: '/portfolio' }}
        visualLabel="CASE LAB / DEMO"
        visualTitle="CHALLENGE → IDEA → EXECUTION"
        visualSubtitle="A transparent way to show creative thinking before the live case-study library grows."
        accent="pink"
      />

      <CreativeStrip words={['CHALLENGE', 'INSIGHT', 'HOOK', 'DIRECTION', 'SHOOT', 'EDIT', 'LEARN']} />

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="DEMO CASE FILES" title="THREE BRIEFS." highlight="THREE CREATIVE ANSWERS." copy="No fabricated reach, follower growth or sales numbers are shown. These examples demonstrate creative planning only." />
          <div className="mt-14 space-y-8">
            {caseStudies.map((study, index) => (
              <motion.article key={study.title} initial={{ opacity:0,y:50 }} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-8%'}} transition={{duration:.8,delay:index*.08}} className="overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16]">
                <div className="grid lg:grid-cols-[.72fr_1.28fr]">
                  <div className="relative min-h-[340px] overflow-hidden p-7 sm:p-9" style={{background:study.visual}}>
                    <div className="absolute inset-0 cinematic-grid opacity-25" /><motion.div aria-hidden="true" className="absolute -right-16 top-10 h-56 w-56 rounded-full border border-white/20" animate={{rotate:[0,24,0],scale:[1,1.08,1]}} transition={{duration:8+index,repeat:Infinity}} />
                    <div className="relative"><DemoBadge label="DEMO CASE STUDY" /><p className="mt-7 text-[9px] font-semibold tracking-[.22em] text-white/55">{study.industry}</p><h2 className="mt-3 max-w-[10ch] font-[family-name:var(--font-display)] text-4xl font-bold leading-[.9] sm:text-5xl">{study.title}</h2></div>
                    <div className="absolute bottom-7 left-7 flex gap-3 text-white/55"><Heart size={15}/><MessageCircle size={15}/><Share2 size={15}/></div>
                  </div>
                  <div className="p-7 sm:p-9 lg:p-11">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div><p className="text-[10px] font-semibold tracking-[.22em] text-[#FF6AA7]">THE CHALLENGE</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.challenge}</p></div>
                      <div><p className="text-[10px] font-semibold tracking-[.22em] text-[#B48AFF]">THE CREATIVE IDEA</p><p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{study.idea}</p></div>
                    </div>
                    <div className="mt-9 border-t border-white/[0.06] pt-7"><p className="text-[10px] font-semibold tracking-[.22em] text-white/35">POSSIBLE DELIVERABLES</p><div className="mt-4 flex flex-wrap gap-2">{study.deliverables.map((d)=><span key={d} className="rounded-full border border-white/9 bg-white/[0.03] px-3 py-1.5 text-xs text-white/60">{d}</span>)}</div></div>
                    <div className="mt-8 rounded-2xl border border-amber-300/15 bg-amber-300/[0.04] p-4 text-xs leading-relaxed text-amber-100/60"><strong className="text-amber-100/85">Illustrative only.</strong> This scenario demonstrates creative strategy. It does not represent a completed client campaign or measured result.</div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-14 text-center"><Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">TURN YOUR BRIEF INTO THE FIRST REAL CASE <ArrowRight size={16}/></Link></div>
        </div>
      </section>
    </div>
  );
}

function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden pb-20 pt-32">
      <div className="pointer-events-none absolute left-[8%] top-24 h-64 w-64 rounded-full bg-[#FF3D8D]/8 blur-[110px]" />
      <div className="pointer-events-none absolute right-[8%] top-80 h-72 w-72 rounded-full bg-[#8B5CF6]/8 blur-[120px]" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="text-[10px] font-semibold tracking-[.25em] text-[#FF6AA7]">REEL2REACH / LEGAL</motion.p>
        <motion.h1 initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} className="mt-4 font-[family-name:var(--font-display)] text-4xl font-bold sm:text-6xl">{title}</motion.h1>
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{delay:.12}} className="mt-12 space-y-6 rounded-[30px] border border-white/7 bg-[#0B0E16]/80 p-6 text-sm leading-relaxed text-[#A9ACB8] backdrop-blur-xl sm:p-9">{children}</motion.div>
      </div>
    </div>
  );
}

export function Privacy() {
  return <LegalPage title="Privacy Policy"><p>Last updated: {new Date().toLocaleDateString()}</p><h2 className="text-xl font-semibold text-white">Information We Collect</h2><p>When you submit an enquiry through our website, we collect information such as your name, phone number, email address, business name, and any details you choose to provide so we can respond to your request.</p><h2 className="text-xl font-semibold text-white">How We Use Your Information</h2><p>Information is used to respond to enquiries, prepare quotes, communicate about projects and provide Reel2Reach services. We do not sell personal information.</p><h2 className="text-xl font-semibold text-white">Data Storage</h2><p>Enquiry information may be stored in the website’s connected systems and is intended to be accessible only to authorized team members.</p><h2 className="text-xl font-semibold text-white">Contact</h2><p>For privacy-related questions, contact real2reach@gmail.com or +91 8263058461.</p></LegalPage>;
}

export function Terms() {
  return <LegalPage title="Terms & Conditions"><p>Last updated: {new Date().toLocaleDateString()}</p><h2 className="text-xl font-semibold text-white">Services</h2><p>Reel2Reach Media provides video content creation, influencer marketing and social media management. Project-specific deliverables, timelines and pricing should be confirmed in the relevant agreement or quotation.</p><h2 className="text-xl font-semibold text-white">Payment Terms</h2><p>Payment terms depend on the agreed project or package and should be confirmed before work begins.</p><h2 className="text-xl font-semibold text-white">Content Ownership & Portfolio Use</h2><p>Usage rights and portfolio permissions should follow the applicable service agreement. Reel2Reach may request permission to showcase completed work.</p><h2 className="text-xl font-semibold text-white">Results</h2><p>Social media outcomes depend on many factors. Reel2Reach does not guarantee a specific follower count, engagement rate, reach or sales result unless explicitly agreed in writing.</p><h2 className="text-xl font-semibold text-white">Contact</h2><p>For questions about these terms, contact real2reach@gmail.com.</p></LegalPage>;
}

export function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24 text-center">
      <div className="absolute h-[420px] w-[420px] rounded-full bg-[#FF3D8D]/10 blur-[130px]" />
      <motion.div initial={{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} className="relative">
        <motion.p animate={{rotate:[-3,3,-3]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} className="font-[family-name:var(--font-display)] text-[34vw] font-bold leading-none text-white/[0.035] sm:text-[14rem]">404</motion.p>
        <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-[10px] font-semibold tracking-[.28em] text-[#FF6AA7]">WRONG FRAME</p><h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">THIS REEL DOESN’T EXIST.</h1><p className="mt-4 max-w-md text-sm text-[#A9ACB8]">The page moved, disappeared, or never made the final edit.</p><Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-6 py-3 text-sm font-semibold">BACK TO THE FEED <ArrowRight size={16}/></Link></div>
      </motion.div>
    </div>
  );
}
