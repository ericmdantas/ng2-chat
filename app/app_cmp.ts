import {
  Component,
  OnInit,
  Inject
} from 'angular2/core';

import {PromptCmp} from 'app/prompt/prompt_cmp.js';
import {DroppableDirective} from 'app/drag_drop/drop_directive.js';

@Component({
  selector: 'app',
  template: `
    <main super-droppable>
      <prompt-cmp></prompt-cmp>
    </main>
  `,
  directives: [PromptCmp, DroppableDirective]
})

export class AppCmp implements OnInit {
  ngOnInit() {
    console.log('app init');
  }
}
