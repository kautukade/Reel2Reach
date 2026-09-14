import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Heart, MessageCircle, Share2, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#FF3D8D]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8B5CF6]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF5A5F]/[0.03] rounded-full blur-[200px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 mb-6"
            >
              <div className="w-2 h-2 rounded-full bg-[#FF3D8D] animate-pulse" />
              <span className="text-xs font-medium text-[#A9ACB8] uppercase tracking-wider">
                Reel2Reach Media
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-6"
            >
              YOUR BRAND.
              <br />
              OUR REEL.
              <br />
              <span className="gradient-text">EVERYONE WILL SEE IT.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#A9ACB8] text-lg sm:text-xl mb-4 max-w-lg"
            >
              Creative Reels • Influencer Marketing • Social Media Growth
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[#A9ACB8] text-base mb-8 max-w-lg"
            >
              We help small businesses and brands turn scrolls into customers through professional video content, influencer collaborations, and strategic social media management.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                to="/book"
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 text-sm sm:text-base"
              >
                BOOK A COLLABORATION
              </Link>
              <Link
                to="/portfolio"
                className="px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              >
                <Play size={16} /> WATCH OUR WORK
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
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

          {/* Right - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] rounded-[3rem] border-[3px] border-white/10 bg-[#0B0E16] overflow-hidden shadow-2xl animate-float">
                {/* Phone notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#07090F] rounded-b-2xl z-10" />
                
                {/* Screen content */}
                <div className="absolute inset-2 rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#1a1025] to-[#0d1117]">
                  {/* Reel content placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
                        <Play size={24} className="text-white ml-1" />
                      </div>
                      <p className="text-white/80 text-sm font-medium">Premium Content</p>
                      <p className="text-white/40 text-xs mt-1">Reels • Stories • Growth</p>
                    </div>
                  </div>

                  {/* Instagram-style UI overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6]" />
                      <span className="text-white text-xs font-semibold">reel2reach</span>
                    </div>
                    <p className="text-white/70 text-xs">Creative content that converts ✨</p>
                  </div>
                </div>
              </div>

              {/* Floating reactions */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -left-8 top-1/4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <Heart size={16} className="text-[#FF3D8D]" />
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute -right-6 top-1/3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <MessageCircle size={16} className="text-[#8B5CF6]" />
              </motion.div>
              <motion.div
                animate={{ y: [-3, 7, -3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-4 bottom-1/4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center"
              >
                <Share2 size={16} className="text-[#FF5A5F]" />
              </motion.div>

              {/* Glow */}
              <div className="absolute -inset-4 bg-gradient-to-b from-[#FF3D8D]/10 to-[#8B5CF6]/10 rounded-[4rem] blur-xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
