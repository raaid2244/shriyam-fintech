import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const IndustriesHero = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative w-full flex flex-col md:flex-row md:min-h-screen overflow-hidden bg-white">

      {/* Mobile-only background image layer (sits behind the content).
          The collage is very wide, so instead of stretching it over the full
          section height (which crops it to a thin sliver), it is shown as a
          top band that fades into white. */}
      <div className="md:hidden absolute inset-0 z-0 w-full h-full bg-white pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-[520px] overflow-hidden">
          <img
            src="/images/industries-hero-collage.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-[72%_center]"
          />
          {/* White wash: soft at top for navbar legibility, image visible mid, fades fully to white */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 22%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.9) 78%, #ffffff 100%)',
            }}
          />
        </div>
      </div>

      {/* Desktop-only background image layer */}
      <div className="hidden md:block absolute inset-0 z-0 w-full h-full bg-white">
        <img
          src="/images/industries-hero-collage.png"
          alt="Shriyam Fintech Industries"
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-[60%] lg:w-[55%]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full md:max-w-[1250px] mx-auto px-5 sm:px-8 lg:px-10 md:h-screen flex flex-col justify-start md:justify-center pt-[150px] pb-14 md:py-0">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-[480px] lg:max-w-[540px] relative overflow-hidden"
        >
          {/* Eyebrow */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3 mb-6 relative z-10"
          >
            <span className="w-10 h-px bg-[#0A9B73]" />
            <span className="text-[#0A9B73] font-semibold text-xs tracking-[0.18em] uppercase">
              Industries
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-[44px] sm:text-[54px] lg:text-[64px] xl:text-[72px] leading-[1.1] font-bold tracking-[-0.03em] text-[#06152F] mb-6 relative z-10 uppercase"
          >
            BUILT AROUND THE<br />
            <span className="text-[#0A9B73]">BUSINESSES</span><br />
            <span className="text-[#0A9B73]">WE SERVE.</span>
          </motion.h1>

          {/* Supporting Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-[#475569] text-[16px] sm:text-[18px] leading-[1.7] max-w-[460px] lg:max-w-[480px] relative z-10 mb-4"
          >
            From MSMEs and manufacturers to professionals, developers,
            corporate organisations and growing enterprises, Shriyam
            understands that financial requirements differ across businesses,
            stages and objectives.
          </motion.p>
          
        </motion.div>
      </div>
    </section>
  );
};

export default IndustriesHero;
