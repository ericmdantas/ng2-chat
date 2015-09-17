/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, Inject, OnInit} from 'angular2/angular2';
import {MessageModel} from 'app/chat/model/message_model.js';
import {ChatService} from 'app/chat/services/chat_service.js';

@Directive({
  selector: '[mention]',
  bindings: [ChatService]
})
export class MentionService implements OnInit {
  constructor(@Inject(ChatService) private _chatService: ChatService) {

  }

  onInit() {
    console.log('mention-directive init');
  }

  makeMention(m: MessageModel):void {
    console.log(m);
  }
}
