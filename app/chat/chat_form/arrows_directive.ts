/// <reference path="../../typings/tsd.d.ts" />

import {Directive, OnInit, Output, EventEmitter} from 'angular2/angular2';

@Directive({
  selector: '[arrows]',
  outputs: ['arrowUp', 'arrowDown'],
  host: {
    '(keyup)': 'inputHandler($event)'
  }
})
export class ArrowsDirective implements OnInit {
  @Output() arrowUp: EventEmitter = new EventEmitter();
  @Output() arrowDown: EventEmitter = new EventEmitter();

  private static UP: number = 38;
  private static DOWN: number = 40;

  onInit() {
    console.log('arrows init');
  }

  inputHandler(ev) {
    if (ev.which === ArrowsDirective.UP) {
      return this.arrowUp.next({arrow: 'up'})
    }

    if (ev.which === ArrowsDirective.DOWN) {
      return this.arrowDown.next({arrow: 'down'});
    }
  }
}
