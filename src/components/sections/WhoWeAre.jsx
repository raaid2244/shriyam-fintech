import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import whoWeAreImg from '../../assets/who-we-are.jpg';
import SectionEyebrow from '../ui/SectionEyebrow';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

const lineRevealVariants = {
  hidden: { scaleY: 0, transformOrigin: "top" },
  visible: { 
    scaleY: 1, 
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
  }
};

const imageRevealVariants = {
  hidden: { clipPath: 'inset(0 0 0 100%)' },
  visible: { 
    clipPath: 'inset(0 0 0 0%)',
    transition: { duration: 1.2, ease: "easeOut" }
  }
};

export default function WhoWeAre() {
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10px", "10px"]);

  return (
    <section 
      ref={sectionRef} 
      className="w-full bg-[#F7F8F6] py-[120px] md:py-[160px] relative overflow-hidden"
    >
      <motion.div 
        className="max-w-[1280px] mx-auto px-6 lg:px-8 w-full flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Split Screen Layout */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start gap-[40px] md:gap-[60px] xl:gap-[100px]">
          
          {/* LEFT CONTENT (45%) */}
          <div className="w-full md:w-[calc(45%-30px)] xl:w-[calc(45%-50px)] flex flex-col pt-4 md:pt-12 shrink-0">
            
            <SectionEyebrow text="Who We Are" asMotion={true} variants={fadeUpVariants} className="mb-8" />

            <motion.div className="mb-10 flex flex-col gap-1">
              {/* Line by line reveal */}
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={fadeUpVariants} className="text-[#06152F] font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] xl:text-[58px] leading-[1] md:leading-[0.95]">
                  A BROADER
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={fadeUpVariants} className="text-[#06152F] font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] xl:text-[58px] leading-[1] md:leading-[0.95]">
                  VIEW OF
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={fadeUpVariants} className="text-[#0A9B73] font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] xl:text-[58px] leading-[1] md:leading-[0.95]">
                  FINANCIAL
                </motion.h2>
              </div>
              <div className="overflow-hidden pb-2">
                <motion.h2 variants={fadeUpVariants} className="text-[#0A9B73] font-heading font-bold text-[36px] md:text-[44px] lg:text-[48px] xl:text-[58px] leading-[1] md:leading-[0.95]">
                  NEEDS.
                </motion.h2>
              </div>
            </motion.div>

            <motion.p 
              variants={fadeUpVariants} 
              className="text-[#475569] font-sans text-[17px] md:text-[19px] leading-[1.6] max-w-[560px] mb-6"
            >
              Shriyam Fintech Pvt Ltd is a Chennai-based financial solutions company helping businesses, entrepreneurs, professionals and individuals access suitable financial and risk-management solutions.
            </motion.p>

            <motion.p 
              variants={fadeUpVariants} 
              className="text-[#475569] font-sans text-[16px] md:text-[18px] leading-[1.6] max-w-[560px] mb-12"
            >
              We bring together corporate lending, working capital, trade finance, project funding and insurance advisory under one platform.
            </motion.p>

            <motion.div variants={fadeUpVariants}>
              <Link 
                to="/about"
                className="group inline-flex items-center gap-3 text-[#06152F] hover:text-[#0A9B73] font-semibold text-[13px] md:text-[14px] tracking-[0.08em] uppercase transition-colors duration-300 relative"
              >
                Discover Shriyam
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-3" />
                <div className="absolute left-0 bottom-[-4px] w-full h-[1px] bg-[#06152F]/20 group-hover:bg-[#0A9B73] transition-colors duration-300" />
              </Link>
            </motion.div>

          </div>

          {/* EDITORIAL DIVIDER (Visible on Desktop) */}
          <motion.div 
            variants={lineRevealVariants}
            className="hidden md:block w-[2px] h-[100px] lg:h-[120px] bg-[#0A9B73] mt-[100px] opacity-40 shrink-0"
          />

          {/* RIGHT IMAGE (55%) */}
          <div className="w-full md:w-[calc(55%-30px)] xl:w-[calc(55%-50px)] mt-12 md:mt-0 relative overflow-hidden rounded-[10px]">
            <motion.div variants={imageRevealVariants} className="w-full h-full origin-right">
              <motion.img 
                src={whoWeAreImg} 
                alt="Corporate financial advisory meeting"
                className="w-full h-[450px] md:h-[620px] lg:h-[700px] object-cover rounded-[10px]"
                style={{ y: imageY }}
              />
            </motion.div>
          </div>

        </div>

        {/* BOTTOM BRAND LINE */}
        <motion.div 
          variants={fadeUpVariants}
          className="w-full flex items-center justify-center mt-[100px] md:mt-[140px]"
        >
          <div className="flex-1 h-[1px] bg-[#94A3B8]/20" />
          <span className="px-6 font-mono text-[#94A3B8] text-[11px] md:text-[13px] tracking-[0.12em] uppercase whitespace-nowrap">
            Funding &middot; Protection &middot; Growth &middot; Risk Management
          </span>
          <div className="flex-1 h-[1px] bg-[#94A3B8]/20" />
        </motion.div>

      </motion.div>
    </section>
  );
}
