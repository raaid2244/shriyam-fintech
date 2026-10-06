import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const steps = ["UNDERSTAND", "ANALYSE", "STRUCTURE", "CONNECT", "SUPPORT"];

const IndustryPerspective = () => {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section className="w-full bg-[#06152F] pt-24 pb-24 lg:pt-40 lg:pb-40 text-white overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[60px]">
        
        {/* Main Statement */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-32 lg:mb-48">
          
          <motion.h2 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={fadeUp}
            className="text-[48px] md:text-[64px] lg:text-[90px] font-bold leading-[0.95] tracking-[-0.03em] w-full lg:w-[60%]"
          >
            THE INDUSTRY<br />
            SHAPES THE<br />
            <span className="relative inline-block">
              <span className="text-white/30">REQUIREMENT.</span>
              <motion.span 
                className="absolute top-0 left-0 text-[#0A9B73]"
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                REQUIREMENT.
              </motion.span>
            </span>
          </motion.h2>

          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } }
            }}
            className="w-full lg:w-[40%] flex flex-col justify-end"
          >
            <p className="text-[16px] lg:text-[18px] text-[rgba(255,255,255,0.7)] leading-[1.6]">
              The financial needs of a manufacturer can differ from those of a real estate developer, professional, trader or growing enterprise. We consider the client's financial requirement, objectives and business context before connecting them with suitable financial institutions or insurance providers.
            </p>
          </motion.div>

        </div>

        {/* Our Approach Section */}
        <div className="flex flex-col w-full">
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] lg:text-[12px] font-semibold tracking-[0.16em] uppercase text-[#0A9B73] mb-12 lg:mb-20"
          >
            OUR APPROACH
          </motion.div>

          {/* Sequence (Desktop Horizontal, Mobile Vertical) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full mb-16 lg:mb-24 gap-6 lg:gap-0">
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-[18px] md:text-[20px] lg:text-[24px] font-semibold tracking-[0.1em] relative"
                >
                  <span className="text-white/30">{step}</span>
                  <motion.span
                    className="absolute top-0 left-0 text-[#0A9B73]"
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {step}
                  </motion.span>
                </motion.div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center flex-1 px-4 lg:px-8">
                    <div className="w-full h-[1px] bg-[rgba(255,255,255,0.15)] relative">
                      {/* Optional subtle animated line or arrow could go here, keeping it extremely restrained with just a rule */}
                    </div>
                    <div className="w-2 h-2 border-t border-r border-[rgba(255,255,255,0.15)] transform rotate-45 -ml-1"></div>
                  </div>
                )}
                
                {/* Mobile Divider */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden w-[1px] h-6 bg-[rgba(255,255,255,0.15)] ml-2" />
                )}
              </React.Fragment>
            ))}
          </div>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:max-w-[800px] border-t border-[rgba(255,255,255,0.15)] pt-8"
          >
            <p className="text-[15px] lg:text-[17px] text-[rgba(255,255,255,0.6)] leading-[1.6]">
              We understand the client's requirement, analyse the financial profile and objectives, structure the requirement appropriately and connect the client with relevant financial institutions or insurance providers.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default IndustryPerspective;
