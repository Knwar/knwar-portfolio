import { Navigation } from './Navigation';
import { About } from './About';
import { TechStack } from './TechStack';
import { Footer } from './Footer';
import { SEOHead } from './SEOHead';

export function AboutPage() {
    return (
        <>
            <SEOHead
                title="About Knwar — Mobile Developer & Engineer"
                description="12+ years of software engineering experience specializing in Flutter, Swift, and full-stack mobile development. Learn about my journey, tech stack, and engineering philosophy."
                canonicalPath="/about"
            />
            <header>
                <Navigation />
            </header>
            <main className="bg-white text-black min-h-screen pt-20">
                <About />
                <TechStack />
            </main>
            <Footer />
        </>
    );
}
