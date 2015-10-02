/// <reference path="../../../typings/tsd.d.ts" />

export class ScrollBottomService {
  private _w: Window = window;

  goDown() {
    this._w.scrollTo(0, document.body.scrollHeight);
  }
}
