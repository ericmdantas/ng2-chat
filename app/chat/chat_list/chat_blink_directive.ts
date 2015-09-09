/// <reference path="../../typings/tsd.d.ts" />

import {Directive, ElementRef, LifecycleEvent, EventEmitter} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {ChatService} from 'app/chat/services/chat_service.js';

@Directive({
  selector: '[blink-message]'
})

export class ChatBlinkDirective {
  constructor(@Inject(ChatService) private _chatService: ChatService) {

  }

  onInit() {

  }
}
