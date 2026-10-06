import React from 'react';
import { useReducedMotion } from 'framer-motion';
import SectionEyebrow from '../ui/SectionEyebrow';

const industries = [
  {
    id: 1,
    num: "01",
    title: "MSMEs & ENTREPRENEURS",
    image: "/images/industries/01-msme.jpg"
  },
  {
    id: 2,
    num: "02",
    title: "MANUFACTURERS",
    image: "/images/industries/02-manufacturing.jpg"
  },
  {
    id: 3,
    num: "03",
    title: "TRADERS & DISTRIBUTORS",
    image: "/images/industries/03-traders.jpg"
  },
  {
    id: 4,
    num: "04",
    title: "SERVICE BUSINESSES",
    image: "/images/industries/04-service.jpg"
  },
  {
    id: 5,
    num: "05",
    title: "REAL ESTATE DEVELOPERS",
    image: "/images/industries/05-realestate.jpg"
  },
  {
    id: 6,
    num: "06",
    title: "INFRASTRUCTURE & CONSTRUCTION",
    image: "/images/industries/06-infrastructure.jpg"
  },
  {
    id: 7,
    num: "07",
    title: "PROFESSIONALS",
    image: "/images/industries/07-professionals.jpg"
  },
  {
    id: 8,
    num: "08",
    title: "CORPORATE ORGANISATIONS",
    image: "/images/industries/08-corporate.jpg"
  },
  {
    id: 9,
    num: "09",
    title: "START-UPS & GROWING ENTERPRISES",
    image: "/images/industries/09-startups.jpg"
  },
  {
    id: 10,
    num: "10",
    title: "INDIVIDUALS & FAMILIES",
    image: "/images/industries/10-individuals.jpg"
  }
];

export default function WhoWeServeSection() {
  const shouldReduceMotion = useReducedMotion();

  const rowOne = industries.slice(0, 5);
  const rowTwo = industries.slice(5, 10);

  // Reusable card component
  const Card = ({ item }) => (
    <div className="group flex-shrink-0 w-[250px] md:w-[280px] lg:w-[320px] h-[340px] md:h-[380px] lg:h-[410px] bg-[#FFFFFF] border border-[#DDE3DF] rounded-[6px] lg:rounded-[8px] flex flex-col overflow-hidden transition-colors duration-400 hover:border-[#0A9B73]">
      <div className="w-full h-[72%] overflow-hidden bg-[#F7F8F6] border-b border-[#DDE3DF]">
        <img 
          src={item.image} 
          alt={item.title.toLowerCase()} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex-1 p-4 lg:p-5 flex flex-col justify-center">
        <span className="font-heading text-[#0A9B73] font-semibold text-[12px] lg:text-[13px] tracking-[0.08em] mb-1">
          {item.num}
        </span>
        <h3 className="font-heading font-semibold text-[#06152F] text-[16px] md:text-[18px] lg:text-[22px] leading-[1.15] uppercase transition-colors duration-400 group-hover:text-[#0A9B73]">
          {item.title}
        </h3>
      </div>
    </div>
  );

  return (
    <section className="bg-[#F7F8F6] w-full font-sans pt-[90px] md:pt-[140px] lg:pt-[160px] pb-[100px] lg:pb-[140px] overflow-x-hidden">
      <style>{`
        .marquee-track {
          --marquee-gap-half: 8px; /* 16px / 2 */
        }
        @media (min-width: 768px) {
          .marquee-track { --marquee-gap-half: 10px; } /* 20px / 2 */
        }
        @media (min-width: 1024px) {
          .marquee-track { --marquee-gap-half: 11px; } /* 22px / 2 */
        }
      `}</style>
      
      {/* 1. SECTION INTRO */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[60px] xl:px-[80px] mb-[70px] lg:mb-[90px]">
        <SectionEyebrow text="WHO WE SERVE" className="mb-6" />
        <h2 className="font-heading font-bold text-[#06152F] text-[42px] md:text-[72px] lg:text-[84px] leading-[1.02] md:leading-[0.98] tracking-tight mb-6 lg:mb-8 max-w-[900px]">
          BUILT AROUND THE <br className="hidden md:block" />
          <span className="text-[#0A9B73]">BUSINESSES</span> WE SERVE.
        </h2>
        <p className="font-sans text-[#475569] text-[16px] md:text-[18px] lg:text-[20px] leading-[1.6] max-w-[680px]">
          Every business operates differently. We understand the financial requirements that come with different industries, stages of growth and business objectives.
        </p>
      </div>

      {/* 2. GALLERY CONTAINER */}
      <div className="w-full relative flex flex-col gap-y-[24px] lg:gap-y-[32px] mb-[100px] lg:mb-[140px]">
        
        {/* ROW 01 - Moves Left to Right */}
        <div className="w-full overflow-hidden flex">
          <div 
            className={`marquee-track flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max ${shouldReduceMotion ? '' : 'animate-marquee-right-slow hover:play-state-paused'}`}
            // Added negative left margin to ensure the animation starts exactly offscreen seamlessly
            style={{ marginLeft: shouldReduceMotion ? '1.5rem' : '0' }}
          >
            {/* Set 1 */}
            <div className="flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max">
              {rowOne.map(item => <Card key={item.id} item={item} />)}
            </div>
            {/* Set 2 (Duplicate for seamless loop) */}
            <div className="flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max" aria-hidden="true">
              {rowOne.map(item => <Card key={`dup-${item.id}`} item={item} />)}
            </div>
          </div>
        </div>

        {/* ROW 02 - Moves Right to Left */}
        <div className="w-full overflow-hidden flex">
          <div 
            className={`marquee-track flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max ${shouldReduceMotion ? '' : 'animate-marquee-left-fast hover:play-state-paused'}`}
            style={{ marginLeft: shouldReduceMotion ? '1.5rem' : '0' }}
          >
            {/* Set 1 */}
            <div className="flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max">
              {rowTwo.map(item => <Card key={item.id} item={item} />)}
            </div>
            {/* Set 2 (Duplicate for seamless loop) */}
            <div className="flex gap-[16px] md:gap-[20px] lg:gap-[22px] w-max" aria-hidden="true">
              {rowTwo.map(item => <Card key={`dup-${item.id}`} item={item} />)}
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
