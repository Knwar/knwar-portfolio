import herobg from '../../assets/hero-bg.png';

export function Hero() {
  const metaTags = ['LOCATION: PUNJAB, IN', 'STATUS: ACTIVE', 'ROLE: FLUTTER & AI'];

  const handleHireMe = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMyProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="pt-32 pb-16 md:pb-32 px-4 md:px-8 relative overflow-hidden min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center"
      style={{
        backgroundImage: `url(${herobg}), radial-gradient(circle, #F5F5F5 4px, transparent 4px)`,
        backgroundSize: 'cover, 32px 32px',
        backgroundPosition: 'left center, 0 0',
        backgroundRepeat: 'no-repeat, repeat'
      }}
    >
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Mobile: Horizontal Scroll Meta Tags */}
        <div className="md:hidden mb-6 overflow-x-auto whitespace-nowrap pb-2">
          <div className="inline-flex gap-4">
            {metaTags.map((tag, index) => (
              <span
                key={index}
                className="inline-block px-3 py-1 border border-[#EEEEEE] bg-white/80 backdrop-blur-sm"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.5px',
                  color: '#666666'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-12 gap-4 md:gap-20 relative">
          {/* Large background '01' section marker - Hidden on mobile */}
          <div
            className="absolute pointer-events-none hidden md:block"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '200px',
              fontWeight: 'bold',
              color: '#000000',
              opacity: '0.05',
              lineHeight: '1',
              top: '-20px',
              left: '120px',
              zIndex: 0
            }}
          >
            01
          </div>

          {/* Desktop: Vertical sidebar - Column 1 */}
          <div className="hidden md:block md:col-span-1">
            <div
              className="transform -rotate-180 origin-left absolute bg-white/50 backdrop-blur-[2px] px-2 py-1"
              style={{
                writingMode: 'vertical-rl',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.5px',
                color: '#666666',
                top: '80px',
                left: '32px'
              }}
            >
              LOCATION: PUNJAB, IN // STATUS: ACTIVE // ROLE: FLUTTER & AI
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-4 md:col-span-8 relative z-10">
            <h1
              className="font-bold mb-4 md:mb-6"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(40px, 8vw, 64px)',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 20px rgba(255,255,255,0.8)'
              }}
            >
              KNWAR // MOBILE DEV
            </h1>
            <p
              className="text-base md:text-lg mb-6 max-w-2xl bg-white/60 backdrop-blur-sm p-4 rounded-lg"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(16px, 2vw, 18px)',
                lineHeight: '1.6',
                color: '#000000'
              }}
            >
              Hi, I’m <strong>Knwar</strong> 👋
              <br />
              A mobile developer who’s been developing and shipping apps for over 10 years. Explore my portfolio of shipped projects and watch my content on the evolving landscape of programming, tech and AI.
            </p>

            {/* Core Stack Icons */}
            <div className="flex items-center gap-5 mb-6 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg w-fit">
              <span className="font-mono text-[10px] tracking-widest text-gray-500 uppercase">Core Stack</span>
              <div className="w-px h-5 bg-gray-300" />
              {/* Flutter */}
              <div className="group flex flex-col items-center gap-1">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-[#02569B] transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.314 0L2.3 12 6 15.7 21.684 0h-7.37zm0 11.066l-3.93 3.934 3.93 3.934 3.715-3.934-3.715-3.934zM10.384 15l3.93 3.934-7.37 5.066L10.384 15z" />
                </svg>
                <span className="font-mono text-[9px] text-gray-400 group-hover:text-[#02569B] transition-colors">Flutter</span>
              </div>
              {/* Swift */}
              <div className="group flex flex-col items-center gap-1">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-[#F05138] transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.508 0c-.287 0-.573 0-.86.002-.241.002-.483.003-.724.01-.132.004-.263.009-.395.015A9.154 9.154 0 0 0 4.045.2 5.233 5.233 0 0 0 2.8.742a4.976 4.976 0 0 0-1.088.857A4.976 4.976 0 0 0 .855 2.687 5.233 5.233 0 0 0 .312 3.932a9.154 9.154 0 0 0-.173 1.484c-.006.132-.011.263-.015.395-.007.241-.008.483-.01.724C.112 6.822.112 7.108.112 7.395v9.21c0 .287 0 .573.002.86.002.241.003.483.01.724.004.132.009.263.015.395.019.5.058 1.003.173 1.484a5.233 5.233 0 0 0 .543 1.245 4.976 4.976 0 0 0 .857 1.088 4.976 4.976 0 0 0 1.088.857 5.233 5.233 0 0 0 1.245.543 9.154 9.154 0 0 0 1.484.173c.132.006.263.011.395.015.241.007.483.008.724.01.287.002.573.002.86.002h9.21c.287 0 .573 0 .86-.002.241-.002.483-.003.724-.01.132-.004.263-.009.395-.015a9.154 9.154 0 0 0 1.484-.173 5.233 5.233 0 0 0 1.245-.543 4.976 4.976 0 0 0 1.088-.857 4.976 4.976 0 0 0 .857-1.088 5.233 5.233 0 0 0 .543-1.245 9.154 9.154 0 0 0 .173-1.484c.006-.132.011-.263.015-.395.007-.241.008-.483.01-.724.002-.287.002-.573.002-.86v-9.21c0-.287 0-.573-.002-.86a19.673 19.673 0 0 0-.01-.724 14.47 14.47 0 0 0-.015-.395 9.154 9.154 0 0 0-.173-1.484 5.233 5.233 0 0 0-.543-1.245 4.976 4.976 0 0 0-.857-1.088A4.976 4.976 0 0 0 21.2.742 5.233 5.233 0 0 0 19.955.2a9.154 9.154 0 0 0-1.484-.173 14.47 14.47 0 0 0-.395-.015 19.673 19.673 0 0 0-.724-.01C17.066 0 16.78 0 16.492 0H7.508zm6.035 3.41c2.461 1.597 4.027 4.178 4.363 6.908.153-.1.313-.208.481-.328 1.778-1.269 3.034-2.908 3.539-4.1-.465.642-1.53 1.476-2.662 2.08C17.712 4.597 14.592 2.282 11.893.504c-.02-.013-.04-.027-.058-.04 1.493.914 5.024 3.281 7.158 5.727-1.588-1.367-5.39-4.23-7.848-5.527l-.062-.033c.086.052.175.115.267.18 2.182 1.562 6.006 5.127 7.178 7.402-1.382-1.698-4.396-4.637-6.378-5.954a26.665 26.665 0 0 1 2.844 3.186c-1.16-1.087-4.12-3.453-6.467-4.53 5.21 3.735 8.123 9.246 4.562 14.504a7.082 7.082 0 0 1-.31.397c3.517-2.245 4.855-6.485 3.587-10.286-.002.01-.004.018-.006.027.066.361.095.735.095 1.12 0 4.166-3.965 8.188-5.773 9.742-.088.076-.176.15-.263.22.14-.047.282-.102.427-.164C13.863 15.2 18.14 11.95 19.167 8.553c.246 3.578-2.156 7.393-5.09 9.363a10.712 10.712 0 0 1-1.168.618c-.79.34-1.533.526-2.138.625-.074.047-.141.087-.196.118-.109.06-.205.095-.263.095-.035 0-.058-.01-.063-.033a.03.03 0 0 1-.003-.013c0-.014.008-.037.022-.067a.848.848 0 0 0 .035-.079c.269-.772.103-1.643-.362-2.803-.895-2.228-2.967-4.09-3.47-4.707 1.08.573 2.558.989 3.342 1.07-1.43-1.218-2.731-2.58-3.62-4.147-.6-1.056-1.007-2.2-1.156-3.392.008.055.018.11.028.164.247 1.373 1.05 2.89 2.135 4.196l.06.073a16.106 16.106 0 0 1-.504-2.47 12.326 12.326 0 0 1-.014-.638c-.005-.367.01-.738.048-1.112.1-.997.355-2.013.808-2.965A8.606 8.606 0 0 1 8.765 3.9c.192-.24.4-.472.623-.694.195-.193.4-.378.616-.554A8.478 8.478 0 0 1 13.543 3.41z" />
                </svg>
                <span className="font-mono text-[9px] text-gray-400 group-hover:text-[#F05138] transition-colors">Swift</span>
              </div>
              {/* Node.js */}
              <div className="group flex flex-col items-center gap-1">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-[#339933] transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339a.29.29 0 0 0 .272 0l8.795-5.076a.277.277 0 0 0 .134-.238V6.921a.28.28 0 0 0-.137-.242l-8.791-5.072a.278.278 0 0 0-.271 0L3.075 6.68a.28.28 0 0 0-.138.24v10.15c0 .099.053.19.137.236l2.409 1.392c1.307.654 2.108-.116 2.108-.89V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.112.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.509 0-.909 0-2.026-.551l-2.307-1.328A1.851 1.851 0 0 1 1.356 17.07V6.921c0-.659.353-1.275.924-1.603L11.075.244a1.926 1.926 0 0 1 1.849 0l8.794 5.074c.572.329.925.945.925 1.603v10.15c0 .658-.353 1.273-.925 1.604l-8.794 5.078a1.861 1.861 0 0 1-.926.247zm2.722-6.98c-3.867 0-4.677-1.776-4.677-3.266 0-.142.114-.253.255-.253h1.136c.127 0 .233.092.253.216.172 1.161.686 1.748 3.033 1.748 1.865 0 2.659-.422 2.659-1.412 0-.571-.225-1.005-3.124-1.279-2.423-.232-3.922-.775-3.922-2.716 0-1.79 1.51-2.856 4.04-2.856 2.842 0 4.244.986 4.421 3.104a.258.258 0 0 1-.065.19.263.263 0 0 1-.186.081h-1.14a.252.252 0 0 1-.247-.199c-.275-1.22-.943-1.612-2.783-1.612-2.05 0-2.288.715-2.288 1.25 0 .649.282.838 3.028 1.205 2.725.363 4.018.878 4.018 2.776 0 1.933-1.612 3.023-4.423 3.023z" />
                </svg>
                <span className="font-mono text-[9px] text-gray-400 group-hover:text-[#339933] transition-colors">Node.js</span>
              </div>
              {/* Python */}
              <div className="group flex flex-col items-center gap-1">
                <svg className="w-6 h-6 text-gray-700 group-hover:text-[#3776AB] transition-colors" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.986 7.647 4.986l.006 2.055h4.363v.617H5.92S3 7.28 3 11.873s2.554 4.423 2.554 4.423h1.524v-2.13s-.082-2.554 2.513-2.554l.994.08zm-.272-5.24a.823.823 0 0 1-.823-.823c0-.455.369-.824.823-.824a.824.824 0 0 1 0 1.647z" /><path d="M14.415 12.308H10.087s-2.432-.039-2.432 2.35v3.951S7.286 21 12.064 21c4.574 0 4.289-1.986 4.289-1.986l-.006-2.055h-4.363v-.617h6.096S21 16.72 21 12.127s-2.554-4.423-2.554-4.423h-1.524v2.13s.082 2.554-2.513 2.554l-.994-.08zm.272 5.24a.823.823 0 0 1 .823.823.824.824 0 0 1-.823.824.824.824 0 0 1 0-1.647z" />
                </svg>
                <span className="font-mono text-[9px] text-gray-400 group-hover:text-[#3776AB] transition-colors">Python</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {/* 'My Projects' pill button */}
              <button
                onClick={handleMyProjects}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black border border-black hover:bg-black hover:text-white transition-colors"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  borderRadius: '24px',
                  letterSpacing: '0.5px'
                }}
              >
                MY PROJECTS ↓
              </button>

              {/* 'HIRE ME' pill button */}
              <button
                onClick={handleHireMe}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#007AFF] transition-colors shadow-lg"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '12px',
                  borderRadius: '24px',
                  letterSpacing: '0.5px'
                }}
              >
                CONTACT ME →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
