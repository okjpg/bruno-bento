import React, { useState, useEffect, useRef, useCallback } from 'react';

// ═══════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════

interface DataPoint {
    value: number;
    label?: string;
}

interface SparklineProps {
    data: number[];
    color?: string;
    height?: number;
    width?: number;
    strokeWidth?: number;
    showGradient?: boolean;
    showDots?: boolean;
    animated?: boolean;
    className?: string;
}

interface RadialProgressProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    bgColor?: string;
    label?: string;
    showValue?: boolean;
    displayValue?: string;
    animated?: boolean;
    className?: string;
}

interface AnimatedBarProps {
    value: number;
    max?: number;
    color?: string;
    height?: number;
    label?: string;
    showValue?: boolean;
    animated?: boolean;
    delay?: number;
    className?: string;
}

interface DonutChartProps {
    data: { value: number; color: string; label: string }[];
    size?: number;
    strokeWidth?: number;
    animated?: boolean;
    showLegend?: boolean;
    className?: string;
}

interface AreaChartProps {
    data: DataPoint[];
    height?: number;
    color?: string;
    showGrid?: boolean;
    showLabels?: boolean;
    animated?: boolean;
    className?: string;
}

// ═══════════════════════════════════════════════════════════════════
// UTILITY HOOKS
// ═══════════════════════════════════════════════════════════════════

const useIntersectionObserver = (callback: (isVisible: boolean) => void) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => callback(entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [callback]);

    return ref;
};

// ═══════════════════════════════════════════════════════════════════
// SPARKLINE CHART
// Ultra-smooth animated line chart with gradient fill
// ═══════════════════════════════════════════════════════════════════

export const Sparkline: React.FC<SparklineProps> = ({
    data,
    color = '#8B5CF6',
    height = 40,
    width = 120,
    strokeWidth = 2,
    showGradient = true,
    showDots = false,
    animated = true,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(!animated);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) setIsVisible(true);
    }, [animated]);

    const containerRef = useIntersectionObserver(observerCallback);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [data]);

    if (!data || data.length < 2) return null;

    const padding = 4;
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    const points = data.map((value, i) => ({
        x: padding + (i / (data.length - 1)) * (width - padding * 2),
        y: padding + (1 - (value - minValue) / range) * (height - padding * 2)
    }));

    // Create smooth bezier curve path
    const linePath = points.reduce((path, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (point.x - prev.x) / 3;
        const cpx2 = point.x - (point.x - prev.x) / 3;
        return `${path} C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`;
    }, '');

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <svg
                width={width}
                height={height}
                className="overflow-visible"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.3" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Gradient fill */}
                {showGradient && (
                    <path
                        d={areaPath}
                        fill={`url(#${gradientId})`}
                        className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    />
                )}

                {/* Animated line */}
                <path
                    ref={pathRef}
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        strokeDasharray: pathLength,
                        strokeDashoffset: isVisible ? 0 : pathLength,
                        transition: `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)`
                    }}
                />

                {/* Interactive dots */}
                {showDots && points.map((point, i) => (
                    <g key={i}>
                        {/* Invisible hit area */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={10}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                            className="cursor-pointer"
                        />
                        {/* Visible dot */}
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={hoveredIndex === i ? 4 : 2}
                            fill={color}
                            className="transition-all duration-200"
                            style={{
                                opacity: isVisible ? (hoveredIndex === i ? 1 : 0.6) : 0,
                                transition: `opacity 0.3s, r 0.2s`
                            }}
                        />
                        {/* Pulse effect on hover */}
                        {hoveredIndex === i && (
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={8}
                                fill={color}
                                opacity={0.2}
                                className="animate-ping"
                            />
                        )}
                    </g>
                ))}
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
                <div
                    className="absolute -top-8 transform -translate-x-1/2 px-2 py-1 rounded-md bg-white/10 backdrop-blur-md text-[10px] font-medium text-white border border-white/10 whitespace-nowrap z-10"
                    style={{ left: points[hoveredIndex].x }}
                >
                    {data[hoveredIndex].toLocaleString('pt-BR')}
                </div>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// RADIAL PROGRESS
// Circular progress indicator with smooth animation
// ═══════════════════════════════════════════════════════════════════

export const RadialProgress: React.FC<RadialProgressProps> = ({
    value,
    max = 100,
    size = 80,
    strokeWidth = 6,
    color = '#8B5CF6',
    bgColor = 'rgba(255,255,255,0.05)',
    label,
    showValue = true,
    displayValue,
    animated = true,
    className = ''
}) => {
    const [progress, setProgress] = useState(animated ? 0 : value);
    const [isVisible, setIsVisible] = useState(!animated);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) {
            setIsVisible(true);
            // Animate to target value
            const duration = 1500;
            const startTime = Date.now();
            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
                setProgress(value * eased);
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }
    }, [animated, value]);

    const containerRef = useIntersectionObserver(observerCallback);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / max) * circumference;

    return (
        <div ref={containerRef} className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="-rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={bgColor}
                    strokeWidth={strokeWidth}
                />
                {/* Progress arc */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    style={{
                        transition: 'stroke-dashoffset 0.3s ease-out',
                        filter: `drop-shadow(0 0 8px ${color}40)`
                    }}
                />
            </svg>

            {/* Center content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showValue && (
                    <span className="text-lg font-display font-semibold text-white">
                        {displayValue || `${Math.round(progress)}%`}
                    </span>
                )}
                {label && (
                    <span className="text-[8px] uppercase tracking-wider text-white/40 mt-0.5">
                        {label}
                    </span>
                )}
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// ANIMATED BAR
// Horizontal bar with smooth fill animation
// ═══════════════════════════════════════════════════════════════════

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
    value,
    max = 100,
    color = '#8B5CF6',
    height = 8,
    label,
    showValue = true,
    animated = true,
    delay = 0,
    className = ''
}) => {
    const [width, setWidth] = useState(animated ? 0 : (value / max) * 100);
    const [isVisible, setIsVisible] = useState(!animated);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) {
            setIsVisible(true);
            setTimeout(() => {
                setWidth((value / max) * 100);
            }, delay);
        }
    }, [animated, value, max, delay]);

    const containerRef = useIntersectionObserver(observerCallback);

    return (
        <div ref={containerRef} className={`w-full ${className}`}>
            {(label || showValue) && (
                <div className="flex justify-between items-center mb-2">
                    {label && (
                        <span className="text-xs text-white/60 font-medium">{label}</span>
                    )}
                    {showValue && (
                        <span className="text-xs font-semibold" style={{ color }}>
                            {value.toLocaleString('pt-BR')}
                        </span>
                    )}
                </div>
            )}
            <div
                className="relative w-full rounded-full overflow-hidden"
                style={{ height, backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
                <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                        width: `${width}%`,
                        backgroundColor: color,
                        boxShadow: `0 0 20px ${color}40`,
                        transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
                    }}
                />
                {/* Shimmer effect */}
                <div
                    className="absolute inset-y-0 left-0 rounded-full opacity-50"
                    style={{
                        width: `${width}%`,
                        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)`,
                        animation: isVisible ? 'shimmer 2s infinite' : 'none'
                    }}
                />
            </div>
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// DONUT CHART
// Multi-segment donut with hover interactions
// ═══════════════════════════════════════════════════════════════════

export const DonutChart: React.FC<DonutChartProps> = ({
    data,
    size = 160,
    strokeWidth = 20,
    animated = true,
    showLegend = true,
    className = ''
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(!animated);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) setIsVisible(true);
    }, [animated]);

    const containerRef = useIntersectionObserver(observerCallback);

    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    let accumulatedOffset = 0;

    return (
        <div ref={containerRef} className={`flex items-center gap-6 ${className}`}>
            <div className="relative">
                <svg width={size} height={size} className="-rotate-90">
                    {data.map((item, i) => {
                        const segmentLength = (item.value / total) * circumference;
                        const offset = accumulatedOffset;
                        accumulatedOffset += segmentLength;

                        const isHovered = hoveredIndex === i;

                        return (
                            <circle
                                key={i}
                                cx={size / 2}
                                cy={size / 2}
                                r={radius}
                                fill="none"
                                stroke={item.color}
                                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                                strokeLinecap="round"
                                strokeDasharray={`${segmentLength} ${circumference}`}
                                strokeDashoffset={-offset}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="cursor-pointer transition-all duration-300"
                                style={{
                                    opacity: isVisible ? (hoveredIndex !== null && !isHovered ? 0.4 : 1) : 0,
                                    transition: `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 100}ms, stroke-width 0.2s`,
                                    filter: isHovered ? `drop-shadow(0 0 12px ${item.color}80)` : 'none'
                                }}
                            />
                        );
                    })}
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {hoveredIndex !== null ? (
                        <>
                            <span className="text-2xl font-display font-semibold text-white">
                                {Math.round((data[hoveredIndex].value / total) * 100)}%
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-white/50 mt-1 text-center px-2">
                                {data[hoveredIndex].label}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="text-xl font-display font-semibold text-white">
                                {total.toLocaleString('pt-BR')}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-white/40 mt-1">
                                Total
                            </span>
                        </>
                    )}
                </div>
            </div>

            {/* Legend */}
            {showLegend && (
                <div className="flex flex-col gap-2">
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all duration-200 cursor-pointer ${hoveredIndex === i ? 'bg-white/5' : ''
                                }`}
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-[11px] text-white/60">{item.label}</span>
                            <span className="text-[11px] font-semibold text-white ml-auto">
                                {Math.round((item.value / total) * 100)}%
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// AREA CHART
// Full-width area chart with grid and animations
// ═══════════════════════════════════════════════════════════════════

export const AreaChart: React.FC<AreaChartProps> = ({
    data,
    height = 120,
    color = '#8B5CF6',
    showGrid = true,
    showLabels = true,
    animated = true,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(!animated);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) setIsVisible(true);
    }, [animated]);

    const containerRef = useIntersectionObserver(observerCallback);

    if (!data || data.length < 2) return null;

    const width = 400;
    const padding = { top: 10, right: 10, bottom: showLabels ? 25 : 10, left: 10 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;

    const points = data.map((d, i) => ({
        x: padding.left + (i / (data.length - 1)) * chartWidth,
        y: padding.top + (1 - (d.value - minValue) / range) * chartHeight,
        value: d.value,
        label: d.label
    }));

    const linePath = points.reduce((path, point, i) => {
        if (i === 0) return `M ${point.x} ${point.y}`;
        const prev = points[i - 1];
        const cpx1 = prev.x + (point.x - prev.x) / 2;
        const cpx2 = point.x - (point.x - prev.x) / 2;
        return `${path} C ${cpx1} ${prev.y}, ${cpx2} ${point.y}, ${point.x} ${point.y}`;
    }, '');

    const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

    const gradientId = `area-gradient-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div ref={containerRef} className={`w-full ${className}`}>
            <svg
                viewBox={`0 0 ${width} ${height}`}
                className="w-full overflow-visible"
                preserveAspectRatio="xMidYMid meet"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                {showGrid && (
                    <g className="text-white/[0.03]">
                        {[0.25, 0.5, 0.75].map((ratio, i) => (
                            <line
                                key={i}
                                x1={padding.left}
                                y1={padding.top + ratio * chartHeight}
                                x2={width - padding.right}
                                y2={padding.top + ratio * chartHeight}
                                stroke="currentColor"
                                strokeDasharray="4 4"
                            />
                        ))}
                    </g>
                )}

                {/* Area fill */}
                <path
                    d={areaPath}
                    fill={`url(#${gradientId})`}
                    className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* Line */}
                <path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    style={{ filter: `drop-shadow(0 2px 8px ${color}60)` }}
                />

                {/* Interactive points */}
                {points.map((point, i) => (
                    <g key={i}>
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={20}
                            fill="transparent"
                            onMouseEnter={() => setHoveredIndex(i)}
                            className="cursor-pointer"
                        />
                        <circle
                            cx={point.x}
                            cy={point.y}
                            r={hoveredIndex === i ? 6 : 4}
                            fill={color}
                            className="transition-all duration-200"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                filter: hoveredIndex === i ? `drop-shadow(0 0 8px ${color})` : 'none'
                            }}
                        />
                        {hoveredIndex === i && (
                            <circle
                                cx={point.x}
                                cy={point.y}
                                r={12}
                                fill={color}
                                opacity={0.2}
                            />
                        )}
                    </g>
                ))}

                {/* Labels */}
                {showLabels && points.map((point, i) => (
                    point.label && (i === 0 || i === points.length - 1 || i % Math.ceil(points.length / 5) === 0) && (
                        <text
                            key={i}
                            x={point.x}
                            y={height - 5}
                            textAnchor="middle"
                            className="fill-white/30 text-[9px] font-medium"
                        >
                            {point.label}
                        </text>
                    )
                ))}
            </svg>

            {/* Tooltip */}
            {hoveredIndex !== null && (
                <div
                    className="absolute transform -translate-x-1/2 px-3 py-2 rounded-lg bg-[#0c0c0c] backdrop-blur-md border border-white/10 shadow-xl z-20"
                    style={{
                        left: `${(points[hoveredIndex].x / width) * 100}%`,
                        top: '-60px'
                    }}
                >
                    <div className="text-xs font-semibold text-white">
                        {points[hoveredIndex].value.toLocaleString('pt-BR')}
                    </div>
                    {points[hoveredIndex].label && (
                        <div className="text-[9px] text-white/50 mt-0.5">
                            {points[hoveredIndex].label}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════
// PLATFORM COMPARISON BARS
// Animated comparison bars for multi-platform metrics
// ═══════════════════════════════════════════════════════════════════

interface PlatformMetric {
    name: string;
    value: number;
    color: string;
    icon?: React.ReactNode;
}

interface PlatformComparisonProps {
    metrics: PlatformMetric[];
    animated?: boolean;
    className?: string;
}

export const PlatformComparison: React.FC<PlatformComparisonProps> = ({
    metrics,
    animated = true,
    className = ''
}) => {
    const [isVisible, setIsVisible] = useState(!animated);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const observerCallback = useCallback((visible: boolean) => {
        if (visible && animated) setIsVisible(true);
    }, [animated]);

    const containerRef = useIntersectionObserver(observerCallback);

    const maxValue = Math.max(...metrics.map(m => m.value));

    return (
        <div ref={containerRef} className={`space-y-3 ${className}`}>
            {metrics.map((metric, i) => {
                const width = (metric.value / maxValue) * 100;
                const isHovered = hoveredIndex === i;

                return (
                    <div
                        key={i}
                        className={`group cursor-pointer transition-all duration-300 ${isHovered ? 'scale-[1.02]' : ''}`}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-2">
                                {metric.icon && (
                                    <div
                                        className="w-5 h-5 rounded flex items-center justify-center transition-transform duration-300"
                                        style={{
                                            backgroundColor: `${metric.color}20`,
                                            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                                        }}
                                    >
                                        {metric.icon}
                                    </div>
                                )}
                                <span className={`text-xs font-medium transition-colors duration-300 ${isHovered ? 'text-white' : 'text-white/60'}`}>
                                    {metric.name}
                                </span>
                            </div>
                            <span
                                className="text-sm font-semibold transition-colors duration-300"
                                style={{ color: isHovered ? metric.color : 'white' }}
                            >
                                {metric.value.toLocaleString('pt-BR')}
                            </span>
                        </div>

                        <div className="relative h-2 bg-white/[0.04] rounded-full overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out"
                                style={{
                                    width: isVisible ? `${width}%` : '0%',
                                    backgroundColor: metric.color,
                                    boxShadow: isHovered ? `0 0 16px ${metric.color}60` : `0 0 8px ${metric.color}30`,
                                    transitionDelay: `${i * 100}ms`
                                }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

// Add shimmer animation to global styles
const styles = `
@keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}
