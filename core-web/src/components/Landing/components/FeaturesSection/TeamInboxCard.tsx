import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { TEAM_MEMBERS, INBOX_THREAD_LABELS } from "../../constants/featuresData";

// ── Types ─────────────────────────────────────────────────────────────────

interface CursorPos { x: number; y: number }

// Simulated cursor waypoints for each team member
const SIDDHANT_PATH: CursorPos[] = [
  { x: 38, y: 32 }, { x: 38, y: 56 }, { x: 38, y: 80 },
];
const MEET_PATH: CursorPos[] = [
  { x: 72, y: 56 }, { x: 72, y: 80 }, { x: 72, y: 32 },
];

// ── Component ─────────────────────────────────────────────────────────────

export default function TeamInboxCard() {
  const [activeThread, setActiveThread] = useState(0);
  const [sidPos, setSidPos] = useState(0);
  const [meetPos, setMeetPos] = useState(0);
  const [mousePos, setMousePos] = useState<CursorPos>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Cycle simulated cursors
  useEffect(() => {
    const interval = setInterval(() => {
      setSidPos(p => (p + 1) % SIDDHANT_PATH.length);
      setMeetPos(p => (p + 1) % MEET_PATH.length);
      setActiveThread(t => (t + 1) % INBOX_THREAD_LABELS.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const sidCursor  = SIDDHANT_PATH[sidPos];
  const meetCursor = MEET_PATH[meetPos];

  return (
    <motion.div
      className="col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-7">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Shared team inbox</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Every message, thread, and notification in one place. See who's reading what, live.
          </p>
        </div>
      </div>

      {/* Inbox simulation */}
      <div className="relative mt-2">
        {/* Online members strip */}
        <div className="flex items-center gap-2 mb-4">
          {TEAM_MEMBERS.map(m => (
            <div key={m.name} className="flex items-center gap-1.5">
              <div className="relative">
                <div className={`w-6 h-6 rounded-full ${m.color} flex items-center justify-center`}>
                  <span className="text-white font-semibold" style={{ fontSize: "9px" }}>{m.initials}</span>
                </div>
                {m.online && (
                  <div
                    className="absolute -bottom-px -right-px w-2 h-2 rounded-full border border-[#111213]"
                    style={{ background: m.dotColor }}
                  />
                )}
              </div>
              <span className="text-[11px] text-[#505058]">{m.name}</span>
            </div>
          ))}
          <span className="ml-auto text-[11px] text-[#505058]">3 online</span>
        </div>

        {/* Thread list with live cursors */}
        <div
          className="relative rounded-xl border border-white/[0.05] overflow-hidden cursor-none"
          style={{ background: "#0e0f10" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onMouseMove={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }}
        >
          {INBOX_THREAD_LABELS.map((label, i) => {
            const isActive = i === activeThread;
            return (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.04] last:border-0 transition-colors duration-300"
                style={{ background: isActive ? "rgba(255,255,255,0.04)" : "transparent" }}
              >
                {/* Unread dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-300"
                  style={{ background: isActive ? "#6366f1" : "rgba(255,255,255,0.1)" }}
                />
                {/* Thread label */}
                <span
                  className="text-[13px] flex-1 truncate transition-colors duration-300"
                  style={{ color: isActive ? "#e0e0e4" : "#505058", fontWeight: isActive ? 500 : 400 }}
                >
                  {label}
                </span>
                {/* "reading" avatar badge */}
                {isActive && (
                  <div className="flex -space-x-1.5 shrink-0">
                    {TEAM_MEMBERS.slice(0, 2).map(m => (
                      <div
                        key={m.name}
                        className={`w-5 h-5 rounded-full ${m.color} border border-[#0e0f10] flex items-center justify-center`}
                      >
                        <span className="text-white font-semibold" style={{ fontSize: "7px" }}>{m.initials}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Siddhant cursor */}
          <div
            className="pointer-events-none absolute z-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: `${sidCursor.x}%`, top: `${sidCursor.y}%` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0ea5e9" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
            </svg>
            <div className="-mt-1 ml-3.5 rounded-md bg-sky-500 px-1.5 py-0.5 text-[9px] font-medium text-white shadow-sm whitespace-nowrap">
              Siddhant
            </div>
          </div>

          {/* Meet cursor */}
          <div
            className="pointer-events-none absolute z-20 transition-all duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ left: `${meetCursor.x}%`, top: `${meetCursor.y}%` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d9488" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
            </svg>
            <div className="-mt-1 ml-3.5 rounded-md bg-teal-600 px-1.5 py-0.5 text-[9px] font-medium text-white shadow-sm whitespace-nowrap">
              Meet
            </div>
          </div>

          {/* You cursor */}
          <div
            className="pointer-events-none absolute z-50 transition-opacity duration-150"
            style={{
              opacity: isHovering ? 1 : 0,
              transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)`,
              top: 0,
              left: 0,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
            </svg>
            <div className="-mt-1 ml-3.5 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-medium text-black shadow-sm">
              You
            </div>
          </div>
        </div>

        {/* Toast */}
        <div className="mt-3 flex items-center gap-2 rounded-full border border-white/[0.06] bg-[#18191c] px-3 py-1.5 w-fit">
          <div className="w-4 h-4 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
            <span className="text-sky-400 font-bold" style={{ fontSize: "8px" }}>SC</span>
          </div>
          <span className="text-[11.5px] text-[#a0a0a6]">Siddhant replied to PR #48</span>
        </div>
      </div>
    </motion.div>
  );
}
