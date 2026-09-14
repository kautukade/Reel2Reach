import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const whatsappUrl = "https://wa.me/918263058461?text=Hi%20Reel2Reach%20Media%2C%0AI%20would%20like%20to%20discuss%20social%20media%20promotion%2Fcontent%20creation%20for%20my%20business.";

  return (
    <>
      {/* Desktop floating button */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-16 right-0 bg-white text-gray-900 text-sm px-4 py-2 rounded-lg shadow-xl whitespace-nowrap"
            >
              Chat with us!
            </motion.div>
          )}
        </AnimatePresence>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={24} className="text-white" />
        </a>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
        <div className="flex">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 text-[#25D366] font-semibold text-sm"
          >
            <MessageCircle size={18} /> WhatsApp
          </a>
          <a
            href="/book"
            className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#FF5A5F] to-[#FF3D8D] text-white font-semibold text-sm"
          >
            Book Now →
          </a>
        </div>
      </div>
    </>
  );
}
