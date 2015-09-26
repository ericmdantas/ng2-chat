/// <reference path="../../typings/tsd.d.ts" />

import {Directive, Inject, OnInit} from 'angular2/angular2';

export class ChatScrollBottomService {
  pullDown():void {
    window.scrollTo(0, document.body.scrollHeight);
  }
}

@Directive({
  selector: '[scroll-bottom]',
  bindings: [ChatScrollBottomService]
})
export class ChatScrollBottomDirective implements OnInit {
  constructor(@Inject(ChatScrollBottomService) private _chatScrollBottomService:ChatScrollBottomService) {

  }

  onInit() {
    this._chatScrollBottomService.pullDown();
  }
}
