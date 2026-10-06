import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionEyebrow from '../ui/SectionEyebrow';

const AboutCTA = () => {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#0A9B73] overflow-hidden flex flex-col justify-center min-h-[85vh]"
      style={{ padding: '120px 7vw' }}
    >
      {/* Subtle Background Word */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none"
        style={{
          fontSize: '25vw',
          color: 'rgba(255,255,255,0.04)',
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}
      >
        CONNECT
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10 flex flex-col justify-center flex-1">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-16 lg:gap-8 w-full">
          
          {/* LEFT COLUMN */}
          <div className="w-full lg:w-[58%] flex flex-col">
            
            <SectionEyebrow 
              text="START A CONVERSATION" 
              color="text-[#06152F]" 
              lineColor="bg-[#06152F]" 
              asMotion={!shouldReduceMotion} 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }} 
              className="mb-8" 
            />

            <motion.h2 
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-heading font-semibold"
              style={{
                fontSize: 'clamp(56px, 7vw, 108px)',
                lineHeight: 1.0,
                letterSpacing: '-0.045em'
              }}
            >
              <span className="text-white">Let's Find the</span><br/><span className="text-[#06152F]">Right Financial</span><br/><span className="text-white">Path </span><span className="text-[#06152F]">Forward.</span>
            </motion.h2>

          </div>

          {/* RIGHT COLUMN */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full lg:w-[42%] flex flex-col lg:pl-8 xl:pl-16"
          >
            <p 
              className="font-sans leading-[1.6] max-w-[500px] mb-10"
              style={{ fontSize: 'clamp(17px, 1.2vw, 20px)', color: 'rgba(255,255,255,0.85)' }}
            >
              Tell us what you are looking to achieve. We'll help you explore the financial solutions relevant to your requirement.
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-center justify-center bg-[#06152F] hover:bg-[#0A2144] text-white font-heading font-semibold rounded-[3px] transition-colors duration-300 w-fit"
              style={{ height: '58px', padding: '0 32px' }}
            >
              Talk to an Expert
              <ArrowRight size={18} className="ml-3 transform group-hover:translate-x-1.5 transition-transform duration-300 text-white" />
            </Link>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6 font-heading text-sm">
              <div className="flex flex-col">
                <span className="text-[#06152F] uppercase tracking-wider mb-1.5 text-[11px] font-semibold">Direct Advisory</span>
                <span className="text-white font-medium text-base">8610389508</span>
              </div>
              
              <div className="hidden sm:block w-[1px] h-8 bg-white/20" />

              <div className="flex flex-col">
                <span className="text-[#06152F] uppercase tracking-wider mb-1.5 text-[11px] font-semibold">Location</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }} className="font-medium text-base">Chennai, Tamil Nadu</span>
              </div>
            </div>

          </motion.div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="w-full mt-24 lg:mt-32 pt-8 relative">
          <div className="absolute top-0 left-0 w-full h-[1px]" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <span className="font-heading font-semibold uppercase text-[11px]" style={{ letterSpacing: '0.18em', color: 'rgba(255,255,255,0.6)' }}>
              SHRIYAM FINTECH PVT LTD
            </span>
            <span className="font-heading font-medium text-sm md:text-base">
              <span className="text-white">Your Financial Growth. </span>
              <span className="text-[#06152F]">Our Strategic Support.</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutCTA;
