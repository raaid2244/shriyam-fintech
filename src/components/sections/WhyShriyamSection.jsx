import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const differentiators = [
  {
    number: "01",
    title: "COMPREHENSIVE\nSOLUTIONS",
    description: "Financial solutions across funding, protection and risk-management requirements."
  },
  {
    number: "02",
    title: "CUSTOMISED\nAPPROACH",
    description: "Solutions shaped around the specific financial requirement, business context and objectives."
  },
  {
    number: "03",
    title: "BUSINESS FUNDING\nFOCUS",
    description: "A strong focus on funding requirements across businesses, projects and growth stages."
  },
  {
    number: "04",
    title: "LONG-TERM\nRELATIONSHIPS",
    description: "Professional support built around clarity, trust and long-term client relationships."
  }
];

export default function WhyShriyamSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#06152F] w-full font-sans pt-[100px] md:pt-[140px] lg:pt-[170px] pb-[110px] md:pb-[150px] lg:pb-[180px] relative overflow-hidden">
      
      {/* OPTIONAL SUBTLE BACKGROUND WORD */}
      <div className="absolute top-[20%] left-[-5%] font-heading font-bold text-[#FFFFFF] opacity-[0.03] text-[120px] md:text-[240px] lg:text-[360px] tracking-tighter select-none pointer-events-none z-0">
        APPROACH
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[60px] xl:px-[80px] relative z-10">
        
        {/* 1. SECTION HEADER */}
        <div className="mb-[80px] lg:mb-[100px] flex flex-col lg:flex-row lg:justify-between items-start lg:items-end gap-10">
          <div className="w-full lg:w-[60%]">
            <SectionEyebrow text="WHY SHRIYAM" className="mb-6" />
            <h2 className="font-heading font-bold text-[#0A9B73] text-[42px] md:text-[64px] lg:text-[76px] xl:text-[92px] leading-[1] md:leading-[0.98] lg:leading-[0.95] tracking-tight uppercase">
              FINANCIAL SOLUTIONS<br />
              WITH A BROADER<br />
              PERSPECTIVE.
            </h2>
          </div>
          <div className="w-full lg:w-[40%] pb-2">
            <p className="font-sans text-[#CBD5E1] text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] max-w-[620px]">
              We bring together financial solutions across funding, protection and risk management, with an approach built around understanding the requirement as a whole.
            </p>
          </div>
        </div>

        {/* HEADER DIVIDER */}
        <div className="w-full h-[1px] bg-[rgba(255,255,255,0.15)] mb-[40px] md:mb-[80px]"></div>

        {/* 2. DIFFERENTIATORS LIST */}
        <div className="flex flex-col">
          {differentiators.map((item, index) => {
            const isLast = index === differentiators.length - 1;

            return (
              <motion.div
                key={item.number}
                initial={shouldReduceMotion ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ margin: "-10% 0px -10% 0px", once: false }}
                className="relative py-[40px] md:py-[60px] lg:py-[80px] border-b border-[rgba(255,255,255,0.14)] last:border-b-0 lg:last:border-b flex flex-col md:flex-row items-start md:items-center group"
              >
                {/* ANIMATED GREEN ACCENT LINE */}
                <motion.div 
                  className="absolute top-0 left-0 h-[2px] bg-[#0A9B73]"
                  variants={{
                    hidden: { width: "0%" },
                    visible: { width: "100%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
                  }}
                />

                {/* NUMBER */}
                <motion.div 
                  className="w-full md:w-[15%] lg:w-[10%] mb-4 md:mb-0"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
                  }}
                >
                  <span className="font-heading font-semibold text-[13px] md:text-[14px] lg:text-[15px] tracking-[0.1em] text-[#94A3B8] transition-colors duration-500 group-hover:text-[#0A9B73]">
                    {item.number}
                  </span>
                </motion.div>

                {/* TITLE */}
                <motion.div 
                  className="w-full md:w-[45%] lg:w-[45%] mb-4 md:mb-0"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 } }
                  }}
                >
                  <h3 className="font-heading font-semibold text-[30px] md:text-[38px] lg:text-[46px] xl:text-[54px] leading-[1] md:leading-[0.98] text-[#FFFFFF] uppercase whitespace-pre-line transition-colors duration-500 group-hover:text-[#0A9B73]">
                    {item.title}
                  </h3>
                </motion.div>

                {/* DESCRIPTION */}
                <motion.div 
                  className="w-full md:w-[40%] lg:w-[45%] flex md:justify-end"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }
                  }}
                >
                  <p className="font-sans text-[15px] md:text-[16px] lg:text-[18px] leading-[1.55] text-[#94A3B8] max-w-[480px] transition-colors duration-500 group-hover:text-[#CBD5E1]">
                    {item.description}
                  </p>
                </motion.div>

              </motion.div>
            );
          })}
        </div>

        {/* 3. SECTION CLOSING */}
        <div className="mt-[80px] lg:mt-[120px] flex justify-end">
          <div className="text-left md:text-right">
            <span className="font-heading font-semibold text-[#FFFFFF] text-[20px] md:text-[24px] lg:text-[26px] tracking-[0.03em] uppercase block">
              YOUR FINANCIAL GROWTH.
            </span>
            <span className="font-heading font-semibold text-[#0A9B73] text-[20px] md:text-[24px] lg:text-[26px] tracking-[0.03em] uppercase block">
              OUR STRATEGIC SUPPORT.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
