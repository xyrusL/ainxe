import React from 'react';
import { useHead, useSeoMeta } from '@unhead/react';
import type { Graph } from 'schema-dts';
import { SITE_INFO } from '../config/siteInfo';

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
}

/**
 * Dynamic SEO, Open Graph (FB, IG, Reddit), X/Twitter Card, and Google Sitelinks Schema.org Manager
 * Powered by @unhead/react (v2) + schema-dts
 */
export const SeoHead: React.FC<SeoHeadProps> = ({
  title = SITE_INFO.siteTitle,
  description = SITE_INFO.description,
  path = '/',
}) => {
  const canonicalUrl = `${SITE_INFO.siteUrl}${path === '/' ? '' : path}`;
  const ogImageUrl = `${SITE_INFO.siteUrl}${SITE_INFO.ogImage}`;

  // Dynamic Open Graph (Facebook, Instagram, Reddit, Discord) & X (Twitter) Meta Tags
  useSeoMeta({
    title,
    description,
    ogType: 'website',
    ogSiteName: SITE_INFO.siteTitle,
    ogUrl: canonicalUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: ogImageUrl,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: `${SITE_INFO.fullName} — Custom Software, Websites & Apps`,
    twitterCard: 'summary_large_image',
    twitterSite: SITE_INFO.socials.handle,
    twitterCreator: SITE_INFO.socials.handle,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImageUrl,
  });

  // Type-safe Schema.org JSON-LD Graph for Google Search Sitelinks (Spotify-style nested result tree)
  const jsonLdGraph: Graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_INFO.siteUrl}/#organization`,
        name: SITE_INFO.fullName,
        alternateName: SITE_INFO.siteTitle,
        url: SITE_INFO.siteUrl,
        logo: `${SITE_INFO.siteUrl}/ainxe-icon.svg`,
        sameAs: [
          SITE_INFO.socials.x,
          SITE_INFO.socials.instagram,
          SITE_INFO.socials.facebook,
          SITE_INFO.socials.reddit,
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_INFO.siteUrl}/#website`,
        url: SITE_INFO.siteUrl,
        name: SITE_INFO.siteTitle,
        alternateName: SITE_INFO.fullName,
        description: SITE_INFO.description,
        publisher: {
          '@id': `${SITE_INFO.siteUrl}/#organization`,
        },
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_INFO.siteUrl}/#sitelinks`,
        name: `${SITE_INFO.siteTitle} Main Navigation`,
        itemListElement: SITE_INFO.sitelinks.map((item, idx) => ({
          '@type': 'SiteNavigationElement',
          position: idx + 1,
          name: item.title,
          description: item.description,
          url: `${SITE_INFO.siteUrl}${item.path}`,
        })),
      },
    ],
  };

  useHead({
    link: [
      {
        rel: 'canonical',
        href: canonicalUrl,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(jsonLdGraph),
      },
    ],
  });

  return null;
};
