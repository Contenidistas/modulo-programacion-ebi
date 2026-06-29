import { rm } from 'node:fs/promises';
import { join } from 'node:path';

const raizSalida = join(process.cwd(), 'out');
const excluir = [
  join(raizSalida, 'recursos', 'introduccion-javascript', 'IntroduccionJavascript.elp'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'Ciclo for'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'DeclararVariable'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'ideNetbeans'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'ideNetbeans.tscproj'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'LecturaPrompt'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'ManejoDeVariables'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'NuevoProyecto'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'SalidaConAlert'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'SalidaConDocument.Write'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'Switch'),
  join(raizSalida, 'recursos', 'recurso-javascript', 'While'),
];

await Promise.all(excluir.map((ruta) => rm(ruta, { recursive: true, force: true })));
