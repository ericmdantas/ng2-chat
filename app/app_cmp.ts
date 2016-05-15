import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import {PromptCmp} from 'app/prompt/prompt_cmp';
import {DroppableDirective} from 'app/drag_drop/drop_directive';

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
