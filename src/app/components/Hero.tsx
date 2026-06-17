import { YouTubeCTA } from './YouTubeCTA';

export function Hero() {
  const handleMyProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-16 bg-paper text-ink border-b border-hairline overflow-hidden">
      {/* Faded blueprint grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(242,242,242,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,242,242,0.04) 1px, transparent 1px),
            linear-gradient(to right, rgba(242,242,242,0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242,242,242,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px, 24px 24px, 120px 120px, 120px 120px',
          maskImage: 'radial-gradient(ellipse 80% 90% at 50% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 40%, black 0%, transparent 100%)',
        }}
      />

      <div className="container-page relative pt-14 pb-16 md:pt-20 md:pb-24 text-center">
        {/* Giant poster headline — centered */}
        <h1 className="font-display uppercase leading-[0.85] tracking-tight text-[clamp(64px,15vw,200px)]">
          I ship
          <br />
          <span className="text-transparent [-webkit-text-stroke:2px_#F2F2F2] hover:[-webkit-text-stroke:2px_#007AFF] transition-all">
            apps.
          </span>
        </h1>

        {/* Catchy three-word tagline */}
        <p className="font-display uppercase tracking-tight leading-none text-[clamp(20px,3.5vw,40px)] mt-6">
          Build <span className="text-brand">♠</span> Break{' '}
          <span className="text-brand">♠</span> Ship
        </p>

        {/* Sub copy */}
        <p className="font-sans text-base md:text-lg leading-relaxed text-ink-muted max-w-2xl mx-auto mt-8">
          Mobile developer. Ten years of Flutter, Swift and full-stack work —
          shipped, not shelved. I build in public and break down exactly how.
        </p>

        {/* CTA row */}
        <div className="flex flex-wrap justify-center items-center gap-3 mt-10">
          <YouTubeCTA />
          <button
            onClick={handleMyProjects}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-ink font-mono text-xs tracking-wider uppercase hover:bg-ink hover:text-paper transition-colors"
          >
            View work ↓
          </button>
        </div>
      </div>
    </section>
  );
}
