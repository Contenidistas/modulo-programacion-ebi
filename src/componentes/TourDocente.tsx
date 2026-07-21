'use client';

import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type TourStep = {
  targetId: string;
  titulo: string;
  descripcion: string;
};

export default function TourDocente({
  activo,
  onClose,
  grado,
}: {
  activo: boolean;
  onClose: () => void;
  grado: string;
}) {
  const [pasoActual, setPasoActual] = useState(0);

  const pasos: TourStep[] = [
    {
      targetId: 'tour-grados',
      titulo: 'Selector de Grado 🏫',
      descripcion: 'Navega rápidamente entre las planificaciones y contenidos oficiales de 7.º, 8.º y 9.º año en cualquier momento.',
    },
    {
      targetId: 'tour-unidades',
      titulo: 'Progresión de Unidades 📂',
      descripcion: `Selecciona una unidad didáctica de la progresión sugerida. Cada una contiene propósitos y materiales listos para el aula.`,
    },
    {
      targetId: 'tour-acciones',
      titulo: 'Acciones Rápidas de la Cápsula ⚡',
      descripcion: 'Previsualiza el desafío del estudiante, copia el código de Iframe para insertarlo en CREA en un clic, o imprime la planificación docente en PDF.',
    },
    {
      targetId: 'tour-personalizar',
      titulo: 'Configuración Avanzada e IA ⚙️',
      descripcion: 'Expande estos acordeones cuando necesites cambiar el nivel de complejidad del desafío, editar el comportamiento del tutor ético de IA, o revisar la secuencia didáctica completa con su evaluación.',
    },
  ];

  // Adjust text based on grade
  if (grado === '8vo') {
    pasos[1].descripcion = 'Selecciona una unidad didáctica de la progresión sugerida para 8.º año. Cada una contiene propósitos y materiales listos para el aula.';
  } else if (grado === '9no') {
    pasos[1].descripcion = 'Selecciona una unidad didáctica de la progresión sugerida para 9.º año. Cada una contiene propósitos y materiales listos para el aula.';
    pasos[2].descripcion = 'Previsualiza la cápsula del estudiante, copia el Iframe para CREA o imprime el PDF. Cada cápsula tiene variantes tecnológicas y rúbricas analíticas.';
    pasos[3].descripcion = 'Expande los acordeones para personalizar la complejidad y consigna de cada cápsula, consultar variantes tecnológicas, rúbricas de evaluación o el prompt del tutor ético de IA.';
  }

  useEffect(() => {
    if (!activo) {
      limpiarResaltados();
      return;
    }

    const paso = pasos[pasoActual];
    if (!paso) return;

    // Small delay to allow page render/scroll
    const timer = setTimeout(() => {
      limpiarResaltados();
      const elemento = document.getElementById(paso.targetId);
      if (elemento) {
        elemento.classList.add('tour-highlight');
        elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [activo, pasoActual]);

  const limpiarResaltados = () => {
    pasos.forEach((p) => {
      const el = document.getElementById(p.targetId);
      if (el) {
        el.classList.remove('tour-highlight');
      }
    });
  };

  const irASiguiente = () => {
    if (pasoActual < pasos.length - 1) {
      setPasoActual((p) => p + 1);
    } else {
      finalizar();
    }
  };

  const irAAnterior = () => {
    if (pasoActual > 0) {
      setPasoActual((p) => p - 1);
    }
  };

  const finalizar = () => {
    limpiarResaltados();
    setPasoActual(0);
    onClose();
  };

  if (!activo) return null;

  const paso = pasos[pasoActual];

  return (
    <>
      {/* Dark backdrop */}
      <div className="tour-backdrop print:hidden" onClick={finalizar} />

      {/* Floating Tour Card */}
      <div className="tour-card print:hidden flex flex-col justify-between" role="dialog" aria-modal="true">
        <div className="flex items-start justify-between">
          <span className="text-[10px] font-black uppercase text-[#c66b00] tracking-wider">
            Guía Interactiva · Paso {pasoActual + 1} de {pasos.length}
          </span>
          <button
            type="button"
            onClick={finalizar}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
            aria-label="Cerrar guía"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-2">
          <h3 className="text-base font-black text-[#0069aa]">{paso.titulo}</h3>
          <p className="mt-1.5 text-xs leading-5 text-slate-600">{paso.descripcion}</p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={finalizar}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition"
          >
            Omitir guía
          </button>
          
          <div className="flex gap-2">
            <button
              type="button"
              onClick={irAAnterior}
              disabled={pasoActual === 0}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
              aria-label="Paso anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={irASiguiente}
              className="inline-flex h-8 px-3 items-center justify-center rounded-lg bg-[#f7941d] text-xs font-black text-white transition hover:bg-[#e08316]"
            >
              {pasoActual === pasos.length - 1 ? (
                'Entendido'
              ) : (
                <>
                  Siguiente
                  <ChevronRight size={14} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
