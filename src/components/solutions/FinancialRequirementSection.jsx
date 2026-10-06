import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion';
import { Coins, Shield, TrendingUp, Target } from 'lucide-react';

const nodesData = [
  { 
    num: '01', 
    title: 'FUNDING', 
    desc: 'Capital & liquidity', 
    body: 'Access the right capital to fuel operations, seize opportunities and build long-term stability.', 
    icon: Coins, 
    side: 'right' 
  },
  { 
    num: '02', 
    title: 'PROTECTION', 
    desc: 'Insurance & safeguards', 
    body: 'Mitigate uncertainties with the right protection across people, assets and operations.', 
    icon: Shield, 
    side: 'left' 
  },
  { 
    num: '03', 
    title: 'GROWTH', 
    desc: 'Expansion & planning', 
    body: "Build for what's next with structured financial planning and strategic support.", 
    icon: TrendingUp, 
    side: 'right' 
  },
  { 
    num: '04', 
    title: 'RISK', 
    desc: 'Exposure & continuity', 
    body: 'Identify, assess and manage risks to ensure long-term resilience and business continuity.', 
    icon: Target, 
    side: 'left' 
  }
];

const ContentBlock = ({ data, x, y, isMobileLayout, width }) => {
  const isRightSide = !isMobileLayout && data.side === 'right';
  const isLeftSide = !isMobileLayout && data.side === 'left';
  const alignLeft = isRightSide || isMobileLayout;

  const gap = width < 768 ? 24 : 48;
  const leftPos = alignLeft ? (x + gap) : undefined;
  const rightPos = isLeftSide ? (width - x) + gap : undefined;
  const maxW = isMobileLayout ? width - (x + gap + 24) : 420;

  return (
    <div 
      className="absolute flex flex-col z-10 pointer-events-none"
      style={{ 
        top: y,
        left: leftPos,
        right: rightPos,
        width: maxW,
        transform: 'translateY(-50%)',
        alignItems: alignLeft ? 'flex-start' : 'flex-end',
        textAlign: alignLeft ? 'left' : 'right'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col w-full pointer-events-auto"
      >
        <div className={`flex items-center gap-3 mb-3 ${alignLeft ? 'justify-start' : 'justify-end'}`}>
           {!alignLeft && <div className="w-[30px] h-[2px] bg-[#0A9B73]" />}
           <span className="text-[13px] md:text-[14px] font-bold text-[#06152F] tracking-[0.1em]">{data.num}</span>
           {alignLeft && <div className="w-[30px] h-[2px] bg-[#0A9B73]" />}
        </div>
        
        <h3 className="text-[26px] md:text-[32px] font-heading font-bold text-[#06152F] mb-1 leading-tight tracking-tight">
          {data.title}
        </h3>
        
        <div className="text-[15px] md:text-[17px] font-medium text-[#0A9B73] mb-4">
          {data.desc}
        </div>
        
        <p className="text-[14px] md:text-[16px] leading-[1.65] text-[#64748B]">
          {data.body}
        </p>
      </motion.div>
    </div>
  );
};

export default function FinancialRequirementSection() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setSize({ 
          width: entry.contentRect.width, 
          height: entry.contentRect.height 
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 25,
    restDelta: 0.001
  });

  const drawProgress = useTransform(smoothProgress, [0, 1], [0.02, 1.05]);
  const pathLength = shouldReduceMotion ? 1 : drawProgress;

  const { width, height } = size;
  const isReady = width > 0 && height > 0;
  
  // Use mobile layout (all text on right) for both phones and tablets to prevent overflow
  const isMobileLayout = width < 1024;

  let nodeLeftX = 0, nodeRightX = 0, startX = 0;
  
  if (isReady) {
    if (isMobileLayout) {
      nodeLeftX = width < 768 ? 50 : 100;
      nodeRightX = width < 768 ? 130 : 220;
      startX = width < 768 ? 90 : 160;
    } else {
      nodeLeftX = width * 0.32;
      nodeRightX = width * 0.68;
      startX = width * 0.5;
    }
  }

  // Vertical layout calculations
  const headerSpace = isMobileLayout ? 320 : 340;
  const availH = height - headerSpace;
  
  const y0 = headerSpace;
  const y1 = y0 + availH * 0.05;
  const n1Y = y0 + availH * 0.20;
  const y2 = y0 + availH * 0.30;
  const n2Y = y0 + availH * 0.45;
  const y3 = y0 + availH * 0.55;
  const n3Y = y0 + availH * 0.70;
  const y4 = y0 + availH * 0.80;
  const n4Y = y0 + availH * 0.90;
  const y5 = y0 + availH * 0.95;
  const yEnd = height;

  const curve = (x1, py1, x2, py2) => {
    const cy = py1 + (py2 - py1) / 2;
    return `C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${py2}`;
  };

  const pathD = `
    M ${startX} ${y0}
    L ${startX} ${y1}
    ${curve(startX, y1, nodeRightX, n1Y)}
    L ${nodeRightX} ${y2}
    ${curve(nodeRightX, y2, nodeLeftX, n2Y)}
    L ${nodeLeftX} ${y3}
    ${curve(nodeLeftX, y3, nodeRightX, n3Y)}
    L ${nodeRightX} ${y4}
    ${curve(nodeRightX, y4, nodeLeftX, n4Y)}
    L ${nodeLeftX} ${y5}
    ${curve(nodeLeftX, y5, startX, yEnd)}
  `;

  const nodePositions = [
    { x: nodeRightX, y: n1Y },
    { x: nodeLeftX, y: n2Y },
    { x: nodeRightX, y: n3Y },
    { x: nodeLeftX, y: n4Y }
  ];

  return (
    <section className="bg-[#F7F8F6] relative w-full overflow-hidden">
      <div 
        ref={containerRef} 
        className="relative w-full max-w-[1440px] mx-auto h-[2200px] md:h-[2600px] lg:h-[3000px]"
      >
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-10 md:pt-16 pb-10 text-center z-10 px-4 md:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-[40px] h-[2px] bg-[#0A9B73]" />
            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.22em] uppercase text-[#06152F]">
              FINANCIAL PERSPECTIVE
            </span>
          </div>
          
          <h2 className="font-heading font-bold text-[#06152F] text-[42px] md:text-[56px] lg:text-[72px] leading-[0.95] tracking-[-0.04em] mb-8">
            THE REQUIREMENT<br />
            <span className="text-[#0A9B73]">COMES FIRST.</span>
          </h2>
          
          <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#475569] max-w-[600px] px-2">
            We don't begin with a financial product. We begin by understanding what the business or individual actually needs.
          </p>
        </div>

        {isReady && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-0" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="threadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0A9B73" />
                <stop offset="85%" stopColor="#0A9B73" />
                <stop offset="100%" stopColor="rgba(10,155,115,0)" />
              </linearGradient>
            </defs>
            
            <motion.path
              d={pathD}
              stroke="url(#threadGradient)"
              strokeWidth={isMobileLayout ? 14 : 20}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ pathLength }}
              className="drop-shadow-[0_0_12px_rgba(10,155,115,0.25)]"
            />
          </svg>
        )}

        {isReady && nodesData.map((data, index) => {
          const pos = nodePositions[index];
          return (
            <React.Fragment key={data.num}>
              <div 
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                style={{ left: pos.x, top: pos.y }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false, margin: "-15% 0px -15% 0px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-[48px] h-[48px] md:w-[64px] md:h-[64px] bg-white rounded-full flex items-center justify-center shadow-[0_0_24px_rgba(10,155,115,0.25)] relative"
                >
                  <div className="absolute inset-0 rounded-full border border-[rgba(10,155,115,0.15)]" />
                  <data.icon className="w-5 h-5 md:w-7 md:h-7 text-[#0A9B73]" strokeWidth={2} />
                </motion.div>
              </div>

              <ContentBlock 
                data={data} 
                x={pos.x} 
                y={pos.y} 
                isMobileLayout={isMobileLayout} 
                width={width} 
              />
            </React.Fragment>
          );
        })}

        <div className="absolute bottom-10 left-6 md:left-12 flex flex-col gap-3 z-10 pointer-events-none">
          <div className="w-[30px] h-[2px] bg-[#0A9B73]" />
          <div className="text-[11px] font-semibold tracking-[0.15em] text-[#06152F] leading-[1.6]">
            A MORE COMPLETE<br />
            FINANCIAL JOURNEY.
          </div>
        </div>

        <div className="absolute bottom-10 right-6 md:right-12 flex flex-col gap-3 items-end text-right z-10 pointer-events-none">
          <div className="w-[30px] h-[1px] bg-[#64748B] opacity-50" />
          <div className="text-[11px] font-semibold tracking-[0.15em] text-[#64748B]">
            SHRIYAM FINTECH
          </div>
        </div>

      </div>
    </section>
  );
}
