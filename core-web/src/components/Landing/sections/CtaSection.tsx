import { motion } from "motion/react";

interface CtaSectionProps {
  onGetStarted: () => void;
}

export default function CtaSection({ onGetStarted }: CtaSectionProps) {
  return (
    <section className="relative z-10 bg-black/90 w-full flex flex-col items-center py-24 md:py-32 px-4">
      <motion.div
        className="max-w-3xl w-full mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.h2
          className="font-geist text-3xl md:text-6xl font-medium tracking-tight text-white mb-6"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.04, duration: 0.45 }}
        >
          Start using Cube today.
        </motion.h2>

        <motion.p
          className="text-[17px] leading-relaxed mb-10"
          style={{ color: "#707078" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          Free, forever. No credit card required.
        </motion.p>

        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.45 }}
        >
          <button
            onClick={onGetStarted}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3 text-[14px] font-medium text-black transition-all hover:opacity-90 active:scale-[0.98]"
            style={{ background: "#fff" }}
          >
            Get started free
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
