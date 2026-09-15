import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Camera, Edit, Film, Globe, Layers, MessageSquare, Mic, PenTool, Play, ShoppingBag, Sparkles, Users, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';
import { useDemoCmsRows } from '../lib/useDemoCms';

const defaultMainServices = [
  {
    num: '01',
    title: 'Video Content Creation',
    copy: 'Reels, product stories, testimonials, BTS and cinematic short-form content designed from hook to final frame.',
    icon: Video,
    link: '/portfolio',
    accent: 'linear-gradient(145deg,#ff5a5f 0%,#ff3d8d 48%,#21111e 100%)',
    tag: 'SHOOT / EDIT / STORY',
  },
  {
    num: '02',
    title: 'Influencer Marketing',
    copy: 'Creator-led campaigns, shoutouts and product integrations that give a brand a face, personality and native social context.',
    icon: Users,
    link: '/influencer-marketing',
    accent: 'linear-gradient(145deg,#8b5cf6 0%,#ff3d8d 52%,#101225 100%)',
    tag: 'COLLAB / REACH / TRUST',
  },
  {
    num: '03',
    title: 'Social Media Management',
    copy: 'A consistent visual system across planning, posting and content direction so the brand feels intentional every time it appears.',
    icon: BarChart3,
    link: '/social-media-management',
    accent: 'linear-gradient(145deg,#ff7a59 0%,#8b5cf6 52%,#111522 100%)',
    tag: 'PLAN / PUBLISH / GROW',
  },
];

const serviceIconMap: Record<string, typeof Video> = {
  film: Film,
  video: Video,
  users: Users,
  globe: Globe,
  chart: BarChart3,
  barchart: BarChart3,
  camera: Camera,
};

const videoServices = [
  { icon: Film, title: 'Instagram Reels', desc: 'Short-form concepts built around the first three seconds.' },
  { icon: Edit, title: 'Reel Editing', desc: 'Pacing, transitions, typography and sound-led editing.' },
  { icon: Sparkles, title: 'Hook-Based Content', desc: 'Openings designed to earn the next second of attention.' },
  { icon: ShoppingBag, title: 'Product Videos', desc: 'Product-first visuals with movement, texture and detail.' },
  { icon: MessageSquare, title: 'Testimonial Reels', desc: 'Human stories shaped into clear social proof.' },
  { icon: Camera, title: 'Behind-the-Scenes', desc: 'Natural moments that make a brand feel more human.' },
  { icon: Mic, title: 'Voiceover Reels', desc: 'Narrative edits built around a strong spoken story.' },
  { icon: PenTool, title: 'Scripted Reels', desc: 'Structured hooks, beats and CTAs before the camera rolls.' },
  { icon: Layers, title: 'Aesthetic / POV', desc: 'Mood-led, perspective-driven formats made for mobile.' },
  { icon: Video, title: 'Transition Reels', desc: 'Movement-based reveals and satisfying visual changes.' },
  { icon: Film, title: 'Cinematic Reels', desc: 'Higher-production visual storytelling for hero moments.' },
];

const process = ['BRIEF', 'IDEA', 'SCRIPT', 'SHOT LIST', 'SHOOT', 'EDIT', 'PUBLISH'];

type ServiceRow = { title: string; description?: string; category?: string; icon?: string; status?: string };

function routeForService(title: string, fallback: string) {
  const value = title.toLowerCase();
  if (value.includes('influencer')) return '/influencer-marketing';
  if (value.includes('social')) return '/social-media-management';
  if (value.includes('video') || value.includes('reel') || value.includes('content')) return '/portfolio';
  return fallback;
}

export default function Services() {
  const reduceMotion = useReducedMotion();
  const { rows: cmsRows, loaded } = useDemoCmsRows<ServiceRow>('services');

  const mainServices = useMemo(() => {
    const published = cmsRows.filter((row) => row.status !== 'draft');
    if (!loaded || published.length === 0) return defaultMainServices;
    return published.map((row, index) => {
      const visual = defaultMainServices[index % defaultMainServices.length];
      return {
        num: String(index + 1).padStart(2, '0'),
        title: row.title,
        copy: row.description || visual.copy,
        icon: serviceIconMap[String(row.icon || '').toLowerCase()] || visual.icon,
        link: routeForService(row.title, visual.link),
        accent: visual.accent,
        tag: row.category ? row.category.toUpperCase() : visual.tag,
      };
    });
  }, [cmsRows, loaded]);

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="SERVICES / CREATIVE MENU"
        lines={['NOT A MENU OF', 'TASKS. A MENU OF']}
        highlight="POSSIBILITIES."
        description="From one scroll-stopping reel to a complete social presence, we shape the idea, visual language and execution around what the brand needs to say."
        chips={mainServices.slice(0, 4).map((service) => service.title.toUpperCase())}
        primary={{ label: 'START A PROJECT', to: '/book' }}
        secondary={{ label: 'VIEW PACKAGES', to: '/packages' }}
        visualLabel="SERVICE / 01"
        visualTitle="MOTION WITH A JOB"
        visualSubtitle="Creative should look beautiful — and make the message easier to feel."
        accent="coral"
      />

      <CreativeStrip words={['HOOK', 'SCRIPT', 'SHOOT', 'EDIT', 'COLLAB', 'PUBLISH', 'REPEAT']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.11]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="WAYS TO WORK TOGETHER"
            title="CHOOSE THE"
            highlight="CREATIVE ENGINE"
            copy="Each service has a different purpose, but the visual standard stays the same: intentional, social-native and made to feel current without chasing every trend."
          />

          <div className="mt-14 space-y-6">
            {mainServices.map((service, index) => (
              <motion.article
                key={`${service.title}-${index}`}
                initial={{ opacity: 0, y: 54 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ duration: .8, delay: index * .08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-[32px] border border-white/8 bg-[#0B0E16] p-6 sm:p-8 lg:p-10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(circle at 78% 50%, ${index % 3 === 1 ? 'rgba(139,92,246,.12)' : 'rgba(255,61,141,.10)'}, transparent 32%)` }} />
                <div className="relative grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-center">
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white/[0.07] sm:text-7xl">{service.num}</span>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#FF6AA7]">
                        <service.icon size={22} />
                      </div>
                    </div>
                    <p className="mt-6 text-[10px] font-semibold tracking-[.24em] text-[#FF6AA7]">{service.tag}</p>
                    <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl lg:text-5xl">{service.title}</h2>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#A9ACB8] sm:text-base">{service.copy}</p>
                    <Link to={service.link} className="group/link mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">
                      Explore service <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>

                  <TiltSurface>
                    <div className="relative mx-auto aspect-[16/10] w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,.42)]" style={{ background: service.accent }}>
                      <div className="absolute inset-0 cinematic-grid opacity-25" />
                      <motion.div
                        aria-hidden="true"
                        className="absolute -right-14 top-10 h-44 w-44 rounded-full border border-white/20"
                        animate={reduceMotion ? undefined : { rotate: [0, 18, 0], scale: [1, 1.08, 1] }}
                        transition={{ duration: 7 + index, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/15 backdrop-blur-lg">
                        <Play size={17} fill="currentColor" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#07090F]/90 via-[#07090F]/28 to-transparent p-6 pt-20">
                        <p className="text-[9px] font-semibold tracking-[.22em] text-white/50">REEL2REACH / {service.num}</p>
                        <p className="mt-2 max-w-[12ch] font-[family-name:var(--font-display)] text-2xl font-bold leading-[.95]">VISUALS THAT MOVE THE MESSAGE.</p>
                      </div>
                    </div>
                  </TiltSurface>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/80 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="VIDEO CONTENT LAB"
            title="FORMATS ARE TOOLS."
            highlight="THE IDEA COMES FIRST."
            copy="These are the building blocks we can combine into a content system that fits the brand instead of looking like everyone else."
            align="center"
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videoServices.map((service, index) => (
              <TiltSurface key={service.title} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * .04 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/7 bg-[#10131D] p-5"
                >
                  <div className="pointer-events-none absolute -right-10 -top-12 h-28 w-28 rounded-full bg-[#FF3D8D]/0 blur-2xl transition group-hover:bg-[#FF3D8D]/14" />
                  <div className="flex items-start justify-between">
                    <service.icon size={20} className="text-[#FF6AA7]" />
                    <span className="text-[9px] font-semibold tracking-[.2em] text-white/20">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-7 font-[family-name:var(--font-display)] text-lg font-bold">{service.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#A9ACB8]">{service.desc}</p>
                </motion.div>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 lg:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8B5CF6]/8 blur-[130px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="FROM NOTHING TO SOMETHING" title="THE CREATIVE" highlight="PIPELINE" align="center" />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-white/8 lg:block" />
            <motion.div
              className="absolute left-0 top-5 hidden h-px bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] lg:block"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-7">
              {process.map((step, index) => (
                <motion.div key={step} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .09 }} className="relative text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#0B0E16] text-[10px] font-bold text-[#FF6AA7] shadow-[0_0_35px_rgba(255,61,141,.12)]">0{index + 1}</div>
                  <p className="mt-4 text-[10px] font-semibold tracking-[.18em] text-white/55">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[34px] border border-white/8 bg-[#0B0E16] px-6 py-16 text-center sm:px-10 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,61,141,.15),transparent_45%)]" />
          <motion.h2 initial={{ opacity: 0, scale: .95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative font-[family-name:var(--font-display)] text-3xl font-bold sm:text-5xl">GOT A WEIRD IDEA?<br /><span className="gradient-text gradient-text-live">GOOD. LET’S BUILD IT.</span></motion.h2>
          <p className="relative mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#A9ACB8]">The most interesting projects usually start with something that does not fit neatly inside a package.</p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/book" className="rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3 text-sm font-semibold">BOOK A COLLABORATION</Link>
            <Link to="/portfolio" className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold">SEE DEMO CONCEPTS</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
