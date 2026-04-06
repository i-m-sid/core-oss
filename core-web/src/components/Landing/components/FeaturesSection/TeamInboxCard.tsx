import { useState } from "react";
import { motion } from "motion/react";

export default function TeamInboxCard() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      className="col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-7"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start gap-3 mb-7">
          <div className="mt-0.5 w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div>
            <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Shared team inbox</h3>
            <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
              Every message, thread, and notification in one place. See who's reading what, live.
            </p>
          </div>
        </div>

        {/* Interactive area */}
        <div className="relative mt-2 flex grow items-center justify-center py-4">
          <div
            className="relative h-56 w-full cursor-none overflow-hidden rounded-xl border border-white/[0.05] bg-[#0e0f10]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
          >
            {/* Thread rows bg */}
            <div className="absolute inset-0 flex flex-col justify-center gap-3 px-4 opacity-50">
              <div className="h-10 w-full rounded-md bg-white/[0.04]" />
              <div className="flex gap-2">
                <div className="h-10 w-1/3 rounded-md bg-sky-500/10" />
                <div className="h-10 w-1/4 rounded-md bg-violet-500/10" />
                <div className="h-10 w-1/3 rounded-md bg-teal-500/10" />
              </div>
              <div className="h-10 w-full rounded-md bg-white/[0.04]" />
            </div>

            {/* Siddhant selection highlight */}
            <div className="pointer-events-none absolute inset-x-4 top-1/2 h-10 -translate-y-1/2">
              <div
                className="absolute left-0 h-full w-[55%] rounded-md border-2 border-sky-500/50 bg-sky-500/10"
                style={{ animation: "pulse 2s cubic-bezier(0.4,0,0.6,1) infinite" }}
              >
                <div className="absolute -top-3 -right-3 z-20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0ea5e9" stroke="#0ea5e9" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
                  </svg>
                  <div className="-mt-2 ml-3.5 rounded-md bg-sky-500 px-1.5 py-0.5 text-[9px] font-medium text-white shadow-sm whitespace-nowrap">
                    Siddhant
                  </div>
                </div>
              </div>
            </div>

            {/* Meet cursor — wandering */}
            <div
              className="pointer-events-none absolute z-20"
              style={{
                left: "62%",
                top: "28%",
                animation: "meetWander 3s ease-in-out infinite alternate",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#0d9488" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
              </svg>
              <div className="-mt-1.5 ml-3.5 rounded-md bg-teal-600 px-1.5 py-0.5 text-[9px] font-medium text-white shadow-sm whitespace-nowrap">
                Meet
              </div>
            </div>

            {/* Toast */}
            <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#18191c]/90 px-3 py-1.5 shadow-xl backdrop-blur-md whitespace-nowrap">
              <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center shrink-0">
                <span className="text-white font-bold" style={{ fontSize: "7px" }}>SC</span>
              </div>
              <span className="text-[11px] text-[#c0c0c6]">Siddhant replied to PR #48</span>
            </div>

            {/* You cursor */}
            <div
              className="pointer-events-none absolute z-50 transition-opacity duration-150"
              style={{
                opacity: isHovering ? 1 : 0,
                top: 0,
                left: 0,
                transform: `translateX(${mousePos.x}px) translateY(${mousePos.y}px)`,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"/>
              </svg>
              <div className="-mt-1.5 ml-3.5 rounded-md bg-white px-1.5 py-0.5 text-[9px] font-medium text-black shadow-sm">
                You
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes meetWander {
          0%   { transform: translate(0px, 0px); }
          33%  { transform: translate(-18px, 22px); }
          66%  { transform: translate(12px, -14px); }
          100% { transform: translate(-8px, 30px); }
        }
      `}</style>
    </motion.div>
  );
}
