/**
 * ServicePanel
 *
 * Matches the bottom section of the ASCII mockup:
 *
 *         01
 *
 *   CORPORATE LENDING
 *
 *   Business loans, working capital finance,
 *   corporate loans, term loans...
 */
import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { capabilities } from './whatWeDoData';

const ServicePanel = ({ activeIndex }) => {
  const shouldReduceMotion = useReducedMotion();
  const service = capabilities[activeIndex] ?? capabilities[0];

  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={  { opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Active number */}
          <span className="block font-heading font-semibold text-[13px] sm:text-[15px] tracking-[0.25em] text-[#0A9B73] mb-4 sm:mb-6">
            {service.number}
          </span>

          {/* Service title */}
          <h3 className="font-heading font-semibold text-[28px] sm:text-[36px] lg:text-[44px] text-[#06152F] tracking-tight uppercase leading-none mb-6 sm:mb-8 max-w-[640px]">
            {service.title.split(' ').length > 1 ? (
              <>
                {service.title.split(' ')[0]} <span className="text-[#0A9B73]">{service.title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              service.title
            )}
          </h3>

          {/* Description */}
          <p className="font-sans text-[15px] sm:text-[17px] lg:text-[19px] text-[#475569] leading-relaxed max-w-[560px]">
            {service.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ServicePanel;
