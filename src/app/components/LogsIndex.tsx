import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { client, urlFor } from '../../sanity/client';
import { POSTS_QUERY } from '../../sanity/queries';
import { SEOHead } from './SEOHead';
import { Tag } from './Tag';

interface LogIndexEntry {
  id: string;
  date: string;
  category: string;
  title: string;
  snippet: string;
  thumbnailAlt: string;
  link: string;
  thumbnail?: any;
}

export function LogsIndex() {
  const navigate = useNavigate();
  const [logEntries, setLogEntries] = useState<LogIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(POSTS_QUERY)
      .then((data) => {
        const mappedLogs = data.map((post: any) => ({
          id: post._id,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA').replace(/-/g, '.') : '',
          category: post.type ? post.type.toUpperCase() : 'ARTICLE',
          title: post.title,
          snippet: post.excerpt || '',
          thumbnailAlt: post.mainImage?.alt || post.title,
          link: `/log/${post.slug}`,
          thumbnail: post.mainImage
        }));
        setLogEntries(mappedLogs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
        setLoading(false);
      });
  }, []);

  const handleLogClick = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <SEOHead
        title="Logs — Technical Articles & Tutorials | Knwar"
        description="Technical articles and video tutorials on Flutter, mobile development, architecture patterns, and engineering practices by Knwar."
        canonicalPath="/logs"
      />
      <header>
        <Navigation />
      </header>
      <main className="bg-paper text-ink min-h-screen pt-24 pb-16">
        <div className="container-page">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted border-t-2 border-ink pt-3 mb-3">
              Index{logEntries.length > 0 && ` / (${String(logEntries.length).padStart(2, '0')})`}
            </p>
            <h1 className="font-display uppercase tracking-tight leading-[0.95] text-[clamp(28px,4.5vw,56px)] mb-4">
              Logs
            </h1>
            <p className="font-sans text-sm text-ink-muted">
              Technical articles and video tutorials on mobile development, architecture, and engineering practices.
            </p>
          </div>

          {loading ? (
            <p className="font-mono">Loading logs...</p>
          ) : (
            <>
              {/* Logs List */}
              <ul className="list-none p-0 m-0 border-t border-hairline">
                {logEntries.map((entry) => (
                  <li
                    key={entry.id}
                    onClick={() => handleLogClick(entry.link)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-5 border-b border-hairline cursor-pointer transition-colors hover:bg-paper-2 group"
                  >
                    {/* Column 1-2: Thumbnail */}
                    <div className="md:col-span-2 md:pr-[15px]">
                      <div
                        className="w-full md:w-[160px] bg-paper-2 border border-hairline transition-all duration-300 grayscale group-hover:grayscale-0 overflow-hidden"
                        style={{ aspectRatio: '16 / 9' }}
                        role="img"
                        aria-label={entry.thumbnailAlt}
                      >
                        {entry.thumbnail && (
                          <img
                            src={urlFor(entry.thumbnail).width(320).height(180).url()}
                            alt={entry.thumbnailAlt}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    </div>

                    {/* Column 3-10: Content */}
                    <div className="md:col-span-8 flex flex-col justify-center gap-2">
                      {/* Top: Date and Category */}
                      <div className="flex gap-3 items-center font-mono text-xs text-ink-faint">
                        <span>{entry.date}</span>
                        <span>//</span>
                        <Tag variant={entry.category === 'VIDEO' ? 'video' : 'default'}>{entry.category}</Tag>
                      </div>

                      {/* Middle: Title */}
                      <h3 className="m-0 font-sans font-medium text-lg md:text-xl leading-snug group-hover:text-brand transition-colors">
                        {entry.title}
                      </h3>

                      {/* Bottom: Snippet */}
                      <p className="m-0 line-clamp-1 font-sans text-sm text-ink-muted leading-relaxed">
                        {entry.snippet}
                      </p>
                    </div>

                    {/* Column 11-12: Action */}
                    <div className="md:col-span-2 flex items-center md:justify-end">
                      <span className="font-mono text-xs group-hover:text-brand transition-colors">
                        {entry.category === 'VIDEO' ? 'WATCH' : 'READ'} ↗
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Recommended Posts */}
              {logEntries.length > 0 && (
                <div className="mt-12 pt-10 border-t border-hairline">
                  <h2 className="font-mono font-bold text-base mb-6">
                    <span className="text-ink-faint">// </span>RECOMMENDED
                  </h2>

                  {/* Horizontal Scroll Container */}
                  <div className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-8 px-4 md:px-8 pb-4">
                    <div className="flex gap-4 min-w-max">
                      {logEntries.slice(0, 4).map((entry) => (
                        <div
                          key={`rec-${entry.id}`}
                          onClick={() => handleLogClick(entry.link)}
                          className="w-[280px] flex-shrink-0 border border-hairline cursor-pointer transition-colors hover:border-ink group"
                        >
                          {/* Thumbnail */}
                          <div
                            className="w-full bg-paper-2 border-b border-hairline grayscale group-hover:grayscale-0 transition-all duration-300 overflow-hidden"
                            style={{ aspectRatio: '16 / 9' }}
                            role="img"
                            aria-label={entry.thumbnailAlt}
                          >
                            {entry.thumbnail && (
                              <img
                                src={urlFor(entry.thumbnail).width(560).height(315).url()}
                                alt={entry.thumbnailAlt}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            {/* Date and Category */}
                            <div className="flex gap-2 items-center mb-3 font-mono text-[10px] text-ink-faint">
                              <span>{entry.date}</span>
                              <span>//</span>
                              <Tag variant={entry.category === 'VIDEO' ? 'video' : 'default'}>{entry.category}</Tag>
                            </div>

                            {/* Title */}
                            <h3
                              className="mb-2 line-clamp-2 font-sans font-medium text-base leading-snug"
                              style={{ minHeight: '44px' }}
                            >
                              {entry.title}
                            </h3>

                            {/* Snippet */}
                            <p
                              className="mb-3 line-clamp-2 font-sans text-xs text-ink-muted leading-relaxed"
                              style={{ minHeight: '36px' }}
                            >
                              {entry.snippet}
                            </p>

                            {/* Action */}
                            <div className="pt-2 border-t border-hairline">
                              <span className="font-mono text-[11px] group-hover:text-brand transition-colors">
                                {entry.category === 'VIDEO' ? 'WATCH' : 'READ'} ↗
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
