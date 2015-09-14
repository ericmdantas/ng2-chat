/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, OnInit, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'chat-trash-cmp',
  events: ['chatTrashed']
})
@View({
  templateUrl: 'app/chat/chat_trash/chat_trash.html',
  styleUrls: ['app/chat/chat_trash/chat_trash.css']
})
export class ChatTrashCmp implements OnInit {
  chatTrashed: EventEmitter = new EventEmitter();

  onInit() {
    console.log('chat-trash-cmp init');
  }

  trashChatHandler():void {
    this.chatTrashed.next(true);
  }
}
