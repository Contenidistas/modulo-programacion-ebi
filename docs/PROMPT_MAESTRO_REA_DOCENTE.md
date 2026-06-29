# Prompt maestro para crear un REA docente

Usa este prompt para replicar la estructura validada en 9.º o para crear desde cero un recurso sobre otra unidad curricular o tema.

---

## Prompt

Actúa como especialista en diseño curricular, tecnología educativa, accesibilidad y desarrollo frontend. Debes diseñar e implementar un **Recurso Educativo Abierto orientado exclusivamente a docentes**, preparado para planificar, adaptar y exportar propuestas para estudiantes.

El portal principal nunca debe presentarse como una plataforma para estudiantes. Los estudiantes acceden únicamente a materiales autocontenidos que el docente previsualiza y exporta como iframe, PDF o cuadernillo.

### 1. Datos de entrada

Antes de implementar, completa o solicita estos datos:

- **Unidad curricular o área:** `[ÁREA]`
- **Tema general:** `[TEMA]`
- **Grado o nivel:** `[NIVEL]`
- **Tramo:** `[TRAMO]`
- **Programa oficial:** `[ARCHIVO, ENLACE O TEXTO]`
- **Bibliografía sugerida:** `[FUENTES]`
- **Cantidad inicial de unidades:** `[CANTIDAD]`
- **Tecnologías disponibles:** `[TECNOLOGÍAS]`
- **Contextos institucionales previstos:** `[CONTEXTO]`
- **Recursos existentes que pueden utilizarse como referencia:** `[PDF, ELP, HTML, IMÁGENES, AUDIOS, ETC.]`

No inventes correspondencias curriculares. Extrae propósitos, contenidos, competencias y criterios de logro de los documentos suministrados. Distingue claramente entre formulaciones del programa y sugerencias didácticas del REA.

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

La interfaz debe ayudar al docente a tomar decisiones. No debe ser un repositorio extenso de tarjetas ni una copia visual de un material previo.

### 3. Arquitectura de la portada docente

Organiza la pantalla principal en cinco secciones limpias y claramente diferenciadas:

#### Fundamentación

- Explica por qué es relevante enseñar el tema.
- Relaciona conocimiento conceptual, práctica, resolución de problemas y reflexión.
- Presenta el error como evidencia para revisar estrategias.
- Considera autonomía, colaboración y diversidad de formas de participación.

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

Cada unidad debe ofrecer al menos cuatro ejercicios interactivos y formativos:

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

### 15. Método de trabajo

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

No implementes todas las unidades simultáneamente antes de validar el piloto.

### 16. Criterios de aceptación

La entrega se considera completa cuando:

- La portada docente contiene Fundamentación, Programa, Cómo utilizar, DUA y Unidades.
- Las unidades siguen una progresión curricular clara.
- La unidad piloto ofrece cuatro actividades cognitivamente diferentes.
- Todas las actividades tienen alternativas contextuales.
- Las tecnologías mencionadas cuentan con ejemplos reales.
- Existe una zona activa con cuatro ejercicios formativos.
- El constructor selecciona, ordena y configura actividades.
- La planificación, cuadernillo, evaluación y secuencia completa se pueden imprimir o guardar como PDF.
- El iframe representa exactamente la selección docente.
- Los prompts evitan suplantación cognitiva y protegen datos personales.
- La interfaz no presenta desbordamientos ni superposiciones.
- Se verificaron escritorio y móvil.
- `lint`, comprobación de tipos y compilación de producción finalizan correctamente.

Al terminar, informa brevemente:

- Qué se implementó.
- Qué archivos concentran contenido y comportamiento.
- Qué validaciones se ejecutaron.
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
```
