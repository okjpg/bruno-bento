import React from 'react';

interface AuroraBackgroundProps {
  className?: string;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Base dark gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
        }}
      />

      {/* Rotating conic gradient - creates aurora sweep effect */}
      <div
        className="absolute w-[150%] h-[150%] -top-[25%] -left-[25%]"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(139, 92, 246, 0.12) 60deg, transparent 120deg, rgba(59, 130, 246, 0.1) 180deg, transparent 240deg, rgba(16, 185, 129, 0.08) 300deg, transparent 360deg)',
          animation: 'aurora-rotate 12s linear infinite',
        }}
      />

      {/* Floating mesh gradient blobs */}
      <div
        className="absolute w-[800px] h-[600px] -top-[200px] -left-[200px]"
        style={{
          background: 'radial-gradient(ellipse at 30% 40%, rgba(139, 92, 246, 0.25) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.2) 0%, transparent 40%)',
          filter: 'blur(60px)',
          animation: 'aurora-morph-1 8s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />

      <div
        className="absolute w-[700px] h-[700px] -bottom-[200px] -right-[100px]"
        style={{
          background: 'radial-gradient(ellipse at 60% 40%, rgba(16, 185, 129, 0.2) 0%, transparent 50%), radial-gradient(ellipse at 30% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 45%)',
          filter: 'blur(80px)',
          animation: 'aurora-morph-2 10s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />

      {/* Accent glow spots */}
      <div
        className="absolute w-[400px] h-[400px] top-[20%] right-[10%]"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 60%)',
          filter: 'blur(40px)',
          animation: 'aurora-pulse 4s ease-in-out infinite',
        }}
      />

      <div
        className="absolute w-[300px] h-[300px] bottom-[30%] left-[15%]"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.12) 0%, transparent 60%)',
          filter: 'blur(50px)',
          animation: 'aurora-pulse 5s ease-in-out infinite reverse',
        }}
      />

      {/* Animated gradient lines - aurora streaks */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute w-[200%] h-[2px] top-[30%] -left-[50%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.5) 20%, rgba(59, 130, 246, 0.6) 50%, rgba(16, 185, 129, 0.5) 80%, transparent 100%)',
            filter: 'blur(8px)',
            animation: 'aurora-streak 6s ease-in-out infinite',
            transformOrigin: 'center',
          }}
        />
        <div
          className="absolute w-[200%] h-[3px] top-[50%] -left-[50%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 30%, rgba(139, 92, 246, 0.5) 60%, transparent 100%)',
            filter: 'blur(12px)',
            animation: 'aurora-streak 8s ease-in-out infinite reverse',
            transformOrigin: 'center',
          }}
        />
        <div
          className="absolute w-[200%] h-[2px] top-[70%] -left-[50%]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.4) 40%, rgba(34, 211, 238, 0.5) 70%, transparent 100%)',
            filter: 'blur(6px)',
            animation: 'aurora-streak 7s ease-in-out infinite',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Grain overlay for texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      <style>{`
        @keyframes aurora-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes aurora-morph-1 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          25% {
            transform: translate(50px, 30px) scale(1.1) rotate(5deg);
            opacity: 0.8;
          }
          50% {
            transform: translate(20px, -20px) scale(0.95) rotate(-3deg);
            opacity: 0.5;
          }
          75% {
            transform: translate(-30px, 10px) scale(1.05) rotate(2deg);
            opacity: 0.7;
          }
        }

        @keyframes aurora-morph-2 {
          0%, 100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.5;
          }
          33% {
            transform: translate(-40px, -30px) scale(1.15) rotate(-5deg);
            opacity: 0.7;
          }
          66% {
            transform: translate(30px, 20px) scale(0.9) rotate(3deg);
            opacity: 0.6;
          }
        }

        @keyframes aurora-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes aurora-streak {
          0%, 100% {
            transform: translateX(-20%) rotate(-2deg) scaleX(0.8);
            opacity: 0.3;
          }
          50% {
            transform: translateX(20%) rotate(2deg) scaleX(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default AuroraBackground;
