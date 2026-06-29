import type { Ejercicio } from '@/componentes/ZonaActiva';
import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';
import { crearPromptTutorActividad } from '@/contenido/constructorUnidadAlgoritmos';
import type { ActividadConstructor } from '@/contenido/constructorUnidadAlgoritmos';

const tecnologiaPrincipal = (capsula: CapsulaNoveno) => capsula.tecnologias[0] ?? 'la tecnología seleccionada';
const gradoId = (capsula: CapsulaNoveno): '7mo' | '8vo' | '9no' => capsula.id.startsWith('7-') ? '7mo' : capsula.id.startsWith('8-') ? '8vo' : '9no';

export const generarActividadesCapsula = (capsula: CapsulaNoveno): ActividadConstructor[] => {
  const tecnologia = tecnologiaPrincipal(capsula);
  const actividades: ActividadConstructor[] = [
    {
      id: `${capsula.id}-diagnostico`, etapa: 'Activación y diagnóstico', titulo: `Lo que ya pensamos sobre ${capsula.concepto}`,
      proposito: `Recuperar ideas previas y reconocer interpretaciones iniciales sobre ${capsula.concepto}.`, duracion: 30,
      consigna: `Responde la pregunta guía “${capsula.preguntaGuia}”. Representa tu primera explicación con palabras, un dibujo, bloques o un esquema y señala qué parte todavía te genera dudas.`,
      proceso: ['Responder individualmente sin consultar la definición.', 'Comparar dos explicaciones e identificar coincidencias y diferencias.', 'Clasificar las ideas en datos, acciones, decisiones y resultados.', 'Escribir una pregunta que oriente la exploración.'],
      evidencia: `Explicación inicial sobre ${capsula.concepto} y pregunta de investigación.`,
      preguntasRetroalimentacion: ['¿Qué evidencia sostiene tu explicación inicial?', '¿Qué parte de la situación todavía no puedes anticipar?', '¿Qué diferencia encontraste entre las explicaciones?'],
      alternativas: {
        computadoras: 'Registrar ideas en un documento o pizarra digital y compararlas sin buscar todavía una solución terminada.',
        microbit: 'Observar una placa, simulador o sistema relacionado e identificar qué se conoce y qué se necesita investigar.',
        sin_conexion: 'Usar una plantilla local con la pregunta guía, el esquema y el espacio de dudas.',
        sin_dispositivos: 'Trabajar con tarjetas, dibujos y una puesta en común breve.',
      },
      apoyos: ['Usa las preguntas: qué recibe, qué hace y qué produce.', `Relee estas ideas clave: ${capsula.teoria.ideasClave.slice(0, 2).join(' / ')}`],
      varianteExtendida: 'Formula una explicación alternativa y diseña una observación que permita compararlas.',
    },
    {
      id: `${capsula.id}-exploracion`, etapa: 'Exploración guiada', titulo: `Comparar ejemplos de ${capsula.concepto}`,
      proposito: 'Reconocer la lógica común entre ejemplos y construir el concepto a partir de comparaciones.', duracion: 40,
      consigna: `Compara los ejemplos disponibles en ${capsula.tecnologias.join(', ')}. Identifica qué cambia en la representación y qué permanece en la lógica de ${capsula.concepto}.`,
      proceso: ['Anticipar qué hará cada ejemplo antes de ejecutarlo.', 'Marcar entradas, procesos, decisiones y salidas.', 'Probar o simular al menos dos casos.', 'Construir una conclusión usando evidencias de la comparación.'],
      evidencia: 'Tabla comparativa con predicciones, resultados y conclusión conceptual.',
      preguntasRetroalimentacion: ['¿Qué parte cumple la misma función en ambos ejemplos?', '¿Qué caso permite comprobar mejor la regla?', '¿Qué cambió en la representación sin cambiar la lógica?'],
      alternativas: {
        computadoras: `Comparar los ejemplos en ${tecnologia} y otra representación disponible, usando ventanas o capturas lado a lado.`,
        microbit: 'Comparar el comportamiento del simulador con la placa o con una ejecución representada mediante bloques.',
        sin_conexion: 'Usar proyectos descargados, capturas o fragmentos impresos de los ejemplos.',
        sin_dispositivos: 'Ejecutar los ejemplos mediante tarjetas y asumir roles de entrada, proceso y salida.',
      },
      apoyos: ['Usa un color para cada función: entrada, proceso, decisión y salida.', 'Comienza comparando un único caso en ambas representaciones.'],
      varianteExtendida: 'Diseña un caso que produzca resultados diferentes si una regla se interpreta incorrectamente.',
    },
    {
      id: `${capsula.id}-produccion`, etapa: 'Producción y resolución', titulo: capsula.practica.titulo,
      proposito: capsula.sintesis, duracion: 60, consigna: capsula.practica.consigna,
      proceso: capsula.practica.pasos, evidencia: capsula.practica.evidencia,
      preguntasRetroalimentacion: [`¿Cómo se relaciona tu solución con ${capsula.concepto}?`, '¿Qué resultado esperas antes de probar?', '¿Qué evidencia justificaría una mejora?'],
      alternativas: {
        computadoras: `Resolver con ${tecnologia}, registrar pruebas y conservar al menos dos versiones.`,
        microbit: 'Usar placa o simulador cuando sea pertinente; si no lo es, representar entradas y salidas mediante botones e iconos.',
        sin_conexion: 'Utilizar el entorno instalado o archivos descargados y completar una bitácora local.',
        sin_dispositivos: 'Construir el algoritmo, modelo o prototipo con tarjetas y realizar una simulación literal.',
      },
      apoyos: capsula.practica.apoyos,
      varianteExtendida: `Amplía la solución con un caso adicional, documenta la decisión y analiza una implicancia ética o de accesibilidad.`,
    },
    {
      id: `${capsula.id}-transferencia`, etapa: 'Transferencia y reflexión', titulo: `Probar, retroalimentar y transferir ${capsula.concepto}`,
      proposito: 'Revisar una producción con evidencias, ofrecer retroalimentación y aplicar la estrategia en una situación nueva.', duracion: 40,
      consigna: `Intercambia la producción, prueba un caso habitual, uno límite y uno inesperado. Devuelve una fortaleza, una pregunta y una sugerencia basada en evidencia. Luego adapta la solución a otro contexto.`,
      proceso: ['Comprender el propósito sin modificar la producción.', 'Diseñar y registrar tres pruebas diferentes.', 'Ofrecer retroalimentación centrada en criterios.', 'Crear una nueva versión y explicar qué se transfirió.'],
      evidencia: 'Registro de coevaluación, nueva versión y reflexión sobre el cambio realizado.',
      preguntasRetroalimentacion: ['¿Qué evidencia respalda tu devolución?', '¿Qué conviene conservar y por qué?', '¿Qué parte de la estrategia funciona también en el nuevo contexto?'],
      alternativas: {
        computadoras: 'Intercambiar archivos o enlaces, comentar con criterios y conservar historial de versiones.',
        microbit: 'Intercambiar programas o protocolos de prueba y variar deliberadamente las condiciones.',
        sin_conexion: 'Compartir archivos localmente y registrar la devolución en una plantilla.',
        sin_dispositivos: 'Realizar una galería, simulación manual y devolución mediante notas estructuradas.',
      },
      apoyos: ['Usa la fórmula: observo…, me pregunto…, sugiero probar…', 'Elige casos que recorran caminos realmente diferentes.'],
      varianteExtendida: 'Compara las dos versiones y argumenta cuál responde mejor al propósito y a los criterios.',
    },
  ];

  return actividades.map((actividad) => ({
    ...actividad,
    promptTutor: crearPromptTutorActividad(actividad, capsula.gradoTexto ?? '9.º año', capsula.titulo),
  }));
};

export const generarEvaluacionCapsula = (capsula: CapsulaNoveno) => ({
  observacion: [
    `Explica ${capsula.concepto} usando el ejemplo y no solo una definición memorizada.`,
    'Anticipa resultados antes de ejecutar o simular.',
    'Registra casos, resultados esperados y resultados obtenidos.',
    'Utiliza evidencia para revisar una decisión.',
    'Comunica el proceso y considera retroalimentación.',
  ],
  autoevaluacion: [
    `Puedo explicar ${capsula.concepto} con mis palabras.`,
    'Puedo justificar una decisión de mi solución.',
    'Probé casos diferentes y registré resultados.',
    'Realicé una mejora a partir de evidencia.',
  ],
  coevaluacion: ['Una decisión que comprendí fue…', 'Una prueba que ayudaría a revisar es…', 'Una evidencia de mejora es…'],
  ticketSalida: [`¿Qué comprendiste hoy sobre ${capsula.concepto}?`, '¿Qué error o resultado inesperado te ayudó?', '¿Cuál será tu siguiente prueba?'],
  bitacora: ['Caso o entrada', 'Resultado esperado', 'Resultado obtenido', 'Hipótesis', 'Cambio', 'Nueva evidencia'],
  devoluciones: [
    `La idea de ${capsula.concepto} aparece en tu solución. Explica ahora qué evidencia muestra que funciona.`,
    'Probaste el caso habitual. Agrega uno límite que obligue a revisar la regla.',
    'Antes de cambiar la solución, registra una hipótesis sobre la diferencia observada.',
  ],
  rubricaOpcional: ['Comprensión conceptual', 'Diseño de la solución', 'Pruebas y mejora', 'Explicación del proceso'],
});

const zonasReforzadas: Record<string, Ejercicio[]> = {
  '7-pensamiento': [
    { id: '7-pensamiento-relacionar', grado: '7mo', tipo: 'relacionar', categoria: 'Relacionar', enunciado: 'Relaciona cada estrategia de pensamiento computacional con la acción que mejor la representa.', pares: [{ izquierda: 'Descomposición', derecha: 'Separar el problema en partes' }, { izquierda: 'Patrones', derecha: 'Reconocer semejanzas entre casos' }, { izquierda: 'Abstracción', derecha: 'Conservar la información relevante' }, { izquierda: 'Algoritmo', derecha: 'Ordenar pasos verificables' }], opcionesDerecha: ['Ordenar pasos verificables', 'Conservar la información relevante', 'Separar el problema en partes', 'Reconocer semejanzas entre casos'], feedback: 'Cada estrategia cumple una función diferente, pero juntas ayudan a comprender y resolver el problema.', pistas: ['Piensa qué palabra se relaciona con “partes”.', 'Abstraer no significa agregar detalles, sino elegir los necesarios.'] },
    { id: '7-pensamiento-ordenar', grado: '7mo', tipo: 'ordenar', categoria: 'Ordenar', enunciado: 'Ordena una posible secuencia para resolver un problema antes de programar.', elementos: ['Probar y mejorar la solución', 'Diseñar una secuencia de pasos', 'Comprender la situación', 'Separar el problema en partes'], ordenCorrecto: ['Comprender la situación', 'Separar el problema en partes', 'Diseñar una secuencia de pasos', 'Probar y mejorar la solución'], feedback: 'Primero se comprende y descompone; después se diseña, prueba y mejora.', pistas: ['No se puede probar una solución que todavía no fue diseñada.', 'Comprender la situación debe ocurrir antes de dividirla.'] },
    { id: '7-pensamiento-completar', grado: '7mo', tipo: 'completar', categoria: 'Completar', enunciado: 'Completa el concepto que falta.', plantilla: 'Elegir únicamente los datos necesarios para resolver se llama [HUECO].', respuestas: ['abstracción', 'abstraccion'], feedback: 'La abstracción permite enfocar el modelo en la información relevante.', pistas: ['No es descomponer: aquí se trata de decidir qué información conservar.', 'Comienza con “a”.'] },
    { id: '7-pensamiento-verdadero', grado: '7mo', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación verdadera.', opciones: ['Un algoritmo puede probarse antes de programarlo.', 'Un patrón es un error que debe ocultarse.', 'Descomponer significa resolver todo al mismo tiempo.'], correcta: 0, feedback: 'Los algoritmos pueden simularse con tarjetas, dibujos o acciones antes de usar un lenguaje.', pistas: ['Piensa en las actividades sin dispositivos.', 'Una prueba no necesita siempre una computadora.'] },
    { id: '7-pensamiento-falso', grado: '7mo', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación falsa.', opciones: ['Los patrones ayudan a reutilizar ideas.', 'La abstracción conserva todos los detalles posibles.', 'La descomposición separa partes manejables.'], correcta: 1, feedback: 'La abstracción selecciona lo relevante; no intenta conservar todos los detalles.', pistas: ['Busca la afirmación que confunde seleccionar con acumular.', 'Más detalles no siempre producen un mejor modelo.'] },
  ],
  '8-sistemas': [
    { id: '8-sistemas-relacionar', grado: '8vo', tipo: 'relacionar', categoria: 'Relacionar', enunciado: 'Relaciona cada componente de un sistema interactivo con su función.', pares: [{ izquierda: 'Sensor', derecha: 'Obtiene datos del entorno' }, { izquierda: 'Variable', derecha: 'Guarda una medición o estado' }, { izquierda: 'Condición', derecha: 'Compara y decide una respuesta' }, { izquierda: 'Actuador', derecha: 'Produce un efecto en el entorno' }], opcionesDerecha: ['Produce un efecto en el entorno', 'Compara y decide una respuesta', 'Obtiene datos del entorno', 'Guarda una medición o estado'], feedback: 'El flujo completo conecta percepción, almacenamiento, decisión y acción.', pistas: ['El sensor percibe; el actuador actúa.', 'La condición utiliza datos que pueden estar guardados.'] },
    { id: '8-sistemas-ordenar', grado: '8vo', tipo: 'ordenar', categoria: 'Ordenar', enunciado: 'Ordena el funcionamiento de un sistema automático sencillo.', elementos: ['Activar una salida', 'Comparar con el umbral', 'Leer el sensor', 'Guardar la medición'], ordenCorrecto: ['Leer el sensor', 'Guardar la medición', 'Comparar con el umbral', 'Activar una salida'], feedback: 'El sistema primero obtiene y conserva el dato; después decide y actúa.', pistas: ['No se puede comparar una medición que todavía no se obtuvo.', 'La salida aparece después de la decisión.'] },
    { id: '8-sistemas-completar', grado: '8vo', tipo: 'completar', categoria: 'Completar', enunciado: 'Completa el componente que falta.', plantilla: 'El elemento que produce luz, sonido o movimiento se denomina [HUECO].', respuestas: ['actuador', 'un actuador'], feedback: 'Un actuador transforma una instrucción en un efecto perceptible o físico.', pistas: ['No recoge datos: produce una acción.', 'Comienza con “act”.'] },
    { id: '8-sistemas-verdadero', grado: '8vo', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación verdadera.', opciones: ['Un umbral sirve como referencia para tomar una decisión.', 'El sensor decide por sí solo qué debe hacer el sistema.', 'Un actuador siempre almacena los datos.'], correcta: 0, feedback: 'El programa compara una medición con el umbral; el sensor solamente aporta el dato.', pistas: ['Distingue medir de decidir.', 'Busca la afirmación relacionada con comparar valores.'] },
    { id: '8-sistemas-falso', grado: '8vo', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación falsa.', opciones: ['La placa puede procesar datos de sensores.', 'Un simulador permite probar sin placa física.', 'El sensor ejecuta todas las decisiones sin programa.'], correcta: 2, feedback: 'El sensor mide; las decisiones se expresan en el programa que ejecuta la placa.', pistas: ['Busca la opción que atribuye al sensor una función que no tiene.', 'Medir no es lo mismo que decidir.'] },
  ],
  '9-algoritmos': [
    { id: '9-algoritmos-relacionar', grado: '9no', tipo: 'relacionar', categoria: 'Relacionar', enunciado: 'Relaciona cada elemento del algoritmo con su función.', pares: [{ izquierda: 'Entrada', derecha: 'Información necesaria para comenzar' }, { izquierda: 'Proceso', derecha: 'Acciones que transforman los datos' }, { izquierda: 'Decisión', derecha: 'Selecciona un camino según una condición' }, { izquierda: 'Salida', derecha: 'Resultado que permite verificar' }], opcionesDerecha: ['Resultado que permite verificar', 'Acciones que transforman los datos', 'Información necesaria para comenzar', 'Selecciona un camino según una condición'], feedback: 'Un algoritmo verificable articula entradas, procesos, decisiones y salidas.', pistas: ['La salida permite comprobar el propósito.', 'Una decisión necesita una condición.'] },
    { id: '9-algoritmos-ordenar', grado: '9no', tipo: 'ordenar', categoria: 'Ordenar', enunciado: 'Ordena un proceso razonable de desarrollo.', elementos: ['Implementar en un lenguaje', 'Probar casos y depurar', 'Comprender requisitos', 'Diseñar el algoritmo'], ordenCorrecto: ['Comprender requisitos', 'Diseñar el algoritmo', 'Implementar en un lenguaje', 'Probar casos y depurar'], feedback: 'El diseño precede a la implementación y las pruebas contrastan la solución con los requisitos.', pistas: ['No conviene codificar antes de comprender.', 'La depuración necesita una implementación o modelo probado.'] },
    { id: '9-algoritmos-completar', grado: '9no', tipo: 'completar', categoria: 'Completar', enunciado: 'Completa el concepto que falta.', plantilla: 'Una secuencia finita, ordenada y no ambigua se denomina [HUECO].', respuestas: ['algoritmo', 'un algoritmo'], feedback: 'La finitud, el orden y la precisión son propiedades esenciales de un algoritmo.', pistas: ['Es una solución expresada en pasos.', 'Comienza con “algo”.'] },
    { id: '9-algoritmos-verdadero', grado: '9no', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación verdadera.', opciones: ['La lógica de un algoritmo puede representarse en distintos lenguajes.', 'Un algoritmo solo existe cuando está escrito en JavaScript.', 'Probar manualmente no aporta información.'], correcta: 0, feedback: 'La lógica puede expresarse con lenguaje natural, diagramas, pseudocódigo o código.', pistas: ['Distingue la solución lógica de su representación.', 'Un lenguaje es una forma de expresar el algoritmo.'] },
    { id: '9-algoritmos-falso', grado: '9no', tipo: 'opcion_multiple', categoria: 'Verdadero o falso', enunciado: 'Selecciona la afirmación falsa.', opciones: ['Los casos de prueba ayudan a detectar omisiones.', 'Conviene comprender el problema después de terminar el código.', 'El pseudocódigo permite revisar decisiones antes de implementar.'], correcta: 1, feedback: 'La comprensión del problema y sus requisitos debe orientar el diseño y la implementación.', pistas: ['Busca la afirmación que invierte el orden del proceso.', 'Los requisitos no se dejan para el final.'] },
  ],
};

export const generarEjerciciosCapsula = (capsula: CapsulaNoveno): Ejercicio[] => {
  if (zonasReforzadas[capsula.id]) return zonasReforzadas[capsula.id];
  const grado = gradoId(capsula);
  return [
    { id: `${capsula.id}-zona-reconocer`, grado, temaId: capsula.id, tipo: 'opcion_multiple', categoria: 'Reconocer', enunciado: `¿Cuál descripción representa mejor ${capsula.concepto}?`, opciones: [capsula.teoria.definicion, 'Es únicamente el nombre de una aplicación.', 'Es un elemento decorativo que no modifica la solución.'], correcta: 0, feedback: `La definición se reconoce porque explica la función de ${capsula.concepto} dentro de una solución.`, pistas: ['Busca la opción que explica para qué sirve.', `Recuerda el ejemplo: ${capsula.teoria.ejemplo}`] },
    { id: `${capsula.id}-zona-ordenar`, grado, temaId: capsula.id, tipo: 'opcion_multiple', categoria: 'Ordenar', enunciado: '¿Qué orden representa mejor un proceso de resolución y mejora?', opciones: ['Comprender → representar → probar → mejorar', 'Mejorar → entregar → comprender → probar', 'Programar → borrar → adivinar → entregar'], correcta: 0, feedback: 'Primero se comprende y representa la situación; luego se prueba y se mejora con evidencia.', pistas: ['La prueba necesita una solución previa.', 'La mejora ocurre después de comparar resultados.'] },
    { id: `${capsula.id}-zona-anticipar`, grado, temaId: capsula.id, tipo: 'opcion_multiple', categoria: 'Anticipar', enunciado: `Antes de ejecutar una solución sobre ${capsula.concepto}, ¿qué acción ayuda más a anticipar su comportamiento?`, opciones: ['Definir una entrada y el resultado esperado', 'Cambiar varias partes al azar', 'Mirar solamente el aspecto visual'], correcta: 0, feedback: 'Una entrada concreta y un resultado esperado permiten comparar luego la predicción con la evidencia.', pistas: ['Piensa qué necesitas para saber si funcionó.', 'La predicción debe poder compararse con un resultado.'] },
    { id: `${capsula.id}-zona-depurar`, grado, temaId: capsula.id, tipo: 'opcion_multiple', categoria: 'Depurar', enunciado: 'El resultado obtenido no coincide con el esperado. ¿Cuál es el siguiente paso más útil?', opciones: ['Registrar la diferencia y formular una hipótesis', 'Cambiar todo sin registrar', 'Ocultar el caso que falla'], correcta: 0, feedback: 'La diferencia observada es evidencia: permite formular una hipótesis, cambiar una parte y volver a probar.', pistas: ['El error aporta información.', 'Conviene poder relacionar un cambio con un nuevo resultado.'] },
  ];
};

export const ejemploProduccionCapsula = (capsula: CapsulaNoveno) => ({
  inicial: `“Hice la actividad sobre ${capsula.concepto} y parece funcionar.”`,
  devolucion: `“Explica qué entrada probaste, qué resultado esperabas y qué evidencia muestra que la regla vinculada con ${capsula.concepto} funciona.”`,
  mejorada: `“Probé un caso habitual y uno límite. Registré el resultado esperado y el obtenido, encontré una diferencia, cambié una sola parte y repetí la prueba. La nueva evidencia muestra por qué la solución mejoró.”`,
});
