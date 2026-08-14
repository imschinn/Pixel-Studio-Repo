import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import Button from './Button';

export default function PackageCard({ pkg, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`relative flex flex-col p-8 border transition-colors duration-300 ${
        pkg.popular ? 'border-gold bg-surface' : 'border-line/70 bg-surface/60 hover:border-gold/60'
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-8 bg-gold text-ink text-[11px] font-bold uppercase tracking-widest px-3 py-1 flex items-center gap-1">
          <Star size={11} className="fill-ink" /> Most Popular
        </span>
      )}

      <h3 className="font-display text-2xl text-ivory">{pkg.name}</h3>
      <p className="eyebrow text-muted mt-1">{pkg.days} {pkg.days > 1 ? 'Days' : 'Day'} Coverage</p>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-sm text-muted">₹</span>
        <span className="font-display text-4xl text-gold-gradient font-semibold">{pkg.price.toLocaleString('en-IN')}</span>
        <span className="text-sm text-muted">/-</span>
      </div>

      <ul className="mt-6 space-y-3 flex-1">
        {pkg.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-ivory-dim leading-relaxed">
            <Check size={16} className="text-gold shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Button to="/contact" variant={pkg.popular ? 'primary' : 'outline'} className="mt-8 w-full">
        Book This Package
      </Button>
    </motion.div>
  );
}
