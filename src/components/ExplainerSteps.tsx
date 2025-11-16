import { motion } from "framer-motion";

const steps = [
  {
    title: "Ingest",
    caption: "Files, email, CRM, chat",
    helper: "Get your data in one place",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-brand" fill="none">
        <rect x="6" y="10" width="36" height="28" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M8 16h32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="32" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M18 32c2.5-2 9.5-2 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Understand",
    caption: "Embeddings + graph context",
    helper: "Gain knowledge from raw files",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-brand2" fill="none">
        <circle cx="24" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="30" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="36" cy="30" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M22 15l-8 11m12-11 8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Retrieve",
    caption: "Permission-aware evidence",
    helper: "Flag trusted citations",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-brand" fill="none">
        <rect x="8" y="14" width="32" height="20" rx="4" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 26h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="26" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Answer",
    caption: "Cited, auditable responses",
    helper: "Share proof-backed answers",
    icon: (
      <svg viewBox="0 0 48 48" className="h-10 w-10 text-brand2" fill="none">
        <path
          d="M10 10h28v20l-6 8H10z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M16 18h16M16 24h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="30" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
];

export const ExplainerSteps = () => (
  <div className="mt-12 space-y-6">
    <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-mute">
      <span>Pipeline</span>
      <span>Ingest → Understand → Retrieve → Answer</span>
    </div>
    <div className="relative flex flex-wrap gap-4">
      {steps.map((step, idx) => (
        <motion.div
          key={step.title}
          className="subpanel relative flex min-w-[220px] flex-1 items-center gap-4 rounded-3xl bg-panel/90 px-5 py-4"
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          {step.icon}
          <div>
            <p className="text-base font-semibold text-ink">{step.title}</p>
            <p className="text-sm text-mute">{step.caption}</p>
            <p className="text-xs text-mute/70">{step.helper}</p>
          </div>
          {idx < steps.length - 1 && (
            <div className="absolute -right-3 top-1/2 hidden translate-x-1/2 -translate-y-1/2 items-center sm:flex">
              <div className="h-0.5 w-8 bg-gradient-to-r from-brand to-brand2" />
              <div className="ml-1 h-2 w-2 rotate-45 border-r-2 border-t-2 border-brand2" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);
