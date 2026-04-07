import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHORTCUTS = [
  {
    action: "Compose new email",
    keys: ["⌘", "N"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    action: "Archive selected",
    keys: ["E"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/>
        <line x1="10" y1="12" x2="14" y2="12"/>
      </svg>
    ),
  },
  {
    action: "Mark as important",
    keys: ["⌘", "I"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    action: "Search emails",
    keys: ["⌘", "F"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    action: "Reply",
    keys: ["R"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/>
      </svg>
    ),
  },
];

function KbdKey({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-md text-[10px] font-medium bg-white/[0.06] border border-white/[0.10] text-[#909098]">
      {label}
    </span>
  );
}

export default function CalendarCard() {
  const [activeIndex, setActiveIndex] = useState(3); // start on "Search"

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex(i => (i + 1) % SHORTCUTS.length);
    }, 1400);
    return () => clearInterval(t);
  }, []);

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
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Lightning fast navigation</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Navigate your entire workspace with keyboard shortcuts. No mouse needed — just type and act.
          </p>
        </div>
      </div>

      {/* Shortcuts list */}
      <div className="rounded-xl border border-white/[0.05] bg-[#0e0f10] overflow-hidden">
        {SHORTCUTS.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={s.action}
              className="relative flex items-center gap-3 px-4 py-3 transition-colors duration-300"
              style={{
                background: isActive ? "rgba(56,189,248,0.06)" : "transparent",
                borderBottom: i < SHORTCUTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}
            >
              {/* Active indicator bar */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-sky-400 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <span
                className="shrink-0 transition-colors duration-300"
                style={{ color: isActive ? "#38bdf8" : "#404048" }}
              >
                {s.icon}
              </span>

              {/* Action label */}
              <span
                className="flex-1 text-[13px] font-medium transition-colors duration-300"
                style={{ color: isActive ? "#e8e8ec" : "#505058" }}
              >
                {s.action}
              </span>

              {/* Key badges */}
              <div className="flex items-center gap-1">
                {s.keys.map((k) => (
                  <KbdKey key={k} label={k} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
