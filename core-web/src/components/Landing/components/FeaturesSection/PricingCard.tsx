import { motion } from "motion/react";

const PERKS = [
  "Unlimited AI messages",
  "All integrations included",
  "No seat limits",
];

interface PricingCardProps {
  onGetStarted: () => void;
}

export default function PricingCard({ onGetStarted }: PricingCardProps) {
  return (
    <motion.div
      className="col-span-1 md:col-span-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111213] p-7 flex flex-col"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      {/* Label */}
      <motion.p
        className="text-[11px] font-medium tracking-widest uppercase text-white/25 mb-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Pricing
      </motion.p>

      {/* Price */}
      <motion.div
        className="mb-1"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[52px] font-semibold tracking-[-2px] text-white leading-none">$0</span>
      </motion.div>

      <motion.p
        className="text-[13px] text-white/30 mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        Free while in beta
      </motion.p>

      {/* Perks */}
      <div className="space-y-3 flex-1">
        {PERKS.map((perk, i) => (
          <motion.div
            key={perk}
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 + i * 0.07, duration: 0.35 }}
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <polyline points="3 8 6.5 11.5 13 5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[13px] text-white/40">{perk}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        onClick={onGetStarted}
        className="mt-8 w-full py-2.5 rounded-xl bg-white/[0.07] border border-white/[0.09] text-[13px] font-medium text-white/60 hover:bg-white/[0.10] hover:text-white/80 transition-colors cursor-pointer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        Get started free
      </motion.button>
    </motion.div>
  );
}
