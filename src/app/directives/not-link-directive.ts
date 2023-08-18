import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[not-link]'
})
export class NotLink {
    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        event.preventDefault();
        event.stopPropagation();
    }
}
