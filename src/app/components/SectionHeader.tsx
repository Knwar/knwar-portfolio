import { ReactNode } from 'react';

interface SectionHeaderProps {
  index: string;
  label: string;
  count?: number;
  action?: ReactNode;
}

export function SectionHeader({ index, label, count, action }: SectionHeaderProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="flex items-baseline justify-between border-t-2 border-ink pt-3 mb-3">
        <span className="font-mono text-[11px] tracking-[0.15em] text-ink-muted">
          {index}
          {count !== undefined && ` / (${String(count).padStart(2, '0')})`}
        </span>
        {action}
      </div>
      <h2 className="font-display text-[clamp(28px,4.5vw,56px)] leading-[0.95] uppercase tracking-tight text-ink">
        {label}
      </h2>
    </div>
  );
}
