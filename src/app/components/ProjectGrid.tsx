import { useState, useEffect } from 'react';
import { client, urlFor } from '../../sanity/client';
import { PROJECTS_QUERY } from '../../sanity/queries';
import { Link } from 'react-router-dom';

interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  mainImage: any;
  color: string;
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2
          className="font-bold mb-8 md:mb-12"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(24px, 4vw, 32px)'
          }}
        >
          PROJECT PORTFOLIO
        </h2>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4 pb-4">
          <div className="flex gap-4" style={{ width: 'max-content' }}>
            {projects.map((project) => (
              <Link
                key={project._id}
                to={`/project/${project.slug}`}
                className="block cursor-pointer group"
                style={{ width: '280px', flexShrink: 0 }}
                onTouchStart={() => setHoveredId(project._id)}
                onTouchEnd={() => setHoveredId(null)}
              >
                {/* Card — rounded corners wrap entire card */}
                <div
                  className="rounded-2xl overflow-hidden shadow-md transition-all duration-300"
                  style={{ backgroundColor: project.color || '#F5F5F5' }}
                >
                  {/* Image */}
                  <div
                    className="w-full relative"
                    style={{ aspectRatio: '4 / 5' }}
                  >
                    {project.mainImage && (
                      <img
                        src={urlFor(project.mainImage).width(600).url()}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Project info — inside card */}
                  <div className="p-4 bg-white">
                    <h3
                      className="font-bold mb-1"
                      style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '15px'
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mb-2"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '12px',
                        color: '#888888',
                        lineHeight: '1.4'
                      }}
                    >
                      {project.summary || project.tags?.join(' · ')}
                    </p>
                    <span
                      className="inline-flex items-center gap-1 font-medium"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '13px',
                        color: '#007AFF'
                      }}
                    >
                      View Project
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-10">
          {projects.map((project) => (
            <Link
              key={project._id}
              to={`/project/${project.slug}`}
              className="block cursor-pointer group"
              onMouseEnter={() => setHoveredId(project._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Card — rounded corners wrap entire card */}
              <div
                className="rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl"
                style={{ backgroundColor: project.color || '#F5F5F5' }}
              >
                {/* Image — no hover effects */}
                <div
                  className="w-full relative"
                  style={{ aspectRatio: '4 / 5' }}
                >
                  {project.mainImage && (
                    <img
                      src={urlFor(project.mainImage).width(800).url()}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Project info — inside card */}
                <div className="p-5 bg-white">
                  <h3
                    className="font-bold mb-1.5 transition-colors duration-200 group-hover:text-[#007AFF]"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '16px'
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="mb-3"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#888888',
                      lineHeight: '1.5'
                    }}
                  >
                    {project.summary || project.tags?.join(' · ')}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 font-medium transition-all duration-200 group-hover:gap-2.5"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '13px',
                      color: '#007AFF'
                    }}
                  >
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
