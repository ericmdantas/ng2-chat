/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, NgFor} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {ChatService} from 'app/chat/services/chat_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';

@Component({
  selector: 'chat-list-cmp',
  lifecycle: [LifecycleEvent.onInit],
  bindings: [ChatService]
})
@View({
  templateUrl: 'app/chat/chat_list/chat_list.html',
  styleUrls: ['app/chat/chat_list/chat_list.css'],
  directives: [NgFor]
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
