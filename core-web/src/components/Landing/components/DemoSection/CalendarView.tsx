import { useState, useEffect } from "react";

const BG     = "#121314";
const BORDER = "rgba(255,255,255,0.04)";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#4a4a50";

// ── Palette ───────────────────────────────────────────────────────────────────

// indigo = team/recurring  |  emerald = personal/social  |  teal = technical
const PALETTE = {
  indigo:  { border: "#6366f1", grad: "rgba(99,102,241,0.18),rgba(99,102,241,0.05)",  ring: "rgba(99,102,241,0.12)",  text: "#a5b4fc", sub: "rgba(165,180,252,0.5)"  },
  emerald: { border: "#34d399", grad: "rgba(52,211,153,0.15),rgba(52,211,153,0.04)",  ring: "rgba(52,211,153,0.10)",  text: "#6ee7b7", sub: "rgba(110,231,183,0.5)"  },
  teal:    { border: "#2dd4bf", grad: "rgba(45,212,191,0.15),rgba(45,212,191,0.04)",  ring: "rgba(45,212,191,0.10)",  text: "#5eead4", sub: "rgba(94,234,212,0.5)"   },
} as const;

type Palette = typeof PALETTE[keyof typeof PALETTE];

// ── Data ──────────────────────────────────────────────────────────────────────

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const CELL_H     = 54;
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

const EVENTS: CalEvent[] = [
  { id:"e1",  title:"Team Standup",        subtitle:"Engineering · Daily", day:0, startH:9,    durationH:0.5, palette:PALETTE.indigo  },
  { id:"e2",  title:"Team Standup",        subtitle:"Engineering · Daily", day:1, startH:9,    durationH:0.5, palette:PALETTE.indigo  },
  { id:"e3",  title:"Team Standup",        subtitle:"Engineering · Daily", day:2, startH:9,    durationH:0.5, palette:PALETTE.indigo  },
  { id:"e4",  title:"Design Review",       subtitle:"with Siddhant",       day:2, startH:11,   durationH:1,   palette:PALETTE.teal    },
  { id:"e5",  title:"1:1 with Sarah",      subtitle:"Product sync",        day:2, startH:14,   durationH:1,   palette:PALETTE.emerald },
  { id:"e6",  title:"Sprint Planning",     subtitle:"Sprint 15 kickoff",   day:3, startH:10,   durationH:1.5, palette:PALETTE.indigo  },
  { id:"e7",  title:"Investor Update",     subtitle:"Monthly · Abhi",      day:3, startH:15,   durationH:1,   palette:PALETTE.teal    },
  { id:"e8",  title:"AI Demo Prep",        subtitle:"Landing page review", day:4, startH:13,   durationH:2,   palette:PALETTE.teal    },
  { id:"e9",  title:"Lunch — Meet + Liam",                                 day:1, startH:12.5, durationH:1,   palette:PALETTE.emerald },
  { id:"e10", title:"API Review",          subtitle:"v1.2 endpoints",      day:0, startH:11,   durationH:1.5, palette:PALETTE.teal    },
];

// Exported for Sidebar
export { EVENTS };
export type { CalEvent };

// ── Week helpers ──────────────────────────────────────────────────────────────

function getWeekData() {
  const now    = new Date();
  const dow    = now.getDay(); // 0=Sun … 6=Sat
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dow + 6) % 7));

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });

  const todayCol = (dow + 6) % 7; // 0=Mon … 6=Sun

  return { dates, todayCol };
}

function getNowHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function pxFromHour(h: number) { return (h - TOP_OFFSET) * CELL_H; }

// Exported for Sidebar highlight
export const TODAY_COL = getWeekData().todayCol;

// ── Component ─────────────────────────────────────────────────────────────────

export default function CalendarView() {
  const [{ dates, todayCol }, setWeek] = useState(getWeekData);
  const [nowH, setNowH] = useState(getNowHour);

  // Tick at the top of every minute to keep dates + now-line current
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      setWeek(getWeekData());
      setNowH(getNowHour());
      interval = setInterval(() => {
        setWeek(getWeekData());
        setNowH(getNowHour());
      }, 60_000);
    }, (60 - new Date().getSeconds()) * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const nowPx     = pxFromHour(nowH);
  const nowVisible = nowH >= HOURS[0] && nowH <= HOURS[HOURS.length - 1];

  return (
    <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden" style={{ background: BG }}>

      {/* Week header */}
      <div className="shrink-0 flex" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="w-12 shrink-0" />
        {DAYS.map((day, i) => {
          const isToday = i === todayCol;
          return (
            <div
              key={day}
              className="flex-1 flex flex-col items-center py-3 gap-1"
              style={{ borderLeft: i === 0 ? "none" : `1px solid ${BORDER}` }}
            >
              <span
                className="text-[10.5px] font-semibold uppercase tracking-widest"
                style={{ color: isToday ? "#6366f1" : T_DIM }}
              >
                {day}
              </span>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: isToday ? "#6366f1" : "transparent" }}
              >
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: isToday ? "#fff" : T_SEC }}
                >
                  {dates[i]}
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
          <div className="w-12 shrink-0 relative select-none">
            {HOURS.map(h => (
              <div
                key={h}
                className="absolute right-2 flex items-center"
                style={{ top: `${pxFromHour(h) - 8}px` }}
              >
                <span className="text-[9.5px]" style={{ color: T_DIM }}>
                  {h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map((day, di) => {
            const dayEvents = EVENTS.filter(e => e.day === di);
            const isToday   = di === todayCol;
            return (
              <div
                key={day}
                className="flex-1 relative"
                style={{
                  borderLeft: di === 0 ? "none" : `1px solid ${BORDER}`,
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
                  const height = Math.max(ev.durationH * CELL_H - 4, 22);
                  const p      = ev.palette;
                  return (
                    <div
                      key={ev.id}
                      className="absolute left-1 right-1 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all overflow-hidden flex flex-col justify-center"
                      style={{
                        top: `${top + 2}px`,
                        height: `${height}px`,
                        background: `linear-gradient(to right, ${p.grad})`,
                        border: `1px solid ${p.ring}`,
                        borderLeftWidth: "2px",
                        borderLeftColor: p.border,
                      }}
                    >
                      <p className="text-[11px] font-semibold leading-none truncate" style={{ color: p.text }}>
                        {ev.title}
                      </p>
                      {ev.subtitle && height > 34 && (
                        <p className="text-[10px] truncate mt-1 leading-none" style={{ color: p.sub }}>
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
