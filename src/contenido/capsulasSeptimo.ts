import type { CapsulaNoveno } from '@/contenido/capsulasNoveno';

type TipoBloque = 'evento' | 'sensor' | 'control' | 'variable' | 'salida' | 'movimiento';
const bloques = (...items: [TipoBloque, string][]) => items.map(([tipo, texto]) => ({ tipo, texto }));

const crearCapsula = (capsula: Omit<CapsulaNoveno, 'gradoTexto'>): CapsulaNoveno => ({ ...capsula, gradoTexto: '7.º año' });

export const capsulasSeptimo: CapsulaNoveno[] = [
  crearCapsula({
    id: '7-pensamiento', orden: 1, titulo: 'Pensar antes de programar', concepto: 'Pensamiento computacional',
    sintesis: 'Descomponer una situación, reconocer patrones y diseñar una solución que pueda probarse.',
    preguntaGuia: '¿Cómo podemos convertir un problema cercano en partes y reglas comprensibles?', duracion: '40 a 50 minutos',
    tecnologias: ['Scratch', 'MakeCode', 'Tarjetas'], pensamientoComputacional: ['Descomposición', 'Patrones', 'Abstracción', 'Algoritmos'],
    teoria: { definicion: 'El pensamiento computacional reúne estrategias para comprender problemas y expresar soluciones que una persona o una computadora puedan ejecutar.', ideasClave: ['Descomponer permite abordar una parte por vez.', 'Reconocer patrones ayuda a reutilizar ideas.', 'Abstraer significa conservar la información que importa para resolver.'], ejemplo: 'Para clasificar residuos se separan materiales, propiedades, reglas y resultados esperados.', codigo: '', lenguaje: 'Representación visual' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Clasificador visual', explicacion: 'Los bloques organizan pregunta, decisión y respuesta.', codigo: '', bloques: bloques(['evento', 'al presionar bandera'], ['sensor', 'preguntar qué material es'], ['control', 'si respuesta = papel'], ['salida', 'decir contenedor azul'], ['control', 'si no'], ['salida', 'decir revisar categoría']) },
      { tecnologia: 'Tarjetas', titulo: 'Algoritmo desconectado', explicacion: 'Las tarjetas permiten ordenar y ejecutar la misma regla sin pantalla.', codigo: '', bloques: bloques(['sensor', 'observar el objeto'], ['control', 'comparar con la regla'], ['salida', 'indicar una categoría'], ['salida', 'registrar una excepción']) },
    ],
    practica: { titulo: 'Mapa y clasificador del entorno', situacion: 'El centro quiere mejorar la clasificación de materiales usados durante una jornada.', consigna: 'Descompón la situación, formula una regla de clasificación y crea un algoritmo visual que pueda probar otra persona.', metodologia: 'Aprendizaje basado en problemas y revisión entre pares', pasos: ['Construye un mapa con partes, datos y decisiones.', 'Agrupa ejemplos buscando propiedades comunes.', 'Representa una regla con bloques o tarjetas.', 'Prueba tres casos y mejora una instrucción.'], apoyos: ['Usa las preguntas qué entra, qué se decide y qué sale.', 'Comienza con solo dos categorías.', 'Ejecuta literalmente cada paso.'], evidencia: 'Mapa, algoritmo visual y registro de una mejora.' },
    criteriosVerificacion: ['La regla usa información observable.', 'Todos los casos tienen una salida.', 'La mejora se apoya en una prueba.'],
    autoevaluacion: [
      { enunciado: '¿Qué estrategia consiste en separar un problema en partes?', opciones: ['Descomposición', 'Decoración', 'Repetición'], correcta: 0, retroalimentacion: 'La descomposición permite estudiar y resolver partes manejables.' },
      { enunciado: '¿Para qué sirve probar el algoritmo con otra persona?', opciones: ['Para descubrir ambigüedades', 'Para evitar explicarlo', 'Para agregar pasos sin motivo'], correcta: 0, retroalimentacion: 'Una ejecución literal revela omisiones y pasos que admiten más de una interpretación.' },
    ],
  }),
  crearCapsula({
    id: '7-programas', orden: 2, titulo: 'Construir programas con bloques', concepto: 'Programa e instrucción',
    sintesis: 'Relacionar un algoritmo con instrucciones organizadas en un lenguaje visual.', preguntaGuia: '¿Cómo logra una secuencia de bloques producir un comportamiento visible?', duracion: '35 a 45 minutos',
    tecnologias: ['Scratch', 'MakeCode'], pensamientoComputacional: ['Algoritmos', 'Secuenciación', 'Representación'],
    teoria: { definicion: 'Un programa es un conjunto organizado de instrucciones expresadas en un lenguaje que una computadora puede ejecutar.', ideasClave: ['El orden de los bloques modifica el resultado.', 'Los eventos indican cuándo comienza una secuencia.', 'Un mismo algoritmo puede representarse de formas diferentes.'], ejemplo: 'Un personaje saluda, avanza y cambia de apariencia cuando comienza el programa.', codigo: '', lenguaje: 'Bloques' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Animación breve', explicacion: 'Un evento inicia una secuencia de movimiento y apariencia.', codigo: '', bloques: bloques(['evento', 'al presionar bandera'], ['salida', 'decir Hola'], ['movimiento', 'mover 20 pasos'], ['salida', 'siguiente disfraz']) },
      { tecnologia: 'MakeCode', titulo: 'Secuencia de iconos', explicacion: 'La placa ejecuta los bloques de arriba hacia abajo.', codigo: '', bloques: bloques(['evento', 'al iniciar'], ['salida', 'mostrar icono corazón'], ['control', 'pausa 500 ms'], ['salida', 'mostrar icono feliz']) },
    ],
    practica: { titulo: 'Una historia en cuatro instrucciones', situacion: 'Se necesita una animación breve para presentar una campaña del centro.', consigna: 'Diseña y construye una secuencia de cuatro o más instrucciones con un inicio y un resultado reconocible.', metodologia: 'Diseño creativo y programación por parejas', pasos: ['Dibuja el resultado final.', 'Ordena las acciones necesarias.', 'Construye la secuencia con bloques.', 'Cambia el orden de dos bloques y compara.'], apoyos: ['Usa una tarjeta por acción.', 'Comienza con un solo objeto.', 'Nombra qué cambia después de cada bloque.'], evidencia: 'Programa por bloques y comparación de dos órdenes.' },
    criteriosVerificacion: ['Existe un evento de inicio.', 'Las instrucciones siguen un orden intencional.', 'El resultado coincide con la planificación.'],
    autoevaluacion: [
      { enunciado: '¿Qué bloque indica cuándo comienza una secuencia?', opciones: ['Evento', 'Apariencia', 'Variable'], correcta: 0, retroalimentacion: 'El evento activa las instrucciones asociadas.' },
      { enunciado: '¿Qué ocurre si intercambiamos dos instrucciones?', opciones: ['El resultado puede cambiar', 'Siempre sucede lo mismo', 'El programa desaparece'], correcta: 0, retroalimentacion: 'En una secuencia, el orden forma parte de la solución.' },
    ],
  }),
  crearCapsula({
    id: '7-eps', orden: 3, titulo: 'Reconocer entrada, proceso y salida', concepto: 'Flujo de información',
    sintesis: 'Comprender un programa sencillo como una transformación de datos.', preguntaGuia: '¿Qué recibe un programa, qué hace con esa información y qué comunica?', duracion: '35 a 45 minutos',
    tecnologias: ['Scratch', 'MakeCode', 'Tarjetas'], pensamientoComputacional: ['Abstracción', 'Datos', 'Predicción'],
    teoria: { definicion: 'Una entrada aporta información, el proceso aplica instrucciones y la salida comunica o produce un resultado.', ideasClave: ['Una entrada puede venir de una persona o un sensor.', 'El proceso transforma o compara información.', 'La salida debe permitir comprobar el propósito.'], ejemplo: 'Un programa recibe una cantidad de pasos, calcula una distancia aproximada y muestra el resultado.', codigo: '', lenguaje: 'Modelo entrada-proceso-salida' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Conversor visual', explicacion: 'La respuesta es la entrada; la multiplicación es el proceso; el mensaje es la salida.', codigo: '', bloques: bloques(['sensor', 'preguntar cantidad de pasos'], ['variable', 'fijar distancia a respuesta × 0.7'], ['salida', 'decir distancia aproximada']) },
      { tecnologia: 'MakeCode', titulo: 'Botón y respuesta', explicacion: 'El botón funciona como entrada y la pantalla como salida.', codigo: '', bloques: bloques(['evento', 'al presionar botón A'], ['variable', 'cambiar contador por 1'], ['salida', 'mostrar número contador']) },
    ],
    practica: { titulo: 'Radiografía de un programa', situacion: 'Tres programas sencillos producen resultados, pero no explican cómo circula la información.', consigna: 'Identifica entrada, proceso y salida; luego modifica una entrada y anticipa el nuevo resultado.', metodologia: 'Exploración guiada y predicción', pasos: ['Observa el programa sin ejecutarlo.', 'Completa una tabla entrada-proceso-salida.', 'Predice dos resultados.', 'Ejecuta o simula y explica una diferencia.'], apoyos: ['Marca entradas con azul, procesos con naranja y salidas con violeta.', 'Sigue un dato bloque por bloque.', 'Usa valores pequeños.'], evidencia: 'Tabla y predicciones verificadas.' },
    criteriosVerificacion: ['Diferencia dato de acción.', 'Explica qué transforma la entrada.', 'La salida puede verificarse.'],
    autoevaluacion: [
      { enunciado: 'En “preguntar edad y esperar”, ¿qué se obtiene?', opciones: ['Una entrada', 'Una repetición', 'Una salida'], correcta: 0, retroalimentacion: 'La respuesta ingresada aporta un dato al programa.' },
      { enunciado: '¿Cuál es el proceso al calcular puntos × 2?', opciones: ['La multiplicación', 'El teclado', 'El mensaje final'], correcta: 0, retroalimentacion: 'El proceso transforma el dato mediante una operación.' },
    ],
  }),
  crearCapsula({
    id: '7-variables', orden: 4, titulo: 'Guardar datos con variables', concepto: 'Variable',
    sintesis: 'Representar información que cambia mientras un programa se ejecuta.', preguntaGuia: '¿Cómo recuerda un juego los puntos obtenidos?', duracion: '40 a 50 minutos',
    tecnologias: ['Scratch', 'MakeCode'], pensamientoComputacional: ['Datos', 'Estado', 'Prueba'],
    teoria: { definicion: 'Una variable es un espacio con nombre que guarda un valor y permite consultarlo o modificarlo.', ideasClave: ['Debe inicializarse antes de usarla.', 'Su nombre comunica qué dato representa.', 'Incrementar significa guardar un nuevo valor basado en el anterior.'], ejemplo: 'La variable puntos comienza en cero y aumenta cuando el personaje recoge un objeto.', codigo: '', lenguaje: 'Bloques de variables' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Marcador', explicacion: 'La variable se reinicia y cambia ante un evento.', codigo: '', bloques: bloques(['evento', 'al presionar bandera'], ['variable', 'fijar puntos a 0'], ['evento', 'al tocar estrella'], ['variable', 'cambiar puntos por 1']) },
      { tecnologia: 'MakeCode', titulo: 'Contador físico', explicacion: 'Los botones actualizan y muestran el estado.', codigo: '', bloques: bloques(['evento', 'al iniciar'], ['variable', 'fijar contador a 0'], ['evento', 'al presionar A'], ['variable', 'cambiar contador por 1'], ['salida', 'mostrar número contador']) },
    ],
    practica: { titulo: 'Marcador de acciones positivas', situacion: 'Un proyecto necesita contar acciones registradas durante una actividad.', consigna: 'Construye un contador que comience en cero, aumente con un evento y pueda reiniciarse.', metodologia: 'Programación por parejas y pruebas', pasos: ['Define qué representa la variable.', 'Inicialízala en cero.', 'Asocia incremento y reinicio a eventos diferentes.', 'Prueba una secuencia de acciones y registra valores.'], apoyos: ['Representa la variable como una caja.', 'Completa una tabla antes/después.', 'Prueba primero solo el incremento.'], evidencia: 'Programa y tabla con evolución del valor.' },
    criteriosVerificacion: ['La variable comienza en un valor conocido.', 'Cada evento modifica la variable esperada.', 'El valor visible coincide con las acciones.'],
    autoevaluacion: [
      { enunciado: '¿Por qué conviene fijar puntos a 0 al comenzar?', opciones: ['Para evitar valores de una ejecución anterior', 'Para eliminar la variable', 'Para cambiar su nombre'], correcta: 0, retroalimentacion: 'Inicializar establece un estado conocido para cada nueva ejecución.' },
      { enunciado: '¿Qué hace “cambiar puntos por 1”?', opciones: ['Suma uno al valor actual', 'Fija siempre el valor en uno', 'Oculta la variable'], correcta: 0, retroalimentacion: 'Cambiar por uno incrementa el valor que ya estaba almacenado.' },
    ],
  }),
  crearCapsula({
    id: '7-eventos', orden: 5, titulo: 'Responder mediante eventos', concepto: 'Evento e interacción',
    sintesis: 'Relacionar acciones del usuario con respuestas de objetos y dispositivos.', preguntaGuia: '¿Cómo sabe cada objeto cuándo debe actuar?', duracion: '40 a 50 minutos',
    tecnologias: ['Scratch', 'MakeCode'], pensamientoComputacional: ['Eventos', 'Descomposición', 'Coordinación'],
    teoria: { definicion: 'Un evento es una situación que inicia una secuencia, como un clic, una tecla, un mensaje, un botón o una medición.', ideasClave: ['Cada objeto puede responder a eventos diferentes.', 'El evento y la respuesta deben estar relacionados.', 'Los mensajes coordinan objetos sin mezclar responsabilidades.'], ejemplo: 'Al hacer clic en un personaje, este envía un mensaje y otro objeto cambia de escenario.', codigo: '', lenguaje: 'Bloques de eventos' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Historia interactiva', explicacion: 'Un clic activa una respuesta y comunica otro objeto.', codigo: '', bloques: bloques(['evento', 'al hacer clic en este objeto'], ['salida', 'decir Bienvenido'], ['evento', 'enviar mensaje cambiar escena'], ['salida', 'al recibir mensaje, cambiar fondo']) },
      { tecnologia: 'MakeCode', titulo: 'Control por botones', explicacion: 'Cada botón tiene una responsabilidad visible.', codigo: '', bloques: bloques(['evento', 'al presionar A'], ['salida', 'mostrar flecha izquierda'], ['evento', 'al presionar B'], ['salida', 'mostrar flecha derecha']) },
    ],
    practica: { titulo: 'Mapa de eventos de una historia', situacion: 'Una historia digital debe permitir elegir acciones y mostrar respuestas coherentes.', consigna: 'Diseña un mapa con al menos tres eventos y construye una interacción donde cada objeto tenga una responsabilidad clara.', metodologia: 'Narrativa interactiva y programación por parejas', pasos: ['Dibuja objetos y posibles acciones.', 'Relaciona cada evento con una respuesta.', 'Programa una interacción por vez.', 'Intercambia el proyecto y revisa eventos inesperados.'], apoyos: ['Usa una tabla objeto-evento-respuesta.', 'Comienza con clics antes de agregar mensajes.', 'Nombra los mensajes por su propósito.'], evidencia: 'Mapa de eventos, proyecto y devolución de prueba.' },
    criteriosVerificacion: ['Cada evento produce una respuesta reconocible.', 'Las instrucciones están en el objeto adecuado.', 'La interacción puede repetirse.'],
    autoevaluacion: [
      { enunciado: '¿Cuál es un evento?', opciones: ['Presionar una tecla', 'El color de fondo', 'El nombre de una variable'], correcta: 0, retroalimentacion: 'Presionar una tecla puede iniciar una secuencia de instrucciones.' },
      { enunciado: '¿Para qué sirve enviar un mensaje en Scratch?', opciones: ['Para coordinar objetos', 'Para borrar todos los bloques', 'Para cambiar el idioma'], correcta: 0, retroalimentacion: 'Los mensajes permiten que diferentes objetos respondan de forma coordinada.' },
    ],
  }),
  crearCapsula({
    id: '7-control', orden: 6, titulo: 'Decidir y repetir con bloques', concepto: 'Estructuras de control',
    sintesis: 'Construir caminos alternativos y automatizar acciones repetidas.', preguntaGuia: '¿Cómo puede un juego responder a situaciones diferentes sin repetir bloques innecesariamente?', duracion: '45 a 60 minutos',
    tecnologias: ['Scratch', 'MakeCode'], pensamientoComputacional: ['Decisiones', 'Patrones', 'Repetición'],
    teoria: { definicion: 'Las decisiones eligen un camino según una condición; las repeticiones ejecutan una secuencia varias veces o mientras se cumple una regla.', ideasClave: ['Una condición puede ser verdadera o falsa.', 'Cada alternativa debe anticiparse.', 'La repetición necesita propósito y control.'], ejemplo: 'Un personaje avanza hasta encontrar un obstáculo; si lo toca, gira y continúa.', codigo: '', lenguaje: 'Bloques de control' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Recorrido con obstáculo', explicacion: 'El ciclo repite el movimiento y la condición modifica el camino.', codigo: '', bloques: bloques(['control', 'repetir 10 veces'], ['movimiento', 'mover 10 pasos'], ['control', 'si toca borde'], ['movimiento', 'girar 90 grados']) },
      { tecnologia: 'MakeCode', titulo: 'Alerta repetida', explicacion: 'La placa revisa una condición dentro de un ciclo.', codigo: '', bloques: bloques(['control', 'para siempre'], ['sensor', 'leer nivel de luz'], ['control', 'si luz < 50'], ['salida', 'mostrar icono alerta']) },
    ],
    practica: { titulo: 'Laberinto con reglas', situacion: 'Un personaje debe recorrer un laberinto, evitar obstáculos y llegar a una meta.', consigna: 'Construye una solución con al menos una decisión y una repetición. Explica qué controla cada estructura.', metodologia: 'Desafío gradual y prueba entre pares', pasos: ['Identifica acciones que se repiten.', 'Define la condición de obstáculo o meta.', 'Construye primero un camino simple.', 'Prueba caminos diferentes y corrige un comportamiento.'], apoyos: ['Simula el recorrido con una ficha.', 'Separa bloques de movimiento y control.', 'Prueba la condición antes de agregar el ciclo.'], evidencia: 'Proyecto, explicación de las estructuras y dos pruebas.' },
    criteriosVerificacion: ['La condición distingue situaciones.', 'La repetición evita duplicación innecesaria.', 'El programa puede alcanzar una salida.'],
    autoevaluacion: [
      { enunciado: '¿Qué estructura permite elegir entre dos caminos?', opciones: ['Si/si no', 'Decir', 'Esperar'], correcta: 0, retroalimentacion: 'La selección ejecuta un bloque u otro según la condición.' },
      { enunciado: '¿Cuándo conviene usar una repetición?', opciones: ['Cuando una acción sigue un patrón', 'Cuando el programa no tiene propósito', 'Para ocultar una salida'], correcta: 0, retroalimentacion: 'Reconocer un patrón permite representar varias acciones con una sola estructura.' },
    ],
  }),
  crearCapsula({
    id: '7-mejora', orden: 7, titulo: 'Probar, depurar y comunicar', concepto: 'Prueba y depuración',
    sintesis: 'Usar errores y resultados inesperados como evidencia para mejorar programas.', preguntaGuia: '¿Cómo sabemos qué cambiar cuando un programa no se comporta como esperábamos?', duracion: '45 a 60 minutos',
    tecnologias: ['Scratch', 'MakeCode', 'Bitácora'], pensamientoComputacional: ['Prueba', 'Depuración', 'Metacognición'],
    teoria: { definicion: 'Depurar consiste en comparar lo esperado con lo obtenido, formular una explicación, cambiar una parte y volver a probar.', ideasClave: ['Primero se define el resultado esperado.', 'Conviene cambiar una sola cosa por vez.', 'Registrar versiones permite explicar la mejora.'], ejemplo: 'Un contador suma dos puntos por clic porque el mismo evento aparece duplicado.', codigo: '', lenguaje: 'Bloques y bitácora' },
    ejemplosTecnologia: [
      { tecnologia: 'Scratch', titulo: 'Evento duplicado', explicacion: 'La inspección visual permite encontrar dos secuencias activadas por el mismo clic.', codigo: '', bloques: bloques(['evento', 'al hacer clic'], ['variable', 'cambiar puntos por 1'], ['evento', 'al hacer clic'], ['variable', 'cambiar puntos por 1']) },
      { tecnologia: 'Bitácora', titulo: 'Prueba documentada', explicacion: 'El registro conecta caso, hipótesis, cambio y nueva evidencia.', codigo: '', bloques: bloques(['sensor', 'caso: un clic'], ['salida', 'esperado: 1 punto'], ['salida', 'obtenido: 2 puntos'], ['control', 'hipótesis: evento duplicado'], ['salida', 'cambio y nueva prueba']) },
    ],
    practica: { titulo: 'Clínica de proyectos con errores', situacion: 'Varios proyectos presentan errores de inicio, conteo, eventos o repetición.', consigna: 'Elige un error, diseña una prueba, formula una hipótesis y documenta una corrección comprobada.', metodologia: 'Clínica de errores y coevaluación', pasos: ['Escribe qué debería suceder.', 'Ejecuta un caso y registra el resultado.', 'Localiza bloques relacionados y formula una hipótesis.', 'Cambia una parte, vuelve a probar y comunica la mejora.'], apoyos: ['Usa una tabla esperado-obtenido.', 'Lee los bloques de arriba hacia abajo.', 'Pide a otra persona que ejecute el mismo caso.'], evidencia: 'Bitácora y dos versiones comentadas.' },
    criteriosVerificacion: ['La hipótesis se apoya en una observación.', 'El cambio atiende la causa propuesta.', 'La nueva prueba confirma o revisa la explicación.'],
    autoevaluacion: [
      { enunciado: '¿Qué conviene hacer antes de modificar bloques?', opciones: ['Definir lo esperado y observar lo obtenido', 'Cambiar todo', 'Ocultar el error'], correcta: 0, retroalimentacion: 'La comparación aporta evidencia para formular una hipótesis.' },
      { enunciado: '¿Por qué cambiar una sola parte por vez?', opciones: ['Para relacionar el cambio con el resultado', 'Para evitar pruebas', 'Para terminar sin explicar'], correcta: 0, retroalimentacion: 'Controlar los cambios ayuda a saber cuál produjo la mejora.' },
    ],
  }),
];

export const capsulasSeptimoPorId = new Map(capsulasSeptimo.map((capsula) => [capsula.id, capsula]));
