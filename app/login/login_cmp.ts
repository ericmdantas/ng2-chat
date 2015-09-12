/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, FormBuilder, FORM_DIRECTIVES, ControlGroup, Validators, OnInit} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {StorageService} from 'app/storage/storage_service.js';
import {UserModel} from 'app/user/user_model.js';

@Component({
  selector: 'login',
  bindings: [FormBuilder, UserModel, StorageService]
})
@View({
  templateUrl: 'app/login/login.html',
  styleUrls: ['app/login/login.css']
})
export class LoginCmp implements OnInit {
  loginForm: ControlGroup;

  constructor(@Inject(UserModel) private _user: UserModel, @Inject(StorageService) private _storageService: StorageService, @Inject(FormBuilder) fb: FormBuilder) {
    this.loginForm = fb.group({
      "name": [this._user.name, Validators.required]
    });
  }

  onInit() {
    console.log('login init');
  }
}
