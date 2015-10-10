/// <reference path="../../typings/tsd.d.ts" />

import {Directive, Inject, ElementRef, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[super-draggable]'
})
export class DraggableDirective implements OnInit {
  constructor(@Inject(ElementRef) private _el: ElementRef) {

  }

  onInit() {
    console.log('draggable init');

    this._el.nativeElement.addEventListener('drag', (ev) => {
      ev.preventDefault();

      this._el.nativeElement.style.left = `${ev.clientX - 400}px`;
      this._el.nativeElement.style.top = `${ev.clientY}px`;
    });
  }
}
