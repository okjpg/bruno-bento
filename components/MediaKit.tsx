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
    Send
} from 'lucide-react';
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
    const totalViews = useCountUp(4.8, 2500, 'M+');
    const totalEngagement = useCountUp(105, 2000, 'K+');

    // Platform data
    const platforms = {
        linkedin: {
            name: 'LinkedIn',
            color: '#0A66C2',
            icon: Linkedin,
            followers: '45.87K',
            growth: '+33.9%',
            engagements: '43.97K',
            avgPerPost: 28,
            views: '3.35M',
            avgViewsPerPost: '14.75K',
            engagementRate: '0.42%',
            posts: 227,
            postsFreq: '4.02/sem',
            shares: 410,
            likes: '38.75K',
            comments: '5.23K'
        },
        instagram: {
            name: 'Instagram',
            color: '#E1306C',
            icon: Instagram,
            followers: '43.65K',
            growth: '+217.3%',
            engagements: '30.33K',
            avgPerPost: 137,
            views: '1.09M',
            avgViewsPerPost: '3.92K',
            engagementRate: '0.53%',
            posts: 279,
            postsFreq: '4.94/sem',
            shares: null,
            likes: '29.34K',
            comments: '992'
        },
        youtube: {
            name: 'YouTube',
            color: '#FF0000',
            icon: Youtube,
            followers: '57.1K',
            growth: '+129%',
            engagements: '31.07K',
            avgPerPost: 536,
            views: '436.25K',
            avgViewsPerPost: '3.38K',
            engagementRate: '6.53%',
            posts: 129,
            postsFreq: '10.75/mês',
            shares: null,
            likes: '29.43K',
            comments: '1.64K'
        }
    };

    const currentPlatform = platforms[activeTab];

    // Trend data for sparklines (simulated monthly data)
    const trendData = {
        linkedin: {
            followers: [28, 31, 33, 35, 38, 40, 42, 44, 45, 46, 46.5, 45.87],
            engagement: [25, 28, 32, 35, 38, 40, 42, 41, 43, 44, 44.5, 43.97],
            views: [1.8, 2.0, 2.2, 2.4, 2.6, 2.8, 3.0, 3.1, 3.2, 3.3, 3.35, 3.35]
        },
        instagram: {
            followers: [12, 15, 18, 22, 26, 30, 34, 38, 40, 42, 43, 43.65],
            engagement: [8, 12, 15, 18, 21, 24, 26, 28, 29, 30, 30.2, 30.33],
            views: [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.05, 1.08, 1.09, 1.09]
        },
        youtube: {
            followers: [22, 26, 30, 34, 38, 42, 46, 50, 53, 55, 56.5, 57.1],
            engagement: [12, 15, 18, 20, 22, 24, 26, 28, 29, 30, 31, 31.07],
            views: [180, 200, 240, 280, 320, 350, 380, 400, 420, 430, 435, 436.25]
        }
    };





    // Audience demographics
    const audienceData = [
        { label: t.mediakit.segments.developers, percent: 47, color: '#8B5CF6' },
        { label: t.mediakit.segments.entrepreneurs, percent: 19, color: '#3B82F6' },
        { label: t.mediakit.segments.founders, percent: 10, color: '#10B981' },
        { label: t.mediakit.segments.marketing, percent: 10, color: '#F59E0B' },
        { label: t.mediakit.segments.others, percent: 14, color: '#6B7280' }
    ];

    // Social links for presence section
    const socialPresence = [
        {
            platform: 'YouTube',
            handle: '@MicroSaaS',
            followers: '1.5M+',
            label: 'Views',
            icon: Youtube,
            color: '#FF0000',
            highlight: true,
            description: 'Canal sobre empreendedorismo, Startups, SaaS e Micro-SaaS',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            buttonLabel: 'FOLLOW'
        },
        {
            platform: 'Instagram',
            handle: '@brunomicrosàas',
            followers: '15K',
            label: t.mediakit.followers,
            icon: Instagram,
            color: '#E1306C',
            description: lang === 'pt' ? 'Bastidores, lifestyle e dicas rápidas diárias.' : 'Behind the scenes, lifestyle and daily quick tips.',
            buttonLabel: lang === 'pt' ? 'Seguir' : 'Follow'
        },
        {
            platform: 'LinkedIn',
            handle: '@brunomicrosàas',
            followers: '40K',
            label: t.mediakit.followers,
            icon: Linkedin,
            color: '#0A66C2',
            description: lang === 'pt' ? 'Artigos profundos e conexões profissionais.' : 'Deep articles and professional connections.',
            buttonLabel: lang === 'pt' ? 'Conectar' : 'Connect'
        },
        {
            platform: 'Newsletter',
            handle: 'microsaas.substack.com',
            followers: '25K',
            label: lang === 'pt' ? 'Inscritos' : 'Subscribers',
            icon: Mail,
            color: '#FF6719',
            description: lang === 'pt' ? 'Insights semanais direto na sua caixa de entrada.' : 'Weekly insights straight to your inbox.',
            buttonLabel: lang === 'pt' ? 'Inscrever' : 'Subscribe'
        }
    ];

    // Example posts data
    const examplePosts = [
        {
            title: lang === 'pt' ? "Insights de Mercado" : "Market Insights",
            description: lang === 'pt' ? "Análises aprofundadas sobre tendências de Micro-SaaS e economia criativa. Conteúdo denso e técnico que gera autoridade e discussões de alto nível entre desenvolvedores e fundadores." : "Deep analyses on Micro-SaaS trends and the creative economy. Dense, technical content that builds authority and high-level discussions among developers and founders.",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
            stats: { likes: "3.2K", comments: "240", shares: "150" },
            tags: ["#SaaS", "#Tech", "#Business"]
        },
        {
            title: lang === 'pt' ? "Bastidores & Lifestyle" : "Behind the Scenes & Lifestyle",
            description: lang === 'pt' ? "A realidade do empreendedorismo sem filtros. Compartilho minha rotina, desafios reais e vitórias, criando uma conexão genuína e humana com a audiência." : "Entrepreneurship reality without filters. I share my routine, real challenges and victories, creating a genuine and human connection with the audience.",
            image: "https://images.unsplash.com/photo-1553877615-30c73e63cf71?q=80&w=800&auto=format&fit=crop",
            stats: { likes: "4.5K", comments: "389", shares: "85" },
            tags: ["#Lifestyle", "#Entrepreneurship", "#RealTalk"]
        },
        {
            title: lang === 'pt' ? "Comunidade & Colaboração" : "Community & Collaboration",
            description: lang === 'pt' ? "Registros de eventos, meetups e interações com a comunidade. Demonstração prática do poder do networking e da construção coletiva no ecossistema." : "Event records, meetups and community interactions. Practical demonstration of the power of networking and collective building in the ecosystem.",
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800&auto=format&fit=crop",
            stats: { likes: "2.8K", comments: "410", shares: "290" },
            tags: ["#Community", "#Networking", "#Growth"]
        }
    ];

    return (
        <div className={`min-h-screen bg-[#000000] text-white transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute w-[800px] h-[800px] -top-[400px] -right-[200px] bg-violet-600/10 rounded-full blur-[150px]" />
                <div className="absolute w-[600px] h-[600px] top-[50%] -left-[200px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute w-[400px] h-[400px] bottom-[10%] right-[20%] bg-violet-500/5 rounded-full blur-[100px]" />
            </div>

            {/* Noise Overlay */}
            <div className="noise-overlay" />

            <main className="max-w-[1200px] mx-auto px-4 py-6 md:px-8 md:py-10 relative z-10">

                {/* ═══════════════════════════════════════════════════════════════════
                    HEADER - Back Button
                ═══════════════════════════════════════════════════════════════════ */}
                <header className="flex justify-between items-center mb-10 md:mb-16 animate-fade-down">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">{t.mediakit.back}</span>
                    </button>

                    <a
                        href="#"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white hover:text-black transition-all duration-300 group"
                    >
                        <Download className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase tracking-wider">{t.mediakit.download}</span>
                    </a>
                </header>

                {/* ═══════════════════════════════════════════════════════════════════
                    HERO - Media Kit Cover
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in">
                    <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-950 via-[#0c0015] to-black border border-violet-500/10 p-8 md:p-14">

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-violet-600/10 to-transparent pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/20 rounded-full blur-[80px]" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                                    <Zap className="w-4 h-4 text-violet-400" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300/80">{t.mediakit.year}</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white mb-4 tracking-tight">
                                Bruno<br />
                                <span className="text-violet-300/90">Okamoto</span>
                            </h1>

                            <p className="text-lg md:text-xl text-white/50 font-light max-w-md mb-10">
                                {t.mediakit.specialist}
                            </p>

                            {/* Hero Stats */}
                            <div className="flex flex-wrap gap-6 md:gap-10">
                                <div className="flex flex-col">
                                    <span ref={totalReach.ref} className="text-3xl md:text-4xl font-display font-semibold text-white">
                                        {totalReach.displayValue}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.reach}</span>
                                </div>
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block" />
                                <div className="flex flex-col">
                                    <span ref={totalViews.ref} className="text-3xl md:text-4xl font-display font-semibold text-white">
                                        {totalViews.displayValue}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.views}</span>
                                </div>
                                <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent hidden sm:block" />
                                <div className="flex flex-col">
                                    <span ref={totalEngagement.ref} className="text-3xl md:text-4xl font-display font-semibold text-white">
                                        {totalEngagement.displayValue}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.engagements}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    ABOUT - Bio Section
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-2">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">{t.mediakit.aboutTitle}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* Photo */}
                        <div className="lg:col-span-2">
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-violet-900/20 to-black border border-white/[0.05]">
                                <img
                                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=600&h=750&auto=format&fit=crop"
                                    alt="Bruno Okamoto"
                                    className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </div>

                        {/* Bio Text */}
                        <div className="lg:col-span-3 flex flex-col justify-center">
                            <div className="space-y-5 text-white/60 text-sm md:text-base font-light leading-relaxed">
                                {t.mediakit.bio.map((p, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{ __html: p.replace(/(\d+ anos|\d+ Startups|\d+ mil membros|\d+ mil SaaS|\d+ mil membros|EUNERD|Micro-SaaS|Comunidade de Micro-SaaS)/g, '<span class="text-white font-medium">$1</span>').replace('Comunidade de Micro-SaaS', '<span class="text-violet-400 font-medium">Comunidade de Micro-SaaS</span>') }} />
                                ))}
                            </div>

                            <div className="mt-8 pt-8 border-t border-white/[0.05]">
                                <a
                                    href="https://microsaas.com.br"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors group"
                                >
                                    <Globe className="w-4 h-4" />
                                    <span className="text-sm font-medium">www.microsaas.com.br</span>
                                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    SOCIAL PRESENCE - Cards Grid
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-3">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">{t.mediakit.presenceTitle}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {socialPresence.map((social, i) => (
                            <div
                                key={i}
                                className={`group relative overflow-hidden rounded-3xl border border-white/[0.08] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.15] ${social.highlight ? 'md:col-span-1 aspect-[16/10]' : 'aspect-[16/10]'
                                    }`}
                            >
                                {social.highlight ? (
                                    // 🌟 PREMIUM HIGHLIGHT CARD (YOUTUBE STYLE)
                                    <>
                                        {/* Background Image with Blur */}
                                        <div className="absolute inset-0">
                                            <img
                                                src={social.image}
                                                alt="Background"
                                                className="w-full h-full object-cover opacity-40 blur-sm scale-110 group-hover:scale-100 transition-transform duration-1000"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                                        </div>

                                        <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                                            {/* Header */}
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#FF0000] p-1.5 rounded-lg">
                                                    <social.icon className="w-4 h-4 text-white fill-current" />
                                                </div>
                                                <span className="text-xs font-bold tracking-widest uppercase">YouTube</span>
                                            </div>

                                            {/* Center Play Button */}
                                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-500">
                                                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <h3 className="text-2xl font-semibold text-white mb-2">{social.handle}</h3>
                                                <p className="text-white/60 text-sm mb-6 max-w-[80%] line-clamp-2">
                                                    {social.description}
                                                </p>

                                                <div className="h-px w-full bg-white/10 mb-5" />

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-[10px] text-white/40 uppercase tracking-wider mb-0.5">{social.label}</div>
                                                        <div className="text-xl font-bold text-white">{social.followers}</div>
                                                    </div>
                                                    <button className="bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold py-2 px-6 rounded-lg uppercase tracking-wider transition-colors">
                                                        {social.buttonLabel}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // STANDARD CARD
                                    <div className="relative h-full bg-[#080808]/80 p-6 md:p-8 flex flex-col justify-between">
                                        <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none" style={{ backgroundColor: social.color }} />

                                        <div className="flex justify-between items-start mb-6">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/5 transition-colors group-hover:border-white/10"
                                                style={{ backgroundColor: `${social.color}10` }}
                                            >
                                                <social.icon className="w-5 h-5" style={{ color: social.color }} />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2">{social.platform}</div>
                                            <div className="text-3xl font-display font-semibold text-white mb-2">{social.followers}</div>
                                            <p className="text-white/40 text-xs mb-8 line-clamp-2 min-h-[2.5em]">{social.description}</p>

                                            <div className="h-px w-full bg-white/5 mb-5" />

                                            <div className="flex justify-between items-center">
                                                <span className="text-xs text-white/50">{social.handle}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg border border-white/10 group-hover:bg-white group-hover:text-black transition-all">
                                                    {social.buttonLabel}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    AUDIENCE - Demographics
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-4">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">{t.mediakit.audienceTitle}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    </div>

                    <div className="p-6 md:p-10 rounded-2xl bg-[#080808]/90 border border-white/[0.04]">
                        <h3 className="text-xl md:text-2xl font-display text-white mb-8">
                            {t.mediakit.audienceHeadline}
                        </h3>

                        <div className="space-y-6">
                            {audienceData.map((item, i) => (
                                <div key={i} className="group">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                            {item.label}
                                        </span>
                                        <span className="text-sm font-semibold" style={{ color: item.color }}>
                                            {item.percent}%
                                        </span>
                                    </div>
                                    <div className="relative h-2 bg-white/[0.05] rounded-full overflow-hidden">
                                        <div
                                            className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                                            style={{
                                                width: `${item.percent}%`,
                                                backgroundColor: item.color,
                                                boxShadow: `0 0 20px ${item.color}40`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    PLATFORM STATS - Interactive Tabs
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-5">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">{t.mediakit.analyticsTitle}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    </div>

                    {/* Tab Buttons */}
                    <div className="flex gap-2 mb-6 p-1 rounded-xl bg-white/[0.02] border border-white/[0.04] w-fit">
                        {(['linkedin', 'instagram', 'youtube'] as const).map((platform) => {
                            const p = platforms[platform];
                            const isActive = activeTab === platform;
                            return (
                                <button
                                    key={platform}
                                    onClick={() => setActiveTab(platform)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-white text-black shadow-lg'
                                        : 'text-white/50 hover:text-white hover:bg-white/[0.05]'
                                        }`}
                                >
                                    <p.icon className="w-4 h-4" />
                                    <span className="hidden sm:inline">{p.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Stats Grid with Sparklines */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                        {/* Followers */}
                        <div className="p-5 rounded-2xl bg-[#080808]/90 border border-white/[0.04] hover:border-white/[0.1] transition-all group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Users className="w-4 h-4 text-white/40" />
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">{t.mediakit.followers}</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
                                    {currentPlatform.followers}
                                </div>
                                <Sparkline
                                    data={trendData[activeTab].followers}
                                    color={currentPlatform.color}
                                    height={50}
                                    width={200}
                                    showGradient={true}
                                    className="-ml-2"
                                />
                                <div className="text-xs font-medium mt-3 flex items-center gap-1" style={{ color: currentPlatform.color }}>
                                    <TrendingUp className="w-3 h-3" />
                                    {currentPlatform.growth}
                                </div>
                            </div>
                        </div>

                        {/* Engagements */}
                        <div className="p-5 rounded-2xl bg-[#080808]/90 border border-white/[0.04] hover:border-white/[0.1] transition-all group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Heart className="w-4 h-4 text-white/40" />
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">{t.mediakit.engagements}</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
                                    {currentPlatform.engagements}
                                </div>
                                <Sparkline
                                    data={trendData[activeTab].engagement}
                                    color={currentPlatform.color}
                                    height={50}
                                    width={200}
                                    showGradient={true}
                                    className="-ml-2"
                                />
                                <div className="text-xs text-white/40 mt-3">
                                    {t.mediakit.avgPost}: {currentPlatform.avgPerPost}/post
                                </div>
                            </div>
                        </div>

                        {/* Views */}
                        <div className="p-5 rounded-2xl bg-[#080808]/90 border border-white/[0.04] hover:border-white/[0.1] transition-all group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <Eye className="w-4 h-4 text-white/40" />
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">Views</span>
                                </div>
                                <div className="text-2xl md:text-3xl font-display font-semibold text-white mb-4">
                                    {currentPlatform.views}
                                </div>
                                <Sparkline
                                    data={trendData[activeTab].views}
                                    color={currentPlatform.color}
                                    height={50}
                                    width={200}
                                    showGradient={true}
                                    className="-ml-2"
                                />
                                <div className="text-xs text-white/40 mt-3">
                                    {t.mediakit.avgPost}: {currentPlatform.avgViewsPerPost}/post
                                </div>
                            </div>
                        </div>

                        {/* Engagement Rate */}
                        <div className="p-5 rounded-2xl bg-[#080808]/90 border border-white/[0.04] hover:border-white/[0.1] transition-all group flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="w-4 h-4 text-white/40" />
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">Engag. Rate</span>
                                </div>

                                <div className="flex-1 flex items-center justify-center">
                                    <RadialProgress
                                        value={parseFloat(currentPlatform.engagementRate)}
                                        max={10}
                                        size={100}
                                        color={currentPlatform.color}
                                        showValue={true}
                                        displayValue={currentPlatform.engagementRate}
                                        label="Taxa"
                                    />
                                </div>

                                <div className="text-center mt-2 text-[10px] text-white/40 bg-white/5 rounded-full py-1 px-2 mx-auto">
                                    {t.mediakit.aboveAvg}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Secondary Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {/* Posts */}
                        <div className="p-4 rounded-xl bg-[#080808]/50 border border-white/[0.02] flex items-center justify-between">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{t.mediakit.posts}</div>
                                <div className="text-xl font-display font-semibold text-white">{currentPlatform.posts}</div>
                            </div>
                            <BarChart3 className="w-5 h-5 text-white/10" />
                        </div>

                        {/* Frequência */}
                        <div className="p-4 rounded-xl bg-[#080808]/50 border border-white/[0.02] flex items-center justify-between">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{t.mediakit.frequency}</div>
                                <div className="text-xl font-display font-semibold text-white">{currentPlatform.postsFreq}</div>
                            </div>
                            <Users className="w-5 h-5 text-white/10" />
                        </div>

                        {/* Likes */}
                        <div className="p-4 rounded-xl bg-[#080808]/50 border border-white/[0.02] flex items-center justify-between">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{t.mediakit.likes}</div>
                                <div className="text-xl font-display font-semibold text-white">{currentPlatform.likes}</div>
                            </div>
                            <Heart className="w-5 h-5 text-white/10" />
                        </div>

                        {/* Comments */}
                        <div className="p-4 rounded-xl bg-[#080808]/50 border border-white/[0.02] flex items-center justify-between">
                            <div>
                                <div className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{t.mediakit.comments}</div>
                                <div className="text-xl font-display font-semibold text-white">{currentPlatform.comments}</div>
                            </div>
                            <MessageCircle className="w-5 h-5 text-white/10" />
                        </div>
                    </div>
                </section>



                {/* ═══════════════════════════════════════════════════════════════════
                    CONTENT EXAMPLES - Alternating Layout
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">{t.mediakit.contentTitle}</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {examplePosts.map((post, index) => (
                            <div
                                key={index}
                                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Text Side */}
                                <div className="flex-1 space-y-6">
                                    <div className="flex gap-2">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] font-medium uppercase tracking-wider text-violet-400 bg-violet-500/10 px-2 py-1 rounded border border-violet-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-display font-semibold text-white">
                                        {post.title}
                                    </h3>

                                    <p className="text-white/60 leading-relaxed text-sm md:text-base font-light">
                                        {post.description}
                                    </p>

                                    {/* Mini Stats for Post */}
                                    <div className="flex gap-6 pt-4 border-t border-white/[0.05]">
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Heart className="w-4 h-4" />
                                            <span className="text-xs">{post.stats.likes}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="text-xs">{post.stats.comments}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/40">
                                            <Share2 className="w-4 h-4" />
                                            <span className="text-xs">{post.stats.shares}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className="flex-1 w-full relative group">
                                    <div className="absolute inset-0 bg-violet-500/20 blur-[40px] rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#080808]">
                                        <div className="aspect-video w-full overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                        </div>
                                        {/* Overlay mock UI */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    COMMUNITY STATS
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-16 md:mb-24 animate-fade-in delay-6">
                    <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-violet-950/50 via-[#0c0015] to-black border border-violet-500/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-violet-600/10 to-transparent pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-display text-white mb-2">
                                {t.mediakit.community.title}
                            </h3>
                            <p className="text-white/40 text-sm mb-8">
                                {t.mediakit.community.subtitle}
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-semibold text-white">13k+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.community.membros}</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-semibold text-white">2.5k+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.community.saas}</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-semibold text-white">5</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.community.redes}</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-display font-semibold text-white">3+</div>
                                    <div className="text-[10px] uppercase tracking-widest text-white/40 mt-1">{t.mediakit.community.anos}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    CTA - Contact Section
                ═══════════════════════════════════════════════════════════════════ */}
                <section className="mb-12 animate-fade-in delay-7">
                    <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1] text-center">
                        <h3 className="text-2xl md:text-3xl font-display text-white mb-3">
                            {t.mediakit.contact.title}
                        </h3>
                        <p className="text-white/50 text-sm md:text-base mb-8 max-w-md mx-auto">
                            {t.mediakit.contact.description}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3">
                            <a
                                href="https://wa.me/5511980905374"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm uppercase tracking-wider hover:shadow-[0_8px_32px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all duration-300"
                            >
                                <Send className="w-4 h-4" />
                                <span>WhatsApp</span>
                            </a>
                            <a
                                href="mailto:bruno@microsaas.com.br"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Mail className="w-4 h-4" />
                                <span>{t.mediakit.contact.email}</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white font-semibold text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                            >
                                <Download className="w-4 h-4" />
                                <span>{t.mediakit.download}</span>
                            </a>
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════
                    FOOTER
                ═══════════════════════════════════════════════════════════════════ */}
                <footer className="pt-8 border-t border-white/[0.04] flex flex-col md:flex-row justify-between items-center text-white/25 text-[10px] tracking-widest uppercase gap-4 font-medium pb-6">
                    <span>© 2025 Bruno Okamoto. {t.footer.rights}</span>
                    <div className="flex gap-6">
                        <a href="https://microsaas.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">microsaas.com.br</a>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default MediaKit;
