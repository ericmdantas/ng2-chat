/// <reference path="../typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat.js';
import {StatsCmp} from 'app/stats/stats_cmp.js';
import {ModalLoginCmp} from 'app/modal_login/modal_login_cmp.js';

@Component({
  selector: 'app'
})
@View({
  template: `
    <main>
      <stats></stats>
      <chat-cmp></chat-cmp>
    </main>
    
    <modal-login-cmp></modal-login-cmp>
  `,
  directives: [ChatCmp, StatsCmp, ModalLoginCmp]
})

export class AppCmp implements OnInit {
  onInit() {

  }
}
