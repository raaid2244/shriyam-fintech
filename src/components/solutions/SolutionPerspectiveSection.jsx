import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';

const scenarios = [
  {
    id: '01',
    title: 'BUSINESS EXPANSION',
    subtitle: 'Expansion capital',
    description: 'Funding solutions designed to support business expansion, new capacity and long-term growth.',
    rightLabel: 'FINANCIAL SOLUTIONS',
    considerations: ['TERM FINANCE', 'WORKING CAPITAL', 'PROPERTY-BACKED FUNDING']
  },
  {
    id: '02',
    title: 'BUSINESS CONTINUITY',
    subtitle: 'Protecting operations',
    description: 'Solutions that help businesses protect their operations, manage exposure and maintain financial continuity.',
    rightLabel: 'PROTECTION & RISK',
    considerations: ['INSURANCE', 'RISK MANAGEMENT', 'LIABILITY', 'CYBER']
  },
  {
    id: '03',
    title: 'PROJECT GROWTH',
    subtitle: 'Funding a larger project',
    description: 'Structured funding solutions aligned with the scale, requirements and objectives of major projects.',
    rightLabel: 'PROJECT FUNDING',
    considerations: ['PROJECT FINANCE', 'CONSTRUCTION FINANCE', 'STRUCTURED FUNDING']
  }
];

const TripleLayerPanel = ({ scenario }) => {
  const containerRef = useRef(null);
  
  // Tie the scroll progress to the viewport position of this specific panel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "center center"]
  });

  // Both Layer 2 and Layer 3 share the exact same calculated clip-path.
  // When progress = 0: inset(0% 100% 0% 0%) -> Completely hidden
  // When progress = 1: inset(0% 0% 0% 0%) -> Completely visible
  const clipRight = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clipPath = useMotionTemplate`inset(0% ${clipRight}% 0% 0%)`;
  
  const shouldReduceMotion = useReducedMotion();
  const finalClipPath = shouldReduceMotion ? 'inset(0% 0% 0% 0%)' : clipPath;

  // --- Rendering Helpers for exact structural alignment ---
  
  // Renders the left content. Colors adapt based on whether this is the base layer or active layer.
  const renderLeft = (isActive) => (
    <div className="w-full lg:w-[45%] flex flex-col justify-center mb-12 lg:mb-0 pr-0 lg:pr-12">
      <div 
        className={`text-[14px] lg:text-[16px] font-semibold tracking-[0.12em] mb-4 ${
          isActive ? 'text-white' : 'text-[#0A9B73]'
        }`}
      >
        {scenario.id}
      </div>
      <h3 
        className={`text-[32px] md:text-[38px] lg:text-[42px] font-semibold leading-[1.0] mb-2 lg:mb-4 ${
          isActive ? 'text-white' : 'text-[#06152F]'
        }`}
      >
        {scenario.title}
      </h3>
      <p 
        className={`text-[15px] lg:text-[17px] font-normal mb-4 lg:mb-6 ${
          isActive ? 'text-[rgba(255,255,255,0.82)]' : 'text-[#475569]'
        }`}
      >
        {scenario.subtitle}
      </p>
      <p 
        className={`text-[14px] lg:text-[16px] leading-[1.6] max-w-[440px] ${
          isActive ? 'text-[rgba(255,255,255,0.78)]' : 'text-[#64748B]'
        }`}
      >
        {scenario.description}
      </p>
    </div>
  );

  // Renders the right content. Includes the ghost logic to handle the base layer spacing.
  const renderRight = (isActive, isGhost = false) => (
    <div 
      className={`w-full lg:w-[55%] flex flex-col justify-center ${isGhost ? 'opacity-0 pointer-events-none' : ''}`} 
      aria-hidden={isGhost}
    >
      <div 
        className={`text-[11px] lg:text-[12px] font-semibold tracking-[0.14em] uppercase mb-[18px] lg:mb-[24px] ${
          isActive ? 'text-[rgba(255,255,255,0.75)]' : 'text-[#0A9B73]'
        }`}
      >
        {scenario.rightLabel}
      </div>
      <div className="flex flex-col gap-[10px] lg:gap-[16px]">
        {scenario.considerations.map((item, idx) => (
          <div 
            key={idx}
            className={`text-[13px] lg:text-[15px] font-semibold tracking-[0.08em] uppercase ${
              isActive ? 'text-white' : 'text-[#475569]'
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <article 
      ref={containerRef} 
      className="relative w-full max-w-[1280px] mx-auto mb-[60px] lg:mb-[70px] last:mb-0 border border-[rgba(6,21,47,0.15)] bg-transparent rounded-2xl overflow-hidden"
    >
      
      {/* =========================================================================
          LAYER 1: BASE CONTENT
          Always visible. Stays in place. Navy/Gray text.
          The right side is rendered invisible here just to ensure the DOM height
          is calculated perfectly correctly across all viewports.
      ========================================================================= */}
      <div className="relative z-0 w-full px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row min-h-[280px] lg:min-h-[340px]">
        {renderLeft(false)}
        {renderRight(false, true)}
      </div>


      {/* =========================================================================
          LAYER 2: GREEN BACKGROUND EXPANSION
          An independent layer consisting solely of the green color.
          It expands Left -> Right.
      ========================================================================= */}
      <motion.div 
        className="absolute inset-0 w-full h-full bg-[#0A9B73] z-10 pointer-events-none"
        style={{ clipPath: finalClipPath }}
      />


      {/* =========================================================================
          LAYER 3: ACTIVE CONTENT REVEAL
          An independent layer containing the white active content.
          It is masked/clipped using the exact same progress as Layer 2.
          This achieves the text reveal (right) and the color swap (left) simultaneously.
      ========================================================================= */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-20 pointer-events-none px-8 py-12 lg:px-16 lg:py-16 flex flex-col lg:flex-row min-h-[280px] lg:min-h-[340px]"
        style={{ clipPath: finalClipPath }}
      >
        {renderLeft(true)}
        {renderRight(true, false)}
      </motion.div>

    </article>
  );
};

export default function SolutionPerspectiveSection() {
  return (
    <section className="w-full bg-[#F7F8F6] pt-24 pb-24 lg:pt-[140px] lg:pb-[160px]">
      
      {/* Intro Section */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-[60px] mb-20 lg:mb-[100px]">
        <div className="flex flex-col items-start">
          <div className="text-[12px] lg:text-[13px] font-semibold tracking-[0.18em] uppercase text-[#0A9B73] mb-6">
            SOLUTION PERSPECTIVE
          </div>
          <h2 className="text-[#06152F] text-[40px] md:text-[56px] lg:text-[76px] font-bold leading-[0.95] tracking-[-0.04em] max-w-[900px]">
            NOT EVERY REQUIREMENT<br />
            NEEDS THE SAME SOLUTION.
          </h2>
        </div>
      </div>

      {/* Main Interactive Panels Area */}
      <div className="w-full max-w-[1280px] mx-auto px-6 lg:px-[60px]">
        {scenarios.map((scenario) => (
          <TripleLayerPanel key={scenario.id} scenario={scenario} />
        ))}
      </div>

    </section>
  );
}
