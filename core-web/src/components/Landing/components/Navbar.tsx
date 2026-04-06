import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { NAV } from "../constants/landingData";

interface NavbarProps {
  onGetStarted: () => void;
}

export default function Navbar({ onGetStarted }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 60;
    if (next !== isScrolled) setIsScrolled(next);
  });

  const shellStyles = {
    backgroundColor: isScrolled ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0)",
    backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
    WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
    boxShadow: isScrolled
      ? "0 0 0 1px rgba(255,255,255,0.10), 0 8px 32px -8px rgba(0,0,0,0.3)"
      : "none",
  };

  return (
    <motion.header
      className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between px-4 py-0 w-[calc(100%-3rem)] max-w-[2000px] md:w-[calc(100%-6rem)] xl:w-[calc(100%-12rem)]"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Left — logo + brand + nav links */}
      <motion.div
        className="flex items-center gap-8 rounded-lg px-4 py-3"
        animate={shellStyles}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex cursor-pointer items-center gap-2.5">
          <img src="/cube-logo-white.svg" alt={NAV.brand} className="w-[22px] h-[22px]" />
          <span className="text-[16px] font-semibold tracking-tight text-white leading-none">
            {NAV.brand}
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {["Pricing", "Changelog"].map(link => (
            <a
              key={link}
              href="#"
              className="text-[14px] font-normal text-neutral-300 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Right — login + CTA */}
      <motion.div
        className="flex items-center rounded-lg px-3 py-3"
        animate={shellStyles}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onGetStarted}
            className="text-[14px] inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-white/20 bg-white/5 px-5 py-1.5 font-medium text-white transition-all hover:scale-[1.02] hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
          >
            Log in
          </button>
          <button
            onClick={onGetStarted}
            className="text-[14px] inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-white px-5 py-1.5 font-medium text-black transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
          >
            {NAV.cta}
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
