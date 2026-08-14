// Placeholder testimonials — no real client quotes were supplied.
// Replace these with actual couple reviews when available.

export const testimonials = [
  {
    id: 't1',
    names: 'Aarav & Diya',
    event: 'Wedding, Ratlam',
    quote:
      'Every frame felt effortless, like the team disappeared into the day itself. Months later the film still makes us cry — the good kind.',
    rating: 5,
  },
  {
    id: 't2',
    names: 'Meher & Kabir',
    event: 'Pre-wedding, Indore',
    quote:
      'We are not photogenic people and somehow every single photo looked like it belonged in a magazine. Patient, calm, unbelievably talented.',
    rating: 5,
  },
  {
    id: 't3',
    names: 'Simran & Yuvraj',
    event: 'Wedding, Jaora',
    quote:
      'Pixel Studio understood our families before they understood the schedule. Candid coverage caught moments we didn\u2019t even know happened.',
    rating: 5,
  },
  {
    id: 't4',
    names: 'Ritika & Devansh',
    event: 'Wedding, Mandsaur',
    quote:
      'The drone footage of our haldi is still the most-watched video in our family group chat. Worth every rupee of the Golden package.',
    rating: 5,
  },
];

export async function getTestimonials() {
  await new Promise((r) => setTimeout(r, 300));
  return testimonials;
}
