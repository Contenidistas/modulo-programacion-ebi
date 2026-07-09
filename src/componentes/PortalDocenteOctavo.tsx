'use client';

/* eslint-disable @next/next/no-img-element */
import { CheckCircle2, ExternalLink, Printer } from 'lucide-react';
import { useState } from 'react';
import MaterialCapsulaDocente from '@/componentes/MaterialCapsulaDocente';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';
import UnidadCompletaDocente from '@/componentes/UnidadCompletaDocente';
import MetadatosRea from '@/componentes/MetadatosRea';
import DeclaratoriaUsoIA from '@/componentes/DeclaratoriaUsoIA';
import { capsulasOctavoPorId } from '@/contenido/capsulasOctavo';
import { crearNivelesComplejidad, type NivelComplejidadId } from '@/contenido/nivelesComplejidadNoveno';

type UnidadOctavo = {
  id: string;
  orden: number;
  titulo: string;
  proposito: string;
  previos: string;
  conceptos: string[];
  dificultad: string;
  tiempo: string;
  evidencia: string;
  metodologia: string;
  estado: 'piloto' | 'prevista';
};

const unidades: UnidadOctavo[] = [
  { id: 'sistemas', orden: 1, titulo: 'Dispositivos y sistemas interactivos', proposito: 'Modelar una situación real relacionando entradas, procesos y salidas de un dispositivo.', previos: 'Secuencias, programas sencillos por bloques y reconocimiento de datos.', conceptos: ['Dispositivo', 'Entrada', 'Proceso', 'Salida', 'Interacción'], dificultad: 'Distinguir el dato recibido de la respuesta física o visual.', tiempo: '3 a 4 clases', evidencia: 'Modelo, prototipo, tabla de pruebas y mejora justificada.', metodologia: 'Indagación, prototipado y aprendizaje basado en problemas.', estado: 'piloto' },
  { id: 'eps', orden: 2, titulo: 'Sensores, actuadores y datos', proposito: 'Comprender cómo una placa recolecta datos del entorno y produce acciones mediante actuadores.', previos: 'Sistemas interactivos y algoritmos simples.', conceptos: ['Sensor', 'Actuador', 'Dato', 'Entrada', 'Salida'], dificultad: 'Confundir la medición del sensor con la acción del actuador.', tiempo: '2 a 3 clases', evidencia: 'Diagrama del sistema y pruebas con mediciones diferentes.', metodologia: 'Exploración guiada con placa o simulador.', estado: 'prevista' },
  { id: 'datos', orden: 3, titulo: 'Variables para mediciones', proposito: 'Representar y comparar datos recolectados por sensores mediante bloques y variables.', previos: 'Sensores, actuadores y flujo de información.', conceptos: ['Variable', 'Medición', 'Valor', 'Umbral'], dificultad: 'Interpretar escalas y seguir el cambio de una medición.', tiempo: '2 clases', evidencia: 'Registro de mediciones y programa por bloques.', metodologia: 'Experimentación y análisis de datos.', estado: 'prevista' },
  { id: 'eventos', orden: 4, titulo: 'Eventos y decisiones físicas', proposito: 'Programar respuestas diferentes ante botones, sensores y condiciones del entorno.', previos: 'Variables, mediciones y comparaciones.', conceptos: ['Evento', 'Condición', 'Umbral', 'Respuesta'], dificultad: 'Relacionar cada evento con la respuesta correcta del sistema.', tiempo: '2 a 3 clases', evidencia: 'Prototipo por bloques y pruebas de cada comportamiento.', metodologia: 'Programación por parejas y predicción antes de ejecutar.', estado: 'prevista' },
  { id: 'repeticiones', orden: 5, titulo: 'Control y automatización', proposito: 'Automatizar la lectura del entorno y controlar acciones repetidas de un dispositivo.', previos: 'Eventos, variables y decisiones.', conceptos: ['Repetición', 'Automatismo', 'Estado', 'Condición de salida'], dificultad: 'Evitar comportamientos incontrolados o lecturas sin pausa ni propósito.', tiempo: '2 a 3 clases', evidencia: 'Automatismo probado y explicación del ciclo de control.', metodologia: 'Desafío gradual y simulación de sistemas.', estado: 'prevista' },
  { id: 'pruebas', orden: 6, titulo: 'Prototipos, pruebas y depuración', proposito: 'Usar evidencias para localizar fallas y mejorar una solución que integra bloques y dispositivos.', previos: 'Construcción de comportamientos interactivos.', conceptos: ['Prototipo', 'Prueba', 'Error', 'Depuración'], dificultad: 'Modificar bloques o conexiones sin formular una hipótesis.', tiempo: 'Trabajo transversal', evidencia: 'Bitácora de mediciones, fallas, cambios y nuevas pruebas.', metodologia: 'Clínica de errores y coevaluación.', estado: 'prevista' },
  { id: 'proyecto', orden: 7, titulo: 'Proyecto de robótica educativa', proposito: 'Integrar sensores, actuadores y programación por bloques en una solución interdisciplinaria.', previos: 'Unidades 1 a 6.', conceptos: ['Robótica', 'Integración', 'Iteración', 'Documentación'], dificultad: 'Sostener coherencia entre necesidad, dispositivo, programa y pruebas.', tiempo: '4 a 6 clases', evidencia: 'Prototipo, documentación, pruebas y presentación.', metodologia: 'Aprendizaje basado en proyectos STEAM con hitos de retroalimentación.', estado: 'prevista' },
];

const referenciaPrograma = [
  'Énfasis del grado: uso tecnológico de dispositivos digitales y analógicos para recolectar datos e intervenir en el entorno.',
  'Placas programables, sensores, actuadores, interfaces y proyectos de robótica educativa.',
  'Programación por bloques y transición gradual, mediada y contextualizada hacia comandos textuales.',
  'Procesos iterativos, pruebas, depuración, documentación y desarrollo colaborativo.',
];

const seccionesPortal = [
  ['fundamentacion', 'Fundamentación'],
  ['programa', 'Programa'],
  ['uso', 'Cómo utilizarlo'],
  ['dua', 'DUA'],
  ['ia', 'IA y ética'],
  ['unidades', 'Unidades'],
] as const;

export default function PortalDocenteOctavo({ logoSrc }: { logoSrc: string }) {
  const [unidadId, setUnidadId] = useState(unidades[0].id);
  const [seccionActiva, setSeccionActiva] = useState('fundamentacion');
  const [complejidadPorCapsula, setComplejidadPorCapsula] = useState<Record<string, NivelComplejidadId>>({});
  const unidad = unidades.find((item) => item.id === unidadId) ?? unidades[0];
  const capsula = capsulasOctavoPorId.get(`8-${unidad.id}`);
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
    <main className="fondo-programacion-educativa min-h-screen text-slate-900">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-5 md:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <img src={logoSrc} alt="Logo EDyTIC" className="h-14 w-28 shrink-0 rounded-lg border border-sky-100 bg-white object-contain p-2" />
              <div className="min-w-0"><p className="text-xs font-black uppercase text-[#c66b00]">Recurso docente · Programación EBI</p><h1 className="mt-1 text-2xl font-black text-[#0069aa] sm:text-3xl">Planificación para 8.º año</h1></div>
            </div>
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <ControlesAccesibilidad />
              <nav className="inline-flex rounded-lg border border-sky-100 bg-sky-50 p-1" aria-label="Niveles">
                <a href="?grado=7mo" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">7.º</a><span className="rounded-md bg-[#0069aa] px-3 py-2 text-sm font-bold text-white" aria-current="page">8.º</span><a href="?grado=9no" className="rounded-md px-3 py-2 text-sm font-bold text-slate-600">9.º</a>
              </nav>
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
        <section id="fundamentacion" className={claseSeccion('fundamentacion')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Punto de partida</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Fundamentación</h2></div><div className="space-y-3 leading-7 text-slate-700"><p>En 8.º el foco está en comprender y construir sistemas que recolectan datos mediante dispositivos digitales o analógicos y producen efectos en el entorno. La programación se vincula con placas, sensores, actuadores, automatismos y robótica educativa.</p><p>El abordaje principal es gráfico y experimental mediante MakeCode u otros lenguajes por bloques. El programa habilita una introducción mediada a comandos textuales, pero en este REA se reserva como ampliación gradual; la profundización textual corresponde especialmente a 9.º.</p></div></div></section>

        <section id="programa" className={claseSeccion('programa')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Marco curricular</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Parte del programa</h2></div><div><p className="leading-7 text-slate-700">La progresión toma como referencia el programa de Ciencias de la Computación, Tramo 5, ajuste 2024. Se distingue el énfasis tecnológico oficial de las sugerencias didácticas del REA.</p><ul className="mt-4 grid gap-3 sm:grid-cols-2">{referenciaPrograma.map((item) => <li key={item} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={17} /><span>{item}</span></li>)}</ul><a href="https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0069aa]">Consultar programa oficial <ExternalLink size={15} /></a></div></div></section>

        <section id="uso" className={claseSeccion('uso')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Guía breve</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Cómo utilizar el recurso</h2></div><div><ol className="grid gap-4 sm:grid-cols-2">{['Selecciona una unidad según los aprendizajes previos y el contexto del grupo.', 'Revisa propósito, dificultades, metodología y evidencias antes de elegir actividades.', 'Configura contexto y agrupamiento; selecciona y ordena sus cuatro momentos.', 'Exporta planificación, cuadernillo, evaluación o iframe para CREA.'].map((paso, index) => <li key={paso} className="flex gap-3 leading-6 text-slate-700"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{index + 1}</span><span>{paso}</span></li>)}</ol><div className="mt-5 flex flex-col gap-3 border-l-4 border-[#f7941d] bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="font-black text-[#9a4f00]">Ejemplo de secuencia desarrollada</h3><p className="mt-1 text-sm leading-6 text-slate-700">El eXeLearning original se conserva como referencia y aparece reconstruido con la interfaz del REA.</p></div><a href="?grado=8vo&secuencia=ejemplo" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-[#0069aa]">Ver ejemplo <ExternalLink size={15} /></a></div></div></div></section>

        <section id="dua" className={claseSeccion('dua')}><div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]"><div><p className="text-xs font-black uppercase text-[#c66b00]">Diseño Universal</p><h2 className="mt-1 text-xl font-black text-[#0069aa]">Enfoque DUA</h2></div><div className="grid gap-5 md:grid-cols-3">{[['Implicación', 'Problemas cercanos, elección de dispositivo o simulación, desafíos graduados y colaboración.'], ['Representación', 'Sistemas físicos, bloques visuales, diagramas, simulaciones, mediciones, audio y vocabulario contextual.'], ['Acción y expresión', 'Prototipos físicos o de papel, programas por bloques, registros de datos, explicaciones y pruebas.']].map(([titulo, detalle]) => <div key={titulo}><h3 className="font-black text-slate-950">{titulo}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{detalle}</p></div>)}</div></div></section>

        <DeclaratoriaUsoIA className={claseSeccion('ia')} />

        <section id="unidades" className={`${claseSeccion('unidades')} border-b-0`}>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase text-[#c66b00]">Progresión sugerida</p><h2 className="mt-1 text-2xl font-black text-[#0069aa]">Unidades de 8.º</h2></div><p className="text-sm text-slate-500">Todas las unidades incluyen cuatro momentos configurables.</p></div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{unidades.map((item) => <button key={item.id} type="button" onClick={() => setUnidadId(item.id)} aria-pressed={unidad.id === item.id} className={`min-w-0 rounded-lg border p-3 text-left transition ${unidad.id === item.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'}`}><span className={`text-xs font-black uppercase ${unidad.id === item.id ? 'text-sky-100' : 'text-[#c66b00]'}`}>Unidad {item.orden}</span><span className="mt-1 block break-words text-sm font-black leading-5">{item.titulo}</span></button>)}</div>

          <div className="mt-6 border-t-4 border-[#0069aa] bg-white py-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-black uppercase text-[#c66b00]">Unidad {unidad.orden}</p><h3 className="mt-1 text-xl font-black text-slate-950">{unidad.titulo}</h3><p className="mt-2 max-w-3xl leading-7 text-slate-700">{unidad.proposito}</p></div><span className="h-fit rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">{unidad.tiempo}</span></div>
            <dl className="mt-5 grid gap-4 border-y border-sky-100 py-5 sm:grid-cols-2 lg:grid-cols-4"><div><dt className="text-xs font-black uppercase text-slate-500">Aprendizajes previos</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.previos}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Dificultad frecuente</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.dificultad}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Evidencia</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.evidencia}</dd></div><div><dt className="text-xs font-black uppercase text-slate-500">Metodología</dt><dd className="mt-1 text-sm leading-6 text-slate-700">{unidad.metodologia}</dd></div></dl>
            <div className="mt-4 flex flex-wrap gap-2">{unidad.conceptos.map((concepto) => <span key={concepto} className="rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-800">{concepto}</span>)}</div>

            {capsula && nivelSeleccionado && (
              <div className="mt-5 rounded-lg border border-sky-100 bg-sky-50 p-4">
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
            )}

            {capsula && <MaterialCapsulaDocente key={capsula.id} capsula={capsula} grado="8vo" complejidad={complejidad} />}
            {capsula && <UnidadCompletaDocente key={`completa-${capsula.id}`} capsula={capsula} grado="8vo" />}

          </div>
        </section>
      </div>
      <MetadatosRea grado="8vo" />
      <footer className="border-t border-sky-100 bg-white px-4 py-4 text-center text-xs font-semibold text-slate-500">Recurso Educativo Abierto para docentes · Programación EBI · 8.º año</footer>
    </main>
  );
}
