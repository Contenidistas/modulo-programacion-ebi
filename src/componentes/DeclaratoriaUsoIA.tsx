import { ExternalLink, ShieldCheck } from 'lucide-react';

const principios = [
  ['Finalidad pedagógica', 'La IA se propone como tutor que pregunta, orienta y ofrece pistas graduales; no sustituye la comprensión, las decisiones ni la producción del estudiante.'],
  ['Transparencia y autoría', 'Toda producción debe declarar si se utilizó IA, para qué se utilizó, qué sugerencias se aceptaron y cómo fueron verificadas o modificadas.'],
  ['Privacidad y cuidado', 'No se ingresan datos personales, sensibles o identificables. Se emplean datos ficticios y se revisan posibles sesgos, exclusiones e impactos.'],
  ['Verificación y responsabilidad', 'Las respuestas se contrastan con fuentes, pruebas y criterios de la actividad. La decisión pedagógica y la evaluación permanecen bajo supervisión docente.'],
] as const;

export default function DeclaratoriaUsoIA({ className = '' }: { className?: string }) {
  return (
    <section id="ia" className={className} aria-labelledby="titulo-declaratoria-ia">
      <div className="grid gap-6 lg:grid-cols-[0.35fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase text-[#c66b00]">Criterios de uso</p>
          <h2 id="titulo-declaratoria-ia" className="mt-1 text-xl font-black text-[#0069aa]">IA y ética pedagógica</h2>
        </div>
        <div>
          <p className="leading-7 text-slate-700">
            Este REA admite inteligencia artificial únicamente como mediación formativa. Su uso debe fortalecer la autonomía, hacer visible el proceso y evitar la suplantación cognitiva.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {principios.map(([titulo, detalle]) => (
              <div key={titulo} className="border-l-4 border-violet-400 bg-violet-50 p-4">
                <h3 className="font-black text-violet-950">{titulo}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-700">{detalle}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-3 border-t border-violet-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <ShieldCheck className="mt-1 shrink-0 text-violet-700" size={20} />
              <p className="max-w-2xl text-sm leading-6 text-slate-700">Consulta orientaciones, casos y herramientas para acordar usos responsables de IA con el grupo.</p>
            </div>
            <a
              href="https://contenidistas.github.io/IAG-en-clave-de-etica-pedagogica/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-800 px-4 py-3 text-sm font-bold text-white transition hover:bg-violet-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            >
              Abrir IA en clave ética <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
