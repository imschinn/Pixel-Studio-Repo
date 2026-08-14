import { motion, AnimatePresence } from 'framer-motion';
import { FACETS } from './FacetMark';

// Premium photographer-style loading screen: the eight logo facets fly in
// and assemble, echoing the real Pixel Studio mark, then the wordmark fades up.
export default function LoadingScreen({ show }) {
  const positions = [
    { x: -18, y: -18 }, { x: 0, y: -18 }, { x: 18, y: -18 },
    { x: -18, y: 0 },                     { x: 18, y: 0 },
    { x: -18, y: 18 }, { x: 0, y: 18 },   { x: 18, y: 18 },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center gap-6"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="relative w-24 h-24">
            {FACETS.map((color, i) => (
              <motion.span
                key={color + i}
                className="absolute w-6 h-6"
                style={{ backgroundColor: color, left: '50%', top: '50%' }}
                initial={{ x: positions[i].x * 4, y: positions[i].y * 4, opacity: 0, scale: 0.4 }}
                animate={{ x: positions[i].x, y: positions[i].y, opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              />
            ))}
          </div>
          <motion.p
            className="font-display text-2xl tracking-[0.2em] text-ivory"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            PIXEL <span className="text-gold">STUDIO</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
