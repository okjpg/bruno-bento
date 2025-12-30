import React, { useState, useRef, useEffect } from 'react';
import { BentoCard } from './components/BentoCard';
import { YoutubeCard } from './components/YoutubeCard';
import MediaKit from './components/MediaKit';
import {
    Youtube,
    Instagram,
    Linkedin,
    ArrowUpRight,
    ArrowRight,
    Activity,
    Box,
    Fingerprint,
    Mail,
    Sparkles,
    ChevronRight,
    Globe
} from 'lucide-react';
import { translations } from './translations';

// Animated counter hook for stats
const useCountUp = (end: number, duration: number = 2000, startOnView: boolean = true) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(!startOnView);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    useEffect(() => {
        if (!startOnView || !ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [startOnView]);

    return { count, ref };
};

// Staggered animation delay helper
const getDelay = (index: number) => index + 1;

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<'home' | 'mediakit'>('home');
    const [lang, setLang] = useState<'pt' | 'en'>('pt');
    const [email, setEmail] = useState('');
    const profileImage = "/images/bruno_profile_2025.jpg";

    const t = translations[lang];

    // Stats counters - MUST be called before any conditional return
    const foundersCount = useCountUp(20, 2000);
    const launchedCount = useCountUp(3000, 2000);

    // If on MediaKit page, render MediaKit component
    if (currentPage === 'mediakit') {
        return <MediaKit onBack={() => setCurrentPage('home')} lang={lang} />;
    }

    const socialLinks = [
        { Icon: Linkedin, href: "https://linkedin.com/in/brunomicrosaas", label: "LinkedIn" },
        { Icon: Instagram, href: "https://instagram.com/brunomicrosaas", label: "Instagram" },
        { Icon: Youtube, href: "https://youtube.com/@microsaas", label: "YouTube" },
        { Icon: Mail, href: "https://microsaas.substack.com", label: "Newsletter" }
    ];

    const journey = t.profile.journey;

    const glowColors = [
        '#A855F7', // Purple (Founder)
        '#3B82F6', // Blue (Investor)
        '#EC4899', // Pink (Creator)
        '#F59E0B', // Amber
        '#EF4444', // Red (TEDx)
        '#10B981'  // Emerald
    ];

    const stats = [
        { label: 'YouTube', value: '60k', color: '#FF0000' },
        { label: 'Instagram', value: '46k', color: '#E1306C' },
        { label: 'LinkedIn', value: '46k', color: '#0A66C2' },
        { label: 'Newsletter', value: '25k', color: '#FBBF24' }
    ];

    const projects = [
        {
            title: 'Metricaas',
            desc: t.projects.metricaasDesc,
            icon: Activity,
            img: '/images/metricaas_dashboard.png',
            href: 'https://metricaas.ai/'
        },
        {
            title: 'My Group Metrics',
            desc: t.projects.mgmDesc,
            icon: Box,
            img: '/images/groupmetrics_dashboard.png',
            href: 'https://www.mygroupmetrics.com/#'
        }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-white/20 selection:text-white bg-[#000000] text-white/90 relative">

            {/* Ambient Background Orbs */}
            <div className="ambient-bg">
                <div className="ambient-orb ambient-orb-1" />
                <div className="ambient-orb ambient-orb-2" />
            </div>

            {/* Noise Overlay */}
            <div className="noise-overlay" />

            <main className="max-w-[1400px] mx-auto px-4 py-6 md:px-8 md:py-10 lg:px-12 lg:py-12 relative z-10">

                {/* ═══════════════════════════════════════════════════════════════════
                    HEADER - Ultra Minimal
                ═══════════════════════════════════════════════════════════════════ */}
                <header className="flex justify-between items-center mb-12 md:mb-16 animate-fade-down">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center backdrop-blur-sm group cursor-pointer transition-all duration-300 hover:bg-white/[0.08] hover:border-white/[0.12] hover:scale-105">
                            <Fingerprint className="w-4 h-4 md:w-5 md:h-5 text-white/60 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium tracking-tight text-white">Bruno Okamoto</span>
                            <span className="text-[9px] text-white/30 uppercase tracking-[0.25em] font-medium">{t.header.role}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 bg-white/[0.03] border border-white/[0.06] p-1 rounded-lg">
                            {(['pt', 'en'] as const).map((l) => (
                                <button
                                    key={l}
                                    onClick={() => setLang(l)}
                                    className={`
                                        px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                                        ${lang === l
                                            ? 'bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.1)]'
                                            : 'text-white/30 hover:text-white/60'}
                                    `}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>

                        {/* Desktop Nav Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {Object.entries(t.header.nav).map(([key, label], i) => {
                                const isContact = key === 'contact';
                                return (
                                    <a
                                        key={i}
                                        href={isContact ? "mailto:bruno@microsaas.com.br" : `#${key}-section`}
                                        className={`
                                            px-4 py-2 text-xs font-medium transition-all duration-300 rounded-lg
                                            ${isContact
                                                ? 'border border-white/10 bg-white/5 hover:bg-white hover:text-black ml-2'
                                                : 'text-white/40 hover:text-white hover:bg-white/[0.03]'}
                                        `}
                                    >
                                        {label}
                                    </a>
                                );
                            })}
                        </nav>
                    </div>
                </header>

                {/* ═══════════════════════════════════════════════════════════════════
                    BENTO GRID - Mobile First
                ═══════════════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">

                    {/* 1. PROFILE CARD - Left Column */}
                    <div className="md:col-span-4 md:row-span-4" id="about-section">
                        <BentoCard
                            className="h-full min-h-0 md:min-h-[580px]"
                            noPadding
                            glow
                            variant="glass"
                            delay={getDelay(0)}
                        >
                            <div className="p-5 md:p-7 h-full flex flex-col relative z-20">

                                {/* Profile Header */}
                                <div className="flex md:flex-col items-center md:items-start gap-5 md:gap-0">

                                    {/* Avatar */}
                                    <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[1.25rem] overflow-hidden group md:mb-8 shrink-0 transition-all duration-500 ring-2 ring-white/[0.03] hover:ring-white/[0.08]">
                                        <img
                                            src={profileImage}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                                            alt="Bruno Okamoto"
                                        />
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-medium leading-[0.95] tracking-tight md:mb-6">
                                        {t.profile.title.l1}<br />
                                        <span className="text-white/30">{t.profile.title.l2}</span><br />
                                        {t.profile.title.l3}
                                    </h1>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mt-5 md:mt-0">
                                    <a
                                        href="https://www.favikon.com/blog/top-saas-influencers#heres-the-list-of-the-top-20-saas-influencers-in-2025"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:bg-amber-500/20 transition-colors cursor-pointer shadow-[0_0_15px_-5px_rgba(245,158,11,0.3)] hover:scale-[1.02]"
                                    >
                                        <Sparkles className="w-3 h-3" />
                                        <span>{t.profile.tags.topVoice}</span>
                                    </a>

                                    <a
                                        href="https://www.youtube.com/watch?v=_GSrjWqitzM"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-600/20 transition-colors cursor-pointer hover:scale-[1.02]"
                                    >
                                        <span>{t.profile.tags.speaker}</span>
                                    </a>

                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-bold uppercase tracking-wider text-purple-500 hover:bg-purple-500/20 transition-colors cursor-default hover:scale-[1.02]">
                                        {t.profile.tags.founder}
                                    </span>

                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold uppercase tracking-wider text-blue-500 hover:bg-blue-500/20 transition-colors cursor-default hover:scale-[1.02]">
                                        {t.profile.tags.investor}
                                    </span>

                                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-[10px] font-bold uppercase tracking-wider text-pink-500 hover:bg-pink-500/20 transition-colors cursor-default hover:scale-[1.02]">
                                        {t.profile.tags.creator}
                                    </span>
                                </div>

                                {/* Bio Section */}
                                <div className="space-y-6 flex-1 mt-6 pt-6 border-t border-white/[0.04]">
                                    <div className="space-y-3">
                                        {t.profile.bio.map((paragraph, i) => (
                                            <p
                                                key={i}
                                                className="text-body animate-text-shimmer"
                                                style={{ animationDelay: `${i}s` }}
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Journey Timeline */}
                                    <div className="space-y-3">
                                        <span className="text-label block opacity-80">{t.profile.journeyTitle}</span>
                                        <div className="flex flex-col gap-3 timeline-line pl-0">
                                            {t.profile.journey.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="flex gap-3 items-start group relative z-10 py-0.5"
                                                >
                                                    <div
                                                        className="w-8 h-6 rounded flex items-center justify-center shrink-0 border transition-all duration-300 animate-glow-wave mt-0.5"
                                                        style={{
                                                            backgroundColor: 'rgba(255,255,255,0.02)',
                                                            '--glow-color': glowColors[i % glowColors.length],
                                                            animationDelay: `${i * 1.2}s`
                                                        } as React.CSSProperties}
                                                    >
                                                        <span
                                                            className="text-[10px] font-mono transition-colors"
                                                            style={{ color: glowColors[i % glowColors.length] }}
                                                        >
                                                            '{item.year}
                                                        </span>
                                                    </div>
                                                    <span className="text-[11px] font-light text-white/50 group-hover:text-white/90 transition-colors duration-300 leading-snug pt-1">
                                                        {item.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-2 mt-6 pt-6 border-t border-white/[0.04]">
                                    {socialLinks.map(({ Icon, href, label }, i) => (
                                        <a
                                            key={i}
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.02] border border-white/[0.04] text-white/40 hover:text-white hover:bg-white hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* ─────────────────────────────────────────────────────────────────
                        2. MICRO-SAAS PRO - Hero Card
                    ───────────────────────────────────────────────────────────────── */}
                    <div className="md:col-span-8 md:row-span-2">
                        <BentoCard
                            className="h-full min-h-[280px] md:min-h-[320px] overflow-hidden !shadow-[0_0_80px_-20px_rgba(99,102,241,0.3)]"
                            noPadding
                            delay={getDelay(1)}
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-[url('/images/community_group.png')] bg-cover bg-center opacity-25 blur-[1px] scale-105 group-hover:scale-100 group-hover:blur-0 group-hover:opacity-35 transition-all duration-1000 ease-out"
                            />
                            {/* Animated Gradient Mesh */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/40 via-purple-900/40 to-pink-900/40 opacity-60 mix-blend-overlay animate-pulse-glow" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/70 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#020202]/30 to-transparent" />

                            <div className="relative z-10 p-5 md:p-8 lg:p-10 h-full flex flex-col justify-end">

                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
                                        {t.microsaas.badge}
                                    </span>
                                </div>

                                {/* Title */}
                                <h2 className="text-display-lg md:text-display-xl text-white mb-2">
                                    Micro-SaaS PRO
                                </h2>

                                {/* Description */}
                                <p className="text-white/50 text-sm md:text-base max-w-md mb-6 font-light leading-relaxed">
                                    {t.microsaas.description}
                                </p>

                                {/* Stats & CTA Row */}
                                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                                    {/* Stats */}
                                    <div className="flex items-center gap-4 md:gap-5 py-2 px-3 md:px-4 rounded-2xl bg-white/[0.03] border border-white/[0.04] backdrop-blur-sm">
                                        <div className="flex flex-col">
                                            <span
                                                ref={foundersCount.ref}
                                                className="text-lg md:text-2xl font-display font-medium text-white tracking-tight leading-none mb-1"
                                            >
                                                {foundersCount.count}k+
                                            </span>
                                            <span className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">{t.microsaas.stats.founders}</span>
                                        </div>
                                        <div className="w-px h-6 md:h-8 bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0" />
                                        <div className="flex flex-col">
                                            <span
                                                ref={launchedCount.ref}
                                                className="text-lg md:text-2xl font-display font-medium text-white tracking-tight leading-none mb-1"
                                            >
                                                {(launchedCount.count / 1000).toFixed(1)}k+
                                            </span>
                                            <span className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest">{t.microsaas.stats.launched}</span>
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <a
                                        href="https://microsaas.com.br/pro/?utm_source=bio_bruno&utm_medium=organic&utm_campaign=comunidade_pro"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between gap-3 py-2.5 pl-5 pr-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white hover:text-black hover:border-transparent font-semibold text-xs uppercase tracking-wider hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] transition-all duration-300 group/btn"
                                    >
                                        <span>{t.microsaas.button}</span>
                                        <div className="w-7 h-7 rounded-lg bg-white/[0.08] group-hover/btn:bg-black/10 flex items-center justify-center transition-colors">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* ─────────────────────────────────────────────────────────────────
                        3. MENTORIA - Consulting Card
                    ───────────────────────────────────────────────────────────────── */}
                    <div className="md:col-span-4">
                        <BentoCard
                            className="h-full min-h-[200px]"
                            variant="solid"
                            delay={getDelay(2)}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex flex-col">
                                    <span className="text-label mb-1">{t.mentorship.label}</span>
                                    <h3 className="text-lg font-display text-white">{t.mentorship.title}</h3>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-emerald-400 blur-md opacity-30 animate-pulse" />
                                    <div className="relative px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/25 text-[9px] font-bold text-emerald-400 uppercase tracking-widest">
                                        {t.mentorship.badge}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 mb-5">
                                {t.mentorship.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center gap-4 py-2.5 border-b border-white/[0.03] group-hover:border-white/[0.06] transition-colors">
                                        <span className="text-sm text-white/60 font-light leading-tight">{item.label}</span>
                                        <span className={`shrink-0 ${item.price.includes('consulta') || item.price.includes('request') ? "text-[10px] text-white/40 font-medium uppercase tracking-wider" : "text-sm text-white font-medium"}`}>
                                            {item.price}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://wa.me/5511980905374"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full py-2.5 pl-5 pr-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white hover:text-black hover:border-transparent font-semibold text-xs uppercase tracking-wider hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] transition-all duration-300 group/btn"
                            >
                                <span>{t.mentorship.button}</span>
                                <div className="w-7 h-7 rounded-lg bg-white/[0.08] group-hover/btn:bg-black/10 flex items-center justify-center transition-colors">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </div>
                            </a>
                        </BentoCard>
                    </div>

                    {/* ─────────────────────────────────────────────────────────────────
                        4. YOUTUBE - Video Card
                    ───────────────────────────────────────────────────────────────── */}
                    <div className="md:col-span-4">
                        <YoutubeCard
                            videoId="KCdvVD1yV1Y"
                            title="@MicroSaaS"
                            description={t.youtube.description}
                            channelName="Bruno Okamoto"
                            views="1.5M+"
                            delay={getDelay(3)}
                            subscribeLabel={t.youtube.button}
                            channelLabel={lang === 'pt' ? 'Canal' : 'Channel'}
                            viewsLabel={lang === 'pt' ? 'Visitas' : 'Views'}
                        />
                    </div>

                    {/* ─────────────────────────────────────────────────────────────────
                        5. ECOSYSTEM REACH - Stats Card
                    ───────────────────────────────────────────────────────────────── */}
                    <div className="md:col-span-8">
                        <BentoCard
                            className="h-full"
                            variant="glass"
                            delay={getDelay(4)}
                        >
                            <div className="flex flex-col md:flex-row gap-5 h-full">

                                {/* Left: Stats */}
                                <div className="flex-1 flex flex-col">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-label">{t.ecosystem.label}</span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                            <h3 className="text-base font-display text-white">{t.ecosystem.title}</h3>
                                            <div
                                                className="px-2 py-0.5 rounded border border-white/10 bg-white/5 animate-glow-wave shrink-0"
                                                style={{ '--glow-color': '#3B82F6' } as React.CSSProperties}
                                            >
                                                <span className="text-[10px] font-mono text-blue-400 whitespace-nowrap">+5M {t.ecosystem.metricLabel}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        {stats.map((stat, i) => (
                                            <div
                                                key={i}
                                                className="flex flex-col p-3 rounded-xl bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.06] transition-colors group/stat"
                                            >
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <div
                                                        className="w-1.5 h-1.5 rounded-full opacity-80 group-hover/stat:opacity-100 transition-opacity"
                                                        style={{ backgroundColor: stat.color }}
                                                    />
                                                    <span className="text-[9px] uppercase text-white/35 tracking-wider font-medium">{stat.label}</span>
                                                </div>
                                                <span className="text-lg font-display text-white tracking-tight">{stat.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentPage('mediakit');
                                        }}
                                        className="mt-auto flex items-center justify-between w-full py-2.5 pl-5 pr-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white hover:text-black hover:border-transparent font-semibold text-xs uppercase tracking-wider hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] transition-all duration-300 group/btn cursor-pointer relative z-20"
                                    >
                                        <span>{t.ecosystem.button}</span>
                                        <div className="w-7 h-7 rounded-lg bg-white/[0.08] group-hover/btn:bg-black/10 flex items-center justify-center transition-colors">
                                            <ArrowUpRight className="w-3.5 h-3.5" />
                                        </div>
                                    </button>
                                </div>

                                {/* Right: Audience Profile */}
                                <div className="flex-1 bg-white/[0.015] rounded-xl p-4 border border-white/[0.02] flex flex-col justify-center">
                                    <span className="text-label mb-4">{t.ecosystem.audience}</span>
                                    <div className="space-y-4">
                                        {[
                                            { label: t.ecosystem.segments.entrepreneurs, percent: 40 },
                                            { label: t.ecosystem.segments.developers, percent: 30 },
                                            { label: t.ecosystem.segments.founders, percent: 10 },
                                            { label: t.ecosystem.segments.marketing, percent: 10 },
                                            { label: t.ecosystem.segments.others, percent: 10 }
                                        ].map((bar, i) => (
                                            <div key={i} className="flex flex-col gap-1.5 group">
                                                <div className="flex justify-between text-[10px] text-white/50 uppercase tracking-wider">
                                                    <span className="group-hover:text-white/80 transition-colors">{bar.label}</span>
                                                    <span>{bar.percent}%</span>
                                                </div>
                                                <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-gradient-to-r from-white/40 to-white/20 rounded-full transition-all duration-700 ease-out group-hover:from-white/60 group-hover:to-white/40"
                                                        style={{ width: `${bar.percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* ─────────────────────────────────────────────────────────────────
                        6. NEWSLETTER - Full Width CTA
                    ───────────────────────────────────────────────────────────────── */}
                    <div className="md:col-span-12">
                        <BentoCard
                            className="overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a] to-amber-950/20"
                            variant="solid"
                            noPadding
                            delay={getDelay(5)}
                        >
                            {/* Gradient Orbs */}
                            <div className="absolute top-0 right-0 w-[250px] h-[250px] md:w-[400px] md:h-[400px] bg-gradient-to-b from-amber-500/20 via-amber-900/10 to-transparent rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-gradient-to-t from-amber-900/20 to-transparent rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                            <div className="p-6 md:p-10 lg:p-12 relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-8">

                                {/* Content */}
                                <div className="max-w-lg">
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
                                            <Mail className="w-3.5 h-3.5 text-white" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">{t.newsletter.label}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-white mb-2 tracking-tight leading-tight">
                                        {t.newsletter.title}
                                    </h3>
                                    <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">
                                        {t.newsletter.descriptionPart1}<span className="text-white font-semibold">25,000+</span>{t.newsletter.descriptionPart2}
                                    </p>
                                </div>

                                {/* Form */}
                                <form
                                    action="https://microsaas.substack.com/api/v1/free?nojs=true"
                                    method="post"
                                    target="_blank"
                                    className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={t.newsletter.placeholder}
                                        required
                                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:px-5 md:py-3.5 text-white text-sm outline-none focus:bg-white/10 focus:ring-2 focus:ring-white/10 focus:border-transparent transition-all w-full sm:w-72 placeholder:text-white/20 shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 md:py-3.5 rounded-xl bg-white text-black text-sm font-semibold tracking-wide hover:bg-white/90 hover:scale-[1.02] transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 group whitespace-nowrap tactile-press"
                                    >
                                        <span>{t.newsletter.button}</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </form>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 7. PROJECTS GRID - Bottom */}
                    <div className="md:col-span-12" id="projects-section">
                        {/* Section Separator & Title */}
                        <div className="flex items-center gap-4 mb-5 md:mb-6">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                            <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                                {t.projects.sectionTitle}
                            </span>
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            {projects.map((project, i) => (
                                <BentoCard
                                    key={i}
                                    className="min-h-[200px] md:min-h-[240px] overflow-hidden cursor-pointer"
                                    noPadding
                                    variant="solid"
                                    onClick={() => project.href && window.open(project.href, '_blank')}
                                    delay={getDelay(6 + i)}
                                >
                                    {/* Background */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-30 blur-[2px] group-hover:blur-0 group-hover:opacity-40 scale-105 group-hover:scale-100 transition-all duration-700 ease-out"
                                        style={{ backgroundImage: `url('${project.img}')` }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                                    <div className="relative z-10 p-5 md:p-6 h-full flex flex-col justify-between">

                                        {/* Top Row */}
                                        <div className="flex justify-between items-start">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center border border-white/[0.05] group-hover:bg-white group-hover:text-black group-hover:border-transparent transition-all duration-500">
                                                <project.icon className="w-4 h-4" />
                                            </div>
                                        </div>

                                        {/* Bottom Row */}
                                        <div className="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-lg font-display text-white mb-0.5">{project.title}</h3>
                                            <p className="text-white/40 text-xs font-light tracking-wide group-hover:text-white/80 transition-colors">
                                                {project.desc}
                                            </p>
                                        </div>
                                    </div>
                                </BentoCard>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ═══════════════════════════════════════════════════════════════════
                    FOOTER - Minimal
                ═══════════════════════════════════════════════════════════════════ */}
                <footer className="mt-12 md:mt-20 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center text-white/25 text-[10px] tracking-widest uppercase gap-4 font-medium pb-6 animate-fade-in delay-10">
                    <span>© 2025 Bruno Okamoto. {t.footer.rights}</span>
                    <div className="flex gap-6">
                        <a href="mailto:bruno@microsaas.com.br" className="hover:text-white transition-colors duration-300">{t.footer.contact}</a>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default App;