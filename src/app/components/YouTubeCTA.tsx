import { Youtube } from 'lucide-react';

const CHANNEL_URL = 'https://youtube.com/@Knwar_dev?sub_confirmation=1';

interface YouTubeCTAProps {
  size?: 'sm' | 'md';
}

export function YouTubeCTA({ size = 'md' }: YouTubeCTAProps) {
  const sizing =
    size === 'sm'
      ? 'px-3 py-1.5 text-[11px]'
      : 'px-5 py-2.5 text-xs';

  return (
    <a
      href={CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-brand text-white font-mono tracking-wider hover:bg-ink hover:text-paper transition-colors ${sizing}`}
    >
      <Youtube size={size === 'sm' ? 13 : 14} />
      SUBSCRIBE
    </a>
  );
}
