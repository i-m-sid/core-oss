import { useState, useRef } from "react";
import { Paperclip } from "lucide-react";
import {
  EMAILS,
  AI_SUMMARIES,
  AI_DRAFTS,
  ME_AVATAR,
  type ReplyTone,
} from "./constantData";

const T_PRI = "#e8e8ea";
const T_SEC = "#a0a0a6";
const T_DIM = "#505056";
const BORDER = "rgba(255,255,255,0.06)";

export default function EmailView() {
  const [activeId, setActiveId] = useState<number>(1);
  const [tone, setTone] = useState<ReplyTone>("Formal");
  const [replyOpen, setReplyOpen] = useState(false);
  const [sentReplies, setSentReplies] = useState<Record<number, string[]>>({});
  const bodyEndRef = useRef<HTMLDivElement>(null);

  const active = EMAILS.find((e) => e.id === activeId)!;
  const currentDraft = AI_DRAFTS[active.id][tone];
  const replies = sentReplies[active.id] ?? [];

  const handleToneChange = (t: ReplyTone) => {
    setTone(t);
    if (!replyOpen) setReplyOpen(true);
  };

  const handleSend = () => {
    setSentReplies((prev) => ({
      ...prev,
      [active.id]: [...(prev[active.id] ?? []), currentDraft],
    }));
    setReplyOpen(false);
  };

  return (
    <>
      {/* ── Thread list ── */}
      <div
        className="w-85 shrink-0 flex flex-col"
        style={{ borderRight: `1px solid ${BORDER}` }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <span className="text-demo-lg font-semibold" style={{ color: T_PRI }}>
            Inbox
          </span>
          <span
            className="text-demo-xs font-medium px-1.5 py-0.5 rounded"
            style={{ color: T_DIM, background: "rgba(255,255,255,0.06)" }}
          >
            {EMAILS.filter((e) => e.unread).length}
          </span>
        </div>

        {/* Rows */}
        <div className="flex-1 overflow-hidden">
          {EMAILS.map((e) => (
            <div
              key={e.id}
              onClick={() => {
                setActiveId(e.id);
                setReplyOpen(false);
                setTone("Formal");
              }}
              className="flex items-center gap-3 px-4 py-3.5 cursor-pointer transition-colors"
              style={{
                background:
                  e.id === activeId ? "rgba(255,255,255,0.07)" : "transparent",
              }}
              onMouseEnter={(ev) => {
                if (e.id !== activeId)
                  (ev.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(ev) => {
                if (e.id !== activeId)
                  (ev.currentTarget as HTMLElement).style.background =
                    "transparent";
              }}
            >
              {/* Photo avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-neutral-100 flex items-center justify-center">
                <img
                  src={e.avatar}
                  alt={e.sender}
                  className={
                    e.sender === "IdeavoAI"
                      ? "w-5 h-5 object-contain"
                      : "w-full h-full object-cover"
                  }
                />
              </div>

              {/* Name + subject */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span
                    className="text-demo-md truncate"
                    style={{ color: T_PRI, fontWeight: e.unread ? 600 : 400 }}
                  >
                    {e.sender}
                  </span>
                  <span
                    className="text-demo-xs shrink-0"
                    style={{ color: T_DIM }}
                  >
                    {e.time}
                  </span>
                </div>
                <p
                  className="text-demo-sm truncate mt-0.5"
                  style={{ color: e.unread ? T_SEC : T_DIM }}
                >
                  {e.subject}
                </p>
              </div>

              {e.unread && (
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Reading pane ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-6 py-3 shrink-0"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <span
            className="text-demo-lg font-semibold truncate"
            style={{ color: T_PRI }}
          >
            {active.subject}
          </span>
          <button
            className="cursor-pointer transition-colors shrink-0"
            style={{ color: T_DIM }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = T_SEC)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = T_DIM)
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>

        {/* AI summary bar */}
        <div
          className="flex items-center gap-2.5 px-6 py-2.5 shrink-0"
          style={{
            borderBottom: `1px solid ${BORDER}`,
            background: "rgba(99,102,241,0.06)",
          }}
        >
          <img
            src="/cube-logo-white.svg"
            alt="Cube"
            width="13"
            height="13"
            className="shrink-0 opacity-80"
            style={{
              filter:
                "invert(60%) sepia(80%) saturate(400%) hue-rotate(210deg)",
            }}
          />
          <span
            className="text-[11.5px] font-semibold"
            style={{ color: "#818cf8" }}
          >
            AI SUMMARY
          </span>
          <span className="text-[11.5px]" style={{ color: T_SEC }}>
            {AI_SUMMARIES[active.id]}
          </span>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Sender row */}
          <div className="flex items-start gap-3 mb-5">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-neutral-50 flex items-center justify-center mt-0.5">
              <img
                src={active.avatar}
                alt={active.sender}
                className={
                  active.sender === "IdeavoAI"
                    ? "w-5 h-5 object-contain"
                    : "w-full h-full object-cover"
                }
              />
            </div>
            <div>
              <span
                className="text-[13.5px] font-semibold"
                style={{ color: T_PRI }}
              >
                {active.sender}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11.5px]" style={{ color: T_DIM }}>
                  To: me
                </span>
                <span style={{ color: T_DIM }}>·</span>
                <span className="text-[11.5px]" style={{ color: T_DIM }}>
                  {active.time} ago
                </span>
              </div>
            </div>
          </div>

          {/* Body paragraphs */}
          <div className="space-y-3 max-w-140">
            {active.body.map((para, i) => (
              <p
                key={i}
                className="text-[13.5px] leading-relaxed whitespace-pre-line text-left"
                style={{ color: T_SEC }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Sent replies */}
          {replies.length > 0 && (
            <div className="mt-5 space-y-3 max-w-140">
              {replies.map((reply, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-demo-surface flex items-center justify-center mt-0.5">
                    <img
                      src={ME_AVATAR}
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span
                        className="text-demo-md font-semibold"
                        style={{ color: T_PRI }}
                      >
                        You
                      </span>
                      <span style={{ color: T_DIM }}>·</span>
                      <span className="text-[11.5px]" style={{ color: T_DIM }}>
                        just now
                      </span>
                    </div>
                    <div
                      className="px-3.5 py-2.5 rounded-xl text-demo-md leading-relaxed"
                      style={{
                        background: "rgba(79,70,229,0.15)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        color: T_SEC,
                      }}
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
            <img
              src="/cube-logo-white.svg"
              alt="Cube"
              width="12"
              height="12"
              className="shrink-0 opacity-40"
            />
            <span className="text-demo-xs" style={{ color: T_DIM }}>
              Reply as
            </span>
            {(["Formal", "Friendly", "Brief"] as ReplyTone[]).map((t) => (
              <button
                key={t}
                onClick={() => handleToneChange(t)}
                className="text-[11.5px] px-2.5 py-1 rounded-md cursor-pointer transition-all"
                style={{
                  color: tone === t ? T_PRI : T_DIM,
                  background:
                    tone === t ? "rgba(255,255,255,0.09)" : "transparent",
                  border: `1px solid ${tone === t ? "rgba(255,255,255,0.10)" : "transparent"}`,
                }}
                onMouseEnter={(e) => {
                  if (tone !== t)
                    (e.currentTarget as HTMLElement).style.color = T_SEC;
                }}
                onMouseLeave={(e) => {
                  if (tone !== t)
                    (e.currentTarget as HTMLElement).style.color = T_DIM;
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Reply input — collapsed or expanded */}
          {replyOpen ? (
            <div
              className="rounded-xl overflow-hidden"
              style={{
                border: `1px solid rgba(99,102,241,0.35)`,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              {/* Draft text area */}
              <div className="px-4 pt-3 pb-2 min-h-18">
                <p
                  className="text-demo-md leading-relaxed"
                  style={{ color: T_SEC }}
                >
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
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = T_SEC)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = T_DIM)
                    }
                  >
                    <Paperclip size={14} strokeWidth={1.8} />
                  </button>
                  {/* Discard */}
                  <button
                    onClick={() => setReplyOpen(false)}
                    className="text-[11.5px] px-2 py-0.5 rounded cursor-pointer transition-colors"
                    style={{ color: T_DIM }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = T_SEC)
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = T_DIM)
                    }
                  >
                    Discard
                  </button>
                </div>
                {/* Send button */}
                <button
                  onClick={handleSend}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-demo-sm font-medium cursor-pointer transition-colors"
                  style={{ background: "#4f46e5", color: "#fff" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#4338ca")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.background =
                      "#4f46e5")
                  }
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
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
              style={{
                border: `1px solid ${BORDER}`,
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255,255,255,0.12)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = BORDER)
              }
            >
              <span className="flex-1 text-demo-md" style={{ color: T_DIM }}>
                Reply to {active.sender.split(" ")[0]}...
              </span>
              <div className="flex items-center gap-2">
                <button
                  className="cursor-pointer transition-colors"
                  style={{ color: T_DIM }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = T_SEC)
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = T_DIM)
                  }
                >
                  <Paperclip size={14} strokeWidth={1.8} />
                </button>
                <button className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center cursor-pointer hover:bg-indigo-500 transition-colors">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
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
