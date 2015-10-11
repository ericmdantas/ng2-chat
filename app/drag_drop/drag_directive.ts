/// <reference path="../../typings/tsd.d.ts" />

import {Directive, Inject, ElementRef, OnInit, Input} from 'angular2/angular2';

@Directive({
  selector: '[super-draggable]',
  inputs: ['elId'],
  host: {
    '(drag)': 'dragHandler($event)'
  }
})
export class DraggableDirective implements OnInit {
  private _doc: Document = document;
  elId: string;

  constructor() {

  }

  onInit() {
    console.log('draggable init');
  }

  dragHandler(ev:Event):void {
    this._doc.querySelectorAll(this.elId)[0].style.left = `${ev.clientX - 400}px`;
    this._doc.querySelectorAll(this.elId)[0].style.top = `${ev.clientY}px`;
  }
}
