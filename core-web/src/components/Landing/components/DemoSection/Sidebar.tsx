import { useState } from "react";
import {
  Sparkles,
  Inbox,
  Mail,
  LayoutDashboard,
  Calendar,
  File,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Folder,
  FileText,
  Sheet,
  Image,
  MoreHorizontal,
} from "lucide-react";
import type { DemoView } from "./types";
import { FILES, FOLDERS } from "./DocsMock";

interface SidebarProps {
  activeView: DemoView;
  onViewChange: (view: DemoView) => void;
  activeFileId: string;
  onFileChange: (id: string) => void;
}

function FileTypeIcon({ type }: { type: "doc" | "image" | "sheet" }) {
  if (type === "sheet") return <Sheet size={14} />;
  if (type === "image") return <Image size={14} />;
  return <FileText size={14} />;
}

const SB = "#111213";
const ACTIVE_BG = "rgba(255,255,255,0.10)";
const HOVER_BG = "rgba(255,255,255,0.05)";
const TEXT_PRI = "#f0f0f0";
const TEXT_SEC = "#a0a0a6";
const TEXT_DIM = "#606066";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  indent?: boolean;
}

function NavItem({
  icon,
  label,
  active,
  count,
  onClick,
  indent,
}: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2.5 rounded-md text-left transition-colors cursor-pointer"
      style={{
        padding: indent ? "8px 12px 8px 30px" : "8px 12px",
        background: active ? ACTIVE_BG : "transparent",
        color: active ? TEXT_PRI : TEXT_SEC,
      }}
      onMouseEnter={(e) => {
        if (!active) e.currentTarget.style.background = HOVER_BG;
      }}
      onMouseLeave={(e) => {
        if (!active) e.currentTarget.style.background = "transparent";
      }}
    >
      <span style={{ color: active ? TEXT_PRI : TEXT_DIM }}>{icon}</span>
      <span className="text-[15px] flex-1 leading-none font-normal">
        {label}
      </span>
      {count !== undefined && count > 0 && (
        <span className="text-[12px] font-medium" style={{ color: TEXT_DIM }}>
          {count}
        </span>
      )}
    </button>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div
      className="flex items-center gap-1"
      style={{ padding: "18px 12px 4px" }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color: TEXT_DIM }}
      >
        {label}
      </span>
    </div>
  );
}

const RECENTS = [
  {
    id: "f5",
    label: "Sprint 14 Notes",
    type: "doc" as const,
    tagColor: "#f59e0b",
    ago: "30m ago",
  },
  {
    id: "f3",
    label: "Onboarding Flow",
    type: "doc" as const,
    tagColor: "#22d3ee",
    ago: "3h ago",
  },
  {
    id: "f1",
    label: "Product Brief v2",
    type: "doc" as const,
    tagColor: "#6366f1",
    ago: "2h ago",
  },
];

export default function Sidebar({
  activeView,
  onViewChange,
  activeFileId,
  onFileChange,
}: SidebarProps) {
  const [expandedFolders, setExpandedFolders] = useState<
    Record<string, boolean>
  >({
    Strategy: true,
    Design: false,
    Engineering: true,
  });

  function toggleFolder(name: string) {
    setExpandedFolders((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  function openFile(id: string) {
    const file = FILES.find((f) => f.id === id);
    if (file) {
      setExpandedFolders((prev) => ({ ...prev, [file.folder]: true }));
    }
    onFileChange(id);
    onViewChange("docs");
  }

  return (
    <div
      className="w-[240px] shrink-0 flex flex-col overflow-hidden"
      style={{
        background: SB,
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Workspace header */}
      <div
        className="flex items-center justify-between px-3 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-[22px] h-[22px] rounded-[4px] bg-black flex items-center justify-center shrink-0 p-[3px]">
            <img
              src="/cube-logo-white.svg"
              alt="Cube"
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className="text-[14px] font-semibold"
            style={{ color: TEXT_PRI }}
          >
            Cube
          </span>
          <ChevronDown size={11} color={TEXT_DIM} strokeWidth={2.2} />
        </div>
        <div className="flex items-center gap-1">
          <button
            className="w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-colors hover:bg-white/[0.05]"
            style={{ color: TEXT_DIM }}
          >
            <Search size={14} strokeWidth={1.8} />
          </button>
          <button
            className="w-6 h-6 flex items-center justify-center rounded cursor-pointer transition-colors hover:bg-white/[0.05]"
            style={{ color: TEXT_DIM }}
          >
            <Plus size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Primary nav — order: Assistant, Messages, Email, Projects, Calendar, Files */}
      <div className="px-1.5 pt-2 flex flex-col">
        <NavItem
          icon={<Sparkles size={16} strokeWidth={1.7} />}
          label="Assistant"
          active={activeView === "chat"}
          onClick={() => onViewChange("chat")}
        />
        <NavItem
          icon={<Inbox size={16} strokeWidth={1.7} />}
          label="Messages"
          count={3}
          active={activeView === "inbox"}
          onClick={() => onViewChange("inbox")}
        />
        <NavItem
          icon={<Mail size={16} strokeWidth={1.7} />}
          label="Email"
          active={activeView === "email"}
          onClick={() => onViewChange("email")}
        />
        <NavItem
          icon={<LayoutDashboard size={16} strokeWidth={1.7} />}
          label="Projects"
          active={activeView === "kanban"}
          onClick={() => onViewChange("kanban")}
        />
        <NavItem
          icon={<Calendar size={16} strokeWidth={1.7} />}
          label="Calendar"
          active={activeView === "calendar"}
          onClick={() => onViewChange("calendar")}
        />
        <NavItem
          icon={<File size={16} strokeWidth={1.7} />}
          label="Files"
          active={activeView === "docs"}
          onClick={() => onViewChange("docs")}
        />
      </div>

      {/* File tree + Recents */}
      <div
        className="mt-1 flex flex-col overflow-y-auto flex-1 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {activeView === "docs" &&
          FOLDERS.map((folder) => {
            const files = FILES.filter((f) => f.folder === folder);
            const isOpen = expandedFolders[folder] ?? false;
            return (
              <div key={folder}>
                <button
                  onClick={() => toggleFolder(folder)}
                  className="w-full flex items-center gap-2 rounded-md cursor-pointer transition-colors"
                  style={{ padding: "7px 12px 7px 16px", color: TEXT_SEC }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = HOVER_BG)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {isOpen ? (
                    <ChevronDown size={10} color={TEXT_DIM} strokeWidth={2.5} />
                  ) : (
                    <ChevronRight
                      size={10}
                      color={TEXT_DIM}
                      strokeWidth={2.5}
                    />
                  )}
                  <Folder size={14} color={TEXT_DIM} strokeWidth={1.8} />
                  <span
                    className="text-[13.5px] font-medium"
                    style={{ color: TEXT_SEC }}
                  >
                    {folder}
                  </span>
                </button>

                {isOpen && (
                  <div className="relative ml-[28px]">
                    <div
                      className="absolute left-[7px] top-0 bottom-1 w-px"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    />
                    {files.map((file) => {
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
                          onMouseEnter={(e) => {
                            if (!isActive)
                              e.currentTarget.style.background = HOVER_BG;
                          }}
                          onMouseLeave={(e) => {
                            if (!isActive)
                              e.currentTarget.style.background = "transparent";
                          }}
                        >
                          <span
                            style={{ color: isActive ? TEXT_PRI : TEXT_DIM }}
                          >
                            <FileTypeIcon type={file.type} />
                          </span>
                          <span className="text-[13px] flex-1 truncate">
                            {file.name}
                          </span>
                          <span
                            className="text-[11px] shrink-0"
                            style={{ color: TEXT_DIM }}
                          >
                            {file.modified}
                          </span>
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
          {RECENTS.map((r) => (
            <button
              key={r.id}
              onClick={() => openFile(r.id)}
              className="w-full flex items-center gap-2.5 rounded-md text-left cursor-pointer transition-colors"
              style={{ padding: "7px 12px", color: TEXT_SEC }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = HOVER_BG)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <span
                className="w-[18px] h-[18px] rounded-[4px] flex items-center justify-center shrink-0"
                style={{ backgroundColor: r.tagColor }}
              >
                <FileText size={10} color="rgba(0,0,0,0.7)" strokeWidth={2} />
              </span>
              <span className="text-[14px] flex-1 truncate font-normal">
                {r.label}
              </span>
              <span
                className="text-[11.5px] shrink-0"
                style={{ color: TEXT_DIM }}
              >
                {r.ago}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* User row */}
      <div
        className="px-3 py-3 flex items-center gap-2.5 cursor-pointer mt-auto"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <img
          src="https://api.dicebear.com/9.x/notionists/svg?seed=CubeUser&backgroundColor=7c3aed"
          alt="You"
          className="w-6 h-6 rounded-full shrink-0 object-cover"
        />
        <span
          className="text-[14px] flex-1 truncate font-normal"
          style={{ color: TEXT_SEC }}
        >
          You
        </span>
        <button
          className="cursor-pointer transition-colors"
          style={{ color: TEXT_DIM }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color = TEXT_SEC)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color = TEXT_DIM)
          }
        >
          <MoreHorizontal size={13} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
