// ── Feature section copy ───────────────────────────────────────────────────

export const FEATURES_HEADING = "Work smarter, together.";
export const FEATURES_SUBHEADING =
  "Cube connects everything you need — AI that acts, a shared inbox for your team, and a calendar that keeps everyone aligned.";

// ── AI Chat card: cycling prompts ──────────────────────────────────────────

export interface AIChatStep {
  prompt: string;
  /** Which action card lights up on this step */
  activeCard: AIChatActionKey;
}

export type AIChatActionKey =
  | "Summarise"
  | "Draft reply"
  | "Move to Done"
  | "Block time"
  | "Find doc";

export const AI_CHAT_STEPS: AIChatStep[] = [
  { prompt: "Summarise all unread emails for me.", activeCard: "Summarise" },
  { prompt: "Draft a friendly reply to Meet's PR comment.", activeCard: "Draft reply" },
  { prompt: "Move the Onboarding Redesign card to Done.", activeCard: "Move to Done" },
  { prompt: "Block 2 hours tomorrow for deep work.", activeCard: "Block time" },
  { prompt: "Find the Sprint 14 notes doc.", activeCard: "Find doc" },
];

export interface AIChatAction {
  key: AIChatActionKey;
  color: "indigo" | "violet" | "emerald" | "amber" | "cyan";
  doneLabel: string;
  footerLeft: string;
  footerRight: string;
}

export const AI_CHAT_ACTIONS: AIChatAction[] = [
  { key: "Summarise",    color: "indigo",  doneLabel: "Done",     footerLeft: "Source",   footerRight: "5 emails"    },
  { key: "Draft reply",  color: "violet",  doneLabel: "Ready",    footerLeft: "Tone",     footerRight: "Friendly"    },
  { key: "Move to Done", color: "emerald", doneLabel: "Moved",    footerLeft: "Board",    footerRight: "Cube Web"    },
  { key: "Block time",   color: "amber",   doneLabel: "Blocked",  footerLeft: "Duration", footerRight: "2 h"         },
  { key: "Find doc",     color: "cyan",    doneLabel: "Found",    footerLeft: "File",     footerRight: "Sprint 14"   },
];

// ── Team Inbox card: simulated presence cursors ────────────────────────────

export interface TeamMember {
  name: string;
  initials: string;
  color: string;     // tailwind bg class
  dotColor: string;  // hex for the online dot
  online: boolean;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Siddhant", initials: "SC", color: "bg-sky-600",    dotColor: "#22c55e", online: true  },
  { name: "Meet",     initials: "MK", color: "bg-teal-600",   dotColor: "#22c55e", online: true  },
  { name: "Abhi",     initials: "AB", color: "bg-violet-600", dotColor: "#22c55e", online: true  },
];

export const INBOX_THREAD_LABELS = [
  "PR #48 approved — landing page hero",
  "Design review notes — action items",
  "Sprint 14 Notes sync",
  "v1.2 launch checklist",
];

// ── Calendar card: quick-add event flow ───────────────────────────────────

export interface QuickAddStep {
  label: string;
  detail: string;
}

export const QUICK_ADD_STEPS: QuickAddStep[] = [
  { label: "Team Standup",      detail: "9:00 AM · 30 min" },
  { label: "Design Review",     detail: "11:00 AM · 1 h"   },
  { label: "Deep Work",         detail: "2:00 PM · 2 h"    },
  { label: "1:1 with Meet",     detail: "4:00 PM · 30 min" },
];
