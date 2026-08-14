export const faqs = [
  {
    id: 'f1',
    question: 'How far in advance should we book?',
    answer:
      'Popular wedding dates (especially the winter season) get reserved 6–9 months ahead. For pre-wedding shoots, 3–4 weeks notice is usually enough.',
  },
  {
    id: 'f2',
    question: 'What does "candid" actually include?',
    answer:
      'Candid coverage means a second photographer moving through the day capturing unposed, documentary-style moments alongside the traditional/formal shots — reactions, glances, small details that get missed otherwise.',
  },
  {
    id: 'f3',
    question: 'Do you travel outside Ratlam / Jaora?',
    answer:
      'Yes, we shoot across Madhya Pradesh and beyond. For pre-wedding shoots, outstation travel, food, stay and prop charges are the client\u2019s responsibility; for weddings, reach out with your venue and we will quote it directly.',
  },
  {
    id: 'f4',
    question: 'How long until we get our photos?',
    answer:
      'Pre-wedding edits are typically delivered within 7 days. Full wedding albums and films take longer given the volume of footage — we will confirm a timeline when your package is booked.',
  },
  {
    id: 'f5',
    question: 'Can we customise a package?',
    answer:
      'Absolutely. The packages on this site are starting points. Message us with your event days, must-have deliverables (drone, cinematography, LED walls, albums) and we will put together a custom quote.',
  },
  {
    id: 'f6',
    question: 'Is a booking deposit required?',
    answer:
      'Yes, we ask for a deposit to hold your date once a package is confirmed. Get in touch through the booking form and our team will walk you through the details.',
  },
];

export async function getFAQs() {
  await new Promise((r) => setTimeout(r, 300));
  return faqs;
}
