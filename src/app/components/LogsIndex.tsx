import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { client, urlFor } from '../../sanity/client';
import { POSTS_QUERY } from '../../sanity/queries';
import { SEOHead } from './SEOHead';

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
      <main className="bg-white text-black min-h-screen pt-24 pb-20">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1
              className="mb-4"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '32px',
                fontWeight: 'bold'
              }}
            >
              LOGS
            </h1>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '16px',
                color: '#666666'
              }}
            >
              Technical articles and video tutorials on mobile development, architecture, and engineering practices.
            </p>
          </div>

          {loading ? (
            <p className="font-mono">Loading logs...</p>
          ) : (
            <>
              {/* Logs List */}
              <ul className="list-none p-0 m-0">
                {logEntries.map((entry) => (
                  <li
                    key={entry.id}
                    onClick={() => handleLogClick(entry.link)}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 py-6 border-b border-[#EEEEEE] cursor-pointer transition-colors hover:bg-[#FAFAFA]"
                  >
                    {/* Column 1-2: Thumbnail */}
                    <div className="md:col-span-2 md:pr-[15px]">
                      <div
                        className="w-full md:w-[160px] bg-[#E0E0E0] border border-[#EEEEEE] transition-all duration-300 grayscale hover:grayscale-0 overflow-hidden"
                        style={{
                          aspectRatio: '16 / 9'
                        }}
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
                      <div className="flex gap-3 items-center">
                        <span
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            color: '#888888'
                          }}
                        >
                          {entry.date}
                        </span>
                        <span
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            color: '#888888'
                          }}
                        >
                          //
                        </span>
                        <span
                          style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '12px',
                            color: entry.category === 'VIDEO' ? '#007AFF' : '#000000'
                          }}
                        >
                          {entry.category}
                        </span>
                      </div>

                      {/* Middle: Title */}
                      <h3
                        className="m-0"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '22px',
                          fontWeight: '500',
                          lineHeight: '1.3'
                        }}
                      >
                        {entry.title}
                      </h3>

                      {/* Bottom: Snippet */}
                      <p
                        className="m-0 line-clamp-1"
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '14px',
                          color: '#666666',
                          lineHeight: '1.5'
                        }}
                      >
                        {entry.snippet}
                      </p>
                    </div>

                    {/* Column 11-12: Action */}
                    <div className="md:col-span-2 flex items-center md:justify-end">
                      <span
                        className="hover:underline"
                        style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '12px',
                          color: '#000000'
                        }}
                      >
                        {entry.category === 'VIDEO' ? 'WATCH' : 'READ'} ↗
                      </span>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Recommended Posts - simple logic: duplicate list for now or slice */}
              {logEntries.length > 0 && (
                <div className="mt-20 pt-12 border-t border-[#EEEEEE]">
                  <h2
                    className="mb-8"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    RECOMMENDED
                  </h2>

                  {/* Horizontal Scroll Container */}
                  <div className="overflow-x-auto scrollbar-hide -mx-4 md:-mx-8 px-4 md:px-8 pb-4">
                    <div className="flex gap-4 min-w-max">
                      {/* Recommended Post Cards */}
                      {logEntries.slice(0, 4).map((entry) => (
                        <div
                          key={`rec-${entry.id}`}
                          onClick={() => handleLogClick(entry.link)}
                          className="w-[280px] flex-shrink-0 border border-[#EEEEEE] cursor-pointer transition-all hover:border-black"
                        >
                          {/* Thumbnail */}
                          <div
                            className="w-full bg-[#E0E0E0] border-b border-[#EEEEEE] grayscale hover:grayscale-0 transition-all duration-300 overflow-hidden"
                            style={{
                              aspectRatio: '16 / 9'
                            }}
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
                            <div className="flex gap-2 items-center mb-3">
                              <span
                                style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '10px',
                                  color: '#888888'
                                }}
                              >
                                {entry.date}
                              </span>
                              <span
                                style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '10px',
                                  color: '#888888'
                                }}
                              >
                                //
                              </span>
                              <span
                                style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '10px',
                                  color: entry.category === 'VIDEO' ? '#007AFF' : '#000000'
                                }}
                              >
                                {entry.category}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              className="mb-2 line-clamp-2"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '16px',
                                fontWeight: '500',
                                lineHeight: '1.4',
                                minHeight: '44px'
                              }}
                            >
                              {entry.title}
                            </h3>

                            {/* Snippet */}
                            <p
                              className="mb-3 line-clamp-2"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '12px',
                                color: '#666666',
                                lineHeight: '1.5',
                                minHeight: '36px'
                              }}
                            >
                              {entry.snippet}
                            </p>

                            {/* Action */}
                            <div className="pt-2 border-t border-[#EEEEEE]">
                              <span
                                className="hover:underline"
                                style={{
                                  fontFamily: 'JetBrains Mono, monospace',
                                  fontSize: '11px',
                                  color: '#000000'
                                }}
                              >
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
