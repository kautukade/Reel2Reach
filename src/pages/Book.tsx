import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Clapperboard, Loader2, MessageCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ArtHero, CreativeStrip, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const serviceOptions = ['Content Creation', 'Influencer Promotion', 'Social Media Management', 'Complete Package', 'Brand Collaboration', 'Custom'];
const budgetOptions = ['Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹30,000', '₹30,000+', 'Not sure yet'];
const today = new Date().toISOString().split('T')[0];

export default function Book() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', business_name: '', phone: '', email: '', instagram: '', category: '', service: '', budget: '', preferred_date: '', location: '', message: '', consent: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setFormData((previous) => ({ ...previous, [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.service) {
      setErrorMsg('Please complete your name, phone number and required service.');
      setStatus('error');
      return;
    }
    if (!formData.consent) {
      setErrorMsg('Please agree to be contacted about this enquiry.');
      setStatus('error');
      return;
    }
    if (!isSupabaseConfigured()) {
      setErrorMsg('Online booking is temporarily unavailable. Please use WhatsApp and we will help you directly.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name.trim(),
        business_name: formData.business_name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        instagram: formData.instagram.trim(),
        category: formData.category.trim(),
        service: formData.service,
        budget: formData.budget,
        preferred_date: formData.preferred_date,
        location: formData.location.trim(),
        message: formData.message.trim(),
        status: 'New',
      });
      if (error) throw error;
      setStatus('success');
    } catch (error) {
      console.error('Booking submission failed', error);
      setErrorMsg('We could not send your brief right now. Please try again or message us on WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="BOOK A COLLAB / START WITH THE IDEA"
        lines={['DON’T SEND US', 'A “NORMAL” BRIEF.']}
        highlight="SEND THE WEIRD ONE."
        description="Tell us what you sell, who you want to reach and what you want people to feel. We will turn that into a creative direction worth shooting."
        chips={['BRAND BRIEF', 'SHOOT', 'COLLAB', 'SOCIAL SYSTEM']}
        visualLabel="NEW PROJECT / OPEN"
        visualTitle="YOUR BRAND COULD LOOK LIKE THIS"
        visualSubtitle="Every project starts blank. The interesting part is deciding what world the brand should live in."
        accent="pink"
      />

      <CreativeStrip words={['TELL US', 'SHOW US', 'CHALLENGE US', 'LET’S MAKE IT', 'PUBLISH IT']} />

      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="pointer-events-none absolute left-[8%] top-[10%] h-80 w-80 rounded-full bg-[#FF3D8D]/8 blur-[120px]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:px-8">
          <div className="lg:sticky lg:top-28">
            <SectionTitle eyebrow="CREATIVE BRIEF" title="THE FIRST FRAME" highlight="STARTS HERE" copy="You do not need to know the exact reel idea. Give us the business context and we can shape the creative direction around it." />

            <div className="mt-8 space-y-4">
              {[
                { n: '01', title: 'You share the context', copy: 'Brand, product, audience, budget and what you want to achieve.' },
                { n: '02', title: 'We shape the direction', copy: 'Hook, format, visual mood, creator angle and content structure.' },
                { n: '03', title: 'We build the content', copy: 'Shoot, edit, polish and turn the idea into social-ready media.' },
              ].map((step, index) => (
                <TiltSurface key={step.title}>
                  <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:index*.06}} className="rounded-2xl border border-white/8 bg-[#0B0E16]/90 p-5">
                    <div className="flex gap-4"><span className="font-[family-name:var(--font-display)] text-3xl font-bold text-white/[0.08]">{step.n}</span><div><h3 className="font-semibold">{step.title}</h3><p className="mt-1 text-xs leading-relaxed text-[#A9ACB8]">{step.copy}</p></div></div>
                  </motion.div>
                </TiltSurface>
              ))}
            </div>

            <motion.a
              href="https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%20I%20want%20to%20book%20a%20collaboration."
              target="_blank"
              rel="noopener noreferrer"
              initial={{opacity:0,y:18}}
              whileInView={{opacity:1,y:0}}
              viewport={{once:true}}
              className="group mt-6 flex items-center justify-between rounded-2xl border border-[#25D366]/20 bg-[#25D366]/[0.05] p-4 text-sm"
            >
              <span className="flex items-center gap-3 text-white/70"><MessageCircle size={18} className="text-[#25D366]" /> Prefer WhatsApp?</span><ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>

          <motion.div initial={{opacity:0,y:36}} animate={{opacity:1,y:0}} transition={{delay:.18,duration:.8}} className="relative overflow-hidden rounded-[32px] border border-white/9 bg-[#0B0E16] p-5 shadow-[0_40px_110px_rgba(0,0,0,.42)] sm:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#8B5CF6]/10 blur-[90px]" />
            <div className="relative mb-8 flex items-center justify-between border-b border-white/[0.06] pb-5"><div><p className="text-[9px] font-semibold tracking-[.22em] text-[#FF6AA7]">PROJECT INTAKE / 001</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-bold">Tell us what we’re making.</h2></div><motion.div animate={reduceMotion ? undefined : {rotate:[-5,7,-5]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[#FF6AA7]"><Clapperboard size={20}/></motion.div></div>

            {status === 'success' ? (
              <motion.div initial={{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} className="relative py-16 text-center">
                <CheckCircle size={58} className="mx-auto text-[#25D366]" />
                <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold">BRIEF RECEIVED.</h2>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#A9ACB8]">Your project details were submitted successfully. If you want to add photos, references or extra context, continue the conversation on WhatsApp.</p>
                <a href="https://wa.me/918263058461" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold">Continue on WhatsApp <ArrowRight size={15}/></a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-5">
                {status === 'error' && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300"><AlertCircle size={17} className="mt-0.5 shrink-0" />{errorMsg}</div>}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *"><input name="name" value={formData.name} onChange={handleChange} required autoComplete="name" className="creative-input" placeholder="Your name" /></Field>
                  <Field label="Business / Brand"><input name="business_name" value={formData.business_name} onChange={handleChange} className="creative-input" placeholder="Brand name" /></Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone / WhatsApp *"><input type="tel" inputMode="tel" name="phone" value={formData.phone} onChange={handleChange} required autoComplete="tel" className="creative-input" placeholder="+91 XXXXXXXXXX" /></Field>
                  <Field label="Email"><input type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" className="creative-input" placeholder="you@email.com" /></Field>
                </div>

                <Field label="Instagram Handle"><input name="instagram" value={formData.instagram} onChange={handleChange} className="creative-input" placeholder="@yourbrand" /></Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Business Category"><input name="category" value={formData.category} onChange={handleChange} className="creative-input" placeholder="Fashion, Food, Retail..." /></Field>
                  <Field label="Required Service *"><select name="service" value={formData.service} onChange={handleChange} required className="creative-input"><option value="">Select service</option>{serviceOptions.map((service)=><option key={service} value={service}>{service}</option>)}</select></Field>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Budget Range"><select name="budget" value={formData.budget} onChange={handleChange} className="creative-input"><option value="">Select budget</option>{budgetOptions.map((budget)=><option key={budget} value={budget}>{budget}</option>)}</select></Field>
                  <Field label="Preferred Shoot Date"><input type="date" min={today} name="preferred_date" value={formData.preferred_date} onChange={handleChange} className="creative-input" /></Field>
                </div>

                <Field label="Location"><input name="location" value={formData.location} onChange={handleChange} className="creative-input" placeholder="City / Area" /></Field>
                <Field label="Tell us the idea"><textarea name="message" value={formData.message} onChange={handleChange} rows={5} className="creative-input resize-none" placeholder="What are you launching? What should people feel? Any reference or wild idea is welcome..." /></Field>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs leading-relaxed text-[#A9ACB8]"><input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="mt-0.5 accent-[#FF3D8D]" /><span>I agree to be contacted by Reel2Reach Media regarding this enquiry.</span></label>

                <button type="submit" disabled={status === 'submitting'} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] py-4 text-sm font-semibold shadow-[0_18px_55px_rgba(255,61,141,.18)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">
                  {status === 'submitting' ? <><Loader2 size={18} className="animate-spin" /> SENDING BRIEF...</> : <>SEND THE BRIEF <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"><div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[#10131D] px-6 py-12 text-center"><Sparkles className="mx-auto text-[#FF6AA7]" size={22}/><h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold sm:text-4xl">NO PERFECT BRIEF REQUIRED.</h2><p className="mx-auto mt-3 max-w-lg text-sm text-[#A9ACB8]">A product photo, Instagram link and rough idea are enough to start a useful conversation.</p></div></section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-xs font-medium text-white/70">{label}</span>{children}</label>;
}
