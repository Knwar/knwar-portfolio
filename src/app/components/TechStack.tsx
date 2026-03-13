export function TechStack() {
  const techCategories = {
    MOBILE: ['Flutter', 'Dart', 'Bloc', 'Riverpod', 'Swift'],
    BACKEND: ['Node.js', 'Express', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase'],
    TOOLS: ['React', 'Vue', 'JavaScript', 'AWS', 'Google Cloud']
  };

  return (
    <section id="tech-stack" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <h2 
          className="font-bold mb-8 md:mb-12"
          style={{ 
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '32px'
          }}
        >
          TECH STACK
        </h2>
        
        {/* Mobile: Vertical Stack with 2-column grids */}
        <div className="md:hidden max-h-[60vh] overflow-y-auto space-y-8">
          {/* MOBILE Category */}
          <div>
            <h3 
              className="mb-4"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: '#888888',
                letterSpacing: '0.05em'
              }}
            >
              MOBILE
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {techCategories.MOBILE.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: '#000000' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px',
                      color: '#000000'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BACKEND Category */}
          <div>
            <h3 
              className="mb-4"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: '#888888',
                letterSpacing: '0.05em'
              }}
            >
              BACKEND
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {techCategories.BACKEND.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: '#000000' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px',
                      color: '#000000'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TOOLS Category */}
          <div>
            <h3 
              className="mb-4"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                color: '#888888',
                letterSpacing: '0.05em'
              }}
            >
              TOOLS
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {techCategories.TOOLS.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', color: '#000000' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px',
                      color: '#000000'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Desktop: 3-Column Grid */}
        <div className="hidden md:grid grid-cols-3 gap-0">
          {/* MOBILE Column */}
          <div className="pr-8 border-r border-[#EEEEEE]">
            <h3 
              className="mb-6"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#666666',
                letterSpacing: '0.05em'
              }}
            >
              MOBILE
            </h3>
            <div className="space-y-3">
              {techCategories.MOBILE.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BACKEND Column */}
          <div className="px-8 border-r border-[#EEEEEE]">
            <h3 
              className="mb-6"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#666666',
                letterSpacing: '0.05em'
              }}
            >
              BACKEND
            </h3>
            <div className="space-y-3">
              {techCategories.BACKEND.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* TOOLS Column */}
          <div className="pl-8">
            <h3 
              className="mb-6"
              style={{ 
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#666666',
                letterSpacing: '0.05em'
              }}
            >
              TOOLS
            </h3>
            <div className="space-y-3">
              {techCategories.TOOLS.map((tech) => (
                <div 
                  key={tech}
                  className="flex items-center"
                  style={{ gap: '8px' }}
                >
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '14px' }}>↳</span>
                  <span 
                    style={{ 
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '14px'
                    }}
                  >
                    {tech}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
