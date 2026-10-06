import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

/**
 * 3D Adaptive Navigation Pill
 * Smart navigation with scroll detection and hover expansion
 */
export const PillBase = () => {
  const location = useLocation();
  
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Solutions', path: '/solutions' },
    { label: 'Industries', path: '/industries' },
    { label: 'Approach', path: '/approach' },
    { label: 'Leadership', path: '/leadership' },
    { label: 'Contact', path: '/contact' },
  ];

  const currentPath = location.pathname;
  
  const getActiveItemPath = () => {
    if (currentPath === '/') return '/';
    // Match the longest path that currentPath starts with (excluding root)
    const matches = navItems.filter(item => item.path !== '/' && currentPath.startsWith(item.path));
    if (matches.length > 0) {
      return matches.sort((a, b) => b.path.length - a.path.length)[0].path;
    }
    return '/';
  };

  const activeSectionPath = getActiveItemPath();


  const containerRef = useRef(null);

  const expandedWidth = 720;

  const activeItem = navItems.find(item => item.path === activeSectionPath) || navItems[0];

  return (
    <motion.nav
      className="relative rounded-full mx-auto"
      style={{
        width: expandedWidth,
        height: '56px',
        background: `
          linear-gradient(135deg, 
            #fcfcfd 0%, 
            #f8f8fa 15%, 
            #f3f4f6 30%, 
            #eeeff2 45%, 
            #e9eaed 60%, 
            #e4e5e8 75%, 
            #dee0e3 90%, 
            #e2e3e6 100%
          )
        `,
        boxShadow: `
            0 2px 4px rgba(0, 0, 0, 0.08),
            0 6px 12px rgba(0, 0, 0, 0.12),
            0 12px 24px rgba(0, 0, 0, 0.14),
            0 24px 48px rgba(0, 0, 0, 0.10),
            inset 0 2px 2px rgba(255, 255, 255, 0.8),
            inset 0 -3px 8px rgba(0, 0, 0, 0.12),
            inset 3px 3px 8px rgba(0, 0, 0, 0.10),
            inset -3px 3px 8px rgba(0, 0, 0, 0.09),
            inset 0 -1px 2px rgba(0, 0, 0, 0.08)
          `,
        overflow: 'hidden',
        transition: 'box-shadow 0.3s ease-out',
      }}
    >
      {/* Primary top edge ridge - ultra bright */}
      <div 
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: '2px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 5%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 1) 85%, rgba(255, 255, 255, 0.95) 95%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(0.3px)',
        }}
      />
      
      {/* Top hemisphere light catch */}
      <div 
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: '55%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.25) 30%, rgba(255, 255, 255, 0.10) 60%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
      
      {/* Directional light - top left */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.20) 20%, rgba(255, 255, 255, 0.08) 40%, rgba(255, 255, 255, 0) 65%)',
        }}
      />
      
      {/* Premium gloss reflection - main */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          left: '18%',
          top: '16%',
          width: '140px',
          height: '14px',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.70) 0%, rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 0.10) 70%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(4px)',
          transform: 'rotate(-12deg)',
          transition: 'all 0.3s ease',
        }}
      />
      
      {/* Secondary gloss accent - only show when expanded */}
      <div 
        className="absolute rounded-full pointer-events-none"
        style={{
          right: '22%',
          top: '20%',
          width: '80px',
          height: '10px',
          background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.15) 60%, rgba(255, 255, 255, 0) 100%)',
          filter: 'blur(3px)',
          transform: 'rotate(8deg)',
        }}
      />
      
      {/* Left edge illumination - only show when expanded */}
      <div 
        className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
        style={{
          width: '35%',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.20) 0%, rgba(255, 255, 255, 0.10) 40%, rgba(255, 255, 255, 0.03) 70%, rgba(255, 255, 255, 0) 100%)',
        }}
      />
      
      {/* Right edge shadow - only show when expanded */}
      <div 
        className="absolute inset-y-0 right-0 rounded-r-full pointer-events-none"
        style={{
          width: '35%',
          background: 'linear-gradient(270deg, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.05) 40%, rgba(0, 0, 0, 0.02) 70%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
      
      {/* Bottom curvature - deep shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '50%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0) 100%)',
        }}
      />

      {/* Bottom edge contact shadow */}
      <div 
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0) 100%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Inner diffuse glow */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 40px rgba(255, 255, 255, 0.22)',
          opacity: 0.7,
        }}
      />
      
      {/* Micro edge definition */}
      <div 
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.10)',
        }}
      />

      {/* Navigation items container */}
      <div 
        ref={containerRef}
        className="relative z-10 h-full flex items-center justify-center px-4"
        style={{
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <div className="flex items-center justify-evenly w-full">
          {navItems.map((item) => {
            const isActive = item.path === activeSectionPath;
            
            return (
              <div 
                key={item.path} 
                className="relative inline-flex items-center justify-center"
              >
                <Link
                  to={item.path}
                  className={`
                    inline-flex items-center justify-center
                    text-[14px] font-medium whitespace-nowrap
                    transition-all duration-[250ms] ease-in-out
                    ${isActive 
                      ? 'bg-[#0A9B73] text-white font-semibold' 
                      : 'bg-transparent text-[#64748B] hover:bg-[rgba(10,155,115,0.08)] hover:text-[#06152F]'
                    }
                  `}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                  }}
                >
                  {item.label}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </motion.nav>
  );
};
