import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { client } from '../../sanity/client';
import { POSTS_QUERY } from '../../sanity/queries';
import { Link } from 'react-router-dom';

interface LogEntry {
  _id: string;
  date: string; // Sanity publishedAt
  title: string;
  type: string;
  slug: string;
  category?: string;
}

export function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    client.fetch(POSTS_QUERY)
      .then((data) => {
        // Map Sanity data to component state if needed, or use directly
        const mappedLogs = data.map((post: any) => ({
          _id: post._id,
          date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-CA').replace(/-/g, '.') : '',
          title: post.title,
          type: post.type ? post.type.toUpperCase() : 'ARTICLE',
          slug: post.slug,
          category: post.category
        }));
        setLogs(mappedLogs);
      })
      .catch(console.error);
  }, []);

  return (
    <section id="logs" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[800px] mx-auto">
        <h2
          className="font-bold mb-8 md:mb-12"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(24px, 4vw, 32px)'
          }}
        >
          LOGS
        </h2>

        <div className="space-y-6 md:space-y-0">
          {logs.map((log) => (
            <Link
              key={log._id}
              to={`/log/${log.slug}`}
              className="block md:grid md:grid-cols-12 gap-4 md:items-center group border-b md:border-b-0 border-[#EEEEEE] pb-6 md:pb-0 cursor-pointer"
              style={{ paddingTop: '24px', paddingBottom: '24px' }}
            >
              {/* Mobile: Date Above Title */}
              <div className="mb-2 md:mb-0 md:col-span-2">
                <span
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#666666'
                  }}
                >
                  {log.date}
                </span>
              </div>

              {/* Title */}
              <div className="mb-3 md:mb-0 md:col-span-8">
                <h3
                  className="flex items-center gap-2 group-hover:underline"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(16px, 2.5vw, 20px)',
                    fontWeight: '500'
                  }}
                >
                  {log.title}
                  <ArrowUpRight size={12} className="opacity-50 flex-shrink-0" />
                </h3>
              </div>

              {/* Tag */}
              <div className="md:col-span-2 flex md:justify-end">
                <span
                  className="px-3 py-1 border border-black"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '10px',
                    borderRadius: '12px',
                    letterSpacing: '0.5px'
                  }}
                >
                  {log.type}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
