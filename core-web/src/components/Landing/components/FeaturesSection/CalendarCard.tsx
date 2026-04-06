import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Source data ────────────────────────────────────────────────────────────────

const SOURCES = [
  {
    name:    "Gmail",
    color:   "#EA4335",
    bgColor: "rgba(234,67,53,0.10)",
    title:   "Re: Design review notes",
    meta:    "from Meet · 2 min ago",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="rgba(234,67,53,0.15)" stroke="#EA4335" strokeWidth="1.5"/>
        <path d="M22 6l-10 7L2 6" stroke="#EA4335" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name:    "Calendar",
    color:   "#4285F4",
    bgColor: "rgba(66,133,244,0.10)",
    title:   "Design Review · 11:00 AM",
    meta:    "1 hour · Google Meet link",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="18" rx="2" fill="rgba(66,133,244,0.15)" stroke="#4285F4" strokeWidth="1.5"/>
        <path d="M16 2v4M8 2v4M3 10h18" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name:    "Notion",
    color:   "#ffffff",
    bgColor: "rgba(255,255,255,0.08)",
    title:   "Sprint 14 Notes",
    meta:    "Last edited by Siddhant",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="2" width="18" height="20" rx="2" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <path d="M7 8h10M7 12h7M7 16h5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const;

// ── Component ──────────────────────────────────────────────────────────────────

export default function CalendarCard() {
  const [activeSource, setActiveSource] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => {
      setActiveSource(s => (s + 1) % SOURCES.length);
    }, 2400);
    return () => clearInterval(t);
  }, []);

  const src = SOURCES[activeSource];

  return (
    <motion.div
      className="col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-7">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Everything connected</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Cube links your email, calendar, and docs — surfacing what matters, exactly when you need it.
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full overflow-hidden rounded-xl border border-white/[0.05]"
        style={{ height: "200px", background: "#0e0f10" }}
      >
        {/* Source nodes — left column */}
        <div className="absolute left-5 inset-y-0 flex flex-col justify-center gap-4">
          {SOURCES.map((s, i) => {
            const isActive = i === activeSource;
            return (
              <div
                key={s.name}
                className="flex items-center gap-2 rounded-lg border px-2.5 py-2 transition-all duration-500"
                style={{
                  width: "108px",
                  background: isActive ? s.bgColor : "#141517",
                  borderColor: isActive ? s.color + "55" : "rgba(255,255,255,0.06)",
                  opacity: isActive ? 1 : 0.35,
                  transform: isActive ? "scale(1.03)" : "scale(1)",
                  boxShadow: isActive ? `0 0 12px ${s.color}22` : "none",
                }}
              >
                {s.icon}
                <span className="text-[11px] font-medium" style={{ color: isActive ? "#e0e0e4" : "#505058" }}>
                  {s.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* SVG connection lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
          viewBox="0 0 400 200"
        >
          <defs>
            {SOURCES.map((s, i) => (
              <linearGradient key={s.name} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.6" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.15" />
              </linearGradient>
            ))}
          </defs>

          {/* Top node (Gmail) → card: y=44 left → y=100 right */}
          {[
            { nodeY: 44,  cardY: 100 },
            { nodeY: 100, cardY: 100 },
            { nodeY: 156, cardY: 100 },
          ].map(({ nodeY, cardY }, i) => {
            const isActive = i === activeSource;
            const x1 = 113, x2 = 248;
            const cx1 = x1 + 60, cy1 = nodeY;
            const cx2 = x2 - 60, cy2 = cardY;
            const d = `M ${x1} ${nodeY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${cardY}`;
            return (
              <g key={i}>
                {/* Base dim path */}
                <path
                  d={d}
                  fill="none"
                  stroke={SOURCES[i].color}
                  strokeWidth={isActive ? "1.5" : "1"}
                  strokeOpacity={isActive ? 0.5 : 0.12}
                  strokeDasharray="4 6"
                  style={{
                    transition: "stroke-opacity 500ms, stroke-width 500ms",
                  }}
                />
                {/* Animated flowing particle */}
                {isActive && (
                  <path
                    d={d}
                    fill="none"
                    stroke={`url(#grad-${i})`}
                    strokeWidth="1.5"
                    strokeOpacity="0.9"
                    strokeDasharray="40 160"
                    style={{
                      animation: "flowLine 1.2s linear infinite",
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Cube thread card — right side */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <div
            className="rounded-xl border bg-[#18191c] overflow-hidden transition-all duration-500"
            style={{
              width: "148px",
              borderColor: src.color + "44",
              boxShadow: `0 0 20px ${src.color}18, 0 4px 16px rgba(0,0,0,0.4)`,
            }}
          >
            {/* Card header */}
            <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-2 border-b border-white/[0.05]">
              <img src="/cube-logo-white.svg" alt="Cube" className="w-2.5 h-2.5 opacity-60" />
              <span className="text-[10px] font-medium text-[#505058]">Cube</span>
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Card body — cross-fades on source change */}
            <div className="p-3 relative overflow-hidden" style={{ minHeight: "64px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSource}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11.5px] font-medium text-[#e0e0e4] leading-snug mb-2">
                    {src.title}
                  </p>
                  <p className="text-[10px] text-[#505058] leading-snug">
                    {src.meta}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes flowLine {
            from { stroke-dashoffset: 200; }
            to   { stroke-dashoffset: 0; }
          }
        `}</style>
      </div>
    </motion.div>
  );
}
