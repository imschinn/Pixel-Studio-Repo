// Mock wedding package data — sourced from Pixel Studio's actual quotation sheets.
// Replace or extend this array to update pricing shown on the Packages page.

export const weddingPackages = [
  {
    id: 'wp-normal',
    category: 'wedding',
    name: 'Normal Wedding Package',
    days: 3,
    price: 59999,
    popular: false,
    includes: [
      '60 sheets NTR high-glossy album, transparent mix & suit case cover (2 reel)',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 2 days',
      'Drone coverage — 1 day',
    ],
  },
  {
    id: 'wp-platinum',
    category: 'wedding',
    name: 'Platinum Wedding Package',
    days: 3,
    price: 79999,
    popular: false,
    includes: [
      '60 sheets NTR high-glossy album, transparent mix & suit case cover (2 reel)',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 2 days',
      'Drone coverage — 1 day',
      'Cinematography — 2 days',
    ],
  },
  {
    id: 'wp-silver',
    category: 'wedding',
    name: 'Silver Wedding Package',
    days: 3,
    price: 99999,
    popular: false,
    includes: [
      '60 sheets NTR high-glossy album, transparent mix & suit case cover (2 reel)',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 3 days',
      'Drone coverage — 2 days',
      'Cinematography — 2 days',
      'LED wall, 8×12 feet',
      '8 LED frames',
      'Function highlight reel',
    ],
  },
  {
    id: 'wp-golden-3',
    category: 'wedding',
    name: 'Golden Wedding Package',
    days: 3,
    price: 129999,
    popular: true,
    includes: [
      '80 sheets NTR high-glossy album, transparent mix & suit case double cover',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 3 days',
      'Drone coverage — 3 days',
      'Cinematography — 3 days',
      'LED wall, 8×12 feet',
      '12 LED frames',
      'Function highlight reel',
    ],
  },
  {
    id: 'wp-golden-4',
    category: 'wedding',
    name: 'Golden Wedding Package',
    days: 4,
    price: 159999,
    popular: false,
    includes: [
      '80 sheets NTR high-glossy album, transparent mix & suit case double cover',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 3 days',
      'Drone coverage — 3 days',
      'Cinematography — 3 days',
      'LED wall, 8×12 feet',
      '12 LED frames',
      'Function highlight reel',
    ],
  },
  {
    id: 'wp-premium-3',
    category: 'wedding',
    name: 'Premium Wedding Package',
    days: 3,
    price: 219999,
    popular: false,
    includes: [
      '80 sheets NTR high-glossy album, transparent mix & suit case double cover',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 3 days',
      'Drone coverage — 3 days',
      'Cinematography — 3 days',
      'LED wall, 8×12 feet · 12 LED frames · function reel',
      'Pre-wedding — 2 days, teaser + 1 album song highlight',
      'Pre-wedding photos with daily updated edits',
      'Wedding invitation video & live photo updates',
    ],
  },
  {
    id: 'wp-premium-4',
    category: 'wedding',
    name: 'Premium Wedding Package',
    days: 4,
    price: 259999,
    popular: false,
    includes: [
      '80 sheets NTR high-glossy album, transparent mix & suit case double cover',
      '5–4 hours ultra HD full-day videography',
      'Candid photography — 3 days',
      'Drone coverage — 3 days',
      'Cinematography — 3 days',
      'LED wall, 8×12 feet · 12 LED frames · function reel',
      'Pre-wedding — 2 days, teaser + 1 album song highlight',
      'Pre-wedding photos with daily updated edits',
      'Wedding invitation video & live photo updates',
    ],
  },
];

export const preWeddingPackages = [
  {
    id: 'pw-low-1',
    category: 'pre-wedding',
    name: 'Low Pre-Wedding',
    days: 1,
    price: 6999,
    popular: false,
    includes: [
      '20–30 edited photos (4 outfits)',
      'Edited photos delivered within 7 days',
      '1 iPhone-shot reel',
    ],
  },
  {
    id: 'pw-basic-1',
    category: 'pre-wedding',
    name: 'Basic Pre-Wedding',
    days: 1,
    price: 8999,
    popular: false,
    includes: [
      '30–40 edited photos (4 outfits)',
      'Edited photos delivered within 7 days',
      '1 cinematic reel',
    ],
  },
  {
    id: 'pw-basic-2',
    category: 'pre-wedding',
    name: 'Basic Pre-Wedding',
    days: 2,
    price: 11999,
    popular: true,
    includes: [
      '40–50 edited photos (6 outfits)',
      'Edited photos delivered within 7 days',
      '3 cinematic reels',
    ],
  },
  {
    id: 'pw-basic-2-frames',
    category: 'pre-wedding',
    name: 'Basic Pre-Wedding + Frames',
    days: 2,
    price: 14999,
    popular: false,
    includes: [
      '40–50 edited photos (6 outfits)',
      'Edited photos delivered within 7 days',
      '3 cinematic reels',
      'Printed frames combo',
    ],
  },
];

export const addOns = [
  { id: 'addon-drone', name: 'Extra drone day', note: 'Aerial coverage for an additional event day' },
  { id: 'addon-album', name: 'Extra album sheets', note: 'Priced per additional sheet, NTR high-glossy' },
  { id: 'addon-led', name: 'Additional LED frame', note: 'For venues with multiple stages' },
  { id: 'addon-travel', name: 'Outstation travel', note: 'Travel, food & stay for shoots outside Ratlam' },
];

export const packageNote =
  'Additional work beyond what is listed will incur extra charges. For pre-wedding shoots, travel, food, stay and prop charges are the client\u2019s responsibility.';

export async function getPackages() {
  await new Promise((r) => setTimeout(r, 350));
  return { weddingPackages, preWeddingPackages, addOns, packageNote };
}
