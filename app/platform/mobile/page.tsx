import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

/**
 * Platform Login — mobile method. UI-only scaffold: the form lays out the field
 * but is not yet wired to any backend (no SMS, authentication or sessions).
 */
export default function PlatformMobileLoginPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-sm space-y-6 py-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-ink">Login with Mobile</h1>
          <p className="text-ink-muted">
            Enter your mobile number and we’ll text you a one-time code.
          </p>
        </div>

        <form className="space-y-4">
          <TextField
            label="Mobile number"
            type="tel"
            name="mobile"
            autoComplete="tel"
            inputMode="tel"
            placeholder="07700 900000"
            hint="UK mobile number."
          />
          <Button size="lg" variant="brand" fullWidth>
            Send code
          </Button>
        </form>

        <p className="rounded-xl border border-line bg-surface px-4 py-3 text-center text-xs text-ink-subtle">
          Platform accounts aren’t active yet — this is a preview of the sign-in
          screen.
        </p>

        <p className="text-center text-xs text-ink-subtle">
          <Link href="/platform" className="font-semibold text-brand-700">
            ← Other sign-in options
          </Link>
        </p>
      </div>
    </AppShell>
  );
}
