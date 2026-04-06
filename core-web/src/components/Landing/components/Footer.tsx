import { FOOTER } from "../constants/landingData";

export default function Footer() {
  return (
    <footer className="shrink-0 px-6 sm:px-12 lg:px-40 py-4 max-w-[1400px] mx-auto w-full">
      <span className="text-text-tertiary text-sm">{FOOTER.copyright}</span>
    </footer>
  );
}
