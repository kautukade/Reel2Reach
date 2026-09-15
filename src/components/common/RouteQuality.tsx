import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

type PageMeta = { title: string; description: string; label: string };

const DEFAULT_META: PageMeta = {
  title: 'Reel2Reach Media | Creative Reels, Influencer Marketing & Social Growth',
  description: 'Reel2Reach Media creates art-directed reels, influencer collaborations and social media campaigns built for attention, story and brand growth.',
  label: 'REEL2REACH',
};

const META: Record<string, PageMeta> = {
  '/': DEFAULT_META,
  '/about': {
    title: 'About Reel2Reach Media | Creative Studio',
    description: 'Meet Reel2Reach Media — a social-first creative studio shaping reels, creator collaborations and visual brand stories.',
    label: 'ABOUT',
  },
  '/services': {
    title: 'Creative Services | Reel2Reach Media',
    description: 'Explore Reel2Reach services for video content creation, Instagram reels, influencer marketing and social media management.',
    label: 'SERVICES',
  },
  '/portfolio': {
    title: 'Our Work & Demo Concepts | Reel2Reach Media',
    description: 'Explore Reel2Reach art direction, reel concepts and creative demo work across fashion, beauty, food, retail and lifestyle.',
    label: 'OUR WORK',
  },
  '/packages': {
    title: 'Content Packages | Reel2Reach Media',
    description: 'Choose a Reel2Reach content package for focused reels, monthly social momentum or a custom creative campaign.',
    label: 'PACKAGES',
  },
  '/influencer-marketing': {
    title: 'Influencer Marketing | Reel2Reach Media',
    description: 'Creator-led campaigns, influencer shoutouts and product integrations designed to feel native to social platforms.',
    label: 'INFLUENCER',
  },
  '/social-media-management': {
    title: 'Social Media Management | Reel2Reach Media',
    description: 'Content planning, visual direction and social media management for brands that need a consistent digital presence.',
    label: 'SOCIAL',
  },
  '/case-studies': {
    title: 'Creative Case Studies | Reel2Reach Media',
    description: 'See Reel2Reach demo case-study systems showing how an idea can become a repeatable launch and content direction.',
    label: 'CASE STUDIES',
  },
  '/blog': {
    title: 'Journal | Reel2Reach Media',
    description: 'Ideas, observations and creative notes from Reel2Reach on reels, storytelling, creator marketing and social media.',
    label: 'JOURNAL',
  },
  '/book': {
    title: 'Book a Collaboration | Reel2Reach Media',
    description: 'Start a Reel2Reach project for reels, influencer collaboration, social media management or a custom creative campaign.',
    label: 'START A PROJECT',
  },
  '/contact': {
    title: 'Contact Reel2Reach Media',
    description: 'Contact Reel2Reach Media for creative reels, influencer marketing, social media management and brand content collaborations.',
    label: 'CONTACT',
  },
};

function upsertMeta(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function RouteQuality() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const firstRoute = useRef(true);
  const [reveal, setReveal] = useState(false);

  const pageMeta = useMemo(() => {
    if (location.pathname.startsWith('/blog/')) {
      return {
        title: 'Reel2Reach Journal Story',
        description: 'A story from the Reel2Reach creative journal.',
        label: 'JOURNAL / STORY',
      } satisfies PageMeta;
    }
    return META[location.pathname] ?? DEFAULT_META;
  }, [location.pathname]);

  useEffect(() => {
    document.title = pageMeta.title;
    upsertMeta('meta[name="description"]', { name: 'description' }, pageMeta.description);
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, pageMeta.title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, pageMeta.description);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, location.pathname.startsWith('/blog/') ? 'article' : 'website');
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, `${window.location.origin}${location.pathname}`);
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, pageMeta.title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, pageMeta.description);
    upsertCanonical(`${window.location.origin}${location.pathname}`);
  }, [location.pathname, pageMeta]);

  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      return;
    }
    if (reduceMotion) return;
    setReveal(true);
    const timer = window.setTimeout(() => setReveal(false), 420);
    return () => window.clearTimeout(timer);
  }, [location.pathname, reduceMotion]);

  return (
    <AnimatePresence>
      {reveal && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[145] flex items-center justify-center overflow-hidden bg-[#07090F]"
          initial={{ scaleY: 0, transformOrigin: 'bottom' }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0, transformOrigin: 'top' }}
          transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0 cinematic-grid opacity-[0.11]" />
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.38em] text-[#FF6AA7]">Reel2Reach / Navigate</p>
            <p className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold tracking-[-0.05em] sm:text-6xl">{pageMeta.label}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
