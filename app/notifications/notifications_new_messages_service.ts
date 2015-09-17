/// <reference path="../../typings/tsd.d.ts" />

export class NotificationNewMessagesService {
  public static DEFAULT_TITLE: string = '_';
  public static WARNING_TITLE: string[] = [NotificationNewMessagesService.DEFAULT_TITLE, '!'];
  public static REPEATER: number = 555;

  private _doc: Document = document;

  constructor() {
    this._doc.title = NotificationNewMessagesService.DEFAULT_TITLE;
  }

  toggleTitle() {
    let _idInterval = setInterval(() => {
      this._doc.title = (this._doc.title === NotificationNewMessagesService.WARNING_TITLE[0]) ? NotificationNewMessagesService.WARNING_TITLE[1]
                                                                                                : NotificationNewMessagesService.WARNING_TITLE[0];

      if (this._doc.hasFocus()) {
          this._doc.title = NotificationNewMessagesService.WARNING_TITLE[0];

          clearInterval(_idInterval);
      }

    }, NotificationNewMessagesService.REPEATER);
  }
}
