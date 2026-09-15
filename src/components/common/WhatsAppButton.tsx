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

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#07090F]/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-2xl md:hidden">
        <div className="grid grid-cols-2">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-center gap-2 px-3 text-sm font-semibold text-[#8BF0A9]" aria-label="Chat on WhatsApp">
            <MessageCircle size={18} /> WhatsApp
          </a>
          <Link to="/book" className="flex min-h-14 items-center justify-center gap-2 bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] px-3 text-sm font-semibold text-white">
            Book Now <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
