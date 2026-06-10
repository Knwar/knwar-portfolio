import { ReactNode } from 'react';

interface TagProps {
  children: ReactNode;
  variant?: 'video' | 'default';
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const base = 'inline-flex items-center px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase';
  const styles =
    variant === 'video'
      ? 'bg-brand text-white'
      : 'border border-ink text-ink bg-transparent';

  return <span className={`${base} ${styles}`}>{children}</span>;
}
