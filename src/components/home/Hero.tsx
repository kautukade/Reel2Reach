import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Heart, MessageCircle, Share2, Eye, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MagneticButton from '../motion/MagneticButton';
import { useMouseParallax } from '../../hooks/useMouseParallax';

export default function Hero() {
  const { x: mouseX, y: mouseY, isEnabled } = useMouseParallax();
  const [currentReel, setCurrentReel] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Phone 3D tilt based on mouse
  const phoneRotateX = useMotionValue(0);
  const phoneRotateY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const phoneRotateXSpring = useSpring(phoneRotateX, springConfig);
  const phoneRotateYSpring = useSpring(phoneRotateY, springConfig);

  useEffect(() => {
    if (!isEnabled) return;
    const unsubscribeX = mouseX.on('change', (v) => phoneRotateY.set(v * 8));
    const unsubscribeY = mouseY.on('change', (v) => phoneRotateX.set(-v * 8));
    return () => { unsubscribeX(); unsubscribeY(); };
  }, [mouseX, mouseY, phoneRotateX, phoneRotateY, isEnabled]);

  // Auto-rotate reels
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReel((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const reelGradients = [
    'from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6]',
    'from-[#8B5CF6] via-[#FF3D8D] to-[#FF5A5F]',
    'from-[#FF3D8D] via-[#8B5CF6] to-[#FF5A5F]',
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Moving gradient orbs */}
        <motion.div
          animate={{
            x: isEnabled ? mouseX.get() * 50 : [0, 30, 0],
            y: isEnabled ? mouseY.get() * 50 : [0, -20, 0],
          }}
          transition={{ x: { duration: 20, repeat: Infinity, ease: 'linear' }, y: { duration: 25, repeat: Infinity, ease: 'linear' } }}
          className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#FF3D8D]/15 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            x: isEnabled ? mouseX.get() * -30 : [0, -40, 0],
            y: isEnabled ? mouseY.get() * -30 : [0, 30, 0],
          }}
          transition={{ x: { duration: 25, repeat: Infinity, ease: 'linear' }, y: { duration: 30, repeat: Infinity, ease: 'linear' } }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-[#8B5CF6]/15 rounded-full blur-[150px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5A5F]/[0.03] rounded-full blur-[200px]" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        {/* Mouse spotlight */}
        {isEnabled && (
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,61,141,0.08) 0%, transparent 70%)',
              x: useMotionValue(0),
              y: useMotionValue(0),
            }}
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF3D8D] animate-pulse" />
              <span className="text-xs font-medium text-[#A9ACB8] uppercase tracking-wider">
                Reel2Reach Media
              </span>
            </motion.div>

            {/* Animated headline with mask reveal */}
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                >
                  YOUR BRAND.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block"
                >
                  OUR REEL.
                </motion.span>
              </div>
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: '100%', filter: 'blur(10px)', opacity: 0 }}
                  animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                  transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  className="block gradient-text animate-gradient bg-[length:200%_200%]"
                >
                  EVERYONE WILL SEE IT.
                </motion.span>
              </div>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-[#A9ACB8] text-lg sm:text-xl mb-4 max-w-lg"
            >
              Creative Reels • Influencer Marketing • Social Media Growth
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="text-[#A9ACB8] text-base mb-8 max-w-lg"
            >
              We help small businesses and brands turn scrolls into customers through professional video content, influencer collaborations, and strategic social media management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  to="/book"
                  className="group relative px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold text-sm sm:text-base overflow-hidden inline-flex items-center gap-2"
                >
                  <span className="relative z-10">BOOK A COLLABORATION</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF3D8D] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              </MagneticButton>
              <Link
                to="/portfolio"
                className="group px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              >
                <Play size={16} className="group-hover:scale-110 transition-transform" /> WATCH OUR WORK
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mt-6"
            >
              <a
                href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%0AI%20would%20like%20to%20discuss%20social%20media%20promotion%2Fcontent%20creation%20for%20my%20business."
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] text-sm font-medium hover:underline"
              >
                Talk on WhatsApp →
              </a>
            </motion.div>
          </div>

          {/* Right - 3D Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center"
            style={{ perspective: 1000 }}
          >
            <div className="relative">
              {/* Phone glow */}
              <motion.div
                style={{ rotateX: phoneRotateXSpring, rotateY: phoneRotateYSpring }}
                className="absolute -inset-8 bg-gradient-to-b from-[#FF3D8D]/20 to-[#8B5CF6]/20 rounded-[4rem] blur-2xl -z-10"
              />

              {/* Phone frame with 3D tilt */}
              <motion.div
                style={{ rotateX: phoneRotateXSpring, rotateY: phoneRotateYSpring, transformStyle: 'preserve-3d' }}
                className="relative"
              >
                <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] rounded-[3rem] border-[3px] border-white/10 bg-[#0B0E16] overflow-hidden shadow-2xl">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#07090F] rounded-b-2xl z-10" />
                  
                  {/* Screen content with rotating reels */}
                  <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden">
                    {reelGradients.map((gradient, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: i === currentReel ? 1 : 0 }}
                        transition={{ duration: 0.8 }}
                        className={`absolute inset-0 bg-gradient-to-b ${gradient}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center p-6">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Play size={24} className="text-white ml-1" />
                            </div>
                            <p className="text-white text-sm font-medium">Premium Content</p>
                            <p className="text-white/70 text-xs mt-1">Reel {i + 1}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Instagram-style UI overlay */}
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6]" />
                        <span className="text-white text-xs font-semibold">reel2reach</span>
                      </div>
                      <p className="text-white/80 text-xs">Creative content that converts ✨</p>
                    </div>
                  </div>

                  {/* Light sweep effect */}
                  <motion.div
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Floating reactions with parallax */}
              {isEnabled && (
                <>
                  <motion.div
                    style={{ x: useMotionValue(0), y: useMotionValue(0) }}
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -left-12 top-1/4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
                  >
                    <Heart size={18} className="text-[#FF3D8D]" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                    className="absolute -right-8 top-1/3 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
                  >
                    <MessageCircle size={18} className="text-[#8B5CF6]" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [-3, 7, -3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute -left-6 bottom-1/4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10"
                  >
                    <Share2 size={18} className="text-[#FF5A5F]" />
                  </motion.div>
                </>
              )}

              {/* Stats pills */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
                className="absolute -right-4 top-12 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center gap-1.5"
              >
                <Eye size={12} className="text-white/70" />
                <span className="text-white text-xs font-medium">12.5K</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7, duration: 0.6 }}
                className="absolute -left-4 bottom-1/3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#FF5A5F]/20 to-[#8B5CF6]/20 backdrop-blur-md border border-white/10 flex items-center gap-1.5"
              >
                <TrendingUp size={12} className="text-[#FF3D8D]" />
                <span className="text-white text-xs font-medium">Trending</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
