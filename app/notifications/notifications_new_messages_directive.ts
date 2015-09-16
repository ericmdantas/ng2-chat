/// <reference path="../../typings/tsd.d.ts" />

import {Directive, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[notifications-new-messages]'
})
export class NotificationNewMessagesDirective implements OnInit {
  public static DEFAULT_TITLE: string = '_';
  public static WARNING_TITLE: string[] = [NotificationNewMessagesDirective.DEFAULT_TITLE, '!'];
  public static REPEATER: number = 555;
  
  private _doc: Document = document;

  onInit() {
    console.log('notifications-new-messages init');
    this._doc.title = NotificationNewMessagesDirective.DEFAULT_TITLE;
  }

  notifyNewMessage():void {
    this._toggleTitle();
  }

  private _toggleTitle() {
    var _idInterval = setInterval(() => {
      this._doc.title = (this._doc.title === NotificationNewMessagesDirective.WARNING_TITLE[0]) ? NotificationNewMessagesDirective.WARNING_TITLE[1]
                                                                                                : NotificationNewMessagesDirective.WARNING_TITLE[0];

      if (this._doc.hasFocus()) {
          this._doc.title = NotificationNewMessagesDirective.WARNING_TITLE[0];

          clearInterval(_idInterval);
      }

    }, NotificationNewMessagesDirective.REPEATER);
  }
}
