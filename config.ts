System.config({
    globalEvaluationScope: false,
    defaultJSExtensions: true,
    paths: {
      '@angular/*': 'node_modules/@angular/*',
      "rxjs/*": "node_modules/rxjs/*",
      "reflect-metadata": "node_modules/reflect-metadata",
      "xtorage": "node_modules/xtorage/dist/system/*"
    },
    map: {
      "rxjs": "node_modules/rxjs",
      "xtorage": "node_modules/xtorage/dist/system/xtorage"
    },
    packages: {
      '@angular/common': {
        main: 'index'
      },
      '@angular/compiler': {
        main: 'index'
      },
      '@angular/core': {
        main: 'index'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index'
      },
      '@angular/platform-browser': {
        main: 'index'
      },
      '@angular/router': {
        main: 'index'
      },
      "rxjs": {
        defaultExtension: 'js'
      },
      "xtorage": {
        defaultExtension: 'js'
      },
      'dist': {
        defaultExtension: 'js',
        format: 'register'
      }
    }
  });
