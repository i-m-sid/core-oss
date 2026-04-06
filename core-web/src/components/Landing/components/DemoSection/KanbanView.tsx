import { useState } from "react";

type ColumnId = "in-progress" | "todo" | "done";

interface Card {
  id: string;
  title: string;
  assignee?: string;
  date?: string;
  commentCount?: number;
}

interface Column {
  id: ColumnId;
  label: string;
  cards: Card[];
}

const INITIAL_COLUMNS: Column[] = [
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


const T_PRI = "#dddde0";
const T_SEC = "#909096";
const T_DIM = "#484850";
const COL_DIVIDER = "rgba(255,255,255,0.05)";

export default function KanbanView() {
  const [cols, setCols] = useState<Column[]>(INITIAL_COLUMNS);
  const [dragging, setDragging] = useState<{ cardId: string; fromCol: ColumnId } | null>(null);
  const [dragOver, setDragOver]   = useState<ColumnId | null>(null);

  function handleDragStart(cardId: string, fromCol: ColumnId) {
    setDragging({ cardId, fromCol });
  }

  function handleDrop(toCol: ColumnId) {
    if (!dragging || dragging.fromCol === toCol) {
      setDragging(null);
      setDragOver(null);
      return;
    }
    setCols(prev => {
      const next = prev.map(c => ({ ...c, cards: [...c.cards] }));
      const from = next.find(c => c.id === dragging.fromCol)!;
      const to   = next.find(c => c.id === toCol)!;
      const [card] = from.cards.splice(from.cards.findIndex(c => c.id === dragging.cardId), 1);
      to.cards.push(card);
      return next;
    });
    setDragging(null);
    setDragOver(null);
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full" style={{ background: "#121314" }}>

      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T_DIM} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
          </svg>
          <span className="text-[14px] font-semibold" style={{ color: T_PRI }}>Cube Web</span>
          <span className="text-[12px]" style={{ color: T_DIM }}>/ Board</span>
        </div>
        <button
          className="flex items-center gap-1.5 text-[12px] cursor-pointer transition-colors"
          style={{ color: T_DIM }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filter
        </button>
      </div>

      {/* Board — columns separated by a faint divider, no bg */}
      <div className="flex-1 flex overflow-hidden">
        {cols.map((col, colIdx) => (
          <div
            key={col.id}
            className="flex flex-col flex-1 min-w-0 pt-5 px-4 pb-4"
            style={{
              borderRight: colIdx < cols.length - 1 ? `1px solid ${COL_DIVIDER}` : "none",
              background: dragOver === col.id ? "rgba(255,255,255,0.015)" : "transparent",
              transition: "background 0.15s",
            }}
            onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={() => handleDrop(col.id)}
          >
            {/* Column header */}
            <div className="flex items-center gap-2 mb-4 px-0.5">
              <span className="text-[12.5px] font-medium tracking-wide" style={{ color: T_SEC }}>
                {col.label}
              </span>
              <span
                className="text-[11px] tabular-nums px-1.5 py-0.5 rounded"
                style={{ color: T_DIM, background: "rgba(255,255,255,0.05)" }}
              >
                {col.cards.length}
              </span>
              <button
                className="ml-auto w-5 h-5 flex items-center justify-center rounded cursor-pointer transition-colors"
                style={{ color: T_DIM }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = T_SEC}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = T_DIM}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-2 flex-1">
              {col.cards.map(card => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(card.id, col.id)}
                  onDragEnd={() => { setDragging(null); setDragOver(null); }}
                  className="rounded-xl p-3.5 cursor-grab active:cursor-grabbing select-none transition-colors"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"}
                >
                  {/* Title */}
                  <div className="mb-3">
                    <span className="text-[13px] leading-snug" style={{ color: T_PRI }}>{card.title}</span>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px]" style={{ color: T_DIM }}>{card.id}</span>
                    <div className="flex items-center gap-2 ml-auto shrink-0">
                      {card.commentCount && (
                        <div className="flex items-center gap-1" style={{ color: T_DIM }}>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                          </svg>
                          <span className="text-[11px]">{card.commentCount}</span>
                        </div>
                      )}
                      {card.date && (
                        <span className="text-[11px]" style={{ color: T_DIM }}>{card.date}</span>
                      )}
                      {card.assignee && (
                        <div className="w-[18px] h-[18px] rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                          <span className="text-white font-bold" style={{ fontSize: "7px" }}>{card.assignee}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {col.cards.length === 0 && (
                <div className="flex items-center justify-center py-6">
                  <span className="text-[12px]" style={{ color: T_DIM }}>No cards</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
