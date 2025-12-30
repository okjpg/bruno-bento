import React, { useState, useRef } from 'react';
import { BentoCard } from './components/BentoCard';
import { YoutubeCard } from './components/YoutubeCard';
import {
    Youtube,
    Instagram,
    Linkedin,
    ArrowUpRight,
    Users,
    Activity,
    Box,
    Globe,
    Camera,
    Layers,
    Fingerprint,
    FileText,
    Mail
} from 'lucide-react';

const App: React.FC = () => {
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&h=400&auto=format&fit=crop");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen font-sans selection:bg-white/20 selection:text-white bg-[#030303] text-white/90">

            <main className="max-w-[1600px] mx-auto p-4 md:p-8 lg:p-12 relative z-10">

                {/* Navbar - Minimalist */}
                <header className="flex justify-between items-center mb-10 md:mb-24 fade-in-down">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg group cursor-pointer transition-all hover:bg-white/10">
                            <Fingerprint className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold tracking-tight text-white">Bruno Okamoto</span>
                            <span className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Digital Architect</span>
                        </div>
                    </div>
                </header>

                {/* Main Grid - Mobile First Structure */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-min">

                    {/* 1. PROFILE (Compact on Mobile, Sidebar on Desktop) */}
                    <div className="md:col-span-4 md:row-span-4">
                        <BentoCard className="h-full min-h-0 md:min-h-[500px] relative overflow-hidden" noPadding>
                            <div className="absolute top-0 right-0 w-full h-[60%] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

                            <div className="p-6 md:p-8 h-full flex flex-col relative z-20">
                                {/* Profile Header Mobile: Row layout / Desktop: Stack layout */}
                                <div className="flex md:flex-col items-center md:items-start gap-6 md:gap-0">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative w-20 h-20 md:w-28 md:h-28 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl cursor-pointer group md:mb-10 shrink-0 transition-transform duration-500 hover:scale-[1.02]"
                                    >
                                        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                                            <Camera className="w-5 h-5 md:w-6 md:h-6 text-white drop-shadow-md" />
                                        </div>
                                        <img src={profileImage} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" alt="Okamoto" />
                                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-medium leading-[0.95] tracking-tight md:mb-8">
                                        Crafting<br />
                                        <span className="text-white/40">Digital</span><br />
                                        Ecosystems.
                                    </h1>
                                </div>

                                <div className="space-y-6 md:space-y-8 flex-1 mt-6 md:mt-0">
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default">TEDx Speaker</span>
                                        <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default">Founder</span>
                                        <span className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-default">Investor</span>
                                    </div>

                                    <div className="space-y-8 pt-8 border-t border-white/[0.05]">
                                        <div className="space-y-4">
                                            <p className="text-sm text-white/60 leading-relaxed font-light">
                                                Bruno Okamoto, TEDx Speaker, empreendedor apaixonado, com mais de uma década de experiência na economia criativa e na modelagem de negócios impulsionados pela tecnologia (gig economy).
                                            </p>
                                            <p className="text-sm text-white/60 leading-relaxed font-light">
                                                Atualmente, lidera toda a construção do ecossistema de Micro-SaaS no Brasil, com mais de 20k empreendedores construindo empresas de tech. Fundador do MyGroupMetrics e do Metricaas. Mentor, advisor e investidor de diversas empresas early-stage.
                                            </p>
                                        </div>

                                        <div className="space-y-4">
                                            <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold block mb-3">Journey</span>
                                            <div className="flex flex-col gap-3.5 relative">
                                                {/* Connecting line idea - subtle */}
                                                <div className="absolute left-[13px] top-2 bottom-2 w-px bg-white/5" />

                                                {[
                                                    { year: '2014', label: 'Fundou a EUNERD' },
                                                    { year: '2020', label: 'Captou R$ 5M (CVC)' },
                                                    { year: '2022', label: 'Pivot Micro-SaaS' },
                                                    { year: '2023', label: 'Micro-SaaS PRO' },
                                                    { year: '2024', label: 'MyGroupMetrics' },
                                                    { year: '2025', label: '1k membros & Metricaas' },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex gap-4 items-center group relative z-10">
                                                        <div className="w-[26px] h-5 rounded border border-white/10 bg-black/40 flex items-center justify-center shrink-0 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                                            <span className="text-[9px] font-mono text-white/50 group-hover:text-white transition-colors">{item.year.slice(2)}</span>
                                                        </div>
                                                        <span className="text-[10px] md:text-xs font-light text-white/60 group-hover:text-white transition-colors truncate">{item.label}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8 md:mt-auto pt-8">
                                    {[
                                        { Icon: Linkedin, href: "#" },
                                        { Icon: Instagram, href: "#" },
                                        { Icon: Youtube, href: "#" }
                                    ].map(({ Icon, href }, i) => (
                                        <a key={i} href={href} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 hover:scale-110 transition-all duration-300">
                                            <Icon className="w-5 h-5" />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 2. MICRO-SAAS PRO (Hero Content) */}
                    <div className="md:col-span-8 md:row-span-2">
                        <BentoCard className="h-full min-h-[320px] md:min-h-[350px] group overflow-hidden" noPadding>
                            <div className="absolute inset-0 bg-[url('/images/community_group.png')] bg-cover bg-center opacity-30 blur-[2px] scale-100 group-hover:scale-105 group-hover:blur-0 transition-all duration-1000 ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

                            <div className="relative z-10 p-6 md:p-10 h-full flex flex-col justify-end items-start border-t border-white/5">
                                <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 text-white/90 shadow-lg">
                                    Flagship Project
                                </div>
                                <h2 className="text-3xl md:text-5xl font-display text-white mb-3 tracking-tight">Micro-SaaS PRO</h2>
                                <p className="text-white/60 text-sm md:text-base max-w-lg mb-8 font-light leading-relaxed">
                                    The premier ecosystem for independent tech founders. Building the future of lean software in Brazil.
                                </p>

                                <div className="flex items-center gap-6 md:gap-8 bg-black/20 p-4 md:p-0 rounded-2xl md:bg-transparent md:rounded-none backdrop-blur-sm md:backdrop-blur-none border border-white/5 md:border-none">
                                    <div className="flex flex-col">
                                        <span className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tighter">20k+</span>
                                        <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mt-1">Founders</span>
                                    </div>
                                    <div className="w-px h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                    <div className="flex flex-col">
                                        <span className="text-2xl md:text-3xl lg:text-4xl font-display font-medium text-white tracking-tighter">3k+</span>
                                        <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-widest mt-1">Launched</span>
                                    </div>
                                    <div className="ml-auto md:ml-8">
                                        <a href="#" className="flex items-center gap-3 py-2 pl-4 pr-2 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white hover:text-black group/btn transition-all duration-300">
                                            <span className="text-xs font-bold uppercase tracking-widest hidden md:inline-block">Join Community</span>
                                            <div className="w-8 h-8 rounded-lg bg-black/20 flex items-center justify-center group-hover/btn:bg-black/10 transition-colors">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 3. MENTORIA */}
                    <div className="md:col-span-4 md:row-span-1">
                        <BentoCard className="h-full relative overflow-hidden group">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex flex-col">
                                    <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold mb-1">Consulting</span>
                                    <h3 className="text-lg md:text-xl font-display text-white">Mentoria</h3>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-0 bg-green-500 blur-sm opacity-20 animate-pulse" />
                                    <div className="relative px-2 py-1 rounded bg-green-500/10 border border-green-500/20 text-[9px] font-bold text-green-400 uppercase tracking-widest">
                                        Open
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 md:mt-6 space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-white/5 group-hover:border-white/10 transition-colors">
                                    <span className="text-sm text-white/70 font-light">Mentoria individual (1:15h)</span>
                                    <span className="text-sm text-white font-medium">R$ 1.000</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-white/5 group-hover:border-white/10 transition-colors">
                                    <span className="text-sm text-white/70 font-light">Mentoria recorrente</span>
                                    <span className="text-xs text-white/50 font-medium uppercase tracking-wider">Sob consulta</span>
                                </div>
                            </div>

                            <a href="https://wa.me/5511980905374" className="mt-6 md:mt-8 flex items-center justify-between w-full p-2.5 md:p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white hover:text-black group transition-all duration-300">
                                <span className="text-xs font-bold uppercase tracking-widest ml-2">Agendar</span>
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </div>
                            </a>
                        </BentoCard>
                    </div>

                    {/* 4. VIDEO */}
                    <div className="md:col-span-4 md:row-span-1">
                        <YoutubeCard
                            videoId="KCdvVD1yV1Y"
                            title="@MicroSaaS"
                            description="Canal sobre empreendedorismo, Startups, SaaS e Micro-SaaS"
                            channelName="Bruno Okamoto"
                            views="1.5M+"
                        />
                    </div>

                    {/* 5. ECOSYSTEM REACH (Full width on right side blocks) */}
                    <div className="md:col-span-8 md:row-span-1">
                        <BentoCard className="h-full relative overflow-hidden group">
                            <div className="flex flex-col md:flex-row gap-6 h-full relative">
                                <div className="flex-1 flex flex-col z-10">
                                    <div className="mb-4">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Reach</span>
                                            <span className="text-[10px] text-white/40 font-mono">177k+ Total</span>
                                        </div>
                                        <h3 className="text-lg md:text-xl font-display text-white">Digital Footprint</h3>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-4">
                                        {[
                                            { label: 'YouTube', val: '60k', color: 'bg-red-500' },
                                            { label: 'Instagram', val: '45k', color: 'bg-pink-500' },
                                            { label: 'LinkedIn', val: '47k', color: 'bg-blue-500' },
                                            { label: 'Newsletter', val: '25k', color: 'bg-yellow-500' }
                                        ].map((stat, i) => (
                                            <div key={i} className="flex flex-col">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <div className={`w-1 h-1 rounded-full ${stat.color}`} />
                                                    <span className="text-[8px] uppercase text-white/40 tracking-wider font-semibold">{stat.label}</span>
                                                </div>
                                                <span className="text-sm font-display text-white tracking-wide">{stat.val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <a href="#" className="mt-auto flex items-center justify-between w-full p-2 rounded-lg bg-white/[0.03] border border-white/[0.05] hover:bg-white hover:text-black group/btn transition-all duration-300">
                                        <span className="text-[10px] font-bold uppercase tracking-widest ml-2">Media Kit</span>
                                        <div className="w-6 h-6 rounded bg-black/20 flex items-center justify-center group-hover/btn:bg-black/10 transition-colors">
                                            <ArrowUpRight className="w-3 h-3" />
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-1 bg-white/[0.02] rounded-xl p-4 border border-white/[0.03] flex flex-col justify-center">
                                    <div className="flex justify-between items-end mb-4">
                                        <span className="text-[9px] text-white/40 uppercase tracking-widest font-semibold">Audience Profile</span>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'Entrepreneurs', w: '50%' },
                                            { label: 'Developers', w: '35%' },
                                            { label: 'Others', w: '15%' }
                                        ].map((bar, i) => (
                                            <div key={i} className="flex flex-col gap-1.5">
                                                <div className="flex justify-between text-[9px] text-white/60 uppercase tracking-wider">
                                                    <span>{bar.label}</span>
                                                    <span>{bar.w}</span>
                                                </div>
                                                <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-white/40 rounded-full" style={{ width: bar.w }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 6. NEWSLETTER (Full Width) */}
                    <div className="md:col-span-12">
                        <BentoCard className="group relative overflow-hidden bg-gradient-to-br from-[#e0e0e0] to-[#f5f5f5] text-black !border-none" noPadding>
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-b from-white to-transparent opacity-60 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />

                            <div className="p-6 md:p-14 relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 md:gap-10">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white">
                                            <Mail className="w-3 h-3 md:w-4 md:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-black/40">Weekly Digest</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl md:text-4xl font-display font-medium text-black mb-3 md:mb-4 tracking-tight leading-tight">
                                        The New Micro-SaaS Economy.
                                    </h3>
                                    <p className="text-black/60 text-base md:text-lg font-light leading-relaxed">
                                        Deep dives on building, scaling, and monetizing independent software. Join <span className="text-black font-semibold">25,000+</span> readers.
                                    </p>
                                </div>

                                <form
                                    action="https://microsaas.substack.com/api/v1/free?nojs=true"
                                    method="post"
                                    target="_blank"
                                    className="w-full lg:w-auto flex flex-col sm:flex-row gap-3"
                                >
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        className="bg-white/50 border border-black/5 rounded-2xl px-5 py-3 md:px-6 md:py-4 text-black text-sm outline-none focus:bg-white focus:ring-1 focus:ring-black/10 transition-all w-full sm:w-80 placeholder:text-black/30"
                                    />
                                    <button className="px-6 py-3 md:px-8 md:py-4 rounded-2xl bg-black text-white text-sm font-semibold tracking-wide hover:bg-black/80 hover:scale-[1.02] transition-all shadow-xl shadow-black/5 whitespace-nowrap">
                                        Subscribe Free
                                    </button>
                                </form>
                            </div>
                        </BentoCard>
                    </div>

                    {/* 7. PROJECTS GRID (Bottom) */}
                    <div className="md:col-span-12">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                            {[
                                {
                                    title: 'Metricaas',
                                    desc: 'B2B Analytics',
                                    icon: Activity,
                                    img: '/images/metricaas_dashboard.png',
                                    tag: '$12k MRR',
                                    accent: 'blue'
                                },
                                {
                                    title: 'Group Metrics',
                                    desc: 'Telegram Intelligence',
                                    icon: Box,
                                    img: '/images/groupmetrics_dashboard.png',
                                    tag: '2.5k Groups',
                                    accent: 'purple'
                                },
                                {
                                    title: 'Obsidian',
                                    desc: 'Monetization Infra',
                                    icon: Layers,
                                    img: '/images/obsidian_bg_1766717047223.png',
                                    tag: 'Stealth',
                                    accent: 'orange'
                                }
                            ].map((project, i) => (
                                <BentoCard key={i} className="group min-h-[220px] md:min-h-[260px] overflow-hidden cursor-pointer" noPadding>
                                    <div className={`absolute inset-0 bg-[url('${project.img}')] bg-cover bg-center opacity-40 blur-[2px] group-hover:blur-0 group-hover:scale-105 transition-all duration-700 ease-out`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                    <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/5 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                                <project.icon className="w-4 h-4 md:w-5 md:h-5" />
                                            </div>
                                            <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/80 backdrop-blur-md">
                                                {project.tag}
                                            </span>
                                        </div>

                                        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-lg md:text-xl font-display text-white mb-1">{project.title}</h3>
                                            <p className="text-white/50 text-xs font-light tracking-wide group-hover:text-white/70 transition-colors">
                                                {project.desc}
                                            </p>
                                        </div>
                                    </div>
                                </BentoCard>
                            ))}
                        </div>
                    </div>

                </div>

                <footer className="mt-16 md:mt-24 border-t border-white/5 pt-8 md:pt-12 flex flex-col md:flex-row justify-between items-center text-white/30 text-[10px] md:text-xs tracking-widest uppercase gap-4 md:gap-6 font-medium pb-8 md:pb-0">
                    <span>© 2024 Bruno Okamoto. All Rights Reserved.</span>
                    <div className="flex gap-6 md:gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </footer>

            </main>
        </div>
    );
};

export default App;