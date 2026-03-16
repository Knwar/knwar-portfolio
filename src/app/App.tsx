import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { Logs } from './components/Logs';
import { About } from './components/About';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudy } from './components/CaseStudy';
import { LogDetail } from './components/LogDetail';
import { LogsIndex } from './components/LogsIndex';
import { AboutPage } from './components/AboutPage';
import { NotFound } from './components/NotFound';
import { ProjectLegalPage } from './components/ProjectLegalPage';
import { SEOHead } from './components/SEOHead';
import { StructuredData, homepageSchema } from './components/StructuredData';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function HomePage() {
  return (
    <>
      <SEOHead
        title="Knwar — Mobile Developer & Engineer | Flutter, Swift, Full-Stack Portfolio"
        description="Portfolio showcasing 10+ years of shipped Flutter, Swift, Node.js and full-stack projects. Explore case studies, technical logs, and engineering insights."
        canonicalPath="/"
      />
      <StructuredData data={homepageSchema} />
      <header>
        <Navigation />
      </header>
      <main>
        <Hero />
        <ProjectGrid />
        <Logs />
        <About />
        <TechStack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:slug" element={<CaseStudy />} />
        <Route path="/project/:slug/:pageType" element={<ProjectLegalPage />} />
        <Route path="/log/:slug" element={<LogDetail />} />
        <Route path="/logs" element={<LogsIndex />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
