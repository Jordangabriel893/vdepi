import { Component, Input, OnInit, forwardRef, EventEmitter, Output, Renderer2, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-input-judicial-lote',
  templateUrl: './input-judicial-lote.component.html',
  styleUrls: ['./input-judicial-lote.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputJudicialLoteComponent),
      multi: true,
    },
  ],
})
export class InputJudicialLoteComponent implements ControlValueAccessor  {

  @Input() label: string;
  @Input() multiple: boolean;
  @Input() items: any[] = [];
  @Input() bindLabel: string;	
  @Input() bindValue: string;
  @Input() rota: string;
  @Input() loading: boolean = false;
  @Input() inputName: string;
  @Input() entity: any;
  @Input() disabled: boolean = false;
  @Input() varaId: number = 0;
  @Input() juizoId: number;

  value: string;

  onChange: any = () => {};
  onTouched: any = () => {};

  isSpinning: boolean = false;

  constructor(private restangular: Restangular, private renderer: Renderer2, private el: ElementRef) { }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // You can implement this if needed
  }

  updateValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  refresh(element: HTMLElement) {
    this.isSpinning = true;

    if(this.varaId > 0) {
      this.restangular
        .one('judicial/' + this.inputName + '/vara/' + this.varaId)
        .get()
        .subscribe(resp => {
          console.log(resp.data)
          this.items = resp.data;
          this.isSpinning = false;
        }, error => {});
      return;
    }

    if(this.juizoId > 0) {
      this.restangular
        .one('judicial/' + this.inputName + '/')
        .get({juizoId: this.juizoId})
        .subscribe(resp => {
          console.log(resp.data)
          this.items = resp.data;
          this.isSpinning = false;
        }, error => {});
      return;
    }


    this.restangular
      .one('judicial/' + this.inputName)
      .get()
      .subscribe(resp => {
        this.items = resp.data;
        this.isSpinning = false;
      }, error => {});

  }

}
