import { useState, useEffect } from "react";
import { CAL_EVENTS as EVENTS, CAL_HOURS as HOURS, CAL_TOP_OFFSET as TOP_OFFSET, type CalEvent } from "./constantData";

export { EVENTS };
export type { CalEvent };

const BG     = "#121314";
const BORDER = "rgba(255,255,255,0.04)";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#4a4a50";
const CELL_H = 54;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

function getWeekData() {
  const now    = new Date();
  const dow    = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dow + 6) % 7));
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.getDate();
  });
  const todayCol = (dow + 6) % 7;
  return { dates, todayCol };
}

function getNowHour() {
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function pxFromHour(h: number) { return (h - TOP_OFFSET) * CELL_H; }

export const TODAY_COL = getWeekData().todayCol;

export default function CalendarMock() {
  const [{ dates, todayCol }, setWeek] = useState(getWeekData);
  const [nowH, setNowH] = useState(getNowHour);

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
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, []);

  const nowPx      = pxFromHour(nowH);
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
              <span className="text-[10.5px] font-semibold uppercase tracking-widest" style={{ color: isToday ? "#6366f1" : T_DIM }}>
                {day}
              </span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: isToday ? "#6366f1" : "transparent" }}>
                <span className="text-[13px] font-semibold" style={{ color: isToday ? "#fff" : T_SEC }}>{dates[i]}</span>
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
              <div key={h} className="absolute right-2 flex items-center" style={{ top: `${pxFromHour(h) - 8}px` }}>
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
                style={{ borderLeft: di === 0 ? "none" : `1px solid ${BORDER}`, minHeight: `${HOURS.length * CELL_H}px` }}
              >
                {HOURS.map(h => (
                  <div key={h} className="absolute left-0 right-0" style={{ top: `${(h - TOP_OFFSET) * CELL_H}px`, borderTop: `1px solid ${BORDER}` }} />
                ))}
                {isToday && nowVisible && (
                  <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: `${nowPx}px` }}>
                    <div className="w-1.5 h-1.5 rounded-full -ml-0.5 shrink-0" style={{ background: "#6366f1" }} />
                    <div className="flex-1 h-px" style={{ background: "#6366f1", opacity: 0.7 }} />
                  </div>
                )}
                {dayEvents.map(ev => {
                  const top    = pxFromHour(ev.startH);
                  const height = Math.max(ev.durationH * CELL_H - 4, 22);
                  const p      = ev.palette;
                  return (
                    <div
                      key={ev.id}
                      className="absolute left-1 right-1 rounded-lg px-2.5 py-1.5 cursor-pointer transition-all overflow-hidden flex flex-col justify-center"
                      style={{
                        top: `${top + 2}px`, height: `${height}px`,
                        background: `linear-gradient(to right, ${p.grad})`,
                        border: `1px solid ${p.ring}`, borderLeftWidth: "2px", borderLeftColor: p.border,
                      }}
                    >
                      <p className="text-[11px] font-semibold leading-none truncate" style={{ color: p.text }}>{ev.title}</p>
                      {ev.subtitle && height > 34 && (
                        <p className="text-[10px] truncate mt-1 leading-none" style={{ color: p.sub }}>{ev.subtitle}</p>
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
