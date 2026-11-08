# Módulo Integral de Programación · Ciencias de la Computación
### Educación Básica Integrada (7°, 8° y 9° EBI) · ANEP / Ceibal · Uruguay
**Autor:** Prof. Esp. Santiago Hernández  
**Proyecto:** EDyTIC (Educación y Tecnologías de la Información y Comunicación)  
**Licencia:** [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es)

---

## 📌 Descripción del recurso
Este recurso educativo abierto (REA) interactivo unifica, profundiza y articula los saberes esenciales de programación y pensamiento computacional establecidos en los programas oficiales de **Ciencias de la Computación de 7°, 8° y 9° EBI** de la Administración Nacional de Educación Pública (ANEP).

El eje central didáctico se estructura a partir de un **caso situado de la vida real**: el diseño e implementación de un *Sistema de Votación Democrática en el Aula (Trabajo Individual vs. Trabajo Grupal)*, modelado de manera progresiva a través de múltiples paradigmas y tecnologías:
1. **Algoritmia y Pseudocódigo:** Descomposición lógica, variables enteras/caracter, acumuladores y condicionales.
2. **Programación por Bloques con Scratch (7° y 8° EBI):** Sprites interactivos, eventos de clic, disfraces y variables visibles en pantalla.
3. **Robótica Educativa y Computación Física con MakeCode / micro:bit (7°, 8° y 9° EBI):** Botones físicos A y B, botón simultáneo A+B y despliegue del resultado en la matriz de 25 LEDs de la placa micro:bit de Ceibal.
4. **Programación Textual con Python y JavaScript (8° y 9° EBI):** Transición de bloques a código real, funciones modulares con parámetros y retorno, depuración en consola (con video Camtasia) y desarrollo web interactivo con manipulación del DOM (con video Camtasia).
5. **Laboratorio Interactivo en Vivo:** Simulador reactivo de votación escolar con selector de modo (7°, 8° y 9°), inspector de variables en tiempo real y sincronización de código línea a línea.
6. **Inclusión y Diseño Universal para el Aprendizaje (DUA):** Audios auténticos grabados por el profesor, textos facilitados, selector de tamaño de fuente, modo de alto contraste y narración por voz.
7. **Evaluación Formativa Integrada:** Cuestionario de 6 preguntas con retroalimentación inmediata y comunicación automática con la libreta de calificaciones de CREA vía SCORM 1.2.

---

## 🎯 Alineación Curricular Detallada por Grado

| Eje Temático | 7° EBI (Tramo 5) | 8° EBI (Tramo 6) | 9° EBI (Tramo 6) |
| :--- | :--- | :--- | :--- |
| **Algoritmia y Programación** | Pensamiento computacional (descomposición, patrones, abstracción, algoritmos). Programación en bloques (Scratch, MakeCode). Variables, acumuladores y condicional simple (`si-sino`). | Anidación de estructuras selectivas e iterativas (detección de empates, bucles para $N$ alumnos). Transición de bloques a textual. Pruebas y depuración incremental. | Programación textual formal (Python, JavaScript). Funciones y procedimientos con parámetros y retorno. Fases del software, testing formal y control de versiones. |
| **Robótica y Dispositivos** | Manipulación de hardware tangible (placa micro:bit, botones y pantalla LED). Entorno programado vs mundo físico. | Sensores y actuadores físicos. Comunicación básica cliente-servidor (envío de datos en paquetes, IP). | Internet de las cosas (IoT), sistemas de alarma, procesamiento local vs en la nube (cloud). |
| **Procesamiento de Datos** | Representación binaria, bits/bytes, noción inicial de base de datos en aplicaciones cotidianas. | Fuentes de datos activas vs pasivas. Redundancia, inconsistencia y modelado inicial de tablas de datos. | Datos estructurados vs no estructurados. Tablas, campos, registros, claves. Validación rigurosa de entradas y visualización. |
| **Ciudadanía Digital e IA** | Identidad y huella digital, Ley 18.331 (URCDP/AGESIC). Historia de la computación (Ada Lovelace). Nociones de IA y sesgos. Basura electrónica. | Ciberseguridad: gestión de credenciales, autenticación, phishing, ransomware. Sesgos en contenidos e IA. | Ética en el desarrollo de software. Accesibilidad web (W3C/WCAG 2.1). Modelos de Machine Learning aplicados. |

---

## 🚀 Despliegue en GitHub Pages (Acceso Web Público)

El recurso está optimizado como una aplicación web estática cero dependencias, lista para alojarse en GitHub Pages:

1. **Crear repositorio en GitHub:**
   Crea un nuevo repositorio en tu cuenta de GitHub (ejemplo: `recurso-programacion`).
2. **Subir los archivos:**
   Sube todo el contenido de este directorio (asegurándote de incluir `.nojekyll`, `index.html` y la carpeta `assets/`).
3. **Activar GitHub Pages:**
   - En tu repositorio de GitHub, dirígete a **Settings** > **Pages**.
   - En la sección **Build and deployment** > **Branch**, selecciona `main` (o `master`) y la carpeta `/(root)`.
   - Haz clic en **Save**.
4. En unos segundos, tu sitio estará accesible en una URL pública:
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`

---

## 📦 Integración en Plataforma CREA (Schoology / Ceibal) vía SCORM 1.2

El recurso incluye compatibilidad total con **SCORM 1.2**:

### Opción A: Descarga en un clic desde la web
Tanto docentes como estudiantes pueden hacer clic en el botón **"Descargar paquete SCORM"** presente en la barra superior o en la sección de exportación de la web. La aplicación generará y descargará automáticamente el archivo ZIP listo para el LMS.

### Opción B: Uso del archivo precompilado
En la raíz de este proyecto ya se encuentra generado el paquete:
👉 `scorm-modulo-programacion.zip` (~27 MB, incluye todos los recursos, audios y videos).

### Pasos para subir a CREA:
1. Ingresa a tu curso en [CREA (Ceibal)](https://crea.ceibal.edu.uy/).
2. Haz clic en **Agregar contenido** > **Agregar archivo / enlace / herramienta externa**.
3. Selecciona la opción **Paquete SCORM**.
4. Haz clic en **Adjuntar archivo** y selecciona el archivo `scorm-modulo-programacion.zip`.
5. En la configuración del paquete en CREA:
   - Habilita la **Calificación** si deseas que el resultado del cuestionario formativo se registre en la libreta.
   - Puntuación máxima: `100`.
   - Estado de aprobación: `passed` (70% o superior).
6. Haz clic en **Guardar cambios**. ¡El módulo quedará integrado y funcionando dentro de CREA con seguimiento de avance y nota!

---

## 📂 Estructura de archivos del proyecto

```text
├── index.html                  # Aplicación web interactiva completa (SPA)
├── imsmanifest.xml             # Manifiesto normativo SCORM 1.2 para CREA
├── scorm-modulo-programacion.zip # Paquete SCORM 1.2 listo para subir a CREA
├── build_scorm_zip.py          # Script de automatización para generar el paquete ZIP
├── MAPA_CURRICULAR.md          # Mapa de contenidos y rúbricas según ANEP
├── README.md                   # Documentación técnica y pedagógica
├── .nojekyll                   # Evita que GitHub Pages ignore subdirectorios
└── assets/
    ├── styles.css              # Estilos responsivos, accesibles (DUA y WCAG AAA)
    ├── main.js                 # Lógica interactiva, simuladores, DUA y evaluación
    ├── scorm.js                # Adaptador API SCORM 1.2 para CREA/Schoology
    ├── jszip.min.js            # Biblioteca offline para generación de ZIP en cliente
    ├── logo-edytic.jpg         # Isologo oficial del proyecto EDyTIC
    ├── audio/                  # Grabaciones de voz originales del Prof. Santiago Hernández
    │   ├── 01-introduccion.webm
    │   ├── 02-explicacion-actividad.webm
    │   ├── 03-algoritmo-inicial.webm
    │   ├── 04-programa-scratch.webm
    │   └── 05-programa-makecode.webm
    └── media/                  # Videos y capturas técnicas de alta definición
        ├── consola.mp4         # Demostración en video: ejecución en terminal
        ├── vista1.mp4          # Demostración en video: integración en la web (DOM)
        ├── SolucionInicial.png # Diagrama de solución inicial del autor
        ├── consola_poster.png  # Portada del video de consola
        ├── vista1_poster.png   # Portada del video web
        └── scratch_* / makecode_* / algoritmo_* # Keyframes en alta resolución
```

---

## 🧑‍🏫 Créditos y Agradecimientos
- **Prof. Esp. Santiago Hernández** (Autor, diseño pedagógico, locución y programación).
- **ANEP - Educación Secundaria / Ceibal** (Marcos curriculares de Ciencias de la Computación 2023/2024).
- **CAST** (Directrices de Diseño Universal para el Aprendizaje - DUA 3.0).
