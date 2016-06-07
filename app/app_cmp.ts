import {
  Component,
  OnInit,
  Inject
} from '@angular/core';

import {PromptCmp} from 'app/prompt/prompt_cmp';
import {DroppableDirective} from 'app/drag_drop/drop_directive';
import {ChatCodeCmp} from 'app/code/code_cmp';

@Component({
  selector: 'app',
  template: `
    <main super-droppable>
      <prompt-cmp></prompt-cmp>
      <chat-code></chat-code>
    </main>
  `,
  directives: [PromptCmp, DroppableDirective, ChatCodeCmp]
})

export class AppCmp implements OnInit {
  ngOnInit() {
    console.log('app init');
  }
}
