import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';
import ScrollProgressBar from '../components/ScrollProgressBar';

export default function MainLayout() {
  const location = useLocation();

  // Scroll to top on every route change (mirrors the "guided" UX flow).
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ink">
      <ScrollProgressBar />
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className="flex-1"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Footer />
      <FloatingActions />
    </div>
  );
}
