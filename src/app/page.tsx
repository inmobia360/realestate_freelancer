'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Users2, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  Calculator, 
  Clock, 
  TrendingUp, 
  DollarSign, 
  Share2, 
  Copy, 
  Check, 
  Layers, 
  BarChart3, 
  Globe2, 
  ChevronDown, 
  Star,
  ExternalLink,
  MessageSquare,
  Zap,
  Award,
  BadgeCheck,
  FileCheck2,
  KeyRound,
  PhoneCall,
  Briefcase,
  Compass,
  Cpu,
  Bot
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useApp } from '@/context/AppContext';
import { BrandLogo, LogoFull } from '@/components/brand/BrandLogo';

export default function LandingPage() {
  const { properties, leads } = useApp();

  const [heroTab, setHeroTab] = useState<'copy' | 'calc' | 'leads'>('copy');
  const [propsCount, setPropsCount] = useState<number>(14);
  const [hoursPerProp, setHoursPerProp] = useState<number>(6);
  const [hourlyRate, setHourlyRate] = useState<number>(45);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const hoursSavedPerMonth = Math.round(propsCount * (hoursPerProp * 0.75));
  const moneySavedPerMonth = Math.round(hoursSavedPerMonth * hourlyRate);
  const annualSavings = moneySavedPerMonth * 12;

  const copySample = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('Oportunidad exclusiva en Barrio de Salamanca (Madrid): Ático dúplex de 145m² con terraza panorámica de 30m², acabados de alta gama y rentabilidad bruta estimada del 7.8% anual.');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqs = [
    {
      q: '¿Cómo garantiza la IA descripciones realistas sin inventar datos?',
      a: 'Nuestra arquitectura se basa en un motor de extracción técnica estructurada que utiliza únicamente los datos validados de tu inmueble (m², orientación, calidades, costes y rentabilidad). No inventa datos inexistentes y adapta el tono según el público: familias, inversores patrimoniales o compradores de lujo en Madrid, Barcelona, Valencia, Sevilla o Canarias.'
    },
    {
      q: '¿Qué métricas calcula la herramienta financiera de inversión?',
      a: 'Modela el Cap Rate neto, rentabilidad bruta anual, Cash-on-Cash y flujo de caja mensual descontando IBI, gastos de comunidad, seguros y tasa de desocupación estimada para que presentes dossieres con solvencia bancaria.'
    },
    {
      q: '¿Puedo personalizar las fichas y landings con la marca de mi agencia?',
      a: 'Sí. Todos los dossieres en PDF, fichas técnicas y micro-landings públicas se generan con tu logotipo, colores corporativos, teléfono directo (+34 000 000 000) y código QR listo para imprimir en cartelería exterior o escaparate.'
    },
    {
      q: '¿Cómo clasifica el Lead Scoring a los contactos recibidos?',
      a: 'Cada consulta se evalúa algorítmicamente de 0 a 100 cruzando capacidad financiera declarada, plazo de compra y nivel de coincidencia con la propiedad, recomendándote el canal y tiempo óptimo de respuesta (< 15 minutos para leads calientes).'
    },
    {
      q: '¿Es compatible con las plataformas de publicación y servicios en Fiverr?',
      a: 'Totalmente. La suite te permite exportar copys listos para Idealista, Fotocasa, redes sociales o empaquetar servicios de creación de dossieres inmobiliarios de alto valor en Fiverr y plataformas freelance.'
    }
  ];

  const testimonials = [
    {
      quote: "Pasamos de tardar 4 horas por captación a tener fichas para portales, 3 posts para redes y el dossier para inversores en menos de 5 minutos. El Cap Rate automático convence al comprador en la primera visita.",
      name: "Alejandro Morales",
      role: "Director de Operaciones",
      agency: "Prime Real Estate Madrid",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      stats: "+32% en cierres este trimestre"
    },
    {
      quote: "El Lead Scoring nos ha cambiado la vida comercial. Mis agentes ya no pierden tiempo con curiosos; contactan en menos de 10 minutos a los inversores que realmente tienen liquidez para comprar.",
      name: "Laura Benítez",
      role: "Broker & Fundadora",
      agency: "Vanguardia Inmobiliaria Barcelona",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
      stats: "45h ahorradas / mes por agente"
    },
    {
      quote: "Las landings con QR y dossieres en PDF le dan un empaque institucional a nuestras exclusivas. Los propietarios quedan fascinados al ver el despliegue de marketing multicanal de su vivienda.",
      name: "Carlos Santillana",
      role: "Socio Consultor",
      agency: "Santillana & Partners Assets Valencia",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      stats: "€18M en cartera activa"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#080b18] text-[#0A192F] dark:text-slate-100 transition-colors duration-200 selection:bg-violet-600 selection:text-white">
      
      {/* 1. Header / Navigation Bar (Adaptive Light/Dark AI Aesthetic) */}
      <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-[#080b18]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">
          
          {/* Official Brand Logo */}
          <BrandLogo variant="full" size="md" href="/" subtitleText="HUB & MARKETING PLATFORM" />

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-9 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Capacidades IA
            </a>
            <a href="#workflow" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Flujo de Trabajo
            </a>
            <a href="#inversion" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Calculadora ROI
            </a>
            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Planes & Precios
            </a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Agencias
            </a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              FAQ
            </a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            <Link
              href="/app/dashboard"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Acceder al Panel</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Adaptive Light/Dark AI Aesthetic) */}
      <section className="relative w-full pt-12 pb-20 px-6 sm:px-10 lg:px-14 overflow-hidden border-b border-slate-200/80 dark:border-indigo-500/20">
        
        {/* Modern AI Ambient Glows */}
        <div className="absolute top-10 left-1/4 -translate-x-1/2 w-[700px] h-[350px] bg-violet-600/10 dark:bg-violet-600/20 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-10 w-[500px] h-[300px] bg-blue-600/10 dark:bg-blue-600/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Publicitary High-Converting Copy */}
          <div className="lg:col-span-6 space-y-7 text-left">
            
            {/* AI B2B Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-500/40 text-violet-800 dark:text-violet-300 text-xs font-bold tracking-wide shadow-sm">
              <Bot className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 animate-pulse" />
              <span>Inteligencia Artificial Especializada en Real Estate</span>
            </div>

            {/* Main H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-slate-900 dark:text-white tracking-tight leading-[1.08]">
              Menos tiempo redactando.<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                Más operaciones cerradas.
              </span>
            </h1>

            {/* Balanced Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
              La plataforma integral para agencias y brokers en Madrid, Barcelona, Valencia, Sevilla y Canarias: genera fichas para 10 portales y redes en segundos, modela el Cap Rate y cualifica a tus compradores con scoring predictivo.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/app/dashboard"
                className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl text-base font-bold shadow-xl shadow-violet-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Probar Panel SaaS Gratis</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-300" />
              </Link>

              <Link
                href="/app/content-generator"
                className="flex items-center gap-2 px-7 py-4 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-indigo-500/30 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-base font-bold transition shadow-sm hover:border-violet-500/50"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Ver Demo de Generación IA</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-indigo-500/20 text-xs">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">10 Formatos sin clichés</span>
              </div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Cap Rate & Cash-Flow</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">PDF & QR de marca</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Interactive SaaS Mockup */}
          <div className="lg:col-span-6 relative">
            
            {/* Main Interactive SaaS Panel */}
            <div className="w-full bg-white dark:bg-[#0d122b] border border-slate-200 dark:border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5">
              
              {/* Mockup Topbar with Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-indigo-500/20">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-cyan-400 inline-block" />
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono ml-2">propertymarketing.hub / engine</span>
                </div>

                {/* Tab selector */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-indigo-500/30 p-1 rounded-xl text-xs font-bold">
                  <button
                    onClick={() => setHeroTab('copy')}
                    className={'px-3 py-1.5 rounded-lg transition cursor-pointer ' + (heroTab === 'copy' ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white')}
                  >
                    Generador IA
                  </button>
                  <button
                    onClick={() => setHeroTab('calc')}
                    className={'px-3 py-1.5 rounded-lg transition cursor-pointer ' + (heroTab === 'calc' ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white')}
                  >
                    Cap Rate ROI
                  </button>
                  <button
                    onClick={() => setHeroTab('leads')}
                    className={'px-3 py-1.5 rounded-lg transition cursor-pointer ' + (heroTab === 'leads' ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white')}
                  >
                    Lead Scoring
                  </button>
                </div>
              </div>

              {/* Tab 1: Real Estate Property & AI Copy Output */}
              {heroTab === 'copy' && (
                <div className="space-y-4">
                  {/* Property Card with Realistic Photo */}
                  <div className="flex flex-col sm:flex-row gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30">
                    <div className="sm:w-36 h-28 rounded-xl overflow-hidden relative shrink-0">
                      <img 
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" 
                        alt="Ático contemporáneo en Madrid"
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                      />
                      <span className="absolute top-2 left-2 bg-slate-900/90 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded border border-cyan-500/30">
                        Madrid Prime
                      </span>
                    </div>
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase text-violet-600 dark:text-violet-400">Captación en Exclusiva</span>
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400">850.000 €</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">Ático Dúplex en Barrio de Salamanca</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">145 m² · 3 Hab · 2 Baños · Cap Rate 7.8%</p>
                      <div className="flex gap-1.5 pt-1">
                        <span className="text-[10px] bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-semibold px-2 py-0.5 rounded border border-blue-200 dark:border-blue-500/30">Idealista</span>
                        <span className="text-[10px] bg-violet-100 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 font-semibold px-2 py-0.5 rounded border border-violet-200 dark:border-violet-500/30">Instagram</span>
                        <span className="text-[10px] bg-emerald-100 dark:bg-cyan-950/70 text-emerald-700 dark:text-cyan-300 font-semibold px-2 py-0.5 rounded border border-emerald-200 dark:border-cyan-500/30">WhatsApp Inversores</span>
                      </div>
                    </div>
                  </div>

                  {/* Generated Copy Preview Box */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#070a16] text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-indigo-500/30 space-y-2.5 font-sans relative">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Ficha Portales Optimizada para Conversión
                      </span>
                      <button
                        onClick={copySample}
                        className="flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition cursor-pointer"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-600 dark:text-cyan-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copiado' : 'Copiar Ficha'}</span>
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-mono">
                      "Exclusivo ático dúplex en Barrio de Salamanca (Madrid). 145m² con techos de 3.2m, cocina con isla central Neff y terraza privada panorámica de 30m² con vistas 360°. Rentabilidad bruta estimada del 7.8% anual. Contacto: +34 000 000 000."
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {['#MadridPrime', '#BarrioDeSalamanca', '#AticoDeLujo', '#CapRate78'].map((tag) => (
                        <span key={tag} className="text-[10px] text-violet-700 dark:text-violet-300 bg-violet-100 dark:bg-violet-950/80 px-2 py-0.5 rounded font-mono border border-violet-200 dark:border-violet-500/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Financial Calculator Preview */}
              {heroTab === 'calc' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 text-left">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Cap Rate Neto</span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400 mt-1 block">7.8%</span>
                      <span className="text-[10px] text-emerald-600 dark:text-cyan-300 font-medium">+1.4% s/ media Madrid</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 text-left">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Cash-Flow / Mes</span>
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">3.450 €</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Neto tras gastos</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 text-left">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Rentabilidad Bruta</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">9.2%</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">66.300 € anuales</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 text-xs text-violet-900 dark:text-violet-200 space-y-1">
                    <span className="font-bold text-violet-700 dark:text-cyan-400 block">✦ Desglose Financiero para Dossier de Inversión</span>
                    <p className="text-slate-600 dark:text-slate-300">Precio adquisición: 850.000 € · Alquiler estimado: 5.500 €/m · IBI: 1.200 €/año · Comunidad: 180 €/m.</p>
                  </div>
                </div>
              )}

              {/* Tab 3: Lead Scoring Preview */}
              {heroTab === 'leads' && (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-cyan-400 font-bold flex items-center justify-center text-sm border border-violet-200 dark:border-violet-500/30">
                        CR
                      </div>
                      <div>
                        <h5 className="text-sm font-bold text-slate-900 dark:text-white">Carlos Romero · Family Office</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ático Salamanca Madrid · Presupuesto: 850.000 € (Al contado)</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-rose-600 dark:text-cyan-400">96/100</span>
                      <span className="block text-[10px] font-bold uppercase text-violet-700 dark:text-violet-300">Comprador VIP</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 rounded-xl text-xs text-violet-900 dark:text-violet-200 flex items-center justify-between font-medium">
                    <span>⚡ Recomendación IA: Enviar dossier financiero y llamar al +34 000 000 000 antes de 15 min.</span>
                    <Link href="/app/leads" className="font-bold underline text-blue-600 dark:text-cyan-400">Ver Lead</Link>
                  </div>
                </div>
              )}

            </div>

            {/* Floating Realistic Social Proof Card */}
            <div className="hidden sm:flex absolute -bottom-6 -left-6 bg-white/95 dark:bg-slate-900/95 text-slate-900 dark:text-white p-4 rounded-2xl border border-slate-200 dark:border-indigo-500/40 shadow-2xl items-center gap-3.5 backdrop-blur-md">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80" 
                alt="Agente inmobiliaria"
                className="w-11 h-11 rounded-xl object-cover" 
              />
              <div>
                <span className="text-xs font-bold block text-slate-900 dark:text-white">Operación Cerrada en 9 días</span>
                <span className="text-[11px] text-emerald-600 dark:text-cyan-400 font-semibold">Comisión generada: 25.500 €</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. High-Impact Metrics Strip */}
      <section className="py-12 w-full bg-white dark:bg-[#070a16] border-b border-slate-200 dark:border-indigo-500/20 px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white block">+12.400</span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold block">Inmuebles procesados con IA</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 dark:text-cyan-400 block">+85%</span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold block">Ahorro en redacción y marketing</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-violet-600 dark:text-violet-400 block">4.9 / 5</span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold block">Valoración de agencias y brokers</span>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-600 dark:text-amber-400 block">€48M+</span>
            <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-semibold block">Volumen de activos modelados</span>
          </div>
        </div>
      </section>

      {/* 4. Real Estate Workflow (3 Distinct Realistic Images) */}
      <section id="workflow" className="py-20 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              EL DÍA A DÍA DEL AGENTE DE ÉXITO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Diseñado para el ritmo real del sector inmobiliario.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              Desde la captación en Madrid, Barcelona, Valencia, Sevilla o Canarias hasta la firma de arras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1: In-situ Property Inspection & Valuation */}
            <div className="bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 rounded-3xl overflow-hidden shadow-md dark:shadow-sm hover:border-violet-500/50 transition group">
              <div className="h-52 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Inspección in situ de inmueble de lujo en España" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow">
                  Paso 01
                </span>
              </div>
              <div className="p-6 space-y-3 text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Captación & Ficha Técnica</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ingresa las características clave mientras estás con el propietario. En un clic tienes el cálculo de rentabilidad para convencerle de firmar en exclusiva.
                </p>
                <div className="pt-2 text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dossier comercial en 3 minutos</span>
                </div>
              </div>
            </div>

            {/* Step 2: Digital Marketing Team Strategy */}
            <div className="bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 rounded-3xl overflow-hidden shadow-md dark:shadow-sm hover:border-violet-500/50 transition group">
              <div className="h-52 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80" 
                  alt="Equipo de agencia inmobiliaria coordinando marketing digital" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow">
                  Paso 02
                </span>
              </div>
              <div className="p-6 space-y-3 text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Distribución en 10 Formatos</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Publica al instante descripciones optimizadas para Idealista y Fotocasa, posts para Instagram/LinkedIn, mensajes de WhatsApp y scripts de vídeo.
                </p>
                <div className="pt-2 text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Máximo alcance sin trabajo manual</span>
                </div>
              </div>
            </div>

            {/* Step 3: Investor Meeting & Deal Closing */}
            <div className="bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 rounded-3xl overflow-hidden shadow-md dark:shadow-sm hover:border-violet-500/50 transition group">
              <div className="h-52 w-full overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80" 
                  alt="Cierre de operación y apretón de manos con inversor" 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-black px-3 py-1 rounded-lg shadow">
                  Paso 03
                </span>
              </div>
              <div className="p-6 space-y-3 text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Scoring de Leads & Cierre</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Recibe las consultas con scoring automático. Contacta de inmediato a los compradores solventes y acelera tus comisiones de honorarios.
                </p>
                <div className="pt-2 text-xs font-bold text-blue-600 dark:text-cyan-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Priorización de compradores VIP</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Bento Grid: Core Platform Features */}
      <section id="features" className="py-20 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              FUNCIONALIDADES DE ALTO IMPACTO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              La suite IA que multiplica tus ventas inmobiliarias.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base">
              Automatización de marketing, modelado financiero y analítica predictiva en una sola plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Bento 1 */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0d122b] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between hover:border-violet-500/50 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-cyan-300 flex items-center justify-center border border-violet-200 dark:border-violet-500/30">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Motor de Generación Multicanal en 10 Formatos sin Clichés
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl">
                  Habita analiza la tipología y target de cada propiedad en Madrid, Barcelona, Valencia, Sevilla y Canarias para redactar copys persuasivos que activan llamadas de compradores.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                  {[
                    'Ficha Portales (SEO)',
                    'Instagram Carousel',
                    'LinkedIn B2B',
                    'TikTok / Reels Scripts',
                    'WhatsApp Inversores',
                    'Dossier de Venta PDF'
                  ].map((format) => (
                    <div key={format} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-indigo-500/30 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />
                      <span className="truncate">{format}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6">
                <Link href="/app/content-generator" className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5">
                  <span>Probar el generador en vivo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento 2 */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#090d20] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between hover:border-violet-500/50 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-500/30">
                  <Calculator className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Calculadora Financiera Institucional
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Modela en segundos el Cap Rate, retorno de inversión neto y flujo de caja mensual con precisión bancaria para inversores nacionales e internacionales.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Cap Rate Neto Estimado:</span>
                    <span className="text-blue-600 dark:text-cyan-400">7.8% anual</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Cash-Flow Libre:</span>
                    <span className="text-amber-600 dark:text-amber-400">+3.450 € / mes</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link href="/app/dashboard" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5">
                  <span>Ver simulación financiera</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento 3 */}
            <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#090d20] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between hover:border-violet-500/50 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-cyan-500/20 text-emerald-600 dark:text-cyan-400 flex items-center justify-center border border-emerald-200 dark:border-cyan-500/30">
                  <Users2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Scoring Predictivo de Leads
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Identifica a los compradores con verdadera capacidad financiera y urgencia de compra para enfocar las llamadas de tu equipo donde está la comisión.
                </p>
                <div className="p-3 bg-emerald-50 dark:bg-cyan-950/40 border border-emerald-200 dark:border-cyan-500/30 rounded-xl text-xs font-semibold text-emerald-800 dark:text-cyan-300">
                  ⚡ Recomendación de tiempo de contacto óptimo (&lt; 15 min)
                </div>
              </div>
              <div className="pt-6">
                <Link href="/app/leads" className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5">
                  <span>Explorar Hub de Leads</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Bento 4 */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0d122b] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between hover:border-violet-500/50 transition">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-violet-300 flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30">
                  <Globe2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Landings Inmobiliarias Públicas & Códigos QR Instantáneos
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl">
                  Cada inmueble cuenta automáticamente con una micro-landing responsive diseñada para capturar el teléfono del comprador, lista para compartir por WhatsApp o escanear mediante código QR.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ Captación directa con teléfono +34 000 000 000</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ QR descargable en alta resolución</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ Dossier PDF de inversión</span>
                </div>
              </div>
              <div className="pt-6">
                <Link href="/app/properties" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1.5">
                  <span>Ver mapa territorial y catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Live Interactive ROI & Time Savings Calculator */}
      <section id="inversion" className="py-20 w-full bg-slate-50 dark:bg-[#0a0d24] text-slate-900 dark:text-white px-6 sm:px-10 lg:px-14 relative overflow-hidden border-b border-slate-200 dark:border-indigo-500/20">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/20 blur-[160px] rounded-full pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-6 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 border border-violet-200 dark:border-violet-500/40 text-violet-800 dark:text-violet-300 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
              <span>Calculadora de Rendimiento Comercial</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              ¿Cuánto tiempo y dinero ahorrará tu agencia cada mes?
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed max-w-xl">
              Configura el volumen de tu equipo para proyectar el ahorro real en costes de producción y las horas recuperadas para captar y negociar.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300">Propiedades gestionadas al mes:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-mono text-base">{propsCount} inmuebles</span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                value={propsCount}
                onChange={(e) => setPropsCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300">Horas de redacción/marketing por propiedad:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-mono text-base">{hoursPerProp} horas</span>
              </div>
              <input
                type="range"
                min="2"
                max="15"
                value={hoursPerProp}
                onChange={(e) => setHoursPerProp(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-slate-700 dark:text-slate-300">Coste medio por hora de agente / redactor:</span>
                <span className="text-blue-600 dark:text-cyan-400 font-mono text-base">{hourlyRate} €/h</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-600"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
              <TrendingUp className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              <span>Impacto Operativo & Financiero</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#060814] border border-slate-200 dark:border-indigo-500/30 text-left">
                <span className="text-xs text-violet-600 dark:text-violet-300 font-semibold block">Horas Ahorradas / Mes</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-blue-600 dark:text-cyan-400 mt-2 block">
                  {hoursSavedPerMonth} h
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Liberadas para visitas y cierres</span>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#060814] border border-slate-200 dark:border-indigo-500/30 text-left">
                <span className="text-xs text-violet-600 dark:text-violet-300 font-semibold block">Ahorro Directo / Mes</span>
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-600 dark:text-amber-400 mt-2 block">
                  {moneySavedPerMonth.toLocaleString()} €
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">En costes de producción</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-violet-100 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-xs font-bold text-violet-800 dark:text-violet-300 uppercase tracking-wider block">Ahorro Proyectado al Año</span>
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">{annualSavings.toLocaleString()} € / año</span>
              </div>
              <Link
                href="/app/dashboard"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-xs font-black transition shadow-lg text-center"
              >
                Comenzar a Ahorrar
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 7. Agency Testimonials */}
      <section id="testimonials" className="py-20 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto space-y-14">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              TESTIMONIOS REALES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Lo que opinan directores y brokers que ya lo usan.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between space-y-6 hover:border-violet-500/40 transition">
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-indigo-500/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.name}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t.role} · {t.agency}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-blue-700 dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/60 border border-blue-200 dark:border-cyan-500/30 px-2.5 py-1 rounded-lg">
                    {t.stats}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Pricing Tiers */}
      <section id="pricing" className="py-20 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              PLANES TRANSPARENTES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Escala tus operaciones con el plan ideal.
            </h2>
            
            <div className="pt-4 flex items-center justify-center gap-3 text-xs font-bold">
              <span className={billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>
                Facturación Mensual
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                className="w-12 h-6 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full p-1 transition flex items-center cursor-pointer"
              >
                <div className={'w-4 h-4 bg-white rounded-full transition-transform ' + (billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0')} />
              </button>
              <span className={billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}>
                Anual <span className="text-blue-700 dark:text-cyan-300 bg-blue-100 dark:bg-cyan-950/80 border border-blue-200 dark:border-cyan-500/30 px-2 py-0.5 rounded-full text-[10px]">-20% Descuento</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Starter */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Starter</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '24€' : '29€'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ mes</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Ideal para agentes independientes que buscan profesionalizar sus publicaciones.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {['Hasta 15 propiedades activas', 'Generador IA en 10 formatos', 'Calculadora de Cap Rate estándar', 'Exportación PDF con marca de agua', 'Soporte vía email: tu-nombre@tu-empresa.com'].map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/app/dashboard"
                className="mt-8 w-full block text-center py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition"
              >
                Comenzar con Starter
              </Link>
            </div>

            {/* Pro Agency */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-[#0f1434] text-white border-2 border-violet-500 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                Más Popular · Agencias
              </div>

              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">Pro Agency</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    {billingCycle === 'yearly' ? '64€' : '79€'}
                  </span>
                  <span className="text-xs text-slate-400">/ mes</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Para agencias inmobiliarias y equipos comerciales en expansión activa.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-slate-200">
                  {[
                    'Propiedades ilimitadas en mapa territorial',
                    'Generador IA multicanal sin límites',
                    'Calculadora de inversión avanzada',
                    'Lead Scoring predictivo con IA',
                    'Landings públicas con QR propio',
                    'Exportación PDF sin marca de agua',
                    'Soporte prioritario 24/7'
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/app/dashboard"
                className="mt-8 w-full block text-center py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-xs transition shadow-lg shadow-violet-900/50"
              >
                Comenzar Prueba Gratuita
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Enterprise</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {billingCycle === 'yearly' ? '159€' : '199€'}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">/ mes</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Para franquicias, fondos de inversión y promotoras con múltiples oficinas.
                </p>
                <div className="pt-4 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  {['Múltiples marcas y sedes', 'Acceso API y webhooks CRM', 'Modelos de IA adaptados a tu zona', 'Onboarding dedicado', 'SLA garantizado 99.9%'].map((feat) => (
                    <div key={feat} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                href="/app/settings"
                className="mt-8 w-full block text-center py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition"
              >
                Contactar Asesoría
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 9. FAQ Accordion */}
      <section id="faq" className="py-20 w-full bg-white dark:bg-[#070a16] border-b border-slate-200 dark:border-indigo-500/20 px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">
              RESOLVEMOS TUS DUDAS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={'w-5 h-5 text-slate-400 transition-transform ' + (openFaq === idx ? 'rotate-180 text-blue-600 dark:text-cyan-400' : '')} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-indigo-500/20 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="py-20 w-full px-6 sm:px-10 lg:px-14">
        <div className="w-full max-w-[1600px] mx-auto p-10 sm:p-16 rounded-3xl bg-gradient-to-tr from-slate-950 via-[#0c1028] to-violet-950 border border-indigo-500/40 text-white text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl mx-auto space-y-5 relative z-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
              OPTIMIZACIÓN INMOBILIARIA INMEDIATA
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Acelera tus ventas inmobiliarias con Inteligencia Artificial.
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto">
              Únete a las agencias que ya automatizan su marketing, cualifican inversores y cierran más operaciones en España y Canarias.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/app/dashboard"
                className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl text-base font-black transition-all shadow-xl hover:scale-105"
              >
                <span>Acceder al Panel de Control</span>
                <ArrowRight className="w-5 h-5 text-cyan-300" />
              </Link>
              <Link
                href="/app/leads"
                className="flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-base font-bold transition border border-white/10"
              >
                <span>Probar Captación de Leads</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="py-12 w-full bg-white dark:bg-[#050711] border-t border-slate-200 dark:border-indigo-500/20 px-6 sm:px-10 lg:px-14 text-xs text-slate-500 dark:text-slate-400">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <BrandLogo variant="full" size="sm" href="/" subtitleText="Plataforma SaaS Inmobiliaria B2B" />
            <span className="text-slate-500 dark:text-slate-500">· Tel: +34 000 000 000 · tu-nombre@tu-empresa.com</span>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/app/dashboard" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Panel de Control
            </Link>
            <Link href="/app/content-generator" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Generador IA
            </Link>
            <Link href="/app/properties" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Mapa Territorial
            </Link>
            <Link href="/app/settings" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Configuración
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}