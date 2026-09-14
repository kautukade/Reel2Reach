import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#07090F] border-t border-white/5">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
            READY TO MAKE<br />
            YOUR BRAND<br />
            <span className="gradient-text">IMPOSSIBLE TO IGNORE?</span>
          </h2>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            BOOK A COLLAB <ArrowRight size={20} />
          </Link>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R2</span>
                </div>
                <span className="font-[family-name:var(--font-display)] font-bold text-lg">
                  Reel2Reach Media
                </span>
              </div>
              <p className="text-[#A9ACB8] text-sm leading-relaxed">
                Your brand, our reel, everyone will see it. We help businesses grow through creative content and influencer marketing.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Navigation</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Home', path: '/' },
                  { label: 'About', path: '/about' },
                  { label: 'Services', path: '/services' },
                  { label: 'Our Work', path: '/portfolio' },
                  { label: 'Packages', path: '/packages' },
                  { label: 'Contact', path: '/contact' },
                ].map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-[#A9ACB8] hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-[#A9ACB8] text-sm">Video Content Creation</li>
                <li className="text-[#A9ACB8] text-sm">Influencer Marketing</li>
                <li className="text-[#A9ACB8] text-sm">Social Media Management</li>
                <li className="text-[#A9ACB8] text-sm">Brand Strategy</li>
                <li className="text-[#A9ACB8] text-sm">Digital Promotion</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Connect</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://instagram.com/ashwini_rathod_19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#A9ACB8] hover:text-white text-sm transition-colors"
                  >
                    <Instagram size={16} /> @ashwini_rathod_19
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/918263058461"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#A9ACB8] hover:text-white text-sm transition-colors"
                  >
                    <Phone size={16} /> +91 8263058461
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:real2reach@gmail.com"
                    className="flex items-center gap-2 text-[#A9ACB8] hover:text-white text-sm transition-colors"
                  >
                    <Mail size={16} /> real2reach@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#A9ACB8] text-sm">
              © {new Date().getFullYear()} Reel2Reach Media. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[#A9ACB8] hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[#A9ACB8] hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
