import { ArrowUp, Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const socials = [
  { label: 'GitHub', href: 'https://github.com/knwar', Icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/knwar', Icon: Linkedin },
  { label: 'Twitter', href: 'https://x.com/knwar_dev', Icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/knwar.dev', Icon: Instagram },
  { label: 'YouTube', href: 'https://youtube.com/@Knwar_dev', Icon: Youtube },
];

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

  const indexLinks = [
    { label: 'Projects', onClick: () => navigate('/projects') },
    { label: 'Logs', onClick: () => navigate('/logs') },
    { label: 'About', onClick: () => navigate('/about') },
    { label: 'Contact', onClick: () => handleFooterNav('contact') },
  ];

  return (
    <footer className="bg-paper text-ink">
      {/* Giant inverting YouTube banner */}
      <a
        href="https://youtube.com/@Knwar_dev?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        className="block border-y border-hairline group hover:bg-brand transition-colors duration-200"
      >
        <div className="container-page py-8 md:py-12 flex items-center justify-between gap-6">
          <span className="font-display uppercase tracking-tight leading-[0.9] text-[clamp(28px,6vw,88px)] group-hover:text-white transition-colors">
            Watch me build
          </span>
          <span className="font-display text-[clamp(28px,6vw,88px)] leading-none text-brand group-hover:text-white transition-colors">
            ▶
          </span>
        </div>
      </a>

      <div className="container-page">
        <div className="pt-10 md:pt-12 grid grid-cols-1 md:grid-cols-4 md:gap-12">
          {/* Logo & Tag */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <div className="font-display text-2xl uppercase tracking-tight mb-2">
              K<span className="text-brand">.</span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted">
              Engineered in Punjab, IN
            </p>
          </div>

          {/* Index */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h4 className="font-mono text-[10px] tracking-[0.15em] text-ink-faint uppercase mb-3">Index</h4>
            <nav className="flex flex-row flex-wrap justify-center gap-x-6 gap-y-2 md:flex-col md:gap-2.5 md:justify-start">
              {indexLinks.map(({ label, onClick }) => (
                <button
                  key={label}
                  onClick={onClick}
                  className="font-mono text-xs uppercase tracking-wider text-ink hover:text-brand transition-colors text-center md:text-left"
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Network */}
          <div className="text-center md:text-left mb-8 md:mb-0">
            <h4 className="font-mono text-[10px] tracking-[0.15em] text-ink-faint uppercase mb-3">Network</h4>
            <nav className="flex flex-row justify-center gap-5 md:flex-col md:gap-2.5 md:items-start">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand transition-colors flex items-center gap-2"
                  aria-label={label}
                >
                  <Icon size={20} className="md:!w-4 md:!h-4" />
                  <span className="hidden md:inline font-mono text-xs uppercase tracking-wider">{label}</span>
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-mono text-[10px] tracking-[0.15em] text-ink-faint uppercase mb-3">Contact</h4>
            <div className="flex flex-col gap-2.5 items-center md:items-start">
              <a
                href="mailto:contact@knwar.com"
                className="font-mono text-xs tracking-wider text-brand hover:underline break-all"
              >
                contact@knwar.com
              </a>
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-brand transition-colors"
              >
                Back to top <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-hairline mt-10 pt-5 pb-6">
          <p className="text-center font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted">
            © 2026 Knwar — <span className="inline-block w-1.5 h-1.5 bg-brand align-middle mr-1" />All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
}
