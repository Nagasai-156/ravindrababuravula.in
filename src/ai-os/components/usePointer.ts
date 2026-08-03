import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

const finePointer = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pointer position relative to the element's centre, normalised to -1..1 and
 * eased through a spring. Values are MotionValues, so pointer movement never
 * triggers a React render — compose them with `useTransform` for per-layer
 * amplitude. Inert on touch devices and under reduced-motion.
 */
export const usePointerOffset = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 45, damping: 20, mass: 0.7 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rawX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
      rawY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY]);

  return { ref, x, y };
};

/** Pulls an element a few pixels toward the cursor while it is hovered. */
export const useMagnetic = <T extends HTMLElement>(strength = 0.22) => {
  const ref = useRef<T>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spring = { stiffness: 150, damping: 15, mass: 0.4 };
  const x = useSpring(rawX, spring);
  const y = useSpring(rawY, spring);

  useEffect(() => {
    const el = ref.current;
    if (!el || !finePointer()) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      rawX.set((e.clientX - (r.left + r.width / 2)) * strength);
      rawY.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [rawX, rawY, strength]);

  return { ref, x, y };
};
