/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';

@Component({
  selector: 'chat-tips-cmp'
})
@View({
  templateUrl: 'app/chat/chat_tips/chat_tips.html',
  styleUrls: ['app/chat/chat_tips/chat_tips.css']
})
export class ChatTipsCmp implements OnInit {
  onInit() {
    console.log('chat-tips-cmp init');
  }
}
