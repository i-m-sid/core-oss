import { useState } from "react";
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
    <div className="w-6 h-6 rounded-full bg-[#1a1b1e] border border-white/10 flex items-center justify-center shrink-0 p-1">
      <img src="/cube-logo-white.svg" alt="Cube AI" className="w-full h-full object-contain" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-demo-surface">
      <img src={USER_AVATAR} alt="You" className="w-full h-full object-cover" />
    </div>
  );
}

function ToolLine({ tool }: { tool: ToolCall }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#3f3f48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[10px] text-[#46464e]">{tool.label}</span>
      <span className="text-[10px] text-[#35353c]">{tool.duration}</span>
    </div>
  );
}

function MiniCardItem({ card }: { card: MiniCard }) {
  return (
    <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/4 border border-white/[0.07]">
      <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 bg-demo-surface">
        <img src={AVATARS[card.avatar]} alt={card.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-demo-xs font-medium truncate text-[#c8c8cc]">{card.line1}</p>
        <p className="text-[10px] truncate mt-0.5 text-[#505058]">{card.name}{card.line2 ? ` · ${card.line2}` : ""}</p>
      </div>
    </div>
  );
}

function CardGroup({ cards }: { cards: MiniCard[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 flex flex-col gap-1">
      <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 cursor-pointer w-fit">
        <svg
          width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#46464e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-[10.5px] text-[#46464e]">{open ? "Hide" : "Show"} {cards.length} {cards.length === 1 ? "item" : "items"}</span>
      </button>
      {open ? (
        <div className="flex flex-col gap-1">
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

export default function MobileChatView() {
  return (
    <div className="flex flex-col h-full min-w-0 bg-[#121314]">

      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 shrink-0 border-b border-white/[0.07]">
        <AICubeIcon />
        <div>
          <span className="text-demo-md font-semibold text-[#eaeaeb]">Cube AI</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-[#606066]">Connected to email, calendar, projects</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4 [scrollbar-width:none]">
        {(THREAD as MessageItem[]).map((item) => {
          if (item.type === "user") {
            return (
              <div key={item.id} className="flex items-end gap-2 justify-end">
                <div className="px-3 py-2 rounded-2xl rounded-br-sm text-demo-sm leading-relaxed bg-[#4f46e5] text-white max-w-[80%]">
                  {item.text}
                </div>
                <UserAvatar />
              </div>
            );
          }
          return (
            <div key={item.id} className="flex flex-col gap-1">
              {item.tools.map((tool, i) => <ToolLine key={i} tool={tool} />)}
              <div className="flex gap-2 items-start">
                <AICubeIcon />
                <div className="flex-1 min-w-0 pt-0.5">
                  <p className="text-demo-sm leading-relaxed whitespace-pre-line text-[#c8c8cc]">{item.text}</p>
                  {item.cards && item.cards.length > 0 && <CardGroup cards={item.cards} />}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions + input */}
      <div className="px-4 pb-4 pt-2 flex flex-col gap-2 shrink-0 border-t border-white/5">
        <div className="flex items-center gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {SUGGESTIONS.map(s => (
            <button key={s} className="shrink-0 text-[10.5px] px-2.5 py-1 rounded-full border border-white/[0.07] hover:border-white/[0.14] text-[#606066] hover:text-[#a0a0a6] transition-colors cursor-pointer">
              {s}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/8 bg-white/3">
          <span className="flex-1 text-demo-sm text-[#505056]">Message Cube AI...</span>
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
}
