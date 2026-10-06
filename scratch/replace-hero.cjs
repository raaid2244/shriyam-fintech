const fs = require('fs');
const content = fs.readFileSync('src/pages/Approach.jsx', 'utf8');
const startIdx = 0;
const endIdx = content.indexOf('{/* ── Process Section ──────────────────────────────── */}');
const newHero = `import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ProcessStep from '../components/sections/ProcessStep';
import AboutCTA from '../components/about/AboutCTA';
import { processSteps } from '../data/content';

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
  const processVariants = {
    hidden:  { opacity: 0, y: reduced ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] } },
  };
  const imageVariants = {
    hidden: { opacity: 0.85, scale: reduced ? 1 : 1.03 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 300) setActiveStep(0);
      else if (currentScrollY < 600) setActiveStep(1);
      else if (currentScrollY < 900) setActiveStep(2);
      else if (currentScrollY < 1200) setActiveStep(3);
      else setActiveStep(4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-white">
      {/* ── Premium Cinematic Corporate Hero ─────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col justify-center"
        aria-label="Approach page hero"
        style={{ minHeight: '760px', height: '100vh', maxHeight: '900px' }}
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
            src="/images/industries/08-corporate.jpg" 
            alt="Business professionals in a corporate meeting"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center' }}
          />
        </motion.div>

        {/* Dark Navy Overlay for Readability */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            background: 'linear-gradient(90deg, rgba(6,21,47,0.72) 0%, rgba(6,21,47,0.52) 50%, rgba(6,21,47,0.35) 100%)'
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

            {/* Editorial Process Indicator */}
            <motion.div
              variants={processVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row flex-wrap sm:items-center gap-4 sm:gap-8"
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                letterSpacing: '0.08em',
              }}
            >
              {['UNDERSTAND', 'ANALYSE', 'STRUCTURE', 'CONNECT', 'SUPPORT'].map((step, idx) => (
                <div 
                  key={step} 
                  className="flex items-center transition-colors duration-500"
                  style={{ color: activeStep >= idx ? '#0A9B73' : '#CBD5E1' }}
                >
                  <span>0{idx + 1} {step}</span>
                  {idx < 4 && <span className="hidden sm:inline-block ml-8 text-white/20">─────</span>}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll To Explore */}
        <div 
          className="absolute bottom-10 left-[40px] md:left-[max(40px,calc(50%-625px+40px))] z-10 flex flex-col items-center gap-3"
          style={{ opacity: 0.7 }}
        >
          <span style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: '#CBD5E1'
          }}>
            SCROLL TO EXPLORE
          </span>
          <div style={{ width: '2px', height: '40px', background: '#0A9B73' }} />
        </div>
      </section>

      `;
fs.writeFileSync('src/pages/Approach.jsx', newHero + content.substring(endIdx));
