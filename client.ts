/// <reference path="node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {AppCmp} from 'app/app_cmp.js';

bootstrap(AppCmp)
  .then(() => console.log('client ok'))
  .catch((error) => console.log(`error bootstraping client ${error}`));
