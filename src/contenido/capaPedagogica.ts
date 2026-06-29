export type Grado = '7mo' | '8vo' | '9no';

export type ConceptoApoyo = {
  termino: string;
  descripcion: string;
  ejemplo?: string;
  enlaceDocente?: string;
  imagen?: string;
  alt?: string;
};

export type PedagogiaTema = {
  procesos: string[];
  evidencia: string[];
  apoyos: { titulo: string; detalle: string }[];
  rubrica: string[];
  desafioExtendido: string;
};

export type TerminoCurricular = {
  canonico: string;
  variantes: string[];
  usoPrograma: string;
  grados: Grado[];
};

export type RutaEstudiante = 'leo' | 'exploro' | 'resuelvo' | 'compruebo';
export type PreferenciaTexto = 'normal' | 'grande';

export type PerfilCapsulaNivel = {
  complejidad: string;
  tecnologias: string[];
};

export const perfilesCapsulaPorGrado: Record<Grado, PerfilCapsulaNivel> = {
  '7mo': {
    complejidad: 'Reconocer conceptos, ordenar instrucciones y construir programas breves con apoyo visual.',
    tecnologias: ['Scratch', 'MakeCode', 'Programación por bloques'],
  },
  '8vo': {
    complejidad: 'Modelar entradas, procesos y salidas incorporando variables, decisiones y pruebas de casos.',
    tecnologias: ['micro:bit', 'MakeCode', 'JavaScript inicial'],
  },
  '9no': {
    complejidad: 'Diseñar, implementar y depurar soluciones textuales con mayor autonomía y reutilización.',
    tecnologias: ['PSeInt', 'JavaScript', 'Python'],
  },
};

export const conceptosApoyo: Record<string, ConceptoApoyo> = {
  algoritmo: {
    termino: 'Algoritmo',
    descripcion: 'Conjunto ordenado de pasos que permite resolver una situación o producir un resultado.',
    ejemplo: 'Para un escrutinio: iniciar contadores, registrar votos, comparar cantidades y comunicar el resultado.',
    enlaceDocente: 'https://pseint.sourceforge.net/',
    imagen: '/SolucionInicial.PNG',
    alt: 'Ejemplo visual de una primera solución programada',
  },
  booleanas: {
    termino: 'Expresiones booleanas',
    descripcion: 'Expresiones que solo pueden tomar dos valores: verdadero o falso. Son la base de muchas decisiones en un programa.',
    ejemplo: 'votosA > votosB se evalúa como verdadero o falso según el conteo.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Boolean_operations.svg?width=512',
    alt: 'Diagrama de operaciones booleanas',
  },
  booleana: {
    termino: 'Expresión booleana',
    descripcion: 'Pregunta lógica que un programa puede evaluar como verdadera o falsa.',
    ejemplo: 'botonA_presionado == verdadero permite decidir si se registra un voto.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Boolean_operations.svg?width=512',
    alt: 'Diagrama de operaciones booleanas',
  },
  hardware: {
    termino: 'Hardware',
    descripcion: 'Parte física de un sistema informático: computadora, placa, sensores, teclado, pantalla u otros dispositivos.',
    ejemplo: 'La micro:bit y sus botones son hardware que el programa puede leer como entrada.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Computer_system_bus.svg?width=512',
    alt: 'Esquema simplificado de componentes de hardware',
  },
  informatica: {
    termino: 'Informática',
    descripcion: 'Campo que estudia el tratamiento automático de la información mediante computadoras, programas y sistemas digitales.',
    ejemplo: 'Un simulador de votación procesa información para contar y comparar resultados.',
    enlaceDocente: 'https://contenidistas.github.io/sitio_principal_ciencias_de_la_computacion/index.html',
    imagen: '/logoedytic.jpg',
    alt: 'Logo EDyTIC',
  },
  instrucciones: {
    termino: 'Instrucciones',
    descripcion: 'Órdenes precisas que un programa ejecuta para realizar una tarea.',
    ejemplo: 'Fijar votosA en 0 y luego cambiar votosA por 1 son instrucciones del programa.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/LampFlowchart-es.svg?width=512',
    alt: 'Diagrama de flujo como ejemplo de instrucciones ordenadas',
  },
  instruccion: {
    termino: 'Instrucción',
    descripcion: 'Orden precisa que indica una acción dentro de un programa.',
    ejemplo: 'Mostrar "Empate" es una instrucción de salida.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/LampFlowchart-es.svg?width=512',
    alt: 'Diagrama de flujo como ejemplo de instrucción',
  },
  lenguajes: {
    termino: 'Lenguajes de programación',
    descripcion: 'Formas de escribir instrucciones para que una computadora pueda ejecutar una solución.',
    ejemplo: 'Scratch usa bloques; JavaScript y PSeInt usan texto estructurado.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Programming_language_textbooks.jpg?width=512',
    alt: 'Libros vinculados a lenguajes de programación',
  },
  logica: {
    termino: 'Lógica',
    descripcion: 'Forma de razonar con condiciones, comparaciones y valores verdadero o falso.',
    ejemplo: 'Si votosA y votosB son iguales, entonces el resultado debe ser empate.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Boolean_operations.svg?width=512',
    alt: 'Diagrama de operaciones lógicas',
  },
  makecode: {
    termino: 'MakeCode',
    descripcion: 'Entorno de programación por bloques usado para crear programas interactivos, especialmente con micro:bit.',
    ejemplo: 'Permite asociar el botón A de la micro:bit con el aumento de una variable.',
    enlaceDocente: 'https://microbit.org/teach/',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/BBC_micro_bit_(20794440656).jpg?width=512',
    alt: 'Placa micro:bit',
  },
  programa: {
    termino: 'Programa',
    descripcion: 'Conjunto de instrucciones organizadas para que una computadora realice una tarea.',
    ejemplo: 'El simulador de votación es un programa porque recibe acciones, cuenta votos y muestra resultados.',
    imagen: '/ProgramacionBotones.gif',
    alt: 'Ejemplo de programación con botones',
  },
  programas: {
    termino: 'Programas',
    descripcion: 'Conjuntos de instrucciones organizadas para resolver tareas o producir resultados.',
    ejemplo: 'Un juego, una calculadora y un contador de votos son programas.',
  },
  programacion: {
    termino: 'Programación',
    descripcion: 'Proceso de diseñar y escribir instrucciones para que una computadora resuelva una tarea.',
    ejemplo: 'Antes de escribir código, se decide qué datos entran, qué proceso ocurre y qué salida se espera.',
    imagen: '/primerasolucion.gif',
    alt: 'Animación de una solución inicial programada',
  },
  programar: {
    termino: 'Programar',
    descripcion: 'Pensar, ordenar y escribir instrucciones para que una computadora actúe ante una situación.',
    ejemplo: 'Programar no es solo copiar bloques: implica decidir qué debe pasar ante cada evento.',
  },
  scratch: {
    termino: 'Scratch',
    descripcion: 'Entorno de programación visual por bloques que permite crear historias, juegos y simulaciones.',
    ejemplo: 'Un objeto de Scratch puede aumentar votosA cuando recibe un clic.',
    enlaceDocente: 'https://scratch.mit.edu/educators/',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Scratchlogo.svg?width=512',
    alt: 'Logo de Scratch',
  },
  software: {
    termino: 'Software',
    descripcion: 'Conjunto de programas y datos que permiten que un dispositivo realice tareas.',
    ejemplo: 'El proyecto de Scratch o el script de JavaScript son software.',
    imagen: 'https://commons.wikimedia.org/wiki/Special:FilePath/Software_Code.jpg?width=512',
    alt: 'Código de software en pantalla',
  },
  variable: {
    termino: 'Variable',
    descripcion: 'Espacio con nombre donde un programa guarda un dato que puede cambiar.',
    ejemplo: 'votosA guarda cuántas personas eligieron la opción A.',
    imagen: '/DefinirVariables.gif',
    alt: 'Ejemplo visual de definición de variables',
  },
  variables: {
    termino: 'Variables',
    descripcion: 'Espacios con nombre donde un programa guarda datos que puede usar o modificar.',
    ejemplo: 'votosA y votosB permiten comparar el resultado de dos opciones.',
    imagen: '/DefinirVariables.gif',
    alt: 'Ejemplo visual de definición de variables',
  },
};
export const ayudaGenerica: ConceptoApoyo = {
  termino: 'Concepto vinculado',
  descripcion: 'Este enlace apunta a una explicación del recurso. En la vista estudiante se muestra como apoyo breve para no interrumpir la lectura.',
};
export const arquitecturaDua = [
  {
    principio: 'Múltiples formas de representación',
    detalle: 'Textos breves, imágenes, capturas, animaciones, audios y recursos eXeLearning para presentar el mismo concepto por más de una vía.',
  },
  {
    principio: 'Múltiples formas de acción y expresión',
    detalle: 'Desafíos interactivos, respuestas abiertas, opciones múltiples, proyectos guiados y evidencias descargables para que el aprendizaje pueda demostrarse de distintas maneras.',
  },
  {
    principio: 'Múltiples formas de implicación',
    detalle: 'Recorridos por grado, elección de temas, zona activa, progresión por proyecto y apoyos contextuales para sostener autonomía, propósito y participación.',
  },
];
export const rutasEstudiante: { id: RutaEstudiante; etiqueta: string; descripcion: string }[] = [
  { id: 'leo', etiqueta: 'Leo', descripcion: 'Comprendo la idea central y marco conceptos clave.' },
  { id: 'exploro', etiqueta: 'Exploro', descripcion: 'Observo ejemplos, imágenes, enlaces y relaciones con otros conceptos.' },
  { id: 'resuelvo', etiqueta: 'Resuelvo', descripcion: 'Paso del concepto a una actividad o desafío concreto.' },
  { id: 'compruebo', etiqueta: 'Compruebo', descripcion: 'Reviso evidencias, pruebas y autoevaluación.' },
];
export const dimensionesRubrica = [
  'Comprende el problema y reconoce entradas, procesos y salidas.',
  'Organiza instrucciones en una secuencia legible y justificable.',
  'Usa variables, condiciones o eventos de acuerdo con el nivel.',
  'Prueba casos, detecta errores y registra mejoras.',
  'Explica decisiones técnicas con vocabulario del tema.',
];
export const procesosPensamiento = [
  'Descomposición',
  'Reconocimiento de patrones',
  'Abstracción',
  'Diseño de algoritmos',
  'Prueba y depuración',
];
export const terminosCurriculares: TerminoCurricular[] = [
  {
    canonico: 'Programa',
    variantes: ['software', 'aplicación', 'proyecto', 'script'],
    usoPrograma: 'Conjunto organizado de instrucciones que resuelve una tarea o produce una salida verificable.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Instrucción',
    variantes: ['sentencia', 'comando', 'bloque'],
    usoPrograma: 'Orden precisa que ejecuta el programa; en bloques puede verse como pieza visual y en texto como línea o comando.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Algoritmo',
    variantes: ['secuencia de pasos', 'procedimiento', 'plan de solución'],
    usoPrograma: 'Secuencia finita y ordenada de pasos para resolver una situación antes o durante la programación.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Variable',
    variantes: ['dato almacenado', 'contador', 'memoria del programa'],
    usoPrograma: 'Estructura básica para guardar un dato que puede cambiar durante la ejecución.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Estructura secuencial',
    variantes: ['secuencia', 'programación lineal'],
    usoPrograma: 'Organización de instrucciones que se ejecutan en orden.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Estructura selectiva',
    variantes: ['condicional', 'sentencia condicional', 'decisión'],
    usoPrograma: 'Control del flujo que permite ejecutar instrucciones distintas según una condición.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Estructura iterativa',
    variantes: ['repetición', 'bucle', 'ciclo', 'sentencia iterativa'],
    usoPrograma: 'Control del flujo que permite repetir instrucciones una cantidad definida o mientras se cumple una condición.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Expresión lógica o booleana',
    variantes: ['condición', 'comparación', 'valor lógico'],
    usoPrograma: 'Expresión que se evalúa como verdadera o falsa y habilita decisiones programadas.',
    grados: ['8vo', '9no'],
  },
  {
    canonico: 'Evento',
    variantes: ['acción del usuario', 'clic', 'tecla', 'botón', 'sensor'],
    usoPrograma: 'Situación que inicia una secuencia de instrucciones en programas interactivos.',
    grados: ['7mo', '8vo'],
  },
  {
    canonico: 'Entrada, proceso y salida',
    variantes: ['modelo IPO', 'dato de entrada', 'transformación', 'resultado'],
    usoPrograma: 'Modelo para leer un programa como sistema que recibe datos, los transforma y comunica una salida.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Depuración',
    variantes: ['debugging', 'corrección de errores', 'pruebas'],
    usoPrograma: 'Proceso de comparar lo esperado con lo observado para localizar errores y mejorar una solución.',
    grados: ['7mo', '8vo', '9no'],
  },
  {
    canonico: 'Pseudocódigo',
    variantes: ['lenguaje natural estructurado', 'diseño textual previo'],
    usoPrograma: 'Forma de expresar un algoritmo sin depender todavía de la sintaxis estricta de un lenguaje.',
    grados: ['9no'],
  },
  {
    canonico: 'Lenguaje de programación textual',
    variantes: ['JavaScript', 'Python', 'PSeInt', 'código textual'],
    usoPrograma: 'Forma de escribir instrucciones usando texto, sintaxis y estructuras formales.',
    grados: ['8vo', '9no'],
  },
  {
    canonico: 'Función o procedimiento',
    variantes: ['subprograma', 'rutina', 'bloque reutilizable'],
    usoPrograma: 'Agrupación de instrucciones con nombre que organiza el programa y evita repetición.',
    grados: ['9no'],
  },
];
export const pedagogiaPorRecurso: Record<string, PedagogiaTema> = {
  'introduccion-programacion': {
    procesos: ['Descomposición', 'Diseño de algoritmos', 'Abstracción'],
    evidencia: [
      'Explico qué significa programar con un ejemplo cotidiano.',
      'Ordeno una tarea en pasos antes de pensar en código.',
      'Identifico qué parte de la situación puede transformarse en instrucciones.',
      'Comparo mi secuencia con la de otra persona y registro una mejora.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar el diagrama o captura de solución inicial para ver que programar implica ordenar pasos.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Transformar “organizar una votación” en acciones: iniciar, votar, contar, comparar y comunicar.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar primero qué debe pasar, luego cuándo pasa y finalmente qué dato cambia.' },
      { titulo: 'Desafío extendido', detalle: 'Reescribir una actividad cotidiana como algoritmo con al menos cinco pasos.' },
    ],
    rubrica: [
      'Distingue programar de usar una aplicación ya hecha.',
      'Ordena pasos de forma lógica y comprensible.',
      'Reconoce entradas, acciones y resultados esperados.',
      'Revisa una secuencia a partir de un caso de prueba.',
      'Explica decisiones usando vocabulario inicial de programación.',
    ],
    desafioExtendido: 'Elegir una rutina escolar y expresarla como algoritmo con inicio, pasos y salida verificable.',
  },
  'lenguajes-programacion': {
    procesos: ['Abstracción', 'Reconocimiento de patrones', 'Diseño de algoritmos'],
    evidencia: [
      'Comparo un lenguaje visual y uno textual.',
      'Identifico qué instrucciones se mantienen aunque cambie el lenguaje.',
      'Explico qué lenguaje elegiría para una actividad y por qué.',
      'Registro una ventaja y una limitación de cada forma de programar.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Comparar bloques de Scratch/MakeCode con una instrucción textual equivalente.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Mostrar cómo “aumentar votosA en 1” puede aparecer como bloque o como texto.' },
      { titulo: 'Pista gradual', detalle: 'Mirar primero la acción que realiza la instrucción, no la sintaxis.' },
      { titulo: 'Desafío extendido', detalle: 'Traducir tres instrucciones entre bloque, pseudocódigo y lenguaje natural.' },
    ],
    rubrica: [
      'Reconoce que distintos lenguajes pueden expresar una misma solución.',
      'Compara visual/textual sin reducirlo a facilidad o dificultad.',
      'Identifica instrucciones equivalentes entre representaciones.',
      'Selecciona un lenguaje según propósito y contexto.',
      'Justifica la elección con criterios técnicos simples.',
    ],
    desafioExtendido: 'Crear una tabla con la misma acción expresada en lenguaje natural, bloque y pseudocódigo.',
  },
  variables: {
    procesos: ['Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Defino qué dato debe guardar cada variable.',
      'Elijo nombres significativos para las variables.',
      'Registro cómo cambia el valor durante una ejecución.',
      'Pruebo si la variable se reinicia y se actualiza correctamente.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar la animación de definición de variables para observar nombre, valor y cambio.' },
      { titulo: 'Ejemplo resuelto', detalle: 'votosA empieza en 0 y aumenta cada vez que se vota la opción A.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar: ¿qué dato necesito recordar mientras el programa corre?' },
      { titulo: 'Desafío extendido', detalle: 'Agregar una variable totalVotos y comprobar que coincide con votosA + votosB.' },
    ],
    rubrica: [
      'Identifica datos que deben conservarse en memoria.',
      'Nombra variables de forma clara y relacionada con su función.',
      'Inicializa variables antes de usarlas.',
      'Actualiza valores en el evento o momento adecuado.',
      'Comprueba cambios de valor con pruebas simples.',
    ],
    desafioExtendido: 'Agregar una variable totalVotos y explicar cómo se actualiza.',
  },
  'estructuras-control': {
    procesos: ['Reconocimiento de patrones', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Reconozco una secuencia de instrucciones.',
      'Identifico una decisión condicional y su condición.',
      'Detecto una repetición y explico cuándo termina.',
      'Pruebo dos casos distintos para verificar caminos del programa.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar ejemplos de Scratch, MakeCode o Python para ver secuencia, decisión y repetición.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Si votosA > votosB se muestra A; si no, se revisan otros casos.' },
      { titulo: 'Pista gradual', detalle: 'Subrayar primero las palabras “si”, “mientras”, “repetir” o sus bloques equivalentes.' },
      { titulo: 'Desafío extendido', detalle: 'Agregar un caso de empate o una repetición de pruebas al algoritmo.' },
    ],
    rubrica: [
      'Distingue secuencia, condicional e iteración.',
      'Formula condiciones que pueden evaluarse como verdadero o falso.',
      'Reconoce el camino que sigue el programa en distintos casos.',
      'Evita repeticiones innecesarias cuando una estructura de control resuelve el problema.',
      'Prueba casos límite como empate, cero votos o valores iguales.',
    ],
    desafioExtendido: 'Diseñar tres casos de prueba para verificar todos los caminos de una decisión.',
  },
  'introduccion-javascript': {
    procesos: ['Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Identifico variables, operadores, entradas y salidas en un fragmento de JavaScript.',
      'Escribo una condición simple con operador relacional.',
      'Anticipo qué salida producirá un caso de prueba.',
      'Registro un error de sintaxis o lógica y cómo lo corregí.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar capturas de prompt, alert, variables y ciclos como puente hacia el código textual.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Leer dos votos, comparar valores y mostrar el resultado con una salida.' },
      { titulo: 'Pista gradual', detalle: 'Separar primero datos, operaciones y salida antes de escribir sintaxis.' },
      { titulo: 'Desafío extendido', detalle: 'Agregar validación para evitar valores negativos o entradas vacías.' },
    ],
    rubrica: [
      'Reconoce estructura básica de una instrucción textual.',
      'Usa variables y operadores de acuerdo con el dato trabajado.',
      'Escribe condiciones legibles y verificables.',
      'Interpreta mensajes de error o resultados inesperados.',
      'Explica el código sin limitarse a leerlo línea por línea.',
    ],
    desafioExtendido: 'Agregar una validación de entrada y explicar qué error evita.',
  },
  'funciones-javascript': {
    procesos: ['Descomposición', 'Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Identifico una tarea repetida que puede convertirse en función.',
      'Defino nombre, parámetros y resultado esperado.',
      'Invoco la función con al menos dos casos distintos.',
      'Registro cómo mejora la organización del programa.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Representar la función como una caja que recibe datos y devuelve o muestra un resultado.' },
      { titulo: 'Ejemplo resuelto', detalle: 'crear mostrarGanador(votosA, votosB) para reutilizar la comparación.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar qué parte del programa se repite o merece nombre propio.' },
      { titulo: 'Desafío extendido', detalle: 'Separar registro de votos y cálculo de resultado en funciones distintas.' },
    ],
    rubrica: [
      'Descompone el programa en tareas con sentido.',
      'Nombra funciones según la acción que realizan.',
      'Usa parámetros coherentes con los datos requeridos.',
      'Prueba la función con distintos argumentos.',
      'Explica cómo la función reduce repetición o mejora legibilidad.',
    ],
    desafioExtendido: 'Convertir la comparación de resultados en una función reutilizable.',
  },
  'recurso-javascript': {
    procesos: ['Reconocimiento de patrones', 'Prueba y depuración', 'Diseño de algoritmos'],
    evidencia: [
      'Selecciono un ejemplo y explico qué problema resuelve.',
      'Identifico qué parte puedo reutilizar en otro programa.',
      'Modifico una variable, condición o salida y registro el efecto.',
      'Comparo el resultado esperado con el observado.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar las capturas y GIF como banco de consulta mientras se modifica código.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Tomar un ciclo o una salida y adaptarla a un problema de conteo.' },
      { titulo: 'Pista gradual', detalle: 'Cambiar una sola cosa por vez y probar antes de continuar.' },
      { titulo: 'Desafío extendido', detalle: 'Combinar entrada, condición y salida en un mini programa propio.' },
    ],
    rubrica: [
      'Interpreta ejemplos antes de copiarlos.',
      'Reconoce patrones reutilizables en fragmentos de código.',
      'Adapta ejemplos respetando el propósito del programa.',
      'Prueba cambios de forma incremental.',
      'Documenta qué modificó y por qué.',
    ],
    desafioExtendido: 'Adaptar un ejemplo existente para resolver una nueva consigna breve.',
  },
  'pensamiento-computacional': {
    procesos: ['Descomposición', 'Reconocimiento de patrones', 'Abstracción', 'Diseño de algoritmos'],
    evidencia: [
      'Descompongo el problema en partes.',
      'Identifico patrones o acciones que se repiten.',
      'Selecciono datos relevantes y descarto detalles accesorios.',
      'Propongo una secuencia de pasos verificable.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar un mapa del problema con partes, datos y relaciones.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Separar una votación en registrar votos, contar, comparar y comunicar.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar: ¿qué partes tiene?, ¿qué se repite?, ¿qué dato importa?' },
      { titulo: 'Desafío extendido', detalle: 'Aplicar el mismo análisis a una situación no tecnológica.' },
    ],
    rubrica: [
      'Divide el problema en partes manejables.',
      'Reconoce similitudes o repeticiones útiles.',
      'Elige datos relevantes para la solución.',
      'Ordena pasos antes de codificar.',
      'Justifica por qué su plan puede comprobarse.',
    ],
    desafioExtendido: 'Crear un mapa del problema antes de programar una solución.',
  },
  'algoritmos-pseudocodigo': {
    procesos: ['Diseño de algoritmos', 'Abstracción', 'Prueba y depuración'],
    evidencia: [
      'Escribo pasos ordenados en lenguaje natural o pseudocódigo.',
      'Identifico entradas, proceso y salida.',
      'Uso nombres de variables legibles.',
      'Pruebo el algoritmo con datos concretos.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar una tabla entrada-proceso-salida antes del pseudocódigo.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Definir votosA, votosB; comparar; escribir ganador o empate.' },
      { titulo: 'Pista gradual', detalle: 'Escribir primero en lenguaje común y luego ajustar a pseudocódigo.' },
      { titulo: 'Desafío extendido', detalle: 'Agregar validación o repetición para varios votos.' },
    ],
    rubrica: [
      'Ordena pasos de forma finita y clara.',
      'Declara o menciona datos necesarios.',
      'Evita ambigüedades en decisiones y salidas.',
      'Prueba el algoritmo con casos distintos.',
      'Mejora legibilidad a partir de revisión.',
    ],
    desafioExtendido: 'Probar el pseudocódigo con tres casos: gana A, gana B y empate.',
  },
  'datos-tipos-operadores': {
    procesos: ['Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Clasifico datos según tipo: número, texto o booleano.',
      'Identifico operadores aritméticos, relacionales o lógicos.',
      'Anticipo el resultado de una expresión.',
      'Corrijo una expresión que no produce el resultado esperado.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar tablas de expresiones para separar dato, operador y resultado.' },
      { titulo: 'Ejemplo resuelto', detalle: 'votosA > votosB produce un valor booleano.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar qué tipo de dato entra y qué tipo de resultado sale.' },
      { titulo: 'Desafío extendido', detalle: 'Crear cinco expresiones y clasificar su resultado.' },
    ],
    rubrica: [
      'Reconoce tipos de datos en situaciones concretas.',
      'Selecciona operadores coherentes con el tipo de dato.',
      'Predice resultados de expresiones simples.',
      'Combina comparaciones en condiciones legibles.',
      'Detecta errores por tipo u operador incorrecto.',
    ],
    desafioExtendido: 'Diseñar una tabla con expresiones, tipo de resultado y caso de prueba.',
  },
  'entrada-proceso-salida': {
    procesos: ['Descomposición', 'Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Identifico entradas del sistema.',
      'Describo el proceso que transforma datos.',
      'Defino la salida esperada.',
      'Compruebo si la salida coincide con el caso probado.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar un cuadro IPO: entrada, proceso, salida.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Botón A entra; votosA aumenta; pantalla o variable muestra el nuevo conteo.' },
      { titulo: 'Pista gradual', detalle: 'Si no sé qué proceso escribir, empiezo por la salida que deseo obtener.' },
      { titulo: 'Desafío extendido', detalle: 'Agregar una validación entre entrada y proceso.' },
    ],
    rubrica: [
      'Distingue entrada, proceso y salida en el programa.',
      'Relaciona cada entrada con una acción programada.',
      'Explica cómo se transforma el dato.',
      'Define una salida observable o verificable.',
      'Usa casos de prueba para comprobar el modelo.',
    ],
    desafioExtendido: 'Crear un cuadro IPO para una calculadora, juego o votación.',
  },
  'eventos-interaccion': {
    procesos: ['Descomposición', 'Reconocimiento de patrones', 'Diseño de algoritmos'],
    evidencia: [
      'Identifico eventos que inician acciones.',
      'Relaciono cada evento con una respuesta del programa.',
      'Reconozco qué variable o salida cambia.',
      'Dibujo un mapa evento-respuesta.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar flechas desde clics, botones o sensores hacia respuestas del programa.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Al hacer clic en Opción A, el programa incrementa votosA.' },
      { titulo: 'Pista gradual', detalle: 'Preguntar: ¿qué acción externa despierta esta parte del programa?' },
      { titulo: 'Desafío extendido', detalle: 'Agregar un evento de reinicio o consulta de resultado.' },
    ],
    rubrica: [
      'Reconoce eventos de usuario o entorno.',
      'Asocia eventos con instrucciones correctas.',
      'Evita mezclar registro, consulta y reinicio sin propósito.',
      'Explica interacción entre usuario y programa.',
      'Prueba cada evento de manera separada.',
    ],
    desafioExtendido: 'Diseñar un mapa con al menos tres eventos y sus respuestas.',
  },
  'depuracion-pruebas': {
    procesos: ['Prueba y depuración', 'Diseño de algoritmos', 'Abstracción'],
    evidencia: [
      'Defino casos de prueba antes de corregir.',
      'Anticipo la salida esperada.',
      'Comparo lo esperado con lo observado.',
      'Registro causa probable y ajuste realizado.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar una tabla con caso, esperado, observado y mejora.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Probar empate, gana A, gana B y cero votos.' },
      { titulo: 'Pista gradual', detalle: 'Cambiar una condición por vez y volver a probar.' },
      { titulo: 'Desafío extendido', detalle: 'Crear una bitácora de errores encontrados y soluciones.' },
    ],
    rubrica: [
      'Diseña casos de prueba significativos.',
      'Registra resultados observados sin borrar evidencia.',
      'Distingue error de sintaxis, lógica o diseño.',
      'Corrige de forma incremental.',
      'Explica qué aprendió del error.',
    ],
    desafioExtendido: 'Crear una bitácora con tres pruebas y una mejora documentada.',
  },
  'listas-arreglos': {
    procesos: ['Abstracción', 'Reconocimiento de patrones', 'Diseño de algoritmos'],
    evidencia: [
      'Reconozco cuándo varios datos pertenecen a una colección.',
      'Represento posiciones o índices de una lista.',
      'Propongo un recorrido para procesar elementos.',
      'Comparo una solución con muchas variables y otra con lista.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Dibujar una fila de casilleros con índice y valor.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Guardar puntajes o votos en una lista para recorrerlos luego.' },
      { titulo: 'Pista gradual', detalle: 'Si aparecen muchos datos similares, pensar en colección.' },
      { titulo: 'Desafío extendido', detalle: 'Calcular máximo, mínimo o total recorriendo una lista.' },
    ],
    rubrica: [
      'Identifica datos relacionados que forman colección.',
      'Comprende posición o índice de elementos.',
      'Describe un recorrido de la lista.',
      'Elige lista cuando escala mejor que variables separadas.',
      'Prueba el recorrido con pocos datos primero.',
    ],
    desafioExtendido: 'Representar una lista de votos y recorrerla para contar resultados.',
  },
  'proyecto-integrador-programacion': {
    procesos: ['Descomposición', 'Abstracción', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Defino problema, usuarios y salida esperada.',
      'Diseño una solución antes de implementarla.',
      'Construyo un prototipo y registro decisiones.',
      'Presento pruebas, mejoras y explicación final.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar una bitácora de proyecto con fases y evidencias.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Proyecto de votación con registro, comparación, prueba y presentación.' },
      { titulo: 'Pista gradual', detalle: 'Separar diseño, construcción, prueba y comunicación.' },
      { titulo: 'Desafío extendido', detalle: 'Agregar una mejora elegida por el equipo y justificarla.' },
    ],
    rubrica: [
      'Define problema y alcance de forma realista.',
      'Organiza tareas y decisiones del proyecto.',
      'Integra conceptos trabajados en la secuencia.',
      'Prueba y mejora el prototipo con evidencia.',
      'Comunica proceso, decisiones y resultado.',
    ],
    desafioExtendido: 'Presentar una mejora propia y justificarla con pruebas.',
  },
  'modulo-programacion-estudiantes': {
    procesos: ['Descomposición', 'Diseño de algoritmos', 'Prueba y depuración'],
    evidencia: [
      'Selecciono una actividad del módulo y explico su objetivo.',
      'Registro pasos, variables o estructuras usadas.',
      'Completo el desafío y documento una prueba.',
      'Explico una mejora posible para mi solución.',
    ],
    apoyos: [
      { titulo: 'Apoyo visual', detalle: 'Usar los audios, actividades y ejemplos del módulo como apoyos alternativos.' },
      { titulo: 'Ejemplo resuelto', detalle: 'Resolver un desafío breve y registrar proceso antes de pasar al siguiente.' },
      { titulo: 'Pista gradual', detalle: 'Leer consigna, escuchar audio, mirar apoyo visual y recién después resolver.' },
      { titulo: 'Desafío extendido', detalle: 'Adaptar una actividad del módulo a un contexto elegido por el grupo.' },
    ],
    rubrica: [
      'Comprende consigna y propósito de la actividad.',
      'Usa apoyos disponibles de manera autónoma.',
      'Registra proceso y evidencia, no solo resultado.',
      'Prueba la solución y realiza ajustes.',
      'Explica el aprendizaje logrado en la actividad.',
    ],
    desafioExtendido: 'Adaptar un desafío del módulo a una nueva situación del aula.',
  },
};


