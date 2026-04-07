import { useState } from "react";
import type { DemoView } from "./types";
import Sidebar from "./Sidebar";
import InboxView from "./InboxMock";
import EmailView from "./EmailMock";
import ChatView from "./ChatMock";
import KanbanView from "./KanbanView";
import DocsView from "./DocsView";
import CalendarView from "./CalendarView";

export default function MainDemo() {
  const [activeView, setActiveView] = useState<DemoView>("inbox");
  const [activeFileId, setActiveFileId] = useState<string>("f1");

  return (
    <div className="w-full h-180 mt-5 rounded-lg overflow-hidden font-geist bg-[#111213] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_32px_80px_rgba(0,0,0,0.8)]">
      <div className="h-full flex rounded-lg overflow-hidden border border-white/6">
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          activeFileId={activeFileId}
          onFileChange={setActiveFileId}
        />

        {/* Main content */}
        <div className="flex flex-1 min-w-0 overflow-hidden bg-[#121314]">
          {activeView === "inbox"    && <InboxView />}
          {activeView === "email"    && <EmailView />}
          {activeView === "chat"     && <ChatView />}
          {activeView === "kanban"   && <KanbanView />}
          {activeView === "docs"     && <DocsView activeFileId={activeFileId} />}
          {activeView === "calendar" && <CalendarView />}
        </div>
      </div>
    </div>
  );
}
