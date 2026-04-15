import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { ProtectedRoute } from "./components/common/ProtectedRoute";
import { ShellBackdrop } from "./components/layout/ShellBackdrop";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((module) => ({ default: module.HomePage }))
);
const AdminLoginPage = lazy(() =>
  import("./pages/AdminLoginPage").then((module) => ({
    default: module.AdminLoginPage,
  }))
);
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboardPage").then((module) => ({
    default: module.AdminDashboardPage,
  }))
);

const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export default function App() {
  const location = useLocation();

  return (
    <ShellBackdrop>
      <Suspense fallback={null}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <HomePage />
                </motion.div>
              }
            />
            <Route
              path="/admin/login"
              element={
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <AdminLoginPage />
                </motion.div>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <motion.div
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={pageVariants}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <AdminDashboardPage />
                  </motion.div>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </ShellBackdrop>
  );
}
