import {
  Component,
  OnInit
} from '@angular/core';

import {ChatCmp} from 'app/chat/chat_cmp';
import {ModalLoginCmp} from 'app/modal_login/modal_login_cmp';
import {PromptHeaderCmp} from 'app/prompt/prompt_header/prompt_header_cmp';

@Component({
  selector: 'prompt-cmp',
  templateUrl: 'app/prompt/prompt.html',
  styleUrls: ['app/prompt/prompt.css'],
  directives: [ChatCmp, ModalLoginCmp, PromptHeaderCmp]
})
export class PromptCmp implements OnInit {
  ngOnInit() {
    console.log('prompt-cmp init');
  }
}
