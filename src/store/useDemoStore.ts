import { create } from "zustand";
import type { Niche } from "../lib/demoData";
import { answersByNiche, demoScales, timelineBlueprint } from "../lib/demoData";

type TimelineStatus = "pending" | "running" | "done";

export interface TimelineStepState {
  id: string;
  label: string;
  detail: string;
  duration: number;
  status: TimelineStatus;
}

const throughputTargets: Record<Niche, number> = {
  accounting: 2_100_000,
  law: 2_450_000,
  consulting: 3_200_000,
};

const initialTimeline = () =>
  timelineBlueprint.map((step) => ({
    ...step,
    status: "pending" as TimelineStatus,
  }));

interface DemoState {
  niche: Niche;
  timeline: TimelineStepState[];
  isRunning: boolean;
  answerReady: boolean;
  highlightedDocId: string | null;
  pinnedDocIds: string[];
  docsTarget: number;
  docsPerSecondTarget: number;
  totalLatency: number;
  timers: number[];
  setNiche: (niche: Niche) => void;
  runDemo: () => void;
  replayDemo: () => void;
  pinDoc: (docId: string) => void;
  setHighlightedDoc: (docId: string | null) => void;
  clearTimers: () => void;
}

export const useDemoStore = create<DemoState>((set, get) => ({
  niche: "accounting",
  timeline: initialTimeline(),
  isRunning: false,
  answerReady: false,
  highlightedDocId: null,
  pinnedDocIds: [],
  docsTarget: 0,
  docsPerSecondTarget: 0,
  totalLatency: timelineBlueprint.reduce((acc, step) => acc + step.duration, 0),
  timers: [],
  setNiche: (niche) => {
    if (get().isRunning) return;
    set({
      niche,
      pinnedDocIds: [],
      highlightedDocId: null,
      docsPerSecondTarget: throughputTargets[niche],
      timeline: initialTimeline(),
    });
  },
  runDemo: () => {
    const { isRunning, timers, niche } = get();
    if (isRunning) return;
    timers.forEach((handle) => clearTimeout(handle));

    const steps = initialTimeline();
    const totalLatency = steps.reduce((sum, step) => sum + step.duration, 0);
    const handles: number[] = [];

    let elapsed = 0;
    steps.forEach((_, idx) => {
      handles.push(
        window.setTimeout(() => {
          set((state) => ({
            timeline: state.timeline.map((item, itemIdx) =>
              itemIdx === idx ? { ...item, status: "running" } : item,
            ),
          }));
        }, elapsed),
      );

      elapsed += steps[idx].duration;
      handles.push(
        window.setTimeout(() => {
          set((state) => ({
            timeline: state.timeline.map((item, itemIdx) =>
              itemIdx === idx ? { ...item, status: "done" } : item,
            ),
          }));
          if (idx === steps.length - 1) {
            set({
              isRunning: false,
              answerReady: true,
            });
          }
        }, elapsed),
      );
    });

    const highlightOrder = answersByNiche[niche].citations;
    highlightOrder.forEach((docId, idx) => {
      handles.push(
        window.setTimeout(() => {
          set({ highlightedDocId: docId });
        }, 250 + idx * 220),
      );
    });
    handles.push(
      window.setTimeout(() => set({ highlightedDocId: null }), elapsed + 300),
    );

    set({
      isRunning: true,
      answerReady: false,
      docsTarget: demoScales.scannedThisRun,
      docsPerSecondTarget: throughputTargets[niche],
      timeline: steps,
      pinnedDocIds: [],
      totalLatency,
      timers: handles,
      highlightedDocId: null,
    });
  },
  replayDemo: () => {
    const { timers } = get();
    timers.forEach((handle) => clearTimeout(handle));
    set({
      isRunning: false,
      answerReady: false,
      highlightedDocId: null,
      pinnedDocIds: [],
      timeline: initialTimeline(),
      timers: [],
      docsTarget: 0,
      docsPerSecondTarget: 0,
    });
  },
  pinDoc: (docId) =>
    set((state) => {
      const exists = state.pinnedDocIds.includes(docId);
      return {
        pinnedDocIds: exists
          ? state.pinnedDocIds.filter((id) => id !== docId)
          : [...state.pinnedDocIds, docId],
      };
    }),
  setHighlightedDoc: (docId) => set({ highlightedDocId: docId }),
  clearTimers: () => {
    const { timers } = get();
    timers.forEach((handle) => clearTimeout(handle));
    set({ timers: [] });
  },
}));
