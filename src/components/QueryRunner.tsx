import { RefreshCw, Rocket, ScanSearch } from "lucide-react";
import { demoQuestions, demoScales } from "../lib/demoData";
import { formatNumber, useRafCounter } from "../lib/sim";
import { useDemoStore } from "../store/useDemoStore";

export const QueryRunner = () => {
  const niche = useDemoStore((state) => state.niche);
  const isRunning = useDemoStore((state) => state.isRunning);
  const runDemo = useDemoStore((state) => state.runDemo);
  const replayDemo = useDemoStore((state) => state.replayDemo);
  const docsTarget = useDemoStore((state) => state.docsTarget);
  const docsPerSecondTarget = useDemoStore((state) => state.docsPerSecondTarget);
  const answerReady = useDemoStore((state) => state.answerReady);

  const docsScanned = useRafCounter(docsTarget, {
    duration: 900,
    isActive: isRunning || answerReady,
  });
  const docsPerSecond = useRafCounter(docsPerSecondTarget, {
    duration: 1200,
    isActive: isRunning || answerReady,
  });

  const questionCopy = demoQuestions[niche].question;

  return (
    <section className="space-y-5">
      <div className="subpanel space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-mute">
              {demoQuestions[niche].headline}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{questionCopy}</h3>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={runDemo}
              disabled={isRunning}
              className="focus-ring inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand2 px-4 py-2 text-sm font-semibold text-bg shadow-soft transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              <Rocket className="h-4 w-4" />
              Run
            </button>
            <button
              type="button"
              onClick={replayDemo}
              className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-mute transition hover:border-brand hover:text-brand"
            >
              <RefreshCw className="h-4 w-4" />
              Replay
            </button>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-bg/40 p-4 text-sm text-mute">
          <span className="inline-flex items-center gap-2 text-ink">
            <ScanSearch className="h-4 w-4 text-brand2" />
            {formatNumber(demoScales.totalDocs)} docs indexed · evidence graph shown live
          </span>
          <p className="mt-2 text-xs text-mute">
            All stages run locally with deterministic timers.
          </p>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Docs scanned</p>
          <p className="mt-2 text-3xl font-semibold text-ink">{formatNumber(docsScanned)}</p>
          <p className="text-xs text-mute">~150 visible nodes capped for 60fps</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Throughput</p>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {formatNumber(docsPerSecond)} <span className="text-sm text-mute">docs/s</span>
          </p>
          <p className="text-xs text-mute">Simulated vector search speed</p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Total docs online</p>
          <p className="mt-2 text-3xl font-semibold text-ink">
            {formatNumber(demoScales.totalDocs)}
          </p>
          <p className="text-xs text-mute">SharePoint · Drive · CRM · Email</p>
        </div>
      </div>
    </section>
  );
};
