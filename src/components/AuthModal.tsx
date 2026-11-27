import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { X, Mail, Lock, UserRound } from 'lucide-react';
import { auth } from '../lib/firebase';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        await sendEmailVerification(credential.user);
        setNotice('Your account has been created. Please check your email for a verification link.');
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
      setError(messages[code] || 'We could not complete sign-in. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <section className="relative w-full max-w-md rounded-2xl border border-[#30384a] bg-[#11141c] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <button type="button" onClick={onClose} className="absolute right-4 top-4 p-2 text-slate-400 hover:text-white" aria-label="Close sign in">
          <X className="h-5 w-5" />
        </button>
        <p className="text-xs font-bold uppercase tracking-widest text-amber-400">iBUS Technology</p>
        <h2 className="mt-2 text-2xl font-black text-white">{mode === 'signin' ? 'Welcome back' : 'Create your account'}</h2>
        <p className="mt-1 text-sm text-slate-400">{mode === 'signin' ? 'Sign in to access your customer account.' : 'Register to manage your orders and account.'}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <label className="block text-xs text-slate-300">
              Full name
              <span className="mt-1 flex items-center gap-2 rounded-lg border border-[#30384a] bg-[#171c27] px-3">
                <UserRound className="h-4 w-4 text-slate-500" />
                <input required value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent py-3 text-sm text-white outline-none" placeholder="Your full name" autoComplete="name" />
              </span>
            </label>
          )}
          <label className="block text-xs text-slate-300">
            Email address
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-[#30384a] bg-[#171c27] px-3">
              <Mail className="h-4 w-4 text-slate-500" />
              <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent py-3 text-sm text-white outline-none" placeholder="you@example.com" autoComplete="email" />
            </span>
          </label>
          <label className="block text-xs text-slate-300">
            Password
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-[#30384a] bg-[#171c27] px-3">
              <Lock className="h-4 w-4 text-slate-500" />
              <input required minLength={6} type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent py-3 text-sm text-white outline-none" placeholder="At least 6 characters" autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} />
            </span>
          </label>
          {error && <p role="alert" className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">{error}</p>}
          {notice && <p role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">{notice}</p>}
          <button disabled={busy} className="w-full rounded-lg bg-amber-400 px-4 py-3 text-sm font-extrabold text-black transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">
            {busy ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-slate-400">
          {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button type="button" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setNotice(''); }} className="font-bold text-amber-400 hover:text-amber-300">
            {mode === 'signin' ? 'Create one' : 'Sign in'}
          </button>
        </p>
      </section>
    </div>
  );
};
