import { useEffect } from 'react';

const SITE_NAME = 'Pixel Studio';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Lightweight SEO helper — sets document title + meta description + basic
// Open Graph tags per page without pulling in a dependency.
export default function Seo({ title, description, path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} | Cinematic Wedding Photography`;
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', `https://pixelstudio.example${path}`, 'property');
  }, [title, description, path]);

  return null;
}
