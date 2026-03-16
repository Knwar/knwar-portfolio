import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client } from '../../sanity/client';
import { PROJECT_LEGAL_QUERY } from '../../sanity/queries';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { NotFound } from './NotFound';
import { PortableText } from '@portabletext/react';
import { ArrowLeft } from 'lucide-react';
import { SEOHead } from './SEOHead';

interface ProjectLegalData {
  privacyPolicy: any[] | null;
  termsOfUse: any[] | null;
  projectTitle: string;
  projectSlug: string;
}

const PAGE_TYPES: Record<string, { field: keyof Pick<ProjectLegalData, 'privacyPolicy' | 'termsOfUse'>; title: string }> = {
  'privacy-policy': { field: 'privacyPolicy', title: 'Privacy Policy' },
  'terms-of-use': { field: 'termsOfUse', title: 'Terms of Use' },
};

const ptComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-bold mt-10 mb-4 font-mono">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 font-mono">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 font-mono">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg font-bold mt-5 mb-2 font-mono">{children}</h4>,
    normal: ({ children }: any) => <p className="mb-4 leading-relaxed text-gray-700">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-black pl-4 italic my-6 text-gray-600">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-gray-700">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }: any) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-black">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#007AFF] underline hover:text-black transition-colors"
      >
        {children}
      </a>
    ),
  },
};

export function ProjectLegalPage() {
  const { slug, pageType } = useParams<{ slug: string; pageType: string }>();
  const [data, setData] = useState<ProjectLegalData | null>(null);
  const [loading, setLoading] = useState(true);

  const pageConfig = pageType ? PAGE_TYPES[pageType] : undefined;

  useEffect(() => {
    if (slug && pageConfig) {
      client.fetch(PROJECT_LEGAL_QUERY, { slug })
        .then((result) => {
          setData(result);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [slug, pageConfig]);

  // Invalid page type (not privacy-policy or terms-of-use)
  if (!pageConfig) {
    return <NotFound />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center font-mono">
        Loading...
      </div>
    );
  }

  // No legal document found, or the specific field is empty
  const content = data?.[pageConfig.field];
  if (!data || !content || content.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <SEOHead
        title={`${pageConfig.title} — ${data.projectTitle}`}
        description={`${pageConfig.title} for ${data.projectTitle}`}
        canonicalPath={`/project/${slug}/${pageType}`}
        noIndex={true}
      />
      <header>
        <Navigation />
      </header>
      <article className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            to={`/project/${slug}`}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 font-mono"
          >
            <ArrowLeft size={16} />
            BACK TO {data.projectTitle?.toUpperCase()}
          </Link>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl font-bold mb-2 leading-tight"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {pageConfig.title}
          </h1>
          <p
            className="text-gray-500 mb-12"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
          >
            For {data.projectTitle}
          </p>

          {/* Content */}
          <div
            className="max-w-none"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', lineHeight: '1.8' }}
          >
            <PortableText value={content} components={ptComponents} />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
