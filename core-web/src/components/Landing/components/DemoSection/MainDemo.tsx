import { useState } from "react";
import type { DemoView } from "./types";
import Sidebar from "./Sidebar";
import InboxView from "./InboxMock";
import EmailView from "./EmailMock";
import ChatView from "./ChatMock";
import DocsMock from "./DocsMock";
import CalendarMock from "./CalendarMock";
import KanbanMock from "./KanbanMock";

export default function MainDemo() {
  const [activeView, setActiveView] = useState<DemoView>("inbox");
  const [activeFileId, setActiveFileId] = useState<string>("f1");

  return (
    <div className="w-full h-190 mt-5 rounded-lg overflow-hidden font-geist shadow-xl shadow-black flex border border-white/6 backdrop-blur-sm bg-[#111213]/75">
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        activeFileId={activeFileId}
        onFileChange={setActiveFileId}
      />

      {/* Main content */}
      <div className="flex flex-1 min-w-0 overflow-hidden bg-[#121314]">
        {activeView === "inbox" && <InboxView />}
        {activeView === "email" && <EmailView />}
        {activeView === "chat" && <ChatView />}
        {activeView === "kanban" && <KanbanMock />}
        {activeView === "docs" && <DocsMock activeFileId={activeFileId} />}
        {activeView === "calendar" && <CalendarMock />}
      </div>
    </div>
  );
}
