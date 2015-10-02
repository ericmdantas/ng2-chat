/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, OnInit} from 'angular2/angular2';

@Component({
  selector: 'prompt-header-cmp'
})
@View({
  templateUrl: 'app/prompt_header/prompt_header.html',
  styleUrls: ['app/prompt_header/prompt_header.css']
})
export class PromptHeaderCmp implements OnInit {
  onInit() {
    console.log('prompt-header-cmp init');
  }
}
