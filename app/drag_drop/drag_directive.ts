import {Directive, Inject, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[super-draggable]',
  inputs: ['elId'],
  host: {
    '(drag)': 'dragHandler($event)'
  }
})
export class DraggableDirective implements OnInit {
  private static CENTER_GRAB: number = 400;
  private static INIT_X: number = 0;
  private _doc: Document = document;
  elId: string;
  private _lastPositionX: number;
  private _actualPosition: number;

  onInit() {
    console.log('draggable init');
  }

  dragHandler(ev:Event):void {
    this._actualPosition = ev.clientX === DraggableDirective.INIT_X ? this._lastPositionX - DraggableDirective.CENTER_GRAB
                                                                    : ev.clientX - DraggableDirective.CENTER_GRAB;
    this._lastPositionX = ev.clientX;

    this._doc.querySelectorAll(this.elId)[0].style.left = `${this._actualPosition}px`;
    this._doc.querySelectorAll(this.elId)[0].style.top = `${ev.clientY}px`;
  }
}
