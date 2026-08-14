import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import { useAuth } from '../hooks/useAuth';
import { requestPasswordReset } from '../services/authService';
import iconMark from '../assets/logo/icon-mark.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '', rememberMe: true });
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    try {
      await login(form);
      setStatus('success');
      setTimeout(() => navigate(from, { replace: true }), 500);
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    const res = await requestPasswordReset(forgotEmail);
    setForgotMsg(res.message);
  };

  return (
    <>
      <Seo title="Login" description="Log in to your Pixel Studio account." path="/login" />
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <img src={iconMark} alt="" className="h-10 mx-auto mb-6" />
            <h1 className="font-display text-4xl text-ivory">Welcome Back</h1>
            <p className="text-ivory-dim text-sm mt-2">Log in to manage your booking and enquiries.</p>
          </div>

          <div className="mb-6 flex items-start gap-2 p-3 border border-line/60 bg-surface/50 text-xs text-muted leading-relaxed">
            <AlertCircle size={14} className="shrink-0 mt-0.5 text-gold" />
            This is frontend/mock authentication for demonstration. Do not use real passwords — no backend secures
            this data.
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ivory-dim mb-2 block">Email</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full bg-surface border border-line px-4 py-3 text-ivory focus:border-gold outline-none transition-colors"
                placeholder="you@gmail.com"
              />
            </label>

            <label className="block">
              <span className="text-xs uppercase tracking-widest text-ivory-dim mb-2 block">Password</span>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  className="w-full bg-surface border border-line px-4 py-3 pr-11 text-ivory focus:border-gold outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </label>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-ivory-dim">
                <input
                  type="checkbox"
                  checked={form.rememberMe}
                  onChange={(e) => setForm((f) => ({ ...f, rememberMe: e.target.checked }))}
                  className="accent-[var(--color-gold)]"
                />
                Remember me
              </label>
              <button type="button" onClick={() => setForgotOpen(true)} className="text-gold hover:underline">
                Forgot password?
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-soft text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-gold text-sm">
                <CheckCircle2 size={16} /> Logged in! Redirecting...
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gold text-ink text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> Logging in...</> : 'Login'}
            </motion.button>
          </form>

          <p className="text-center text-sm text-ivory-dim mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:underline">
              Register
            </Link>
          </p>
        </motion.div>

        <AnimatePresence>
          {forgotOpen && (
            <motion.div
              className="fixed inset-0 z-[90] bg-ink/90 backdrop-blur-sm flex items-center justify-center px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-sm bg-surface border border-line p-8"
              >
                <h3 className="font-display text-2xl text-ivory mb-2">Reset Password</h3>
                <p className="text-sm text-ivory-dim mb-6">Enter your email and we'll send a mock reset link.</p>
                {forgotMsg ? (
                  <p className="text-sm text-gold">{forgotMsg}</p>
                ) : (
                  <form onSubmit={handleForgot} className="space-y-4">
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-ink border border-line px-4 py-3 text-ivory focus:border-gold outline-none"
                      placeholder="you@gmail.com"
                    />
                    <button type="submit" className="w-full py-3 bg-gold text-ink text-sm font-semibold uppercase tracking-widest">
                      Send Reset Link
                    </button>
                  </form>
                )}
                <button onClick={() => setForgotOpen(false)} className="text-xs text-muted mt-5 hover:text-ivory">
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
