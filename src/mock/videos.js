// Mock wedding film data.
// NOTE: no video files were provided in the source upload, so `src` is left
// null and the UI shows a "coming soon" state. Drop .mp4 files into
// src/assets/videos/ and set `src` (and `poster` if you like) to go live.

import photo01 from '../assets/photos/photo-01.webp';
import photo05 from '../assets/photos/photo-05.webp';
import photo07 from '../assets/photos/photo-07.webp';

export const films = [
  {
    id: 'film-01',
    title: 'Aarav & Diya — Wedding Film',
    description: 'A three-day celebration told as one cinematic story, from the first haldi to the final farewell.',
    thumbnail: photo05,
    src: null,
    duration: '4:12',
  },
  {
    id: 'film-02',
    title: 'A Palace Pre-Wedding Teaser',
    description: 'Golden-hour portraits shot at a heritage courtyard, cut to a short romantic teaser.',
    thumbnail: photo01,
    src: null,
    duration: '1:48',
  },
  {
    id: 'film-03',
    title: 'Reception Highlights',
    description: 'Chandeliers, dance floors and speeches — the reception night, condensed.',
    thumbnail: photo07,
    src: null,
    duration: '3:05',
  },
];

export async function getVideos() {
  await new Promise((r) => setTimeout(r, 400));
  return films;
}
