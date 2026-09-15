import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, ArrowRight, CheckCircle, Instagram, Loader2, Mail, MessageCircle, Phone, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { ArtHero, CreativeStrip, SectionTitle, TiltSurface } from '../components/common/ArtistExperience';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const channels = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 8263058461', href: 'https://wa.me/918263058461', color: '#25D366', note: 'Fastest way to start a project conversation' },
  { icon: Instagram, label: 'Instagram', value: '@ashwini_rathod_19', href: 'https://instagram.com/ashwini_rathod_19', color: '#FF5A8E', note: 'See the creator side and current social activity' },
  { icon: Mail, label: 'Email', value: 'real2reach@gmail.com', href: 'mailto:real2reach@gmail.com', color: '#FF6AA7', note: 'Best for longer briefs, references and documents' },
  { icon: Phone, label: 'Phone', value: '+91 8263058461', href: 'tel:+918263058461', color: '#B48AFF', note: 'Talk directly when a quick call makes more sense' },
];

export default function Contact() {
  const reduceMotion = useReducedMotion();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMsg('Please add your name and phone number.');
      setStatus('error');
      return;
    }
    if (!isSupabaseConfigured()) {
      setErrorMsg('The contact form is temporarily unavailable. Please use WhatsApp, phone or email.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');
    try {
      const { error } = await supabase.from('leads').insert({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        service: 'Contact Form',
        status: 'New',
      });
      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Contact submission failed', error);
      setErrorMsg('We could not send your message right now. Please try again or contact us on WhatsApp.');
      setStatus('error');
    }
  };

  return (
    <div className="pb-16">
      <ArtHero
        eyebrow="CONTACT / OPEN A CONVERSATION"
        lines={['SAY HELLO.', 'SEND THE IDEA.']}
        highlight="LET’S SHAPE IT."
        description="A rough idea, product photo, Instagram profile or voice note can be enough to begin. Choose the channel that feels easiest."
        chips={['WHATSAPP', 'INSTAGRAM', 'EMAIL', 'PHONE']}
        visualLabel="INBOX / OPEN"
        visualTitle="GOOD PROJECTS START MESSY"
        visualSubtitle="You do not need a perfect brief before reaching out. Bring the context — we can help shape the creative direction."
        accent="coral"
      />

      <CreativeStrip words={['HELLO', 'IDEA', 'REFERENCE', 'BRIEF', 'COLLAB', 'CREATE', 'PUBLISH']} />

      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-0 cinematic-grid opacity-[0.09]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="PICK YOUR CHANNEL" title="ONE STUDIO." highlight="FOUR WAYS IN." copy="Use whichever route is most comfortable. The details below come directly from the Reel2Reach profile." align="center" />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((channel, index) => (
              <TiltSurface key={channel.label} className="h-full">
                <motion.a
                  href={channel.href}
                  target={channel.href.startsWith('http') ? '_blank' : undefined}
                  rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * .07 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/8 bg-[#0B0E16] p-6"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-10 blur-2xl transition group-hover:opacity-20" style={{ background: channel.color }} />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]" style={{ color: channel.color }}><channel.icon size={22} /></div>
                  <p className="mt-7 text-[9px] font-semibold tracking-[.2em] text-white/25">CHANNEL / 0{index + 1}</p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-bold">{channel.label}</h3>
                  <p className="mt-2 break-words text-sm text-white/65">{channel.value}</p>
                  <p className="mt-5 text-xs leading-relaxed text-[#A9ACB8]">{channel.note}</p>
                  <div className="mt-auto flex items-center justify-between pt-8 text-xs font-semibold text-white/50"><span>OPEN</span><ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></div>
                </motion.a>
              </TiltSurface>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.05] bg-[#0B0E16]/80 py-24 lg:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-8">
          <div className="relative mx-auto h-[460px] w-full max-w-[430px]">
            <motion.div className="absolute left-[8%] top-[8%] w-[72%] rounded-[30px] border border-white/10 bg-[#10131D] p-6 shadow-[0_36px_100px_rgba(0,0,0,.48)]" animate={reduceMotion ? undefined : { y: [0,-10,0], rotate:[-4,-1.5,-4] }} transition={{duration:6.8,repeat:Infinity,ease:'easeInOut'}}>
              <div className="flex items-center justify-between"><p className="text-[9px] font-semibold tracking-[.2em] text-[#FF6AA7]">NEW MESSAGE</p><MessageCircle size={16} className="text-white/30" /></div>
              <div className="mt-6 space-y-3"><div className="h-2 w-[86%] rounded-full bg-white/10"/><div className="h-2 w-[64%] rounded-full bg-white/8"/><div className="h-2 w-[75%] rounded-full bg-white/8"/></div>
              <div className="mt-7 flex items-center gap-3"><div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#FF5A5F] to-[#8B5CF6]"/><div><div className="h-2 w-20 rounded-full bg-white/12"/><div className="mt-2 h-1.5 w-12 rounded-full bg-white/7"/></div></div>
            </motion.div>
            <motion.div className="absolute bottom-[6%] right-[4%] w-[58%] rounded-[26px] border border-white/10 bg-[#0B0E16]/95 p-5 shadow-[0_30px_90px_rgba(0,0,0,.5)] backdrop-blur-xl" animate={reduceMotion ? undefined : { y:[0,10,0], rotate:[5,2,5] }} transition={{duration:5.7,repeat:Infinity,ease:'easeInOut'}}>
              <Sparkles size={18} className="text-[#B48AFF]"/><p className="mt-4 font-[family-name:var(--font-display)] text-lg font-bold">“Can we make it feel less like an ad?”</p><p className="mt-3 text-xs leading-relaxed text-[#A9ACB8]">Yes. That is usually where the interesting idea begins.</p>
            </motion.div>
          </div>

          <div>
            <SectionTitle eyebrow="SEND A MESSAGE" title="PREFER A" highlight="FORM?" copy="Leave your details here and the enquiry will be saved to the connected Reel2Reach lead system when Supabase is configured." />
            <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="mt-8 rounded-[30px] border border-white/8 bg-[#10131D] p-5 sm:p-7">
              {status === 'success' ? (
                <motion.div initial={{opacity:0,scale:.95}} animate={{opacity:1,scale:1}} className="py-12 text-center"><CheckCircle size={48} className="mx-auto text-[#25D366]"/><h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-bold">MESSAGE SENT.</h3><p className="mx-auto mt-3 max-w-sm text-sm text-[#A9ACB8]">Your message has been submitted successfully.</p></motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status === 'error' && <div role="alert" className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300"><AlertCircle size={17} className="mt-0.5 shrink-0" />{errorMsg}</div>}
                  <div className="grid gap-4 sm:grid-cols-2"><input value={formData.name} onChange={(e)=>{setFormData(p=>({...p,name:e.target.value})); if(status==='error')setStatus('idle');}} required autoComplete="name" className="creative-input" placeholder="Your Name *"/><input type="tel" inputMode="tel" value={formData.phone} onChange={(e)=>{setFormData(p=>({...p,phone:e.target.value})); if(status==='error')setStatus('idle');}} required autoComplete="tel" className="creative-input" placeholder="Phone *"/></div>
                  <input type="email" value={formData.email} onChange={(e)=>setFormData(p=>({...p,email:e.target.value}))} autoComplete="email" className="creative-input" placeholder="Email"/>
                  <textarea value={formData.message} onChange={(e)=>setFormData(p=>({...p,message:e.target.value}))} rows={5} className="creative-input resize-none" placeholder="Tell us what you want to make..."/>
                  <button type="submit" disabled={status==='submitting'} className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] py-3.5 text-sm font-semibold shadow-[0_16px_45px_rgba(255,61,141,.16)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50">{status==='submitting'?<><Loader2 size={17} className="animate-spin"/>SENDING...</>:<>SEND MESSAGE <Send size={15} className="transition-transform group-hover:translate-x-1"/></>}</button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
