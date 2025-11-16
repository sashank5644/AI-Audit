import { demoQuestions, type Niche } from "../lib/demoData";
import { useDemoStore } from "../store/useDemoStore";

export const PilotPicker = () => {
  const niche = useDemoStore((state) => state.niche);
  const setNiche = useDemoStore((state) => state.setNiche);

  return (
    <div className="flex flex-wrap gap-3">
      {(Object.entries(demoQuestions) as [Niche, (typeof demoQuestions)[Niche]][]).map(
        ([key, item]) => (
          <label
            key={item.id}
            className={`cursor-pointer rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
              niche === key
                ? "border-brand bg-brand/10 text-brand"
                : "border-white/10 text-mute hover:border-brand/40"
            }`}
          >
            <input
              type="radio"
              name="pilot"
              value={key}
              checked={niche === key}
              onChange={() => setNiche(key)}
              className="sr-only"
            />
            {item.headline}
          </label>
        ),
      )}
    </div>
  );
};
