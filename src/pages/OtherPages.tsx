import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Megaphone, Target, Eye, Share2, TrendingUp, Check } from 'lucide-react';

export function InfluencerMarketing() {
  const offerings = [
    { icon: Users, title: 'Influencer Shoutout', desc: 'Authentic shoutouts from relevant creators' },
    { icon: Megaphone, title: 'Brand Collaboration', desc: 'Strategic brand-creator partnerships' },
    { icon: Target, title: 'Paid Promotion', desc: 'Targeted paid promotional content' },
    { icon: Eye, title: 'Brand Visibility', desc: 'Get your brand seen by the right audience' },
    { icon: Share2, title: 'Sponsored Post', desc: 'Sponsored content that feels organic' },
    { icon: TrendingUp, title: 'Digital Promotion', desc: 'Multi-channel digital amplification' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              PUT YOUR BRAND<br />
              IN FRONT OF<br />
              <span className="gradient-text">THE RIGHT AUDIENCE.</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl">
              Strategic influencer collaborations that put your products and services in front of engaged, relevant audiences.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#10131D] border border-white/5"
              >
                <item.icon size={24} className="text-[#FF3D8D] mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-[#A9ACB8] text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-6">HOW IT WORKS</h2>
              <div className="space-y-4">
                {[
                  'Share your brand details and goals',
                  'We match you with relevant creators',
                  'Content is planned, scripted & shot',
                  'Published with strategic captions & hashtags',
                  'Performance tracked & reported',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-white" />
                    </div>
                    <p className="text-[#A9ACB8]">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-square rounded-2xl bg-gradient-to-br from-[#FF3D8D]/10 to-[#8B5CF6]/10 border border-white/5 flex items-center justify-center">
              <Users size={64} className="text-[#FF3D8D]/40" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-6">READY TO AMPLIFY YOUR BRAND?</h2>
          <Link to="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all">
            BOOK INFLUENCER COLLAB <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function SocialMediaManagement() {
  const services = [
    { title: 'Strategy Development', desc: 'Custom social media strategy aligned with your business goals' },
    { title: 'Content Planning', desc: 'Strategic content calendar with themes, pillars & posting schedule' },
    { title: 'Content Creation', desc: 'Professional posts, reels, stories & carousels' },
    { title: 'Posting & Scheduling', desc: 'Consistent posting at optimal times for maximum reach' },
    { title: 'Brand Consistency', desc: 'Unified visual identity & brand voice across all content' },
    { title: 'Audience Engagement', desc: 'Active community management & audience interaction' },
    { title: 'Performance Tracking', desc: 'Regular analytics reports with insights & recommendations' },
    { title: 'Organic Growth', desc: 'Sustainable growth through quality content & engagement' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              YOUR SOCIAL MEDIA,<br />
              <span className="gradient-text">FULLY MANAGED.</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl">
              From strategy to execution, we handle every aspect of your social media presence — so you can focus on your business.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#0B0E16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-[#10131D] border border-white/5"
              >
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-[#A9ACB8] text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-6">NEED A SOCIAL MEDIA PARTNER?</h2>
          <p className="text-[#A9ACB8] mb-8 max-w-lg mx-auto">Let's discuss how we can manage and grow your social media presence.</p>
          <Link to="/book" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all">
            GET STARTED <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export function CaseStudies() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold mb-6">
            CASE <span className="gradient-text">STUDIES</span>
          </h1>
          <p className="text-[#A9ACB8] text-lg mb-8 max-w-lg mx-auto">
            Real results from real collaborations. Our case studies showcase how we've helped brands grow through creative content and strategic marketing.
          </p>
          <div className="p-8 rounded-2xl bg-[#0B0E16] border border-white/5 max-w-md mx-auto">
            <p className="text-[#A9ACB8]">Case studies coming soon as we complete more brand collaborations.</p>
          </div>
          <Link to="/book" className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all">
            Be our next success story <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export function Privacy() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert space-y-6 text-[#A9ACB8]">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-white text-xl font-semibold mt-8">Information We Collect</h2>
            <p>When you submit an enquiry through our website, we collect your name, phone number, email address, business name, and any other information you voluntarily provide. This information is used solely to respond to your enquiry and provide our services.</p>
            <h2 className="text-white text-xl font-semibold mt-8">How We Use Your Information</h2>
            <p>We use the information you provide to: respond to enquiries, provide quotes and services, communicate about projects, and improve our services. We do not sell or share your personal information with third parties.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Data Storage</h2>
            <p>Your data is stored securely and is only accessible to authorized team members. We retain your information only as long as necessary to fulfill the purposes for which it was collected.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
            <p>For any privacy-related questions, contact us at real2reach@gmail.com or via WhatsApp at +91 8263058461.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function Terms() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold mb-8">Terms & Conditions</h1>
          <div className="prose prose-invert space-y-6 text-[#A9ACB8]">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-white text-xl font-semibold mt-8">Services</h2>
            <p>Reel2Reach Media provides video content creation, influencer marketing, and social media management services. Specific deliverables, timelines, and pricing are agreed upon per project.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Payment Terms</h2>
            <p>Payment terms are outlined in individual service agreements. Generally, an advance payment is required before work commences, with the balance due upon completion or as per the agreed schedule.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Content Ownership</h2>
            <p>Upon full payment, clients receive usage rights to the content created for their brand as specified in the service agreement. Reel2Reach Media retains the right to showcase work in its portfolio.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Limitation of Liability</h2>
            <p>While we strive for the best results, social media growth depends on many factors. We do not guarantee specific follower counts, engagement rates, or sales figures.</p>
            <h2 className="text-white text-xl font-semibold mt-8">Contact</h2>
            <p>For questions about these terms, contact us at real2reach@gmail.com.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-[family-name:var(--font-display)] text-8xl font-bold gradient-text mb-4">404</h1>
          <p className="text-2xl font-semibold mb-4">Page Not Found</p>
          <p className="text-[#A9ACB8] mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold">
            GO HOME <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
