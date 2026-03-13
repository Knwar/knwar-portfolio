import { useState, useEffect } from 'react';
import { X, Instagram, Youtube } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('Projects');
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ['Projects', 'Logs', 'About', 'Contact'];

  useEffect(() => {
    // Sync active link with path
    const path = location.pathname;
    if (path === '/logs') {
      setActiveLink('Logs');
    } else if (path === '/about') {
      setActiveLink('About');
    } else if (path === '/') {
      // On home page, we might ideally track scroll position, but for now default to Projects or null
      // If we just clicked a link, handleNavClick handles it.
      // But if we navigated back, we might want to reset?
      // Keeping it simple: if exact root, maybe 'Projects' is fine or check hash
      if (window.location.hash === '#about') setActiveLink('About');
      else if (window.location.hash === '#contact') setActiveLink('Contact');
      else setActiveLink('Projects');
    } else {
      setActiveLink(''); // Detail pages
    }
  }, [location]);

  const handleNavClick = (linkName: string) => {
    setActiveLink(linkName);
    setMenuOpen(false);

    // Special handling for Logs
    if (linkName === 'Logs') {
      navigate('/logs');
      return;
    }

    // Special handling for About Page
    if (linkName === 'About') {
      navigate('/about');
      return;
    }

    // For other links (Projects, Contact), go to Home and scroll
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
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-sm border-b border-[#EEEEEE]" aria-label="Main navigation">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <button
            onClick={navigateToHome}
            className="font-bold cursor-pointer hover:opacity-70 transition-opacity"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            K.
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="text-sm relative"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {link}
                {activeLink === link && (
                  <div className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#007AFF]" />
                )}
              </button>
            ))}

            {/* Social Icons */}
            <div className="flex gap-4 ml-4 pl-4 border-l border-[#EEEEEE]">
              <a
                href="https://instagram.com/knwar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com/@knwar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '14px'
            }}
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center md:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6"
          >
            <X size={24} />
          </button>

          <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '32px',
                  fontWeight: 'bold'
                }}
              >
                {link}
              </button>
            ))}

            {/* Mobile Social Icons */}
            <div className="flex gap-6 mt-8 pt-8 border-t border-[#EEEEEE]">
              <a
                href="https://instagram.com/knwar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Instagram size={28} />
              </a>
              <a
                href="https://youtube.com/@knwar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Youtube size={28} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
