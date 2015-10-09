/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Inject, FormBuilder, FORM_DIRECTIVES, ControlGroup, Output, Validators, EventEmitter, OnInit} from 'angular2/angular2';
import {UserStorageService} from 'app/user/user_storage_service.js';
import {UserModel} from 'app/user/user_model.js';

@Component({
  selector: 'login-cmp',
  bindings: [FormBuilder, UserModel, UserStorageService],
  outputs: ['loginOk']
})
@View({
  templateUrl: 'app/login/login.html',
  styleUrls: ['app/login/login.css'],
  directives: [FORM_DIRECTIVES]
})
export class LoginCmp implements OnInit {
  loginForm: ControlGroup;
  loginOk: EventEmitter = new EventEmitter();

  constructor(@Inject(UserModel) private _user: UserModel,
              @Inject(UserStorageService) private _userStorageService: UserStorageService,
              @Inject(FormBuilder) fb: FormBuilder) {

    this.loginForm = fb.group({
      "name": [this._user.name, Validators.required]
    });
  }

  onInit() {
    console.log('login-cmp init');
  }

  signIn(name: string):void {
    this._userStorageService.saveUser(name);
    this.loginForm.controls.name.updateValue("");

    this.loginOk.next('login-ok!');
  }
}
