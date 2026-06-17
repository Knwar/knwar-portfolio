import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import { POST_BY_SLUG_QUERY } from '../../sanity/queries';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Twitter, Linkedin, Copy } from 'lucide-react';
import { SEOHead } from './SEOHead';
import { StructuredData, buildArticleSchema } from './StructuredData';
import { Tag } from './Tag';

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
          className="my-8 w-full border border-hairline"
        />
      );
    },
    code: ({ value }: any) => {
      return (
        <pre className="bg-paper-2 border border-hairline p-4 overflow-x-auto my-6 font-mono text-sm">
          <code>{value.code}</code>
        </pre>
      );
    }
  },
  block: {
    h2: ({ children }: any) => <h2 className="text-2xl font-bold mt-8 mb-4 font-mono">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold mt-6 mb-3 font-mono">{children}</h3>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-ink pl-4 italic my-6">{children}</blockquote>,
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

  if (loading) return <div className="min-h-screen bg-paper text-ink flex items-center justify-center font-mono">Loading...</div>;
  if (!log) return <div className="min-h-screen bg-paper text-ink flex items-center justify-center font-mono">Log not found.</div>;

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
          url: `https://knwar.com/log/${slug}`,
          datePublished: log.publishedAt,
          image: logImageUrl,
        })}
      />
      <header>
        <Navigation />
      </header>
      <article className="min-h-screen bg-paper text-ink pt-24 pb-16">
        <div className="container-page">
          <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="mb-10">
            <Link to="/logs" className="inline-flex items-center gap-2 text-xs tracking-wider text-ink-muted hover:text-ink transition-colors mb-6 font-mono">
              <ArrowLeft size={14} />
              INDEX / LOGS
            </Link>

            <div className="flex flex-wrap gap-3 items-center mb-5 text-xs font-mono text-ink-muted">
              <span>{log.publishedAt ? new Date(log.publishedAt).toLocaleDateString() : ''}</span>
              {log.readTime && (
                <>
                  <span>//</span>
                  <span>{log.readTime}</span>
                </>
              )}
              {log.author && (
                <>
                  <span>//</span>
                  <span className="uppercase">BY {log.author}</span>
                </>
              )}
              {log.type && (
                <Tag variant={log.type.toUpperCase() === 'VIDEO' ? 'video' : 'default'}>{log.type}</Tag>
              )}
            </div>

            <h1 className="font-display uppercase text-[clamp(30px,5.5vw,64px)] mb-6 leading-[0.95] tracking-tight">
              {log.title}
            </h1>

            {log.excerpt && (
              <p className="font-sans text-lg text-ink-muted leading-relaxed">
                {log.excerpt}
              </p>
            )}
          </div>

          {/* Main Image */}
          {log.mainImage && (
            <div className="mb-10">
              <img
                src={urlFor(log.mainImage).width(1200).height(675).url()}
                alt={log.title}
                className="w-full aspect-video object-cover border border-hairline"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none mb-12 font-sans">
            <PortableText value={log.body} components={ptComponents} />
          </div>

          {/* Footer / Share */}
          <div className="border-t border-hairline pt-6 flex justify-between items-center">
            <div className="font-mono text-xs tracking-[0.1em] text-ink-muted uppercase">
              Share this log
            </div>
            <div className="flex gap-4">
              <button
                className="p-2 hover:bg-paper-2 hover:text-brand transition-colors"
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
                className="p-2 hover:bg-paper-2 hover:text-brand transition-colors"
                onClick={() => {
                  const url = encodeURIComponent(window.location.href);
                  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
                }}
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={20} />
              </button>
              <button
                className="p-2 hover:bg-paper-2 hover:text-brand transition-colors"
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
            <div className="mt-12 border-t border-hairline pt-8">
              <h3 className="font-mono font-bold text-lg mb-5">
                <span className="text-ink-faint">// </span>RELATED LOGS
              </h3>
              <div className="border-t border-hairline">
                {log.relatedPosts.map((post) => (
                  <Link key={post._id} to={`/log/${post.slug}`} className="block group border-b border-hairline py-3">
                    <div className="flex justify-between items-baseline gap-4">
                      <h4 className="font-sans text-base group-hover:text-brand transition-colors">{post.title}</h4>
                      <span className="font-mono text-xs text-ink-muted flex-shrink-0">{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          </div>
        </div>
      </article>
      <Footer />
    </>
  );
}
