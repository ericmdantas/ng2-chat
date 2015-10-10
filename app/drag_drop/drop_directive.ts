/// <reference path="../../typings/tsd.d.ts" />

import {Directive, Inject, ElementRef, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[super-droppable]',
  host: {
    '(dragover)': 'dragoverHandler($event)'
  }
})
export class DroppableDirective implements OnInit {
  constructor(@Inject(ElementRef) private _el: ElementRef) {

  }

  onInit() {
    console.log('droppable init');
  }

  dragoverHandler(ev: Event):void {
    ev.preventDefault();
  }
}
