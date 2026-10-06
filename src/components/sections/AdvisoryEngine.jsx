import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';

const CONTAINER = "max-w-[1280px] mx-auto px-6 lg:px-[60px] xl:px-[80px] w-full";

const STAGES = [
  {
    id: 1,
    num: "01",
    title: "UNDERSTAND",
    descriptor: "UNDERSTANDING COMES FIRST.",
    desc: "We begin by understanding the client's financial requirement, business situation, objectives and priorities before considering the appropriate direction.",
    labels: ["CLIENT REQUIREMENT", "BUSINESS CONTEXT", "FINANCIAL OBJECTIVES"],
    process: "LISTEN • UNDERSTAND • DEFINE",
    // Architectural positions around center
    desktopPos: { x: -320, y: -200 },
    activePos: { x: -160, y: -60 }
  },
  {
    id: 2,
    num: "02",
    title: "ANALYSE",
    descriptor: "LOOKING BEYOND THE REQUIREMENT.",
    desc: "We analyse the financial position, objectives and relevant considerations to understand the broader context behind the requirement.",
    labels: ["FINANCIAL POSITION", "OBJECTIVES", "RELEVANT CONSIDERATIONS"],
    process: "REVIEW • ASSESS • CLARIFY",
    desktopPos: { x: -400, y: 0 },
    activePos: { x: -180, y: 0 }
  },
  {
    id: 3,
    num: "03",
    title: "STRUCTURE",
    descriptor: "BUILDING THE RIGHT APPROACH.",
    desc: "We structure an appropriate financial approach around the requirement, funding objective and broader business context.",
    labels: ["FUNDING OBJECTIVE", "FINANCIAL STRUCTURE", "SUITABLE DIRECTION"],
    process: "PLAN • STRUCTURE • ALIGN",
    desktopPos: { x: 0, y: 240 },
    activePos: { x: 0, y: 140 }
  },
  {
    id: 4,
    num: "04",
    title: "CONNECT",
    descriptor: "CONNECTING THE REQUIREMENT TO THE RIGHT DIRECTION.",
    desc: "We connect clients with suitable lending and financial institutions based on the nature of the requirement and the financial approach.",
    labels: ["FINANCIAL INSTITUTIONS", "LENDING OPTIONS", "REQUIREMENT ALIGNMENT"],
    process: "CONNECT • COORDINATE • FACILITATE",
    desktopPos: { x: 400, y: 0 },
    activePos: { x: 180, y: 0 }
  },
  {
    id: 5,
    num: "05",
    title: "SUPPORT",
    descriptor: "THE RELATIONSHIP CONTINUES.",
    desc: "We remain involved through the process, providing professional support, maintaining clarity and building long-term client relationships.",
    labels: ["PROCESS SUPPORT", "COORDINATION", "LONG-TERM RELATIONSHIP"],
    process: "SUPPORT • COORDINATE • CONTINUE",
    desktopPos: { x: 320, y: 200 },
    activePos: { x: 160, y: 60 }
  }
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));

export default function AdvisoryEngine() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 25, mass: 0.1 });

  // Map 0 -> 1 progress to active stage 0..4
  // We use 0.0-0.2 for stage 1, 0.2-0.4 for stage 2, etc.
  const activeStage = useTransform(smooth, [0, 1], [0, 4.99]);
  
  const currentStageIndex = useTransform(activeStage, (v) => Math.floor(v));
  
  // Center label mapping based on stage
  const centerLabel = useTransform(currentStageIndex, (idx) => {
    if (idx < 2) return "FINANCIAL SOLUTIONS";
    if (idx === 2) return "FINANCIAL APPROACH";
    return "RIGHT DIRECTION";
  });

  const counter = useTransform(currentStageIndex, (idx) => `0${idx + 1}`);

  return (
    <section className="w-full bg-[#F7F8F6] flex flex-col relative overflow-hidden font-sans">
      
      {/* 1. EDITORIAL INTRODUCTION */}
      <div className={`${CONTAINER} pt-[140px] lg:pt-[160px] pb-[80px] lg:pb-[120px]`}>
        <span className="font-heading text-[#0A9B73] text-[12px] md:text-[14px] font-semibold tracking-[0.12em] uppercase block mb-6">
          OUR APPROACH
        </span>
        <h2 className="font-heading font-bold text-[#06152F] text-[48px] md:text-[72px] lg:text-[96px] leading-[0.95] md:leading-[1.02] tracking-tight mb-8">
          FROM REQUIREMENT<br />
          TO THE <span className="text-[#0A9B73]">RIGHT DIRECTION.</span>
        </h2>
        <p className="font-sans text-[#475569] text-[18px] md:text-[20px] leading-[1.6] max-w-[680px]">
          A systematic and transparent process designed to understand each requirement, structure the right approach and connect clients with suitable financial solutions.
        </p>
      </div>

      {/* 2. ADVISORY ENGINE INTERACTIVE AREA */}
      {shouldReduceMotion ? (
        <div className={`${CONTAINER} flex flex-col items-center gap-16 py-20`}>
           <div className="w-[320px] h-[220px] border border-[#0A2144] bg-[#06152F] flex flex-col items-center justify-center relative">
              <div className="absolute top-0 right-0 w-full h-[1px] bg-[#0A9B73] opacity-50"></div>
              <h3 className="font-heading font-bold text-white tracking-widest text-[24px]">SHRIYAM</h3>
              <p className="font-sans text-[#94A3B8] text-[10px] uppercase tracking-[0.2em] mb-4">FINTECH PVT LTD</p>
              <p className="font-sans text-[#CBD5E1] text-[11px] font-semibold uppercase tracking-widest">THE RIGHT DIRECTION</p>
           </div>
           {STAGES.map((s) => (
             <div key={s.id} className="w-full max-w-[600px] border-l-2 border-[#0A9B73] pl-6 py-4">
               <span className="font-heading text-[#0A9B73] text-[14px] font-semibold">{s.num}</span>
               <h4 className="font-heading font-bold text-[#06152F] text-[32px] md:text-[48px] leading-none my-2">{s.title}</h4>
               <span className="font-sans text-[#06152F] text-[12px] md:text-[14px] font-semibold uppercase tracking-[0.08em] block mb-4">{s.descriptor}</span>
               <p className="font-sans text-[#475569] text-[16px] leading-[1.6] mb-6">{s.desc}</p>
               <div className="flex flex-wrap gap-x-4 gap-y-2">
                 {s.labels.map(l => (
                   <span key={l} className="text-[#475569] text-[11px] font-semibold tracking-wider uppercase bg-[#DDE3DF]/30 px-3 py-1 rounded">{l}</span>
                 ))}
               </div>
             </div>
           ))}
        </div>
      ) : (
        <>
          {/* DESKTOP STICKY SCROLL AREA */}
          <div ref={containerRef} className="hidden lg:block relative h-[500vh] w-full">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#F7F8F6]">
              
              {/* Counter Indicator */}
              <div className="absolute top-[40px] left-[60px] xl:left-[80px]">
                <span className="font-heading text-[14px] font-semibold tracking-[0.1em] text-[#06152F] tabular-nums">
                  <motion.span>{counter}</motion.span>
                  <span className="text-[#94A3B8]"> / 05</span>
                </span>
              </div>

              {/* Central Architectural Frame */}
              <div className="absolute z-10 w-[360px] h-[260px] border border-[#0A2144] bg-[#06152F] flex flex-col items-center justify-center relative">
                {/* Subtle green accent line */}
                <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-[#0A9B73]"></div>
                
                <h3 className="font-heading font-bold text-white tracking-widest text-[28px] mb-1">SHRIYAM</h3>
                <p className="font-sans text-[#94A3B8] text-[10px] uppercase tracking-[0.2em] mb-6">FINTECH PVT LTD</p>
                <motion.p className="font-sans text-[#CBD5E1] text-[12px] font-semibold uppercase tracking-widest">
                  {centerLabel}
                </motion.p>
              </div>

              {/* The Five Stages */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                {STAGES.map((stage, idx) => {
                   return <StageComponent key={stage.id} stage={stage} index={idx} activeStage={activeStage} />
                })}
              </div>
              
              {/* Connectors (SVG layer behind stages, above background) */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                 <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {STAGES.map((stage, idx) => (
                      <ConnectorLine key={stage.id} stage={stage} index={idx} activeStage={activeStage} />
                    ))}
                 </svg>
              </div>

            </div>
          </div>

          {/* MOBILE / TABLET STACKED LAYOUT */}
          <div className="lg:hidden w-full px-6 md:px-12 py-12 flex flex-col gap-16 items-center">
            {/* Central Structure placed first on mobile */}
            <div className="w-[300px] h-[220px] border border-[#0A2144] bg-[#06152F] flex flex-col items-center justify-center relative mb-8">
                <div className="absolute top-0 right-0 w-1/3 h-[1px] bg-[#0A9B73]"></div>
                <h3 className="font-heading font-bold text-white tracking-widest text-[24px] mb-1">SHRIYAM</h3>
                <p className="font-sans text-[#94A3B8] text-[10px] uppercase tracking-[0.2em] mb-6">FINTECH PVT LTD</p>
                <p className="font-sans text-[#CBD5E1] text-[11px] font-semibold uppercase tracking-widest">
                  FINANCIAL SOLUTIONS
                </p>
            </div>

            {STAGES.map((stage, idx) => (
               <div key={stage.id} className="w-full flex flex-col relative pb-8">
                 <div className="flex items-center gap-4 mb-4">
                   <span className="font-heading text-[#0A9B73] text-[16px] font-semibold tabular-nums">{stage.num}</span>
                   <div className="h-px bg-[#0A9B73] flex-1"></div>
                 </div>
                 <h4 className="font-heading font-bold text-[#06152F] text-[40px] md:text-[56px] leading-[0.95] mb-3">{stage.title}</h4>
                 <span className="font-sans text-[#06152F] text-[14px] md:text-[16px] font-semibold uppercase tracking-[0.1em] block mb-5">{stage.descriptor}</span>
                 <p className="font-sans text-[#475569] text-[16px] md:text-[18px] leading-[1.6] mb-6">{stage.desc}</p>
                 <div className="flex flex-wrap gap-x-4 gap-y-2">
                   {stage.labels.map(l => (
                     <span key={l} className="text-[#475569] text-[10px] md:text-[11px] font-semibold tracking-[0.08em] uppercase border border-[#DDE3DF] px-3 py-1.5 rounded-full">
                       {l}
                     </span>
                   ))}
                 </div>
               </div>
            ))}
          </div>
        </>
      )}

      {/* 3. CLOSING STATEMENT */}
      <div className="w-full flex flex-col items-center justify-center pt-[100px] pb-[120px] bg-[#F7F8F6] px-6 text-center border-t border-[#DDE3DF]">
        <h3 className="font-heading font-bold text-[#06152F] text-[24px] md:text-[36px] tracking-tight mb-5">
          FROM REQUIREMENT<br />
          TO RIGHT DIRECTION.
        </h3>
        <p className="font-sans text-[#475569] text-[16px] md:text-[18px] max-w-[600px] leading-[1.6]">
          Understanding, structure and professional support remain at the centre of every relationship.
        </p>
      </div>

    </section>
  );
}

const StageComponent = ({ stage, index, activeStage }) => {
  // activeStage ranges from 0 to 4.99.
  // Stage idx is active when activeStage is between index and index+1.
  // Peak activity is at activeStage = index + 0.5.
  const distanceToPeak = useTransform(activeStage, (val) => Math.abs(val - (index + 0.5)));
  
  // weight is 1 at peak, 0 when activeStage is >= index + 1 or <= index
  // But wait, the transition from one stage to another:
  // e.g. index 0 is active from 0 to 1. At 0, it's starting to be active. At 0.5 it's fully active. At 1 it's ending.
  // Actually, we want smooth transition. 
  // Let's use a simpler mapping:
  // active = 1 when val == index. 
  const isPast = useTransform(activeStage, (val) => val > index + 0.5);
  const isFuture = useTransform(activeStage, (val) => val < index - 0.5);

  const localProgress = useTransform(activeStage, (val) => {
    // 0 -> 1 within this stage's domain [index - 1, index]
    // If it's active right now, val is between index-0.5 and index+0.5
    const dist = Math.abs(val - index);
    return Math.max(0, 1 - dist * 1.5); // clamps at dist 0.66
  });

  // Calculate position: interpolate between desktopPos and activePos based on localProgress
  const x = useTransform(localProgress, [0, 1], [stage.desktopPos.x, stage.activePos.x]);
  const y = useTransform(localProgress, [0, 1], [stage.desktopPos.y, stage.activePos.y]);

  const numColor = useTransform(localProgress, [0, 1], ["#94A3B8", "#0A9B73"]);
  const titleColor = useTransform(localProgress, [0, 1], ["#475569", "#06152F"]);
  const descColor = useTransform(localProgress, [0, 1], ["#94A3B8", "#06152F"]);
  const ruleColor = useTransform(localProgress, [0, 1], ["#DDE3DF", "#0A9B73"]);

  const contentOpacity = useTransform(localProgress, [0.4, 1], [0, 1]);
  const contentY = useTransform(localProgress, [0.4, 1], [10, 0]);

  // Overall opacity (fade out if it's past or future? No, instructions say "completed position, content remains visible but muted")
  // So it stays visible.

  return (
    <motion.div 
      className="absolute top-1/2 left-1/2 w-[300px] xl:w-[340px] flex flex-col"
      style={{ 
        x, 
        y, 
        translateX: "-50%", 
        translateY: "-50%",
      }}
    >
      <div className="flex items-center gap-4 mb-2">
        <motion.span className="font-heading text-[14px] md:text-[16px] font-semibold tabular-nums" style={{ color: numColor }}>
          {stage.num}
        </motion.span>
        <motion.div className="h-px flex-1 origin-left" style={{ backgroundColor: ruleColor }} />
      </div>
      
      <motion.h4 className="font-heading font-bold text-[40px] xl:text-[48px] leading-[1] mb-2 tracking-tight" style={{ color: titleColor }}>
        {stage.title}
      </motion.h4>
      
      <motion.span className="font-sans text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.1em] block mb-4" style={{ color: descColor }}>
        {stage.descriptor}
      </motion.span>

      <motion.div style={{ opacity: contentOpacity, y: contentY }} className="flex flex-col gap-5">
        <p className="font-sans text-[#475569] text-[15px] xl:text-[16px] leading-[1.6]">
          {stage.desc}
        </p>
        
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {stage.labels.map(l => (
            <span key={l} className="text-[#475569] text-[9px] xl:text-[10px] font-semibold tracking-[0.08em] uppercase px-2 py-1 border border-[#DDE3DF] rounded">
              {l}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ConnectorLine = ({ stage, index, activeStage }) => {
  const localProgress = useTransform(activeStage, (val) => {
    const dist = Math.abs(val - index);
    return Math.max(0, 1 - dist * 1.5); 
  });
  
  const pathLength = useTransform(localProgress, [0.5, 1], [0, 1]);
  const opacity = useTransform(localProgress, [0.5, 0.6], [0, 1]);

  // We need to draw a line from the stage's activePos to the central frame edge.
  // The SVG is full width/height of the container. 0,0 is center since we can translate.
  // Actually, SVG coordinates start top-left. Let's make it so we can draw relative to center.

  // x1, y1 = stage.activePos
  // x2, y2 = closest point on central frame (360x260, so -180 to 180 x, -130 to 130 y)
  const tx = stage.activePos.x;
  const ty = stage.activePos.y;
  
  // Calculate a sensible end point on the central frame border
  let ex = 0;
  let ey = 0;
  
  if (Math.abs(tx) > Math.abs(ty)) {
    // Left or right
    ex = tx > 0 ? 180 : -180;
    ey = ty * (180 / Math.abs(tx)); // proportional
    ey = Math.max(-130, Math.min(130, ey));
  } else {
    // Top or bottom
    ey = ty > 0 ? 130 : -130;
    ex = tx * (130 / Math.abs(ty));
    ex = Math.max(-180, Math.min(180, ex));
  }
  
  const d = `M ${tx} ${ty} L ${ex} ${ey}`;

  return (
    <g transform="translate(50%, 50%)" style={{ transform: "translate(50%, 50%)" }}>
      <motion.path 
        d={d}
        fill="none"
        stroke="#0A9B73"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ pathLength, opacity }}
      />
    </g>
  );
};
