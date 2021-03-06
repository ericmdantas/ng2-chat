// Tun on full stack traces in errors to help debugging
Error.stackTraceLimit=Infinity;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// // Cancel Karma's synchronous start,
// // we will call `__karma__.start()` later, once all the specs are loaded.
__karma__.loaded = function() {};

System.config({
  packages: {
    'base/app': {
      defaultExtension: false,
      format: 'register',
      map: Object.keys(window.__karma__.files)
                 .filter(onlyAppFiles)
                 .reduce((pathsMapping, appPath) => {
                   // creates local module name mapping to global path with karma's fingerprint in path, e.g.:
                   // './hero.service': '/base/app/hero.service.js?f4523daf879cfb7310ef6242682ccf10b2041b3e'
                   var moduleName = appPath.replace(/^\/base\/app\//, './').replace(/\.js$/, '');
                   pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath]

                   return pathsMapping;
                 }, {})
      }
    }
});

System.import('angular2/src/platform/browser/browser_adapter').then((browser_adapter) => {
  browser_adapter.BrowserDomAdapter.makeCurrent();
}).then(() => {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    // .map(filePath2moduleName)        // Normalize paths to module names.
    .map(function(moduleName) {
      // loads all spec files via their global module names (e.g. 'base/app/hero.service.spec')
      return System.import(moduleName);
    }));
})
.then(() => {
  __karma__.start();
}, (error) => {
  __karma__.error(error.stack || error);
});

function filePath2moduleName(filePath) {
  return filePath.replace(/^\//, '').replace(/\.\w+$/, '');
}

function onlyAppFiles(filePath) {
  return /^\/base\/app\/.*\.js$/.test(filePath)
}

function onlySpecFiles(path) {
  return /_test\.js$/.test(path);
}
