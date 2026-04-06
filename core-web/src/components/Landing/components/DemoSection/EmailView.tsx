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

const emails: Email[] = [
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
    sender: "Siddhant Chaudry",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=Siddhant&backgroundColor=0ea5e9",
    subject: "Design review notes — action items inside",
    body: [
      "Hey,",
      "Quick recap of what we covered in today's design review. Action items: update the onboarding illustrations, tighten spacing in the dashboard header, and revisit the empty states.",
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
      "The landing page hero redesign PR got approved by both reviewers. It's ready to merge whenever you are.",
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

const AI_SUMMARIES: Record<number, string> = {
  1: "Ideavo builds complete production apps from a prompt — one-click publish, real code. Not prototypes.",
  2: "Design review recap from Siddhant. 3 action items: illustrations, header spacing, empty states.",
  3: "Meet says PR #48 is approved and ready to merge. Small mobile z-index issue noted in comments.",
  4: "Abhi is targeting v1.2 release Wednesday. All in-progress work must be merged by EOD Monday.",
  5: "Ideavo can build full production apps from a prompt and publish in one click. No dev needed.",
};

type ReplyTone = "Formal" | "Friendly" | "Brief";

const AI_DRAFTS: Record<number, Record<ReplyTone, string>> = {
  1: {
    Formal:   "Thank you for reaching out. I have reviewed Ideavo's capabilities and the one-click publish workflow is particularly compelling. I look forward to evaluating it further.",
    Friendly: "This looks incredible — building full apps with one prompt and publishing instantly?! Checking it out right now 🚀",
    Brief:    "Love it. Trying it out now.",
  },
  2: {
    Formal:   "Hi Siddhant, thank you for the detailed recap. I will action the noted items — onboarding illustrations, dashboard header spacing, and empty states — and reach out before handoff.",
    Friendly: "Thanks Siddhant! Super helpful. I'll start with the onboarding illustrations. Let's sync Wednesday before you hand off?",
    Brief:    "Got it. I'll action the items and ping you before handoff.",
  },
  3: {
    Formal:   "Hi Meet, thank you for the update. I will review the mobile z-index comment and proceed with the merge shortly.",
    Friendly: "Nice one Meet! Merging now — I'll check that z-index comment before pushing 🎉",
    Brief:    "Merging now, will check the z-index issue.",
  },
  4: {
    Formal:   "Hi Abhi, noted on the v1.2 release timeline. I will ensure all in-progress items are merged or moved to the next cycle by EOD Monday.",
    Friendly: "Exciting! I'll make sure everything's squared away by Monday EOD. Can't wait to ship this 🚀",
    Brief:    "Got it — will wrap up by Monday EOD.",
  },
  5: {
    Formal:   "Thank you for the prompt. I will explore Ideavo's app-building capabilities and evaluate it for our next project.",
    Friendly: "Describe an app and it just builds it?! That's wild — trying it right now 🚀",
    Brief:    "On it — building something now.",
  },
};

const ME_AVATAR = "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed";

export default function EmailView() {
  const [activeId, setActiveId] = useState<number>(1);
  const [tone, setTone] = useState<ReplyTone>("Formal");
  const [replyOpen, setReplyOpen] = useState(false);
  // sentReplies: maps email id → array of sent reply texts
  const [sentReplies, setSentReplies] = useState<Record<number, string[]>>({});
  const bodyEndRef = useRef<HTMLDivElement>(null);

  const active = emails.find(e => e.id === activeId)!;
  const currentDraft = AI_DRAFTS[active.id][tone];
  const replies = sentReplies[active.id] ?? [];

  // Scroll to bottom when a reply is sent
  useEffect(() => {
    if (replies.length > 0) {
      bodyEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [replies.length]);

  const handleToneChange = (t: ReplyTone) => {
    setTone(t);
    if (!replyOpen) setReplyOpen(true);
  };

  const handleSend = () => {
    setSentReplies(prev => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), currentDraft],
    }));
    setReplyOpen(false);
  };

  return (
    <>
      {/* ── Thread list ── */}
      <div className="w-[340px] shrink-0 flex flex-col" style={{ borderRight: `1px solid ${BORDER}` }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>Inbox</span>
          <span className="text-[11px] font-medium px-1.5 py-0.5 rounded" style={{ color: T_DIM, background: "rgba(255,255,255,0.06)" }}>
            {emails.filter(e => e.unread).length}
          </span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-hidden">
          {emails.map(e => (
            <div
              key={e.id}
              onClick={() => { setActiveId(e.id); setReplyOpen(false); setTone("Formal"); }}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors"
              style={{ background: e.id === activeId ? "rgba(255,255,255,0.07)" : "transparent" }}
              onMouseEnter={ev => { if (e.id !== activeId) (ev.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
              onMouseLeave={ev => { if (e.id !== activeId) (ev.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {/* Photo avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center">
                <img
                  src={e.avatar}
                  alt={e.sender}
                  className={e.sender === "IdeavoAI" ? "w-5 h-5 object-contain" : "w-full h-full object-cover"}
                />
              </div>

              {/* Name + subject */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-demo-md truncate" style={{ color: T_PRI, fontWeight: e.unread ? 600 : 400 }}>
                    {e.sender}
                  </span>
                  <span className="text-demo-xs shrink-0" style={{ color: T_DIM }}>{e.time}</span>
                </div>
                <p className="text-demo-sm truncate mt-0.5" style={{ color: e.unread ? T_SEC : T_DIM }}>
                  {e.subject}
                </p>
              </div>

              {e.unread && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* ── Reading pane ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Title bar */}
        <div className="flex items-center justify-between px-6 py-3 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <span className="text-[14px] font-semibold truncate" style={{ color: T_PRI }}>
            {active.subject}
          </span>
          <button
            className="cursor-pointer transition-colors shrink-0"
            style={{ color: T_DIM }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </button>
        </div>

        {/* AI summary bar */}
        <div
          className="flex items-center gap-2.5 px-6 py-2.5 shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}`, background: "rgba(99,102,241,0.06)" }}
        >
          <img src="/cube-logo-white.svg" alt="Cube" width="13" height="13" className="shrink-0 opacity-80" style={{ filter: "invert(60%) sepia(80%) saturate(400%) hue-rotate(210deg)" }} />
          <span className="text-[11.5px] font-semibold" style={{ color: "#818cf8" }}>AI SUMMARY</span>
          <span className="text-[11.5px]" style={{ color: T_SEC }}>{AI_SUMMARIES[active.id]}</span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Sender row */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center mt-0.5">
              <img
                src={active.avatar}
                alt={active.sender}
                className={active.sender === "IdeavoAI" ? "w-5 h-5 object-contain" : "w-full h-full object-cover"}
              />
            </div>
            <div>
              <span className="text-[13.5px] font-semibold" style={{ color: T_PRI }}>{active.sender}</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11.5px]" style={{ color: T_DIM }}>To: me</span>
                <span style={{ color: T_DIM }}>·</span>
                <span className="text-[11.5px]" style={{ color: T_DIM }}>{active.time} ago</span>
              </div>
            </div>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-3 max-w-[560px]">
            {active.body.map((para, i) => (
              <p key={i} className="text-[13.5px] leading-relaxed whitespace-pre-line text-left" style={{ color: T_SEC }}>
                {para}
              </p>
            ))}
          </div>

          {/* Sent replies */}
          {replies.length > 0 && (
            <div className="mt-5 space-y-3 max-w-[560px]">
              {replies.map((reply, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-[#2a2a2e] flex items-center justify-center mt-0.5">
                    <img src={ME_AVATAR} alt="You" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="text-[13px] font-semibold" style={{ color: T_PRI }}>You</span>
                      <span style={{ color: T_DIM }}>·</span>
                      <span className="text-[11.5px]" style={{ color: T_DIM }}>just now</span>
                    </div>
                    <div
                      className="px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed"
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
        <div className="px-6 pb-5 shrink-0">
          {/* Tone chips */}
          <div className="flex items-center gap-2 mb-2.5">
          <img src="/cube-logo-white.svg" alt="Cube" width="12" height="12" className="shrink-0 opacity-40" />
            <span className="text-[11px]" style={{ color: T_DIM }}>Reply as</span>
            {(["Formal", "Friendly", "Brief"] as ReplyTone[]).map(t => (
              <button
                key={t}
                onClick={() => handleToneChange(t)}
                className="text-[11.5px] px-2.5 py-1 rounded-md cursor-pointer transition-all"
                style={{
                  color:      tone === t ? T_PRI : T_DIM,
                  background: tone === t ? "rgba(255,255,255,0.09)" : "transparent",
                  border:     `1px solid ${tone === t ? "rgba(255,255,255,0.10)" : "transparent"}`,
                }}
                onMouseEnter={e => { if (tone !== t) (e.currentTarget as HTMLElement).style.color = T_SEC; }}
                onMouseLeave={e => { if (tone !== t) (e.currentTarget as HTMLElement).style.color = T_DIM; }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Reply input — collapsed or expanded */}
          {replyOpen ? (
            <div
              className="rounded-xl overflow-hidden"
              style={{ border: `1px solid rgba(99,102,241,0.35)`, background: "rgba(255,255,255,0.03)" }}
            >
              {/* Draft text area */}
              <div className="px-4 pt-3 pb-2 min-h-[72px]">
                <p className="text-[13px] leading-relaxed" style={{ color: T_SEC }}>
                  {currentDraft}
                </p>
              </div>
              {/* Actions row */}
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderTop: `1px solid ${BORDER}` }}
              >
                <div className="flex items-center gap-1.5">
                  {/* Attachment icon */}
                  <button
                    className="cursor-pointer transition-colors p-1 rounded"
                    style={{ color: T_DIM }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
                  >
                    <Paperclip size={14} strokeWidth={1.8} />
                  </button>
                  {/* Discard */}
                  <button
                    onClick={() => setReplyOpen(false)}
                    className="text-[11.5px] px-2 py-0.5 rounded cursor-pointer transition-colors"
                    style={{ color: T_DIM }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
                  >
                    Discard
                  </button>
                </div>
                {/* Send button */}
                <button
                  onClick={handleSend}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium cursor-pointer transition-colors"
                  style={{ background: "#4f46e5", color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "#4338ca"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "#4f46e5"}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                  Send
                </button>
              </div>
            </div>
          ) : (
            /* Collapsed reply bar */
            <div
              onClick={() => setReplyOpen(true)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-text transition-colors"
              style={{ border: `1px solid ${BORDER}`, background: "rgba(255,255,255,0.03)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.12)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = BORDER}
            >
              <span className="flex-1 text-[13px]" style={{ color: T_DIM }}>Reply to {active.sender.split(" ")[0]}...</span>
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer transition-colors"
                  style={{ color: T_DIM }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
                >
                  <Paperclip size={14} strokeWidth={1.8} />
                </button>
                <button className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M12 19V5M5 12l7-7 7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
