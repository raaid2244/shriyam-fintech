import React from 'react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ArrowRight } from 'lucide-react';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  href,
  className,
  withArrow = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-heading font-semibold rounded transition-all duration-300 group";
  
  const variants = {
    primary: "bg-brand-navy text-brand-white hover:bg-brand-green",
    secondary: "bg-brand-white text-brand-navy border border-brand-navy hover:bg-brand-navy hover:text-brand-white",
    outline: "border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-brand-white",
    green: "bg-brand-green text-brand-white hover:bg-brand-navy",
    ghost: "text-brand-navy hover:text-brand-green hover:bg-brand-gray-light/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  );

  const innerContent = (
    <>
      {children}
      {withArrow && (
        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {innerContent}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {innerContent}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {innerContent}
    </button>
  );
};

export default Button;
