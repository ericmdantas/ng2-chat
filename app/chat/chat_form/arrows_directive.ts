import {
  Directive,
  OnInit,
  Output,
  EventEmitter
} from 'angular2/core';

@Directive({
  selector: '[arrows]',
  host: {
    '(keyup)': 'inputHandler($event)'
  }
})
export class ArrowsDirective implements OnInit {
  @Output() arrowUp: EventEmitter<any> = new EventEmitter();
  @Output() arrowDown: EventEmitter<any> = new EventEmitter();

  private static UP: number = 38;
  private static DOWN: number = 40;

  ngOnInit() {
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
