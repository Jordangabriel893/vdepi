import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appFocus]'
})
export class AppFocusDirective {

  constructor(private el: ElementRef) { }

  @Input() formGroup: NgForm;

  @HostListener('submit', ['$event'])
  public onSubmit(event): void {
    if ('INVALID' === this.formGroup.status) {
      event.preventDefault();

      const formGroupInvalid = this.el.nativeElement.querySelectorAll('.ng-invalid');
      (<HTMLInputElement>formGroupInvalid[0]).focus();
    }
  }
}
