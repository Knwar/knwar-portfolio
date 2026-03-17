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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="font-mono">Loading...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="font-mono">Project not found.</p>
        <Link to="/" className="underline font-mono">Back home</Link>
      </div>
    );
  }

  const projectImageUrl = project.mainImage ? urlFor(project.mainImage).width(1200).url() : undefined;

  return (
    <div className="bg-white min-h-screen text-black">
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

      <main className="pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="mb-20">
            <h1
              className="font-bold mb-8"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(32px, 6vw, 64px)',
                lineHeight: '1.1'
              }}
            >
              {project.title}
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-black pt-8">
              <div>
                <h3 className="font-mono text-xs text-gray-500 mb-2">PLATFORM</h3>
                <p className="font-mono text-sm">{project.platform || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-mono text-xs text-gray-500 mb-2">TECH STACK</h3>
                <p className="font-mono text-sm">{project.tags?.join(' // ') || 'N/A'}</p>
              </div>
              {project.playStoreUrl && (
                <div>
                  <h3 className="font-mono text-xs text-gray-500 mb-2">GOOGLE PLAY</h3>
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
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
                  <h3 className="font-mono text-xs text-gray-500 mb-2">APP STORE</h3>
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
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
          <div className="mb-20">
            <h3 className="font-mono text-xs text-gray-500 mb-6 uppercase tracking-wider">Preview</h3>
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
                          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.01]">
                            <img
                              src={urlFor(img).width(540).quality(85).url()}
                              alt={`${project.title} screenshot ${i + 1}`}
                              className="w-full h-auto object-contain aspect-[9/20] transition-transform duration-500 group-hover:scale-[1.03]"
                              loading={i === 0 ? 'eager' : 'lazy'}
                            />
                            {/* Subtle gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Expand icon hint */}
                            <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 3 21 3 21 9" />
                                <polyline points="9 21 3 21 3 15" />
                                <line x1="21" y1="3" x2="14" y2="10" />
                                <line x1="3" y1="21" x2="10" y2="14" />
                              </svg>
                            </div>
                          </div>
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {/* Navigation arrows — positioned outside the carousel */}
                  <CarouselPrevious className="hidden md:inline-flex -left-5 size-10 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all" />
                  <CarouselNext className="hidden md:inline-flex -right-5 size-10 border-gray-200 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white hover:shadow-xl transition-all" />
                </Carousel>

                {/* Dot indicators */}
                {slideCount > 1 && (
                  <div className="flex justify-center gap-1.5 mt-6">
                    {Array.from({ length: slideCount }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => carouselApi?.scrollTo(i)}
                        className={`rounded-full transition-all duration-300 ${i === currentSlide
                          ? 'w-6 h-2 bg-black'
                          : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                          }`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                {/* Slide counter */}
                <p className="text-center font-mono text-xs text-gray-400 mt-3">
                  {currentSlide + 1} / {project.gallery.length}
                </p>
              </div>
            ) : (
              <div className="w-full aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center">
                <p className="font-mono text-gray-400">No Gallery Images</p>
              </div>
            )}
          </div>


          {/* Two-Column Layout: Content (80%) + Other Projects Sidebar (20%) */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
            {/* Left Column — Main Content (80%) */}
            <div className="flex-1 lg:w-[80%] min-w-0">
              {/* Challenge & Solution */}
              <div className="grid md:grid-cols-2 gap-20 mb-20">
                {project.challenge && (
                  <div>
                    <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">CRITICAL FRICTION POINT</h3>
                    <h4 className="font-bold font-mono text-xl mb-4">{project.challenge.title}</h4>
                    <p className="font-sans leading-relaxed text-gray-800">{project.challenge.description}</p>
                  </div>
                )}
                {project.solution && (
                  <div>
                    <h3 className="font-mono text-xs text-gray-500 mb-4 uppercase">ENGINEERED SOLUTION</h3>
                    <h4 className="font-bold font-mono text-xl mb-4">{project.solution.title}</h4>
                    <p className="font-sans leading-relaxed text-gray-800">{project.solution.description}</p>
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

            {/* Right Column — Other Projects Sidebar (20%) */}
            <aside className="lg:w-[20%] flex-shrink-0">
              <div className="lg:sticky lg:top-32">
                <h3
                  className="font-bold mb-6 uppercase tracking-wider"
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '12px',
                    color: '#999',
                  }}
                >
                  Other Projects
                </h3>

                <div className="flex flex-row lg:flex-col gap-4 overflow-x-auto scrollbar-hide lg:overflow-x-visible pb-2 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
                  {allProjects
                    .filter((p) => p.slug !== slug)
                    .map((p) => (
                      <Link
                        key={p._id}
                        to={`/project/${p.slug}`}
                        className="block group flex-shrink-0"
                        style={{ width: '180px', minWidth: '180px' }}
                      >
                        <div
                          className="rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-0.5"
                          style={{ backgroundColor: p.color || '#F5F5F5' }}
                        >
                          {/* Image */}
                          <div
                            className="w-full relative"
                            style={{ aspectRatio: '4 / 5' }}
                          >
                            {p.mainImage && (
                              <img
                                src={urlFor(p.mainImage).width(360).url()}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            )}
                          </div>

                          {/* Info */}
                          <div className="p-3 bg-white">
                            <h4
                              className="font-bold mb-0.5 transition-colors duration-200 group-hover:text-[#007AFF] truncate"
                              style={{
                                fontFamily: 'JetBrains Mono, monospace',
                                fontSize: '11px',
                              }}
                            >
                              {p.title}
                            </h4>
                            <p
                              className="line-clamp-2"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '10px',
                                color: '#999',
                                lineHeight: '1.4',
                              }}
                            >
                              {p.summary || p.tags?.join(' · ')}
                            </p>
                            <span
                              className="inline-flex items-center gap-0.5 font-medium mt-1.5 transition-all duration-200 group-hover:gap-1.5"
                              style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '10px',
                                color: '#007AFF',
                              }}
                            >
                              View Project
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                              </svg>
                            </span>
                          </div>
                        </div>
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
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-[fadeIn_0.2s_ease-out]"
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
