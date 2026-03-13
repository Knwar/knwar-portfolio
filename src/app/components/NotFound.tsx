import { Link } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';

export function NotFound() {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <SEOHead
        title="404 — Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        noIndex={true}
      />
      <Navigation />
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1
            className="mb-4"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(64px, 15vw, 120px)',
              fontWeight: 'bold',
              lineHeight: '1',
              opacity: 0.1,
            }}
          >
            404
          </h1>
          <h2
            className="mb-4"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '20px',
              fontWeight: 'bold',
            }}
          >
            PAGE NOT FOUND
          </h2>
          <p
            className="mb-8"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '16px',
              color: '#666666',
              lineHeight: '1.6',
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#007AFF] transition-colors"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12px',
              borderRadius: '24px',
              letterSpacing: '0.5px',
            }}
          >
            ← BACK TO HOME
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
