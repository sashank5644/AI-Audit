import { useEffect, useRef, useState } from "react";

export const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const formatNumber = (value: number) =>
  Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Math.round(value));

export const createSeededRandom = (seed: number) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
};

interface RafCounterOptions {
  duration?: number;
  startAt?: number;
  delay?: number;
  isActive?: boolean;
}

export const useRafCounter = (
  target: number,
  { duration = 800, startAt = 0, delay = 0, isActive = true }: RafCounterOptions = {},
) => {
  const [value, setValue] = useState(startAt);
  const frame = useRef<number | null>(null);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setValue(target);
      return;
    }

    const handleFrame = (timestamp: number) => {
      if (startedAt.current === null) {
        startedAt.current = timestamp + delay;
      }

      const effectiveStart = startedAt.current;
      if (timestamp < effectiveStart) {
        frame.current = requestAnimationFrame(handleFrame);
        return;
      }

      const progress = Math.min((timestamp - effectiveStart) / duration, 1);
      const eased = easeOutExpo(progress);
      setValue(startAt + (target - startAt) * eased);

      if (progress < 1) {
        frame.current = requestAnimationFrame(handleFrame);
      }
    };

    frame.current = requestAnimationFrame(handleFrame);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
      startedAt.current = null;
    };
  }, [target, duration, startAt, delay, isActive]);

  return value;
};

export const usePrefersReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const handler = () => setReducedMotion(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return reducedMotion;
};
