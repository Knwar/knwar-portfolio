import { useState, useEffect } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { client } from '../../sanity/client';
import { PROJECTS_QUERY } from '../../sanity/queries';
import { SEOHead } from './SEOHead';
import { ProjectCard, Project } from './ProjectGrid';

export function ProjectsIndex() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Sanity fetch error:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <SEOHead
        title="Projects — Shipped Apps & Case Studies | Knwar"
        description="All shipped projects and case studies — Flutter, Swift and full-stack apps built by Knwar."
        canonicalPath="/projects"
      />
      <header>
        <Navigation />
      </header>
      <main className="bg-paper text-ink min-h-screen pt-24 pb-16">
        <div className="container-page">
          {/* Header */}
          <div className="mb-8">
            <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted border-t-2 border-ink pt-3 mb-3">
              Index{projects.length > 0 && ` / (${String(projects.length).padStart(2, '0')})`}
            </p>
            <h1 className="font-display uppercase tracking-tight leading-[0.95] text-[clamp(28px,4.5vw,56px)] mb-4">
              Projects
            </h1>
            <p className="font-sans text-sm text-ink-muted">
              Shipped apps and case studies — some live in users' hands, others in active development.
            </p>
          </div>

          {loading ? (
            <p className="font-mono">Loading projects...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, i) => (
                <ProjectCard key={project._id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
