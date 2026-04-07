import { motion } from "motion/react";

// ── Desktop layout (800×460 viewBox) ──────────────────────────────────────
const VW = 800;
const VH = 460;
const CX = VW / 2;
const CY = VH / 2;

const NODES_DESKTOP = [
  { id: "mail",      label: "Mail",      x: 100, y: 130 },
  { id: "calendar",  label: "Calendar",  x: 100, y: 330 },
  { id: "messages",  label: "Messages",  x: 700, y: 130 },
  { id: "files",     label: "Files",     x: 700, y: 330 },
];

const PATHS_DESKTOP: Record<string, string> = {
  mail:     `M 100 130 C 220 130 320 200 ${CX} ${CY}`,
  calendar: `M 100 330 C 220 330 320 260 ${CX} ${CY}`,
  messages: `M 700 130 C 580 130 480 200 ${CX} ${CY}`,
  files:    `M 700 330 C 580 330 480 260 ${CX} ${CY}`,
};

// ── Icon SVGs ─────────────────────────────────────────────────────────────

function MailIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

function CalendarIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <path d="M16 2v4M8 2v4M3 10h18"/>
      <circle cx="12" cy="16" r="1.5" fill="rgba(255,255,255,0.85)" stroke="none"/>
    </svg>
  );
}

function MessagesIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}

function FilesIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="8" y1="13" x2="16" y2="13"/>
      <line x1="8" y1="17" x2="12" y2="17"/>
    </svg>
  );
}

const ICON_COMPONENTS: Record<string, React.FC<{ size: number }>> = {
  mail: MailIcon,
  calendar: CalendarIcon,
  messages: MessagesIcon,
  files: FilesIcon,
};

// ── Desktop: Flowing beam ─────────────────────────────────────────────────

function FlowBeam({ d, delay }: { d: string; delay: number }) {
  return (
    <g>
      <path d={d} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 6" />
      <motion.path
        d={d}
        fill="none"
        stroke="rgba(139,92,246,0.55)"
        strokeWidth="1.5"
        strokeDasharray="18 120"
        strokeLinecap="round"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -138 }}
        transition={{ duration: 2.2, delay, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      />
    </g>
  );
}

// ── Desktop: Icon node ────────────────────────────────────────────────────

function IconNodeDesktop({ node, delay }: { node: typeof NODES_DESKTOP[0]; delay: number }) {
  const S = 48;
  const R = 11;
  const IconComp = ICON_COMPONENTS[node.id];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${node.x}px ${node.y}px` }}
    >
      <rect x={node.x - S / 2 - 4} y={node.y - S / 2 - 4} width={S + 8} height={S + 8} rx={R + 4} fill="rgba(139,92,246,0.06)" />
      <rect x={node.x - S / 2} y={node.y - S / 2} width={S} height={S} rx={R} fill="#1a1b1f" />
      <rect x={node.x - S / 2} y={node.y - S / 2} width={S} height={S} rx={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <foreignObject x={node.x - 11} y={node.y - 11} width="22" height="22">
        <div style={{ width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconComp size={22} />
        </div>
      </foreignObject>
      <text x={node.x} y={node.y + S / 2 + 16} textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.25)" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.02em">
        {node.label}
      </text>
    </motion.g>
  );
}

// ── Desktop: Center hub ───────────────────────────────────────────────────

function CenterHubDesktop() {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: `${CX}px ${CY}px` }}
    >
      <circle cx={CX} cy={CY} r={58} fill="rgba(99,102,241,0.05)" />
      <circle cx={CX} cy={CY} r={46} fill="rgba(99,102,241,0.07)" />
      <circle cx={CX} cy={CY} r={36} fill="rgba(99,102,241,0.09)" />
      <circle cx={CX} cy={CY} r={30} fill="#1a1b1f" />
      <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(139,92,246,0.25)" strokeWidth="1" />
      <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      <foreignObject x={CX - 14} y={CY - 14} width="28" height="28">
        <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src="/cube-logo-white.svg" alt="Cube" style={{ width: 20, height: 20, opacity: 0.8 }} />
        </div>
      </foreignObject>
    </motion.g>
  );
}

// ── Mobile: CSS grid 3×3 layout ──────────────────────────────────────────
//
//  [Mail]   [h-arm]  [hub]  [h-arm]  [Messages]
//  (empty)  (empty) [v-arm] (empty)  (empty)
//  [Cal]    [h-arm]  [spc]  [h-arm]  [Files]
//
// Hub lives at grid center. Connectors fill the gap cells.
// Everything is proportional — no fixed pixel widths that overflow.

function MobileIntegrationTile({ id, label, delay }: { id: string; label: string; delay: number }) {
  const IconComp = ICON_COMPONENTS[id];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7 }}
    >
      <div style={{
        width: 52,
        height: 52,
        borderRadius: 14,
        background: "#17181d",
        border: "1px solid rgba(139,92,246,0.22)",
        boxShadow: "0 0 0 4px rgba(139,92,246,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <IconComp size={22} />
      </div>
      <span style={{
        fontSize: 11,
        color: "rgba(255,255,255,0.32)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        letterSpacing: "0.03em",
        whiteSpace: "nowrap",
      }}>
        {label}
      </span>
    </motion.div>
  );
}

function MobileCenterHub() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#17181d",
        border: "1.5px solid rgba(139,92,246,0.38)",
        boxShadow: "0 0 0 8px rgba(99,102,241,0.07), 0 0 0 16px rgba(99,102,241,0.04), 0 0 28px rgba(139,92,246,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <img src="/cube-logo-white.svg" alt="Cube" style={{ width: 24, height: 24, opacity: 0.85 }} />
    </motion.div>
  );
}

// A 1px line with a traveling violet glow — fills its grid cell fully
function MobileArm({ direction, delay }: { direction: "h" | "v"; delay: number }) {
  const isH = direction === "h";
  return (
    <div style={{
      position: "relative",
      width: isH ? "100%" : 1,
      height: isH ? 1 : "100%",
      overflow: "hidden",
      background: "rgba(255,255,255,0.07)",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: isH
          ? "repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 3px, transparent 3px, transparent 8px)"
          : "repeating-linear-gradient(180deg, rgba(255,255,255,0.1) 0, rgba(255,255,255,0.1) 3px, transparent 3px, transparent 8px)",
      }} />
      <motion.div
        style={{
          position: "absolute",
          background: isH
            ? "linear-gradient(90deg, transparent, rgba(139,92,246,0.75), transparent)"
            : "linear-gradient(180deg, transparent, rgba(139,92,246,0.75), transparent)",
          ...(isH
            ? { top: "-2px", bottom: "-2px", width: "45%", left: "-45%" }
            : { left: "-2px", right: "-2px", height: "45%", top: "-45%" }),
        }}
        animate={isH ? { left: ["-45%", "145%"] } : { top: ["-45%", "145%"] }}
        transition={{ duration: 1.8, delay, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      />
    </div>
  );
}

function MobileDiagramGrid() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "auto 1fr auto 1fr auto",
      gridTemplateRows: "auto 36px auto 36px auto",
      alignItems: "center",
      justifyItems: "center",
      padding: "28px 20px 24px",
      gap: 0,
    }}>
      {/* Row 0 */}
      <MobileIntegrationTile id="mail"     label="Mail"     delay={0.1} />
      <div />
      <div />
      <div />
      <MobileIntegrationTile id="messages" label="Messages"  delay={0.3} />

      {/* Row 1: v-arm centered */}
      <div />
      <div />
      <MobileArm direction="v" delay={0.15} />
      <div />
      <div />

      {/* Row 2: h-arms + hub */}
      <div />
      <MobileArm direction="h" delay={0.2} />
      <MobileCenterHub />
      <MobileArm direction="h" delay={0.5} />
      <div />

      {/* Row 3: v-arm centered */}
      <div />
      <div />
      <MobileArm direction="v" delay={0.4} />
      <div />
      <div />

      {/* Row 4 */}
      <MobileIntegrationTile id="calendar" label="Calendar" delay={0.2} />
      <div />
      <div />
      <div />
      <MobileIntegrationTile id="files"    label="Files"    delay={0.15} />
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────

export default function IntegrationsCard() {
  return (
    <motion.div
      className="col-span-1 md:col-span-2 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-5 md:p-8"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6 md:mb-8">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z"/>
            <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <div>
          <h3 className="text-[17px] font-semibold tracking-[-0.3px] text-[#f0f0f0]">Everything flows into one place</h3>
          <p className="mt-1 text-[14px] leading-relaxed text-[#606068]">
            Connect your tools once. Mail, calendar, messages, and files — all pulled into Cube so nothing slips through.
          </p>
        </div>
      </div>

      {/* Mobile canvas — HTML grid */}
      <div
        className="block md:hidden w-full rounded-xl overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 50% 55%, rgba(99,102,241,0.08) 0%, transparent 60%), #0d0e0f",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <MobileDiagramGrid />
      </div>

      {/* Desktop canvas — SVG */}
      <div
        className="hidden md:block w-full rounded-xl overflow-hidden"
        style={{
          height: "460px",
          background: "radial-gradient(ellipse at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 60%), #0d0e0f",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <svg width="100%" height="100%" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid meet">
          {NODES_DESKTOP.map((node, i) => (
            <FlowBeam key={node.id} d={PATHS_DESKTOP[node.id]} delay={i * 0.35} />
          ))}
          <CenterHubDesktop />
          {NODES_DESKTOP.map((node, i) => (
            <IconNodeDesktop key={node.id} node={node} delay={0.1 + i * 0.08} />
          ))}
        </svg>
      </div>
    </motion.div>
  );
}
