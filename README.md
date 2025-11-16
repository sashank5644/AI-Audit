## AI Knowledge Graph + RAG Search Demo

This Vite + React + TypeScript experience showcases a fully local, production-style walkthrough of an “AI Knowledge Graph + RAG Search” workflow. Everything is deterministic, instant, and runs without any network calls or LLM dependencies.

### Tech Stack

- React 19 + Vite + TypeScript
- Tailwind CSS (dark theme default, optional light mode toggle)
- Zustand for demo state machine + timers
- Framer Motion micro-interactions + `requestAnimationFrame` counters
- Recharts for KPI visualizations
- `react-force-graph` (WebGL) for the kinetic evidence graph

### Key Interactions

- Landing hero with proof strip, explainer cards, and sticky CTA
- `/demo` route featuring:
  - Tabs for Accounting, Law, and Consulting prompts
  - Scripted Query Runner with doc counters + evidence toggle
  - Lazy-loaded graph (≤150 visible nodes) syncing highlights with citations
  - Trace timeline (20–80 ms deterministic steps)
  - Answer panel with copy, citations, and print/PDF actions
  - KPI picker per niche, rAF counters, and Recharts mini-visuals
- `/security` route describing permissioning, ACLs, citations, and auditability

Every CTA links to `https://calendar.app.google/Ypk96WxWr9GvoXsM9`. No pricing surfaces are included.

### Running Locally

```bash
pnpm install
pnpm dev
```

Then open the printed local URL (typically `http://localhost:5173`) to explore the demo. All assets and data are pre-generated, so the UI is instantaneous even without internet access.

### Notes

- Animations respect `prefers-reduced-motion`.
- The evidence graph and KPI widgets are memoized + code-split for 60 fps on mid-range laptops.
- `pnpm build` / `pnpm preview` are available for production builds.
