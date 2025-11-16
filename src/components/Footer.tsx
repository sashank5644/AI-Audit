import { ArrowUpRight } from "lucide-react";

const ctaHref = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-panel/30 py-10 backdrop-blur-2xl">
      <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-mute">Proof in 1 minute</p>
          <h3 className="mt-2 text-2xl font-semibold text-ink">
            Ship a compliant AI brain before your competitors.
          </h3>
        </div>
        <a
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          className="focus-ring group inline-flex items-center justify-center rounded-full border border-brand/30 bg-brand/90 px-6 py-3 text-base font-semibold text-bg transition hover:-translate-y-0.5 hover:bg-brand2/80"
        >
          Book Free Consultation
          <ArrowUpRight className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5" />
        </a>
      </div>
      <div className="fixed inset-x-0 bottom-4 flex justify-center">
        <a
          href={ctaHref}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex items-center gap-3 rounded-full border border-white/10 bg-panel/90 px-5 py-3 text-sm text-ink shadow-soft transition hover:-translate-y-0.5"
        >
          <span className="text-sm font-medium text-mute">Need proof?</span>
          <span className="rounded-full bg-brand/70 px-4 py-1 text-xs font-semibold tracking-wide text-bg shadow-soft">
            Book Free Consultation
          </span>
        </a>
      </div>
    </footer>
  );
};
