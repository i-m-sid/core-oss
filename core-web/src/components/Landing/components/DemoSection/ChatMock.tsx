import { useState, useEffect, useRef } from "react";
import {
  CHAT_AVATARS as AVATARS,
  CHAT_THREAD as THREAD,
  CHAT_SUGGESTIONS as SUGGESTIONS,
  ME_AVATAR as USER_AVATAR,
  type ToolCall,
  type MiniCard,
  type MessageItem,
} from "./constantData";

function AICubeIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-[#1a1b1e] border border-white/10 flex items-center justify-center shrink-0 p-1.5">
      <img src="/cube-logo-white.svg" alt="Cube AI" className="w-full h-full object-contain" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-demo-surface">
      <img src={USER_AVATAR} alt="You" className="w-full h-full object-cover" />
    </div>
  );
}

function ToolLine({ tool }: { tool: ToolCall }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#3f3f48", flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[11.5px]" style={{ color: "#46464e" }}>{tool.label}</span>
      <span className="text-demo-xs" style={{ color: "#35353c" }}>{tool.duration}</span>
    </div>
  );
}

function MiniCardItem({ card }: { card: MiniCard }) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-demo-surface">
        <img src={AVATARS[card.avatar]} alt={card.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-demo-sm font-medium truncate" style={{ color: "#c8c8cc" }}>{card.line1}</p>
        <p className="text-demo-xs truncate mt-0.5" style={{ color: "#505058" }}>
          {card.name}{card.line2 ? ` · ${card.line2}` : ""}
        </p>
      </div>
    </div>
  );
}

function CardGroup({ cards }: { cards: MiniCard[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2.5 flex flex-col gap-1.5">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 cursor-pointer w-fit">
        <svg
          width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "#46464e", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-[11.5px]" style={{ color: "#46464e" }}>
          {open ? "Hide" : "Show"} {cards.length} {cards.length === 1 ? "item" : "items"}
        </span>
      </button>
      {open ? (
        <div className="flex flex-col gap-1.5">
          {cards.map((card, i) => <MiniCardItem key={i} card={card} />)}
        </div>
      ) : (
        <div className="opacity-60 pointer-events-none">
          <MiniCardItem card={cards[0]} />
        </div>
      )}
    </div>
  );
}

export default function AIChatMock() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0">

      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <AICubeIcon />
          <div>
            <span className="text-demo-md font-semibold" style={{ color: "#eaeaeb" }}>Cube AI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-demo-xs" style={{ color: "#505056" }}>Connected to email, calendar, projects</span>
            </div>
          </div>
        </div>
        <button className="cursor-pointer transition-colors" style={{ color: "#505056" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="mx-auto py-5 flex flex-col gap-5" style={{ width: "65%" }}>
          {(THREAD as MessageItem[]).map((item) => {
            if (item.type === "user") {
              return (
                <div key={item.id} className="flex items-end gap-2.5 justify-end">
                  <div
                    className="px-3.5 py-2 text-demo-md leading-relaxed rounded-2xl rounded-br-sm"
                    style={{ background: "#4f46e5", color: "#fff", maxWidth: "80%" }}
                  >
                    {item.text}
                  </div>
                  <UserAvatar />
                </div>
              );
            }
            return (
              <div key={item.id} className="flex flex-col gap-1.5">
                {item.tools.map((tool, i) => <ToolLine key={i} tool={tool} />)}
                <div className="flex gap-2.5 items-start">
                  <AICubeIcon />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-demo-md leading-relaxed whitespace-pre-line" style={{ color: "#c8c8cc" }}>
                      {item.text}
                    </p>
                    {item.cards && item.cards.length > 0 && <CardGroup cards={item.cards} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom — suggestions + input */}
      <div className="pb-5 pt-3 shrink-0 flex flex-col gap-2.5" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mx-auto flex flex-col gap-2.5" style={{ width: "65%" }}>
          <div className="flex items-center gap-1.5">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                className="shrink-0 text-[11.5px] px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                style={{ color: "#505056", border: "1px solid rgba(255,255,255,0.07)" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#a0a0a6";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.14)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "#505056";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            <span className="flex-1 text-demo-md" style={{ color: "#404046" }}>Message Cube AI...</span>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer transition-colors" style={{ color: "#404046" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                </svg>
              </button>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                style={{ background: "#4f46e5" }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
