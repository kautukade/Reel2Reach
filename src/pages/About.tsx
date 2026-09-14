import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, Heart, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              WE TURN BUSINESSES<br />
              INTO CONTENT PEOPLE<br />
              <span className="gradient-text">WANT TO WATCH.</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl">
              Reel2Reach Media is a creative content studio that helps small businesses and brands grow on social media through professional video content, influencer collaborations, and strategic social media management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#FF5A5F]/20 to-[#8B5CF6]/20 border border-white/5 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
                      <Zap size={32} className="text-white" />
                    </div>
                    <p className="text-white/60 text-sm">Behind the scenes at Reel2Reach</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-6">
                OUR STORY
              </h2>
              <div className="space-y-4 text-[#A9ACB8] leading-relaxed">
                <p>
                  Reel2Reach Media was born from a simple observation: small businesses and local brands have incredible products and services, but they struggle to get noticed in the noisy world of social media.
                </p>
                <p>
                  We bridge that gap. Through creative reels, strategic influencer partnerships, and data-driven social media management, we help brands build a digital presence that actually converts.
                </p>
                <p>
                  Every piece of content we create is designed with one goal — to make your brand impossible to scroll past.
                </p>
              </div>
              <Link
                to="/book"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold text-sm hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                WORK WITH US <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-center mb-16"
          >
            WHAT DRIVES <span className="gradient-text">US</span>
          </motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Eye, title: 'Visibility', desc: 'Making brands seen in a crowded digital world' },
              { icon: Target, title: 'Precision', desc: 'Content crafted for your specific audience' },
              { icon: Heart, title: 'Passion', desc: 'We love what we create, and it shows' },
              { icon: Zap, title: 'Impact', desc: 'Every piece of content drives results' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B0E16] border border-white/5 text-center"
              >
                <value.icon size={28} className="text-[#FF3D8D] mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-[#A9ACB8] text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-16 lg:py-24 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-6"
            >
              OUR CONTENT <span className="gradient-text">PHILOSOPHY</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#A9ACB8] text-lg leading-relaxed"
            >
              We believe great content isn't just about looking good — it's about telling a story that connects, 
              creating hooks that stop the scroll, and building a brand presence that people remember. 
              Every reel we make, every campaign we run, is designed to turn passive viewers into engaged customers.
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}
