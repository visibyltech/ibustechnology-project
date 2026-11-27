import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { ArrowLeft, Mail, Lock, UserRound, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { auth } from '../lib/firebase';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setNotice('');
    setBusy(true);

    try {
      if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
        setNotice('Your account has been created. You can now sign in and shop with iBUS.');
      } else if (mode === 'reset') {
        await sendPasswordResetEmail(auth, email.trim());
        setNotice('If an account exists for this email, a password reset link has been sent.');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        onClose();
      }
    } catch (err) {
      const code = (err as { code?: string })?.code || '';
      const messages: Record<string, string> = {
        'auth/invalid-email': 'Enter a valid email address.',
        'auth/user-disabled': 'This account has been disabled. Contact iBUS support.',
        'auth/user-not-found': 'No account was found with that email address.',
        'auth/wrong-password': 'The password is incorrect.',
        'auth/invalid-credential': 'The email or password is incorrect.',
        'auth/email-already-in-use': 'An account already exists with this email.',
        'auth/weak-password': 'Use a password with at least 6 characters.',
        'auth/too-many-requests': 'Too many attempts. Please wait and try again.',
        'auth/operation-not-allowed': 'Email and password sign-in has not been enabled in Firebase yet.'
      };
      setError(messages[code] || 'We could not complete this request. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const heading = mode === 'signin' ? 'Welcome back' : mode === 'signup' ? 'Create your account' : 'Reset your password';
  const description = mode === 'signin'
    ? 'Sign in to manage your iBUS orders and savings.'
    : mode === 'signup'
      ? 'Create an account to shop, track orders and manage Save to Buy.'
      : 'Enter your email address and we will send you a password reset link.';

  return (
    <div className="fixed inset-0 z-[100] min-h-[100dvh] overflow-y-auto bg-[#0b0e14] text-slate-100">
      <div className="min-h-[100dvh] flex flex-col">
        <header className="w-full border-b border-[#252c39] bg-[#10141d] px-4 py-4 sm:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-base font-black tracking-tight text-white">iBUS <span className="text-amber-400">Technology</span></p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Your Connection to Quality</p>
              </div>
            </div>
            <button type="button" onClick={onClose} className="inline-flex items-center gap-2 rounded-lg border border-[#343d4d] px-3 py-2 text-xs font-semibold text-slate-300 hover:border-amber-400 hover:text-amber-300">
              <ArrowLeft className="h-4 w-4" /> Back to store
            </button>
          </div>
        </header>

        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#2b3342] bg-[#121722] shadow-2xl lg:grid-cols-2">
            <section className="hidden flex-col justify-between bg-gradient-to-br from-[#1d2430] via-[#171d28] to-[#11151e] p-10 lg:flex">
              <div>
                <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-300">Official iBUS customer account</span>
                <h1 className="mt-8 text-4xl font-black leading-tight text-white">Shop with confidence. Keep everything in one place.</h1>
                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">Access your orders, save products, follow your Save to Buy progress and stay connected with iBUS Technology.</p>
              </div>
              <div className="mt-12 space-y-3 text-sm text-slate-300">
                <p className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-amber-400" /> Secure account access</p>
                <p className="flex items-center gap-3"><Mail className="h-5 w-5 text-amber-400" /> Order and account updates</p>
                <p className="flex items-center gap-3"><Lock className="h-5 w-5 text-amber-400" /> Your account is protected</p>
              </div>
            </section>

            <section className="flex items-center justify-center p-6 sm:p-10">
              <div className="w-full max-w-md">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-400">Customer access</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white">{heading}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {mode === 'signup' && (
                    <label className="block text-sm font-medium text-slate-300">
                      Full name
                      <span className="mt-2 flex items-center gap-3 rounded-xl border border-[#343d4d] bg-[#0d121b] px-4 focus-within:border-amber-400">
                        <UserRound className="h-5 w-5 shrink-0 text-slate-500" />
                        <input required value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600" placeholder="Your full name" autoComplete="name" />
                      </span>
                    </label>
                  )}
                  <label className="block text-sm font-medium text-slate-300">
                    Email address
                    <span className="mt-2 flex items-center gap-3 rounded-xl border border-[#343d4d] bg-[#0d121b] px-4 focus-within:border-amber-400">
                      <Mail className="h-5 w-5 shrink-0 text-slate-500" />
                      <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600" placeholder="you@example.com" autoComplete="email" />
                    </span>
                  </label>
                  {mode !== 'reset' && (
                    <label className="block text-sm font-medium text-slate-300">
                      Password
                      <span className="mt-2 flex items-center gap-3 rounded-xl border border-[#343d4d] bg-[#0d121b] px-4 focus-within:border-amber-400">
                        <Lock className="h-5 w-5 shrink-0 text-slate-500" />
                        <input required minLength={6} type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full min-w-0 bg-transparent py-4 text-sm text-white outline-none placeholder:text-slate-600" placeholder="At least 6 characters" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} />
                        <button
                          type="button"
                          onClick={() => setShowPassword((visible) => !visible)}
                          className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-[#202938] hover:text-amber-300"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                          aria-pressed={showPassword}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </span>
                    </label>
                  )}

                  {mode === 'signin' && (
                    <div className="flex justify-end">
                      <button type="button" onClick={() => { setMode('reset'); setError(''); setNotice(''); setShowPassword(false); }} className="text-xs font-semibold text-amber-400 hover:text-amber-300">Forgot password?</button>
                    </div>
                  )}
                  {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
                  {notice && <p role="status" className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-300">{notice}</p>}
                  <button disabled={busy} className="w-full rounded-xl bg-amber-400 px-5 py-4 text-sm font-extrabold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">
                    {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in to your account' : mode === 'signup' ? 'Create account' : 'Send reset link'}
                  </button>
                </form>

                <div className="mt-7 border-t border-[#2b3342] pt-6 text-center text-sm text-slate-400">
                  {mode === 'signin' ? (
                    <>Don't have an account? <button type="button" onClick={() => { setMode('signup'); setError(''); setNotice(''); setShowPassword(false); }} className="font-bold text-amber-400 hover:text-amber-300">Create account</button></>
                  ) : mode === 'signup' ? (
                    <>Already have an account? <button type="button" onClick={() => { setMode('signin'); setError(''); setNotice(''); setShowPassword(false); }} className="font-bold text-amber-400 hover:text-amber-300">Sign in</button></>
                  ) : (
                    <button type="button" onClick={() => { setMode('signin'); setError(''); setNotice(''); setShowPassword(false); }} className="font-bold text-amber-400 hover:text-amber-300">Back to sign in</button>
                  )}
                </div>
              </div>
            </section>
          </div>
        </main>

        <footer className="px-4 pb-6 text-center text-[11px] text-slate-600">© {new Date().getFullYear()} iBUS Technology. Secure customer access.</footer>
      </div>
    </div>
  );
};
