import { useRef, useEffect, useState } from "react";
import { HERO } from "../constants/landingData";
import { MainDemo } from "../components/DemoSection";
import MobileDemo, { type MobileView } from "../components/DemoSection/MobileDemo";
import MobileInboxView from "../components/DemoSection/MobileInboxView";
import MobileEmailView from "../components/DemoSection/MobileEmailView";
import MobileChatView from "../components/DemoSection/MobileChatView";
import MobileCalendarView from "../components/DemoSection/MobileCalendarView";

interface HeroSectionProps {
  onGetStarted: () => void;
}

// Scales the fixed-size MainDemo down to fill its container on desktop
function ScaledDesktopDemo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const DEMO_W = 1280;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / DEMO_W);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="w-full overflow-hidden h-220">
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: `${DEMO_W}px` }}>
        <MainDemo />
      </div>
    </div>
  );
}

// Renders the correct view for the active mobile tab
function renderMobileView(view: MobileView) {
  switch (view) {
    case "inbox":    return <MobileInboxView />;
    case "email":    return <MobileEmailView />;
    case "chat":     return <MobileChatView />;
    case "calendar": return <MobileCalendarView />;
  }
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-x-hidden font-geist ">

      {/* Background video */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-screen -translate-x-1/2 overflow-hidden"
        style={{ opacity: 1 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center opacity-40"
        >
          <source src="/landingPage/hero-720.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-28 md:pt-40 pb-6 px-4 md:px-6">

        {/* Heading */}
        <h1 className="relative z-10 mt-2 flex flex-col items-center text-center text-[42px] leading-[1.01] font-medium tracking-[-2px] text-white md:text-6xl lg:text-[68px] mb-0">
          Everything in{" "}
          <span className="text-neutral-400">one place.</span>
        </h1>

        {/* Subheading */}
        <p className="relative z-10 mt-4 mb-8 md:mt-6 md:mb-10 max-w-65 sm:max-w-sm md:max-w-2xl text-center text-[15px] md:text-lg font-thin tracking-[-0.3px] text-white/60">
          {HERO.subheading}
        </p>

        {/* CTA buttons */}
        <div className="relative z-10 flex items-center gap-3 mb-10 md:mb-16">
          <button
            onClick={onGetStarted}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 text-demo-md md:text-demo-lg font-medium rounded-lg transition-all text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
          >
            Log in
          </button>
          <button
            onClick={onGetStarted}
            className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-white text-black text-demo-md md:text-demo-lg font-medium rounded-lg hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {HERO.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Demo */}
        <div className="w-full max-w-375">
          {/* Mobile: purpose-built layout */}
          <div className="md:hidden">
            <MobileDemo renderView={renderMobileView} />
          </div>

          {/* Desktop: scaled-down full demo */}
          <div className="hidden md:block">
            <ScaledDesktopDemo />
          </div>
        </div>

      </div>
    </section>
  );
}
