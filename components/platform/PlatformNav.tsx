'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/cn';
import { PlatformIcon, type PlatformIconName } from './icons';

/**
 * Left-hand navigation for the Platform dashboard. Vertical on desktop; collapses
 * to a horizontal scroller on small screens. Destinations are preview scaffolds.
 */
export const PLATFORM_NAV: {
  href: string;
  label: string;
  icon: PlatformIconName;
}[] = [
  { href: '/platform/dashboard', label: 'Dashboard', icon: 'grid' },
  { href: '/platform/dashboard/sites', label: 'Sites', icon: 'pin' },
  { href: '/platform/dashboard/submissions', label: 'Submissions', icon: 'clipboard' },
  { href: '/platform/dashboard/reports', label: 'Reports', icon: 'chart' },
  { href: '/platform/dashboard/documents', label: 'Documents', icon: 'doc' },
  { href: '/platform/dashboard/audits', label: 'Audits', icon: 'shield' },
  { href: '/platform/dashboard/actions', label: 'Actions', icon: 'bolt' },
];

export function PlatformNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Platform sections"
      className="flex gap-1 overflow-x-auto md:flex-col md:overflow-visible"
    >
      {PLATFORM_NAV.map((item) => {
        const active =
          item.href === '/platform/dashboard'
            ? pathname === '/platform/dashboard'
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 whitespace-nowrap rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-brand-500 text-white shadow-sm shadow-brand-600/20'
                : 'text-ink-muted hover:bg-brand-50 hover:text-brand-700',
            )}
          >
            <PlatformIcon name={item.icon} className="h-5 w-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
