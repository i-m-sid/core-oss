import { useState, useEffect } from "react";

const BG     = "#121314";
const BORDER = "rgba(255,255,255,0.04)";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#4a4a50";

// ── Palette ───────────────────────────────────────────────────────────────────

const PALETTE = {
  indigo:  { border: "#6366f1", grad: "rgba(99,102,241,0.18),rgba(99,102,241,0.05)",  ring: "rgba(99,102,241,0.12)",  text: "#a5b4fc", sub: "rgba(165,180,252,0.5)"  },
  emerald: { border: "#34d399", grad: "rgba(52,211,153,0.15),rgba(52,211,153,0.04)",  ring: "rgba(52,211,153,0.10)",  text: "#6ee7b7", sub: "rgba(110,231,183,0.5)"  },
  teal:    { border: "#2dd4bf", grad: "rgba(45,212,191,0.15),rgba(45,212,191,0.04)",  ring: "rgba(45,212,191,0.10)",  text: "#5eead4", sub: "rgba(94,234,212,0.5)"   },
} as const;

type Palette = typeof PALETTE[keyof typeof PALETTE];

// ── Data ──────────────────────────────────────────────────────────────────────

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const CELL_H     = 52;
const TOP_OFFSET = 8;

interface CalEvent {
  id: string;
  title: string;
  subtitle?: string;
  day: number;      // 0=Mon … 6=Sun
  startH: number;
  durationH: number;
  palette: Palette;
}

const ALL_EVENTS: CalEvent[] = [
  { id: "e1",  title: "Team Standup",    subtitle: "Engineering · Daily", day: 0, startH: 9,    durationH: 0.5, palette: PALETTE.indigo  },
  { id: "e2",  title: "Team Standup",    subtitle: "Engineering · Daily", day: 1, startH: 9,    durationH: 0.5, palette: PALETTE.indigo  },
  { id: "e3",  title: "Team Standup",    subtitle: "Engineering · Daily", day: 2, startH: 9,    durationH: 0.5, palette: PALETTE.indigo  },
  { id: "e4",  title: "Design Review",   subtitle: "with Jordan",       day: 2, startH: 11,   durationH: 1,   palette: PALETTE.teal    },
  { id: "e5",  title: "1:1 with Sarah",  subtitle: "Product sync",        day: 2, startH: 14,   durationH: 1,   palette: PALETTE.emerald },
  { id: "e6",  title: "Sprint Planning", subtitle: "Sprint 15 kickoff",   day: 3, startH: 10,   durationH: 1.5, palette: PALETTE.indigo  },
  { id: "e7",  title: "Investor Update", subtitle: "Monthly · Alex",      day: 3, startH: 15,   durationH: 1,   palette: PALETTE.teal    },
  { id: "e8",  title: "AI Demo Prep",    subtitle: "Landing page review", day: 4, startH: 13,   durationH: 2,   palette: PALETTE.teal    },
  { id: "e9",  title: "Lunch — Casey",                                      day: 1, startH: 12.5, durationH: 1,   palette: PALETTE.emerald },
  { id: "e10", title: "API Review",      subtitle: "v1.2 endpoints",      day: 0, startH: 11,   durationH: 1.5, palette: PALETTE.teal    },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getThreeDayData() {
  const now    = new Date();
  const dow    = now.getDay(); // 0=Sun…6=Sat
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dow + 6) % 7));

  const todayCol = (dow + 6) % 7; // 0=Mon…6=Sun

  // Show yesterday, today, tomorrow (clamped to Mon–Sun)
  const cols = [-1, 0, 1].map(offset => {
    const colIndex = Math.min(Math.max(todayCol + offset, 0), 6);
    const d = new Date(monday);
    d.setDate(monday.getDate() + colIndex);
    return { colIndex, date: d.getDate(), label: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][colIndex] };
  });

  return { cols, todayCol };
}

function getNowHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function pxFromHour(h: number) {
  return (h - TOP_OFFSET) * CELL_H;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MobileCalendarView() {
  const [{ cols, todayCol }, setData] = useState(getThreeDayData);
  const [nowH, setNowH] = useState(getNowHour);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const timeout = setTimeout(() => {
      setData(getThreeDayData());
      setNowH(getNowHour());
      interval = setInterval(() => {
        setData(getThreeDayData());
        setNowH(getNowHour());
      }, 60_000);
    }, (60 - new Date().getSeconds()) * 1000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  const nowPx      = pxFromHour(nowH);
  const nowVisible = nowH >= HOURS[0] && nowH <= HOURS[HOURS.length - 1];

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: BG }}>

      {/* 3-day header */}
      <div className="shrink-0 flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        {/* Hour gutter spacer */}
        <div className="w-10 shrink-0" />
        {cols.map(({ colIndex, date, label }) => {
          const isToday = colIndex === todayCol;
          return (
            <div
              key={colIndex}
              className="flex-1 flex flex-col items-center py-2.5 gap-1"
              style={{ borderLeft: `1px solid ${BORDER}` }}
            >
              <span
                className="text-[9.5px] font-semibold uppercase tracking-widest"
                style={{ color: isToday ? "#6366f1" : T_DIM }}
              >
                {label}
              </span>
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: isToday ? "#6366f1" : "transparent" }}
              >
                <span
                  className="text-[12px] font-semibold"
                  style={{ color: isToday ? "#fff" : T_SEC }}
                >
                  {date}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        <div className="flex" style={{ minHeight: `${HOURS.length * CELL_H}px` }}>

          {/* Hour labels */}
          <div className="w-10 shrink-0 relative select-none">
            {HOURS.map(h => (
              <div
                key={h}
                className="absolute right-1.5 flex items-center"
                style={{ top: `${pxFromHour(h) - 7}px` }}
              >
                <span className="text-[9px]" style={{ color: T_DIM }}>
                  {h < 12 ? `${h}am` : h === 12 ? "12p" : `${h - 12}p`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {cols.map(({ colIndex }) => {
            const isToday   = colIndex === todayCol;
            const dayEvents = ALL_EVENTS.filter(e => e.day === colIndex);

            return (
              <div
                key={colIndex}
                className="flex-1 relative"
                style={{
                  borderLeft: `1px solid ${BORDER}`,
                  minHeight: `${HOURS.length * CELL_H}px`,
                }}
              >
                {/* Hour lines */}
                {HOURS.map(h => (
                  <div
                    key={h}
                    className="absolute left-0 right-0"
                    style={{ top: `${(h - TOP_OFFSET) * CELL_H}px`, borderTop: `1px solid ${BORDER}` }}
                  />
                ))}

                {/* Now line */}
                {isToday && nowVisible && (
                  <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: `${nowPx}px` }}>
                    <div className="w-1.5 h-1.5 rounded-full -ml-0.5 shrink-0" style={{ background: "#6366f1" }} />
                    <div className="flex-1 h-px" style={{ background: "#6366f1", opacity: 0.7 }} />
                  </div>
                )}

                {/* Events */}
                {dayEvents.map(ev => {
                  const top    = pxFromHour(ev.startH);
                  const height = Math.max(ev.durationH * CELL_H - 4, 20);
                  const p      = ev.palette;
                  return (
                    <div
                      key={ev.id}
                      className="absolute left-1 right-1 rounded-lg px-1.5 py-1 cursor-pointer overflow-hidden flex flex-col justify-center"
                      style={{
                        top: `${top + 2}px`,
                        height: `${height}px`,
                        background: `linear-gradient(to right, ${p.grad})`,
                        border: `1px solid ${p.ring}`,
                        borderLeftWidth: "2px",
                        borderLeftColor: p.border,
                      }}
                    >
                      <p className="text-[10px] font-semibold leading-none truncate" style={{ color: p.text }}>
                        {ev.title}
                      </p>
                      {ev.subtitle && height > 32 && (
                        <p className="text-[9px] truncate mt-0.5 leading-none" style={{ color: p.sub }}>
                          {ev.subtitle}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
