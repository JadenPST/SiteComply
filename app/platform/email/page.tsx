'use client';

import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

type Step = 'email' | 'code';

/**
 * Platform Login — email method.
 *
 * Two-step verification-code flow mirroring the mobile login screen and the
 * worker check-in development mode: enter your email, request a code, then enter
 * the code to continue.
 *
 * DEVELOPMENT / TESTING ONLY — there is no backend, so no email is sent. Any
 * email is accepted, the development code is shown on screen (exactly like the
 * worker OTP dev flow), and entering it continues to the Platform dashboard.
 */
const DEV_CODE = '123456';

export default function PlatformEmailLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [devCode, setDevCode] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const codeInputRef = useRef<HTMLInputElement>(null);

  function sendCode(e: FormEvent) {
    e.preventDefault();
    // Dev mode: no email is sent — reveal the development code on screen.
    setError(undefined);
    setDevCode(DEV_CODE);
    setCode('');
    setStep('code');
    setTimeout(() => codeInputRef.current?.focus(), 50);
  }

  function continueWithCode(e: FormEvent) {
    e.preventDefault();
    if (code !== DEV_CODE) {
      setError('That code didn’t work. Please try again.');
      return;
    }
    router.push('/platform/dashboard');
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-sm space-y-6 py-8">
        {step === 'email' ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-ink">Login with Email</h1>
              <p className="text-ink-muted">
                Enter your email and we’ll send you a verification code.
              </p>
            </div>

            <form className="space-y-4" onSubmit={sendCode}>
              <TextField
                label="Email address"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@company.co.uk"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" size="lg" variant="brand" fullWidth>
                Send code
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-ink">Login with Email</h1>
              <p className="text-ink-muted">
                Enter the 6-digit code we sent to{' '}
                <span className="font-semibold text-ink">
                  {email || 'your email'}
                </span>
                .
              </p>
            </div>

            {devCode && (
              <p className="rounded-xl border border-hivis-500 bg-hivis-400/20 px-4 py-3 text-sm text-ink">
                <strong>Dev mode:</strong> your code is{' '}
                <span className="font-mono font-bold">{devCode}</span>.
              </p>
            )}

            <form className="space-y-4" onSubmit={continueWithCode}>
              <TextField
                ref={codeInputRef}
                label="Verification code"
                name="code"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="••••••"
                className="text-center text-3xl font-bold tracking-[0.5em]"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                error={error}
              />
              <Button
                type="submit"
                size="lg"
                variant="brand"
                fullWidth
                disabled={code.length !== 6}
              >
                Continue
              </Button>
            </form>

            <p className="text-center text-sm">
              <button
                type="button"
                onClick={() => {
                  setStep('email');
                  setError(undefined);
                  setCode('');
                }}
                className="font-semibold text-brand-700"
              >
                ← Use a different email
              </button>
            </p>
          </>
        )}

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
