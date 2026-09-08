import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { fireHeartConfetti } from "../lib/confetti";

export const HEART_PATH =
  "M50 88.5 C22 68 4 50.5 4 31.5 C4 16.8 15.8 8 28.6 8 C37.2 8 45.1 12.4 50 19.4 C54.9 12.4 62.8 8 71.4 8 C84.2 8 96 16.8 96 31.5 C96 50.5 78 68 50 88.5 Z";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const n = Number.parseInt(full.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const t = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  const mix = (c: number) => Math.round((t - c) * p + c);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function clipHeart(
  ctx: CanvasRenderingContext2D,
  cssW: number,
  cssH: number,
  dpr: number,
) {
  ctx.save();
  ctx.setTransform((dpr * cssW) / 100, 0, 0, (dpr * cssH) / 100, 0, 0);
  ctx.clip(new Path2D(HEART_PATH));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function paintFoil(
  ctx: CanvasRenderingContext2D,
  cssW: number,
  cssH: number,
  dpr: number,
  foilColor: string,
) {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  clipHeart(ctx, cssW, cssH, dpr);

  const gradient = ctx.createLinearGradient(0, 0, cssW, cssH);
  gradient.addColorStop(0, shade(foilColor, 0.28));
  gradient.addColorStop(0.35, foilColor);
  gradient.addColorStop(0.55, shade(foilColor, -0.18));
  gradient.addColorStop(0.78, shade(foilColor, 0.16));
  gradient.addColorStop(1, shade(foilColor, -0.32));
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, cssW, cssH);

  const sheen = ctx.createLinearGradient(0, 0, cssW * 0.4, cssH);
  sheen.addColorStop(0, "rgba(255,255,255,0.38)");
  sheen.addColorStop(0.45, "rgba(255,255,255,0.04)");
  sheen.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, cssW, cssH);

  ctx.fillStyle = "rgba(255,255,255,0.78)";
  ctx.font = "700 22px Montserrat, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 4;
  ctx.fillText("SCRATCH", cssW / 2, cssH * 0.44);
  ctx.shadowBlur = 0;
  ctx.font = "600 13px Montserrat, sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.fillText("the heart", cssW / 2, cssH * 0.53);

  ctx.restore();
}

type HeartScratchCardProps = {
  width?: number;
  height?: number;
  foilColor?: string;
  prizeColor?: string;
  accentColor?: string;
  brushSize?: number;
  finishPercent?: number;
  names: string;
  date: string;
  time: string;
};

export function HeartScratchCard({
  width = 320,
  height = 320,
  foilColor = "#7d562d",
  prizeColor = "#fff1ec",
  accentColor = "#5b3912",
  brushSize = 28,
  finishPercent = 42,
  names,
  date,
  time,
}: HeartScratchCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const scratching = useRef(false);
  const revealedRef = useRef(false);
  const checkTimer = useRef<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [size, setSize] = useState({ w: width, h: height });

  const clipId = useMemo(
    () => `heart-clip-${foilColor.replace("#", "")}`,
    [foilColor],
  );

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) {
      return;
    }
    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return;
    }
    paintFoil(ctx, w, h, dpr, foilColor);
    setSize({ w, h });
    revealedRef.current = false;
    setRevealed(false);
    setProgress(0);
  }, [foilColor]);

  useEffect(() => {
    setupCanvas();
    const wrap = wrapRef.current;
    if (!wrap) {
      return;
    }
    const observer = new ResizeObserver(() => setupCanvas());
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [setupCanvas]);

  const pointerToLocal = (event: PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return null;
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const scratchLine = (
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const dpr = canvas.width / size.w || 1;
    clipHeart(ctx, size.w, size.h, dpr);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#000";
    ctx.fillStyle = "#000";
    ctx.lineWidth = brushSize;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const measureProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) {
      return 0;
    }
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      return 0;
    }
    const { width: cw, height: ch } = canvas;
    const data = ctx.getImageData(0, 0, cw, ch).data;
    const probe = document.createElement("canvas").getContext("2d");
    if (!probe) {
      return 0;
    }
    const path = new Path2D(HEART_PATH);
    const step = 4;
    let inside = 0;
    let cleared = 0;
    for (let y = 0; y < ch; y += step) {
      for (let x = 0; x < cw; x += step) {
        const nx = (x / cw) * 100;
        const ny = (y / ch) * 100;
        if (!probe.isPointInPath(path, nx, ny)) {
          continue;
        }
        inside++;
        const alpha = data[(y * cw + x) * 4 + 3];
        if (alpha < 48) {
          cleared++;
        }
      }
    }
    if (!inside) {
      return 0;
    }
    return (cleared / inside) * 100;
  }, []);

  const completeReveal = useCallback(() => {
    if (revealedRef.current) {
      return;
    }
    revealedRef.current = true;
    setRevealed(true);
    setProgress(100);
    fireHeartConfetti();
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.opacity = "0";
      canvas.style.pointerEvents = "none";
    }
  }, []);

  const scheduleCheck = useCallback(() => {
    if (checkTimer.current) {
      window.clearTimeout(checkTimer.current);
    }
    checkTimer.current = window.setTimeout(() => {
      const percent = measureProgress();
      setProgress(percent);
      if (percent >= finishPercent) {
        completeReveal();
      }
    }, 60);
  }, [completeReveal, finishPercent, measureProgress]);

  const onPointerDown = (event: PointerEvent<HTMLCanvasElement>) => {
    if (revealedRef.current) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    scratching.current = true;
    const point = pointerToLocal(event);
    if (!point) {
      return;
    }
    lastPoint.current = point;
    scratchLine(point, point);
  };

  const onPointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!scratching.current || revealedRef.current) {
      return;
    }
    const point = pointerToLocal(event);
    if (!point || !lastPoint.current) {
      return;
    }
    scratchLine(lastPoint.current, point);
    lastPoint.current = point;
    scheduleCheck();
  };

  const endScratch = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!scratching.current) {
      return;
    }
    scratching.current = false;
    lastPoint.current = null;
    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
    scheduleCheck();
  };

  const handleKeyReveal = (event: KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      completeReveal();
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto"
      style={{ width, height, maxWidth: "100%" }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={HEART_PATH} transform="scale(0.01 0.01)" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute inset-0 overflow-hidden shadow-[0_18px_50px_-18px_rgba(0,0,0,0.45)]"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          background: `radial-gradient(circle at 35% 30%, ${shade(prizeColor, 0.35)}, ${prizeColor} 55%, ${shade(prizeColor, -0.06)})`,
        }}
      >
        <div className="flex h-full flex-col items-center justify-center gap-2 px-10 pb-6 pt-4 text-center">
          {/* <span
            className="flex h-10 w-10 items-center justify-center rounded-full border"
            style={{
              borderColor: `${accentColor}33`,
              background: `${accentColor}14`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill={accentColor}
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </span> */}
          <span
            className="font-calligraphy text-3xl leading-tight"
            style={{ color: accentColor }}
          >
            {names}
          </span>
          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <span
              className="font-serif text-3xl italic "
              style={{ color: accentColor }}
            >
              {date}
            </span>
            <span
              className="font-sans text-lg"
              style={{ color: `${accentColor}cc` }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full touch-none cursor-grab transition-opacity duration-500 active:cursor-grabbing"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          opacity: revealed ? 0 : 1,
          pointerEvents: revealed ? "none" : "auto",
        }}
        role="img"
        tabIndex={0}
        aria-label="Scratch the heart to reveal the couple. Press Enter to reveal."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endScratch}
        onPointerCancel={endScratch}
        onPointerLeave={endScratch}
        onKeyDown={handleKeyReveal}
      />

      {!revealed && progress > 2 ? (
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/55 px-2.5 py-0.5 text-[10px] font-medium text-white">
          {Math.min(99, Math.round(progress))}%
        </div>
      ) : null}
    </div>
  );
}
