import { SectionHeader } from './SectionHeader';

export function About() {
  return (
    <section id="about" className="py-8 md:py-12 bg-paper text-ink">
      <div className="container-page">
        <SectionHeader index="03" label="Who" />

        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          {/* Portrait + quick specs */}
          <div className="md:col-span-4">
            <img
              src="/about-portrait.jpg"
              alt="Knwar — Mobile Developer"
              className="w-full border border-hairline object-cover grayscale hover:grayscale-0 transition-all duration-500"
              style={{ aspectRatio: '4 / 5' }}
            />
            <div className="mt-5 font-mono text-[11px] tracking-[0.15em] uppercase">
              <div className="border-t border-hairline py-2.5 flex justify-between">
                <span className="text-ink-faint">Experience</span>
                <span>12+ years</span>
              </div>
              <div className="border-t border-hairline py-2.5 flex justify-between">
                <span className="text-ink-faint">Base</span>
                <span>Punjab, IN</span>
              </div>
              <div className="border-t border-hairline py-2.5 flex justify-between">
                <span className="text-ink-faint">Focus</span>
                <span>Flutter &amp; AI</span>
              </div>
              <div className="border-t border-b border-hairline py-2.5 flex justify-between">
                <span className="text-ink-faint">Status</span>
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-brand" />
                  Open for work
                </span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-7 md:col-start-6">
            <p className="font-sans text-xl md:text-2xl leading-relaxed text-ink mb-6">
              Twelve years in the trenches of mobile development. Flutter is my
              weapon of choice — one codebase, two platforms,{' '}
              <span className="text-ink-muted">zero compromise on speed or design.</span>
            </p>
            <div className="space-y-4 font-sans text-base leading-relaxed text-ink-muted">
              <p>
                I started the way most engineers of my generation did — shipping
                native apps, fighting two codebases, and rebuilding the same
                feature twice. When Flutter arrived, it clicked: write it once,
                make it feel native everywhere, and spend the saved time on the
                details users actually notice. Since then I've taken products
                from blank repo to app-store release across fintech, tools and
                consumer apps — backed by Node.js, Firebase and whatever the
                problem genuinely calls for.
              </p>
              <p>
                The projects here are the work I'm proudest of. Some are live and
                in users' hands; others are passion projects I'm constantly
                tweaking, breaking and evolving. Every case study is honest about
                what went wrong before it went right — because that's the part
                tutorials never show you.
              </p>
              <p>
                On the blog and the channel I cut through the noise: what actually
                works in real-world apps, what flops hard, and the vital details
                most guides skip. Zero fluff — just me walking you through exactly
                how I build things, including the dead ends.
              </p>
              <p>
                Lately, that means going deep on AI — wiring LLMs into mobile
                workflows, testing what's hype and what ships, and documenting all
                of it in public. If you build software, you'll feel at home here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
