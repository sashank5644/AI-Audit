import { ResponsiveContainer, BarChart, Bar, XAxis, LineChart, Line, Tooltip } from "recharts";
import { pilotKpis } from "../lib/demoData";
import { formatNumber, useRafCounter } from "../lib/sim";
import { useDemoStore } from "../store/useDemoStore";
import { PilotPicker } from "./PilotPicker";
import { BadgeCheck } from "lucide-react";

export const KPIMetrics = () => {
  const niche = useDemoStore((state) => state.niche);
  const docsPerSecondTarget = useDemoStore((state) => state.docsPerSecondTarget);
  const isRunning = useDemoStore((state) => state.isRunning);
  const answerReady = useDemoStore((state) => state.answerReady);

  const pilot = pilotKpis[niche];
  const throughput = useRafCounter(docsPerSecondTarget, {
    duration: 1000,
    isActive: isRunning || answerReady,
  });

  const barData = [
    { name: "Manual", value: pilot.metrics[0].baseline },
    { name: "AI Brain", value: pilot.metrics[0].projected },
  ];

  return (
    <section className="subpanel space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Pilot KPIs</p>
          <h4 className="text-lg font-semibold text-ink">Measured deltas per niche</h4>
        </div>
        <PilotPicker />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Docs traversed / sec</p>
          <p className="mt-1 text-3xl font-semibold text-ink">
            {formatNumber(throughput)} <span className="text-base text-mute">/s</span>
          </p>
          <p className="text-xs text-mute">
            Deterministic counter (requestAnimationFrame) tied to the scripted journey.
          </p>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Accuracy badge</p>
          <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-good/10 px-3 py-2 text-sm font-semibold text-good">
            <BadgeCheck className="h-4 w-4" /> 100% (demo)
          </div>
          <p className="text-xs text-mute">Citations visible by default; audit trail on every response.</p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">
            {pilot.timeSavedLabel}
          </p>
          <div className="mt-4 h-48">
            <ResponsiveContainer>
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
                <Tooltip
                  cursor={{ fill: "rgba(124,140,255,0.1)" }}
                  contentStyle={{
                    backgroundColor: "#101726",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                />
                <Bar dataKey="value" fill="#7F8EF4" radius={[12, 12, 4, 4]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="metric-card">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">{pilot.reuseSeriesLabel}</p>
          <div className="mt-4 h-48">
            <ResponsiveContainer>
              <LineChart data={pilot.weeklySeries}>
                <Tooltip
                  cursor={{ stroke: "rgba(75,197,190,0.3)" }}
                  contentStyle={{
                    backgroundColor: "#101726",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="baseline"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="optimized"
                  stroke="#4BC5BE"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {pilot.metrics.map((metric) => (
          <div key={metric.id} className="metric-card">
            <p className="text-xs uppercase tracking-[0.2em] text-mute">{metric.description}</p>
            <p className="mt-2 text-lg font-semibold text-ink">{metric.label}</p>
            <p className="text-sm text-mute">
              {metric.baseline}
              {metric.suffix} →{" "}
              <span className="text-brand">{metric.projected}</span>
              {metric.suffix}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
