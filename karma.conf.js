module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      // paths loaded by Karma
      {pattern: 'node_modules/systemjs/dist/system.js', included: true, watched: true},
      {pattern: 'node_modules/socket.io-client/socket.io.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/angular2.js', included: true, watched: true},
      {pattern: 'node_modules/xtorage/dist/system/xtorage.js', included: true, watched: true},
      {pattern: 'node_modules/angular2/bundles/testing.js', included: true, watched: true},
      {pattern: 'karma-test-shim.js', included: true, watched: true},

      // paths loaded via module imports
      {pattern: 'app/**/*.js', included: false, watched: true},

      // paths loaded via Angular's component compiler
      // (these paths need to be rewritten, see proxies section)
      {pattern: 'app/**/*.html', included: false, watched: true},
      {pattern: 'app/**/*.css', included: false, watched: true},

      // paths to support debugging with source maps in dev tools
      {pattern: 'app/**/*.ts', included: false, watched: false},
      {pattern: 'app/**/*.js.map', included: false, watched: false},

      {pattern: 'tests/client/*_test.js', included: false, watched: false}
    ],

    // proxied base paths
    proxies: {
      // required for component assests fetched by Angular's compiler
      "/app/": "/base/app/"
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  })
}
