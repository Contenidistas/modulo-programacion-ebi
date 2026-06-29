import type { ActividadConstructor } from '@/contenido/constructorUnidadAlgoritmos';

export const actividadesInteractivosOctavo: ActividadConstructor[] = [
  {
    id: '8-diagnostico-sistemas',
    etapa: 'Activación y diagnóstico',
    titulo: '¿Qué hace que un sistema sea interactivo?',
    proposito: 'Reconocer entradas, procesos y salidas en objetos y situaciones cercanas.',
    duracion: 30,
    consigna: 'Elige tres sistemas del entorno, identifica qué información reciben, qué decisión toman y qué respuesta producen. Representa uno con un esquema entrada-proceso-salida.',
    proceso: [
      'Observar sistemas como una puerta automática, un semáforo o una alarma.',
      'Distinguir qué dato inicia o modifica su comportamiento.',
      'Explicar la regla que relaciona la entrada con la salida.',
      'Comparar el esquema con otra persona y precisar una idea.',
    ],
    evidencia: 'Esquema entrada-proceso-salida y explicación de una regla de funcionamiento.',
    preguntasRetroalimentacion: [
      '¿La entrada es un dato, una acción o ambas cosas?',
      '¿Qué debería suceder si la entrada cambia?',
      '¿Tu esquema permite anticipar la salida?',
    ],
    alternativas: {
      computadoras: 'Registrar los ejemplos en una tabla y construir el esquema en un documento o presentación.',
      microbit: 'Explorar botones, luz, temperatura y pantalla para identificar posibles entradas y salidas.',
      sin_conexion: 'Usar un editor local o capturas descargadas de sistemas interactivos.',
      sin_dispositivos: 'Clasificar tarjetas con entradas, procesos y salidas de objetos cotidianos.',
    },
  },
  {
    id: '8-exploracion-sensores',
    etapa: 'Exploración guiada',
    titulo: 'De una medición a una decisión',
    proposito: 'Interpretar datos de entrada y anticipar decisiones mediante umbrales.',
    duracion: 45,
    consigna: 'Analiza un sistema que mide luz para decidir si muestra una señal. Prueba distintos valores, registra las salidas y explica dónde cambia la decisión.',
    proceso: [
      'Leer el modelo y localizar entrada, variable, condición y salida.',
      'Anticipar la respuesta para al menos cinco valores.',
      'Ejecutar o simular las pruebas y registrar resultados.',
      'Comparar predicciones con evidencias y corregir la explicación.',
    ],
    evidencia: 'Tabla de pruebas con predicción, resultado y explicación del umbral.',
    preguntasRetroalimentacion: [
      '¿Qué valores conviene probar cerca del umbral?',
      '¿Qué evidencia muestra que la condición funciona?',
      '¿Qué cambiaría si la medición fuera poco confiable?',
    ],
    alternativas: {
      computadoras: 'Simular el sistema con bloques en MakeCode, observando la medición y cada cambio de salida.',
      microbit: 'Usar el sensor de luz de la placa y mostrar iconos diferentes según el umbral.',
      sin_conexion: 'Trabajar con MakeCode sin conexión o con capturas de bloques y datos previamente preparados.',
      sin_dispositivos: 'Usar tarjetas numéricas como lecturas y representar manualmente cada salida.',
    },
  },
  {
    id: '8-produccion-aula',
    etapa: 'Producción y resolución',
    titulo: 'Diseñar un monitor para el aula',
    proposito: 'Construir un sistema interactivo con variables, eventos, decisiones y salidas comprensibles.',
    duracion: 70,
    consigna: 'Diseña un monitor que reciba una medición del entorno y comunique si la situación requiere atención. Define el propósito, los valores esperados, las decisiones y los mensajes.',
    proceso: [
      'Acordar qué situación se observará y para qué servirá el sistema.',
      'Definir entrada, variable, umbral, condición y salidas.',
      'Representar la solución y construir un prototipo.',
      'Probar casos normales, límites e inválidos; luego realizar una mejora.',
    ],
    evidencia: 'Modelo del sistema, prototipo, tabla de pruebas y registro de una mejora.',
    preguntasRetroalimentacion: [
      '¿Qué necesidad concreta atiende el sistema?',
      '¿Cómo justificaste el valor del umbral?',
      '¿La salida ayuda a una persona a tomar una decisión?',
    ],
    alternativas: {
      computadoras: 'Implementar el prototipo con bloques en MakeCode y utilizar el simulador de sensores.',
      microbit: 'Construir el prototipo con sensores integrados, botones, iconos y sonido opcional.',
      sin_conexion: 'Usar un entorno instalado y conservar capturas o registros de las pruebas.',
      sin_dispositivos: 'Crear un prototipo de papel y simular sensores, reglas y respuestas con tarjetas.',
    },
  },
  {
    id: '8-transferencia-pruebas',
    etapa: 'Transferencia y reflexión',
    titulo: 'Laboratorio de pruebas y rediseño',
    proposito: 'Evaluar un sistema ajeno, retroalimentar con evidencias y transferir el modelo a otro contexto.',
    duracion: 45,
    consigna: 'Intercambia el sistema con otro equipo, diseña tres pruebas que desafíen sus decisiones y ofrece una devolución. Después adapta tu solución a una necesidad diferente.',
    proceso: [
      'Comprender el propósito del sistema sin modificarlo.',
      'Diseñar una prueba habitual, una de límite y una inesperada.',
      'Registrar evidencias y formular preguntas de mejora.',
      'Revisar el propio diseño y explicar qué se conservó y qué cambió.',
    ],
    evidencia: 'Protocolo de pruebas, coevaluación y versión revisada con justificación.',
    preguntasRetroalimentacion: [
      '¿La devolución se apoya en una prueba observable?',
      '¿Qué decisión del diseño conviene conservar?',
      '¿Cómo se adapta la lógica cuando cambia el contexto?',
    ],
    alternativas: {
      computadoras: 'Intercambiar proyectos o enlaces y documentar las versiones en una plantilla.',
      microbit: 'Probar los programas en placas diferentes y variar deliberadamente las condiciones.',
      sin_conexion: 'Compartir archivos localmente y completar una bitácora descargada.',
      sin_dispositivos: 'Realizar una galería de prototipos y ejecutar las reglas mediante dramatización.',
    },
  },
];

export const evaluacionInteractivosOctavo = {
  observacion: [
    'Distingue entradas, procesos y salidas del sistema.',
    'Relaciona datos, variables y decisiones de manera coherente.',
    'Anticipa casos habituales, límites e inesperados.',
    'Usa pruebas para revisar y mejorar el diseño.',
    'Explica decisiones y considera la retroalimentación recibida.',
  ],
  autoevaluacion: [
    'Puedo explicar qué necesidad atiende mi sistema.',
    'Puedo mostrar cómo una entrada modifica la salida.',
    'Probé valores diferentes y registré lo sucedido.',
    'Mejoré el diseño a partir de una evidencia o devolución.',
  ],
  coevaluacion: [
    'Una relación entre entrada y salida que comprendí fue…',
    'Una prueba que ayudaría a revisar el sistema es…',
    'Una decisión de diseño que está bien justificada es…',
  ],
  ticketSalida: [
    '¿Qué diferencia hay entre recibir un dato y tomar una decisión?',
    '¿Qué error o resultado inesperado te ayudó a comprender el sistema?',
    '¿Qué probarías antes de usar este sistema en una situación real?',
  ],
  bitacora: ['Entrada probada', 'Salida esperada', 'Salida obtenida', 'Explicación posible', 'Cambio realizado', 'Nueva evidencia'],
  devoluciones: [
    'La entrada y la salida se reconocen con claridad. Explica ahora la regla que las relaciona.',
    'Probaste valores habituales. Agrega valores cercanos al límite para revisar la condición.',
    'Encontraste un resultado inesperado. Registra primero una hipótesis antes de modificar el programa.',
  ],
  rubricaOpcional: ['Comprensión del sistema', 'Modelo y decisiones', 'Pruebas y mejora', 'Comunicación del proceso'],
};

export const promptTutorInteractivosOctavo = `Actúa como tutor de programación para estudiantes de 8.º año que diseñan un sistema interactivo.

Tu tarea es ayudar a pensar, no resolver ni escribir el producto final. Comienza preguntando qué necesidad atiende el sistema y qué identificó el estudiante como entrada, proceso y salida. Ofrece una sola pista gradual por vez. Pide que anticipe un resultado antes de ejecutar, que pruebe valores habituales, límites e inesperados y que explique la evidencia obtenida.

No entregues código completo, respuestas listas ni sustituyas decisiones del estudiante. Si compartes un fragmento, usa uno incompleto o análogo y solicita que explique cómo adaptarlo. Señala posibles problemas de privacidad, sesgo, seguridad o uso responsable de datos y sensores. Cierra pidiendo al estudiante que resuma qué decidió, qué modificó y qué parte sigue siendo de su autoría.`;
