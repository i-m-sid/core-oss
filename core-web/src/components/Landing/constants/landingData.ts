export const NAV = {
  brand: "Cube",
  logoSrc: "/CubeLogo.png",
  cta: "Get started",
} as const;

export const HERO = {
  subheading: "The workspace for people who value productivity.",
  cta: "Get started",
} as const;

export const FOOTER = {
  copyright: `Cube © ${new Date().getFullYear()}`,
} as const;

export interface CustomerLogo {
  name: string;
  slug: string;
  ext: "svg" | "png" | "webp";
  height: number;
  url: string;
  filter?: string;
}

export const CUSTOMERS: CustomerLogo[] = [
  { name: "Amazon",      slug: "amazon",      ext: "svg",  height: 32, url: "https://amazon.com" },
  { name: "Microsoft",   slug: "microsoft",   ext: "svg",  height: 32, url: "https://microsoft.com" },
  { name: "LinkedIn",    slug: "linkedin",    ext: "svg",  height: 32, url: "https://linkedin.com" },
  { name: "Flipkart",    slug: "flipkart",    ext: "png",  height: 36, url: "https://flipkart.com",   filter: "invert(1)" },
  { name: "PhonePe",     slug: "phonepe",     ext: "webp", height: 36, url: "https://phonepe.com",    filter: "brightness(0) invert(1)" },
  { name: "Ideavo",      slug: "ideavo",      ext: "png",  height: 24, url: "https://ideavo.ai" },
  { name: "OpenBrowser", slug: "openbrowser", ext: "png",  height: 20, url: "https://openbrowser.tech" },
  { name: "Treaps",      slug: "treaps",      ext: "png",  height: 22, url: "https://treaps.com" },
  { name: "Sarvam",      slug: "sarvam",      ext: "svg",  height: 20, url: "https://sarvam.ai",      filter: "brightness(0) invert(1)" },
  { name: "Cred",        slug: "cred",        ext: "png",  height: 32, url: "https://cred.club",      filter: "invert(1)" },
];
