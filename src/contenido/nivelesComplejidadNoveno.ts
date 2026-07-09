import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';

export type NivelComplejidadId = 'acompanado' | 'base' | 'extendido';

export type NivelComplejidad = {
  id: NivelComplejidadId;
  etiqueta: string;
  foco: string;
  consigna: string;
  apoyos: string[];
  evidencia: string;
};

export const etiquetasNivelComplejidad: Record<NivelComplejidadId, string> = {
  acompanado: 'Acompañado',
  base: 'Base',
  extendido: 'Extendido',
};

export const esNivelComplejidad = (valor: string | null): valor is NivelComplejidadId =>
  valor === 'acompanado' || valor === 'base' || valor === 'extendido';

export const crearNivelesComplejidad = (capsula: CapsulaNoveno): NivelComplejidad[] => [
  {
    id: 'acompanado',
    etiqueta: etiquetasNivelComplejidad.acompanado,
    foco: 'Para estudiantes que necesitan más andamiaje, menor carga simultánea y pasos visibles.',
    consigna: `${capsula.practica.consigna} Trabaja con un solo caso, usa una plantilla o tabla de seguimiento y registra una prueba guiada.`,
    apoyos: [
      'Reducir la situación a un caso inicial.',
      'Completar una estructura parcialmente armada antes de crear una propia.',
      'Usar pares, tarjetas, tabla esperado/obtenido o pseudocódigo comentado.',
    ],
    evidencia: `${capsula.practica.evidencia} Debe incluir al menos un caso resuelto con apoyo y una explicación breve de qué se comprendió.`,
  },
  {
    id: 'base',
    etiqueta: etiquetasNivelComplejidad.base,
    foco: 'Para el desempeño esperado del curso: resolver la consigna completa y verificarla.',
    consigna: capsula.practica.consigna,
    apoyos: capsula.practica.apoyos,
    evidencia: capsula.practica.evidencia,
  },
  {
    id: 'extendido',
    etiqueta: etiquetasNivelComplejidad.extendido,
    foco: 'Para estudiantes que avanzan con autonomía y pueden transferir, generalizar o justificar mejoras.',
    consigna: `${capsula.practica.consigna} Agrega un caso diferente o una variante, prueba un resultado inesperado y justifica una mejora o decisión de diseño.`,
    apoyos: [
      'Incorporar un caso límite o inválido.',
      'Comparar dos estrategias posibles antes de elegir una.',
      'Documentar una mejora considerando privacidad, accesibilidad o claridad del programa.',
    ],
    evidencia: `${capsula.practica.evidencia} Debe incluir una variante, al menos un caso límite y una justificación de mejora basada en evidencia.`,
  },
];

export const obtenerNivelComplejidad = (capsula: CapsulaNoveno, nivel: NivelComplejidadId) =>
  crearNivelesComplejidad(capsula).find((item) => item.id === nivel) ?? crearNivelesComplejidad(capsula)[1];
