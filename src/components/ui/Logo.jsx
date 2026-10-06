import React from 'react';
import logoImage from '../../assets/logo.png';

const Logo = ({ className = "", theme = "light" }) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-brand-white" : "text-brand-navy";
  const swooshColor = isDark ? "text-brand-white" : "text-brand-navy";
  const lineClass = isDark ? "bg-brand-white/30" : "bg-brand-navy/30";

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      {/* Logo Mark */}
      <div className="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
        <img 
          src={logoImage} 
          alt="Shriyam Fintech Logo" 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col justify-center font-heading">
        {/* Shriyam */}
        <div className={`text-[28px] leading-none font-semibold tracking-[-0.015em] flex items-baseline ${textColor}`}>
          Shr<span className="text-yellow-500">i</span>yam
        </div>
        
        {/* Fintech */}
        <div className={`text-[22px] leading-none font-medium tracking-normal mt-1 ${textColor}`}>
          Fintech
        </div>
        
        {/* PVT LTD */}
        <div className="flex items-center justify-between w-full mt-1.5 space-x-1">
          <div className={`h-[1px] flex-grow ${lineClass}`}></div>
          <span className={`text-[8px] font-medium tracking-[0.4em] whitespace-nowrap px-1 ${textColor}`}>
            PVT LTD
          </span>
          <div className={`h-[1px] flex-grow ${lineClass}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
