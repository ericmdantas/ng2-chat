/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, ElementRef, OnInit, EventEmitter} from 'angular2/angular2';
import {Inject} from 'angular2/di';

type dirType = {
  fontColor: string;
  bkg: string;
}

@Directive({
  selector: '[blink-message]'
})
export class ChatBlinkDirective implements OnInit {
  static DEFAULT_COLORS: dirType = {bkg: 'transparent', fontColor: "#444"};
  static SHINY_COLORS: dirType = {bkg: 'gold', fontColor: "#fff"};
  static TIME_TO_FADE: number = 777;

  constructor(@Inject(ElementRef) private _el: ElementRef) {

  }

  onInit() {
    this._blink();
  }

  private _blink():void {
    this._el.nativeElement.style.backgroundColor = ChatBlinkDirective.SHINY_COLORS.bkg;
    this._el.nativeElement.style.color = ChatBlinkDirective.SHINY_COLORS.fontColor;

    setTimeout(() => {
      this._el.nativeElement.style.backgroundColor = ChatBlinkDirective.DEFAULT_COLORS.bkg;
      this._el.nativeElement.style.color = ChatBlinkDirective.DEFAULT_COLORS.fontColor;
    }, ChatBlinkDirective.TIME_TO_FADE);
  }
}
