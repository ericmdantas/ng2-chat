import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import {
  ChatCodeService
} from 'app/code/code_service';

@Component({
  selector: 'chat-code',
  templateUrl: 'app/code/code.html',
  styleUrls: ['app/code/code.css'],
  providers: [ChatCodeService]
})
export class ChatCodeCmp implements OnInit {
  code: string = "";

  constructor(@Inject(ChatCodeService) private _chatCodeService: ChatCodeService) {

  }

  ngOnInit() {
    console.log("ChatCodeCmp init");

    this._chatCodeService
        .listen()
        .subscribe((info) => {
          this.code = info;
        });
  }

  clear() {
    this.code = "";
  }

  onChange(info:string) {
    this._chatCodeService.send(info);
  }
}
