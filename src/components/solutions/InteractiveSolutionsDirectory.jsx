import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const solutionsData = [
  {
    title: "Corporate & Business Loans",
    rightTitle: "CORPORATE & BUSINESS\nLOANS",
    description: "Funding solutions designed around business requirements, working capital needs and growth objectives.",
    services: [
      "Business Loans", "Working Capital Finance",
      "Corporate Loans", "Term Loans",
      "SME Funding", "Unsecured Business Finance",
      "Structured Finance Solutions"
    ]
  },
  {
    title: "Loan Against Property & Secured Funding",
    rightTitle: "LOAN AGAINST PROPERTY\n& SECURED FUNDING",
    description: "Property-backed and secured funding solutions supporting business expansion, refinancing and additional financial flexibility.",
    services: [
      "Loan Against Property (LAP)",
      "Mortgage-based Funding",
      "Business Expansion Funding",
      "Debt Restructuring / Refinancing",
      "Property-backed Business Funding"
    ]
  },
  {
    title: "Trade Finance & Working Capital",
    rightTitle: "TRADE FINANCE &\nWORKING CAPITAL",
    description: "Solutions supporting working capital, trade activity, receivables and day-to-day business cash-flow requirements.",
    services: [
      "Working Capital Funding",
      "Trade Finance",
      "Invoice / Receivables Funding",
      "Business Cash Flow Solutions"
    ]
  },
  {
    title: "Project & Real Estate Funding",
    rightTitle: "PROJECT & REAL ESTATE\nFUNDING",
    description: "Structured financing solutions supporting projects, construction, real estate and infrastructure requirements.",
    services: [
      "Project Finance",
      "Construction Finance",
      "Real Estate Funding",
      "Structured Project Funding",
      "Infrastructure-related Funding"
    ]
  },
  {
    title: "Government & Institutional Finance",
    rightTitle: "GOVERNMENT &\nINSTITUTIONAL FINANCE",
    description: "Assistance in identifying suitable government-backed and institutional financing opportunities for eligible businesses, MSMEs and entrepreneurs.",
    services: [
      "Government-backed Financing",
      "Institutional Financing",
      "MSME Financing Opportunities",
      "Entrepreneur Financing Opportunities"
    ]
  },
  {
    title: "Insurance & Risk Management",
    rightTitle: "INSURANCE &\nRISK MANAGEMENT",
    description: "Comprehensive insurance and risk-management solutions designed around people, assets, businesses and their exposure.",
    services: [
      "Life Insurance",
      "Health Insurance",
      "General & Commercial Insurance",
      "Business Protection",
      "Risk Management"
    ]
  }
];

const InteractiveSolutionsDirectory = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let nextIndex = Math.floor(latest * solutionsData.length);
    if (nextIndex >= solutionsData.length) nextIndex = solutionsData.length - 1;
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex !== activeIndex) {
      setActiveIndex(nextIndex);
    }
  });

  return (
    <section className="bg-[#F7F8F6] pt-[100px] lg:pt-[140px] pb-[140px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[8vw]">
        
        {/* Section Intro */}
        <div className="mb-[80px] lg:mb-[100px]">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[1px] bg-[#0A9B73]"></span>
            <span className="text-[#0A9B73] uppercase tracking-[0.16em] text-[13px] font-semibold">
              What We Provide
            </span>
          </div>
          
          <h2 className="text-[42px] md:text-[60px] lg:text-[72px] font-semibold text-[#06152F] leading-[0.98] mb-8 font-heading">
            One relationship.<br/>
            <span className="text-[#0A9B73]">Multiple financial solutions.</span>
          </h2>
          
          <p className="max-w-[600px] text-[18px] leading-[1.6] text-[#475569] font-sans">
            We bring together funding, financing and insurance solutions to help 
            businesses, entrepreneurs, professionals and individuals address 
            different financial requirements through one relationship.
          </p>
        </div>

        {/* Desktop Layout (Sticky Scroll) */}
        <div className="hidden md:block relative w-full h-[500vh]" ref={containerRef}>
          <div className="sticky top-[15vh] w-full flex items-start gap-[60px] lg:gap-[90px] h-[75vh]">
            
            {/* Left Navigation (42%) */}
            <div className="w-[42%] flex flex-col gap-[28px] lg:gap-[40px] py-4">
              {solutionsData.map((solution, i) => {
                const isActive = activeIndex === i;
                return (
                  <div key={i} className="relative flex items-center h-[34px] lg:h-[40px]">
                    {/* Active Vertical Accent */}
                    <div 
                      className={`absolute -left-[24px] w-[2px] h-full bg-[#0A9B73] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                    />
                    
                    <div className="relative w-full">
                      <div className={`transition-all duration-[450ms] ${isActive ? 'text-[28px] lg:text-[32px] font-semibold' : 'text-[22px] lg:text-[26px] font-medium'}`}>
                        {/* Base Text */}
                        <div className={`transition-colors duration-300 ${isActive ? 'text-[#06152F]' : 'text-[#94A3B8]'}`}>
                          {solution.title}
                        </div>
                        {/* Green Reveal Overlay */}
                        <div 
                          className="absolute top-0 left-0 text-[#0A9B73] whitespace-nowrap overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{ clipPath: isActive ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
                        >
                          {solution.title}
                        </div>
                      </div>
                    </div>

                    {/* Active Horizontal Line */}
                    <div className="absolute -bottom-[14px] lg:-bottom-[20px] left-0 w-full h-[1px]">
                      <div className="w-full h-full bg-transparent border-b border-dashed border-[#CBD5E1]" />
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#0A9B73] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{ width: isActive ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Content Panel (58%) */}
            <div className="w-[58%] relative h-full pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-0 left-0 w-full"
                >
                  <div className="text-[#0A9B73] uppercase tracking-[0.16em] text-[11px] font-semibold mb-5">
                    Financial Solution
                  </div>
                  
                  <h3 className="text-[46px] lg:text-[58px] font-semibold text-[#06152F] leading-[1.05] mb-8 font-heading whitespace-pre-line">
                    {solutionsData[activeIndex].rightTitle}
                  </h3>
                  
                  <p className="text-[18px] leading-[1.65] text-[#475569] max-w-[600px] mb-12 font-sans">
                    {solutionsData[activeIndex].description}
                  </p>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-4">
                    {solutionsData[activeIndex].services.map((svc, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="w-3 h-[1px] bg-[#0A9B73] opacity-60 flex-shrink-0"></span>
                        <span className="text-[#475569] font-medium text-[15px]">{svc}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicator */}
            <div className="absolute right-0 top-[20%] flex flex-col items-center gap-3 h-[60%]">
              {solutionsData.map((_, i) => (
                <React.Fragment key={i}>
                  <div 
                    className={`w-[6px] h-[6px] rounded-full transition-colors duration-300 ${activeIndex === i ? 'bg-[#0A9B73]' : 'bg-[#CBD5E1]'}`}
                  />
                  {i < solutionsData.length - 1 && (
                    <div className="w-[1px] h-full bg-[#CBD5E1]/40 my-1" />
                  )}
                </React.Fragment>
              ))}
            </div>

          </div>
        </div>

        {/* Mobile Layout (Accordion) */}
        <div className="md:hidden flex flex-col w-full">
          {solutionsData.map((solution, i) => {
            const isActive = mobileActiveIndex === i;
            return (
              <div key={i} className="border-b border-[#CBD5E1]">
                <button 
                  onClick={() => setMobileActiveIndex(isActive ? -1 : i)}
                  className="w-full text-left py-6 flex items-center justify-between"
                  aria-expanded={isActive}
                >
                  <span className={`text-[20px] font-semibold transition-colors duration-300 ${isActive ? 'text-[#06152F]' : 'text-[#94A3B8]'}`}>
                    {solution.title}
                  </span>
                  <div className={`w-[2px] h-[16px] bg-[#0A9B73] transition-transform duration-300 ${isActive ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'} relative`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[16px] h-[2px] bg-[#0A9B73]"></div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2">
                        <div className="text-[#0A9B73] uppercase tracking-[0.16em] text-[11px] font-semibold mb-4">
                          Financial Solution
                        </div>
                        <h3 className="text-[28px] font-semibold text-[#06152F] leading-[1.1] mb-6 font-heading whitespace-pre-line">
                          {solution.rightTitle}
                        </h3>
                        <p className="text-[16px] text-[#475569] leading-[1.65] mb-8 font-sans">
                          {solution.description}
                        </p>
                        
                        <div className="flex flex-col gap-4">
                          {solution.services.map((svc, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <span className="w-3 h-[1px] bg-[#0A9B73] opacity-60 flex-shrink-0 mt-2"></span>
                              <span className="text-[#475569] font-medium text-[15px]">{svc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default InteractiveSolutionsDirectory;
