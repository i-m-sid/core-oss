import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Turnstile } from "react-turnstile";
import { useAuthStore } from "../../../stores/authStore";
import { API_BASE } from "../../../lib/apiBase";

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || "";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M19.6 10.23c0-.68-.06-1.36-.17-2.02H10v3.82h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.89-1.74 2.98-4.3 2.98-7.32Z" fill="#4285F4" />
      <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H1.07v2.58A9.99 9.99 0 0 0 10 20Z" fill="#34A853" />
      <path d="M4.42 11.91A6.01 6.01 0 0 1 4.1 10c0-.66.11-1.3.32-1.91V5.51H1.07A9.99 9.99 0 0 0 0 10c0 1.61.39 3.14 1.07 4.49l3.35-2.58Z" fill="#FBBC05" />
      <path d="M10 3.98c1.47 0 2.78.5 3.82 1.5l2.86-2.86C14.96.99 12.7 0 10 0A9.99 9.99 0 0 0 1.07 5.51l3.35 2.58C5.2 5.74 7.4 3.98 10 3.98Z" fill="#EA4335" />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 21 21" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { signInWithGoogle, signInWithMicrosoft } = useAuthStore();
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const hasTurnstile = !!TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!isOpen) setTurnstileToken(null);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose]);

  const handleSignIn = useCallback(
    async (provider: "google" | "microsoft") => {
      if (hasTurnstile) {
        if (!turnstileToken) return;
        setVerifying(true);
        try {
          const res = await fetch(
            `${API_BASE.replace("/api", "")}/api/auth/verify-turnstile`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: turnstileToken }),
            }
          );
          if (!res.ok) {
            setTurnstileToken(null);
            return;
          }
        } catch {
          setTurnstileToken(null);
          return;
        } finally {
          setVerifying(false);
        }
      }
      if (provider === "google") signInWithGoogle();
      else signInWithMicrosoft();
    },
    [hasTurnstile, turnstileToken, signInWithGoogle, signInWithMicrosoft]
  );

  const buttonsDisabled = hasTurnstile && (!turnstileToken || verifying);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="relative bg-white rounded-lg p-8 shadow-2xl w-[384px] max-w-[calc(100%-2rem)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-text-tertiary hover:text-text-body transition-colors"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-xl font-semibold text-text-body mb-2">
              Sign in to Core
            </h2>
            <p className="text-text-tertiary text-sm mb-6">
              Choose your account to continue
            </p>

            <div className="space-y-3">
              <button
                onClick={() => handleSignIn("google")}
                disabled={buttonsDisabled}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 bg-text-body text-white rounded-xl text-base font-medium hover:bg-black/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <GoogleIcon />
                Continue with Google
              </button>
              <button
                onClick={() => handleSignIn("microsoft")}
                disabled={buttonsDisabled}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 border border-black/20 text-text-body rounded-xl text-base font-medium hover:bg-black/5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <MicrosoftIcon />
                Continue with Microsoft
              </button>
            </div>

            {hasTurnstile && (
              <div className="mt-4 flex justify-center">
                <Turnstile
                  sitekey={TURNSTILE_SITE_KEY}
                  onVerify={(token: string) => setTurnstileToken(token)}
                  onExpire={() => setTurnstileToken(null)}
                  theme="light"
                  size="flexible"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
