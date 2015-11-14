import {Component, OnInit} from 'angular2/angular2';
import {ChatCmp} from 'app/chat/chat_cmp.js';
import {ModalLoginCmp} from 'app/modal_login/modal_login_cmp.js';
import {PromptHeaderCmp} from 'app/prompt/prompt_header/prompt_header_cmp.js';

@Component({
  selector: 'prompt-cmp',
  templateUrl: 'app/prompt/prompt.html',
  styleUrls: ['app/prompt/prompt.css'],
  directives: [ChatCmp, ModalLoginCmp, PromptHeaderCmp]
})
export class PromptCmp implements OnInit {
  onInit() {
    console.log('prompt-cmp init');
  }
}
