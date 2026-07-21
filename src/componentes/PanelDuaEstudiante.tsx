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
  nivelFijado,
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
  nivelFijado?: NivelDesafio;
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
      if (nivelFijado) setNivel(nivelFijado);
      else if (guardado.nivel) setNivel(guardado.nivel);
      if (guardado.formato) setFormato(guardado.formato);
      setSaber(guardado.saber ?? '');
      setExperiencia(guardado.experiencia ?? '');
      setRecordar(guardado.recordar ?? '');
      setRespuesta(guardado.respuesta ?? '');
      setHidratado(true);
    }, 0);
    return () => window.clearTimeout(temporizador);
  }, [clave, nivelFijado]);

  useEffect(() => {
    if (!hidratado) return;
    const estado: EstadoGuardado = { contexto, nivel: nivelFijado ?? nivel, formato, saber, experiencia, recordar, respuesta };
    window.localStorage.setItem(clave, JSON.stringify(estado));
  }, [clave, contexto, experiencia, formato, hidratado, nivel, nivelFijado, recordar, respuesta, saber]);

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
    <section className="border-y border-sky-100 bg-sky-50/70 py-6 print:bg-white" aria-labelledby={`dua-${id}`}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="capsula-panel p-5 bg-white rounded-2xl border border-sky-100 shadow-sm">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-sky-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-[#0069aa]">
                <BookOpen size={21} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-[#c66b00]">Cápsula de aprendizaje: {concepto}</p>
                <h2 id={`dua-${id}`} className="mt-1 text-xl font-black text-[#0069aa]">{titulo}</h2>
              </div>
            </div>
            <span className="h-fit rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-black text-[#0069aa]">{nivel === 'basico' ? 'Básico' : 'Ampliado'}</span>
          </div>

          {/* 1. Main Challenge Box */}
          <div className="mt-5 border-l-4 border-[#f7941d] bg-orange-50 p-4 rounded-r-lg">
            <h3 className="text-xs font-black uppercase text-[#9a4f00] tracking-wide">Desafío a Resolver</h3>
            <p id={`desafio-${id}`} tabIndex={-1} className="mt-2 text-base font-semibold leading-7 text-slate-800 outline-none">
              {nivel === 'basico' ? desafioBasico : desafioAmpliado}
            </p>
            
            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-orange-200/50 pt-3">
              {/* Accessibility controls */}
              <button type="button" onClick={alternarLectura} className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white transition ${lecturaActiva ? 'bg-rose-600' : 'bg-[#0069aa] hover:bg-[#005487]'}`}>
                {lecturaActiva ? <Square size={12} /> : <Volume2 size={13} />}
                {lecturaActiva ? 'Detener lectura' : 'Escuchar desafío'}
              </button>
              
              <button type="button" onClick={() => setEjemploVisible((actual) => !actual)} aria-expanded={ejemploVisible} className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition">
                <Eye size={13} />
                {ejemploVisible ? 'Ocultar analogía' : 'Ver ejemplo análogo'}
              </button>

              <span className="text-xs text-slate-600 italic">
                Forma de trabajo: {contexto === 'con_dispositivo' ? conDispositivo : sinDispositivo}
              </span>
            </div>

            {ejemploVisible && (
              <div className="mt-3 bg-white p-3 rounded-lg border border-emerald-100 text-xs leading-5 text-slate-700 shadow-inner">
                <strong>Ejemplo en la vida cotidiana:</strong> {ejemploAnalogo}
              </div>
            )}
          </div>

          {/* 2. Work Area (2-column grid) */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Column A: Antes de comenzar (Activación Reflexiva) */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
              <p className="text-xs font-black uppercase text-[#c66b00]">Activación inicial</p>
              <h3 className="mt-1 text-sm font-black text-slate-900">Antes de comenzar</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">Conecta el concepto con lo que ya sabes antes de empezar a programar.</p>
              <div className="mt-4 space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  ¿Qué sé de esto?
                  <textarea value={saber} onChange={(evento) => setSaber(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-2.5 font-normal text-xs leading-5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder={`Escribe una idea sobre ${concepto.toLowerCase()}.`} />
                </label>
                <label className="block text-xs font-bold text-slate-700">
                  ¿Dónde lo he visto?
                  <textarea value={experiencia} onChange={(evento) => setExperiencia(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-2.5 font-normal text-xs leading-5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Un juego, situación diaria o dispositivo." />
                </label>
                <label className="block text-xs font-bold text-slate-700">
                  ¿Qué necesito recordar?
                  <textarea value={recordar} onChange={(evento) => setRecordar(evento.target.value)} rows={2} className="mt-1 w-full resize-y rounded-lg border border-slate-200 bg-white p-2.5 font-normal text-xs leading-5 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500" placeholder="Alguna regla, duda o concepto clave." />
                </label>
              </div>
            </div>

            {/* Column B: Elijo cómo responder (Entrega del estudiante) */}
            <div className="rounded-xl border border-sky-100 bg-sky-50/30 p-4 flex flex-col">
              <p className="text-xs font-black uppercase text-[#0069aa]">Resolución</p>
              <h3 className="mt-1 text-sm font-black text-slate-900">Elijo cómo responder</h3>
              <p className="mt-1 text-xs leading-5 text-slate-600">Todas las formas de respuesta se valoran igual. Criterio: {criterio}</p>
              
              <div className="mt-3 flex gap-1.5 overflow-x-auto pb-2 print:hidden" role="tablist" aria-label="Formato de respuesta">
                {formatos.map((item) => (
                  <button key={item.id} type="button" role="tab" aria-selected={formato === item.id} onClick={() => setFormato(item.id)} className={`h-8 whitespace-nowrap rounded-lg border px-2.5 py-1 text-xs font-bold transition ${formato === item.id ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-sky-50'}`}>{item.etiqueta}</button>
                ))}
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-600 font-semibold">{ayudaFormato}</p>

              {formato === 'audio' ? (
                <div className="mt-3 border border-sky-100 bg-white rounded-lg p-3 flex-1 flex flex-col justify-between">
                  <div className="flex flex-wrap gap-2 print:hidden">
                    {!grabando ? (
                      <button type="button" onClick={iniciarGrabacion} className="inline-flex items-center gap-2 rounded-lg bg-[#0069aa] px-3 py-1.5 text-xs font-bold text-white"><Mic size={14} />Grabar audio</button>
                    ) : (
                      <button type="button" onClick={detenerGrabacion} className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-bold text-white"><Square size={13} />Detener</button>
                    )}
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-sky-200 bg-white px-3 py-1.5 text-xs font-bold text-[#0069aa]"><Paperclip size={14} />Adjuntar<input type="file" accept={aceptaArchivo} className="sr-only" /></label>
                    {audioUrl && <a href={audioUrl} download={`${id}-respuesta.webm`} className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-800"><Download size={14} />Descargar</a>}
                  </div>
                  {audioUrl && <audio controls src={audioUrl} className="mt-3 w-full" />}
                  <p className="mt-2 text-xs leading-5 text-slate-600 italic" aria-live="polite">{mensajeAudio}</p>
                </div>
              ) : (
                <div className="mt-3 flex-1 flex flex-col">
                  <textarea value={respuesta} onChange={(evento) => setRespuesta(evento.target.value)} rows={5} className={`w-full flex-1 resize-y rounded-lg border border-slate-200 bg-white p-3 leading-5 outline-none focus:border-sky-500 ${formato === 'programa' || formato === 'pseudocodigo' ? 'font-mono text-xs' : 'text-xs'}`} placeholder={plantillas[formato]} />
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 print:hidden w-fit"><Paperclip size={14} />Adjuntar producción<input type="file" accept={aceptaArchivo} className="sr-only" /></label>
                </div>
              )}
            </div>
          </div>

          {/* 3. Bottom: Apoyos progresivos (Hints) */}
          <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50/40 p-4" aria-labelledby={`apoyos-${id}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 id={`apoyos-${id}`} className="text-sm font-black text-slate-900">¿Necesitas ayuda? (Apoyos progresivos)</h3>
                <p className="mt-1 text-xs text-slate-600">Solicita pistas graduales si tienes dificultades. Intenta resolverlo sin ellas después.</p>
              </div>
              <div className="flex gap-2 print:hidden">
                <button type="button" onClick={() => setPistasVisibles((actual) => Math.min(3, actual + 1))} disabled={pistasVisibles === 3} className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-bold text-slate-950 disabled:opacity-50 hover:bg-amber-600 transition">
                  <Lightbulb size={14} />
                  Solicitar pista
                </button>
                {(pistasVisibles > 0 || ejemploVisible) && (
                  <button type="button" onClick={limpiarApoyos} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
                    <RotateCcw size={13} />
                    Ocultar pistas
                  </button>
                )}
              </div>
            </div>
            {pistasVisibles > 0 && (
              <div className="mt-3 grid gap-3 md:grid-cols-3 animate-fade-in" aria-live="polite">
                {pistasVisibles >= 1 && (
                  <div className="border-l-4 border-amber-400 bg-white p-3 rounded-r-lg border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-amber-800">Pista 1 · Pregunta guía</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">{preguntaOrientadora}</p>
                  </div>
                )}
                {pistasVisibles >= 2 && (
                  <div className="border-l-4 border-sky-400 bg-white p-3 rounded-r-lg border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-[#0069aa]">Pista 2 · Analogía</p>
                    <p className="mt-1 text-xs leading-5 text-slate-700">{ejemploAnalogo}</p>
                  </div>
                )}
                {pistasVisibles >= 3 && (
                  <div className="border-l-4 border-violet-400 bg-white p-3 rounded-r-lg border border-slate-100 shadow-sm">
                    <p className="text-[10px] font-black uppercase text-violet-800">Pista 3 · Estructura parcial</p>
                    <pre className="mt-1 whitespace-pre-wrap font-sans text-xs leading-5 text-slate-700">{estructuraParcial}</pre>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
