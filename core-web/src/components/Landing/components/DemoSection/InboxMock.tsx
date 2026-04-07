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
  Jordan: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanR&backgroundColor=0ea5e9",
  Casey:  "https://api.dicebear.com/9.x/notionists/svg?seed=CaseyM&backgroundColor=0f766e",
  Sarah:  "https://api.dicebear.com/9.x/notionists/svg?seed=SarahC&backgroundColor=f59e0b",
  You:    "https://api.dicebear.com/9.x/notionists/svg?seed=AlexP&backgroundColor=7c3aed",
};

interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
}

const CHANNEL_MESSAGES: Record<string, ChatMsg[]> = {
  product: [
    { id: 0, sender: "Sarah",  text: "Q2 roadmap doc is ready for final review — I need sign-off by Friday EOD.", time: "1h" },
    { id: 1, sender: "Jordan", text: "Design section looks solid. Just added the updated specs to the doc.", time: "55m" },
    { id: 2, sender: "You",    text: "Reading through it now. Will leave comments by EOD.", time: "40m" },
    { id: 3, sender: "Casey",  text: "Engineering estimates are locked in. No blockers on our end.", time: "30m" },
    { id: 4, sender: "You",    text: "Great. Sending my sign-off to Sarah tonight.", time: "10m" },
  ],
  design: [
    { id: 0, sender: "Jordan", text: "Handoff package is uploaded to Figma — all tokens are exported.", time: "3h" },
    { id: 1, sender: "You",    text: "Looked through it. Component library looks super clean.", time: "2h" },
    { id: 2, sender: "Jordan", text: "Thanks! The new card system should cut dev time significantly.", time: "1h" },
    { id: 3, sender: "Casey",  text: "Already importing the tokens — this is going to speed things up.", time: "45m" },
    { id: 4, sender: "You",    text: "Let's do a walkthrough Thursday before we start implementation.", time: "20m" },
  ],
  engineering: [
    { id: 0, sender: "Casey",  text: "PR #61 is approved by both reviewers — ready to merge.", time: "2h" },
    { id: 1, sender: "You",    text: "On it. Checking the auth edge case you flagged first.", time: "1h" },
    { id: 2, sender: "Casey",  text: "It's minor — just a null check missing on the callback.", time: "55m" },
    { id: 3, sender: "You",    text: "Fixed and pushed. Go ahead and merge.", time: "30m" },
    { id: 4, sender: "Casey",  text: "Merged and deployed to staging ✅", time: "15m" },
  ],
  general: [
    { id: 0, sender: "Sarah",  text: "Welcome to the new workspace! Pinned the onboarding doc in #product.", time: "1d" },
    { id: 1, sender: "Jordan", text: "Love the new sidebar. Really clean.", time: "20h" },
    { id: 2, sender: "Casey",  text: "Glad we finally moved off the old tool 🎉", time: "18h" },
    { id: 3, sender: "You",    text: "More updates coming — stay tuned.", time: "16h" },
  ],
  random: [
    { id: 0, sender: "Casey",  text: "Anyone else's coffee maker broken today or just mine 😭", time: "3h" },
    { id: 1, sender: "Jordan", text: "Solidarity. I've been on tea all morning.", time: "2h" },
    { id: 2, sender: "You",    text: "Cold brew from the corner place — never looking back.", time: "1h" },
  ],
};

const DM_MESSAGES: Record<string, ChatMsg[]> = {
  jordan: [
    { id: 0, sender: "Jordan", text: "Hey! Sent over the design handoff — lmk if anything needs clarification.", time: "3h" },
    { id: 1, sender: "You",    text: "Looks great! The new card system is exactly what we needed.", time: "2h" },
    { id: 2, sender: "Jordan", text: "Glad it landed well. I'll be around for questions during implementation.", time: "1h" },
    { id: 3, sender: "You",    text: "Can we do a quick walkthrough Thursday?", time: "45m" },
    { id: 4, sender: "Jordan", text: "Thursday works — I'll send a calendar invite.", time: "30m" },
  ],
  casey: [
    { id: 0, sender: "Casey",  text: "PR #61 is ready. Both reviewers approved — just waiting on you.", time: "2h" },
    { id: 1, sender: "You",    text: "On it. Checking the auth edge case you flagged first.", time: "1h" },
    { id: 2, sender: "Casey",  text: "It's minor — just a null check missing on the callback.", time: "55m" },
    { id: 3, sender: "You",    text: "Fixed. Merging now 🎉", time: "30m" },
    { id: 4, sender: "Casey",  text: "Deployed to staging — everything looks clean.", time: "15m" },
  ],
  sarah: [
    { id: 0, sender: "Sarah",  text: "Hey — just a heads up, I need your sign-off on the Q2 roadmap by Friday EOD.", time: "1h" },
    { id: 1, sender: "You",    text: "On it. Reading through the doc now.", time: "50m" },
    { id: 2, sender: "Sarah",  text: "Thanks! Let me know if you have questions on the agent builder timeline.", time: "40m" },
    { id: 3, sender: "You",    text: "Will do. I'll send my sign-off by tonight.", time: "10m" },
  ],
};

const CHANNELS = [
  { id: "product",     label: "product",     unread: 2 },
  { id: "design",      label: "design",      unread: 0 },
  { id: "engineering", label: "engineering", unread: 1 },
  { id: "general",     label: "general",     unread: 0 },
  { id: "random",      label: "random",      unread: 0 },
];

const DMS = [
  { id: "jordan", label: "Jordan Rivera", sender: "Jordan", online: true  },
  { id: "casey",  label: "Casey Morgan",  sender: "Casey",  online: true  },
  { id: "sarah",  label: "Sarah Chen",    sender: "Sarah",  online: false },
];

export default function InboxMock() {
  const [activeChannel, setActiveChannel] = useState("product");
  const [extraMessages, setExtraMessages] = useState<Record<string, ChatMsg[]>>({});
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isDM         = DMS.some(d => d.id === activeChannel);
  const baseMessages = isDM
    ? (DM_MESSAGES[activeChannel] ?? [])
    : (CHANNEL_MESSAGES[activeChannel] ?? []);
  const messages = [...baseMessages, ...(extraMessages[activeChannel] ?? [])];

  const activeDM     = DMS.find(d => d.id === activeChannel);
  const channelLabel = isDM ? activeDM!.label : `#${activeChannel}`;



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

      {/* Left pane */}
      <div
        className="w-[290px] shrink-0 flex flex-col overflow-hidden"
        style={{ background: BG, borderRight: `1px solid ${BORDER}` }}
      >
        <div className="px-5 py-3.5 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <span className="text-[15px] font-semibold" style={{ color: T_PRI }}>Cube</span>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <div className="px-5 pt-2 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T_DIM }}>Channels</span>
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

          <div className="px-5 pt-5 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: T_DIM }}>Direct Messages</span>
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

      {/* Right pane */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ background: BG2 }}>
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

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {messages.map((msg, i) => {
            const isMe     = msg.sender === ME;
            const prevMsg  = messages[i - 1];
            const prevSame = prevMsg && prevMsg.sender === msg.sender;
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""} ${prevSame ? "mt-1" : "mt-4"}`}
              >
                <div className="w-8 h-8 shrink-0">
                  {!prevSame && (
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#2a2a2e]">
                      <img src={AVATARS[msg.sender]} alt={msg.sender} className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
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
          <div ref={messagesEndRef} />
        </div>

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
