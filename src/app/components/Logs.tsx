import { useState, useEffect } from 'react';
import { client } from '../../sanity/client';
import { POSTS_QUERY } from '../../sanity/queries';
import { Link } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';

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
    <section id="logs" className="py-8 md:py-12 bg-paper text-ink">
      <div className="container-page">
        <SectionHeader
          index="02"
          label="Logs"
          count={logs.length}
          action={
            <Link to="/logs" className="font-mono text-[11px] tracking-[0.15em] uppercase hover:text-brand transition-colors">
              View all →
            </Link>
          }
        />
      </div>

      {/* Full-bleed inverting rows */}
      <div className="border-t border-hairline">
        {logs.slice(0, 6).map((log) => (
          <Link
            key={log._id}
            to={`/log/${log.slug}`}
            className="block border-b border-hairline group hover:bg-ink hover:text-paper transition-colors duration-200"
          >
            <div className="container-page py-5 md:py-6 grid md:grid-cols-12 md:gap-6 md:items-baseline">
              <span className="md:col-span-2 font-mono text-xs text-ink-muted group-hover:text-paper/60 transition-colors">
                {log.date}
              </span>
              <h3 className="md:col-span-8 font-display uppercase tracking-tight leading-tight text-[clamp(20px,3.5vw,40px)] mt-1 md:mt-0">
                {log.title}
              </h3>
              <span className="md:col-span-2 md:text-right font-mono text-[11px] tracking-[0.15em] uppercase mt-2 md:mt-0">
                <span className={log.type === 'VIDEO' ? 'text-brand' : 'text-ink-muted group-hover:text-paper/60 transition-colors'}>
                  {log.type === 'VIDEO' ? '▶ ' : ''}{log.type}
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
