import { useEffect, useRef } from "react";

// AI Chat view — Linear color palette

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
    text: "You have 3 meetings today:\n• 9:00 AM — Team Standup (30 min)\n• 11:30 AM — Design Review with Liam\n• 2:00 PM — 1:1 with Sarah\n\nNo conflicts. Design Review ends 30 min before your 1:1.",
    time: "2:01 PM",
  },
  {
    id: 3,
    role: "user" as const,
    text: "Draft a reply to Sarah's email about the Q2 roadmap sign-off.",
    time: "2:03 PM",
  },
  {
    id: 4,
    role: "ai" as const,
    text: "Here's a draft reply:\n\nHi Sarah, thanks for putting this together — the direction looks solid. I'll review the full doc before EOD and add my sign-off. Let's align on the agent builder timeline quickly at our 2pm if needed.",
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
    text: "3 unread threads worth flagging:\n• Meet flagged a z-index bug on mobile in #engineering\n• Siddhant posted updated Figma designs in #design\n• Liam asked about the handoff timeline in your DMs",
    time: "2:05 PM",
  },
  {
    id: 7,
    role: "user" as const,
    text: "Move the Onboarding Redesign card to In Progress.",
    time: "2:07 PM",
  },
  {
    id: 8,
    role: "ai" as const,
    text: "Done — \"Onboarding Redesign\" moved to In Progress on the Cube Web board.",
    time: "2:07 PM",
  },
];

const suggestions = [
  "Summarise all unread emails",
  "What did I miss this week?",
  "Schedule focus time tomorrow",
];

function AICubeIcon() {
  return (
    <div className="w-8 h-8 rounded-full bg-[#1a1b1e] border border-white/[0.1] flex items-center justify-center shrink-0 p-1.5">
      <img src="/cube-logo-white.svg" alt="Cube AI" className="w-full h-full object-contain" />
    </div>
  );
}

function UserAvatar() {
  return (
    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e]">
      <img src={USER_AVATAR} alt="You" className="w-full h-full object-cover" />
    </div>
  );
}

export default function ChatView() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-white/[0.07]">
        <div className="flex items-center gap-2">
          <AICubeIcon />
          <div>
            <span className="text-[13px] font-semibold text-[#eaeaeb]">Cube AI</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] text-[#606066]">Connected to email, calendar, projects</span>
            </div>
          </div>
        </div>
        <button className="cursor-pointer text-[#606066] hover:text-[#a0a0a6] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>

      {/* Scrollable messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent">
        <div className="px-[20%] flex flex-col gap-3 pt-4 pb-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 items-end ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              {msg.role === "ai" ? <AICubeIcon /> : <UserAvatar />}

              <div
                className={`px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line max-w-[78%] ${
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
      </div>

      {/* Suggestions + input pinned at bottom */}
      <div className="px-[20%] pb-4 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-hidden">
          {suggestions.map((s) => (
            <button
              key={s}
              className="shrink-0 text-[11.5px] text-[#606066] px-2.5 py-1 rounded-full border border-white/[0.07] hover:border-white/[0.14] hover:text-[#a0a0a6] transition-colors truncate"
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03]">
          <span className="flex-1 text-[13px] text-[#505056]">Message Cube AI...</span>
          <div className="flex items-center gap-2">
            <button className="cursor-pointer text-[#505056] hover:text-[#a0a0a6] transition-colors">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </button>
            <div className="cursor-pointer w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
