import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Users, BarChart3, Sparkles, Camera, Palette, Calendar, TrendingUp, Globe, Megaphone, Target, Film, Edit, ShoppingBag, MessageSquare, Mic, PenTool, Layers, Play } from 'lucide-react';
import { useRef } from 'react';
import TextReveal from '../motion/TextReveal';
import Reveal from '../motion/Reveal';
import TiltCard from '../motion/TiltCard';
import SpotlightCard from '../motion/SpotlightCard';

const services = [
  {
    number: '01',
    title: 'Video Content Creation',
    description: 'Professional reels, product videos, cinematic content & hook-based storytelling that stops the scroll.',
    icon: Video,
    link: '/services',
    gradient: 'from-[#FF5A5F] to-[#FF3D8D]',
  },
  {
    number: '02',
    title: 'Influencer Shoutouts',
    description: 'Strategic influencer collaborations, brand shoutouts & paid promotions to amplify your reach.',
    icon: Users,
    link: '/influencer-marketing',
    gradient: 'from-[#FF3D8D] to-[#8B5CF6]',
  },
  {
    number: '03',
    title: 'Social Media Management',
    description: 'Complete social media handling — strategy, content calendar, posting, engagement & growth.',
    icon: BarChart3,
    link: '/social-media-management',
    gradient: 'from-[#8B5CF6] to-[#FF5A5F]',
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold">
              WHAT WE <span className="gradient-text">DO</span>
            </h2>
          </TextReveal>
          <Reveal delay={0.2}>
            <p className="text-[#A9ACB8] mt-4 max-w-2xl mx-auto">
              We create content that doesn't just look good — it performs. Every reel, every post, every campaign is built to grow your brand.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.15}>
              <TiltCard maxTilt={3}>
                <SpotlightCard className="h-full">
                  <Link
                    to={service.link}
                    className="group relative block p-8 rounded-2xl bg-[#0B0E16] border border-white/5 hover:border-white/10 transition-all duration-500 h-full overflow-hidden"
                  >
                    <div className="relative">
                      <motion.span
                        initial={{ opacity: 0.3 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-[#A9ACB8]/30 font-[family-name:var(--font-display)] text-5xl font-bold"
                      >
                        {service.number}
                      </motion.span>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mt-4 mb-4`}
                      >
                        <service.icon size={22} className="text-white" />
                      </motion.div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-[#A9ACB8] text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                        <span className="text-sm font-medium">Explore</span>
                        <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </SpotlightCard>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MarqueeSection() {
  const items = ['REELS', 'STORIES', 'CONTENT', 'BRANDING', 'INFLUENCERS', 'SOCIAL', 'GROWTH', 'STRATEGY', 'CREATIVE', 'ENGAGEMENT'];
  
  return (
    <div className="py-8 border-y border-white/5 overflow-hidden">
      <div className="space-y-3">
        {/* Top row - left to right */}
        <div className="animate-marquee whitespace-nowrap flex">
          {[...items, ...items].map((item, i) => (
            <span key={i} className={`mx-8 text-sm font-medium uppercase tracking-widest ${i % 2 === 0 ? 'text-[#A9ACB8]/40' : 'text-transparent bg-clip-text bg-gradient-to-r from-[#FF5A5F] to-[#8B5CF6]'}`}>
              {item} <span className="text-[#FF3D8D]/40 mx-4">•</span>
            </span>
          ))}
        </div>
        {/* Bottom row - right to left */}
        <div className="animate-marquee-reverse whitespace-nowrap flex">
          {[...items, ...items].map((item, i) => (
            <span key={i} className={`mx-8 text-sm font-medium uppercase tracking-widest ${i % 2 === 0 ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#FF5A5F]' : 'text-[#A9ACB8]/40'}`}>
              {item} <span className="text-[#FF3D8D]/40 mx-4">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function EditorialSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const createOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const createScale = useTransform(scrollYProgress, [0.2, 0.4], [0.8, 1]);
  const influenceX = useTransform(scrollYProgress, [0.3, 0.5], [-100, 0]);
  const influenceOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const growScale = useTransform(scrollYProgress, [0.5, 0.7], [1.5, 1]);
  const growOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <section ref={ref} className="py-24 lg:py-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF3D8D]/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <motion.h2
            style={{ opacity: createOpacity, scale: createScale }}
            className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-9xl font-bold text-white"
          >
            CREATE.
          </motion.h2>
          <motion.h2
            style={{ x: influenceX, opacity: influenceOpacity }}
            className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-9xl font-bold gradient-text"
          >
            INFLUENCE.
          </motion.h2>
          <motion.h2
            style={{ scale: growScale, opacity: growOpacity }}
            className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl lg:text-9xl font-bold text-white"
          >
            GROW.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    { num: '01', title: 'Brand Brief', desc: 'Understanding your vision, goals & audience' },
    { num: '02', title: 'Concept', desc: 'Creative ideation & content strategy' },
    { num: '03', title: 'Script', desc: 'Crafting hooks, narratives & CTAs' },
    { num: '04', title: 'Shoot', desc: 'Professional production & direction' },
    { num: '05', title: 'Edit', desc: 'Polished editing, effects & sound' },
    { num: '06', title: 'Publish', desc: 'Strategic posting & optimization' },
    { num: '07', title: 'Grow', desc: 'Analytics, insights & iteration' },
  ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="py-20 lg:py-32 bg-[#0B0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold">
              FROM IDEA<br /><span className="gradient-text">TO IMPACT.</span>
            </h2>
          </TextReveal>
        </div>

        <div className="relative">
          {/* Animated progress line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              style={{ width: lineWidth }}
              className="h-full bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6]"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.1}>
                <div className="text-center relative">
                  <motion.div
                    whileInView={{ scale: [0.8, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center mb-4 relative z-10"
                  >
                    <span className="text-white text-xs font-bold">{step.num}</span>
                  </motion.div>
                  <h4 className="font-semibold text-sm mb-1">{step.title}</h4>
                  <p className="text-[#A9ACB8] text-xs leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function PortfolioPreview() {
  const placeholders = [
    { gradient: 'from-[#FF5A5F] to-[#FF3D8D]', label: 'Fashion Reel' },
    { gradient: 'from-[#8B5CF6] to-[#FF3D8D]', label: 'Product Video' },
    { gradient: 'from-[#FF3D8D] to-[#FF5A5F]', label: 'Brand Story' },
    { gradient: 'from-[#8B5CF6] to-[#FF5A5F]', label: 'Lifestyle Content' },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold">
              DON'T TAKE OUR WORD FOR IT.<br />
              <span className="gradient-text">WATCH OUR WORK.</span>
            </h2>
          </TextReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {placeholders.map((item, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${item.gradient} opacity-60`} />
                <div className="absolute inset-0 bg-[#07090F]/30 group-hover:bg-[#07090F]/10 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="text-white text-sm font-medium">{item.label}</span>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles size={14} className="text-white" />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Reveal>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
            >
              View All Work <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function MetricsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0B0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              WE DON'T JUST MAKE REELS.<br />
              <span className="gradient-text">WE MAKE BRANDS REMEMBERED.</span>
            </h2>
          </TextReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Creative Reels', value: '∞', sublabel: 'Ideas to execution' },
            { label: 'Brand Stories', value: '100%', sublabel: 'Authentic content' },
            { label: 'Platforms', value: '3+', sublabel: 'Multi-channel reach' },
            { label: 'Dedication', value: '24/7', sublabel: 'Always creating' },
          ].map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-[#10131D] border border-white/5">
                <p className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-bold gradient-text mb-2">
                  {metric.value}
                </p>
                <p className="text-white font-medium text-sm">{metric.label}</p>
                <p className="text-[#A9ACB8] text-xs mt-1">{metric.sublabel}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PackagesPreview() {
  const packages = [
    {
      name: 'Basic Plan',
      price: '₹4,999',
      features: ['1 Reel (30–60 seconds)', 'Shot with an influencer', 'Scripted, directed & edited', 'Caption + Hashtags + CTA', 'Story repost on influencer account', 'Influencer collaboration'],
      recommended: false,
    },
    {
      name: 'Combo Plan',
      price: '₹14,999',
      features: ['4 Reels (1 per week)', 'Influencer + product integration', 'Edited + scripted + trending', '10–15 Instagram posts', 'Content strategy & calendar', 'Influencer reposting 2–3x', 'Analytics report'],
      recommended: true,
    },
    {
      name: 'Custom Growth',
      price: 'Custom Quote',
      features: ['Tailored to your needs', 'Full campaign management', 'Dedicated team', 'Multi-platform strategy', 'Priority support', 'Monthly reporting'],
      recommended: false,
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#0B0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold">
              PACKAGES THAT<br /><span className="gradient-text">DELIVER RESULTS</span>
            </h2>
          </TextReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.15}>
              <div className={`relative p-8 rounded-2xl border ${
                pkg.recommended
                  ? 'border-[#FF3D8D]/30 bg-gradient-to-b from-[#FF3D8D]/5 to-transparent'
                  : 'border-white/5 bg-[#10131D]'
              }`}>
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-xs font-semibold">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-3xl font-bold mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#A9ACB8]">
                      <span className="text-[#FF3D8D] mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/book"
                  className={`block text-center py-3 rounded-full font-semibold text-sm transition-all ${
                    pkg.recommended
                      ? 'bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white hover:shadow-lg hover:shadow-pink-500/25'
                      : 'border border-white/20 text-white hover:bg-white/5'
                  }`}
                >
                  {pkg.name === 'Custom Growth' ? 'BUILD MY PACKAGE' : 'GET STARTED'}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-10">
          <Reveal>
            <Link to="/packages" className="text-[#A9ACB8] hover:text-white text-sm transition-colors">
              View all packages & add-ons →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function AddonsSection() {
  const addons = [
    { icon: Megaphone, title: 'Paid Ads Setup & Boost', desc: 'Inorganic marketing & paid promotion' },
    { icon: Globe, title: 'Social Media Management', desc: 'Full account handling' },
    { icon: Target, title: 'Google My Business', desc: 'Registration & optimization' },
    { icon: BarChart3, title: 'Instagram Audit', desc: 'Strategy session & analysis' },
    { icon: Palette, title: 'Logo + Branding', desc: 'Design & identity creation' },
    { icon: Camera, title: 'Product Photography', desc: 'Professional product shoots' },
    { icon: Calendar, title: 'Content Calendar', desc: 'Strategic planning & scheduling' },
    { icon: TrendingUp, title: 'Growth Strategy', desc: 'Organic growth planning' },
  ];

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <TextReveal>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold">
              NEED MORE?<br /><span className="gradient-text">SUPERCHARGE YOUR BRAND.</span>
            </h2>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addons.map((addon, i) => (
            <Reveal key={addon.title} delay={i * 0.05}>
              <div className="p-5 rounded-xl bg-[#0B0E16] border border-white/5 hover:border-white/10 transition-all group">
                <addon.icon size={20} className="text-[#FF3D8D] mb-3" />
                <h4 className="font-semibold text-sm mb-1">{addon.title}</h4>
                <p className="text-[#A9ACB8] text-xs">{addon.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#0B0E16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            FOLLOW THE <span className="gradient-text">CONTENT</span>
          </h2>
          <p className="text-[#A9ACB8] mb-8">Stay updated with our latest reels, behind-the-scenes & creative work.</p>
          <a
            href="https://instagram.com/ashwini_rathod_19"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-white font-semibold hover:shadow-lg transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            FOLLOW ON INSTAGRAM
          </a>
          <p className="text-[#A9ACB8] text-sm mt-4">@ashwini_rathod_19</p>
        </Reveal>
      </div>
    </section>
  );
}

export function CTABanner() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);

  return (
    <section ref={ref} className="py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF3D8D]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#8B5CF6]/8 rounded-full blur-[150px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div style={{ scale, opacity }}>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            TURN SCROLLS<br />
            INTO <span className="gradient-text">CUSTOMERS.</span>
          </h2>
          <p className="text-[#A9ACB8] text-lg max-w-xl mx-auto mb-8">
            Every second someone scrolls past your brand is a missed opportunity. Let's make sure they stop, watch, and remember.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/book"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
            >
              START YOUR PROJECT
            </Link>
            <a
              href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%20I%20want%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300"
            >
              WHATSAPP US
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
