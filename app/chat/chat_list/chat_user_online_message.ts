/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, Inject} from 'angular2/angular2';
import {StorageService} from 'app/storage/storage_service.js';
import {MessageModel} from 'app/chat/model/message_model.js';

@Directive({
  selector: '[user-online-message]',
  bindings: [StorageService]
})
export class UserOnlineMessageDirective {
  constructor(@Inject(StorageService) private _storageService: StorageService) {

  }

  markMessage(m: MessageModel):void {
    if (this._storageService.getUser().name === m.user) {
        m.userOnline = true;
    }
  }
}
