import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ScrollProgress from '../common/ScrollProgress';
import GlobalMotionStage from '../common/GlobalMotionStage';
import PremiumExperience from '../common/PremiumExperience';
import RouteQuality from '../common/RouteQuality';

export default function Layout() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    window.requestAnimationFrame(() => {
      document.getElementById('main-content')?.focus({ preventScroll: true });
    });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#07090F] text-white">
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[200] -translate-y-24 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#07090F] shadow-xl transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <GlobalMotionStage />
      <PremiumExperience />
      <RouteQuality />
      <div aria-hidden="true" className="site-noise pointer-events-none fixed inset-0 z-[90]" />

      <div className="relative z-10">
        <Navbar />
        <AnimatePresence mode="wait" initial={false}>
          <motion.main
            id="main-content"
            tabIndex={-1}
            key={location.pathname}
            className="outline-none"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={{ duration: reduceMotion ? 0 : 0.52, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
        <WhatsAppButton />
      </div>
    </div>
  );
}
