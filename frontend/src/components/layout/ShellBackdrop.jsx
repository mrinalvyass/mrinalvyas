import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

import { CustomCursor } from "../common/CustomCursor";

const ThreeBackground = lazy(() =>
  import("./ThreeBackground").then((module) => ({
    default: module.ThreeBackground,
  }))
);

export function ShellBackdrop({ children }) {
  return (
    <div className="app-shell">
      <Suspense fallback={null}>
        <ThreeBackground />
      </Suspense>
      <CustomCursor />
      <div className="grid-glow" />
      <motion.div
        className="orb orb-primary"
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="orb orb-secondary"
        animate={{ x: [0, -20, 16, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      {children}
    </div>
  );
}
