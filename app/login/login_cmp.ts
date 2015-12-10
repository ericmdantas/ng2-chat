import {
  Component,
  Inject,
  Output,
  EventEmitter,
  OnInit
} from 'angular2/core';

import {
  Control,
  FormBuilder,
  ControlGroup,
  Validators
} from 'angular2/common';

import {UserStorageService} from 'app/user/user_storage_service.js';
import {UserModel} from 'app/user/user_model.js';

@Component({
  selector: 'login-cmp',
  templateUrl: 'app/login/login.html',
  styleUrls: ['app/login/login.css'],
  providers: [FormBuilder, UserModel, UserStorageService]
})
export class LoginCmp implements OnInit {
  loginForm: ControlGroup;
  @Output() loginOk: EventEmitter<any> = new EventEmitter();

  constructor(@Inject(UserModel) private _user: UserModel,
              @Inject(UserStorageService) private _userStorageService: UserStorageService,
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
