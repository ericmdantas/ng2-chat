/// <reference path="../../typings/tsd.d.ts" />

import {Directive, LifecycleEvent} from 'angular2/angular2';

@Directive({
  selector: '[scroll-bottom]',
  lifecycle: [LifecycleEvent.onInit]
})

export class ChatScrollBottomDirective {
  static TIME_TO_SCROLL: number = 555;

  onInit() {
    window.scrollTo(0, document.body.scrollHeight);
  }
}