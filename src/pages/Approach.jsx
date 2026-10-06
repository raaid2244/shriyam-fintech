import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import CircularProcess from '../components/sections/CircularProcess';
import ApproachDetail from '../components/sections/ApproachDetail';
import AboutCTA from '../components/about/AboutCTA';

const Approach = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '15%']);

  const reduced = prefersReducedMotion;

  const eyebrowVariants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 } },
  };
  const h1Variants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] } },
  };
  const paraVariants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] } },
  };
  const imageVariants = {
    hidden: { opacity: 0.85, scale: reduced ? 1 : 1.03 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
  };


  return (
    <div className="bg-white">
      {/* ── Premium Cinematic Corporate Hero ─────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col justify-center min-h-[100svh] md:min-h-[760px] md:h-screen md:max-h-[900px]"
        aria-label="Approach page hero"
      >
        {/* Full Bleed Background Image with Parallax */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          style={{
            position: 'absolute',
            inset: 0,
            y: reduced ? 0 : bgY,
            width: '100%',
            height: '115%', // Extra height for parallax
            zIndex: 0,
          }}
        >
          <img 
            src="/images/financial-context/approach-bg.jpg" 
            alt="Structured architectural background"
            className="w-full h-full object-cover object-[66%_center] md:object-center"
          />
        </motion.div>

        {/* Dark Navy Overlay for Readability (desktop) */}
        <div 
          className="hidden md:block"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(90deg, rgba(6,21,47,0.72) 0%, rgba(6,21,47,0.52) 50%, rgba(6,21,47,0.35) 100%)'
          }}
        />

        {/* Mobile overlay: darker behind the text, lighter at the bottom so the knight shows */}
        <div 
          className="md:hidden"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(180deg, rgba(6,21,47,0.55) 0%, rgba(6,21,47,0.72) 30%, rgba(6,21,47,0.6) 60%, rgba(6,21,47,0.3) 100%)'
          }}
        />

        {/* Hero content */}
        <div
          className="relative z-10 w-full"
          style={{
            maxWidth: '1250px',
            margin: '0 auto',
            padding: '120px 40px 40px 40px',
          }}
        >
          <div style={{ maxWidth: '700px' }}>
            {/* Eyebrow */}
            <motion.div
              variants={eyebrowVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}
            >
              {/* Subtle green accent line */}
              <span
                aria-hidden="true"
                style={{ display: 'block', width: '40px', height: '2px', background: '#0A9B73', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#0A9B73',
                }}
              >
                HOW WE WORK
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              variants={h1Variants}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(44px, 6vw, 84px)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
                color: '#FFFFFF',
                marginBottom: '0',
              }}
            >
              A CLEAR,<br />
              <span style={{ color: '#0A9B73' }}>STRUCTURED</span><br />
              APPROACH.
            </motion.h1>

            {/* Supporting paragraph */}
            <motion.p
              variants={paraVariants}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(16px, 1.5vw, 18px)',
                lineHeight: 1.6,
                color: '#E2E8F0',
                maxWidth: '620px',
                marginTop: '32px',
                marginBottom: '60px'
              }}
            >
              A systematic and transparent process designed to understand each requirement, structure the right approach and connect clients with suitable financial solutions.
            </motion.p>


          </div>
        </div>


      </section>

      {/* ── Circular Process Section ──────────────────────── */}
      <CircularProcess />

      <ApproachDetail />

      <AboutCTA />
    </div>
  );
};

export default Approach;
