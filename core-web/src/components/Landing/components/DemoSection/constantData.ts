export interface Email {
  id: number;
  sender: string;
  avatar: string;
  subject: string;
  body: string[];
  time: string;
  unread: boolean;
}

export const EMAILS: Email[] = [
  {
    id: 1,
    sender: "IdeavoAI",
    avatar: "https://ideavo.ai/ideavo/logo-light.png",
    subject: "Build complete apps with AI — not just prototypes",
    body: [
      "Hey there 👋",
      "Stop prototyping. Start shipping.",
      "Ideavo lets you build complete, production-ready apps from a single prompt — and publish them in one click. No hand-off, no dev bottleneck, no half-finished Figma files.",
      "What makes it different:\n• Full apps, not wireframes — real code, real features\n• One-click publish — live on the web instantly\n• AI that actually understands your product",
      "Check it out → ideavo.ai",
      "The Ideavo Team",
    ],
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    sender: "Jordan Rivera",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanR&backgroundColor=0ea5e9",
    subject: "Design review notes — action items inside",
    body: [
      "Hey,",
      "Quick recap of what we covered in today's design review. Action items: update the onboarding illustrations, tighten spacing in the dashboard header, and revisit the empty states.",
      "Let me know if you want to sync before the handoff.",
      "Jordan",
    ],
    time: "45m",
    unread: true,
  },
  {
    id: 3,
    sender: "Casey Morgan",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=CaseyM&backgroundColor=0f766e",
    subject: "PR #48 approved — landing page hero",
    body: [
      "Hey,",
      "The landing page hero redesign PR got approved by both reviewers. It's ready to merge whenever you are.",
      "Also flagged a small z-index issue on mobile — added a comment on the PR.",
      "Casey",
    ],
    time: "3h",
    unread: false,
  },
  {
    id: 4,
    sender: "Sarah Chen",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=SarahC&backgroundColor=f59e0b",
    subject: "Q2 roadmap — need your sign-off by Friday",
    body: [
      "Hey,",
      "The Q2 roadmap doc is ready for final review. I need your sign-off by Friday EOD so we can lock it before the all-hands.",
      "Let me know if you have questions on the agent builder timeline.",
      "Sarah",
    ],
    time: "1h",
    unread: false,
  },
  {
    id: 5,
    sender: "IdeavoAI",
    avatar: "https://ideavo.ai/ideavo/logo-light.png",
    subject: "Your first app is one prompt away",
    body: [
      "Hey 👋",
      "Ready to ship your first app with Ideavo?",
      "Here's how it works:\n• Describe your app in plain English\n• Ideavo builds the full thing — real code, real UI\n• Hit publish and it's live instantly",
      "No templates. No hand-coding. No waiting on a dev sprint.",
      "Start building → ideavo.ai",
      "The Ideavo Team",
    ],
    time: "2d",
    unread: false,
  },
];

export const AI_SUMMARIES: Record<number, string> = {
  1: "Ideavo builds complete production apps from a prompt — one-click publish, real code. Not prototypes.",
  2: "Design review recap from Jordan. 3 action items: illustrations, header spacing, empty states.",
  3: "Casey says PR #48 is approved and ready to merge. Small mobile z-index issue noted in comments.",
  4: "Sarah needs your sign-off on the Q2 roadmap by Friday EOD before the all-hands.",
  5: "Ideavo can build full production apps from a prompt and publish in one click. No dev needed.",
};

export type ReplyTone = "Formal" | "Friendly" | "Brief";

export const AI_DRAFTS: Record<number, Record<ReplyTone, string>> = {
  1: {
    Formal:   "Thank you for reaching out. I have reviewed Ideavo's capabilities and the one-click publish workflow is particularly compelling. I look forward to evaluating it further.",
    Friendly: "This looks incredible — building full apps with one prompt and publishing instantly?! Checking it out right now 🚀",
    Brief:    "Love it. Trying it out now.",
  },
  2: {
    Formal:   "Hi Jordan, thank you for the detailed recap. I will action the noted items — onboarding illustrations, dashboard header spacing, and empty states — and reach out before handoff.",
    Friendly: "Thanks Jordan! Super helpful. I'll start with the onboarding illustrations. Let's sync Wednesday before you hand off?",
    Brief:    "Got it. I'll action the items and ping you before handoff.",
  },
  3: {
    Formal:   "Hi Casey, thank you for the update. I will review the mobile z-index comment and proceed with the merge shortly.",
    Friendly: "Nice one Casey! Merging now — I'll check that z-index comment before pushing 🎉",
    Brief:    "Merging now, will check the z-index issue.",
  },
  4: {
    Formal:   "Hi Sarah, noted. I will review the full Q2 roadmap doc and provide my sign-off before Friday EOD.",
    Friendly: "On it Sarah! Reading through now — will add my sign-off by EOD. Let's align on the agent builder timeline at our 2pm.",
    Brief:    "Got it — sign-off by Friday EOD.",
  },
  5: {
    Formal:   "Thank you for the prompt. I will explore Ideavo's app-building capabilities and evaluate it for our next project.",
    Friendly: "Describe an app and it just builds it?! That's wild — trying it right now 🚀",
    Brief:    "On it — building something now.",
  },
};

export const ME_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=AlexP&backgroundColor=7c3aed";

// ── Chat ──────────────────────────────────────────────────────────────────────

export const CHAT_AVATARS: Record<string, string> = {
  Sarah:  "https://api.dicebear.com/9.x/notionists/svg?seed=SarahC&backgroundColor=f59e0b",
  Jordan: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanR&backgroundColor=0ea5e9",
  Casey:  "https://api.dicebear.com/9.x/notionists/svg?seed=CaseyM&backgroundColor=0f766e",
};

export interface ToolCall {
  label: string;
  duration: string;
}

export interface MiniCard {
  avatar: string;
  name: string;
  line1: string;
  line2?: string;
}

export type AIMessage  = { type: "ai";   id: number; tools: ToolCall[]; text: string; cards?: MiniCard[]; };
export type UserMessage = { type: "user"; id: number; text: string; };
export type MessageItem = UserMessage | AIMessage;

export const CHAT_THREAD: MessageItem[] = [
  { type: "user", id: 1, text: "What do I need to handle today?" },
  {
    type: "ai", id: 2,
    tools: [
      { label: "Read inbox",    duration: "0.8s" },
      { label: "Read calendar", duration: "0.6s" },
    ],
    text: "Here's your briefing — 2 emails need action and you have 3 meetings today with no conflicts.",
    cards: [
      { avatar: "Sarah",  name: "Sarah Chen",   line1: "Q2 roadmap — need your sign-off by Friday", line2: "Sign-off due Friday EOD" },
      { avatar: "Jordan", name: "Jordan Rivera", line1: "Design review notes — action items inside",  line2: "3 items to action" },
      { avatar: "Casey",  name: "Casey Morgan",  line1: "Flagged z-index bug on mobile in #engineering" },
    ],
  },
  { type: "user", id: 3, text: "Draft a reply to Sarah's roadmap email." },
  {
    type: "ai", id: 4,
    tools: [{ label: "Read email · sarah_q2_roadmap", duration: "0.9s" }],
    text: "Here's a draft reply:\n\nHi Sarah, thanks for putting this together — direction looks solid. I'll review the full doc and add my sign-off before EOD. Let's align on the agent builder timeline at our 2pm if needed.",
    cards: [
      { avatar: "Sarah", name: "Sarah Chen", line1: "Q2 roadmap — need your sign-off by Friday", line2: "1h ago · unread" },
    ],
  },
  { type: "user", id: 5, text: "Block 30 min tomorrow morning for roadmap review." },
  {
    type: "ai", id: 6,
    tools: [
      { label: "Check calendar · tomorrow",        duration: "0.5s" },
      { label: "Create event · Q2 Roadmap Review", duration: "0.4s" },
    ],
    text: "Done — \"Q2 Roadmap Review\" blocked 9:00–9:30 AM tomorrow. Your morning is otherwise clear.",
  },
];

export const CHAT_SUGGESTIONS = [
  "Summarise all unread emails",
  "What did I miss this week?",
  "Schedule focus time",
];

// ── Calendar ──────────────────────────────────────────────────────────────────

export const CAL_PALETTE = {
  indigo:  { border: "#6366f1", grad: "rgba(99,102,241,0.18),rgba(99,102,241,0.05)",  ring: "rgba(99,102,241,0.12)",  text: "#a5b4fc", sub: "rgba(165,180,252,0.5)"  },
  emerald: { border: "#34d399", grad: "rgba(52,211,153,0.15),rgba(52,211,153,0.04)",  ring: "rgba(52,211,153,0.10)",  text: "#6ee7b7", sub: "rgba(110,231,183,0.5)"  },
  teal:    { border: "#2dd4bf", grad: "rgba(45,212,191,0.15),rgba(45,212,191,0.04)",  ring: "rgba(45,212,191,0.10)",  text: "#5eead4", sub: "rgba(94,234,212,0.5)"   },
} as const;

export type CalPalette = typeof CAL_PALETTE[keyof typeof CAL_PALETTE];

export interface CalEvent {
  id: string;
  title: string;
  subtitle?: string;
  day: number;      // 0=Mon … 6=Sun
  startH: number;
  durationH: number;
  palette: CalPalette;
}

export const CAL_HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
export const CAL_TOP_OFFSET = 8;

export const CAL_EVENTS: CalEvent[] = [
  { id: "e1",  title: "Team Standup",        subtitle: "Engineering · Daily", day: 0, startH: 9,    durationH: 0.5, palette: CAL_PALETTE.indigo  },
  { id: "e2",  title: "Team Standup",        subtitle: "Engineering · Daily", day: 1, startH: 9,    durationH: 0.5, palette: CAL_PALETTE.indigo  },
  { id: "e3",  title: "Team Standup",        subtitle: "Engineering · Daily", day: 2, startH: 9,    durationH: 0.5, palette: CAL_PALETTE.indigo  },
  { id: "e4",  title: "Design Review",       subtitle: "with Jordan",         day: 2, startH: 11,   durationH: 1,   palette: CAL_PALETTE.teal    },
  { id: "e5",  title: "1:1 with Sarah",      subtitle: "Product sync",        day: 2, startH: 14,   durationH: 1,   palette: CAL_PALETTE.emerald },
  { id: "e6",  title: "Sprint Planning",     subtitle: "Sprint 15 kickoff",   day: 3, startH: 10,   durationH: 1.5, palette: CAL_PALETTE.indigo  },
  { id: "e7",  title: "Investor Update",     subtitle: "Monthly · Abhi",      day: 3, startH: 15,   durationH: 1,   palette: CAL_PALETTE.teal    },
  { id: "e8",  title: "AI Demo Prep",        subtitle: "Landing page review", day: 4, startH: 13,   durationH: 2,   palette: CAL_PALETTE.teal    },
  { id: "e9",  title: "Lunch — Meet + Liam",                                  day: 1, startH: 12.5, durationH: 1,   palette: CAL_PALETTE.emerald },
  { id: "e10", title: "API Review",          subtitle: "v1.2 endpoints",      day: 0, startH: 11,   durationH: 1.5, palette: CAL_PALETTE.teal    },
];

// ── Inbox ──────────────────────────────────────────────────────────────────────

export const INBOX_AVATARS: Record<string, string> = {
  Jordan: "https://api.dicebear.com/9.x/notionists/svg?seed=JordanR&backgroundColor=0ea5e9",
  Casey:  "https://api.dicebear.com/9.x/notionists/svg?seed=CaseyM&backgroundColor=0f766e",
  Sarah:  "https://api.dicebear.com/9.x/notionists/svg?seed=SarahC&backgroundColor=f59e0b",
  You:    "https://api.dicebear.com/9.x/notionists/svg?seed=AlexP&backgroundColor=7c3aed",
};

export interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
}

export const CHANNEL_MESSAGES: Record<string, ChatMsg[]> = {
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

export const DM_MESSAGES: Record<string, ChatMsg[]> = {
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

export const CHANNELS = [
  { id: "product",     label: "product",     unread: 2 },
  { id: "design",      label: "design",      unread: 0 },
  { id: "engineering", label: "engineering", unread: 1 },
  { id: "general",     label: "general",     unread: 0 },
  { id: "random",      label: "random",      unread: 0 },
];

export const DMS = [
  { id: "jordan", label: "Jordan Rivera", sender: "Jordan", online: true  },
  { id: "casey",  label: "Casey Morgan",  sender: "Casey",  online: true  },
  { id: "sarah",  label: "Sarah Chen",    sender: "Sarah",  online: false },
];

// ── Kanban ─────────────────────────────────────────────────────────────────────

export type KanbanColumnId = "in-progress" | "todo" | "done";

export interface KanbanCard {
  id: string;
  title: string;
  assignee?: string;
  date?: string;
  commentCount?: number;
}

export interface KanbanColumn {
  id: KanbanColumnId;
  label: string;
  cards: KanbanCard[];
}

export const KANBAN_INITIAL_COLUMNS: KanbanColumn[] = [
  {
    id: "in-progress",
    label: "In Progress",
    cards: [
      { id: "CUB-204", title: "Redesign onboarding flow",    assignee: "AB", date: "Apr 8",  commentCount: 3 },
      { id: "CUB-198", title: "Refactor auth token refresh", assignee: "AB", date: "Apr 6" },
    ],
  },
  {
    id: "todo",
    label: "To Do",
    cards: [
      { id: "CUB-212", title: "Add keyboard shortcuts to editor", date: "Apr 10", commentCount: 1 },
      { id: "CUB-209", title: "Integrate Slack notifications",    assignee: "AB", date: "Apr 11" },
      { id: "CUB-215", title: "Improve mobile responsiveness",    date: "Apr 12" },
    ],
  },
  {
    id: "done",
    label: "Done",
    cards: [
      { id: "CUB-191", title: "Fix email sync on slow networks", date: "Apr 3" },
      { id: "CUB-188", title: "Landing page hero redesign",      assignee: "AB", date: "Apr 2", commentCount: 5 },
    ],
  },
];

export const KANBAN_COLORS = {
  T_PRI:       "#dddde0",
  T_SEC:       "#909096",
  T_DIM:       "#484850",
  COL_DIVIDER: "rgba(255,255,255,0.05)",
} as const;

// ── Docs ───────────────────────────────────────────────────────────────────────

export const DOCS_COLORS = {
  T_PRI:  "#e8e8ea",
  T_SEC:  "#a0a0a6",
  T_DIM:  "#505056",
  BORDER: "rgba(255,255,255,0.06)",
} as const;

export interface FileItem {
  id: string;
  name: string;
  type: "doc" | "image" | "sheet";
  folder: string;
  modified: string;
}

export const FILES: FileItem[] = [
  { id: "f1", name: "Product Brief v2",  type: "doc",   folder: "Strategy",    modified: "2h ago" },
  { id: "f2", name: "Q3 Roadmap",        type: "sheet", folder: "Strategy",    modified: "1d ago" },
  { id: "f3", name: "Onboarding Flow",   type: "doc",   folder: "Design",      modified: "3h ago" },
  { id: "f4", name: "Brand Assets",      type: "image", folder: "Design",      modified: "4d ago" },
  { id: "f5", name: "Sprint 14 Notes",   type: "doc",   folder: "Engineering", modified: "30m ago" },
  { id: "f6", name: "API Changelog",     type: "doc",   folder: "Engineering", modified: "2d ago" },
];

export const FOLDERS = ["Strategy", "Design", "Engineering"];
