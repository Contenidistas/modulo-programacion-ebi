(function () {
  if (window.__reaLectorPagina) return;
  window.__reaLectorPagina = true;

  var synth = window.speechSynthesis;
  if (!synth) return;

  var leyendo = false;
  var boton = document.createElement('button');
  boton.type = 'button';
  boton.className = 'rea-lector-pagina';
  boton.textContent = 'Leer esta pagina';
  boton.setAttribute('aria-label', 'Leer esta pagina en voz alta');

  var estilos = document.createElement('style');
  estilos.textContent = [
    '.rea-lector-pagina{position:fixed;right:18px;bottom:18px;z-index:9999;border:0;border-radius:999px;background:#0069aa;color:#fff;box-shadow:0 10px 24px rgba(15,23,42,.2);cursor:pointer;font:700 14px/1 Arial,Helvetica,sans-serif;padding:12px 16px}',
    '.rea-lector-pagina:hover,.rea-lector-pagina:focus{background:#005487;outline:3px solid rgba(0,105,170,.2);outline-offset:2px}',
    '.rea-lector-pagina.rea-leyendo{background:#be123c}',
    '.rea-lector-pagina.rea-leyendo:hover,.rea-lector-pagina.rea-leyendo:focus{background:#9f1239}',
    '@media print{.rea-lector-pagina{display:none}}',
  ].join('');

  function obtenerTexto() {
    var main = document.querySelector('#main') || document.querySelector('main') || document.body;
    var clon = main.cloneNode(true);
    clon.querySelectorAll('script,style,nav,.noprt,.pagination,.rea-lector-pagina').forEach(function (item) {
      item.remove();
    });
    return clon.textContent.replace(/\s+/g, ' ').trim();
  }

  function detener() {
    synth.cancel();
    leyendo = false;
    boton.classList.remove('rea-leyendo');
    boton.textContent = 'Leer esta pagina';
  }

  function leer() {
    if (leyendo) {
      detener();
      return;
    }

    var texto = obtenerTexto();
    if (!texto) return;

    var titulo = document.querySelector('#nodeTitle, h1');
    var lectura = new SpeechSynthesisUtterance((titulo ? titulo.textContent + '. ' : '') + texto);
    lectura.lang = 'es-UY';
    lectura.rate = 0.95;
    lectura.onend = detener;
    lectura.onerror = detener;
    synth.cancel();
    synth.speak(lectura);
    leyendo = true;
    boton.classList.add('rea-leyendo');
    boton.textContent = 'Detener lectura';
  }

  boton.addEventListener('click', leer);
  document.head.appendChild(estilos);
  document.addEventListener('DOMContentLoaded', function () {
    document.body.appendChild(boton);
  });
})();
