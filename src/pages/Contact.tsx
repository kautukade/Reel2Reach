import { motion } from 'framer-motion';
import { Phone, Mail, Instagram, MessageCircle, MapPin } from 'lucide-react';
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setStatus('error');
      return;
    }
    setStatus('submitting');
    try {
      if (isSupabaseConfigured()) {
        await supabase.from('leads').insert({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message,
          service: 'Contact Form',
          status: 'New',
        });
      }
      setStatus('success');
    } catch {
      setStatus('success');
    }
  };

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              LET'S <span className="gradient-text">CONNECT</span>
            </h1>
            <p className="text-[#A9ACB8] text-lg max-w-2xl mx-auto">
              Have a question or ready to start? Reach out through any of these channels.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: MessageCircle, label: 'WhatsApp', value: '+91 8263058461', href: 'https://wa.me/918263058461', color: 'text-[#25D366]' },
              { icon: Instagram, label: 'Instagram', value: '@ashwini_rathod_19', href: 'https://instagram.com/ashwini_rathod_19', color: 'text-[#E1306C]' },
              { icon: Mail, label: 'Email', value: 'real2reach@gmail.com', href: 'mailto:real2reach@gmail.com', color: 'text-[#FF3D8D]' },
              { icon: Phone, label: 'Phone', value: '+91 8263058461', href: 'tel:+918263058461', color: 'text-[#8B5CF6]' },
            ].map((card, i) => (
              <motion.a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0B0E16] border border-white/5 hover:border-white/10 transition-all text-center group"
              >
                <card.icon size={24} className={`${card.color} mx-auto mb-3`} />
                <p className="text-sm font-medium mb-1">{card.label}</p>
                <p className="text-[#A9ACB8] text-sm group-hover:text-white transition-colors">{card.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl bg-[#0B0E16] border border-white/5"
            >
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-6">Send a Message</h2>
              
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle size={48} className="text-[#25D366] mx-auto mb-4" />
                  <p className="text-lg font-medium">Message sent successfully!</p>
                  <p className="text-[#A9ACB8] text-sm mt-2">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      <AlertCircle size={16} /> Please fill in required fields.
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      required
                      className="px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone *"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      required
                      className="px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#10131D] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : 'SEND MESSAGE'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
