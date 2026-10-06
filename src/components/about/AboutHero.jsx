import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ClipboardList,
  Layers,
  Handshake,
  TrendingUp,
  Landmark,
  ShieldCheck,
  Activity,
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────────────────────
   JOURNEY DATA
   ───────────────────────────────────────────────────────────────────────────── */
const JOURNEY_STEPS = [
  {
    id: 'requirement',
    label: 'Requirement',
    desc: 'Understanding your financial need in depth.',
    icon: ClipboardList,
  },
  {
    id: 'structure',
    label: 'Structure',
    desc: 'Aligning the requirement with the right solution.',
    icon: Layers,
  },
  {
    id: 'solution',
    label: 'Solution',
    desc: 'Connecting you with relevant institutions.',
    icon: Handshake,
  },
  {
    id: 'growth',
    label: 'Growth',
    desc: 'Supporting your journey toward the objective.',
    icon: TrendingUp,
  },
];

/* Chart geometry (viewBox 0 0 340 130) — one point per journey step */
const CHART_POINTS = [
  [16, 112],
  [118, 88],
  [222, 56],
  [324, 18],
];
const CHART_LINE = 'M16,112 C60,106 84,92 118,88 S186,66 222,56 S296,30 324,18';
const CHART_AREA = `${CHART_LINE} L324,130 L16,130 Z`;

const AUTOPLAY_MS = 2600;

/* ─────────────────────────────────────────────────────────────────────────────
   FINANCIAL JOURNEY VISUAL — glass card with animated growth chart + steps
   ───────────────────────────────────────────────────────────────────────────── */
const FinancialJourneyVisual = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* Auto-advance through the journey steps */
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive(a => (a + 1) % JOURNEY_STEPS.length), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const step = JOURNEY_STEPS[active];
  const [ax, ay] = CHART_POINTS[active];

  return (
    <div
      className="relative w-full max-w-[600px] sm:h-[600px] flex items-center justify-center select-none"
      aria-label="Financial journey: requirement, structure, solution, growth"
    >
      {/* ── Main glass card ────────────────────────────────────────── */}
      <motion.div
        className="
          relative z-10 w-full max-w-[380px] rounded-[24px] p-6
          border border-white/10
          bg-gradient-to-b from-white/[0.08] to-white/[0.02]
          backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]
        "
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* top highlight */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#34D399]/60 to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p
              className="font-['Montserrat'] font-semibold uppercase text-[#34D399]"
              style={{ fontSize: '10px', letterSpacing: '0.18em' }}
            >
              One Relationship
            </p>
            <p className="font-['Montserrat'] font-semibold text-white text-[18px] mt-1">
              Your Financial Journey
            </p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A9B73]/15 border border-[#0A9B73]/30">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-[#34D399] animate-ping opacity-75" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            </span>
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden mb-5">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#0A9B73] to-[#34D399]"
            animate={{ width: `${((active + 1) / JOURNEY_STEPS.length) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Growth chart */}
        <svg viewBox="0 0 340 130" className="w-full h-auto" aria-hidden="true">
          <defs>
            <linearGradient id="journey-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0A9B73" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0A9B73" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="journey-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0A9B73" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
          </defs>

          {/* grid */}
          {[32, 64, 96].map(y => (
            <line key={y} x1="0" y1={y} x2="340" y2={y}
              stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="3 5" />
          ))}

          {/* area */}
          <motion.path
            d={CHART_AREA}
            fill="url(#journey-area)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
          />

          {/* line */}
          <motion.path
            d={CHART_LINE}
            fill="none"
            stroke="url(#journey-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* active guide */}
          <motion.line
            x1={ax} x2={ax} y2={130}
            animate={{ x1: ax, x2: ax, y1: ay }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            stroke="rgba(52,211,153,0.35)"
            strokeWidth="1"
            strokeDasharray="2 4"
          />

          {/* step points */}
          {CHART_POINTS.map(([cx, cy], i) => {
            const done = i <= active;
            return (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.35 }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              >
                {i === active && !reduce && (
                  <motion.circle
                    cx={cx} cy={cy}
                    fill="none" stroke="#34D399" strokeWidth="1.5"
                    initial={{ r: 6, opacity: 0.7 }}
                    animate={{ r: 16, opacity: 0 }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
                  />
                )}
                <circle
                  cx={cx} cy={cy} r={i === active ? 6 : 4.5}
                  fill={done ? '#34D399' : '#0A2144'}
                  stroke={done ? '#06152F' : 'rgba(52,211,153,0.5)'}
                  strokeWidth="2"
                  style={{ transition: 'all 0.3s ease' }}
                />
              </motion.g>
            );
          })}
        </svg>

        {/* Active step detail */}
        <div className="h-[52px] mt-3 mb-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <p className="font-['Montserrat'] font-semibold text-white text-[15px]">
                {step.label}
              </p>
              <p className="font-['Montserrat'] text-[#94A3B8] text-[12.5px] leading-snug mt-1">
                {step.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Step selector */}
        <div
          className="grid grid-cols-4 gap-2 pt-4 border-t border-white/[0.07]"
          onMouseLeave={() => setPaused(false)}
        >
          {JOURNEY_STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={s.id}
                id={`about-journey-step-${s.id}`}
                type="button"
                aria-pressed={isActive}
                onMouseEnter={() => { setActive(i); setPaused(true); }}
                onFocus={() => { setActive(i); setPaused(true); }}
                onBlur={() => setPaused(false)}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
              >
                <span
                  className={`
                    w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300
                    group-focus-visible:ring-2 group-focus-visible:ring-[#34D399]/60
                    ${isActive
                      ? 'bg-[#0A9B73] border-[#0A9B73] text-[#06152F] shadow-[0_8px_24px_rgba(10,155,115,0.45)] -translate-y-0.5'
                      : isDone
                        ? 'bg-[#0A9B73]/15 border-[#0A9B73]/40 text-[#34D399]'
                        : 'bg-white/[0.03] border-white/10 text-white/40 group-hover:text-white/75'}
                  `}
                >
                  <Icon size={18} strokeWidth={1.8} />
                </span>
                <span
                  className={`font-['Montserrat'] text-[11px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/45'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────────────────────
   FADE-UP VARIANT for Framer Motion
   ───────────────────────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN EXPORT — ABOUT HERO
   ───────────────────────────────────────────────────────────────────────────── */
const AboutHero = () => {
  return (
    <section
      className="relative bg-[#06152F] overflow-hidden"
      style={{ minHeight: '860px' }}
      aria-labelledby="about-hero-heading"
    >
      {/* ── Radial depth overlays ──────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 68% 28%, rgba(10,155,115,0.07) 0%, transparent 62%),' +
            'radial-gradient(ellipse 55% 75% at 0% 100%, rgba(10,33,68,0.55) 0%, transparent 55%)',
        }}
      />

      {/* ── Inner content ─────────────────────────────────────────── */}
      <div
        className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14"
        style={{ minHeight: '860px' }}
      >
        <div
          className="flex flex-col lg:flex-row"
          style={{ minHeight: '860px' }}
        >
          {/* ────────────────────────────────────────────────────────────
              LEFT COLUMN — 45%
              ──────────────────────────────────────────────────────────── */}
          <motion.div
            className="w-full lg:w-[45%] pt-[140px] pb-16 lg:py-0 lg:pt-[160px] lg:pr-10 flex flex-col justify-center"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } } }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-3 mb-9"
            >
              <div className="h-[1px] w-10 bg-[#0A9B73]" style={{ opacity: 0.75 }} />
              <span
                className="font-['Montserrat'] font-medium uppercase text-[#0A9B73]"
                style={{ fontSize: '12px', letterSpacing: '0.18em' }}
              >
                About Shriyam
              </span>
            </motion.div>

            {/* H1 — main heading */}
            <motion.h1
              id="about-hero-heading"
              variants={fadeUp}
              transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
              className="font-['Montserrat'] font-semibold text-white leading-[1.07] tracking-[-0.01em] mb-7"
              style={{ fontSize: 'clamp(40px, 5.2vw, 70px)' }}
            >
              Financial Solutions
              <br />
              Built Around Your
              <br />
              <span className="relative inline-block text-[#0A9B73]">
                Journey.
                {/* Subtle green underline */}
                <svg
                  className="absolute left-0 w-full"
                  style={{ bottom: '-4px' }}
                  height="3"
                  viewBox="0 0 220 3"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M0 1.5 Q55 0.2 110 1.5 Q165 2.8 220 1.5"
                    stroke="#0A9B73"
                    strokeWidth="1.6"
                    fill="none"
                    opacity="0.55"
                  />
                </svg>
              </span>
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-['Montserrat'] font-normal text-[#94A3B8] leading-[1.72] mb-10"
              style={{
                fontSize:  'clamp(14.5px, 1.1vw, 16.5px)',
                maxWidth:  '520px',
              }}
            >
              Shriyam Fintech brings funding, insurance and risk-management
              solutions together to help businesses, professionals and individuals
              navigate their financial requirements through one trusted relationship.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-12"
            >
              {/* Primary CTA */}
              <Link
                to="/solutions"
                className="
                  group inline-flex items-center gap-2.5
                  bg-[#0A9B73] hover:bg-[#087A5B]
                  text-[#06152F] font-['Montserrat'] font-semibold
                  rounded-[9px] transition-all duration-[250ms]
                  hover:-translate-y-[2px]
                  hover:shadow-[0_10px_32px_rgba(10,155,115,0.38)]
                "
                style={{
                  fontSize:   '14px',
                  letterSpacing: '0.02em',
                  height:     '50px',
                  padding:    '0 26px',
                }}
              >
                Discover Shriyam
                <ArrowRight
                  size={14}
                  className="group-hover:translate-x-[3px] transition-transform duration-200"
                />
              </Link>

              {/* Secondary CTA */}
              <Link
                to="/contact"
                className="
                  group inline-flex items-center gap-1.5
                  text-white/65 hover:text-[#0A9B73]
                  font-['Montserrat'] font-medium
                  transition-colors duration-200
                "
                style={{ fontSize: '14px' }}
              >
                Talk to an Expert
                <ArrowRight
                  size={13}
                  className="group-hover:translate-x-[2px] transition-transform duration-200"
                />
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="flex items-center flex-wrap gap-x-3 gap-y-2"
            >
              {['FUNDING', 'PROTECTION', 'GROWTH', 'RISK MANAGEMENT'].map((item, i, arr) => (
                <React.Fragment key={item}>
                  <span
                    className="font-['Montserrat'] font-medium text-[#94A3B8]/65 uppercase"
                    style={{ fontSize: '11px', letterSpacing: '0.13em' }}
                  >
                    {item}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-[#94A3B8]/25" style={{ fontSize: '10px' }}>•</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* ────────────────────────────────────────────────────────────
              RIGHT COLUMN — 55% | Glass journey card + floating services
              ──────────────────────────────────────────────────────────── */}
          <div className="w-full lg:w-[55%] lg:pt-[100px] pb-16 lg:pb-0 relative flex items-center justify-center lg:justify-end">
            <FinancialJourneyVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
