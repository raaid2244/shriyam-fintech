import React from 'react';

const WhatWeDoIntro = () => {
  return (
    <div className="w-full text-left">
      <span className="block font-heading text-[12px] md:text-[14px] font-semibold tracking-[0.2em] text-[#0A9B73] mb-3 uppercase">
        CORE CAPABILITIES
      </span>
      <h2 className="font-heading font-semibold text-[clamp(48px,6vw,88px)] text-[#06152F] tracking-tight uppercase leading-[1.05] mb-4">
        WHAT WE DO
      </h2>
      <p className="font-sans text-[16px] sm:text-[18px] lg:text-[20px] text-[#475569] leading-relaxed max-w-[600px]">
        We don't simply offer financial products.<br className="hidden sm:inline" />
        {' '}We help structure the right solution around the requirement.
      </p>
    </div>
  );
};

export default WhatWeDoIntro;

