/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, ViewEncapsulation, LifecycleEvent} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {StatsSocketListenerService} from 'app/stats/stats_socket_listener_service.js';

@Component({
  selector: 'stats',
  bindings: [StatsSocketListenerService],
  lifecycle: [LifecycleEvent.onInit]
})
@View({
  templateUrl: 'app/stats/stats.html',
  styleUrls: ['app/stats/stats.css']
})

export class StatsCmp {
  public msgCount: number = 0;
  public peopleOnline: number = 0;

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
