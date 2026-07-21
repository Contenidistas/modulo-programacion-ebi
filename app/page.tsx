'use client';

/* eslint-disable @next/next/no-img-element */
import { BookOpen, Brain, CheckSquare2, ClipboardCheck, Copy, Cpu, Download, ExternalLink, Eye, FileDown, FileText, GraduationCap, Info, Layers3, Lightbulb, MonitorPlay, Printer, RotateCcw, Route, Sparkles, Square, Type, Users, Volume2, Vote, X } from 'lucide-react';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { MouseEvent } from 'react';
import { useAppAlmacen } from '@/almacen/usoAppAlmacen';
import cursoData from '@/contenido/escrutinio.json';
import fichasDocentesData from '@/contenido/fichasDocentesProgramacion.json';
import temasPlanificadosData from '@/contenido/temasPlanificados.json';
import temasData from '@/contenido/temasProgramacion.json';
import CapsulaEstudiante from '@/componentes/CapsulaEstudiante';
import PortalDocenteSeptimo from '@/componentes/PortalDocenteSeptimo';
import PortalDocenteOctavo from '@/componentes/PortalDocenteOctavo';
import PortalDocenteNoveno from '@/componentes/PortalDocenteNoveno';
import SecuenciaEjemploReact from '@/componentes/SecuenciaEjemploReact';
import SecuenciaConstruidaEstudiante from '@/componentes/SecuenciaConstruidaEstudiante';
import ZonaActiva from '@/componentes/ZonaActiva';
import type { Ejercicio } from '@/componentes/ZonaActiva';
import { capsulasNovenoPorId } from '@/contenido/capsulasNoveno';
import { capsulasSeptimoPorId } from '@/contenido/capsulasSeptimo';
import { capsulasOctavoPorId } from '@/contenido/capsulasOctavo';
import { actividadesAlgoritmos } from '@/contenido/constructorUnidadAlgoritmos';
import type { AgrupamientoActividad, ContextoActividad } from '@/contenido/constructorUnidadAlgoritmos';
import { actividadesInteractivosOctavo, evaluacionInteractivosOctavo } from '@/contenido/constructorUnidadInteractivosOctavo';
import { actividadesPensamientoSeptimo, ejerciciosPensamientoSeptimo, evaluacionPensamientoSeptimo } from '@/contenido/constructorPensamientoSeptimo';
import { generarActividadesCapsula, generarEjerciciosCapsula, generarEvaluacionCapsula } from '@/contenido/unidadCompleta';
import { arquitecturaDua, ayudaGenerica, conceptosApoyo, dimensionesRubrica, pedagogiaPorRecurso, perfilesCapsulaPorGrado, procesosPensamiento, rutasEstudiante, terminosCurriculares } from '@/contenido/capaPedagogica';
import type { ConceptoApoyo, Grado, PreferenciaTexto, RutaEstudiante } from '@/contenido/capaPedagogica';
import { normalizarContenidoExterno } from '@/utilidades/normalizarContenidoExterno';

type Paso = {
  titulo: string;
  descripcion: string;
  imagen?: string;
  alt?: string;
  codigo?: string;
};

type InfoGrado = {
  gradoTexto: string;
  enfoque: string;
  preguntaGuia: string;
  introduccion: string;
  producto: string;
  conceptosClave: string[];
  pasos: Paso[];
};

type InfoDocente = {
  meta: string;
  tiempo: string;
  evaluacion: string;
};

type ActividadPosible = {
  titulo: string;
  proposito: string;
  consigna: string;
  evidencia: string;
};

type Referencia = {
  titulo: string;
  detalle: string;
  url: string;
};

type Institucion = {
  nombre: string;
  url: string;
  resena: string;
};

type RecursoIntegrado = {
  id: string;
  titulo: string;
  tipo: string;
  tema: string;
  conceptos: string[];
  nivelesSugeridos: string[];
  descripcion: string;
  ruta: string;
  origen: string;
};

type TemaSecuencia = {
  orden: number;
  recursoId: string;
  titulo: string;
  proposito: string;
  usoDocente: string;
};

type FichaDocenteProgramacion = {
  titulo: string;
  referenciaPrograma: string;
  propositoCurricular: string;
  contenidosPrograma: string[];
  actividadDocente: string;
  evidencia: string;
  evaluacionFormativa: string;
  sugerenciaCrea: string;
  tiempoSugerido: string;
};

type PaginaTema = {
  id: string;
  archivo: string;
  titulo: string;
  html: string;
};

type ContenidoTema = {
  id: string;
  titulo: string;
  descripcion: string;
  paginas: PaginaTema[];
};

type TemasProgramacion = {
  generadoDesde: string;
  recursos: ContenidoTema[];
};

type TemasPlanificados = {
  recursos: RecursoIntegrado[];
  contenidos: ContenidoTema[];
  secuenciaPorGrado: Record<Grado, TemaSecuencia[]>;
  ejercicios: Ejercicio[];
};

type Portal = {
  area: string;
  tema: string;
  subtema: string;
  tramo: string;
  niveles: string[];
  publico: string;
  usoSugerido: string;
};

type RecursoEscrutinio = {
  unidadId: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  portal: Portal;
  pie: string;
  bibliografia: Referencia[];
  quienesSomos: Institucion[];
  recursosIntegrados: RecursoIntegrado[];
  secuenciaPorGrado: Record<Grado, TemaSecuencia[]>;
  grados: Record<Grado, InfoGrado>;
  zonaDocente: Record<Grado, InfoDocente>;
  actividadesPosibles: Record<Grado, ActividadPosible[]>;
  ejercicios: Ejercicio[];
};

type ModoVista = 'todo' | 'guia' | 'desafios' | 'orientacion' | 'recurso';
type Interfaz = 'docente' | 'alumno';
const recurso = cursoData as RecursoEscrutinio;
const contenidoTemas = temasData as TemasProgramacion;
const temasPlanificados = temasPlanificadosData as TemasPlanificados;
const fichasDocentes = fichasDocentesData as Record<Grado, Record<string, FichaDocenteProgramacion>>;
const grados: Grado[] = ['7mo', '8vo', '9no'];
const modosVista: { id: ModoVista; etiqueta: string }[] = [
  { id: 'todo', etiqueta: 'Guía docente' },
  { id: 'recurso', etiqueta: 'Unidades' },
  { id: 'guia', etiqueta: 'Proyecto guiado' },
  { id: 'desafios', etiqueta: 'Desafíos' },
  { id: 'orientacion', etiqueta: 'Programa EBI' },
];

const urlPublicaRea =
  process.env.NEXT_PUBLIC_REA_PUBLIC_URL ??
  'https://contenidistas.github.io/modulo-programacion-ebi/';
const baseAssets = process.env.NEXT_PUBLIC_REA_BASE_PATH ?? '';

const iconosPorGrado = {
  '7mo': BookOpen,
  '8vo': Cpu,
  '9no': GraduationCap,
};

const subscribeUrl = (onStoreChange: () => void) => {
  window.addEventListener('popstate', onStoreChange);
  return () => window.removeEventListener('popstate', onStoreChange);
};
const getBrowserUrl = () => (typeof window === 'undefined' ? '' : `${window.location.origin}${window.location.pathname}${window.location.search}`);
const getServerUrl = () => '';
const clavePreferencias = 'rea-programacion-preferencias';
const eventoPreferencias = 'rea-programacion-preferencias-cambiadas';
const subscribePreferencias = (onStoreChange: () => void) => {
  const manejarCambio = () => onStoreChange();
  window.addEventListener('storage', manejarCambio);
  window.addEventListener(eventoPreferencias, manejarCambio);
  return () => {
    window.removeEventListener('storage', manejarCambio);
    window.removeEventListener(eventoPreferencias, manejarCambio);
  };
};
const getPreferencias = () => window.localStorage.getItem(clavePreferencias) ?? '{}';
const getPreferenciasServidor = () => '{}';
const interpretarPreferencias = (valor: string) => {
  try {
    return JSON.parse(valor) as {
      altoContraste?: boolean;
      preferenciaTexto?: PreferenciaTexto;
      rutaEstudiante?: RutaEstudiante;
    };
  } catch {
    return {};
  }
};

const esGrado = (valor: string | null): valor is Grado => valor === '7mo' || valor === '8vo' || valor === '9no';
const esModoVista = (valor: string | null): valor is ModoVista =>
  valor === 'todo' || valor === 'guia' || valor === 'desafios' || valor === 'orientacion' || valor === 'recurso';
const esInterfaz = (valor: string | null): valor is Interfaz => valor === 'docente' || valor === 'alumno';
const assetPath = (src: string) => (/^(https?:|data:|blob:)/i.test(src) ? src : `${baseAssets}${src}`);
const limpiarHtml = (valor: string) =>
  valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
const normalizarTermino = (valor: string) =>
  valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
export default function Home() {
  const { gradoActual, setGrado, setVistaDocente, reiniciarProgreso } = useAppAlmacen();
  const [modoVista, setModoVista] = useState<ModoVista>('todo');
  const [interfazSeleccionada, setInterfazSeleccionada] = useState<Interfaz>('docente');
  const [iframeCopiado, setIframeCopiado] = useState<ModoVista | null>(null);
  const [iframeRecursoCopiado, setIframeRecursoCopiado] = useState<string | null>(null);
  const [ayudaEstudiante, setAyudaEstudiante] = useState<ConceptoApoyo | null>(null);
  const [lecturaActiva, setLecturaActiva] = useState(false);
  const [menuUnidadesAbierto, setMenuUnidadesAbierto] = useState(false);
  const [menuHerramientasAbierto, setMenuHerramientasAbierto] = useState(false);
  const contenidoTemaRef = useRef<HTMLDivElement>(null);
  const dialogoConceptoRef = useRef<HTMLDivElement>(null);
  const focoAnteriorRef = useRef<HTMLElement | null>(null);
  const urlActual = useSyncExternalStore(subscribeUrl, getBrowserUrl, getServerUrl);
  const preferenciasSerializadas = useSyncExternalStore(subscribePreferencias, getPreferencias, getPreferenciasServidor);
  const preferencias = interpretarPreferencias(preferenciasSerializadas);
  const altoContraste = preferencias.altoContraste === true;
  const preferenciaTexto: PreferenciaTexto = preferencias.preferenciaTexto === 'grande' ? 'grande' : 'normal';
  const rutaEstudiante: RutaEstudiante = rutasEstudiante.some((ruta) => ruta.id === preferencias.rutaEstudiante)
    ? (preferencias.rutaEstudiante as RutaEstudiante)
    : 'leo';

  useEffect(() => {
    if (!ayudaEstudiante) return;

    focoAnteriorRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialogo = dialogoConceptoRef.current;
    const focoInicial = dialogo?.querySelector<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])');
    const desbordeAnterior = document.body.style.overflow;

    document.body.style.overflow = 'hidden';
    focoInicial?.focus();

    const manejarTeclado = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setAyudaEstudiante(null);
        return;
      }

      if (event.key !== 'Tab' || !dialogo) return;
      const controles = Array.from(
        dialogo.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'),
      );
      if (controles.length === 0) return;

      const primero = controles[0];
      const ultimo = controles[controles.length - 1];
      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', manejarTeclado);
    return () => {
      document.removeEventListener('keydown', manejarTeclado);
      document.body.style.overflow = desbordeAnterior;
      focoAnteriorRef.current?.focus();
    };
  }, [ayudaEstudiante]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);
  const parametros = new URLSearchParams(urlActual.split('?')[1] ?? '');
  const gradoUrl = parametros.get('grado');
  const interfazUrl = parametros.get('interfaz');
  const sectorUrl = parametros.get('sector');
  const recursoUrl = parametros.get('recurso');
  const paginaUrl = parametros.get('pagina');
  const capsulaUrl = parametros.get('capsula');
  const secuenciaUrl = parametros.get('secuencia');
  const secuenciaConstruidaUrl = parametros.get('secuenciaConstruida');
  const capsulaSeleccionada = capsulaUrl
    ? capsulasSeptimoPorId.get(capsulaUrl) ?? capsulasOctavoPorId.get(capsulaUrl) ?? capsulasNovenoPorId.get(capsulaUrl)
    : undefined;
  const grado = esGrado(gradoUrl) ? gradoUrl : (gradoActual as Grado);
  const interfaz = esInterfaz(interfazUrl) ? interfazUrl : interfazSeleccionada;
  const esVistaAlumno = interfaz === 'alumno';
  const modoDesdeUrl = esModoVista(sectorUrl) ? sectorUrl : modoVista;
  const modoVistaEfectivo = esVistaAlumno && modoDesdeUrl === 'orientacion' ? 'todo' : modoDesdeUrl;
  const infoEstudiante = recurso.grados[grado];
  const infoDocente = recurso.zonaDocente[grado];
  const actividadesPosibles = recurso.actividadesPosibles[grado];
  const todosLosEjercicios = [...recurso.ejercicios, ...temasPlanificados.ejercicios];
  const ejerciciosDelGrado = todosLosEjercicios.filter((ejercicio) => ejercicio.grado === grado && !ejercicio.temaId);
  const recursosIntegrados = [...recurso.recursosIntegrados, ...temasPlanificados.recursos];
  const contenidosIntegrados = [...contenidoTemas.recursos, ...temasPlanificados.contenidos];
  const secuenciaBase = [...recurso.secuenciaPorGrado[grado], ...temasPlanificados.secuenciaPorGrado[grado]];
  const recursosPorId = new Map(recursosIntegrados.map((item) => [item.id, item]));
  const contenidosPorId = new Map(contenidosIntegrados.map((item) => [item.id, item]));
  const secuenciaDelGrado = secuenciaBase
    .map((tema) => ({ ...tema, recurso: recursosPorId.get(tema.recursoId) }))
    .filter((tema): tema is TemaSecuencia & { recurso: RecursoIntegrado } => Boolean(tema.recurso))
    .sort((a, b) => a.orden - b.orden);
  const recursoSeleccionado =
    (recursoUrl ? recursosPorId.get(recursoUrl) : undefined) ?? secuenciaDelGrado[0]?.recurso;
  const temaSeleccionado =
    secuenciaDelGrado.find((tema) => tema.recurso.id === recursoSeleccionado?.id) ?? secuenciaDelGrado[0];
  const contenidoTemaSeleccionado = recursoSeleccionado ? contenidosPorId.get(recursoSeleccionado.id) : undefined;
  const fichaDocenteSeleccionada = recursoSeleccionado ? fichasDocentes[grado][recursoSeleccionado.id] : undefined;
  const paginaSeleccionada =
    contenidoTemaSeleccionado?.paginas.find((pagina) => pagina.id === paginaUrl || pagina.archivo === paginaUrl) ??
    contenidoTemaSeleccionado?.paginas[0];
  const ejerciciosDelTema = recursoSeleccionado
    ? todosLosEjercicios.filter((ejercicio) => ejercicio.grado === grado && ejercicio.temaId === recursoSeleccionado.id)
    : [];
  const ejerciciosZonaActiva = modoVistaEfectivo === 'desafios' && recursoSeleccionado ? ejerciciosDelTema : ejerciciosDelGrado;
  const IconoGrado = iconosPorGrado[grado];
  const mostrarGuia = modoVistaEfectivo === 'guia';
  const mostrarDesafios = modoVistaEfectivo === 'desafios';
  const mostrarOrientacion = !esVistaAlumno && modoVistaEfectivo === 'orientacion';
  const mostrarSecuencia = modoVistaEfectivo === 'recurso';
  const mostrarArquitecturaDua = !esVistaAlumno && modoVistaEfectivo === 'orientacion';
  const mostrarSintesisDocente = !esVistaAlumno && modoVistaEfectivo === 'todo';
  const pedagogiaTema = recursoSeleccionado ? pedagogiaPorRecurso[recursoSeleccionado.id] : undefined;
  const conceptosTema = recursoSeleccionado?.conceptos ?? infoEstudiante.conceptosClave;
  const textoTerminologicoBase = normalizarTermino(
    `${recursoSeleccionado?.titulo ?? ''} ${temaSeleccionado?.titulo ?? ''} ${recursoSeleccionado?.descripcion ?? ''} ${conceptosTema.join(' ')} ${fichaDocenteSeleccionada?.contenidosPrograma.join(' ') ?? ''}`,
  );
  const terminosTema = terminosCurriculares
    .filter((termino) => termino.grados.includes(grado))
    .filter((termino) => {
      const formas = [termino.canonico, ...termino.variantes].map(normalizarTermino);
      return formas.some((forma) => textoTerminologicoBase.includes(forma)) || termino.canonico === 'Programa';
    })
    .slice(0, 7);
  const apoyosConceptualesTema = conceptosTema
    .map((concepto) => conceptosApoyo[normalizarTermino(concepto)] ?? conceptosApoyo[normalizarTermino(concepto.split(' ')[0])])
    .filter((concepto): concepto is ConceptoApoyo => Boolean(concepto));
  const procesosTema =
    pedagogiaTema?.procesos ??
    procesosPensamiento.filter((proceso) => {
      const base = normalizarTermino(`${recursoSeleccionado?.titulo ?? ''} ${temaSeleccionado?.titulo ?? ''} ${conceptosTema.join(' ')}`);
      const clave = normalizarTermino(proceso.split(' ')[0]);
      return base.includes(clave) || proceso === 'Prueba y depuración' || proceso === 'Diseño de algoritmos';
    }).slice(0, 4);
  const escalaTexto = preferenciaTexto === 'grande' ? 'text-[1.08rem]' : '';
  const perfilCapsula = perfilesCapsulaPorGrado[grado];
  const baseUrl = urlActual ? urlActual.split('?')[0] : '';
  const baseUrlIframe = baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1') || !baseUrl ? urlPublicaRea : baseUrl;

  const actualizarNavegacion = (cambios: Partial<Record<'grado' | 'interfaz' | 'sector' | 'recurso' | 'pagina', string | null>>) => {
    const parametrosNuevos = new URLSearchParams(window.location.search);

    Object.entries(cambios).forEach(([clave, valor]) => {
      if (valor === null) parametrosNuevos.delete(clave);
      else if (valor !== undefined) parametrosNuevos.set(clave, valor);
    });

    window.history.pushState(null, '', `${window.location.pathname}?${parametrosNuevos.toString()}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const seleccionarInterfaz = (tipo: Interfaz) => {
    setInterfazSeleccionada(tipo);
    setVistaDocente(false);

    if (tipo === 'alumno') {
      setModoVista('recurso');
      actualizarNavegacion({
        grado,
        interfaz: 'alumno',
        sector: 'recurso',
        recurso: recursoSeleccionado?.id ?? null,
        pagina: null,
      });
      return;
    }

    const sectorDocente = modoVistaEfectivo === 'orientacion' ? 'todo' : modoVistaEfectivo;
    setModoVista(sectorDocente);
    actualizarNavegacion({ grado, interfaz: 'docente', sector: sectorDocente });
  };

  const seleccionarGrado = (gradoDestino: Grado) => {
    const sectorDestino: ModoVista = esVistaAlumno ? 'recurso' : 'todo';
    setVistaDocente(false);
    setGrado(gradoDestino);
    setModoVista(sectorDestino);
    actualizarNavegacion({
      grado: gradoDestino,
      interfaz,
      sector: sectorDestino,
      recurso: null,
      pagina: null,
    });
  };

  const abrirPrograma = () => {
    setInterfazSeleccionada('docente');
    setVistaDocente(true);
    setModoVista('orientacion');
    actualizarNavegacion({ grado, interfaz: 'docente', sector: 'orientacion', recurso: null, pagina: null });
  };

  const seleccionarSector = (sector: ModoVista) => {
    setModoVista(sector);
    setVistaDocente(sector === 'orientacion');
    actualizarNavegacion({
      grado,
      interfaz: 'docente',
      sector,
      recurso: sector === 'recurso' ? recursoSeleccionado?.id ?? null : null,
      pagina: null,
    });
  };

  const seleccionarUnidad = (recursoId: string) => {
    setModoVista('recurso');
    setVistaDocente(false);
    setMenuUnidadesAbierto(false);
    actualizarNavegacion({ grado, interfaz, sector: 'recurso', recurso: recursoId, pagina: null });
  };

  const obtenerTextoSector = () => {
    const encabezado = `${recurso.titulo}\n${recurso.subtitulo}\n${infoEstudiante.gradoTexto} - ${infoEstudiante.enfoque}`;
    const guia = infoEstudiante.pasos
      .map((paso, index) => `${index + 1}. ${paso.titulo}\n${paso.descripcion}${paso.codigo ? `\n\n${paso.codigo}` : ''}`)
      .join('\n\n');
    const desafios = ejerciciosDelGrado
      .map((ejercicio, index) => {
        let opciones = '';

        if (ejercicio.tipo === 'opcion_multiple') {
          opciones = `\nOpciones:\n${ejercicio.opciones.map((opcion, i) => `- ${i + 1}. ${opcion}`).join('\n')}`;
        } else if (ejercicio.tipo === 'completar') {
          opciones = `\nPlantilla: ${ejercicio.plantilla}`;
        } else if (ejercicio.tipo === 'ordenar') {
          opciones = `\nElementos para ordenar:\n${ejercicio.elementos.map((elemento) => `- ${elemento}`).join('\n')}`;
        } else {
          opciones = `\nElementos para relacionar:\n${ejercicio.pares.map((par) => `- ${par.izquierda}: __________`).join('\n')}`;
        }

        return `${index + 1}. ${ejercicio.enunciado}${opciones}\nFeedback: ${ejercicio.feedback}`;
      })
      .join('\n\n');
    const orientacion = `Objetivo o propósito: ${infoDocente.meta}\nTiempo sugerido: ${infoDocente.tiempo}\nEvaluación formativa: ${infoDocente.evaluacion}`;
    const dua = arquitecturaDua
      .map((item) => `${item.principio}: ${item.detalle}`)
      .join('\n');
    const terminologia = terminosTema
      .map((termino) => `${termino.canonico}: ${termino.usoPrograma}\nEquivalencias en el recurso: ${termino.variantes.join(', ')}`)
      .join('\n\n');
    const secuencia = secuenciaDelGrado
      .map(
        (tema) => {
          const ficha = fichasDocentes[grado][tema.recurso.id];
          const fichaTexto = ficha
            ? `\nFicha docente:\nPropósito curricular: ${ficha.propositoCurricular}\nContenidos: ${ficha.contenidosPrograma.join('; ')}\nActividad: ${ficha.actividadDocente}\nEvidencia: ${ficha.evidencia}\nEvaluación formativa: ${ficha.evaluacionFormativa}`
            : '';

          return `Unidad ${tema.orden}. ${tema.titulo}\nRecurso: ${tema.recurso.titulo}\nPropósito: ${tema.proposito}\nUso docente: ${tema.usoDocente}${fichaTexto}`;
        },
      )
      .join('\n\n');

    if (modoVistaEfectivo === 'guia') return `${encabezado}\n\nGuía de construcción\n\n${guia}`;
    if (modoVistaEfectivo === 'desafios') return `${encabezado}\n\nDesafíos\n\n${desafios}`;
    if (modoVistaEfectivo === 'orientacion') return `${encabezado}\n\nOrientación docente\n\n${orientacion}\n\nTerminología curricular\n\n${terminologia}\n\nArquitectura DUA\n\n${dua}`;
    if (modoVistaEfectivo === 'recurso') return `${encabezado}\n\nTerminología curricular\n\n${terminologia}\n\nSecuencia por temas\n\n${secuencia}`;

    return `${encabezado}\n\nProducto esperado\n${infoEstudiante.producto}\n\nTerminología curricular\n\n${terminologia}\n\nArquitectura DUA\n\n${dua}\n\nSecuencia por temas\n\n${secuencia}\n\nGuía de construcción\n\n${guia}\n\nDesafíos\n\n${desafios}\n\nOrientación docente\n\n${orientacion}`;
  };

  const descargarTexto = (contenido: string, nombreArchivo: string) => {
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = nombreArchivo;
    link.click();
    URL.revokeObjectURL(url);
  };

  const descargarSector = () => descargarTexto(obtenerTextoSector(), `rea-docente-${grado}-${modoVistaEfectivo}.txt`);

  const obtenerFichaActividades = () => {
    const actividades = actividadesPosibles
      .map(
        (actividad, index) =>
          `${index + 1}. ${actividad.titulo}\nPropósito: ${actividad.proposito}\nConsigna: ${actividad.consigna}\nEvidencia: ${actividad.evidencia}`,
      )
      .join('\n\n');

    return `${recurso.titulo}\n${recurso.subtitulo}\n${infoEstudiante.gradoTexto} - ${infoEstudiante.enfoque}\n\nFicha docente: actividades posibles\n\n${actividades}`;
  };

  const descargarFicha = () => descargarTexto(obtenerFichaActividades(), `ficha-actividades-${grado}.txt`);
  const obtenerEvidenciaTema = () => {
    const titulo = temaSeleccionado?.titulo ?? recursoSeleccionado?.titulo ?? 'Unidad seleccionada';
    const proposito = temaSeleccionado?.proposito ?? recursoSeleccionado?.descripcion ?? 'Propósito del tema.';
    const conceptos = conceptosTema.join(', ');
    const procesos = procesosTema.join(', ');
    const consignas = pedagogiaTema?.evidencia ?? [
      'Explico con mis palabras la idea principal del tema.',
      'Identifico entradas, procesos y salidas o eventos relevantes.',
      'Escribo una primera solución, algoritmo, pseudocódigo o secuencia.',
      'Pruebo un caso y registro qué ocurrió.',
      'Mejoro algo de mi solución y explico por qué.',
    ];

    return `${titulo}
${infoEstudiante.gradoTexto}

Propósito
${proposito}

Conceptos clave
${conceptos}

Pensamiento computacional
${procesos}

Mi evidencia
${consignas.map((consigna, index) => `${index + 1}. ${consigna}\n`).join('\n')}

Desafío extendido
${pedagogiaTema?.desafioExtendido ?? 'Propongo una mejora, variante o caso nuevo para seguir probando.'}

Autoevaluación
[ ] Puedo explicar el concepto central.
[ ] Puedo identificar al menos un ejemplo.
[ ] Puedo probar o revisar mi solución.
[ ] Necesito repasar o pedir apoyo en:
`;
  };
  const descargarEvidenciaTema = () =>
    descargarTexto(obtenerEvidenciaTema(), `evidencia-${grado}-${recursoSeleccionado?.id ?? 'tema'}.txt`);
  const absolutizarHtmlTema = (html: string) => {
    const base = baseUrl || baseUrlIframe;
    const baseLimpia = base.replace(/\/$/, '');

    return html
      .replace(
        /href="recursos\/introduccion-javascript\/IntroduccionJavascript\.elp"/g,
        'href="https://github.com/Contenidistas/modulo-programacion-ebi/releases/download/recursos-fuente-v1/IntroduccionJavascript.elp"',
      )
      .replace(/src="recursos\//g, `src="${baseLimpia}/recursos/`)
      .replace(/href="recursos\//g, `href="${baseLimpia}/recursos/`);
  };
  const htmlPaginaSeleccionada = paginaSeleccionada
    ? absolutizarHtmlTema(normalizarContenidoExterno(paginaSeleccionada.html, paginaSeleccionada.id))
    : '';

  const crearHtmlTema = (tema: TemaSecuencia & { recurso: RecursoIntegrado }, contenido: ContenidoTema) => {
    const ficha = fichasDocentes[grado][tema.recurso.id];
    const terminologia = terminosTema
      .map(
        (termino) => `
          <article class="termino">
            <h3>${limpiarHtml(termino.canonico)}</h3>
            <p>${limpiarHtml(termino.usoPrograma)}</p>
            <p><strong>Equivalencias:</strong> ${limpiarHtml(termino.variantes.join(', '))}</p>
          </article>`,
      )
      .join('');
    const fichaHtml = ficha
      ? `<section class="ficha-docente">
          <div class="etiqueta">Ficha docente embebible</div>
          <h2>${limpiarHtml(ficha.titulo)}</h2>
          <p><strong>Referencia curricular:</strong> ${limpiarHtml(ficha.referenciaPrograma)}</p>
          <p><strong>Propósito curricular:</strong> ${limpiarHtml(ficha.propositoCurricular)}</p>
          <h3>Contenidos del programa</h3>
          <ul>${ficha.contenidosPrograma.map((item) => `<li>${limpiarHtml(item)}</li>`).join('')}</ul>
          <h3>Actividad docente</h3>
          <p>${limpiarHtml(ficha.actividadDocente)}</p>
          <p><strong>Evidencia:</strong> ${limpiarHtml(ficha.evidencia)}</p>
          <p><strong>Evaluación formativa:</strong> ${limpiarHtml(ficha.evaluacionFormativa)}</p>
          <p><strong>Uso en CREA:</strong> ${limpiarHtml(ficha.sugerenciaCrea)}</p>
          <p><strong>Tiempo sugerido:</strong> ${limpiarHtml(ficha.tiempoSugerido)}</p>
        </section>`
      : '';
    const paginas = contenido.paginas
      .map(
        (pagina) => `
          <section class="pagina">
            <h2>${limpiarHtml(pagina.titulo)}</h2>
            <div class="contenido">${absolutizarHtmlTema(normalizarContenidoExterno(pagina.html, pagina.id))}</div>
          </section>`,
      )
      .join('');

    return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${limpiarHtml(tema.titulo)} - ${limpiarHtml(infoEstudiante.gradoTexto)}</title>
  <style>
    :root { color: #172033; font-family: Arial, Helvetica, sans-serif; }
    body { margin: 0; background: #f7fbff; }
    main { max-width: 920px; margin: 0 auto; padding: 32px; }
    header { border-bottom: 4px solid #0069aa; margin-bottom: 24px; padding-bottom: 18px; }
    .etiqueta { color: #c66b00; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
    h1 { color: #0069aa; font-size: 30px; margin: 8px 0; }
    h2 { color: #0f172a; font-size: 22px; margin: 0 0 12px; }
    h3 { color: #0f172a; font-size: 18px; margin: 18px 0 8px; }
    p, li { font-size: 14px; line-height: 1.65; }
    .meta { background: #fff7ed; border: 1px solid #fed7aa; border-radius: 12px; margin-top: 16px; padding: 14px; }
    .ficha-docente { background: #effaf4; border: 2px solid #86c5a3; border-radius: 12px; margin: 20px 0; padding: 18px; break-inside: avoid; }
    .ficha-docente .etiqueta { color: #176b43; }
    .pagina { background: white; border: 1px solid #dbeafe; border-radius: 12px; margin: 16px 0; padding: 18px; break-inside: avoid; }
    .terminologia { display: grid; gap: 10px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: 18px 0; }
    .termino { background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 12px; }
    .termino h3 { color: #92400e; margin: 0 0 6px; }
    img, svg { border: 1px solid #e2e8f0; border-radius: 10px; display: block; height: auto; margin: 14px auto; max-height: 520px; max-width: 100%; object-fit: contain; padding: 4px; }
    table { border-collapse: collapse; display: block; max-width: 100%; overflow-x: auto; }
    th, td { border: 1px solid #cbd5e1; padding: 8px 10px; vertical-align: top; }
    th { background: #e0f2fe; color: #075985; }
    a { color: #0069aa; font-weight: 700; }
    footer { color: #475569; font-size: 12px; margin-top: 24px; }
    @media print { body { background: white; } main { padding: 0; } .pagina { border-color: #cbd5e1; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div class="etiqueta">${limpiarHtml(recurso.portal.area)} · ${limpiarHtml(infoEstudiante.gradoTexto)}</div>
      <h1>${limpiarHtml(tema.titulo)}</h1>
      <p>${limpiarHtml(contenido.descripcion || tema.recurso.descripcion)}</p>
      <div class="meta">
        <strong>Propósito:</strong>
        <p>${limpiarHtml(tema.proposito)}</p>
        <strong>Uso docente:</strong>
        <p>${limpiarHtml(tema.usoDocente)}</p>
      </div>
    </header>
    ${fichaHtml}
    <section>
      <h2>Terminología curricular</h2>
      <div class="terminologia">${terminologia}</div>
    </section>
    ${paginas}
    <footer>${limpiarHtml(recurso.pie)}</footer>
  </main>
</body>
</html>`;
  };

  const descargarTemaHtml = () => {
    if (!temaSeleccionado || !contenidoTemaSeleccionado) return;

    const blob = new Blob([crearHtmlTema(temaSeleccionado, contenidoTemaSeleccionado)], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `tema-${grado}-${temaSeleccionado.recurso.id}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const imprimirTema = () => {
    if (!temaSeleccionado || !contenidoTemaSeleccionado) return;

    const ventana = window.open('', '_blank', 'noopener,noreferrer');
    if (!ventana) return;

    ventana.document.write(crearHtmlTema(temaSeleccionado, contenidoTemaSeleccionado));
    ventana.document.close();
    ventana.focus();
    ventana.print();
  };

  const crearHtmlFicha = () => {
    const actividades = actividadesPosibles
      .map(
        (actividad, index) => `
          <article class="actividad">
            <span class="numero">${index + 1}</span>
            <div>
              <h2>${limpiarHtml(actividad.titulo)}</h2>
              <p><strong>Propósito:</strong> ${limpiarHtml(actividad.proposito)}</p>
              <p><strong>Consigna:</strong> ${limpiarHtml(actividad.consigna)}</p>
              <p><strong>Evidencia:</strong> ${limpiarHtml(actividad.evidencia)}</p>
            </div>
          </article>`,
      )
      .join('');

    return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Ficha docente - ${limpiarHtml(infoEstudiante.gradoTexto)}</title>
  <style>
    :root { color: #172033; font-family: Arial, Helvetica, sans-serif; }
    body { margin: 0; background: #f7fbff; }
    main { max-width: 880px; margin: 0 auto; padding: 32px; }
    header { border-bottom: 4px solid #0069aa; padding-bottom: 18px; margin-bottom: 24px; }
    .etiqueta { color: #c66b00; font-size: 12px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; }
    h1 { color: #0069aa; font-size: 30px; margin: 8px 0; }
    .meta { display: grid; gap: 8px; grid-template-columns: repeat(2, minmax(0, 1fr)); margin-top: 18px; }
    .meta div, .actividad { background: white; border: 1px solid #dbeafe; border-radius: 12px; padding: 14px; }
    .actividad { display: grid; grid-template-columns: 42px 1fr; gap: 14px; margin: 14px 0; break-inside: avoid; }
    .numero { align-items: center; background: #0069aa; border-radius: 999px; color: white; display: flex; font-weight: 800; height: 34px; justify-content: center; width: 34px; }
    h2 { font-size: 18px; margin: 0 0 8px; }
    p { font-size: 14px; line-height: 1.55; margin: 6px 0; }
    footer { color: #475569; font-size: 12px; margin-top: 24px; }
    @media print { body { background: white; } main { padding: 0; } .meta div, .actividad { border-color: #cbd5e1; } }
  </style>
</head>
<body>
  <main>
    <header>
      <div class="etiqueta">${limpiarHtml(recurso.portal.area)} · ${limpiarHtml(recurso.portal.tema)}</div>
      <h1>${limpiarHtml(recurso.titulo)}</h1>
      <p>${limpiarHtml(infoEstudiante.gradoTexto)} · ${limpiarHtml(infoEstudiante.enfoque)}</p>
      <section class="meta">
        <div><strong>Pregunta guía</strong><p>${limpiarHtml(infoEstudiante.preguntaGuia)}</p></div>
        <div><strong>Producto esperado</strong><p>${limpiarHtml(infoEstudiante.producto)}</p></div>
      </section>
    </header>
    ${actividades}
    <footer>${limpiarHtml(recurso.pie)}</footer>
  </main>
</body>
</html>`;
  };

  const descargarFichaHtml = () => {
    const blob = new Blob([crearHtmlFicha()], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = `ficha-actividades-${grado}.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const imprimirFicha = () => {
    const ventana = window.open('', '_blank', 'noopener,noreferrer');
    if (!ventana) return;

    ventana.document.write(crearHtmlFicha());
    ventana.document.close();
    ventana.focus();
    ventana.print();
  };

  const crearUrlEstudiante = (sector: ModoVista) =>
    `${baseUrlIframe.replace(/\/$/, '')}/?grado=${grado}&interfaz=alumno&sector=${sector}`;
  const crearUrlTema = (recursoId: string, interfazDestino: Interfaz = 'alumno') =>
    `${baseUrlIframe.replace(/\/$/, '')}/?grado=${grado}&interfaz=${interfazDestino}&sector=recurso&recurso=${recursoId}`;
  const crearUrlZonaActivaTema = (recursoId: string) =>
    `${baseUrlIframe.replace(/\/$/, '')}/?grado=${grado}&interfaz=alumno&sector=desafios&recurso=${recursoId}`;
  const crearHrefTema = (recursoId: string, interfazDestino: Interfaz = interfaz, paginaId?: string) => {
    const pagina = paginaId ? `&pagina=${paginaId}` : '';
    return `?grado=${grado}&interfaz=${interfazDestino}&sector=recurso&recurso=${recursoId}${pagina}`;
  };
  const seleccionarPaginaTema = (paginaId: string) => {
    if (!recursoSeleccionado || paginaId === paginaSeleccionada?.id) return;

    detenerLectura();
    window.history.pushState(null, '', crearHrefTema(recursoSeleccionado.id, interfaz, paginaId));
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  const obtenerPaginaDesdeHref = (href: string) => {
    if (!contenidoTemaSeleccionado) return undefined;

    const destino = href.replace(/^#/, '').replace(/^pagina-/, '');
    return contenidoTemaSeleccionado.paginas.find((pagina) => pagina.id === destino || pagina.archivo === destino);
  };
  const obtenerConceptoDesdeEnlace = (enlace: HTMLAnchorElement): ConceptoApoyo => {
    const texto = normalizarTermino(enlace.textContent ?? '');
    const titulo = normalizarTermino(enlace.getAttribute('title') ?? '');
    const href = normalizarTermino(enlace.getAttribute('href') ?? '');
    const llave =
      [texto, titulo]
        .map((valor) => valor.split(/[.?¿!¡:;]/)[0])
        .find((valor) => conceptosApoyo[valor]) ??
      Object.keys(conceptosApoyo).find((clave) => texto.includes(clave) || titulo.includes(clave) || href.includes(clave));

    return llave ? conceptosApoyo[llave] : { ...ayudaGenerica, termino: enlace.textContent?.trim() || ayudaGenerica.termino };
  };
  const manejarClickContenidoTema = (event: MouseEvent<HTMLDivElement>) => {
    const enlace = (event.target as HTMLElement).closest('a');
    if (!enlace) return;

    const href = enlace.getAttribute('href') ?? '';
    const esEnlaceInterno = href.startsWith('#pagina-') || href.startsWith('#t');
    if (!esEnlaceInterno) return;

    event.preventDefault();

    if (recursoSeleccionado) {
      const paginaDestino = obtenerPaginaDesdeHref(href);
      if (paginaDestino) {
        seleccionarPaginaTema(paginaDestino.id);
        return;
      }
    }

    setAyudaEstudiante(obtenerConceptoDesdeEnlace(enlace));
  };
  const detenerLectura = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setLecturaActiva(false);
  };
  const leerPaginaActual = () => {
    if (typeof window.speechSynthesis === 'undefined') {
      globalThis.alert('Este navegador no tiene lectura de texto integrada.');
      return;
    }

    if (lecturaActiva) {
      detenerLectura();
      return;
    }

    const texto = contenidoTemaRef.current?.innerText.trim();
    if (!texto || !paginaSeleccionada) return;

    const lectura = new SpeechSynthesisUtterance(`${paginaSeleccionada.titulo}. ${texto}`);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = () => setLecturaActiva(false);
    lectura.onerror = () => setLecturaActiva(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(lectura);
    setLecturaActiva(true);
  };

  const guardarPreferencias = (cambios: {
    altoContraste?: boolean;
    preferenciaTexto?: PreferenciaTexto;
    rutaEstudiante?: RutaEstudiante;
  }) => {
    window.localStorage.setItem(
      clavePreferencias,
      JSON.stringify({ altoContraste, preferenciaTexto, rutaEstudiante, ...cambios }),
    );
    window.dispatchEvent(new Event(eventoPreferencias));
  };

  const alternarContraste = () => {
    const valor = !altoContraste;
    guardarPreferencias({ altoContraste: valor });
  };

  const alternarTamanoTexto = () => {
    const valor: PreferenciaTexto = preferenciaTexto === 'normal' ? 'grande' : 'normal';
    guardarPreferencias({ preferenciaTexto: valor });
  };

  const seleccionarRutaEstudiante = (ruta: RutaEstudiante) => {
    guardarPreferencias({ rutaEstudiante: ruta });
  };

  const crearIframe = (sector: ModoVista) =>
    `<iframe src="${crearUrlEstudiante(sector)}" title="REA ${grado} ${sector}" width="100%" height="760" style="border:0; border-radius:12px;" loading="lazy" allow="microphone"></iframe>`;
  const crearIframeRecurso = (recursoIntegrado: RecursoIntegrado) =>
    `<iframe src="${crearUrlTema(recursoIntegrado.id)}" title="Cápsula de aprendizaje: ${recursoIntegrado.titulo}" width="100%" height="760" style="border:0; border-radius:8px;" loading="lazy" allow="microphone"></iframe>`;
  const crearIframeZonaActivaTema = (recursoIntegrado: RecursoIntegrado) =>
    `<iframe src="${crearUrlZonaActivaTema(recursoIntegrado.id)}" title="Zona activa ${recursoIntegrado.titulo}" width="100%" height="620" style="border:0; border-radius:12px;" loading="lazy"></iframe>`;

  const copiarIframe = async (sector: ModoVista) => {
    await navigator.clipboard.writeText(crearIframe(sector));
    setIframeCopiado(sector);
    window.setTimeout(() => setIframeCopiado(null), 2600);
  };
  const copiarIframeRecurso = async (recursoIntegrado: RecursoIntegrado) => {
    await navigator.clipboard.writeText(crearIframeRecurso(recursoIntegrado));
    setIframeRecursoCopiado(recursoIntegrado.id);
    window.setTimeout(() => setIframeRecursoCopiado(null), 2600);
  };
  const copiarIframeZonaActivaTema = async (recursoIntegrado: RecursoIntegrado) => {
    await navigator.clipboard.writeText(crearIframeZonaActivaTema(recursoIntegrado));
    setIframeRecursoCopiado(`zona-${recursoIntegrado.id}`);
    window.setTimeout(() => setIframeRecursoCopiado(null), 2600);
  };
  if (capsulaSeleccionada) {
    return <CapsulaEstudiante capsula={capsulaSeleccionada} />;
  }

  if (secuenciaConstruidaUrl?.startsWith('capsula-')) {
    const capsulaId = secuenciaConstruidaUrl.replace(/^capsula-/, '');
    const capsula = capsulasSeptimoPorId.get(capsulaId) ?? capsulasOctavoPorId.get(capsulaId) ?? capsulasNovenoPorId.get(capsulaId);
    if (capsula) {
      const actividadesBase = generarActividadesCapsula(capsula);
      const actividadesSolicitadas = (parametros.get('actividades') ?? '').split(',').filter(Boolean);
      const idsValidos = new Set(actividadesBase.map((actividad) => actividad.id));
      const actividades = actividadesSolicitadas.filter((id) => idsValidos.has(id));
      const contextoParametro = parametros.get('contexto');
      const agrupamientoParametro = parametros.get('agrupamiento');
      const contexto: ContextoActividad = contextoParametro === 'microbit' || contextoParametro === 'sin_conexion' || contextoParametro === 'sin_dispositivos' ? contextoParametro : 'computadoras';
      const agrupamiento: AgrupamientoActividad = agrupamientoParametro === 'individual' || agrupamientoParametro === 'equipos' ? agrupamientoParametro : 'parejas';
      return <SecuenciaConstruidaEstudiante actividadesIds={actividades.length ? actividades : actividadesBase.map((actividad) => actividad.id)} contexto={contexto} agrupamiento={agrupamiento} actividadesBase={actividadesBase} evaluacion={generarEvaluacionCapsula(capsula)} ejercicios={generarEjerciciosCapsula(capsula)} gradoTexto={capsula.gradoTexto ?? '9.º año'} titulo={capsula.titulo} descripcion={capsula.sintesis} />;
    }
  }

  if (grado === '9no' && secuenciaConstruidaUrl === 'algoritmos') {
    const actividadesSolicitadas = (parametros.get('actividades') ?? '').split(',').filter(Boolean);
    const idsValidos = new Set(actividadesAlgoritmos.map((actividad) => actividad.id));
    const actividades = actividadesSolicitadas.filter((id) => idsValidos.has(id));
    const contextoParametro = parametros.get('contexto');
    const agrupamientoParametro = parametros.get('agrupamiento');
    const contexto: ContextoActividad = contextoParametro === 'microbit' || contextoParametro === 'sin_conexion' || contextoParametro === 'sin_dispositivos' ? contextoParametro : 'computadoras';
    const agrupamiento: AgrupamientoActividad = agrupamientoParametro === 'individual' || agrupamientoParametro === 'equipos' ? agrupamientoParametro : 'parejas';
    return (
      <SecuenciaConstruidaEstudiante
        actividadesIds={actividades.length ? actividades : actividadesAlgoritmos.map((actividad) => actividad.id)}
        contexto={contexto}
        agrupamiento={agrupamiento}
      />
    );
  }

  if (grado === '8vo' && secuenciaConstruidaUrl === 'interactivos8') {
    const actividadesSolicitadas = (parametros.get('actividades') ?? '').split(',').filter(Boolean);
    const idsValidos = new Set(actividadesInteractivosOctavo.map((actividad) => actividad.id));
    const actividades = actividadesSolicitadas.filter((id) => idsValidos.has(id));
    const contextoParametro = parametros.get('contexto');
    const agrupamientoParametro = parametros.get('agrupamiento');
    const contexto: ContextoActividad = contextoParametro === 'microbit' || contextoParametro === 'sin_conexion' || contextoParametro === 'sin_dispositivos' ? contextoParametro : 'computadoras';
    const agrupamiento: AgrupamientoActividad = agrupamientoParametro === 'individual' || agrupamientoParametro === 'equipos' ? agrupamientoParametro : 'parejas';
    return (
      <SecuenciaConstruidaEstudiante
        actividadesIds={actividades.length ? actividades : actividadesInteractivosOctavo.map((actividad) => actividad.id)}
        contexto={contexto}
        agrupamiento={agrupamiento}
        actividadesBase={actividadesInteractivosOctavo}
        evaluacion={evaluacionInteractivosOctavo}
        gradoTexto="8.º año"
        titulo="Sistemas interactivos"
        descripcion="Modelar, construir, probar y mejorar sistemas que reciben datos y producen respuestas comprensibles."
      />
    );
  }

  if (grado === '7mo' && secuenciaConstruidaUrl === 'pensamiento7') {
    const actividadesSolicitadas = (parametros.get('actividades') ?? '').split(',').filter(Boolean);
    const idsValidos = new Set(actividadesPensamientoSeptimo.map((actividad) => actividad.id));
    const actividades = actividadesSolicitadas.filter((id) => idsValidos.has(id));
    const contextoParametro = parametros.get('contexto');
    const agrupamientoParametro = parametros.get('agrupamiento');
    const contexto: ContextoActividad = contextoParametro === 'microbit' || contextoParametro === 'sin_conexion' || contextoParametro === 'sin_dispositivos' ? contextoParametro : 'computadoras';
    const agrupamiento: AgrupamientoActividad = agrupamientoParametro === 'individual' || agrupamientoParametro === 'equipos' ? agrupamientoParametro : 'parejas';
    return (
      <SecuenciaConstruidaEstudiante
        actividadesIds={actividades.length ? actividades : actividadesPensamientoSeptimo.map((actividad) => actividad.id)}
        contexto={contexto}
        agrupamiento={agrupamiento}
        actividadesBase={actividadesPensamientoSeptimo}
        evaluacion={evaluacionPensamientoSeptimo}
        ejercicios={ejerciciosPensamientoSeptimo}
        gradoTexto="7.º año"
        titulo="Pensamiento computacional y algoritmos"
        descripcion="Descomponer problemas, reconocer patrones, diseñar algoritmos y mejorarlos mediante pruebas y explicaciones."
      />
    );
  }

  if (secuenciaUrl === 'ejemplo') {
    const ejemplo = contenidoTemas.recursos.find((item) => item.id === 'modulo-programacion-estudiantes');
    if (ejemplo) return <SecuenciaEjemploReact paginas={ejemplo.paginas} baseAssets={baseAssets} volverHref={`?grado=${grado}`} />;
  }

  if (!esVistaAlumno && grado === '7mo') {
    return <PortalDocenteSeptimo logoSrc={assetPath('/logoedytic.jpg')} />;
  }

  if (!esVistaAlumno && grado === '8vo') {
    return <PortalDocenteOctavo logoSrc={assetPath('/logoedytic.jpg')} />;
  }

  if (!esVistaAlumno && grado === '9no') {
    return <PortalDocenteNoveno logoSrc={assetPath('/logoedytic.jpg')} />;
  }

  const tituloVisible = esVistaAlumno ? `${infoEstudiante.gradoTexto}: ${infoEstudiante.enfoque}` : recurso.titulo;
  const subtituloVisible = esVistaAlumno ? 'Cápsula de aprendizaje' : recurso.subtitulo;

  return (
    <main
      data-print-root
      data-alto-contraste={altoContraste}
      className={`min-h-screen ${altoContraste ? 'bg-slate-950 text-white' : 'bg-[#f7fbff] text-slate-900'} ${esVistaAlumno ? 'pb-6' : ''} ${escalaTexto}`}
    >
      <section className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-5 md:px-8">
          <header className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={assetPath('/logoedytic.jpg')}
                alt="Logo EDyTIC"
                className="h-14 w-32 rounded-xl border border-sky-100 bg-white object-contain p-2 shadow-sm"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">{subtituloVisible}</p>
                <h1 className="text-2xl font-black text-[#0069aa] md:text-3xl">{tituloVisible}</h1>
              </div>
            </div>

            <div data-print-hidden className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl border border-sky-100 bg-white p-1">
                {(['docente', 'alumno'] as Interfaz[]).map((tipo) => (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => seleccionarInterfaz(tipo)}
                    className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
                      interfaz === tipo ? 'bg-[#f7941d] text-white shadow-sm' : 'text-slate-600 hover:bg-orange-50'
                    }`}
                  >
                    {tipo === 'docente' ? <Users size={15} /> : <MonitorPlay size={15} />}
                    {tipo === 'docente' ? 'Docente' : 'Estudiante'}
                  </button>
                ))}
              </div>
              <div id="tour-grados" className="inline-flex rounded-xl border border-sky-100 bg-sky-50 p-1">
                {grados.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => seleccionarGrado(g)}
                    className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                      grado === g && modoVistaEfectivo !== 'orientacion'
                        ? 'bg-[#0069aa] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-white hover:text-[#0069aa]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={abrirPrograma}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-bold transition ${
                  modoVistaEfectivo === 'orientacion'
                    ? 'border-[#f7941d] bg-[#f7941d] text-white shadow-sm'
                    : 'border-orange-100 bg-white text-[#c66b00] hover:bg-orange-50'
                }`}
              >
                <GraduationCap size={16} />
                Programa
              </button>
            </div>
          </header>

          {!esVistaAlumno && <p className="max-w-4xl text-sm leading-6 text-slate-600">{recurso.descripcion}</p>}
          <div data-print-hidden className={`flex flex-wrap items-center gap-2 rounded-2xl border p-3 ${altoContraste ? 'border-slate-700 bg-slate-900' : 'border-sky-100 bg-sky-50'}`}>
            <span className={`text-xs font-bold uppercase ${altoContraste ? 'text-sky-200' : 'text-[#0069aa]'}`}>Accesibilidad</span>
            <button
              onClick={alternarContraste}
              aria-pressed={altoContraste}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${altoContraste ? 'bg-white text-slate-950' : 'bg-white text-slate-700'}`}
            >
              <Eye size={14} />
              {altoContraste ? 'Contraste normal' : 'Alto contraste'}
            </button>
            <button
              onClick={alternarTamanoTexto}
              aria-pressed={preferenciaTexto === 'grande'}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${altoContraste ? 'bg-white text-slate-950' : 'bg-white text-slate-700'}`}
            >
              <Type size={14} />
              {preferenciaTexto === 'grande' ? 'Texto normal' : 'Texto grande'}
            </button>
            <button
              onClick={() => window.print()}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold ${altoContraste ? 'bg-white text-slate-950' : 'bg-white text-slate-700'}`}
            >
              <Printer size={14} />
              Imprimir vista
            </button>
            <button
              type="button"
              onClick={() => {
                setMenuUnidadesAbierto((valor) => !valor);
                setMenuHerramientasAbierto(false);
              }}
              aria-expanded={menuUnidadesAbierto}
              aria-controls="panel-unidades"
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                menuUnidadesAbierto ? 'bg-[#0069aa] text-white' : altoContraste ? 'bg-white text-slate-950' : 'bg-white text-slate-700'
              }`}
            >
              <Layers3 size={14} />
              Unidades
            </button>
            {!esVistaAlumno && (
              <button
                type="button"
                onClick={() => {
                  setMenuHerramientasAbierto((valor) => !valor);
                  setMenuUnidadesAbierto(false);
                }}
                aria-expanded={menuHerramientasAbierto}
                aria-controls="panel-herramientas"
                className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${
                  menuHerramientasAbierto ? 'bg-[#0069aa] text-white' : altoContraste ? 'bg-white text-slate-950' : 'bg-white text-slate-700'
                }`}
              >
                <Copy size={14} />
                Herramientas
              </button>
            )}
          </div>

          <div id="panel-unidades" data-print-hidden data-abierto={menuUnidadesAbierto} className="panel-desplegable">
            <div className="panel-desplegable-recorte">
              <section className="panel-desplegable-contenido" aria-label="Unidades del nivel">
                <div className="flex items-center justify-between gap-3 border-b border-sky-100 pb-3">
                  <div>
                    <p className="text-xs font-bold uppercase text-[#c66b00]">Progresión</p>
                    <h2 className="font-black text-[#0069aa]">Unidades de {infoEstudiante.gradoTexto}</h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMenuUnidadesAbierto(false)}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"
                    aria-label="Cerrar unidades"
                    title="Cerrar unidades"
                  >
                    <X size={16} />
                  </button>
                </div>
                <nav className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" aria-label="Unidades de la secuencia">
                  {secuenciaDelGrado.map((tema) => {
                    const activo = tema.recurso.id === recursoSeleccionado?.id;

                    return (
                      <button
                        key={tema.recurso.id}
                        type="button"
                        onClick={() => seleccionarUnidad(tema.recurso.id)}
                        aria-current={activo ? 'page' : undefined}
                        className={`min-w-0 rounded-lg border p-3 text-left text-sm transition ${
                          activo
                            ? 'border-[#0069aa] bg-sky-50 text-slate-900 shadow-sm'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-white'
                        }`}
                      >
                        <span className="text-xs font-black uppercase text-[#c66b00]">Unidad {tema.orden}</span>
                        <span className="mt-1 block break-words font-black leading-5">{tema.titulo}</span>
                      </button>
                    );
                  })}
                </nav>
              </section>
            </div>
          </div>

          {!esVistaAlumno && (
            <div id="panel-herramientas" data-print-hidden data-abierto={menuHerramientasAbierto} className="panel-desplegable">
              <div className="panel-desplegable-recorte">
                <section className="panel-desplegable-contenido" aria-label="Herramientas docentes">
                  <div className="flex items-center justify-between gap-3 border-b border-sky-100 pb-3">
                    <div>
                      <p className="text-xs font-bold uppercase text-[#c66b00]">Apoyos</p>
                      <h2 className="font-black text-[#0069aa]">Herramientas docentes</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMenuHerramientasAbierto(false)}
                      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600"
                      aria-label="Cerrar herramientas"
                      title="Cerrar herramientas"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <div className="mt-3 grid gap-4 lg:grid-cols-[1fr_1fr_auto] lg:items-start">
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Conceptos clave</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {infoEstudiante.conceptosClave.map((concepto) => (
                          <span key={concepto} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-slate-700">
                            {concepto}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-slate-900">Llevar a CREA</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {[
                          { sector: 'todo' as ModoVista, etiqueta: 'Completo' },
                          { sector: 'guia' as ModoVista, etiqueta: 'Guía' },
                          { sector: 'desafios' as ModoVista, etiqueta: 'Desafíos' },
                        ].map((item) => (
                          <button
                            key={item.sector}
                            type="button"
                            onClick={() => copiarIframe(item.sector)}
                            className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-bold text-white transition ${
                              iframeCopiado === item.sector ? 'bg-emerald-600' : 'bg-[#0069aa]'
                            }`}
                          >
                            <Copy size={13} />
                            {iframeCopiado === item.sector ? `${item.etiqueta} copiado` : item.etiqueta}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={reiniciarProgreso}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-rose-100 bg-white px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                    >
                      <RotateCcw size={16} />
                      Reiniciar progreso
                    </button>
                  </div>
                </section>
              </div>
            </div>
          )}
        </div>
      </section>

      <div
        data-print-layout
        className="mx-auto max-w-6xl px-4 py-6 md:px-8"
      >
        <section data-print-content className="space-y-6">
          {esVistaAlumno && temaSeleccionado && recursoSeleccionado && (
            <section className="rounded-lg border border-sky-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">
                    Cápsula CREA · Unidad {temaSeleccionado.orden} · {infoEstudiante.gradoTexto}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-[#0069aa]">{temaSeleccionado.titulo}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-700">{temaSeleccionado.proposito}</p>
                </div>
                <span className="shrink-0 rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">
                  {conceptosTema[0] ?? 'Programación'}
                </span>
              </div>
              <div className="mt-4 grid gap-4 border-t border-sky-100 pt-4 md:grid-cols-[1fr_auto]">
                <div>
                  <h3 className="text-sm font-black text-slate-900">Complejidad del nivel</h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">{perfilCapsula.complejidad}</p>
                </div>
                <div className="md:max-w-sm">
                  <h3 className="text-sm font-black text-slate-900">Tecnologías sugeridas</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {perfilCapsula.tecnologias.map((tecnologia) => (
                      <span key={tecnologia} className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
                        {tecnologia}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}
          {esVistaAlumno && (
            <section className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Route className="text-[#f7941d]" size={18} />
                <h2 className="font-black text-[#0069aa]">Abordajes de la actividad</h2>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-4">
                {rutasEstudiante.map((ruta) => (
                  <button
                    key={ruta.id}
                    onClick={() => seleccionarRutaEstudiante(ruta.id)}
                    aria-pressed={rutaEstudiante === ruta.id}
                    className={`rounded-xl border p-3 text-left text-sm transition ${
                      rutaEstudiante === ruta.id
                        ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-white'
                    }`}
                  >
                    <span className="block font-black">{ruta.etiqueta}</span>
                    <span className={`mt-1 block text-xs leading-5 ${rutaEstudiante === ruta.id ? 'text-sky-50' : 'text-slate-600'}`}>{ruta.descripcion}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
          {mostrarSintesisDocente && (
            <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">
                    <GraduationCap size={15} />
                    Guía docente
                  </span>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    Guía docente de programación para llevar al aula y a CREA
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Secuencia basada en los programas de Ciencias de la Computación EBI. Organiza el tema Programación por grado, ofrece fichas docentes por tema e integra materiales de apoyo, desafíos y versiones insertables para plataformas educativas.
                  </p>
                </div>
                <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Área</p>
                    <p className="font-black text-slate-900">{recurso.portal.area}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Tema</p>
                    <p className="font-black text-slate-900">{recurso.portal.tema}: {recurso.portal.subtema}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Niveles</p>
                    <p className="font-black text-slate-900">{recurso.portal.niveles.join(' · ')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase text-slate-500">Uso sugerido</p>
                    <p className="font-black text-slate-900">{recurso.portal.usoSugerido}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {!esVistaAlumno && (
          <section className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <Layers3 className="text-[#f7941d]" size={18} />
                <h2 className="font-black text-[#0069aa]">Sectores reutilizables de la guía</h2>
              </div>
              <button
                onClick={descargarSector}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-bold text-[#0069aa] transition hover:bg-white"
              >
                <Download size={16} />
                Descargar sector
              </button>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {modosVista.map((modo) => (
                <button
                  key={modo.id}
                  type="button"
                  onClick={() => seleccionarSector(modo.id)}
                  className={`rounded-xl border px-3 py-2 text-sm font-bold transition ${
                    modoVistaEfectivo === modo.id
                      ? 'border-[#0069aa] bg-[#0069aa] text-white shadow-sm'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-200 hover:bg-sky-50'
                  }`}
                >
                  {modo.etiqueta}
                </button>
              ))}
            </div>
          </section>
          )}

          {mostrarSintesisDocente && (
          <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">
                    <IconoGrado size={15} />
                    {infoEstudiante.gradoTexto}
                  </span>
                  <h2 className="text-xl font-black text-slate-950">{infoEstudiante.enfoque}</h2>
                  <p className="text-sm leading-6 text-slate-600">{infoEstudiante.introduccion}</p>
                </div>
              <div className="rounded-xl border border-orange-100 bg-orange-50 p-4 text-sm text-slate-700 md:max-w-xs">
                <p className="font-bold text-[#c66b00]">Pregunta guía</p>
                <p className="mt-1 leading-5">{infoEstudiante.preguntaGuia}</p>
              </div>
            </div>
          </div>
          )}

          {mostrarSintesisDocente && (
          <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Route className="text-[#f7941d]" size={20} />
              <h2 className="text-lg font-black text-[#0069aa]">Progresión visible</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-4">
              {[
                { titulo: 'Concepto inicial', detalle: infoEstudiante.conceptosClave[0] ?? 'Idea central' },
                { titulo: 'Práctica guiada', detalle: infoEstudiante.pasos[0]?.titulo ?? 'Actividad guiada' },
                { titulo: 'Desafío', detalle: ejerciciosDelGrado[0]?.enunciado ?? 'Zona activa' },
                { titulo: 'Proyecto', detalle: infoEstudiante.producto },
              ].map((item, index) => (
                <article key={item.titulo} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0069aa] text-xs font-black text-white">{index + 1}</span>
                  <h3 className="mt-3 text-sm font-black text-slate-950">{item.titulo}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{item.detalle}</p>
                </article>
              ))}
            </div>
          </section>
          )}

          {mostrarArquitecturaDua && (
            <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Info className="text-[#0f766e]" size={20} />
                <h2 className="text-lg font-black text-[#0069aa]">Arquitectura DUA del recurso</h2>
              </div>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                El recorrido combina apoyos visuales, textuales, sonoros e interactivos para ofrecer alternativas de acceso, participación y producción de evidencias.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {arquitecturaDua.map((item) => (
                  <article key={item.principio} className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <h3 className="text-sm font-black text-emerald-900">{item.principio}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item.detalle}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {mostrarSecuencia && temaSeleccionado && recursoSeleccionado && contenidoTemaSeleccionado && paginaSeleccionada && (
            <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-sky-100 pb-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">Unidades de aprendizaje</p>
                  <h2 className="text-lg font-black text-[#0069aa]">Recorrido curricular sugerido para {infoEstudiante.gradoTexto}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                    Cada tema se presenta como ficha docente embebible para CREA, con propósito curricular, contenidos del programa, actividad sugerida, evidencia y evaluación formativa.
                  </p>
                </div>
                {!esVistaAlumno && (
                  <div className="grid gap-2 sm:grid-cols-2 md:min-w-[460px]">
                    <button
                      onClick={() => copiarIframeRecurso(recursoSeleccionado)}
                      className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm ${
                        iframeRecursoCopiado === recursoSeleccionado.id ? 'bg-emerald-600' : 'bg-[#0069aa]'
                      }`}
                    >
                      <Copy size={16} />
                      {iframeRecursoCopiado === recursoSeleccionado.id ? 'Copiada' : 'Cápsula CREA'}
                    </button>
                    {ejerciciosDelTema.length > 0 && (
                      <button
                        onClick={() => copiarIframeZonaActivaTema(recursoSeleccionado)}
                        className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm ${
                          iframeRecursoCopiado === `zona-${recursoSeleccionado.id}` ? 'bg-emerald-600' : 'bg-[#0f766e]'
                        }`}
                      >
                        <Copy size={16} />
                        {iframeRecursoCopiado === `zona-${recursoSeleccionado.id}` ? 'Copiada' : 'Zona activa'}
                      </button>
                    )}
                    <button
                      onClick={imprimirTema}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f7941d] px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-[#dc7f12]"
                    >
                      <Printer size={16} />
                      Imprimir
                    </button>
                    <button
                      onClick={descargarTemaHtml}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-sky-50 px-3 py-2 text-sm font-bold text-[#0069aa] transition hover:bg-white"
                    >
                      <Download size={16} />
                      HTML
                    </button>
                    <button
                      onClick={descargarEvidenciaTema}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-white sm:col-span-2"
                    >
                      <FileDown size={16} />
                      Evidencia descargable
                    </button>
                  </div>
                )}
                {esVistaAlumno && (
                  <button
                    onClick={descargarEvidenciaTema}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-white"
                  >
                    <FileDown size={16} />
                    Descargar mi evidencia
                  </button>
                )}
              </div>

              <div className="mt-5">
                <article className="min-w-0 rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase text-[#c66b00]">Unidad {temaSeleccionado.orden}</p>
                      <h3 className="text-xl font-black text-slate-950">{temaSeleccionado.titulo}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{recursoSeleccionado.descripcion}</p>
                    </div>
                    {!esVistaAlumno && (
                      <a
                        href={crearHrefTema(recursoSeleccionado.id, 'alumno')}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-100 bg-white px-3 py-2 text-sm font-bold text-[#0069aa] transition hover:bg-sky-50"
                      >
                        Vista estudiante
                        <MonitorPlay size={16} />
                      </a>
                    )}
                  </div>

                  {!esVistaAlumno && (
                    <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50 p-3 text-sm leading-6 text-slate-700">
                      <p className="font-bold text-[#c66b00]">Uso docente</p>
                      <p>{temaSeleccionado.usoDocente}</p>
                    </div>
                  )}

                  <section className="mt-4 grid gap-3 lg:grid-cols-[1fr_1fr]">
                    <article className="rounded-xl border border-sky-100 bg-white p-4">
                      <div className="flex items-center gap-2">
                        <Brain className="text-[#0069aa]" size={18} />
                        <h4 className="font-black text-slate-950">Pensamiento computacional</h4>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {procesosTema.map((proceso) => (
                          <span key={proceso} className="rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-bold text-[#0069aa]">
                            {proceso}
                          </span>
                        ))}
                      </div>
                    </article>

                    <article className="rounded-xl border border-emerald-100 bg-white p-4">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="text-[#0f766e]" size={18} />
                        <h4 className="font-black text-slate-950">Glosario contextual</h4>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {conceptosTema.map((concepto) => (
                          <button
                            key={concepto}
                            onClick={() => setAyudaEstudiante(conceptosApoyo[normalizarTermino(concepto)] ?? { ...ayudaGenerica, termino: concepto })}
                            className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 transition hover:bg-white"
                          >
                            {concepto}
                          </button>
                        ))}
                      </div>
                    </article>
                  </section>

                  {!esVistaAlumno && (
                    <section className="mt-4 rounded-xl border border-amber-100 bg-white p-4">
                      <div className="flex items-center gap-2">
                        <BookOpen className="text-[#c66b00]" size={18} />
                        <h4 className="font-black text-slate-950">Terminología curricular</h4>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Correspondencia entre los términos del programa y expresiones que pueden aparecer en los recursos eXeLearning o en clase.
                      </p>
                      <div className="mt-3 grid gap-3 md:grid-cols-2">
                        {terminosTema.map((termino) => (
                          <article key={termino.canonico} className="rounded-lg border border-amber-100 bg-amber-50 p-3">
                            <h5 className="text-sm font-black text-[#7c3f00]">{termino.canonico}</h5>
                            <p className="mt-1 text-xs leading-5 text-slate-700">{termino.usoPrograma}</p>
                            <p className="mt-2 text-xs leading-5 text-slate-600">
                              <span className="font-bold">Equivalencias:</span> {termino.variantes.join(', ')}
                            </p>
                          </article>
                        ))}
                      </div>
                    </section>
                  )}

                  <section className="mt-4 rounded-xl border border-violet-100 bg-white p-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="text-violet-700" size={18} />
                      <h4 className="font-black text-slate-950">Banco de apoyos DUA del tema</h4>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-4">
                      {(pedagogiaTema?.apoyos ?? [
                        { titulo: 'Apoyo visual', detalle: apoyosConceptualesTema[0]?.imagen ? 'Imagen o animación asociada al concepto central.' : 'Usar captura, diagrama o esquema del recurso.' },
                        { titulo: 'Audio / lectura', detalle: 'Leer esta página permite escuchar el contenido sin salir del recurso.' },
                        { titulo: 'Ejemplo resuelto', detalle: apoyosConceptualesTema[0]?.ejemplo ?? 'Revisar un caso breve antes de resolver el desafío.' },
                        { titulo: 'Desafío extendido', detalle: 'Modificar una condición, agregar una variable o probar un caso nuevo.' },
                      ]).map((apoyo) => (
                        <article key={apoyo.titulo} className="rounded-lg border border-violet-100 bg-violet-50 p-3">
                          <h5 className="text-sm font-black text-violet-900">{apoyo.titulo}</h5>
                          <p className="mt-1 text-xs leading-5 text-slate-700">{apoyo.detalle}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  {fichaDocenteSeleccionada && (
                    <section className="mt-4 rounded-xl border border-sky-100 bg-white p-4">
                      <div className="flex flex-col gap-3 border-b border-sky-100 pb-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">Ficha docente embebible</p>
                          <h4 className="mt-1 text-lg font-black text-[#0069aa]">{fichaDocenteSeleccionada.titulo}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{fichaDocenteSeleccionada.referenciaPrograma}</p>
                        </div>
                        <span className="rounded-lg bg-sky-50 px-3 py-2 text-xs font-bold text-[#0069aa]">
                          {fichaDocenteSeleccionada.tiempoSugerido}
                        </span>
                      </div>

                      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_0.9fr]">
                        <div className="space-y-4">
                          <div>
                            <p className="text-xs font-bold uppercase text-slate-500">Propósito curricular</p>
                            <p className="mt-1 text-sm leading-6 text-slate-700">{fichaDocenteSeleccionada.propositoCurricular}</p>
                          </div>
                          <div>
                            <p className="text-xs font-bold uppercase text-slate-500">Contenidos del programa</p>
                            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700">
                              {fichaDocenteSeleccionada.contenidosPrograma.map((contenido) => (
                                <li key={contenido} className="flex gap-2">
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#f7941d]" />
                                  <span>{contenido}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="space-y-3 text-sm leading-6 text-slate-700">
                          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                            <p className="font-bold text-slate-950">Actividad sugerida</p>
                            <p className="mt-1">{fichaDocenteSeleccionada.actividadDocente}</p>
                          </div>
                          <div className="rounded-lg border border-emerald-100 bg-emerald-50 p-3">
                            <p className="font-bold text-emerald-800">Evidencia</p>
                            <p className="mt-1">{fichaDocenteSeleccionada.evidencia}</p>
                          </div>
                          <div className="rounded-lg border border-orange-100 bg-orange-50 p-3">
                            <p className="font-bold text-[#c66b00]">Evaluación formativa</p>
                            <p className="mt-1">{fichaDocenteSeleccionada.evaluacionFormativa}</p>
                          </div>
                        </div>
                      </div>

                      {!esVistaAlumno && (
                        <div className="mt-4 rounded-lg border border-sky-100 bg-sky-50 p-3 text-sm leading-6 text-slate-700">
                          <p className="font-bold text-[#0069aa]">Uso en CREA</p>
                          <p className="mt-1">{fichaDocenteSeleccionada.sugerenciaCrea}</p>
                        </div>
                      )}
                    </section>
                  )}

                  {!esVistaAlumno && (
                    <section className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="text-[#0069aa]" size={18} />
                        <h4 className="font-black text-slate-950">Rúbrica breve de proceso</h4>
                      </div>
                      <div className="mt-3 grid gap-2">
                        {(pedagogiaTema?.rubrica ?? dimensionesRubrica).map((dimension) => (
                          <div key={dimension} className="grid gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-700 md:grid-cols-[1fr_90px_90px_90px]">
                            <span className="font-semibold">{dimension}</span>
                            <span>Inicial</span>
                            <span>En proceso</span>
                            <span>Logrado</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  <div className="mt-4 grid gap-4 xl:grid-cols-[220px_1fr]">
                    <nav className="grid content-start gap-2" aria-label="Páginas de la unidad" role="tablist">
                      {contenidoTemaSeleccionado.paginas.map((pagina) => {
                        const activo = pagina.id === paginaSeleccionada.id;

                        return (
                          <button
                            key={pagina.id}
                            type="button"
                            role="tab"
                            aria-selected={activo}
                            aria-controls="contenido-pagina-unidad"
                            onClick={() => seleccionarPaginaTema(pagina.id)}
                            className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                              activo
                                ? 'border-[#0069aa] bg-white text-[#0069aa] shadow-sm'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50'
                            }`}
                          >
                            {pagina.titulo}
                          </button>
                        );
                      })}
                    </nav>

                    <div id="contenido-pagina-unidad" role="tabpanel" className="min-w-0 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex flex-col gap-3 border-b border-slate-100 pb-3 sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-lg font-black text-slate-950">{paginaSeleccionada.titulo}</h4>
                        <button
                          onClick={leerPaginaActual}
                          className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm transition ${
                            lecturaActiva ? 'bg-rose-600 hover:bg-rose-700' : 'bg-[#0069aa] hover:bg-[#005487]'
                          }`}
                        >
                          {lecturaActiva ? <Square size={15} /> : <Volume2 size={16} />}
                          {lecturaActiva ? 'Detener lectura' : 'Leer esta página'}
                        </button>
                      </div>
                      <div
                        ref={contenidoTemaRef}
                        className="contenido-tema mt-4"
                        onClick={manejarClickContenidoTema}
                        dangerouslySetInnerHTML={{ __html: htmlPaginaSeleccionada }}
                      />
                      {esVistaAlumno && (
                        <section className="mt-5 rounded-xl border border-sky-100 bg-sky-50 p-4">
                          {rutaEstudiante === 'leo' && (
                            <div>
                              <h5 className="font-black text-[#0069aa]">Mientras lees</h5>
                              <p className="mt-2 text-sm leading-6 text-slate-700">Subraya mentalmente la idea principal y abre los conceptos del glosario cuando una palabra te resulte nueva.</p>
                            </div>
                          )}
                          {rutaEstudiante === 'exploro' && (
                            <div>
                              <h5 className="font-black text-[#0069aa]">Para explorar</h5>
                              <p className="mt-2 text-sm leading-6 text-slate-700">Busca un ejemplo del tema en Scratch, micro:bit, PSeInt o JavaScript y compáralo con lo que aparece en la página.</p>
                            </div>
                          )}
                          {rutaEstudiante === 'resuelvo' && (
                            <div>
                              <h5 className="font-black text-[#0069aa]">Para resolver</h5>
                              <p className="mt-2 text-sm leading-6 text-slate-700">Transforma la idea en una secuencia: entrada o evento, proceso, salida y forma de comprobar que funciona.</p>
                              <p className="mt-2 rounded-lg bg-white p-3 text-sm font-semibold leading-6 text-slate-700">
                                {pedagogiaTema?.desafioExtendido ?? 'Propón una mejora o caso nuevo para aplicar el concepto.'}
                              </p>
                            </div>
                          )}
                          {rutaEstudiante === 'compruebo' && (
                            <div>
                              <h5 className="font-black text-[#0069aa]">Para comprobar</h5>
                              <div className="mt-3 grid gap-2 text-sm text-slate-700">
                                {['Puedo explicar la idea principal.', 'Puedo identificar un ejemplo.', 'Puedo probar un caso.', 'Sé qué necesito repasar.'].map((item) => (
                                  <label key={item} className="flex items-center gap-2 rounded-lg bg-white p-2">
                                    <input type="checkbox" className="h-4 w-4" />
                                    <span>{item}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </section>
                      )}
                    </div>
                  </div>

                  <section className="mt-4 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2">
                      <CheckSquare2 className="text-emerald-700" size={18} />
                      <h4 className="font-black text-emerald-900">Autoevaluación y evidencia</h4>
                    </div>
                    <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                      <div className="grid gap-2 text-sm text-slate-700">
                        {(pedagogiaTema?.evidencia ?? [
                          'Puedo explicar con mis palabras la idea central del tema.',
                          'Puedo identificar conceptos clave en un ejemplo.',
                          'Puedo construir o analizar una solución breve.',
                          'Puedo registrar una prueba, error o mejora.',
                        ]).map((item) => (
                          <label key={item} className="flex items-center gap-2 rounded-lg bg-white p-2">
                            <input type="checkbox" className="h-4 w-4" />
                            <span>{item}</span>
                          </label>
                        ))}
                      </div>
                      <button
                        onClick={descargarEvidenciaTema}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800"
                      >
                        <FileDown size={16} />
                        Descargar plantilla
                      </button>
                    </div>
                  </section>

                  {ejerciciosDelTema.length > 0 && (
                    <div className="mt-5">
                      <ZonaActiva key={`${grado}-${recursoSeleccionado.id}`} ejercicios={ejerciciosDelTema} />
                    </div>
                  )}
                </article>
              </div>
            </section>
          )}

          {mostrarOrientacion && (
            <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
                  <h2 className="text-lg font-black text-[#0069aa]">Programa EBI y orientación técnico-pedagógica</h2>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                <article className="rounded-xl border border-sky-100 bg-sky-50 p-4">
                  <p className="text-xs font-bold uppercase text-[#0069aa]">Objetivo o propósito</p>
                  <p className="mt-2 text-sm leading-5 text-slate-700">{infoDocente.meta}</p>
                </article>
                <article className="rounded-xl border border-orange-100 bg-orange-50 p-4">
                  <p className="text-xs font-bold uppercase text-[#c66b00]">Tiempo sugerido</p>
                  <p className="mt-2 text-sm leading-5 text-slate-700">{infoDocente.tiempo}</p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase text-slate-700">Evaluación formativa</p>
                  <p className="mt-2 text-sm leading-5 text-slate-700">{infoDocente.evaluacion}</p>
                </article>
              </div>
            </section>
          )}

          {mostrarGuia && (
              <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Vote className="text-[#f7941d]" size={20} />
                  <h2 className="text-lg font-black text-[#0069aa]">Proyecto guiado</h2>
                </div>
                <div className="mt-5 space-y-5">
                  {infoEstudiante.pasos.map((paso, index) => (
                    <article key={paso.titulo} className="grid gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 md:grid-cols-[1fr_260px]">
                      <div className="space-y-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#0069aa] text-sm font-black text-white">
                          {index + 1}
                        </span>
                        <div>
                          <h3 className="font-black text-slate-950">{paso.titulo}</h3>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{paso.descripcion}</p>
                        </div>
                        {paso.codigo && (
                          <pre className="overflow-x-auto rounded-xl border border-sky-100 bg-white p-4 text-xs leading-5 text-slate-800 shadow-sm">
                            <code>{paso.codigo}</code>
                          </pre>
                        )}
                      </div>
                      {paso.imagen && (
                        <img
                          src={assetPath(paso.imagen)}
                          alt={paso.alt ?? paso.titulo}
                          className="h-full max-h-72 w-full rounded-xl border border-white bg-white object-contain shadow-md"
                        />
                      )}
                    </article>
                  ))}
                </div>
              </section>
          )}

          {mostrarDesafios && (
              <ZonaActiva key={`${grado}-${recursoSeleccionado?.id ?? 'grado'}`} ejercicios={ejerciciosZonaActiva} />
          )}
        </section>

      </div>

      {mostrarSintesisDocente && (
        <section data-print-hidden className="border-t border-sky-100 bg-white/70">
          <div className="mx-auto grid max-w-6xl gap-4 px-4 py-6 md:px-8 lg:grid-cols-3">
            <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <Sparkles className="text-[#f7941d]" size={18} />
                <h2 className="font-black text-[#0069aa]">Producto esperado</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{infoEstudiante.producto}</p>
            </section>

            <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <FileText className="text-[#f7941d]" size={18} />
              <h2 className="font-black text-[#0069aa]">Ficha de actividades</h2>
            </div>
            <div className="mt-3 grid gap-2">
              {actividadesPosibles.map((actividad) => (
                <article key={actividad.titulo} className="rounded-xl border border-orange-100 bg-orange-50 p-3">
                  <h3 className="text-sm font-black text-slate-900">{actividad.titulo}</h3>
                  <p className="mt-1 text-xs leading-5 text-slate-700">{actividad.proposito}</p>
                </article>
              ))}
            </div>
            <div className="mt-4 grid gap-2">
              <button
                onClick={imprimirFicha}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f7941d] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#dc7f12]"
              >
                <Printer size={16} />
                Imprimir ficha
              </button>
              <button
                onClick={descargarFichaHtml}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-4 py-3 text-sm font-bold text-[#c66b00] transition hover:bg-white"
              >
                <Download size={16} />
                Descargar HTML
              </button>
              <button
                onClick={descargarFicha}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                <Download size={16} />
                Descargar texto
              </button>
            </div>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
            <h2 className="font-black text-[#0069aa]">Bibliografía sugerida</h2>
            <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
              {recurso.bibliografia.map((referencia) => (
                <a
                  key={referencia.titulo}
                  href={referencia.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-slate-200 bg-slate-50 p-3 transition hover:border-sky-200 hover:bg-sky-50"
                >
                  <span className="flex items-start justify-between gap-2 text-sm font-black text-slate-900">
                    {referencia.titulo}
                    <ExternalLink className="mt-0.5 shrink-0 text-[#0069aa]" size={14} />
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">{referencia.detalle}</span>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm lg:col-span-3">
            <h2 className="font-black text-[#0069aa]">Quiénes somos</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {recurso.quienesSomos.map((institucion) => (
                <a
                  key={institucion.nombre}
                  href={institucion.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-xl border border-sky-100 bg-sky-50 p-3 transition hover:bg-white"
                >
                  <span className="flex items-center justify-between gap-2 text-sm font-black text-[#0069aa]">
                    {institucion.nombre}
                    <ExternalLink size={14} />
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600">{institucion.resena}</span>
                </a>
              ))}
            </div>
          </section>
          </div>
        </section>
      )}
      <footer data-print-hidden className="border-t border-sky-100 bg-white px-4 py-4 text-center text-xs font-semibold text-slate-600">Recurso Educativo Abierto para docentes · Programación EBI · {infoEstudiante.gradoTexto} · CC BY-SA 4.0</footer>
      {ayudaEstudiante && (
        <div
          ref={dialogoConceptoRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 py-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ayuda-estudiante-titulo"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setAyudaEstudiante(null);
          }}
        >
          <section className="max-h-full w-full max-w-lg overflow-y-auto rounded-2xl border border-sky-100 bg-white p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-sky-100 pb-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-[#f7941d]">Apoyo conceptual</p>
                <h2 id="ayuda-estudiante-titulo" className="mt-1 text-xl font-black text-[#0069aa]">
                  {ayudaEstudiante.termino}
                </h2>
              </div>
              <button
                onClick={() => setAyudaEstudiante(null)}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50"
                aria-label="Cerrar ayuda conceptual"
              >
                <X size={18} />
              </button>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto]">
              <div className="space-y-3 text-sm leading-6 text-slate-700">
                <p>{ayudaEstudiante.descripcion}</p>
                {ayudaEstudiante.ejemplo && (
                  <div className="rounded-xl border border-sky-100 bg-sky-50 p-3">
                    <p className="font-bold text-[#0069aa]">Ejemplo</p>
                    <p className="mt-1">{ayudaEstudiante.ejemplo}</p>
                  </div>
                )}
                {ayudaEstudiante.enlaceDocente && !esVistaAlumno && (
                  <a
                    href={ayudaEstudiante.enlaceDocente}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-sky-100 bg-white px-3 py-2 text-xs font-bold text-[#0069aa] transition hover:bg-sky-50"
                  >
                    Ampliar para docente
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
              {ayudaEstudiante.imagen && (
                <img
                  src={assetPath(ayudaEstudiante.imagen)}
                  alt={ayudaEstudiante.alt ?? ''}
                  className="max-h-36 w-full rounded-xl border border-sky-100 bg-slate-50 object-contain p-2 sm:w-40"
                />
              )}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
