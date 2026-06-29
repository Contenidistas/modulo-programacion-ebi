'use client';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Layers3, Square, Volume2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { normalizarContenidoExterno } from '@/utilidades/normalizarContenidoExterno';
import ControlesAccesibilidad from '@/componentes/ControlesAccesibilidad';

type PaginaSecuencia = {
  id: string;
  archivo: string;
  titulo: string;
  html: string;
};

type GrupoSecuencia = {
  id: string;
  titulo: string;
  paginas: PaginaSecuencia[];
};

const gruposDefinidos = [
  { id: 'inicio', titulo: 'Inicio', paginas: ['index', 'espacio_para_los_estudiantes', 'contenidos_que_utilizars'] },
  { id: 'conceptos', titulo: 'Conceptos', paginas: ['algoritmos', 'variables', 'nombre_de_una_variable', 'tipo_de_una_variable', 'valor_de_una_variable'] },
  { id: 'ejemplos', titulo: 'Ejemplos', paginas: ['ejemplos_de_definicin_de_variables', 'ejemplos_de_inicializacin_de_variables', 'ejemplos_de_asignacin_de_variables'] },
  { id: 'control', titulo: 'Estructuras de control', paginas: ['estructuras_de_control', 'sentencias_condicionales_o_selectivas', 'sentencias_iterativas', 'glosario'] },
  { id: 'actividades', titulo: 'Actividades', paginas: ['resuelve_un_problema', 'actividades_iniciales', 'desafo_1', 'desafo_2', 'desafo_3', 'desafo_4'] },
  { id: 'cierre', titulo: 'Recursos y fuentes', paginas: ['descarga_de_recursos', 'crditos_y_fuentes'] },
];

export default function SecuenciaEjemploReact({ paginas, baseAssets, volverHref = '?grado=9no' }: { paginas: PaginaSecuencia[]; baseAssets: string; volverHref?: string }) {
  const [paginaId, setPaginaId] = useState(paginas[0]?.id ?? '');
  const [lecturaActiva, setLecturaActiva] = useState(false);
  const contenidoRef = useRef<HTMLDivElement>(null);

  const grupos = useMemo<GrupoSecuencia[]>(() => {
    const porId = new Map(paginas.map((pagina) => [pagina.id, pagina]));
    return gruposDefinidos
      .map((grupo) => ({ ...grupo, paginas: grupo.paginas.map((id) => porId.get(id)).filter((pagina): pagina is PaginaSecuencia => Boolean(pagina)) }))
      .filter((grupo) => grupo.paginas.length > 0);
  }, [paginas]);

  const paginasOrdenadas = grupos.flatMap((grupo) => grupo.paginas);
  const pagina = paginasOrdenadas.find((item) => item.id === paginaId) ?? paginasOrdenadas[0];
  const indice = Math.max(0, paginasOrdenadas.findIndex((item) => item.id === pagina?.id));
  const grupoActivo = grupos.find((grupo) => grupo.paginas.some((item) => item.id === pagina?.id)) ?? grupos[0];

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const html = useMemo(() => {
    if (!pagina) return '';
    const base = baseAssets.replace(/\/$/, '');
    const contenido = pagina.html
      .replace(/src="recursos\/modulo-programacion-estudiantes\//g, `src="${base}/recursos/modulo-programacion-estudiantes/`)
      .replace(/href="recursos\/modulo-programacion-estudiantes\//g, `href="${base}/recursos/modulo-programacion-estudiantes/`);
    return normalizarContenidoExterno(contenido, pagina.id);
  }, [baseAssets, pagina]);

  const seleccionarPagina = (destino: PaginaSecuencia) => {
    setPaginaId(destino.id);
    window.speechSynthesis?.cancel();
    setLecturaActiva(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const seleccionarGrupo = (destino: GrupoSecuencia) => {
    if (!destino.paginas.some((item) => item.id === pagina?.id)) seleccionarPagina(destino.paginas[0]);
  };

  const manejarEnlaceInterno = (event: MouseEvent<HTMLDivElement>) => {
    const enlace = (event.target as HTMLElement).closest('a');
    const href = enlace?.getAttribute('href') ?? '';
    if (!href.startsWith('#pagina-')) return;
    event.preventDefault();
    const archivo = href.replace('#pagina-', '').split('#')[0];
    const destino = paginasOrdenadas.find((item) => item.archivo === archivo || item.id === archivo.replace(/\.html$/, ''));
    if (destino) seleccionarPagina(destino);
  };

  const alternarLectura = () => {
    if (!('speechSynthesis' in window) || !pagina) return;
    if (lecturaActiva) {
      window.speechSynthesis.cancel();
      setLecturaActiva(false);
      return;
    }
    const texto = contenidoRef.current?.innerText.trim();
    if (!texto) return;
    const lectura = new SpeechSynthesisUtterance(`${pagina.titulo}. ${texto}`);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLecturaActiva(false);
    lectura.onerror = () => setLecturaActiva(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLecturaActiva(true);
  };

  if (!pagina || !grupoActivo) return null;

  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-900">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
          <a href={volverHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#0069aa]"><ArrowLeft size={16} />Volver al recurso docente</a>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">Ejemplo de secuencia reconstruida</p>
              <h1 className="mt-1 text-2xl font-black text-[#0069aa] sm:text-3xl">Módulo programación</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">Contenido y organización del eXeLearning original presentados con la interfaz, accesibilidad y navegación del REA.</p>
            </div>
            <div className="flex flex-wrap gap-2"><ControlesAccesibilidad mostrarLectura={false} /><button type="button" onClick={alternarLectura} className={`inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-3 text-sm font-bold text-white ${lecturaActiva ? 'bg-rose-600' : 'bg-[#0069aa]'}`}>
              {lecturaActiva ? <Square size={15} /> : <Volume2 size={17} />}{lecturaActiva ? 'Detener' : 'Leer página'}
            </button></div>
          </div>
          <div className="mt-5 h-1 overflow-hidden rounded-full bg-sky-100" aria-label={`Página ${indice + 1} de ${paginasOrdenadas.length}`}>
            <div className="h-full bg-[#f7941d] transition-all duration-500" style={{ width: `${((indice + 1) / paginasOrdenadas.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-5 md:px-8">
        <nav className="flex gap-2 overflow-x-auto pb-2" aria-label="Bloques de la secuencia">
          {grupos.map((grupo) => (
            <button key={grupo.id} type="button" onClick={() => seleccionarGrupo(grupo)} aria-pressed={grupoActivo.id === grupo.id} className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold transition ${grupoActivo.id === grupo.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300'}`}>
              {grupo.titulo}
            </button>
          ))}
        </nav>

        <section className="mt-3 rounded-lg border border-sky-100 bg-white p-3">
          <div className="flex items-center gap-2"><Layers3 className="text-[#f7941d]" size={18} /><h2 className="font-black text-[#0069aa]">{grupoActivo.titulo}</h2></div>
          <nav className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Páginas del bloque">
            {grupoActivo.paginas.map((item) => (
              <button key={item.id} type="button" onClick={() => seleccionarPagina(item)} aria-current={item.id === pagina.id ? 'page' : undefined} className={`min-w-0 rounded-lg border px-3 py-2 text-left text-xs font-bold leading-5 transition ${item.id === pagina.id ? 'border-[#0069aa] bg-sky-50 text-[#0069aa]' : 'border-slate-200 bg-white text-slate-600 hover:border-sky-300'}`}>
                {item.titulo}
              </button>
            ))}
          </nav>
        </section>

        <article key={pagina.id} className="secuencia-ejemplo-contenido mt-5 min-w-0 rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 border-b border-sky-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-black uppercase text-[#c66b00]">{grupoActivo.titulo} · {indice + 1} de {paginasOrdenadas.length}</p>
              <h2 className="mt-1 text-xl font-black text-slate-950">{pagina.titulo}</h2>
            </div>
            <div className="flex gap-2">
              <button type="button" disabled={indice === 0} onClick={() => seleccionarPagina(paginasOrdenadas[indice - 1])} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label="Página anterior"><ChevronLeft size={18} /></button>
              <button type="button" disabled={indice === paginasOrdenadas.length - 1} onClick={() => seleccionarPagina(paginasOrdenadas[indice + 1])} className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0069aa] disabled:opacity-30" aria-label="Página siguiente"><ChevronRight size={18} /></button>
            </div>
          </div>
          <div ref={contenidoRef} className="contenido-tema mt-5" onClick={manejarEnlaceInterno} dangerouslySetInnerHTML={{ __html: html }} />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 pt-4">
            <button type="button" disabled={indice === 0} onClick={() => seleccionarPagina(paginasOrdenadas[indice - 1])} className="inline-flex items-center gap-2 text-sm font-bold text-[#0069aa] disabled:invisible"><ArrowLeft size={16} />Anterior</button>
            <button type="button" disabled={indice === paginasOrdenadas.length - 1} onClick={() => seleccionarPagina(paginasOrdenadas[indice + 1])} className="inline-flex items-center gap-2 text-sm font-bold text-[#0069aa] disabled:invisible">Siguiente<ArrowRight size={16} /></button>
          </div>
        </article>
      </div>
    </main>
  );
}
