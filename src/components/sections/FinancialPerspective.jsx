import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const bandsData = [
  {
    num: "01",
    title: "FUNDING",
    descriptor: "STRUCTURED CAPITAL",
    desc: "We structure funding around the financial needs of businesses, helping connect requirements with suitable lending, working capital and project finance solutions.",
    cats: "LENDING · WORKING CAPITAL · PROJECT FINANCE",
    activeBg: "#06152F",
    activeNum: "#0A9B73",
    activeDesc: "#FFFFFF",
    pColor: "rgba(255,255,255,0.78)",
    catColor: "#0A9B73",
  },
  {
    num: "02",
    title: "PROTECTION",
    descriptor: "COMPREHENSIVE SAFEGUARDS",
    desc: "We help businesses and individuals identify the right insurance and protection solutions across life, health, general and commercial requirements.",
    cats: "LIFE · HEALTH · COMMERCIAL · INSURANCE",
    activeBg: "#0A9B73",
    activeNum: "#06152F",
    activeDesc: "#FFFFFF",
    pColor: "rgba(255,255,255,0.9)",
    catColor: "#06152F",
  },
  {
    num: "03",
    title: "GROWTH",
    descriptor: "STRATEGIC ENABLEMENT",
    desc: "We support financial growth through solutions designed around business expansion, financial planning and the changing requirements of growing enterprises.",
    cats: "EXPANSION · PLANNING · BUSINESS GROWTH",
    activeBg: "#06152F",
    activeNum: "#0A9B73",
    activeDesc: "#FFFFFF",
    pColor: "rgba(255,255,255,0.78)",
    catColor: "#0A9B73",
  },
  {
    num: "04",
    title: "RISK MANAGEMENT",
    descriptor: "ACTIVE MITIGATION",
    desc: "We help address financial exposure through appropriate solutions covering liability, cyber, property, business and other risk-management requirements.",
    cats: "LIABILITY · CYBER · PROPERTY · BUSINESS RISK",
    activeBg: "#0A9B73",
    activeNum: "#06152F",
    activeDesc: "#FFFFFF",
    pColor: "rgba(255,255,255,0.9)",
    catColor: "#06152F",
  },
];

/* Shared horizontal container — identical to the intro so every left edge lines up */
const CONTAINER = "max-w-[1280px] mx-auto px-6 lg:px-[60px] xl:px-[80px] w-full";

/* Height of a collapsed band header (responsive, keeps 4 rows + 1 open band inside the viewport) */
const BAND_H = "clamp(68px, 10.5vh, 104px)";

/* Smooth cubic in-out for transitions between bands */
const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* ------------------------------------------------------------------ */
/* Band header row — rendered twice (light base + dark overlay) so     */
/* the colour wipe never produces unreadable text.                    */
/* ------------------------------------------------------------------ */
const BandHeader = ({ data, titleColor, descColor }) => (
  <div className={`${CONTAINER} grid grid-cols-12 gap-6 items-center`} style={{ height: BAND_H }}>
    <h3
      className="col-span-7 font-heading font-bold uppercase tracking-[-0.02em] leading-none whitespace-nowrap text-[30px] lg:text-[40px] xl:text-[48px]"
      style={{ color: titleColor }}
    >
      {data.title}
    </h3>
    <span
      className="col-span-5 text-right font-sans font-semibold uppercase tracking-[0.14em] text-[12px] lg:text-[13px] xl:text-[14px]"
      style={{ color: descColor }}
    >
      {data.descriptor}
    </span>
  </div>
);

const DesktopBand = ({ data, index, active, isLast }) => {
  /* 0 → 1 openness of this band. Triangular weights always sum to 1,
     so the frame's total height never changes while scrolling. */
  const weight = useTransform(active, (a) => clamp01(1 - Math.abs(a - index)));

  /* Colour wipe runs slightly ahead of the height so the band reads as
     "active" by the time it is open. */
  const wipe = useTransform(weight, (w) => clamp01((w - 0.1) / 0.6));
  const clipPath = useTransform(wipe, (w) => `inset(0% ${(1 - w) * 100}% 0% 0%)`);

  /* Detail copy only appears once the band is mostly open, then rises in */
  const detailOpacity = useTransform(weight, [0.55, 0.95], [0, 1]);
  const detailY = useTransform(weight, [0.55, 1], [24, 0]);

  /* Accent rule that draws across under the header when active */
  const ruleScale = useTransform(weight, [0.6, 1], [0, 1]);

  return (
    <motion.div
      className={`relative w-full overflow-hidden border-t border-[#DDE3DF] ${isLast ? "border-b" : ""}`}
      style={{ flexGrow: weight, flexShrink: 0, flexBasis: BAND_H }}
    >
      {/* LIGHT BASE LAYER — header only, no hidden copy (no ghost text) */}
      <div className="absolute inset-0 bg-[#F7F8F6]">
        <BandHeader data={data} titleColor="#06152F" descColor="#64748B" />
      </div>

      {/* ACTIVE LAYER — revealed with a left-to-right ink wipe */}
      <motion.div
        className="absolute inset-0 flex flex-col"
        style={{ backgroundColor: data.activeBg, clipPath, willChange: "clip-path" }}
      >
        <BandHeader
          data={data}
          titleColor="#FFFFFF"
          descColor={data.activeDesc}
        />

        {/* Accent rule */}
        <div className={CONTAINER}>
          <motion.div
            className="h-px w-full origin-left"
            style={{ scaleX: ruleScale, backgroundColor: "rgba(255,255,255,0.18)" }}
          />
        </div>

        {/* Detail area */}
        <div className={`${CONTAINER} relative flex-1 flex items-center justify-center py-6 lg:py-8`}>
          <motion.div
            className="flex flex-col items-center text-center max-w-[640px]"
            style={{ opacity: detailOpacity, y: detailY }}
          >
            <p
              className="font-sans text-[15px] lg:text-[17px] xl:text-[18px] leading-[1.7]"
              style={{ color: data.pColor }}
            >
              {data.desc}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-5 lg:mt-6">
              {data.cats.split(" · ").map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1.5 lg:px-4 lg:py-2 border rounded-full text-[10px] lg:text-[11px] font-semibold tracking-[0.1em] uppercase"
                  style={{ borderColor: data.catColor, color: data.catColor }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MobileBand = ({ data }) => {
  return (
    <div
      style={{ backgroundColor: data.activeBg }}
      className="w-full flex flex-col justify-center px-6 py-12 md:py-16"
    >
      <h2
        style={{ color: "#FFFFFF" }}
        className="font-heading font-bold text-[36px] sm:text-[40px] leading-[1] mb-3"
      >
        {data.title}
      </h2>
      <h4
        style={{ color: data.activeDesc }}
        className="font-sans font-semibold text-[13px] sm:text-[14px] uppercase tracking-[0.08em] mb-5"
      >
        {data.descriptor}
      </h4>

      <div>
        <p className="font-sans text-[15px] sm:text-[16px] leading-[1.65] mb-6" style={{ color: data.pColor }}>
          {data.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {data.cats.split(' · ').map((cat, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 border rounded-full text-[10px] font-semibold tracking-[0.08em] uppercase"
              style={{ borderColor: data.catColor, color: data.catColor }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FinancialPerspective() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  /* 0 when the sticky stage locks, 1 when it releases */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Weighted, inertial feel without hijacking the wheel */
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.35 });

  /* Map progress → active band index with a hold plateau on every band */
  const active = useTransform(
    smooth,
    [0, 0.14, 0.28, 0.43, 0.57, 0.72, 0.86, 1],
    [0, 0, 1, 1, 2, 2, 3, 3],
    { ease: easeInOutCubic }
  );

  const progressScale = useTransform(smooth, [0, 1], [0, 1]);
  const counter = useTransform(active, (a) => `0${Math.min(4, Math.round(a) + 1)}`);

  return (
    <section className="w-full bg-[#F7F8F6] flex flex-col">

      {/* 1. EDITORIAL INTRODUCTION */}
      <div className={`${CONTAINER} pt-[100px] md:pt-[140px] pb-[50px] md:pb-[72px]`}>
        <SectionEyebrow text="Financial Perspective" className="mb-6" />
        <div className="grid grid-cols-12 gap-6 items-end">
          <h2 className="col-span-12 lg:col-span-8 font-heading font-bold text-[#06152F] text-[40px] md:text-[60px] lg:text-[68px] xl:text-[84px] leading-[0.98] tracking-[-0.02em] break-words">
            THE REQUIREMENT<br />
            IS NEVER JUST <span className="text-[#0A9B73]">ONE THING.</span>
          </h2>
          <p className="col-span-12 lg:col-span-4 font-sans text-[#475569] text-[17px] lg:text-[18px] leading-[1.65] lg:pb-3">
            We look beyond individual financial products to understand the wider financial requirement — funding, protection, growth and risk.
          </p>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE AREA */}
      {shouldReduceMotion ? (
        // ACCESSIBILITY: Reduced Motion Fallback
        <div className="w-full flex flex-col max-w-[1280px] mx-auto">
          {bandsData.map((b, i) => <MobileBand key={i} data={b} />)}
        </div>
      ) : (
        <>
          {/* DESKTOP STICKY STAGE */}
          <div ref={containerRef} className="hidden md:block relative h-[380vh] w-full">
            <div className="sticky top-0 h-screen w-full flex flex-col pt-[96px] pb-6 bg-[#F7F8F6]">

              {/* Stage meta row */}
              <div className={`${CONTAINER} flex items-center gap-6 pb-4`}>
                <span className="font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#64748B] whitespace-nowrap">
                  The Financial Spectrum
                </span>
                <div className="relative flex-1 h-px bg-[#DDE3DF] overflow-hidden">
                  <motion.div
                    className="absolute inset-0 origin-left bg-[#0A9B73]"
                    style={{ scaleX: progressScale }}
                  />
                </div>
                <span className="font-heading text-[12px] font-semibold tracking-[0.1em] text-[#06152F] tabular-nums whitespace-nowrap">
                  <motion.span>{counter}</motion.span>
                  <span className="text-[#94A3B8]"> / 04</span>
                </span>
              </div>

              {/* Expanding frame — fills remaining height */}
              <div className="flex-1 min-h-0 w-full flex flex-col">
                {bandsData.map((b, i) => (
                  <DesktopBand
                    key={b.num}
                    data={b}
                    index={i}
                    active={active}
                    isLast={i === bandsData.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE STACKED LAYOUT */}
          <div className="md:hidden w-full flex flex-col">
            {bandsData.map((b, i) => <MobileBand key={i} data={b} />)}
          </div>
        </>
      )}


    </section>
  );
}
