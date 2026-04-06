import { useEffect, useRef } from "react";

const USER_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=User42&backgroundColor=7c3aed";

const messages = [
  {
    id: 1,
    role: "user" as const,
    text: "What's on my schedule today and are there any conflicts?",
    time: "2:01 PM",
  },
  {
    id: 2,
    role: "ai" as const,
    text: "You have 3 meetings today:\n• 9:00 AM — Team Standup (30 min)\n• 11:30 AM — Design Review with Liam\n• 2:00 PM — 1:1 with Sarah\n\nNo conflicts detected.",
    time: "2:01 PM",
  },
  {
    id: 3,
    role: "user" as const,
    text: "Draft a reply to Sarah's email about Q2 roadmap sign-off.",
    time: "2:03 PM",
  },
  {
    id: 4,
    role: "ai" as const,
    text: "Draft:\n\nHi Sarah, direction looks solid. I'll review the full doc before EOD and add my sign-off. Let's align on the agent builder timeline at our 2pm if needed.",
    time: "2:03 PM",
  },
  {
    id: 5,
    role: "user" as const,
    text: "Any unread Slack messages I should know about?",
    time: "2:05 PM",
  },
  {
    id: 6,
    role: "ai" as const,
    text: "3 threads worth flagging:\n• Meet flagged a z-index bug in #engineering\n• Siddhant posted updated Figma designs in #design\n• Liam asked about the handoff timeline in DMs",
    time: "2:05 PM",
  },
];

const suggestions = [
  "Summarise emails",
  "What did I miss?",
  "Schedule focus time",
];

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

export default function MobileChatView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-full min-w-0" style={{ background: "#121314" }}>
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07] shrink-0">
        <AICubeIcon />
        <div>
          <span className="text-[13px] font-semibold text-[#eaeaeb]">Cube AI</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px] text-[#606066]">Connected to email, calendar, projects</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-2 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "ai" ? <AICubeIcon /> : <UserAvatar />}
            <div
              className={`px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed whitespace-pre-line max-w-[80%] ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-[#1e1f21] border border-white/[0.07] text-[#c8c8cc] rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions + input */}
      <div className="px-4 pb-4 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {suggestions.map(s => (
            <button
              key={s}
              className="shrink-0 text-[11px] text-[#606066] px-2.5 py-1 rounded-full border border-white/[0.07] hover:border-white/[0.14] hover:text-[#a0a0a6] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <span className="flex-1 text-[12.5px] text-[#505056]">Message Cube AI...</span>
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
