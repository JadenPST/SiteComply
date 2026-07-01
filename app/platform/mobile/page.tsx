'use client';

import { FormEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';

type Step = 'mobile' | 'code';

/**
 * Platform Login — mobile method.
 *
 * Two-step verification-code flow, matching the email login screen and the
 * worker check-in development mode: enter your mobile, request a code, then
 * enter the code to continue.
 *
 * DEVELOPMENT / TESTING ONLY — there is no backend, so no SMS is sent. Use the
 * development number 07123456789; the development code is shown on screen
 * (exactly like the worker OTP dev flow) and entering it continues to the
 * Platform dashboard.
 */
const DEV_MOBILE = '07123456789';
const DEV_CODE = '123456';

export default function PlatformMobileLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [devCode, setDevCode] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();
  const codeInputRef = useRef<HTMLInputElement>(null);

  function sendCode(e: FormEvent) {
    e.preventDefault();
    // Dev mode: no SMS is sent — reveal the development code on screen.
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
        {step === 'mobile' ? (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-ink">Login with Mobile</h1>
              <p className="text-ink-muted">
                Enter your mobile number and we’ll text you a verification code.
              </p>
            </div>

            <form className="space-y-4" onSubmit={sendCode}>
              <TextField
                label="Mobile number"
                type="tel"
                name="mobile"
                autoComplete="tel"
                inputMode="tel"
                placeholder={DEV_MOBILE}
                hint={`Development number: ${DEV_MOBILE}`}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
              <Button type="submit" size="lg" variant="brand" fullWidth>
                Send code
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-bold text-ink">Login with Mobile</h1>
              <p className="text-ink-muted">
                Enter the 6-digit code we sent to{' '}
                <span className="font-semibold text-ink">
                  {mobile || 'your mobile'}
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
                  setStep('mobile');
                  setError(undefined);
                  setCode('');
                }}
                className="font-semibold text-brand-700"
              >
                ← Use a different number
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
