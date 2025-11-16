import { useMemo, useState } from "react";
import { Check, Copy, Printer } from "lucide-react";
import { answersByNiche, documentLibrary } from "../lib/demoData";
import { useDemoStore } from "../store/useDemoStore";

const ctaHref = "https://calendar.app.google/Ypk96WxWr9GvoXsM9";

export const AnswerPanel = () => {
  const niche = useDemoStore((state) => state.niche);
  const highlightedDocId = useDemoStore((state) => state.highlightedDocId);
  const pinDoc = useDemoStore((state) => state.pinDoc);
  const pinnedDocIds = useDemoStore((state) => state.pinnedDocIds);
  const answer = answersByNiche[niche];
  const [copiedTarget, setCopiedTarget] = useState<"answer" | "citations" | null>(null);

  const citationDocs = useMemo(() => {
    const defined = <T,>(value: T | undefined): value is T => Boolean(value);
    return answer.citations
      .map((id) => documentLibrary.find((doc) => doc.id === id))
      .filter(defined);
  }, [answer]);

  const pinnedDocs = useMemo(() => {
    const defined = <T,>(value: T | undefined): value is T => Boolean(value);
    return pinnedDocIds.map((id) => documentLibrary.find((doc) => doc.id === id)).filter(defined);
  }, [pinnedDocIds]);

  const handleCopy = (target: "answer" | "citations") => {
    const text =
      target === "answer"
        ? `${answer.paragraph}\n${answer.bullets.map((b) => `• ${b}`).join("\n")}`
        : citationDocs.map((doc, idx) => `[${idx + 1}] ${doc?.title} — ${doc?.system}`).join("\n");
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedTarget(target);
    setTimeout(() => setCopiedTarget(null), 1500);
  };

  return (
    <section className="subpanel space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-mute">Answer</p>
          <h4 className="text-lg font-semibold text-ink">Cited reasoning</h4>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-mute transition hover:border-brand hover:text-brand"
            onClick={() => handleCopy("answer")}
          >
            {copiedTarget === "answer" ? <Check className="h-4 w-4 text-good" /> : <Copy className="h-4 w-4" />}
            Copy Answer
          </button>
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-mute transition hover:border-brand hover:text-brand"
            onClick={() => window.print()}
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </div>
      <p className="text-base leading-relaxed text-ink">{answer.paragraph}</p>
      <ul className="space-y-2">
        {answer.bullets.map((bullet) => (
          <li key={bullet} className="text-sm text-mute">
            {bullet}
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-mute">Citations</p>
        <button
          type="button"
          className="focus-ring inline-flex items-center gap-2 text-xs font-semibold text-mute"
          onClick={() => handleCopy("citations")}
        >
          {copiedTarget === "citations" ? (
            <Check className="h-4 w-4 text-good" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          Copy Citations
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {citationDocs.map((doc, idx) => (
          <button
            key={doc.id}
            type="button"
            onClick={() => pinDoc(doc.id)}
            className={`focus-ring relative rounded-2xl border px-4 py-3 text-left text-sm ${
              highlightedDocId === doc.id
                ? "border-brand bg-brand/10 text-ink"
                : "border-white/10 bg-bg/40 text-mute"
            }`}
          >
            <span className="text-xs text-mute">[{idx + 1}]</span>
            <p className="font-semibold text-ink">{doc.title}</p>
            <p className="text-xs text-mute">{doc.system}</p>
          </button>
        ))}
      </div>
      {pinnedDocs.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-bg/30 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Pinned evidence</p>
          <div className="mt-3 space-y-3">
            {pinnedDocs.map((doc) => (
              <div key={doc.id} className="rounded-xl bg-panel/70 p-3 text-sm text-mute">
                <p className="font-semibold text-ink">{doc.title}</p>
                <p className="text-xs text-mute">{doc.author}</p>
                <p className="mt-1 text-mute">{doc.snippet}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <a
        href={ctaHref}
        target="_blank"
        rel="noreferrer"
        className="focus-ring inline-flex w-full items-center justify-center rounded-full bg-brand/90 px-5 py-3 text-sm font-semibold text-bg transition hover:-translate-y-0.5 hover:bg-brand2"
      >
        Book Free Consultation to deploy this workflow
      </a>
    </section>
  );
};
