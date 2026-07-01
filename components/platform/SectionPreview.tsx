import { PlatformShell } from './PlatformShell';
import { PreviewBanner } from './PreviewBanner';
import { PlatformIcon, type PlatformIconName } from './icons';

/**
 * Shared placeholder for the Platform sections that are navigation-only for now.
 * Renders inside the PlatformShell so the sidebar/nav stay consistent, with a
 * clear "coming soon" empty state. No data or backend.
 */
export function SectionPreview({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: PlatformIconName;
}) {
  return (
    <PlatformShell>
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <p className="text-ink-muted">{description}</p>
        </div>
        <span className="rounded-md bg-hivis-400/20 px-2 py-0.5 text-xs font-semibold text-hivis-600">
          Preview
        </span>
      </header>

      <PreviewBanner />

      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line bg-surface px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <PlatformIcon name={icon} className="h-6 w-6" />
        </span>
        <h2 className="text-lg font-semibold text-ink">
          {title} — preview content
        </h2>
        <p className="max-w-sm text-sm text-ink-muted">
          This section is a placeholder for layout and navigation testing. The
          full {title.toLowerCase()} experience is coming in a later stage.
        </p>
      </div>
    </PlatformShell>
  );
}
