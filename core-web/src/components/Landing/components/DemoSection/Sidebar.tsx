import { useState } from "react";
import type { DemoView } from "./types";
import { FILES, FOLDERS } from "./DocsView";
import { EVENTS, TODAY_COL } from "./CalendarView";

interface SidebarProps {
  activeView: DemoView;
  onViewChange: (view: DemoView) => void;
  activeFileId: string;
  onFileChange: (id: string) => void;
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
      {children}
    </svg>
  );
}

const InboxIcon    = () => <Icon><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></Icon>;
const EmailIcon    = () => <Icon><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></Icon>;
const AIChatIcon   = () => <Icon><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></Icon>;
const ProjectsIcon = () => <Icon><rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="10" rx="1"/></Icon>;
const DocsIcon     = () => <Icon><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></Icon>;
const TeamIcon     = () => <Icon><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></Icon>;
const CalendarIcon = () => <Icon><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Icon>;
const SheetIcon    = () => <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18"/></Icon>;
const ImageIcon    = () => <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></Icon>;

function FileTypeIcon({ type }: { type: "doc" | "image" | "sheet" }) {
  if (type === "sheet") return <SheetIcon />;
  if (type === "image") return <ImageIcon />;
  return <DocsIcon />;
}

const SB        = "#111213";
const ACTIVE_BG = "rgba(255,255,255,0.10)";
const HOVER_BG  = "rgba(255,255,255,0.05)";
const TEXT_PRI  = "#f0f0f0";
const TEXT_SEC  = "#a0a0a6";
const TEXT_DIM  = "#606066";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  indent?: boolean;
}

function NavItem({ icon, label, active, count, onClick, indent }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 rounded-md text-left transition-colors cursor-pointer"
      style={{
        padding: indent ? "8px 12px 8px 30px" : "8px 12px",
        background: active ? ACTIVE_BG : "transparent",
        color: active ? TEXT_PRI : TEXT_SEC,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = HOVER_BG; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ color: active ? TEXT_PRI : TEXT_DIM }}>{icon}</span>
      <span className="text-[15px] flex-1 leading-none font-normal">{label}</span>
      {count !== undefined && count > 0 && (
        <span className="text-[12px] font-medium" style={{ color: TEXT_DIM }}>{count}</span>
      )}
    </button>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-1" style={{ padding: "18px 12px 4px" }}>
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: TEXT_DIM }}>{label}</span>
    </div>
  );
}

// Recent docs — last 3 modified files, shown in Recents section
const RECENTS = [
  { id: "f5", label: "Sprint 14 Notes", type: "doc"   as const, tagColor: "#f59e0b", ago: "30m ago" },
  { id: "f3", label: "Onboarding Flow", type: "doc"   as const, tagColor: "#22d3ee", ago: "3h ago"  },
  { id: "f1", label: "Product Brief v2",type: "doc"   as const, tagColor: "#6366f1", ago: "2h ago"  },
];

export default function Sidebar({ activeView, onViewChange, activeFileId, onFileChange }: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    Strategy: true,
    Design: false,
    Engineering: true,
  });

  function toggleFolder(name: string) {
    setExpandedFolders(prev => ({ ...prev, [name]: !prev[name] }));
  }

  function openFile(id: string) {
    const file = FILES.find(f => f.id === id);
    if (file) {
      setExpandedFolders(prev => ({ ...prev, [file.folder]: true }));
    }
    onFileChange(id);
    onViewChange("docs");
  }

  return (
    <div
      className="w-[240px] shrink-0 flex flex-col overflow-hidden"
      style={{ background: SB, borderRight: "1px solid rgba(255,255,255,0.05)" }}
    >
      {/* Workspace header */}
      <div className="flex items-center justify-between px-3 py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-[22px] h-[22px] rounded-[4px] bg-black flex items-center justify-center shrink-0 p-[3px]">
            <img src="/cube-logo-white.svg" alt="Cube" className="w-full h-full object-contain" />
          </div>
          <span className="text-[14px] font-semibold" style={{ color: TEXT_PRI }}>Cube</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2.2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-colors hover:bg-white/[0.05]" style={{ color: TEXT_DIM }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          </button>
          <button className="w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-colors hover:bg-white/[0.05]" style={{ color: TEXT_DIM }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
          </button>
        </div>
      </div>

      {/* Primary nav */}
      <div className="px-1.5 pt-2 flex flex-col">
        <NavItem icon={<InboxIcon />}    label="Inbox"    count={3} active={activeView === "inbox"}    onClick={() => onViewChange("inbox")} />
        <NavItem icon={<EmailIcon />}    label="Email"              active={activeView === "email"}    onClick={() => onViewChange("email")} />
        <NavItem icon={<AIChatIcon />}   label="AI Chat"            active={activeView === "chat"}     onClick={() => onViewChange("chat")} />
        <NavItem icon={<CalendarIcon />} label="Calendar"           active={activeView === "calendar"} onClick={() => onViewChange("calendar")} />
      </div>

      {/* Workspace section */}
      <SectionLabel label="Workspace" />
      <div className="px-1.5 flex flex-col">
        <NavItem icon={<ProjectsIcon />} label="Projects"     active={activeView === "kanban"} onClick={() => onViewChange("kanban")} />
        <NavItem icon={<DocsIcon />}     label="Docs & Files" active={activeView === "docs"}   onClick={() => onViewChange("docs")} />
        <NavItem icon={<TeamIcon />}     label="Team" />
      </div>

      {/* File tree + Recents — always rendered, file tree only when docs active */}
      <div className="mt-1 flex flex-col overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
      {activeView === "docs" && FOLDERS.map(folder => {
          const files = FILES.filter(f => f.folder === folder);
          const isOpen = expandedFolders[folder] ?? false;
          return (
            <div key={folder}>
              {/* Folder row */}
              <button
                onClick={() => toggleFolder(folder)}
                className="w-full flex items-center gap-2 rounded-md cursor-pointer transition-colors"
                style={{ padding: "7px 12px 7px 16px", color: TEXT_SEC }}
                onMouseEnter={e => e.currentTarget.style.background = HOVER_BG}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="2.5" strokeLinecap="round">
                  {isOpen ? <path d="M6 9l6 6 6-6"/> : <path d="M9 18l6-6-6-6"/>}
                </svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_DIM} strokeWidth="1.8" strokeLinecap="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                <span className="text-[13.5px] font-medium" style={{ color: TEXT_SEC }}>{folder}</span>
              </button>

              {/* Files — indented under folder with a left guide line */}
              {isOpen && (
                <div className="relative ml-[28px]">
                  <div className="absolute left-[7px] top-0 bottom-1 w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
                  {files.map(file => {
                    const isActive = activeFileId === file.id;
                    return (
                      <button
                        key={file.id}
                        onClick={() => openFile(file.id)}
                        className="w-full flex items-center gap-2 text-left rounded-md transition-colors cursor-pointer"
                        style={{
                          padding: "6px 10px 6px 20px",
                          background: isActive ? ACTIVE_BG : "transparent",
                          color: isActive ? TEXT_PRI : TEXT_SEC,
                        }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = HOVER_BG; }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                      >
                        <span style={{ color: isActive ? TEXT_PRI : TEXT_DIM }}>
                          <FileTypeIcon type={file.type} />
                        </span>
                        <span className="text-[13px] flex-1 truncate">{file.name}</span>
                        <span className="text-[11px] shrink-0" style={{ color: TEXT_DIM }}>{file.modified}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Recents — always visible */}
        <SectionLabel label="Recents" />
        <div className="px-1.5 flex flex-col">
          {RECENTS.map(r => (
            <button
              key={r.id}
              onClick={() => openFile(r.id)}
              className="w-full flex items-center gap-2.5 rounded-md text-left cursor-pointer transition-colors"
              style={{ padding: "7px 12px", color: TEXT_SEC }}
              onMouseEnter={e => e.currentTarget.style.background = HOVER_BG}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span
                className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.tagColor }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
              </span>
              <span className="text-[14px] flex-1 truncate font-normal">{r.label}</span>
              <span className="text-[11.5px] shrink-0" style={{ color: TEXT_DIM }}>{r.ago}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User row */}
      <div className="px-3 py-3 flex items-center gap-2.5 cursor-pointer mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=CubeUser&backgroundColor=7c3aed"
          alt="You"
          className="w-6 h-6 rounded-full shrink-0 object-cover"
        />
        <span className="text-[14px] flex-1 truncate font-normal" style={{ color: TEXT_SEC }}>You</span>
        <button
          className="cursor-pointer transition-colors"
          style={{ color: TEXT_DIM }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = TEXT_SEC}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = TEXT_DIM}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
        </button>
      </div>
    </div>
  );
}
