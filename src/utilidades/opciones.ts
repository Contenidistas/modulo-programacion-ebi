export type OpcionOrdenada = {
  texto: string;
  indiceOriginal: number;
};

const hashTexto = (texto: string) => {
  let hash = 2166136261;

  for (let indice = 0; indice < texto.length; indice += 1) {
    hash ^= texto.charCodeAt(indice);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
};

export const mezclarOpciones = (id: string, opciones: string[]): OpcionOrdenada[] => {
  const mezcladas = opciones.map((texto, indiceOriginal) => ({ texto, indiceOriginal }));
  let semilla = hashTexto(id);

  for (let indice = mezcladas.length - 1; indice > 0; indice -= 1) {
    semilla = (Math.imul(semilla, 1664525) + 1013904223) >>> 0;
    const destino = semilla % (indice + 1);
    [mezcladas[indice], mezcladas[destino]] = [mezcladas[destino], mezcladas[indice]];
  }

  return mezcladas;
};
