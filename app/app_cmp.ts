/// <reference path="../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat.js';

@Component({
  selector: 'app',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <main>
      <chat-cmp></chat-cmp>
    </main>
  `,
  directives: [ChatCmp]
})

export class AppCmp {
  onInit() {

  }
}
