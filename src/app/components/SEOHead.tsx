import { useEffect } from 'react';

const BASE_URL = 'https://knwar.dev';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
}

/**
 * Dynamically updates <head> meta tags for SEO and social sharing.
 * Since this is a Vite SPA (client-side rendered), these updates
 * are primarily for social media crawlers that execute JavaScript
 * (Twitter, LinkedIn, Facebook) and for the browser tab title.
 */
export function SEOHead({
  title,
  description,
  canonicalPath = '/',
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
}: SEOHeadProps) {
  useEffect(() => {
    const fullTitle = title.includes('Knwar') ? title : `${title} | Knwar`;
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;

    // Title
    document.title = fullTitle;

    // Helper to set or create a meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Primary meta tags
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:type', ogType);
    if (ogImage) {
      setMeta('property', 'og:image', ogImage);
    }

    // Twitter Card
    setMeta('name', 'twitter:card', twitterCard);
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:url', canonicalUrl);
    if (ogImage) {
      setMeta('name', 'twitter:image', ogImage);
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    // Cleanup: reset to defaults when component unmounts
    return () => {
      document.title = 'Knwar — Mobile Developer & Engineer | Flutter, Swift, Full-Stack Portfolio';
    };
  }, [title, description, canonicalPath, ogImage, ogType, twitterCard, noIndex]);

  return null;
}
