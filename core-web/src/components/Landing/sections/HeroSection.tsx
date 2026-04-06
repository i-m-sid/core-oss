import { HERO } from "../constants/landingData";
import { MainDemo } from "../components/DemoSection";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-x-hidden font-geist bg-black">

      {/* ── Background video ── */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-40 pb-6 px-6">

        {/* Heading */}
        <h1 className="relative z-10 mt-2 flex max-w-md flex-col items-center text-center text-6xl leading-[1.01] font-medium tracking-[-2px] text-white md:max-w-4xl md:text-6xl lg:text-[68px] mb-0">
          Everything in{" "}
          <span className="text-neutral-400">one place.</span>
        </h1>

        {/* Subheading */}
        <p className="relative z-10 mt-6 mb-10 max-w-2xl text-center text-lg font-thin tracking-[-0.3px] text-white/60">
          {HERO.subheading}
        </p>

        {/* CTA buttons */}
        <div className="relative z-10 flex items-center gap-3 mb-16">
          <button
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-black text-[14px] font-medium rounded-lg hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            {HERO.cta}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <button className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] font-medium rounded-lg transition-all text-white border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 hover:bg-white/10 active:scale-[0.98]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5.14v14l11-7-11-7z" />
            </svg>
            Watch demo
          </button>
        </div>

        {/* Demo */}
        <div className="w-screen max-w-375">
          <MainDemo />
        </div>
        

      </div>
    </section>
  );
}
