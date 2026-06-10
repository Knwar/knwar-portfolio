import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';

export function NotFound() {
  return (
    <div className="bg-paper text-ink min-h-screen flex flex-col">
      <SEOHead
        title="404 — Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex={true}
      />
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="font-display text-[clamp(80px,20vw,180px)] leading-none mb-4 text-transparent [-webkit-text-stroke:2px_#262626]">
            404
          </h1>
          <h2 className="font-display uppercase text-xl mb-4">Page not found</h2>
          <p className="font-sans text-base text-ink-muted leading-relaxed mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-paper hover:bg-brand hover:text-white transition-colors font-mono text-xs tracking-wider uppercase"
          >
            ← Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
