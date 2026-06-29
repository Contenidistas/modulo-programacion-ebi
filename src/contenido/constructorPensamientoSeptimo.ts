import type { Ejercicio } from '@/componentes/ZonaActiva';
import type { ActividadConstructor } from '@/contenido/constructorUnidadAlgoritmos';

const reglasTutor = `Actúa como tutor de pensamiento computacional para un estudiante de 7.º año. Pregunta primero qué comprende y qué intentó. Formula una sola pregunta orientadora por vez y ofrece pistas graduales, no respuestas ni productos terminados. No escribas el algoritmo o el código completo. Usa ejemplos análogos breves y pide anticipar, probar y comparar resultados. Trata el error como evidencia. No solicites datos personales; usa datos ficticios. Señala privacidad, accesibilidad, sesgos e impacto de la solución cuando corresponda. Pide que el estudiante explique cada decisión, identifique qué hizo por sí mismo, qué apoyo recibió y cómo lo verificó. Cierra solicitando su síntesis y la siguiente prueba.`;

const crearPrompt = (actividad: string, foco: string) => `${reglasTutor}\n\nActividad: ${actividad}.\nFoco de la tutoría: ${foco}`;

export const actividadesPensamientoSeptimo: ActividadConstructor[] = [
  {
    id: '7-diagnostico-descomponer', etapa: 'Activación y diagnóstico', titulo: 'Un problema, muchas partes',
    proposito: 'Recuperar ideas previas y descomponer una situación antes de proponer instrucciones.', duracion: 30,
    consigna: 'La comunidad educativa quiere mejorar la clasificación de residuos. Construye un mapa con personas, objetos, datos, decisiones y dificultades que forman parte del problema.',
    proceso: ['Anotar individualmente qué sucede hoy.', 'Agrupar ideas relacionadas y nombrar cada grupo.', 'Distinguir información necesaria de detalles que no cambian la decisión.', 'Elegir una parte abordable y justificar por qué comenzar allí.'],
    evidencia: 'Mapa del problema y explicación de la parte elegida.',
    preguntasRetroalimentacion: ['¿Qué parte puede estudiarse por separado?', '¿Qué dato necesitas y cuál sería solo decorativo?', '¿Qué quedó fuera del modelo y por qué?'],
    alternativas: { computadoras: 'Crear el mapa en un documento o pizarra digital con información ficticia.', microbit: 'Explorar qué parte podría representarse con botones, iconos o sensores de la placa.', sin_conexion: 'Usar una aplicación local de diagramas o una presentación descargada.', sin_dispositivos: 'Construir el mapa con tarjetas, notas adhesivas e hilos de relación.' },
    apoyos: ['Usar las preguntas: quién, qué recibe, qué decide y qué comunica.', 'Entregar tarjetas con categorías para iniciar la organización.'],
    varianteExtendida: 'Comparar dos mapas y explicar qué descomposición resultaría más útil para diseñar una solución.',
    promptTutor: crearPrompt('Un problema, muchas partes', 'Ayudar a descomponer sin decidir por el estudiante qué partes debe conservar.'),
  },
  {
    id: '7-exploracion-patrones', etapa: 'Exploración guiada', titulo: 'Encontrar patrones y construir reglas',
    proposito: 'Comparar ejemplos para reconocer regularidades y formular criterios de clasificación.', duracion: 40,
    consigna: 'Compara una colección de objetos ficticios y decide qué características permiten clasificarlos. Formula reglas, busca excepciones y revisa las categorías.',
    proceso: ['Observar propiedades sin asignar categorías todavía.', 'Proponer agrupamientos y explicar el patrón común.', 'Probar objetos límite o ambiguos.', 'Reescribir una regla para que otra persona pueda aplicarla.'],
    evidencia: 'Tabla de patrones, reglas y al menos una excepción analizada.',
    preguntasRetroalimentacion: ['¿Qué propiedad se repite?', '¿Tu regla funciona con todos los ejemplos?', '¿Cómo tratarías un objeto que cumple dos criterios?'],
    alternativas: { computadoras: 'Clasificar un conjunto de imágenes libres o datos ficticios en una tabla.', microbit: 'Usar botones para recorrer casos y mostrar una categoría mediante iconos.', sin_conexion: 'Trabajar con imágenes y una tabla almacenadas localmente.', sin_dispositivos: 'Clasificar tarjetas de objetos y cambiar deliberadamente un criterio.' },
    apoyos: ['Comenzar con dos propiedades visibles.', 'Usar la estructura: si tiene…, entonces…; en otro caso…'],
    varianteExtendida: 'Diseñar un caso ambiguo y comparar dos reglas válidas para resolverlo.',
    promptTutor: crearPrompt('Encontrar patrones y construir reglas', 'Pedir comparaciones y contraejemplos; no formular la regla final.'),
  },
  {
    id: '7-produccion-algoritmo', etapa: 'Producción y resolución', titulo: 'Diseñar un clasificador interactivo',
    proposito: 'Expresar un algoritmo que reciba datos, tome decisiones y comunique una salida.', duracion: 65,
    consigna: 'Diseña un clasificador que pregunte por una característica de un objeto y sugiera una categoría. Representa primero el algoritmo, impleméntalo si el contexto lo permite y prueba al menos cuatro casos.',
    proceso: ['Definir entrada, categorías y salida esperada.', 'Escribir o dibujar la secuencia y sus decisiones.', 'Implementar o simular la solución.', 'Probar casos habituales, límite e inválidos y realizar una mejora.'],
    evidencia: 'Algoritmo, prototipo o programa, tabla de pruebas y mejora explicada.',
    preguntasRetroalimentacion: ['¿Todas las respuestas posibles tienen un camino?', '¿Qué ocurrirá con una entrada no prevista?', '¿La salida explica qué hacer y por qué?'],
    alternativas: { computadoras: 'Implementar con bloques en Scratch o MakeCode y observar cada camino de la decisión.', microbit: 'Programar con bloques en MakeCode: usar botones como entradas e iconos como salidas.', sin_conexion: 'Usar Scratch Desktop, MakeCode sin conexión o capturas de bloques previamente descargadas.', sin_dispositivos: 'Simular el algoritmo con tarjetas de decisión y una persona que lo ejecute literalmente.' },
    apoyos: ['Completar primero una tabla entrada-condición-salida.', 'Probar el algoritmo con una sola categoría antes de agregar otra.'],
    varianteExtendida: 'Agregar una categoría, validar entradas o explicar una limitación ética o práctica del clasificador.',
    promptTutor: crearPrompt('Diseñar un clasificador interactivo', 'Solicitar predicciones, casos de prueba y explicaciones sin proporcionar el algoritmo ni código completo.'),
  },
  {
    id: '7-transferencia-revision', etapa: 'Transferencia y reflexión', titulo: 'Probar, explicar y transferir',
    proposito: 'Coevaluar una solución, mejorarla con evidencias y transferir la estrategia a otro problema.', duracion: 45,
    consigna: 'Ejecuta literalmente la solución de otro equipo con tres casos. Devuelve una fortaleza, una pregunta y una evidencia de mejora. Luego adapta tu estrategia para clasificar materiales escolares u otra situación acordada.',
    proceso: ['Comprender el propósito sin cambiar la solución.', 'Seleccionar casos que recorran caminos diferentes.', 'Registrar resultados esperados y obtenidos.', 'Revisar la propia solución y explicar qué se transfirió.'],
    evidencia: 'Registro de coevaluación, nueva versión y reflexión de transferencia.',
    preguntasRetroalimentacion: ['¿Qué evidencia sustenta tu devolución?', '¿Qué parte del algoritmo puede reutilizarse?', '¿Qué debe cambiar cuando cambia el problema?'],
    alternativas: { computadoras: 'Intercambiar proyectos o documentos y conservar ambas versiones.', microbit: 'Probar programas con combinaciones diferentes de botones y registrar resultados.', sin_conexion: 'Compartir archivos localmente y usar una bitácora descargada.', sin_dispositivos: 'Realizar una galería, ejecutar algoritmos con tarjetas y dejar devoluciones escritas.' },
    apoyos: ['Usar la fórmula: observo…, me pregunto…, sugiero probar…', 'Entregar tres tipos de caso: habitual, límite e inesperado.'],
    varianteExtendida: 'Comparar qué partes de la solución son generales y cuáles dependen del contexto.',
    promptTutor: crearPrompt('Probar, explicar y transferir', 'Ayudar a fundamentar devoluciones y transferencias sin evaluar por el estudiante.'),
  },
];

export const evaluacionPensamientoSeptimo = {
  observacion: ['Descompone el problema en partes manejables.', 'Reconoce patrones y abstrae información relevante.', 'Expresa pasos y decisiones comprensibles.', 'Prueba casos diversos y registra evidencias.', 'Explica mejoras y considera retroalimentación.'],
  autoevaluacion: ['Puedo explicar qué parte del problema resolví.', 'Puedo justificar la información que usé.', 'Probé caminos y entradas diferentes.', 'Mejoré mi solución a partir de una evidencia.'],
  coevaluacion: ['Una decisión que comprendí fue…', 'Una prueba que ayudaría a revisar es…', 'Una parte reutilizable de la solución es…'],
  ticketSalida: ['¿Qué estrategia de pensamiento computacional utilizaste?', '¿Qué error o excepción modificó tu idea inicial?', '¿Cuál sería tu siguiente prueba?'],
  bitacora: ['Caso probado', 'Resultado esperado', 'Resultado obtenido', 'Hipótesis', 'Cambio', 'Nueva evidencia'],
  devoluciones: ['La descomposición identifica varias partes. Explica cuál conviene abordar primero y con qué evidencia.', 'La regla funciona en los ejemplos habituales. Diseña ahora un caso que pueda desafiarla.', 'Antes de modificar la solución, registra qué resultado esperabas y qué observaste.'],
  rubricaOpcional: ['Comprensión del problema', 'Estrategias de pensamiento computacional', 'Pruebas y mejora', 'Explicación del proceso'],
};

export const ejerciciosPensamientoSeptimo: Ejercicio[] = [
  { id: '7-pc-clasificar', grado: '7mo', tipo: 'opcion_multiple', enunciado: 'Un equipo separa el problema en recolección, clasificación y comunicación. ¿Qué estrategia está usando principalmente?', opciones: ['Descomposición', 'Repetición', 'Decoración', 'Azar'], correcta: 0, feedback: 'Descomponer consiste en separar un problema complejo en partes que puedan comprenderse y abordarse.' },
  { id: '7-pc-ordenar', grado: '7mo', tipo: 'completar', enunciado: 'Completa el paso que falta para que la secuencia pueda tomar una decisión.', plantilla: '1. Recibir el material\n2. [HUECO]\n3. Mostrar la categoría', respuestas: ['comparar sus características con las reglas', 'comparar caracteristicas', 'aplicar la regla'], feedback: 'Antes de producir una salida, el algoritmo debe procesar la entrada aplicando una regla o condición.' },
  { id: '7-pc-anticipar', grado: '7mo', tipo: 'opcion_multiple', enunciado: 'Regla: si el material es papel limpio, mostrar “papel”; en otro caso, mostrar “revisar”. ¿Qué salida produce para papel mojado?', opciones: ['papel', 'revisar', 'ninguna', 'limpio'], correcta: 1, feedback: 'El caso no cumple toda la condición “papel limpio”, por eso sigue el camino alternativo.' },
  { id: '7-pc-depurar', grado: '7mo', tipo: 'opcion_multiple', enunciado: 'Un clasificador envía todos los objetos a la misma categoría. ¿Qué acción aporta mejor evidencia para localizar el error?', opciones: ['Cambiar varios bloques al azar', 'Probar un caso por categoría y registrar el camino seguido', 'Cambiar los colores', 'Volver a empezar sin mirar'], correcta: 1, feedback: 'Las pruebas intencionales permiten comparar lo esperado con lo obtenido y localizar la decisión que falla.' },
];

export const ejemplosTecnologicosSeptimo = [
  { tecnologia: 'Scratch', explicacion: 'La secuencia se construye encastrando eventos, sensores, decisiones y apariencias.', bloques: [
    { tipo: 'evento', texto: 'al presionar bandera verde' }, { tipo: 'sensor', texto: 'preguntar ¿El papel está limpio?' },
    { tipo: 'control', texto: 'si respuesta = sí' }, { tipo: 'salida', texto: 'decir Contenedor de papel' },
    { tipo: 'control', texto: 'si no' }, { tipo: 'salida', texto: 'decir Revisar el material' },
  ] },
  { tecnologia: 'MakeCode', explicacion: 'La misma lógica puede representarse con botones, variables y bloques de decisión.', bloques: [
    { tipo: 'evento', texto: 'al presionar botón A' }, { tipo: 'variable', texto: 'fijar papelLimpio a verdadero' },
    { tipo: 'control', texto: 'si papelLimpio entonces' }, { tipo: 'salida', texto: 'mostrar icono ✓' },
    { tipo: 'control', texto: 'si no' }, { tipo: 'salida', texto: 'mostrar icono ?' },
  ] },
  { tecnologia: 'Tarjetas de algoritmo', explicacion: 'Sin dispositivos, las tarjetas permiten ordenar, ejecutar y revisar exactamente la misma decisión.', bloques: [
    { tipo: 'evento', texto: 'recibir un objeto' }, { tipo: 'sensor', texto: 'observar material y estado' },
    { tipo: 'control', texto: '¿es papel limpio?' }, { tipo: 'salida', texto: 'indicar categoría o pedir revisión' },
  ] },
];

export type UnidadSeptimo = {
  id: string; orden: number; titulo: string; proposito: string; previos: string; conceptos: string[];
  dificultad: string; tiempo: string; evidencia: string; metodologia: string; estado: 'piloto' | 'prevista';
};

export const unidadesSeptimo: UnidadSeptimo[] = [
  { id: 'pensamiento', orden: 1, titulo: 'Pensamiento computacional y algoritmos', proposito: 'Comprender problemas mediante descomposición, patrones, abstracción y secuencias verificables.', previos: 'Experiencias cotidianas de organización, clasificación y seguimiento de instrucciones.', conceptos: ['Descomposición', 'Patrón', 'Abstracción', 'Algoritmo'], dificultad: 'Comenzar a programar sin comprender primero el problema o conservar detalles que no afectan la solución.', tiempo: '3 a 4 clases', evidencia: 'Mapa del problema, reglas, algoritmo, pruebas y mejora explicada.', metodologia: 'Aprendizaje basado en problemas, indagación y coevaluación.', estado: 'piloto' },
  { id: 'programas', orden: 2, titulo: 'Programas, instrucciones y lenguajes', proposito: 'Reconocer que un programa expresa algoritmos mediante instrucciones que una tecnología puede ejecutar.', previos: 'Algoritmos cotidianos y secuencias.', conceptos: ['Programa', 'Instrucción', 'Lenguaje', 'Secuencia'], dificultad: 'Confundir el algoritmo con una aplicación o lenguaje particular.', tiempo: '2 clases', evidencia: 'Comparación de una solución en lenguaje natural, bloques y pseudocódigo.', metodologia: 'Ejemplos contrastados y ejecución literal.', estado: 'prevista' },
  { id: 'eps', orden: 3, titulo: 'Entrada, proceso y salida', proposito: 'Leer programas sencillos como transformaciones de datos y anticipar resultados.', previos: 'Programas, instrucciones y algoritmos.', conceptos: ['Entrada', 'Proceso', 'Salida', 'Dato'], dificultad: 'Confundir el dato recibido con la acción que lo transforma.', tiempo: '2 clases', evidencia: 'Tabla entrada-proceso-salida y predicciones verificadas.', metodologia: 'Exploración guiada y simulación.', estado: 'prevista' },
  { id: 'variables', orden: 4, titulo: 'Variables y datos', proposito: 'Comprender cómo un programa conserva y modifica información durante su ejecución.', previos: 'Datos, entradas y salidas.', conceptos: ['Variable', 'Valor', 'Asignación', 'Incremento'], dificultad: 'No inicializar una variable o confundir su nombre con su valor.', tiempo: '2 a 3 clases', evidencia: 'Programa visual y registro del cambio de variables.', metodologia: 'Modelado visual, predicción y experimentación.', estado: 'prevista' },
  { id: 'eventos', orden: 5, titulo: 'Eventos e interacción', proposito: 'Diseñar programas de bloques que respondan a acciones del usuario o del entorno.', previos: 'Secuencias y variables.', conceptos: ['Objeto', 'Evento', 'Mensaje', 'Estado'], dificultad: 'Mezclar las responsabilidades de objetos o asociar una respuesta al evento incorrecto.', tiempo: '2 a 3 clases', evidencia: 'Mapa de eventos, proyecto interactivo y pruebas.', metodologia: 'Diseño previo, programación por parejas y prototipado.', estado: 'prevista' },
  { id: 'control', orden: 6, titulo: 'Decisiones y repeticiones', proposito: 'Construir comportamientos con caminos alternativos y acciones que se repiten bajo control.', previos: 'Eventos, variables y comparaciones simples.', conceptos: ['Condición', 'Selección', 'Repetición', 'Contador'], dificultad: 'No anticipar todos los caminos o crear repeticiones sin finalización.', tiempo: '2 a 3 clases', evidencia: 'Proyecto con decisiones, repetición y casos de prueba.', metodologia: 'Desafíos graduados y programación por parejas.', estado: 'prevista' },
  { id: 'mejora', orden: 7, titulo: 'Probar, depurar y comunicar', proposito: 'Revisar soluciones mediante pruebas, documentar cambios y comunicar el proceso de mejora.', previos: 'Lectura y construcción de programas sencillos.', conceptos: ['Prueba', 'Error', 'Depuración', 'Documentación'], dificultad: 'Cambiar bloques al azar sin formular una hipótesis ni conservar evidencia.', tiempo: 'Trabajo transversal y 2 clases de cierre', evidencia: 'Bitácora, versiones del producto y presentación argumentada.', metodologia: 'Clínica de errores, portafolio y revisión entre pares.', estado: 'prevista' },
];

export const referenciaProgramaSeptimo = [
  'Énfasis del grado: alfabetización y ciudadanía digital, con uso crítico, seguro y responsable de tecnologías.',
  'Algoritmia, búsqueda, ordenamiento y estrategias de pensamiento computacional aplicadas al entorno.',
  'Programas sencillos en lenguajes por bloques, como Scratch, App Inventor o MakeCode.',
  'Planificación, abstracción, división en subtareas, pruebas, documentación, colaboración y mejora.',
];
