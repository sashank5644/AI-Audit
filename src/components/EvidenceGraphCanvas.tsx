import { memo, useMemo } from "react";
import ForceGraph2D, { type LinkObject } from "react-force-graph-2d";
import type { GraphLink, GraphNode } from "../lib/demoData";

interface EvidenceGraphCanvasProps {
  data: { nodes: GraphNode[]; links: GraphLink[] };
  highlightedDocId: string | null;
  onSelectDoc: (docId: string | null) => void;
  onHoverDoc: (docId: string | null) => void;
  graphRef?: React.MutableRefObject<any>;
}

const colors: Record<GraphNode["type"], string> = {
  query: "#E6F1FF",
  source: "#22D3EE",
  document: "#7dd3fc",
  snippet: "#7C8CFF",
  entity: "#5eead4",
  answer: "#FFFFFF",
};

const EvidenceGraphCanvas = ({
  data,
  highlightedDocId,
  onSelectDoc,
  onHoverDoc,
  graphRef,
}: EvidenceGraphCanvasProps) => {
  const graphData = useMemo(() => data, [data]) as { nodes: any[]; links: any[] };

  return (
    <ForceGraph2D
      ref={graphRef as React.MutableRefObject<any>}
      height={420}
      enableNodeDrag={false}
      nodeRelSize={6}
      graphData={graphData}
      linkColor={() => "rgba(124,140,255,0.35)"}
      linkDirectionalParticles={2}
      linkDirectionalParticleWidth={(
        link: LinkObject<GraphNode, GraphLink> & {
          source: GraphNode & { docId?: string };
          target: GraphNode & { docId?: string; id?: string };
        },
      ) => {
        if (
          highlightedDocId &&
          (link.source?.docId === highlightedDocId || link.target?.docId === highlightedDocId)
        ) {
          return 5;
        }
        return link.target.id?.toString().includes("answer") ? 3 : 0;
      }}
      linkDirectionalParticleSpeed={0.005}
      nodeCanvasObject={(
        node: GraphNode & { x?: number; y?: number },
        ctx: CanvasRenderingContext2D,
        globalScale: number,
      ) => {
        const label = node.label ?? "";
        const fontSize = 12 / globalScale;
        const radius =
          node.type === "answer"
            ? 12
            : node.type === "snippet"
              ? 6
              : node.type === "document"
                ? 5
                : node.type === "source"
                  ? 4
                  : 3;
        ctx.beginPath();
        ctx.arc(node.x ?? 0, node.y ?? 0, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = colors[node.type];
        ctx.fill();
        if (highlightedDocId && node.docId === highlightedDocId) {
          ctx.lineWidth = 3;
          ctx.strokeStyle = "#22D3EE";
          ctx.stroke();
        }
        if (node.type === "answer") {
          ctx.lineWidth = 2;
          ctx.strokeStyle = "rgba(124,140,255,0.5)";
          ctx.stroke();
        }
        if (globalScale > 1.5) {
          ctx.font = `${fontSize}px Inter`;
          ctx.textAlign = "center";
          ctx.fillStyle = "rgba(230,241,255,0.8)";
          ctx.fillText(label, node.x ?? 0, (node.y ?? 0) - radius - 2);
        }
      }}
      onNodeHover={(node) => {
        const typedNode = node as GraphNode | null;
        onHoverDoc(typedNode?.docId ?? null);
      }}
      onNodeClick={(node) => {
        const typedNode = node as GraphNode | null;
        onSelectDoc(typedNode?.docId ?? null);
      }}
      cooldownTicks={60}
      d3VelocityDecay={0.2}
    />
  );
};

export default memo(EvidenceGraphCanvas);
