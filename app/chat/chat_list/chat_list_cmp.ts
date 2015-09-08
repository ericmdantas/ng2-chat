/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent} from 'angular2/angular2';

@Component({
  selector: 'chat-list-cmp',
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  template: `
    <h2>list goes here</h2>
  `
})

export class ChatListCmp {
  onInit() {
    console.log('chat-list-cmp init');
  }
}
