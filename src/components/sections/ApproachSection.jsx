import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const STAGES = [
  {
    id: 1,
    num: "01",
    title: "UNDERSTAND",
    descriptor: "UNDERSTANDING COMES FIRST.",
    desc: "We begin by understanding the client's financial requirement, business situation, objectives and priorities before considering the appropriate direction.",
    labels: ["CLIENT REQUIREMENT", "BUSINESS CONTEXT", "FINANCIAL OBJECTIVES"],
    process: "LISTEN • UNDERSTAND • DEFINE",
    image: "/images/financial-context/understanding.jpg"
  },
  {
    id: 2,
    num: "02",
    title: "ANALYSE",
    descriptor: "LOOKING BEYOND THE REQUIREMENT.",
    desc: "We analyse the financial position, objectives and relevant considerations to understand the broader context behind the requirement.",
    labels: ["FINANCIAL POSITION", "OBJECTIVES", "RELEVANT CONSIDERATIONS"],
    process: "REVIEW • ASSESS • CLARIFY",
    image: "/images/financial-context/cashflow.jpg"
  },
  {
    id: 3,
    num: "03",
    title: "STRUCTURE",
    descriptor: "BUILDING THE RIGHT APPROACH.",
    desc: "We structure an appropriate financial approach around the requirement, funding objective and broader business context.",
    labels: ["FUNDING OBJECTIVE", "FINANCIAL STRUCTURE", "SUITABLE DIRECTION"],
    process: "PLAN • STRUCTURE • ALIGN",
    image: "/images/financial-context/structure-planning.jpg"
  },
  {
    id: 4,
    num: "04",
    title: "CONNECT",
    descriptor: "CONNECTING THE REQUIREMENT TO THE RIGHT DIRECTION.",
    desc: "We connect clients with suitable lending and financial institutions based on the nature of the requirement and the financial approach.",
    labels: ["FINANCIAL INSTITUTIONS", "LENDING OPTIONS", "REQUIREMENT ALIGNMENT"],
    process: "CONNECT • COORDINATE • FACILITATE",
    image: "/images/financial-context/connect-meeting.jpg"
  },
  {
    id: 5,
    num: "05",
    title: "SUPPORT",
    descriptor: "THE RELATIONSHIP CONTINUES.",
    desc: "We remain involved through the process, providing professional support, maintaining clarity and building long-term client relationships.",
    labels: ["PROCESS SUPPORT", "COORDINATION", "LONG-TERM RELATIONSHIP"],
    process: "SUPPORT • COORDINATE • CONTINUE",
    image: "/images/financial-context/expanding.jpg"
  }
];

export default function ApproachSection() {
  const timelineRef = useRef(null);

  // Measure scroll through the entire timeline container
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  return (
    <section className="bg-[#F7F8F6] w-full font-sans overflow-hidden">
      
      {/* 1. SECTION INTRO */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-[60px] xl:px-[80px] pt-[140px] lg:pt-[160px] pb-[90px] lg:pb-[120px]">
        <SectionEyebrow text="OUR APPROACH" className="mb-6" />
        <h2 className="font-heading font-bold text-[#06152F] text-[42px] md:text-[72px] lg:text-[92px] leading-[1] md:leading-[0.98] tracking-tight mb-8 break-words">
          FROM REQUIREMENT<br />
          TO THE <span className="text-[#0A9B73]">RIGHT DIRECTION.</span>
        </h2>
        <p className="font-sans text-[#475569] text-[18px] md:text-[20px] leading-[1.6] max-w-[680px]">
          A systematic and transparent process designed to understand each requirement, structure the right approach and connect clients with suitable financial solutions.
        </p>
      </div>

      {/* 2. TIMELINE STRUCTURE */}
      <div className="w-full pb-32">
        <div 
          ref={timelineRef} 
          className="max-w-[1280px] mx-auto relative px-6 md:px-12 lg:px-0"
        >
          {/* Central Vertical Line (Desktop: 50%, Mobile: Left) */}
          <div className="absolute top-0 bottom-0 left-[24px] md:left-[48px] lg:left-1/2 w-[2px] bg-[#DDE3DF] -translate-x-1/2 z-0"></div>
          
          {/* Active Green Line */}
          <motion.div 
            className="absolute top-0 bottom-0 left-[24px] md:left-[48px] lg:left-1/2 w-[2px] bg-[#0A9B73] -translate-x-1/2 z-10 origin-top"
            style={{ scaleY: scrollYProgress }}
          ></motion.div>

          {/* Timeline Stages */}
          <div className="flex flex-col gap-[100px] lg:gap-0 relative z-20">
            {STAGES.map((stage, index) => (
              <TimelineStage key={stage.id} stage={stage} index={index} />
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}

const TimelineStage = ({ stage, index }) => {
  const ref = useRef(null);
  // Detect when this specific stage crosses the center of the viewport
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  const isEven = index % 2 === 1; // 0-indexed: 0,2,4 are odd stages (1,3,5), 1,3 are even (2,4)
  // Stage 01 (index 0): CONTENT LEFT, IMAGE RIGHT
  // Stage 02 (index 1): IMAGE LEFT, CONTENT RIGHT

  // Animations for content and image
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const fadeUpDelayed = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] } }
  };

  const clipImage = {
    hidden: { clipPath: isEven ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0 0 0)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  };

  const clipImageMobile = {
    hidden: { clipPath: "inset(0 100% 0 0)" },
    visible: { clipPath: "inset(0 0 0 0)", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div 
      ref={ref} 
      className={`relative w-full min-h-[420px] lg:h-[500px] flex items-center transition-all duration-700 ${isInView ? 'opacity-100' : 'opacity-[0.45] grayscale-[20%]'}`}
    >
      
      {/* ────────────────────────────────────────────────────────
          DESKTOP LAYOUT (Hidden on mobile)
      ───────────────────────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-2 w-full absolute inset-0 items-center">
        
        {/* Node on central axis */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
          <motion.div 
            className="rounded-full transition-colors duration-500 flex items-center justify-center"
            animate={{ 
              width: isInView ? 22 : 12, 
              height: isInView ? 22 : 12,
              backgroundColor: isInView ? '#0A9B73' : '#CBD5E1',
              boxShadow: isInView ? '0 0 0 6px rgba(10, 155, 115, 0.15)' : '0 0 0 0px rgba(0,0,0,0)'
            }}
          />
        </div>

        {/* Content Side */}
        <motion.div 
          className={`flex flex-col justify-center px-[60px] xl:px-[80px] h-full ${isEven ? 'order-2' : 'order-1'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.div variants={fadeUp}>
            <h3 className={`font-heading font-bold text-[52px] xl:text-[68px] leading-[0.95] tracking-tight mb-5 transition-colors duration-500 ${isInView ? 'text-[#0A9B73]' : 'text-[#06152F]'}`}>
              {stage.title}
            </h3>
            <span className="font-sans text-[#06152F] text-[18px] xl:text-[21px] font-semibold uppercase tracking-[0.08em] block mb-5">
              {stage.descriptor}
            </span>
          </motion.div>
          
          <motion.div variants={fadeUpDelayed}>
            <p className="font-sans text-[#475569] text-[17px] xl:text-[19px] leading-[1.6] max-w-[560px] mb-8">
              {stage.desc}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8 max-w-[500px]">
              {stage.labels.map(l => (
                <span key={l} className="text-[#475569] text-[11px] xl:text-[12px] font-semibold tracking-wider uppercase border border-[#DDE3DF] bg-white px-3 py-1.5 rounded">
                  {l}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Huge Optional Background Number */}
          <div className="absolute top-1/2 -translate-y-1/2 pointer-events-none z-[-1] select-none"
               style={{ left: isEven ? '60px' : 'auto', right: isEven ? 'auto' : '60px' }}>
            <span className="font-heading font-bold text-[#06152F] text-[280px] leading-none opacity-[0.03]">
              {stage.num}
            </span>
          </div>
        </motion.div>

        {/* Image Side */}
        <motion.div 
          className={`flex items-center h-full px-[60px] xl:px-[80px] ${isEven ? 'order-1 justify-end' : 'order-2 justify-start'}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20%" }}
        >
          <motion.div 
            variants={clipImage}
            className="w-full max-w-[600px] h-[360px] xl:h-[430px] rounded-[6px] overflow-hidden"
          >
            <img 
              src={stage.image} 
              alt={stage.title}
              className="w-full h-full object-cover transition-all duration-700"
              style={{ filter: isInView ? 'none' : 'brightness(0.95) contrast(0.95)' }}
            />
          </motion.div>
        </motion.div>

      </div>

      {/* ────────────────────────────────────────────────────────
          MOBILE/TABLET LAYOUT
      ───────────────────────────────────────────────────────── */}
      <div className="lg:hidden w-full flex flex-col pl-[60px] md:pl-[90px] relative py-8">
        
        {/* Node on left axis */}
        <div className="absolute left-0 top-[40px] -translate-x-1/2 z-30 flex items-center justify-center">
           <motion.div 
            className="rounded-full transition-colors duration-500"
            animate={{ 
              width: isInView ? 18 : 12, 
              height: isInView ? 18 : 12,
              backgroundColor: isInView ? '#0A9B73' : '#CBD5E1',
              boxShadow: isInView ? '0 0 0 4px rgba(10, 155, 115, 0.15)' : '0 0 0 0px rgba(0,0,0,0)'
            }}
          />
        </div>

        {/* We must alternate CONTENT/IMAGE depending on the stage index as requested. */}
        {isEven ? (
          // Stage 02, 04: IMAGE then CONTENT
          <>
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
              variants={clipImageMobile}
              className="w-full h-[260px] md:h-[320px] rounded-[4px] overflow-hidden mb-8"
            >
               <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}>
              <motion.div variants={fadeUp}>
                <h3 className={`font-heading font-bold text-[40px] md:text-[50px] leading-[0.95] tracking-tight mb-4 ${isInView ? 'text-[#0A9B73]' : 'text-[#06152F]'}`}>
                  {stage.title}
                </h3>
                <span className="font-sans text-[#06152F] text-[16px] font-semibold uppercase tracking-[0.08em] block mb-4">
                  {stage.descriptor}
                </span>
              </motion.div>
              <motion.div variants={fadeUpDelayed}>
                <p className="font-sans text-[#475569] text-[16px] leading-[1.6] mb-6">
                  {stage.desc}
                </p>
                <div className="flex flex-wrap gap-x-2 gap-y-2 mb-6">
                  {stage.labels.map(l => (
                    <span key={l} className="text-[#475569] text-[10px] md:text-[11px] font-semibold tracking-wider uppercase border border-[#DDE3DF] bg-white px-2 py-1 rounded">
                      {l}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        ) : (
          // Stage 01, 03, 05: CONTENT then IMAGE
          <>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mb-8">
              <motion.div variants={fadeUp}>
                <h3 className={`font-heading font-bold text-[40px] md:text-[50px] leading-[0.95] tracking-tight mb-4 ${isInView ? 'text-[#0A9B73]' : 'text-[#06152F]'}`}>
                  {stage.title}
                </h3>
                <span className="font-sans text-[#06152F] text-[16px] font-semibold uppercase tracking-[0.08em] block mb-4">
                  {stage.descriptor}
                </span>
              </motion.div>
              <motion.div variants={fadeUpDelayed}>
                <p className="font-sans text-[#475569] text-[16px] leading-[1.6] mb-6">
                  {stage.desc}
                </p>
                <div className="flex flex-wrap gap-x-2 gap-y-2 mb-6">
                  {stage.labels.map(l => (
                    <span key={l} className="text-[#475569] text-[10px] md:text-[11px] font-semibold tracking-wider uppercase border border-[#DDE3DF] bg-white px-2 py-1 rounded">
                      {l}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
              variants={clipImageMobile}
              className="w-full h-[260px] md:h-[320px] rounded-[4px] overflow-hidden"
            >
               <img src={stage.image} alt={stage.title} className="w-full h-full object-cover" />
            </motion.div>
          </>
        )}

      </div>
    </div>
  );
};
