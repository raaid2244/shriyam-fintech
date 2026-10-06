import React, { useRef } from 'react';
import SectionEyebrow from '../ui/SectionEyebrow';
import { motion, useInView } from 'framer-motion';
import { approachSteps, approachSummary } from '../../data/aboutData';

const ApproachJourney = () => {
  const lineRef = useRef(null);
  const isInView = useInView(lineRef, { once: true, margin: '-100px' });

  return (
    <section className="bg-[#F6F8FA] py-24 md:py-32 relative overflow-hidden">
      {/* Light grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="approach-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#06152F" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#approach-grid)" />
        </svg>
      </div>

      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-[#0A9B73] font-heading font-semibold text-sm uppercase tracking-widest mb-4">
            METHODOLOGY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-heading font-semibold text-[#06152F] leading-[1.1] tracking-tight">
            Our Approach
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg font-sans mt-5 leading-relaxed">
            A structured, transparent pathway from requirement discovery to institutional execution.
          </p>
        </div>

        {/* M2P-style connected circle icons row */}
        <div className="relative" ref={lineRef}>
          {/* Animated connecting line */}
          <div className="hidden lg:block absolute top-10 left-16 right-16 h-[2px] bg-[#E2E8F0] overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#06152F] via-[#0A9B73] to-[#F47A20]"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {approachSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Circular badge — M2P signature */}
                  <div className="relative w-20 h-20 mb-6">
                    <div className="absolute inset-0 rounded-full bg-white border-2 border-[#E2E8F0] group-hover:border-[#0A9B73] shadow-sm group-hover:shadow-[0_0_24px_rgba(10,155,115,0.2)] transition-all duration-300" />
                    <div className="absolute inset-[6px] rounded-full border border-[#E2E8F0]/60" />
                    <div className="absolute inset-0 flex items-center justify-center text-[#06152F] group-hover:text-[#0A9B73] transition-colors duration-300">
                      <Icon size={24} strokeWidth={1.7} />
                    </div>
                    {/* Dot between circles */}
                    {index < approachSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-[calc(50%+2px)] w-2 h-2 rounded-full bg-[#0A9B73] -translate-y-1/2 z-10" />
                    )}
                  </div>

                  <p className="text-[#F47A20] font-heading text-[10px] font-semibold uppercase tracking-widest mb-1">
                    {step.number}
                  </p>
                  <h3 className="text-[#06152F] font-heading font-semibold text-lg mb-2 group-hover:text-[#0A9B73] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-[#64748B] font-sans text-xs leading-relaxed max-w-[130px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Approach description block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto text-center"
        >
          <p className="text-xl sm:text-2xl font-heading font-medium text-[#06152F] leading-relaxed">
            "{approachSummary}"
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default ApproachJourney;
