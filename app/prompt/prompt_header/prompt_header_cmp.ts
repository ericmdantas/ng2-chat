import {
  Component,
  OnInit
} from '@angular/core';

import {LogoutService} from 'app/chat/chat_logout/chat_logout_service';
import {DraggableDirective} from 'app/drag_drop/drag_directive';

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
