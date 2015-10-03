/// <reference path="../typings/tsd.d.ts" />

import {Component, View, OnInit, Inject} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat.js';
import {ModalLoginCmp} from 'app/modal_login/modal_login_cmp.js';
import {PromptHeaderCmp} from 'app/prompt_header/prompt_header_cmp.js';

@Component({
  selector: 'app'
})
@View({
  template: `
    <prompt-header-cmp></prompt-header-cmp>

    <main>
      <chat-cmp></chat-cmp>
    </main>

    <modal-login-cmp></modal-login-cmp>
  `,
  directives: [ChatCmp, ModalLoginCmp, PromptHeaderCmp]
})

export class AppCmp implements OnInit {
  onInit() {
    console.log('app init');
  }
}
