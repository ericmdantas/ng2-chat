/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, ViewEncapsulation, OnInit} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {ChatTipsCmp} from 'app/chat/chat_tips/chat_tips_cmp.js';
import {StatsSocketListenerService} from 'app/stats/stats_socket_listener_service.js';

@Component({
  selector: 'stats',
  bindings: [StatsSocketListenerService]
})
@View({
  templateUrl: 'app/stats/stats.html',
  styleUrls: ['app/stats/stats.css'],
  directives: [ChatTipsCmp]
})
export class StatsCmp implements OnInit {
  public msgCount: number = 0;
  public peopleOnline: number = 0;
  public moreThanOne: boolean = false;

  constructor(@Inject(StatsSocketListenerService) private _ssls: StatsSocketListenerService) {

  }

  onInit() {
    this._listenMsgCount();
    this._listenPeopleOnline();
  }

  private _listenPeopleOnline():void {
    this._ssls
        .listenPeopleOnline()
        .subscribe((num) => {
          this.peopleOnline = num;
          this.moreThanOne = (this.peopleOnline > 1);
        });
  }

  private _listenMsgCount():void {
    this._ssls
        .listenMsgCount()
        .subscribe((num) => {
          this.msgCount = num;
        });
  }
}
