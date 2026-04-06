import { useState, useRef, useEffect } from "react";
import { Paperclip } from "lucide-react";

const T_PRI  = "#e8e8ea";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#505056";
const BORDER = "rgba(255,255,255,0.06)";

interface Email {
  id: number;
  sender: string;
  avatar: string;
  subject: string;
  body: string[];
  time: string;
  unread: boolean;
}

const EMAILS: Email[] = [
  {
    id: 1,
    sender: "IdeavoAI",
    avatar: "https://ideavo.ai/ideavo/logo-light.png",
    subject: "Build complete apps with AI — not just prototypes",
    body: [
      "Hey there 👋",
      "Stop prototyping. Start shipping.",
      "Ideavo lets you build complete, production-ready apps from a single prompt — and publish them in one click.",
      "The Ideavo Team",
    ],
    time: "2m",
    unread: true,
  },
  {
    id: 2,
    sender: "Siddhant Chaudry",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Siddhant&backgroundColor=0ea5e9",
    subject: "Design review notes — action items inside",
    body: [
      "Hey,",
      "Quick recap of today's design review. Action items: update onboarding illustrations, tighten spacing in the dashboard header, and revisit empty states.",
      "Let me know if you want to sync before the handoff.",
      "Siddhant",
    ],
    time: "45m",
    unread: true,
  },
  {
    id: 3,
    sender: "Meet Kotadiya",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=MeetK&backgroundColor=0f766e",
    subject: "PR #48 approved — landing page hero",
    body: [
      "Hey,",
      "The landing page hero redesign PR got approved. It's ready to merge whenever you are.",
      "Also flagged a small z-index issue on mobile — added a comment on the PR.",
      "Meet",
    ],
    time: "3h",
    unread: false,
  },
  {
    id: 4,
    sender: "Abhi Sharma",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed",
    subject: "Shipping v1.2 next week — heads up",
    body: [
      "Team,",
      "We're targeting v1.2 for release next Wednesday. The build is stable and QA signed off this morning.",
      "Make sure your in-progress items are merged or moved to the next cycle by EOD Monday.",
      "Abhi",
    ],
    time: "1d",
    unread: false,
  },
];

const AI_SUMMARIES: Record<number, string> = {
  1: "Ideavo builds production apps from a prompt — one-click publish, real code.",
  2: "Design review recap. 3 action items: illustrations, header spacing, empty states.",
  3: "PR #48 is approved and ready to merge. Small mobile z-index issue in comments.",
  4: "v1.2 ships Wednesday. All work must be merged or moved by EOD Monday.",
};

type ReplyTone = "Formal" | "Friendly" | "Brief";

const AI_DRAFTS: Record<number, Record<ReplyTone, string>> = {
  1: {
    Formal:   "Thank you for reaching out. The one-click publish workflow is particularly compelling. I look forward to evaluating it further.",
    Friendly: "This looks incredible — building full apps with one prompt?! Checking it out right now 🚀",
    Brief:    "Love it. Trying it out now.",
  },
  2: {
    Formal:   "Hi Siddhant, thank you for the recap. I'll action the items — illustrations, header spacing, and empty states — and reach out before handoff.",
    Friendly: "Thanks Siddhant! Super helpful. Let's sync Wednesday before handoff?",
    Brief:    "Got it. I'll action the items and ping you before handoff.",
  },
  3: {
    Formal:   "Hi Meet, thank you. I'll review the mobile z-index comment and proceed with the merge shortly.",
    Friendly: "Nice one Meet! Merging now — I'll check that z-index comment first 🎉",
    Brief:    "Merging now, will check the z-index issue.",
  },
  4: {
    Formal:   "Hi Abhi, noted on the v1.2 timeline. I'll ensure all in-progress items are merged by EOD Monday.",
    Friendly: "Exciting! I'll have everything squared away by Monday EOD. Can't wait to ship 🚀",
    Brief:    "Got it — will wrap up by Monday EOD.",
  },
};

const ME_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed";

// ── Email list ────────────────────────────────────────────────────────────────

function EmailList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: "#111213" }}>
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>Inbox</span>
        <span
          className="text-[11px] font-medium px-1.5 py-0.5 rounded"
          style={{ color: T_DIM, background: "rgba(255,255,255,0.06)" }}
        >
          {EMAILS.filter(e => e.unread).length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        {EMAILS.map(e => (
          <button
            key={e.id}
            onClick={() => onSelect(e.id)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left cursor-pointer transition-colors"
            style={{ borderBottom: `1px solid ${BORDER}` }}
            onMouseEnter={ev => (ev.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)"}
            onMouseLeave={ev => (ev.currentTarget as HTMLElement).style.background = "transparent"}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center">
              <img
                src={e.avatar}
                alt={e.sender}
                className={e.sender === "IdeavoAI" ? "w-5 h-5 object-contain" : "w-full h-full object-cover"}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-1">
                <span
                  className="text-[13px] truncate"
                  style={{ color: T_PRI, fontWeight: e.unread ? 600 : 400 }}
                >
                  {e.sender}
                </span>
                <span className="text-[11px] shrink-0" style={{ color: T_DIM }}>{e.time}</span>
              </div>
              <p
                className="text-[12px] truncate mt-0.5"
                style={{ color: e.unread ? T_SEC : T_DIM }}
              >
                {e.subject}
              </p>
            </div>

            {e.unread && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Email detail ──────────────────────────────────────────────────────────────

function EmailDetail({ emailId, onBack }: { emailId: number; onBack: () => void }) {
  const email = EMAILS.find(e => e.id === emailId)!;
  const [tone, setTone] = useState<ReplyTone>("Formal");
  const [replyOpen, setReplyOpen] = useState(false);
  const [sentReplies, setSentReplies] = useState<string[]>([]);
  const bodyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sentReplies.length > 0) {
      bodyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [sentReplies.length]);

  const handleSend = () => {
    setSentReplies(prev => [...prev, AI_DRAFTS[email.id][tone]]);
    setReplyOpen(false);
  };

  return (
    <div className="flex flex-col h-full" style={{ background: "#121314" }}>
      {/* Header */}
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
        <span className="text-[13px] font-semibold truncate flex-1" style={{ color: T_PRI }}>
          {email.subject}
        </span>
      </div>

      {/* AI summary */}
      <div
        className="flex items-start gap-2 px-4 py-2.5 shrink-0"
        style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(99,102,241,0.06)" }}
      >
        <img
          src="/cube-logo-white.svg"
          alt="Cube"
          width="12"
          height="12"
          className="shrink-0 mt-0.5 opacity-80"
          style={{ filter: "invert(60%) sepia(80%) saturate(400%) hue-rotate(210deg)" }}
        />
        <span className="text-[10.5px] font-semibold shrink-0" style={{ color: "#818cf8" }}>AI</span>
        <span className="text-[10.5px] leading-snug" style={{ color: T_SEC }}>{AI_SUMMARIES[email.id]}</span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Sender row */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center">
            <img
              src={email.avatar}
              alt={email.sender}
              className={email.sender === "IdeavoAI" ? "w-5 h-5 object-contain" : "w-full h-full object-cover"}
            />
          </div>
          <div>
            <span className="text-[13px] font-semibold" style={{ color: T_PRI }}>{email.sender}</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px]" style={{ color: T_DIM }}>To: me</span>
              <span style={{ color: T_DIM }}>·</span>
              <span className="text-[11px]" style={{ color: T_DIM }}>{email.time} ago</span>
            </div>
          </div>
        </div>

        {/* Body paragraphs */}
        <div className="space-y-2.5">
          {email.body.map((para, i) => (
            <p key={i} className="text-[12.5px] leading-relaxed whitespace-pre-line" style={{ color: T_SEC }}>
              {para}
            </p>
          ))}
        </div>

        {/* Sent replies */}
        {sentReplies.length > 0 && (
          <div className="mt-4 space-y-3">
            {sentReplies.map((reply, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center mt-0.5">
                  <img src={ME_AVATAR} alt="You" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[12px] font-semibold" style={{ color: T_PRI }}>You</span>
                    <span style={{ color: T_DIM }}>·</span>
                    <span className="text-[10.5px]" style={{ color: T_DIM }}>just now</span>
                  </div>
                  <div
                    className="px-3 py-2 rounded-xl text-[12px] leading-relaxed"
                    style={{ background: "rgba(79,70,229,0.15)", border: "1px solid rgba(99,102,241,0.25)", color: T_SEC }}
                  >
                    {reply}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={bodyEndRef} />
      </div>

      {/* Reply bar */}
      <div className="px-4 pb-4 shrink-0">
        {/* Tone chips */}
        <div className="flex items-center gap-1.5 mb-2">
          <img src="/cube-logo-white.svg" alt="Cube" width="11" height="11" className="shrink-0 opacity-40" />
          <span className="text-[10.5px]" style={{ color: T_DIM }}>Reply as</span>
          {(["Formal", "Friendly", "Brief"] as ReplyTone[]).map(t => (
            <button
              key={t}
              onClick={() => { setTone(t); if (!replyOpen) setReplyOpen(true); }}
              className="text-[10.5px] px-2 py-0.5 rounded-md cursor-pointer transition-all"
              style={{
                color:      tone === t ? T_PRI : T_DIM,
                background: tone === t ? "rgba(255,255,255,0.09)" : "transparent",
                border:     `1px solid ${tone === t ? "rgba(255,255,255,0.10)" : "transparent"}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {replyOpen ? (
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(99,102,241,0.35)", background: "rgba(255,255,255,0.03)" }}
          >
            <div className="px-3.5 pt-3 pb-2 min-h-[60px]">
              <p className="text-[12px] leading-relaxed" style={{ color: T_SEC }}>
                {AI_DRAFTS[email.id][tone]}
              </p>
            </div>
            <div
              className="flex items-center justify-between px-3.5 py-2"
              style={{ borderTop: `1px solid ${BORDER}` }}
            >
              <div className="flex items-center gap-1.5">
                <button className="cursor-pointer p-1 rounded" style={{ color: T_DIM }}>
                  <Paperclip size={13} strokeWidth={1.8} />
                </button>
                <button
                  onClick={() => setReplyOpen(false)}
                  className="text-[11px] px-2 py-0.5 rounded cursor-pointer"
                  style={{ color: T_DIM }}
                >
                  Discard
                </button>
              </div>
              <button
                onClick={handleSend}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11.5px] font-medium cursor-pointer transition-colors"
                style={{ background: "#4f46e5", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#4338ca"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#4f46e5"}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 19V5M5 12l7-7 7 7"/>
                </svg>
                Send
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={() => setReplyOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl cursor-text transition-colors"
            style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
          >
            <span className="flex-1 text-[12.5px]" style={{ color: T_DIM }}>
              Reply to {email.sender.split(" ")[0]}...
            </span>
            <button className="cursor-pointer" style={{ color: T_DIM }}>
              <Paperclip size={13} strokeWidth={1.8} />
            </button>
            <button className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function MobileEmailView() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (selectedId !== null) {
    return <EmailDetail emailId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return <EmailList onSelect={setSelectedId} />;
}
