import { Directive, ElementRef, Output, EventEmitter, Input, OnInit, Renderer } from '@angular/core';

/**
* Chama uma função ao apertar enter
*/
@Directive({ selector: '[inputFocus]' })
export class InputFocusDirective implements OnInit {

  @Input('inputFocus') isFocused?: boolean;

  constructor(private hostElement: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
    if (this.isFocused || this.isFocused == null) {
      this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
    }
  }
}
