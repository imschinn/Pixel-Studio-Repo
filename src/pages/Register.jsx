import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import { useAuth } from '../hooks/useAuth';

const initialForm = {
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');
  const [touched, setTouched] = useState({});

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const markTouched = (key) => () => setTouched((t) => ({ ...t, [key]: true }));

  const errors = {
    fullName: !form.fullName.trim() ? 'Full name is required' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Enter a valid email' : '',
    mobile: !/^\d{10}$/.test(form.mobile.replace(/\D/g, '')) ? 'Enter a valid 10-digit mobile number' : '',
    password: form.password.length < 6 ? 'Password must be at least 6 characters' : '',
    confirmPassword: form.confirmPassword !== form.password ? 'Passwords do not match' : '',
    acceptTerms: !form.acceptTerms ? 'You must accept the Terms & Conditions' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      mobile: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
    if (hasErrors) return;

    setStatus('loading');
    setServerError('');
    try {
      await register(form);
      setStatus('success');
      setTimeout(() => navigate('/'), 600);
    } catch (err) {
      setStatus('error');
      setServerError(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Seo title="Register" description="Create a Pixel Studio account to manage your wedding booking and enquiries." path="/register" />
      <section className="min-h-screen flex items-center justify-center px-6 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl text-ivory">Create an Account</h1>
            <p className="text-ivory-dim text-sm mt-2">Register to track your booking and enquiries with us.</p>
          </div>

          <div className="mb-6 flex items-start gap-2 p-3 border border-line/60 bg-surface/50 text-xs text-muted leading-relaxed">
            <AlertCircle size={14} className="shrink-0 mt-0.5 text-gold" />
            This is frontend/mock authentication for demonstration. Data is stored only in your browser — a real
            backend is required before collecting genuine account details.
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <Field label="Full Name" error={touched.fullName && errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={update('fullName')}
                onBlur={markTouched('fullName')}
                className={inputClass(touched.fullName && errors.fullName)}
                placeholder="Your full name"
              />
            </Field>

            <Field label="Email" error={touched.email && errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                onBlur={markTouched('email')}
                className={inputClass(touched.email && errors.email)}
                placeholder="you@gmail.com"
              />
            </Field>

            <Field label="Mobile Number" error={touched.mobile && errors.mobile}>
              <input
                type="tel"
                value={form.mobile}
                onChange={update('mobile')}
                onBlur={markTouched('mobile')}
                className={inputClass(touched.mobile && errors.mobile)}
                placeholder="98765 43210"
              />
            </Field>

            <Field label="Password" error={touched.password && errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={update('password')}
                  onBlur={markTouched('password')}
                  className={`${inputClass(touched.password && errors.password)} pr-11`}
                  placeholder="At least 6 characters"
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
            </Field>

            <Field label="Confirm Password" error={touched.confirmPassword && errors.confirmPassword}>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  onBlur={markTouched('confirmPassword')}
                  className={`${inputClass(touched.confirmPassword && errors.confirmPassword)} pr-11`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Field>

            <label className="flex items-start gap-2.5 text-sm text-ivory-dim">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={update('acceptTerms')}
                onBlur={markTouched('acceptTerms')}
                className="mt-0.5 accent-[var(--color-gold)]"
              />
              <span>
                I accept the{' '}
                <span className="text-gold hover:underline cursor-pointer">Terms &amp; Conditions</span> and{' '}
                <span className="text-gold hover:underline cursor-pointer">Privacy Policy</span>.
              </span>
            </label>
            {touched.acceptTerms && errors.acceptTerms && (
              <span className="text-xs text-rose-soft block -mt-3">{errors.acceptTerms}</span>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-soft text-sm">
                <AlertCircle size={16} /> {serverError}
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-2 text-gold text-sm">
                <CheckCircle2 size={16} /> Account created! Redirecting...
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 bg-gold text-ink text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Creating account...
                </>
              ) : (
                'Register'
              )}
            </motion.button>
          </form>

          <p className="text-center text-sm text-ivory-dim mt-8">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </section>
    </>
  );
}

function inputClass(error) {
  return `w-full bg-surface border ${
    error ? 'border-rose-soft' : 'border-line'
  } px-4 py-3 text-ivory placeholder:text-muted focus:border-gold outline-none transition-colors`;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-ivory-dim mb-2 block">{label}</span>
      {children}
      {error && <span className="text-xs text-rose-soft mt-1 block">{error}</span>}
    </label>
  );
}
