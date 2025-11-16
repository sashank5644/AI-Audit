export type Niche = "accounting" | "law" | "consulting";

export type SourceSystem = "SharePoint" | "Drive" | "CRM" | "Email";

export interface DemoQuestion {
  id: string;
  headline: string;
  question: string;
}

export interface DocumentRecord {
  id: string;
  niche: Niche;
  title: string;
  system: SourceSystem;
  author: string;
  date: string;
  relevance: number;
  snippet: string;
  citationUrl: string;
  entities: string[];
}

export interface AnswerCopy {
  id: string;
  niche: Niche;
  paragraph: string;
  bullets: string[];
  citations: string[];
}

export interface TimelineStepBlueprint {
  id: string;
  label: string;
  duration: number;
  detail: string;
}

export interface PilotMetric {
  id: string;
  label: string;
  suffix?: string;
  trend?: "up" | "down";
  baseline: number;
  projected: number;
  description: string;
}

export interface WeeklyPoint {
  week: string;
  baseline: number;
  optimized: number;
}

export interface KPISet {
  id: string;
  timeSavedLabel: string;
  timeUnit: string;
  metrics: PilotMetric[];
  weeklySeries: WeeklyPoint[];
  reuseSeriesLabel: string;
}

export const demoScales = {
  totalDocs: 512_418,
  scannedThisRun: 43_211,
  minDocsPerSecond: 1_500_000,
  maxDocsPerSecond: 3_500_000,
};

export const demoQuestions: Record<Niche, DemoQuestion> = {
  accounting: {
    id: "q-accounting",
    headline: "Accounting",
    question: "What depreciation method did we use for Client ABC in 2022?",
  },
  law: {
    id: "q-law",
    headline: "Law",
    question: "What did we argue in the Johnson vs. James case last year?",
  },
  consulting: {
    id: "q-consulting",
    headline: "Consulting / Real Estate",
    question:
      "Show 3-bedroom houses we sold last year, profit margin on a graph, and any correlations.",
  },
};

export const documentLibrary: DocumentRecord[] = [
  {
    id: "acc-doc-1",
    niche: "accounting",
    title: "Client ABC FY22 Close Workbook",
    system: "SharePoint",
    author: "Nina Patel",
    date: "2022-12-11",
    relevance: 0.92,
    snippet:
      "Schedule 3 confirms double-declining balance for all Class II manufacturing assets per ABC policy.",
    citationUrl: "#",
    entities: ["Client ABC", "Class II Assets"],
  },
  {
    id: "acc-doc-2",
    niche: "accounting",
    title: "Depreciation Working Trial",
    system: "Drive",
    author: "Marco Luis",
    date: "2023-01-04",
    relevance: 0.89,
    snippet:
      "Journal 2203-18 shows 2x declining balance with mid-quarter convention for warehouse fixtures.",
    citationUrl: "#",
    entities: ["Warehouse Fixtures"],
  },
  {
    id: "acc-doc-3",
    niche: "accounting",
    title: "Policy Memo: Tangible Assets",
    system: "CRM",
    author: "Grace Lin",
    date: "2021-09-18",
    relevance: 0.83,
    snippet:
      "Policy 5.2 outlines method changes require CFO approval; 2022 memo approved accelerated approach.",
    citationUrl: "#",
    entities: ["Policy 5.2"],
  },
  {
    id: "acc-doc-4",
    niche: "accounting",
    title: "Audit Trail - ABC",
    system: "Email",
    author: "Dana Schultz",
    date: "2022-12-14",
    relevance: 0.74,
    snippet:
      "Email thread with ABC controller confirming double-declining method to align with tax forecast.",
    citationUrl: "#",
    entities: ["ABC Controller"],
  },
  {
    id: "acc-doc-5",
    niche: "accounting",
    title: "Equipment Ledger Extract",
    system: "SharePoint",
    author: "System",
    date: "2022-12-31",
    relevance: 0.71,
    snippet:
      "Ledger lines 280-315 show year-end NBV derived from double-declining calculations.",
    citationUrl: "#",
    entities: ["Equipment Ledger"],
  },
  {
    id: "acc-doc-6",
    niche: "accounting",
    title: "Controller Sign-off",
    system: "Email",
    author: "Olivia Erdos",
    date: "2023-01-09",
    relevance: 0.66,
    snippet:
      "Controller confirmed no switch back to straight-line; accelerate to cover hardware refresh.",
    citationUrl: "#",
    entities: ["Controller Approval"],
  },
  {
    id: "law-doc-1",
    niche: "law",
    title: "Johnson v. James Opening Brief",
    system: "Drive",
    author: "Michael Tate",
    date: "2023-02-10",
    relevance: 0.94,
    snippet:
      "Argument II: Emphasized implied easement and prior use precedent (Harris v. Sumner) to anchor remedy.",
    citationUrl: "#",
    entities: ["Harris v. Sumner"],
  },
  {
    id: "law-doc-2",
    niche: "law",
    title: "Hearing Transcript Excerpts",
    system: "SharePoint",
    author: "Court Reporter",
    date: "2023-03-01",
    relevance: 0.82,
    snippet:
      "Page 38 shows we pivoted to constructive notice argument referencing HOA disclosures.",
    citationUrl: "#",
    entities: ["Constructive Notice"],
  },
  {
    id: "law-doc-3",
    niche: "law",
    title: "Strategy Memo - Johnson",
    system: "Email",
    author: "Priya Mehta",
    date: "2023-01-30",
    relevance: 0.79,
    snippet:
      "Outlined dual-track argument: prior use + detrimental reliance, citing James's internal emails.",
    citationUrl: "#",
    entities: ["Detrimental Reliance"],
  },
  {
    id: "law-doc-4",
    niche: "law",
    title: "Closing Slide Track",
    system: "Drive",
    author: "Design Team",
    date: "2023-03-10",
    relevance: 0.7,
    snippet:
      "Slide 6 bullet 3 restates remedy ask: injunctive relief and fees under Section 8.4.",
    citationUrl: "#",
    entities: ["Section 8.4"],
  },
  {
    id: "law-doc-5",
    niche: "law",
    title: "Research Log - Easements",
    system: "SharePoint",
    author: "Elena Byrne",
    date: "2023-02-03",
    relevance: 0.67,
    snippet:
      "Catalogued analogous fact patterns; strongest comps were Harris and McNeil holdings.",
    citationUrl: "#",
    entities: ["McNeil Holding"],
  },
  {
    id: "law-doc-6",
    niche: "law",
    title: "Client Debrief Notes",
    system: "CRM",
    author: "Account Team",
    date: "2023-03-20",
    relevance: 0.61,
    snippet:
      "Client valued our emphasis on HOA notice trail tied to Johnson's onboarding package.",
    citationUrl: "#",
    entities: ["HOA Notice"],
  },
  {
    id: "con-doc-1",
    niche: "consulting",
    title: "Real Estate Deal Ledger",
    system: "CRM",
    author: "Insights Bot",
    date: "2023-12-31",
    relevance: 0.93,
    snippet:
      "Three-bed inventory cleared in 46 days avg; average gross margin 18.4% YoY +210 bps.",
    citationUrl: "#",
    entities: ["Gross Margin"],
  },
  {
    id: "con-doc-2",
    niche: "consulting",
    title: "Market Pulse Tracker",
    system: "SharePoint",
    author: "Research Team",
    date: "2023-11-15",
    relevance: 0.84,
    snippet:
      "North corridor homes correlated .72 with mortgage repricing cycles; flagged for upsell opportunities.",
    citationUrl: "#",
    entities: ["North Corridor"],
  },
  {
    id: "con-doc-3",
    niche: "consulting",
    title: "Seller Debrief Library",
    system: "Drive",
    author: "CS Team",
    date: "2024-01-08",
    relevance: 0.77,
    snippet:
      "Clients cited trust in pre-built comps; reuse of prior studies shaved 38 hours/offering.",
    citationUrl: "#",
    entities: ["Seller Trust"],
  },
  {
    id: "con-doc-4",
    niche: "consulting",
    title: "Pilot Report - MidTown",
    system: "Email",
    author: "Strategy PMO",
    date: "2023-12-05",
    relevance: 0.71,
    snippet:
      "Graph B shows profit curve steepening when we re-ranked snippets based on margin delta.",
    citationUrl: "#",
    entities: ["Profit Curve"],
  },
  {
    id: "con-doc-5",
    niche: "consulting",
    title: "Analytics Notebook - Pricing",
    system: "SharePoint",
    author: "Data Science",
    date: "2023-10-18",
    relevance: 0.69,
    snippet:
      "Feature importance chart ties marketing spend-to-margin correlation at 0.63 over 8 weeks.",
    citationUrl: "#",
    entities: ["Feature Importance"],
  },
  {
    id: "con-doc-6",
    niche: "consulting",
    title: "Ops Checklist - Closings",
    system: "Drive",
    author: "Revenue Ops",
    date: "2024-01-02",
    relevance: 0.64,
    snippet:
      "Template includes dynamic citation tags so agents can copy proof points directly.",
    citationUrl: "#",
    entities: ["Dynamic Citations"],
  },
];

export const answersByNiche: Record<Niche, AnswerCopy> = {
  accounting: {
    id: "ans-accounting",
    niche: "accounting",
    paragraph:
      "Client ABC stayed on the double-declining balance method for FY22 capital assets, matching their accelerated refresh plan and the CFO-approved memo. Ledger extracts and controller sign-off confirm no switch back to straight-line before filing. [1][2][3][4]",
    bullets: [
      "Manufacturing equipment stayed on accelerated depreciation to mirror tax bookings. [1]",
      "Journal 2203-18 shows mid-quarter convention for warehouse fixtures. [2]",
      "Tangible asset memo authorized accelerated method through FY23. [3]",
      "Controller sign-off email confirmed policy adherence post-close. [4]",
    ],
    citations: ["acc-doc-1", "acc-doc-2", "acc-doc-3", "acc-doc-4"],
  },
  law: {
    id: "ans-law",
    niche: "law",
    paragraph:
      "In Johnson vs. James we led with implied easement established through decades of prior use, then reinforced constructive notice tied to HOA disclosure packets. The closing track asked for injunctive relief and fee recovery under Section 8.4. [1][2][3]",
    bullets: [
      "Opening brief mirrored Harris v. Sumner to anchor precedent. [1]",
      "Transcript page 38 captured the notice argument referencing HOA packets. [2]",
      "Closing slides restated the dual remedy (injunction + fees). [3]",
    ],
    citations: ["law-doc-1", "law-doc-2", "law-doc-4"],
  },
  consulting: {
    id: "ans-consulting",
    niche: "consulting",
    paragraph:
      "Three-bedroom inventory sold in 46 days on average with 18.4% gross margin; reranking snippets exposed a strong margin correlation with marketing spend and mortgage repricing. We reuse prior offer language, shaving ~38 hours per proposal. [1][2][3][4]",
    bullets: [
      "CRM ledger proves ~18.4% average gross margin on three-bedroom deals. [1]",
      "Market pulse tracker surfaced 0.72 correlation to mortgage repricing. [2]",
      "Seller debrief library reduces drafting time by ~38 hours per proposal. [3]",
      "Margin curve steepens after re-ranking snippets for profit delta. [4]",
    ],
    citations: ["con-doc-1", "con-doc-2", "con-doc-3", "con-doc-4"],
  },
};

export const timelineBlueprint: TimelineStepBlueprint[] = [
  {
    id: "connect",
    label: "Connect to sources",
    duration: 40,
    detail: "Permission-aware sync",
  },
  {
    id: "vector",
    label: "Vector search 500k docs",
    duration: 120,
    detail: "Encoder embeddings",
  },
  {
    id: "rerank",
    label: "Rerank top-k evidence",
    duration: 60,
    detail: "Cross-encoder scoring",
  },
  {
    id: "evidence",
    label: "Select citations",
    duration: 40,
    detail: "Policy + ACL checks",
  },
  {
    id: "compose",
    label: "Compose cited answer",
    duration: 80,
    detail: "Structured synthesis",
  },
];

export const pilotKpis: Record<Niche, KPISet> = {
  accounting: {
    id: "pilot-accounting",
    timeSavedLabel: "Hours saved per tax return",
    timeUnit: "hrs",
    reuseSeriesLabel: "Rework rate ↓",
    metrics: [
      {
        id: "acc-metric-1",
        label: "Hours saved / return",
        suffix: "hrs",
        trend: "up",
        baseline: 8,
        projected: 3,
        description: "Prep & review",
      },
      {
        id: "acc-metric-2",
        label: "Rework reduction",
        suffix: "%",
        trend: "down",
        baseline: 18,
        projected: 6,
        description: "Fewer restatements",
      },
    ],
    weeklySeries: [
      { week: "W1", baseline: 12, optimized: 18 },
      { week: "W2", baseline: 13, optimized: 21 },
      { week: "W3", baseline: 14, optimized: 24 },
      { week: "W4", baseline: 14, optimized: 26 },
      { week: "W5", baseline: 13, optimized: 25 },
      { week: "W6", baseline: 12, optimized: 24 },
      { week: "W7", baseline: 11, optimized: 23 },
      { week: "W8", baseline: 11, optimized: 22 },
    ],
  },
  law: {
    id: "pilot-law",
    timeSavedLabel: "Minutes saved / research query",
    timeUnit: "min",
    reuseSeriesLabel: "Answers with citations ↑",
    metrics: [
      {
        id: "law-metric-1",
        label: "Minutes saved / query",
        suffix: "min",
        trend: "up",
        baseline: 45,
        projected: 12,
        description: "Motion drafting",
      },
      {
        id: "law-metric-2",
        label: "Cited answers",
        suffix: "%",
        trend: "up",
        baseline: 62,
        projected: 97,
        description: "Audit ready",
      },
    ],
    weeklySeries: [
      { week: "W1", baseline: 54, optimized: 66 },
      { week: "W2", baseline: 55, optimized: 70 },
      { week: "W3", baseline: 58, optimized: 74 },
      { week: "W4", baseline: 59, optimized: 78 },
      { week: "W5", baseline: 61, optimized: 84 },
      { week: "W6", baseline: 63, optimized: 88 },
      { week: "W7", baseline: 65, optimized: 92 },
      { week: "W8", baseline: 66, optimized: 95 },
    ],
  },
  consulting: {
    id: "pilot-consulting",
    timeSavedLabel: "Proposal turnaround",
    timeUnit: "hrs",
    reuseSeriesLabel: "Reuse rate ↑",
    metrics: [
      {
        id: "con-metric-1",
        label: "Hours to proposal",
        suffix: "hrs",
        trend: "down",
        baseline: 72,
        projected: 26,
        description: "Pitch creation",
      },
      {
        id: "con-metric-2",
        label: "Reuse of assets",
        suffix: "%",
        trend: "up",
        baseline: 31,
        projected: 78,
        description: "Content ops",
      },
    ],
    weeklySeries: [
      { week: "W1", baseline: 22, optimized: 30 },
      { week: "W2", baseline: 23, optimized: 34 },
      { week: "W3", baseline: 23, optimized: 38 },
      { week: "W4", baseline: 24, optimized: 43 },
      { week: "W5", baseline: 25, optimized: 48 },
      { week: "W6", baseline: 25, optimized: 52 },
      { week: "W7", baseline: 26, optimized: 56 },
      { week: "W8", baseline: 27, optimized: 60 },
    ],
  },
};

export type GraphNodeType =
  | "query"
  | "source"
  | "document"
  | "snippet"
  | "entity"
  | "answer";

export interface GraphNode {
  id: string;
  type: GraphNodeType;
  label: string;
  system?: SourceSystem;
  meta?: string;
  docId?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  strength: number;
}

const baseSources: GraphNode[] = [
  { id: "source-sharepoint", type: "source", label: "SharePoint", system: "SharePoint" },
  { id: "source-drive", type: "source", label: "Drive", system: "Drive" },
  { id: "source-crm", type: "source", label: "CRM", system: "CRM" },
  { id: "source-email", type: "source", label: "Email", system: "Email" },
];

const entityByNiche: Record<Niche, string[]> = {
  accounting: ["Client ABC", "FY22 Close", "Tangible Assets"],
  law: ["Johnson vs James", "HOA Board", "Section 8.4"],
  consulting: ["3-Bed Inventory", "Mortgage Trends", "Marketing Spend"],
};

const makeFillerDocs = (niche: Niche, count: number, offset: number): DocumentRecord[] => {
  return Array.from({ length: count }).map((_, idx) => ({
    id: `${niche}-filler-${idx + offset}`,
    niche,
    title: `${niche.replace(/^[a-z]/, (c) => c.toUpperCase())} Evidence #${idx + 1}`,
    system: (["SharePoint", "Drive", "CRM", "Email"] as SourceSystem[])[idx % 4],
    author: "Auto-Ingest",
    date: "2024-01-01",
    relevance: 0.3 + (idx % 5) * 0.05,
    snippet: "Additional supporting context scanned in the background.",
    citationUrl: "#",
    entities: [entityByNiche[niche][idx % entityByNiche[niche].length]],
  }));
};

const fillerDocs = [
  ...makeFillerDocs("accounting", 40, 100),
  ...makeFillerDocs("law", 40, 200),
  ...makeFillerDocs("consulting", 40, 300),
];

export const fullDocumentSet = [...documentLibrary, ...fillerDocs];

export const buildGraphData = (niche: Niche) => {
  const featuredDocs = documentLibrary.filter((doc) => doc.niche === niche);
  const filler = fillerDocs.filter((doc) => doc.niche === niche).slice(0, 60);

  const queryNode: GraphNode = { id: "query-node", type: "query", label: "Query" };
  const entityNodes: GraphNode[] = entityByNiche[niche].map((label, idx) => ({
    id: `${niche}-entity-${idx}`,
    type: "entity",
    label,
  }));
  const featuredDocNodes: GraphNode[] = featuredDocs.map((doc) => ({
    id: `${doc.id}-node`,
    type: "document",
    label: doc.title,
    system: doc.system,
    docId: doc.id,
  }));
  const snippetNodes: GraphNode[] = featuredDocs.map((doc, idx) => ({
    id: `${doc.id}-snippet`,
    type: "snippet",
    label: `Snippet ${idx + 1}`,
    docId: doc.id,
  }));
  const fillerNodes: GraphNode[] = filler.map((doc) => ({
    id: `${doc.id}-node`,
    type: "document",
    label: doc.title,
    system: doc.system,
  }));
  const answerNode: GraphNode = {
    id: `${niche}-answer-node`,
    type: "answer",
    label: "Answer",
  };

  const nodes: GraphNode[] = [
    queryNode,
    ...baseSources,
    ...entityNodes,
    ...featuredDocNodes,
    ...snippetNodes,
    ...fillerNodes,
    answerNode,
  ];

  const links: GraphLink[] = [];
  baseSources.forEach((source) => {
    links.push({ source: "query-node", target: source.id, strength: 0.4 });
  });

  [...featuredDocs, ...filler].forEach((doc) => {
    const sourceNode =
      doc.system === "SharePoint"
        ? "source-sharepoint"
        : doc.system === "Drive"
          ? "source-drive"
          : doc.system === "CRM"
            ? "source-crm"
            : "source-email";
    links.push({ source: sourceNode, target: `${doc.id}-node`, strength: 0.05 });
  });

  featuredDocs.forEach((doc) => {
    links.push({
      source: `${doc.id}-node`,
      target: `${doc.id}-snippet`,
      strength: 0.6,
    });
    links.push({
      source: `${doc.id}-snippet`,
      target: `${doc.niche}-answer-node`,
      strength: 0.9,
    });
  });

  entityByNiche[niche].forEach((_, idx) => {
    links.push({
      source: `${niche}-entity-${idx}`,
      target: `${niche}-answer-node`,
      strength: 0.5,
    });
  });

  return { nodes, links };
};
