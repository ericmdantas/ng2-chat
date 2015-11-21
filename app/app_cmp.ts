import {
  Component,
  View,
  OnInit,
  Inject
} from 'angular2/angular2';

import {PromptCmp} from 'app/prompt/prompt_cmp.js';
import {DroppableDirective} from 'app/drag_drop/drop_directive.js';

@Component({
  selector: 'app'
})
@View({
  template: `
    <main super-droppable>
      <prompt-cmp></prompt-cmp>
    </main>
  `,
  directives: [PromptCmp, DroppableDirective]
})

export class AppCmp implements OnInit {
  onInit() {
    console.log('app init');
  }
}
