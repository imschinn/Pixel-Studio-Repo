import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import Button from '../components/Button';
import FacetMark from '../components/FacetMark';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" description="This page could not be found." path="/404" />
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <FacetMark className="justify-center mb-8" />
          <p className="eyebrow text-gold mb-4">404</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory mb-6">Frame Not Found</h1>
          <p className="text-ivory-dim max-w-md mx-auto mb-10">
            The page you're looking for wandered off somewhere between the mandap and the reception.
          </p>
          <Button to="/" variant="primary">Back to Home</Button>
        </motion.div>
      </section>
    </>
  );
}
