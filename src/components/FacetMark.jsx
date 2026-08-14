import { motion } from 'framer-motion';

// The site's signature element: an abstraction of the eight facets in the
// Pixel Studio "P" mark, used as a section divider / loading motif instead
// of a generic rule or numbered marker. Colors map 1:1 to the real logo.
const FACETS = [
  'var(--color-facet-orange)',
  'var(--color-facet-amber)',
  'var(--color-facet-blue)',
  'var(--color-facet-blue-soft)',
  'var(--color-facet-green)',
  'var(--color-facet-mint)',
  'var(--color-facet-red)',
  'var(--color-facet-sky)',
];

export default function FacetMark({ className = '', size = 10, animate = true, gap = 6 }) {
  return (
    <div className={`flex items-center ${className}`} style={{ gap }} aria-hidden="true">
      {FACETS.map((color, i) =>
        animate ? (
          <motion.span
            key={color + i}
            style={{ backgroundColor: color, width: size, height: size }}
            className="inline-block"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
          />
        ) : (
          <span key={color + i} style={{ backgroundColor: color, width: size, height: size }} className="inline-block" />
        )
      )}
    </div>
  );
}

export { FACETS };
