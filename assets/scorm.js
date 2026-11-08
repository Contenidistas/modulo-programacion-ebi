/* Adaptador mínimo SCORM 1.2. Funciona sin LMS: en web no se envían calificaciones. */
(function () {
  'use strict';
  var api = null;
  var initialized = false;
  var finished = false;
  var mode = 'web';

  function searchParents(start) {
    var current = start;
    var attempts = 0;
    while (current && attempts < 12) {
      try { if (current.API && typeof current.API.LMSInitialize === 'function') return current.API; } catch (_) { return null; }
      try { if (!current.parent || current.parent === current) break; current = current.parent; } catch (_) { break; }
      attempts++;
    }
    return null;
  }
  function discover() {
    var found = searchParents(window);
    if (!found) { try { if (window.opener) found = searchParents(window.opener); } catch (_) {} }
    return found;
  }
  function call(method, arg1, arg2) {
    if (!initialized || finished || !api || typeof api[method] !== 'function') return null;
    try { return api[method](arg1, arg2); } catch (_) { return null; }
  }
  function set(field, value) { return call('LMSSetValue', field, String(value)) === 'true'; }
  function get(field) { return call('LMSGetValue', field) || ''; }
  function init() {
    if (initialized || finished) return initialized;
    api = discover();
    if (!api) return false;
    try { initialized = api.LMSInitialize('') === 'true'; } catch (_) { initialized = false; }
    if (!initialized) return false;
    mode = 'scorm';
    var status = get('cmi.core.lesson_status');
    if (!status || status === 'not attempted' || status === 'not_attempted') set('cmi.core.lesson_status','incomplete');
    call('LMSCommit', '');
    return true;
  }
  function resume() {
    if (!initialized) return null;
    var raw = get('cmi.suspend_data');
    try { return raw ? JSON.parse(raw) : null; } catch (_) { return null; }
  }
  function save(state) {
    if (!initialized || finished) return false;
    var concise = JSON.stringify({ location: String(state.location || '#inicio').slice(0,120), score: state.score == null ? null : Number(state.score) });
    set('cmi.suspend_data', concise);
    if (state.location) set('cmi.core.lesson_location', String(state.location).slice(0,200));
    if (state.score != null && Number.isFinite(Number(state.score))) {
      var score = Math.max(0, Math.min(100, Math.round(Number(state.score))));
      set('cmi.core.score.min', 0);
      set('cmi.core.score.max', 100);
      set('cmi.core.score.raw', score);
      set('cmi.core.lesson_status', score >= 75 ? 'passed' : 'failed');
    }
    return call('LMSCommit', '') === 'true';
  }
  function end() {
    if (initialized && !finished) {
      try { api.LMSCommit(''); } catch (_) {}
      try { api.LMSFinish(''); } catch (_) {}
      finished = true;
    }
  }
  window.SCORMBridge = { init: init, resume: resume, save: save, end: end, getMode: function(){return mode;} };
  window.addEventListener('pagehide', end);
  window.addEventListener('beforeunload', end);
})();
