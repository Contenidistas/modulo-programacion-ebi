'use client';

import { BookOpen, Download, Eye, Lightbulb, Mic, Paperclip, RotateCcw, Square, Volume2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FormatoRespuesta = 'texto' | 'audio' | 'diagrama' | 'bloques' | 'pseudocodigo' | 'programa';
type ContextoTrabajo = 'con_dispositivo' | 'sin_dispositivo';
type NivelDesafio = 'basico' | 'ampliado';

type EstadoGuardado = {
  contexto?: ContextoTrabajo;
  nivel?: NivelDesafio;
  formato?: FormatoRespuesta;
  saber?: string;
  experiencia?: string;
  recordar?: string;
  respuesta?: string;
};

const formatos: { id: FormatoRespuesta; etiqueta: string; ayuda: string }[] = [
  { id: 'texto', etiqueta: 'Texto', ayuda: 'Explica tu solución y las decisiones que tomaste.' },
  { id: 'audio', etiqueta: 'Audio', ayuda: 'Graba una explicación breve de tu proceso y tus pruebas.' },
  { id: 'diagrama', etiqueta: 'Diagrama', ayuda: 'Dibuja relaciones, decisiones o el recorrido de la solución y adjúntalo.' },
  { id: 'bloques', etiqueta: 'Bloques', ayuda: 'Construye o describe una secuencia de bloques y adjunta una captura si la tienes.' },
  { id: 'pseudocodigo', etiqueta: 'Pseudocódigo', ayuda: 'Representa la lógica sin depender de la sintaxis de un lenguaje.' },
  { id: 'programa', etiqueta: 'Programa', ayuda: 'Escribe, prueba y comenta una implementación.' },
];

const plantillas: Record<Exclude<FormatoRespuesta, 'audio'>, string> = {
  texto: 'Mi idea es...\nElegí esta estrategia porque...\nLa comprobé mediante...',
  diagrama: 'Describe aquí qué representa tu diagrama, sus símbolos y el recorrido que debe seguirse.',
  bloques: 'Evento o inicio:\nBloques principales:\nDecisión o repetición:\nResultado esperado:',
  pseudocodigo: 'INICIO\n  datos o materiales: ...\n  pasos: ...\n  decisión o comprobación: ...\n  mostrar o comunicar: ...\nFIN',
  programa: '// Explica el propósito\n// Define datos o entradas\n\n// Construye la solución\n\n// Registra cómo la probaste',
};

export default function PanelDuaEstudiante({
  id,
  titulo,
  concepto,
  preguntaOrientadora,
  ejemploAnalogo,
  estructuraParcial,
  desafioBasico,
  desafioAmpliado,
  conDispositivo,
  sinDispositivo,
  criterio,
}: {
  id: string;
  titulo: string;
  concepto: string;
  preguntaOrientadora: string;
  ejemploAnalogo: string;
  estructuraParcial: string;
  desafioBasico: string;
  desafioAmpliado: string;
  conDispositivo: string;
  sinDispositivo: string;
  criterio: string;
}) {
  const clave = `rea-dua-${id}`;
  const [contexto, setContexto] = useState<ContextoTrabajo>('con_dispositivo');
  const [nivel, setNivel] = useState<NivelDesafio>('basico');
  const [formato, setFormato] = useState<FormatoRespuesta>('texto');
  const [saber, setSaber] = useState('');
  const [experiencia, setExperiencia] = useState('');
  const [recordar, setRecordar] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [ejemploVisible, setEjemploVisible] = useState(false);
  const [pistasVisibles, setPistasVisibles] = useState(0);
  const [lecturaActiva, setLecturaActiva] = useState(false);
  const [grabando, setGrabando] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mensajeAudio, setMensajeAudio] = useState('');
  const [hidratado, setHidratado] = useState(false);
  const grabadorRef = useRef<MediaRecorder | null>(null);
  const fragmentosRef = useRef<Blob[]>([]);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let guardado: EstadoGuardado = {};
    try {
      guardado = JSON.parse(window.localStorage.getItem(clave) ?? '{}') as EstadoGuardado;
    } catch {
      window.localStorage.removeItem(clave);
    }
    const temporizador = window.setTimeout(() => {
      if (guardado.contexto) setContexto(guardado.contexto);
      if (guardado.nivel) setNivel(guardado.nivel);
      if (guardado.formato) setFormato(guardado.formato);
      setSaber(guardado.saber ?? '');
      setExperiencia(guardado.experiencia ?? '');
      setRecordar(guardado.recordar ?? '');
      setRespuesta(guardado.respuesta ?? '');
      setHidratado(true);
    }, 0);
    return () => window.clearTimeout(temporizador);
  }, [clave]);

  useEffect(() => {
    if (!hidratado) return;
    const estado: EstadoGuardado = { contexto, nivel, formato, saber, experiencia, recordar, respuesta };
    window.localStorage.setItem(clave, JSON.stringify(estado));
  }, [clave, contexto, experiencia, formato, hidratado, nivel, recordar, respuesta, saber]);

  useEffect(() => () => {
    window.speechSynthesis?.cancel();
    if (grabadorRef.current?.state === 'recording') grabadorRef.current.stop();
    if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
  }, []);

  const textoEscucha = `${titulo}. Antes de comenzar: ${preguntaOrientadora}. Desafío ${nivel === 'basico' ? 'básico' : 'ampliado'}: ${nivel === 'basico' ? desafioBasico : desafioAmpliado}. Forma de trabajo: ${contexto === 'con_dispositivo' ? conDispositivo : sinDispositivo}. Criterio: ${criterio}.`;

  const alternarLectura = () => {
    if (!('speechSynthesis' in window)) return;
    if (lecturaActiva) {
      window.speechSynthesis.cancel();
      setLecturaActiva(false);
      return;
    }
    const lectura = new SpeechSynthesisUtterance(textoEscucha);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLecturaActiva(false);
    lectura.onerror = () => setLecturaActiva(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLecturaActiva(true);
  };

  const iniciarGrabacion = async () => {
    if (!navigator.mediaDevices?.getUserMedia || !('MediaRecorder' in window)) {
      setMensajeAudio('Este navegador no permite grabar audio. Puedes adjuntar un archivo grabado con otra aplicación.');
      return;
    }
    try {
      const flujo = await navigator.mediaDevices.getUserMedia({ audio: true });
      const grabador = new MediaRecorder(flujo);
      fragmentosRef.current = [];
      grabador.ondataavailable = (evento) => {
        if (evento.data.size > 0) fragmentosRef.current.push(evento.data);
      };
      grabador.onstop = () => {
        const audio = new Blob(fragmentosRef.current, { type: grabador.mimeType || 'audio/webm' });
        if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
        const url = URL.createObjectURL(audio);
        audioUrlRef.current = url;
        setAudioUrl(url);
        setGrabando(false);
        setMensajeAudio('Grabación preparada. Escúchala antes de descargarla o volver a grabar.');
        flujo.getTracks().forEach((pista) => pista.stop());
      };
      grabadorRef.current = grabador;
      grabador.start();
      setGrabando(true);
      setMensajeAudio('Grabando. Explica qué decidiste, cómo lo probaste y qué cambiarías.');
    } catch {
      setMensajeAudio('No fue posible acceder al micrófono. Revisa el permiso del navegador o adjunta un audio.');
    }
  };

  const detenerGrabacion = () => {
    if (grabadorRef.current?.state === 'recording') grabadorRef.current.stop();
  };

  const limpiarApoyos = () => {
    setPistasVisibles(0);
    setEjemploVisible(false);
  };

  const ayudaFormato = formatos.find((item) => item.id === formato)?.ayuda ?? '';
  const aceptaArchivo = formato === 'audio' ? 'audio/*' : formato === 'diagrama' || formato === 'bloques' ? 'image/*,.pdf' : '.txt,.pdf,.sb3,.py,.js,.psc';

  return (
    <section className="border-y border-sky-100 bg-white/95 py-6 print:bg-white" aria-labelledby={`dua-${id}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="flex items-start gap-3">
          <BookOpen className="mt-1 shrink-0 text-[#0069aa]" size={21} />
          <div>
            <p className="text-xs font-black uppercase text-[#c66b00]">Opciones para aprender</p>
            <h2 id={`dua-${id}`} className="mt-1 text-xl font-black text-[#0069aa]">Cómo quiero trabajar</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Elige apoyos y una forma de responder. El objetivo y el criterio de aprendizaje se mantienen.</p>
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="space-y-5">
            <fieldset>
              <legend className="text-sm font-black text-slate-950">1. Acceso a la propuesta</legend>
              <div className="mt-2 flex flex-wrap gap-2 print:hidden">
                <button type="button" onClick={() => document.getElementById(`desafio-${id}`)?.focus()} className="inline-flex items-center gap-2 rounded-lg border border-sky-100 bg-white px-3 py-2 text-sm font-bold text-[#0069aa]"><BookOpen size={16} />Leer</button>
                <button type="button" onClick={alternarLectura} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white ${lecturaActiva ? 'bg-rose-600' : 'bg-[#0069aa]'}`}>{lecturaActiva ? <Square size={15} /> : <Volume2 size={16} />}{lecturaActiva ? 'Detener' : 'Escuchar'}</button>
                <button type="button" onClick={() => setEjemploVisible((actual) => !actual)} aria-expanded={ejemploVisible} className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-white px-3 py-2 text-sm font-bold text-emerald-800"><Eye size={16} />{ejemploVisible ? 'Ocultar ejemplo' : 'Ver ejemplo'}</button>
              </div>
              {ejemploVisible && <div className="mt-3 border-l-4 border-emerald-400 bg-emerald-50 p-3 text-sm leading-6 text-emerald-950"><strong>Ejemplo análogo:</strong> {ejemploAnalogo}</div>}
            </fieldset>

            <fieldset>
              <legend className="text-sm font-black text-slate-950">2. Contexto de trabajo</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([['con_dispositivo', 'Con dispositivo'], ['sin_dispositivo', 'Sin dispositivo']] as const).map(([valor, etiqueta]) => <label key={valor} className={`cursor-pointer rounded-lg border p-3 text-sm font-bold ${contexto === valor ? 'border-[#0069aa] bg-sky-50 text-[#0069aa]' : 'border-slate-200 bg-white text-slate-700'}`}><input type="radio" name={`contexto-${id}`} value={valor} checked={contexto === valor} onChange={() => setContexto(valor)} className="mr-2" />{etiqueta}</label>)}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{contexto === 'con_dispositivo' ? conDispositivo : sinDispositivo}</p>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-black text-slate-950">3. Nivel de desafío</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([['basico', 'Básico'], ['ampliado', 'Ampliado']] as const).map(([valor, etiqueta]) => <label key={valor} className={`cursor-pointer rounded-lg border p-3 text-sm font-bold ${nivel === valor ? 'border-[#0069aa] bg-sky-50 text-[#0069aa]' : 'border-slate-200 bg-white text-slate-700'}`}><input type="radio" name={`nivel-${id}`} value={valor} checked={nivel === valor} onChange={() => setNivel(valor)} className="mr-2" />{etiqueta}</label>)}
              </div>
              <div id={`desafio-${id}`} tabIndex={-1} className="mt-3 border-l-4 border-[#f7941d] bg-orange-50 p-3 text-sm leading-6 text-slate-800"><strong>Desafío seleccionado:</strong> {nivel === 'basico' ? desafioBasico : desafioAmpliado}</div>
            </fieldset>
          </div>

          <div>
            <h3 className="text-sm font-black text-slate-950">Antes de comenzar</h3>
            <p className="mt-1 text-sm leading-6 text-slate-600">Conecta {concepto.toLowerCase()} con lo que ya conoces. No hay respuestas correctas en esta activación.</p>
            <div className="mt-3 space-y-3">
              <label className="block text-sm font-bold text-slate-700">¿Qué sé?<textarea value={saber} onChange={(evento) => setSaber(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 font-normal leading-6 outline-none focus:border-sky-500" placeholder={`Escribe una idea que ya tengas sobre ${concepto.toLowerCase()}.`} /></label>
              <label className="block text-sm font-bold text-slate-700">¿Dónde lo vi?<textarea value={experiencia} onChange={(evento) => setExperiencia(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 font-normal leading-6 outline-none focus:border-sky-500" placeholder="Recuerda una situación cotidiana, juego, dispositivo o actividad anterior." /></label>
              <label className="block text-sm font-bold text-slate-700">¿Qué necesito recordar?<textarea value={recordar} onChange={(evento) => setRecordar(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-3 font-normal leading-6 outline-none focus:border-sky-500" placeholder="Anota una palabra, procedimiento o pregunta que quieras consultar." /></label>
            </div>
          </div>
        </div>

        <section className="mt-6 border-t border-sky-100 pt-5" aria-labelledby={`apoyos-${id}`}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><h3 id={`apoyos-${id}`} className="font-black text-slate-950">Apoyos progresivos</h3><p className="mt-1 text-sm text-slate-600">Abre solo el apoyo que necesites y retíralos para intentarlo nuevamente.</p></div>
            <div className="flex gap-2 print:hidden">
              <button type="button" onClick={() => setPistasVisibles((actual) => Math.min(3, actual + 1))} disabled={pistasVisibles === 3} className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-sm font-bold text-slate-950 disabled:opacity-50"><Lightbulb size={16} />Solicitar pista</button>
              {(pistasVisibles > 0 || ejemploVisible) && <button type="button" onClick={limpiarApoyos} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700"><RotateCcw size={15} />Retirar apoyos</button>}
            </div>
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-3" aria-live="polite">
            {pistasVisibles >= 1 && <div className="border-l-4 border-amber-400 bg-amber-50 p-3"><p className="text-xs font-black uppercase text-amber-800">Pista 1 · Pregunta</p><p className="mt-1 text-sm leading-6 text-slate-700">{preguntaOrientadora}</p></div>}
            {pistasVisibles >= 2 && <div className="border-l-4 border-sky-400 bg-sky-50 p-3"><p className="text-xs font-black uppercase text-[#0069aa]">Pista 2 · Analogía</p><p className="mt-1 text-sm leading-6 text-slate-700">{ejemploAnalogo}</p></div>}
            {pistasVisibles >= 3 && <div className="border-l-4 border-violet-400 bg-violet-50 p-3"><p className="text-xs font-black uppercase text-violet-800">Pista 3 · Estructura</p><pre className="mt-1 whitespace-pre-wrap font-sans text-sm leading-6 text-slate-700">{estructuraParcial}</pre></div>}
          </div>
        </section>

        <section className="mt-6 border-t border-sky-100 pt-5" aria-labelledby={`respuesta-${id}`}>
          <h3 id={`respuesta-${id}`} className="font-black text-slate-950">Elijo cómo responder</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">Todas las formas se valoran con el mismo criterio: {criterio}</p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-2 print:hidden" role="tablist" aria-label="Formato de respuesta">
            {formatos.map((item) => <button key={item.id} type="button" role="tab" aria-selected={formato === item.id} onClick={() => setFormato(item.id)} className={`min-h-10 whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold ${formato === item.id ? 'border-[#0069aa] bg-[#0069aa] text-white' : 'border-slate-200 bg-white text-slate-700'}`}>{item.etiqueta}</button>)}
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600">{ayudaFormato}</p>

          {formato === 'audio' ? (
            <div className="mt-3 border-l-4 border-[#0069aa] bg-sky-50 p-4">
              <div className="flex flex-wrap gap-2 print:hidden">
                {!grabando ? <button type="button" onClick={iniciarGrabacion} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-3 py-2 text-sm font-bold text-white"><Mic size={16} />Grabar audio</button> : <button type="button" onClick={detenerGrabacion} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white"><Square size={15} />Detener grabación</button>}
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-bold text-[#0069aa]"><Paperclip size={16} />Adjuntar audio<input type="file" accept={aceptaArchivo} className="sr-only" /></label>
                {audioUrl && <a href={audioUrl} download={`${id}-respuesta.webm`} className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-bold text-emerald-800"><Download size={16} />Descargar grabación</a>}
              </div>
              {audioUrl && <audio controls src={audioUrl} className="mt-3 w-full" />}
              <p className="mt-2 text-sm leading-6 text-slate-700" aria-live="polite">{mensajeAudio}</p>
            </div>
          ) : (
            <div className="mt-3">
              <textarea value={respuesta} onChange={(evento) => setRespuesta(evento.target.value)} rows={formato === 'programa' || formato === 'pseudocodigo' ? 10 : 7} className={`w-full resize-y rounded-lg border border-slate-200 bg-white p-4 leading-6 outline-none focus:border-sky-500 ${formato === 'programa' || formato === 'pseudocodigo' ? 'font-mono text-sm' : ''}`} placeholder={plantillas[formato]} />
              <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 print:hidden"><Paperclip size={16} />Adjuntar producción<input type="file" accept={aceptaArchivo} className="sr-only" /></label>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
