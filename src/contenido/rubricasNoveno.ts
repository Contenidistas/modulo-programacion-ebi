export type NivelRubrica = {
  nivel: 1 | 2 | 3 | 4;
  etiqueta: string;
  puntaje: string;
  descriptor: string;
};

export type CriterioRubrica = {
  id: string;
  criterio: string;
  peso: number;
  evidencia: string;
  niveles: NivelRubrica[];
};

export type RubricaAnalitica = {
  capsulaId: string;
  titulo: string;
  propositoEvaluacion: string;
  escala: string;
  minimoSuficiencia: string;
  criterios: CriterioRubrica[];
};

type BaseRubrica = {
  focoConceptual: string;
  producto: string;
  pruebas: string;
  comunicacion: string;
};

const basesRubrica: Record<string, BaseRubrica> = {
  '9-algoritmos': {
    focoConceptual: 'descomposición del problema, entradas, decisiones y salida esperada',
    producto: 'pseudocódigo o algoritmo con inicio, pasos no ambiguos, decisiones y cierre',
    pruebas: 'recorridos válido, bloqueado y alternativo',
    comunicacion: 'justificación de una modificación realizada después de probar el algoritmo',
  },
  '9-variables': {
    focoConceptual: 'variables, inicialización, asignación y cambio de estado',
    producto: 'programa con nombres claros y tabla de evolución de valores',
    pruebas: 'ventas, reposición y stock bajo',
    comunicacion: 'explicación de cómo y por qué cambia cada variable',
  },
  '9-constantes': {
    focoConceptual: 'distinción entre datos variables y reglas estables',
    producto: 'declaraciones de constantes y variables con nombres descriptivos',
    pruebas: 'casos donde cambia la medición sin cambiar el límite',
    comunicacion: 'justificación de por qué un dato debe quedar protegido',
  },
  '9-tipos-datos': {
    focoConceptual: 'selección de tipos de datos según operaciones posibles',
    producto: 'tabla de campos, tipos, ejemplos válidos y casos dudosos',
    pruebas: 'valores numéricos, textos, booleanos y errores de tipo',
    comunicacion: 'argumentación de decisiones ambiguas como teléfono, edad o autorización',
  },
  '9-entrada-datos': {
    focoConceptual: 'origen, formato y validación de entradas',
    producto: 'captura de datos con validaciones y mensajes de corrección',
    pruebas: 'casos válido, vacío, texto, negativo y superior al máximo',
    comunicacion: 'explicación de cómo la validación evita procesar datos inadecuados',
  },
  '9-salida-datos': {
    focoConceptual: 'salida como comunicación de resultado, unidad, significado y accesibilidad',
    producto: 'tres salidas: normal, advertencia y alternativa accesible',
    pruebas: 'lectura por otra persona, ausencia de color y mensaje con unidad',
    comunicacion: 'mejora basada en retroalimentación del usuario',
  },
  '9-estructuras-selectivas': {
    focoConceptual: 'condiciones booleanas, alternativas y operadores lógicos',
    producto: 'programa o pseudocódigo con tres estados diferenciados',
    pruebas: 'valores normales, límites y extremos de temperatura o humedad',
    comunicacion: 'explicación de una condición corregida a partir de una tabla de decisiones',
  },
  '9-estructuras-repetitivas': {
    focoConceptual: 'patrón repetido, inicio, condición, actualización y salida del ciclo',
    producto: 'ciclo que procesa mediciones sin duplicar instrucciones',
    pruebas: 'seguimiento de al menos tres iteraciones y caso de condición de salida',
    comunicacion: 'explicación del contador, acumulador y riesgo de ciclo infinito',
  },
  '9-funciones': {
    focoConceptual: 'descomposición en funciones con responsabilidad, parámetros y retorno',
    producto: 'código modular con funciones probadas de forma aislada',
    pruebas: 'al menos un caso por función y una prueba de integración',
    comunicacion: 'contrato entrada-tarea-salida de cada función',
  },
  '9-listas': {
    focoConceptual: 'colección ordenada, recorrido, posición, longitud y procesamiento',
    producto: 'programa que calcula total, promedio y máximo desde una colección',
    pruebas: 'comprobación manual de suma, promedio y máximo',
    comunicacion: 'explicación de por qué una lista evita variables aisladas',
  },
  '9-depuracion': {
    focoConceptual: 'comparación esperado/obtenido, hipótesis, cambio controlado y nueva prueba',
    producto: 'bitácora de depuración con casos, evidencia, causa y corrección',
    pruebas: 'caso habitual, dos casos límite y repetición después del cambio',
    comunicacion: 'relato técnico del error como evidencia para mejorar',
  },
};

const crearCriterios = (base: BaseRubrica): CriterioRubrica[] => [
  {
    id: 'comprension',
    criterio: 'Comprensión y modelado del problema',
    peso: 25,
    evidencia: base.focoConceptual,
    niveles: [
      { nivel: 1, etiqueta: 'Inicial', puntaje: '1 punto', descriptor: `Reconoce 1 elemento del problema, pero omite relaciones centrales de ${base.focoConceptual}. Requiere guía directa para continuar.` },
      { nivel: 2, etiqueta: 'En desarrollo', puntaje: '2 puntos', descriptor: `Identifica al menos 2 elementos relevantes, aunque conserva ambigüedades o mezcla conceptos. Necesita revisar 1 relación clave.` },
      { nivel: 3, etiqueta: 'Suficiente', puntaje: '3 puntos', descriptor: `Identifica al menos 3 elementos relevantes y explica la relación principal sin contradicciones. El modelo permite iniciar la solución.` },
      { nivel: 4, etiqueta: 'Avanzado', puntaje: '4 puntos', descriptor: `Integra 4 o más elementos, anticipa un caso límite y justifica por qué el modelo representa adecuadamente la situación.` },
    ],
  },
  {
    id: 'produccion',
    criterio: 'Diseño e implementación de la solución',
    peso: 30,
    evidencia: base.producto,
    niveles: [
      { nivel: 1, etiqueta: 'Inicial', puntaje: '1 punto', descriptor: `Produce una solución incompleta: falta inicio, cierre, datos o una instrucción esencial. Menos del 50% del producto esperado está presente.` },
      { nivel: 2, etiqueta: 'En desarrollo', puntaje: '2 puntos', descriptor: `Incluye entre 50% y 75% de los componentes requeridos, pero conserva errores de orden, nombres poco claros o instrucciones ambiguas.` },
      { nivel: 3, etiqueta: 'Suficiente', puntaje: '3 puntos', descriptor: `Incluye al menos 75% de los componentes requeridos de ${base.producto}. La solución puede ejecutarse o seguirse con ajustes menores.` },
      { nivel: 4, etiqueta: 'Avanzado', puntaje: '4 puntos', descriptor: `Incluye todos los componentes requeridos, usa nombres/estructura consistentes y contempla una mejora o variante sin romper la solución base.` },
    ],
  },
  {
    id: 'pruebas',
    criterio: 'Pruebas, validación y mejora',
    peso: 30,
    evidencia: base.pruebas,
    niveles: [
      { nivel: 1, etiqueta: 'Inicial', puntaje: '1 punto', descriptor: 'Realiza 0 o 1 prueba sin registrar resultado esperado y obtenido. La corrección se basa en intuición.' },
      { nivel: 2, etiqueta: 'En desarrollo', puntaje: '2 puntos', descriptor: `Registra 2 pruebas, pero al menos una no compara esperado/obtenido o no se vincula claramente con ${base.pruebas}.` },
      { nivel: 3, etiqueta: 'Suficiente', puntaje: '3 puntos', descriptor: `Registra 3 pruebas relevantes, incluyendo al menos 1 caso límite o inválido, y realiza 1 mejora basada en evidencia.` },
      { nivel: 4, etiqueta: 'Avanzado', puntaje: '4 puntos', descriptor: `Registra 4 o más pruebas variadas, explica la causa de un fallo y verifica la mejora repitiendo al menos 1 caso.` },
    ],
  },
  {
    id: 'comunicacion',
    criterio: 'Comunicación, documentación y responsabilidad',
    peso: 15,
    evidencia: base.comunicacion,
    niveles: [
      { nivel: 1, etiqueta: 'Inicial', puntaje: '1 punto', descriptor: 'Entrega una explicación fragmentaria: no distingue decisión, evidencia y resultado. No declara apoyos ni fuentes usadas.' },
      { nivel: 2, etiqueta: 'En desarrollo', puntaje: '2 puntos', descriptor: 'Explica al menos 1 decisión, pero la evidencia es parcial o no queda claro qué fue realizado, corregido o consultado.' },
      { nivel: 3, etiqueta: 'Suficiente', puntaje: '3 puntos', descriptor: `Explica al menos 2 decisiones y documenta ${base.comunicacion}. Declara apoyos usados y evita datos personales innecesarios.` },
      { nivel: 4, etiqueta: 'Avanzado', puntaje: '4 puntos', descriptor: 'Comunica proceso, evidencia, mejora y límites de la solución; además identifica un impacto ético, de privacidad o accesibilidad.' },
    ],
  },
];

export const rubricasNoveno: Record<string, RubricaAnalitica> = Object.fromEntries(
  Object.entries(basesRubrica).map(([capsulaId, base]) => [
    capsulaId,
    {
      capsulaId,
      titulo: 'Rúbrica analítica de desempeño',
      propositoEvaluacion: 'Valorar el proceso completo de programación: comprensión, producción, pruebas, mejora y comunicación responsable.',
      escala: '4 niveles por criterio. Puntaje máximo sugerido: 16 puntos ponderables.',
      minimoSuficiencia: 'Suficiencia sugerida: nivel 3 en producción y pruebas, y al menos 10 puntos totales sin ningún criterio en nivel 1.',
      criterios: crearCriterios(base),
    },
  ]),
) as Record<string, RubricaAnalitica>;

export const obtenerRubricaNoveno = (capsulaId: string) => rubricasNoveno[capsulaId];
