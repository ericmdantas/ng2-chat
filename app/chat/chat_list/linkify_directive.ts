import {
  Directive,
  Inject,
  ElementRef
} from 'angular2/core';

import {MessageModel} from 'app/chat/message/message_model.js';

@Directive({
  selector: 'linkify'
})
export class LinkifyDirective {
  private static LINK_PATTERN: RegExp = /^https?/g;

  constructor(@Inject(ElementRef) private _elementRef: ElementRef) {

  }

  public parseLink(m: MessageModel):void {
    this._parseLink(m);
  }

  private _parseLink(m: MessageModel):void {
    if (LinkifyDirective.LINK_PATTERN.test(m.message)) {
      console.log('link');
    }
  }
}
