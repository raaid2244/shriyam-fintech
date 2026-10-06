import React, { useRef, useState } from 'react';
import SectionEyebrow from '../../ui/SectionEyebrow';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { capabilities } from './whatWeDoData';
import TimelineTrack from './TimelineTrack';
import ServicePanel from './ServicePanel';

const WhatWeDo = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    let index = 0;
    if (latest >= 0.75)      index = 5;
    else if (latest >= 0.60) index = 4;
    else if (latest >= 0.45) index = 3;
    else if (latest >= 0.30) index = 2;
    else if (latest >= 0.15) index = 1;
    else                     index = 0;
    setActiveIndex(index);
  });

  return (
    <section
      ref={containerRef}
      className="bg-[#F7F8F6] relative w-full"
      style={{ height: '550vh' }}
    >
      {/* ─── Sticky frame ─── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <div className="w-full max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-20 flex flex-col justify-center h-full py-16 sm:py-20">

          {/* TOP — section label + heading */}
          <div className="shrink-0 mb-10 sm:mb-14 flex flex-col items-center text-center">
            <SectionEyebrow text="CORE CAPABILITIES" className="mb-3" center={true} />
            <h2 className="font-heading font-semibold text-[clamp(40px,6vw,80px)] text-[#06152F] tracking-tight uppercase leading-none mb-6">
              WHAT <span className="text-[#0A9B73]">WE DO</span>
            </h2>
            <p className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[1.65] text-[#475569] max-w-[700px]">
              We look beyond individual financial products to understand the requirement as a whole, bringing together the right funding, protection and risk-management solutions under one relationship.
            </p>
          </div>

          {/* MIDDLE — timeline track */}
          <div className="shrink-0 mb-8 sm:mb-10">
            <TimelineTrack
              scrollProgress={scrollYProgress}
              activeIndex={activeIndex}
            />
          </div>

          {/* BOTTOM — active service panel + footer label */}
          <div className="flex flex-col gap-12 lg:gap-16">
            <ServicePanel activeIndex={activeIndex} />

            {/* REQUIREMENT → GROWTH */}
            <div className="flex justify-end mt-4">
              <span className="font-heading font-medium text-[11px] sm:text-[13px] tracking-[0.22em] text-[#94A3B8] uppercase">
                REQUIREMENT&nbsp;&nbsp;→&nbsp;&nbsp;GROWTH
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
