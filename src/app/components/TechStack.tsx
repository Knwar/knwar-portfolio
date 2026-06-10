import { SectionHeader } from './SectionHeader';

// Icons in their official brand colors (simple-icons CDN defaults to brand color).
// Dark-brand glyphs (e.g. Express, black) get an explicit light override for the dark bg.
const stack = [
  { name: 'Flutter', src: 'https://cdn.simpleicons.org/flutter' },
  { name: 'Dart', src: 'https://cdn.simpleicons.org/dart' },
  { name: 'Swift', src: 'https://cdn.simpleicons.org/swift' },
  { name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs' },
  { name: 'Express', src: 'https://cdn.simpleicons.org/express/F2F2F2' },
  { name: 'MySQL', src: 'https://cdn.simpleicons.org/mysql' },
  { name: 'PostgreSQL', src: 'https://cdn.simpleicons.org/postgresql' },
  { name: 'MongoDB', src: 'https://cdn.simpleicons.org/mongodb' },
  { name: 'Firebase', src: 'https://cdn.simpleicons.org/firebase' },
  { name: 'Supabase', src: 'https://cdn.simpleicons.org/supabase' },
  { name: 'React', src: 'https://cdn.simpleicons.org/react' },
  { name: 'Vue', src: 'https://cdn.simpleicons.org/vuedotjs' },
  { name: 'AWS', src: 'https://api.iconify.design/mdi/aws.svg?color=%23FF9900' },
  { name: 'Google Cloud', src: 'https://cdn.simpleicons.org/googlecloud' },
];

export function TechStack() {
  return (
    <section id="tech-stack" className="py-8 md:py-12 bg-paper text-ink">
      <div className="container-page">
        <SectionHeader index="04" label="Stack" count={stack.length} />

        {/* Logo grid — 7 per row / 2 rows on desktop, borderless */}
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-y-10 gap-x-4">
          {stack.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center justify-center gap-3"
            >
              <img
                src={tech.src}
                alt=""
                aria-hidden
                width={64}
                height={64}
                loading="lazy"
                className="w-12 h-12 md:w-16 md:h-16 transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-mono font-bold text-[11px] tracking-wider uppercase text-ink-muted group-hover:text-ink transition-colors text-center">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
