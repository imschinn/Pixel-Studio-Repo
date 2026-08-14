import { motion } from 'framer-motion';

// Reusable scroll-triggered reveal: fade in + slide up + slight scale.
// Wrap any section content in this for the "on scroll" animation language
// used consistently across the site.
export default function ScrollReveal({
  children,
  delay = 0,
  y = 28,
  duration = 0.7,
  className = '',
  as: Component = motion.div,
  once = true,
}) {
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}

export function StaggerGroup({ children, className = '', stagger = 0.12, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', y = 24 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
