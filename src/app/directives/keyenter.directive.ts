import { Directive, HostListener, ElementRef, Output, EventEmitter } from '@angular/core';

/**
* Chama uma função ao apertar enter
*/
@Directive({
  selector: '[keyenter]'
})
export class KeyEnterDirective {
  constructor(private _elementRef: ElementRef) { }

  @Output()
  public keyenter = new EventEmitter();

  @HostListener('keyup', ['$event'])
  callEnter($event: any) {
    //const thisElement = this._elementRef.nativeElement.contains($event.target);
    if ($event.keyCode == 13) {
      this.keyenter.emit(null);
    }
  }
}
