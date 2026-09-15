import { MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDemoCmsRows } from '../../lib/useDemoCms';

type SettingRow = { key: string; value: string };

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const { rows: settingsRows } = useDemoCmsRows<SettingRow>('site_settings', 'key');
  const settings = useMemo(() => Object.fromEntries(settingsRows.map((row) => [row.key, row.value])), [settingsRows]);
  const whatsappNumber = (settings.whatsapp_number || '918263058461').replace(/\D/g, '');
  const siteName = settings.site_name || 'Reel2Reach Media';
  const message = encodeURIComponent(`Hi ${siteName},\nI would like to discuss social media promotion/content creation for my business.`);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 hidden md:block">
        <AnimatePresence>
          {showTooltip && (
            <motion.div initial={{ opacity: 0, y: 10, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: .96 }} className="absolute bottom-16 right-0 whitespace-nowrap rounded-xl border border-white/10 bg-[#0B0E16]/95 px-4 py-2.5 text-xs font-semibold text-white shadow-2xl backdrop-blur-xl">
              Start a WhatsApp chat
            </motion.div>
          )}
        </AnimatePresence>
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ y: -3, scale: 1.04 }}
          whileTap={{ scale: .96 }}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#25D366] shadow-[0_18px_50px_rgba(37,211,102,.25)]"
          aria-label="Chat with Reel2Reach on WhatsApp"
          data-cursor-text="CHAT"
        >
          <MessageCircle size={24} className="text-white" />
        </motion.a>
      </div>

      <div className="mobile-conversion-bar fixed bottom-[calc(.65rem+env(safe-area-inset-bottom))] left-3 right-3 z-50 rounded-[22px] border border-white/10 bg-[#090B12]/92 p-1.5 shadow-[0_22px_70px_rgba(0,0,0,.48)] backdrop-blur-2xl md:hidden">
        <div className="grid grid-cols-[.92fr_1.08fr] gap-1.5">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-center gap-2 rounded-[16px] border border-white/[0.06] bg-white/[0.035] px-3 text-[13px] font-semibold text-[#9CF5B5] transition active:scale-[.98]" aria-label="Chat on WhatsApp">
            <MessageCircle size={17} /> WhatsApp
          </a>
          <Link to="/book" className="flex min-h-12 items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-[#FF5A5F] via-[#FF3D8D] to-[#8B5CF6] px-3 text-[13px] font-bold text-white shadow-[0_10px_28px_rgba(255,61,141,.22)] transition active:scale-[.98]">
            Start a Project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
