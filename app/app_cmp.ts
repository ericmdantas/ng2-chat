/// <reference path="../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat.js';
import {StatsCmp} from 'app/stats/stats_cmp.js';

@Component({
  selector: 'app',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <main>
      <stats></stats>
      <chat-cmp></chat-cmp>
    </main>
  `,
  directives: [ChatCmp, StatsCmp]
})

export class AppCmp {
  onInit() {

  }
}
