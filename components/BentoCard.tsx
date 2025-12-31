import React, { ReactNode, useRef, useState } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  onClick?: () => void;
  noPadding?: boolean;
  variant?: 'default' | 'glass' | 'solid' | 'light';
  glow?: boolean;
  animate?: boolean;
  delay?: number;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  onClick,
  noPadding = false,
  variant = 'default',
  glow = false,
  animate = true,
  delay = 0
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Subtle parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  const variantStyles = {
    default: `
      bg-[#080808]/90 backdrop-blur-2xl
      border border-white/[0.03]
      hover:border-white/[0.08]
    `,
    glass: `
      bg-white/[0.02] backdrop-blur-3xl
      border border-white/[0.04]
      hover:border-white/[0.10]
    `,
    solid: `
      bg-[#0a0a0a]
      border border-white/[0.04]
      hover:border-white/[0.08]
    `,
    light: `
      bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] text-black
      border-none
    `
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: animate ? `${delay * 0.08}s` : '0s',
        // Subtle 3D tilt based on mouse position
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePosition.y - 0.5) * -2}deg) rotateY(${(mousePosition.x - 0.5) * 2}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
      }}
      className={`
        group relative flex flex-col overflow-hidden
        rounded-[1.5rem] md:rounded-[2rem]
        shadow-[0_4px_24px_rgba(0,0,0,0.3)]
        transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]
        ${animate ? 'animate-fade-in-scale opacity-0' : ''}
        ${variantStyles[variant]}
        ${onClick ? 'cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Noise Texture - Ultra Subtle */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* Dynamic Gradient Spotlight - Follows Mouse */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(255,255,255,0.03), transparent 50%)`
        }}
      />

      {/* Top Edge Highlight */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Corner Glow Effect */}
      {glow && (
        <div className="absolute -top-[50%] -right-[50%] w-full h-full bg-white/[0.02] blur-[100px] rounded-full pointer-events-none group-hover:bg-white/[0.04] transition-colors duration-1000" />
      )}

      {/* Inner Ring Bevel */}
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.03] pointer-events-none" />

      {(title || subtitle) && (
        <div className="p-6 md:p-8 pb-2 md:pb-3 z-10 relative">
          {title && (
            <h3 className="font-display text-lg md:text-xl font-medium text-white tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs md:text-sm text-white/40 font-light mt-1 tracking-wide">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={`flex-1 relative z-10 ${noPadding ? '' : 'p-4 md:p-8'}`}>
        {children}
      </div>
    </div>
  );
};