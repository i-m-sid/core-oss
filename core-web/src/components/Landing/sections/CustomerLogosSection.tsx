import { CUSTOMERS } from "../constants/landingData";

export default function CustomerLogosSection() {
  return (
    <div className="relative z-10 w-full bg-black pt-4 pb-8 flex flex-col items-center">
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
          will-change: transform;
          user-select: none;
          align-items: center;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-fade {
          mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div className="w-screen max-w-375">
      <p className="text-center text-[11px] font-medium tracking-widest text-neutral-600 uppercase mb-0">
        Used by teams at
      </p>

      <div className="marquee-fade relative mt-3 h-[80px] w-full overflow-hidden">
        <div className="marquee-track h-full">
          {/* First copy */}
          {CUSTOMERS.map(company => (
            <a
              key={`a-${company.slug}`}
              href={company.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={company.name}
              className="flex shrink-0 items-center opacity-40 hover:opacity-70 transition-opacity"
              style={{ marginRight: "100px" }}
            >
              <img
                src={`/customers/${company.slug}.${company.ext}`}
                alt={company.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  height: `${company.height}px`,
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  filter: company.filter,
                }}
              />
            </a>
          ))}
          {/* Second copy for seamless loop */}
          {CUSTOMERS.map(company => (
            <a
              key={`b-${company.slug}`}
              href={company.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-hidden="true"
              tabIndex={-1}
              className="flex shrink-0 items-center opacity-40 hover:opacity-70 transition-opacity"
              style={{ marginRight: "100px" }}
            >
              <img
                src={`/customers/${company.slug}.${company.ext}`}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  height: `${company.height}px`,
                  width: "auto",
                  display: "block",
                  objectFit: "contain",
                  filter: company.filter,
                }}
              />
            </a>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
