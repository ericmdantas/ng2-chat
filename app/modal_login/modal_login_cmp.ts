import {
  Component,
  ElementRef,
  OnInit,
  Inject
} from '@angular/core';

import {LoginCmp} from 'app/login/login_cmp';
import {UserStorageService} from 'app/user/user_storage_service';
import {ChatService} from 'app/chat/services/chat_service';

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

  constructor(private _el: ElementRef,
              private _userStorageService: UserStorageService,
              private _chatService: ChatService) {

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
