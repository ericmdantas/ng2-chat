/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, CORE_DIRECTIVES} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {ChatService} from 'app/chat/services/chat_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatBlinkDirective} from 'app/chat/chat_list/chat_blink_directive.js';

@Component({
  selector: 'chat-list-cmp',
  lifecycle: [LifecycleEvent.onInit],
  bindings: [ChatService]
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [CORE_DIRECTIVES, ChatBlinkDirective]
})

export class ChatListCmp {
  public messages: MessageModel[] = [];

  constructor(@Inject(ChatService) private _chatService: ChatService) {

  }

  onInit() {
    this._chatService
        .listen()
        .subscribe((message) => {
          this.messages.push(message);
        });
  }
}
