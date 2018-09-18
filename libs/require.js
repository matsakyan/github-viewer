// Simple implementation of AMD
;(function (global) {
  function exportsDigOut(body) {
    const module = { exports: {} };
    const result = eval(body);
    if (typeof result.then !== 'function') {
      return Promise.resolve(module.exports);
    }
    return result.then(_ => module.exports);
  }

  global.require = path => {
    const { cache } = global.require;
    if (cache[path]) {
      return cache[path]
    }

    // using lite-server for fetching static files
    const $module = fetch(path)
      .then(response => response.text())
      .then(text => {
        return exportsDigOut(text);
      });

      cache[path] = $module;
      return $module;
  }

  global.require.cache = Object.create(null);
})(window);
