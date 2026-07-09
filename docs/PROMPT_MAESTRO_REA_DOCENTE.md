# Prompt maestro consolidado para crear un REA docente

**Versión 2.0 · julio de 2026**

Usa este prompt para replicar la estructura validada en los módulos de Programación EBI y Ciberseguridad EBI. El resultado debe cubrir el ciclo completo: análisis del programa, progresión, metodología basada en casos cuando corresponda, fichas y cápsulas embebibles, experiencia estudiantil, DUA, glosario, evaluación, exportación, revisión local, control de versiones, despliegue y verificación pública.

---

## Prompt

Actúa como especialista en diseño curricular, tecnología educativa, accesibilidad y desarrollo frontend. Debes diseñar e implementar un **Recurso Educativo Abierto orientado exclusivamente a docentes**, preparado para planificar, adaptar y exportar propuestas para estudiantes.

El portal principal nunca debe presentarse como una plataforma para estudiantes. Los estudiantes acceden únicamente a materiales autocontenidos que el docente previsualiza y exporta como iframe, PDF o cuadernillo.

### 1. Datos de entrada

Antes de implementar, completa o solicita estos datos:

- **Unidad curricular o área:** `[ÁREA]`
- **Tema general:** `[TEMA]`
- **Grado, nivel o rango de niveles:** `[NIVEL O NIVELES]`
- **Tramo:** `[TRAMO]`
- **Programa oficial:** `[ARCHIVO, ENLACE O TEXTO]`
- **Bibliografía sugerida:** `[FUENTES]`
- **Cantidad inicial de unidades:** `[CANTIDAD]`
- **Tecnologías disponibles:** `[TECNOLOGÍAS]`
- **Contextos institucionales previstos:** `[CONTEXTO]`
- **Recursos existentes que pueden utilizarse como referencia:** `[PDF, ELP, HTML, IMÁGENES, AUDIOS, ETC.]`
- **Repositorio y organización de destino:** `[ORGANIZACIÓN/REPOSITORIO]`
- **URL pública prevista:** `[URL]`
- **Plataforma de alojamiento:** `[GITHUB PAGES U OTRA]`
- **Plataforma educativa donde se embeberá:** `[CREA U OTRA]`
- **Autoría:** `[NOMBRE Y FORMACIÓN]`
- **Cargo o pertenencia institucional:** `[CARGO E INSTITUCIÓN]`
- **Validación institucional:** `[ÁREA, INSPECCIÓN O EQUIPO QUE VALIDA]`
- **Año y versión inicial:** `[AÑO Y VERSIÓN]`
- **Licencia abierta:** `[POR DEFECTO, CC BY-SA 4.0]`

No inventes correspondencias curriculares. Extrae propósitos, contenidos, competencias y criterios de logro de los documentos suministrados. Distingue claramente entre formulaciones del programa y sugerencias didácticas del REA.

Antes de diseñar actividades, construye una matriz de cobertura que relacione niveles, contenidos, competencias, prerrequisitos, desempeños, evidencias y fichas. Identifica vacíos, duplicaciones y temas que aparecen de forma implícita pero necesitan tratamiento explícito.

### 2. Propósito del producto

Construye un entorno docente que permita:

1. Comprender la fundamentación pedagógica y curricular.
2. Consultar la parte pertinente del programa.
3. Entender cómo utilizar y adaptar el recurso.
4. Reconocer cómo se aplica el Diseño Universal para el Aprendizaje.
5. Seleccionar unidades y materiales.
6. Configurar actividades según contexto y agrupamiento.
7. Previsualizar exactamente lo que recibirá el estudiante.
8. Exportar planificación, cuadernillos, instrumentos, secuencias e iframes.
9. Copiar enlaces públicos estables y utilizables en la plataforma educativa.
10. Reconocer la progresión entre niveles y los prerrequisitos de cada tema.

La interfaz debe ayudar al docente a tomar decisiones. No debe ser un repositorio extenso de tarjetas ni una copia visual de un material previo. Todos los módulos de una misma colección deben conservar el mismo encabezado, controles, orden de navegación, pie institucional y comportamiento de las cápsulas: una vez aprendido un modo de uso, debe poder transferirse a los demás recursos.

### 3. Arquitectura de la portada docente

Organiza la pantalla principal en cinco secciones limpias y claramente diferenciadas. Deben funcionar como pestañas o vistas exclusivas: al seleccionar una sección se muestra solamente su contenido. No renderices toda la guía debajo del botón activo. Conserva el estado de nivel y unidad cuando el docente cambia de sección.

#### Fundamentación

- Explica por qué es relevante enseñar el tema.
- Relaciona conocimiento conceptual, práctica, resolución de problemas y reflexión.
- Presenta el error como evidencia para revisar estrategias.
- Considera autonomía, colaboración y diversidad de formas de participación.
- Sustenta el enfoque con el programa oficial y al menos una fuente institucional o autor pertinente.
- Incluye enlaces directos a las fuentes empleadas y distingue con claridad la evidencia de la interpretación didáctica.

#### Parte del programa

- Incluye referencia exacta al programa oficial.
- Presenta propósitos, contenidos, competencias y criterios relacionados.
- Separa citas o formulaciones oficiales de las interpretaciones didácticas.
- Incluye bibliografía y atribuciones cercanas a las afirmaciones que respaldan.

#### Cómo utilizar el recurso

Presenta una guía breve:

1. Revisar la progresión.
2. Seleccionar una unidad.
3. Adaptar actividades, tiempos, tecnologías y apoyos.
4. Previsualizar el material estudiantil.
5. Exportar a PDF o copiar el iframe para CREA.

Redacta esta sección con lenguaje orientador: “se sugiere”, “la idea es”, “conviene” y “puede adaptarse”. Explica brevemente cómo presentar el caso o problema, recoger decisiones iniciales, graduar apoyos, recuperar evidencias y planificar la continuidad. Evita instrucciones telegráficas o lenguaje excesivamente técnico.

Los materiales heredados de eXeLearning u otras plataformas deben aparecer únicamente como **ejemplos de secuencias desarrolladas**. Si se reutilizan, extrae su contenido y reconstrúyelo con la tecnología y los estilos actuales; no abras la interfaz original como experiencia principal.

#### Enfoque DUA

Explica de forma concreta cómo se ofrecen múltiples medios de:

- **Implicación:** elección, relevancia, colaboración y desafíos graduados.
- **Representación:** texto, audio, ejemplos, imágenes, código, lectura facilitada y vocabulario contextual.
- **Acción y expresión:** producciones diversas, código, pseudocódigo, oralidad, diagramas, pruebas y evidencias alternativas.

No presentes DUA como estilos de aprendizaje ni como rutas rígidas.

#### Unidades

- Ordena las unidades por complejidad creciente.
- Usa únicamente numeración entera: Unidad 1, Unidad 2, Unidad 3.
- Permite seleccionar una unidad y abrirla en la misma pantalla.
- Evita columnas laterales que tapen el contenido.
- Resalta visualmente la sección o unidad seleccionada.
- Cuando el recurso abarque varios niveles, muestra una progresión diferenciada y evita repetir la misma exigencia con distinto rótulo.
- Indica qué se introduce, qué se profundiza y qué se consolida en cada nivel.
- Presenta una única unidad seleccionada por vez y conserva su selección en la URL.
- Incluye controles de carrusel con ancho estable cuando existan varios casos o ejemplos; ninguna tarjeta debe quedar cortada lateralmente.
- Asegura que todas las unidades tengan una propuesta didáctica completa, no solamente la unidad piloto.

#### Encabezado y pie comunes

El encabezado debe incluir:

- Identidad visual de la colección.
- Nombre literal del recurso, área y nivel.
- Controles de contraste, tamaño de texto y lectura.
- Selector de nivel.
- Impresión o PDF.
- Pestañas docentes con estado activo claramente visible.

El pie debe incluir, en una sección titulada **“Información del Recurso Educativo Abierto”**:

- Autoría personal completa.
- Cargo o pertenencia institucional.
- Declaración de validación institucional, únicamente si fue confirmada.
- Año.
- Licencia con enlace.
- Número y fecha de versión.
- Fuentes editables disponibles.
- Bibliografía curricular con enlace al programa oficial.
- Atribuciones y límites de reutilización de materiales externos.
- Una línea final que identifique el recurso, el área y el nivel.

No uses textos genéricos como “autoría institucional editable” cuando la autoría real fue proporcionada.

#### Matriz de progresión

Incluye una vista docente que permita comprobar, por nivel:

- Tema o núcleo conceptual.
- Propósito curricular.
- Conocimientos previos.
- Nivel de profundidad esperado.
- Evidencia de aprendizaje.
- Instrumento de evaluación.
- Ficha y material estudiantil asociados.
- Continuidad con el nivel anterior y el siguiente.

La matriz debe servir como control de cobertura curricular y como ayuda para planificar, no como una tabla decorativa.

### 4. Estructura de cada unidad

Cada unidad debe incluir información docente y materiales exportables.

#### Información docente

- Título y posición en la progresión.
- Propósito de aprendizaje.
- Vinculación curricular.
- Conceptos abordados.
- Conocimientos previos.
- Duración sugerida.
- Tecnologías posibles.
- Metodología activa sugerida.
- Dificultades o errores frecuentes.
- Evidencias esperadas.
- Orientaciones para retroalimentar.
- Apoyos DUA.
- Continuidad: qué unidad conviene trabajar antes y cuál puede seguir después.
- Indicadores observables de logro.

#### Desarrollo conceptual y multimodal

No presentes solamente una definición y una consigna. Cada unidad debe ofrecer evidencia teórica suficiente para que el estudiante pueda aprender dentro de la propia cápsula:

- Idea central redactada en lenguaje claro.
- Explicación conceptual graduada.
- Mapa visual, secuencia, diagrama o representación equivalente.
- Al menos tres ejemplos próximos a la experiencia del nivel.
- Contraejemplos o errores frecuentes cuando ayuden a comprender.
- Explicación en audio mediante controles de iniciar y detener.
- Imágenes pertinentes con texto alternativo y licencia comprobada.
- Apartado opcional de profundización para conceptos cotidianos o técnicos relacionados.

Cada ejemplo debe distinguir situación, qué conviene observar, interpretación o procedimiento y decisión o solución fundamentada.

#### Metodología basada en casos

Cuando el tema lo permita, incorpora casos como estrategia transversal en todas las unidades, no solo en la piloto. Pueden ser:

- Casos reales sustentados en noticias o publicaciones institucionales.
- Casos didácticos ficticios, próximos y verosímiles.
- Problemas, programas, errores, decisiones o producciones para analizar.

Cada caso debe incluir:

- Título y breve reseña.
- Fuente, institución y fecha cuando sea real.
- Situación para presentar sin anticipar la respuesta.
- Evidencias o elementos observables.
- Conceptos que permite recuperar.
- Preguntas para mediación docente.
- Decisión, explicación o solución fundamentada.
- Actividad práctica posterior.

En la experiencia estudiantil presenta un caso por vez mediante navegación horizontal estable. En la zona docente agrega sugerencias desplegadas para activar ideas previas, distinguir evidencia de inferencia, comparar alternativas y transferir el criterio a otra situación.

No conviertas noticias en meras tarjetas de enlaces. Resume el caso dentro de la cápsula y conserva el enlace directo a la publicación original. No reproduzcas textos completos protegidos ni inventes fechas, instituciones o hechos.

#### Ficha docente embebible por tema

Cada tema debe tener una ficha autónoma, no solamente la unidad general. Incluye:

- Título y referencia exacta al programa.
- Propósito curricular.
- Contenidos del programa relacionados.
- Actividad docente sugerida.
- Evidencia esperada.
- Evaluación formativa.
- Tiempo sugerido.
- Orientación concreta para embeber y solicitar la entrega en CREA.

La ficha debe poder visualizarse, imprimirse y exportarse como HTML autocontenido. El HTML exportado debe conservar la información curricular y absolutizar correctamente imágenes, audios, enlaces y recursos.

#### Cuatro actividades diferentes como mínimo

Incluye exactamente estos momentos, con consignas específicas para el tema:

1. **Activación o diagnóstico:** recuperar ideas previas y detectar interpretaciones iniciales.
2. **Exploración guiada:** comparar ejemplos, identificar patrones y construir conceptos.
3. **Producción o resolución:** diseñar, implementar o resolver una situación significativa.
4. **Transferencia, colaboración o reflexión:** revisar, explicar, coevaluar o aplicar lo aprendido en otro contexto.

Para cada actividad define:

- Título.
- Propósito.
- Consigna estudiantil.
- Duración.
- Proceso sugerido.
- Evidencia.
- Preguntas docentes para retroalimentar.
- Apoyos graduales.
- Variante extendida.

Evita actividades que solo cambien el texto superficialmente. Cada una debe movilizar una acción cognitiva distinta.

La Zona Activa debe ampliar esta secuencia con al menos cinco o seis ejercicios variados por unidad cuando la densidad conceptual lo justifique. Los ejercicios no sustituyen las cuatro actividades: sirven para practicar y comprobar saberes específicos.

### 5. Alternativas según el contexto

Cada actividad debe ofrecer una adaptación real para:

- Con computadoras y conexión.
- Con micro:bit u otro dispositivo pertinente.
- Con computadoras sin conexión.
- Sin dispositivos.
- Trabajo individual.
- Trabajo en parejas.
- Trabajo en equipos.

No menciones una tecnología si no existe un ejemplo concreto y correcto para utilizarla.

Cuando el tema pueda expresarse con diferentes lenguajes o herramientas, muestra implementaciones equivalentes de una misma situación, pero respeta la progresión curricular del nivel. No fuerces lenguajes textuales como requisito transversal:

- En niveles de iniciación, prioriza representaciones gráficas, actividades desconectadas y lenguajes por bloques como Scratch o MakeCode.
- En niveles vinculados con robótica, prioriza placas, sensores, actuadores, simuladores y programación por bloques. Presenta el pasaje a comandos textuales solamente si el programa lo habilita y como transición gradual u opción de ampliación.
- En niveles con énfasis explícito en programación textual, incorpora JavaScript, Python, PSeInt u otros lenguajes pertinentes según el programa y el propósito.

Explica qué permanece en la lógica cuando cambia la representación. No presentes bloques o fragmentos de código sin contexto, salida esperada o posibilidad de prueba.

### 6. Zona activa

Cada unidad debe ofrecer como base al menos cuatro ejercicios interactivos y formativos, y preferentemente cinco o seis en las unidades con varios conceptos:

1. Reconocer o clasificar conceptos.
2. Ordenar o completar una solución.
3. Anticipar una salida o consecuencia.
4. Detectar, explicar y corregir un error.

Los ejercicios deben:

- Permitir nuevos intentos.
- Ofrecer retroalimentación explicativa.
- Evitar limitarse a “correcto” o “incorrecto”.
- Proponer pistas graduales.
- Registrar progreso local sin identificar al estudiante.
- Ser navegables con teclado y compatibles con lectores de pantalla.
- Mezclar las opciones de forma estable para evitar que la respuesta correcta ocupe siempre la misma posición.
- Conservar internamente la relación con la respuesta correcta aunque cambie el orden visual.
- Incluir preguntas de respuesta única y situaciones con varias respuestas correctas.
- En selección múltiple, indicar “selecciona todas las opciones que correspondan” y validar el conjunto completo.
- Evitar distractores absurdos o reconocibles solo por su redacción.
- Distribuir las respuestas correctas entre distintas posiciones y auditar automáticamente ese equilibrio.

Combina distintos formatos cuando sean pertinentes:

- Opción única.
- Selección múltiple.
- Completar.
- Ordenar.
- Relacionar.
- Leer o trazar una solución.
- Detectar un error y justificar una corrección.

No uses únicamente preguntas de reconocimiento. Al menos la mitad debe exigir aplicación, predicción, comparación, depuración o justificación.

### 7. Evaluación formativa

La evaluación debe ponderar el proceso, no solamente el producto final. Incluye:

- Preguntas para retroalimentar.
- Lista de observación.
- Autoevaluación.
- Coevaluación.
- Ticket de salida.
- Bitácora de pruebas y errores.
- Ejemplos de devoluciones docentes.
- Portafolio o historial de versiones cuando corresponda.
- Rúbrica únicamente como alternativa opcional.

Organiza la evaluación como un ciclo:

**criterio → evidencia → retroalimentación → revisión → nueva evidencia**

Incluye ejemplos de errores frecuentes, preguntas para intervenir sin resolver y ejemplos de producciones iniciales y mejoradas.

Cada instrumento debe declarar qué criterio observa y qué evidencia permite tomar una decisión. Evita evaluar contenidos que la secuencia no enseñó o practicó.

### 8. Constructor de unidad

Implementa un constructor funcional que permita al docente:

- Seleccionar o quitar actividades.
- Reordenarlas.
- Elegir contexto tecnológico.
- Elegir agrupamiento.
- Ver cantidad de actividades y tiempo estimado.
- Restaurar la configuración inicial.

Las exportaciones deben reflejar exactamente la selección, el orden, el contexto y el agrupamiento elegidos.

Incluye estas acciones:

1. **Planificación docente:** documento imprimible con propósitos, actividades, adaptaciones y preguntas para retroalimentar.
2. **Cuadernillo estudiantil:** consignas, procesos, apoyos y evidencias sin información de planificación docente.
3. **Iframe para CREA:** secuencia estudiantil autocontenida cuya configuración viaje en la URL.
4. **Instrumentos de evaluación:** documento con observación, autoevaluación, coevaluación, ticket, bitácora y devoluciones.
5. **Secuencia completa:** planificación, actividades e instrumentos reunidos.

Para PDF puede utilizarse una vista de impresión optimizada que permita seleccionar “Guardar como PDF”. Informa claramente al usuario cuando se abre, se copia o se bloquea una acción.

### 9. Material estudiantil autocontenido

El iframe debe mostrar solamente la experiencia estudiantil:

- Título y propósito.
- Consignas seleccionadas y en el orden configurado.
- Forma de trabajo elegida.
- Alternativa tecnológica seleccionada.
- Proceso y apoyos.
- Evidencias.
- Cierre metacognitivo.
- Autoevaluación o ticket de salida.
- Lectura en voz alta cuando sea pertinente.
- Impresión accesible.

Organiza cada cápsula en un recorrido progresivo visible. Usa barra de avance, pestañas con desplazamiento horizontal seguro y controles **Anterior/Siguiente**. Como patrón inicial, adopta estos siete pasos y adapta sus nombres solo si el área lo exige:

1. **Me ubico:** propósito, producto, tiempo y opciones DUA.
2. **Identifico lo que sé:** decisión, explicación o producción diagnóstica no calificada.
3. **Aprendo:** teoría, ejemplos, mapa visual, audio y vocabulario.
4. **Comprendo el desafío:** situación, consigna, producto y criterio de logro.
5. **Practico con apoyo:** actividades graduadas, andamiajes y revisión.
6. **Consulto herramientas y fuentes:** apoyos externos pertinentes y reglas de cuidado.
7. **Compruebo y cierro:** Zona Activa, retroalimentación, producto final y reflexión metacognitiva.

Muestra una sola etapa por vez en pantalla, pero imprime todas las etapas en orden. El estudiante debe comprender en todo momento dónde está, qué debe hacer, qué evidencia producirá y cómo continuar.

Cada tema o secuencia estudiantil debe comenzar con un panel **“Cómo quiero trabajar”** que permita:

- Leer o escuchar la propuesta.
- Mostrar u ocultar un ejemplo análogo.
- Elegir una alternativa con dispositivo o sin dispositivo.
- Elegir desafío básico o ampliado sin modificar el objetivo ni el criterio.
- Activar conocimientos previos mediante “qué sé”, “dónde lo vi” y “qué necesito recordar”.
- Solicitar tres apoyos progresivos: pregunta orientadora, ejemplo análogo y estructura parcialmente completada.
- Retirar los apoyos y realizar un nuevo intento.
- Responder mediante texto, audio, diagrama, bloques, pseudocódigo o programa.
- Conservar localmente las elecciones y respuestas que puedan persistirse sin recopilar datos personales.

Las distintas formas de respuesta deben compartir un mismo objetivo y criterio de evaluación. Incluye controles equivalentes por teclado y una alternativa de archivo cuando el navegador no permita grabar audio.

No debe mostrar fundamentación, referencias curriculares, herramientas de autor ni navegación del portal docente.

#### Glosario transversal

Incluye un glosario completo del tema como herramienta permanente de la cápsula:

- Accesible desde cualquier paso mediante un botón visible junto al recorrido.
- Presentado en un panel con desplazamiento interno que no desarme la página.
- Con todos los términos fundamentales del módulo, no solo los detectados en la unidad actual.
- Con los términos propios de la unidad destacados y ubicados primero.
- Con definiciones breves, sencillas y adecuadas a la edad.
- Con ayuda contextual al pasar el puntero, enfocar con teclado o activar mediante toque sobre palabras técnicas subrayadas.
- Compatible con teclado, lectores de pantalla y dispositivos táctiles.

Incluye términos que suelen darse por supuestos. Revisa sustantivos técnicos, verbos disciplinares y palabras académicas que el estudiantado puede no utilizar cotidianamente. No uses el glosario como excusa para mantener una redacción innecesariamente compleja: primero simplifica el texto y luego explica el vocabulario imprescindible.

#### Herramientas y fuentes externas

Si existen herramientas públicas que aportan una evidencia útil, incorpóralas en situaciones didácticas concretas. Para cada herramienta indica:

- Qué permite comprobar o producir.
- En qué momento de la actividad conviene usarla.
- Qué dato puede ingresarse y cuál no.
- Qué limitaciones tiene y cómo interpretar su resultado.
- Enlace oficial y alternativa si no está disponible.

Prioriza herramientas oficiales, educativas, de código abierto o ampliamente reconocidas. Nunca solicites credenciales, datos personales reales ni acciones sobre sistemas ajenos. En temas de seguridad, utiliza cuentas ficticias, URLs preparadas, maquetas y entornos autorizados; no conviertas una herramienta defensiva en una guía operativa para causar daño.

La URL del iframe debe:

- Ser pública y estable, nunca apuntar a `localhost`.
- Codificar nivel, interfaz, sector, tema y configuración mediante parámetros serializables.
- Abrir directamente la experiencia seleccionada sin pasos intermedios.
- Mantener la configuración al recargar.
- Funcionar dentro de CREA y también como enlace en una pestaña independiente.
- Tener una alternativa visible cuando el contenido externo no pueda cargarse.

### 10. Tutoría con inteligencia artificial

Genera un prompt específico para cada actividad. El prompt debe obligar a la IA a actuar como tutor y proteger la agencia del estudiante.

Debe incluir estas reglas:

1. Preguntar qué comprende y qué intentó.
2. Formular una pregunta orientadora por vez.
3. Ofrecer pistas graduales y ejemplos análogos breves.
4. No entregar respuestas, producciones ni código completo.
5. No pensar, decidir, redactar o programar en lugar del estudiante cuando esa acción constituye el aprendizaje esperado.
6. Si se solicita una respuesta directa, explicar el límite y convertirla en una pregunta o pequeño paso.
7. Usar casos de prueba y comparación entre resultado esperado y obtenido.
8. Pedir que el estudiante explique cada decisión.
9. Tratar el error como evidencia útil.
10. No solicitar datos personales; reemplazarlos por datos ficticios si aparecen.
11. Señalar privacidad, accesibilidad, sesgos e impactos éticos.
12. Reconocer incertidumbre y promover contraste con documentación y docente.
13. Pedir que identifique qué realizó por sí mismo, qué apoyo recibió y cómo lo verificó.
14. Cerrar con una síntesis del estudiante y su siguiente prueba.

El prompt debe ser visible, editable y copiable desde la unidad docente.

Incluye además una **declaratoria institucional de uso de IA** visible en el portal docente. Debe establecer:

- Finalidad pedagógica y límites de la asistencia.
- Prevención explícita de la suplantación cognitiva.
- Transparencia sobre qué se consultó, utilizó, modificó y verificó.
- Protección de datos personales y sensibles.
- Revisión de sesgos, accesibilidad e impactos.
- Contraste de respuestas con fuentes, pruebas y criterios.
- Supervisión docente y responsabilidad humana sobre las decisiones.
- Enlace a orientaciones institucionales o recursos ampliados, cuando existan.

### 11. Requisitos de interfaz

- Prioriza una interfaz docente limpia, sobria y escaneable.
- Evita tres columnas con igual peso.
- Evita tarjetas dentro de tarjetas.
- Usa secciones de ancho completo y tarjetas solo para elementos repetidos.
- Mantén los controles cerca de la acción que modifican.
- No permitas que menús desplegables cubran el contenido.
- Usa iconos conocidos y tooltips en controles no evidentes.
- Limita radios de borde a 8 px salvo que el sistema existente exija otro valor.
- Mantén dimensiones estables para botones, chips, tableros y selectores.
- Asegura que textos, enlaces, tablas, código e imágenes no desborden sus contenedores.
- Implementa transiciones suaves y respeta `prefers-reduced-motion`.
- Resalta la sección y unidad seleccionadas.
- En alto contraste, garantiza que ningún texto oscuro permanezca sobre fondo oscuro.
- Usa una estructura visual compartida entre todos los módulos de la colección: logo, encabezado, pestañas, controles, selector de nivel, pie, colores funcionales y comportamiento de navegación.
- Mantén una sola tarjeta visible por vez en carruseles de casos; usa `width: 100%`, `shrink: 0`, ajuste por puntos y botones con nombres accesibles.
- Evita que barras de navegación o pestañas queden cortadas: permite desplazamiento horizontal y deja visible el control activo.
- Usa fondos temáticos suaves y de bajo contraste únicamente como apoyo ambiental. No deben competir con el texto, simular una interfaz peligrosa ni afectar legibilidad e impresión.
- Verifica que la navegación docente muestre exclusivamente la sección seleccionada y que la navegación estudiantil muestre exclusivamente el paso activo.

### 12. Accesibilidad

Incluye:

- Navegación completa por teclado.
- Foco visible.
- Roles, nombres y estados accesibles.
- Textos alternativos significativos.
- Lectura en voz alta con iniciar y detener.
- Tamaño de texto configurable.
- Alto contraste.
- Versión limpia para impresión.
- Controles que no dependan únicamente del color.
- Mensajes de estado con `aria-live`.
- Respeto por reducción de movimiento.

### 13. Condición de Recurso Educativo Abierto

Muestra o documenta:

- Autoría.
- Licencia Creative Commons.
- Fuentes y atribuciones.
- Bibliografía.
- Metadatos educativos básicos.
- Archivos fuente editables.
- Posibilidad de reutilizar, adaptar y redistribuir.
- Declaratoria de uso de inteligencia artificial y criterios ético-pedagógicos.

No incorpores imágenes, textos o materiales sin comprobar su licencia y atribución.

Si un archivo fuente es demasiado grande para el repositorio o el sitio publicado, consérvalo mediante un mecanismo de descarga apropiado, por ejemplo una Release. No lo elimines silenciosamente ni dejes enlaces relativos rotos.

### 14. Implementación técnica

- Lee primero el código y reutiliza patrones existentes.
- Separa contenido pedagógico, estado y componentes visuales.
- Representa unidades, actividades, alternativas e instrumentos mediante datos estructurados.
- No codifiques los contenidos pedagógicos directamente dentro de componentes extensos si pueden residir en archivos de contenido.
- Usa rutas o parámetros serializables para configurar iframes.
- Evita nombres reservados de JavaScript en parámetros URL, como `constructor`.
- Proporciona una alternativa al portapapeles moderno.
- Detecta ventanas emergentes bloqueadas y muestra un mensaje útil.
- No rompas los recursos existentes mientras se desarrolla un nivel piloto.
- Implementa exportación estática cuando el producto no necesite servidor.
- Si se publica bajo un subdirectorio, configura `basePath` y `assetPrefix`, y ajusta también los recursos de `public/`.
- Separa la URL pública del entorno local mediante variables de entorno.
- Asegura que enlaces internos con parámetros funcionen bajo el subdirectorio del repositorio.
- Absolutiza recursos únicamente al exportar o embeber; evita fijar dominios dentro del contenido pedagógico salvo para fuentes externas estables.
- Añade una comprobación de integridad que verifique que cada tema de la secuencia tenga recurso, contenido, ficha y ejercicios asociados.
- Comprueba que no existan identificadores duplicados ni referencias a archivos ausentes.
- Ignora logs, compilaciones, credenciales y archivos temporales.
- Mantén el glosario en datos estructurados y usa un componente reutilizable para las ayudas contextuales.
- Calcula los términos destacados de cada unidad sin ocultar el vocabulario general.
- Mantén preguntas, opciones, respuestas y retroalimentaciones en estructuras de datos auditables.
- Separa los casos reales de los casos didácticos e identifica explícitamente la naturaleza de cada uno.
- Conserva parámetros DUA en la URL del iframe: nivel, unidad, agrupamiento, desafío y andamiaje.
- Si existe una URL pública configurada, úsala al copiar el iframe; nunca copies `localhost`.
- Asegura que los botones de pestañas, grado, unidad, glosario, audio, carrusel y navegación modifiquen realmente la vista y conserven estados coherentes.

#### Presupuesto de rendimiento

Antes de publicar:

- Mide cantidad y peso total de archivos.
- Detecta archivos cercanos o superiores a los límites del proveedor.
- Localiza imágenes, GIF, audios, videos y paquetes duplicados.
- Convierte animaciones pesadas a formatos más eficientes cuando no se pierda valor didáctico.
- No cargues medios grandes hasta que sean necesarios.
- Conserva fuentes editables grandes fuera del artefacto web cuando corresponda.
- Verifica que el sitio publicado quede dentro de los límites de tamaño y tiempo de despliegue.

No uses Git LFS como solución automática para un sitio estático sin comprobar que el proveedor de Pages pueda servir esos objetos.

### 15. Alojamiento y despliegue

Configura un despliegue automático y reproducible. Para GitHub Pages:

1. Usa exportación estática.
2. Crea un workflow ejecutado en `main` o `master` y manualmente mediante `workflow_dispatch`.
3. Instala dependencias con `npm ci`.
4. Ejecuta lint, comprobación de tipos y build antes de publicar.
5. Calcula URL pública y subdirectorio desde el repositorio o variables configurables.
6. Prepara el artefacto excluyendo fuentes grandes y duplicados no utilizados.
7. Publica con las acciones oficiales de Pages.
8. Mantén los archivos fuente grandes como Releases cuando resulte pertinente.

Después del despliegue comprueba por HTTP:

- Portada pública.
- Vista docente.
- Al menos una ficha estudiantil por nivel con parámetros URL.
- Scripts y hojas de estilo.
- Imágenes, audios y recursos integrados.
- Descargas de archivos fuente.
- URL que será copiada como iframe para CREA.

No declares terminado el trabajo porque el workflow esté en verde: prueba el sitio servido y registra la URL final.

### 16. Método de trabajo

Sigue estas etapas:

1. Analizar programa, bibliografía y materiales existentes.
2. Proponer progresión de unidades.
3. Validar una única unidad piloto.
4. Implementar sus cuatro actividades y evaluación.
5. Construir y verificar exportaciones.
6. Revisar con el docente usuario.
7. Convertir la unidad validada en patrón.
8. Replicar al resto del nivel.
9. Adaptar luego a otros niveles.
10. Ejecutar auditoría de cobertura curricular.
11. Auditar peso, licencias y enlaces de los recursos.
12. Ejecutar `lint`, comprobación de tipos y compilación de producción.
13. Levantar el servidor local y revisar cada pestaña, unidad, paso, carrusel, ejercicio, audio, glosario, impresión e iframe.
14. Corregir junto con el docente usuario hasta obtener aprobación local explícita.
15. Crear el commit únicamente después de esa aprobación.
16. Publicar el commit con `push` únicamente cuando se solicite.
17. Configurar o ejecutar el despliegue automático.
18. Probar el sitio público y los iframes dentro de la plataforma educativa.
19. Etiquetar una primera versión estable y documentar cambios.

No implementes todas las unidades simultáneamente antes de validar el piloto. No confundas guardar archivos, crear un commit, hacer `push` y desplegar: son etapas diferentes y deben informarse como tales. Durante la fase de revisión, trabaja en `localhost`; no hagas commits, pushes ni despliegues anticipados.

### 17. Criterios de aceptación

La entrega se considera completa cuando:

- La portada docente contiene Fundamentación, Programa, Cómo utilizar, DUA y Unidades.
- Cada pestaña docente muestra solamente su sección y conserva nivel y unidad seleccionados.
- Existe una matriz de cobertura por nivel, tema, propósito, prerrequisito, evidencia y ficha.
- Las unidades siguen una progresión curricular clara y distinguen introducción, profundización y consolidación.
- Todos los temas básicos exigidos por el programa están cubiertos o marcados explícitamente como ampliación o trabajo futuro.
- Cada tema de la secuencia tiene recurso, contenido, ficha docente y propuesta de evaluación.
- La unidad piloto ofrece cuatro actividades cognitivamente diferentes.
- Todas las unidades ofrecen teoría suficiente, ejemplos, casos o situaciones y una secuencia estudiantil clara.
- Las cápsulas muestran una etapa por vez, barra de progreso y controles Anterior/Siguiente.
- Existe un glosario general accesible desde cualquier etapa, con términos de la unidad destacados y ayudas contextuales.
- Las herramientas externas declaran propósito, situación de uso, límites y reglas de cuidado.
- Todas las actividades tienen alternativas contextuales.
- Las tecnologías mencionadas cuentan con ejemplos reales.
- Existe una zona activa con cuatro ejercicios formativos.
- Las opciones se mezclan de forma estable y la respuesta correcta no ocupa sistemáticamente la primera posición.
- Existen preguntas de selección múltiple con más de una respuesta correcta y consignas accesibles.
- Los distractores son plausibles y la retroalimentación explica el razonamiento.
- El constructor selecciona, ordena y configura actividades.
- La planificación, cuadernillo, evaluación y secuencia completa se pueden imprimir o guardar como PDF.
- El iframe representa exactamente la selección docente.
- Las fichas docentes se exportan como HTML autocontenido con referencia curricular, evidencia y evaluación.
- Las URLs embebibles son públicas, estables y funcionan dentro de CREA.
- Los prompts evitan suplantación cognitiva y protegen datos personales.
- La interfaz no presenta desbordamientos ni superposiciones.
- Se verificaron escritorio, móvil, teclado, alto contraste, lectura y reducción de movimiento.
- Se verificó que las pestañas y carruseles no queden cortados ni presenten contenido lateral incoherente.
- El encabezado, la navegación y el pie mantienen el patrón compartido de la colección.
- El pie incluye autoría, cargo, validación confirmada, año, licencia, versión, fuentes, bibliografía y atribuciones.
- No existen enlaces, imágenes, audios o descargas rotas en el artefacto publicado.
- Se auditaron peso total, archivos grandes y duplicaciones.
- El sitio está dentro de los límites del proveedor de alojamiento.
- Existe un workflow automático de despliegue y finaliza correctamente.
- Se comprobaron por HTTP la portada, una ficha por nivel, los assets y las descargas.
- `lint`, comprobación de tipos y compilación de producción finalizan correctamente.
- La versión fue revisada en localhost y aprobada antes del commit.
- Se informó por separado el estado de commit, push y despliegue.

Al terminar, informa brevemente:

- Qué se implementó.
- Qué archivos concentran contenido y comportamiento.
- Qué validaciones se ejecutaron.
- URL pública, repositorio, workflow y versión desplegada.
- Peso final del artefacto y tratamiento de archivos grandes.
- Qué partes permanecen como piloto antes de replicar.

---

## Adaptación rápida para otro nivel

Reemplaza únicamente este bloque antes de usar el prompt:

```text
ÁREA: Ciencias de la Computación y Tecnología Educativa
TEMA: Programación
NIVEL: 7.º u 8.º EBI
TRAMO: [COMPLETAR]
PROGRAMA: [ARCHIVO O ENLACE]
BIBLIOGRAFÍA: [FUENTES]
UNIDAD PILOTO: [TÍTULO]
TECNOLOGÍAS: [SCRATCH, MAKECODE, MICRO:BIT, PYTHON, ETC.]
CONTEXTO: [DISPONIBILIDAD REAL DEL CENTRO]
RECURSOS EXISTENTES: [ARCHIVOS]
REPOSITORIO: [ORGANIZACIÓN/NOMBRE]
URL PÚBLICA: [URL PREVISTA]
PLATAFORMA EDUCATIVA: [CREA U OTRA]
ALOJAMIENTO: [GITHUB PAGES U OTRO]
AUTORÍA: [NOMBRE Y FORMACIÓN]
CARGO: [CARGO E INSTITUCIÓN]
VALIDACIÓN: [ÁREA O INSPECCIÓN, SI FUE CONFIRMADA]
AÑO Y VERSIÓN: [COMPLETAR]
LICENCIA: CC BY-SA 4.0
```

## Adaptación rápida para otro tema

```text
ÁREA: [NUEVA ÁREA]
TEMA: [NUEVO TEMA]
NIVEL: [NIVEL]
TRAMO: [TRAMO]
PROGRAMA: [DOCUMENTO OFICIAL]
BIBLIOGRAFÍA: [FUENTES]
PRODUCTO O DESEMPEÑO ESPERADO: [DESCRIPCIÓN]
UNIDAD PILOTO: [TÍTULO]
HERRAMIENTAS O MATERIALES: [LISTA]
CONTEXTOS DE IMPLEMENTACIÓN: [LISTA]
REPOSITORIO: [ORGANIZACIÓN/NOMBRE]
URL PÚBLICA: [URL PREVISTA]
PLATAFORMA EDUCATIVA: [CREA U OTRA]
ALOJAMIENTO: [GITHUB PAGES U OTRO]
AUTORÍA: [NOMBRE Y FORMACIÓN]
CARGO: [CARGO E INSTITUCIÓN]
VALIDACIÓN: [ÁREA O INSPECCIÓN, SI FUE CONFIRMADA]
AÑO Y VERSIÓN: [COMPLETAR]
LICENCIA: CC BY-SA 4.0
```
