/// <reference path="typings/tsd.d.ts" />
/// <reference path="node_modules/angular2/bundles/typings/angular2/http.d.ts" />

import {bootstrap} from 'angular2/angular2';
import {AppCmp} from 'app/app_cmp.js';

bootstrap(AppCmp)
  .then(() => console.log('client ok'))
  .catch((error) => console.log(`error bootstraping index ${error}`));
