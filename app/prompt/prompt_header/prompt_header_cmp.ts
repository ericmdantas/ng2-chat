import {
  Component,
  View,
  OnInit
} from 'angular2/core';

import {LogoutService} from 'app/chat/chat_logout/chat_logout_service.js';
import {DraggableDirective} from 'app/drag_drop/drag_directive.js';

@Component({
  selector: 'prompt-header-cmp',
  viewProviders: [LogoutService],
  directives: [DraggableDirective],
  templateUrl: 'app/prompt/prompt_header/prompt_header.html',
  styleUrls: ['app/prompt/prompt_header/prompt_header.css']
})
export class PromptHeaderCmp implements OnInit {
  constructor(private _logoutService: LogoutService) {

  }

  ngOnInit() {
    console.log('prompt-header-cmp init');
  }

  logoutHandler() {
    this._logoutService.logout();
  }
}
