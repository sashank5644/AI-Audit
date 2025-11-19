import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import type { ForceGraphMethods } from "react-force-graph-2d";
import { documentLibrary, buildGraphData, type GraphLink, type GraphNode } from "../lib/demoData";
import { useDemoStore } from "../store/useDemoStore";

const GraphCanvas = lazy(() => import("./EvidenceGraphCanvas"));

export const EvidenceGraph = () => {
  const niche = useDemoStore((state) => state.niche);
  const highlightedDocId = useDemoStore((state) => state.highlightedDocId);
  const setHighlightedDoc = useDemoStore((state) => state.setHighlightedDoc);
  const pinDoc = useDemoStore((state) => state.pinDoc);
  const [hoverDocId, setHoverDocId] = useState<string | null>(null);
  const graphData = useMemo(() => buildGraphData(niche), [niche]);
  const activeDoc =
    documentLibrary.find((doc) => doc.id === (hoverDocId ?? highlightedDocId ?? "")) ?? null;
  const graphRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | null>(null);

  useEffect(() => {
    const kickers: number[] = [];
    const recenter = (delay: number) => {
      kickers.push(
        window.setTimeout(() => {
          graphRef.current?.zoomToFit(500, 60);
          graphRef.current?.centerAt(700, 0, 500);
        }, delay),
      );
    };
    recenter(250);
    recenter(800);
    return () => kickers.forEach((id) => window.clearTimeout(id));
  }, [graphData]);

  return (
    <section className="subpanel relative min-h-[500px] overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Evidence graph</p>
          <h4 className="text-lg font-semibold text-ink">Permission-aware knowledge graph</h4>
        </div>
        <span className="text-xs text-mute">~150+ nodes · WebGL · 60fps</span>
      </div>
      <Suspense
        fallback={
          <div className="flex h-[420px] items-center justify-center rounded-2xl border border-white/10 bg-panel/70 text-sm text-mute">
            Loading kinetic graph…
          </div>
        }
      >
        <div className="rounded-2xl border border-white/10 bg-panel/60 p-2">
          <GraphCanvas
            data={graphData}
            highlightedDocId={highlightedDocId}
            onHoverDoc={(docId) => setHoverDocId(docId)}
            onSelectDoc={(docId) => {
              if (!docId) return;
              setHighlightedDoc(docId);
              pinDoc(docId);
            }}
            graphRef={graphRef}
          />
        </div>
      </Suspense>
      {activeDoc && (
        <div className="pointer-events-none absolute bottom-6 left-6 max-w-xs rounded-2xl border border-white/10 bg-panel/95 p-4 text-xs text-mute shadow-soft">
          <p className="text-sm font-semibold text-ink">{activeDoc.title}</p>
          <p className="text-xs text-mute">{activeDoc.author}</p>
          <p className="mt-2 text-mute">{activeDoc.snippet}</p>
        </div>
      )}
    </section>
  );
};
