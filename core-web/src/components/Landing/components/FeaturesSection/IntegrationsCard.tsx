import { motion } from "motion/react";
import { Mail, Calendar, MessageSquare, LayoutGrid, FileText, Layers } from "lucide-react";

// ── Layout constants ───────────────────────────────────────────────────────
const VW = 860;
const VH = 340;

// 5 nodes evenly distributed vertically, aligned on x=220
const NODE_X = 220;
const PADDING = 50;
const STEP = (VH - PADDING * 2) / 4;

const SOURCES = [
  { id: "mail",     x: NODE_X, y: PADDING },
  { id: "calendar", x: NODE_X, y: PADDING + STEP },
  { id: "messages", x: NODE_X, y: PADDING + STEP * 2 },
  { id: "projects", x: NODE_X, y: PADDING + STEP * 3 },
  { id: "files",    x: NODE_X, y: PADDING + STEP * 4 },
];

// Hub centered vertically, 2/3 across
const HUB = { x: 620, y: VH / 2 };

// Smooth bezier: leave horizontally, arrive at hub
function curvePath(src: { x: number; y: number }) {
  const cp1x = src.x + (HUB.x - src.x) * 0.5;
  const cp1y = src.y;
  const cp2x = HUB.x - (HUB.x - src.x) * 0.2;
  const cp2y = HUB.y;
  return `M ${src.x} ${src.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${HUB.x} ${HUB.y}`;
}

// ── Icon map ───────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.FC<{ size?: number; color?: string; strokeWidth?: number }>> = {
  mail:     (p) => <Mail     {...p} />,
  calendar: (p) => <Calendar {...p} />,
  messages: (p) => <MessageSquare {...p} />,
  projects: (p) => <LayoutGrid   {...p} />,
  files:    (p) => <FileText     {...p} />,
};

// ── Animated beam traveling along a path ──────────────────────────────────

function StreamBeam({ d, delay, duration }: { d: string; delay: number; duration: number }) {
  return (
    <g>
      {/* Static track */}
      <path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />
      {/* Traveling particle */}
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="12 300"
        strokeDashoffset={0}
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -312 }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      />
    </g>
  );
}

// ── Source node ───────────────────────────────────────────────────────────

function SourceNode({ node, delay }: { node: typeof SOURCES[0]; delay: number }) {
  const IconComp = ICON_MAP[node.id];
  const NW = 38;

  return (
    <motion.g
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Node box */}
      <rect
        x={node.x - NW / 2}
        y={node.y - NW / 2}
        width={NW}
        height={NW}
        rx={10}
        fill="#17181c"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      {/* Icon */}
      <foreignObject x={node.x - 8} y={node.y - 8} width="16" height="16">
        <div style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconComp size={14} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
        </div>
      </foreignObject>
    </motion.g>
  );
}

// ── Hub node ──────────────────────────────────────────────────────────────

function HubNode() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
    >
      {/* Outer glow ring */}
      <circle cx={HUB.x} cy={HUB.y} r={44} fill="rgba(255,255,255,0.015)" />
      <circle cx={HUB.x} cy={HUB.y} r={34} fill="rgba(255,255,255,0.025)" />
      {/* Main circle */}
      <circle cx={HUB.x} cy={HUB.y} r={26} fill="#1c1d21" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      {/* Logo */}
      <foreignObject x={HUB.x - 11} y={HUB.y - 11} width="22" height="22">
        <div style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/cube-logo-white.svg" alt="Cube" style={{ width: 18, height: 18, opacity: 0.85 }} />
        </div>
      </foreignObject>
    </motion.g>
  );
}

// ── Mobile layout — stacked pills with animated dots ─────────────────────

function MobilePill({ id, delay }: { id: string; delay: number }) {
  const IconComp = ICON_MAP[id];
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03]"
    >
      <IconComp size={14} color="rgba(255,255,255,0.7)" strokeWidth={1.6} />
      {/* Animated activity dot */}
      <motion.span
        className="ml-auto w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"
        animate={{ opacity: [0.2, 0.7, 0.2] }}
        transition={{ duration: 2, delay: delay * 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function IntegrationsCard() {
  return (
    <motion.div
      className="col-span-1 md:col-span-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-5 md:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          <Layers size={15} color="white" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Everything flows into one place</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Connect your tools once. Mail, calendar, messages, projects, and files — all pulled into Cube so nothing slips through.
          </p>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-2 py-4">
        {SOURCES.map((s, i) => (
          <MobilePill key={s.id} id={s.id} delay={i * 0.07} />
        ))}
        <div className="flex justify-center pt-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.14] bg-white/[0.06]"
          >
            <img src="/cube-logo-white.svg" alt="Cube" className="w-4 h-4 opacity-90" />
          </motion.div>
        </div>
      </div>

      {/* Desktop — SVG canvas */}
      <div className="hidden md:block">
        <svg
          width="100%"
          height={VH}
          viewBox={`0 0 ${VW} ${VH}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Beams — render behind nodes */}
          {SOURCES.map((src, i) => (
            <StreamBeam
              key={src.id}
              d={curvePath(src)}
              delay={i * 0.28}
              duration={1.8 + i * 0.12}
            />
          ))}

          {/* Source nodes */}
          {SOURCES.map((node, i) => (
            <SourceNode key={node.id} node={node} delay={0.05 + i * 0.08} />
          ))}

          {/* Hub */}
          <HubNode />
        </svg>
      </div>
    </motion.div>
  );
}
