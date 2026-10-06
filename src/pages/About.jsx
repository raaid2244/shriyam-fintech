import React, { useEffect } from 'react';
import AboutHero from '../components/about/AboutHero';
import BrandStatement from '../components/about/BrandStatement';
import OurStory from '../components/about/OurStory';
import WhatWeDo from '../components/about/WhatWeDo';
import StrategicFocus from '../components/about/StrategicFocus';
import ValueProposition from '../components/about/ValueProposition';
import VisionMissionSection from '../components/about/VisionSection';
import AboutCTA from '../components/about/AboutCTA';

const About = () => {
  useEffect(() => {
    document.title = "About Us | Shriyam Fintech Pvt Ltd - Integrated Financial Solutions";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen text-[#06152F] selection:bg-[#0A9B73] selection:text-white">
      {/* 01 — About Hero */}
      <AboutHero />

      {/* 02 — Brand Statement */}
      <BrandStatement />

      {/* 03 — Our Story */}
      <OurStory />

      {/* 04 — What We Do */}
      <WhatWeDo />

      {/* 05 — Strategic Focus */}
      <StrategicFocus />

      {/* 06 — Value Proposition */}
      <ValueProposition />

      {/* 08 & 09 — Vision & Mission */}
      <VisionMissionSection />

      {/* 13 — Final CTA */}
      <AboutCTA />
    </div>
  );
};

export default About;
