import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Video, Sparkles, PlaneTakeoff, ArrowRight, Play } from 'lucide-react';
import Seo from '../components/Seo';
import Button from '../components/Button';
import FacetMark from '../components/FacetMark';
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal';
import StatCounter from '../components/StatCounter';
import TestimonialCarousel from '../components/TestimonialCarousel';
import FAQAccordion from '../components/FAQAccordion';
import { getPortfolio } from '../services/portfolioService';
import { getTestimonials } from '../services/testimonialService';
import { getFAQs } from '../services/faqService';
import iconMark from '../assets/logo/icon-mark.png';
import photo05 from '../assets/photos/photo-05.webp';

const HERO_IMAGES_KEYS = ['ps-01', 'ps-05', 'ps-07', 'ps-03'];

const SERVICES = [
  { icon: Camera, title: 'Traditional Photography', desc: 'Formal, timeless coverage of every ritual — the frames your parents will frame.' },
  { icon: Sparkles, title: 'Candid Photography', desc: 'Documentary-style storytelling that catches the in-between moments no one poses for.' },
  { icon: Video, title: 'Cinematography', desc: 'Cinematic wedding films, highlight reels and same-day edits set to sound.' },
  { icon: PlaneTakeoff, title: 'Drone Coverage', desc: 'Aerial establishing shots of the venue, baraat and mandap from above.' },
];

export default function Home() {
  const [heroImages, setHeroImages] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    getPortfolio().then((images) => {
      setHeroImages(images.filter((img) => HERO_IMAGES_KEYS.includes(img.id)));
      setFeatured(images.slice(0, 6));
    });
    getTestimonials().then(setTestimonials);
    getFAQs().then((f) => setFaqs(f.slice(0, 4)));
  }, []);

  useEffect(() => {
    if (!heroImages.length) return;
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % heroImages.length), 4500);
    return () => clearInterval(id);
  }, [heroImages]);

  return (
    <>
      <Seo
        title="Cinematic Wedding Photography in Jaora, Ratlam"
        description="Pixel Studio is a premium wedding photography and film studio in Jaora, Ratlam, M.P. — traditional, candid, drone and cinematography for weddings and pre-weddings."
        path="/"
      />

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] w-full overflow-hidden">
        <AnimatePresence mode="sync">
          {heroImages.length > 0 && (
            <motion.div
              key={heroImages[heroIndex].id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={heroImages[heroIndex].src}
                alt=""
                className="w-full h-full object-cover object-[center_20%]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-ink/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.img
            src={iconMark}
            alt=""
            className="h-14 sm:h-16 w-auto mb-6"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />

          <motion.p
            className="eyebrow text-gold mb-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Jaora · Ratlam · Madhya Pradesh
          </motion.p>

          <motion.h1
            className="font-display text-5xl sm:text-7xl lg:text-8xl text-ivory leading-[1.02] max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            Your Story,<br />
            <span className="italic text-gold-gradient">Told Cinematically</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-ivory-dim max-w-xl text-base sm:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Pixel Studio is a premium wedding photography &amp; film house — traditional, candid, drone and
            cinematography, crafted with a documentary eye.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Button to="/portfolio" variant="primary" icon={ArrowRight}>View Portfolio</Button>
            <Button to="/wedding-films" variant="outline" icon={Play}>Watch Wedding Films</Button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ivory-dim"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          {/* <span className="eyebrow">Scroll</span> */}
          {/* <div className="w-px h-10 bg-gradient-to-b from-gold to-transparent" /> */}
        </motion.div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <ScrollReveal>
          <div className="relative">
            <img src={photo05} alt="Bride and groom in a candlelit corridor" className="w-full max-w-md mx-auto lg:mx-0 shadow-soft" />
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 border border-gold/50 -z-10" />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="eyebrow text-gold mb-4">About The Studio</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-tight mb-6">
            Photography that feels like <span className="italic text-gold-gradient">memory</span>, not performance
          </h2>
          <p className="text-ivory-dim leading-relaxed mb-4">
            We started Pixel Studio to shoot weddings the way we'd want our own remembered — warm light, real
            reactions, and a crew that blends into the day instead of directing it.
          </p>
          <p className="text-ivory-dim leading-relaxed mb-8">
            From traditional coverage to candid storytelling, drone cinematography to same-day highlight reels,
            every package is built around one goal: a film and album your family will actually watch and hold.
          </p>
          <Button to="/about" variant="outline" icon={ArrowRight}>More About Us</Button>
        </ScrollReveal>
      </section>

      {/* SERVICES */}
      <section className="bg-ink-soft py-24 sm:py-32 border-y border-line/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-gold mb-4">What We Do</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">Coverage built for every part of the day</h2>
          </ScrollReveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <StaggerItem key={s.title}>
                <motion.div
                  whileHover={{ y: -8, borderColor: 'var(--color-gold)' }}
                  className="h-full p-8 border border-line/70 bg-surface/50 transition-colors"
                >
                  <s.icon className="text-gold mb-5" size={28} strokeWidth={1.5} />
                  <h3 className="font-display text-xl text-ivory mb-3">{s.title}</h3>
                  <p className="text-sm text-ivory-dim leading-relaxed">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* FEATURED PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-gold mb-4">Featured Work</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">Recent wedding stories</h2>
          </div>
          <Link to="/portfolio" className="eyebrow text-ivory-dim hover:text-gold transition-colors flex items-center gap-2">
            View Full Portfolio <ArrowRight size={14} />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 [grid-auto-flow:dense]">
          {featured.map((img, i) => (
            <motion.div
              key={img.id}
              className={`overflow-hidden relative group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}
            >
              <Link to="/portfolio">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-[4/5] transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <p className="text-ivory font-display text-lg">{img.title}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-ink-soft border-y border-line/60 py-20">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCounter value={250} suffix="+" label="Weddings Shot" />
          <StatCounter value={6} suffix="+" label="Years Experience" />
          <StatCounter value={40} suffix="+" label="Cities Covered" />
          <StatCounter value={98} suffix="%" label="Happy Couples" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-5xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
        <ScrollReveal className="text-center mb-16">
          <p className="eyebrow text-gold mb-4">Kind Words</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory">From couples we've worked with</h2>
        </ScrollReveal>
        {testimonials.length > 0 && <TestimonialCarousel items={testimonials} />}
      </section>

      {/* FAQ PREVIEW */}
      <section className="bg-ink-soft border-y border-line/60 py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          <ScrollReveal className="text-center mb-14">
            <p className="eyebrow text-gold mb-4">Good To Know</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">Frequently asked questions</h2>
          </ScrollReveal>
          {faqs.length > 0 && <FAQAccordion items={faqs} />}
          <div className="text-center mt-10">
            <Button to="/contact" variant="ghost" icon={ArrowRight}>More Questions? Get In Touch</Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <img src={photo05} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-ink/85" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <FacetMark className="justify-center mb-8" />
          <h2 className="font-display text-4xl sm:text-6xl text-ivory leading-tight mb-6">
            Ready to check your <span className="italic text-gold-gradient">wedding date?</span>
          </h2>
          <p className="text-ivory-dim mb-10 max-w-xl mx-auto">
            Tell us your date and venue — we'll confirm availability and walk you through the right package.
          </p>
          <Button to="/contact" variant="primary" icon={ArrowRight}>Book Your Date</Button>
        </div>
      </section>
    </>
  );
}
