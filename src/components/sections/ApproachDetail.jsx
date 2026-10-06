import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const approachStages = [
  {
    num: "01",
    category: "UNDERSTAND",
    headline: "UNDERSTANDING\nCOMES FIRST.",
    description: "We begin by understanding the client's financial requirement, business situation, objectives and priorities before considering the appropriate direction.",
    points: ["CLIENT REQUIREMENT", "BUSINESS CONTEXT", "FINANCIAL OBJECTIVES"],
    label: "LISTEN • UNDERSTAND • DEFINE",
    image: "/images/financial-context/understanding.jpg", 
    layout: "image-left",
    bgStart: "#0A9B73",
    bgEnd: "#F7F8F6",
    direction: "left-to-right",
    textInitial: "#FFFFFF",
    textFinal: "#06152F",
    descInitial: "#E2E8F0",
    descFinal: "#475569",
    numInitial: "#FFFFFF",
    numFinal: "#0A9B73"
  },
  {
    num: "02",
    category: "ANALYSE",
    headline: "LOOKING BEYOND\nTHE REQUIREMENT.",
    description: "We analyse the financial position, objectives and relevant considerations to understand the broader context behind the requirement.",
    points: ["FINANCIAL POSITION", "OBJECTIVES", "RELEVANT CONSIDERATIONS"],
    label: "REVIEW • ASSESS • CLARIFY",
    image: "/images/financial-context/cashflow.jpg",
    layout: "content-left",
    bgStart: "#F7F8F6",
    bgEnd: "#0A9B73",
    direction: "right-to-left",
    textInitial: "#06152F",
    textFinal: "#FFFFFF",
    descInitial: "#475569",
    descFinal: "#E2E8F0",
    numInitial: "#0A9B73",
    numFinal: "#FFFFFF"
  },
  {
    num: "03",
    category: "STRUCTURE",
    headline: "BUILDING THE\nRIGHT APPROACH.",
    description: "We structure an appropriate financial approach around the requirement, funding objective and broader business context.",
    points: ["FUNDING OBJECTIVE", "FINANCIAL STRUCTURE", "SUITABLE DIRECTION"],
    label: "PLAN • STRUCTURE • ALIGN",
    image: "/images/financial-context/expanding.jpg",
    layout: "image-left",
    bgStart: "#0A9B73",
    bgEnd: "#F7F8F6",
    direction: "left-to-right",
    textInitial: "#FFFFFF",
    textFinal: "#06152F",
    descInitial: "#E2E8F0",
    descFinal: "#475569",
    numInitial: "#FFFFFF",
    numFinal: "#0A9B73"
  },
  {
    num: "04",
    category: "CONNECT",
    headline: "CONNECTING THE\nREQUIREMENT TO THE\nRIGHT DIRECTION.",
    description: "We connect clients with suitable lending and financial institutions based on the nature of the requirement and the financial approach.",
    points: ["FINANCIAL INSTITUTIONS", "LENDING OPTIONS", "REQUIREMENT ALIGNMENT"],
    label: "CONNECT • COORDINATE • FACILITATE",
    image: "/images/financial-context/project.jpg",
    layout: "content-left",
    bgStart: "#F7F8F6",
    bgEnd: "#0A9B73",
    direction: "right-to-left",
    textInitial: "#06152F",
    textFinal: "#FFFFFF",
    descInitial: "#475569",
    descFinal: "#E2E8F0",
    numInitial: "#0A9B73",
    numFinal: "#FFFFFF"
  },
  {
    num: "05",
    category: "SUPPORT",
    headline: "THE RELATIONSHIP\nCONTINUES.",
    description: "We remain involved through the process, providing professional support, maintaining clarity and building long-term client relationships.",
    points: ["PROCESS SUPPORT", "COORDINATION", "LONG-TERM RELATIONSHIP"],
    label: "SUPPORT • COORDINATE • CONTINUE",
    image: "/images/financial-context/protection.jpg",
    layout: "image-left",
    bgStart: "#0A9B73",
    bgEnd: "#F7F8F6",
    direction: "left-to-right",
    textInitial: "#FFFFFF",
    textFinal: "#06152F",
    descInitial: "#E2E8F0",
    descFinal: "#475569",
    numInitial: "#FFFFFF",
    numFinal: "#0A9B73"
  }
];

const EditorialPanel = ({ stage }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"] 
  });

  const clipPathMap = {
    'left-to-right': ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"],
    'right-to-left': ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]
  };
  
  const bgClipPath = useTransform(scrollYProgress, [0, 1], clipPathMap[stage.direction]);

  const textColor = useTransform(scrollYProgress, [0, 1], [stage.textInitial, stage.textFinal]);
  const descColor = useTransform(scrollYProgress, [0, 1], [stage.descInitial, stage.descFinal]);
  const numColor = useTransform(scrollYProgress, [0, 1], [stage.numInitial, stage.numFinal]);

  const isLeft = stage.layout === 'image-left';
  const imageClip = isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';

  const isSection3 = stage.num === "03";

  const renderContent = (tColor, dColor) => (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-[560px]"
    >
      <motion.h3 
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        className="font-heading font-semibold text-[13px] tracking-[0.16em] uppercase mb-4 md:mb-6"
        style={{ color: tColor }}
      >
        {stage.category}
      </motion.h3>
      
      <motion.h2 
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        className="font-heading font-semibold text-[32px] md:text-[46px] lg:text-[60px] leading-[1.02] mb-6 md:mb-8 whitespace-pre-line"
        style={{ color: tColor }}
      >
        {stage.headline}
      </motion.h2>
      
      <motion.p 
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        className="font-sans text-[16px] md:text-[18px] leading-[1.55] mb-8 md:mb-10"
        style={{ color: dColor }}
      >
        {stage.description}
      </motion.p>
      
      <motion.div 
        variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
        className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3 mb-10 md:mb-12"
      >
        {stage.points.map((point, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="font-heading font-semibold text-[12px] md:text-[13px] tracking-[0.07em]" style={{ color: tColor }}>
              {point}
            </span>
            {idx < stage.points.length - 1 && (
              <span className="hidden sm:inline-block w-1 h-1 rounded-full opacity-50" style={{ backgroundColor: tColor }} />
            )}
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.8 } } }}
        className="border-t border-current opacity-20 pt-5 md:pt-6"
        style={{ color: tColor }}
      >
        <span className="font-heading font-semibold text-[11px] md:text-[12px] tracking-[0.1em] opacity-80" style={{ color: tColor }}>
          {stage.label}
        </span>
      </motion.div>
    </motion.div>
  );

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden">
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: stage.bgStart }} />
      
      {/* REVEAL BACKGROUND */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{ 
          backgroundColor: stage.bgEnd,
          clipPath: bgClipPath
        }} 
      />
      
      {/* CONTENT LAYER */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12 lg:px-[60px] py-[80px] md:py-[100px] lg:py-[120px]">
        
        <div className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-[90px] items-center`}>
          
          {/* IMAGE SIDE */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ clipPath: imageClip }}
              whileInView={{ clipPath: 'inset(0 0 0 0)' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[320px] md:h-[450px] lg:h-[580px] overflow-hidden rounded-[32px]"
            >
              <motion.img 
                src={stage.image} 
                alt={`${stage.category} phase of Shriyam Approach`}
                initial={{ scale: 1.03 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          
          {/* CONTENT SIDE */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center relative">
            <div className="relative z-10 w-full">
              {renderContent(stage.textInitial, stage.descInitial)}
            </div>
            <motion.div 
              className="absolute inset-0 z-20 flex flex-col justify-center pointer-events-none"
              style={{ clipPath: bgClipPath }}
            >
              <div className="w-full">
                {renderContent(stage.textFinal, stage.descFinal)}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
      
    </section>
  );
};

const ApproachDetail = () => {
  return (
    <div className="flex flex-col w-full" aria-label="The Approach in Detail">
      {approachStages.map((stage, idx) => (
        <EditorialPanel key={stage.num} stage={stage} />
      ))}
    </div>
  );
};

export default ApproachDetail;
