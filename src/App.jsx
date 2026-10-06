import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Approach from './pages/Approach';
import Leadership from './pages/Leadership';
import Contact from './pages/Contact';

/* ── Top progress bar on route change ─────────────────── */
const RouteProgressBar = () => {
  const location = useLocation();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true);
    const t = setTimeout(() => setActive(false), 700);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
      <AnimatePresence>
        {active && (
          <motion.div
            key={location.pathname}
            className="h-full bg-gradient-to-r from-brand-green via-emerald-400 to-brand-green"
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={{ scaleX: 1, transformOrigin: 'left' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Page wrapper with enter animation ─────────────────── */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.28, ease: 'easeIn' } },
};

const AnimatedPage = ({ children }) => (
  <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
    {children}
  </motion.div>
);

// ScrollToTop component to ensure page starts at top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

/* ── Animated routes wrapper ───────────────────────────── */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="about" element={<AnimatedPage><About /></AnimatedPage>} />
          <Route path="solutions" element={<AnimatedPage><Solutions /></AnimatedPage>} />
          <Route path="industries" element={<AnimatedPage><Industries /></AnimatedPage>} />
          <Route path="approach" element={<AnimatedPage><Approach /></AnimatedPage>} />
          <Route path="leadership" element={<AnimatedPage><Leadership /></AnimatedPage>} />
          <Route path="contact" element={<AnimatedPage><Contact /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><Home /></AnimatedPage>} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <RouteProgressBar />
      <ScrollToTop />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
