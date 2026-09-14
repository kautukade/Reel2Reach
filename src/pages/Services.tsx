import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Video, Users, BarChart3, Film, Edit, Sparkles, ShoppingBag, MessageSquare, Mic, PenTool, Camera, Layers } from 'lucide-react';

const videoServices = [
  { icon: Film, title: 'Instagram Reels', desc: 'Scroll-stopping short-form video content' },
  { icon: Edit, title: 'Reel Editing', desc: 'Professional editing with trending effects' },
  { icon: Sparkles, title: 'Hook-Based Content', desc: 'Content designed to grab attention in 3 seconds' },
  { icon: ShoppingBag, title: 'Product Videos', desc: 'Showcase your products cinematically' },
  { icon: MessageSquare, title: 'Testimonial Reels', desc: 'Client stories that build trust' },
  { icon: Camera, title: 'Behind-the-Scenes', desc: 'Authentic BTS content that humanizes brands' },
  { icon: Mic, title: 'Voiceover Reels', desc: 'Narrative-driven content with professional VO' },
  { icon: PenTool, title: 'Scripted Reels', desc: 'Strategically written content with clear CTAs' },
  { icon: Layers, title: 'Aesthetic / POV', desc: 'Trending aesthetic and POV-style content' },
  { icon: Video, title: 'Transition Reels', desc: 'Smooth creative transitions that wow' },
  { icon: Film, title: 'Cinematic Reels', desc: 'High-production value cinematic content' },
];

export default function Services() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              SERVICES THAT<br />
              <span className="gradient-text">MOVE THE NEEDLE.</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl">
              From concept to publish, we handle every aspect of your social media content — so you can focus on running your business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Three Main Services */}
      <section className="py-16 lg:py-24 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {[
              {
                num: '01',
                title: 'Video Content Creation',
                desc: 'We create professional, scroll-stopping video content for your brand. From Instagram Reels to product videos, every piece is crafted to capture attention and drive engagement.',
                icon: Video,
                gradient: 'from-[#FF5A5F] to-[#FF3D8D]',
                link: '/portfolio',
              },
              {
                num: '02',
                title: 'Influencer Shoutouts & Marketing',
                desc: 'Get your brand in front of the right audience through strategic influencer collaborations. We connect you with relevant creators for authentic shoutouts, product integrations, and paid promotions.',
                icon: Users,
                gradient: 'from-[#FF3D8D] to-[#8B5CF6]',
                link: '/influencer-marketing',
              },
              {
                num: '03',
                title: 'Social Media Management',
                desc: 'Complete social media handling — from strategy and content planning to posting, engagement, and growth. We manage your online presence so you can focus on your business.',
                icon: BarChart3,
                gradient: 'from-[#8B5CF6] to-[#FF5A5F]',
                link: '/social-media-management',
              },
            ].map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 lg:p-12 rounded-2xl bg-[#10131D] border border-white/5 hover:border-white/10 transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
                  <div className="flex-shrink-0">
                    <span className="text-5xl lg:text-6xl font-[family-name:var(--font-display)] font-bold text-white/5">
                      {service.num}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4`}>
                      <service.icon size={22} className="text-white" />
                    </div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl lg:text-3xl font-bold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-[#A9ACB8] leading-relaxed mb-6">{service.desc}</p>
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Content Services Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-center mb-4"
          >
            VIDEO CONTENT <span className="gradient-text">SERVICES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#A9ACB8] text-center max-w-2xl mx-auto mb-12"
          >
            Every type of content your brand needs to dominate social media
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videoServices.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[#0B0E16] border border-white/5 hover:border-white/10 transition-all group"
              >
                <service.icon size={20} className="text-[#FF3D8D] mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-semibold text-sm mb-1">{service.title}</h4>
                <p className="text-[#A9ACB8] text-xs">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mb-6">
              READY TO <span className="gradient-text">GET STARTED?</span>
            </h2>
            <p className="text-[#A9ACB8] mb-8 max-w-lg mx-auto">
              Let's discuss how we can help your brand grow through creative content and strategic social media.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all"
              >
                BOOK A COLLABORATION
              </Link>
              <Link
                to="/packages"
                className="px-8 py-3.5 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-all"
              >
                VIEW PACKAGES
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
