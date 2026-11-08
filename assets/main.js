(function () {
  'use strict';

  // Helper selectors
  const $ = (id) => document.getElementById(id);
  const on = (el, event, fn) => { if (el) el.addEventListener(event, fn); };

  // Storage Keys
  const STATE_KEY = 'edytic-prog-estado-v2';
  const PREFS_KEY = 'edytic-prog-preferencias-v2';

  function readStore(k) {
    try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (_) { return null; }
  }
  function writeStore(k, obj) {
    try { localStorage.setItem(k, JSON.stringify(obj)); } catch (_) {}
  }

  // State
  let state = {
    location: '#inicio',
    score: null,
    quizDone: false,
    quizAnswers: {}
  };
  let preferences = readStore(PREFS_KEY) || { large: false, contrast: false };

  // Accessibility Announcer
  function announce(msg) {
    const el = $('screenreader-status');
    if (el) el.textContent = msg;
  }

  // Accessibility Toggles
  function applyPrefs() {
    document.body.classList.toggle('large-text', Boolean(preferences.large));
    document.body.classList.toggle('high-contrast', Boolean(preferences.contrast));
    const sizeBtn = $('size-toggle');
    const contrastBtn = $('contrast-toggle');
    if (sizeBtn) sizeBtn.setAttribute('aria-pressed', String(Boolean(preferences.large)));
    if (contrastBtn) contrastBtn.setAttribute('aria-pressed', String(Boolean(preferences.contrast)));
  }

  on($('size-toggle'), 'click', () => {
    preferences.large = !preferences.large;
    writeStore(PREFS_KEY, preferences);
    applyPrefs();
    announce(preferences.large ? 'Texto aumentado activado.' : 'Texto en tamaño estándar.');
  });

  on($('contrast-toggle'), 'click', () => {
    preferences.contrast = !preferences.contrast;
    writeStore(PREFS_KEY, preferences);
    applyPrefs();
    announce(preferences.contrast ? 'Modo de alto contraste activado.' : 'Modo de alto contraste desactivado.');
  });

  // Text-To-Speech (Web Speech API)
  let synth = window.speechSynthesis;
  let speechUtterance = null;
  let isSpeaking = false;

  function stopSpeech() {
    if (synth) {
      synth.cancel();
      isSpeaking = false;
      const btn = $('narrate-toggle');
      if (btn) btn.setAttribute('aria-pressed', 'false');
    }
  }

  function startSpeech() {
    if (!synth) {
      alert('Tu navegador no admite la síntesis de voz automática. Todo el contenido está disponible por escrito.');
      return;
    }
    stopSpeech();
    const mainEl = $('contenido');
    if (!mainEl) return;
    const textToRead = mainEl.innerText.slice(0, 12000);
    speechUtterance = new SpeechSynthesisUtterance(textToRead);
    speechUtterance.lang = 'es-UY';
    speechUtterance.rate = 1.0;
    speechUtterance.onend = () => {
      isSpeaking = false;
      const btn = $('narrate-toggle');
      if (btn) btn.setAttribute('aria-pressed', 'false');
      announce('Lectura de voz finalizada.');
    };
    speechUtterance.onerror = () => {
      isSpeaking = false;
      const btn = $('narrate-toggle');
      if (btn) btn.setAttribute('aria-pressed', 'false');
    };
    synth.speak(speechUtterance);
    isSpeaking = true;
    const btn = $('narrate-toggle');
    if (btn) btn.setAttribute('aria-pressed', 'true');
    announce('Lectura en voz alta iniciada.');
  }

  on($('narrate-toggle'), 'click', () => {
    if (isSpeaking) {
      stopSpeech();
    } else {
      startSpeech();
    }
  });

  // SCORM & Local State Lifecycle
  function saveState() {
    writeStore(STATE_KEY, state);
    if (window.SCORMBridge) {
      window.SCORMBridge.save(state);
    }
  }

  function initState() {
    if (window.SCORMBridge) window.SCORMBridge.init();
    const old = window.SCORMBridge && window.SCORMBridge.resume();
    const local = readStore(STATE_KEY);
    state = old || local || state;

    const trackingLabel = $('tracking-label');
    if (trackingLabel) {
      if (window.SCORMBridge && window.SCORMBridge.getMode() === 'scorm') {
        trackingLabel.textContent = 'En CREA (SCORM 1.2): progreso y calificación sincronizados con la libreta docente.';
      } else {
        trackingLabel.textContent = 'En GitHub / Web: progreso guardado en este dispositivo (sin envío de calificaciones).';
      }
    }

    if (state.score != null && state.quizDone) {
      restoreQuizAnswers(state.quizAnswers, state.score);
    }
  }

  // Location / Nav syncing
  function setLocation() {
    const current = location.hash || '#inicio';
    state.location = current;
    document.querySelectorAll('.nav-list a').forEach((a) => {
      a.setAttribute('aria-current', a.hash === current ? 'location' : 'false');
    });
    saveState();
  }
  window.addEventListener('hashchange', setLocation);

  // ==========================================
  // SIMULADOR INTERACTIVO DE VOTACIÓN (EL CASO CENTRAL)
  // ==========================================
  let simState = {
    mode: '7', // '7' (básico), '8' (desempate y bucle), '9' (modular con funciones y registro)
    votosA: 0,
    votosB: 0,
    history: [],
    limite: 25,
    evaluado: false
  };

  function updateSimulatorUI() {
    const countA = $('sim-count-a');
    const countB = $('sim-count-b');
    const totalEl = $('sim-total');
    const diffEl = $('sim-diff');
    const lastVoteEl = $('sim-last-vote');
    const total = simState.votosA + simState.votosB;
    const diff = Math.abs(simState.votosA - simState.votosB);

    if (countA) countA.textContent = String(simState.votosA);
    if (countB) countB.textContent = String(simState.votosB);
    if (totalEl) totalEl.textContent = String(total);
    if (diffEl) diffEl.textContent = String(diff);
    if (lastVoteEl) {
      lastVoteEl.textContent = simState.history.length > 0
        ? simState.history[simState.history.length - 1].opcion
        : 'Ninguno';
    }

    // Microbit LED matrix representation
    updateMicrobitLEDs();

    // Check limit in 8th and 9th mode
    const btnVoteA = $('btn-vote-a');
    const btnVoteB = $('btn-vote-b');
    if (simState.mode !== '7' && total >= simState.limite) {
      if (btnVoteA) btnVoteA.disabled = true;
      if (btnVoteB) btnVoteB.disabled = true;
      announce('Se ha alcanzado el límite total de la clase (' + simState.limite + ' estudiantes).');
    } else {
      if (btnVoteA) btnVoteA.disabled = false;
      if (btnVoteB) btnVoteB.disabled = false;
    }
  }

  function highlightSimCode(lineId) {
    document.querySelectorAll('.sim-code-sync .code-line').forEach((el) => {
      el.classList.remove('active');
    });
    const target = $(lineId);
    if (target) target.classList.add('active');
  }

  function addVote(opcion) {
    if (opcion === 'A') {
      simState.votosA++;
      highlightSimCode('sync-line-add-a');
    } else if (opcion === 'B') {
      simState.votosB++;
      highlightSimCode('sync-line-add-b');
    }
    simState.history.push({
      id: simState.history.length + 1,
      opcion: opcion,
      timestamp: new Date().toLocaleTimeString('es-UY')
    });
    simState.evaluado = false;
    const banner = $('sim-output-banner');
    if (banner) {
      banner.style.display = 'none';
      banner.className = 'sim-output-banner';
    }
    updateSimulatorUI();
    announce('Voto registrado para Opción ' + opcion + '. Votos A: ' + simState.votosA + ', Votos B: ' + simState.votosB);
  }

  function evaluateVotes() {
    const banner = $('sim-output-banner');
    if (!banner) return;
    simState.evaluado = true;
    const a = simState.votosA;
    const b = simState.votosB;

    if (simState.mode === '7') {
      // 7° EBI: simple if-else
      highlightSimCode('sync-line-eval');
      if (a > b) {
        banner.className = 'sim-output-banner winner-a';
        banner.textContent = '🏆 ¡Opción A es la ganadora! (Trabajo Individual con ' + a + ' votos contra ' + b + ')';
      } else {
        banner.className = 'sim-output-banner winner-b';
        banner.textContent = '🏆 ¡Opción B es la ganadora! (Trabajo Grupal con ' + b + ' votos contra ' + a + ')';
      }
    } else {
      // 8° and 9° EBI: nested if-else with tie detection
      highlightSimCode('sync-line-eval');
      if (a > b) {
        banner.className = 'sim-output-banner winner-a';
        banner.textContent = '🏆 ¡Opción A es la ganadora! (Trabajo Individual: ' + a + ' votos vs ' + b + ')';
      } else if (b > a) {
        banner.className = 'sim-output-banner winner-b';
        banner.textContent = '🏆 ¡Opción B es la ganadora! (Trabajo Grupal: ' + b + ' votos vs ' + a + ')';
      } else {
        banner.className = 'sim-output-banner tie';
        banner.textContent = '⚖️ ¡Empate exacto! Ambas opciones tienen ' + a + ' votos. Se requiere un nuevo voto de desempate.';
      }
    }
    banner.style.display = 'block';
    announce(banner.textContent);
  }

  function resetSimulator() {
    simState.votosA = 0;
    simState.votosB = 0;
    simState.history = [];
    simState.evaluado = false;
    const banner = $('sim-output-banner');
    if (banner) {
      banner.style.display = 'none';
      banner.className = 'sim-output-banner';
    }
    highlightSimCode('sync-line-init');
    updateSimulatorUI();
    announce('Simulador de votación reiniciado.');
  }

  function setSimMode(m) {
    simState.mode = m;
    document.querySelectorAll('.mode-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-mode') === m);
    });
    const info7 = $('mode-info-7');
    const info8 = $('mode-info-8');
    const info9 = $('mode-info-9');
    if (info7) info7.hidden = m !== '7';
    if (info8) info8.hidden = m !== '8';
    if (info9) info9.hidden = m !== '9';
    resetSimulator();
  }

  // Micro:bit LED simulation
  function updateMicrobitLEDs() {
    const pixels = document.querySelectorAll('.led-pixel');
    if (!pixels || pixels.length < 25) return;
    pixels.forEach((p) => p.classList.remove('on'));

    // If evaluated, show letter A or B or = (tie)
    if (simState.evaluado) {
      if (simState.votosA > simState.votosB) {
        // Draw 'A'
        [2, 6, 8, 10, 11, 12, 13, 14, 15, 19, 20, 24].forEach((idx) => {
          if (pixels[idx]) pixels[idx].classList.add('on');
        });
      } else if (simState.votosB > simState.votosA) {
        // Draw 'B'
        [0, 1, 2, 3, 5, 9, 10, 11, 12, 13, 15, 19, 20, 21, 22, 23].forEach((idx) => {
          if (pixels[idx]) pixels[idx].classList.add('on');
        });
      } else {
        // Draw '=' (tie)
        [6, 7, 8, 16, 17, 18].forEach((idx) => {
          if (pixels[idx]) pixels[idx].classList.add('on');
        });
      }
    } else {
      // Just indicate waiting with a center pulse or dot
      if (pixels[12]) pixels[12].classList.add('on');
    }
  }

  on($('btn-vote-a'), 'click', () => addVote('A'));
  on($('btn-vote-b'), 'click', () => addVote('B'));
  on($('btn-result'), 'click', evaluateVotes);
  on($('btn-reset-sim'), 'click', resetSimulator);

  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      setSimMode(btn.getAttribute('data-mode'));
    });
  });

  // Code Sync View Tabbar in Simulator
  const syncTabs = document.querySelectorAll('[data-sync-lang]');
  syncTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const lang = tab.getAttribute('data-sync-lang');
      syncTabs.forEach((t) => {
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        t.tabIndex = t === tab ? 0 : -1;
      });
      document.querySelectorAll('.sim-code-panel').forEach((p) => {
        p.hidden = p.getAttribute('data-panel-lang') !== lang;
      });
    });
  });

  // ==========================================
  // LABORATORIO DE CONDICIONES (TEMPERATURA)
  // ==========================================
  function setLab(value) {
    const temp = Math.max(0, Math.min(40, Math.round(Number(value) || 0)));
    const range = $('temp-range');
    const valDisplay = $('temp-value');
    if (range) range.value = String(temp);
    if (valDisplay) valDisplay.textContent = temp + ' °C';

    const hot = temp >= 30;
    const msg = $('lab-message');
    const exp = $('lab-explain');
    const rowHot = $('line-hot');
    const rowCold = $('line-cold');
    const rowIf = $('line-if');

    if (hot) {
      if (msg) msg.textContent = '¡Llevá agua extra y protector solar!';
      if (exp) exp.textContent = temp + ' °C es mayor o igual que 30: se cumple la condición "SI", por lo que se ejecuta la primera rama.';
      if (rowHot) rowHot.classList.add('active');
      if (rowCold) rowCold.classList.remove('active');
    } else {
      if (msg) msg.textContent = 'Hidratate normalmente durante el día.';
      if (exp) exp.textContent = temp + ' °C es menor que 30: no se cumple la condición "SI", por lo que se ejecuta la alternativa "SINO".';
      if (rowHot) rowHot.classList.remove('active');
      if (rowCold) rowCold.classList.add('active');
    }
    if (rowIf) rowIf.classList.add('active');
  }

  on($('temp-range'), 'input', (e) => setLab(e.target.value));

  // ==========================================
  // TABS DE COMPARACIÓN DE LENGUAJES
  // ==========================================
  const langTabs = document.querySelectorAll('.tabbar button[data-lang]');
  langTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-lang');
      langTabs.forEach((t) => {
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
        t.tabIndex = t === tab ? 0 : -1;
      });
      document.querySelectorAll('.language-content').forEach((panel) => {
        panel.hidden = panel.id !== 'panel-' + target;
      });
    });
  });

  // ==========================================
  // EVALUACIÓN FORMATIVA (6 PREGUNTAS CLAVE 7°, 8° Y 9° EBI)
  // ==========================================
  const correct = {
    q1: 'a',
    q2: 'b',
    q3: 'b',
    q4: 'a',
    q5: 'c',
    q6: 'a'
  };

  const explanations = {
    q1: '¡Correcto! El algoritmo es la secuencia lógica y abstracta de pasos para resolver el problema; el programa es la implementación de esas instrucciones en un lenguaje concreto ejecutable por una computadora.',
    q2: '¡Exacto! En 1843, Ada Lovelace publicó notas con el primer algoritmo computacional concebido para ser procesado por la Máquina Analítica de Charles Babbage, siendo reconocida como la primera programadora.',
    q3: '¡Muy bien! opcionA = opcionA + 1 toma el valor anterior de la variable, le suma uno y lo vuelve a guardar. En ciencias de la computación esto se denomina acumulador o contador.',
    q4: '¡Correcto! Para contemplar los tres casos posibles (gana A, gana B o empatan), se requiere un condicional anidado: si a > b entonces gana A, sino si b > a entonces gana B, sino ¡Empate!.',
    q5: '¡Excelente! Modularizar en funciones divide el programa en unidades con nombre, parámetros y retorno que pueden probarse, reutilizarse y mantenerse con mayor facilidad, reduciendo duplicación de código.',
    q6: '¡Totalmente! Las Ciencias de la Computación no son neutras: requieren reflexionar sobre la privacidad de datos (Ley 18.331), sesgos en modelos de IA y el impacto ambiental de los dispositivos (obsolescencia).'
  };

  const errorExplanations = {
    q1: 'Revisá: un algoritmo describe una estrategia de pasos lógica e independiente del lenguaje; el programa es la codificación concreta que la máquina puede ejecutar.',
    q2: 'Revisá: Ada Lovelace creó en 1843 el primer algoritmo publicado para la Máquina Analítica de Babbage.',
    q3: 'Revisá: En programación, "opcionA = opcionA + 1" no es una igualdad algebraica, sino una reasignación: suma 1 al contenido previo de la variable (acumulador).',
    q4: 'Revisá: Si solo usamos un "si-sino" simple, cuando los votos son iguales el programa declarará erróneamente ganadora a una de las dos opciones. Para resolver empates se necesita un condicional anidado.',
    q5: 'Revisá: Las funciones permiten modularizar, recibir argumentos, devolver un resultado y reutilizar lógica en cualquier parte del sistema.',
    q6: 'Revisá: La ciudadanía digital implica entender la protección de datos personales, reconocer sesgos en sistemas y considerar la sustentabilidad de la tecnología.'
  };

  function checkQuiz(e) {
    if (e) e.preventDefault();
    const form = $('quiz-form');
    if (!form) return;
    const data = new FormData(form);
    let total = 6;
    let ok = 0;
    state.quizAnswers = {};

    for (let i = 1; i <= total; i++) {
      const qKey = 'q' + i;
      const val = data.get(qKey);
      state.quizAnswers[qKey] = val;
      const fb = $('feedback-' + qKey);
      if (!fb) continue;
      fb.hidden = false;

      if (!val) {
        fb.className = 'feedback incorrect';
        fb.textContent = 'Pregunta sin responder. Seleccioná una opción para verificar tu comprensión.';
      } else if (val === correct[qKey]) {
        ok++;
        fb.className = 'feedback correct';
        fb.textContent = '✓ ' + explanations[qKey];
      } else {
        fb.className = 'feedback incorrect';
        fb.textContent = '✗ ' + errorExplanations[qKey];
      }
    }

    const pct = Math.round((ok / total) * 100);
    state.score = pct;
    state.quizDone = true;
    showQuizSummary(ok, total, pct);
    saveState();
    announce('Cuestionario evaluado: ' + ok + ' correctas de ' + total + '. Puntaje: ' + pct + '%.');
  }

  function showQuizSummary(ok, total, pct) {
    const summary = $('quiz-summary');
    if (!summary) return;
    summary.hidden = false;
    let msg = '';
    if (pct >= 85) {
      msg = '🌟 ¡Excelente desempeño! Comprendiste con profundidad los fundamentos del pensamiento computacional, estructuras de control y programación alineados a 7°, 8° y 9° EBI.';
    } else if (pct >= 60) {
      msg = '👍 ¡Buen trabajo! Tenés las nociones centrales comprendidas. Podés revisar las explicaciones formativas o volver a intentarlo para afianzar cada concepto.';
    } else {
      msg = '💡 El cuestionario es formativo y podés reintentarlo todas las veces que quieras. Te sugerimos repasar el simulador de votación y las fichas de los módulos.';
    }

    summary.innerHTML = `
      <strong>Resultado: ${ok} de ${total} correctas (${pct}%)</strong>
      <p>${msg}</p>
      ${window.SCORMBridge && window.SCORMBridge.getMode() === 'scorm' ? '<p style="margin-top:8px;font-size:0.85rem;color:#1e40af;"><strong>Registrado en CREA:</strong> Tu calificación y estado se enviaron automáticamente a la libreta del curso.</p>' : ''}
    `;
    summary.focus();
  }

  function restoreQuizAnswers(answers, score) {
    if (!answers) return;
    const form = $('quiz-form');
    if (!form) return;
    Object.keys(answers).forEach((k) => {
      const val = answers[k];
      const input = form.querySelector(`input[name="${k}"][value="${val}"]`);
      if (input) input.checked = true;
    });
    checkQuiz(null);
  }

  function resetQuiz() {
    const form = $('quiz-form');
    if (form) form.reset();
    for (let i = 1; i <= 6; i++) {
      const fb = $('feedback-q' + i);
      if (fb) {
        fb.hidden = true;
        fb.textContent = '';
      }
    }
    const summary = $('quiz-summary');
    if (summary) {
      summary.hidden = true;
      summary.innerHTML = '';
    }
    state.score = null;
    state.quizDone = false;
    state.quizAnswers = {};
    saveState();
    announce('Cuestionario reiniciado. Podés volver a contestar.');
  }

  on($('quiz-form'), 'submit', checkQuiz);
  on($('reset-quiz'), 'click', resetQuiz);

  // ==========================================
  // GENERADOR Y DESCARGADOR DE PAQUETE SCORM 1.2 CLIENT-SIDE
  // ==========================================
  async function downloadScormPackage() {
    const btn = $('btn-download-scorm') || $('btn-top-scorm');
    const oldText = btn ? btn.innerHTML : '';
    if (btn) {
      btn.innerHTML = '⏳ Empaquetando SCORM...';
      btn.disabled = true;
    }
    announce('Preparando el paquete SCORM 1.2 para CREA. Por favor espere.');

    try {
      if (typeof JSZip === 'undefined') {
        throw new Error('JSZip no disponible');
      }

      const zip = new JSZip();

      // Helper to fetch file as text or blob
      async function addFileToZip(path, isBinary = false) {
        try {
          const resp = await fetch(path);
          if (!resp.ok) throw new Error('Error al cargar ' + path);
          if (isBinary) {
            const blob = await resp.blob();
            zip.file(path, blob);
          } else {
            const text = await resp.text();
            zip.file(path, text);
          }
        } catch (err) {
          console.warn('Omitiendo ' + path + ':', err);
        }
      }

      // Add imsmanifest.xml
      await addFileToZip('imsmanifest.xml');
      // Add index.html
      await addFileToZip('index.html');
      // Add assets
      await addFileToZip('assets/styles.css');
      await addFileToZip('assets/main.js');
      await addFileToZip('assets/scorm.js');
      await addFileToZip('assets/jszip.min.js');
      await addFileToZip('assets/logo-edytic.jpg', true);

      // Add audio files (DUA Santiago's voice notes)
      await addFileToZip('assets/audio/01-introduccion.webm', true);
      await addFileToZip('assets/audio/02-explicacion-actividad.webm', true);
      await addFileToZip('assets/audio/03-algoritmo-inicial.webm', true);
      await addFileToZip('assets/audio/04-programa-scratch.webm', true);
      await addFileToZip('assets/audio/05-programa-makecode.webm', true);

      // Add essential media files
      await addFileToZip('assets/media/SolucionInicial.png', true);
      await addFileToZip('assets/media/consola.mp4', true);
      await addFileToZip('assets/media/vista1.mp4', true);
      await addFileToZip('assets/media/consola_poster.png', true);
      await addFileToZip('assets/media/vista1_poster.png', true);

      // Add keyframes
      const keyframes = [
        'assets/media/scratch_01_establecer_objetos_f1.png',
        'assets/media/scratch_01_establecer_objetos_f3.png',
        'assets/media/scratch_02_definir_variables_f1.png',
        'assets/media/scratch_02_definir_variables_f3.png',
        'assets/media/scratch_03_programar_objetos_f1.png',
        'assets/media/scratch_03_programar_objetos_f3.png',
        'assets/media/makecode_01_definir_entradas_f1.png',
        'assets/media/makecode_01_definir_entradas_f3.png',
        'assets/media/makecode_02_entradas_microbit_f1.png',
        'assets/media/makecode_02_entradas_microbit_f3.png',
        'assets/media/makecode_03_resultado_ab_f1.png',
        'assets/media/makecode_03_resultado_ab_f3.png',
        'assets/media/algoritmo_ejecucion_paso_a_paso_f1.png',
        'assets/media/algoritmo_ejecucion_paso_a_paso_f3.png'
      ];
      for (const kf of keyframes) {
        await addFileToZip(kf, true);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scorm-modulo-programacion-edytic.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      announce('¡Paquete SCORM 1.2 descargado con éxito!');
      alert('¡Paquete SCORM 1.2 generado exitosamente!\n\nEl archivo "scorm-modulo-programacion-edytic.zip" ya está listo para subir a la plataforma CREA (Schoology de Ceibal) desde "Agregar Contenido" -> "Agregar archivo / enlace / herramienta externa" -> "Paquete SCORM".');
    } catch (err) {
      console.error(err);
      // Fallback: direct download link if available
      window.location.href = 'scorm-modulo-programacion.zip';
    } finally {
      if (btn) {
        btn.innerHTML = oldText;
        btn.disabled = false;
      }
    }
  }

  on($('btn-download-scorm'), 'click', downloadScormPackage);
  on($('btn-top-scorm'), 'click', downloadScormPackage);

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    applyPrefs();
    initState();
    setLocation();
    setLab(25);
    updateSimulatorUI();
  });
})();
