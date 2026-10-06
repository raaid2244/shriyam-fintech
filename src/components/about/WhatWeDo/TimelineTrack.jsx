/**
 * TimelineTrack
 *
 * Exact layout matching the user's ASCII diagram:
 *
 *   01 ───────── 02 ───────── 03 ───────── 04 ───────── 05 ───────── 06
 *   ●            ●            ●            ●            ●            ●
 *
 * Numbers sit ABOVE the horizontal line.
 * Dots sit ON the line.
 * Completed segments fill with emerald.
 */
import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { capabilities } from './whatWeDoData';

const TimelineTrack = ({ scrollProgress, activeIndex }) => {
  // Snap the fill to exactly the position of each node (1/5 increments for 6 nodes)
  const fillScale = useTransform(
    scrollProgress,
    [0, 0.15, 0.30, 0.45, 0.60, 0.75, 1.0],
    [0,  0.2,  0.4,  0.6,  0.8,  1.0,  1.0]
  );

  return (
    <div className="w-full">

      {/* ── Track + dots row ── */}
      <div className="relative w-full h-5 flex items-center mb-12">

        {/* Grey base line */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#D1D9E0]" />

        {/* Emerald fill, origin-left, driven by scroll */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-px bg-[#0A9B73] origin-left"
          style={{ scaleX: fillScale, right: 0 }}
        />

        {/* Dots & Labels — flex justify-between, layered above lines */}
        <div className="relative z-10 flex justify-between w-full">
          {capabilities.map((cap, i) => {
            const isActive    = i === activeIndex;
            const isCompleted = i < activeIndex;
            
            // Determine alignment and positioning for the text label
            const isFirst = i === 0;
            const isLast = i === capabilities.length - 1;
            const alignClass = isFirst ? 'left-0 text-left' 
                             : isLast ? 'right-0 text-right' 
                             : 'left-1/2 -translate-x-1/2 text-center';

            return (
              <div key={cap.number} className="relative flex justify-center w-3 sm:w-3.5">
                
                {/* The Dot */}
                <div
                  className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border-2 transition-all duration-400
                    ${isActive
                      ? 'bg-[#0A9B73] border-[#0A9B73] scale-125'
                      : isCompleted
                        ? 'bg-[#0A9B73] border-[#0A9B73]'
                        : 'bg-[#F7F8F6] border-[#94A3B8]'
                    }`}
                />

                {/* The Text Label (Absolutely positioned below the dot) */}
                <span
                  className={`absolute top-full mt-4 w-[100px] sm:w-[130px] font-heading text-[9px] sm:text-[10px] lg:text-[12px] font-medium tracking-widest uppercase leading-tight transition-all duration-400
                    ${isActive    ? 'text-[#0A9B73] font-semibold opacity-100'
                    : isCompleted ? 'text-[#475569] opacity-0 sm:opacity-100'
                    :               'text-[#94A3B8] opacity-0 sm:opacity-100'}
                    ${alignClass}
                  `}
                >
                  {cap.title}
                </span>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default TimelineTrack;
