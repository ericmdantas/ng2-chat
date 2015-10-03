/// <reference path="../../../typings/tsd.d.ts" />

import {Directive, OnInit} from 'angular2/angular2';

@Directive({
  selector: '[message-storage]'
})
export class MessageStorageDirective implements OnInit {
  onInit() {
    console.log('message-storage init');
  }
}
