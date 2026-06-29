'use client';

import { BookOpen, Calendar, Code2, CreativeCommons, ExternalLink, UserRound } from 'lucide-react';

const programas = {
  '7mo': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf',
  '8vo': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%205%20-%202024.pdf',
  '9no': 'https://www.anep.edu.uy/sites/default/files/images/te-programas/2024/ajustes/3er_ciclo/Ciencias%20de%20la%20Computaci%C3%B3n%20-%20Tramo%206%20-%202024.pdf',
};

export default function MetadatosRea({ grado }: { grado: '7mo' | '8vo' | '9no' }) {
  return (
    <section className="border-t border-sky-100 bg-white px-4 py-7 print:hidden" aria-labelledby={`metadatos-${grado}`}>
      <div className="mx-auto max-w-6xl md:px-4">
        <h2 id={`metadatos-${grado}`} className="text-lg font-black text-[#0069aa]">Información del Recurso Educativo Abierto</h2>
        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex gap-3"><UserRound className="shrink-0 text-[#f7941d]" size={18} /><div><dt className="font-black text-slate-950">Autoría institucional</dt><dd className="mt-1 leading-6 text-slate-600">EDyTIC. Contenidos y atribuciones editables por la institución reutilizadora.</dd></div></div>
          <div className="flex gap-3"><CreativeCommons className="shrink-0 text-[#f7941d]" size={18} /><div><dt className="font-black text-slate-950">Licencia</dt><dd className="mt-1 leading-6 text-slate-600"><a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noreferrer" className="font-bold text-[#0069aa]">CC BY-SA 4.0 <ExternalLink className="inline" size={13} /></a></dd></div></div>
          <div className="flex gap-3"><Calendar className="shrink-0 text-[#f7941d]" size={18} /><div><dt className="font-black text-slate-950">Versión</dt><dd className="mt-1 leading-6 text-slate-600">1.0 · 28 de junio de 2026 · Programación EBI.</dd></div></div>
          <div className="flex gap-3"><Code2 className="shrink-0 text-[#f7941d]" size={18} /><div><dt className="font-black text-slate-950">Fuentes editables</dt><dd className="mt-1 leading-6 text-slate-600">TypeScript, JSON y Markdown. Cada cápsula permite descargar su fuente estructurada.</dd></div></div>
        </dl>
        <div className="mt-5 grid gap-4 border-t border-sky-100 pt-4 md:grid-cols-2">
          <div className="flex gap-3"><BookOpen className="mt-1 shrink-0 text-[#f7941d]" size={18} /><div><h3 className="font-black text-slate-950">Bibliografía curricular</h3><a href={programas[grado]} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-2 text-sm font-bold text-[#0069aa]">Programa oficial ANEP <ExternalLink size={13} /></a><p className="mt-1 text-xs leading-5 text-slate-500">ANEP, Ciencias de la Computación, ajustes 2024.</p></div></div>
          <div><h3 className="font-black text-slate-950">Atribuciones</h3><p className="mt-1 text-xs leading-5 text-slate-600">Los materiales eXeLearning y sus recursos conservan las atribuciones presentes en sus fuentes. Los contenidos externos se enlazan como referencia y deben mantener su licencia original. No se incorporan datos personales en las actividades.</p></div>
        </div>
      </div>
    </section>
  );
}
