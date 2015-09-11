/// <reference path="../../typings/tsd.d.ts" />

import {Directive, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[scroll-bottom]'
})

export class ChatScrollBottomDirective implements OnInit {
  static TIME_TO_SCROLL: number = 555;

  onInit() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}
