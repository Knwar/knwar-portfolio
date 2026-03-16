import { ArrowUp, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFooterNav = (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-[#FAFAFA] border-t border-[#EEEEEE]" style={{ borderWidth: '1px' }}>
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        {/* Mobile: Single Stack / Desktop: 4-Column Layout */}
        <div className="pt-12 md:pt-20">
          {/* Logo & Tag - Mobile centered with 48px bottom margin */}
          <div className="text-center md:text-left mb-12 md:mb-0">
            <div
              className="font-bold mb-3"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '24px'
              }}
            >
              K.
            </div>
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: '#666666',
                letterSpacing: '0.5px'
              }}
            >
              ENGINEERED IN PUNJAB, IN
            </p>
          </div>

          {/* Mobile: Vertical Stack with 40px gaps / Desktop: Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-20">
            {/* Desktop Col 1 spacer (logo already positioned above on mobile) */}
            <div className="hidden md:block" />

            {/* Col 2: Index */}
            <div className="text-center md:text-left mb-10 md:mb-0">
              <h4
                className="mb-3"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: '#000000',
                  textTransform: 'uppercase'
                }}
              >
                INDEX
              </h4>
              <nav className="flex flex-col gap-3">
                <button
                  onClick={() => handleFooterNav('projects')}
                  className="hover:underline text-left md:text-left text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  Projects
                </button>
                <button
                  onClick={() => navigate('/logs')}
                  className="hover:underline text-left md:text-left text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  Logs
                </button>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:underline text-left md:text-left text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  About
                </button>
                <button
                  onClick={() => handleFooterNav('contact')}
                  className="hover:underline text-left md:text-left text-center"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  Contact
                </button>
              </nav>
            </div>

            {/* Col 3: Network */}
            <div className="text-center md:text-left mb-10 md:mb-0">
              <h4
                className="mb-3"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: '#000000',
                  textTransform: 'uppercase'
                }}
              >
                NETWORK
              </h4>
              <nav className="flex flex-col gap-3 items-center md:items-start">
                <a
                  href="https://github.com/knwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  <Github size={16} />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/knwar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
                <a
                  href="https://x.com/knwar_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  <Twitter size={16} />
                  Twitter
                </a>
                <a
                  href="https://instagram.com/knwar.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <a
                  href="https://youtube.com/@Knwar_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-2"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  <Youtube size={16} />
                  YouTube
                </a>
              </nav>
            </div>

            {/* Col 4: Contact */}
            <div className="text-center md:text-left">
              <h4
                className="mb-3"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  color: '#000000',
                  textTransform: 'uppercase'
                }}
              >
                CONTACT
              </h4>
              <div className="flex flex-col gap-3 items-center md:items-start">
                <a
                  href="mailto:contact@knwar.com"
                  className="hover:underline break-all"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#007AFF'
                  }}
                >
                  contact@knwar.com
                </a>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-2 hover:underline"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '16px',
                    color: '#000000'
                  }}
                >
                  Back to Top <ArrowUp size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright */}
        <div className="border-t border-[#EEEEEE] mt-12 md:mt-16 pt-6 md:pt-8" style={{ paddingBottom: '32px' }}>
          <p
            className="text-center"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '10px',
              color: '#666666',
              letterSpacing: '0.5px'
            }}
          >
            © 2026 KNWAR — ALL SYSTEMS OPERATIONAL
          </p>
        </div>
      </div>
    </footer>
  );
}
