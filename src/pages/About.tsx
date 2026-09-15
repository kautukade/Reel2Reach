import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Eye, Heart, Sparkles, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';

const values = [
  { icon: Eye, title: 'Seen Differently', desc: 'Visual ideas built to interrupt familiar scrolling patterns without becoming noisy.' },
  { icon: Target, title: 'Made With Intent', desc: 'Every frame, hook and transition has a job — attract, explain, connect or convert.' },
  { icon: Heart, title: 'Human First', desc: 'Creator-led storytelling that feels like content people choose to watch, not an ad they skip.' },
  { icon: Zap, title: 'Built For Motion', desc: 'Ideas are designed for movement from day one: reels, product moments, BTS and social-native edits.' },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="ABOUT / REEL2REACH MEDIA"
        lines={['WE DON’T MAKE', 'CONTENT TO FILL']}
        highlight="A FEED."
        description="We build social-first visual stories for small businesses and growing brands — combining reel direction, creator energy and a strong visual point of view."
        chips={['CREATIVE DIRECTION', 'REELS', 'INFLUENCER CONTENT', 'SOCIAL STORYTELLING']}
        primary={{ label: 'WORK WITH US', to: '/book' }}
        secondary={{ label: 'SEE OUR WORK', to: '/portfolio' }}
        visualLabel="BEHIND THE IDEA"
        visualTitle="STORY BEFORE STYLE"
        visualSubtitle="A good visual earns attention. A good story gives people a reason to stay."
        accent="purple"
      />

      <CreativeStrip words={['IDEA', 'FRAME', 'MOTION', 'PERSONALITY', 'STORY', 'ATTENTION']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="pointer-events-none absolute left-[6%] top-[14%] h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -40, rotateY: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[520px] w-full max-w-[460px]"
            style={{ perspective: 1200 }}
          >
            <motion.div
              className="absolute left-[8%] top-[8%] h-[76%] w-[70%] overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0E16] shadow-[0_40px_100px_rgba(0,0,0,.45)]"
              animate={reduceMotion ? undefined : { rotate: [-4, -1, -4], y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,90,95,.36),transparent_25%),radial-gradient(circle_at_70%_45%,rgba(139,92,246,.34),transparent_30%),linear-gradient(160deg,#161120,#080a10)]" />
              <div className="absolute inset-0 cinematic-grid opacity-20" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07090F] to-transparent p-6 pt-24">
                <p className="text-[10px] font-semibold tracking-[.24em] text-[#FF6AA7]">STUDIO NOTE / 01</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold leading-none">MAKE IT FEEL<br />LIKE SOMETHING.</p>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[3%] right-[4%] w-[58%] rounded-[28px] border border-white/10 bg-[#0B0E16]/90 p-5 shadow-[0_28px_80px_rgba(0,0,0,.5)] backdrop-blur-xl"
              animate={reduceMotion ? undefined : { y: [0, 9, 0], rotate: [5, 2.5, 5] }}
              transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold tracking-[.22em] text-[#B48AFF]">EDIT / RHYTHM</span>
                <Sparkles size={14} className="text-[#FF6AA7]" />
              </div>
              <div className="mt-5 flex h-20 items-end gap-1.5">
                {[35, 72, 48, 88, 57, 76, 42, 64].map((height, i) => (
                  <motion.span
                    key={height + i}
                    className="w-full rounded-full bg-gradient-to-t from-[#8B5CF6] to-[#FF5A5F]"
                    animate={reduceMotion ? undefined : { height: [`${height * .55}%`, `${Math.min(100, height + 12)}%`, `${height * .55}%`] }}
                    transition={{ duration: 2.2 + i * .11, repeat: Infinity, ease: 'easeInOut' }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>

          <div>
            <SectionTitle
              eyebrow="WHY REEL2REACH EXISTS"
              title="LOCAL BRANDS HAVE"
              highlight="BIG STORIES TOO."
              copy="The idea is simple: good products deserve better presentation. Reel2Reach turns everyday business moments into visually strong, emotionally clear content made for Instagram-first audiences."
            />
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-[#A9ACB8] sm:text-base">
              <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                We start with the brand, not the trend. What should people feel? What should they remember? What should they do next? Then we shape the hook, visual language, shot style and edit around that answer.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .08 }}>
                That gives each project its own personality instead of forcing every client into the same template.
              </motion.p>
            </div>
            <Link to="/book" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
              Build something original <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/75 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="THE CREATIVE CODE" title="WHAT DRIVES" highlight="THE WORK" align="center" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <TiltSurface key={value.title} className="h-full">
                <motion.article
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * .08 }}
                  className="group relative h-full overflow-hidden rounded-[28px] border border-white/8 bg-[#10131D] p-6"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#FF3D8D]/8 blur-3xl transition group-hover:bg-[#8B5CF6]/14" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#FF6AA7]">
                    <value.icon size={22} />
                  </div>
                  <p className="mt-8 text-[10px] font-semibold tracking-[.22em] text-white/30">0{index + 1}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A9ACB8]">{value.desc}</p>
                </motion.article>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 lg:py-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,61,141,.10),transparent_45%)]" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-[10px] font-semibold tracking-[.28em] text-[#FF6AA7]">OUR PHILOSOPHY</motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: .92, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: .9 }}
            className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[.95] sm:text-6xl lg:text-8xl"
          >
            LOOK GOOD.<br />FEEL REAL.<br /><span className="gradient-text gradient-text-live">STAY REMEMBERED.</span>
          </motion.h2>
          <p className="mx-auto mt-7 max-w-2xl text-sm leading-relaxed text-[#A9ACB8] sm:text-base">
            Style gets the first glance. Personality gets the second. Our goal is to create both.
          </p>
        </div>
      </section>
    </div>
  );
}
