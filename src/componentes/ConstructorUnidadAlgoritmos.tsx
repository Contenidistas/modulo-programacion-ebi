'use client';

import { ArrowDown, ArrowUp, CheckSquare2, Copy, FileText, Lightbulb, Printer, RotateCcw, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  actividadesAlgoritmos,
  etiquetasAgrupamiento,
  etiquetasContexto,
  evaluacionAlgoritmos,
  crearPromptTutorActividad,
} from '@/contenido/constructorUnidadAlgoritmos';
import type { AgrupamientoActividad, ContextoActividad } from '@/contenido/constructorUnidadAlgoritmos';
import { construirUrlRea } from '@/utilidades/urlPublicaRea';

const escapar = (valor: string) => valor.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

type EvaluacionConstructor = typeof evaluacionAlgoritmos;
type EstadoConstructorGuardado = { seleccionadas?: string[]; orden?: string[]; contexto?: ContextoActividad; agrupamiento?: AgrupamientoActividad };

type ConfiguracionConstructor = {
  actividades?: typeof actividadesAlgoritmos;
  evaluacion?: EvaluacionConstructor;
  grado?: '7mo' | '8vo' | '9no';
  gradoTexto?: string;
  titulo?: string;
  descripcion?: string;
  secuenciaId?: string;
  etiqueta?: string;
  vinculacionCurricular?: string[];
  criterios?: string[];
  enlaces?: { titulo: string; url: string }[];
  produccionEjemplo?: { inicial: string; devolucion: string; mejorada: string };
};

export default function ConstructorUnidadAlgoritmos({
  actividades = actividadesAlgoritmos,
  evaluacion = evaluacionAlgoritmos,
  grado = '9no',
  gradoTexto = '9.º año',
  titulo = 'Algoritmos y pseudocódigo',
  descripcion = 'Selecciona, ordena y adapta las actividades. Las exportaciones reflejan esta configuración.',
  secuenciaId = 'algoritmos',
  etiqueta = 'Secuencia configurable',
  vinculacionCurricular = [],
  criterios = [],
  enlaces = [],
  produccionEjemplo,
}: ConfiguracionConstructor = {}) {
  const [seleccionadas, setSeleccionadas] = useState(actividades.map((actividad) => actividad.id));
  const [orden, setOrden] = useState(actividades.map((actividad) => actividad.id));
  const [contexto, setContexto] = useState<ContextoActividad>('computadoras');
  const [agrupamiento, setAgrupamiento] = useState<AgrupamientoActividad>('parejas');
  const [copiado, setCopiado] = useState(false);
  const [promptCopiado, setPromptCopiado] = useState<string | null>(null);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [hidratado, setHidratado] = useState(false);
  const clavePersistencia = `rea-constructor-${secuenciaId}`;

  useEffect(() => {
    let configuracion: EstadoConstructorGuardado | null = null;
    try {
      const guardado = window.localStorage.getItem(clavePersistencia);
      if (guardado) configuracion = JSON.parse(guardado) as EstadoConstructorGuardado;
    } catch {
      window.localStorage.removeItem(clavePersistencia);
    }
    const temporizador = window.setTimeout(() => {
      if (configuracion) {
        const ids = new Set(actividades.map((actividad) => actividad.id));
        if (configuracion.seleccionadas) setSeleccionadas(configuracion.seleccionadas.filter((id) => ids.has(id)));
        if (configuracion.orden) {
          const ordenValido = configuracion.orden.filter((id) => ids.has(id));
          setOrden([...ordenValido, ...actividades.map((actividad) => actividad.id).filter((id) => !ordenValido.includes(id))]);
        }
        if (configuracion.contexto && configuracion.contexto in etiquetasContexto) setContexto(configuracion.contexto);
        if (configuracion.agrupamiento && configuracion.agrupamiento in etiquetasAgrupamiento) setAgrupamiento(configuracion.agrupamiento);
      }
      setHidratado(true);
    }, 0);
    return () => window.clearTimeout(temporizador);
  }, [actividades, clavePersistencia]);

  useEffect(() => {
    if (!hidratado) return;
    window.localStorage.setItem(clavePersistencia, JSON.stringify({ seleccionadas, orden, contexto, agrupamiento }));
  }, [agrupamiento, clavePersistencia, contexto, hidratado, orden, seleccionadas]);

  const actividadesSeleccionadas = useMemo(
    () => orden.map((id) => actividades.find((actividad) => actividad.id === id)).filter((actividad) => actividad && seleccionadas.includes(actividad.id)),
    [actividades, orden, seleccionadas],
  );
  const tiempoTotal = actividadesSeleccionadas.reduce((total, actividad) => total + (actividad?.duracion ?? 0), 0);

  const alternarActividad = (id: string) => {
    setSeleccionadas((actuales) => actuales.includes(id) ? actuales.filter((item) => item !== id) : [...actuales, id]);
  };

  const mover = (id: string, direccion: -1 | 1) => {
    setOrden((actual) => {
      const indice = actual.indexOf(id);
      const destino = indice + direccion;
      if (indice < 0 || destino < 0 || destino >= actual.length) return actual;
      const siguiente = [...actual];
      [siguiente[indice], siguiente[destino]] = [siguiente[destino], siguiente[indice]];
      return siguiente;
    });
  };

  const restaurar = () => {
    setSeleccionadas(actividades.map((actividad) => actividad.id));
    setOrden(actividades.map((actividad) => actividad.id));
    setContexto('computadoras');
    setAgrupamiento('parejas');
    window.localStorage.removeItem(clavePersistencia);
  };

  const listaHtml = (items: string[]) => `<ul>${items.map((item) => `<li>${escapar(item)}</li>`).join('')}</ul>`;
  const actividadesHtml = (paraEstudiantes: boolean) => actividadesSeleccionadas.map((actividad, index) => actividad ? `
    <section>
      <p class="etapa">${index + 1}. ${escapar(actividad.etapa)}</p>
      <h2>${escapar(actividad.titulo)}</h2>
      ${paraEstudiantes ? '' : `<p><strong>Propósito:</strong> ${escapar(actividad.proposito)}</p>`}
      <p><strong>Consigna:</strong> ${escapar(actividad.consigna)}</p>
      <p><strong>Modalidad:</strong> ${escapar(etiquetasAgrupamiento[agrupamiento])} · ${escapar(etiquetasContexto[contexto])} · ${actividad.duracion} minutos</p>
      <p><strong>Adaptación:</strong> ${escapar(actividad.alternativas[contexto])}</p>
      <h3>Proceso</h3>${listaHtml(actividad.proceso)}
      ${actividad.apoyos?.length ? `<h3>Apoyos graduales</h3>${listaHtml(actividad.apoyos)}` : ''}
      ${actividad.varianteExtendida ? `<p><strong>Variante extendida:</strong> ${escapar(actividad.varianteExtendida)}</p>` : ''}
      <p><strong>Evidencia:</strong> ${escapar(actividad.evidencia)}</p>
      ${paraEstudiantes ? '' : `<h3>Preguntas para retroalimentar</h3>${listaHtml(actividad.preguntasRetroalimentacion)}<h3>Prompt de tutoría con IA</h3><p>${escapar(actividad.promptTutor ?? crearPromptTutorActividad(actividad, gradoTexto, titulo))}</p>`}
    </section>` : '').join('');

  const estilosDocumento = `
    body{font-family:Arial,sans-serif;color:#172033;margin:0}main{max-width:850px;margin:auto;padding:32px}header{border-bottom:4px solid #0069aa;padding-bottom:18px}h1{color:#0069aa}h2{font-size:20px;margin-bottom:8px}h3{font-size:15px;margin-bottom:5px}p,li{font-size:14px;line-height:1.6}section{border-bottom:1px solid #cbd5e1;padding:20px 0;break-inside:avoid}.etapa{color:#b85f00;font-size:12px;font-weight:bold;text-transform:uppercase}.meta{background:#f0f9ff;padding:12px;margin-top:12px}@media print{main{padding:0}}`;

  const notificar = (texto: string) => {
    setMensaje(texto);
    window.setTimeout(() => setMensaje(null), 4200);
  };

  const imprimir = (tipo: 'docente' | 'estudiante' | 'evaluacion' | 'completa') => {
    const titulos = {
      docente: `Planificación docente · ${titulo}`,
      estudiante: `Cuadernillo estudiantil · ${titulo}`,
      evaluacion: 'Instrumentos de evaluación formativa',
      completa: `Secuencia completa · ${titulo}`,
    };
    const evaluacionHtml = `
      <section><h2>Lista de observación</h2>${listaHtml(evaluacion.observacion)}</section>
      <section><h2>Autoevaluación</h2>${listaHtml(evaluacion.autoevaluacion)}</section>
      <section><h2>Coevaluación</h2>${listaHtml(evaluacion.coevaluacion)}</section>
      <section><h2>Ticket de salida</h2>${listaHtml(evaluacion.ticketSalida)}</section>
      <section><h2>Bitácora de pruebas y errores</h2>${listaHtml(evaluacion.bitacora)}</section>
      <section><h2>Ejemplos de devoluciones</h2>${listaHtml(evaluacion.devoluciones)}</section>
      <section><h2>Rúbrica opcional</h2>${listaHtml(evaluacion.rubricaOpcional)}</section>`;
    const documentacionHtml = `
      ${vinculacionCurricular.length ? `<section><h2>Vinculación curricular</h2>${listaHtml(vinculacionCurricular)}</section>` : ''}
      ${criterios.length ? `<section><h2>Criterios y evidencias</h2>${listaHtml(criterios)}</section>` : ''}
      ${produccionEjemplo ? `<section><h2>Ejemplo de retroalimentación</h2><p><strong>Producción inicial:</strong> ${escapar(produccionEjemplo.inicial)}</p><p><strong>Devolución:</strong> ${escapar(produccionEjemplo.devolucion)}</p><p><strong>Versión mejorada:</strong> ${escapar(produccionEjemplo.mejorada)}</p></section>` : ''}
      <section><h2>Declaratoria de uso de inteligencia artificial</h2><p>La IA se utiliza únicamente como mediación formativa: formula preguntas, ofrece pistas graduales y ayuda a verificar, sin sustituir la comprensión, las decisiones ni la producción del estudiante.</p><p>Debe declararse qué se consultó, utilizó y modificó; no se ingresan datos personales o sensibles; las respuestas se contrastan con fuentes, pruebas y criterios bajo supervisión docente.</p><p><a href="https://contenidistas.github.io/IAG-en-clave-de-etica-pedagogica/">IA en clave de ética pedagógica</a></p></section>
      ${enlaces.length ? `<section><h2>Enlaces y fuentes</h2><ul>${enlaces.map((enlace) => `<li><a href="${escapar(enlace.url)}">${escapar(enlace.titulo)}</a></li>`).join('')}</ul></section>` : ''}
      <section><h2>Condición de REA</h2><p><strong>Autoría institucional:</strong> EDyTIC.</p><p><strong>Licencia:</strong> <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es">Creative Commons Atribución-CompartirIgual 4.0 Internacional (CC BY-SA 4.0)</a>.</p></section>`;
    const contenido = tipo === 'evaluacion'
      ? evaluacionHtml
      : tipo === 'estudiante'
        ? actividadesHtml(true)
        : tipo === 'completa'
          ? `${documentacionHtml}${actividadesHtml(false)}${evaluacionHtml}`
          : `${documentacionHtml}${actividadesHtml(false)}`;
    const ventana = window.open('about:blank', '_blank');
    if (!ventana) {
      notificar('El navegador bloqueó la ventana. Habilita las ventanas emergentes para exportar el documento.');
      return;
    }
    ventana.opener = null;
    ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${titulos[tipo]}</title><style>${estilosDocumento}</style></head><body><main><header><p class="etapa">Programación · ${gradoTexto}</p><h1>${titulos[tipo]}</h1><div class="meta">${escapar(etiquetasContexto[contexto])} · ${escapar(etiquetasAgrupamiento[agrupamiento])} · ${tiempoTotal} minutos</div></header>${contenido}</main></body></html>`);
    ventana.document.close();
    ventana.setTimeout(() => {
      ventana.focus();
      ventana.print();
    }, 250);
    notificar(`${titulos[tipo]} abierto. Elige “Guardar como PDF” en el diálogo de impresión.`);
  };

  const urlSecuencia = (publica = false) => {
    const parametros = new URLSearchParams({
      grado,
      secuenciaConstruida: secuenciaId,
      actividades: actividadesSeleccionadas.map((actividad) => actividad?.id ?? '').filter(Boolean).join(','),
      contexto,
      agrupamiento,
    });
    return construirUrlRea(parametros, publica);
  };

  const copiarTexto = async (texto: string) => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(texto);
      return;
    }
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const copiadoExitoso = document.execCommand('copy');
    area.remove();
    if (!copiadoExitoso) throw new Error('No se pudo copiar');
  };

  const copiarIframe = async () => {
    const iframe = `<iframe src="${urlSecuencia(true)}" title="Secuencia: ${titulo}" width="100%" height="900" style="border:0; border-radius:8px;" loading="lazy" allow="microphone"></iframe>`;
    try {
      await copiarTexto(iframe);
      setCopiado(true);
      notificar('Iframe copiado. Ya puedes pegarlo en el editor HTML de CREA.');
      window.setTimeout(() => setCopiado(false), 2400);
    } catch {
      notificar('No fue posible copiar automáticamente. Revisa los permisos del portapapeles del navegador.');
    }
  };

  const copiarPromptActividad = async (id: string, prompt: string) => {
    try {
      await copiarTexto(prompt);
      setPromptCopiado(id);
      notificar('Prompt de actividad copiado. Puedes adaptarlo antes de compartirlo.');
      window.setTimeout(() => setPromptCopiado(null), 2400);
    } catch {
      notificar('No fue posible copiar el prompt. Revisa los permisos del portapapeles.');
    }
  };

  return (
    <section className="mt-8 border-t border-sky-100 pt-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase text-[#c66b00]">{etiqueta}</p>
          <h4 className="mt-1 text-xl font-black text-[#0069aa]">Constructor de unidad</h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{descripcion}</p>
        </div>
        <button type="button" onClick={restaurar} className="inline-flex items-center gap-2 text-sm font-bold text-slate-600"><RotateCcw size={15} />Restaurar</button>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_310px]">
        <div className="space-y-3">
          {orden.map((id, index) => {
            const actividad = actividades.find((item) => item.id === id);
            if (!actividad) return null;
            const activa = seleccionadas.includes(id);
            const promptActividad = actividad.promptTutor ?? crearPromptTutorActividad(actividad, gradoTexto, titulo);
            return (
              <article key={id} className={`grid gap-3 rounded-lg border p-4 transition sm:grid-cols-[auto_1fr_auto] ${activa ? 'border-sky-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-65'}`}>
                <label className="flex cursor-pointer items-start gap-2">
                  <input type="checkbox" checked={activa} onChange={() => alternarActividad(id)} className="mt-1 h-4 w-4" />
                  <span className="sr-only">Seleccionar {actividad.titulo}</span>
                </label>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase text-[#c66b00]">{actividad.etapa}</p>
                  <h5 className="mt-1 font-black text-slate-950">{actividad.titulo}</h5>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{actividad.proposito}</p>
                  <p className="mt-2 text-xs font-semibold text-slate-500">{actividad.duracion} minutos · {actividad.evidencia}</p>
                  <details className="mt-3 rounded-lg border border-violet-100 bg-violet-50 p-3">
                    <summary className="cursor-pointer text-xs font-bold text-violet-900">Prompt tutor de esta actividad</summary>
                    <pre className="mt-3 max-h-48 overflow-auto whitespace-pre-wrap rounded-lg bg-white p-3 font-sans text-xs leading-5 text-slate-700">{promptActividad}</pre>
                    <button type="button" onClick={() => copiarPromptActividad(actividad.id, promptActividad)} className="mt-2 inline-flex items-center gap-2 rounded-lg bg-violet-800 px-3 py-2 text-xs font-bold text-white"><Lightbulb size={14} />{promptCopiado === actividad.id ? 'Prompt copiado' : 'Copiar prompt'}</button>
                  </details>
                </div>
                <div className="flex gap-1">
                  <button type="button" disabled={index === 0} onClick={() => mover(id, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label={`Subir ${actividad.titulo}`}><ArrowUp size={15} /></button>
                  <button type="button" disabled={index === orden.length - 1} onClick={() => mover(id, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label={`Bajar ${actividad.titulo}`}><ArrowDown size={15} /></button>
                </div>
              </article>
            );
          })}
        </div>

        <aside className="self-start rounded-lg border border-sky-100 bg-sky-50 p-4 lg:sticky lg:top-4">
          <h5 className="font-black text-[#0069aa]">Configuración</h5>
          <fieldset className="mt-4">
            <legend className="text-xs font-black uppercase text-slate-600">Contexto</legend>
            <div className="mt-2 grid gap-2">
              {(Object.entries(etiquetasContexto) as [ContextoActividad, string][]).map(([id, etiqueta]) => (
                <label key={id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"><input type="radio" name="contexto" checked={contexto === id} onChange={() => setContexto(id)} />{etiqueta}</label>
              ))}
            </div>
          </fieldset>
          <fieldset className="mt-4 border-t border-sky-100 pt-4">
            <legend className="text-xs font-black uppercase text-slate-600">Agrupamiento</legend>
            <div className="mt-2 grid gap-2">
              {(Object.entries(etiquetasAgrupamiento) as [AgrupamientoActividad, string][]).map(([id, etiqueta]) => (
                <label key={id} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700"><input type="radio" name="agrupamiento" checked={agrupamiento === id} onChange={() => setAgrupamiento(id)} />{etiqueta}</label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 border-t border-sky-100 pt-4 text-sm text-slate-700">
            <p><strong>{actividadesSeleccionadas.length}</strong> actividades seleccionadas</p>
            <p className="mt-1"><strong>{tiempoTotal}</strong> minutos estimados</p>
          </div>
        </aside>
      </div>

      <div className="mt-6 border-t border-sky-100 pt-5">
        <div className="flex items-center gap-2"><FileText className="text-[#f7941d]" size={18} /><h5 className="font-black text-slate-950">Exportar selección</h5></div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
          <button type="button" disabled={!actividadesSeleccionadas.length} onClick={() => imprimir('docente')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-3 text-xs font-bold text-[#0069aa] disabled:opacity-40"><Printer size={15} />Planificación docente</button>
          <button type="button" disabled={!actividadesSeleccionadas.length} onClick={() => imprimir('estudiante')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-3 text-xs font-bold text-[#0069aa] disabled:opacity-40"><Users size={15} />Cuadernillo estudiantil</button>
          <button type="button" disabled={!actividadesSeleccionadas.length} onClick={copiarIframe} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0069aa] px-3 py-3 text-xs font-bold text-white disabled:opacity-40"><Copy size={15} />{copiado ? 'Iframe copiado' : 'Iframe para CREA'}</button>
          <button type="button" onClick={() => imprimir('evaluacion')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-3 text-xs font-bold text-emerald-800"><CheckSquare2 size={15} />Evaluación formativa</button>
          <button type="button" disabled={!actividadesSeleccionadas.length} onClick={() => imprimir('completa')} className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-3 py-3 text-xs font-bold text-[#a65300] disabled:opacity-40"><FileText size={15} />Secuencia completa</button>
        </div>
        {mensaje && (
          <div className="mt-3 rounded-lg border border-sky-100 bg-sky-50 px-4 py-3 text-sm font-semibold leading-6 text-[#0069aa]" role="status" aria-live="polite">
            {mensaje}
          </div>
        )}
      </div>
    </section>
  );
}
