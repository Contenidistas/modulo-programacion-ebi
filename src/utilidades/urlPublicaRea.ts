export const urlPublicaRea = (
  process.env.NEXT_PUBLIC_REA_PUBLIC_URL ??
  'https://contenidistas.github.io/modulo-programacion-ebi/'
).replace(/\/$/, '');

export const construirUrlRea = (parametros: URLSearchParams, publica = false) =>
  `${publica ? urlPublicaRea : ''}/?${parametros.toString()}`;
