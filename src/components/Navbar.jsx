import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { useAuth } from '../hooks/useAuth';
import iconMark from '../assets/logo/icon-mark.png';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/wedding-films', label: 'Wedding Films' },
  { to: '/packages', label: 'Packages' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const scrolled = useScrollPosition(30);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isHome = pathname === '/';
  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        solid ? 'bg-ink/90 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] border-b border-line/60' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-5 sm:px-8 h-20">
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setOpen(false)}>
          <img src={iconMark} alt="Pixel Studio icon mark" className="h-9 w-auto" />
          <span className="font-display text-2xl tracking-wide text-ivory group-hover:text-gold transition-colors">
            Pixel <span className="text-gold">Studio</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-9">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `eyebrow transition-colors ${isActive ? 'text-gold' : 'text-ivory-dim hover:text-ivory'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-5">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/account" className="eyebrow text-ivory-dim hover:text-gold flex items-center gap-2 transition-colors">
                <User size={14} /> {user?.fullName?.split(' ')[0]}
              </Link>
              <button onClick={logout} className="eyebrow text-ivory-dim hover:text-gold flex items-center gap-1.5 transition-colors">
                <LogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="eyebrow text-ivory-dim hover:text-gold transition-colors">
              Login
            </Link>
          )}
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-gold text-ink text-xs font-semibold uppercase tracking-widest hover:bg-gold-soft transition-colors"
          >
            Book Your Date
          </Link>
        </div>

        <button
          className="lg:hidden text-ivory p-2 -mr-2"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-ink border-t border-line/60"
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 font-display text-2xl border-b border-line/40 ${isActive ? 'text-gold' : 'text-ivory'}`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <div className="flex flex-col gap-3 mt-5">
                {isAuthenticated ? (
                  <>
                    <Link to="/account" onClick={() => setOpen(false)} className="eyebrow text-ivory-dim">
                      My Account ({user?.fullName?.split(' ')[0]})
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                      className="eyebrow text-ivory-dim text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="eyebrow text-ivory-dim">
                    Login / Register
                  </Link>
                )}
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="text-center px-5 py-3 bg-gold text-ink text-xs font-semibold uppercase tracking-widest"
                >
                  Book Your Date
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
