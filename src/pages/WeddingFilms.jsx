import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Clock, Film } from 'lucide-react';
import Seo from '../components/Seo';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { getVideos } from '../services/videoService';

export default function WeddingFilms() {
  const [films, setFilms] = useState([]);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getVideos().then(setFilms);
  }, []);

  return (
    <>
      <Seo
        title="Wedding Films"
        description="Cinematic wedding films by Pixel Studio — highlight reels, teasers and full-day cinematography."
        path="/wedding-films"
      />

      <section className="pt-36 pb-16 max-w-7xl mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-gold mb-4">Wedding Films</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">Motion Tells It Differently</h1>
          <p className="text-ivory-dim mt-5">
            A cinematic wedding film cut from hours of footage into minutes you'll actually rewatch — from teaser
            reels to the full ceremony story.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {films.map((film, i) => (
            <motion.button
              key={film.id}
              onClick={() => setActive(film)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-left group focus-visible:outline-2 focus-visible:outline-gold"
              aria-label={`Play ${film.title}`}
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={film.thumbnail}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/55 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full bg-gold/95 flex items-center justify-center shadow-soft"
                  >
                    <Play size={22} className="text-ink ml-1" fill="currentColor" />
                  </motion.span>
                </div>
                <span className="absolute bottom-3 right-3 text-xs bg-ink/70 text-ivory px-2 py-1 flex items-center gap-1">
                  <Clock size={12} /> {film.duration}
                </span>
              </div>
              <h3 className="font-display text-xl text-ivory mt-4 group-hover:text-gold transition-colors">
                {film.title}
              </h3>
              <p className="text-sm text-ivory-dim mt-2 leading-relaxed">{film.description}</p>
            </motion.button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-3">
                <button onClick={() => setActive(null)} aria-label="Close" className="text-ivory hover:text-gold">
                  <X size={26} />
                </button>
              </div>

              {active.src ? (
                <video src={active.src} controls autoPlay className="w-full aspect-video bg-black" />
              ) : (
                <div className="w-full aspect-video bg-surface border border-line flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <Film className="text-gold" size={36} />
                  <p className="font-display text-2xl text-ivory">Full film coming soon</p>
                  <p className="text-sm text-ivory-dim max-w-sm">
                    This wedding film hasn't been uploaded yet. Add an .mp4 to <code className="text-gold">src/assets/videos</code> and
                    set its <code className="text-gold">src</code> in <code className="text-gold">src/mock/videos.js</code> to play it here.
                  </p>
                  <Button to="/contact" variant="outline" className="mt-2">Ask To See A Sample</Button>
                </div>
              )}

              <h3 className="font-display text-2xl text-ivory mt-5">{active.title}</h3>
              <p className="text-sm text-ivory-dim mt-2">{active.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
