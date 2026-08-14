import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Info } from 'lucide-react';
import Seo from '../components/Seo';
import ScrollReveal from '../components/ScrollReveal';
import PackageCard from '../components/PackageCard';
import FAQAccordion from '../components/FAQAccordion';
import Button from '../components/Button';
import { getPackages } from '../services/packageService';
import { getFAQs } from '../services/faqService';

export default function Packages() {
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('wedding');
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    getPackages().then(setData);
    getFAQs().then(setFaqs);
  }, []);

  const list = data ? (tab === 'wedding' ? data.weddingPackages : data.preWeddingPackages) : [];

  return (
    <>
      <Seo
        title="Wedding Packages & Pricing"
        description="Pixel Studio wedding and pre-wedding photography packages with transparent pricing — candid, drone, cinematography and album options."
        path="/packages"
      />

      <section className="pt-36 pb-16 max-w-7xl mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow text-gold mb-4">Investment</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">Packages &amp; Quotation</h1>
          <p className="text-ivory-dim mt-5">
            Straightforward pricing for wedding and pre-wedding coverage. Every package can be tailored — reach out
            for a custom quote built around your dates.
          </p>
        </ScrollReveal>

        <div className="flex justify-center gap-3 mb-14">
          {[
            { id: 'wedding', label: 'Wedding Packages' },
            { id: 'pre-wedding', label: 'Pre-Wedding Packages' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-6 py-3 text-xs uppercase tracking-widest font-semibold border transition-colors ${
                tab === t.id ? 'bg-gold text-ink border-gold' : 'border-line text-ivory-dim hover:border-gold hover:text-gold'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} />
          ))}
        </motion.div>

        {data && (
          <ScrollReveal className="mt-10 flex items-start gap-3 max-w-2xl mx-auto text-center justify-center">
            <p className="text-xs text-muted leading-relaxed">
              <Info size={13} className="inline mr-1 -mt-0.5" />
              {data.packageNote}
            </p>
          </ScrollReveal>
        )}
      </section>

      {/* ADD ONS */}
      <section className="bg-ink-soft border-y border-line/60 py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <ScrollReveal className="text-center mb-12">
            <p className="eyebrow text-gold mb-4">Custom Packages</p>
            <h2 className="font-display text-4xl text-ivory">Popular add-ons</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data?.addOns.map((addon) => (
              <div key={addon.id} className="p-6 border border-line/70 bg-surface/50">
                <h4 className="font-display text-lg text-ivory mb-2">{addon.name}</h4>
                <p className="text-sm text-ivory-dim">{addon.note}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-ivory-dim mt-10">
            Don't see what you need? <Link to="/contact" className="text-gold hover:underline">Tell us your requirements</Link> and we'll build a custom package.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 sm:px-8 py-24">
        <ScrollReveal className="text-center mb-14">
          <p className="eyebrow text-gold mb-4">Questions</p>
          <h2 className="font-display text-4xl text-ivory">Package FAQ</h2>
        </ScrollReveal>
        {faqs.length > 0 && <FAQAccordion items={faqs} />}
      </section>

      <section className="pb-28 text-center px-6">
        <Button to="/contact" variant="primary" icon={ArrowRight}>Book Your Date</Button>
      </section>
    </>
  );
}
