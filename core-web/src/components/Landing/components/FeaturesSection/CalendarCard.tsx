import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const SHORTCUTS = [
  {
    action: "Go to Chat",
    keys: ["⌘", "⇧", "C"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    action: "Go to Inbox",
    keys: ["⌘", "⇧", "I"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    action: "Go to Projects",
    keys: ["⌘", "⇧", "P"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    action: "Quick search",
    keys: ["⌘", "K"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    action: "Go to Calendar",
    keys: ["⌘", "⇧", "L"],
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
      </svg>
    ),
  },
];

export default function CalendarCard() {
  const [activeIndex, setActiveIndex] = useState(3);

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
        <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Lightning fast navigation</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Jump between chat, inbox, projects, and calendar instantly. No mouse needed — your whole workspace at your fingertips.
          </p>
        </div>
      </div>

      {/* Shortcuts */}
      <div className="space-y-0.5">
        {SHORTCUTS.map((s, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={s.action}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-300"
              style={{ background: isActive ? "rgba(255,255,255,0.04)" : "transparent" }}
            >
              {/* Active indicator */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r-full bg-white/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon */}
              <span
                className="shrink-0 transition-colors duration-300"
                style={{ color: isActive ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)" }}
              >
                {s.icon}
              </span>

              {/* Label */}
              <motion.span
                className="flex-1 text-[13px] font-medium transition-colors duration-300"
                style={{ color: isActive ? "#e8e8ec" : "#383840" }}
                animate={{ x: isActive ? 2 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {s.action}
              </motion.span>

              {/* Keys — single pill, monospace, dim */}
              <span
                className="font-mono text-[11px] tracking-tight transition-all duration-300 shrink-0"
                style={{ color: isActive ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)" }}
              >
                {s.keys.join(" ")}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
