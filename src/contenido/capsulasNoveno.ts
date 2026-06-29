export type PreguntaCapsula = {
  enunciado: string;
  opciones: string[];
  correcta: number;
  retroalimentacion: string;
};

export type CapsulaNoveno = {
  id: string;
  gradoTexto?: string;
  orden: number;
  titulo: string;
  concepto: string;
  sintesis: string;
  preguntaGuia: string;
  duracion: string;
  tecnologias: string[];
  pensamientoComputacional: string[];
  teoria: {
    definicion: string;
    ideasClave: string[];
    ejemplo: string;
    codigo: string;
    lenguaje: string;
  };
  ejemplosTecnologia?: {
    tecnologia: string;
    titulo: string;
    explicacion: string;
    codigo: string;
    bloques?: { tipo: 'evento' | 'sensor' | 'control' | 'variable' | 'salida' | 'movimiento'; texto: string }[];
  }[];
  practica: {
    titulo: string;
    situacion: string;
    consigna: string;
    metodologia: string;
    pasos: string[];
    apoyos: string[];
    evidencia: string;
  };
  criteriosVerificacion?: string[];
  autoevaluacion: PreguntaCapsula[];
};

export const capsulasNoveno: CapsulaNoveno[] = [
  {
    id: '9-algoritmos',
    orden: 1,
    titulo: 'Diseñar algoritmos',
    concepto: 'Algoritmo',
    sintesis: 'Organizar una solución en pasos precisos antes de elegir un lenguaje de programación.',
    preguntaGuia: '¿Cómo puede un robot orientarse por la institución sin improvisar su recorrido?',
    duracion: '35 a 45 minutos',
    tecnologias: ['PSeInt', 'Lápiz y papel'],
    pensamientoComputacional: ['Descomposición', 'Diseño de algoritmos', 'Prueba'],
    teoria: {
      definicion: 'Un algoritmo es una secuencia finita, ordenada y no ambigua de pasos que permite resolver una situación o alcanzar un resultado.',
      ideasClave: [
        'Debe indicar dónde comienza y cuándo termina.',
        'Cada paso debe poder interpretarse de una sola manera.',
        'Se puede probar manualmente antes de escribir código.',
      ],
      ejemplo: 'Un robot escolar debe salir de la biblioteca, avanzar por el corredor, evitar una zona cerrada y entregar un libro en secretaría.',
      codigo: 'INICIO\n  avanzar_hasta("corredor")\n  SI zona_cerrada ENTONCES\n    usar_ruta_alternativa()\n  FIN_SI\n  entregar_libro("secretaría")\nFIN',
      lenguaje: 'Pseudocódigo',
    },
    practica: {
      titulo: 'Ruta segura para un robot de reparto',
      situacion: 'La institución quiere probar un robot que distribuya materiales entre tres espacios sin ingresar a sectores bloqueados.',
      consigna: 'Diseña un algoritmo que reciba un destino, seleccione una ruta válida y confirme la entrega.',
      metodologia: 'Resolución de problemas y revisión entre pares',
      pasos: [
        'Identifica entradas, decisiones y salida esperada.',
        'Escribe una primera secuencia en lenguaje natural.',
        'Transforma la secuencia en pseudocódigo.',
        'Intercambia la solución y prueba un recorrido posible y uno bloqueado.',
      ],
      apoyos: ['Dibuja el plano antes de escribir.', 'Usa tarjetas para ordenar los pasos.', 'Comienza por un único destino y luego amplía.'],
      evidencia: 'Pseudocódigo revisado y registro de una modificación realizada después de probarlo.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué característica vuelve verificable a un algoritmo?',
        opciones: ['Que tenga muchos pasos', 'Que sus pasos sean precisos y tengan un resultado esperado', 'Que esté escrito únicamente en JavaScript'],
        correcta: 1,
        retroalimentacion: 'La precisión permite seguir los pasos, anticipar el resultado y comprobar si la solución funciona.',
      },
      {
        enunciado: '¿Cuándo conviene probar manualmente el algoritmo?',
        opciones: ['Antes de codificar', 'Solo después de entregar el proyecto', 'Nunca, porque el código lo resuelve'],
        correcta: 0,
        retroalimentacion: 'La prueba manual permite descubrir omisiones y decisiones poco claras antes de programar.',
      },
    ],
  },
  {
    id: '9-variables',
    orden: 2,
    titulo: 'Trabajar con variables',
    concepto: 'Variable',
    sintesis: 'Representar datos que pueden cambiar durante la ejecución de un programa.',
    preguntaGuia: '¿Cómo puede un sistema conocer en todo momento el stock disponible de la cantina?',
    duracion: '35 a 45 minutos',
    tecnologias: ['JavaScript', 'PSeInt'],
    pensamientoComputacional: ['Abstracción', 'Representación de datos', 'Prueba'],
    teoria: {
      definicion: 'Una variable es un espacio identificado por un nombre que almacena un valor y puede cambiar mientras el programa se ejecuta.',
      ideasClave: [
        'El nombre debe comunicar qué dato representa.',
        'La inicialización establece el primer valor.',
        'La asignación reemplaza el valor anterior por uno nuevo.',
      ],
      ejemplo: 'La variable stockAgua comienza en 20, disminuye con cada venta y aumenta cuando llega una reposición.',
      codigo: 'let stockAgua = 20;\nstockAgua = stockAgua - 1;\nconsole.log(stockAgua);',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Control de stock de una cantina',
      situacion: 'Durante el recreo se venden productos y el sistema debe advertir cuándo quedan pocas unidades.',
      consigna: 'Construye un programa que actualice el stock después de una venta o reposición y muestre el valor actual.',
      metodologia: 'Programación en parejas',
      pasos: [
        'Define variables con nombres claros para dos productos.',
        'Inicializa cada stock con un valor.',
        'Simula dos ventas y una reposición.',
        'Explica cómo cambia cada variable.',
      ],
      apoyos: ['Representa cada variable como una caja.', 'Registra una tabla valor anterior/valor nuevo.', 'Prueba primero con un solo producto.'],
      evidencia: 'Código ejecutable y tabla con la evolución de los valores.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué ocurre al ejecutar stock = stock - 1?',
        opciones: ['Se elimina la variable', 'El valor almacenado disminuye en uno', 'La variable cambia de nombre'],
        correcta: 1,
        retroalimentacion: 'La expresión calcula un nuevo valor y la asignación lo guarda en la misma variable.',
      },
      {
        enunciado: '¿Cuál es el nombre más claro para guardar la cantidad de botellas?',
        opciones: ['x', 'dato', 'cantidadBotellas'],
        correcta: 2,
        retroalimentacion: 'Un nombre descriptivo facilita comprender, revisar y mantener el programa.',
      },
    ],
  },
  {
    id: '9-constantes',
    orden: 3,
    titulo: 'Definir constantes',
    concepto: 'Constante',
    sintesis: 'Identificar datos que deben conservar el mismo valor durante todo el programa.',
    preguntaGuia: '¿Qué datos de una experiencia científica deberían permanecer protegidos frente a cambios accidentales?',
    duracion: '30 a 40 minutos',
    tecnologias: ['JavaScript', 'Python'],
    pensamientoComputacional: ['Abstracción', 'Modelado de datos'],
    teoria: {
      definicion: 'Una constante representa un dato que no debe cambiar durante la ejecución. Nombrarla explícitamente comunica una regla del problema.',
      ideasClave: [
        'Se usa para límites, factores de conversión o valores acordados.',
        'Evita repetir números sin significado en el código.',
        'Distingue las reglas estables de los datos variables.',
      ],
      ejemplo: 'En una experiencia se usa siempre el mismo límite seguro de temperatura, aunque las mediciones cambien.',
      codigo: 'const TEMPERATURA_MAXIMA = 60;\nlet temperaturaActual = 42;\nconsole.log(TEMPERATURA_MAXIMA);',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Límites seguros en el laboratorio',
      situacion: 'Un sensor registra temperaturas variables, pero el límite de seguridad definido para la experiencia no puede modificarse.',
      consigna: 'Distingue los datos variables de las constantes y escribe las declaraciones necesarias para representar la situación.',
      metodologia: 'Análisis de casos',
      pasos: [
        'Subraya los datos que cambian y rodea los que permanecen.',
        'Propón nombres para cada dato.',
        'Declara una constante y dos variables.',
        'Explica qué error conceptual habría si el límite fuera variable.',
      ],
      apoyos: ['Usa una tabla cambia/no cambia.', 'Prueba reemplazando los nombres por una explicación completa.', 'Compara const y let en JavaScript.'],
      evidencia: 'Declaraciones comentadas y justificación de cada elección.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Cuál de estos datos conviene representar como constante?',
        opciones: ['La temperatura medida ahora', 'El límite máximo acordado', 'La cantidad de mediciones realizadas'],
        correcta: 1,
        retroalimentacion: 'El límite expresa una regla estable; las mediciones y su cantidad pueden cambiar.',
      },
      {
        enunciado: '¿Qué aporta una constante con nombre descriptivo?',
        opciones: ['Hace visible una regla del problema', 'Permite cambiar el valor sin control', 'Elimina la necesidad de variables'],
        correcta: 0,
        retroalimentacion: 'El nombre convierte un valor aislado en una decisión comprensible del modelo.',
      },
    ],
  },
  {
    id: '9-tipos-datos',
    orden: 4,
    titulo: 'Elegir tipos de datos',
    concepto: 'Tipo de dato',
    sintesis: 'Seleccionar una representación adecuada para números, textos y valores lógicos.',
    preguntaGuia: '¿Todos los datos de una inscripción digital se procesan de la misma manera?',
    duracion: '35 a 45 minutos',
    tecnologias: ['JavaScript', 'Python'],
    pensamientoComputacional: ['Abstracción', 'Clasificación', 'Representación de datos'],
    teoria: {
      definicion: 'El tipo de dato indica qué clase de valor se almacena y qué operaciones tienen sentido realizar con él.',
      ideasClave: [
        'Los números permiten cálculos.',
        'Las cadenas representan texto, aunque contengan dígitos.',
        'Los booleanos representan verdadero o falso.',
      ],
      ejemplo: 'En una inscripción, edad es numérica, nombre es texto y aceptaCondiciones es un valor booleano.',
      codigo: 'let nombre = "Lucía";\nlet edad = 14;\nlet aceptaCondiciones = true;',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Formulario para una feria tecnológica',
      situacion: 'La organización necesita registrar nombre, edad, grupo, cantidad de acompañantes y autorización de imagen.',
      consigna: 'Asigna un tipo de dato a cada campo y crea un ejemplo válido de registro.',
      metodologia: 'Clasificación colaborativa',
      pasos: [
        'Clasifica cada campo como texto, número o booleano.',
        'Justifica dos decisiones que podrían generar dudas.',
        'Escribe las variables de un registro de ejemplo.',
        'Detecta un valor almacenado con un tipo inadecuado.',
      ],
      apoyos: ['Usa colores diferentes para cada tipo.', 'Pregunta qué operación se realizará con el dato.', 'Compara edad = 14 con edad = "14".'],
      evidencia: 'Tabla de campos, tipos, ejemplos y justificaciones.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué tipo representa mejor la autorización de imagen?',
        opciones: ['Número', 'Booleano', 'Texto largo'],
        correcta: 1,
        retroalimentacion: 'La autorización tiene dos estados posibles: aceptada o no aceptada.',
      },
      {
        enunciado: '¿Por qué un número de teléfono suele almacenarse como texto?',
        opciones: ['Porque se usa como identificador y no para calcular', 'Porque todos los textos son números', 'Porque no puede contener dígitos'],
        correcta: 0,
        retroalimentacion: 'Aunque contiene dígitos, un teléfono se identifica, se muestra o se valida; no se suma.',
      },
    ],
  },
  {
    id: '9-entrada-datos',
    orden: 5,
    titulo: 'Capturar entradas de datos',
    concepto: 'Entrada',
    sintesis: 'Recibir y validar información proveniente de personas, archivos o sensores.',
    preguntaGuia: '¿Cómo puede una investigación escolar asegurar que las mediciones recibidas sean utilizables?',
    duracion: '40 a 50 minutos',
    tecnologias: ['JavaScript', 'micro:bit', 'Python'],
    pensamientoComputacional: ['Modelado', 'Validación', 'Prueba de casos'],
    teoria: {
      definicion: 'Una entrada es un dato que ingresa al sistema desde una persona, un sensor, un archivo u otro programa para ser procesado.',
      ideasClave: [
        'Toda entrada tiene un origen y un formato esperado.',
        'Los datos recibidos deben validarse antes de usarse.',
        'Un mensaje claro permite corregir entradas inválidas.',
      ],
      ejemplo: 'Un estudio de ruido recibe una medición en decibeles y rechaza valores vacíos, negativos o imposibles.',
      codigo: 'const lectura = Number(prompt("Nivel de ruido en dB:"));\nconst esValida = lectura >= 0 && lectura <= 150;',
      lenguaje: 'JavaScript',
    },
    ejemplosTecnologia: [
      {
        tecnologia: 'JavaScript',
        titulo: 'Ingreso manual desde el navegador',
        explicacion: 'La persona escribe la medición. Number convierte el texto y la condición comprueba que el dato esté dentro del rango previsto.',
        codigo: 'const texto = prompt("Nivel de ruido en dB:");\nconst decibeles = Number(texto);\n\nif (texto !== "" && decibeles >= 0 && decibeles <= 150) {\n  console.log(`Medición válida: ${decibeles} dB`);\n} else {\n  console.log("Revisa el dato: debe estar entre 0 y 150 dB");\n}',
      },
      {
        tecnologia: 'Python',
        titulo: 'Ingreso manual con control de errores',
        explicacion: 'try permite detectar una entrada que no puede convertirse en número antes de validar su rango.',
        codigo: 'texto = input("Nivel de ruido en dB: ")\n\ntry:\n    decibeles = float(texto)\n    if 0 <= decibeles <= 150:\n        print(f"Medición válida: {decibeles} dB")\n    else:\n        print("El valor debe estar entre 0 y 150 dB")\nexcept ValueError:\n    print("Ingresa un número válido")',
      },
      {
        tecnologia: 'micro:bit',
        titulo: 'Entrada desde el sensor de sonido',
        explicacion: 'En una micro:bit V2 la entrada no se escribe: el micrófono produce una medición. El botón A permite decidir cuándo registrarla.',
        codigo: 'from microbit import *\n\nwhile True:\n    if button_a.was_pressed():\n        nivel = microphone.sound_level()\n        display.scroll(nivel)\n        sleep(500)',
      },
    ],
    practica: {
      titulo: 'Mapa sonoro del entorno',
      situacion: 'Un grupo registra niveles de ruido en diferentes espacios para elaborar recomendaciones de convivencia.',
      consigna: 'Diseña la captura de ubicación, horario y decibeles, incluyendo al menos dos validaciones.',
      metodologia: 'Investigación guiada',
      pasos: [
        'Define qué datos necesita cada registro.',
        'Indica el tipo y rango válido de cada entrada.',
        'Escribe la captura y validación en pseudocódigo o código.',
        'Prueba entradas válidas, vacías y fuera de rango.',
      ],
      apoyos: ['Construye primero una ficha de registro.', 'Usa una tabla entrada válida/inválida.', 'Implementa una validación antes de agregar la segunda.'],
      evidencia: 'Programa o pseudocódigo y tabla con al menos tres casos de prueba.',
    },
    criteriosVerificacion: [
      'Una medición dentro del rango se acepta y se muestra con su unidad.',
      'Una entrada vacía o no numérica no se incorpora al registro.',
      'Los valores negativos o mayores que 150 producen una orientación clara para corregirlos.',
      'Se prueban al menos cinco casos: válido, vacío, texto, negativo y superior al máximo.',
      'El programa no solicita nombres, ubicación exacta ni otros datos personales innecesarios.',
    ],
    autoevaluacion: [
      {
        enunciado: '¿Por qué se valida una entrada?',
        opciones: ['Para decorar la interfaz', 'Para evitar procesar datos ausentes o inadecuados', 'Para convertir todas las entradas en texto'],
        correcta: 1,
        retroalimentacion: 'Validar protege el proceso y permite orientar a quien necesita corregir un dato.',
      },
      {
        enunciado: '¿Cuál es un buen caso de prueba para decibeles?',
        opciones: ['Solo 50', 'Un valor válido, uno negativo y uno superior al máximo', 'Únicamente dejar el campo vacío'],
        correcta: 1,
        retroalimentacion: 'Combinar casos habituales y límites ayuda a comprobar el comportamiento de la validación.',
      },
    ],
  },
  {
    id: '9-salida-datos',
    orden: 6,
    titulo: 'Comunicar salidas',
    concepto: 'Salida',
    sintesis: 'Presentar resultados comprensibles, oportunos y accesibles para diferentes personas.',
    preguntaGuia: '¿Cómo debe comunicar un programa un resultado para que realmente sea útil?',
    duracion: '35 a 45 minutos',
    tecnologias: ['JavaScript', 'HTML', 'Consola'],
    pensamientoComputacional: ['Comunicación', 'Abstracción', 'Diseño centrado en usuarios'],
    teoria: {
      definicion: 'Una salida es la información que un programa muestra, guarda, reproduce o envía después de procesar datos.',
      ideasClave: [
        'Debe comunicar el resultado y su significado.',
        'Puede ser visual, textual, sonora o física.',
        'Debe considerar claridad y accesibilidad.',
      ],
      ejemplo: 'Un indicador de consumo no muestra solamente 87, sino “Consumo alto: 87 kWh. Revisa los equipos encendidos”.',
      codigo: 'const consumo = 87;\nconsole.log(`Consumo registrado: ${consumo} kWh`);',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Panel de consumo responsable',
      situacion: 'Una aplicación escolar recibe el consumo diario y debe comunicarlo de forma comprensible para promover decisiones responsables.',
      consigna: 'Diseña tres salidas: una normal, una de advertencia y una accesible mediante texto alternativo o sonido.',
      metodologia: 'Diseño centrado en usuarios',
      pasos: [
        'Identifica quién recibirá la información.',
        'Escribe el dato junto con unidad y contexto.',
        'Propón una alternativa que no dependa solo del color.',
        'Prueba el mensaje con otra persona y registra una mejora.',
      ],
      apoyos: ['Usa la fórmula dato + unidad + significado.', 'Lee el mensaje sin mirar colores.', 'Comienza por salida de texto antes de agregar otros medios.'],
      evidencia: 'Prototipo de salidas y explicación de una mejora basada en retroalimentación.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Cuál es la salida más informativa?',
        opciones: ['87', 'Consumo: 87 kWh', 'Dato procesado'],
        correcta: 1,
        retroalimentacion: 'El valor acompañado por una etiqueta y unidad permite interpretar el resultado.',
      },
      {
        enunciado: '¿Por qué no conviene depender solamente del color?',
        opciones: ['Porque el color ocupa memoria', 'Porque no todas las personas lo perciben de la misma manera', 'Porque el texto siempre debe eliminarse'],
        correcta: 1,
        retroalimentacion: 'Combinar color con texto, iconos o sonido amplía las formas de acceder a la información.',
      },
    ],
  },
  {
    id: '9-estructuras-selectivas',
    orden: 7,
    titulo: 'Tomar decisiones con estructuras selectivas',
    concepto: 'Estructura selectiva',
    sintesis: 'Elegir caminos de ejecución mediante condiciones simples y compuestas.',
    preguntaGuia: '¿Cómo puede un invernadero decidir cuándo ventilar sin intervención permanente?',
    duracion: '45 a 60 minutos',
    tecnologias: ['JavaScript', 'micro:bit', 'PSeInt'],
    pensamientoComputacional: ['Lógica', 'Abstracción', 'Prueba de casos'],
    teoria: {
      definicion: 'Una estructura selectiva evalúa una condición y decide qué instrucciones ejecutar según su resultado verdadero o falso.',
      ideasClave: [
        'La condición debe producir un valor booleano.',
        'Si/sino permite representar alternativas excluyentes.',
        'Los operadores lógicos combinan varias condiciones.',
      ],
      ejemplo: 'El invernadero abre la ventilación si la temperatura supera 28 °C o si la humedad supera 80 %.',
      codigo: 'if (temperatura > 28 || humedad > 80) {\n  abrirVentilacion();\n} else {\n  mantenerCerrado();\n}',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Invernadero automático',
      situacion: 'Un sistema recibe temperatura y humedad y debe decidir entre ventilar, mantener o emitir una alerta.',
      consigna: 'Define las condiciones y programa una respuesta para al menos tres estados del invernadero.',
      metodologia: 'Aprendizaje basado en problemas',
      pasos: [
        'Construye una tabla con entradas y decisiones esperadas.',
        'Escribe primero una condición simple.',
        'Agrega una decisión compuesta con operadores lógicos.',
        'Prueba valores normales, límites y extremos.',
      ],
      apoyos: ['Usa una tabla de verdad.', 'Representa cada decisión con un diagrama.', 'Trabaja primero solo con temperatura.'],
      evidencia: 'Código, tabla de decisiones y registro de un caso corregido.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué produce la condición temperatura > 28?',
        opciones: ['Un texto', 'Un valor verdadero o falso', 'Una repetición automática'],
        correcta: 1,
        retroalimentacion: 'Las condiciones se evalúan como booleanas y controlan qué camino se ejecuta.',
      },
      {
        enunciado: '¿Qué operador expresa que alcanza con cumplir una de dos condiciones?',
        opciones: ['Y lógico', 'O lógico', 'Asignación'],
        correcta: 1,
        retroalimentacion: 'El operador O produce verdadero cuando al menos una condición se cumple.',
      },
    ],
  },
  {
    id: '9-estructuras-repetitivas',
    orden: 8,
    titulo: 'Repetir procesos',
    concepto: 'Estructura repetitiva',
    sintesis: 'Automatizar acciones repetidas controlando inicio, condición y actualización.',
    preguntaGuia: '¿Cómo analizar muchas mediciones sin copiar la misma instrucción una y otra vez?',
    duracion: '45 a 60 minutos',
    tecnologias: ['JavaScript', 'Python', 'PSeInt'],
    pensamientoComputacional: ['Reconocimiento de patrones', 'Automatización', 'Prueba'],
    teoria: {
      definicion: 'Una estructura repetitiva ejecuta un bloque varias veces, mientras se cumpla una condición o durante una cantidad definida de iteraciones.',
      ideasClave: [
        'Debe existir una condición de finalización.',
        'Un contador registra cuántas iteraciones ocurren.',
        'Cada repetición debe acercar el proceso al final.',
      ],
      ejemplo: 'Un programa recorre siete mediciones diarias para calcular el consumo total de energía de una semana.',
      codigo: 'let total = 0;\nfor (let dia = 1; dia <= 7; dia++) {\n  total = total + leerConsumo(dia);\n}',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Consumo energético semanal',
      situacion: 'Se registran siete valores diarios y se necesita calcular total, promedio y cantidad de días por encima de un límite.',
      consigna: 'Diseña un ciclo que procese las siete mediciones sin repetir manualmente las mismas instrucciones.',
      metodologia: 'Desafío incremental',
      pasos: [
        'Identifica qué instrucciones se repiten.',
        'Define inicio, condición y actualización del ciclo.',
        'Acumula el total y cuenta los días de consumo alto.',
        'Prueba qué ocurre si el contador no se actualiza.',
      ],
      apoyos: ['Simula las iteraciones en una tabla.', 'Implementa primero el total.', 'Marca qué variables cambian en cada vuelta.'],
      evidencia: 'Programa y tabla de seguimiento de al menos tres iteraciones.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué riesgo existe si la condición de un ciclo nunca se vuelve falsa?',
        opciones: ['El ciclo puede continuar indefinidamente', 'La variable se convierte en texto', 'El programa se ejecuta una sola vez'],
        correcta: 0,
        retroalimentacion: 'Sin una condición de salida alcanzable se produce un ciclo infinito.',
      },
      {
        enunciado: '¿Qué variable suele guardar una suma progresiva?',
        opciones: ['Un acumulador', 'Una constante', 'Un booleano fijo'],
        correcta: 0,
        retroalimentacion: 'El acumulador conserva el total parcial y se actualiza en cada iteración.',
      },
    ],
  },
  {
    id: '9-funciones',
    orden: 9,
    titulo: 'Organizar el programa con funciones',
    concepto: 'Función',
    sintesis: 'Encapsular una tarea, recibir parámetros y reutilizar una solución.',
    preguntaGuia: '¿Cómo evitar repetir un mismo cálculo en distintas partes de una aplicación?',
    duracion: '45 a 60 minutos',
    tecnologias: ['JavaScript', 'Python'],
    pensamientoComputacional: ['Descomposición', 'Abstracción', 'Reutilización'],
    teoria: {
      definicion: 'Una función es un bloque con nombre que realiza una tarea específica, puede recibir datos mediante parámetros y devolver un resultado.',
      ideasClave: [
        'Cada función debería tener una responsabilidad clara.',
        'Los parámetros permiten usarla con datos diferentes.',
        'El valor de retorno comunica el resultado al resto del programa.',
      ],
      ejemplo: 'Una aplicación de transporte usa la misma función para calcular el costo de diferentes recorridos.',
      codigo: 'function calcularCosto(kilometros, precioKm) {\n  return kilometros * precioKm;\n}\nconst costo = calcularCosto(12, 8.5);',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Planificador de recorridos',
      situacion: 'Una aplicación compara recorridos según distancia, costo por kilómetro y descuento estudiantil.',
      consigna: 'Crea funciones separadas para calcular costo base, aplicar descuento y mostrar el resumen.',
      metodologia: 'Programación modular en parejas',
      pasos: [
        'Divide el problema en tareas pequeñas.',
        'Define nombre, parámetros y retorno de cada función.',
        'Prueba cada función de forma aislada.',
        'Integra las funciones y revisa nombres repetidos o responsabilidades mezcladas.',
      ],
      apoyos: ['Escribe el contrato entrada/tarea/salida.', 'Comienza por una función pura de cálculo.', 'Usa ejemplos numéricos conocidos.'],
      evidencia: 'Código modular y explicación de cómo se probó cada función.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Para qué sirven los parámetros?',
        opciones: ['Para que una función reciba datos diferentes', 'Para repetir siempre el mismo resultado', 'Para reemplazar todas las variables'],
        correcta: 0,
        retroalimentacion: 'Los parámetros vuelven reutilizable la función al permitir trabajar con distintos valores.',
      },
      {
        enunciado: '¿Qué ventaja tiene probar una función de forma aislada?',
        opciones: ['Permite localizar errores con mayor precisión', 'Impide reutilizarla', 'Elimina la necesidad de entradas'],
        correcta: 0,
        retroalimentacion: 'Una prueba aislada ayuda a determinar si la tarea específica funciona antes de integrarla.',
      },
    ],
  },
  {
    id: '9-listas',
    orden: 10,
    titulo: 'Procesar colecciones de datos',
    concepto: 'Lista o arreglo',
    sintesis: 'Agrupar valores relacionados y recorrerlos mediante índices o iteraciones.',
    preguntaGuia: '¿Cómo representar muchas mediciones relacionadas sin crear una variable para cada una?',
    duracion: '45 a 60 minutos',
    tecnologias: ['JavaScript', 'Python'],
    pensamientoComputacional: ['Abstracción', 'Patrones', 'Automatización'],
    teoria: {
      definicion: 'Una lista o arreglo es una colección ordenada de valores que se almacena bajo un único nombre y puede recorrerse para procesar sus elementos.',
      ideasClave: [
        'Cada elemento ocupa una posición identificable.',
        'La longitud indica cuántos elementos contiene.',
        'Los ciclos permiten procesar toda la colección.',
      ],
      ejemplo: 'Las precipitaciones de varios meses se guardan juntas para calcular máximo, mínimo y promedio.',
      codigo: 'const lluvias = [32, 18, 41, 27, 35];\nlet total = 0;\nfor (const valor of lluvias) total += valor;',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Registro de precipitaciones',
      situacion: 'Una estación escolar reúne mediciones mensuales y necesita analizarlas sin usar variables separadas.',
      consigna: 'Guarda las mediciones en una colección y calcula total, promedio y valor máximo.',
      metodologia: 'Análisis de datos',
      pasos: [
        'Crea una colección con al menos seis mediciones.',
        'Recorre todos los elementos.',
        'Calcula total y promedio.',
        'Identifica el máximo y comprueba el resultado manualmente.',
      ],
      apoyos: ['Numera las posiciones de la lista.', 'Sigue el acumulador en una tabla.', 'Resuelve primero total y luego máximo.'],
      evidencia: 'Código, resultados y comprobación manual de un cálculo.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Qué ventaja ofrece una lista?',
        opciones: ['Agrupa datos relacionados para procesarlos sistemáticamente', 'Impide usar ciclos', 'Solo puede guardar un dato'],
        correcta: 0,
        retroalimentacion: 'La colección evita variables aisladas y permite aplicar el mismo proceso a todos sus elementos.',
      },
      {
        enunciado: '¿Qué dato necesitamos para calcular el promedio?',
        opciones: ['Solo el máximo', 'La suma y la cantidad de elementos', 'El primer elemento únicamente'],
        correcta: 1,
        retroalimentacion: 'El promedio se obtiene dividiendo la suma total entre la cantidad de valores.',
      },
    ],
  },
  {
    id: '9-depuracion',
    orden: 11,
    titulo: 'Probar y depurar',
    concepto: 'Depuración',
    sintesis: 'Usar evidencias para localizar errores, formular hipótesis y mejorar una solución.',
    preguntaGuia: '¿Cómo transformar un fallo en información útil para mejorar el programa?',
    duracion: '45 a 60 minutos',
    tecnologias: ['JavaScript', 'Consola', 'PSeInt'],
    pensamientoComputacional: ['Prueba y depuración', 'Razonamiento lógico', 'Metacognición'],
    teoria: {
      definicion: 'Depurar es localizar, comprender y corregir las causas de un comportamiento diferente al esperado mediante pruebas y evidencias.',
      ideasClave: [
        'El mensaje de error es una pista, no una sanción.',
        'Un caso de prueba define entradas y salida esperada.',
        'Conviene cambiar una cosa por vez y volver a probar.',
      ],
      ejemplo: 'Un horario automático activa el timbre una hora antes porque compara minutos con horas sin convertir las unidades.',
      codigo: 'const horaActual = 10;\nconst horaTimbre = 11;\n// Error: se resta una hora, pero se muestra como minutos\nconsole.log(horaTimbre - horaActual);',
      lenguaje: 'JavaScript',
    },
    practica: {
      titulo: 'Clínica de errores del horario escolar',
      situacion: 'Un programa que anuncia cambios de clase produce mensajes incorrectos en determinados horarios.',
      consigna: 'Analiza una versión defectuosa, diseña casos de prueba y documenta la causa y la corrección de cada error.',
      metodologia: 'Clínica de errores y retroalimentación entre pares',
      pasos: [
        'Escribe qué debería ocurrir antes de ejecutar.',
        'Prueba un caso habitual y dos casos límite.',
        'Formula una hipótesis sobre la causa.',
        'Modifica una sola parte, vuelve a probar y registra el resultado.',
      ],
      apoyos: ['Usa una tabla esperado/obtenido.', 'Agrega salidas temporales para observar variables.', 'Explica el error en palabras antes de corregir.'],
      evidencia: 'Bitácora con caso, resultado esperado, resultado obtenido, hipótesis, cambio y nueva prueba.',
    },
    autoevaluacion: [
      {
        enunciado: '¿Cuál es el primer paso útil ante un resultado incorrecto?',
        opciones: ['Cambiar varias líneas al azar', 'Comparar el resultado esperado con el obtenido', 'Eliminar el programa'],
        correcta: 1,
        retroalimentacion: 'La diferencia entre lo esperado y lo obtenido aporta evidencia para formular una hipótesis.',
      },
      {
        enunciado: '¿Por qué conviene modificar una sola cosa por vez?',
        opciones: ['Para saber qué cambio produjo el nuevo resultado', 'Para evitar volver a probar', 'Para ocultar el error'],
        correcta: 0,
        retroalimentacion: 'Controlar los cambios permite relacionar una modificación con la evidencia obtenida.',
      },
    ],
  },
];

export const capsulasNovenoPorId = new Map(capsulasNoveno.map((capsula) => [capsula.id, capsula]));

export const crearPromptTutorCapsula = (capsula: CapsulaNoveno) => `Actúa como tutor de programación para estudiantes de ${capsula.gradoTexto ?? '9.º año'}.

Concepto de trabajo: ${capsula.concepto}.
Situación: ${capsula.practica.situacion}
Consigna: ${capsula.practica.consigna}

Tu tarea es acompañar el razonamiento del estudiante, no resolver la actividad por él.

Principio central: protege la agencia y la autoría intelectual del estudiante. Evita la suplantación cognitiva: no pienses, decidas, redactes ni programes en su lugar cuando esas acciones constituyen el aprendizaje esperado.

Reglas de tutoría:
1. Comienza preguntando qué comprende de la situación y qué intentó hasta ahora.
2. Formula una sola pregunta orientadora por vez.
3. Ofrece pistas graduales, ejemplos análogos breves o recordatorios conceptuales, pero nunca entregues la solución ni el código completo.
4. Si solicita directamente una respuesta, explica brevemente por qué no la darás y conviértela en una pregunta, comparación o pequeño paso que pueda resolver.
5. Si comparte código, ayúdalo a localizar el problema mediante casos de prueba y preguntas sobre resultados esperados y obtenidos.
6. Invítalo a explicar con sus palabras cada decisión antes de continuar y a comparar alternativas cuando existan.
7. Reconoce el error como evidencia útil y propone volver a probar después de cada cambio.
8. No solicites ni infieras nombres, direcciones, credenciales, ubicación exacta u otros datos personales. Si aparecen, pide reemplazarlos por datos ficticios.
9. Señala posibles impactos éticos, sesgos, riesgos de privacidad o accesibilidad vinculados con la solución.
10. Aclara cuando no tengas certeza y anima a contrastar la información con documentación, otras fuentes o con el docente.
11. Pide que identifique qué parte realizó por sí mismo, qué apoyo recibió de la IA y cómo verificó lo producido.
12. Cierra pidiendo al estudiante que resuma qué descubrió y cuál será su siguiente prueba.

Mantén un lenguaje claro, respetuoso y adecuado para ${capsula.gradoTexto ?? '9.º año'}.`;
