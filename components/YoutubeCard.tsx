import React, { useState } from 'react';
import { Youtube, ExternalLink, Play } from 'lucide-react';

interface YoutubeCardProps {
    videoId?: string;
    title?: string;
    description?: string;
    channelName?: string;
    views?: string;
    animate?: boolean;
    delay?: number;
    subscribeLabel?: string;
    channelLabel?: string;
    viewsLabel?: string;
    className?: string;
    freeBadgeLabel?: string;
    duration?: string;
}

export const YoutubeCard: React.FC<YoutubeCardProps> = ({
    videoId = "dQw4w9WgXcQ",
    title = "Latest Insight",
    description = "Assista aos bastidores da criação de ecossistemas digitais.",
    channelName = "TEDx Speaker",
    views = "100k+",
    animate = true,
    delay = 0,
    subscribeLabel = "Inscrever-se",
    channelLabel = "Channel",
    viewsLabel = "Views",
    className = "",
    freeBadgeLabel,
    duration
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            className={`
                group relative flex flex-col 
                bg-white/[0.02] backdrop-blur-3xl 
                rounded-[1.5rem] md:rounded-[2rem] 
                border border-white/[0.04]
                overflow-hidden 
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-white/[0.08]
                hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]
                ${animate ? 'animate-fade-in-scale opacity-0' : ''}
                ${className}
            `}
            style={{ animationDelay: animate ? `${delay * 0.08}s` : '0s' }}
        >
            {/* Noise Texture */}
            <div
                className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
                }}
            />

            {/* Video Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-black/50">
                {!isPlaying ? (
                    <>
                        {/* Thumbnail with Ken Burns effect */}
                        <img
                            src={thumbnailUrl}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 scale-105 group-hover:scale-100 transition-all duration-1000 ease-out"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Play Button */}
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center group/play"
                        >
                            <div className="relative">
                                {/* Glow Ring */}
                                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 group-hover/play:scale-175 transition-all duration-500 animate-pulse-glow" />

                                {/* Button */}
                                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black fill-current ml-1 transition-colors duration-300" />
                                </div>
                            </div>
                        </button>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                                <Youtube className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">YouTube</span>
                            </div>
                            {freeBadgeLabel && (
                                <div className="flex items-center gap-2">
                                    {duration && (
                                        <span className="px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/70">
                                            {duration}
                                        </span>
                                    )}
                                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                        {freeBadgeLabel}
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0&modestbranding=1`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                )}
            </div>

            {/* Content Info */}
            <div className="p-4 md:p-6 space-y-4 relative z-10 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                        <h3 className="text-sm md:text-base font-display font-medium text-white leading-tight group-hover:text-white/90 transition-colors">
                            {title}
                        </h3>
                        <a
                            href={`https://youtube.com/watch?v=${videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-white/50 hover:bg-white hover:text-black hover:border-transparent transition-all duration-300 hover:scale-105 active:scale-95 shrink-0"
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>

                    {/* Description - Hidden on mobile for minimalism */}
                    <p className="hidden md:block text-[11px] text-white/40 font-light leading-relaxed line-clamp-2 md:line-clamp-3 group-hover:text-white/60 transition-colors duration-500">
                        {description}
                    </p>
                </div>

                {/* Stats & CTA Row */}
                <div className="pt-4 flex items-center justify-between border-t border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-500">
                    <div className="flex items-center gap-3 md:gap-4 min-w-0">
                        <div className="flex flex-col min-w-0">
                            <span className="text-white text-[11px] md:text-xs font-medium truncate">{channelName}</span>
                            <span className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">{channelLabel}</span>
                        </div>
                        <div className="w-px h-6 bg-white/[0.06] shrink-0" />
                        <div className="flex flex-col shrink-0">
                            <span className="text-white text-[11px] md:text-xs font-medium">{views}</span>
                            <span className="text-[9px] text-white/30 uppercase tracking-widest font-semibold">{viewsLabel}</span>
                        </div>
                    </div>

                    <a
                        href="https://www.youtube.com/@microsaas?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-red-600 hover:border-red-600 text-white transition-all duration-300 group/btn shrink-0 ml-2"
                    >
                        <Youtube className="w-3.5 h-3.5 fill-current group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">{subscribeLabel}</span>
                    </a>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-500/15 transition-all duration-700" />
        </div>

    );
};
