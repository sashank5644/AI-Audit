import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ctaHref = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-panel/80 p-10 shadow-soft">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand/25 via-transparent to-brand2/20"
        animate={{ backgroundPositionX: ["0%", "60%", "0%"] }}
        transition={{ repeat: Infinity, duration: 14, ease: "linear" }}
      />
      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-brand2">
            Turn Your Company Data Into an AI Brain (With Proof)
          </p>
          <h1 className="text-[40px] font-semibold leading-tight text-ink">
            Chat with your files—answers with citations, not hallucinations.
          </h1>
          <p className="text-lg text-mute">
            A kinetic 60-second walkthrough that shows how we ingest, understand, retrieve, and answer
            with verifiable context. Everything runs locally at 60fps so you can prove value in a live meeting.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand/90 px-6 py-3 text-base font-semibold text-bg shadow-soft transition hover:-translate-y-0.5 hover:bg-brand2/80"
            >
              Book Free Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              to="/demo"
              className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-base font-semibold text-ink transition hover:border-brand hover:text-brand"
            >
              Try the 1-min demo
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-mute">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand" /> 500,000+ docs searched
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-brand2" /> Answers with citations
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-good" /> Sub-second UI
            </span>
          </div>
        </div>
        <div className="w-full max-w-md space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Watch how it works in 40 seconds</p>
          <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/30 shadow-soft">
            <video
              className="h-full w-full"
              controls
              preload="metadata"
              poster="/demo-thumb.png"
              playsInline
            >
              <source src="/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
};
