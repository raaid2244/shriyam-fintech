import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const editorialBlocks = [
  {
    id: '01',
    category: 'BUSINESS EXPANSION',
    headlineTop: 'WHEN THE BUSINESS',
    headlineGreen: 'IS READY TO MOVE FORWARD.',
    description: 'Expansion often brings new financial requirements — from additional capacity and working capital to investment in new locations, equipment or operations.',
    related: ['EXPANSION CAPITAL', 'CAPACITY REQUIREMENTS', 'ADDITIONAL WORKING CAPITAL'],
    label: 'BUSINESS GROWTH',
    image: '/images/financial-context/expanding.jpg',
    imageAlt: 'Business professionals discussing growth strategy in modern boardroom',
    layout: 'text-left'
  },
  {
    id: '02',
    category: 'MANAGING CASH FLOW',
    headlineTop: 'WHEN OPERATIONS NEED\nGREATER',
    headlineGreen: 'FINANCIAL FLEXIBILITY.',
    description: 'Growing operations can create pressure between receivables, payments and ongoing business commitments. Financial flexibility can become an important part of maintaining continuity.',
    related: ['RECEIVABLES', 'TRADE REQUIREMENTS', 'WORKING CAPITAL'],
    label: 'BUSINESS CONTINUITY',
    image: '/images/financial-context/cashflow.jpg',
    imageAlt: 'Financial analytics dashboard showing cash flow data',
    layout: 'image-left'
  },
  {
    id: '03',
    category: 'PROJECT & BUSINESS GROWTH',
    headlineTop: 'WHEN THE REQUIREMENT BECOMES',
    headlineGreen: 'LARGER THAN THE EVERYDAY.',
    description: 'Major projects and growth initiatives often require funding structured around their scale, timelines and financial objectives.',
    related: ['PROJECT FUNDING', 'CONSTRUCTION', 'STRUCTURED FINANCE'],
    label: 'PROJECT REQUIREMENTS',
    image: '/images/financial-context/project.jpg',
    imageAlt: 'Engineers reviewing blueprints at construction project site',
    layout: 'text-left'
  },
  {
    id: '04',
    category: 'PROTECTING THE BUSINESS',
    headlineTop: 'WHEN GROWTH ALSO BRINGS',
    headlineGreen: 'GREATER EXPOSURE.',
    description: 'As businesses grow, their operational and financial exposure can grow with them. Appropriate protection can help address risks across people, property, liability and digital operations.',
    related: ['LIABILITY', 'PROPERTY', 'CYBER', 'BUSINESS PROTECTION'],
    label: 'RISK EXPOSURE',
    image: '/images/financial-context/protection.jpg',
    imageAlt: 'Team in boardroom discussing strategic risk assessment and insurance coverage',
    layout: 'image-left'
  }
];

/* ─── Parallax Image ─── */
const ParallaxImage = ({ src, alt, revealFrom }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // The outer wrapper clips, the inner wrapper slides in from the correct side
  const initialX = revealFrom === 'right' ? '100%' : '-100%';

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden rounded-[20px] lg:rounded-[28px]">
      <motion.div
        className="w-full h-full"
        initial={{ x: initialX, opacity: 0 }}
        whileInView={{ x: '0%', opacity: 1 }}
        viewport={{ once: false, margin: "-10%" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.img
          src={src}
          alt={alt}
          style={{ y }}
          className="w-full h-full object-cover scale-[1.05]"
          loading="lazy"
        />
      </motion.div>
    </div>
  );
};

/* ─── Text Content Block ─── */
const TextContent = ({ block, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const baseDelay = 0;
  const stagger = 0.08;

  const fadeUp = (i) => ({
    initial: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 25 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: false, margin: "-12%" },
    transition: { duration: 0.6, delay: baseDelay + i * stagger, ease: [0.22, 1, 0.36, 1] }
  });

  return (
    <div className="flex flex-col justify-center h-full py-12 lg:py-0">

      {/* Number + green accent line */}
      <motion.div {...fadeUp(0)} className="flex items-center gap-4 mb-6">
        <span className="text-[16px] lg:text-[18px] font-semibold text-[#0A9B73] tabular-nums font-sans">
          {block.id}
        </span>
        <motion.span
          className="h-[2px] bg-[#0A9B73]"
          initial={{ width: 0 }}
          whileInView={{ width: 56 }}
          viewport={{ once: false, margin: "-12%" }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* Category */}
      <motion.div {...fadeUp(1)}
        className="text-[12px] lg:text-[14px] font-semibold tracking-[0.14em] uppercase text-[#475569] mb-6 lg:mb-8 font-sans"
      >
        {block.category}
      </motion.div>

      {/* Headline */}
      <motion.h3 {...fadeUp(2)}
        className="text-[32px] md:text-[38px] lg:text-[42px] xl:text-[50px] font-semibold text-[#06152F] leading-[1.04] tracking-[-0.02em] mb-8 lg:mb-10 font-heading whitespace-pre-line"
      >
        {block.headlineTop}{block.headlineTop.endsWith('\n') ? '' : '\n'}
        <span className="text-[#0A9B73]">{block.headlineGreen}</span>
      </motion.h3>

      {/* Description */}
      <motion.p {...fadeUp(3)}
        className="text-[16px] lg:text-[18px] text-[#475569] leading-[1.7] font-sans mb-10 lg:mb-12 max-w-[480px]"
      >
        {block.description}
      </motion.p>

      {/* Related content */}
      <motion.div {...fadeUp(4)}
        className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-6"
      >
        {block.related.map((item, idx) => (
          <span key={idx} className="flex items-center gap-2">
            {idx > 0 && (
              <span className="w-[4px] h-[4px] rounded-full bg-[#0A9B73] flex-shrink-0" />
            )}
            <span className="text-[12px] lg:text-[13px] font-semibold tracking-[0.08em] text-[#475569] font-sans uppercase">
              {item}
            </span>
          </span>
        ))}
      </motion.div>

      {/* Small label */}
      <motion.div {...fadeUp(5)}
        className="text-[11px] lg:text-[12px] font-semibold tracking-[0.16em] text-[#94A3B8] uppercase font-sans"
      >
        {block.label}
      </motion.div>

    </div>
  );
};

/* ─── Editorial Block ─── */
const EditorialBlock = ({ block, index }) => {
  const isTextLeft = block.layout === 'text-left';
  const revealFrom = isTextLeft ? 'right' : 'left';

  return (
    <div className="w-full">
      {/* Divider */}
      {index > 0 && (
        <div className="w-full h-[1px] bg-[#CBD5E1] my-0" />
      )}

      <div className="py-[60px] lg:py-[90px] xl:py-[100px]">

        {/* Desktop: side-by-side */}
        <div className="hidden md:flex items-stretch gap-12 lg:gap-16 xl:gap-20">
          {isTextLeft ? (
            <>
              <div className="w-[42%] xl:w-[43%] flex items-center">
                <TextContent block={block} index={index} />
              </div>
              <div className="w-[58%] xl:w-[57%] h-[550px] lg:h-[620px] xl:h-[680px]">
                <ParallaxImage src={block.image} alt={block.imageAlt} revealFrom={revealFrom} />
              </div>
            </>
          ) : (
            <>
              <div className="w-[58%] xl:w-[57%] h-[550px] lg:h-[620px] xl:h-[680px]">
                <ParallaxImage src={block.image} alt={block.imageAlt} revealFrom={revealFrom} />
              </div>
              <div className="w-[42%] xl:w-[43%] flex items-center">
                <TextContent block={block} index={index} />
              </div>
            </>
          )}
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col">

          {/* Number + Category */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[15px] font-semibold text-[#0A9B73] tabular-nums font-sans">
                {block.id}
              </span>
              <span className="w-10 h-[2px] bg-[#0A9B73]" />
            </div>
            <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#475569] font-sans">
              {block.category}
            </div>
          </div>

          {/* Image */}
          <div className="w-full h-[320px] sm:h-[380px] mb-8 overflow-hidden rounded-[16px]">
            <img
              src={block.image}
              alt={block.imageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Headline */}
          <h3 className="text-[34px] sm:text-[40px] font-semibold text-[#06152F] leading-[1.06] tracking-tight mb-6 font-heading whitespace-pre-line">
            {block.headlineTop}{'\n'}
            <span className="text-[#0A9B73]">{block.headlineGreen}</span>
          </h3>

          {/* Description */}
          <p className="text-[16px] text-[#475569] leading-[1.7] font-sans mb-8">
            {block.description}
          </p>

          {/* Related content */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mb-4">
            {block.related.map((item, idx) => (
              <span key={idx} className="flex items-center gap-2">
                {idx > 0 && (
                  <span className="w-[3px] h-[3px] rounded-full bg-[#0A9B73] flex-shrink-0" />
                )}
                <span className="text-[11px] font-semibold tracking-[0.08em] text-[#475569] font-sans uppercase">
                  {item}
                </span>
              </span>
            ))}
          </div>

          {/* Small label */}
          <div className="text-[11px] font-semibold tracking-[0.16em] text-[#94A3B8] uppercase font-sans">
            {block.label}
          </div>
        </div>

      </div>
    </div>
  );
};

/* ─── Main Section ─── */
const FinancialContext = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F7F8F6] w-full relative">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[50px] xl:px-[60px]">

        {/* ── Centered Intro ── */}
        <div className="pt-[100px] lg:pt-[160px] pb-[80px] lg:pb-[120px]">
          <div className="max-w-[900px] mx-auto text-center">

            <motion.span
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-[14px] lg:text-[15px] font-semibold tracking-[0.16em] uppercase text-[#0A9B73] mb-8"
            >
              Financial Context
            </motion.span>

            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-[42px] md:text-[56px] lg:text-[64px] xl:text-[76px] font-semibold text-[#06152F] leading-[0.98] lg:leading-[1.02] tracking-[-0.03em] mb-10 font-heading"
            >
              DIFFERENT BUSINESS MOMENTS.<br />
              <span className="text-[#0A9B73]">DIFFERENT FINANCIAL NEEDS.</span>
            </motion.h2>

            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="text-[17px] lg:text-[19px] text-[#475569] leading-[1.65] font-sans max-w-[740px] mx-auto"
            >
              "Every business moves through different stages, situations and objectives. The financial requirement can change with expansion, cash-flow pressure, major projects or the need to protect the business."
            </motion.p>

          </div>
        </div>

        {/* ── Top divider ── */}
        <div className="w-full h-[1px] bg-[#CBD5E1]" />

        {/* ── Editorial Blocks ── */}
        {editorialBlocks.map((block, index) => (
          <EditorialBlock key={block.id} block={block} index={index} />
        ))}

      </div>

      {/* Bottom spacing */}
      <div className="h-[80px] lg:h-[120px]" />

    </section>
  );
};

export default FinancialContext;
