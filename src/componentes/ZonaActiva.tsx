'use client';

import { ArrowDown, ArrowUp, CheckCircle2, ChevronRight, Lightbulb, RotateCcw, XCircle } from 'lucide-react';
import { useState } from 'react';
import { useAppAlmacen } from '@/almacen/usoAppAlmacen';
import { mezclarOpciones } from '@/utilidades/opciones';

type Grado = '7mo' | '8vo' | '9no';

type EjercicioBase = {
  id: string;
  grado: Grado;
  temaId?: string;
  enunciado: string;
  feedback: string;
  categoria?: 'Reconocer' | 'Relacionar' | 'Ordenar' | 'Completar' | 'Anticipar' | 'Depurar' | 'Verdadero o falso';
  pistas?: string[];
};

type EjercicioOpcionMultiple = EjercicioBase & {
  tipo: 'opcion_multiple';
  opciones: string[];
  correcta?: number;
  correctas?: number[];
};

type EjercicioCompletar = EjercicioBase & {
  tipo: 'completar';
  plantilla: string;
  respuestas: string[];
};

type EjercicioOrdenar = EjercicioBase & {
  tipo: 'ordenar';
  elementos: string[];
  ordenCorrecto: string[];
};

type EjercicioRelacionar = EjercicioBase & {
  tipo: 'relacionar';
  pares: { izquierda: string; derecha: string }[];
  opcionesDerecha: string[];
};

export type Ejercicio = EjercicioOpcionMultiple | EjercicioCompletar | EjercicioOrdenar | EjercicioRelacionar;

type Feedback = {
  exito: boolean;
  msg: string;
};

const normalizar = (valor: string) =>
  valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();

const coincideRespuesta = (ingresada: string, respuestas: string[]) => {
  const limpia = normalizar(ingresada);
  const compacta = limpia.replace(/\s/g, '');

  return respuestas.some((respuesta) => {
    const esperada = normalizar(respuesta);
    return limpia === esperada || compacta === esperada.replace(/\s/g, '');
  });
};

export default function ZonaActiva({ ejercicios }: { ejercicios: Ejercicio[] }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [respuestaTexto, setRespuestaTexto] = useState('');
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [selecciones, setSelecciones] = useState<number[]>([]);
  const [pistaVisible, setPistaVisible] = useState(0);
  const [ordenActual, setOrdenActual] = useState<string[]>(ejercicios[0]?.tipo === 'ordenar' ? ejercicios[0].elementos : []);
  const [relaciones, setRelaciones] = useState<Record<number, string>>({});
  const { registrarProgreso, progresoEjercicios, reiniciarEjercicios } = useAppAlmacen();

  const current = ejercicios[index];

  if (!current) {
    return (
      <section className="min-w-0 overflow-hidden rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-black text-[#0069aa]">Zona activa</h2>
        <p className="mt-2 text-sm text-slate-600">No hay desafíos disponibles para este grado.</p>
      </section>
    );
  }

  const yaRespondido = progresoEjercicios[current.id] === true;
  const esUltimo = index === ejercicios.length - 1;
  const opcionesOrdenadas = current.tipo === 'opcion_multiple' ? mezclarOpciones(current.id, current.opciones) : [];
  const indicesCorrectos = current.tipo === 'opcion_multiple'
    ? current.correctas ?? (current.correcta === undefined ? [] : [current.correcta])
    : [];
  const esSeleccionMultiple = indicesCorrectos.length > 1;

  const avanzar = () => {
    const siguienteIndice = Math.min(index + 1, ejercicios.length - 1);
    const siguiente = ejercicios[siguienteIndice];
    setIndex(siguienteIndice);
    setFeedback(null);
    setRespuestaTexto('');
    setSeleccion(null);
    setSelecciones([]);
    setPistaVisible(0);
    setOrdenActual(siguiente?.tipo === 'ordenar' ? siguiente.elementos : []);
    setRelaciones({});
  };

  const reiniciarPregunta = () => {
    setFeedback(null);
    setRespuestaTexto('');
    setSeleccion(null);
    setSelecciones([]);
    setPistaVisible(0);
    setOrdenActual(current.tipo === 'ordenar' ? current.elementos : []);
    setRelaciones({});
  };

  const reiniciarSecuencia = () => {
    reiniciarEjercicios(ejercicios.map((ejercicio) => ejercicio.id));
    setIndex(0);
    setFeedback(null);
    setRespuestaTexto('');
    setSeleccion(null);
    setSelecciones([]);
    setPistaVisible(0);
    setOrdenActual(ejercicios[0]?.tipo === 'ordenar' ? ejercicios[0].elementos : []);
    setRelaciones({});
  };

  const moverElemento = (indice: number, direccion: -1 | 1) => {
    setOrdenActual((actual) => {
      const destino = indice + direccion;
      if (destino < 0 || destino >= actual.length) return actual;
      const siguiente = [...actual];
      [siguiente[indice], siguiente[destino]] = [siguiente[destino], siguiente[indice]];
      return siguiente;
    });
  };

  const evaluarOrden = () => {
    if (current.tipo !== 'ordenar' || yaRespondido) return;
    const exito = current.ordenCorrecto.every((elemento, indice) => ordenActual[indice] === elemento);
    registrarProgreso(current.id, exito);
    setFeedback({ exito, msg: current.feedback });
  };

  const evaluarRelaciones = () => {
    if (current.tipo !== 'relacionar' || yaRespondido) return;
    const exito = current.pares.every((par, indice) => relaciones[indice] === par.derecha);
    registrarProgreso(current.id, exito);
    setFeedback({ exito, msg: current.feedback });
  };

  const evaluarMultiple = (idxSeleccionado: number) => {
    if (current.tipo !== 'opcion_multiple' || yaRespondido) return;

    const esCorrecto = indicesCorrectos.includes(idxSeleccionado);
    setSeleccion(idxSeleccionado);
    registrarProgreso(current.id, esCorrecto);
    setFeedback({ exito: esCorrecto, msg: current.feedback });
  };

  const alternarSeleccion = (indiceOriginal: number) => {
    if (yaRespondido || feedback) return;
    setSelecciones((actuales) =>
      actuales.includes(indiceOriginal)
        ? actuales.filter((indice) => indice !== indiceOriginal)
        : [...actuales, indiceOriginal],
    );
  };

  const evaluarSeleccionMultiple = () => {
    if (current.tipo !== 'opcion_multiple' || !esSeleccionMultiple || yaRespondido) return;
    const seleccionOrdenada = [...selecciones].sort((a, b) => a - b);
    const correctaOrdenada = [...indicesCorrectos].sort((a, b) => a - b);
    const esCorrecto =
      seleccionOrdenada.length === correctaOrdenada.length &&
      seleccionOrdenada.every((indice, posicion) => indice === correctaOrdenada[posicion]);

    registrarProgreso(current.id, esCorrecto);
    setFeedback({ exito: esCorrecto, msg: current.feedback });
  };

  const evaluarCompletar = () => {
    if (current.tipo !== 'completar' || yaRespondido) return;

    const esCorrecto = coincideRespuesta(respuestaTexto, current.respuestas);
    registrarProgreso(current.id, esCorrecto);
    setFeedback({ exito: esCorrecto, msg: current.feedback });
  };

  const renderPlantilla = () => {
    if (current.tipo !== 'completar') return null;

    const partes = current.plantilla.split('[HUECO]');

    return (
      <div className="min-w-0 rounded-lg border border-sky-100 bg-white p-4 font-mono text-sm text-slate-800 shadow-sm [overflow-wrap:anywhere]">
        <span className="whitespace-pre-wrap">{partes[0]}</span>
        <input
          type="text"
          disabled={yaRespondido}
          value={respuestaTexto}
          onChange={(event) => setRespuestaTexto(event.target.value)}
          className="mx-2 inline-block w-36 max-w-full border-b-2 border-[#0069aa] bg-transparent px-2 py-1 text-center font-bold text-[#0069aa] outline-none transition focus:border-[#f7941d] disabled:border-emerald-500 disabled:text-emerald-700"
          aria-label="Respuesta del espacio a completar"
        />
        <span className="whitespace-pre-wrap">{partes[1]}</span>
      </div>
    );
  };

  return (
    <section className="min-w-0 overflow-hidden rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-sky-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">Zona activa{current.categoria ? ` · ${current.categoria}` : ''}</p>
          <h2 className="text-lg font-black text-[#0069aa]">Desafíos del grado seleccionado</h2>
        </div>
        <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-slate-600">
          {index + 1} de {ejercicios.length}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <p className="break-words text-sm font-semibold leading-6 text-slate-800 [overflow-wrap:anywhere]">{current.enunciado}</p>

        {current.pistas && current.pistas.length > 0 && !yaRespondido && (
          <div>
            <button type="button" onClick={() => setPistaVisible((valor) => Math.min(valor + 1, current.pistas?.length ?? 0))} disabled={pistaVisible >= current.pistas.length} className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 disabled:opacity-50"><Lightbulb size={14} />{pistaVisible ? 'Otra pista' : 'Necesito una pista'}</button>
            {pistaVisible > 0 && <ul className="mt-2 space-y-1 rounded-lg border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-950">{current.pistas.slice(0, pistaVisible).map((pista) => <li key={pista}>• {pista}</li>)}</ul>}
          </div>
        )}

        {current.tipo === 'opcion_multiple' && (
          <div className="grid gap-2">
            {esSeleccionMultiple && <p className="text-xs font-bold text-slate-500">Selecciona todas las opciones que correspondan.</p>}
            {opcionesOrdenadas.map(({ texto: opcion, indiceOriginal }) => {
              const seleccionada = esSeleccionMultiple ? selecciones.includes(indiceOriginal) : seleccion === indiceOriginal;
              const correcta = indicesCorrectos.includes(indiceOriginal);
              const mostrarEstado = feedback !== null && (seleccionada || (esSeleccionMultiple && correcta));

              return (
                <button
                  key={`${current.id}-${indiceOriginal}`}
                  type="button"
                  disabled={yaRespondido}
                  role={esSeleccionMultiple ? 'checkbox' : undefined}
                  aria-checked={esSeleccionMultiple ? seleccionada : undefined}
                  onClick={() => esSeleccionMultiple ? alternarSeleccion(indiceOriginal) : evaluarMultiple(indiceOriginal)}
                  className={`flex min-w-0 items-center justify-between gap-3 rounded-lg border p-3 text-left text-sm font-semibold transition ${
                    mostrarEstado && correcta
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : mostrarEstado
                        ? 'border-rose-200 bg-rose-50 text-rose-800'
                        : seleccionada
                          ? 'border-[#0069aa] bg-sky-50 text-[#005487]'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-[#0069aa] hover:bg-sky-50'
                  } disabled:cursor-not-allowed disabled:opacity-80`}
                >
                  <span className="flex min-w-0 items-start gap-3 break-words [overflow-wrap:anywhere]">
                    {esSeleccionMultiple && <span className={`mt-0.5 inline-flex h-4 w-4 shrink-0 rounded border ${seleccionada ? 'border-[#0069aa] bg-[#0069aa]' : 'border-slate-400 bg-white'}`} />}
                    {opcion}
                  </span>
                  {mostrarEstado && correcta && <CheckCircle2 size={18} />}
                  {mostrarEstado && !correcta && <XCircle size={18} />}
                </button>
              );
            })}
            {esSeleccionMultiple && !yaRespondido && !feedback && (
              <button type="button" disabled={selecciones.length === 0} onClick={evaluarSeleccionMultiple} className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-2 text-sm font-bold text-white disabled:opacity-40">
                <CheckCircle2 size={16} />
                Comprobar selección
              </button>
            )}
          </div>
        )}

        {current.tipo === 'completar' && (
          <div className="space-y-3">
            {renderPlantilla()}
            {!yaRespondido && (
              <button
                type="button"
                onClick={evaluarCompletar}
                className="inline-flex max-w-full items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#005487]"
              >
                Validar respuesta
                <CheckCircle2 size={16} />
              </button>
            )}
          </div>
        )}

        {current.tipo === 'ordenar' && (
          <div className="space-y-2">
            {ordenActual.map((elemento, indice) => <div key={elemento} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#0069aa] text-xs font-black text-white">{indice + 1}</span><span className="min-w-0 flex-1 text-sm font-semibold text-slate-700">{elemento}</span><div className="flex gap-1"><button type="button" disabled={yaRespondido || indice === 0} onClick={() => moverElemento(indice, -1)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label={`Subir ${elemento}`}><ArrowUp size={15} /></button><button type="button" disabled={yaRespondido || indice === ordenActual.length - 1} onClick={() => moverElemento(indice, 1)} className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label={`Bajar ${elemento}`}><ArrowDown size={15} /></button></div></div>)}
            {!yaRespondido && <button type="button" onClick={evaluarOrden} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-2 text-sm font-bold text-white"><CheckCircle2 size={16} />Comprobar orden</button>}
          </div>
        )}

        {current.tipo === 'relacionar' && (
          <div className="space-y-3">
            {current.pares.map((par, indice) => <div key={par.izquierda} className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[0.8fr_1fr] sm:items-center"><span className="text-sm font-black text-slate-800">{par.izquierda}</span><select value={relaciones[indice] ?? ''} disabled={yaRespondido} onChange={(event) => setRelaciones((actuales) => ({ ...actuales, [indice]: event.target.value }))} className="min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"><option value="">Selecciona una relación</option>{current.opcionesDerecha.map((opcion) => <option key={opcion} value={opcion}>{opcion}</option>)}</select></div>)}
            {!yaRespondido && <button type="button" disabled={current.pares.some((_, indice) => !relaciones[indice])} onClick={evaluarRelaciones} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-4 py-2 text-sm font-bold text-white disabled:opacity-40"><CheckCircle2 size={16} />Comprobar relaciones</button>}
          </div>
        )}

        {feedback && (
          <div
            className={`min-w-0 break-words rounded-lg border p-4 text-sm font-medium leading-6 [overflow-wrap:anywhere] ${
              feedback.exito
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-rose-200 bg-rose-50 text-rose-800'
            }`}
          >
            <div className="flex items-start gap-2">
              {feedback.exito ? <CheckCircle2 className="mt-0.5 shrink-0" size={18} /> : <XCircle className="mt-0.5 shrink-0" size={18} />}
              <p>{feedback.msg}</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {!feedback.exito && (
                <button
                  type="button"
                  onClick={reiniciarPregunta}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-rose-700 shadow-sm"
                >
                  <RotateCcw size={14} />
                  Intentar otra vez
                </button>
              )}
              {feedback.exito && !esUltimo && (
                <button
                  type="button"
                  onClick={avanzar}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-3 py-2 text-xs font-bold text-white shadow-sm"
                >
                  Siguiente desafío
                  <ChevronRight size={14} />
                </button>
              )}
              {feedback.exito && esUltimo && (
                <button type="button" onClick={reiniciarSecuencia} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-bold text-emerald-700 shadow-sm"><RotateCcw size={14} />Repetir secuencia</button>
              )}
            </div>
          </div>
        )}

        {yaRespondido && !feedback && (
          <div className="flex min-w-0 flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-800">
            <span>Este desafío ya fue resuelto correctamente.</span>
            {!esUltimo && (
              <button type="button" onClick={avanzar} className="inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-xs shadow-sm">
                Siguiente desafío
                <ChevronRight size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
