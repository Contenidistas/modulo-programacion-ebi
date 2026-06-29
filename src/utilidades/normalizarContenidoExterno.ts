const geniallyPorPagina: Record<string, string> = {
  algoritmos: '624d53227f1b0c00111394c2',
};

const crearGenially = (url: string, titulo = 'Contenido interactivo de Genially') => `
  <div class="contenido-externo">
    <iframe src="${url}" title="${titulo}" loading="lazy" allowfullscreen="allowfullscreen"></iframe>
    <p class="contenido-externo-alternativa">Si el contenido no carga, <a href="${url}" target="_blank" rel="noreferrer">abre el Genially en una nueva pestaña</a>.</p>
  </div>`;

export const normalizarContenidoExterno = (htmlOriginal: string, paginaId?: string) => {
  let html = htmlOriginal.replaceAll('https://view.genial.ly/', 'https://view.genially.com/');

  const geniallyId = paginaId ? geniallyPorPagina[paginaId] : undefined;
  if (geniallyId && !html.includes('view.genially.com/')) {
    html = html.replace(/<video\b[\s\S]*?<\/video>/i, '');
    html += crearGenially(`https://view.genially.com/${geniallyId}`, 'Algoritmos');
  }

  return html.replace(
    /<iframe\b([^>]*\bsrc="(https:\/\/view\.genially\.com\/[^"]+)"[^>]*)><\/iframe>/gi,
    (iframe, atributos: string, url: string) => {
      if (iframe.includes('contenido-externo')) return iframe;
      const titulo = atributos.match(/\btitle="([^"]+)"/i)?.[1] ?? 'Contenido interactivo de Genially';
      return crearGenially(url, titulo);
    },
  );
};
