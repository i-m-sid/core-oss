import { motion } from "motion/react";
import { FOOTER } from "../constants/landingData";

const LINKS = {
  Product: [
    { label: "Pricing",   href: "/pricing"   },
    { label: "Changelog", href: "/changelog" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms",   href: "/terms"   },
  ],
  Company: [
    { label: "Contact", href: "mailto:hello@ideavo.ai" },
    { label: "Ideavo",  href: "https://ideavo.ai"      },
  ],
};

export default function Footer() {
  return (
    <motion.footer
      className="w-full border-t border-white/5 bg-black/90 pt-20 pb-10 font-geist"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto w-screen max-w-375 px-6 flex flex-col gap-16">

        {/* Top grid */}
        <motion.div
          className="grid grid-cols-2 gap-x-12 gap-y-12 lg:grid-cols-12 lg:gap-x-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-6 lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[6px] bg-black border border-white/10 flex items-center justify-center shrink-0 p-[4px]">
                <img src="/cube-logo-white.svg" alt="Cube" className="w-full h-full object-contain" />
              </div>
              <span className="text-[20px] font-semibold tracking-tight text-white">Cube</span>
            </div>
            <p className="text-[14px] leading-[1.7] font-light text-white/40" style={{ maxWidth: "280px" }}>
              The workspace for people who value productivity. Everything in one place.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* X / Twitter */}
              <a
                href="https://x.com/ideavo_ai"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="X"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.07] bg-white/[0.04] transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-500 group-hover:text-white transition-colors">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* GitHub */}
              <a
                href="https://github.com/ideavo"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.07] bg-white/[0.04] transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-500 group-hover:text-white transition-colors">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/ideavo"
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/[0.07] bg-white/[0.04] transition-all hover:bg-white/[0.08] hover:border-white/[0.12]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-500 group-hover:text-white transition-colors">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} className="col-span-1 lg:col-span-2">
              <h4 className="mb-5 text-[12px] font-semibold tracking-widest uppercase text-white/60">{group}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[14px] font-light text-neutral-500 transition-colors hover:text-white"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.05] pt-8 md:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.45 }}
        >
          <p className="text-[12px] font-medium text-neutral-600">
            {FOOTER.copyright}. All rights reserved.
          </p>
          <span className="flex items-center gap-2 rounded-full border border-white/[0.05] bg-white/[0.03] px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/50 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[12px] font-medium text-neutral-500">All systems operational.</span>
          </span>
        </motion.div>

      </div>
    </motion.footer>
  );
}
