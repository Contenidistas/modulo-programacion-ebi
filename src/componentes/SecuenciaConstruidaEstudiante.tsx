'use client';

import { CheckSquare2, Printer, Square, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ZonaActiva from '@/componentes/ZonaActiva';
import type { Ejercicio } from '@/componentes/ZonaActiva';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';
import PanelDuaEstudiante from '@/componentes/PanelDuaEstudiante';
import {
  actividadesAlgoritmos,
  etiquetasAgrupamiento,
  etiquetasContexto,
  evaluacionAlgoritmos,
} from '@/contenido/constructorUnidadAlgoritmos';
import type { AgrupamientoActividad, ContextoActividad } from '@/contenido/constructorUnidadAlgoritmos';

export default function SecuenciaConstruidaEstudiante({
  actividadesIds,
  contexto,
  agrupamiento,
  actividadesBase = actividadesAlgoritmos,
  evaluacion = evaluacionAlgoritmos,
  gradoTexto = '9.º año',
  titulo = 'Algoritmos y pseudocódigo',
  descripcion = 'Comprender, diseñar, probar y mejorar instrucciones que otra persona o una computadora puedan ejecutar.',
  ejercicios = [],
}: {
  actividadesIds: string[];
  contexto: ContextoActividad;
  agrupamiento: AgrupamientoActividad;
  actividadesBase?: typeof actividadesAlgoritmos;
  evaluacion?: typeof evaluacionAlgoritmos;
  gradoTexto?: string;
  titulo?: string;
  descripcion?: string;
  ejercicios?: Ejercicio[];
}) {
  const actividades = actividadesIds.map((id) => actividadesBase.find((item) => item.id === id)).filter(Boolean);
  const actividadInicial = actividades[0];
  const actividadFinal = actividades[actividades.length - 1];
  const [lecturaActiva, setLecturaActiva] = useState(false);
  const contenidoRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const alternarLectura = () => {
    if (!('speechSynthesis' in window)) return;
    if (lecturaActiva) {
      window.speechSynthesis.cancel();
      setLecturaActiva(false);
      return;
    }
    const texto = contenidoRef.current?.innerText.trim();
    if (!texto) return;
    const lectura = new SpeechSynthesisUtterance(texto);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLecturaActiva(false);
    lectura.onerror = () => setLecturaActiva(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLecturaActiva(true);
  };

  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-900">
      <header className="border-b-4 border-[#0069aa] bg-white">
        <div className="mx-auto max-w-4xl px-4 py-5 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Secuencia de aprendizaje · {gradoTexto}</p>
              <h1 className="mt-1 text-2xl font-black text-[#0069aa]">{titulo}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-600">{descripcion}</p>
            </div>
            <div className="flex gap-2 print:hidden">
              <ControlesAccesibilidad mostrarLectura={false} />
              <button type="button" onClick={alternarLectura} className={`inline-flex h-10 items-center gap-2 rounded-lg px-3 text-xs font-bold text-white ${lecturaActiva ? 'bg-rose-600' : 'bg-[#0069aa]'}`}>{lecturaActiva ? <Square size={15} /> : <Volume2 size={16} />}{lecturaActiva ? 'Detener' : 'Escuchar'}</button>
              <button type="button" onClick={() => window.print()} className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-sky-100 bg-white text-[#0069aa]" aria-label="Imprimir"><Printer size={17} /></button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-sky-100 pt-4">
            <span className="rounded-md border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">{etiquetasContexto[contexto]}</span>
            <span className="rounded-md border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-800">{etiquetasAgrupamiento[agrupamiento]}</span>
            <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-600">{actividades.length} actividades</span>
          </div>
        </div>
      </header>

      {actividadInicial && (
        <PanelDuaEstudiante
          id={`secuencia-${gradoTexto}-${titulo}`.replace(/\s+/g, '-').toLowerCase()}
          titulo={titulo}
          concepto={titulo}
          preguntaOrientadora={actividadInicial.preguntasRetroalimentacion[0] ?? `¿Qué necesitas comprender antes de resolver ${titulo.toLowerCase()}?`}
          ejemploAnalogo={`${actividadInicial.proposito} Una estrategia posible comienza con: ${actividadInicial.proceso.slice(0, 2).join(' Luego, ')}.`}
          estructuraParcial={`Propósito: ${actividadInicial.proposito}\nDatos o materiales: ...\nPrimer paso: ${actividadInicial.proceso[0] ?? '...'}\nDecisión o relación clave: ...\nPrueba: ...\nMejora: ...`}
          desafioBasico={actividadInicial.consigna}
          desafioAmpliado={actividadFinal?.varianteExtendida ?? `${actividadInicial.consigna} Transfiere la estrategia a otra situación, prueba un caso inesperado y justifica una mejora.`}
          conDispositivo={actividadInicial.alternativas[contexto]}
          sinDispositivo={actividadInicial.alternativas.sin_dispositivos}
          criterio={actividadInicial.evidencia}
        />
      )}

      <div ref={contenidoRef} className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
        <div className="space-y-6">
          {actividades.map((actividad, index) => actividad && (
            <section key={actividad.id} className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase text-[#c66b00]">Actividad {index + 1} · {actividad.etapa}</p>
              <h2 className="mt-1 text-xl font-black text-[#0069aa]">{actividad.titulo}</h2>
              <div className="mt-4 border-l-4 border-[#f7941d] bg-orange-50 p-4">
                <h3 className="font-black text-[#9a4f00]">Consigna</h3>
                <p className="mt-2 font-semibold leading-7 text-slate-800">{actividad.consigna}</p>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-[1fr_0.8fr]">
                <div>
                  <h3 className="font-black text-slate-950">Proceso</h3>
                  <ol className="mt-3 space-y-3">
                    {actividad.proceso.map((paso, pasoIndex) => <li key={paso} className="flex gap-3 text-sm leading-6 text-slate-700"><span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{pasoIndex + 1}</span><span>{paso}</span></li>)}
                  </ol>
                  {actividad.apoyos && actividad.apoyos.length > 0 && <details className="mt-4 rounded-lg border border-sky-100 bg-sky-50 p-3"><summary className="cursor-pointer text-sm font-bold text-[#0069aa]">Necesito una pista</summary><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">{actividad.apoyos.map((apoyo) => <li key={apoyo}>• {apoyo}</li>)}</ul></details>}
                </div>
                <div>
                  <h3 className="font-black text-slate-950">Forma de trabajo</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{actividad.alternativas[contexto]}</p>
                  <h3 className="mt-4 font-black text-slate-950">Evidencia</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{actividad.evidencia}</p>
                  {actividad.varianteExtendida && <><h3 className="mt-4 font-black text-slate-950">Para seguir explorando</h3><p className="mt-2 text-sm leading-6 text-slate-700">{actividad.varianteExtendida}</p></>}
                </div>
              </div>
            </section>
          ))}
        </div>

        {ejercicios.length > 0 && <div className="mt-6"><ZonaActiva ejercicios={ejercicios} /></div>}

        <section className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-5">
          <div className="flex items-center gap-2"><CheckSquare2 className="text-emerald-700" size={19} /><h2 className="font-black text-emerald-900">Cierre y reflexión</h2></div>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div>
              <h3 className="font-black text-emerald-950">Me detengo a revisar</h3>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-emerald-950">{evaluacion.autoevaluacion.map((item) => <li key={item}>□ {item}</li>)}</ul>
            </div>
            <div>
              <h3 className="font-black text-emerald-950">Ticket de salida</h3>
              <ol className="mt-2 space-y-2 text-sm leading-6 text-emerald-950">{evaluacion.ticketSalida.map((item, index) => <li key={item}>{index + 1}. {item}</li>)}</ol>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
