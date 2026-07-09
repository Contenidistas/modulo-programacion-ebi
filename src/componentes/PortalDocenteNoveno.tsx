'use client';

/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, Copy, ExternalLink, Eye, Lightbulb, Printer } from 'lucide-react';
import { useEffect, useState } from 'react';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';
import UnidadCompletaDocente from '@/componentes/UnidadCompletaDocente';
import MetadatosRea from '@/componentes/MetadatosRea';
import DeclaratoriaUsoIA from '@/componentes/DeclaratoriaUsoIA';
import RubricaAnaliticaNoveno from '@/componentes/RubricaAnaliticaNoveno';
import { capsulasNovenoPorId, crearPromptTutorCapsula } from '@/contenido/capsulasNoveno';
import { obtenerRubricaNoveno } from '@/contenido/rubricasNoveno';
import { crearNivelesComplejidad, etiquetasNivelComplejidad, type NivelComplejidadId } from '@/contenido/nivelesComplejidadNoveno';
import { variantesTecnologicasNoveno } from '@/contenido/variantesTecnologicasNoveno';
import { construirUrlRea } from '@/utilidades/urlPublicaRea';

type UnidadNoveno = {
  id: string;
  orden: number;
  titulo: string;
  proposito: string;
  tiempo: string;
  capsulas: string[];
};

const unidades: UnidadNoveno[] = [
  { id: 'algoritmos', orden: 1, titulo: 'Algoritmos y pseudocódigo', proposito: 'Diseñar soluciones antes de implementarlas y anticipar cómo serán probadas.', tiempo: '1 a 2 clases', capsulas: ['9-algoritmos'] },
  { id: 'datos', orden: 2, titulo: 'Variables, constantes y tipos', proposito: 'Modelar información distinguiendo datos que cambian, reglas estables y representaciones adecuadas.', tiempo: '2 a 3 clases', capsulas: ['9-variables', '9-constantes', '9-tipos-datos'] },
  { id: 'interaccion', orden: 3, titulo: 'Entrada, validación y salida', proposito: 'Construir programas que reciban datos, los validen y comuniquen resultados comprensibles.', tiempo: '2 clases', capsulas: ['9-entrada-datos', '9-salida-datos'] },
  { id: 'seleccion', orden: 4, titulo: 'Estructuras selectivas', proposito: 'Representar decisiones simples y compuestas mediante condiciones verificables.', tiempo: '1 a 2 clases', capsulas: ['9-estructuras-selectivas'] },
  { id: 'repeticion', orden: 5, titulo: 'Estructuras repetitivas', proposito: 'Automatizar procesos identificando patrones, condiciones de salida, contadores y acumuladores.', tiempo: '1 a 2 clases', capsulas: ['9-estructuras-repetitivas'] },
  { id: 'funciones', orden: 6, titulo: 'Funciones y modularidad', proposito: 'Descomponer programas en tareas con parámetros, responsabilidades y resultados claros.', tiempo: '1 a 2 clases', capsulas: ['9-funciones'] },
  { id: 'colecciones', orden: 7, titulo: 'Listas y colecciones', proposito: 'Organizar y procesar conjuntos de datos relacionados mediante recorridos.', tiempo: '1 a 2 clases', capsulas: ['9-listas'] },
  { id: 'depuracion', orden: 8, titulo: 'Prueba, depuración y mejora', proposito: 'Usar errores, casos de prueba y evidencias para revisar una solución con autonomía creciente.', tiempo: 'Trabajo transversal', capsulas: ['9-depuracion'] },
];

const referenciaPrograma = [
  'Lenguajes de programación textual para videojuegos, aplicaciones o páginas.',
  'Procedimientos, funciones, comandos, expresiones y estructuras de datos.',
  'Fases del desarrollo de software, validación, pruebas, documentación y trabajo colaborativo.',
];

const seccionesPortal = [
  ['fundamentacion', 'Fundamentación'],
  ['programa', 'Programa'],
  ['uso', 'Cómo utilizarlo'],
  ['dua', 'DUA'],
  ['ia', 'IA y ética'],
  ['unidades', 'Unidades'],
] as const;

export default function PortalDocenteNoveno({ logoSrc }: { logoSrc: string }) {
  const [unidadId, setUnidadId] = useState(unidades[0].id);
  const [copiado, setCopiado] = useState<string | null>(null);
  const [promptsEditados, setPromptsEditados] = useState<Record<string, string>>({});
  const [complejidadPorCapsula, setComplejidadPorCapsula] = useState<Record<string, NivelComplejidadId>>({});
  const [seccionActiva, setSeccionActiva] = useState('fundamentacion');
  const unidad = unidades.find((item) => item.id === unidadId) ?? unidades[0];
  const materiales = unidad.capsulas.map((id) => capsulasNovenoPorId.get(id)).filter(Boolean);
  const indiceSeccion = Math.max(0, seccionesPortal.findIndex(([id]) => id === seccionActiva));
  const seccionAnterior = seccionesPortal[Math.max(0, indiceSeccion - 1)];
  const seccionSiguiente = seccionesPortal[Math.min(seccionesPortal.length - 1, indiceSeccion + 1)];
  const porcentajeAvance = ((indiceSeccion + 1) / seccionesPortal.length) * 100;

  useEffect(() => {
    let guardados: Record<string, string> = {};
    try {
      guardados = JSON.parse(window.localStorage.getItem('rea-prompts-9no') ?? '{}') as Record<string, string>;
    } catch {
      window.localStorage.removeItem('rea-prompts-9no');
    }
    const temporizador = window.setTimeout(() => setPromptsEditados(guardados), 0);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('rea-prompts-9no', JSON.stringify(promptsEditados));
  }, [promptsEditados]);

  const obtenerComplejidadCapsula = (id: string) => complejidadPorCapsula[id] ?? 'base';

  const urlCapsula = (id: string, imprimir = false, publica = false, complejidad: NivelComplejidadId = obtenerComplejidadCapsula(id)) => {
    const parametros = new URLSearchParams({ grado: '9no', interfaz: 'alumno', capsula: id });
    parametros.set('complejidad', complejidad);
    if (imprimir) parametros.set('imprimir', '1');
    return construirUrlRea(parametros, publica);
  };

  const copiarIframe = async (id: string, titulo: string) => {
    const iframe = `<iframe src="${urlCapsula(id, false, true)}" title="Cápsula de aprendizaje: ${titulo}" width="100%" height="760" style="border:0; border-radius:8px;" loading="lazy" allow="microphone"></iframe>`;
    await navigator.clipboard.writeText(iframe);
    setCopiado(`iframe-${id}`);
    window.setTimeout(() => setCopiado(null), 2400);
  };

  const copiarPrompt = async (id: string, prompt: string) => {
    await navigator.clipboard.writeText(prompt);
    setCopiado(`prompt-${id}`);
    window.setTimeout(() => setCopiado(null), 2400);
  };

  const irASeccion = (id: string) => {
    setSeccionActiva(id);
  };

  const claseSeccion = (id: string) => (seccionActiva === id ? 'portal-docente-panel' : 'hidden');

  return (
    <main className="fondo-programacion-educativa min-h-screen text-slate-900">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <img src={logoSrc} alt="Logo EDyTIC" className="h-14 w-28 shrink-0 rounded-lg border border-sky-100 bg-white object-contain p-2" />
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-[#c66b00]">Recurso docente · Programación EBI</p>
                <h1 className="mt-1 text-2xl font-black text-[#0069aa] sm:text-3xl">Planificación para 9.º año</h1>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <ControlesAccesibilidad />
              <nav className="inline-flex rounded-lg border border-sky-100 bg-sky-50 p-1" aria-label="Niveles">
                <a href="?grado=7mo&interfaz=docente&sector=todo" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">7.º</a>
                <a href="?grado=8vo&interfaz=docente&sector=todo" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">8.º</a>
                <span className="rounded-md bg-[#0069aa] px-3 py-2 text-sm font-bold text-white" aria-current="page">9.º</span>
              </nav>
              <button type="button" onClick={() => window.print()} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-[#0069aa]" aria-label="Imprimir planificación" title="Imprimir planificación">
                <Printer size={17} />
              </button>
            </div>
          </div>
          <nav className="portal-docente-tabs flex gap-2 overflow-x-auto pb-2 text-sm font-bold print:hidden" aria-label="Secciones del recurso">
            {seccionesPortal.map(([id, etiqueta]) => (
              <button
                key={id}
                type="button"
                onClick={() => irASeccion(id)}
                aria-pressed={seccionActiva === id}
                className={`portal-docente-tab whitespace-nowrap rounded-lg border px-3 py-2 transition ${
                  seccionActiva === id ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                {etiqueta}
              </button>
            ))}
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
        <section id="fundamentacion" className={claseSeccion('fundamentacion')}>
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Punto de partida</p>
              <h2 className="mt-1 text-xl font-black text-[#0069aa]">Fundamentación</h2>
            </div>
            <div className="space-y-3 leading-7 text-slate-700">
              <p>La programación se aborda como un proceso de resolución de problemas: comprender, diseñar, implementar, probar, comunicar y mejorar. El código es una forma de expresar decisiones, no el único resultado esperado.</p>
              <p>La propuesta favorece la autonomía progresiva, el trabajo colaborativo y el uso del error como evidencia para revisar estrategias. Las tecnologías se seleccionan según el propósito y las condiciones del grupo.</p>
            </div>
          </div>
        </section>

        <section id="programa" className={claseSeccion('programa')}>
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Marco curricular</p>
              <h2 className="mt-1 text-xl font-black text-[#0069aa]">Parte del programa</h2>
            </div>
            <div>
              <p className="leading-7 text-slate-700">La organización toma como referencia el eje de algoritmia, programación, robótica y problemas computacionales de 9.º EBI.</p>
              <ul className="mt-4 grid gap-3 md:grid-cols-3">
                {referenciaPrograma.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={17} /><span>{item}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section id="uso" className={claseSeccion('uso')}>
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Guía breve</p>
              <h2 className="mt-1 text-xl font-black text-[#0069aa]">Cómo utilizar el recurso</h2>
            </div>
            <div>
              <ol className="grid gap-4 sm:grid-cols-2">
                {[
                  'Revisa la progresión y selecciona una unidad según el momento del grupo.',
                  'Abre los materiales y adapta tiempos, tecnologías, consignas y apoyos.',
                  'Previsualiza la cápsula que recibirá el estudiante.',
                  'Copia el iframe para CREA o genera una versión imprimible.',
                ].map((paso, index) => <li key={paso} className="flex gap-3 leading-6 text-slate-700"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{index + 1}</span><span>{paso}</span></li>)}
              </ol>
              <div className="mt-5 flex flex-col gap-3 border-l-4 border-[#f7941d] bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-black text-[#9a4f00]">Ejemplo de secuencia desarrollada</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-700">Los materiales eXeLearning se conservan como referencia de una posible secuencia, no como estructura principal del REA.</p>
                </div>
                <a href="?grado=9no&secuencia=ejemplo" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#0069aa]">
                  Ver ejemplo <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="dua" className={claseSeccion('dua')}>
          <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Diseño Universal</p>
              <h2 className="mt-1 text-xl font-black text-[#0069aa]">Enfoque DUA</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                ['Implicación', 'Situaciones significativas, posibilidad de elección, desafíos graduados y colaboración.'],
                ['Representación', 'Textos breves, ejemplos, código, lectura en voz alta y apoyos visuales.'],
                ['Acción y expresión', 'Código, pseudocódigo, explicaciones, pruebas, producciones y evidencias alternativas.'],
              ].map(([titulo, detalle]) => <div key={titulo}><h3 className="font-black text-slate-950">{titulo}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detalle}</p></div>)}
            </div>
          </div>
        </section>

        <DeclaratoriaUsoIA className={claseSeccion('ia')} />

        <section id="unidades" className={`${claseSeccion('unidades')} border-b-0`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Progresión sugerida</p>
              <h2 className="mt-1 text-2xl font-black text-[#0069aa]">Unidades de 9.º</h2>
            </div>
            <p className="text-sm text-slate-500">Selecciona una unidad para ver sus materiales.</p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {unidades.map((item) => (
              <button key={item.id} type="button" onClick={() => setUnidadId(item.id)} aria-pressed={unidad.id === item.id} className={`min-w-0 rounded-lg border p-3 text-left transition ${unidad.id === item.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'}`}>
                <span className={`text-xs font-black uppercase ${unidad.id === item.id ? 'text-sky-100' : 'text-[#c66b00]'}`}>Unidad {item.orden}</span>
                <span className="mt-1 block break-words text-sm font-black leading-5">{item.titulo}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 border-t-4 border-[#0069aa] bg-white py-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-black uppercase text-[#c66b00]">Unidad {unidad.orden}</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">{unidad.titulo}</h3>
                <p className="mt-2 max-w-3xl leading-7 text-slate-700">{unidad.proposito}</p>
              </div>
              <span className="h-fit rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">{unidad.tiempo}</span>
            </div>

            <div className="mt-6 space-y-3">
              <h4 className="font-black text-slate-950">Materiales preparados</h4>
              {materiales.map((capsula) => {
                if (!capsula) return null;
                const variantes = variantesTecnologicasNoveno[capsula.id] ?? [];
                const prompt = promptsEditados[capsula.id] ?? crearPromptTutorCapsula(capsula);
                const rubrica = obtenerRubricaNoveno(capsula.id);
                const complejidad = obtenerComplejidadCapsula(capsula.id);
                const nivelesComplejidad = crearNivelesComplejidad(capsula);
                const nivelSeleccionado = nivelesComplejidad.find((nivel) => nivel.id === complejidad) ?? nivelesComplejidad[1];

                return (
                  <article key={capsula.id} className="border-t border-slate-200 py-5">
                    <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <p className="text-xs font-bold uppercase text-emerald-700">{capsula.concepto}</p>
                        <h5 className="mt-1 font-black text-slate-950">{capsula.titulo}</h5>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{capsula.sintesis}</p>
                        <p className="mt-2 text-sm font-semibold text-slate-700">Consigna: {nivelSeleccionado.consigna}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <a href={urlCapsula(capsula.id)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-2 text-xs font-bold text-[#0069aa]"><Eye size={14} />Previsualizar</a>
                        <button type="button" onClick={() => copiarIframe(capsula.id, capsula.titulo)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0069aa] px-3 py-2 text-xs font-bold text-white"><Copy size={14} />{copiado === `iframe-${capsula.id}` ? 'Copiado' : 'Iframe'}</button>
                        <a href={urlCapsula(capsula.id, true)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-3 py-2 text-xs font-bold text-[#a65300]"><Printer size={14} />PDF</a>
                      </div>
                    </div>

                    <section className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <p className="text-xs font-black uppercase text-emerald-700">Complejidad para CREA</p>
                          <h6 className="mt-1 font-black text-emerald-950">Selecciona qué versión compartirá esta cápsula</h6>
                          <p className="mt-1 text-sm leading-6 text-slate-700">{nivelSeleccionado.foco}</p>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[420px]">
                          {nivelesComplejidad.map((nivel) => (
                            <button
                              key={nivel.id}
                              type="button"
                              onClick={() => setComplejidadPorCapsula((actuales) => ({ ...actuales, [capsula.id]: nivel.id }))}
                              className={`rounded-lg border px-3 py-2 text-left text-xs font-bold transition ${
                                complejidad === nivel.id
                                  ? 'border-emerald-700 bg-emerald-700 text-white'
                                  : 'border-emerald-100 bg-white text-emerald-900 hover:border-emerald-300'
                              }`}
                              aria-pressed={complejidad === nivel.id}
                            >
                              {nivel.etiqueta}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_0.8fr]">
                        <p className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong>Consigna:</strong> {nivelSeleccionado.consigna}</p>
                        <p className="rounded-lg bg-white p-3 text-sm leading-6 text-slate-700"><strong>Evidencia:</strong> {nivelSeleccionado.evidencia}</p>
                      </div>
                      <p className="mt-2 text-xs font-semibold text-emerald-900">
                        Los botones Previsualizar, Iframe y PDF usan ahora el nivel {etiquetasNivelComplejidad[complejidad].toLowerCase()}.
                      </p>
                    </section>

                    <div className="mt-4 grid gap-3 lg:grid-cols-2">
                      <details className="rounded-lg border border-sky-100 bg-sky-50 p-3">
                        <summary className="cursor-pointer font-bold text-[#0069aa]">Tres formas de realizar la misma actividad</summary>
                        <div className="mt-4 space-y-4">
                          {variantes.map((variante) => (
                            <section key={variante.tecnologia} className="border-t border-sky-100 pt-3">
                              <h6 className="font-black text-slate-900">{variante.tecnologia}</h6>
                              <p className="mt-1 text-xs leading-5 text-slate-600">{variante.explicacion}</p>
                              <pre className="mt-2 max-w-full overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs leading-5 text-sky-100"><code>{variante.codigo}</code></pre>
                            </section>
                          ))}
                        </div>
                      </details>

                      <details className="rounded-lg border border-violet-100 bg-violet-50 p-3">
                        <summary className="cursor-pointer font-bold text-violet-900">Prompt de tutoría ética y reflexiva</summary>
                        <p className="mt-3 text-xs leading-5 text-violet-900">Protege la autoría del estudiante, ofrece pistas graduales y exige explicar y verificar lo producido.</p>
                        <label className="mt-3 block text-xs font-bold text-violet-950" htmlFor={`prompt-${capsula.id}`}>Prompt editable</label>
                        <textarea id={`prompt-${capsula.id}`} value={prompt} onChange={(event) => setPromptsEditados((actuales) => ({ ...actuales, [capsula.id]: event.target.value }))} rows={12} className="mt-2 w-full resize-y rounded-lg border border-violet-100 bg-white p-3 text-xs leading-5 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
                        <button type="button" onClick={() => copiarPrompt(capsula.id, prompt)} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet-800 px-3 py-2 text-xs font-bold text-white">
                          <Lightbulb size={14} />
                          {copiado === `prompt-${capsula.id}` ? 'Prompt copiado' : 'Copiar prompt'}
                        </button>
                      </details>
                    </div>
                    {rubrica && (
                      <div className="mt-4">
                        <RubricaAnaliticaNoveno rubrica={rubrica} compacta editable />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
            <div className="mt-7 space-y-4">
              {materiales.map((capsula) => capsula && <details key={`completa-${capsula.id}`} className="rounded-lg border border-emerald-100 bg-white p-4"><summary className="cursor-pointer font-black text-emerald-900">Desarrollar secuencia completa: {capsula.titulo}</summary><UnidadCompletaDocente capsula={capsula} grado="9no" /></details>)}
            </div>
          </div>
        </section>
      </div>

      <MetadatosRea grado="9no" />

      <footer className="border-t border-sky-100 bg-white px-4 py-4 text-center text-xs font-semibold text-slate-500">
        Recurso Educativo Abierto para docentes · Programación EBI · 9.º año
      </footer>
    </main>
  );
}
