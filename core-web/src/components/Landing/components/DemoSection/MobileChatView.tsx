import { useEffect, useRef } from "react";

const USER_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=AlexP&backgroundColor=7c3aed";

interface ToolCall {
  label: string;
  duration: string;
}

type MessageItem =
  | { type: "user"; id: number; text: string }
  | { type: "ai"; id: number; text: string; tools?: ToolCall[] };

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
    text: "2 emails need action — Sarah's Q2 roadmap sign-off is due Friday, Jordan sent design review notes.\n\n3 meetings today: Standup 9am, Design Review 11:30, 1:1 with Sarah 2pm. No conflicts.",
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
    text: "Draft:\n\nHi Sarah, direction looks solid. I'll review the full doc and add my sign-off before EOD. Let's align on the agent builder timeline at our 2pm.",
  },
  {
    type: "user",
    id: 5,
    text: "Block 30 min tomorrow for roadmap review.",
  },
  {
    type: "ai",
    id: 6,
    tools: [
      { label: "Check calendar · tomorrow", duration: "0.5s" },
      { label: "Create event · Q2 Roadmap Review", duration: "0.4s" },
    ],
    text: "Done — blocked 9:00–9:30 AM tomorrow. Morning is otherwise clear.",
  },
];

const SUGGESTIONS = ["Summarise emails", "What did I miss?", "Schedule focus time"];

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

function ToolRow({ tool }: { tool: ToolCall }) {
  return (
    <div className="flex items-center gap-1.5">
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#4f4f58", flexShrink: 0 }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <span className="text-[10.5px] font-mono" style={{ color: "#505058" }}>{tool.label}</span>
      <span className="text-[10.5px]" style={{ color: "#3a3a42" }}>{tool.duration}</span>
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
      <div className="flex items-center gap-2.5 px-4 py-3 shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <AICubeIcon />
        <div>
          <span className="text-[13px] font-semibold" style={{ color: "#eaeaeb" }}>Cube AI</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[10px]" style={{ color: "#606066" }}>Connected to email, calendar, projects</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5"
        style={{ scrollbarWidth: "none" }}
      >
        {THREAD.map((item) => {
          if (item.type === "user") {
            return (
              <div key={item.id} className="flex items-end gap-2 flex-row-reverse">
                <UserAvatar />
                <div
                  className="px-3 py-2 rounded-2xl rounded-br-sm text-[12.5px] leading-relaxed max-w-[80%]"
                  style={{ background: "#4f46e5", color: "#fff" }}
                >
                  {item.text}
                </div>
              </div>
            );
          }

          return (
            <div key={item.id} className="flex items-end gap-2">
              <AICubeIcon />
              <div
                className="px-3 py-2.5 rounded-2xl rounded-bl-sm text-[12.5px] leading-relaxed whitespace-pre-line max-w-[80%]"
                style={{
                  background: "#1e1f21",
                  border: "1px solid rgba(255,255,255,0.07)",
                  color: "#c8c8cc",
                }}
              >
                {/* Tool calls inside bubble */}
                {item.tools && item.tools.length > 0 && (
                  <div
                    className="flex flex-col gap-1 mb-2 pb-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {item.tools.map((tool, i) => (
                      <ToolRow key={i} tool={tool} />
                    ))}
                  </div>
                )}
                {item.text}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suggestions + input */}
      <div className="px-4 pb-4 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              className="shrink-0 text-[11px] px-2.5 py-1 rounded-full border border-white/[0.07] hover:border-white/[0.14] hover:text-[#a0a0a6] transition-colors"
              style={{ color: "#606066" }}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl" style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
          <span className="flex-1 text-[12.5px]" style={{ color: "#505056" }}>Message Cube AI...</span>
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
