import { motion } from "motion/react";

const MEMBERS = [
  { seed: "Siddhant", url: "https://api.dicebear.com/9.x/notionists/svg?seed=Siddhant&backgroundColor=0ea5e9" },
  { seed: "MeetK",    url: "https://api.dicebear.com/9.x/notionists/svg?seed=MeetK&backgroundColor=0f766e"   },
  { seed: "AbhiS",    url: "https://api.dicebear.com/9.x/notionists/svg?seed=AbhiS&backgroundColor=7c3aed"  },
  { seed: "YouUser",  url: "https://api.dicebear.com/9.x/notionists/svg?seed=YouUser&backgroundColor=6366f1" },
  { seed: "Casey",    url: "https://api.dicebear.com/9.x/notionists/svg?seed=Casey&backgroundColor=0891b2"   },
];

// All geometry in px — avatars are 48px, orbit radius 90px
// Container must be 2*(R+AV) = 2*(90+24) = 228 → use 240 for breathing room
const R   = 90;
const AV  = 24; // half of 48px avatar
const BOX = 240;
const C   = BOX / 2; // center = 120

export default function TeamInboxCard() {
  return (
    <motion.div
      className="col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-7 flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Your team, one workspace</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Invite your team. Everyone works from the same page — no silos, no missed context.
          </p>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative rounded-xl flex items-center justify-center"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.07) 0%, transparent 65%)", minHeight: "260px" }}
      >
        {/* Cluster — fixed size box, everything positioned inside */}
        <div className="relative shrink-0" style={{ width: BOX, height: BOX }}>

          {/* Orbit ring — SVG perfectly centered in the box */}
          <svg
            width={BOX} height={BOX}
            viewBox={`0 0 ${BOX} ${BOX}`}
            className="absolute inset-0 pointer-events-none"
          >
            <circle cx={C} cy={C} r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
            {MEMBERS.map((m, i) => {
              const a  = (i / MEMBERS.length) * 2 * Math.PI - Math.PI / 2;
              return (
                <line
                  key={m.seed}
                  x1={C} y1={C}
                  x2={C + Math.cos(a) * R}
                  y2={C + Math.sin(a) * R}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Avatars — HTML img, positioned with inline style */}
          {MEMBERS.map((m, i) => {
            const a  = (i / MEMBERS.length) * 2 * Math.PI - Math.PI / 2;
            const cx = C + Math.cos(a) * R; // center x of avatar
            const cy = C + Math.sin(a) * R; // center y of avatar
            return (
              <motion.img
                key={m.seed}
                src={m.url}
                alt={m.seed}
                className="absolute rounded-full bg-[#1a1b1e]"
                style={{
                  width:  AV * 2,
                  height: AV * 2,
                  left:   cx - AV,
                  top:    cy - AV,
                  boxShadow: "0 0 0 2px #111213, 0 4px 12px rgba(0,0,0,0.5)",
                }}
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              />
            );
          })}

          {/* Center — Cube logo */}
          <motion.div
            className="absolute rounded-full bg-[#18191c] flex items-center justify-center"
            style={{
              width:  AV * 2,
              height: AV * 2,
              left:   C - AV,
              top:    C - AV,
              boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 20px rgba(99,102,241,0.2)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <img src="/cube-logo-white.svg" alt="Cube" style={{ width: 20, height: 20, opacity: 0.65 }} />
          </motion.div>

        </div>

      </div>
    </motion.div>
  );
}
