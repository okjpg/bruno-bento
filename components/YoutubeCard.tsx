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
    viewsLabel = "Views"
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            className={`
                group relative h-full flex flex-col 
                bg-white/[0.02] backdrop-blur-3xl 
                rounded-[1.5rem] md:rounded-[2rem] 
                border border-white/[0.04]
                overflow-hidden 
                transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                hover:border-white/[0.08]
                hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)]
                ${animate ? 'animate-fade-in-scale opacity-0' : ''}
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
            <div className="relative h-48 md:h-64 lg:flex-[2.5] overflow-hidden bg-black/50">
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
                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-black fill-current ml-1 transition-colors duration-300" />
                                </div>
                            </div>
                        </button>

                        {/* Live Badge - Optional */}
                        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                            <Youtube className="w-3 h-3 text-red-500" />
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">YouTube</span>
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
            <div className="p-5 md:p-6 space-y-3 relative z-10">
                <div className="flex justify-between items-start gap-3">
                    <h3 className="text-sm md:text-base font-display text-white leading-tight group-hover:translate-x-0.5 transition-transform duration-500">
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

                {/* Description */}
                <p className="text-[10px] text-white/40 font-light leading-relaxed line-clamp-2 group-hover:text-white/60 transition-colors duration-500">
                    {description}
                </p>

                {/* Stats & CTA Row */}
                <div className="pt-3 flex items-center justify-between border-t border-white/[0.03] group-hover:border-white/[0.06] transition-colors duration-500">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-medium">{channelName}</span>
                            <span className="text-[8px] text-white/30 uppercase tracking-widest">{channelLabel}</span>
                        </div>
                        <div className="w-px h-5 bg-white/[0.06]" />
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-medium">{views}</span>
                            <span className="text-[8px] text-white/30 uppercase tracking-widest">{viewsLabel}</span>
                        </div>
                    </div>

                    <a
                        href="https://www.youtube.com/@microsaas?sub_confirmation=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] hover:bg-red-600 hover:border-red-600 text-white transition-all duration-300 group/btn"
                    >
                        <Youtube className="w-3 h-3 fill-current group-hover/btn:scale-110 transition-transform" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">{subscribeLabel}</span>
                    </a>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-red-500/15 transition-all duration-700" />
        </div>
    );
};
