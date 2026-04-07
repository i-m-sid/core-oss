import { useEffect, useRef } from "react";
import { motion, useAnimationControls, AnimatePresence } from "motion/react";

const EASE_OUT: [number, number, number, number] = [0, 0, 0.2, 1];

// How long to hold the logo visible after it finishes animating in,
// before triggering the exit fade
const HOLD_MS = 300;

interface LoadingOverlayProps {
  onComplete: () => void;
}

function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const controls = useAnimationControls();
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // Wait for both polygons to finish (second one: delay 0.1 + duration 0.9 = 1.0s)
      await controls.start("visible");
      // Hold briefly so it doesn't feel like it flashes
      await new Promise(r => setTimeout(r, HOLD_MS));
      if (mounted) onCompleteRef.current?.();
    };

    run();
    return () => { mounted = false; };
  }, [controls]);

  return (
    // Wrap everything in a single motion.div so exit fades both bg + logo together
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "#0e0f10" }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div style={{ width: 80, height: 80 }}>
        <svg
          viewBox="0 0 498 510"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Top-right triangle */}
          <motion.polygon
            points="280.511,18.6 470.689,128.4 280.511,238.2"
            fill="white"
            initial={{ opacity: 0, x: 76, y: -44, rotate: 7, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 1, 1],
                x: [76, -7, 0],
                y: [-44, 3, 0],
                rotate: [7, -1.4, 0],
                scale: [0.9, 1.03, 1],
                transition: {
                  duration: 0.86,
                  times: [0, 0.72, 1],
                  ease: EASE_OUT,
                },
              },
            }}
            style={{ transformOrigin: "280px 128px" }}
          />
          {/* Bottom-left parallelogram */}
          <motion.polygon
            points="27.311,149.4 280.511,238.2 280.511,491.4 27.311,402.6"
            fill="white"
            initial={{ opacity: 0, y: 78, scale: 0.9 }}
            animate={controls}
            variants={{
              visible: {
                opacity: [0, 1, 1],
                y: [78, -5, 0],
                scale: [0.9, 1.02, 1],
                transition: {
                  delay: 0.1,
                  duration: 0.9,
                  times: [0, 0.74, 1],
                  ease: EASE_OUT,
                },
              },
            }}
            style={{ transformOrigin: "160px 320px" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}

export function LoadingOverlayPresence({
  show,
  onComplete,
}: {
  show: boolean;
  onComplete: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {show && <LoadingOverlay key="loading" onComplete={onComplete} />}
    </AnimatePresence>
  );
}
