import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] bg-[#07090F]">
      <div aria-hidden="true" className="absolute -left-48 top-0 h-[480px] w-[480px] rounded-full bg-[#FF3D8D]/8 blur-[140px]" />
      <div aria-hidden="true" className="absolute -right-52 top-32 h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/8 blur-[150px]" />
      <div aria-hidden="true" className="absolute inset-0 cinematic-grid opacity-[0.08]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center"
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/35 sm:text-xs">
            Your next campaign starts here
          </p>
          <div className="overflow-hidden">
            <motion.h2
              initial={reduceMotion ? false : { y: '115%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-display)] text-4xl font-bold leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl"
            >
              READY TO MAKE
              <br />
              YOUR BRAND
              <br />
              <span className="gradient-text gradient-text-live">IMPOSSIBLE TO IGNORE?</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.55 }}
            className="mt-9"
          >
            <motion.div className="inline-block" whileHover={reduceMotion ? undefined : { y: -3 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/book"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_55px_rgba(255,61,141,0.22)] transition-shadow duration-500 hover:shadow-[0_22px_65px_rgba(255,61,141,0.38)]"
              >
                <span className="relative z-10">BOOK A COLLAB</span>
                <ArrowRight size={19} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                <span className="absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : 0.15, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 h-px max-w-4xl origin-center bg-gradient-to-r from-transparent via-white/15 to-transparent"
          />
        </motion.div>
      </div>

      <div className="relative border-t border-white/[0.05]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6]">
                  <span className="relative z-10 text-sm font-bold text-white">R2</span>
                </div>
                <div>
                  <span className="block font-[family-name:var(--font-display)] text-lg font-bold tracking-[-0.03em]">Reel2Reach Media</span>
                  <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.28em] text-white/30">Social-First Creative</span>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-6 text-[#A9ACB8]">
                Your brand, our reel, everyone will see it. Creative content, influencer marketing and social media growth built for the feed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.06 }}
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Navigation</h4>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About', path: '/about' },
                  { label: 'Services', path: '/services' },
                  { label: 'Our Work', path: '/portfolio' },
                  { label: 'Packages', path: '/packages' },
                  { label: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="group inline-flex items-center gap-2 text-sm text-[#A9ACB8] transition-colors hover:text-white">
                      <span className="h-px w-0 bg-[#FF6AA7] transition-all duration-300 group-hover:w-3" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.12 }}
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Services</h4>
              <ul className="space-y-2.5 text-sm text-[#A9ACB8]">
                <li>Video Content Creation</li>
                <li>Influencer Marketing</li>
                <li>Social Media Management</li>
                <li>Brand Strategy</li>
                <li>Digital Promotion</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: reduceMotion ? 0 : 0.18 }}
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://instagram.com/ashwini_rathod_19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm text-[#A9ACB8] transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-[#E1306C]/35 group-hover:bg-[#E1306C]/8">
                      <Instagram size={14} />
                    </span>
                    @ashwini_rathod_19
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/918263058461"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 text-sm text-[#A9ACB8] transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-[#25D366]/35 group-hover:bg-[#25D366]/8">
                      <Phone size={14} />
                    </span>
                    +91 8263058461
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:real2reach@gmail.com"
                    className="group flex items-center gap-2.5 text-sm text-[#A9ACB8] transition-colors hover:text-white"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition group-hover:border-[#FF3D8D]/35 group-hover:bg-[#FF3D8D]/8">
                      <Mail size={14} />
                    </span>
                    real2reach@gmail.com
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row"
          >
            <p className="text-sm text-[#A9ACB8]">© {new Date().getFullYear()} Reel2Reach Media. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-[#A9ACB8] transition-colors hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-[#A9ACB8] transition-colors hover:text-white">Terms & Conditions</Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pointer-events-none relative -mb-[2.2vw] mt-2 overflow-hidden whitespace-nowrap text-center font-[family-name:var(--font-display)] text-[15vw] font-bold leading-none tracking-[-0.075em] text-white/[0.025]"
      >
        REEL2REACH
      </motion.div>
    </footer>
  );
}
