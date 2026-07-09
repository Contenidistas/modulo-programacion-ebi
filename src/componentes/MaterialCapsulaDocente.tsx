'use client';

import { Copy, Download, Eye, FileText, Lightbulb, Printer, RotateCcw } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';
import { crearPromptTutorCapsula } from '@/contenido/capsulasNoveno';
import type { NivelComplejidadId } from '@/contenido/nivelesComplejidadNoveno';
import { construirUrlRea } from '@/utilidades/urlPublicaRea';

const copiarTexto = async (texto: string) => {
  if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(texto);
  const area = document.createElement('textarea');
  area.value = texto;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  const resultado = document.execCommand('copy');
  area.remove();
  if (!resultado) throw new Error('No se pudo copiar');
};

export default function MaterialCapsulaDocente({ capsula, grado, complejidad }: { capsula: CapsulaNoveno; grado: '7mo' | '8vo'; complejidad?: NivelComplejidadId }) {
  const [estado, setEstado] = useState<string | null>(null);
  const promptOriginal = crearPromptTutorCapsula(capsula);
  const [prompt, setPrompt] = useState(promptOriginal);
  const clavePrompt = `rea-prompt-${capsula.id}`;
  useEffect(() => {
    const guardado = window.localStorage.getItem(clavePrompt) ?? promptOriginal;
    const temporizador = window.setTimeout(() => setPrompt(guardado), 0);
    return () => window.clearTimeout(temporizador);
  }, [clavePrompt, promptOriginal]);
  useEffect(() => {
    window.localStorage.setItem(clavePrompt, prompt);
  }, [clavePrompt, prompt]);
  const url = (imprimir = false, publica = false) => {
    const parametros = new URLSearchParams({ grado, interfaz: 'alumno', capsula: capsula.id });
    if (complejidad) parametros.set('complejidad', complejidad);
    if (imprimir) parametros.set('imprimir', '1');
    return construirUrlRea(parametros, publica);
  };
  const notificar = (valor: string) => {
    setEstado(valor);
    window.setTimeout(() => setEstado(null), 2600);
  };
  const copiarIframe = async () => {
    try {
      await copiarTexto(`<iframe src="${url(false, true)}" title="Cápsula de aprendizaje: ${capsula.titulo}" width="100%" height="760" style="border:0; border-radius:8px;" loading="lazy" allow="microphone"></iframe>`);
      notificar('iframe');
    } catch {
      notificar('error');
    }
  };
  const copiarPrompt = async () => {
    try {
      await copiarTexto(prompt);
      notificar('prompt');
    } catch {
      notificar('error');
    }
  };
  const restaurarPrompt = () => {
    setPrompt(promptOriginal);
    window.localStorage.removeItem(clavePrompt);
    notificar('restaurado');
  };
  const descargarFuente = () => {
    const blob = new Blob([JSON.stringify({ ...capsula, promptTutor: prompt }, null, 2)], { type: 'application/json' });
    const enlace = document.createElement('a');
    enlace.href = URL.createObjectURL(blob);
    enlace.download = `${capsula.id}-fuente-editable.json`;
    enlace.click();
    URL.revokeObjectURL(enlace.href);
    notificar('fuente');
  };
  const imprimirFicha = () => {
    const escapar = (valor: string) => valor.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const ventana = window.open('about:blank', '_blank');
    if (!ventana) return notificar('error-ventana');
    ventana.opener = null;
    ventana.document.write(`<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${escapar(capsula.titulo)}</title><style>body{font-family:Arial;color:#172033;margin:0}main{max-width:850px;margin:auto;padding:32px}h1,h2{color:#0069aa}p,li{line-height:1.6}section{border-bottom:1px solid #cbd5e1;padding:18px 0;break-inside:avoid}pre{white-space:pre-wrap;font-family:Arial;background:#f5f3ff;padding:14px}.meta{background:#f0f9ff;padding:12px}</style></head><body><main><h1>${escapar(capsula.titulo)}</h1><p class="meta">${escapar(capsula.gradoTexto ?? '9.º año')} · ${escapar(capsula.duracion)} · ${escapar(capsula.tecnologias.join(', '))}</p><section><h2>Propósito y concepto</h2><p>${escapar(capsula.sintesis)}</p><p>${escapar(capsula.teoria.definicion)}</p></section><section><h2>Actividad</h2><p><strong>Consigna:</strong> ${escapar(capsula.practica.consigna)}</p><ol>${capsula.practica.pasos.map((paso) => `<li>${escapar(paso)}</li>`).join('')}</ol><p><strong>Apoyos DUA:</strong></p><ul>${capsula.practica.apoyos.map((apoyo) => `<li>${escapar(apoyo)}</li>`).join('')}</ul><p><strong>Evidencia:</strong> ${escapar(capsula.practica.evidencia)}</p></section><section><h2>Criterios</h2><ul>${(capsula.criteriosVerificacion ?? []).map((criterio) => `<li>${escapar(criterio)}</li>`).join('')}</ul></section><section><h2>Prompt tutor editado</h2><pre>${escapar(prompt)}</pre></section><section><h2>Enlaces</h2><p>Cápsula: <a href="${url(false, true)}">${url(false, true)}</a></p></section></main></body></html>`);
    ventana.document.close();
    ventana.setTimeout(() => ventana.print(), 250);
    notificar('ficha');
  };

  return (
    <article className="mt-6 border-t border-slate-200 py-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase text-emerald-700">{capsula.concepto}</p>
          <h4 className="mt-1 font-black text-slate-950">{capsula.titulo}</h4>
          <p className="mt-1 text-sm leading-6 text-slate-600">{capsula.sintesis}</p>
          <p className="mt-2 text-sm font-semibold text-slate-700">Consigna: {capsula.practica.consigna}</p>
        </div>
        <div className="grid grid-cols-2 gap-2 print:hidden sm:grid-cols-5">
          <a href={url()} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-2 text-xs font-bold text-[#0069aa]"><Eye size={14} />Previsualizar</a>
          <button type="button" onClick={copiarIframe} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0069aa] px-3 py-2 text-xs font-bold text-white"><Copy size={14} />{estado === 'iframe' ? 'Copiado' : 'Iframe'}</button>
          <a href={url(true)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-orange-100 bg-white px-3 py-2 text-xs font-bold text-[#a65300]"><Printer size={14} />PDF</a>
          <button type="button" onClick={imprimirFicha} className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-xs font-bold text-emerald-800"><FileText size={14} />Ficha integral</button>
          <button type="button" onClick={descargarFuente} className="inline-flex items-center justify-center gap-2 rounded-lg border border-violet-100 bg-white px-3 py-2 text-xs font-bold text-violet-800"><Download size={14} />Fuente</button>
        </div>
      </div>
      <details className="mt-4 rounded-lg border border-violet-100 bg-violet-50 p-3">
        <summary className="cursor-pointer font-bold text-violet-900">Prompt de tutoría ética y reflexiva</summary>
        <p className="mt-3 text-xs leading-5 text-violet-900">Ofrece pistas graduales, protege la autoría y utiliza pruebas sin resolver la actividad.</p>
        <label className="mt-3 block text-xs font-bold text-violet-950" htmlFor={`prompt-${capsula.id}`}>Prompt editable</label>
        <textarea id={`prompt-${capsula.id}`} value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={12} className="mt-2 w-full resize-y rounded-lg border border-violet-100 bg-white p-3 text-xs leading-5 text-slate-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200" />
        <button type="button" onClick={copiarPrompt} className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet-800 px-3 py-2 text-xs font-bold text-white"><Lightbulb size={14} />{estado === 'prompt' ? 'Prompt copiado' : 'Copiar prompt'}</button>
        <button type="button" onClick={restaurarPrompt} className="ml-2 mt-3 inline-flex items-center gap-2 rounded-lg border border-violet-200 bg-white px-3 py-2 text-xs font-bold text-violet-900"><RotateCcw size={14} />Restaurar</button>
      </details>
      {estado === 'error' && <p className="mt-3 text-sm font-bold text-rose-700" role="status">No fue posible copiar automáticamente. Revisa el permiso del portapapeles.</p>}
      {estado === 'error-ventana' && <p className="mt-3 text-sm font-bold text-rose-700" role="status">El navegador bloqueó la ventana de impresión.</p>}
      <span className="sr-only" role="status" aria-live="polite">{estado === 'iframe' ? 'Iframe copiado' : estado === 'prompt' ? 'Prompt copiado' : ''}</span>
    </article>
  );
}
