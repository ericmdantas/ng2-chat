/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, ElementRef, OnInit, EventEmitter} from 'angular2/angular2';
import {Inject} from 'angular2/di';

@Directive({
  selector: '[blink-message]'
})
export class ChatBlinkDirective implements OnInit {
  static MARGIN: {init: string, end: string} = {init: '-50px', end: '0'};
  static TIME_TO_REPEAT: number = 9;

  constructor(@Inject(ElementRef) private _el: ElementRef) {

  }

  onInit() {
    this._blink();
  }

  private _blink():void {
    this._el.nativeElement.style.marginLeft = ChatBlinkDirective.MARGIN.init;

    setTimeout(() => {
      this._el.nativeElement.style.marginLeft = ChatBlinkDirective.MARGIN.end;

    }, ChatBlinkDirective.TIME_TO_REPEAT);
  }
}
