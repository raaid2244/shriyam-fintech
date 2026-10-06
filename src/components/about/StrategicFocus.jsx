import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const strategicFocus = [
  {
    number: "01",
    question: "HOW DO WE FUND IT?",
    title: "FUNDING",
    label: "STRUCTURED CAPITAL",
    description: "We structure funding around the financial needs of businesses, helping connect requirements with suitable lending, working capital and project finance solutions."
  },
  {
    number: "02",
    question: "HOW DO WE PROTECT IT?",
    title: "PROTECTION",
    label: "COMPREHENSIVE SAFEGUARDS",
    description: "We help businesses and individuals identify the right insurance and protection solutions across life, health, general and commercial requirements."
  },
  {
    number: "03",
    question: "HOW DO WE HELP IT GROW?",
    title: "GROWTH",
    label: "STRATEGIC ENABLEMENT",
    description: "We support financial growth through solutions designed around business expansion, financial planning and the changing requirements of growing enterprises."
  },
  {
    number: "04",
    question: "HOW DO WE MANAGE THE RISK?",
    title: "RISK MANAGEMENT",
    label: "ACTIVE MITIGATION",
    description: "We help address financial exposure through appropriate solutions covering liability, cyber, property, business and other risk-management requirements."
  }
];

const FocusItem = ({ item, index }) => {
  const isRight = index % 2 !== 0;
  const containerRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 40%"] 
  });

  // Base layer fades from muted to white during the first 40% of the scroll progress
  const questionBaseColor = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 1)"]
  );

  const numberBaseColor = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["rgba(255, 255, 255, 0.30)", "rgba(255, 255, 255, 1)"]
  );

  // Overlay layer wipes from left to right (clipping right edge from 100% to 0%) during the last 60%
  const greenClipPath = useTransform(
    scrollYProgress,
    [0.4, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest >= 0.98 && !isCompleted) {
        setIsCompleted(true);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, isCompleted]);

  const isCompletedFinal = shouldReduceMotion || isCompleted;

  const dynamicQuestionBaseStyle = isCompletedFinal ? { color: "#FFFFFF" } : { color: questionBaseColor };
  const dynamicNumberBaseStyle = isCompletedFinal ? { color: "#FFFFFF" } : { color: numberBaseColor };
  const dynamicClipPath = isCompletedFinal ? "inset(0 0% 0 0)" : greenClipPath;
  
  const getFontSizeClass = (title) => {
    if (title === "RISK MANAGEMENT") {
      return "text-[55px] md:text-[6vw] lg:text-[88px]";
    }
    if (title === "PROTECTION") {
      return "text-[60px] md:text-[6.5vw] lg:text-[95px]";
    }
    return "text-[70px] md:text-[8vw] lg:text-[110px]";
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col mb-32 lg:mb-48">
      
      {/* Background Typographic Word */}
      <motion.div 
        initial={false}
        animate={isCompletedFinal 
          ? { opacity: 0.1, clipPath: "inset(0 0% 0 0)", visibility: "visible" } 
          : { opacity: 0, clipPath: "inset(0 100% 0 0)", visibility: "hidden" }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { 
          opacity: { duration: 0.7, ease: "easeOut" },
          clipPath: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }}
        className={`absolute top-[40%] -translate-y-1/2 pointer-events-none select-none font-heading uppercase font-semibold tracking-[0.08em] leading-[0.9] text-[#0A9B73] z-0 ${getFontSizeClass(item.title)}
        ${isRight ? 'left-[-4vw] text-left' : 'right-[-4vw] text-right'}
        ${item.title !== "RISK MANAGEMENT" ? "whitespace-nowrap" : ""}`}
      >
        {item.title === "RISK MANAGEMENT" ? (
          <>
            RISK<br />MANAGEMENT
          </>
        ) : (
          item.title
        )}
      </motion.div>

      {/* Content Inner Wrapper */}
      <div className={`w-full lg:w-[45%] relative z-10 ${isRight ? 'lg:ml-auto' : ''}`}>
        
        {/* Dual Layer Header for Horizontal Wipe */}
        <div className="relative mb-8 lg:mb-12">
          {/* BASE LAYER (MUTED -> WHITE) */}
          <div>
            <motion.span 
              style={dynamicNumberBaseStyle}
              className="text-[20px] lg:text-[24px] font-light block mb-4 font-sans"
            >
              {item.number}
            </motion.span>
            <motion.h3 
              style={dynamicQuestionBaseStyle}
              className="text-[32px] md:text-[40px] lg:text-[46px] xl:text-[52px] font-semibold font-heading leading-[1.1] max-w-[500px]"
            >
              {item.question}
            </motion.h3>
          </div>

          {/* OVERLAY LAYER (GREEN WIPE) */}
          <motion.div 
            style={{ clipPath: dynamicClipPath, WebkitClipPath: dynamicClipPath }}
            aria-hidden="true"
            className="absolute top-0 left-0 w-full h-full text-[#0A9B73] pointer-events-none"
          >
            <span className="text-[20px] lg:text-[24px] font-light block mb-4 font-sans">
              {item.number}
            </span>
            <h3 className="text-[32px] md:text-[40px] lg:text-[46px] xl:text-[52px] font-semibold font-heading leading-[1.1] max-w-[500px]">
              {item.question}
            </h3>
          </motion.div>
        </div>
        
        {/* Answer Block */}
        <motion.div
          initial={false}
          animate={isCompletedFinal ? { opacity: 1, y: 0, visibility: "visible" } : { opacity: 0, y: 12, visibility: "hidden" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h4 className="text-[28px] lg:text-[36px] font-semibold text-[#FFFFFF] mb-2 font-heading">
            {item.title}
          </h4>
          <div className="text-[11px] lg:text-[13px] font-medium tracking-[0.14em] text-[#0A9B73] uppercase mb-4">
            {item.label}
          </div>
          <p className="text-[16px] lg:text-[18px] text-[#94A3B8] font-normal leading-[1.6] max-w-[600px]">
            {item.description}
          </p>
        </motion.div>
      </div>

    </div>
  );
};

const StrategicFocus = () => {
  return (
    <section className="bg-[#06152F] py-[100px] lg:py-[180px] px-[5vw] lg:px-[7vw] relative overflow-hidden font-sans">
      
      {/* Giant watermark ? */}
      <div className="absolute top-[5%] right-[-10%] lg:right-[5%] text-[400px] lg:text-[800px] font-light text-white/[0.015] leading-none pointer-events-none select-none font-heading mix-blend-screen">
        ?
      </div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        
        {/* Top Centered Title */}
        <div className="mb-16 lg:mb-24 flex flex-col items-center text-center relative z-10">
          <SectionEyebrow text="FOUNDATIONAL PILLARS" className="mb-6" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-semibold text-[36px] lg:text-[48px] leading-[1.1] font-heading"
          >
            Our Strategic Focus
          </motion.h2>
        </div>

        {/* Hero Text */}
        <div className="mb-24 lg:mb-40 relative">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[36px] md:text-[52px] lg:text-[72px] font-semibold text-white leading-[1.1] max-w-[800px] font-heading relative z-10"
          >
            Every financial requirement<br /><span className="text-[#0A9B73]">starts with a</span> <span className="text-[#0A9B73] italic">question.</span>
          </motion.h3>
        </div>

        {/* Zigzag Content List */}
        <div className="flex flex-col relative w-full pt-10">
          {strategicFocus.map((item, index) => (
            <FocusItem key={item.number} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default StrategicFocus;
