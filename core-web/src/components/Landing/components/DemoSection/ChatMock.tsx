import { useState, useEffect, useRef } from "react";

const USER_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=AlexP&backgroundColor=7c3aed";

// ── avatars matching the EmailMock / InboxMock cast ──────────────────────────
const AVATARS: Record<string, string> = {
  Sarah:  "https://api.dicebear.com/9.x/notionists/svg?seed=SarahC&backgroundColor=f59e0b",
  Jordan: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanR&backgroundColor=0ea5e9",
  Casey:  "https://api.dicebear.com/9.x/notionists/svg?seed=CaseyM&backgroundColor=0f766e",
};

// ── types ─────────────────────────────────────────────────────────────────────
interface ToolCall {
  label: string;
  duration: string;
}

interface MiniCard {
  avatar: string;       // key in AVATARS
  name: string;
  line1: string;
  line2?: string;
}

type AIMessage = {
  type: "ai";
  id: number;
  tools: ToolCall[];
  text: string;
  cards?: MiniCard[];
};

type UserMessage = {
  type: "user";
  id: number;
  text: string;
};

type MessageItem = UserMessage | AIMessage;

// ── thread data ───────────────────────────────────────────────────────────────
const THREAD: MessageItem[] = [
  {
    type: "user",
    id: 1,
    text: "What do I need to handle today?",
  },
  {
    type: "ai",
    id: 2,
    tools: [
      { label: "Read inbox", duration: "0.8s" },
      { label: "Read calendar", duration: "0.6s" },
    ],
    text: "Here's your briefing — 2 emails need action and you have 3 meetings today with no conflicts.",
    cards: [
      { avatar: "Sarah",  name: "Sarah Chen",   line1: "Q2 roadmap — need your sign-off by Friday", line2: "Sign-off due Friday EOD" },
      { avatar: "Jordan", name: "Jordan Rivera", line1: "Design review notes — action items inside",  line2: "3 items to action" },
      { avatar: "Casey",  name: "Casey Morgan",  line1: "Flagged z-index bug on mobile in #engineering" },
    ],
  },
  {
    type: "user",
    id: 3,
    text: "Draft a reply to Sarah's roadmap email.",
  },
  {
    type: "ai",
    id: 4,
    tools: [
      { label: "Read email · sarah_q2_roadmap", duration: "0.9s" },
    ],
    text: "Here's a draft reply:\n\nHi Sarah, thanks for putting this together — direction looks solid. I'll review the full doc and add my sign-off before EOD. Let's align on the agent builder timeline at our 2pm if needed.",
    cards: [
      { avatar: "Sarah", name: "Sarah Chen", line1: "Q2 roadmap — need your sign-off by Friday", line2: "1h ago · unread" },
    ],
  },
  {
    type: "user",
    id: 5,
    text: "Block 30 min tomorrow morning for roadmap review.",
  },
  {
    type: "ai",
    id: 6,
    tools: [
      { label: "Check calendar · tomorrow", duration: "0.5s" },
      { label: "Create event · Q2 Roadmap Review", duration: "0.4s" },
    ],
    text: "Done — \"Q2 Roadmap Review\" blocked 9:00–9:30 AM tomorrow. Your morning is otherwise clear.",
  },
];

const SUGGESTIONS = [
  "Summarise all unread emails",
  "What did I miss this week?",
  "Schedule focus time",
];

// ── sub-components ────────────────────────────────────────────────────────────

function AICubeIcon() {
  return (
    <div className="w-7 h-7 rounded-full bg-[#1a1b1e] border border-white/[0.1] flex items-center justify-center shrink-0 p-1.5">
      <img src="/cube-logo-white.svg" alt="Cube AI" className="w-full h-full object-contain" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e]">
      <img src={USER_AVATAR} alt="You" className="w-full h-full object-cover" />
    </div>
  );
}

// Standalone tool-call line — sits ABOVE the AI response, outside any bubble
function ToolLine({ tool }: { tool: ToolCall }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#3f3f48", flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
      <span className="text-[11.5px]" style={{ color: "#46464e" }}>{tool.label}</span>
      <span className="text-[11px]" style={{ color: "#35353c" }}>{tool.duration}</span>
    </div>
  );
}

// Collapsible mini-card showing an email / message item with dicebear avatar
function MiniCardItem({ card }: { card: MiniCard }) {
  return (
    <div
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e]">
        <img src={AVATARS[card.avatar]} alt={card.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] font-medium truncate" style={{ color: "#c8c8cc" }}>{card.line1}</p>
        {card.line2 && (
          <p className="text-[11px] truncate mt-0.5" style={{ color: "#505058" }}>{card.name} · {card.line2}</p>
        )}
        {!card.line2 && (
          <p className="text-[11px] truncate mt-0.5" style={{ color: "#505058" }}>{card.name}</p>
        )}
      </div>
    </div>
  );
}

// Collapsible card group — collapsed by default, click to expand
function CardGroup({ cards }: { cards: MiniCard[] }) {
  const [open, setOpen] = useState(false);
  const preview = cards[0];

  return (
    <div className="mt-2.5 flex flex-col gap-1.5">
      {/* Toggle row */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 cursor-pointer w-fit"
      >
        <svg
          width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "#46464e", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <span className="text-[11.5px]" style={{ color: "#46464e" }}>
          {open ? "Hide" : `Show`} {cards.length} {cards.length === 1 ? "item" : "items"}
        </span>
      </button>

      {/* Cards */}
      {open ? (
        <div className="flex flex-col gap-1.5">
          {cards.map((card, i) => <MiniCardItem key={i} card={card} />)}
        </div>
      ) : (
        /* Collapsed preview — just the first card dimmed */
        <div className="opacity-60 pointer-events-none">
          <MiniCardItem card={preview} />
        </div>
      )}
    </div>
  );
}

// ── main component ────────────────────────────────────────────────────────────
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
            <span className="text-[13px] font-semibold" style={{ color: "#eaeaeb" }}>Cube AI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px]" style={{ color: "#505056" }}>Connected to email, calendar, projects</span>
            </div>
          </div>
        </div>
        <button className="cursor-pointer transition-colors" style={{ color: "#505056" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
          </svg>
        </button>
      </div>

      {/* Messages — 65% width column centered */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="mx-auto py-5 flex flex-col gap-5" style={{ width: "65%" }}>
          {THREAD.map((item) => {

            if (item.type === "user") {
              return (
                <div key={item.id} className="flex items-end gap-2.5 justify-end">
                  <div
                    className="px-3.5 py-2 text-[13px] leading-relaxed rounded-2xl rounded-br-sm"
                    style={{ background: "#4f46e5", color: "#fff", maxWidth: "80%" }}
                  >
                    {item.text}
                  </div>
                  <UserAvatar />
                </div>
              );
            }

            // AI message
            return (
              <div key={item.id} className="flex flex-col gap-1.5">

                {/* Tool call lines — standalone, above response */}
                {item.tools.map((tool, i) => (
                  <ToolLine key={i} tool={tool} />
                ))}

                {/* AI response — no bubble, just text + cards */}
                <div className="flex gap-2.5 items-start">
                  <AICubeIcon />
                  <div className="flex-1 min-w-0 pt-0.5">
                    <p className="text-[13px] leading-relaxed whitespace-pre-line" style={{ color: "#c8c8cc" }}>
                      {item.text}
                    </p>
                    {item.cards && item.cards.length > 0 && (
                      <CardGroup cards={item.cards} />
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom — suggestions + input */}
      <div
        className="pb-5 pt-3 shrink-0 flex flex-col gap-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="mx-auto flex flex-col gap-2.5" style={{ width: "65%" }}>
          {/* Suggestion chips */}
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

          {/* Input */}
          <div
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
          >
            <span className="flex-1 text-[13px]" style={{ color: "#404046" }}>Message Cube AI...</span>
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
