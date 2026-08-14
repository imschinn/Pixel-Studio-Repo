import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import Seo from '../components/Seo';
import InstagramIcon from '../components/icons/InstagramIcon';
import ScrollReveal from '../components/ScrollReveal';
import { submitBooking } from '../services/bookingService';

const EVENT_TYPES = ['Wedding', 'Pre-Wedding', 'Engagement', 'Reception', 'Other'];
const BUDGETS = ['Under ₹1,00,000', '₹1,00,000 – ₹2,00,000', '₹2,00,000 – ₹3,50,000', 'Above ₹3,50,000'];

const initialForm = {
  name: '',
  email: '',
  mobile: '',
  weddingDate: '',
  eventType: 'Wedding',
  location: '',
  budget: BUDGETS[0],
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const errors = {
    name: !form.name.trim() ? 'Name is required' : '',
    email: !/^\S+@\S+\.\S+$/.test(form.email) ? 'Enter a valid email' : '',
    mobile: !/^\d{10}$/.test(form.mobile.replace(/\D/g, '')) ? 'Enter a valid 10-digit mobile number' : '',
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, mobile: true });
    if (hasErrors) return;

    setStatus('loading');
    setErrorMsg('');
    try {
      await submitBooking(form);
      setStatus('success');
      setForm(initialForm);
      setTouched({});
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Seo
        title="Contact & Book Your Date"
        description="Check availability and book Pixel Studio for your wedding or pre-wedding shoot in Jaora, Ratlam and across Madhya Pradesh."
        path="/contact"
      />

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6 sm:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-gold mb-4">Get In Touch</p>
          <h1 className="font-display text-5xl sm:text-6xl text-ivory">Check Your Wedding Date</h1>
          <p className="text-ivory-dim mt-5">
            Share your details below and our team will confirm availability, walk you through packages, and follow
            up within a day.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-14">
          <ScrollReveal>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-xl text-ivory mb-1">Studio Address</h3>
                  <p className="text-ivory-dim text-sm leading-relaxed">
                    New Dhan Mandi Main Road, Near DCB Bank, Jaora, Ratlam, Madhya Pradesh
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-xl text-ivory mb-1">Call or WhatsApp</h3>
                  <a href="tel:9752886676" className="text-ivory-dim text-sm hover:text-gold transition-colors">
                    97528 86676
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-xl text-ivory mb-1">Email</h3>
                  <a href="mailto:hello@pixelstudio.example" className="text-ivory-dim text-sm hover:text-gold transition-colors">
                    hello@pixelstudio.example
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <InstagramIcon className="text-gold shrink-0 mt-1" size={22} />
                <div>
                  <h3 className="font-display text-xl text-ivory mb-1">Instagram</h3>
                  <a
                    href="https://instagram.com/editor_choraaa_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ivory-dim text-sm hover:text-gold transition-colors"
                  >
                    @editor_choraaa_
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-line/60">
                <p className="text-xs text-muted leading-relaxed">
                  This form uses a mock submission service for demonstration — no email is actually sent yet. Wire
                  <code className="text-gold mx-1">src/services/bookingService.js</code>
                  up to a real backend or form provider before launch.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-10 border border-gold/50 bg-surface text-center flex flex-col items-center gap-4"
                >
                  <CheckCircle2 size={44} className="text-gold" />
                  <h3 className="font-display text-2xl text-ivory">Thank you!</h3>
                  <p className="text-ivory-dim">
                    Your enquiry has been received. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 eyebrow text-gold hover:underline"
                  >
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Full Name" error={touched.name && errors.name}>
                      <input
                        type="text"
                        value={form.name}
                        onChange={update('name')}
                        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                        className={inputClass(touched.name && errors.name)}
                        placeholder="Your name"
                      />
                    </Field>
                    <Field label="Email" error={touched.email && errors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={update('email')}
                        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                        className={inputClass(touched.email && errors.email)}
                        placeholder="you@gmail.com"
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Mobile Number" error={touched.mobile && errors.mobile}>
                      <input
                        type="tel"
                        value={form.mobile}
                        onChange={update('mobile')}
                        onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
                        className={inputClass(touched.mobile && errors.mobile)}
                        placeholder="98765 43210"
                      />
                    </Field>
                    <Field label="Wedding / Event Date">
                      <input
                        type="date"
                        value={form.weddingDate}
                        onChange={update('weddingDate')}
                        className={inputClass()}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Field label="Event Type">
                      <select value={form.eventType} onChange={update('eventType')} className={inputClass()}>
                        {EVENT_TYPES.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Approximate Budget">
                      <select value={form.budget} onChange={update('budget')} className={inputClass()}>
                        {BUDGETS.map((b) => (
                          <option key={b}>{b}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  <Field label="Wedding Location">
                    <input
                      type="text"
                      value={form.location}
                      onChange={update('location')}
                      className={inputClass()}
                      placeholder="Venue, city"
                    />
                  </Field>

                  <Field label="Message">
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={update('message')}
                      className={inputClass()}
                      placeholder="Tell us about your day — number of guests, functions, anything we should know."
                    />
                  </Field>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-rose-soft text-sm">
                      <AlertCircle size={16} /> {errorMsg}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-8 py-4 bg-gold text-ink text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </>
                    ) : (
                      'Submit Enquiry'
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>
        </div>
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
