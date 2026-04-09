import { useState, useEffect } from "react";
import { CAL_EVENTS as EVENTS, CAL_HOURS as HOURS, CAL_TOP_OFFSET as TOP_OFFSET } from "./constantData";

const BG     = "#121314";
const BORDER = "rgba(255,255,255,0.04)";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#4a4a50";
const CELL_H = 52;

function getThreeDayData() {
  const now    = new Date();
  const dow    = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((dow + 6) % 7));
  const todayCol = (dow + 6) % 7;
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

function pxFromHour(h: number) { return (h - TOP_OFFSET) * CELL_H; }

export default function MobileCalendarMock() {
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
        <div className="w-10 shrink-0" />
        {cols.map(({ colIndex, date, label }) => {
          const isToday = colIndex === todayCol;
          return (
            <div
              key={colIndex}
              className="flex-1 flex flex-col items-center py-2.5 gap-1"
              style={{ borderLeft: `1px solid ${BORDER}` }}
            >
              <span className="text-[9.5px] font-semibold uppercase tracking-widest" style={{ color: isToday ? "#6366f1" : T_DIM }}>
                {label}
              </span>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: isToday ? "#6366f1" : "transparent" }}>
                <span className="text-[12px] font-semibold" style={{ color: isToday ? "#fff" : T_SEC }}>{date}</span>
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
              <div key={h} className="absolute right-1.5 flex items-center" style={{ top: `${pxFromHour(h) - 7}px` }}>
                <span className="text-[9px]" style={{ color: T_DIM }}>
                  {h < 12 ? `${h}am` : h === 12 ? "12p" : `${h - 12}p`}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {cols.map(({ colIndex }) => {
            const isToday   = colIndex === todayCol;
            const dayEvents = EVENTS.filter(e => e.day === colIndex);
            return (
              <div
                key={colIndex}
                className="flex-1 relative"
                style={{ borderLeft: `1px solid ${BORDER}`, minHeight: `${HOURS.length * CELL_H}px` }}
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
                  const height = Math.max(ev.durationH * CELL_H - 4, 20);
                  const p      = ev.palette;
                  return (
                    <div
                      key={ev.id}
                      className="absolute left-1 right-1 rounded-lg px-1.5 py-1 cursor-pointer overflow-hidden flex flex-col justify-center"
                      style={{
                        top: `${top + 2}px`, height: `${height}px`,
                        background: `linear-gradient(to right, ${p.grad})`,
                        border: `1px solid ${p.ring}`, borderLeftWidth: "2px", borderLeftColor: p.border,
                      }}
                    >
                      <p className="text-[10px] font-semibold leading-none truncate" style={{ color: p.text }}>{ev.title}</p>
                      {ev.subtitle && height > 32 && (
                        <p className="text-[9px] truncate mt-0.5 leading-none" style={{ color: p.sub }}>{ev.subtitle}</p>
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
