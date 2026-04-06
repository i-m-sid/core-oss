import { useState } from "react";
import type { DemoView } from "./types";
import Sidebar from "./Sidebar";
import InboxView from "./InboxView";
import EmailView from "./EmailView";
import ChatView from "./ChatView";
import KanbanView from "./KanbanView";
import DocsView from "./DocsView";
import CalendarView from "./CalendarView";

export default function MainDemo() {
  const [activeView, setActiveView] = useState<DemoView>("inbox");
  const [activeFileId, setActiveFileId] = useState<string>("f1");

  return (
    <div
      className="w-full rounded-t-2xl overflow-hidden font-geist"
      style={{
        height: "780px",
        background: "#111213",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.8)",
      }}
    >
      <div
        className="h-full flex rounded-t-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          activeFileId={activeFileId}
          onFileChange={setActiveFileId}
        />

        {/* Main content */}
        <div className="flex flex-1 min-w-0 overflow-hidden" style={{ background: "#121314" }}>
          {activeView === "inbox"  && <InboxView />}
          {activeView === "email"  && <EmailView />}
          {activeView === "chat"   && <ChatView />}
          {activeView === "kanban"   && <KanbanView />}
          {activeView === "docs"     && <DocsView activeFileId={activeFileId} />}
          {activeView === "calendar" && <CalendarView />}
        </div>
      </div>
    </div>
  );
}
