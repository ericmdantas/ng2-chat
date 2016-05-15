System.config({
    defaultJSExtensions: true,
    paths: {
      '@angular/*': 'node_modules/@angular/*',
      "rxjs/*": "node_modules/rxjs/*",
      "reflect-metadata": "node_modules/reflect-metadata",
    },
    map: {
      "rxjs": "node_modules/rxjs",
      "xtorage": "node_modules/xtorage/dist/system/"
    },
    packages: {
      '@angular/core': {
        main: 'index'
      },
      '@angular/common': {
        main: 'index'
      },
      '@angular/compiler': {
        main: 'index'
      },      
      '@angular/platform-browser': {
        main: 'index'
      },
      '@angular/platform-browser-dynamic': {
        main: 'index'
      },
      "rxjs": {
        defaultExtension: 'js'
      },
      'dist': {
        defaultExtension: 'js',
        format: 'register'
      }
    }
  });
