import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, Megaphone, Globe, Target, BarChart3, Palette, Camera, Calendar, TrendingUp } from 'lucide-react';

const packages = [
  {
    name: 'Basic Plan',
    price: '₹4,999',
    priceSuffix: '',
    description: 'Perfect for brands looking to create their first professional reel with influencer collaboration.',
    features: [
      '1 Reel (30–60 seconds)',
      'Shot with an influencer',
      'Scripted, directed and edited by the team',
      'Caption + Hashtags + CTA',
      'Story repost on influencer account',
      'Influencer collaboration',
    ],
    cta: 'GET STARTED',
    recommended: false,
  },
  {
    name: 'Combo Plan',
    price: '₹14,999',
    priceSuffix: '/month',
    description: 'Complete monthly content package with reels, posts, strategy, and influencer amplification.',
    features: [
      '4 Reels (1 per week)',
      'Influencer + product integration',
      'Edited + scripted + trending theme',
      '10–15 Instagram posts',
      'Static + carousel + quote templates',
      'Content strategy & calendar',
      'Influencer reposting 2–3x',
      'Analytics report at the end of month',
    ],
    cta: 'GET STARTED',
    recommended: true,
  },
  {
    name: 'Custom Growth Plan',
    price: 'Custom Quote',
    priceSuffix: '',
    description: 'Tailored solutions for brands that need a comprehensive, multi-channel growth strategy.',
    features: [
      'Tailored to your specific needs',
      'Full campaign management',
      'Dedicated creative team',
      'Multi-platform strategy',
      'Priority support & revisions',
      'Monthly performance reporting',
      'Custom influencer partnerships',
      'Brand growth roadmap',
    ],
    cta: 'BUILD MY PACKAGE',
    recommended: false,
  },
];

const addons = [
  { icon: Megaphone, title: 'Paid Ads Setup & Boost', desc: 'Inorganic marketing & paid promotion setup', price: 'On request' },
  { icon: Globe, title: 'Social Media Management', desc: 'Full account handling & management', price: 'On request' },
  { icon: Target, title: 'Google My Business', desc: 'Registration & local SEO optimization', price: 'On request' },
  { icon: BarChart3, title: 'Instagram Audit & Strategy', desc: 'Complete audit with growth strategy session', price: 'On request' },
  { icon: Palette, title: 'Logo + Branding Design', desc: 'Logo design & complete brand identity', price: 'On request' },
  { icon: Camera, title: 'Product Photography', desc: 'Professional product photo shoots', price: 'On request' },
  { icon: Calendar, title: 'Content Calendar', desc: 'Strategic content planning & scheduling', price: 'Included in Combo' },
  { icon: TrendingUp, title: 'Growth Strategy', desc: 'Organic growth planning & execution', price: 'On request' },
];

export default function Packages() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              PACKAGES THAT<br />
              <span className="gradient-text">DELIVER RESULTS</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl mx-auto">
              Choose a plan that fits your brand's needs. Every package is designed to maximize your social media impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`relative p-8 rounded-2xl border ${
                  pkg.recommended
                    ? 'border-[#FF3D8D]/30 bg-gradient-to-b from-[#FF3D8D]/5 to-transparent'
                    : 'border-white/5 bg-[#0B0E16]'
                }`}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-xs font-semibold">
                    RECOMMENDED
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold">{pkg.price}</span>
                  {pkg.priceSuffix && <span className="text-[#A9ACB8] text-sm">{pkg.priceSuffix}</span>}
                </div>
                <p className="text-[#A9ACB8] text-sm mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[#A9ACB8]">
                      <Check size={16} className="text-[#FF3D8D] mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
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
                  {pkg.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-20 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-4">
              NEED MORE? <span className="gradient-text">SUPERCHARGE YOUR BRAND.</span>
            </h2>
            <p className="text-[#A9ACB8]">Add-on services to complement any package</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {addons.map((addon, i) => (
              <motion.div
                key={addon.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[#10131D] border border-white/5 hover:border-white/10 transition-all"
              >
                <addon.icon size={20} className="text-[#FF3D8D] mb-3" />
                <h4 className="font-semibold text-sm mb-1">{addon.title}</h4>
                <p className="text-[#A9ACB8] text-xs mb-2">{addon.desc}</p>
                <span className="text-[#FF3D8D] text-xs font-medium">{addon.price}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
              NOT SURE WHICH PLAN IS RIGHT?
            </h2>
            <p className="text-[#A9ACB8] mb-8">Let's discuss your needs and find the perfect fit for your brand.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                BOOK A COLLABORATION <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%20I%20want%20to%20know%20more%20about%20your%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                ASK ON WHATSAPP
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
