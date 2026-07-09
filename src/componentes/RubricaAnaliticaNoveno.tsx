'use client';

import { Download, Printer, RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { CriterioRubrica, NivelRubrica, RubricaAnalitica } from '@/contenido/rubricasNoveno';

type EscalaNumerica = 10 | 100;
type ValoresCriterio = Record<string, number>;

const clonarRubrica = (rubrica: RubricaAnalitica): RubricaAnalitica => ({
  ...rubrica,
  criterios: rubrica.criterios.map((criterio) => ({
    ...criterio,
    niveles: criterio.niveles.map((nivel) => ({ ...nivel })),
  })),
});

const crearValoresIniciales = (rubrica: RubricaAnalitica, escala: EscalaNumerica): ValoresCriterio =>
  Object.fromEntries(rubrica.criterios.map((criterio) => [criterio.id, Number(((criterio.peso / 100) * escala).toFixed(2))]));

const aplicarPesosCalculados = (rubrica: RubricaAnalitica, valores: ValoresCriterio, escala: EscalaNumerica): RubricaAnalitica => ({
  ...rubrica,
  criterios: rubrica.criterios.map((criterio) => ({
    ...criterio,
    peso: Number((((valores[criterio.id] ?? 0) / escala) * 100).toFixed(2)),
  })),
});

const escaparHtml = (valor: string) =>
  valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const crearHtmlRubrica = (rubrica: RubricaAnalitica, valores?: ValoresCriterio, escala?: EscalaNumerica) => `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escaparHtml(rubrica.titulo)}</title>
  <style>
    body { color: #172033; font-family: Arial, Helvetica, sans-serif; margin: 0; }
    main { max-width: 1100px; margin: 0 auto; padding: 28px; }
    h1 { color: #0069aa; margin: 0 0 8px; }
    p { line-height: 1.55; }
    .meta { background: #f0f9ff; border-left: 5px solid #0069aa; margin: 18px 0; padding: 12px; }
    article { border: 1px solid #cbd5e1; border-radius: 8px; margin: 18px 0; overflow: hidden; }
    header { background: #f8fafc; padding: 12px; }
    h2 { font-size: 18px; margin: 0 0 6px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border-top: 1px solid #cbd5e1; padding: 10px; text-align: left; vertical-align: top; }
    th { background: #e0f2fe; color: #075985; }
    .peso { color: #0069aa; font-weight: 700; }
    @media print { main { max-width: none; padding: 0; } article { break-inside: avoid; } }
  </style>
</head>
<body>
  <main>
    <p><strong>Evaluación auténtica</strong></p>
    <h1>${escaparHtml(rubrica.titulo)}</h1>
    <p>${escaparHtml(rubrica.propositoEvaluacion)}</p>
    <div class="meta">
      <p><strong>Escala:</strong> ${escaparHtml(rubrica.escala)}</p>
      <p><strong>Suficiencia:</strong> ${escaparHtml(rubrica.minimoSuficiencia)}</p>
    </div>
    ${rubrica.criterios.map((criterio) => `
      <article>
        <header>
          <h2>${escaparHtml(criterio.criterio)} <span class="peso">(${valores && escala ? `${valores[criterio.id] ?? 0}/${escala} pts · ` : ''}${criterio.peso}%)</span></h2>
          <p><strong>Evidencia:</strong> ${escaparHtml(criterio.evidencia)}</p>
        </header>
        <table>
          <thead><tr>${criterio.niveles.map((nivel) => `<th>Nivel ${nivel.nivel}: ${escaparHtml(nivel.etiqueta)}<br />${escaparHtml(nivel.puntaje)}</th>`).join('')}</tr></thead>
          <tbody><tr>${criterio.niveles.map((nivel) => `<td>${escaparHtml(nivel.descriptor)}</td>`).join('')}</tr></tbody>
        </table>
      </article>
    `).join('')}
  </main>
</body>
</html>`;

const descargarHtml = (rubrica: RubricaAnalitica, valores?: ValoresCriterio, escala?: EscalaNumerica) => {
  const blob = new Blob([crearHtmlRubrica(rubrica, valores, escala)], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `rubrica-${rubrica.capsulaId}.html`;
  link.click();
  URL.revokeObjectURL(url);
};

const imprimirRubrica = (rubrica: RubricaAnalitica, valores?: ValoresCriterio, escala?: EscalaNumerica) => {
  const ventana = window.open('', '_blank', 'noopener,noreferrer');
  if (!ventana) return;
  ventana.document.write(crearHtmlRubrica(rubrica, valores, escala));
  ventana.document.close();
  ventana.focus();
  ventana.print();
};

const CampoTexto = ({
  etiqueta,
  valor,
  onChange,
  area = false,
}: {
  etiqueta: string;
  valor: string;
  onChange: (valor: string) => void;
  area?: boolean;
}) => (
  <label className="block text-xs font-black uppercase text-slate-500">
    {etiqueta}
    {area ? (
      <textarea value={valor} onChange={(event) => onChange(event.target.value)} rows={3} className="mt-1 w-full resize-y rounded-md border border-slate-200 bg-white p-2 text-sm font-normal normal-case leading-5 text-slate-700 outline-none focus:border-sky-500" />
    ) : (
      <input value={valor} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-slate-200 bg-white p-2 text-sm font-normal normal-case text-slate-700 outline-none focus:border-sky-500" />
    )}
  </label>
);

export default function RubricaAnaliticaNoveno({
  rubrica,
  compacta = false,
  editable = false,
}: {
  rubrica: RubricaAnalitica;
  compacta?: boolean;
  editable?: boolean;
}) {
  const [rubricaEditada, setRubricaEditada] = useState(() => clonarRubrica(rubrica));
  const [escalaNumerica, setEscalaNumerica] = useState<EscalaNumerica>(10);
  const [valoresCriterio, setValoresCriterio] = useState<ValoresCriterio>(() => crearValoresIniciales(rubrica, 10));
  const vistaBase = editable ? rubricaEditada : rubrica;
  const vista = editable ? aplicarPesosCalculados(vistaBase, valoresCriterio, escalaNumerica) : vistaBase;
  const puntajeTotal = useMemo(
    () => vista.criterios.reduce((total, criterio) => total + Number(valoresCriterio[criterio.id] || 0), 0),
    [valoresCriterio, vista.criterios],
  );
  const rangoExcedido = puntajeTotal > escalaNumerica;
  const rangoCompleto = puntajeTotal === escalaNumerica;
  const puntajeRestante = Number((escalaNumerica - puntajeTotal).toFixed(2));

  const actualizarRubrica = (cambios: Partial<RubricaAnalitica>) => {
    setRubricaEditada((actual) => ({ ...actual, ...cambios }));
  };

  const actualizarCriterio = (criterioId: string, cambios: Partial<CriterioRubrica>) => {
    setRubricaEditada((actual) => ({
      ...actual,
      criterios: actual.criterios.map((criterio) => criterio.id === criterioId ? { ...criterio, ...cambios } : criterio),
    }));
  };

  const seleccionarEscala = (escala: EscalaNumerica) => {
    const factor = escala / escalaNumerica;
    setEscalaNumerica(escala);
    setValoresCriterio((actuales) =>
      Object.fromEntries(Object.entries(actuales).map(([criterioId, valor]) => [criterioId, Number((valor * factor).toFixed(2))])),
    );
  };

  const actualizarValorCriterio = (criterioId: string, valor: number) => {
    setValoresCriterio((actuales) => ({ ...actuales, [criterioId]: Number.isFinite(valor) ? Math.max(0, valor) : 0 }));
  };

  const restaurarRubrica = () => {
    setRubricaEditada(clonarRubrica(rubrica));
    setEscalaNumerica(10);
    setValoresCriterio(crearValoresIniciales(rubrica, 10));
  };

  const actualizarNivel = (criterioId: string, nivelNumero: number, cambios: Partial<NivelRubrica>) => {
    setRubricaEditada((actual) => ({
      ...actual,
      criterios: actual.criterios.map((criterio) =>
        criterio.id === criterioId
          ? {
              ...criterio,
              niveles: criterio.niveles.map((nivel) => nivel.nivel === nivelNumero ? { ...nivel, ...cambios } : nivel),
            }
          : criterio,
      ),
    }));
  };

  return (
    <section className="rounded-lg border border-sky-100 bg-white p-4" aria-labelledby={`rubrica-${vista.capsulaId}`}>
      <div className="flex flex-col gap-3 border-b border-sky-100 pb-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-black uppercase text-[#c66b00]">Evaluación auténtica</p>
          {editable ? (
            <div className="mt-2 grid gap-3">
              <CampoTexto etiqueta="Título" valor={vista.titulo} onChange={(valor) => actualizarRubrica({ titulo: valor })} />
              {!compacta && <CampoTexto etiqueta="Propósito de evaluación" valor={vista.propositoEvaluacion} onChange={(valor) => actualizarRubrica({ propositoEvaluacion: valor })} area />}
            </div>
          ) : (
            <>
              <h3 id={`rubrica-${vista.capsulaId}`} className="mt-1 font-black text-[#0069aa]">{vista.titulo}</h3>
              {!compacta && <p className="mt-2 text-sm leading-6 text-slate-600">{vista.propositoEvaluacion}</p>}
            </>
          )}
        </div>
        <div className="rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-xs font-bold leading-5 text-[#0069aa] md:max-w-xs">
          {editable ? (
            <div className="grid gap-2">
              <CampoTexto etiqueta="Escala" valor={vista.escala} onChange={(valor) => actualizarRubrica({ escala: valor })} area />
              <CampoTexto etiqueta="Suficiencia" valor={vista.minimoSuficiencia} onChange={(valor) => actualizarRubrica({ minimoSuficiencia: valor })} area />
              <div>
                <p className="text-xs font-black uppercase text-slate-500">Escala de calificación</p>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  {([10, 100] as const).map((escala) => (
                    <button
                      key={escala}
                      type="button"
                      onClick={() => seleccionarEscala(escala)}
                      className={`rounded-md border px-3 py-2 text-xs font-black ${escalaNumerica === escala ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-sky-100 bg-white text-[#0069aa]'}`}
                    >
                      1 a {escala}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`rounded-md border p-2 ${rangoExcedido ? 'border-rose-200 bg-rose-50 text-rose-700' : rangoCompleto ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-amber-200 bg-amber-50 text-amber-800'}`} role="status" aria-live="polite">
                <p>Total asignado: {puntajeTotal}/{escalaNumerica} puntos.</p>
                {rangoExcedido && <p>El puntaje excede el rango por {Math.abs(puntajeRestante)} puntos. Ajusta los valores antes de exportar.</p>}
                {!rangoExcedido && !rangoCompleto && <p>Quedan {puntajeRestante} puntos sin asignar.</p>}
                {rangoCompleto && <p>La escala está completa.</p>}
              </div>
            </div>
          ) : (
            <>
              <p>{vista.escala}</p>
              <p className="mt-1">{vista.minimoSuficiencia}</p>
            </>
          )}
        </div>
      </div>

      {editable && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => imprimirRubrica(vista, valoresCriterio, escalaNumerica)} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-3 py-2 text-xs font-bold text-white"><Printer size={14} />PDF / imprimir</button>
          <button type="button" onClick={() => descargarHtml(vista, valoresCriterio, escalaNumerica)} className="inline-flex items-center gap-2 rounded-lg border border-sky-100 bg-sky-50 px-3 py-2 text-xs font-bold text-[#0069aa]"><Download size={14} />HTML</button>
          <button type="button" onClick={restaurarRubrica} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"><RotateCcw size={14} />Restaurar</button>
        </div>
      )}

      <div className="mt-4 space-y-4">
        {vista.criterios.map((criterio) => (
          <article key={criterio.id} className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid gap-2 bg-slate-50 p-3 md:grid-cols-[1fr_auto] md:items-start">
              <div>
                {editable ? (
                  <div className="grid gap-3">
                    <CampoTexto etiqueta="Criterio" valor={criterio.criterio} onChange={(valor) => actualizarCriterio(criterio.id, { criterio: valor })} />
                    <CampoTexto etiqueta="Evidencia observable" valor={criterio.evidencia} onChange={(valor) => actualizarCriterio(criterio.id, { evidencia: valor })} area />
                  </div>
                ) : (
                  <>
                    <h4 className="font-black text-slate-950">{criterio.criterio}</h4>
                    <p className="mt-1 text-xs leading-5 text-slate-600"><strong>Evidencia:</strong> {criterio.evidencia}</p>
                  </>
                )}
              </div>
              {editable ? (
                <div className="grid gap-2 text-xs font-black uppercase text-slate-500">
                  <label>
                    Valor
                    <input
                      type="number"
                      min={0}
                      max={escalaNumerica}
                      step={escalaNumerica === 10 ? 0.25 : 1}
                      value={valoresCriterio[criterio.id] ?? 0}
                      onChange={(event) => actualizarValorCriterio(criterio.id, Number(event.target.value))}
                      className="mt-1 w-28 rounded-md border border-slate-200 bg-white p-2 text-sm font-bold text-[#0069aa] outline-none focus:border-sky-500"
                    />
                  </label>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0069aa]">
                    {valoresCriterio[criterio.id] ?? 0}/{escalaNumerica} pts · {criterio.peso}%
                  </span>
                </div>
              ) : (
                <span className="h-fit rounded-full bg-white px-3 py-1 text-xs font-black text-[#0069aa]">{criterio.peso}%</span>
              )}
            </div>
            <div className="grid divide-y divide-slate-200 md:grid-cols-4 md:divide-x md:divide-y-0">
              {criterio.niveles.map((nivel) => (
                <div key={nivel.nivel} className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-black uppercase text-slate-500">Nivel {nivel.nivel}</p>
                    {editable ? (
                      <input value={nivel.puntaje} onChange={(event) => actualizarNivel(criterio.id, nivel.nivel, { puntaje: event.target.value })} className="w-20 rounded-full border border-sky-100 bg-sky-50 px-2 py-1 text-[0.7rem] font-black text-[#0069aa] outline-none focus:border-sky-500" aria-label={`Puntaje nivel ${nivel.nivel}`} />
                    ) : (
                      <span className="rounded-full bg-sky-50 px-2 py-1 text-[0.7rem] font-black text-[#0069aa]">{nivel.puntaje}</span>
                    )}
                  </div>
                  {editable ? (
                    <div className="mt-2 grid gap-2">
                      <input value={nivel.etiqueta} onChange={(event) => actualizarNivel(criterio.id, nivel.nivel, { etiqueta: event.target.value })} className="w-full rounded-md border border-slate-200 bg-white p-2 text-sm font-black text-slate-900 outline-none focus:border-sky-500" aria-label={`Etiqueta nivel ${nivel.nivel}`} />
                      <textarea value={nivel.descriptor} onChange={(event) => actualizarNivel(criterio.id, nivel.nivel, { descriptor: event.target.value })} rows={5} className="w-full resize-y rounded-md border border-slate-200 bg-white p-2 text-xs leading-5 text-slate-700 outline-none focus:border-sky-500" aria-label={`Descriptor nivel ${nivel.nivel}`} />
                    </div>
                  ) : (
                    <>
                      <h5 className="mt-2 text-sm font-black text-slate-900">{nivel.etiqueta}</h5>
                      <p className="mt-2 text-xs leading-5 text-slate-700">{nivel.descriptor}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
