export function About() {
  return (
    <section id="about" className="py-12 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-[1440px] mx-auto">

        {/* Mobile: Background image layout */}
        <div
          className="block md:hidden relative overflow-hidden rounded-sm"
          style={{
            backgroundImage: 'url(/about-portrait.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            minHeight: '500px',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.8)',
            }}
          />
          <div className="relative z-10 p-4">
            <h2
              className="font-bold mb-8"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(24px, 4vw, 32px)',
              }}
            >
              ABOUT
            </h2>
            <div className="space-y-6">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#111111',
                }}
              >
                I've been a software engineer for over 12 years, and for most of that time, I've been deep in the trenches of mobile app development. Flutter has become my absolute go-to. There's something genuinely satisfying about writing code once and shipping smooth, native-feeling experiences to both iOS and Android—without compromising an ounce of speed or design.
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#111111',
                }}
              >
                The projects you'll find here represent the work I'm most proud of. Some are live applications already in users' hands, while others are passion projects I'm constantly tweaking, breaking, and evolving.
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#111111',
                }}
              >
                On my blog, I try to cut through the noise. I write about the stuff that actually matters: what works in real-world apps, what flops hard, and those vital little details that most tutorials completely ignore. My videos carry the exact same vibe—zero fluff, just me walking you through exactly how I build things.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop: Original side-by-side layout */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 md:gap-20">
          {/* Left Column - Text */}
          <div className="md:col-span-7">
            <h2
              className="font-bold mb-12"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 'clamp(24px, 4vw, 32px)',
              }}
            >
              ABOUT
            </h2>
            <div className="space-y-6 mb-12">
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#000000',
                }}
              >
                I've been a software engineer for over 12 years, and for most of that time, I've been deep in the trenches of mobile app development. Flutter has become my absolute go-to. There's something genuinely satisfying about writing code once and shipping smooth, native-feeling experiences to both iOS and Android—without compromising an ounce of speed or design.
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#000000',
                }}
              >
                The projects you'll find here represent the work I'm most proud of. Some are live applications already in users' hands, while others are passion projects I'm constantly tweaking, breaking, and evolving.
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(16px, 2vw, 18px)',
                  lineHeight: '1.8',
                  color: '#000000',
                }}
              >
                On my blog, I try to cut through the noise. I write about the stuff that actually matters: what works in real-world apps, what flops hard, and those vital little details that most tutorials completely ignore. My videos carry the exact same vibe—zero fluff, just me walking you through exactly how I build things.
              </p>
            </div>
          </div>

          {/* Right Column - Portrait Image */}
          <div className="md:col-span-4 md:col-start-9">
            <img
              src="/about-portrait.jpg"
              alt="Knwar — Mobile Developer"
              className="w-full border border-black object-cover"
              style={{
                aspectRatio: '4 / 5',
                borderWidth: '1px',
                borderRadius: '0px',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
