import {
  Directive,
  Inject,
  OnInit
} from 'angular2/angular2';

@Directive({
  selector: '[super-droppable]',
  host: {
    '(dragover)': 'dragoverHandler($event)'
  }
})
export class DroppableDirective implements OnInit {
  onInit() {
    console.log('droppable init');
  }

  dragoverHandler(ev: Event):void {
    ev.preventDefault();
  }
}
