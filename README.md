# Modulo Programacion EBI

Guia docente curricular para docentes de Ciencias de la Computacion de Uruguay.

El modulo organiza el tema Programacion segun los programas EBI de 7mo, 8vo y 9no. Cada tema cuenta con una ficha docente embebible en CREA, con proposito curricular, contenidos del programa, actividad sugerida, evidencia y evaluacion formativa. Tambien integra materiales de apoyo, desafios interactivos, vista alumno y exportacion de sectores reutilizables.

## Desarrollo local

```bash
npm install
npm run dev
```

Luego abrir:

```text
http://127.0.0.1:3000/
```

Ejemplo de ficha por tema para insertar o revisar:

```text
http://127.0.0.1:3000/?grado=8vo&interfaz=alumno&sector=recurso&recurso=datos-tipos-operadores
```

## Desplegar en GitHub Pages

El proyecto esta configurado con `output: "export"`. El workflow `.github/workflows/deploy-pages.yml` ejecuta lint, construye la version estatica y la publica automáticamente al enviar cambios a `master` o `main`.

La URL y el subdirectorio se calculan desde el repositorio. Por ejemplo, un repositorio `Contenidistas/modulo-programacion-ebi` se publica en:

```text
https://contenidistas.github.io/modulo-programacion-ebi/
```

Pasos iniciales:

```bash
gh auth login -h github.com
gh repo create modulo-programacion-ebi --public --source=. --remote=origin --push
```

En GitHub, abrir `Settings > Pages` y seleccionar `GitHub Actions` como fuente. Los siguientes `push` desplegarán automáticamente.

Para comprobar localmente un despliegue bajo subdirectorio en PowerShell:

```powershell
$env:NEXT_PUBLIC_REA_BASE_PATH='/modulo-programacion-ebi'
$env:NEXT_PUBLIC_REA_PUBLIC_URL='https://contenidistas.github.io/modulo-programacion-ebi/'
npm run build
```

`NEXT_PUBLIC_REA_PUBLIC_URL` define la URL copiada en los iframes para CREA y `NEXT_PUBLIC_REA_BASE_PATH` ajusta tanto los recursos como los assets internos de Next.js.

## Estructura del recurso

- `src/contenido/escrutinio.json`: contenido pedagogico, grados, actividades, ejercicios y metadatos de portal.
- `src/contenido/fichasDocentesProgramacion.json`: fichas docentes curriculares por grado y tema, basadas en los programas EBI.
- `app/page.tsx`: vista principal docente/alumno y generacion de iframe/fichas.
- `src/componentes/ZonaActiva.tsx`: desafios interactivos.
- `public/`: imagenes y gifs usados en las guias por nivel.
- `public/recursos/`: recursos externos integrados como paquetes estaticos, por ejemplo eXeLearning.
