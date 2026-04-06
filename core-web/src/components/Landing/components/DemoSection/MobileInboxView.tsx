import { useState, useRef, useEffect } from "react";

const BG     = "#111213";
const BG2    = "#121314";
const BORDER = "rgba(255,255,255,0.06)";
const T_PRI  = "#e8e8ea";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#505056";
const ACTIVE = "rgba(255,255,255,0.08)";
const HOVER  = "rgba(255,255,255,0.04)";

const ME = "You";

const AVATARS: Record<string, string> = {
  Siddhant: "https://api.dicebear.com/9.x/notionists/svg?seed=Siddhant&backgroundColor=0ea5e9",
  Meet:     "https://api.dicebear.com/9.x/notionists/svg?seed=MeetK&backgroundColor=0f766e",
  Abhi:     "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed",
  You:      "https://api.dicebear.com/9.x/notionists/svg?seed=YouUser&backgroundColor=7c3aed",
};

interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
}

const CHANNEL_MESSAGES: Record<string, ChatMsg[]> = {
  general: [
    { id: 0, sender: "Siddhant", text: "Pushed the new onboarding flow to staging — looks clean 🎉", time: "9m" },
    { id: 1, sender: "Meet",     text: "Nice! Checked it on mobile too, feels smooth.", time: "8m" },
    { id: 2, sender: "You",      text: "Great work. Let's keep this momentum for v1.2.", time: "6m" },
    { id: 3, sender: "Siddhant", text: "Anyone free for a quick review call before we push to prod?", time: "4m" },
    { id: 4, sender: "Meet",     text: "I'm free after 4pm 👍", time: "3m" },
    { id: 5, sender: "You",      text: "Works for me. Setting up a Huddle at 4.", time: "1m" },
  ],
  design: [
    { id: 0, sender: "Siddhant", text: "Updated the empty states — check Figma for the latest version.", time: "2h" },
    { id: 1, sender: "You",      text: "Dashboard header spacing looks tight now, good call.", time: "1h" },
    { id: 2, sender: "Siddhant", text: "Onboarding illustrations are next on my list.", time: "45m" },
    { id: 3, sender: "Meet",     text: "Lmk when they're ready, I'll review before handoff.", time: "30m" },
    { id: 4, sender: "You",      text: "Let's target handoff by end of week.", time: "20m" },
  ],
  engineering: [
    { id: 0, sender: "You",      text: "Build is stable, QA signed off this morning ✅", time: "5h" },
    { id: 1, sender: "Meet",     text: "There's a z-index issue on mobile in the hero — clipped on Safari.", time: "3h" },
    { id: 2, sender: "You",      text: "I'll take a look before merge. Good catch.", time: "2h" },
    { id: 3, sender: "Meet",     text: "PR is approved btw — both reviewers signed off.", time: "1h" },
    { id: 4, sender: "Siddhant", text: "Merging once the z-index is sorted 🚀", time: "30m" },
    { id: 5, sender: "You",      text: "Fixed. Go ahead and merge.", time: "10m" },
  ],
};

const CHANNELS = [
  { id: "general",     label: "general",     unread: 2 },
  { id: "design",      label: "design",      unread: 0 },
  { id: "engineering", label: "engineering", unread: 1 },
];

// ── Sub-views ─────────────────────────────────────────────────────────────────

function ChannelList({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: BG }}>
      {/* Header */}
      <div className="px-4 py-3 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>Inbox</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-4 pt-2 pb-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: T_DIM }}>
            Channels
          </span>
        </div>
        {CHANNELS.map(ch => (
          <button
            key={ch.id}
            onClick={() => onSelect(ch.id)}
            className="w-full flex items-center gap-2.5 text-left transition-colors cursor-pointer"
            style={{
              padding: "9px 16px",
              background: active === ch.id ? ACTIVE : "transparent",
              color: active === ch.id ? T_PRI : ch.unread ? T_SEC : T_DIM,
              fontWeight: ch.unread ? 500 : 400,
            }}
            onMouseEnter={e => { if (active !== ch.id) e.currentTarget.style.background = HOVER; }}
            onMouseLeave={e => { if (active !== ch.id) e.currentTarget.style.background = "transparent"; }}
          >
            <span className="text-[14px] shrink-0" style={{ color: T_DIM }}>#</span>
            <span className="text-[14px] flex-1 truncate">{ch.label}</span>
            {ch.unread > 0 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatPane({
  channelId,
  onBack,
}: {
  channelId: string;
  onBack: () => void;
}) {
  const [extraMessages, setExtraMessages] = useState<ChatMsg[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const baseMessages = CHANNEL_MESSAGES[channelId] ?? [];
  const messages = [...baseMessages, ...extraMessages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, channelId]);

  // Reset extra messages when channel changes
  useEffect(() => {
    setExtraMessages([]);
    setInputValue("");
  }, [channelId]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    setExtraMessages(prev => [...prev, {
      id: baseMessages.length + prev.length,
      sender: ME,
      text,
      time: "now",
    }]);
    setInputValue("");
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: BG2 }}>
      {/* Header with back button */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-2"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <button
          onClick={onBack}
          className="cursor-pointer p-1 -ml-1 rounded transition-colors"
          style={{ color: T_DIM }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <span className="text-[13px]" style={{ color: T_DIM }}>#</span>
        <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>{channelId}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((msg, i) => {
          const isMe     = msg.sender === ME;
          const prevSame = i > 0 && messages[i - 1].sender === msg.sender;

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${isMe ? "flex-row-reverse" : ""} ${prevSame ? "mt-1" : "mt-3.5"}`}
            >
              {/* Avatar slot */}
              <div className="w-7 h-7 shrink-0">
                {!prevSame && (
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-[#2a2a2e]">
                    <img src={AVATARS[msg.sender]} alt={msg.sender} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className={`max-w-[72%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                {!prevSame && (
                  <div className={`flex items-baseline gap-1.5 mb-1 ${isMe ? "flex-row-reverse" : ""}`}>
                    <span className="text-[11.5px] font-semibold" style={{ color: T_PRI }}>
                      {isMe ? "You" : msg.sender}
                    </span>
                    <span className="text-[10px]" style={{ color: T_DIM }}>{msg.time} ago</span>
                  </div>
                )}
                <div
                  className="px-3 py-2 text-[12.5px] leading-snug"
                  style={{
                    background: isMe ? "#4f46e5" : "rgba(255,255,255,0.07)",
                    color: isMe ? "#fff" : T_SEC,
                    borderRadius: isMe ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 shrink-0">
        <div
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl"
          style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
        >
          <input
            className="flex-1 bg-transparent text-[13px] outline-none placeholder:opacity-50"
            style={{ color: T_PRI }}
            placeholder={`Message #${channelId}...`}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          />
          <button
            onClick={handleSend}
            className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors shrink-0"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function MobileInboxView() {
  const [activeChannel, setActiveChannel] = useState<string | null>(null);

  if (activeChannel) {
    return (
      <div className="flex flex-col h-full">
        <ChatPane channelId={activeChannel} onBack={() => setActiveChannel(null)} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChannelList active="" onSelect={setActiveChannel} />
    </div>
  );
}
