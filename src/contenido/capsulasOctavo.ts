import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';

type TipoBloque = 'evento' | 'sensor' | 'control' | 'variable' | 'salida' | 'movimiento';
const bloques = (...items: [TipoBloque, string][]) => items.map(([tipo, texto]) => ({ tipo, texto }));
const crearCapsula = (capsula: Omit<CapsulaNoveno, 'gradoTexto'>): CapsulaNoveno => ({ ...capsula, gradoTexto: '8.º año' });

export const capsulasOctavo: CapsulaNoveno[] = [
  crearCapsula({
    id: '8-sistemas', orden: 1, titulo: 'Modelar sistemas interactivos', concepto: 'Sistema interactivo',
    sintesis: 'Relacionar entradas, decisiones y salidas en dispositivos que interactúan con el entorno.', preguntaGuia: '¿Cómo transforma un dispositivo una medición en una respuesta útil?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Simulador'], pensamientoComputacional: ['Modelado', 'Datos', 'Decisiones', 'Prueba'],
    teoria: { definicion: 'Un sistema interactivo recibe datos, los procesa mediante reglas y produce una salida que modifica o comunica algo del entorno.', ideasClave: ['Las entradas pueden proceder de sensores o personas.', 'La regla conecta la medición con una decisión.', 'Las salidas pueden ser luz, sonido, movimiento o información.'], ejemplo: 'Un monitor de aula mide la luz y muestra una alerta cuando el nivel es bajo.', codigo: '', lenguaje: 'MakeCode por bloques' },
    ejemplosTecnologia: [
      { tecnologia: 'MakeCode y micro:bit', titulo: 'Monitor de luz', explicacion: 'La placa mide, compara y muestra un estado.', codigo: '', bloques: bloques(['evento', 'al iniciar'], ['variable', 'fijar umbral a 120'], ['control', 'para siempre'], ['sensor', 'fijar luz a nivel de luz'], ['control', 'si luz < umbral'], ['salida', 'mostrar icono alerta'], ['control', 'si no'], ['salida', 'mostrar icono adecuado']) },
      { tecnologia: 'Prototipo de papel', titulo: 'Sistema simulado', explicacion: 'Tarjetas de medición permiten ejecutar la misma lógica sin placa.', codigo: '', bloques: bloques(['sensor', 'tomar tarjeta de medición'], ['control', 'comparar con 120'], ['salida', 'elegir icono de respuesta'], ['salida', 'registrar resultado']) },
    ],
    practica: { titulo: 'Monitor del ambiente del aula', situacion: 'El grupo quiere observar una condición ambiental y comunicar cuándo requiere atención.', consigna: 'Modela y construye un sistema que reciba una medición, aplique una regla y produzca una salida clara.', metodologia: 'Indagación y prototipado', pasos: ['Define la necesidad y la variable que se observará.', 'Dibuja entrada, proceso y salida.', 'Construye el prototipo con bloques o tarjetas.', 'Prueba valores habituales, límite e inesperados.'], apoyos: ['Comienza con un único sensor.', 'Usa una tabla medición-decisión-salida.', 'Prueba manualmente antes de programar.'], evidencia: 'Modelo, prototipo y tabla con una mejora.' },
    criteriosVerificacion: ['La entrada corresponde al propósito.', 'La regla puede explicarse.', 'La salida ayuda a interpretar el estado.'],
    autoevaluacion: [
      { enunciado: '¿Qué elemento obtiene información del entorno?', opciones: ['Sensor', 'Actuador', 'Carcasa'], correcta: 0, retroalimentacion: 'El sensor produce una medición que el programa puede procesar.' },
      { enunciado: '¿Qué conecta la medición con la salida?', opciones: ['Una regla o condición', 'El color de la placa', 'El nombre del proyecto'], correcta: 0, retroalimentacion: 'La condición permite decidir qué respuesta corresponde a cada dato.' },
    ],
  }),
  crearCapsula({
    id: '8-eps', orden: 2, titulo: 'Explorar sensores y actuadores', concepto: 'Sensor y actuador',
    sintesis: 'Distinguir los componentes que recolectan información de los que producen efectos.', preguntaGuia: '¿Qué componentes permiten que un dispositivo perciba y actúe?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Simulador'], pensamientoComputacional: ['Descomposición', 'Flujo de información', 'Modelado'],
    teoria: { definicion: 'Un sensor mide una condición; un actuador produce una acción física o perceptible según instrucciones del programa.', ideasClave: ['Botones, luz, temperatura y aceleración pueden funcionar como entradas.', 'Pantallas, LED, sonido y motores pueden funcionar como salidas.', 'La placa procesa la información y coordina los componentes.'], ejemplo: 'Al inclinar la placa, el acelerómetro detecta el gesto y la pantalla muestra una flecha.', codigo: '', lenguaje: 'Bloques de dispositivo' },
    ejemplosTecnologia: [
      { tecnologia: 'micro:bit', titulo: 'Respuesta al movimiento', explicacion: 'Un gesto físico activa un icono.', codigo: '', bloques: bloques(['evento', 'al agitar'], ['sensor', 'evento del acelerómetro'], ['salida', 'mostrar icono sorpresa'], ['salida', 'reproducir tono']) },
      { tecnologia: 'Simulador', titulo: 'Entrada controlada', explicacion: 'El simulador permite provocar eventos y observar salidas sin hardware.', codigo: '', bloques: bloques(['sensor', 'activar gesto simulado'], ['control', 'ejecutar secuencia asociada'], ['salida', 'observar pantalla virtual']) },
    ],
    practica: { titulo: 'Inventario funcional de una placa', situacion: 'Un equipo necesita seleccionar componentes para construir una alarma portátil.', consigna: 'Explora entradas y salidas disponibles, clasifícalas y crea una interacción sencilla entre una entrada y dos salidas.', metodologia: 'Estaciones de exploración y documentación colaborativa', pasos: ['Identifica sensores, controles y actuadores.', 'Registra qué dato o efecto produce cada uno.', 'Elige una entrada y dos salidas.', 'Construye y prueba la interacción.'], apoyos: ['Usa una tabla componente-función-ejemplo.', 'Prueba cada componente por separado.', 'Utiliza el simulador si no hay placa.'], evidencia: 'Inventario funcional y demostración documentada.' },
    criteriosVerificacion: ['Distingue entrada de salida.', 'Relaciona cada componente con su función.', 'La interacción puede repetirse.'],
    autoevaluacion: [
      { enunciado: '¿Cuál es un actuador?', opciones: ['Una matriz de LED', 'Un sensor de temperatura', 'Un acelerómetro'], correcta: 0, retroalimentacion: 'La matriz produce una salida luminosa visible.' },
      { enunciado: '¿Qué hace un sensor?', opciones: ['Mide una condición', 'Decide sin programa', 'Documenta el proyecto'], correcta: 0, retroalimentacion: 'El sensor aporta datos; el programa los procesa y decide.' },
    ],
  }),
  crearCapsula({
    id: '8-datos', orden: 3, titulo: 'Trabajar con mediciones y variables', concepto: 'Variable y medición',
    sintesis: 'Guardar, comparar y comunicar datos obtenidos mediante sensores.', preguntaGuia: '¿Cómo conserva un dispositivo una medición para poder compararla?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Planilla'], pensamientoComputacional: ['Datos', 'Abstracción', 'Comparación'],
    teoria: { definicion: 'Una variable guarda un dato que puede cambiar; en robótica permite conservar mediciones, contadores, estados o umbrales.', ideasClave: ['El nombre debe explicar qué representa.', 'Una medición cambia al variar el entorno.', 'El umbral es un valor de referencia para decidir.'], ejemplo: 'La variable temperatura guarda cada lectura y se compara con un umbral acordado.', codigo: '', lenguaje: 'Variables por bloques' },
    ejemplosTecnologia: [
      { tecnologia: 'MakeCode', titulo: 'Lectura y comparación', explicacion: 'La medición se guarda antes de usarla en una condición.', codigo: '', bloques: bloques(['variable', 'fijar temperatura a temperatura °C'], ['control', 'si temperatura > 28'], ['salida', 'mostrar icono caliente'], ['control', 'si no'], ['salida', 'mostrar temperatura']) },
      { tecnologia: 'Registro de datos', titulo: 'Serie de mediciones', explicacion: 'Una tabla permite observar cambios y justificar un umbral.', codigo: '', bloques: bloques(['sensor', 'medir cada minuto'], ['variable', 'registrar valor'], ['control', 'comparar mediciones'], ['salida', 'explicar tendencia']) },
    ],
    practica: { titulo: 'Diario de mediciones', situacion: 'El grupo necesita observar cómo cambia una condición ambiental durante una clase.', consigna: 'Programa o simula lecturas periódicas, registra los valores y propone un umbral justificándolo con los datos.', metodologia: 'Indagación basada en datos', pasos: ['Define la variable y la unidad.', 'Obtén o simula al menos cinco mediciones.', 'Representa los valores en una tabla.', 'Propón y prueba un umbral.'], apoyos: ['Usa datos ficticios si no hay sensor.', 'Anota siempre la unidad.', 'Ordena valores antes de elegir el umbral.'], evidencia: 'Tabla de mediciones, programa por bloques y justificación.' },
    criteriosVerificacion: ['La variable representa la medición.', 'Los datos tienen unidad o contexto.', 'El umbral se justifica con evidencia.'],
    autoevaluacion: [
      { enunciado: '¿Qué puede guardar una variable?', opciones: ['La última medición', 'Solo el nombre del proyecto', 'La placa física'], correcta: 0, retroalimentacion: 'Una variable conserva un valor para consultarlo o modificarlo.' },
      { enunciado: '¿Qué es un umbral?', opciones: ['Un valor de referencia para decidir', 'Un sensor', 'Una imagen decorativa'], correcta: 0, retroalimentacion: 'Comparar la medición con un umbral permite elegir una respuesta.' },
    ],
  }),
  crearCapsula({
    id: '8-eventos', orden: 4, titulo: 'Programar eventos y decisiones físicas', concepto: 'Evento y condición',
    sintesis: 'Construir respuestas diferentes ante botones, gestos o cambios del entorno.', preguntaGuia: '¿Cómo decide un dispositivo qué respuesta ejecutar?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit'], pensamientoComputacional: ['Eventos', 'Lógica', 'Decisiones'],
    teoria: { definicion: 'Un evento inicia una secuencia; una condición evalúa datos y selecciona una respuesta entre alternativas.', ideasClave: ['Los botones y gestos pueden iniciar eventos.', 'Las condiciones comparan valores o estados.', 'Las decisiones compuestas combinan más de una condición.'], ejemplo: 'Una alarma se activa si la temperatura es alta y el sistema está habilitado.', codigo: '', lenguaje: 'Bloques de eventos y lógica' },
    ejemplosTecnologia: [
      { tecnologia: 'MakeCode', titulo: 'Alarma controlada', explicacion: 'El botón cambia el estado y la condición combina estado y medición.', codigo: '', bloques: bloques(['evento', 'al presionar A'], ['variable', 'fijar sistemaActivo a verdadero'], ['control', 'si temperatura > 28 y sistemaActivo'], ['salida', 'reproducir alarma'], ['control', 'si no'], ['salida', 'mantener silencio']) },
      { tecnologia: 'Tarjetas lógicas', titulo: 'Tabla de decisiones', explicacion: 'Las combinaciones permiten anticipar todas las respuestas.', codigo: '', bloques: bloques(['sensor', 'temperatura alta: sí/no'], ['variable', 'sistema activo: sí/no'], ['control', 'comparar ambas condiciones'], ['salida', 'alarma: sí/no']) },
    ],
    practica: { titulo: 'Alarma con activación segura', situacion: 'Una alarma ambiental solo debe funcionar cuando una persona la activa y la medición supera un límite.', consigna: 'Diseña, construye y prueba el sistema considerando todas las combinaciones de estado y medición.', metodologia: 'Diseño lógico y pruebas sistemáticas', pasos: ['Define eventos, estados y mediciones.', 'Completa una tabla de combinaciones.', 'Construye la decisión con bloques.', 'Prueba cada camino y corrige uno si es necesario.'], apoyos: ['Comienza con una sola condición.', 'Usa verdadero/falso para el estado.', 'Marca cada camino probado.'], evidencia: 'Tabla de decisiones, programa y registro de pruebas.' },
    criteriosVerificacion: ['Cada combinación tiene una respuesta.', 'El evento modifica el estado previsto.', 'La alarma no se activa indebidamente.'],
    autoevaluacion: [
      { enunciado: '¿Qué hace un evento?', opciones: ['Inicia una secuencia', 'Mide siempre temperatura', 'Reemplaza todas las condiciones'], correcta: 0, retroalimentacion: 'El evento determina cuándo se ejecutan los bloques asociados.' },
      { enunciado: 'En A y B, ¿cuándo es verdadera la condición?', opciones: ['Cuando ambas son verdaderas', 'Cuando ninguna importa', 'Cuando solo A es falsa'], correcta: 0, retroalimentacion: 'El operador Y exige que se cumplan las dos condiciones.' },
    ],
  }),
  crearCapsula({
    id: '8-repeticiones', orden: 5, titulo: 'Controlar automatismos', concepto: 'Repetición y control',
    sintesis: 'Revisar el entorno de forma periódica y controlar acciones repetidas.', preguntaGuia: '¿Cómo puede un dispositivo observar continuamente sin actuar de manera descontrolada?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Robot'], pensamientoComputacional: ['Automatización', 'Repetición', 'Estado'],
    teoria: { definicion: 'Un automatismo repite observaciones y acciones siguiendo reglas; necesita condiciones, pausas y estados que mantengan el comportamiento bajo control.', ideasClave: ['El ciclo “para siempre” revisa continuamente.', 'Una pausa puede estabilizar lecturas y salidas.', 'Los estados evitan repetir acciones innecesarias.'], ejemplo: 'Un sistema revisa la luz cada segundo y enciende una señal solo cuando cambia el estado.', codigo: '', lenguaje: 'Bloques de control' },
    ejemplosTecnologia: [
      { tecnologia: 'MakeCode', titulo: 'Control periódico', explicacion: 'El ciclo mide, decide, espera y vuelve a comenzar.', codigo: '', bloques: bloques(['control', 'para siempre'], ['sensor', 'leer nivel de luz'], ['control', 'si luz < umbral'], ['salida', 'encender señal'], ['control', 'pausa 1000 ms']) },
      { tecnologia: 'Robot o maqueta', titulo: 'Movimiento controlado', explicacion: 'El sensor detiene o modifica una acción repetida.', codigo: '', bloques: bloques(['control', 'mientras camino libre'], ['movimiento', 'avanzar'], ['sensor', 'medir distancia'], ['control', 'si obstáculo cercano'], ['movimiento', 'detener y girar']) },
    ],
    practica: { titulo: 'Automatismo que observa y responde', situacion: 'Una maqueta debe revisar periódicamente una condición y actuar solo cuando sea necesario.', consigna: 'Construye un ciclo de control con medición, decisión, acción y pausa. Explica cómo evita comportamientos inadecuados.', metodologia: 'Prototipado iterativo', pasos: ['Dibuja el ciclo de control.', 'Programa medición y pausa.', 'Agrega la decisión y la salida.', 'Prueba cambios rápidos y mejora la estabilidad.'], apoyos: ['Usa primero mediciones simuladas.', 'Haz visible cada lectura.', 'Agrega una pausa antes de ajustar el umbral.'], evidencia: 'Diagrama, automatismo y pruebas de estabilidad.' },
    criteriosVerificacion: ['El ciclo tiene propósito claro.', 'La lectura y la acción no se confunden.', 'La pausa o el estado evita respuestas excesivas.'],
    autoevaluacion: [
      { enunciado: '¿Para qué sirve una pausa dentro de un ciclo?', opciones: ['Para controlar la frecuencia', 'Para eliminar el sensor', 'Para cambiar el nombre'], correcta: 0, retroalimentacion: 'La pausa evita lecturas o acciones demasiado rápidas.' },
      { enunciado: '¿Qué debe ocurrir si aparece un obstáculo?', opciones: ['Cambiar o detener el movimiento', 'Continuar siempre', 'Borrar el programa'], correcta: 0, retroalimentacion: 'La condición modifica el comportamiento para responder al entorno.' },
    ],
  }),
  crearCapsula({
    id: '8-pruebas', orden: 6, titulo: 'Probar y depurar prototipos', concepto: 'Depuración de sistemas',
    sintesis: 'Relacionar fallas de bloques, datos y conexiones con evidencias observables.', preguntaGuia: '¿El problema está en la medición, la regla, la salida o la conexión?', duracion: '45 a 60 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Bitácora'], pensamientoComputacional: ['Prueba', 'Depuración', 'Hipótesis'],
    teoria: { definicion: 'Depurar un prototipo implica aislar componentes, comparar resultados y decidir si la falla está en datos, programa, conexión o dispositivo.', ideasClave: ['Se prueba una parte por vez.', 'El simulador ayuda a separar software y hardware.', 'La bitácora conserva hipótesis y cambios.'], ejemplo: 'Una alarma no suena: primero se prueba el parlante, luego la condición y finalmente el sensor.', codigo: '', lenguaje: 'Bloques y protocolo de pruebas' },
    ejemplosTecnologia: [
      { tecnologia: 'Simulador MakeCode', titulo: 'Aislar el programa', explicacion: 'Si funciona en el simulador, se revisan conexiones y componentes físicos.', codigo: '', bloques: bloques(['sensor', 'simular una entrada conocida'], ['control', 'observar la condición'], ['salida', 'comprobar salida virtual'], ['control', 'comparar con placa física']) },
      { tecnologia: 'Bitácora', titulo: 'Hipótesis controlada', explicacion: 'Cada cambio se vincula con una prueba.', codigo: '', bloques: bloques(['sensor', 'caso probado'], ['salida', 'esperado y obtenido'], ['control', 'hipótesis de causa'], ['variable', 'un cambio'], ['salida', 'nueva evidencia']) },
    ],
    practica: { titulo: 'Taller de fallas', situacion: 'Un prototipo presenta mediciones inestables o salidas que no coinciden con la regla.', consigna: 'Diseña un protocolo para localizar la causa, aplica pruebas y documenta una corrección o una nueva hipótesis.', metodologia: 'Clínica de errores y revisión entre pares', pasos: ['Define un caso con resultado conocido.', 'Prueba entrada, regla y salida por separado.', 'Formula una hipótesis.', 'Cambia una sola parte y vuelve a probar.'], apoyos: ['Compara simulador y placa.', 'Muestra temporalmente la medición.', 'Revisa conexiones con el sistema apagado.'], evidencia: 'Protocolo, bitácora y versión revisada.' },
    criteriosVerificacion: ['Las pruebas aíslan componentes.', 'La hipótesis se apoya en datos.', 'El cambio se verifica con el mismo caso.'],
    autoevaluacion: [
      { enunciado: '¿Qué aporta probar primero en el simulador?', opciones: ['Ayuda a separar programa y hardware', 'Garantiza que el sensor físico funciona', 'Evita documentar'], correcta: 0, retroalimentacion: 'Comparar entornos ayuda a localizar en qué parte puede estar la falla.' },
      { enunciado: '¿Por qué se cambia una sola parte?', opciones: ['Para reconocer el efecto del cambio', 'Para no volver a probar', 'Para ocultar la causa'], correcta: 0, retroalimentacion: 'Controlar variables permite relacionar cambio y resultado.' },
    ],
  }),
  crearCapsula({
    id: '8-proyecto', orden: 7, titulo: 'Crear un proyecto de robótica educativa', concepto: 'Proyecto robótico',
    sintesis: 'Integrar una necesidad, dispositivos, programación por bloques, pruebas y comunicación.', preguntaGuia: '¿Cómo puede un prototipo tecnológico responder responsablemente a una necesidad del entorno?', duracion: '60 a 90 minutos',
    tecnologias: ['MakeCode', 'micro:bit', 'Sensores y actuadores'], pensamientoComputacional: ['Integración', 'Iteración', 'Colaboración', 'Ética'],
    teoria: { definicion: 'Un proyecto de robótica educativa integra componentes físicos y programación para explorar o resolver una necesidad, considerando usuarios, datos, impacto y posibilidades reales.', ideasClave: ['El propósito orienta la selección tecnológica.', 'El prototipo se mejora en ciclos.', 'La documentación explica decisiones, límites y pruebas.'], ejemplo: 'Un indicador de condiciones ambientales comunica datos sin identificar personas ni almacenar información innecesaria.', codigo: '', lenguaje: 'Proyecto con bloques' },
    ejemplosTecnologia: [
      { tecnologia: 'MakeCode y micro:bit', titulo: 'Sistema integrado', explicacion: 'Sensores, estados y salidas se organizan alrededor de un propósito.', codigo: '', bloques: bloques(['evento', 'al iniciar'], ['variable', 'configurar umbral y estado'], ['control', 'para siempre'], ['sensor', 'obtener medición'], ['control', 'decidir respuesta'], ['salida', 'comunicar estado']) },
      { tecnologia: 'Prototipo de baja fidelidad', titulo: 'Maqueta previa', explicacion: 'Antes de conectar componentes, una maqueta permite revisar interacción y accesibilidad.', codigo: '', bloques: bloques(['sensor', 'simular entrada'], ['control', 'ejecutar regla con tarjetas'], ['salida', 'representar luz, sonido o movimiento'], ['salida', 'recoger devolución del usuario']) },
    ],
    practica: { titulo: 'Solución robótica para el centro', situacion: 'El grupo identifica una necesidad ambiental, de accesibilidad, comunicación u organización que pueda explorarse con un prototipo.', consigna: 'Diseña y construye una solución mediada, documentando propósito, componentes, programa, datos, pruebas, aspectos éticos y mejoras.', metodologia: 'Aprendizaje basado en proyectos STEAM', pasos: ['Investiga y delimita una necesidad.', 'Diseña el sistema y distribuye roles.', 'Construye un prototipo mínimo.', 'Prueba con usuarios ficticios o compañeros y mejora.'], apoyos: ['Usa una plantilla necesidad-entrada-proceso-salida.', 'Comienza con un sensor y una salida.', 'Define un hito de prueba por clase.'], evidencia: 'Prototipo, memoria del proceso, bitácora y presentación.' },
    criteriosVerificacion: ['La tecnología responde al propósito.', 'Los datos utilizados son necesarios y cuidados.', 'Las pruebas producen mejoras documentadas.'],
    autoevaluacion: [
      { enunciado: '¿Qué debería orientar la elección de sensores y actuadores?', opciones: ['La necesidad del proyecto', 'Usar todos los componentes', 'El color preferido'], correcta: 0, retroalimentacion: 'La tecnología se selecciona en función del problema y los usuarios.' },
      { enunciado: '¿Qué muestra un proceso iterativo?', opciones: ['Varias versiones basadas en pruebas', 'Una única entrega sin revisión', 'Cambios sin registro'], correcta: 0, retroalimentacion: 'Iterar significa construir, probar, revisar y producir nueva evidencia.' },
    ],
  }),
];

export const capsulasOctavoPorId = new Map(capsulasOctavo.map((capsula) => [capsula.id, capsula]));
