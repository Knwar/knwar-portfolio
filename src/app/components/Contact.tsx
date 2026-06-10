import { SectionHeader } from './SectionHeader';
import { YouTubeCTA } from './YouTubeCTA';

export function Contact() {
  return (
    <section id="contact" className="py-8 md:py-12 bg-paper text-ink">
      <div className="container-page">
        <SectionHeader index="05" label="Talk" />

        <p className="font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted mb-6">
          <span className="inline-block w-1.5 h-1.5 bg-brand mr-2 align-middle" />
          Booking freelance + consulting — or just come watch me build.
        </p>

        {/* Giant email */}
        <a
          href="mailto:contact@knwar.com"
          className="block font-display uppercase tracking-tight leading-[0.95] text-[clamp(20px,3.5vw,44px)] break-all hover:text-brand transition-colors mb-10"
        >
          contact@knwar.com
        </a>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline pt-6">
          <YouTubeCTA />
          <a
            href="https://youtube.com/@Knwar_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase text-ink-muted hover:text-brand transition-colors"
          >
            YouTube ↗
          </a>
          <a
            href="https://instagram.com/knwar.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase text-ink-muted hover:text-brand transition-colors"
          >
            Instagram ↗
          </a>
          <a
            href="https://x.com/knwar_dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase text-ink-muted hover:text-brand transition-colors"
          >
            Twitter ↗
          </a>
          <a
            href="https://github.com/knwar"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs tracking-wider uppercase text-ink-muted hover:text-brand transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  );
}
