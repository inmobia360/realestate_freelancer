'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, BadgeCheck, Building2, Check, ClipboardList, Sparkles, Users2 } from 'lucide-react';

const steps = [
  {
    eyebrow: '01 · Tu espacio de trabajo',
    title: 'Empieza con una propiedad de ejemplo',
    description: 'Explora el panel y el catálogo con información ficticia. Puedes recorrer las pantallas sin conectar una agencia ni importar datos de clientes.',
    action: 'Abrir el panel',
    href: '/app/dashboard',
    icon: Building2,
  },
  {
    eyebrow: '02 · Ficha inmobiliaria',
    title: 'Revisa los datos antes de redactar',
    description: 'La ficha reúne precio, superficie, habitaciones y características. La descripción generada debe partir de los datos que introduces y quedar pendiente de tu revisión.',
    action: 'Ver propiedades',
    href: '/app/properties',
    icon: ClipboardList,
  },
  {
    eyebrow: '03 · Borrador para revisar',
    title: 'Prepara contenido y decide tú',
    description: 'Abre el generador para explorar los formatos de contenido. Esta demo no publica anuncios ni envía mensajes a portales o clientes.',
    action: 'Abrir generador',
    href: '/app/content-generator',
    icon: Sparkles,
  },
  {
    eyebrow: '04 · Consultas',
    title: 'Consulta los contactos de ejemplo',
    description: 'Mira cómo se organiza una consulta en el área de leads. Los registros visibles son datos de demostración y no corresponden a clientes reales.',
    action: 'Ver leads',
    href: '/app/leads',
    icon: Users2,
  },
];

export default function DemoPage() {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-5 py-8 text-slate-900 dark:bg-[#080b18] dark:text-slate-100 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-cyan-400">
          <ArrowLeft className="h-4 w-4" /> Volver a Inmobia 360
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-indigo-500/25 dark:bg-[#0c1024]">
          <div className="border-b border-slate-200 px-6 py-5 dark:border-indigo-500/20 sm:px-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-cyan-400">Recorrido guiado · 2 minutos</p>
                <h1 className="mt-2 text-2xl font-black sm:text-3xl">Conoce el flujo antes de registrarte</h1>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/40 dark:text-amber-200">
                <BadgeCheck className="h-4 w-4" /> Demo con datos ficticios
              </span>
            </div>
            <div className="mt-6 flex gap-2" aria-label={`Paso ${step + 1} de ${steps.length}`}>
              {steps.map((item, index) => (
                <button key={item.eyebrow} onClick={() => setStep(index)} aria-label={`Ir al paso ${index + 1}: ${item.title}`} aria-current={index === step ? 'step' : undefined} className={`h-2 flex-1 rounded-full transition ${index <= step ? 'bg-blue-600 dark:bg-cyan-400' : 'bg-slate-200 dark:bg-slate-700'}`} />
              ))}
            </div>
          </div>

          <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10 md:grid-cols-[1fr_0.85fr]">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-300">{current.eyebrow}</p>
              <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 dark:bg-cyan-950/60 dark:text-cyan-300"><Icon className="h-6 w-6" /></div>
              <h2 className="mt-5 text-2xl font-black leading-tight sm:text-3xl">{current.title}</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-600 dark:text-slate-300">{current.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={current.href} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 font-bold text-white shadow-lg shadow-violet-600/20">
                  {current.action}<ArrowRight className="h-4 w-4" />
                </Link>
                {step < steps.length - 1 ? (
                  <button onClick={() => setStep(step + 1)} className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Siguiente paso</button>
                ) : (
                  <button onClick={() => setStep(0)} className="rounded-xl border border-slate-300 px-5 py-3 font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">Repetir recorrido</button>
                )}
              </div>
            </div>

            <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-indigo-500/20 dark:bg-slate-950/50">
              <div className="flex items-center gap-2 text-sm font-bold"><Check className="h-4 w-4 text-emerald-600 dark:text-cyan-400" /> Qué puedes comprobar</div>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <li>Cómo se organiza el panel, las propiedades, el generador y los leads.</li>
                <li>Qué pasos requieren tu revisión antes de compartir contenido.</li>
                <li>Qué partes son una demostración y qué acciones no se ejecutan.</li>
              </ul>
              <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">No se publica ni se envía nada desde este recorrido. Usa datos ficticios; no introduzcas información personal o de clientes.</p>
            </aside>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-xs font-semibold text-slate-500 dark:border-indigo-500/20 dark:text-slate-400 sm:px-10">
            <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} className="disabled:cursor-not-allowed disabled:opacity-40">Paso anterior</button>
            <span>{step + 1} de {steps.length}</span>
            <button onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1} className="disabled:cursor-not-allowed disabled:opacity-40">Siguiente</button>
          </div>
        </section>
      </div>
    </main>
  );
}
