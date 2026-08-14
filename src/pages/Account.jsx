import { motion } from 'framer-motion';
import { User, Mail, Phone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '../components/Seo';
import { useAuth } from '../hooks/useAuth';

// Example of a protected page — only reachable when a mock session exists.
// See src/components/ProtectedRoute.jsx and its usage in App.jsx.
export default function Account() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <Seo title="My Account" description="Manage your Pixel Studio account." path="/account" />
      <section className="min-h-screen pt-40 pb-24 max-w-2xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow text-gold mb-4">Your Account</p>
          <h1 className="font-display text-4xl sm:text-5xl text-ivory mb-10">
            Welcome, {user?.fullName?.split(' ')[0] ?? 'friend'}
          </h1>

          <div className="border border-line/70 bg-surface/50 p-8 space-y-5">
            <div className="flex items-center gap-4">
              <User className="text-gold shrink-0" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Full Name</p>
                <p className="text-ivory">{user?.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="text-gold shrink-0" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Email</p>
                <p className="text-ivory">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="text-gold shrink-0" size={20} />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">Mobile</p>
                <p className="text-ivory">{user?.mobile}</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted leading-relaxed mt-6">
            This page is only reachable while a mock session is active — it's the working example of{' '}
            <code className="text-gold">ProtectedRoute</code> wrapping a route in{' '}
            <code className="text-gold">src/App.jsx</code>.
          </p>

          <button
            onClick={handleLogout}
            className="mt-8 inline-flex items-center gap-2 eyebrow text-ivory-dim hover:text-gold transition-colors"
          >
            <LogOut size={14} /> Logout
          </button>
        </motion.div>
      </section>
    </>
  );
}
