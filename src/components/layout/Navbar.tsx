import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Our Work', path: '/portfolio' },
  { label: 'Packages', path: '/packages' },
  { label: 'Case Studies', path: '/case-studies' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

function isActive(pathname: string, path: string) {
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(`${path}/`);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        initial={reduceMotion ? false : { y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-all duration-500 ${scrolled ? 'border-b border-white/[0.06] bg-[#07090F]/78 shadow-[0_18px_45px_rgba(0,0,0,0.2)] backdrop-blur-2xl' : 'bg-transparent'}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <Link to="/" className="group flex min-w-0 items-center gap-2.5">
              <motion.div whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.06 }} transition={{ type: 'spring', stiffness: 350, damping: 20 }} className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] shadow-[0_10px_28px_rgba(255,61,141,0.2)]">
                <span className="relative z-10 text-sm font-bold text-white">R2</span>
                <span className="absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
              </motion.div>
              <div className="min-w-0 leading-none"><span className="block truncate font-[family-name:var(--font-display)] text-base font-bold tracking-[-0.03em] text-white lg:text-lg">Reel2Reach</span><span className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[0.28em] text-white/35 sm:block">Media Studio</span></div>
            </Link>

            <div className="hidden items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.025] p-1.5 backdrop-blur-xl lg:flex">
              {navLinks.map((link) => {
                const active = isActive(location.pathname, link.path);
                return (
                  <Link key={link.path} to={link.path} className={`relative rounded-full px-2.5 py-2 text-[11px] font-medium transition-colors xl:px-3.5 xl:text-xs ${active ? 'text-white' : 'text-[#A9ACB8] hover:text-white'}`}>
                    {active && <motion.span layoutId="active-nav-pill" className="absolute inset-0 rounded-full border border-white/[0.07] bg-white/[0.07] shadow-[0_6px_20px_rgba(0,0,0,0.16)]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <motion.div className="hidden lg:block" whileHover={reduceMotion ? undefined : { y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link to="/book" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_12px_34px_rgba(255,61,141,0.18)] transition-shadow duration-500 hover:shadow-[0_15px_42px_rgba(255,61,141,0.32)] xl:px-5 xl:text-sm">
                <span className="relative z-10">BOOK A COLLAB</span><ArrowUpRight size={15} className="relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /><span className="absolute inset-0 -translate-x-[130%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/24 to-transparent transition-transform duration-700 group-hover:translate-x-[130%]" />
              </Link>
            </motion.div>

            <button onClick={() => setMobileOpen((open) => !open)} className="relative z-50 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white backdrop-blur-xl lg:hidden" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
              <AnimatePresence mode="wait" initial={false}><motion.span key={mobileOpen ? 'close' : 'open'} initial={reduceMotion ? false : { opacity: 0, rotate: -60, scale: 0.7 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0, rotate: 60, scale: 0.7 }} transition={{ duration: 0.2 }}>{mobileOpen ? <X size={20} /> : <Menu size={20} />}</motion.span></AnimatePresence>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 91% 5%)' }} animate={{ opacity: 1, clipPath: 'circle(150% at 91% 5%)' }} exit={reduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: 'circle(0% at 91% 5%)' }} transition={{ duration: reduceMotion ? 0.15 : 0.62, ease: [0.22, 1, 0.36, 1] }} className="fixed inset-0 z-40 min-h-[100dvh] overflow-y-auto overscroll-contain bg-[#07090F]/98 backdrop-blur-2xl lg:hidden">
            <div aria-hidden="true" className="absolute -right-32 top-12 h-96 w-96 rounded-full bg-[#FF3D8D]/12 blur-[100px]" /><div aria-hidden="true" className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-[#8B5CF6]/12 blur-[110px]" /><div aria-hidden="true" className="absolute inset-0 cinematic-grid opacity-[0.13]" />
            <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-2xl flex-col justify-center px-4 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))] min-[380px]:px-6">
              <p className="mb-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/35 min-[380px]:mb-6 min-[380px]:text-[10px] min-[380px]:tracking-[0.3em]">Navigate / Reel2Reach</p>
              <div className="space-y-0.5">
                {navLinks.map((link, index) => {
                  const active = isActive(location.pathname, link.path);
                  return <motion.div key={link.path} initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.04, duration: 0.42 }}><Link to={link.path} className={`group flex min-h-12 items-center justify-between gap-4 border-b border-white/[0.06] py-2.5 font-[family-name:var(--font-display)] text-[clamp(1.35rem,7vw,2.25rem)] font-semibold tracking-[-0.04em] transition-colors ${active ? 'text-white' : 'text-white/62 hover:text-white'}`}><span className="min-w-0">{link.label}</span><ArrowUpRight size={20} className="shrink-0 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#FF6AA7]" /></Link></motion.div>;
                })}
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 0.5 }} className="mt-6 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 min-[380px]:mt-7"><a href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%0AI%20would%20like%20to%20discuss%20social%20media%20promotion%2Fcontent%20creation%20for%20my%20business." target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center rounded-full border border-[#25D366]/35 bg-[#25D366]/5 px-5 py-3 text-center text-sm font-semibold text-[#8BF0A9]">WhatsApp</a><Link to="/book" className="flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-5 py-3 text-center text-sm font-semibold text-white">Book Now</Link></motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
