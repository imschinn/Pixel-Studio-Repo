import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import InstagramIcon from './icons/InstagramIcon';
import fullLockup from '../assets/logo/full-lockup-transparent.png';
import FacetMark from './FacetMark';

const SITE_LINKS = [
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/wedding-films', label: 'Wedding Films' },
  { to: '/packages', label: 'Packages' },
  { to: '/about', label: 'About' },
];

const SUPPORT_LINKS = [
  { to: '/contact', label: 'Book Your Date' },
  { to: '/faq', label: 'FAQ' },
  { to: '/login', label: 'Login' },
  { to: '/register', label: 'Register' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-soft border-t border-line/60 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 pb-14">
          <div>
            <img src={fullLockup} alt="Pixel Studio" className="h-24 w-auto -ml-2 mb-2" />
            <p className="text-ivory-dim text-sm leading-relaxed max-w-xs">
              Cinematic wedding photography &amp; films based in Jaora, Ratlam — traditional, candid, drone and
              cinematography, told the way your family will want to remember it.
            </p>
            <FacetMark className="mt-6" size={7} gap={5} animate={false} />
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-5">Explore</h4>
            <ul className="space-y-3">
              {SITE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ivory-dim hover:text-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-5">Account</h4>
            <ul className="space-y-3">
              {SUPPORT_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-ivory-dim hover:text-ivory transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-gold mb-5">Studio</h4>
            <ul className="space-y-4 text-sm text-ivory-dim">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                New Dhan Mandi Main Road, Near DCB Bank, Jaora, Ratlam, M.P.
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-gold" />
                <a href="tel:9752886676" className="hover:text-ivory transition-colors">
                  97528&nbsp;86676
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-gold" />
                <a href="mailto:hello@pixelstudio.example" className="hover:text-ivory transition-colors">
                  hello@pixelstudio.example
                </a>
              </li>
              <li className="flex items-center gap-3">
                <InstagramIcon size={16} className="shrink-0 text-gold" />
                <a
                  href="https://instagram.com/editor_choraaa_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ivory transition-colors"
                >
                  @editor_choraaa_
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline" />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Pixel Studio. All rights reserved.</p>
          <p>Site built for demonstration — authentication and forms are mock/frontend-only.</p>
        </div>
      </div>
    </footer>
  );
}
