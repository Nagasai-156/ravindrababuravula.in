import { useEffect, useRef } from "react";

/**
 * Woven light-field background: layered sine threads drifting across a dark
 * canvas, lit by a volt glow. Pure 2D canvas — no WebGL needed, cheap on the
 * main thread, respects reduced motion.
 *
 * With `interactive`, the glow tracks the pointer and the threads bow away
 * from it, so the field reads as a surface being pushed rather than a video.
 */
export const WovenCanvas = ({
  className = "",
  interactive = false,
}: {
  className?: string;
  interactive?: boolean;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const pointerOn = interactive && finePointer && !reduced;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // pointer target and the eased position that actually gets drawn
    const target = { x: w * 0.5, y: h * 0.45, force: 0 };
    const eased = { x: w * 0.5, y: h * 0.45, force: 0 };

    const host = canvas.parentElement ?? canvas;
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.force = 1;
    };
    const onLeave = () => {
      target.force = 0;
    };
    if (pointerOn) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    const THREADS = 26;
    const RADIUS = 260;
    let t = reduced ? 40 : 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ambient glow: follows the pointer when engaged, otherwise drifts
      const driftX = w * (0.5 + 0.35 * Math.sin(t * 0.00022));
      const driftY = h * (0.42 + 0.2 * Math.cos(t * 0.00017));
      eased.force += (target.force - eased.force) * 0.06;
      eased.x += ((pointerOn ? target.x : driftX) - eased.x) * 0.055;
      eased.y += ((pointerOn ? target.y : driftY) - eased.y) * 0.055;

      const gx = pointerOn ? eased.x * eased.force + driftX * (1 - eased.force) : eased.x;
      const gy = pointerOn ? eased.y * eased.force + driftY * (1 - eased.force) : eased.y;

      const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, Math.max(w, h) * 0.7);
      glow.addColorStop(0, `rgba(255, 183, 3, ${0.075 + eased.force * 0.05})`);
      glow.addColorStop(0.45, "rgba(255, 183, 3, 0.022)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < THREADS; i++) {
        const p = i / (THREADS - 1);
        const baseY = h * (0.12 + p * 0.82);
        const amp = 24 + 90 * Math.sin(p * Math.PI);
        const speed = 0.00035 + p * 0.00025;
        const phase = t * speed + i * 1.7;

        ctx.beginPath();
        for (let x = -20; x <= w + 20; x += 12) {
          const nx = x / w;
          let y =
            baseY +
            Math.sin(nx * 4.2 + phase) * amp * 0.5 +
            Math.sin(nx * 9.1 - phase * 1.6) * amp * 0.22;

          // bow the thread away from the pointer
          if (eased.force > 0.01) {
            const dx = x - gx;
            const dy = y - gy;
            const d2 = dx * dx + dy * dy;
            if (d2 < RADIUS * RADIUS) {
              const d = Math.sqrt(d2) || 1;
              const falloff = 1 - d / RADIUS;
              y += (dy / d) * falloff * falloff * 54 * eased.force;
            }
          }

          if (x === -20) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // threads near the light pick up volt; the rest stay bone-dim
        const lit = Math.abs(baseY - gy) < h * 0.22;
        const alpha = 0.05 + 0.1 * Math.sin(p * Math.PI);
        ctx.strokeStyle = lit
          ? `rgba(255, 183, 3, ${alpha + 0.06 + eased.force * 0.05})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.lineWidth = lit ? 1.1 : 0.7;
        ctx.stroke();
      }

      if (!reduced) {
        t += 16.6;
        raf = requestAnimationFrame(draw);
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      if (pointerOn) {
        host.removeEventListener("pointermove", onMove);
        host.removeEventListener("pointerleave", onLeave);
      }
    };
  }, [interactive]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
};
