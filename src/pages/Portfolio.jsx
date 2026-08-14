import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Seo from '../components/Seo';
import ScrollReveal from '../components/ScrollReveal';
import Lightbox from '../components/Lightbox';
import { getPortfolio, getCategories } from '../services/portfolioService';

const LABELS = {
  all: 'All',
  wedding: 'Wedding',
  'pre-wedding': 'Pre-Wedding',
  couple: 'Couple',
  candid: 'Candid',
  events: 'Events',
};

export default function Portfolio() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    getPortfolio().then((data) => {
      setImages(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => getCategories(), []);

  const filtered = useMemo(
    () => (filter === 'all' ? images : images.filter((img) => img.category === filter)),
    [images, filter]
  );

  return (
    <>
      <Seo
        title="Portfolio"
        description="Browse Pixel Studio's wedding, pre-wedding, candid and event photography portfolio — real weddings shot across Madhya Pradesh."
        path="/portfolio"
      />

      <section className="pt-36 pb-16 max-w-7xl mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow text-gold mb-4">The Portfolio</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">Every Frame, A Story</h1>
          <p className="text-ivory-dim mt-5">
            A selection of real weddings and pre-wedding shoots — traditional portraits, candid documentary moments,
            and the quiet in-between.
          </p>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs uppercase tracking-widest font-semibold border transition-colors ${
                filter === cat
                  ? 'bg-gold text-ink border-gold'
                  : 'border-line text-ivory-dim hover:border-gold hover:text-gold'
              }`}
            >
              {LABELS[cat] ?? cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] bg-surface animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="columns-2 md:columns-3 gap-4 space-y-4">
            <AnimatePresence>
              {filtered.map((img, i) => {
                const realIndex = filtered.indexOf(img);
                return (
                  <motion.button
                    layout
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}
                    onClick={() => setLightboxIndex(realIndex)}
                    className="relative block w-full mb-4 break-inside-avoid overflow-hidden group focus-visible:outline-2 focus-visible:outline-gold"
                    aria-label={`Open ${img.title} full screen`}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end items-start p-5 text-left">
                      <p className="text-ivory font-display text-xl">{img.title}</p>
                      <p className="text-xs text-gold eyebrow mt-1">{img.location}</p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      <Lightbox
        images={filtered}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
