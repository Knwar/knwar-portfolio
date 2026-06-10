import { useState, useEffect } from 'react';
import { X, Instagram } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { YouTubeCTA } from './YouTubeCTA';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('Projects');
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Projects', 'Logs', 'About', 'Contact'];

  useEffect(() => {
    // Sync active link with path
    const path = location.pathname;
    if (path === '/projects') {
      setActiveLink('Projects');
    } else if (path === '/logs') {
      setActiveLink('Logs');
    } else if (path === '/about') {
      setActiveLink('About');
    } else if (path === '/') {
      if (window.location.hash === '#about') setActiveLink('About');
      else if (window.location.hash === '#contact') setActiveLink('Contact');
      else setActiveLink('');
    } else {
      setActiveLink(''); // Detail pages
    }
  }, [location]);

  const handleNavClick = (linkName: string) => {
    setActiveLink(linkName);
    setMenuOpen(false);

    if (linkName === 'Projects') {
      navigate('/projects');
      return;
    }

    if (linkName === 'Logs') {
      navigate('/logs');
      return;
    }

    if (linkName === 'About') {
      navigate('/about');
      return;
    }

    // Contact: go to Home and scroll
    if (location.pathname !== '/') {
      navigate(`/#${linkName.toLowerCase()}`);
    } else {
      const element = document.getElementById(linkName.toLowerCase());
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-paper/90 backdrop-blur-sm border-b border-hairline text-ink" aria-label="Main navigation">
        <div className="container-page h-full flex items-center justify-between">
          <button
            onClick={navigateToHome}
            className="font-display text-base uppercase tracking-tight cursor-pointer hover:text-brand transition-colors"
          >
            Knwar<span className="text-brand">.</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-7 items-center">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className={`font-mono text-xs uppercase tracking-wider relative hover:text-brand transition-colors ${
                  activeLink === link ? 'text-brand' : 'text-ink'
                }`}
              >
                {link}
                {activeLink === link && (
                  <div className="absolute bottom-[-6px] left-0 right-0 h-[2px] bg-brand" />
                )}
              </button>
            ))}

            {/* Socials + YouTube CTA */}
            <div className="flex items-center gap-4 ml-3 pl-5 border-l border-hairline">
              <a
                href="https://instagram.com/knwar.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                <Instagram size={18} />
              </a>
              <YouTubeCTA size="sm" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden font-mono text-sm tracking-wider"
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-paper text-ink z-[100] flex flex-col items-center justify-center md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-6" aria-label="Mobile navigation">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="font-display text-4xl uppercase tracking-tight hover:text-brand transition-colors"
              >
                {link}
              </button>
            ))}

            {/* Mobile Socials + YouTube CTA */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-hairline">
              <a
                href="https://instagram.com/knwar.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand transition-colors"
              >
                <Instagram size={24} />
              </a>
              <YouTubeCTA />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
