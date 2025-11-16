import { motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useMemo } from "react";
import { formatNumber, useRafCounter } from "../lib/sim";
import { useDemoStore, type TimelineStepState } from "../store/useDemoStore";

const TraceStep = ({ step }: { step: TimelineStepState }) => {
  const timerValue = useRafCounter(step.duration, {
    duration: step.duration * 6,
    isActive: step.status === "running",
  });
  const displayValue =
    step.status === "pending"
      ? 0
      : step.status === "done"
        ? step.duration
        : Math.min(step.duration, Math.round(timerValue));

  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 h-6 w-6 rounded-full border border-white/10 bg-white/5 text-center">
        {step.status === "done" ? (
          <Check className="mx-auto mt-1 h-4 w-4 text-good" />
        ) : step.status === "running" ? (
          <Loader2 className="mx-auto mt-1 h-4 w-4 animate-spin text-brand" />
        ) : (
          <span className="text-xs text-mute">•</span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{step.label}</p>
        <p className="text-xs text-mute">{step.detail}</p>
      </div>
      <motion.span
        key={`${step.id}-${step.status}`}
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-mute"
      >
        ~{displayValue} ms
      </motion.span>
    </div>
  );
};

export const TraceTimeline = () => {
  const timeline = useDemoStore((state) => state.timeline);
  const totalLatency = useDemoStore((state) => state.totalLatency);

  const totalSeconds = useMemo(() => (totalLatency / 1000).toFixed(2), [totalLatency]);

  return (
    <section className="subpanel space-y-5">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-mute">Trace timeline</p>
        <h4 className="text-lg font-semibold text-ink">Retrieval → Ranking → Synthesis</h4>
      </div>
      <div className="space-y-4">
        {timeline.map((step) => (
          <TraceStep key={step.id} step={step} />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Total latency</p>
          <p className="text-2xl font-semibold text-ink">~{totalSeconds}s</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Docs online</p>
          <p className="text-2xl font-semibold text-ink">{formatNumber(512_418)}</p>
        </div>
      </div>
    </section>
  );
};
