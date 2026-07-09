'use client';

import { BookOpen, CheckCircle2, CheckSquare2, ChevronLeft, ChevronRight, Eye, FileText, Printer, RotateCcw, Square, Type, Volume2, Wrench, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';
import { variantesTecnologicasNoveno } from '@/contenido/variantesTecnologicasNoveno';
import { generarEjerciciosCapsula } from '@/contenido/unidadCompleta';
import ZonaActiva from '@/componentes/ZonaActiva';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';
import PanelDuaEstudiante from '@/componentes/PanelDuaEstudiante';
import RubricaAnaliticaNoveno from '@/componentes/RubricaAnaliticaNoveno';
import { mezclarOpciones } from '@/utilidades/opciones';
import { glosarioProgramacion } from '@/contenido/glosarioProgramacion';
import { obtenerRubricaNoveno } from '@/contenido/rubricasNoveno';
import { esNivelComplejidad, obtenerNivelComplejidad } from '@/contenido/nivelesComplejidadNoveno';

type SeccionCapsula = 'propuesta' | 'informacion' | 'ejemplos' | 'actividad' | 'verificacion';

const secciones: { id: SeccionCapsula; etiqueta: string; icono: typeof BookOpen }[] = [
  { id: 'propuesta', etiqueta: 'Leo la propuesta', icono: FileText },
  { id: 'informacion', etiqueta: 'Consulto información', icono: BookOpen },
  { id: 'ejemplos', etiqueta: 'Miro ejemplos', icono: Eye },
  { id: 'actividad', etiqueta: 'Realizo actividades', icono: Wrench },
  { id: 'verificacion', etiqueta: 'Verifico salidas', icono: CheckSquare2 },
];

export default function CapsulaEstudiante({ capsula }: { capsula: CapsulaNoveno }) {
  const [seccion, setSeccion] = useState<SeccionCapsula>('propuesta');
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [verificada, setVerificada] = useState(false);
  const [lecturaActiva, setLecturaActiva] = useState(false);
  const [textoGrande, setTextoGrande] = useState(false);
  const [glosarioAbierto, setGlosarioAbierto] = useState(false);
  const parametros = typeof window === 'undefined' ? new URLSearchParams() : new URLSearchParams(window.location.search);
  const complejidadUrl = parametros.get('complejidad');
  const nivelComplejidad = obtenerNivelComplejidad(capsula, esNivelComplejidad(complejidadUrl) ? complejidadUrl : 'base');

  useEffect(() => {
    const imprimirAlAbrir = new URLSearchParams(window.location.search).get('imprimir') === '1';
    if (!imprimirAlAbrir) return;

    const temporizador = window.setTimeout(() => window.print(), 450);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const variantesNoveno = variantesTecnologicasNoveno[capsula.id]?.map((variante) => ({
    ...variante,
    titulo: `Ejemplo en ${variante.tecnologia}`,
  }));
  const ejemplosTecnologia: NonNullable<CapsulaNoveno['ejemplosTecnologia']> = variantesNoveno ?? capsula.ejemplosTecnologia ?? [{
    tecnologia: capsula.teoria.lenguaje,
    titulo: 'Ejemplo base',
    explicacion: capsula.teoria.ejemplo,
    codigo: capsula.teoria.codigo,
  }];

  const textoLectura = () => {
    if (seccion === 'propuesta') {
      return `${capsula.preguntaGuia}. ${capsula.practica.situacion}. Nivel ${nivelComplejidad.etiqueta}. Consigna: ${nivelComplejidad.consigna}.`;
    }

    if (seccion === 'actividad') {
      return `${capsula.practica.titulo}. ${capsula.practica.situacion}. Nivel ${nivelComplejidad.etiqueta}. Consigna: ${nivelComplejidad.consigna}. Pasos: ${capsula.practica.pasos.join('. ')}.`;
    }

    if (seccion === 'ejemplos') {
      return `Ejemplos por tecnología. ${ejemplosTecnologia.map((ejemplo) => `${ejemplo.tecnologia}. ${ejemplo.explicacion}`).join('. ')}`;
    }

    if (seccion === 'verificacion') {
      return `Verificación de salidas. ${(capsula.criteriosVerificacion ?? []).join('. ')}. Autoevaluación. ${capsula.autoevaluacion.map((pregunta) => pregunta.enunciado).join('. ')}`;
    }

    return `${capsula.titulo}. ${capsula.teoria.definicion}. Ideas clave: ${capsula.teoria.ideasClave.join('. ')}. Ejemplo: ${capsula.teoria.ejemplo}.`;
  };

  const alternarLectura = () => {
    if (!('speechSynthesis' in window)) return;

    if (lecturaActiva) {
      window.speechSynthesis.cancel();
      setLecturaActiva(false);
      return;
    }

    const lectura = new SpeechSynthesisUtterance(textoLectura());
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLecturaActiva(false);
    lectura.onerror = () => setLecturaActiva(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLecturaActiva(true);
  };

  const seleccionarSeccion = (destino: SeccionCapsula) => {
    window.speechSynthesis?.cancel();
    setLecturaActiva(false);
    setSeccion(destino);
  };
  const indiceSeccion = secciones.findIndex((item) => item.id === seccion);
  const cambiarSeccion = (direccion: -1 | 1) => {
    const destino = secciones[Math.min(secciones.length - 1, Math.max(0, indiceSeccion + direccion))];
    seleccionarSeccion(destino.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const correctas = capsula.autoevaluacion.reduce(
    (total, pregunta, index) => total + (respuestas[index] === pregunta.correcta ? 1 : 0),
    0,
  );
  const todasRespondidas = capsula.autoevaluacion.every((_, index) => respuestas[index] !== undefined);
  const ejerciciosZonaActiva = generarEjerciciosCapsula(capsula);
  const criterioDua = capsula.criteriosVerificacion?.[0] ?? capsula.practica.evidencia;
  const rubrica = obtenerRubricaNoveno(capsula.id);
  const estructuraParcialDua = [
    `Propósito: ${capsula.practica.titulo}`,
    'Datos, materiales o elementos necesarios: ...',
    `Primer paso: ${capsula.practica.pasos[0] ?? '...'}`,
    'Decisión, relación o repetición importante: ...',
    'Prueba que realizaré: ...',
    'Explicación de una mejora: ...',
  ].join('\n');

  const reiniciarAutoevaluacion = () => {
    setRespuestas({});
    setVerificada(false);
  };

  return (
    <main className={`min-h-screen bg-[#f7fbff] text-slate-900 ${textoGrande ? 'text-[1.08rem]' : ''}`}>
      <header className="capsula-hero border-b border-sky-100">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-[#c66b00]">Cápsula de aprendizaje · {capsula.gradoTexto ?? '9.º año'} · Unidad {capsula.orden}</p>
              <h1 className="mt-2 text-2xl font-black text-[#0069aa] sm:text-3xl">{capsula.titulo}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{capsula.sintesis}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2 print:hidden">
              <ControlesAccesibilidad mostrarLectura={false} mostrarTexto={false} />
              <button
                type="button"
                onClick={alternarLectura}
                className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-xs font-bold text-white ${lecturaActiva ? 'bg-rose-600' : 'bg-[#0069aa]'}`}
              >
                {lecturaActiva ? <Square size={15} /> : <Volume2 size={16} />}
                {lecturaActiva ? 'Detener' : 'Escuchar'}
              </button>
              <button
                type="button"
                onClick={() => setTextoGrande((valor) => !valor)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-[#0069aa]"
                aria-label={textoGrande ? 'Usar tamaño de texto normal' : 'Aumentar tamaño del texto'}
                title={textoGrande ? 'Texto normal' : 'Texto grande'}
              >
                <Type size={17} />
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-[#0069aa]"
                aria-label="Imprimir o guardar como PDF"
                title="Imprimir o guardar como PDF"
              >
                <Printer size={17} />
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-lg border border-sky-100 bg-white/80 p-4 shadow-sm sm:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs font-bold uppercase text-slate-500">Pregunta guía</p>
              <p className="mt-1 font-semibold leading-6 text-slate-800">{capsula.preguntaGuia}</p>
            </div>
            <div className="flex self-start flex-wrap items-start gap-2 sm:max-w-xs sm:justify-end">
              {ejemplosTecnologia.map((ejemplo) => (
                <span key={ejemplo.tecnologia} className="inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-md border border-emerald-100 bg-emerald-50 px-3 text-xs font-bold leading-none text-emerald-800">
                  {ejemplo.tecnologia}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <PanelDuaEstudiante
        id={capsula.id}
        titulo={capsula.titulo}
        concepto={capsula.concepto}
        preguntaOrientadora={capsula.preguntaGuia}
        ejemploAnalogo={capsula.teoria.ejemplo}
        estructuraParcial={estructuraParcialDua}
        desafioBasico={nivelComplejidad.consigna}
        desafioAmpliado={nivelComplejidad.id === 'extendido' ? nivelComplejidad.consigna : `${nivelComplejidad.consigna} Agrega una variante y explica una mejora posible.`}
        conDispositivo={`Puedes utilizar ${capsula.tecnologias.join(', ')} o una herramienta equivalente para construir y probar.`}
        sinDispositivo="Representa la solución con tarjetas, dibujos, una tabla o una simulación corporal; otra persona debe poder seguirla y comprobarla."
        criterio={criterioDua}
        nivelFijado={nivelComplejidad.id === 'acompanado' ? 'basico' : nivelComplejidad.id === 'extendido' ? 'ampliado' : undefined}
      />

      <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6">
        <div className="mb-3 flex items-center gap-3 print:hidden"><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-sky-100"><div className="h-full bg-emerald-600 transition-all" style={{ width: `${((indiceSeccion + 1) / secciones.length) * 100}%` }} /></div><button type="button" onClick={() => setGlosarioAbierto((valor) => !valor)} aria-expanded={glosarioAbierto} aria-controls="glosario-programacion" className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-black ${glosarioAbierto ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-sky-200 bg-white text-[#0069aa]'}`}><BookOpen size={15} />Glosario</button></div>
        <nav className="grid gap-2 pb-2 print:hidden sm:grid-cols-2 lg:grid-cols-5" aria-label="Recorrido de la cápsula" role="tablist">
          {secciones.map((item, index) => {
            const Icono = item.icono;
            const activa = seccion === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activa}
                onClick={() => seleccionarSeccion(item.id)}
                className={`flex min-h-16 items-center justify-center gap-2 rounded-lg border px-3 py-3 text-left text-xs font-black transition sm:text-sm ${
                  activa ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                }`}
              >
                <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${activa ? 'bg-white text-[#0069aa]' : 'bg-sky-50 text-[#0069aa]'}`}>{index + 1}</span>
                <Icono className="hidden shrink-0 sm:block" size={17} />
                <span className="break-words">{item.etiqueta}</span>
              </button>
            );
          })}
        </nav>

        {glosarioAbierto && <aside id="glosario-programacion" className="mt-4 max-h-[70vh] overflow-y-auto rounded-lg border border-sky-200 bg-white p-5 shadow-lg shadow-sky-950/10 print:hidden" aria-labelledby="titulo-glosario-programacion"><div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-sky-100 bg-white pb-4"><div><p className="text-xs font-black uppercase text-[#c66b00]">Consulta rápida · {glosarioProgramacion.length} términos</p><h2 id="titulo-glosario-programacion" className="mt-1 text-xl font-black text-[#0069aa]">Glosario de programación</h2><p className="mt-1 text-sm leading-6 text-slate-600">Definiciones breves para consultar sin abandonar la actividad.</p></div><button type="button" onClick={() => setGlosarioAbierto(false)} className="shrink-0 rounded-md border border-sky-200 px-3 py-2 text-xs font-black text-[#0069aa]">Cerrar</button></div><dl className="mt-5 grid gap-4 sm:grid-cols-2">{glosarioProgramacion.map((entrada) => <div key={entrada.termino} className="border-l-4 border-emerald-500 pl-3"><dt className="text-sm font-black text-slate-950">{entrada.termino}</dt><dd className="mt-1 text-sm leading-6 text-slate-600">{entrada.definicion}</dd></div>)}</dl></aside>}

        <section className={`${seccion === 'propuesta' ? 'capsula-seccion' : 'hidden print:block'} mt-5`} aria-labelledby="titulo-propuesta">
          <div className="border-b border-sky-100 pb-4">
            <p className="text-xs font-black uppercase text-[#c66b00]">1 · Leo la propuesta</p>
            <h2 id="titulo-propuesta" className="mt-1 text-xl font-black text-[#0069aa]">{capsula.practica.titulo}</h2>
            <p className="mt-3 leading-7 text-slate-700">{capsula.practica.situacion}</p>
          </div>
          <div className="mt-5 rounded-lg border border-orange-100 bg-orange-50 p-4">
            <h3 className="font-black text-[#9a4f00]">Desafío</h3>
            <p className="mt-2 font-semibold leading-7 text-slate-800">{nivelComplejidad.consigna}</p>
            <p className="mt-3 rounded-lg border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-[#0069aa]">
              <strong>Nivel {nivelComplejidad.etiqueta}:</strong> {nivelComplejidad.foco}
            </p>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-black text-slate-950">Evidencia esperada</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{nivelComplejidad.evidencia}</p>
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-950">Pensamiento computacional</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {capsula.pensamientoComputacional.map((proceso) => (
                  <span key={proceso} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">{proceso}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${seccion === 'informacion' ? 'capsula-seccion' : 'hidden print:block'} mt-5`} aria-labelledby="titulo-teoria">
          <div className="border-b border-sky-100 pb-4">
            <p className="text-xs font-black uppercase text-[#c66b00]">2 · Consulto información</p>
            <h2 id="titulo-teoria" className="mt-1 text-xl font-black text-[#0069aa]">{capsula.concepto}</h2>
            <p className="mt-3 leading-7 text-slate-700">{capsula.teoria.definicion}</p>
          </div>

          <div className="py-5">
            <div>
              <h3 className="font-black text-slate-950">Ideas clave</h3>
              <ul className="mt-3 space-y-2">
                {capsula.teoria.ideasClave.map((idea) => (
                  <li key={idea} className="flex gap-2 leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={17} />
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${seccion === 'ejemplos' ? 'capsula-seccion' : 'hidden print:block'} mt-5`} aria-labelledby="titulo-ejemplos">
          <div className="border-b border-sky-100 pb-4">
            <p className="text-xs font-black uppercase text-[#c66b00]">3 · Miro ejemplos</p>
            <h2 id="titulo-ejemplos" className="mt-1 text-xl font-black text-[#0069aa]">La misma situación en distintas tecnologías</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Cada ejemplo aborda la misma situación. Cambia la forma de expresarla, pero se mantiene el concepto que necesitas comprender y poner a prueba.</p>
          </div>
          <div className="mt-5 space-y-5">
            {ejemplosTecnologia.map((ejemplo) => (
              <article key={ejemplo.tecnologia} className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase text-emerald-700">{ejemplo.tecnologia}</p>
                    <h3 className="mt-1 font-black text-slate-950">Ejemplo en {ejemplo.tecnologia}</h3>
                  </div>
                  <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">Ejemplo orientador</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{ejemplo.explicacion}</p>
                {ejemplo.bloques ? (
                  <div className="mt-3 flex flex-col items-start gap-1 rounded-lg border border-sky-100 bg-sky-50 p-4">
                    {ejemplo.bloques.map((bloque, index) => <div key={`${bloque.texto}-${index}`} className={`max-w-full rounded-md border-l-4 px-3 py-2 text-xs font-bold shadow-sm ${bloque.tipo === 'evento' ? 'border-amber-500 bg-amber-100 text-amber-950' : bloque.tipo === 'sensor' ? 'border-sky-500 bg-sky-100 text-sky-950' : bloque.tipo === 'control' ? 'border-orange-500 bg-orange-100 text-orange-950' : bloque.tipo === 'variable' ? 'border-fuchsia-500 bg-fuchsia-100 text-fuchsia-950' : bloque.tipo === 'movimiento' ? 'border-blue-500 bg-blue-100 text-blue-950' : 'border-violet-500 bg-violet-100 text-violet-950'}`}>{bloque.texto}</div>)}
                  </div>
                ) : <pre className="mt-3 overflow-x-auto rounded-lg border border-slate-200 bg-slate-950 p-4 text-sm leading-6 text-sky-100"><code>{ejemplo.codigo}</code></pre>}
              </article>
            ))}
          </div>
        </section>

        <section className={`${seccion === 'actividad' ? 'capsula-seccion' : 'hidden print:block'} mt-5`} aria-labelledby="titulo-practica">
          <div className="border-b border-sky-100 pb-4">
            <p className="text-xs font-black uppercase text-[#c66b00]">4 · Realizo actividades</p>
            <h2 id="titulo-practica" className="mt-1 text-xl font-black text-[#0069aa]">{capsula.practica.titulo}</h2>
            <p className="mt-3 leading-7 text-slate-700">{capsula.practica.situacion}</p>
          </div>

          <div className="border-b border-sky-100 py-5">
            <h3 className="font-black text-slate-950">Consigna</h3>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-800">{nivelComplejidad.consigna}</p>
            <span className="mt-3 inline-flex rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800">
              {capsula.practica.metodologia}
            </span>
          </div>

          <div className="grid gap-6 py-5 md:grid-cols-[1fr_0.8fr]">
            <div>
              <h3 className="font-black text-slate-950">Proceso sugerido</h3>
              <ol className="mt-3 space-y-3">
                {capsula.practica.pasos.map((paso, index) => (
                  <li key={paso} className="flex gap-3 leading-6 text-slate-700">
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{index + 1}</span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="font-black text-slate-950">Apoyos disponibles</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {nivelComplejidad.apoyos.map((apoyo) => <li key={apoyo}>• {apoyo}</li>)}
              </ul>
            </div>
          </div>

          <div className="border-l-4 border-emerald-500 bg-emerald-50 p-4">
            <h3 className="font-black text-emerald-900">Evidencia de aprendizaje</h3>
            <p className="mt-2 text-sm leading-6 text-emerald-900">{nivelComplejidad.evidencia}</p>
          </div>
        </section>

        <section className={`${seccion === 'verificacion' ? 'capsula-seccion' : 'hidden print:block'} mt-5`} aria-labelledby="titulo-autoevaluacion">
          <div className="border-b border-sky-100 pb-4">
            <p className="text-xs font-black uppercase text-[#c66b00]">5 · Verifico salidas</p>
            <h2 id="titulo-autoevaluacion" className="mt-1 text-xl font-black text-[#0069aa]">Pruebo, comparo y reviso</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Compara los resultados esperados con los obtenidos. Después utiliza la autoevaluación para decidir qué necesitas revisar.</p>
          </div>

          {capsula.criteriosVerificacion && (
            <div className="mt-5 border-l-4 border-emerald-500 bg-emerald-50 p-4">
              <h3 className="font-black text-emerald-900">Lista de comprobación de salidas</h3>
              <ul className="mt-3 space-y-2">
                {capsula.criteriosVerificacion.map((criterio) => (
                  <li key={criterio} className="flex gap-2 text-sm leading-6 text-emerald-950">
                    <CheckSquare2 className="mt-1 shrink-0" size={17} />
                    <span>{criterio}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {rubrica && (
            <div className="mt-5">
              <RubricaAnaliticaNoveno rubrica={rubrica} />
            </div>
          )}

          <h3 className="mt-5 font-black text-slate-950">Autoevaluación conceptual</h3>

          <div className="mt-3 space-y-4">
            {capsula.autoevaluacion.map((pregunta, index) => {
              const seleccion = respuestas[index];
              const correcta = seleccion === pregunta.correcta;
              const opcionesOrdenadas = mezclarOpciones(`${capsula.id}-autoevaluacion-${index}`, pregunta.opciones);
              return (
                <article key={pregunta.enunciado} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="font-black leading-6 text-slate-900">{index + 1}. {pregunta.enunciado}</h3>
                  <div className="mt-3 grid gap-2">
                    {opcionesOrdenadas.map(({ texto: opcion, indiceOriginal }) => (
                      <label key={`${pregunta.enunciado}-${indiceOriginal}`} className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 transition hover:border-sky-300">
                        <input
                          type="radio"
                          name={`pregunta-${index}`}
                          checked={seleccion === indiceOriginal}
                          disabled={verificada}
                          onChange={() => {
                            setRespuestas((actuales) => ({ ...actuales, [index]: indiceOriginal }));
                            setVerificada(false);
                          }}
                          className="mt-1 h-4 w-4 shrink-0"
                        />
                        <span>{opcion}</span>
                      </label>
                    ))}
                  </div>
                  {verificada && (
                    <div className={`mt-3 flex gap-2 rounded-lg p-3 text-sm leading-6 ${correcta ? 'bg-emerald-50 text-emerald-900' : 'bg-orange-50 text-orange-900'}`}>
                      {correcta ? <CheckCircle2 className="mt-1 shrink-0" size={17} /> : <XCircle className="mt-1 shrink-0" size={17} />}
                      <p><strong>{correcta ? 'Comprendido.' : 'Conviene revisar.'}</strong> {pregunta.retroalimentacion}</p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 print:hidden">
            <button
              type="button"
              disabled={!todasRespondidas || verificada}
              onClick={() => setVerificada(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CheckCircle2 size={17} />
              Comprobar respuestas
            </button>
            {verificada && (
              <button type="button" onClick={reiniciarAutoevaluacion} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                <RotateCcw size={16} />
                Volver a intentar
              </button>
            )}
          </div>

          {verificada && (
            <div className="mt-4 border-l-4 border-[#0069aa] bg-sky-50 p-4 text-sm leading-6 text-slate-700" aria-live="polite">
              <p className="font-black text-[#0069aa]">Resultado para orientar el repaso: {correctas} de {capsula.autoevaluacion.length}</p>
              <p className="mt-1">Revisa la retroalimentación, vuelve a consultar la información y prueba nuevamente cuando lo necesites.</p>
            </div>
          )}

          <div className="mt-7 border-t border-sky-100 pt-6">
            <ZonaActiva ejercicios={ejerciciosZonaActiva} />
          </div>
        </section>

        <nav className="mt-8 flex items-center justify-between gap-3 border-t border-sky-200 pt-5 print:hidden" aria-label="Cambiar paso"><button type="button" onClick={() => cambiarSeccion(-1)} disabled={indiceSeccion === 0} className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-4 py-2 text-sm font-bold text-[#0069aa] disabled:opacity-40"><ChevronLeft size={17} />Anterior</button><p className="text-center text-xs font-bold text-slate-500">Paso {indiceSeccion + 1} de {secciones.length}</p><button type="button" onClick={() => cambiarSeccion(1)} disabled={indiceSeccion === secciones.length - 1} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-2 text-sm font-bold text-white disabled:opacity-40">Siguiente<ChevronRight size={17} /></button></nav>
        <footer className="mt-8 border-t border-sky-100 py-4 text-center text-xs font-semibold text-slate-500">Recurso Educativo Abierto para estudiantes · Programación EBI · {capsula.gradoTexto ?? '9.º año'} · CC BY-SA 4.0</footer>
      </div>
    </main>
  );
}
