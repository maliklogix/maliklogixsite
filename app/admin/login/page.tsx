'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    // 1. If already logged in, skip the login form.
    const cookie = document.cookie
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith('ml_admin='));
    
    if (cookie?.endsWith('1')) {
      window.location.href = '/admin';
      return;
    }


  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    await new Promise((r) => setTimeout(r, 500)); // small UX delay

    if (username === 'admin' && password === 'maliklogix@786555') {
      document.cookie = 'ml_admin=1; path=/; max-age=86400; SameSite=Lax';
      window.location.href = '/admin';
      return;
    }

    setLoading(false);
    setError('Invalid username or password.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F7FA] px-4">
      {/* Background glow */}
      <div
        className="pointer-events-none fixed inset-0 opacity-20"
        style={{
          background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(77,163,255,0.95) 0%, transparent 70%)',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 mb-4 shadow-sm overflow-hidden rounded-2xl bg-[#F0ECFF] border border-[#E4E4EB]">
            <Image
              src="/ml-logo.png?v=4"
              alt="MalikLogix"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
              unoptimized
            />
          </div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0D0D12]">MalikLogix Admin</h1>
          <p className="mt-1 text-sm text-[#6E6E82]">Sign in to manage your content & settings</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCDD] mb-1.5" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E82]" size={15} />
                <input
                  id="username"
                  name="username"
                  autoComplete="username"
                  defaultValue=""
                  required
                  className="w-full rounded-xl border border-[#E4E4EB] bg-white pl-9 pr-4 py-3 text-sm text-[#0D0D12] placeholder-[#9999AA] outline-none focus:border-[#5B3CF5] focus:ring-2 focus:ring-[#5B3CF5]/30 transition"
                  placeholder=""
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#CCCCDD] mb-1.5" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E82]" size={15} />
                <input
                  id="password"
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-[#E4E4EB] bg-white pl-9 pr-10 py-3 text-sm text-[#0D0D12] placeholder-[#9999AA] outline-none focus:border-[#5B3CF5] focus:ring-2 focus:ring-[#5B3CF5]/30 transition"
                  placeholder=""
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6E6E82] hover:text-[#0D0D12] transition"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-500">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#5B3CF5] py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
                  </svg>
                  Signing in…
                </>
              ) : (
                'Sign in →'
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#6E6E82]">
          MalikLogix © {new Date().getFullYear()} — Admin Portal
        </p>
      </div>
    </div>
  );
}
