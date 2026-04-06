const BG     = "#121314";
const BORDER = "rgba(255,255,255,0.04)";
const T_PRI  = "#f0f0f0";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#4a4a50";

// ── Shared data (also imported by Sidebar) ────────────────────────────────────

export const CAL_DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const CAL_DATES = [31, 1, 2, 3, 4, 5, 6];
export const TODAY_COL = 2; // Wed

const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
const CELL_H = 54;
const TOP_OFFSET = 8;

export interface CalEvent {
  id: string;
  title: string;
  subtitle?: string;
  day: number;
  startH: number;
  durationH: number;
  color: string;
  bg: string;
}

export const EVENTS: CalEvent[] = [
  { id:"e1",  title:"Team Standup",      subtitle:"Engineering · Daily",  day:0, startH:9,    durationH:0.5, color:"#6366f1", bg:"rgba(99,102,241,0.14)" },
  { id:"e2",  title:"Team Standup",      subtitle:"Engineering · Daily",  day:1, startH:9,    durationH:0.5, color:"#6366f1", bg:"rgba(99,102,241,0.14)" },
  { id:"e3",  title:"Team Standup",      subtitle:"Engineering · Daily",  day:2, startH:9,    durationH:0.5, color:"#6366f1", bg:"rgba(99,102,241,0.14)" },
  { id:"e4",  title:"Design Review",     subtitle:"with Siddhant",        day:2, startH:11,   durationH:1,   color:"#22d3ee", bg:"rgba(34,211,238,0.11)" },
  { id:"e5",  title:"1:1 with Sarah",    subtitle:"Product sync",          day:2, startH:14,   durationH:1,   color:"#8b5cf6", bg:"rgba(139,92,246,0.13)" },
  { id:"e6",  title:"Sprint Planning",   subtitle:"Sprint 15 kickoff",     day:3, startH:10,   durationH:1.5, color:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  { id:"e7",  title:"Investor Update",   subtitle:"Monthly · Abhi",        day:3, startH:15,   durationH:1,   color:"#e11d48", bg:"rgba(225,29,72,0.12)"  },
  { id:"e8",  title:"AI Demo Prep",      subtitle:"Landing page review",   day:4, startH:13,   durationH:2,   color:"#22c55e", bg:"rgba(34,197,94,0.11)"  },
  { id:"e9",  title:"Lunch — Meet + Liam",                                 day:1, startH:12.5, durationH:1,   color:"#f59e0b", bg:"rgba(245,158,11,0.10)" },
  { id:"e10", title:"API Review",        subtitle:"v1.2 endpoints",        day:0, startH:11,   durationH:1.5, color:"#22d3ee", bg:"rgba(34,211,238,0.10)" },
];

function pxFromHour(h: number) { return (h - TOP_OFFSET) * CELL_H; }

// ── Component — pure week grid, no left panel ─────────────────────────────────

export default function CalendarView() {
  const nowPx = pxFromHour(14.25);

  return (
    <div className="flex flex-1 flex-col min-w-0 h-full overflow-hidden" style={{ background: BG }}>

      {/* Week header */}
      <div className="shrink-0 flex" style={{ borderBottom: `1px solid rgba(255,255,255,0.05)` }}>
        <div className="w-12 shrink-0" />
        {CAL_DAYS.map((day, i) => {
          const isToday = i === TODAY_COL;
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
                  {CAL_DATES[i]}
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
          {CAL_DAYS.map((day, di) => {
            const dayEvents = EVENTS.filter(e => e.day === di);
            const isToday = di === TODAY_COL;
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

                {/* Today "now" line */}
                {isToday && (
                  <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: `${nowPx}px` }}>
                    <div className="w-1.5 h-1.5 rounded-full -ml-0.5 shrink-0" style={{ background: "#6366f1" }} />
                    <div className="flex-1 h-px" style={{ background: "#6366f1", opacity: 0.7 }} />
                  </div>
                )}

                {/* Events */}
                {dayEvents.map(ev => {
                  const top    = pxFromHour(ev.startH);
                  const height = Math.max(ev.durationH * CELL_H - 4, 22);
                  return (
                    <div
                      key={ev.id}
                      className="absolute left-1 right-1 rounded-lg px-2.5 py-2 cursor-pointer hover:brightness-110 transition-all overflow-hidden"
                      style={{
                        top: `${top + 2}px`,
                        height: `${height}px`,
                        background: ev.bg,
                        borderLeft: `2px solid ${ev.color}`,
                      }}
                    >
                      <p className="text-[11.5px] font-semibold leading-tight truncate" style={{ color: ev.color }}>
                        {ev.title}
                      </p>
                      {ev.subtitle && height > 34 && (
                        <p className="text-[10px] truncate mt-0.5" style={{ color: `${ev.color}88` }}>
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
