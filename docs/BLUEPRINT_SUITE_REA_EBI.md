# Matriz Arquitectónica y Hoja de Ruta de Cobertura Curricular
## Suite de Recursos Educativos Abiertos (REA) · Ciencias de la Computación (7°, 8° y 9° EBI)
**Autor:** Prof. Esp. Santiago Hernández · Proyecto EDyTIC · Uruguay  
**Marcos de referencia:** Programas Oficiales de Ciencias de la Computación (ANEP 2023/2024), DUA (CAST 2024), Estándar SCORM 1.2 (Ceibal / CREA / Schoology).

---

## 1. La Plantilla Estándar Unificada (Blueprint Técnico y Pedagógico)

Cada nuevo módulo de la suite mantendrá de manera idéntica el diseño visual, la accesibilidad, el flujo pedagógico y la doble vía de distribución (Web abierta en GitHub Pages + Paquete SCORM 1.2 para CREA).

### Componentes Inmutables de la Plantilla:
1. **Cabecera Accesible Unificada:**
   - Logotipo institucional de EDyTIC + Nombre del Módulo.
   - Botón `[⬇ Descargar SCORM]` (generación local con `JSZip` de 25-30 MB).
   - Botón `[A+ Texto]` (ampliación tipográfica fluida).
   - Botón `[◐ Contraste]` (paleta blanco/negro de alto contraste WCAG AAA).
   - Botón `[♫ Escuchar]` (Web Speech API para lectura auditiva con acento local `es-UY`).
2. **Barra Lateral Fija de Navegación (Sticky Index):**
   - Numeración progresiva de secciones con indicador de estado SCORM/Local.
   - Navegación fluida por anclajes (`scroll-behavior: smooth`).
3. **Sección de Laboratorio Interactivo:**
   - Panel de control en tiempo real con selector de nivel (7°, 8° y 9° EBI).
   - Inspector de memoria (variables, contadores y acumuladores).
   - Trazador de código reactivo que resalta la línea en ejecución.
4. **Cuestionario Autocorregido Formativo:**
   - Preguntas de opción múltiple sin penalización por reintento.
   - Explicaciones pedagógicas detalladas de acierto y de error.
   - Sincronización transparente con la libreta de calificaciones de CREA (`cmi.core.score.raw`).
5. **Doble Despliegue Automatizado:**
   - Archivo `.nojekyll` y workflow GitHub Actions `.github/workflows/deploy-pages.yml`.
   - Manifiesto normativo `imsmanifest.xml` con declaración explícita de archivos.
   - Script de respaldo Python `build_scorm_zip.py`.

---

## 2. Mapa de Cobertura Curricular: Suite Completa de Recursos

Para brindar una **cobertura integral del 100%** de los contenidos de los programas de **7°, 8° y 9° EBI** de ANEP, se proyecta la creación de **6 módulos REA complementarios**:

### MÓDULO 1: Programación y Algoritmia (¡Completado y Desplegado!)
- **Eje:** Algoritmia, programación, robótica y problemas computacionales (22-24 semanas).
- **Caso situado:** Sistema de votación escolar (Individual vs Grupal).
- **Tecnologías:** Pseudocódigo, Scratch, micro:bit MakeCode, Python, JavaScript, DOM.

### MÓDULO 2: Ciudadanía Digital, Huella en Línea y Ética de la IA
- **Ejes temáticos:** Alfabetización y Ciudadanía Digital (7° y 8° EBI).
- **Caso situado:** *¿Qué sabe internet sobre mí? La huella digital invisible y la viralización de contenidos.*
- **Contenidos clave:** Huella digital activa y pasiva, Ley 18.331 (URCDP / AGESIC), fake news, deepfakes, sesgos algorítmicos, obsolescencia programada y basura electrónica (e-waste).
- **Simulador interactivo:** Auditor de huella digital y permisos de aplicaciones + Desafío visual de detección de deepfakes y sesgos de IA.

### MÓDULO 3: Ciberseguridad y Prevención de Delitos Informáticos
- **Ejes temáticos:** Ciberseguridad y Alfabetización Digital (8° y 9° EBI).
- **Caso situado:** *Alerta en la escuela: Detectando intentos de robo de identidad y ataques en la red escolar.*
- **Contenidos clave:** Gestión de credenciales, autenticación 2FA, ataques informáticos (phishing, ransomware, ingeniería social), protocolo HTTPS y seguridad en la nube.
- **Simulador interactivo:** Analizador interactivo de correos fraudulentos (phishing) + Calculadora de fuerza y entropía de contraseñas contra ataques de fuerza bruta.

### MÓDULO 4: Arquitectura de Sistemas, Redes e Infraestructura de Internet
- **Ejes temáticos:** Arquitectura de dispositivos, redes e Internet (7° y 8° EBI).
- **Caso situado:** *El viaje de un mensaje: ¿Qué ocurre en el mundo en los dos segundos que tardo en enviar un WhatsApp?*
- **Contenidos clave:** Modelo Entrada-Procesamiento-Almacenamiento-Salida (E-P-A-S), interacción Hardware y Software, Sistema Operativo, cables submarinos, IPs, servidores DNS, routers, switches y transmisión por paquetes TCP/IP.
- **Simulador interactivo:** Simulador interactivo de armado de red local y división/enrutamiento de paquetes TCP/IP.

### MÓDULO 5: Computación Física, Robótica Tangible e Internet de las Cosas (IoT)
- **Ejes temáticos:** Robótica educativa y Tecnologías Emergentes (8° y 9° EBI).
- **Caso situado:** *Diseño de domótica escolar: Estación meteorológica y sistema de alarma inteligente con micro:bit.*
- **Contenidos clave:** Sensores (luz, temperatura, ultrasonido), actuadores (LEDs, servomotores, zumbador), microcontroladores, telemetría IoT y procesamiento local vs. en la nube.
- **Simulador interactivo:** Emulador de sensores ambientales y respuesta automatizada de actuadores.

### MÓDULO 6: Procesamiento de Información, Estructuras de Datos y Bases de Datos
- **Ejes temáticos:** Procesamiento de información (7°, 8° y 9° EBI).
- **Caso situado:** *Gestión de la biblioteca escolar o inventario de un videojuego: ¿Por qué una planilla de cálculo ya no alcanza?*
- **Contenidos clave:** Lógica binaria (0/1), unidades de información (bit, byte, GB), mapas de bits vs vectoriales, tablas relacionales, campos, registros, claves primarias, redundancia, validación y consultas.
- **Simulador interactivo:** Diseñador visual de consultas y filtros de base de datos + Cuadrícula interactiva de codificación binaria de imágenes en píxeles.
