"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/** Animates a numeric prefix (e.g. "100+" -> counts 0..100 then shows "+") when scrolled into view. */
export function Counter({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState<string>(reduceMotion ? value : "0");

  const match = value.match(/^(\d+)(.*)$/);
  const numeric = match?.[1] ? parseInt(match[1], 10) : null;
  const suffix = match?.[2] ?? "";

  useEffect(() => {
    if (!inView || numeric === null || reduceMotion) {
      if (reduceMotion) setDisplay(value);
      return;
    }
    let raf: number;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * numeric).toString());
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, duration, reduceMotion, value]);

  if (numeric === null) {
    return <span ref={ref}>{value}</span>;
  }

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
