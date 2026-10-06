import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValueEvent, useMotionValue } from 'framer-motion';
import heroVideo from '../../assets/hero-video.mp4';
import SplitText from '../ui/SplitText';

export default function Hero() {
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // We set a tall container to allow scrolling
  // The sticky inner div will stay on screen while scrollYProgress goes from 0 to 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // "Empowering Your Financial Future" text: fades in with scroll (0.85 -> 0.95),
  // then stays fully visible - it never fades out again while scrolling.
  const overlayOpacity = useMotionValue(0);
  const overlayRevealed = useRef(false);

  // Control playback based on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Text reveal (latched once complete)
    if (overlayRevealed.current) {
      if (latest < 0.15) {
        // Back at the very top (big title visible again) - reset for next reveal
        overlayRevealed.current = false;
        overlayOpacity.set(0);
      } else {
        overlayOpacity.set(1);
      }
    } else {
      const o = Math.min(1, Math.max(0, (latest - 0.85) / 0.1));
      overlayOpacity.set(o);
      if (o >= 1) overlayRevealed.current = true;
    }

    // Start playing as soon as the pillars have fully turned Navy (0.4)
    if (latest >= 0.4) {
      videoRefs.current.forEach(vid => {
        if (vid && vid.paused) {
          vid.play().catch(() => {});
        }
      });
    } else if (latest < 0.2) {
      // Reset video if user scrolls back to the top
      videoRefs.current.forEach(vid => {
        if (vid) {
          vid.pause();
          vid.currentTime = 0;
        }
      });
    }
  });

  // 1. Text Animation Transforms
  const textScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);

  // 2. Heights for the 7 columns (forming an arch) -> expands to 100%
  const h0 = useTransform(scrollYProgress, [0, 0.4], [35, 100]);
  const h1 = useTransform(scrollYProgress, [0, 0.4], [55, 100]);
  const h2 = useTransform(scrollYProgress, [0, 0.4], [75, 100]);
  const h3 = useTransform(scrollYProgress, [0, 0.4], [90, 100]);
  const heights = [h0, h1, h2, h3, h2, h1, h0];

  // 3. Horizontal Gap & Border Radius Transforms
  const gap = useTransform(scrollYProgress, [0.4, 0.8], [1.5, 0]); // gap in vw
  const cw = useTransform(gap, g => (100 - 6 * g) / 7); // column width in vw
  const pillRadius = useTransform(scrollYProgress, [0.4, 0.85], [1000, 0]); // rx in px

  // Helper for X coordinates
  const getX = (i) => useTransform(gap, g => {
    const c = (100 - 6 * g) / 7;
    return i * (c + g);
  });

  // Helper for Y coordinates (to keep pills vertically centered)
  const getY = (hTransform) => useTransform(hTransform, h => (100 - h) / 2);

  // 4. Color Transforms
  // Solid cover over each pillar: 100% Green at top -> 100% Navy at 0.4
  const pillarColor = useTransform(scrollYProgress, [0, 0.4], ['rgb(10, 155, 115)', 'rgb(6, 21, 47)']);
  // Cover is removed instantly (no fade) once Navy is reached, revealing the navy-tinted video
  const coverDisplay = useTransform(scrollYProgress, p => (p >= 0.4 ? 'none' : 'block'));

  // Loop only the first 10 seconds: jump all videos back to 0 together
  const LOOP_END = 10;
  const handleTimeUpdate = (e) => {
    if (e.target.currentTime >= LOOP_END) {
      videoRefs.current.forEach(vid => {
        if (vid) vid.currentTime = 0;
      });
    }
  };


  return (
    <div id="home-hero" ref={containerRef} className="relative bg-white" style={{ height: '350vh' }}>
      
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white">
        
        {/* Foreground Typography - Fades out while scrolling */}
        <motion.div
          style={{ 
            scale: textScale, 
            opacity: textOpacity, 
            y: textY,
            display: useTransform(scrollYProgress, p => p > 0.16 ? "none" : "flex")
          }}
          className="absolute z-20 flex-col items-center justify-center w-full pointer-events-none drop-shadow-2xl"
        >
          <SplitText
            text="Shriyam"
            tag="h1"
            className="text-[12vw] font-heading font-semibold tracking-tight text-[#06152F] leading-none select-none shriyam-split"
            delay={50}
            duration={1.2}
            ease="power3.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            triggerOnScroll={false}
          />
          <SplitText
            text="Fintech"
            tag="h2"
            className="text-[9.5vw] font-heading font-medium tracking-normal text-[#06152F] leading-none select-none -mt-2"
            delay={50}
            duration={1.2}
            ease="power3.out"
            from={{ opacity: 0, y: 60 }}
            to={{ opacity: 1, y: 0 }}
            triggerOnScroll={false}
          />
        </motion.div>

        {/* Container for the 7 masked video pills */}
        <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: useMotionTemplate`${getX(i)}vw`,
                top: useMotionTemplate`${getY(heights[i])}vh`,
                width: useMotionTemplate`${cw}vw`,
                height: useMotionTemplate`${heights[i]}vh`,
                borderRadius: useMotionTemplate`${pillRadius}px`,
                backgroundColor: '#06152F', // Navy base (shows behind the video)
                overflow: 'hidden'
              }}
            >
              {/* Video layer - always fully visible (no fade), original colours */}
              <motion.div
                style={{
                  position: 'absolute',
                  width: '100vw',
                  height: '100vh',
                  x: useMotionTemplate`calc(-1 * ${getX(i)}vw)`,
                  y: useMotionTemplate`calc(-1 * ${getY(heights[i])}vh)`,
                  isolation: 'isolate'
                }}
              >
                <motion.video
                  ref={el => videoRefs.current[i] = el}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onTimeUpdate={i === 0 ? handleTimeUpdate : undefined}
                  className="w-full h-full object-contain"
                  style={{ backgroundColor: 'transparent' }}
                  src={heroVideo}
                />
              </motion.div>

              {/* Solid color cover: Green -> Navy while scrolling, then removed instantly */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: pillarColor,
                  display: coverDisplay
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Text Content Overlay (Appears after video expands) */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="max-w-4xl text-center px-4">
            <h3 className="text-white font-heading font-semibold text-[44px] md:text-[56px] lg:text-7xl leading-[1.1] mb-6 drop-shadow-lg">
              Empowering Your <br/><span className="text-yellow-500">Financial Future</span>
            </h3>
            <p className="text-white/90 text-lg md:text-xl font-sans max-w-2xl mx-auto drop-shadow-md">
              Discover unparalleled advisory services engineered for modern markets. We build resilience into your portfolio through strategic foresight.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
