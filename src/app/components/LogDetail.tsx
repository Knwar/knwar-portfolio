import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import { POST_BY_SLUG_QUERY } from '../../sanity/queries';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Share2, Twitter, Linkedin, Copy } from 'lucide-react';
import { SEOHead } from './SEOHead';
import { StructuredData, buildArticleSchema } from './StructuredData';

interface RelatedPost {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
}

interface LogDetailData {
  _id: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  body: any[];
  mainImage: any;
  author: string;
  category: string;
  publishedAt: string;
  readTime: string;
  externalLink: string;
  relatedPosts: RelatedPost[];
  seoTitle?: string;
  metaDescription?: string;
  keywords?: string[]; // Note: schema has 'focusKeyword' string, array not yet in query/schema fully
}

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          src={urlFor(value).fit('max').auto('format').url()}
          alt={value.alt || 'Log image'}
          className="my-8 w-full rounded-lg"
        />
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6">
          <code>{value.code}</code>
        </pre>
      );
    }
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 font-mono">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 font-mono">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-black pl-4 italic my-6">{children}</blockquote>,
  }
};

export function LogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [log, setLog] = useState<LogDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      client.fetch(POST_BY_SLUG_QUERY, { slug })
        .then((data) => {
          setLog(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center font-mono">Loading...</div>;
  if (!log) return <div className="min-h-screen bg-white flex items-center justify-center font-mono">Log not found.</div>;

  const logImageUrl = log.mainImage ? urlFor(log.mainImage).width(1200).height(675).url() : undefined;

  return (
    <>
      <SEOHead
        title={log.seoTitle || log.title}
        description={log.metaDescription || log.excerpt || `Read ${log.title} by Knwar`}
        canonicalPath={`/log/${slug}`}
        ogImage={logImageUrl}
        ogType="article"
      />
      <StructuredData
        data={buildArticleSchema({
          title: log.seoTitle || log.title,
          description: log.metaDescription || log.excerpt || `Read ${log.title} by Knwar`,
          url: `https://knwar.dev/log/${slug}`,
          datePublished: log.publishedAt,
          image: logImageUrl,
        })}
      />
      <header>
        <Navigation />
      </header>
      <article className="min-h-screen bg-white pt-32 pb-20 px-4 md:px-8">
        <div className="max-w-[800px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link to="/logs" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-8 font-mono">
              <ArrowLeft size={16} />
              BACK TO LOGS
            </Link>

            <div className="flex flex-wrap gap-4 items-center mb-6 text-sm font-mono text-gray-500">
              <span>{log.publishedAt ? new Date(log.publishedAt).toLocaleDateString() : ''}</span>
              {log.readTime && (
                <>
                  <span>//</span>
                  <span>{log.readTime}</span>
                </>
              )}
              {log.category && (
                <>
                  <span>//</span>
                  <span className="uppercase">{log.category}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold mb-8 font-mono leading-tight">
              {log.title}
            </h1>

            {log.excerpt && (
              <p className="text-xl text-gray-600 mb-8 font-serif italic">
                {log.excerpt}
              </p>
            )}
          </div>

          {/* Main Image */}
          {log.mainImage && (
            <div className="mb-12">
              <img
                src={urlFor(log.mainImage).width(1200).height(675).url()}
                alt={log.title}
                className="w-full aspect-video object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-20 font-sans">
            <PortableText value={log.body} components={ptComponents} />
          </div>

          {/* Footer / Share */}
          <div className="border-t border-gray-200 pt-8 flex justify-between items-center">
            <div className="font-mono text-sm text-gray-500">
              SHARE THIS LOG
            </div>
            <div className="flex gap-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  const text = encodeURIComponent(log.title);
                  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'noopener,noreferrer');
                }}
                aria-label="Share on Twitter"
              >
                <Twitter size={20} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
                }}
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied to clipboard!');
                  });
                }}
                aria-label="Copy link"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>

          {/* Related Logs */}
          {log.relatedPosts && log.relatedPosts.length > 0 && (
            <div className="mt-20 border-t border-black pt-12">
              <h3 className="font-mono font-bold text-xl mb-8">RELATED LOGS</h3>
              <div className="space-y-6">
                {log.relatedPosts.map((post) => (
                  <Link key={post._id} to={`/log/${post.slug}`} className="block group">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-sans text-lg group-hover:underline">{post.title}</h4>
                      <span className="font-mono text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
      <Footer />
    </>
  );
}
