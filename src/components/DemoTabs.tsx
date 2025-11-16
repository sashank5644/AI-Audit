import { LayoutGroup, motion } from "framer-motion";
import { demoQuestions, type Niche } from "../lib/demoData";
import { useDemoStore } from "../store/useDemoStore";

export const DemoTabs = () => {
  const niche = useDemoStore((state) => state.niche);
  const setNiche = useDemoStore((state) => state.setNiche);

  return (
    <LayoutGroup>
      <div className="panel flex flex-wrap gap-3">
        {(Object.entries(demoQuestions) as [Niche, (typeof demoQuestions)[Niche]][]).map(
          ([key, item]) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setNiche(key)}
              className="relative overflow-hidden rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-mute transition hover:text-ink"
            >
              {niche === key && (
                <motion.span
                  layoutId="tab-highlight"
                  className="absolute inset-0 z-0 rounded-full bg-brand/20"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className="relative z-10">{item.headline}</span>
            </button>
          ),
        )}
      </div>
    </LayoutGroup>
  );
};
