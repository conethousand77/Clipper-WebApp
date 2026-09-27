import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  User as UserIcon, 
  ShieldCheck, 
  Loader2, 
  Video, 
  CheckCircle2,
  Lock
} from 'lucide-react';
import { loginWithGoogle, loginAsGuest } from '../lib/firebase';
import { AppUser } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: AppUser) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const user = await loginWithGoogle();
      onLoginSuccess({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous
      });
      onClose();
    } catch (err: any) {
      console.warn('Google sign-in error:', err);
      // If popup blocked or failed, give helpful option to sign in as guest
      setErrorMessage('Login Google dibatalkan atau popup diblokir browser. Anda bisa gunakan "Masuk Instan Tamu Clipper" tanpa login.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const user = await loginAsGuest();
      onLoginSuccess({
        uid: user.uid,
        email: null,
        displayName: 'Guest Clipper',
        photoURL: null,
        isAnonymous: true
      });
      onClose();
    } catch (err: any) {
      console.warn('Guest sign-in error:', err);
      // Fallback local dummy user
      onLoginSuccess({
        uid: 'guest-' + Date.now(),
        email: null,
        displayName: 'Tamu Clipper (Lokal)',
        photoURL: null,
        isAnonymous: true
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo & Intro */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-amber-500 mx-auto flex items-center justify-center shadow-lg shadow-rose-950/40">
            <Video className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-black text-white">
            Masuk ke Clip Studio
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Simpan daftar project video podcast dan template editing Anda di cloud database Firestore.
          </p>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs">
            {errorMessage}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            disabled={isLoading}
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm shadow-md transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-slate-900" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            )}
            <span>Lanjutkan dengan Akun Google</span>
          </button>

          <button
            type="button"
            disabled={isLoading}
            onClick={handleGuestSignIn}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition-all disabled:opacity-50 cursor-pointer"
          >
            <UserIcon className="w-4 h-4 text-amber-400" />
            <span>Masuk Instan (Tamu Clipper / 1-Klik)</span>
          </button>
        </div>

        {/* Benefits badge */}
        <div className="pt-2 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Riwayat project tersimpan di Firebase Firestore</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Status render realtime di background cloud</span>
          </div>
        </div>

      </div>
    </div>
  );
};
