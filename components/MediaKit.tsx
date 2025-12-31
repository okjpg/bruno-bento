import React, { useState, useEffect, useRef } from 'react';
import {
    Youtube,
    Instagram,
    Linkedin,
    Mail,
    ArrowUpRight,
    ArrowLeft,
    Download,
    Users,
    Eye,
    Heart,
    MessageCircle,
    TrendingUp,
    Share2,
    Play,
    BarChart3,
    Zap,
    Globe,
    Send,
    ChevronDown,
    ExternalLink,
    ArrowRight,
    Sparkles,
    Target,
    Shield,
    BookOpen,
    Check,
    Star,
    Award,
    Quote,
    MousePointerClick,
    Percent
} from 'lucide-react';
import AuroraBackground from './AuroraBackground';
import {
    Sparkline,
    RadialProgress,
    DonutChart,
    AreaChart,
    PlatformComparison
} from './AnimatedCharts';
import { translations } from '../translations';

interface MediaKitProps {
    onBack: () => void;
    lang: 'pt' | 'en';
}

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, suffix: string = '') => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!hasStarted) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(easeOutQuart * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, hasStarted]);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasStarted(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { count, ref, displayValue: `${count.toLocaleString('pt-BR')}${suffix}` };
};

// Format large numbers
const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
};

const MediaKit: React.FC<MediaKitProps> = ({ onBack, lang }) => {
    const [activeTab, setActiveTab] = useState<'linkedin' | 'instagram' | 'youtube'>('linkedin');
    const t = translations[lang];
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        // Scroll to top when component mounts
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Counter hooks for hero stats
    const totalReach = useCountUp(171, 2000, 'K+');
    const totalViews = useCountUp(5.1, 2500, 'M+');

    // Platform data
    const platforms = {
        linkedin: {
            name: 'LinkedIn',
            color: '#0A66C2',
            icon: Linkedin,
            followers: '46K',
            growth: '+35%',
            engagements: '45K',
            avgPerPost: 28,
            views: '3.5M',
            avgViewsPerPost: '15.4K',
            engagementRate: '0.45%',
            posts: 240,
            postsFreq: '4.2/sem',
            shares: 450,
            likes: '40.2K',
            comments: '5.5K'
        },
        instagram: {
            name: 'Instagram',
            color: '#E1306C',
            icon: Instagram,
            followers: '46K',
            growth: '+225%',
            engagements: '35K',
            avgPerPost: 145,
            views: '1.25M',
            avgViewsPerPost: '4.2K',
            engagementRate: '0.62%',
            posts: 310,
            postsFreq: '5.2/sem',
            shares: null,
            likes: '34K',
            comments: '1.2K'
        },
        youtube: {
            name: 'YouTube',
            color: '#FF0000',
            icon: Youtube,
            followers: '60K',
            growth: '+140%',
            engagements: '40K',
            avgPerPost: 580,
            views: '500K',
            avgViewsPerPost: '3.8K',
            engagementRate: '7.12%',
            posts: 150,
            postsFreq: '12.5/mês',
            shares: null,
            likes: '38K',
            comments: '2.1K'
        }
    };

    const currentPlatform = platforms[activeTab];

    // Trend data for sparklines (simulated monthly data)
    const trendData = {
        linkedin: {
            followers: [28, 31, 33, 35, 38, 40, 42, 44, 45, 46, 46, 46],
            engagement: [25, 28, 32, 35, 38, 40, 42, 41, 43, 44, 45, 45],
            views: [1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5]
        },
        instagram: {
            followers: [12, 15, 18, 22, 26, 30, 34, 38, 41, 43, 45, 46],
            engagement: [8, 12, 15, 18, 21, 24, 26, 28, 31, 33, 34, 35],
            views: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.15, 1.2, 1.25]
        },
        youtube: {
            followers: [22, 26, 30, 34, 38, 42, 46, 50, 54, 57, 59, 60],
            engagement: [12, 15, 18, 20, 22, 24, 26, 28, 31, 35, 38, 40],
            views: [180, 200, 240, 280, 320, 350, 380, 400, 430, 460, 485, 500]
        }
    };





    // Audience demographics with context
    const audienceData = [
        { label: t.mediakit.segments.entrepreneurs, percent: 40, color: '#3B82F6', context: (t as any).mediakit.audienceContext.entrepreneurs },
        { label: t.mediakit.segments.developers, percent: 30, color: '#8B5CF6', context: (t as any).mediakit.audienceContext.developers },
        { label: t.mediakit.segments.founders, percent: 10, color: '#10B981', context: (t as any).mediakit.audienceContext.founders },
        { label: t.mediakit.segments.marketing, percent: 10, color: '#F59E0B', context: (t as any).mediakit.audienceContext.marketing },
        { label: t.mediakit.segments.others, percent: 10, color: '#6B7280', context: null }
    ];

    // Social links for presence section
    const socialPresence = [
        {
            platform: 'YouTube',
            handle: '@microsaas',
            followers: '60K',
            label: lang === 'pt' ? 'Inscritos' : 'Subscribers',
            icon: Youtube,
            color: '#FF0000',
            highlight: true,
            description: 'Canal sobre empreendedorismo, Startups, SaaS e Micro-SaaS',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            buttonLabel: 'FOLLOW',
            url: 'https://youtube.com/@microsaas'
        },
        {
            platform: 'Instagram',
            handle: 'instagram.com/brunomicrosaas',
            followers: '46K',
            label: t.mediakit.followers,
            icon: Instagram,
            color: '#E1306C',
            description: lang === 'pt' ? 'Bastidores, lifestyle e dicas rápidas diárias.' : 'Behind the scenes, lifestyle and daily quick tips.',
            buttonLabel: lang === 'pt' ? 'Seguir' : 'Follow',
            url: 'https://instagram.com/brunomicrosaas'
        },
        {
            platform: 'LinkedIn',
            handle: 'linkedin.com/in/brunomicrosaas',
            followers: '46K',
            label: t.mediakit.followers,
            icon: Linkedin,
            color: '#0A66C2',
            description: lang === 'pt' ? 'Artigos profundos e conexões profissionais.' : 'Deep articles and professional connections.',
            buttonLabel: lang === 'pt' ? 'Conectar' : 'Connect',
            url: 'https://linkedin.com/in/brunomicrosaas'
        },
        {
            platform: 'Newsletter',
            handle: 'microsaas.substack.com',
            followers: '25K',
            label: lang === 'pt' ? 'Inscritos' : 'Subscribers',
            icon: Mail,
            color: '#FF6719',
            description: lang === 'pt' ? 'Insights semanais direto na sua caixa de entrada.' : 'Weekly insights straight to your inbox.',
            buttonLabel: lang === 'pt' ? 'Inscrever' : 'Subscribe',
            url: 'https://microsaas.substack.com'
        }
    ];

    // Example posts data
    const examplePosts = [
        {
            title: lang === 'pt' ? "Post do Linkedin (Growth + storytelling)" : "LinkedIn Post (Growth + storytelling)",
            description: lang === 'pt' ? "O caso de como o João Camargo fingiu ser um BOT para validar a Magie. Um exemplo real de MVP 'no osso' que gerou discussões profundas sobre product-led growth e validação de hipóteses." : "The case of how João Camargo pretended to be a BOT to validate Magie. A real example of a 'bare bones' MVP that sparked deep discussions about product-led growth and hypothesis validation.",
            image: "/images/content/magie_case.png",
            stats: [
                { label: 'Impressions', value: '263K', icon: Eye },
                { label: 'Likes', value: '1.5K', icon: Heart },
                { label: 'Comments', value: '100', icon: MessageCircle },
                { label: 'Shares', value: '20', icon: Share2 }
            ],
            tags: ["#SaaS", "#MVP", "#PLG"],
            url: "https://www.linkedin.com/posts/brunomicrosaas_o-cara-fingiu-ser-um-bot-e-construiu-um-dos-activity-7308868758473744385-IlQT?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAWI6QUBvp6oMDGfA8R990xtUgEPVBobgmc",
            ctaLabel: lang === 'pt' ? 'Ver posts' : 'View post'
        },
        {
            title: lang === 'pt' ? "YouTube - Entrevista com founders da Magie" : "YouTube - Interview with Magie Founders",
            description: lang === 'pt' ? "Uma conversa profunda sobre a construção da Magie, os desafios de escala e a estratégia de produto no WhatsApp. Conteúdo de alto valor para fundadores e devs." : "A deep conversation about building Magie, scaling challenges, and product strategy on WhatsApp. High-value content for founders and devs.",
            image: "/images/content/magie_youtube.jpg",
            stats: [
                { label: 'Views', value: '8K', icon: Eye },
                { label: 'Likes', value: '500', icon: Heart },
                { label: 'Comments', value: '35', icon: MessageCircle },
                { label: 'Shares', value: '12', icon: Share2 }
            ],
            tags: ["#YouTube", "#Startups", "#Product"],
            url: "https://youtu.be/DjL84x8qsLA?si=b2NZi_fiPN9rBK74",
            ctaLabel: lang === 'pt' ? 'Assistir vídeo' : 'Watch video'
        },
        {
            title: lang === 'pt' ? "Newsletter - Case Magie" : "Newsletter - Magie Case Study",
            description: lang === 'pt' ? "Deep dive técnico enviado via newsletter detalhando a jornada de descoberta de público e product-market fit. Alta retenção e engajamento da base qualificada." : "Technical deep dive sent via newsletter detailing the audience discovery journey and product-market fit. High retention and engagement from a qualified base.",
            image: "/images/content/magie_newsletter.png",
            stats: [
                { label: 'Views', value: '10K', icon: Eye },
                { label: 'Eng.', value: '5.72%', icon: Heart },
                { label: 'CTR', value: '5.6%', icon: MousePointerClick },
                { label: 'Clicks', value: '560', icon: Target }
            ],
            tags: ["#Newsletter", "#Growth", "#Product"],
            url: "https://microsaas.substack.com/p/construindo-um-dos-maiores-assistentes?utm_source=publication-search",
            ctaLabel: lang === 'pt' ? 'Ler edição' : 'Read issue'
        }
    ];

    return (
        <div className={`min-h-screen bg-[#020202] text-white selection:bg-white/10 selection:text-white font-sans transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Ambient Background - Ultra Minimal */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute w-[1000px] h-[1000px] -top-[500px] -right-[300px] bg-white/[0.02] rounded-full blur-[150px]" />
                <div className="absolute w-[800px] h-[800px] -bottom-[400px] -left-[200px] bg-white/[0.01] rounded-full blur-[150px]" />
            </div>

            {/* Noise Overlay */}
            <div className="noise-overlay opacity-[0.15]" />

            <main className="relative z-10 max-w-[1400px] mx-auto">

                {/* ═══════════════════════════════════════════════════════════════════
                    HEADER - Back Button (Refined)
                ═══════════════════════════════════════════════════════════════════ */}
                <header className="flex justify-between items-center px-6 py-8 md:px-12 md:py-12 animate-fade-down relative z-50">
                    <button
                        onClick={onBack}
                        className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-white/40 hover:text-white hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500 backdrop-blur-md"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-500" />
                        <span className="text-xs font-medium tracking-wide uppercase">{t.mediakit.back}</span>
                    </button>

                    <a
                        href="/mediakit-bruno-okamoto.pdf"
                        download
                        className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/20 text-white/50 cursor-not-allowed transition-all duration-500 shadow-[0_10px_20px_rgba(255,255,255,0.05)]"
                        onClick={(e) => e.preventDefault()}
                        title={lang === 'pt' ? 'Em breve' : 'Coming soon'}
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-xs font-bold uppercase tracking-wider">{t.mediakit.download}</span>
                    </a>
                </header>

                {/* ═══════════════════════════════════════════════════════════════════
                    HERO - Media Kit Cover
                ═══════════════════════════════════════════════════════════════════ */}
                {/* ═══════════════════════════════════════════════════════════════════
                    HERO - Media Kit Cover (Redesigned with Aurora Shader)
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-4 md:px-8 mb-20 md:mb-32 animate-fade-in relative z-20">
                    <div className="relative min-h-[650px] md:min-h-[800px] flex flex-col justify-center items-center text-center overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-[#050505] border border-white/[0.03] shadow-2xl">

                        {/* The Shader Background */}
                        <AuroraBackground className="opacity-70 scale-110" />

                        {/* Overlays for Depth */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/80 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

                        <div className="relative z-10 px-6 py-12 md:px-12 w-full max-w-5xl mx-auto">
                            {/* Animated Badge */}
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.1] backdrop-blur-xl mb-8 md:mb-12 animate-fade-in delay-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-white/50">{t.mediakit.year}</span>
                            </div>

                            {/* Main Headline - Hook Emocional */}
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4 tracking-tight leading-tight animate-fade-in delay-2">
                                {t.mediakit.heroHeadline}
                            </h1>
                            <p className="text-xl md:text-3xl lg:text-4xl font-display font-light text-white/40 mb-10 md:mb-14 tracking-tight animate-fade-in delay-2">
                                {t.mediakit.heroSubheadline}
                            </p>

                            {/* Proof Points */}
                            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14 md:mb-20 animate-fade-in delay-3">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20">
                                    <Award className="w-4 h-4 text-red-400" />
                                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{t.mediakit.proofPoints.tedx}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20">
                                    <Star className="w-4 h-4 text-amber-400" />
                                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{t.mediakit.proofPoints.topVoice}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20">
                                    <Zap className="w-4 h-4 text-violet-400" />
                                    <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">{t.mediakit.proofPoints.years}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 pt-12 border-t border-white/[0.06] animate-fade-in delay-4">
                                <div className="flex flex-col items-center text-center">
                                    <span ref={totalReach.ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter mb-2">
                                        {totalReach.displayValue}
                                    </span>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold whitespace-nowrap">{t.mediakit.reach}</span>
                                </div>
                                <div className="flex flex-col items-center text-center">
                                    <span ref={totalViews.ref} className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter mb-2">
                                        {totalViews.displayValue}
                                    </span>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold whitespace-nowrap">{t.mediakit.views}</span>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <span className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tighter mb-2">
                                        {t.mediakit.nicheCreatorTitle}
                                    </span>
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold whitespace-nowrap">{t.mediakit.nicheCreatorLabel}</span>
                                </div>
                            </div>
                        </div>

                        {/* Minimal Scroll indicator */}
                        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
                            <ChevronDown className="w-5 h-5" />
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    THESIS - O Que Me Diferencia (4 Pilares)
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-2">
                    <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-12 text-center">
                        {t.mediakit.thesisTitle}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Transparência Radical */}
                        <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Eye className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h3 className="text-lg font-display font-medium text-white mb-3">
                                {t.mediakit.thesis.transparency.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed">
                                {t.mediakit.thesis.transparency.description}
                            </p>
                        </div>

                        {/* Comunidade > Seguidores */}
                        <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700">
                            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-display font-medium text-white mb-3">
                                {t.mediakit.thesis.community.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed">
                                {t.mediakit.thesis.community.description}
                            </p>
                        </div>

                        {/* Anti-Hustle Culture */}
                        <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Shield className="w-5 h-5 text-rose-400" />
                            </div>
                            <h3 className="text-lg font-display font-medium text-white mb-3">
                                {t.mediakit.thesis.antiHustle.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed">
                                {t.mediakit.thesis.antiHustle.description}
                            </p>
                        </div>

                        {/* Expertise + Storytelling */}
                        <div className="group p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all duration-700">
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                <BookOpen className="w-5 h-5 text-violet-400" />
                            </div>
                            <h3 className="text-lg font-display font-medium text-white mb-3">
                                {t.mediakit.thesis.expertise.title}
                            </h3>
                            <p className="text-sm text-white/40 leading-relaxed">
                                {t.mediakit.thesis.expertise.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    ABOUT - Bio Section (Tacitile & Premium)
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-3">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20 items-center">

                        {/* Immersive Photo Side */}
                        <div className="lg:col-span-5 relative group">
                            <div className="absolute -inset-4 bg-white/[0.02] rounded-[2rem] blur-2xl group-hover:bg-white/[0.04] transition-all duration-700" />
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/[0.08] bg-[#080808]">
                                <img
                                    src="/images/bruno_profile_2025.jpg"
                                    alt="Bruno Okamoto"
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000 ease-out"
                                />
                                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

                                {/* Signature element */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">Founder & Creator</div>
                                </div>
                            </div>
                        </div>

                        {/* Narrative Side */}
                        <div className="lg:col-span-7">
                            <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-12">
                                {t.mediakit.aboutTitle}
                            </h2>
                            <div className="space-y-8">
                                {t.mediakit.bio.map((p, i) => (
                                    <p
                                        key={i}
                                        className="text-lg md:text-2xl font-light leading-relaxed text-white/50"
                                        dangerouslySetInnerHTML={{
                                            __html: p.replace(/(\d+ anos|\d+ Startups|\d+ mil membros|\d+ mil SaaS|\d+ mil membros|EUNERD|Micro-SaaS|Comunidade de Micro-SaaS)/g, '<span class="text-white/90 font-normal">$1</span>')
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="mt-16 flex items-center gap-8">
                                <a
                                    href="https://microsaas.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-500"
                                >
                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white/30 transition-colors">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <span className="text-sm font-medium tracking-wide tracking-widest uppercase">microsaas.com.br</span>
                                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    SOCIAL PROOF - Marcas e Depoimentos
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-4">
                    <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-4 text-center">
                        {t.mediakit.socialProofTitle}
                    </h2>
                    <p className="text-white/30 text-sm text-center mb-12">
                        {t.mediakit.socialProofSubtitle}
                    </p>

                    {/* Logos Grid - Real Sponsors */}
                    <div className="flex flex-wrap justify-center gap-6 mb-16">
                        {[
                            { name: 'Kommo', img: '/images/sponsors/kommo.png' },
                            { name: 'Eduzz', img: '/images/sponsors/eduzz.png' },
                            { name: 'Crisp', img: '/images/sponsors/crisp.jpg' },
                            { name: 'Hostinger', img: '/images/sponsors/hostinger.png' },
                            { name: 'Replit', img: '/images/sponsors/replit.jpg' }
                        ].map((sponsor, i) => (
                            <div
                                key={i}
                                className="w-[200px] h-[110px] rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center p-5 group hover:border-white/20 hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm overflow-hidden"
                            >
                                <img
                                    src={sponsor.img}
                                    alt={sponsor.name}
                                    className="max-w-[140px] max-h-[50px] object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                            </div>
                        ))}
                    </div>

                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    SOCIAL PRESENCE - Tactile Grid
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-5">
                    <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-12">
                        {t.mediakit.presenceTitle}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {socialPresence.map((social, i) => (
                            <div
                                key={i}
                                className="group relative overflow-hidden rounded-[2.5rem] border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10 transition-all duration-700 aspect-[16/10] md:aspect-auto md:h-[400px]"
                            >
                                <div className="absolute inset-0 z-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.03] border border-white/[0.08] group-hover:border-white/20 transition-all duration-500">
                                                <social.icon className="w-5 h-5" style={{ color: social.color }} />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-1">{social.platform}</div>
                                                <div className="text-sm font-medium text-white/60">{social.handle}</div>
                                            </div>
                                        </div>

                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>

                                    <div>
                                        <div className="mb-6 flex items-baseline gap-3">
                                            <div className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter">
                                                {social.followers}
                                            </div>
                                            <div className="text-sm text-white/20 font-medium uppercase tracking-widest">{social.label}</div>
                                        </div>

                                        <p className="text-sm md:text-base text-white/40 font-light max-w-sm mb-8 leading-relaxed">
                                            {social.description}
                                        </p>

                                        <a
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-white/30 group-hover:text-white transition-all duration-500"
                                        >
                                            <span>{social.buttonLabel}</span>
                                            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>

                                {/* Custom Decorative Blur per platform */}
                                <div
                                    className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000"
                                    style={{ backgroundColor: social.color }}
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    AUDIENCE - Demographics (Clean & Minimal)
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                        <div className="lg:col-span-4">
                            <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-6">
                                {t.mediakit.audienceTitle}
                            </h2>
                            <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tighter leading-tight">
                                {t.mediakit.audienceHeadline}
                            </h3>
                        </div>

                        <div className="lg:col-span-8 flex flex-col justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
                                {audienceData.map((item, i) => (
                                    <div key={i} className="group">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium text-white/40 group-hover:text-white transition-colors duration-500">
                                                {item.label}
                                            </span>
                                            <span className="text-lg font-mono font-medium text-white">
                                                {item.percent}%
                                            </span>
                                        </div>
                                        <div className="h-[2px] w-full bg-white/[0.05] relative overflow-hidden mb-2">
                                            <div
                                                className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
                                                style={{
                                                    width: `${item.percent}%`,
                                                    backgroundColor: item.color,
                                                    boxShadow: `0 0 15px ${item.color}40`
                                                }}
                                            />
                                        </div>
                                        {item.context && (
                                            <p className="text-[11px] text-white/30 italic">
                                                {item.context}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    PLATFORM STATS - Industrial Dashboard Style
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-24 md:mb-40 animate-fade-in delay-5">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
                        <div className="max-w-xl">
                            <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-6">
                                {t.mediakit.analyticsTitle}
                            </h2>
                            <p className="text-lg md:text-2xl font-light text-white/40 leading-relaxed">
                                Deep dive into performance metrics across our primary creative channels.
                            </p>
                        </div>

                        {/* High-end Tab Switcher */}
                        <div className="flex p-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
                            {(['linkedin', 'instagram', 'youtube'] as const).map((platform) => {
                                const p = platforms[platform];
                                const isActive = activeTab === platform;
                                return (
                                    <button
                                        key={platform}
                                        onClick={() => setActiveTab(platform)}
                                        className={`px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-500 ${isActive
                                            ? 'bg-white text-black shadow-xl scale-[1.05]'
                                            : 'text-white/30 hover:text-white/60'
                                            }`}
                                    >
                                        {p.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Stats Grid - Premium Tactile Cards */}
                    {/* Static Analytics Image Replacement */}
                    <div className="w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#080808] group">
                        <img
                            src={activeTab === 'linkedin' ? '/images/stats_linkedin_2025.png' : activeTab === 'instagram' ? '/images/stats_instagram_2025.png' : '/images/stats_youtube_2025.png'}
                            alt={`${activeTab} analytics 2025`}
                            className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-700"
                        />
                    </div>

                </section>



                {/* ═══════════════════════════════════════════════════════════════════
                    CONTENT EXAMPLES - Editorial Layout
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-32 md:mb-56 animate-fade-in delay-6">
                    <div className="max-w-xl mb-24">
                        <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-6">
                            {t.mediakit.contentTitle}
                        </h2>
                        <p className="text-3xl md:text-5xl font-display font-medium text-white tracking-tighter leading-tight">
                            {lang === 'pt' ? 'Crie uma peça dedicada de conteúdo que se replica em todas redes sociais. Veja o case da Magie.' : 'Create a dedicated piece of content that replicates across all social networks. See the Magie case study.'}
                        </p>
                    </div>

                    <div className="space-y-32 md:space-y-48">
                        {examplePosts.map((post, index) => (
                            <div
                                key={index}
                                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                {/* Immersive visual side */}
                                <div className="flex-1 w-full relative group">
                                    <div className="absolute inset-x-0 bottom-[-20%] h-[40%] bg-white/[0.02] blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                    <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/[0.08] bg-[#080808] group-hover:border-white/20 transition-all duration-700">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>

                                    {/* Suspended Stats UI */}
                                    <div className="absolute -bottom-6 left-6 right-6 md:left-12 md:right-12 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl flex justify-around items-center translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                                        {(post.stats as any[]).map((stat, sIdx) => (
                                            <React.Fragment key={sIdx}>
                                                <div className="flex items-center gap-2">
                                                    <stat.icon className="w-3.5 h-3.5 text-white/40" />
                                                    <span className="text-xs font-mono text-white/60">{stat.value}</span>
                                                </div>
                                                {sIdx < (post.stats as any[]).length - 1 && <div className="w-px h-4 bg-white/[0.05]" />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>

                                {/* Deep-dive text side */}
                                <div className="flex-1 space-y-8">
                                    <div className="flex gap-3">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border border-white/[0.08] px-3 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tighter">
                                        {post.title}
                                    </h3>

                                    <p className="text-lg md:text-xl text-white/40 font-light leading-relaxed">
                                        {post.description}
                                    </p>

                                    <a
                                        href={post.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-white/50 hover:text-white transition-all duration-500 pt-4"
                                    >
                                        <span className="border-b border-transparent group-hover:border-white/40 pb-1">
                                            {(post as any).ctaLabel}
                                        </span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    COMMUNITY STATS - High Contrast Module
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-32 md:mb-56 animate-fade-in delay-7">
                    <div className="relative p-12 md:p-20 rounded-[3rem] bg-[#080808] border border-white/[0.05] overflow-hidden group">
                        {/* Interactive background effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative z-10">
                            <div className="max-w-xl mb-16">
                                <h3 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-6">
                                    {t.mediakit.community.title}
                                </h3>
                                <p className="text-xl md:text-2xl font-light text-white/50 leading-relaxed">
                                    {t.mediakit.community.subtitle}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20">
                                {[
                                    { value: "20k+", label: t.mediakit.community.membros },
                                    { value: "3k+", label: t.mediakit.community.saas },
                                    { value: "5", label: t.mediakit.community.redes },
                                    { value: "3+", label: t.mediakit.community.anos }
                                ].map((stat, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <div className="text-4xl md:text-6xl font-display font-medium text-white tracking-tighter mb-2">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    PRICING - Investimento
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-32 md:mb-56 animate-fade-in delay-8">
                    <h2 className="text-xs md:text-sm font-bold text-white/50 uppercase tracking-[0.3em] mb-4 text-center">
                        {t.mediakit.pricingTitle}
                    </h2>
                    <p className="text-white/30 text-sm text-center mb-16">
                        {t.mediakit.pricingSubtitle}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {/* Full Funnel Package - Featured */}
                        <div className="lg:col-span-2 relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-violet-500/20 via-blue-500/20 to-violet-500/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative p-10 md:p-12 rounded-[2.5rem] bg-[#080808] border border-white/[0.1] h-full">
                                {/* Badge */}
                                <div className="absolute -top-4 left-10">
                                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                                        {t.mediakit.pricing.fullPackage.badge}
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-3 mt-4">
                                    {t.mediakit.pricing.fullPackage.title}
                                </h3>
                                <p className="text-white/40 text-sm mb-8">
                                    {t.mediakit.pricing.fullPackage.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-baseline gap-4 mb-8">
                                    <span className="text-4xl md:text-5xl font-display font-medium text-white">
                                        {t.mediakit.pricing.fullPackage.price}
                                    </span>
                                    <span className="text-lg text-white/40">
                                        | {t.mediakit.pricing.fullPackage.priceUsd}
                                    </span>
                                </div>

                                {/* Includes */}
                                <div className="space-y-4 mb-10">
                                    {t.mediakit.pricing.fullPackage.includes.map((item: string, i: number) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Check className="w-3 h-3 text-emerald-400" />
                                            </div>
                                            <span className="text-sm text-white/60">{item}</span>
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="https://wa.me/5511980905374?text=Ol%C3%A1%20Bruno!%20Tenho%20interesse%20no%20Pacote%20Full%20Funnel%20de%20patroc%C3%ADnio."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-4 rounded-2xl bg-white text-black font-bold text-sm uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    <span>Quero este pacote</span>
                                </a>
                            </div>
                        </div>

                        {/* Other Options */}
                        <div className="flex flex-col gap-6">
                            {/* YouTube Solo */}
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                                    <Youtube className="w-5 h-5 text-red-400" />
                                </div>
                                <h3 className="text-xl font-display font-medium text-white mb-2">
                                    {t.mediakit.pricing.youtube.title}
                                </h3>
                                <p className="text-white/40 text-xs mb-4">
                                    {t.mediakit.pricing.youtube.description}
                                </p>
                                <div className="text-2xl font-display font-medium text-white">
                                    {t.mediakit.pricing.youtube.price}
                                </div>
                            </div>

                            {/* Custom */}
                            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-all duration-500 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center mb-6">
                                    <Sparkles className="w-5 h-5 text-violet-400" />
                                </div>
                                <h3 className="text-xl font-display font-medium text-white mb-2">
                                    {t.mediakit.pricing.custom.title}
                                </h3>
                                <p className="text-white/40 text-xs mb-4">
                                    {t.mediakit.pricing.custom.description}
                                </p>
                                <div className="text-2xl font-display font-medium text-white/60">
                                    {t.mediakit.pricing.custom.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    CTA & CONTACT - Direct Connection
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="px-6 md:px-12 mb-40 md:mb-64 animate-fade-in delay-9 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h3 className="text-4xl md:text-7xl font-display font-medium text-white tracking-tighter mb-10 leading-none">
                            {t.mediakit.contact.title}
                        </h3>
                        <p className="text-lg md:text-2xl font-light text-white/30 mb-20 leading-relaxed">
                            {t.mediakit.contact.description}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="https://wa.me/5511980905374"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto px-12 py-5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
                            >
                                WhatsApp
                            </a>
                            <a
                                href="mailto:bruno@microsaas.com.br"
                                className="w-full sm:w-auto px-12 py-5 rounded-full bg-white/[0.03] border border-white/10 text-white font-bold text-xs uppercase tracking-[0.4em] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500"
                            >
                                {t.mediakit.contact.email}
                            </a>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    FOOTER - The Last Impression
                ═══════════════════════════════════════════════════════════════════ */}
                <footer className="px-6 md:px-12 pb-24 md:pb-32 animate-fade-in">
                    <div className="pt-24 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center">
                                <Zap className="w-4 h-4 text-white/30" />
                            </div>
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.5em]">
                                Bruno Okamoto
                            </span>
                        </div>

                        <div className="flex gap-10">
                            <a href="https://microsaas.com.br" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-[0.4em] transition-colors">
                                microsaas.com.br
                            </a>
                            <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">
                                © {new Date().getFullYear()} All Rights Reserved
                            </span>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default MediaKit;
