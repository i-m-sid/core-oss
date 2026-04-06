import { useState, useRef, useEffect } from "react";

const BG     = "#111213";
const BG2    = "#121314";
const BORDER = "rgba(255,255,255,0.06)";
const T_PRI  = "#e8e8ea";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#505056";
const ACTIVE = "rgba(255,255,255,0.08)";
const HOVER  = "rgba(255,255,255,0.04)";

// Logged-in user — the viewer
const ME = "You";

const AVATARS: Record<string, string> = {
  Siddhant: "https://api.dicebear.com/9.x/notionists/svg?seed=Siddhant&backgroundColor=0ea5e9",
  Meet:     "https://api.dicebear.com/9.x/notionists/svg?seed=MeetK&backgroundColor=0f766e",
  Abhi:     "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed",
  You:      "https://api.dicebear.com/9.x/notionists/svg?seed=YouUser&backgroundColor=7c3aed",
};

interface ChatMsg {
  id: number;
  sender: string; // always matches a key in AVATARS
  text: string;
  time: string;
}

// Group channels — Abhi is one of the participants
const CHANNEL_MESSAGES: Record<string, ChatMsg[]> = {
  general: [
    { id: 0, sender: "Siddhant", text: "Pushed the new onboarding flow to staging — looks clean 🎉", time: "9m" },
    { id: 1, sender: "Meet",     text: "Nice! Checked it on mobile too, feels smooth.", time: "8m" },
    { id: 2, sender: "You",     text: "Great work. Let's keep this momentum for v1.2.", time: "6m" },
    { id: 3, sender: "Siddhant", text: "Anyone free for a quick review call before we push to prod?", time: "4m" },
    { id: 4, sender: "Meet",     text: "I'm free after 4pm 👍", time: "3m" },
    { id: 5, sender: "You",     text: "Works for me. Setting up a Huddle at 4.", time: "1m" },
  ],
  design: [
    { id: 0, sender: "Siddhant", text: "Updated the empty states — check Figma for the latest version.", time: "2h" },
    { id: 1, sender: "You",     text: "Dashboard header spacing looks tight now, good call.", time: "1h" },
    { id: 2, sender: "Siddhant", text: "Onboarding illustrations are next on my list.", time: "45m" },
    { id: 3, sender: "Meet",     text: "Lmk when they're ready, I'll review before handoff.", time: "30m" },
    { id: 4, sender: "You",     text: "Let's target handoff by end of week.", time: "20m" },
  ],
  engineering: [
    { id: 0, sender: "You",     text: "Build is stable, QA signed off this morning ✅", time: "5h" },
    { id: 1, sender: "Meet",     text: "There's a z-index issue on mobile in the hero — clipped on Safari.", time: "3h" },
    { id: 2, sender: "You",     text: "I'll take a look before merge. Good catch.", time: "2h" },
    { id: 3, sender: "Meet",     text: "PR is approved btw — both reviewers signed off.", time: "1h" },
    { id: 4, sender: "Siddhant", text: "Merging once the z-index is sorted 🚀", time: "30m" },
    { id: 5, sender: "You",     text: "Fixed. Go ahead and merge.", time: "10m" },
  ],
  launches: [
    { id: 0, sender: "You",     text: "v1.2 launch plan is locked — see Notion for the checklist.", time: "1d" },
    { id: 1, sender: "Siddhant", text: "Design assets will be merged by Sunday EOD.", time: "20h" },
    { id: 2, sender: "Meet",     text: "Engineering is green. Ready when you are.", time: "18h" },
    { id: 3, sender: "You",     text: "Shipping Wednesday 🎯 Let's go.", time: "16h" },
  ],
  random: [
    { id: 0, sender: "Meet",     text: "Anyone tried Ideavo? The one-click publish is genuinely insane 🚀", time: "2d" },
    { id: 1, sender: "Siddhant", text: "Yeah I built a full app in like 10 mins yesterday lol", time: "2d" },
    { id: 2, sender: "You",     text: "We should use it for the internal tools we keep putting off 👀", time: "1d" },
  ],
};

// DMs — always a conversation between Abhi (me) and one other person
const DM_MESSAGES: Record<string, ChatMsg[]> = {
  siddhant: [
    { id: 0, sender: "Siddhant", text: "Hey, sent over the design review notes — lmk if anything's unclear.", time: "45m" },
    { id: 1, sender: "You",     text: "Looks good! The empty states section is super helpful.", time: "40m" },
    { id: 2, sender: "Siddhant", text: "Cool. I'll start on the onboarding illustrations today.", time: "38m" },
    { id: 3, sender: "You",     text: "Let's sync Wednesday before you hand off?", time: "35m" },
    { id: 4, sender: "Siddhant", text: "Wednesday works. I'll send a cal invite.", time: "30m" },
  ],
  meet: [
    { id: 0, sender: "Meet",     text: "PR #48 is approved and ready to merge whenever you are.", time: "3h" },
    { id: 1, sender: "You",     text: "Nice! I'll check the z-index comment first then merge.", time: "2h" },
    { id: 2, sender: "Meet",     text: "Yeah that one's minor — just a Safari clip, easy fix.", time: "2h" },
    { id: 3, sender: "You",     text: "Fixed. Merging now 🎉", time: "1h" },
    { id: 4, sender: "Meet",     text: "Let's gooo 🚀", time: "55m" },
  ],
  abhi: [
    { id: 0, sender: "Abhi", text: "Hey! Can you review the copy for the pricing page?", time: "3h" },
    { id: 1, sender: "You",  text: "Sure, sending feedback shortly.", time: "2h" },
    { id: 2, sender: "Abhi", text: "No rush — whenever you get a chance 🙏", time: "2h" },
    { id: 3, sender: "You",  text: "Left comments in the doc. Looks great overall!", time: "1h" },
    { id: 4, sender: "Abhi", text: "Perfect, updating now. Thanks!", time: "45m" },
  ],
};

const CHANNELS = [
  { id: "general",     label: "general",     unread: 2 },
  { id: "design",      label: "design",      unread: 0 },
  { id: "engineering", label: "engineering", unread: 1 },
  { id: "launches",    label: "launches",    unread: 0 },
  { id: "random",      label: "random",      unread: 0 },
];

const DMS = [
  { id: "siddhant", label: "Siddhant Chaudry", sender: "Siddhant", online: true  },
  { id: "meet",     label: "Meet Kotadiya",    sender: "Meet",     online: true  },
  { id: "abhi",     label: "Abhi Sharma",       sender: "Abhi",    online: true  },
];

export default function InboxView() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [extraMessages, setExtraMessages] = useState<Record<string, ChatMsg[]>>({});
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDM     = DMS.some(d => d.id === activeChannel);
  const baseMessages = isDM
    ? (DM_MESSAGES[activeChannel] ?? [])
    : (CHANNEL_MESSAGES[activeChannel] ?? []);
  const messages = [...baseMessages, ...(extraMessages[activeChannel] ?? [])];

  const activeDM     = DMS.find(d => d.id === activeChannel);
  const channelLabel = isDM ? activeDM!.label : `#${activeChannel}`;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, activeChannel]);

  const handleSend = () => {
    const text = inputValue.trim();
    if (!text) return;
    const prev = extraMessages[activeChannel] ?? [];
    setExtraMessages(em => ({
      ...em,
      [activeChannel]: [...prev, {
        id: baseMessages.length + prev.length,
        sender: ME,
        text,
        time: "now",
      }],
    }));
    setInputValue("");
  };

  return (
    <div className="flex h-full w-full overflow-hidden">

      {/* ── Left pane ── */}
      <div
        className="w-[290px] shrink-0 flex flex-col overflow-hidden"
        style={{ background: BG, borderRight: `1px solid ${BORDER}` }}
      >
        <div className="px-5 py-3.5 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <span className="text-[15px] font-semibold" style={{ color: T_PRI }}>Ideavo</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {/* Channels */}
          <div className="px-5 pt-2 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T_DIM }}>
              Channels
            </span>
          </div>
          {CHANNELS.map(ch => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className="w-full flex items-center gap-2.5 text-left transition-colors cursor-pointer"
              style={{
                padding: "7px 16px",
                background: activeChannel === ch.id ? ACTIVE : "transparent",
                color: activeChannel === ch.id ? T_PRI : ch.unread ? T_SEC : T_DIM,
                fontWeight: ch.unread ? 500 : 400,
              }}
              onMouseEnter={e => { if (activeChannel !== ch.id) e.currentTarget.style.background = HOVER; }}
              onMouseLeave={e => { if (activeChannel !== ch.id) e.currentTarget.style.background = "transparent"; }}
            >
              <span className="text-[15px] shrink-0" style={{ color: T_DIM }}>#</span>
              <span className="text-[15px] flex-1 truncate">{ch.label}</span>
              {ch.unread > 0 && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
            </button>
          ))}

          {/* DMs */}
          <div className="px-5 pt-5 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T_DIM }}>
              Direct Messages
            </span>
          </div>
          {DMS.map(dm => (
            <button
              key={dm.id}
              onClick={() => setActiveChannel(dm.id)}
              className="w-full flex items-center gap-3 text-left transition-colors cursor-pointer"
              style={{
                padding: "7px 16px",
                background: activeChannel === dm.id ? ACTIVE : "transparent",
                color: activeChannel === dm.id ? T_PRI : T_DIM,
              }}
              onMouseEnter={e => { if (activeChannel !== dm.id) e.currentTarget.style.background = HOVER; }}
              onMouseLeave={e => { if (activeChannel !== dm.id) e.currentTarget.style.background = "transparent"; }}
            >
              <div className="relative shrink-0">
                <div className="w-6 h-6 rounded-full overflow-hidden bg-[#2a2a2e]">
                  <img src={AVATARS[dm.sender]} alt={dm.label} className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-[#111213]"
                  style={{ background: dm.online ? "#22c55e" : "#3f3f46" }}
                />
              </div>
              <span className="text-[15px] flex-1 truncate">{dm.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Right pane: chat ── */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: BG2 }}>
        {/* Header */}
        <div
          className="px-5 py-3 shrink-0 flex items-center gap-2"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          {isDM ? (
            <>
              <div className="w-5 h-5 rounded-full overflow-hidden bg-[#2a2a2e] shrink-0">
                <img src={AVATARS[activeDM!.sender]} alt={channelLabel} className="w-full h-full object-cover" />
              </div>
              <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>{channelLabel}</span>
            </>
          ) : (
            <>
              <span className="text-[15px]" style={{ color: T_DIM }}>#</span>
              <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>{activeChannel}</span>
            </>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {messages.map((msg, i) => {
            const isMe    = msg.sender === ME;
            const prevMsg = messages[i - 1];
            const prevSame = prevMsg && prevMsg.sender === msg.sender;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""} ${prevSame ? "mt-1" : "mt-4"}`}
              >
                {/* Avatar spacer — always reserve width, only show img on first in group */}
                <div className="w-8 h-8 shrink-0">
                  {!prevSame && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2a2a2e]">
                      <img src={AVATARS[msg.sender]} alt={msg.sender} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`max-w-[68%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                  {!prevSame && (
                    <div className={`flex items-baseline gap-2 mb-1 ${isMe ? "flex-row-reverse" : ""}`}>
                      <span className="text-[12.5px] font-semibold" style={{ color: T_PRI }}>
                        {isMe ? "You" : msg.sender}
                      </span>
                      <span className="text-[11px]" style={{ color: T_DIM }}>{msg.time} ago</span>
                    </div>
                  )}
                  <div
                    className="px-3.5 py-2 text-[13.5px] leading-snug"
                    style={{
                      background: isMe ? "#4f46e5" : "rgba(255,255,255,0.07)",
                      color: isMe ? "#fff" : T_SEC,
                      borderRadius: isMe ? "18px 4px 18px 18px" : "4px 18px 18px 18px",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-5 pb-5 shrink-0">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
          >
            <input
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:opacity-60"
              style={{ color: T_PRI }}
              placeholder={`Message ${channelLabel}...`}
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            />
            <button
              onClick={handleSend}
              className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors shrink-0"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
