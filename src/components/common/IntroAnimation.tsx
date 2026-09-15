import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has seen intro in this session
    const hasSeenIntro = sessionStorage.getItem('reel2reach-intro-seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('reel2reach-intro-seen', 'true');
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090F]"
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="mb-4"
            >
              <span className="text-sm font-medium text-[#A9ACB8] uppercase tracking-[0.3em]">
                REEL2REACH
              </span>
            </motion.div>
            <div className="flex gap-2 justify-center">
              {['CREATE', 'INFLUENCE', 'GROW'].map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
                  className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] gradient-text"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
