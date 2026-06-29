export const urlPublicaRea = (
  process.env.NEXT_PUBLIC_REA_PUBLIC_URL ??
  'https://contenidistas.github.io/sitio_principal_ciencias_de_la_computacion/modulos/programacion-ebi/'
).replace(/\/$/, '');

export const construirUrlRea = (parametros: URLSearchParams, publica = false) =>
  `${publica ? urlPublicaRea : ''}/?${parametros.toString()}`;
