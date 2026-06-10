import { useState, useEffect } from 'react';
import { client, urlFor } from '../../sanity/client';
import { PROJECTS_QUERY } from '../../sanity/queries';
import { Link } from 'react-router-dom';
import { SectionHeader } from './SectionHeader';

export interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  mainImage: any;
  publishedAt?: string;
  platform?: string;
  githubUrl?: string;
}

export function ProjectCard({ project, index, className = '' }: { project: Project; index: number; className?: string }) {
  const number = String(index + 1).padStart(2, '0');
  const year = project.publishedAt ? new Date(project.publishedAt).getFullYear() : null;
  const meta = [year, project.platform].filter(Boolean).join(' // ');

  return (
    <div className={`relative group border border-hairline bg-paper ${className}`}>
      {/* Stretched link covers the card; GITHUB anchor sits above it */}
      <Link
        to={`/project/${project.slug}`}
        className="absolute inset-0 z-[1]"
        aria-label={project.title}
      />

      {/* Image with ghost index number */}
      <div className="relative border-b border-hairline overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        {project.mainImage && (
          <img
            src={urlFor(project.mainImage).width(900).height(675).url()}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        )}
        <span
          aria-hidden
          className="pointer-events-none select-none absolute -bottom-3 right-2 font-display leading-none text-[clamp(56px,5vw,84px)] text-paper mix-blend-difference opacity-80"
        >
          {number}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5">
        <p className="font-mono text-[10px] tracking-[0.15em] text-ink-muted uppercase mb-1.5">
          {number}{meta && ` // ${meta}`}
        </p>
        <h3 className="font-display uppercase tracking-tight leading-[0.95] text-[clamp(20px,1.8vw,26px)] mb-2.5 transition-colors duration-200 group-hover:text-brand">
          {project.title}
        </h3>
        {project.summary && (
          <p className="font-sans text-sm text-ink-muted leading-relaxed mb-3 line-clamp-2">
            {project.summary}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <p className="font-mono text-[11px] tracking-wider text-ink-faint uppercase mb-4 line-clamp-1">
            {project.tags.join(' · ')}
          </p>
        )}
        <span className="flex items-center gap-5 font-mono text-xs tracking-wider uppercase">
          <span className="group-hover:text-brand transition-colors">View case →</span>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-[2] text-ink-muted hover:text-brand transition-colors"
            >
              GitHub ↗
            </a>
          )}
        </span>
      </div>
    </div>
  );
}

export function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <section id="projects" className="py-8 md:py-12 bg-paper text-ink">
      <div className="container-page">
        <SectionHeader
          index="01"
          label="Selected Work"
          count={projects.length}
          action={
            <Link
              to="/projects"
              className="font-mono text-[11px] tracking-[0.15em] uppercase hover:text-brand transition-colors"
            >
              All Projects →
            </Link>
          }
        />

        {/* Horizontal rail — 3 cards visible on desktop */}
        <div className="overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:-mx-8 md:px-8 pb-2">
          <div className="flex gap-8">
            {projects.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={i}
                className="snap-start flex-none w-[85%] sm:w-[60%] md:w-[45%] lg:w-[calc((100%-4rem)/3)]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
