'use client';

import { ArrowRight, CheckCircle2, Eye, RefreshCw } from 'lucide-react';
import { useMemo } from 'react';
import ConstructorUnidadAlgoritmos from '@/componentes/ConstructorUnidadAlgoritmos';
import ZonaActiva from '@/componentes/ZonaActiva';
import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';
import { ejemploProduccionCapsula, generarActividadesCapsula, generarEjerciciosCapsula, generarEvaluacionCapsula } from '@/contenido/unidadCompleta';
import { construirUrlRea } from '@/utilidades/urlPublicaRea';

const programaPorGrado = {
  '7mo': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf',
  '8vo': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf',
  '9no': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%206%20-%202024.pdf',
};

export default function UnidadCompletaDocente({ capsula, grado }: { capsula: CapsulaNoveno; grado: '7mo' | '8vo' | '9no' }) {
  const actividades = useMemo(() => generarActividadesCapsula(capsula), [capsula]);
  const evaluacion = useMemo(() => generarEvaluacionCapsula(capsula), [capsula]);
  const ejercicios = useMemo(() => generarEjerciciosCapsula(capsula), [capsula]);
  const produccion = useMemo(() => ejemploProduccionCapsula(capsula), [capsula]);
  const parametros = new URLSearchParams({
    grado,
    secuenciaConstruida: `capsula-${capsula.id}`,
    actividades: actividades.map((actividad) => actividad.id).join(','),
    contexto: grado === '8vo' ? 'microbit' : 'computadoras',
    agrupamiento: 'parejas',
  });

  return (
    <section className="mt-7 border-t-4 border-emerald-500 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-black uppercase text-emerald-700">Unidad desarrollada</p>
          <h4 className="mt-1 text-xl font-black text-slate-950">Cuatro momentos y práctica formativa</h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">La secuencia articula diagnóstico, exploración, producción y transferencia. El docente puede modificar su orden, contexto y agrupamiento.</p>
        </div>
        <a href={construirUrlRea(parametros)} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-800"><Eye size={15} />Previsualizar secuencia</a>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {actividades.map((actividad, index) => <div key={actividad.id} className="border-l-4 border-sky-400 bg-sky-50 p-3"><p className="text-xs font-black uppercase text-[#0069aa]">{index + 1} · {actividad.etapa}</p><h5 className="mt-1 text-sm font-black text-slate-950">{actividad.titulo}</h5><p className="mt-1 text-xs leading-5 text-slate-600">{actividad.evidencia}</p></div>)}
      </div>

      <section className="mt-6 border-y border-emerald-100 py-5">
        <div className="flex items-center gap-2"><RefreshCw size={18} className="text-emerald-700" /><h5 className="font-black text-emerald-950">Ciclo de evaluación formativa</h5></div>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold">
          {['Criterio', 'Evidencia', 'Retroalimentación', 'Revisión', 'Nueva evidencia'].map((paso, index) => <div key={paso} className="contents"><span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-900">{paso}</span>{index < 4 && <ArrowRight size={15} className="text-emerald-600" aria-hidden="true" />}</div>)}
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">{(capsula.criteriosVerificacion ?? evaluacion.observacion.slice(0, 3)).map((criterio) => <li key={criterio} className="flex gap-2 text-sm leading-6 text-slate-700"><CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-600" />{criterio}</li>)}</ul>
      </section>

      <details className="mt-5 rounded-lg border border-orange-100 bg-orange-50 p-4">
        <summary className="cursor-pointer font-black text-[#9a4f00]">Ejemplo de producción inicial, devolución y mejora</summary>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div><p className="text-xs font-black uppercase text-slate-500">Producción inicial</p><p className="mt-2 text-sm leading-6 text-slate-700">{produccion.inicial}</p></div>
          <div><p className="text-xs font-black uppercase text-[#9a4f00]">Devolución docente</p><p className="mt-2 text-sm leading-6 text-slate-700">{produccion.devolucion}</p></div>
          <div><p className="text-xs font-black uppercase text-emerald-700">Versión mejorada</p><p className="mt-2 text-sm leading-6 text-slate-700">{produccion.mejorada}</p></div>
        </div>
      </details>

      <details className="mt-5 rounded-lg border border-sky-100 bg-white p-4">
        <summary className="cursor-pointer font-black text-[#0069aa]">Previsualizar zona activa: {ejercicios.length} desafíos</summary>
        <div className="mt-4"><ZonaActiva ejercicios={ejercicios} /></div>
      </details>

      <ConstructorUnidadAlgoritmos
        actividades={actividades}
        evaluacion={evaluacion}
        grado={grado}
        gradoTexto={capsula.gradoTexto ?? '9.º año'}
        titulo={capsula.titulo}
        secuenciaId={`capsula-${capsula.id}`}
        etiqueta="Constructor de esta unidad"
        descripcion="Selecciona, reordena y adapta los cuatro momentos. La configuración queda guardada en este navegador."
        vinculacionCurricular={[...capsula.pensamientoComputacional, ...capsula.teoria.ideasClave]}
        criterios={capsula.criteriosVerificacion ?? evaluacion.observacion}
        enlaces={[{ titulo: 'Programa oficial ANEP', url: programaPorGrado[grado] }]}
        produccionEjemplo={produccion}
      />
    </section>
  );
}
