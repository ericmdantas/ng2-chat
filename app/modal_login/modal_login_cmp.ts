import {
  Component,
  ElementRef,
  OnInit,
  Inject
} from 'angular2/core';

import {LoginCmp} from 'app/login/login_cmp.js';
import {UserStorageService} from 'app/user/user_storage_service.js';
import {ChatService} from 'app/chat/services/chat_service.js';

@Component({
  selector: 'modal-login-cmp',
  templateUrl: 'app/modal_login/modal_login.html',
  styleUrls: ['app/modal_login/modal_login.css'],
  providers: [UserStorageService, ChatService],
  directives: [LoginCmp]
})
export class ModalLoginCmp implements OnInit {
  public static BLANKET: string = 'blanket';
  public static MODAL_LOGIN: string = 'modal-login';
  private _doc: Document = document;

  constructor(@Inject(ElementRef) private _el: ElementRef,
              @Inject(UserStorageService) private _userStorageService: UserStorageService,
              @Inject(ChatService) private _chatService: ChatService) {

  }

  ngOnInit() {
    if (this._userStorageService.isOnline()) {
      this._allowUser();
    }
  }

  loginOkHandler(ev: any):void {
    this._allowUser();
  }

  private _allowUser():void {
    this._el.nativeElement.getElementsByClassName(ModalLoginCmp.BLANKET)[0].style.display = 'none';
    this._el.nativeElement.getElementsByClassName(ModalLoginCmp.MODAL_LOGIN)[0].style.display = 'none';

    this._chatService.sendEvent('login', {user: this._userStorageService.getUserName()});
  }
}
