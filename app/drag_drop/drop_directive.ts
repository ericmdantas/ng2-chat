import {
  Directive,
  Inject,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[superDroppable]',
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
