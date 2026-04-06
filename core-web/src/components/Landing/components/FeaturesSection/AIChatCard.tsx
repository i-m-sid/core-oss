import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  AI_CHAT_STEPS,
  AI_CHAT_ACTIONS,
  type AIChatActionKey,
  type AIChatAction,
} from "../../constants/featuresData";

// ── Color maps ────────────────────────────────────────────────────────────

const ICON_BG: Record<string, string> = {
  indigo:  "rgba(99,102,241,0.12)",
  violet:  "rgba(139,92,246,0.12)",
  emerald: "rgba(34,197,94,0.12)",
  amber:   "rgba(245,158,11,0.12)",
  cyan:    "rgba(34,211,238,0.12)",
};

const ICON_COLOR: Record<string, string> = {
  indigo:  "#818cf8",
  violet:  "#a78bfa",
  emerald: "#4ade80",
  amber:   "#fbbf24",
  cyan:    "#22d3ee",
};

const BORDER_ACTIVE: Record<string, string> = {
  indigo:  "rgba(99,102,241,0.25)",
  violet:  "rgba(139,92,246,0.25)",
  emerald: "rgba(34,197,94,0.25)",
  amber:   "rgba(245,158,11,0.25)",
  cyan:    "rgba(34,211,238,0.25)",
};

const SHADOW_ACTIVE: Record<string, string> = {
  indigo:  "0 0 0 1px rgba(99,102,241,0.15), 0 8px 24px rgba(99,102,241,0.10)",
  violet:  "0 0 0 1px rgba(139,92,246,0.15), 0 8px 24px rgba(139,92,246,0.10)",
  emerald: "0 0 0 1px rgba(34,197,94,0.15),  0 8px 24px rgba(34,197,94,0.10)",
  amber:   "0 0 0 1px rgba(245,158,11,0.15), 0 8px 24px rgba(245,158,11,0.10)",
  cyan:    "0 0 0 1px rgba(34,211,238,0.15), 0 8px 24px rgba(34,211,238,0.10)",
};

// ── Icons per action key ──────────────────────────────────────────────────

function ActionIcon({ actionKey, color }: { actionKey: AIChatActionKey; color: string }) {
  const stroke = ICON_COLOR[color];
  switch (actionKey) {
    case "Summarise":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      );
    case "Draft reply":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      );
    case "Move to Done":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      );
    case "Block time":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
        </svg>
      );
    case "Find doc":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>
      );
  }
}

// ── Action card sub-component ─────────────────────────────────────────────

type ActionCardProps = {
  action: AIChatAction;
  isActive: boolean;
  isDone: boolean;
};

function ActionCard({ action, isActive, isDone }: ActionCardProps) {
  return (
    <div
      className="rounded-xl border p-4 transition-all duration-500"
      style={{
        background: isActive ? "#18191c" : "#141517",
        borderColor: isActive ? BORDER_ACTIVE[action.color] : "rgba(255,255,255,0.05)",
        boxShadow: isActive ? SHADOW_ACTIVE[action.color] : "none",
        opacity: isActive ? 1 : 0.3,
        transform: isActive ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
      }}
    >
      {/* Card header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
          style={{ background: ICON_BG[action.color] }}
        >
          <ActionIcon actionKey={action.key} color={action.color} />
        </div>
        <span className="text-[12px] font-medium text-[#c8c8cc]">{action.key}</span>
      </div>

      {/* Done badge */}
      <div
        className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 transition-all duration-300"
        style={{
          background: isDone ? ICON_BG[action.color] : "rgba(255,255,255,0.04)",
          color: isDone ? ICON_COLOR[action.color] : "#3a3a40",
        }}
      >
        {isDone && (
          <svg width="8" height="8" viewBox="0 0 16 16" fill="none">
            <polyline points="3 8 6.5 11.5 13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
        {isDone ? action.doneLabel : "Waiting"}
      </div>

      {/* Footer */}
      <div className="mt-4 flex justify-between font-mono text-[10px]" style={{ color: "#404048" }}>
        <span>{action.footerLeft}</span>
        <span style={{ color: isDone ? ICON_COLOR[action.color] : "#404048" }}>{action.footerRight}</span>
      </div>
    </div>
  );
}

// ── Types ─────────────────────────────────────────────────────────────────

type Phase = "typing" | "sending" | "result";

// ── Component ─────────────────────────────────────────────────────────────

export default function AIChatCard() {
  const [stepIndex, setStepIndex]     = useState(0);
  const [phase, setPhase]             = useState<Phase>("typing");
  const [typedPrompt, setTypedPrompt] = useState("");

  const step = AI_CHAT_STEPS[stepIndex];

  // Typing animation
  useEffect(() => {
    if (phase !== "typing") return;
    let chars = 0;
    const timer = setInterval(() => {
      if (chars <= step.prompt.length) {
        setTypedPrompt(step.prompt.slice(0, chars));
        chars += 1;
      } else {
        clearInterval(timer);
        setTimeout(() => setPhase("sending"), 350);
      }
    }, 22);
    return () => clearInterval(timer);
  }, [phase, step.prompt]);

  // Phase transitions
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (phase === "sending") {
      t = setTimeout(() => setPhase("result"), 600);
    } else if (phase === "result") {
      t = setTimeout(() => {
        setStepIndex(i => (i + 1) % AI_CHAT_STEPS.length);
        setTypedPrompt("");
        setPhase("typing");
      }, 2200);
    }
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <motion.div
      className="col-span-1 md:col-span-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-5 md:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
          <img src="/cube-logo-white.svg" alt="Cube AI" className="w-4 h-4 object-contain opacity-80" />
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Ask Cube AI anything</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Cube understands your inbox, calendar, and projects. Type a prompt and it acts — no copy-pasting, no switching tabs.
          </p>
        </div>
      </div>

      {/* ── Mobile layout ── */}
      <div className="md:hidden mt-6 mb-2">

        {/* Cards + absolutely centered prompt box */}
        <div className="relative">

          {/* Cards — 2-col grid in background */}
          <div className="grid grid-cols-2 gap-2.5">
          {AI_CHAT_ACTIONS.map((action) => {
            const isActive = action.key === step.activeCard && phase !== "typing";
            const isDone   = action.key === step.activeCard && phase === "result";
            return (
              <div
                key={action.key}
                className="rounded-xl border p-3.5 transition-all duration-500"
                style={{
                  background: isActive ? "#18191c" : "#141517",
                  borderColor: isActive ? BORDER_ACTIVE[action.color] : "rgba(255,255,255,0.05)",
                  boxShadow: isActive ? SHADOW_ACTIVE[action.color] : "none",
                  opacity: isActive ? 1 : 0.28,
                  transform: isActive ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0" style={{ background: ICON_BG[action.color] }}>
                    <ActionIcon actionKey={action.key} color={action.color} />
                  </div>
                  <span className="text-[11px] font-medium text-[#c8c8cc]">{action.key}</span>
                </div>
                <div
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 transition-all duration-300"
                  style={{
                    background: isDone ? ICON_BG[action.color] : "rgba(255,255,255,0.04)",
                    color: isDone ? ICON_COLOR[action.color] : "#3a3a40",
                  }}
                >
                  {isDone && <svg width="7" height="7" viewBox="0 0 16 16" fill="none"><polyline points="3 8 6.5 11.5 13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>}
                  {isDone ? action.doneLabel : "Waiting"}
                </div>
                <div className="mt-3 flex justify-between font-mono text-[10px]" style={{ color: "#404048" }}>
                  <span>{action.footerLeft}</span>
                  <span style={{ color: isDone ? ICON_COLOR[action.color] : "#404048" }}>{action.footerRight}</span>
                </div>
              </div>
            );
          })}
          </div>

          {/* Prompt box — absolutely centered over the card grid */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="pointer-events-auto w-[220px] rounded-2xl border border-white/[0.10] bg-[#1a1b1e]/95 backdrop-blur-xl"
              style={{
                boxShadow: phase === "result" ? "0 16px 48px rgba(0,0,0,0.65)" : "0 6px 24px rgba(0,0,0,0.5)",
                transition: "box-shadow 400ms",
              }}
            >
              <div className="flex items-center gap-2 px-3 pt-3 pb-2 border-b border-white/[0.05]">
                <img src="/cube-logo-white.svg" alt="Cube" className="w-2.5 h-2.5 opacity-50" />
                <span className="text-[10.5px] font-medium text-[#505058]">Cube AI</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="relative p-3 pb-10 min-h-[68px]">
                <p className="text-[12px] leading-relaxed text-[#e0e0e4] font-medium whitespace-pre-wrap">
                  {typedPrompt}
                  {phase === "typing" && (
                    <span className="ml-0.5 inline-block h-[15px] w-[1.5px] animate-pulse bg-indigo-400 align-text-bottom rounded-full" />
                  )}
                </p>
                <div className="absolute right-3 bottom-3">
                  <div
                    className="w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: typedPrompt ? "#fff" : "rgba(255,255,255,0.06)",
                      transform: phase === "sending" ? "scale(0.88)" : "scale(1)",
                    }}
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={typedPrompt ? "#000" : "#505058"} strokeWidth="2.5" strokeLinecap="round">
                      <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:flex items-center justify-center py-24 px-4">
        <div className="relative w-full max-w-[820px]">

          {/* Card grid: 3 top */}
          <div className="grid grid-cols-3 gap-5 mb-6">
            {AI_CHAT_ACTIONS.slice(0, 3).map((action) => {
              const isActive = action.key === step.activeCard && phase !== "typing";
              const isDone   = action.key === step.activeCard && phase === "result";
              return (
                <ActionCard
                  key={action.key}
                  action={action}
                  isActive={isActive}
                  isDone={isDone}
                />
              );
            })}
          </div>

          {/* Bottom row: 2 cards flanking the prompt */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-5 items-center">
            {(() => {
              const action   = AI_CHAT_ACTIONS[3];
              const isActive = action.key === step.activeCard && phase !== "typing";
              const isDone   = action.key === step.activeCard && phase === "result";
              return <ActionCard key={action.key} action={action} isActive={isActive} isDone={isDone} />;
            })()}

            {/* Prompt box */}
            <div
              className="z-40 w-[320px] rounded-2xl border border-white/[0.08] bg-[#1a1b1e]/90 backdrop-blur-xl"
              style={{
                boxShadow: phase === "result"
                  ? "0 16px 48px rgba(0,0,0,0.6)"
                  : "0 4px 16px rgba(0,0,0,0.4)",
                transition: "box-shadow 400ms",
              }}
            >
              <div className="flex items-center gap-2 px-4 pt-3 pb-2 border-b border-white/[0.05]">
                <img src="/cube-logo-white.svg" alt="Cube" className="w-3 h-3 opacity-50" />
                <span className="text-[11px] font-medium text-[#505058]">Cube AI</span>
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
              <div className="relative min-h-[100px] p-4 pb-12">
                <p className="text-[14px] leading-relaxed text-[#e0e0e4] font-medium whitespace-pre-wrap">
                  {typedPrompt}
                  {phase === "typing" && (
                    <span className="ml-0.5 inline-block h-[18px] w-[2px] animate-pulse bg-indigo-400 align-text-bottom rounded-full" />
                  )}
                </p>
                <div className="absolute right-3 bottom-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{
                      background: typedPrompt ? "#fff" : "rgba(255,255,255,0.06)",
                      transform: phase === "sending" ? "scale(0.88)" : "scale(1)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={typedPrompt ? "#000" : "#505058"} strokeWidth="2.5" strokeLinecap="round">
                      <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {(() => {
              const action   = AI_CHAT_ACTIONS[4];
              const isActive = action.key === step.activeCard && phase !== "typing";
              const isDone   = action.key === step.activeCard && phase === "result";
              return <ActionCard key={action.key} action={action} isActive={isActive} isDone={isDone} />;
            })()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
