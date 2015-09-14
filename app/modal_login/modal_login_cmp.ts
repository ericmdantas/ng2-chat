/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, ElementRef, OnInit} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {LoginCmp} from 'app/login/login_cmp.js';
import {StorageService} from 'app/storage/storage_service.js';

@Component({
  selector: 'modal-login-cmp',
  bindings: [StorageService]
})
@View({
  templateUrl: 'app/modal_login/modal_login.html',
  styleUrls: ['app/modal_login/modal_login.css'],
  directives: [LoginCmp]
})
export class ModalLoginCmp implements OnInit {
  public static BLANKET: string = 'blanket';
  public static MODAL_LOGIN: string = 'modal-login';

  constructor(@Inject(ElementRef) private _el: ElementRef,
              @Inject(StorageService) private _storage: StorageService) {

  }

  onInit() {
    if (this._storage.isOnline()) {
      this._allowUser();
    }
  }

  loginOkHandler(ev: any):void {
    this._allowUser();
  }

  private _allowUser():void {
    this._el.nativeElement.getElementsByClassName(ModalLoginCmp.BLANKET)[0].style.display = 'none';
    this._el.nativeElement.getElementsByClassName(ModalLoginCmp.MODAL_LOGIN)[0].style.display = 'none';
  }
}
