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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-[380px] rounded-2xl overflow-hidden font-geist"
            style={{
              background: "#111213",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 60px rgba(0,0,0,0.8), 0 0 80px rgba(99,102,241,0.08)",
            }}
          >
            {/* Subtle top glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
              style={{ background: "linear-gradient(to right, transparent, rgba(99,102,241,0.6), transparent)" }}
            />

            <div className="px-8 pt-8 pb-7">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg cursor-pointer transition-colors"
                style={{ color: "#505056" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#a0a0a6"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#505056"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* Logo + title */}
              <div className="flex flex-col items-center text-center mb-7">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 p-2.5"
                  style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                  <img src="/cube-logo-white.svg" alt="Cube" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-[19px] font-semibold tracking-tight" style={{ color: "#e8e8ea" }}>
                  Sign in to Cube
                </h2>
                <p className="mt-1.5 text-[13px]" style={{ color: "#606066" }}>
                  Choose your account to continue
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => handleSignIn("google")}
                  disabled={buttonsDisabled}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-[14px] font-medium cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e8e8ea",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <button
                  onClick={() => handleSignIn("microsoft")}
                  disabled={buttonsDisabled}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-[14px] font-medium cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#e8e8ea",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.10)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                >
                  <MicrosoftIcon />
                  Continue with Microsoft
                </button>
              </div>

              {hasTurnstile && (
                <div className="mt-5 flex justify-center">
                  <Turnstile
                    sitekey={TURNSTILE_SITE_KEY}
                    onVerify={(token: string) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    theme="dark"
                    size="flexible"
                  />
                </div>
              )}

              <p className="mt-6 text-center text-[11.5px]" style={{ color: "#404046" }}>
                By continuing, you agree to Cube's{" "}
                <span className="underline underline-offset-2 cursor-pointer" style={{ color: "#606066" }}>Terms</span>
                {" "}and{" "}
                <span className="underline underline-offset-2 cursor-pointer" style={{ color: "#606066" }}>Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
