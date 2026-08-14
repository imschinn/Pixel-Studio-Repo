// Mock booking / enquiry submission service.
// No real email or database write happens here — submissions are only
// logged to the console and kept in localStorage so the UI has something
// to show. Wire this up to a real backend (or a form service like
// Formspree/EmailJS) before taking real enquiries.

const STORAGE_KEY = 'pixelstudio_mock_bookings';

export async function submitBooking(formData) {
  await new Promise((r) => setTimeout(r, 700));

  if (!formData.name || !formData.email || !formData.mobile) {
    throw new Error('Please fill in your name, email and mobile number.');
  }

  const entry = {
    id: `enquiry_${Date.now()}`,
    ...formData,
    submittedAt: new Date().toISOString(),
  };

  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, entry]));
  } catch {
    /* localStorage unavailable — non-fatal for the mock */
  }

  console.info('[mock booking submission]', entry);

  return {
    success: true,
    message: 'Thank you! Your enquiry has been received. We will get back to you shortly.',
  };
}
