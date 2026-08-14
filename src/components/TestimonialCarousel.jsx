import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

export default function TestimonialCarousel({ items }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  const prev = () => {
    setDirection(-1);
    setIndex((i) => (i - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [next]);

  if (!items?.length) return null;
  const t = items[index];

  return (
    <div className="relative max-w-3xl mx-auto text-center">
      <Quote className="mx-auto text-gold/70 mb-6" size={36} />
      <div className="relative min-h-[180px] sm:min-h-[150px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={t.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-2xl sm:text-3xl text-ivory leading-snug italic">"{t.quote}"</p>
            <div className="mt-6 flex items-center justify-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} size={14} className="fill-gold text-gold" />
              ))}
            </div>
            <p className="mt-3 eyebrow text-gold">{t.names}</p>
            <p className="text-sm text-muted mt-1">{t.event}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ivory-dim hover:text-gold hover:border-gold transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {items.map((it, i) => (
            <button
              key={it.id}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-gold' : 'w-1.5 bg-line'}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ivory-dim hover:text-gold hover:border-gold transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
