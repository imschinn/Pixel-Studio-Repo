import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const goNext = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const goPrev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, onClose, goNext, goPrev]);

  if (index === null) return null;
  const img = images[index];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] bg-ink/97 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={img.title}
      >
        <button
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-6 right-6 text-ivory hover:text-gold transition-colors z-10"
        >
          <X size={30} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); goPrev(); }}
          aria-label="Previous image"
          className="absolute left-3 sm:left-8 text-ivory hover:text-gold transition-colors z-10"
        >
          <ChevronLeft size={34} />
        </button>

        <motion.figure
          key={img.id}
          className="max-h-[85vh] max-w-4xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={img.src} alt={img.title} className="max-h-[75vh] w-auto mx-auto object-contain shadow-soft" />
          <figcaption className="text-center mt-4">
            <p className="font-display text-xl text-ivory">{img.title}</p>
            <p className="text-xs text-muted eyebrow mt-1">{img.location}</p>
          </figcaption>
        </motion.figure>

        <button
          onClick={(e) => { e.stopPropagation(); goNext(); }}
          aria-label="Next image"
          className="absolute right-3 sm:right-8 text-ivory hover:text-gold transition-colors z-10"
        >
          <ChevronRight size={34} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
