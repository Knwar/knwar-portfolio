import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../../sanity/client';
import { PROJECT_BY_SLUG_QUERY, PROJECTS_QUERY } from '../../sanity/queries';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { PortableText } from '@portabletext/react';
import { SEOHead } from './SEOHead';
import { StructuredData, buildProjectSchema } from './StructuredData';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from './ui/carousel';

interface ProjectDetail {
  _id: string;
  title: string;
  slug?: string;
  platform?: string;
  tech?: string[]; // Original schema uses tags
  tags?: string[];
  mainImage?: any;
  playStoreUrl?: string;
  appStoreUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  gallery?: any[];
  challenge?: {
    title: string;
    description: string;
  };
  solution?: {
    title: string;
    description: string;
  };
  description?: any[];
  publishedAt: string;
}

interface ProjectSummary {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  mainImage: any;
  color: string;
}

export function CaseStudy() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideCount, setSlideCount] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (slug) {
      client.fetch(PROJECT_BY_SLUG_QUERY, { slug })
        .then((data) => {
          setProject(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [slug]);

  // Fetch all projects for the sidebar
  useEffect(() => {
    client.fetch(PROJECTS_QUERY)
      .then((data) => setAllProjects(data))
      .catch(console.error);
  }, []);

  // Carousel slide tracking
  useEffect(() => {
    if (!carouselApi) return;
    setSlideCount(carouselApi.scrollSnapList().length);
    setCurrentSlide(carouselApi.selectedScrollSnap());

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    carouselApi.on('select', onSelect);
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight' && project?.gallery)
        setLightboxIndex((prev) => (prev + 1) % project.gallery!.length);
      if (e.key === 'ArrowLeft' && project?.gallery)
        setLightboxIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, project?.gallery]);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper text-ink flex items-center justify-center">
        <p className="font-mono">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-paper text-ink flex flex-col items-center justify-center gap-4">
        <p className="font-mono">Project not found.</p>
        <Link to="/" className="underline font-mono">Back home</Link>
      </div>
    );
  }

  const projectImageUrl = project.mainImage ? urlFor(project.mainImage).width(1200).url() : undefined;

  return (
    <div className="bg-paper min-h-screen text-ink">
      <SEOHead
        title={`${project.title} — Knwar`}
        description={project.tags?.join(', ') || `Case study: ${project.title}`}
        canonicalPath={`/project/${slug}`}
        ogImage={projectImageUrl}
        ogType="article"
      />
      <StructuredData
        data={buildProjectSchema({
          title: project.title,
          description: project.tags?.join(', ') || `Case study: ${project.title}`,
          url: `https://knwar.dev/project/${slug}`,
          techStack: project.tags,
          datePublished: project.publishedAt,
          image: projectImageUrl,
        })}
      />
      <header>
        <Navigation />
      </header>

      <main className="pt-24 pb-16">
        <div className="container-page">
          {/* Header */}
          <div className="mb-12">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs tracking-wider text-ink-muted hover:text-ink transition-colors mb-6"
            >
              ← INDEX / PROJECTS
            </Link>
            <h1 className="font-display uppercase text-[clamp(36px,7vw,90px)] leading-[0.95] tracking-tight mb-8">
              {project.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-t border-b border-hairline py-5">
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">Platform</h3>
                <p className="font-mono text-sm">{project.platform || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">Tech Stack</h3>
                <p className="font-mono text-sm">{project.tags?.join(' // ') || 'N/A'}</p>
              </div>
              {project.publishedAt && (
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">Year</h3>
                  <p className="font-mono text-sm">{new Date(project.publishedAt).getFullYear()}</p>
                </div>
              )}
              {(project.githubUrl || project.projectUrl) && (
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">Links</h3>
                  <div className="flex flex-col gap-1">
                    {project.projectUrl && (
                      <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-brand transition-colors">
                        LIVE ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-sm hover:text-brand transition-colors">
                        GITHUB ↗
                      </a>
                    )}
                  </div>
                </div>
              )}
              {project.playStoreUrl && (
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">Google Play</h3>
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm bg-ink text-paper px-4 py-2 hover:bg-brand hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 0 1 0 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                    </svg>
                    Get it
                  </a>
                </div>
              )}
              {project.appStoreUrl && (
                <div>
                  <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-2">App Store</h3>
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm bg-ink text-paper px-4 py-2 hover:bg-brand hover:text-white transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.984-1.884.012-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.308-1.932-3.348-2.148-4.08-2.196-1.848-.144-3.396 1.008-4.236 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.708.828-1.332 2.16-1.164 3.432 1.236.096 2.508-.636 3.276-1.572z" />
                    </svg>
                    Download
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Gallery — App Store Style Horizontal Carousel */}
          <div className="mb-12">
            <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-5">Preview</h3>
            {project.gallery && project.gallery.length > 0 ? (
              <div className="relative">
                <Carousel
                  setApi={setCarouselApi}
                  opts={{
                    align: 'start',
                    loop: false,
                    dragFree: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {project.gallery.map((img: any, i: number) => (
                      <CarouselItem
                        key={i}
                        className="pl-3 md:pl-4 basis-[55%] sm:basis-[40%] md:basis-[30%] lg:basis-[22%]"
                      >
                        <button
                          onClick={() => openLightbox(i)}
                          className="block w-full group cursor-zoom-in focus:outline-none"
                        >
                          <div className="relative overflow-hidden border border-hairline bg-paper-2 transition-colors duration-300 group-hover:border-ink">
                            <img
                              src={urlFor(img).width(540).quality(85).url()}
                              alt={`${project.title} screenshot ${i + 1}`}
                              className="w-full h-auto object-contain aspect-[9/20]"
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                          </div>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation arrows — positioned outside the carousel */}
                  <CarouselPrevious className="hidden md:inline-flex -left-5 size-10 rounded-none border-hairline bg-paper shadow-none hover:bg-ink hover:text-paper transition-colors" />
                  <CarouselNext className="hidden md:inline-flex -right-5 size-10 rounded-none border-hairline bg-paper shadow-none hover:bg-ink hover:text-paper transition-colors" />
                </Carousel>

                {/* Dot indicators */}
                {slideCount > 1 && (
                  <div className="flex justify-center gap-1.5 mt-5">
                    {Array.from({ length: slideCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => carouselApi?.scrollTo(i)}
                        className={`transition-all duration-300 ${i === currentSlide
                          ? 'w-6 h-1.5 bg-ink'
                          : 'w-1.5 h-1.5 bg-hairline hover:bg-ink-faint'
                          }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Slide counter */}
                <p className="text-center font-mono text-xs text-ink-faint mt-3">
                  {currentSlide + 1} / {project.gallery.length}
                </p>
              </div>
            ) : (
              <div className="w-full aspect-video bg-paper-2 border border-dashed border-hairline flex items-center justify-center">
                <p className="font-mono text-ink-faint">No Gallery Images</p>
              </div>
            )}
          </div>


          {/* Two-Column Layout: Content (80%) + Other Projects Sidebar (20%) */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left Column — Main Content (80%) */}
            <div className="flex-1 lg:w-[80%] min-w-0">
              {/* Challenge & Solution */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12 border-t border-hairline pt-6">
                {project.challenge && (
                  <div>
                    <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-3">Critical Friction Point</h3>
                    <h4 className="font-bold font-mono text-xl mb-3">{project.challenge.title}</h4>
                    <p className="font-sans leading-relaxed text-ink">{project.challenge.description}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="md:border-l md:border-hairline md:pl-8 lg:pl-12">
                    <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-3">Engineered Solution</h3>
                    <h4 className="font-bold font-mono text-xl mb-3">{project.solution.title}</h4>
                    <p className="font-sans leading-relaxed text-ink">{project.solution.description}</p>
                  </div>
                )}
              </div>

              {/* Full Description / Body */}
              {project.description && (
                <div className="max-w-3xl prose font-sans">
                  <PortableText value={project.description} />
                </div>
              )}
            </div>

            {/* Right Column — Other Projects index list (20%) */}
            <aside className="lg:w-[20%] flex-shrink-0">
              <div className="lg:sticky lg:top-32">
                <h3 className="font-mono text-[10px] tracking-[0.1em] text-ink-muted uppercase mb-4">
                  Other Projects
                </h3>

                <div className="border-t border-hairline">
                  {allProjects
                    .filter((p) => p.slug !== slug)
                    .map((p, i) => (
                      <Link
                        key={p._id}
                        to={`/project/${p.slug}`}
                        className="flex items-baseline justify-between gap-3 border-b border-hairline py-2.5 font-mono text-xs group hover:text-brand transition-colors"
                      >
                        <span className="truncate">
                          <span className="text-ink-faint mr-2">{String(i + 1).padStart(2, '0')}</span>
                          {p.title}
                        </span>
                        <span className="flex-shrink-0">↗</span>
                      </Link>
                    ))}
                </div>
              </div>
            </aside>
          </div>

        </div>
      </main>
      <Footer />

      {/* Lightbox / Fullscreen Preview Modal */}
      {lightboxOpen && project.gallery && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous button */}
          {project.gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev - 1 + project.gallery!.length) % project.gallery!.length);
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all z-10"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Main image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={urlFor(project.gallery[lightboxIndex]).width(1600).quality(90).url()}
              alt={`${project.title} screenshot ${lightboxIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl animate-[fadeIn_0.2s_ease-out]"
            />
          </div>

          {/* Next button */}
          {project.gallery.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev + 1) % project.gallery!.length);
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-3 transition-all z-10"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Bottom counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="flex gap-1.5">
              {project.gallery.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${i === lightboxIndex
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-white/60">
              {lightboxIndex + 1} / {project.gallery.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
