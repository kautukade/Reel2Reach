import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, BarChart3, Check, Globe, Megaphone, Palette, Sparkles, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ArtHero, CreativeStrip, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';
import { useDemoCmsRows } from '../lib/useDemoCms';

const defaultPackages = [
  {
    name: 'Basic Plan',
    price: '₹4,999',
    priceSuffix: '',
    kicker: 'ONE STRONG MOMENT',
    description: 'A focused reel package for a brand that wants one polished creator-led content piece.',
    features: ['1 Reel (30–60 seconds)', 'Shot with an influencer', 'Scripted, directed and edited by the team', 'Caption + Hashtags + CTA', 'Story repost on influencer account', 'Influencer collaboration'],
    cta: 'START WITH ONE REEL',
    ctaUrl: '/book',
    recommended: false,
    accent: 'linear-gradient(145deg,#ff7a59 0%,#ff3d8d 52%,#171018 100%)',
  },
  {
    name: 'Combo Plan',
    price: '₹14,999',
    priceSuffix: '/month',
    kicker: 'A MONTH OF MOMENTUM',
    description: 'A monthly content rhythm with reels, designed posts, strategy and influencer amplification.',
    features: ['4 Reels (1 per week)', 'Influencer + product integration', 'Edited + scripted + trending theme', '10–15 Instagram posts', 'Static + carousel + quote templates', 'Content strategy & calendar', 'Influencer reposting 2–3x', 'Analytics report at the end of month'],
    cta: 'BUILD THE MONTH',
    ctaUrl: '/book',
    recommended: true,
    accent: 'linear-gradient(145deg,#8b5cf6 0%,#ff3d8d 48%,#101225 100%)',
  },
  {
    name: 'Custom Growth Plan',
    price: 'Custom Quote',
    priceSuffix: '',
    kicker: 'NO TEMPLATE REQUIRED',
    description: 'For brands that need a tailored mix of content, collaboration, direction and ongoing support.',
    features: ['Tailored to your specific needs', 'Full campaign management', 'Dedicated creative direction', 'Multi-platform strategy', 'Priority support & revisions', 'Monthly performance reporting', 'Custom influencer partnerships', 'Brand growth roadmap'],
    cta: 'BUILD MY PACKAGE',
    ctaUrl: '/book',
    recommended: false,
    accent: 'linear-gradient(145deg,#3a69ff 0%,#8b5cf6 45%,#101421 100%)',
  },
];

const defaultAddons = [
  { icon: Megaphone, title: 'Paid Ads Setup & Boost', desc: 'Inorganic marketing and paid promotion setup.' },
  { icon: Globe, title: 'Social Media Management', desc: 'Full-time account handling and content management.' },
  { icon: Target, title: 'Google My Business Registration', desc: 'Business profile setup for local digital visibility.' },
  { icon: BarChart3, title: 'Instagram Audit & Strategy Session', desc: 'A focused review of the account and content direction.' },
  { icon: Palette, title: 'Logo + Branding Design', desc: 'Visual identity support for brands that need a cleaner foundation.' },
];

type PackageRow = {
  name: string;
  price?: number | null;
  price_suffix?: string;
  description?: string;
  features?: string[];
  cta_text?: string;
  cta_url?: string;
  recommended?: boolean;
  status?: string;
};

type AddonRow = { name: string; description?: string; icon?: string; status?: string };

const addonIcons: Record<string, typeof Megaphone> = {
  megaphone: Megaphone,
  globe: Globe,
  target: Target,
  chart: BarChart3,
  palette: Palette,
};

export default function Packages() {
  const reduceMotion = useReducedMotion();
  const { rows: packageRows, loaded: packagesLoaded } = useDemoCmsRows<PackageRow>('packages');
  const { rows: addonRows, loaded: addonsLoaded } = useDemoCmsRows<AddonRow>('addons');

  const packages = useMemo(() => {
    const published = packageRows.filter((row) => row.status !== 'draft');
    if (!packagesLoaded || published.length === 0) return defaultPackages;
    return published.map((row, index) => {
      const visual = defaultPackages[index % defaultPackages.length];
      return {
        name: row.name,
        price: row.price === null || row.price === undefined || Number.isNaN(Number(row.price)) ? 'Custom Quote' : `₹${Number(row.price).toLocaleString('en-IN')}`,
        priceSuffix: row.price_suffix || '',
        kicker: visual.kicker,
        description: row.description || visual.description,
        features: Array.isArray(row.features) && row.features.length ? row.features : visual.features,
        cta: row.cta_text || visual.cta,
        ctaUrl: row.cta_url || '/book',
        recommended: Boolean(row.recommended),
        accent: visual.accent,
      };
    });
  }, [packageRows, packagesLoaded]);

  const addons = useMemo(() => {
    const published = addonRows.filter((row) => row.status !== 'draft');
    if (!addonsLoaded || published.length === 0) return defaultAddons;
    return published.map((row, index) => ({
      icon: addonIcons[String(row.icon || '').toLowerCase()] || defaultAddons[index % defaultAddons.length].icon,
      title: row.name,
      desc: row.description || defaultAddons[index % defaultAddons.length].desc,
    }));
  }, [addonRows, addonsLoaded]);

  const heroChips = packages.slice(0, 3).map((pkg) => `${pkg.price} ${pkg.name.replace(/plan/gi, '').trim().toUpperCase()}`);

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="PACKAGES / CHOOSE YOUR CREATIVE RHYTHM"
        lines={['START WITH A', 'REEL. BUILD INTO']}
        highlight="A PRESENCE."
        description="Three ways to enter the Reel2Reach world — from a focused one-reel collaboration to a custom content system shaped around the brand."
        chips={heroChips}
        primary={{ label: 'BOOK A COLLAB', to: '/book' }}
        secondary={{ label: 'SEE SERVICES', to: '/services' }}
        visualLabel="PACKAGE / COMBO"
        visualTitle="FOUR REELS. ONE VISUAL RHYTHM."
        visualSubtitle="A monthly package works best when every post feels connected instead of individually random."
        accent="purple"
      />

      <CreativeStrip words={['CONCEPT', 'SCRIPT', 'SHOOT', 'EDIT', 'POSTS', 'CALENDAR', 'REPORT']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.1]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="THE PACKAGES" title="PICK THE SCALE." highlight="KEEP THE STANDARD." copy="The visual treatment changes with the brand. The care in scripting, shooting and editing does not." align="center" />

          <div className="mt-16 grid gap-7 lg:grid-cols-3 lg:items-stretch">
            {packages.map((pkg, index) => (
              <TiltSurface key={`${pkg.name}-${index}`} className={`h-full ${pkg.recommended ? 'lg:-translate-y-4' : ''}`}>
                <motion.article
                  initial={{ opacity: 0, y: 46 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: .8, delay: index * .08 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border p-7 sm:p-8 ${pkg.recommended ? 'border-[#FF3D8D]/35 bg-[#10111c] shadow-[0_34px_100px_rgba(255,61,141,.12)]' : 'border-white/8 bg-[#0B0E16]'}`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-35" style={{ background: pkg.accent }} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0E16]/70 to-[#0B0E16]" />
                  {pkg.recommended && (
                    <motion.div
                      className="absolute -right-14 top-8 h-44 w-44 rounded-full border border-white/20"
                      animate={reduceMotion ? undefined : { rotate: [0, 24, 0], scale: [1, 1.08, 1] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div><p className="text-[9px] font-semibold tracking-[.22em] text-white/40">{pkg.kicker}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold">{pkg.name}</h2></div>
                      {pkg.recommended && <span className="rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-3 py-1 text-[9px] font-bold tracking-[.16em]">MOST POPULAR</span>}
                    </div>

                    <div className="mt-7 flex items-end gap-2"><span className="font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">{pkg.price}</span>{pkg.priceSuffix && <span className="pb-1 text-xs text-[#A9ACB8]">{pkg.priceSuffix}</span>}</div>
                    <p className="mt-5 text-sm leading-relaxed text-[#A9ACB8]">{pkg.description}</p>

                    <div className="my-7 h-px bg-white/[0.07]" />
                    <ul className="space-y-3.5">
                      {pkg.features.map((feature, featureIndex) => (
                        <motion.li key={`${feature}-${featureIndex}`} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: .15 + featureIndex * .035 }} className="flex items-start gap-3 text-sm text-[#A9ACB8]">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#FF3D8D]/20 bg-[#FF3D8D]/8 text-[#FF6AA7]"><Check size={11} /></span><span>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-9"><Link to={pkg.ctaUrl} className={`group/cta flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition ${pkg.recommended ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] shadow-[0_16px_45px_rgba(255,61,141,.18)] hover:-translate-y-0.5' : 'border border-white/14 bg-white/[0.03] hover:bg-white/[0.07]'}`}>{pkg.cta}<ArrowRight size={15} className="transition-transform group-hover/cta:translate-x-1" /></Link></div>
                  </div>
                  {pkg.recommended && <div className="pointer-events-none absolute -inset-x-4 top-[-25%] h-20 rotate-12 bg-gradient-to-b from-transparent via-white/18 to-transparent blur-xl transition-all duration-1000 group-hover:top-[115%]" />}
                </motion.article>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/85 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="ADD-ONS FROM THE REEL2REACH OFFER" title="ADD WHAT THE" highlight="BRAND ACTUALLY NEEDS" copy="Keep the core package focused, then add support where the brand needs more reach, consistency or identity work." />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {addons.map((addon, index) => (
              <TiltSurface key={`${addon.title}-${index}`} className="h-full">
                <motion.article initial={{ opacity:0,y:26 }} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.055}} className="h-full rounded-[25px] border border-white/7 bg-[#10131D] p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#FF6AA7]"><addon.icon size={20}/></div><p className="mt-6 text-[9px] font-semibold tracking-[.2em] text-white/22">ADD / {String(index + 1).padStart(2, '0')}</p><h3 className="mt-2 font-[family-name:var(--font-display)] text-base font-bold leading-tight">{addon.title}</h3><p className="mt-3 text-xs leading-relaxed text-[#A9ACB8]">{addon.desc}</p>
                </motion.article>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-28 lg:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF3D8D]/8 blur-[140px]" />
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <Sparkles size={26} className="mx-auto text-[#FF6AA7]" />
          <motion.h2 initial={{opacity:0,scale:.94}} whileInView={{opacity:1,scale:1}} viewport={{once:true}} className="mt-6 font-[family-name:var(--font-display)] text-4xl font-bold leading-[.95] sm:text-6xl lg:text-7xl">A PACKAGE IS A START.<br /><span className="gradient-text gradient-text-live">THE IDEA MAKES IT YOURS.</span></motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#A9ACB8] sm:text-base">Tell us the product, audience and goal. We can recommend which package or custom direction makes the most sense.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3"><Link to="/book" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-7 py-3.5 text-sm font-semibold">DISCUSS MY BRAND <ArrowRight size={16}/></Link><a href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%20I%20want%20to%20know%20more%20about%20your%20packages." target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/14 bg-white/[0.03] px-7 py-3.5 text-sm font-semibold">ASK ON WHATSAPP</a></div>
        </div>
      </section>
    </div>
  );
}
