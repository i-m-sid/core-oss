import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV } from "../constants/landingData";

interface NavbarProps {
  onGetStarted: () => void;
  showLogo?: boolean;
}

export default function Navbar({ onGetStarted, showLogo = true }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 60;
    if (next !== isScrolled) setIsScrolled(next);
  });

  const shellStyles = {
    backgroundColor: isScrolled ? "rgba(255, 255, 255, 0.08)" : "rgba(255, 255, 255, 0)",
    backdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
    WebkitBackdropFilter: isScrolled ? "blur(16px)" : "blur(0px)",
    boxShadow: isScrolled
      ? "0 0 0 1px rgba(255, 255, 255, 0.1), 0 8px 32px -8px rgba(0, 0, 0, 0.3)"
      : "none",
  };

  return (
    <motion.header
      className="fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between px-4 py-4 w-[calc(100%-3rem)] max-w-[2000px] md:w-[calc(100%-6rem)] xl:w-[calc(100%-12rem)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: showLogo ? 1 : 0, pointerEvents: showLogo ? "auto" : "none" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {/* Left — logo + brand + nav links */}
      <motion.div
        className="flex items-center gap-8 rounded-lg px-4 py-3"
        animate={shellStyles}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex cursor-pointer items-center gap-3">
          {/* showLogo=false → layoutId div absent → Framer Motion flies from overlay */}
          {showLogo && (
            <motion.div layoutId="brand-logo" className="w-6 h-6 md:w-7 md:h-7">
              <svg viewBox="0 0 498 510" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" aria-hidden="true">
                <polygon points="280.511,18.6 470.689,128.4 280.511,238.2" fill="#FFFFFF" />
                <polygon points="27.311,149.4 280.511,238.2 280.511,491.4 27.311,402.6" fill="#FFFFFF" />
              </svg>
            </motion.div>
          )}
          <span className="text-[16px] font-semibold tracking-tight text-white leading-none">
            {NAV.brand}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {["Pricing", "Changelog"].map(link => (
            <a
              key={link}
              href="#"
              className="text-[14px] font-normal text-neutral-300 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>
      </motion.div>

      {/* Right — login (+ CTA on desktop) */}
      <motion.div
        className="flex items-center rounded-lg px-3 py-3"
        animate={shellStyles}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={onGetStarted}
            className="text-[14px] inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-[7px] font-medium text-white transition-all hover:scale-[1.02] hover:border-white/40 hover:bg-white/10 active:scale-[0.98]"
          >
            Log in
          </button>
          <button
            onClick={onGetStarted}
            className="hidden md:inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-md bg-white px-6 py-[7px] text-[14px] font-medium text-black transition-all hover:scale-[1.02] hover:bg-white/90 active:scale-[0.98]"
          >
            {NAV.cta}
          </button>
        </div>
      </motion.div>
    </motion.header>
  );
}
