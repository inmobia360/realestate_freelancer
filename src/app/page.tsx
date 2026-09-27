'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Users2,
  CheckCircle2,
  Calculator,
  Copy,
  Check,
  Globe2,
  ChevronDown,
  BadgeCheck,
  FileCheck2,
  Bot,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { BrandLogo } from '@/components/brand/BrandLogo';

export default function LandingPage() {
  const [heroTab, setHeroTab] = useState<'copy' | 'calc' | 'leads'>('copy');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);

  const copySample = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('Ejemplo ilustrativo de ficha inmobiliaria. Revisa las características antes de compartir el borrador.');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const faqs = [
    {
      q: '¿Qué puedo probar en la demo?',
      a: 'Puedes recorrer el panel, consultar propiedades y leads de ejemplo y abrir el generador de contenido. Utiliza datos ficticios. Nada se publica ni se envía.'
    },
    {
      q: '¿La IA envía contenido a mis clientes o a los portales?',
      a: 'No desde el flujo mostrado. El contenido generado debe tratarse como un borrador: revísalo y confirma cada dato antes de compartirlo.'
    },
    {
      q: '¿Los documentos generados tienen validez jurídica garantizada?',
      a: 'No. Cualquier plantilla o borrador debe revisarse por un profesional cualificado antes de utilizarse. La herramienta no sustituye el asesoramiento jurídico.'
    },
    {
      q: '¿La demo usa datos reales de agentes o compradores?',
      a: 'No. Los nombres, cifras y propiedades del recorrido son datos de ejemplo. No introduzcas información personal o de clientes en la demo.'
    },
    {
      q: '¿Qué funciones e integraciones están disponibles en cada plan?',
      a: 'Consulta la demo para ver el flujo actual y contacta con el equipo para confirmar disponibilidad, integraciones y condiciones del plan antes de contratar.'
    }
  ];
  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] dark:bg-[#080b18] text-[#0A192F] dark:text-slate-100 transition-colors duration-200 selection:bg-violet-600 selection:text-white">

      {/* 1. Header / Navigation Bar (Adaptive Light/Dark AI Aesthetic) */}
      <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-[#080b18]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 h-20 flex items-center justify-between">

          {/* Official Brand Logo */}
          <BrandLogo variant="full" size="md" href="/" />

          {/* Center Nav Links */}
          <nav className="hidden lg:flex items-center gap-9 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Producto
            </a>
            <a href="#workflow" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Cómo funciona la demo
            </a>
            <a href="#demo" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Demo guiada
            </a>
            <a href="#pricing" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Planes
            </a>
            <a href="#trust" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Qué incluye la demo
            </a>
            <a href="#faq" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">
              Preguntas frecuentes
            </a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <Link
              href="/demo"
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Ver onboarding guiado</span>
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
              Tu agencia inmobiliaria<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-cyan-400 dark:via-blue-400 dark:to-violet-400 bg-clip-text text-transparent">
                en el bolsillo.
              </span>
            </h1>

            {/* Balanced Value Proposition */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-xl">
              Prepara fichas inmobiliarias y borradores de contenido desde un solo lugar. Revísalos y decide tú qué compartes con tus clientes.
            </p>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/demo"
                className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl text-base font-bold shadow-xl shadow-violet-600/30 transition-all hover:scale-105 active:scale-95"
              >
                <span>Empezar onboarding guiado</span>
                <ArrowUpRight className="w-5 h-5 text-cyan-300" />
              </Link>

              <Link
                href="/demo"
                className="flex items-center gap-2 px-7 py-4 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-indigo-500/30 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl text-base font-bold transition shadow-sm hover:border-violet-500/50"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                <span>Cómo funciona la demo</span>
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-indigo-500/20 text-xs">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Formatos de contenido</span>
              </div>
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Calculadora orientativa</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-blue-600 dark:text-cyan-400 shrink-0" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">Revisión antes de compartir</span>
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
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono ml-2">INMOBIA 360 / DEMO</span>
                </div>
                <span className="rounded-full border border-amber-300 bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-200">Datos ficticios · no es actividad real</span>

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
                    Estimación ROI
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
                        <span className="text-xs font-black text-amber-600 dark:text-amber-400">Precio demo</span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">Ático Dúplex en Barrio de Salamanca</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">145 m² · 3 hab. · 2 baños · Cap Rate orientativo · ejemplo</p>
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
                        <Sparkles className="w-3.5 h-3.5" /> Borrador de ejemplo · pendiente de revisión
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
                      "Exclusivo ático dúplex en Barrio de Salamanca (Madrid). ejemplo de vivienda en Madrid con terraza. Comprueba todos los datos del inmueble y edita el borrador antes de compartirlo."
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
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Cap Rate estimado</span>
                      <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-cyan-400 mt-1 block">7,8 % · ejemplo</span>
                      <span className="text-[10px] text-emerald-600 dark:text-cyan-300 font-medium">Estimación ilustrativa</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 text-left">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Cash-Flow / Mes</span>
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1 block">3.450 € · ejemplo</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Supuesto ilustrativo</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/30 text-left">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold block">Rentabilidad Bruta</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 mt-1 block">9,2 % · ejemplo</span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">cifra de ejemplo</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 text-xs text-violet-900 dark:text-violet-200 space-y-1">
                    <span className="font-bold text-violet-700 dark:text-cyan-400 block">✦ Supuestos ilustrativos · revisar antes de usar</span>
                    <p className="text-slate-600 dark:text-slate-300">Precio, alquiler y gastos son ficticios. Introduce y verifica tus propios datos.</p>
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
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ático Salamanca Madrid · Presupuesto: presupuesto ficticio</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-rose-600 dark:text-cyan-400">96/100 · ejemplo</span>
                      <span className="block text-[10px] font-bold uppercase text-violet-700 dark:text-violet-300">Lead ficticio</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-500/30 rounded-xl text-xs text-violet-900 dark:text-violet-200 flex items-center justify-between font-medium">
                    <span>Ejemplo ilustrativo: revisa la información del contacto antes de decidir el siguiente paso.</span>
                    <Link href="/demo" className="font-bold underline text-blue-600 dark:text-cyan-400">Ver onboarding guiado</Link>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* 3. High-Impact Metrics Strip */}
      <section className="py-5 w-full bg-white dark:bg-[#070a16] border-b border-slate-200 dark:border-indigo-500/20 px-6 sm:px-10 lg:px-14">
        <p className="mx-auto max-w-4xl text-center text-sm font-semibold text-slate-600 dark:text-slate-300">Pensado para agentes independientes y pequeñas agencias · Datos de ejemplo claramente identificados · Tú revisas cada borrador</p>
      </section>

      {/* 4. Real Estate Workflow (3 Distinct Realistic Images) */}
      <section id="workflow" className="py-16 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">UN FLUJO SENCILLO</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">De los datos del inmueble a un borrador revisado.</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">El ejemplo usa información ficticia para enseñar el flujo; cada dato debe validarlo el agente.</p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['01', 'Completa la ficha', 'Añade características y condiciones confirmadas del inmueble.'],
              ['02', 'Prepara un borrador', 'Genera texto de apoyo a partir de los datos disponibles.'],
              ['03', 'Revisa y decide', 'Edita el contenido. Tú eliges si y dónde compartirlo.']
            ].map(([number, title, copy]) => (
              <article key={number} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-indigo-500/25 dark:bg-[#0c1024]">
                <span className="text-sm font-black text-blue-600 dark:text-cyan-400">{number}</span>
                <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy}</p>
              </article>
            ))}
          </div>
          <Link href="/demo" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:underline dark:text-cyan-400">Ver el recorrido guiado <ArrowRight className="h-4 w-4" /></Link>
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
                  Motor de Generación Multicanal en Formatos de contenido
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl">
                  Prepara borradores de texto según la información de la propiedad. Comprueba los datos y el contenido antes de compartirlo.
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
                <Link href="/demo" className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5">
                  <span>Ver el flujo en la demo guiada</span>
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
                  Calculadora orientativa
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Explora estimaciones financieras orientativas con los datos que introduces; comprueba siempre los supuestos y resultados.
                </p>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Estimación ilustrativa:</span>
                    <span className="text-blue-600 dark:text-cyan-400">7,8 % · ejemplo</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-slate-500 dark:text-slate-400">Flujo estimado:</span>
                    <span className="text-amber-600 dark:text-amber-400">+3.450 € · ejemplo / mes</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link href="/demo" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1.5">
                  <span>Ver onboarding guiado</span>
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
                  Gestión de consultas
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  Explora una vista de ejemplo para organizar consultas y revisar la información disponible.
                </p>
                <div className="p-3 bg-emerald-50 dark:bg-cyan-950/40 border border-emerald-200 dark:border-cyan-500/30 rounded-xl text-xs font-semibold text-emerald-800 dark:text-cyan-300">
                  ⚡ Dato de ejemplo · valida cada contacto
                </div>
              </div>
              <div className="pt-6">
                <Link href="/demo" className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline flex items-center gap-1.5">
                  <span>Ver flujo de leads en la demo</span>
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
                  Páginas de propiedad y QR
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed max-w-xl">
                  Cada inmueble cuenta automáticamente con una micro-landing responsive diseñada para capturar el teléfono del comprador, lista para compartir por WhatsApp o escanear mediante código QR.
                </p>
                <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ Formulario de contacto de ejemplo</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ QR descargable en alta resolución</span>
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">✓ Dossier PDF de inversión</span>
                </div>
              </div>
              <div className="pt-6">
                <Link href="/demo" className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1.5">
                  <span>Ver flujo en la demo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. Guided product demo */}
      <section id="demo" className="py-16 w-full bg-slate-50 dark:bg-[#0a0d24] px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">PRUÉBALO ANTES DE DECIDIR</span>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 dark:text-white">Recorre el producto con datos de ejemplo.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">El onboarding guiado enseña el panel, una ficha, el borrador de contenido y los leads. No es necesario registrarse; nada se publica ni se envía.</p>
          </div>
          <Link href="/demo" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-4 text-sm font-black text-white shadow-lg">Abrir onboarding guiado <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>
      {/* 7. Agency Testimonials */}
      <section id="trust" className="py-14 w-full px-6 sm:px-10 lg:px-14 border-b border-slate-200 dark:border-indigo-500/20">
        <div className="w-full max-w-[1600px] mx-auto space-y-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              ['Datos de demostración', 'Las cifras y contactos de ejemplo no representan actividad ni clientes reales.'],
              ['Revisión bajo tu control', 'El contenido generado es un borrador. Revísalo y edítalo antes de compartirlo.'],
              ['Sin publicación automática', 'El recorrido guiado no publica anuncios ni envía mensajes a clientes o portales.']
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-indigo-500/25 dark:bg-[#0c1024]">
                <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{copy}</p>
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
              TARIFAS Y LÍMITES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Planes claros para cada etapa.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              La información de esta página es orientativa. El registro y la gestión de tu cuenta se realizan en la aplicación; revisa allí las condiciones finales antes de contratar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">

            {/* Gratis */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Gratis</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-4xl font-black text-slate-900 dark:text-white">0 €</span><span className="text-xs text-slate-500 dark:text-slate-400">/ mes</span></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Para probar el espacio de trabajo con las herramientas principales.</p>
                <ul className="pt-2 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {['1 usuario', '2 propiedades nuevas por periodo de 365 días', '5 consultas de IA al día', 'Acceso a las herramientas principales'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" /><span>{feature}</span></li>
                  ))}
                </ul>
              </div>
              <a
                href="https://app.inmobia360.com/"
                className="mt-8 w-full block text-center py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition"
              >
                Ir a la aplicación
              </a>
            </div>

            {/* Profesional */}
            <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 dark:bg-[#0f1434] text-white border-2 border-violet-500 shadow-2xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 text-white text-[10px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                Para profesionales
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">Profesional</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-4xl font-black text-white">39 €</span><span className="text-xs text-slate-400">/ mes</span></div>
                </div>
                <p className="text-sm text-slate-300">Más capacidad para el trabajo diario de un agente.</p>
                <ul className="pt-2 space-y-3 text-sm text-slate-200">
                  {['1 usuario', '10 propiedades nuevas por periodo de 365 días', '30 consultas de IA al día', 'Incluye las herramientas principales'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><span>{feature}</span></li>
                  ))}
                </ul>
              </div>
              <a
                href="https://app.inmobia360.com/"
                className="mt-8 w-full block text-center py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white font-black text-xs transition shadow-lg shadow-violet-900/50"
              >
                Ir a la aplicación
              </a>
            </div>

            {/* Agencia */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#0c1024] border border-slate-200 dark:border-indigo-500/30 shadow-md dark:shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Agencia</span>
                  <div className="mt-2 flex items-baseline gap-1"><span className="text-4xl font-black text-slate-900 dark:text-white">99 €</span><span className="text-xs text-slate-500 dark:text-slate-400">/ mes por agencia</span></div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Para equipos pequeños que trabajan con una cartera común.</p>
                <ul className="pt-2 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {['Hasta 5 usuarios', '50 propiedades nuevas por periodo de 365 días, compartidas por la agencia', 'Propiedades y leads compartidos con el equipo', 'Consultas de IA compartidas; el límite se concreta en la aplicación'].map((feature) => (
                    <li key={feature} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-cyan-400" /><span>{feature}</span></li>
                  ))}
                </ul>
              </div>
              <a
                href="https://app.inmobia360.com/"
                className="mt-8 w-full block text-center py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 transition"
              >
                Ir a la aplicación
              </a>
            </div>

          </div>

          <div className="mx-auto max-w-5xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-600 dark:border-indigo-500/25 dark:bg-[#0c1024] dark:text-slate-300 sm:p-7">
            <p><strong className="text-slate-900 dark:text-white">Qué significa “propiedad nueva”:</strong> una ficha de inmueble añadida a la cartera de Inmobia 360. No significa que se publique automáticamente en Idealista, Fotocasa u otros portales.</p>
            <p>Los cupos se renuevan cada 365 días desde el inicio del plan. Vender, alquilar, archivar o eliminar una ficha no devuelve el cupo; reactivar la misma ficha archivada no cuenta como una propiedad nueva.</p>
            <p><strong className="text-slate-900 dark:text-white">Propiedades adicionales:</strong> paquetes sin renovación automática: 1 crédito por 5 €, 5 por 20 € o 10 por 35 €. Cada crédito permite crear una propiedad adicional y vence a los 12 meses desde la compra.</p>
            <p className="border-t border-slate-200 pt-4 text-xs dark:border-slate-800">El registro y la contratación continúan en <a className="font-semibold text-blue-700 underline dark:text-cyan-300" href="https://app.inmobia360.com/">app.inmobia360.com</a>. Comprueba allí la disponibilidad, el límite de IA de Agencia, los impuestos y las condiciones de facturación antes de confirmar una compra.</p>
          </div>

        </div>
      </section>

      {/* 9. Preguntas frecuentes Accordion */}
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
              Prepara tu próxima ficha y conserva el control de cada envío.
            </h2>
            <p className="text-slate-300 text-base max-w-xl mx-auto">
              Empieza por un recorrido guiado con datos de ejemplo. Comprueba cómo se organiza el flujo antes de decidir.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/demo"
                className="flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl text-base font-black transition-all shadow-xl hover:scale-105"
              >
                <span>Ver onboarding guiado</span>
                <ArrowRight className="w-5 h-5 text-cyan-300" />
              </Link>
              <Link
                href="/demo"
                className="flex items-center gap-2 px-7 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-base font-bold transition border border-white/10"
              >
                <span>Ver flujo de leads en la demo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Footer */}
      <footer className="py-12 w-full bg-white dark:bg-[#050711] border-t border-slate-200 dark:border-indigo-500/20 px-6 sm:px-10 lg:px-14 text-xs text-slate-500 dark:text-slate-400">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <BrandLogo variant="full" size="sm" href="/" />

          </div>

          <div className="flex items-center gap-6 font-semibold">
            <Link href="/demo" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Recorrido guiado</Link>
            <Link href="/demo" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Funciones y disponibilidad</Link>
            <Link href="/demo" className="hover:text-blue-600 dark:hover:text-cyan-400 transition">Privacidad en la demo</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
