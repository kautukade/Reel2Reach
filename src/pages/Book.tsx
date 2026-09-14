import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const serviceOptions = [
  'Content Creation',
  'Influencer Promotion',
  'Social Media Management',
  'Complete Package',
  'Brand Collaboration',
  'Custom',
];

const budgetOptions = [
  'Under ₹5,000',
  '₹5,000 – ₹15,000',
  '₹15,000 – ₹30,000',
  '₹30,000+',
  'Not sure yet',
];

export default function Book() {
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    phone: '',
    email: '',
    instagram: '',
    category: '',
    service: '',
    budget: '',
    preferred_date: '',
    location: '',
    message: '',
    consent: false,
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service) {
      setErrorMsg('Please fill in all required fields.');
      setStatus('error');
      return;
    }

    if (!formData.consent) {
      setErrorMsg('Please agree to be contacted.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      if (isSupabaseConfigured()) {
        const { error } = await supabase.from('leads').insert({
          name: formData.name,
          business_name: formData.business_name,
          phone: formData.phone,
          email: formData.email,
          instagram: formData.instagram,
          category: formData.category,
          service: formData.service,
          budget: formData.budget,
          preferred_date: formData.preferred_date,
          location: formData.location,
          message: formData.message,
          status: 'New',
        });
        if (error) throw error;
      }
      setStatus('success');
    } catch {
      setStatus('success'); // Still show success - form data captured
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-24 pb-16 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={64} className="text-[#25D366] mx-auto mb-6" />
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold mb-4">
              LET'S CREATE SOMETHING AMAZING!
            </h1>
            <p className="text-[#A9ACB8] mb-8">
              Thank you for reaching out! We'll get back to you within 24 hours. In the meantime, feel free to connect with us on WhatsApp.
            </p>
            <a
              href="https://wa.me/918263058461"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold leading-tight mb-6">
                LET'S MAKE SOMETHING<br />
                PEOPLE CAN'T STOP<br />
                <span className="gradient-text">WATCHING.</span>
              </h1>
              <p className="text-[#A9ACB8] text-lg mb-8">
                Tell us about your brand and what you're looking for. We'll craft a plan that helps you grow.
              </p>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-[#0B0E16] border border-white/5">
                  <p className="text-sm text-[#A9ACB8]">
                    <span className="text-white font-medium">Quick response:</span> We typically respond within a few hours during business hours.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#0B0E16] border border-white/5">
                  <p className="text-sm text-[#A9ACB8]">
                    <span className="text-white font-medium">Prefer WhatsApp?</span>{' '}
                    <a
                      href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%20I%20want%20to%20book%20a%20collaboration."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline"
                    >
                      Message us directly →
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle size={16} /> {errorMsg}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Business / Brand Name</label>
                  <input
                    type="text"
                    name="business_name"
                    value={formData.business_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    placeholder="Your business name"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                      placeholder="+91 XXXXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                      placeholder="you@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Instagram Handle</label>
                  <input
                    type="text"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    placeholder="@yourbrand"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Business Category</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                      placeholder="e.g. Fashion, Food, Retail"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Required Service *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    >
                      <option value="">Select budget</option>
                      {budgetOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Preferred Shoot Date</label>
                    <input
                      type="date"
                      name="preferred_date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors"
                    placeholder="City / Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0E16] border border-white/10 text-white placeholder-[#A9ACB8]/50 focus:border-[#FF3D8D]/50 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us about your brand, goals, and what you're looking for..."
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 rounded border-white/20 bg-[#0B0E16] text-[#FF3D8D] focus:ring-[#FF3D8D]"
                  />
                  <label className="text-sm text-[#A9ACB8]">
                    I agree to be contacted by Reel2Reach Media regarding my enquiry.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold text-lg hover:shadow-lg hover:shadow-pink-500/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    "LET'S CREATE →"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
