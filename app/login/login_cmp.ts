import {
  Component,
  Inject,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  Control,
  FormBuilder,
  ControlGroup,
  Validators
} from '@angular/common';

import {UserStorageService} from 'app/user/user_storage_service';
import {UserModel} from 'app/user/user_model';

@Component({
  selector: 'login-cmp',
  templateUrl: 'app/login/login.html',
  styleUrls: ['app/login/login.css'],
  providers: [FormBuilder, UserModel, UserStorageService]
})
export class LoginCmp implements OnInit {
  loginForm: ControlGroup;
  @Output() loginOk: EventEmitter<any> = new EventEmitter();

  constructor(private _user: UserModel,
              private _userStorageService: UserStorageService,
              @Inject(FormBuilder) fb: FormBuilder) {

    this.loginForm = fb.group({
      "name": [this._user.name, Validators.required]
    });
  }

  ngOnInit() {
    console.log('login-cmp init');
  }

  signIn(name: string):void {
    this._userStorageService.saveUser(name);
    (<Control>this.loginForm.controls['name']).updateValue("");

    this.loginOk.next('login-ok!');
  }
}
