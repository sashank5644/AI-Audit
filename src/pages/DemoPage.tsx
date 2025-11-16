import { DemoTabs } from "../components/DemoTabs";
import { QueryRunner } from "../components/QueryRunner";
import { EvidenceGraph } from "../components/EvidenceGraph";
import { TraceTimeline } from "../components/TraceTimeline";
import { AnswerPanel } from "../components/AnswerPanel";
import { KPIMetrics } from "../components/KPIMetrics";

export const DemoPage = () => (
  <div className="space-y-8">
    <div className="space-y-3">
      <p className="text-sm uppercase tracking-[0.3em] text-mute">1-minute demo</p>
      <h2 className="text-3xl font-semibold text-ink">Scripted journey (≤ 60s)</h2>
      <p className="text-sm text-mute">
        Press run to simulate connecting sources, scanning 500k+ docs, reranking citation-ready
        snippets, and composing an audited answer.
      </p>
    </div>
    <DemoTabs />
    <div className="flex flex-col gap-6">
      <section className="grid gap-6 xl:grid-cols-[1.1fr_minmax(0,1fr)]">
        <QueryRunner />
        <EvidenceGraph />
      </section>
      <section className="grid gap-6 lg:grid-cols-[1.2fr_minmax(0,0.8fr)]">
        <TraceTimeline />
        <AnswerPanel />
      </section>
      <KPIMetrics />
    </div>
  </div>
);
