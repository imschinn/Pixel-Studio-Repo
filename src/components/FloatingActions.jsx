import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Phone, ArrowUp } from 'lucide-react';

const WHATSAPP_NUMBER = '919752886676'; // placeholder formatted from studio phone number
const CALL_NUMBER = '9752886676';

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.8 14.1c-.24.68-1.4 1.33-1.93 1.4-.5.08-1.11.11-1.8-.11a15.9 15.9 0 0 1-1.7-.63c-3-1.3-4.96-4.32-5.11-4.52-.15-.2-1.22-1.62-1.22-3.1 0-1.47.77-2.2 1.05-2.5.27-.3.6-.37.8-.37.2 0 .4 0 .58.01.19.01.44-.07.68.53.25.6.85 2.08.92 2.23.08.15.13.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.31-.13.6.17.3.77 1.28 1.66 2.08 1.14 1.03 2.1 1.35 2.4 1.5.3.15.47.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.66-.15.27.1 1.73.82 2.02.97.3.15.5.22.57.34.07.13.07.75-.17 1.43Z" />
    </svg>
  );
}

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 700);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => scrollYProgress.on('change', (v) => setProgress(v)), [scrollYProgress]);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const R = 20;
  const circumference = 2 * Math.PI * R;

  return (
    <div className="fixed z-40 right-5 bottom-5 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            onClick={scrollTop}
            aria-label="Back to top"
            className="relative w-11 h-11 rounded-full bg-surface border border-line flex items-center justify-center text-ivory hover:text-gold transition-colors"
          >
            <svg className="absolute inset-0 -rotate-90" width="44" height="44">
              <circle cx="22" cy="22" r={R} fill="none" stroke="var(--color-line)" strokeWidth="2" />
              <circle
                cx="22"
                cy="22"
                r={R}
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="2"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.a
        href={`tel:${CALL_NUMBER}`}
        aria-label="Call Pixel Studio"
        className="sm:hidden w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center text-ivory shadow-soft"
        whileTap={{ scale: 0.9 }}
      >
        <Phone size={20} />
      </motion.a>

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Pixel Studio, I would like to enquire about wedding photography packages.')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Pixel Studio on WhatsApp"
        className="w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center text-ink shadow-soft"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={{ y: [0, -4, 0] }}
        transition={{ y: { repeat: Infinity, duration: 2.6, ease: 'easeInOut' } }}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </motion.a>
    </div>
  );
}
