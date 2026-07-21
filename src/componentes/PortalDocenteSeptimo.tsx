'use client';

/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, ExternalLink, Printer, Info } from 'lucide-react';
import { useState } from 'react';
import MaterialCapsulaDocente from '@/componentes/MaterialCapsulaDocente';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';
import UnidadCompletaDocente from '@/componentes/UnidadCompletaDocente';
import MetadatosRea from '@/componentes/MetadatosRea';
import DeclaratoriaUsoIA from '@/componentes/DeclaratoriaUsoIA';
import TourDocente from '@/componentes/TourDocente';
import { capsulasSeptimoPorId } from '@/contenido/capsulasSeptimo';
import { crearNivelesComplejidad, type NivelComplejidadId } from '@/contenido/nivelesComplejidadNoveno';
import {
  referenciaProgramaSeptimo,
  unidadesSeptimo,
} from '@/contenido/constructorPensamientoSeptimo';

const seccionesPortal = [
  ['unidades', 'Unidades'],
  ['fundamentacion', 'Fundamentación'],
  ['programa', 'Programa'],
  ['uso', 'Cómo utilizarlo'],
  ['dua', 'DUA'],
  ['ia', 'IA y ética'],
] as const;

export default function PortalDocenteSeptimo({ logoSrc }: { logoSrc: string }) {
  const [unidadId, setUnidadId] = useState(unidadesSeptimo[0].id);
  const [seccionActiva, setSeccionActiva] = useState('unidades');
  const [tourActivo, setTourActivo] = useState(false);
  const [complejidadPorCapsula, setComplejidadPorCapsula] = useState<Record<string, NivelComplejidadId>>({});
  const unidad = unidadesSeptimo.find((item) => item.id === unidadId) ?? unidadesSeptimo[0];
  const capsula = capsulasSeptimoPorId.get(`7-${unidad.id}`);
  const complejidad = capsula ? (complejidadPorCapsula[capsula.id] ?? 'base') : 'base';
  const nivelesComplejidad = capsula ? crearNivelesComplejidad(capsula) : [];
  const nivelSeleccionado = nivelesComplejidad.find((nivel) => nivel.id === complejidad) ?? nivelesComplejidad[1];
  const indiceSeccion = Math.max(0, seccionesPortal.findIndex(([id]) => id === seccionActiva));
  const seccionAnterior = seccionesPortal[Math.max(0, indiceSeccion - 1)];
  const seccionSiguiente = seccionesPortal[Math.min(seccionesPortal.length - 1, indiceSeccion + 1)];
  const porcentajeAvance = ((indiceSeccion + 1) / seccionesPortal.length) * 100;

  const irASeccion = (id: string) => {
    setSeccionActiva(id);
  };
  const claseSeccion = (id: string) => (seccionActiva === id ? 'portal-docente-panel' : 'hidden');

  return (
    <main
      className="fondo-programacion-educativa min-h-screen text-slate-900"
      style={{ backgroundImage: `url(${logoSrc.replace('logoedytic.jpg', 'imagenes/fondo-programacion-educativa.png')})` }}
    >
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <img src={logoSrc} alt="Logo EDyTIC" className="h-14 w-28 shrink-0 rounded-lg border border-sky-100 bg-white object-contain p-2" />
              <div className="min-w-0"><p className="text-xs font-black uppercase text-[#c66b00]">Recurso docente · Programación EBI</p><h1 className="mt-1 text-2xl font-black text-[#0069aa] sm:text-3xl">Planificación para 7.º año</h1></div>
            </div>
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <ControlesAccesibilidad />
              <nav className="inline-flex rounded-lg border border-sky-100 bg-sky-50 p-1" aria-label="Niveles"><span className="rounded-md bg-[#0069aa] px-3 py-2 text-sm font-bold text-white" aria-current="page">7.º</span><a href="?grado=8vo" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">8.º</a><a href="?grado=9no" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">9.º</a></nav>
              <button type="button" onClick={() => window.print()} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-[#0069aa]" aria-label="Imprimir planificación" title="Imprimir planificación"><Printer size={17} /></button>
            </div>
          </div>
          <nav className="portal-docente-tabs flex gap-2 overflow-x-auto pb-2 text-sm font-bold print:hidden" aria-label="Secciones del recurso">
            {seccionesPortal.map(([id, etiqueta]) => <button key={id} type="button" onClick={() => irASeccion(id)} aria-pressed={seccionActiva === id} className={`portal-docente-tab whitespace-nowrap rounded-lg border px-3 py-2 transition ${seccionActiva === id ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'}`}>{etiqueta}</button>)}
          </nav>
          <div className="print:hidden">
            <div className="h-1 overflow-hidden rounded-full bg-sky-50">
              <div className="h-full rounded-full bg-[#0069aa] transition-all duration-300" style={{ width: `${porcentajeAvance}%` }} />
            </div>
          </div>
        </div>
      </header>

      <div className="portal-docente-shell mx-auto max-w-6xl px-4 py-6 md:px-8">
        <div className="mb-4 flex items-center justify-between gap-3 print:hidden">
          <button type="button" onClick={() => irASeccion(seccionAnterior[0])} disabled={indiceSeccion === 0} className="rounded-lg border border-sky-100 bg-white px-3 py-2 text-sm font-bold text-[#0069aa] shadow-sm transition hover:bg-sky-50 disabled:opacity-40">Anterior</button>
          <p className="text-center text-xs font-black uppercase tracking-wide text-[#c66b00]">{indiceSeccion + 1} de {seccionesPortal.length} · {seccionesPortal[indiceSeccion][1]}</p>
          <button type="button" onClick={() => irASeccion(seccionSiguiente[0])} disabled={indiceSeccion === seccionesPortal.length - 1} className="rounded-lg bg-[#0069aa] px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#005487] disabled:opacity-40">Siguiente</button>
        </div>
        <section id="fundamentacion" className={claseSeccion('fundamentacion')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Punto de partida</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Fundamentación</h2></div><div className="space-y-3 leading-7 text-slate-700"><p>En 7.º el programa pone el énfasis general en alfabetización y ciudadanía digital. Este REA aborda específicamente su componente de algoritmia y programación, relacionándolo con problemas cercanos, uso responsable de datos e impacto de la tecnología.</p><p>El acercamiento es visual, concreto y mediado: se descomponen problemas, se reconocen patrones y se construyen programas sencillos con bloques. El error se trabaja como evidencia y la colaboración como oportunidad para hacer visibles distintas estrategias.</p></div></div></section>

        <section id="programa" className={claseSeccion('programa')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Marco curricular</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Parte del programa</h2></div><div><p className="leading-7 text-slate-700">La organización toma como referencia el programa de Ciencias de la Computación, Tramo 5, ajuste 2024. Las formulaciones siguientes sintetizan contenidos oficiales; la progresión y las actividades son propuestas didácticas del REA.</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{referenciaProgramaSeptimo.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={17} /><span>{item}</span></li>)}</ul><a href="https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0069aa]">Consultar programa oficial <ExternalLink size={15} /></a></div></div></section>

        <section id="uso" className={claseSeccion('uso')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Guía breve</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Cómo utilizar el recurso</h2></div><div><ol className="grid gap-4 sm:grid-cols-2">{['Revisa la progresión y selecciona una unidad según el momento del grupo.', 'Adapta tiempos, tecnologías, apoyos y agrupamiento sin perder el propósito.', 'Previsualiza la secuencia y verifica exactamente qué recibirá el estudiante.', 'Exporta planificación, cuadernillo, evaluación o iframe para CREA.'].map((paso, index) => <li key={paso} className="flex gap-3 leading-6 text-slate-700"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{index + 1}</span><span>{paso}</span></li>)}</ol><div className="mt-5 flex flex-col gap-3 border-l-4 border-[#f7941d] bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-black text-[#9a4f00]">Ejemplo de secuencia desarrollada</h3><p className="mt-1 text-sm leading-6 text-slate-700">El eXeLearning original se conserva como ejemplo reconstruido, no como estructura principal del REA.</p></div><a href="?grado=7mo&secuencia=ejemplo" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#0069aa]">Ver ejemplo <ExternalLink size={15} /></a></div></div></div></section>

        <section id="dua" className={claseSeccion('dua')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Diseño Universal</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Enfoque DUA</h2></div><div className="grid gap-5 md:grid-cols-3">{[['Implicación', 'Problemas cercanos, elección de casos, colaboración y desafíos con extensión opcional.'], ['Representación', 'Tarjetas, diagramas, ejemplos, lenguaje de bloques, pseudocódigo, texto y lectura en voz alta.'], ['Acción y expresión', 'Mapas, algoritmos, dramatizaciones, programas, explicaciones orales y registros de prueba.']].map(([titulo, detalle]) => <div key={titulo}><h3 className="font-black text-slate-950">{titulo}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detalle}</p></div>)}</div></div></section>

        <DeclaratoriaUsoIA className={claseSeccion('ia')} />

        <section id="unidades" className={`${claseSeccion('unidades')} border-b-0`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase text-[#c66b00]">Progresión sugerida</p><h2 className="mt-1 text-2xl font-black text-[#0069aa]">Unidades de 7.º</h2></div><p className="text-sm text-slate-500">Todas las unidades incluyen cuatro momentos configurables.</p></div>
          
          {/* Quick Guide Alert */}
          <div className="mt-4 rounded-xl border border-sky-100 bg-sky-50/50 p-4 print:hidden">
            <div className="flex gap-3">
              <div className="mt-0.5 text-[#0069aa]"><Info size={18} /></div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">¿Cómo funciona esta planificación?</h4>
                <div className="mt-1 text-xs text-slate-600 leading-relaxed space-y-1">
                  <p>1. <strong>Selecciona una unidad</strong> de la progresión sugerida a continuación para ver su material.</p>
                  <p>2. Usa los botones de acción rápida para <strong>Previsualizar</strong>, copiar el <strong>Iframe para CREA</strong> o descargar la <strong>Ficha PDF</strong>.</p>
                  <p>3. Expande las pestañas colapsables inferiores si necesitas <strong>Personalizar la complejidad (con IA)</strong> o revisar la <strong>Secuencia didáctica extendida</strong>.</p>
                </div>
                <button type="button" onClick={() => setTourActivo(true)} className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-[#0069aa] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#005487]">
                  Iniciar tutorial interactivo 🚀
                </button>
              </div>
            </div>
          </div>
          <div id="tour-unidades" className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{unidadesSeptimo.map((item) => <button key={item.id} type="button" onClick={() => setUnidadId(item.id)} aria-pressed={unidad.id === item.id} className={`min-w-0 rounded-lg border p-3 text-left transition ${unidad.id === item.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'}`}><span className={`text-xs font-black uppercase ${unidad.id === item.id ? 'text-sky-100' : 'text-[#c66b00]'}`}>Unidad {item.orden}</span><span className="mt-1 block break-words text-sm font-black leading-5">{item.titulo}</span></button>)}</div>

          <div className="mt-6 border-t-4 border-[#0069aa] bg-white py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase text-[#c66b00]">Unidad {unidad.orden}</p><h3 className="mt-1 text-xl font-black text-slate-950">{unidad.titulo}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-700">{unidad.proposito}</p></div><span className="h-fit rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">{unidad.tiempo}</span></div>
            <dl className="mt-5 grid gap-4 border-y border-sky-100 py-5 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-xs font-black uppercase text-slate-500">Aprendizajes previos</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.previos}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Dificultad frecuente</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.dificultad}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Evidencia</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.evidencia}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Metodología</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.metodologia}</dd></div></dl>
            <div className="mt-4 flex flex-wrap gap-2">{unidad.conceptos.map((concepto) => <span key={concepto} className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{concepto}</span>)}</div>

            {capsula && (
              <div className="mt-6 space-y-4">
                {/* 1. Main Material Card */}
                <div id="tour-acciones">
                  <MaterialCapsulaDocente key={capsula.id} capsula={capsula} grado="7mo" complejidad={complejidad} />
                </div>

                {/* 2. Collapsible Customization and Sequence */}
                <div id="tour-personalizar" className="space-y-4">
                  {/* 2. Collapsible Complexity Selector & Customization */}
                  {nivelSeleccionado && (
                    <details className="rounded-xl border border-sky-100 bg-sky-50 p-4 print:hidden">
                      <summary className="cursor-pointer font-bold text-[#0069aa] select-none hover:text-[#005487]">
                        ⚙️ Personalizar cápsula (Nivel de complejidad y ajustes de IA)
                      </summary>
                      <div className="mt-4 pt-4 border-t border-sky-200">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-xs font-black uppercase text-[#c66b00]">Complejidad para CREA</p>
                            <h4 className="mt-1 font-black text-slate-950">Selecciona qué versión recibirá el estudiante</h4>
                            <p className="mt-1 text-sm leading-6 text-slate-600">{nivelSeleccionado.foco}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {nivelesComplejidad.map((nivel) => (
                              <button key={nivel.id} type="button" onClick={() => setComplejidadPorCapsula((actual) => ({ ...actual, [capsula.id]: nivel.id }))} aria-pressed={complejidad === nivel.id} className={`rounded-lg border px-3 py-2 text-xs font-black transition ${complejidad === nivel.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-sky-200 bg-white text-[#0069aa] hover:border-[#0069aa]'}`}>
                                {nivel.etiqueta}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr_0.8fr]">
                          <div className="rounded-lg bg-white p-3">
                            <p className="text-xs font-black uppercase text-slate-500">Consigna ajustada</p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">{nivelSeleccionado.consigna}</p>
                          </div>
                          <div className="rounded-lg bg-white p-3">
                            <p className="text-xs font-black uppercase text-slate-500">Evidencia esperada</p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">{nivelSeleccionado.evidencia}</p>
                          </div>
                        </div>
                      </div>
                    </details>
                  )}

                  {/* 3. Collapsible Complete Didactic Sequence */}
                  <details className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 print:hidden">
                    <summary className="cursor-pointer font-bold text-emerald-800 select-none hover:text-emerald-955">
                      📋 Ver Secuencia Didáctica Completa y Evaluación (Cuatro momentos y Práctica formativa)
                    </summary>
                    <div className="mt-4 pt-4 border-t border-emerald-200">
                      <div className="rounded-xl bg-white p-4 shadow-sm">
                        <UnidadCompletaDocente key={`completa-${capsula.id}`} capsula={capsula} grado="7mo" />
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            )}

          </div>
        </section>
      </div>
      <MetadatosRea grado="7mo" />
      <footer className="border-t border-sky-100 bg-white px-4 py-4 text-center text-xs font-semibold text-slate-500">Recurso Educativo Abierto para docentes · Programación EBI · 7.º año</footer>
      <TourDocente activo={tourActivo} onClose={() => setTourActivo(false)} grado="7mo" />
    </main>
  );
}
