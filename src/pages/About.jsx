import { ArrowRight, Heart, Camera, Users, Award } from 'lucide-react';
import Seo from '../components/Seo';
import ScrollReveal, { StaggerGroup, StaggerItem } from '../components/ScrollReveal';
import Button from '../components/Button';
import StatCounter from '../components/StatCounter';
import FacetMark from '../components/FacetMark';
import photo03 from '../assets/photos/photo-03.webp';
import photo06 from '../assets/photos/photo-06.webp';
import photo02 from '../assets/photos/photo-02.webp';

const VALUES = [
  { icon: Heart, title: 'Documentary First', desc: 'We shoot what actually happens before we ever ask you to pose. The real moments always win.' },
  { icon: Camera, title: 'Light Over Gear', desc: 'Golden hour, candlelight, chandeliers — we chase real light, not just equipment specs.' },
  { icon: Users, title: 'Family-Aware', desc: 'Indian weddings involve fifty people with fifty opinions. We work with your family, not around them.' },
  { icon: Award, title: 'Consistent Delivery', desc: 'Clear timelines, daily shoot updates, and albums that arrive when we say they will.' },
];

export default function About() {
  return (
    <>
      <Seo
        title="About Pixel Studio"
        description="Meet Pixel Studio — a wedding photography and cinematography team based in Jaora, Ratlam, M.P., shooting documentary-style weddings across India."
        path="/about"
      />

      <section className="pt-36 pb-20 max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <ScrollReveal>
          <p className="eyebrow text-gold mb-4">About Us</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory leading-tight mb-6">
            We photograph weddings like <span className="italic text-gold-gradient">memory</span>, not events
          </h1>
          <p className="text-ivory-dim leading-relaxed mb-4">
            Pixel Studio began in Jaora with one belief: a wedding day is not a set of poses to collect, it's a story
            already unfolding — you just need someone who knows where to stand.
          </p>
          <p className="text-ivory-dim leading-relaxed mb-8">
            Today the team covers traditional ceremony photography, candid documentary coverage, drone cinematography
            and full wedding films across Madhya Pradesh and beyond, working from intimate court weddings to
            multi-day celebrations with a thousand guests.
          </p>
          <Button to="/contact" variant="primary" icon={ArrowRight}>Book a Consultation</Button>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="grid grid-cols-2 gap-4">
          <img src={photo03} alt="Bridal portrait in a garden" className="w-full h-72 object-cover mt-10" />
          <img src={photo02} alt="Couple portrait" className="w-full h-72 object-cover" />
          <img src={photo06} alt="Bridal close-up portrait" className="w-full h-72 object-cover col-span-2" />
        </ScrollReveal>
      </section>

      {/* PHILOSOPHY / VALUES */}
      <section className="bg-ink-soft border-y border-line/60 py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
            <p className="eyebrow text-gold mb-4">Our Approach</p>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">How we work</h2>
          </ScrollReveal>

          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full p-8 border border-line/70 bg-surface/50 hover:border-gold/60 transition-colors">
                  <v.icon className="text-gold mb-5" size={28} strokeWidth={1.5} />
                  <h3 className="font-display text-xl text-ivory mb-3">{v.title}</h3>
                  <p className="text-sm text-ivory-dim leading-relaxed">{v.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCounter value={250} suffix="+" label="Weddings Shot" />
          <StatCounter value={6} suffix="+" label="Years Experience" />
          <StatCounter value={40} suffix="+" label="Cities Covered" />
          <StatCounter value={12} suffix="+" label="Team Members" />
        </div>
      </section>

      {/* WHY COUPLES CHOOSE US */}
      <section className="bg-ink-soft border-y border-line/60 py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
          <FacetMark className="justify-center mb-8" />
          <p className="eyebrow text-gold mb-4">Why Couples Choose Us</p>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory leading-tight mb-8">
            One team, every deliverable — <span className="italic text-gold-gradient">no scattered vendors</span>
          </h2>
          <p className="text-ivory-dim leading-relaxed max-w-2xl mx-auto mb-10">
            Traditional photography, candid coverage, drone, cinematography, LED walls and albums — all coordinated
            by one studio, so nothing falls through the cracks between vendors on your actual wedding day.
          </p>
          <Button to="/contact" variant="primary" icon={ArrowRight}>Check Your Wedding Date</Button>
        </div>
      </section>
    </>
  );
}
