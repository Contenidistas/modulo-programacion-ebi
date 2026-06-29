'use client';

import { Contrast, Square, Type, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const clave = 'rea-accesibilidad-global';

export default function ControlesAccesibilidad({ mostrarLectura = true, mostrarTexto = true }: { mostrarLectura?: boolean; mostrarTexto?: boolean }) {
  const [contraste, setContraste] = useState(false);
  const [textoGrande, setTextoGrande] = useState(false);
  const [leyendo, setLeyendo] = useState(false);

  useEffect(() => {
    let guardado: { contraste?: boolean; textoGrande?: boolean } = {};
    try {
      guardado = JSON.parse(window.localStorage.getItem(clave) ?? '{}') as typeof guardado;
    } catch {
      window.localStorage.removeItem(clave);
    }
    const temporizador = window.setTimeout(() => {
      setContraste(guardado.contraste === true);
      setTextoGrande(guardado.textoGrande === true);
    }, 0);
    return () => {
      window.clearTimeout(temporizador);
      window.speechSynthesis?.cancel();
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.altoContraste = String(contraste);
    document.documentElement.dataset.textoGrande = String(textoGrande);
    window.localStorage.setItem(clave, JSON.stringify({ contraste, textoGrande }));
  }, [contraste, textoGrande]);

  const alternarLectura = () => {
    if (!('speechSynthesis' in window)) return;
    if (leyendo) {
      window.speechSynthesis.cancel();
      setLeyendo(false);
      return;
    }
    const texto = document.querySelector('main')?.innerText.trim();
    if (!texto) return;
    const lectura = new SpeechSynthesisUtterance(texto);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLeyendo(false);
    lectura.onerror = () => setLeyendo(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLeyendo(true);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-sky-100 bg-white p-1 print:hidden" aria-label="Controles de accesibilidad">
      <button type="button" onClick={() => setContraste((valor) => !valor)} aria-pressed={contraste} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#0069aa] hover:bg-sky-50" title={contraste ? 'Desactivar alto contraste' : 'Activar alto contraste'} aria-label={contraste ? 'Desactivar alto contraste' : 'Activar alto contraste'}><Contrast size={17} /></button>
      {mostrarTexto && <button type="button" onClick={() => setTextoGrande((valor) => !valor)} aria-pressed={textoGrande} className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[#0069aa] hover:bg-sky-50" title={textoGrande ? 'Usar texto normal' : 'Aumentar texto'} aria-label={textoGrande ? 'Usar texto normal' : 'Aumentar texto'}><Type size={17} /></button>}
      {mostrarLectura && <button type="button" onClick={alternarLectura} aria-pressed={leyendo} className={`inline-flex h-9 w-9 items-center justify-center rounded-md text-white ${leyendo ? 'bg-rose-600' : 'bg-[#0069aa]'}`} title={leyendo ? 'Detener lectura' : 'Leer página'} aria-label={leyendo ? 'Detener lectura' : 'Leer página'}>{leyendo ? <Square size={15} /> : <Volume2 size={17} />}</button>}
    </div>
  );
}
