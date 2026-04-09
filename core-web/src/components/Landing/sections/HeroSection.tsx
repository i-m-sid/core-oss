import { HERO } from "../constants/landingData";
import { MainDemo } from "../components/DemoSection";
import MobileDemo from "../components/DemoSection/MobileDemo";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-x-hidden font-geist ">

      {/* Background image */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-screen -translate-x-1/2 overflow-hidden">
        <img
          src="/landingPage/hero-dark.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/70 from-40% via-black/10 via-70% to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-28 md:pt-40 pb-6 px-4 md:px-6">

        {/* Heading */}
        <h1 className="relative z-10 mt-2 flex flex-col items-center text-center text-[32px] leading-[1.05] font-medium tracking-[-1.5px] text-white md:text-6xl lg:text-[68px] mb-0">
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
            <MobileDemo />
          </div>

          {/* Desktop: clip to container width */}
          <div className="hidden md:block overflow-hidden rounded-lg">
            <MainDemo />
          </div>
        </div>

      </div>
    </section>
  );
}
