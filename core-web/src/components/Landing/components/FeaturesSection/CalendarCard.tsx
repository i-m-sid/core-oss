import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { QUICK_ADD_STEPS } from "../../constants/featuresData";

// ── Palette ───────────────────────────────────────────────────────────────────

const PALETTE = {
  indigo:  { border: "#6366f1", grad: "rgba(99,102,241,0.18),rgba(99,102,241,0.05)", ring: "rgba(99,102,241,0.12)", text: "#a5b4fc" },
  emerald: { border: "#34d399", grad: "rgba(52,211,153,0.15),rgba(52,211,153,0.04)", ring: "rgba(52,211,153,0.10)", text: "#6ee7b7" },
  teal:    { border: "#2dd4bf", grad: "rgba(45,212,191,0.15),rgba(45,212,191,0.04)", ring: "rgba(45,212,191,0.10)", text: "#5eead4" },
} as const;

type Palette = typeof PALETTE[keyof typeof PALETTE];

// ── Static mini-week data ─────────────────────────────────────────────────────

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;
const DATES = [7, 8, 9, 10, 11];
const TODAY = 2; // Wed

interface GridEvent {
  day: number;
  startRow: number; // 1-based, each row = 30 min starting at 9am
  span: number;
  label: string;
  palette: Palette;
}

const GRID_EVENTS: GridEvent[] = [
  { day: 0, startRow: 1, span: 1, label: "Standup",       palette: PALETTE.indigo  },
  { day: 1, startRow: 1, span: 1, label: "Standup",       palette: PALETTE.indigo  },
  { day: 2, startRow: 1, span: 1, label: "Standup",       palette: PALETTE.indigo  },
  { day: 2, startRow: 3, span: 2, label: "Design Review", palette: PALETTE.teal    },
  { day: 2, startRow: 7, span: 2, label: "1:1 Sarah",     palette: PALETTE.emerald },
  { day: 3, startRow: 3, span: 3, label: "Sprint Plan",   palette: PALETTE.indigo  },
  { day: 4, startRow: 5, span: 4, label: "AI Demo Prep",  palette: PALETTE.teal    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function CalendarCard() {
  const [activeStep, setActiveStep] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const [isTyping, setIsTyping]     = useState(true);
  const [showAdded, setShowAdded]   = useState(false);

  const step = QUICK_ADD_STEPS[activeStep];

  // Typing animation for quick-add input
  useEffect(() => {
    if (!isTyping) return;
    let chars = 0;
    const timer = setInterval(() => {
      if (chars <= step.label.length) {
        setTypedChars(chars);
        chars += 1;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsTyping(false);
          setShowAdded(true);
          setTimeout(() => {
            setShowAdded(false);
            setActiveStep(s => (s + 1) % QUICK_ADD_STEPS.length);
            setTypedChars(0);
            setIsTyping(true);
          }, 1600);
        }, 400);
      }
    }, 55);
    return () => clearInterval(timer);
  }, [isTyping, step.label]);

  const colWidth  = 100 / DAYS.length;
  const rowHeight = 100 / 8; // 8 rows = 4 hours (9am–1pm)

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
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <path d="M16 2v4M8 2v4M3 10h18"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Smart scheduling</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Add events in plain English. Cube finds the right slot and keeps your week conflict-free.
          </p>
        </div>
      </div>

      {/* Mini calendar grid */}
      <div className="rounded-xl border border-white/[0.05] overflow-hidden" style={{ background: "#0e0f10" }}>

        {/* Day headers */}
        <div className="grid grid-cols-5 border-b border-white/[0.04]" style={{ paddingLeft: "32px" }}>
          {DAYS.map((day, i) => {
            const isToday = i === TODAY;
            return (
              <div key={day} className="flex flex-col items-center py-2 gap-1">
                <span
                  className="text-[9.5px] font-semibold uppercase tracking-widest"
                  style={{ color: isToday ? "#6366f1" : "#3a3a42" }}
                >
                  {day}
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: isToday ? "#6366f1" : "transparent" }}
                >
                  <span className="text-[12px] font-semibold" style={{ color: isToday ? "#fff" : "#606068" }}>
                    {DATES[i]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grid body */}
        <div className="relative" style={{ height: "168px" }}>

          {/* Hour labels */}
          <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-between py-1 pr-1">
            {["9am", "10am", "11am", "12pm", "1pm"].map(h => (
              <span key={h} className="text-[8px] text-right" style={{ color: "#2e2e36" }}>{h}</span>
            ))}
          </div>

          {/* Day columns */}
          <div className="absolute inset-0 grid grid-cols-5" style={{ left: "32px" }}>
            {DAYS.map((_, di) => (
              <div
                key={di}
                className="relative h-full"
                style={{ borderLeft: di === 0 ? "none" : "1px solid rgba(255,255,255,0.03)" }}
              >
                {[0, 1, 2, 3, 4].map(r => (
                  <div
                    key={r}
                    className="absolute left-0 right-0"
                    style={{ top: `${r * 20}%`, borderTop: "1px solid rgba(255,255,255,0.03)" }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Events + now line */}
          <div className="absolute inset-0" style={{ left: "32px" }}>
            {GRID_EVENTS.map(ev => {
              const p      = ev.palette;
              const left   = ev.day * colWidth;
              const top    = (ev.startRow - 1) * rowHeight;
              const height = ev.span * rowHeight;
              return (
                <div
                  key={`${ev.day}-${ev.startRow}`}
                  className="absolute rounded-md overflow-hidden"
                  style={{
                    left:   `calc(${left}% + 2px)`,
                    width:  `calc(${colWidth}% - 4px)`,
                    top:    `calc(${top}% + 1px)`,
                    height: `calc(${height}% - 2px)`,
                    background: `linear-gradient(to right, ${p.grad})`,
                    border: `1px solid ${p.ring}`,
                    borderLeftWidth: "2px",
                    borderLeftColor: p.border,
                  }}
                >
                  {ev.span >= 2 && (
                    <p className="px-1.5 py-1 text-[8.5px] font-semibold leading-tight truncate" style={{ color: p.text }}>
                      {ev.label}
                    </p>
                  )}
                </div>
              );
            })}

            {/* Now line */}
            <div
              className="absolute z-10 flex items-center"
              style={{ left: `${TODAY * colWidth}%`, width: `${colWidth}%`, top: "47%" }}
            >
              <div className="w-1.5 h-1.5 rounded-full -ml-0.5 shrink-0" style={{ background: "#6366f1" }} />
              <div className="flex-1 h-px" style={{ background: "#6366f1", opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick-add input */}
      <div className="mt-4">
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300"
          style={{
            borderColor: isTyping ? "rgba(99,102,241,0.35)" : showAdded ? "rgba(34,197,94,0.35)" : "rgba(255,255,255,0.06)",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#404048" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          <span className="flex-1 text-[13px]" style={{ color: typedChars > 0 ? "#c8c8cc" : "#303038" }}>
            {typedChars > 0 ? step.label.slice(0, typedChars) : "Add event..."}
            {isTyping && typedChars > 0 && (
              <span className="ml-0.5 inline-block h-3.5 w-[1.5px] animate-pulse bg-indigo-400 align-text-bottom rounded-full" />
            )}
          </span>
          {showAdded && (
            <span className="text-[11px] font-medium shrink-0" style={{ color: "#4ade80" }}>
              ✓ Added · {step.detail}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
