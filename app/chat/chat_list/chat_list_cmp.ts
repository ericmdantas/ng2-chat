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
  template: `
  <div class="list-of-messages-container">
    <div *ng-for="#m of messages">
      <p class="message">
        <span class="user" [text-content]="m.user"></span>

        <span class="sent-time">
          (<span [text-content]="m.sentAt"></span>)
        </span>

        <span class="info" [text-content]="m.message"></span>
      </p>
    </div>
  </div>
  `,
  styles: [`
    .user {
      color: #777;
    }

    .info {
      margin-left: 10px;
    }

    .sent-time {
      color: #aaa;
    }

    .message {
      padding: 5px;
      margin: 0;
    }

    .list-of-messages-container {
      margin-bottom: 30px;
    }
  `],
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
