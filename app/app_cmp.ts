/// <reference path="../typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';
import {Inject} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat.js';
import {StatsCmp} from 'app/stats/stats_cmp.js';
import {ModalLoginCmp} from 'app/modal_login/modal_login_cmp.js';
import {UserStatusBus} from 'app/message_bus/user_status_bus.js';

@Component({
  selector: 'app',
  bindings: [UserStatusBus]
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
  constructor(@Inject(UserStatusBus) private _userStatusBus: UserStatusBus) {

  }

  onInit() {

  }
}
