import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FAQS = [
  {
    q: "What is Cube?",
    a: "Cube is an all-in-one workspace that brings together email, chat, calendar, and AI into a single connected product. Instead of switching between apps, everything your team needs lives in one place — with AI woven throughout to help you move faster.",
  },
  {
    q: "How does the AI integration work?",
    a: "Cube's AI understands the full context of your workspace — your emails, conversations, calendar events, and documents. You can ask it to draft replies, summarise threads, schedule meetings, find files, or surface anything from across your work. It's always available in a side panel, not hidden behind a separate app.",
  },
  {
    q: "Is Cube a replacement for my current email client?",
    a: "Yes. Cube connects directly to your existing email accounts (Gmail, Outlook, etc.) and gives you a faster, smarter inbox. You keep your existing address — Cube just becomes the place you read and send from, with AI-assisted triage and drafting built in.",
  },
  {
    q: "Who is Cube built for?",
    a: "Cube is designed for teams that are tired of juggling too many communication tools. It works well for startups, growing companies, and any team where email, internal chat, and calendar are all central to how work gets done.",
  },
  {
    q: "Is my data private and secure?",
    a: "Yes. All data is encrypted in transit and at rest. We do not train AI models on your data, and your workspace contents are never shared across customers. We follow industry-standard security practices and can provide a DPA on request.",
  },
  {
    q: "Can I try Cube for free?",
    a: "Absolutely. You can get started for free — no credit card required. The free plan gives you full access to core features so you can evaluate Cube properly before committing.",
  },
];

function FaqItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof FAQS)[number];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: EASE }}
    >
      <button
        onClick={onToggle}
        className="group w-full cursor-pointer text-left"
        aria-expanded={isOpen}
      >
        <div
          className="  px-6 py-5 border-b border-neutral-800 transition-all duration-300"
         
        >
          {/* Trigger row */}
          <div className="flex items-center justify-between gap-4">
            <span
              className="text-[15px] font-medium leading-snug transition-colors duration-200"
              style={{ color: isOpen ? "#ffffff" : "#d0d0d8" }}
            >
              {item.q}
            </span>

            {/* +/× icon */}
            <span
              className="relative flex h-5 w-5 shrink-0 items-center justify-center"
              aria-hidden
            >
              {/* Horizontal bar — always visible */}
              <span
                className="absolute h-[1.5px] w-[14px] rounded-full transition-all duration-300"
                style={{
                  background: isOpen
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.3)",
                }}
              />
              {/* Vertical bar — rotates away when open */}
              <span
                className="absolute h-[14px] w-[1.5px] rounded-full transition-all duration-300"
                style={{
                  background: isOpen
                    ? "rgba(255,255,255,0.5)"
                    : "rgba(255,255,255,0.3)",
                  transform: isOpen ? "scaleY(0)" : "scaleY(1)",
                  opacity: isOpen ? 0 : 1,
                }}
              />
            </span>
          </div>

          {/* Answer */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ overflow: "hidden" }}
              >
                <p
                  className="mt-4 text-[14px] font-light leading-relaxed"
                  style={{ color: "#606068" }}
                >
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </button>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section id="pricing" className="relative z-10 w-full bg-black font-geist">
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mx-auto w-full max-w-3xl px-6 py-24 md:py-32">
        {/* Heading */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <motion.h2
            className="text-4xl font-semibold tracking-[-1px] text-white md:text-5xl"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.04, duration: 0.45 }}
          >
            Frequently asked questions
          </motion.h2>
          <motion.p
            className="mt-4 text-[16px] font-light leading-relaxed"
            style={{ color: "#606068" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.45 }}
          >
            Everything you need to know about Cube.
          </motion.p>
        </motion.div>

        {/* Accordion list */}
        <div className="flex flex-col gap-2.5">
          {FAQS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
