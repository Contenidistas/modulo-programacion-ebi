export type ContextoActividad = 'computadoras' | 'microbit' | 'sin_conexion' | 'sin_dispositivos';
export type AgrupamientoActividad = 'individual' | 'parejas' | 'equipos';

export type ActividadConstructor = {
  id: string;
  etapa: 'Activación y diagnóstico' | 'Exploración guiada' | 'Producción y resolución' | 'Transferencia y reflexión';
  titulo: string;
  proposito: string;
  duracion: number;
  consigna: string;
  proceso: string[];
  evidencia: string;
  preguntasRetroalimentacion: string[];
  alternativas: Record<ContextoActividad, string>;
  apoyos?: string[];
  varianteExtendida?: string;
  promptTutor?: string;
};

export const etiquetasContexto: Record<ContextoActividad, string> = {
  computadoras: 'Con computadoras',
  microbit: 'Con micro:bit',
  sin_conexion: 'Sin conexión',
  sin_dispositivos: 'Sin dispositivos',
};

export const etiquetasAgrupamiento: Record<AgrupamientoActividad, string> = {
  individual: 'Individual',
  parejas: 'En parejas',
  equipos: 'En equipos',
};

export const actividadesAlgoritmos: ActividadConstructor[] = [
  {
    id: 'diagnostico-instrucciones',
    etapa: 'Activación y diagnóstico',
    titulo: 'Instrucciones que otra persona pueda ejecutar',
    proposito: 'Reconocer ambigüedades, omisiones y supuestos en una secuencia cotidiana.',
    duracion: 30,
    consigna: 'Escribe instrucciones para que otra persona llegue desde la entrada del centro hasta un espacio acordado sin hacer preguntas adicionales.',
    proceso: [
      'Escribir una primera versión individual.',
      'Entregarla a otra persona para que la interprete literalmente.',
      'Marcar pasos ambiguos, información ausente y decisiones no previstas.',
      'Reescribir la secuencia y explicar una mejora.',
    ],
    evidencia: 'Dos versiones de la secuencia y una explicación breve del cambio más importante.',
    preguntasRetroalimentacion: [
      '¿Qué paso podría interpretarse de más de una manera?',
      '¿Qué información asumiste que la otra persona conocía?',
      '¿Cómo sabrás que la secuencia terminó correctamente?',
    ],
    alternativas: {
      computadoras: 'Redactar y comentar las versiones en un documento compartido.',
      microbit: 'Representar las instrucciones con iconos en la pantalla y botones para avanzar o retroceder.',
      sin_conexion: 'Trabajar con un documento local o editor de texto sin conexión.',
      sin_dispositivos: 'Usar tarjetas de papel, flechas y un plano sencillo del centro.',
    },
  },
  {
    id: 'exploracion-comparar',
    etapa: 'Exploración guiada',
    titulo: 'Tres formas de expresar una misma solución',
    proposito: 'Distinguir la lógica común entre lenguaje natural, pseudocódigo y código textual.',
    duracion: 40,
    consigna: 'Compara tres versiones de un algoritmo de reparto e identifica entrada, decisiones, acciones y salida en cada representación.',
    proceso: [
      'Subrayar con colores entradas, procesos, decisiones y salidas.',
      'Relacionar las instrucciones equivalentes entre las tres versiones.',
      'Detectar una diferencia que cambie el resultado.',
      'Proponer una versión corregida y justificarla.',
    ],
    evidencia: 'Tabla de equivalencias y corrección argumentada de una diferencia.',
    preguntasRetroalimentacion: [
      '¿Qué cambia en la escritura y qué permanece en la lógica?',
      '¿Qué condición decide el camino que seguirá el algoritmo?',
      '¿La salida permite comprobar que se alcanzó el propósito?',
    ],
    alternativas: {
      computadoras: 'Comparar ejemplos en PSeInt, Python y JavaScript usando ventanas lado a lado.',
      microbit: 'Comparar pseudocódigo con un programa de flechas y decisiones ejecutado en la placa.',
      sin_conexion: 'Usar capturas impresas o archivos previamente descargados de los tres ejemplos.',
      sin_dispositivos: 'Ordenar tarjetas con lenguaje natural, pseudocódigo y símbolos de diagrama.',
    },
  },
  {
    id: 'produccion-ruta',
    etapa: 'Producción y resolución',
    titulo: 'Diseñar una ruta segura para un robot',
    proposito: 'Construir un algoritmo con entradas, decisiones, casos alternativos y salida verificable.',
    duracion: 60,
    consigna: 'Diseña un algoritmo para que un robot entregue materiales en distintos espacios y responda ante un camino bloqueado.',
    proceso: [
      'Definir destino, estado de la ruta y confirmación de entrega.',
      'Dibujar el recorrido y localizar decisiones posibles.',
      'Escribir pseudocódigo con al menos una alternativa.',
      'Probar un recorrido normal, uno bloqueado y uno con destino inválido.',
    ],
    evidencia: 'Pseudocódigo, plano o diagrama y tabla con tres casos de prueba.',
    preguntasRetroalimentacion: [
      '¿Qué debe recibir el algoritmo antes de comenzar?',
      '¿Qué ocurrirá si el destino no existe?',
      '¿Tus casos de prueba recorren caminos realmente diferentes?',
    ],
    alternativas: {
      computadoras: 'Implementar el diseño en PSeInt, Python o JavaScript y registrar las salidas.',
      microbit: 'Usar botones como entradas y flechas o iconos como indicaciones del recorrido.',
      sin_conexion: 'Programar en un entorno instalado o entregar pseudocódigo y tabla de pruebas.',
      sin_dispositivos: 'Simular el robot con una ficha sobre un tablero y tarjetas de eventos.',
    },
  },
  {
    id: 'transferencia-revision',
    etapa: 'Transferencia y reflexión',
    titulo: 'Clínica de algoritmos',
    proposito: 'Revisar una solución ajena, ofrecer retroalimentación y transferir la estrategia a otro problema.',
    duracion: 40,
    consigna: 'Intercambia el algoritmo, ejecútalo de manera literal y devuelve una pregunta, una fortaleza y una propuesta de mejora. Luego adapta la solución a una nueva entrega.',
    proceso: [
      'Leer sin modificar la solución recibida.',
      'Ejecutar dos casos y registrar qué sucede.',
      'Dar retroalimentación basada en evidencias.',
      'Recuperar la propia solución, decidir qué cambiar y justificarlo.',
    ],
    evidencia: 'Registro de coevaluación, nueva versión y reflexión sobre la decisión tomada.',
    preguntasRetroalimentacion: [
      '¿Qué evidencia respalda la mejora que propones?',
      '¿Qué decisión del autor conviene conservar?',
      '¿Cómo cambió tu forma de probar después de revisar otra solución?',
    ],
    alternativas: {
      computadoras: 'Comentar pseudocódigo en un documento y conservar el historial de versiones.',
      microbit: 'Intercambiar programas y probarlos con combinaciones distintas de botones.',
      sin_conexion: 'Compartir archivos por red local o memoria y registrar la devolución en una plantilla.',
      sin_dispositivos: 'Realizar galería de producciones, notas adhesivas y simulación manual.',
    },
  },
];

export const evaluacionAlgoritmos = {
  observacion: [
    'Identifica entradas, procesos, decisiones y salidas.',
    'Expresa pasos precisos y en un orden coherente.',
    'Anticipa casos alternativos y condiciones de finalización.',
    'Prueba la solución y utiliza evidencia para modificarla.',
    'Explica sus decisiones y considera retroalimentación.',
  ],
  autoevaluacion: [
    'Puedo explicar qué problema resuelve mi algoritmo.',
    'Puedo justificar el orden de los pasos.',
    'Probé casos diferentes y registré los resultados.',
    'Realicé al menos una mejora a partir de una prueba o devolución.',
  ],
  coevaluacion: [
    'Una decisión que comprendí con claridad fue…',
    'Una pregunta que ayudaría a seguir revisando es…',
    'Una evidencia de que el algoritmo funciona es…',
  ],
  ticketSalida: [
    '¿Qué aprendiste hoy sobre la precisión de un algoritmo?',
    '¿Qué error o dificultad te ayudó a comprender algo nuevo?',
    '¿Cuál será la próxima prueba que realizarías?',
  ],
  bitacora: ['Situación o caso probado', 'Resultado esperado', 'Resultado obtenido', 'Hipótesis', 'Cambio realizado', 'Nueva evidencia'],
  devoluciones: [
    'La secuencia general se comprende. Revisa ahora qué debería ocurrir si el destino no es válido.',
    'Tus pruebas muestran el recorrido habitual. Agrega un caso que obligue al algoritmo a tomar otro camino.',
    'Identificaste el error. Antes de cambiar el código, explica qué evidencia apoya tu hipótesis.',
  ],
  rubricaOpcional: ['Comprensión del problema', 'Diseño del algoritmo', 'Pruebas y mejora', 'Explicación de decisiones'],
};

export const crearPromptTutorActividad = (actividad: ActividadConstructor, gradoTexto: string, unidad: string) => `Actúa como tutor de programación para estudiantes de ${gradoTexto}.

Unidad: ${unidad}.
Actividad: ${actividad.titulo}.
Propósito: ${actividad.proposito}
Consigna: ${actividad.consigna}
Evidencia esperada: ${actividad.evidencia}

Protege la agencia y la autoría del estudiante. Comienza preguntando qué comprende y qué intentó. Formula una sola pregunta orientadora por vez. Ofrece pistas graduales y ejemplos análogos breves, pero no entregues la respuesta, el producto ni el código completo. Pide que anticipe resultados, pruebe casos distintos y compare lo esperado con lo obtenido. Trata el error como evidencia útil y solicita que explique cada decisión.

Usa como posibles preguntas de intervención:
${actividad.preguntasRetroalimentacion.map((pregunta) => `- ${pregunta}`).join('\n')}

No solicites datos personales. Señala cuestiones de privacidad, accesibilidad, sesgo o impacto cuando sean relevantes. Si pide una respuesta directa, explica el límite y convierte la solicitud en un pequeño paso que pueda resolver. Cierra pidiendo que identifique qué hizo por sí mismo, qué apoyo recibió, cómo lo verificó y cuál será su siguiente prueba.`;
