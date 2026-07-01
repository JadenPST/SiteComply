import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';

/**
 * Platform Login — entry point for the SiteComply platform account journey.
 *
 * Presents the two sign-in methods (email or mobile). UI only for this stage:
 * the screens below scaffold the navigation flow and forms; authentication,
 * accounts, dashboards and permissions are implemented later.
 */
export default function PlatformLoginPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-sm space-y-6 py-8 text-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-ink">Platform Login</h1>
          <p className="text-ink-muted">
            Sign in to your SiteComply platform account. Choose how you’d like to
            continue.
          </p>
        </div>

        <div className="grid gap-3">
          <Link href="/platform/email" className="block">
            <Button size="lg" variant="secondary" fullWidth>
              Login with Email
            </Button>
          </Link>
          <Link href="/platform/mobile" className="block">
            <Button size="lg" variant="secondary" fullWidth>
              Login with Mobile
            </Button>
          </Link>
        </div>

        <p className="text-xs text-ink-subtle">
          <Link href="/" className="font-semibold text-brand-700">
            ← Back to home
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
