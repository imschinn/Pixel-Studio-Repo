// Mock portfolio data. Each image references a file in src/assets/photos.
// To add more photography, drop new files in that folder and add an entry here.

import photo01 from '../assets/photos/photo-01.webp';
import photo02 from '../assets/photos/photo-02.webp';
import photo03 from '../assets/photos/photo-03.webp';
import photo04 from '../assets/photos/photo-04.webp';
import photo05 from '../assets/photos/photo-05.webp';
import photo06 from '../assets/photos/photo-06.webp';
import photo07 from '../assets/photos/photo-07.webp';
import photo08 from '../assets/photos/photo-08.webp';

export const portfolioImages = [
  {
    id: 'ps-01',
    src: photo01,
    category: 'pre-wedding',
    title: 'Palace Courtyard',
    location: 'Heritage venue, M.P.',
    orientation: 'landscape',
  },
  {
    id: 'ps-02',
    src: photo02,
    category: 'couple',
    title: 'Quiet Moment',
    location: 'Studio session',
    orientation: 'portrait',
  },
  {
    id: 'ps-03',
    src: photo03,
    category: 'candid',
    title: 'Golden Kanjeevaram',
    location: 'Garden portrait',
    orientation: 'portrait',
  },
  {
    id: 'ps-04',
    src: photo04,
    category: 'couple',
    title: 'First Blessing',
    location: 'Mehendi morning',
    orientation: 'portrait',
  },
  {
    id: 'ps-05',
    src: photo05,
    category: 'wedding',
    title: 'Corridor of Light',
    location: 'Wedding hall',
    orientation: 'portrait',
  },
  {
    id: 'ps-06',
    src: photo06,
    category: 'wedding',
    title: 'The Bride',
    location: 'Bridal portrait',
    orientation: 'portrait',
  },
  {
    id: 'ps-07',
    src: photo07,
    category: 'events',
    title: 'Under the Chandeliers',
    location: 'Reception night',
    orientation: 'portrait',
  },
  {
    id: 'ps-08',
    src: photo08,
    category: 'events',
    title: 'Garden Reception',
    location: 'Evening celebration',
    orientation: 'portrait',
  },
];

export const categories = ['all', 'wedding', 'pre-wedding', 'couple', 'candid', 'events'];

export async function getPortfolio() {
  await new Promise((r) => setTimeout(r, 400));
  return portfolioImages;
}
