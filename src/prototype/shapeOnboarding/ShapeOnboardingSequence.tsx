import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

const BG = "#F0EFEB";
const INK = "#1A1A1A";
const AUTO_MS = 2500;

const HEADLINES = [
  "Your night has a shape",
  "When you get into bed",
  "How you ease in once you're there",
  "And when you get up.",
] as const;

const easeInOut: [number, number, number, number] = [0.42, 0, 0.58, 1];

/** Quadratic arc in viewBox 0 0 390 720 — centered, opening upward */
const ARC_PATH = "M 65 500 Q 195 300 325 500";

const serif: CSSProperties = {
  fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
  fontSize: 32,
  fontWeight: 600,
  lineHeight: 1.2,
  color: INK,
  margin: 0,
};

const headlineWrapStyle: CSSProperties = {
  position: "absolute",
  left: 24,
  right: 24,
  bottom: "28%",
  textAlign: "left",
  pointerEvents: "none",
};

const progressTrack: CSSProperties = {
  width: "100%",
  height: 3,
  borderRadius: 999,
  background: "rgba(26, 26, 26, 0.12)",
  overflow: "hidden",
};

const progressFill: CSSProperties = {
  height: "100%",
  borderRadius: 999,
  background: INK,
};

export function ShapeOnboardingSequence() {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const noiseId = `shapeNoise-${uid}`;
  const gradId = `shapeArc-${uid}`;
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLen, setPathLen] = useState(800);
  const [screenIndex, setScreenIndex] = useState(0);
  const dashOffset = useMotionValue(800);
  const [rightDotOn, setRightDotOn] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const dragMovedRef = useRef(false);
  const lastGoRef = useRef(0);

  useLayoutEffect(() => {
    const id = requestAnimationFrame(() => {
      const el = pathRef.current;
      if (!el) {
        return;
      }
      const len = el.getTotalLength();
      setPathLen(len);
      dashOffset.set(len);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const goNext = useCallback(() => {
    const now = performance.now();
    if (now - lastGoRef.current < 320) {
      return;
    }
    lastGoRef.current = now;
    setScreenIndex((i) => {
      if (i >= 3) {
        return i;
      }
      return i + 1;
    });
  }, []);

  useEffect(() => {
    if (screenIndex < 2) {
      dashOffset.set(pathLen);
    }
  }, [screenIndex, pathLen, dashOffset]);

  useEffect(() => {
    if (screenIndex >= 3) {
      return;
    }
    const t = window.setTimeout(goNext, AUTO_MS);
    return () => window.clearTimeout(t);
  }, [screenIndex, goNext]);

  useEffect(() => {
    if (reduceMotion) {
      if (screenIndex >= 2) {
        dashOffset.set(screenIndex >= 3 ? 0 : pathLen * 0.4);
      }
      if (screenIndex >= 3) {
        setRightDotOn(true);
        setShowButton(true);
      }
      return;
    }

    if (screenIndex === 2) {
      dashOffset.set(pathLen);
      const controls = animate(dashOffset, pathLen * 0.4, {
        duration: 1.2,
        ease: easeInOut,
      });
      return () => controls.stop();
    }

    if (screenIndex === 3) {
      const from = pathLen * 0.4;
      dashOffset.set(from);
      const controls = animate(dashOffset, 0, {
        duration: 0.8,
        ease: easeInOut,
      });
      const tDot = window.setTimeout(() => setRightDotOn(true), 800);
      const tBtn = window.setTimeout(() => setShowButton(true), 800 + 600);
      return () => {
        controls.stop();
        window.clearTimeout(tDot);
        window.clearTimeout(tBtn);
      };
    }
  }, [screenIndex, pathLen, dashOffset, reduceMotion]);

  useEffect(() => {
    if (screenIndex < 3) {
      setRightDotOn(false);
      setShowButton(false);
    }
  }, [screenIndex]);

  const progressPct = ((screenIndex + 1) / 4) * 100;

  const onDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    if (screenIndex >= 3) {
      return;
    }
    if (Math.abs(info.offset.x) > 14) {
      dragMovedRef.current = true;
    }
    if (info.offset.x < -48 || info.velocity.x < -400) {
      goNext();
    }
  };

  const onRootClick = () => {
    if (screenIndex >= 3) {
      return;
    }
    if (dragMovedRef.current) {
      dragMovedRef.current = false;
      return;
    }
    goNext();
  };

  return (
    <motion.div
      role="application"
      aria-label="Night shape onboarding"
      drag={screenIndex < 3 ? "x" : false}
      dragConstraints={{ left: -120, right: 0 }}
      dragElastic={0.08}
      onDragEnd={onDragEnd}
      onPointerDown={() => {
        dragMovedRef.current = false;
      }}
      onClick={onRootClick}
      style={{
        position: "relative",
        width: 390,
        maxWidth: "100%",
        minHeight: "100%",
        flex: 1,
        margin: "0 auto",
        backgroundColor: BG,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        touchAction: screenIndex < 3 ? "pan-y" : "auto",
        cursor: screenIndex < 3 ? "pointer" : "default",
      }}
    >
      {/* Grain */}
      <svg
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.055,
          pointerEvents: "none",
        }}
      >
        <filter id={noiseId} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" seed="8" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${noiseId})`} />
      </svg>

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 100px rgba(0,0,0,0.07)",
        }}
      />

      <header style={{ flexShrink: 0, padding: "14px 20px 10px", position: "relative", zIndex: 2 }}>
        <p
          style={{
            margin: "0 0 10px",
            fontSize: 13,
            lineHeight: 1.3,
            color: INK,
            textAlign: "center",
            fontWeight: 400,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            opacity: 0.85,
          }}
        >
          Registering your Sleep Clock
        </p>
        <div style={progressTrack}>
          <div style={{ ...progressFill, width: `${progressPct}%`, transition: "width 0.35s ease" }} />
        </div>
      </header>

      {/* Arc + dots layer — persists across screens */}
      <div
        style={{
          position: "relative",
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 390 720"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: "90%",
            maxWidth: 360,
            height: "auto",
            overflow: "visible",
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={INK} stopOpacity={1} />
              <stop offset="55%" stopColor={INK} stopOpacity={0.55} />
              <stop offset="100%" stopColor={INK} stopOpacity={0} />
            </linearGradient>
          </defs>

          <motion.path
            ref={pathRef}
            d={ARC_PATH}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={28}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={`${pathLen} ${pathLen}`}
            style={{ strokeDashoffset: dashOffset }}
            initial={false}
          />

          {screenIndex >= 1 ? (
            <motion.circle
              cx={65}
              cy={500}
              r={14}
              fill={INK}
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 18, mass: 0.85 }
              }
              style={{
                transformOrigin: "65px 500px",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.22))",
              }}
            />
          ) : null}

          {rightDotOn ? (
            <motion.circle
              cx={325}
              cy={500}
              r={12}
              fill={INK}
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 200, damping: 18, mass: 0.85 }
              }
              style={{
                transformOrigin: "325px 500px",
                filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.2))",
              }}
            />
          ) : null}
        </svg>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={screenIndex}
          initial={
            reduceMotion
              ? { opacity: 0 }
              : { opacity: 0, x: 20 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={headlineWrapStyle}
        >
          <motion.h1
            style={serif}
            initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              ease: "easeOut",
              delay:
                reduceMotion ? 0 : screenIndex === 0 ? 0 : screenIndex === 1 ? 0.3 : screenIndex === 2 ? 0.4 : 0.15,
            }}
          >
            {HEADLINES[screenIndex]}
          </motion.h1>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          flexShrink: 0,
          padding: "12px 32px 28px",
          position: "relative",
          zIndex: 2,
          minHeight: 72,
        }}
      >
        <AnimatePresence>
          {screenIndex === 3 && showButton ? (
            <motion.button
              type="button"
              data-shape-cta
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: easeInOut }}
              style={{
                width: "100%",
                border: "none",
                borderRadius: 999,
                padding: "16px 20px",
                background: INK,
                color: "#fff",
                fontSize: 17,
                fontWeight: 600,
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(0,0,0,0.18)",
              }}
            >
              Let&apos;s build your night
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Home indicator */}
      <div
        aria-hidden
        style={{
          height: 5,
          width: 134,
          borderRadius: 999,
          background: "rgba(255,255,255,0.95)",
          margin: "0 auto 10px",
          flexShrink: 0,
        }}
      />
    </motion.div>
  );
}
