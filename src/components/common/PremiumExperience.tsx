import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ROUTE_LABELS: Record<string, string> = {
  '/': 'HOME',
  '/about': 'ABOUT',
  '/services': 'SERVICES',
  '/portfolio': 'OUR WORK',
  '/packages': 'PACKAGES',
  '/case-studies': 'CASE STUDIES',
  '/blog': 'JOURNAL',
  '/contact': 'CONTACT',
  '/book': 'START A PROJECT',
  '/influencer-marketing': 'INFLUENCER',
  '/social-media-management': 'SOCIAL MEDIA',
};

function initialIntroState() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem('r2r-premium-intro-seen') !== '1';
  } catch {
    return true;
  }
}

export default function PremiumExperience() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(initialIntroState);
  const [finePointer, setFinePointer] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const hoveredInteractive = useRef(false);

  const routeLabel = useMemo(() => {
    if (location.pathname.startsWith('/blog/')) return 'JOURNAL / STORY';
    return ROUTE_LABELS[location.pathname] ?? 'REEL2REACH';
  }, [location.pathname]);

  useEffect(() => {
    if (!showIntro) return;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = '';
      try { sessionStorage.setItem('r2r-premium-intro-seen', '1'); } catch { /* browser privacy mode */ }
    }, 2050);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const apply = () => {
      const enabled = media.matches && !reduceMotion;
      setFinePointer(enabled);
      if (enabled) document.body.dataset.r2rCursor = 'on';
      else delete document.body.dataset.r2rCursor;
    };
    apply();
    media.addEventListener?.('change', apply);
    return () => {
      media.removeEventListener?.('change', apply);
      delete document.body.dataset.r2rCursor;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!finePointer) return;
    current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { ...current.current };

    const onMove = (event: PointerEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
      document.documentElement.style.setProperty('--r2r-pointer-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--r2r-pointer-y', `${event.clientY}px`);
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
    };

    const updateInteractiveState = (event: Event) => {
      const node = event.target as HTMLElement | null;
      const interactive = node?.closest('a, button, [role="button"], [data-cursor-text]') as HTMLElement | null;
      const nextHovered = Boolean(interactive);
      if (hoveredInteractive.current !== nextHovered) hoveredInteractive.current = nextHovered;
      if (!interactive) {
        setCursorLabel('');
        return;
      }
      const explicit = interactive.getAttribute('data-cursor-text');
      setCursorLabel(explicit || (interactive.tagName === 'A' ? 'OPEN' : 'GO'));
    };

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.16;
      current.current.y += (target.current.y - current.current.y) * 0.16;
      if (ringRef.current) {
        const scale = hoveredInteractive.current ? 1.65 : 1;
        ringRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', updateInteractiveState, true);
    document.addEventListener('pointerout', updateInteractiveState, true);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', updateInteractiveState, true);
      document.removeEventListener('pointerout', updateInteractiveState, true);
    };
  }, [finePointer]);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[160] overflow-hidden bg-[#05060A] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.12 } }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 h-1/2 bg-[#080A11]"
              exit={{ y: '-105%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="absolute inset-x-0 bottom-0 h-1/2 bg-[#080A11]"
              exit={{ y: '105%' }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            />
            <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.12]" />
            <motion.div
              className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-[9px] font-bold uppercase tracking-[0.42em] text-white/38 sm:text-[10px]">Reel2Reach / Creative Studio</p>
              <div className="mt-5 overflow-hidden pb-2">
                <motion.h1
                  initial={{ y: '115%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="font-[family-name:var(--font-display)] text-[22vw] font-bold leading-[0.72] tracking-[-0.08em] sm:text-[15vw] lg:text-[11vw]"
                >
                  R2R<span className="gradient-text gradient-text-live">.</span>
                </motion.h1>
              </div>
              <p className="mt-5 max-w-sm text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46 sm:text-xs">Ideas into frames. Frames into feeling.</p>
              <div className="mt-9 h-px w-44 overflow-hidden bg-white/10 sm:w-64">
                <motion.div
                  className="h-full origin-left bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div aria-hidden="true" className="pointer-spotlight pointer-events-none fixed inset-0 z-[8] hidden md:block" />

      {finePointer && (
        <>
          <div ref={ringRef} aria-hidden="true" className="r2r-cursor-ring pointer-events-none fixed left-0 top-0 z-[150] flex h-12 w-12 items-center justify-center rounded-full border border-white/35 bg-black/[0.06] backdrop-blur-[2px] will-change-transform">
            <span className="text-[6px] font-bold tracking-[0.18em] text-white/80">{cursorLabel}</span>
          </div>
          <div ref={dotRef} aria-hidden="true" className="r2r-cursor-dot pointer-events-none fixed left-0 top-0 z-[151] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference will-change-transform" />
        </>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={routeLabel}
          aria-hidden="true"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="pointer-events-none fixed bottom-5 left-5 z-[35] hidden items-center gap-3 rounded-full border border-white/[0.08] bg-[#07090F]/55 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.22em] text-white/38 backdrop-blur-xl lg:flex"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3D8D] shadow-[0_0_14px_rgba(255,61,141,.8)]" />
          {routeLabel}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
