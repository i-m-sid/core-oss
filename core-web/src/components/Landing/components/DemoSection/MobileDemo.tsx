import { useState, useEffect } from "react";
import MobileInboxMock from "./MobileInboxMock";
import MobileEmailMock from "./MobileEmailView";
import MobileChatView from "./MobileChatMock";
import MobileCalendarMock from "./MobileCalendarMock";

function useCurrentTime() {
  const fmt = () => {
    const d = new Date();
    const h = d.getHours() % 12 || 12;
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// ── Types ─────────────────────────────────────────────────────────────────────

export type MobileView = "inbox" | "email" | "chat" | "calendar";

// ── Constants ─────────────────────────────────────────────────────────────────

const BG = "#111213";
const BORDER = "rgba(255,255,255,0.06)";
const T_PRI = "#e8e8ea";
const T_DIM = "#505056";

// ── Tab bar config ────────────────────────────────────────────────────────────

interface Tab {
  id: MobileView;
  label: string;
  icon: React.ReactNode;
}

function InboxIcon({ active }: { active: boolean }) {
  const color = active ? "#fff" : T_DIM;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function EmailIcon({ active }: { active: boolean }) {
  const color = active ? "#fff" : T_DIM;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ChatIcon({ active }: { active: boolean }) {
  const color = active ? "#fff" : T_DIM;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 18l-2.09-6.26L4 10l5.91-1.74L12 2z" />
    </svg>
  );
}

function CalendarIcon({ active }: { active: boolean }) {
  const color = active ? "#fff" : T_DIM;
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function renderView(view: MobileView): React.ReactNode {
  switch (view) {
    case "inbox":    return <MobileInboxMock />;
    case "email":    return <MobileEmailMock />;
    case "chat":     return <MobileChatView />;
    case "calendar": return <MobileCalendarMock />;
  }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MobileDemo() {
  const [activeView, setActiveView] = useState<MobileView>("inbox");
  const time = useCurrentTime();

  const tabs: Tab[] = [
    {
      id: "inbox",
      label: "Inbox",
      icon: <InboxIcon active={activeView === "inbox"} />,
    },
    {
      id: "email",
      label: "Email",
      icon: <EmailIcon active={activeView === "email"} />,
    },
    {
      id: "chat",
      label: "AI Chat",
      icon: <ChatIcon active={activeView === "chat"} />,
    },
    {
      id: "calendar",
      label: "Calendar",
      icon: <CalendarIcon active={activeView === "calendar"} />,
    },
  ];

  return (
    <div
      className="relative w-full overflow-hidden font-geist flex flex-col rounded-2xl backdrop-blur-sm bg-[#111213]/75 h-[600px]"
    >
      {/* Status bar */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-2 backdrop-blur-md bg-[#111213]/60 border-b border-white/[0.06]"
      >
        <span className="text-demo-sm font-semibold" style={{ color: T_PRI }}>
          {time}
        </span>
        <div className="flex items-center gap-1.5">
          {/* Signal */}
          <svg width="14" height="10" viewBox="0 0 14 10" fill={T_DIM}>
            <rect x="0" y="6" width="2.5" height="4" rx="0.5" />
            <rect x="3.5" y="4" width="2.5" height="6" rx="0.5" />
            <rect x="7" y="2" width="2.5" height="8" rx="0.5" />
            <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
          </svg>
          {/* WiFi */}
          <svg
            width="14"
            height="10"
            viewBox="0 0 24 18"
            fill="none"
            stroke={T_DIM}
            strokeWidth="2.2"
            strokeLinecap="round"
          >
            <path d="M1 6C5 2 19 2 23 6" />
            <path d="M4.5 10C7.5 7.5 16.5 7.5 19.5 10" />
            <path d="M8 14c2-1.5 6-1.5 8 0" />
            <circle cx="12" cy="17" r="1" fill={T_DIM} stroke="none" />
          </svg>
          {/* Battery */}
          <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="18"
              height="10"
              rx="2"
              stroke={T_DIM}
              strokeWidth="1"
            />
            <rect x="19.5" y="3" width="2" height="5" rx="1" fill={T_DIM} />
            <rect x="2" y="2" width="13" height="7" rx="1" fill={T_DIM} />
          </svg>
        </div>
      </div>

      {/* View area */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {renderView(activeView)}
      </div>

      {/* Bottom tab bar */}
      <div
        className="shrink-0 flex items-stretch"
        style={{ borderTop: `1px solid ${BORDER}`, background: BG }}
      >
        {tabs.map((tab) => {
          const isActive = activeView === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className="relative flex-1 flex flex-col items-center justify-center gap-1 py-2.5 cursor-pointer transition-colors"
              style={{ background: "transparent" }}
            >
              {tab.icon}
              <span
                className="text-[10px] font-medium tracking-wide"
                style={{ color: isActive ? T_PRI : T_DIM }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="absolute bottom-0 h-0.5 w-8 rounded-full"
                  style={{ background: "#6366f1" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
