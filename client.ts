import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppCmp} from 'app/app_cmp';

bootstrap(AppCmp)
  .then(() => console.log('client ok'))
  .catch((error) => console.log(`error bootstraping client ${error}`));
