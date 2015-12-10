import {
  Directive,
  Inject,
  OnInit
} from 'angular2/core';

@Directive({
  selector: '[super-droppable]',
  host: {
    '(dragover)': 'dragoverHandler($event)'
  }
})
export class DroppableDirective implements OnInit {
  ngOnInit() {
    console.log('droppable init');
  }

  dragoverHandler(ev: Event):void {
    ev.preventDefault();
  }
}
