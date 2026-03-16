export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[800px] mx-auto">
        <h2 
          className="font-bold mb-8 md:mb-12"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 'clamp(24px, 4vw, 32px)'
          }}
        >
          CONTACT
        </h2>
        
        <div className="space-y-6 md:space-y-8">
          <p 
            style={{ 
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(16px, 2vw, 18px)',
              lineHeight: '1.8',
              color: '#000000'
            }}
          >
            Currently available for freelance projects and consulting opportunities.
            Let's build something exceptional together.
          </p>
          
          <div className="space-y-4">
            <div>
              <p 
                className="mb-2"
                style={{ 
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  color: '#666666'
                }}
              >
                EMAIL
              </p>
              <a 
                href="mailto:contact@knwar.com"
                className="hover:underline break-all"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  color: '#007AFF'
                }}
              >
                contact@knwar.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
