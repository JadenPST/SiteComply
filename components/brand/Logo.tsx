import Image from 'next/image';
import { cn } from '@/lib/cn';

/**
 * SiteComply logo. Renders the supplied brand artwork
 * (public/sitecomply-logo.png — the full "sitecomply" wordmark + tick). Only the
 * image is swapped in here; the component's API, wrapper markup and the sizes it
 * was used at are left unchanged.
 */
const LOGO_RATIO = 848 / 382; // intrinsic aspect ratio of the artwork

export function Logo({
  className,
  showWordmark = true,
  markSize = 36,
}: {
  className?: string;
  showWordmark?: boolean;
  markSize?: number;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark size={markSize} />
    </span>
  );
}

export function LogoMark({ size = 36 }: { size?: number }) {
  // The supplied logo already includes the wordmark, so it stands alone.
  return (
    <Image
      src="/sitecomply-logo.png"
      alt="SiteComply"
      width={Math.round(size * LOGO_RATIO)}
      height={size}
      priority
      unoptimized
    />
  );
}
