import { FILES } from "./constantData";

export { FILES, FOLDERS } from "./constantData";

const T_PRI  = "#e8e8ea";
const T_SEC  = "#a0a0a6";
const T_DIM  = "#505056";
const BORDER = "rgba(255,255,255,0.06)";

// ── File + content data (shared with Sidebar via export) ──────────────────────


interface DocContent {
  title: string;
  tag: string;
  tagColor: string;
  author: string;
  date: string;
  body: React.ReactNode;
}

const DOC_CONTENTS: Record<string, DocContent> = {
  f1: {
    title: "Product Brief v2",
    tag: "Strategy", tagColor: "#6366f1", author: "Abhi", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          This brief outlines the core direction for v1.2 — a focused release targeting
          onboarding quality, performance, and the new AI chat layer. The goal is to reduce
          time-to-value for new users from 8 minutes to under 2.
        </p>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Goals</p>
          <ul className="space-y-1.5">
            {["Redesign onboarding to feel instant and guided", "Ship AI chat with email + calendar context", "Reduce dashboard load time by 40%", "Improve mobile responsiveness across all views"].map(item => (
              <li key={item} className="flex items-start gap-2 text-[13.5px]" style={{ color: T_SEC }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg p-3.5" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
          <p className="text-demo-sm font-semibold mb-1" style={{ color: "#818cf8" }}>Target launch: Wednesday, Apr 9</p>
          <p className="text-demo-sm" style={{ color: T_DIM }}>QA signed off. Design assets merged. Engineering green.</p>
        </div>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Success metrics</p>
          <div className="space-y-2">
            {[
              { label: "Activation rate", value: "62%", target: "→ 80%" },
              { label: "D7 retention",    value: "38%", target: "→ 50%" },
              { label: "NPS",             value: "41",  target: "→ 55"  },
            ].map(m => (
              <div key={m.label} className="flex items-center justify-between text-[12.5px]">
                <span style={{ color: T_SEC }}>{m.label}</span>
                <span style={{ color: T_DIM }}>{m.value} <span style={{ color: "#6366f1" }}>{m.target}</span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  f2: {
    title: "Q3 Roadmap",
    tag: "Strategy", tagColor: "#6366f1", author: "Abhi", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          Q3 planning doc covering the major bets for July–September. Focuses on growth, retention, and the public API launch.
        </p>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Q3 Themes</p>
          <div className="space-y-2">
            {[
              { theme: "Public API", status: "In progress", color: "#6366f1" },
              { theme: "Mobile app v1", status: "Planned", color: "#f59e0b" },
              { theme: "Team collaboration", status: "Scoping", color: "#22d3ee" },
              { theme: "Analytics dashboard", status: "Planned", color: "#f59e0b" },
            ].map(r => (
              <div key={r.theme} className="flex items-center justify-between rounded-md px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
                <span className="text-[12.5px]" style={{ color: T_SEC }}>{r.theme}</span>
                <span className="text-demo-xs font-medium px-2 py-0.5 rounded" style={{ background: `${r.color}18`, color: r.color }}>{r.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  f3: {
    title: "Onboarding Flow",
    tag: "Design", tagColor: "#22d3ee", author: "Siddhant", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          Updated onboarding flow for v1.2. The new design reduces steps from 7 to 4 and
          introduces contextual empty states so users see value immediately after sign-up.
        </p>
        <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          <div className="h-30 flex items-center justify-center" style={{ background: "rgba(34,211,238,0.06)" }}>
            <div className="flex items-center gap-3 opacity-40">
              <div className="w-12 h-12 rounded-lg" style={{ background: "rgba(34,211,238,0.3)" }} />
              <div className="space-y-2">
                <div className="w-24 h-2.5 rounded" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-16 h-2 rounded" style={{ background: "rgba(255,255,255,0.08)" }} />
              </div>
            </div>
          </div>
          <div className="px-3 py-2" style={{ borderTop: `1px solid ${BORDER}` }}>
            <span className="text-demo-xs" style={{ color: T_DIM }}>Figma — Onboarding v2 screens</span>
          </div>
        </div>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Changes in this version</p>
          <ul className="space-y-1.5">
            {["Combined workspace + profile step into one", "Added progress indicator (4-step bar)", "New empty state illustrations by Siddhant", "Removed redundant 'invite team' gate"].map(item => (
              <li key={item} className="flex items-start gap-2 text-[13.5px]" style={{ color: T_SEC }}>
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  },
  f4: {
    title: "Brand Assets",
    tag: "Design", tagColor: "#22d3ee", author: "Siddhant", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          Brand asset library for Cube. Includes logos, color palettes, and typography references.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {["#6366f1","#22d3ee","#f59e0b","#e11d48","#22c55e","#8b5cf6"].map((c, i) => (
            <div key={i} className="h-16 rounded-lg flex items-end p-2" style={{ background: `${c}22`, border: `1px solid ${c}33` }}>
              <span className="text-[10px] font-mono" style={{ color: c }}>{c}</span>
            </div>
          ))}
        </div>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Typography</p>
          <div className="space-y-1.5">
            {[{ name: "Geist", weight: "400 / 500 / 600 / 700", use: "UI" }, { name: "Geist Mono", weight: "400 / 500", use: "Code" }].map(t => (
              <div key={t.name} className="flex items-center justify-between text-[12.5px]">
                <span style={{ color: T_PRI }}>{t.name}</span>
                <span style={{ color: T_DIM }}>{t.weight} · {t.use}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  f5: {
    title: "Sprint 14 Notes",
    tag: "Engineering", tagColor: "#f59e0b", author: "Meet", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          Sprint 14 ran Apr 1–3. Focus was on stabilising the email sync layer,
          fixing the Safari z-index regression, and shipping the AI chat MVP behind a flag.
        </p>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Completed</p>
          <div className="space-y-1.5">
            {[
              { label: "Fix email chunk sync batching",   id: "CUB-201" },
              { label: "Resolve Safari z-index clip",     id: "CUB-198" },
              { label: "AI chat MVP behind feature flag", id: "CUB-204" },
              { label: "Harden share link policies",      id: "CUB-196" },
            ].map(t => (
              <div key={t.id} className="flex items-center gap-2.5 text-[12.5px]">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.3"/>
                  <path d="M5 8l2 2 4-4" stroke="#22c55e" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <span style={{ color: T_SEC }}>{t.label}</span>
                <span className="ml-auto" style={{ color: T_DIM }}>{t.id}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-demo-lg font-semibold mb-3" style={{ color: T_PRI }}>Carry over</p>
          <div className="space-y-1.5">
            {[
              { label: "Mobile keyboard handling in chat", id: "CUB-207" },
              { label: "Attachment upload retry logic",    id: "CUB-209" },
            ].map(t => (
              <div key={t.id} className="flex items-center gap-2.5 text-[12.5px]">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="7" stroke={T_DIM} strokeWidth="1.3"/>
                  <circle cx="8" cy="8" r="2.5" fill={T_DIM}/>
                </svg>
                <span style={{ color: T_SEC }}>{t.label}</span>
                <span className="ml-auto" style={{ color: T_DIM }}>{t.id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  f6: {
    title: "API Changelog",
    tag: "Engineering", tagColor: "#f59e0b", author: "Meet", date: "Apr 3, 2026",
    body: (
      <div className="space-y-4">
        <p className="text-[15px] leading-relaxed" style={{ color: T_SEC }}>
          Running log of breaking and non-breaking changes to the Cube API.
        </p>
        <div className="space-y-3">
          {[
            { version: "v1.2.0", date: "Apr 3", note: "Added /threads/summarize endpoint. Deprecated /chat/raw.", breaking: true },
            { version: "v1.1.4", date: "Mar 28", note: "Rate limit headers now included on all responses.", breaking: false },
            { version: "v1.1.3", date: "Mar 20", note: "Fixed pagination cursor bug in /inbox/list.", breaking: false },
          ].map(c => (
            <div key={c.version} className="rounded-md px-3 py-2.5" style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}` }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-demo-sm font-semibold font-mono" style={{ color: T_PRI }}>{c.version}</span>
                <span className="text-demo-xs" style={{ color: T_DIM }}>{c.date}</span>
                {c.breaking && <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: "rgba(225,29,72,0.12)", color: "#f43f5e" }}>Breaking</span>}
              </div>
              <p className="text-demo-sm" style={{ color: T_SEC }}>{c.note}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
};

function getContent(id: string): DocContent {
  const file = FILES.find(f => f.id === id)!;
  return DOC_CONTENTS[id] ?? {
    title: file.name,
    tag: file.folder,
    tagColor: file.folder === "Design" ? "#22d3ee" : file.folder === "Engineering" ? "#f59e0b" : "#6366f1",
    author: "Abhi", date: "Apr 3, 2026",
    body: <p className="text-[14.5px]" style={{ color: T_SEC }}>No content yet.</p>,
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface DocsMockProps {
  activeFileId: string;
}

export default function DocsMock({ activeFileId }: DocsMockProps) {
  const content = getContent(activeFileId);

  return (
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
      {/* Doc header */}
      <div className="px-10 pt-9 pb-6 shrink-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-170 mx-auto">
          {/* Breadcrumb-style meta */}
          <div className="flex items-center gap-2 mb-5">
            <span
              className="text-demo-xs font-semibold px-2.5 py-1 rounded-md"
              style={{ background: `${content.tagColor}18`, color: content.tagColor }}
            >
              {content.tag}
            </span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={T_DIM} strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            <span className="text-demo-sm" style={{ color: T_DIM }}>{content.date}</span>
            <span className="text-demo-sm" style={{ color: T_DIM }}>·</span>
            <div className="flex items-center gap-1.5">
              <div className="w-4.5 h-4.5 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                <span className="text-white font-bold" style={{ fontSize: "7.5px" }}>
                  {content.author[0]}
                </span>
              </div>
              <span className="text-demo-sm" style={{ color: T_DIM }}>{content.author}</span>
            </div>
          </div>
          {/* Title */}
          <h1 className="text-[26px] font-bold tracking-[-0.5px] leading-tight" style={{ color: T_PRI }}>
            {content.title}
          </h1>
        </div>
      </div>

      {/* Doc body */}
      <div className="flex-1 overflow-y-auto px-10 py-7 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
        <div className="max-w-170 mx-auto">
          {content.body}
        </div>
      </div>
    </div>
  );
}
