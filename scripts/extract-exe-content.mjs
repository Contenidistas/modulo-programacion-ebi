import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const recursosDir = path.join(root, 'public', 'recursos');
const salida = path.join(root, 'src', 'contenido', 'temasProgramacion.json');

const recursos = [
  'estructuras-de-control',
  'introduccion-programacion',
  'lenguajes-de-programacion',
  'variables',
  'introduccion-javascript',
  'funciones-en-javascript',
  'modulo-programacion-estudiantes',
  'recurso-javascript',
];

const decodeEntities = (texto) =>
  texto
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&Aacute;/g, 'Á')
    .replace(/&Eacute;/g, 'É')
    .replace(/&Iacute;/g, 'Í')
    .replace(/&Oacute;/g, 'Ó')
    .replace(/&Uacute;/g, 'Ú')
    .replace(/&ntilde;/g, 'ñ')
    .replace(/&Ntilde;/g, 'Ñ')
    .replace(/&iquest;/g, '¿')
    .replace(/&iexcl;/g, '¡')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&raquo;/g, '»')
    .replace(/&laquo;/g, '«')
    .replace(/&amp;/g, '&');

const stripTags = (html) => decodeEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

const getMatch = (html, regex) => {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
};

const extractNavOrder = (html) => {
  const nav = getMatch(html, /<nav id="siteNav">([\s\S]*?)<\/nav>/i);
  const links = [...nav.matchAll(/href="([^"]+\.html)"[^>]*>([\s\S]*?)<\/a>/gi)];
  return links.map((link) => ({
    archivo: link[1],
    titulo: stripTags(link[2]),
  }));
};

const cleanMainHtml = (html, slug) => {
  let main = getMatch(html, /<section id="main">([\s\S]*?)<\/section>/i);

  main = main
    .replace(/<header id="nodeDecoration">[\s\S]*?<\/header>/gi, '')
    .replace(/<div id="packageLicense"[\s\S]*?<\/div>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s(?:class|id|style)="[^"]*"/gi, '')
    .replace(/\s(?:onclick|onload|onerror|onmouseover)="[^"]*"/gi, '')
    .replace(/href="([^":#]+\.html)(#[^"]*)?"/gi, 'href="#pagina-$1"')
    .replace(/src="(?!https?:|data:|\/)([^"]+)"/gi, `src="recursos/${slug}/$1"`)
    .replace(/href="(?!https?:|mailto:|#|\/)([^"]+\.(?:png|jpg|jpeg|gif|svg|pdf|elp|mp3|zip))"/gi, `href="recursos/${slug}/$1"`);

  return decodeEntities(main.trim());
};

const extraerRecurso = (slug) => {
  const dir = path.join(recursosDir, slug);
  const indexPath = path.join(dir, 'index.html');
  if (!fs.existsSync(indexPath)) return null;

  const indexHtml = fs.readFileSync(indexPath, 'utf8');
  const titulo = stripTags(getMatch(indexHtml, /<title>([\s\S]*?)<\/title>/i)) || slug;
  const descripcion = stripTags(getMatch(indexHtml, /<meta name="description" content="([^"]*)"/i));
  const nav = extractNavOrder(indexHtml);
  const archivos = nav.length
    ? nav.map((item) => item.archivo)
    : fs.readdirSync(dir).filter((archivo) => archivo.endsWith('.html')).sort();

  const paginas = archivos
    .filter((archivo, index, lista) => lista.indexOf(archivo) === index)
    .map((archivo) => {
      const htmlPath = path.join(dir, archivo);
      if (!fs.existsSync(htmlPath)) return null;
      const html = fs.readFileSync(htmlPath, 'utf8');
      const tituloPagina =
        stripTags(getMatch(html, /<h1 id="nodeTitle">([\s\S]*?)<\/h1>/i)) ||
        nav.find((item) => item.archivo === archivo)?.titulo ||
        archivo.replace(/\.html$/, '');

      return {
        id: archivo.replace(/\.html$/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, ''),
        archivo,
        titulo: tituloPagina,
        html: cleanMainHtml(html, slug),
      };
    })
    .filter(Boolean);

  return {
    id: slug,
    titulo,
    descripcion,
    paginas,
  };
};

const datos = {
  generadoDesde: 'public/recursos',
  recursos: recursos.map(extraerRecurso).filter(Boolean),
};

fs.writeFileSync(salida, `${JSON.stringify(datos, null, 2)}\n`, 'utf8');
console.log(`Contenido extraído: ${datos.recursos.length} recursos -> ${path.relative(root, salida)}`);
