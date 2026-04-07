import { motion } from "motion/react";
import { AIChatCard, TeamInboxCard, CalendarCard, IntegrationsCard, PricingCard } from "../components/FeaturesSection";
import { FEATURES_HEADING, FEATURES_SUBHEADING } from "../constants/featuresData";

interface FeaturesSectionProps {
  onGetStarted: () => void;
}

export default function FeaturesSection({ onGetStarted }: FeaturesSectionProps) {
  return (
    <section id="features" className="relative w-full bg-black font-geist">
      {/* Subtle top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto w-screen max-w-375 px-6 py-28">

        {/* Section heading */}
        <motion.div
          className="mb-14 flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2
            className="text-4xl font-semibold tracking-[-1px] text-white md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04, duration: 0.45 }}
          >
            {FEATURES_HEADING}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#606068] font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            {FEATURES_SUBHEADING}
          </motion.p>
        </motion.div>

        {/* Card grid */}
        <div className="flex flex-col gap-5">
          {/* Row 1: AIChatCard (full) + TeamInboxCard (half) + CalendarCard (half) */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <AIChatCard />
            <TeamInboxCard />
            <CalendarCard />
          </div>
          {/* Row 2: IntegrationsCard (3/4) + PricingCard (1/4) */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            <IntegrationsCard />
            <PricingCard onGetStarted={onGetStarted} />
          </div>
        </div>

      </div>
    </section>
  );
}
