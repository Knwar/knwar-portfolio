interface StructuredDataProps {
  data: Record<string, any>;
}

/**
 * Renders a JSON-LD structured data script tag for SEO.
 * Pass any schema.org-compatible data object.
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schema for the homepage (Person + WebSite)
export const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      name: 'Knwar',
      url: 'https://knwar.dev',
      jobTitle: 'Mobile Developer & Engineer',
      description:
        'Mobile developer with 10+ years of experience shipping Flutter, Swift, Node.js and full-stack projects.',
      knowsAbout: ['Flutter', 'Dart', 'Swift', 'Node.js', 'Python', 'React', 'AWS', 'Firebase'],
      sameAs: [
        'https://github.com/knwar',
        'https://linkedin.com/in/knwar',
        'https://twitter.com/knwar',
        'https://instagram.com/knwar',
        'https://youtube.com/@knwar',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Knwar Portfolio',
      url: 'https://knwar.dev',
      description:
        'Portfolio showcasing 10+ years of shipped mobile and full-stack projects.',
    },
  ],
};

// Builder for article/log pages
export function buildArticleSchema(params: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.datePublished,
    dateModified: params.dateModified || params.datePublished,
    ...(params.image && { image: params.image }),
    author: {
      '@type': 'Person',
      name: 'Knwar',
      url: 'https://knwar.dev',
    },
    publisher: {
      '@type': 'Person',
      name: 'Knwar',
      url: 'https://knwar.dev',
    },
  };
}

// Builder for project/case study pages
export function buildProjectSchema(params: {
  title: string;
  description: string;
  url: string;
  techStack?: string[];
  datePublished?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: params.title,
    description: params.description,
    url: params.url,
    ...(params.datePublished && { dateCreated: params.datePublished }),
    ...(params.image && { image: params.image }),
    ...(params.techStack && {
      keywords: params.techStack.join(', '),
    }),
    creator: {
      '@type': 'Person',
      name: 'Knwar',
      url: 'https://knwar.dev',
    },
  };
}
